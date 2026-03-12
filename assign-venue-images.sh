#!/bin/bash
# Fase 2: Asignar imágenes base a los 211 venues de EVENTECH
# Cada venue se clasifica por su slug → se copia la imagen base correspondiente

BASE="public/images/venues-base"
DEST="public/images/venues"
cd /Users/frankoropeza/Desktop/clientes/EVENTECH

# Función: clasifica un slug y copia la imagen correspondiente
assign_image() {
  local slug="$1"
  local dest_file="$DEST/${slug}-hero.jpg"
  
  # Si ya existe, skip
  if [ -f "$dest_file" ]; then
    return
  fi
  
  local type=""
  
  # Clasificación por keywords en el slug
  case "$slug" in
    hacienda-*|exhacienda-*)
      type="hacienda-colonial"
      ;;
    jardin-*|jardines-*)
      type="jardin-noche"
      ;;
    terraza-*|terrazas-*|gran-terraza)
      type="terraza-cdmx"
      ;;
    salon-*jardin*|salon-monaco-jardin|salon-villa-jardin*)
      type="salon-jardin"
      ;;
    salon-*)
      type="salon-interior"
      ;;
    salones-*)
      type="salon-interior"
      ;;
    casa-*|casapiedra|roma-house)
      type="casa-mansion"
      ;;
    exconvento*|palacio-*|casino-espanol)
      type="exconvento-colonial"
      ;;
    four-seasons|hilton-*|jw-marriott|marriott-*|st-regis|w-mexico|camino-real)
      type="hotel-lujo"
      ;;
    cc-*|ccm|centro-convenciones-*|centro-eventos-*|citibanamex|foro-*)
      type="centro-convenciones"
      ;;
    loft*|industrial)
      type="loft-industrial"
      ;;
    aupied|pujol|san-angel-inn|la-lupita)
      type="restaurante-evento"
      ;;
    # Default: classify by common patterns
    *club*|*hipico*|*banqueros*)
      type="casa-mansion"
      ;;
    *vista*|*mirador*|los-ventanales*)
      type="terraza-cdmx"
      ;;
    *san-*|*santa*|*cristobal*|*martin*|*gaspar*)
      type="hacienda-colonial"
      ;;
    *eden*|*encinar*|*fuentes*|*las-fuentes*|*nevado*|*diamante*|*fenix*|*volcanes*|*panoaya*|*avandaro*)
      type="jardin-noche"
      ;;
    *real*|*monarca*|*providencia*|*carlota*)
      type="hotel-lujo"
      ;;
    *loreto*|*soumaya*|*elena-garro*|*chapingo*|*azulhistorico*|*nativitas*|*segundo-castillo*)
      type="exconvento-colonial"
      ;;
    *contadero*|*condetoluca*|*gonzalez-luna*|*gogorron*|*cantera*|*kalesh*|*bosques*)
      type="salon-jardin"
      ;;
    *)
      # Fallback: salón interior (el tipo más común)
      type="salon-interior"
      ;;
  esac
  
  cp "$BASE/$type.jpg" "$dest_file"
  echo "  $slug → $type"
}

echo "🏗️ Asignando imágenes a venues..."

# Extraer todos los slugs de las rutas de imagen en el código
grep -rh 'image:' src/content/venues/ | grep -o '"/images/venues/[^"]*"' | sort -u | sed 's|"/images/venues/||;s|-hero.jpg"||' | while read slug; do
  assign_image "$slug"
done

total=$(ls "$DEST"/*-hero.jpg 2>/dev/null | wc -l)
echo ""
echo "✅ Total: $total venue hero images asignadas"
