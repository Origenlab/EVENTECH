#!/usr/bin/env python3
"""
Genera mapas estáticos self-hosted para las fichas del directorio.

- Lee coordinates de los .md en src/content/venues/
- Compone una imagen 1032x460 con tiles OSM (z15) + marcador + atribución
- Guarda en public/images/maps/<slug>-map.png (solo si no existe)
- Caché local de tiles en .cache-tiles/ + throttle 0.2s (política de uso OSM)

Uso:  python3 scripts/generate-static-maps.py [--force]
"""
import os, re, sys, math, time, io, urllib.request

try:
    from PIL import Image, ImageDraw
except ImportError:
    sys.exit("Falta Pillow:  pip3 install pillow --user")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VENUES = os.path.join(ROOT, "src/content/venues")
OUT = os.path.join(ROOT, "public/images/maps")
CACHE = os.path.join(ROOT, ".cache-tiles")
W, H, Z = 1032, 460, 15
UA = "EVENTECH-directorio-staticmap/1.0 (contacto@eventech.mx; generacion unica en build)"
FORCE = "--force" in sys.argv

os.makedirs(OUT, exist_ok=True)
os.makedirs(CACHE, exist_ok=True)

def deg2xy(lat, lng, z):
    n = 2.0 ** z
    x = (lng + 180.0) / 360.0 * n
    y = (1.0 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2.0 * n
    return x, y

_last = [0.0]
def get_tile(z, x, y):
    p = os.path.join(CACHE, f"{z}_{x}_{y}.png")
    if os.path.exists(p):
        return Image.open(p).convert("RGB")
    dt = time.time() - _last[0]
    if dt < 0.2:
        time.sleep(0.2 - dt)
    req = urllib.request.Request(
        f"https://tile.openstreetmap.org/{z}/{x}/{y}.png", headers={"User-Agent": UA})
    data = urllib.request.urlopen(req, timeout=15).read()
    _last[0] = time.time()
    open(p, "wb").write(data)
    return Image.open(io.BytesIO(data)).convert("RGB")

def render(lat, lng, dest):
    cx, cy = deg2xy(lat, lng, Z)
    px, py = cx * 256, cy * 256              # centro en px globales
    left, top = px - W / 2, py - H / 2
    x0, y0 = int(left // 256), int(top // 256)
    x1, y1 = int((left + W) // 256), int((top + H) // 256)
    img = Image.new("RGB", (W, H), "#eee")
    for tx in range(x0, x1 + 1):
        for ty in range(y0, y1 + 1):
            try:
                tile = get_tile(Z, tx, ty)
            except Exception as e:
                print(f"  tile {tx},{ty} fallo: {e}"); continue
            img.paste(tile, (int(tx * 256 - left), int(ty * 256 - top)))
    d = ImageDraw.Draw(img)
    mx, my = W / 2, H / 2
    # marcador: pin dorado con borde navy (colores de marca)
    d.polygon([(mx, my), (mx - 11, my - 22), (mx + 11, my - 22)], fill="#0f1a2b")
    d.ellipse([mx - 13, my - 40, mx + 13, my - 14], fill="#c2a24a", outline="#0f1a2b", width=3)
    d.ellipse([mx - 4, my - 31, mx + 4, my - 23], fill="#0f1a2b")
    # atribución obligatoria
    attr = "© OpenStreetMap contributors"
    tw = d.textlength(attr)
    d.rectangle([W - tw - 12, H - 20, W, H], fill=(255, 255, 255, 200))
    d.text((W - tw - 6, H - 17), attr, fill="#333")
    img.save(dest, "WEBP", quality=78)

def main():
    hechos = saltados = errores = 0
    for root, dirs, files in os.walk(VENUES):
        for f in sorted(files):
            if not f.endswith(".md"):
                continue
            slug = f[:-3]
            dest = os.path.join(OUT, f"{slug}-map.webp")
            if os.path.exists(dest) and not FORCE:
                saltados += 1; continue
            txt = open(os.path.join(root, f)).read()
            m = re.search(r"^coordinates:\s*\n\s*lat:\s*([\-\d.]+)\s*\n\s*lng:\s*([\-\d.]+)", txt, re.M)
            if not m:
                continue
            lat, lng = float(m.group(1)), float(m.group(2))
            if not (19.0 < lat < 20.2 and -100.5 < lng < -98.5):
                print(f"  {slug}: coords fuera de rango ({lat},{lng}) — omitido"); continue
            try:
                render(lat, lng, dest); hechos += 1
                print(f"OK {slug}")
            except Exception as e:
                errores += 1; print(f"ERROR {slug}: {e}")
    print(f"\nmapas generados: {hechos} · ya existentes: {saltados} · errores: {errores}")

if __name__ == "__main__":
    main()
