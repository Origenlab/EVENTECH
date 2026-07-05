# Análisis Directorio CDMX — Cobertura de Colonias y Calidad de Fichas

**Fecha:** 5 de julio de 2026
**Alcance:** 182 venues CDMX · 24 zonas · 129 colonias únicas declaradas
**Reemplaza el diagnóstico de:** `ANALISIS-DIRECTORIO-CDMX.md` (30 jun 2026, 168 venues)

---

## 1. Resumen ejecutivo

El directorio creció de 168 a 182 venues (+14, todos en Azcapotzalco y Benito Juárez). El trabajo de la auditoría anterior está prácticamente cerrado en datos estructurados: hoy los 182 venues tienen reviews, FAQs, teléfono, coordenadas, CP y seoTitle al 100%. Los problemas vigentes son otros: **las 822 imágenes de galería siguen sin existir en disco** (todas las fichas renderizan 2 thumbs rotos), 14 heroes de los venues nuevos no existen, 9 venues están archivados en la zona equivocada, y la taxonomía de zonas tiene solapamientos que canibalizan SEO. En cobertura, las 16 alcaldías están presentes, pero hay huecos graves en colonias de altísimo valor comercial: Condesa/Hipódromo, Miguel Hidalgo casi entero (Anzures, Anáhuac, Irrigación, Tacubaya, San Miguel Chapultepec), Mixcoac, Coapa, Coyoacán Centro y Clavería.

---

## 2. Cobertura actual (182 venues / 24 zonas)

| Zona | Venues | Colonias cubiertas |
|---|---|---|
| Iztapalapa | 26 | San Lucas, San Pablo, Constitución de 1917, Ejército de Oriente, El Manto, Granjas Estrella, Hidalgo Monroy, La Asunción, Leyes de Reforma (+3ra Secc), Peña Alta, Reforma Política, San Andrés Tetepilco, San Miguel, San Pedro, Sta Martha Acatitla, Sta María Aztahuacán, Santiago Acahualtepec |
| Gustavo A. Madero | 19 | 15 de Agosto, Acueducto de Guadalupe, Ampl. Gabriel Hernández, Aragón, DM Nacional, Industrial, Lindavista, Martín Carrera, Nueva Atzacoalco, San Juan de Aragón, Sta Isabel Tola, Tepeyac (+Insurgentes), Vallejo |
| Azcapotzalco | 15 | Azcapotzalco Centro, Cosmopolita, El Recreo, Ferrería, Industrial Vallejo, La Preciosa, Nextengo, Pasteros, Prados del Rosario, Pro Hogar, San Andrés, San Juan Tlihuaca, Sta Cruz Acayucan |
| Benito Juárez | 12 | Del Valle (Centro/Norte), Guadalupe Inn, Narvarte Pte, Nápoles, Portales Sur, Sta Cruz Atoyac |
| Tlalpan | 11 | Tlalpan Centro, Huipulco, Héroes de Padierna, Pedregal de Carrasco, Pedregal de San Nicolás, San Pedro Mártir, Toriello Guerra |
| Álvaro Obregón | 10 | Cristo Rey, El Contadero, Pino Suárez, Olivar del Conde, Axotla, Rinconada de Tarango, San Ángel Inn, Tizapán |
| Coyoacán | 9 | Del Carmen, La Concepción, Pedregal de Sta Úrsula, Pedregal de Sto Domingo, Perisur, Sta Úrsula Coapa |
| Cuauhtémoc | 9 | Centro Histórico, Escandón, Juárez, Roma Norte, Sta María la Ribera, Tabacalera, Tlatelolco |
| Xochimilco | 9 | Barrio 18, Centro, La Noria, Nativitas, San Gregorio Atlapulco, Santiago Tulyehualco, Valle Escondido |
| Polanco | 8 | Polanco, Los Morales, Nueva Anzures (+3 misfiled: Centro Histórico, Juárez, Reforma) |
| Roma-Condesa | 6 | Roma Norte (4), Condesa (1), frontera Cuauhtémoc (1) |
| Magdalena Contreras | 6 | La Magdalena, Pueblo Nuevo Bajo, San Bernabé Ocotepec, San Jerónimo Lídice |
| Tláhuac | 5 | Conchita B, Miguel Hidalgo, San José, San Miguel Zapotitla, Sta Catarina Yecahuizotl |
| Cuajimalpa | 4 | Cuajimalpa Centro, Ahuatenco, San Lorenzo Acopilco |
| Iztacalco | 4 | Agrícola Oriental (3), Ex-Ejido Magdalena Mixhuca |
| Milpa Alta | 4 | Villa Milpa Alta, Sta Martha, "Mehiko" (⚠️ verificar nombre) |
| Santa Fe | 4 | Santa Fe (3) + Citibanamex misfiled (Lomas de Sotelo) |
| Venustiano Carranza | 4 | Aviación Civil, Damián Carmona, Moctezuma 1ra/2da Secc |
| Del Valle | 3 | Del Valle Centro |
| Lomas Chapultepec | 3 | Lomas de Chapultepec (2) + Soumaya misfiled (Granada) |
| Miguel Hidalgo | 3 | Deportivo Pensil + 2 misfiled (Polanco, Roma Norte) |
| Pedregal | 3 | Jardines del Pedregal, Pedregal de San Ángel |
| San Ángel | 3 | San Ángel |
| Centro Histórico | 2 | Centro Histórico |

