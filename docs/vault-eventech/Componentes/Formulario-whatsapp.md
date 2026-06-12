# FAQ en dos columnas + formulario WhatsApp

La sección "Preguntas frecuentes" del home se divide en dos columnas (`.hm-faqx`): izquierda el acordeón FAQ (`.hm-faq`, `<details>` nativo), derecha un módulo de formulario que dirige a WhatsApp (`.hm-form`).

## Formulario (`.hm-form`)
- Card homologada: blanco, borde hairline, radio 8px, sombra; eyebrow dorado + título navy.
- Campos: Nombre (required), Tipo de evento (select), Fecha (date), ¿Qué equipo necesitas? (textarea). Inputs con `font-size:16px` para evitar zoom en iOS; focus con borde dorado.
- Botón verde WhatsApp (`#128c4a`) — única excepción de color al palette navy/dorado, por convención de la marca WhatsApp.
- **No hay backend.** Un `<script>` en `index.astro` arma el mensaje con los campos y abre `https://wa.me/{SITE.contact.whatsapp}?text=…` en pestaña nueva. Número desde `data-wa` (no hardcodeado).

## Layout
`.hm-faqx`: grid `1.45fr / 1fr`, aside sticky (`top:24px`). Colapsa a 1 columna y aside estático en ≤860px. El `.hm-faq` pierde su `max-width:820px` dentro de `.hm-faqx`.

## Reglas
- El formulario solo redirige a WhatsApp (acción iniciada por el usuario); no envía datos a servidor ni los pone en la URL salvo el texto del mensaje que el usuario verá antes de enviar.
- Mantener campos mínimos; el cierre real se hace en la conversación.
