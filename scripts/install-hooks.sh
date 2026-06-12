#!/usr/bin/env bash
# scripts/install-hooks.sh
# Instala git hooks locales (pre-push) en este clon del repo.
# Correr UNA vez por cada máquina donde harás git push: bash scripts/install-hooks.sh

set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"
HOOK_PATH="$REPO_ROOT/.git/hooks/pre-push"

cat > "$HOOK_PATH" << 'HOOK'
#!/usr/bin/env sh
# pre-push hook — bloquea pushes que romperían CF Pages / deploy.
# Si pasa local, el deploy NO falla. Garantía.
# Para skip (urgente): git push --no-verify

set -e
START=$(date +%s)
echo "→ pre-push: validación profesional antes de pushear..."

# 0. node_modules instalado?
if [ ! -d "node_modules" ]; then
  echo "✗ node_modules no existe. Corre 'npm install' primero."
  exit 1
fi

# 1. validate:blog (opcional — solo si existe el script)
if npm run --silent | grep -qE "^\s+validate:blog$"; then
  echo "  [1/4] validate:blog..."
  if ! npm run --silent validate:blog > /tmp/prepush_blog.log 2>&1; then
    cat /tmp/prepush_blog.log
    echo "✗ validate:blog FALLÓ — push abortado"
    exit 1
  fi
fi

# 2. validate:mdx (closing tags, imports, props)
if npm run --silent | grep -qE "^\s+validate:mdx$"; then
  echo "  [2/4] validate:mdx..."
  if ! npm run --silent validate:mdx > /tmp/prepush_mdx.log 2>&1; then
    cat /tmp/prepush_mdx.log
    echo "✗ validate:mdx FALLÓ — push abortado"
    exit 1
  fi
fi

# 3. Astro / TypeScript check (si astro está disponible)
if [ -f "node_modules/.bin/astro" ]; then
  echo "  [3/4] astro check..."
  if ! npx --no-install astro check > /tmp/prepush_check.log 2>&1; then
    tail -30 /tmp/prepush_check.log
    echo "✗ astro check FALLÓ — push abortado"
    echo "  Tip urgente (NO recomendado): git push --no-verify"
    exit 1
  fi

  # 4. Build completo (mismo que CF Pages corre)
  echo "  [4/4] astro build..."
  if ! npx --no-install astro build > /tmp/prepush_build.log 2>&1; then
    tail -40 /tmp/prepush_build.log
    echo "✗ astro build FALLÓ — push abortado"
    echo "  Tip urgente (NO recomendado): git push --no-verify"
    exit 1
  fi
fi

ELAPSED=$(($(date +%s) - START))
echo "✓ pre-push OK en ${ELAPSED}s — pusheando (deploy NO fallará)"
HOOK

chmod +x "$HOOK_PATH"

echo ""
echo "✓ pre-push hook instalado en $HOOK_PATH"
echo ""
echo "Próximo git push correrá automáticamente:"
echo "  1. validate:blog   (si existe)"
echo "  2. validate:mdx    (~1s)"
echo "  3. astro check     (~10-20s)"
echo "  4. astro build     (~30-60s)"
echo ""
echo "Si CUALQUIER paso falla, push abortado antes de tocar GitHub."
echo "Para saltar (NO recomendado): git push --no-verify"