Las 16 alcaldías tienen presencia. La cobertura real por colonia es de ~125 colonias (tras normalizar duplicados de nombre) de las ~1,800 colonias de CDMX — correcto para un directorio curado, pero mal distribuida (ver §3).

---

## 3. Colonias faltantes en CDMX (priorizadas por valor comercial)

### Prioridad ALTA — demanda alta de eventos, cero cobertura

| Colonia | Alcaldía | Por qué importa |
|---|---|---|
| **Hipódromo / Hipódromo Condesa** | Cuauhtémoc | Corazón Condesa; solo hay 1 venue "Condesa" en todo el directorio |
| **Anzures** | Miguel Hidalgo | Corporativo/social premium junto a Polanco |
| **Anáhuac** | Miguel Hidalgo | Alta densidad de salones medianos |
| **Irrigación / Granadas / Ampl. Granada** | Miguel Hidalgo | Zona Soumaya-Antara-Carso, eventos corporativos; Soumaya hoy está misfiled en Lomas |
| **San Miguel Chapultepec** | Miguel Hidalgo | Bodas boutique, galerías, terrazas |
| **Mixcoac** | Benito Juárez | Salones tradicionales, alta búsqueda local |
| **Ciudad de los Deportes / Nochebuena** | Benito Juárez | Zona Plaza México-Estadio, banquetes |
| **Coapa (Villa Coapa, Ex Hacienda, Vergel)** | Tlalpan/Coyoacán | Enorme demanda familiar del sur; hoy 0 venues |
| **Coyoacán Centro ampliado (Barrio Sta Catarina, San Francisco)** | Coyoacán | Solo 1 venue en Del Carmen; icónico para bodas civiles |
| **Clavería / Nueva Santa María** | Azcapotzalco | Colonias clásicas de salones; 15 venues en la alcaldía pero 0 aquí |
| **Jardín Balbuena** | Venustiano Carranza | La colonia de eventos de VC; hoy solo 4 venues periféricos |
| **Lindavista ampliada / La Villa** | GAM | Turismo religioso + eventos; solo 2 en Lindavista |

### Prioridad MEDIA

| Colonia | Alcaldía |
|---|---|
| Doctores / Obrera | Cuauhtémoc |
| San Rafael / Guerrero | Cuauhtémoc |
| Zona Rosa (Juárez ampliado) | Cuauhtémoc |
| Vertiz Narvarte / Letrán Valle / Portales Norte | Benito Juárez |
| San Pedro de los Pinos / San José Insurgentes | Benito Juárez/AO |
| Las Águilas / Olivar de los Padres / Florida | Álvaro Obregón |
| Copilco / Country Club / Campestre Churubusco | Coyoacán |
| Culhuacán (CTM secciones) | Coyoacán/Iztapalapa |
| Granjas México / Pantitlán / Agrícola Pantitlán | Iztacalco (solo 4 venues) |
| Cuautepec | GAM |
| Fuentes Brotantes / Miguel Hidalgo Tlalpan | Tlalpan |
| Tacuba / Tacubaya | Miguel Hidalgo |
| Merced / Zona Centro-oriente | Venustiano Carranza |

### Prioridad BAJA (completar mapa)

Bosques de las Lomas (Cuajimalpa/MH), Interlomas-frontera (ya cubierto vía Edomex), Tepepan/Santa Cecilia (Xochimilco), Mixquic (Tláhuac), San Antonio Tecómitl (Milpa Alta), Aragón secciones restantes (GAM), Vicente Guerrero/Cabeza de Juárez (Iztapalapa).

**Meta sugerida:** +30 venues en 90 días concentrados en prioridad ALTA → llevaría el directorio a ~212 venues y taparía los huecos donde hoy Google no nos tiene respuesta.

---

## 4. Problemas de calidad vigentes

### 🚨 P1 — Imágenes de galería: 822/822 faltantes
Toda ficha renderiza 2 thumbs rotos (`dr-vgal__thumbs`). 364 imágenes rotas visibles en producción.
**Fix inmediato (1 día):** fallback en `[...slug].astro` — si el archivo no existe en build, usar el hero o no renderizar thumbs.
**Fix real:** pipeline de fotos por venue (Maps/fotos propias/prensa) empezando por los 30 venues featured/premium.

### 🚨 P2 — 14 heroes faltantes (los 14 venues nuevos)
Todos en `azcapotzalco/` y `benito-juarez/` (casa-nextengo, jardin-del-renacimiento, jardin-milan-azc, salon-magico-azc, salon-melody-azc, salon-recreo-azc, salones-centenario, cetro-wtc, gran-salon-del-valle, hyatt-regency-insurgentes, jardin-narvarte, le-crillon, monarquia-coronado-imperial, salon-kary-narvarte). Renderizan placeholder o roto en el hero — la imagen más importante de la ficha.

### 🔴 P3 — 9 venues archivados en zona equivocada

| Venue | Está en | Debe estar en |
|---|---|---|
| azul-historico-terraza | polanco | centro-historico |
| four-seasons-mexico-city | polanco | cuauhtemoc (Juárez/Reforma) |
| st-regis-mexico-city | polanco | cuauhtemoc (Reforma) |
| casa-lamm | miguel-hidalgo | roma-condesa (Roma Norte) |
| restaurante-au-pied-de-cochon | benito-juarez | polanco |
| casa-del-lago | coyoacan | miguel-hidalgo (Bosque de Chapultepec) |
| hacienda-san-angel | coyoacan | san-angel / alvaro-obregon |
| museo-soumaya | lomas-chapultepec | miguel-hidalgo (Granada) |
| centro-citibanamex | santa-fe | miguel-hidalgo (Lomas de Sotelo) |

Además: `coyoacan/terraza-perisur-eventos.md` tiene `zoneSlug: perisur` ≠ carpeta `coyoacan` (ruta rota o huérfana).

### 🟠 P4 — Taxonomía de zonas solapada (canibalización SEO)
Zonas colonia-nivel conviven con alcaldía-nivel y se pisan:
- `centro-historico` (2) vs `cuauhtemoc` con neighborhood Centro Histórico (2)
- `del-valle` (3) vs `benito-juarez` con 5 venues Del Valle
- `san-angel` (3) vs San Ángel Inn/Tizapán en `alvaro-obregon` y `coyoacan`
- `pedregal` (3) vs pedregales de `tlalpan` y `coyoacan`
- `roma-condesa` vs Roma Norte en `cuauhtemoc`
- `lomas-chapultepec` vs `miguel-hidalgo`

**Decisión requerida:** definir regla única (alcaldía = carpeta; colonia = campo `neighborhood` + página de listado filtrada) o mantener zonas premium como excepción documentada, con reglas de asignación escritas en el vault.

### 🟡 P5 — Normalización de nombres de colonia
Duplicados por ortografía: `Santa María Aztahuacan` vs `Aztahuacán` · `Barrio 18` vs `Barrio 18 de Marzo` · `Tlalpan Centro` vs `Centro de Tlalpan` · `La Magdalena` vs `La Magdalena Contreras` · `Del Valle` vs `Del Valle Centro/Norte` · `Cuauhtémoc (frontera con Roma Norte)` (no es nombre de colonia) · `Mehiko` en Milpa Alta (verificar; probable error).

### 🟡 P6 — 22 venues sin WhatsApp
Mayoría instituciones (Palacio de Minería, Casino Español, Citibanamex, Pujol, etc.) donde WA quizá no aplica → agregar campo `contactPreference` o dejar explícito "solo teléfono/email" en la ficha para no mostrar CTA vacío.

---

## 5. Plan de acción (orden de ejecución)

**Semana 1 — Sangrado visual (P1+P2)**
1. Fallback de galería en template (elimina 364 imágenes rotas de golpe).
2. Generar/conseguir los 14 heroes faltantes.
3. Verificar build y deploy (skill deploy-seguridad).

**Semana 2 — Integridad de datos (P3+P5)**
4. Mover los 9 venues misfiled + corregir `terraza-perisur-eventos`. Redirects 301 de las URLs viejas.
5. Normalizar los ~8 nombres de colonia duplicados; congelar catálogo oficial de colonias en el vault.

**Semanas 3-4 — Taxonomía (P4)**
6. Decidir y documentar regla zona/colonia en el vault; aplicar redirects.
7. Crear páginas de listado por colonia para las colonias con 3+ venues (Del Valle, Roma Norte, Agrícola Oriental, Polanco, Santa Fe…) → captura búsquedas "salón de fiestas + colonia".

**Días 30-90 — Expansión (cobertura)**
8. +30 fichas nuevas en colonias prioridad ALTA (§3), con el estándar completo actual (reviews, FAQs, coords, fotos reales desde el día 1).
9. Fotos reales para los 30 venues featured/premium existentes.

---

*Documento generado a partir de análisis programático del contenido en `src/content/venues/cdmx/` (182 archivos). Ver también `ANALISIS-DIRECTORIO-CDMX.md` y `CHECKLIST-MEJORAS-DIRECTORIO.md` en la raíz del repo.*
