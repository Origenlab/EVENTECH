/**
 * ─── Contenido enriquecido por zona del directorio ───
 * Intro + FAQ por alcaldía/municipio para convertir la página de zona en una
 * página de categoría real (SEO local). Solo datos VERIFICABLES de las fichas
 * publicadas de esa zona; el puente a /servicios/ es el modelo comercial EVENTECH.
 *
 * Se llena zona por zona (cadencia semanal). Si una zona NO tiene entrada aquí,
 * la página de zona renderiza igual que antes (sin intro extra ni FAQ).
 *
 * REGLA: cada dato de intro/FAQ debe ser cierto contra las fichas de la zona.
 * No inventar cifras, capacidades ni colonias.
 */

export interface ZonaDirectorioContent {
  /** Párrafos extra de intro (HTML permitido: <strong>, <a>). */
  intro?: string[];
  /** FAQ visibles + FAQPage schema. answer admite HTML (<a>). */
  faqs?: { question: string; answer: string }[];
}

export const zonasDirectorio: Record<string, ZonaDirectorioContent> = {
  // ── Álvaro Obregón (piloto S1) — 9 fichas verificadas ──
  "alvaro-obregon": {
    intro: [
      `El directorio EVENTECH reúne <strong>9 salones y venues para eventos en Álvaro Obregón</strong>, repartidos en colonias como Guadalupe Inn, Cristo Rey, Olivar del Conde, Pino Suárez y El Contadero. Hay desde salones familiares accesibles hasta el Centro de Convenciones Insurgentes —con capacidad para 600 personas— y una terraza en El Contadero, aptos para bodas, XV años, fiestas infantiles y eventos corporativos.`,
      `Las capacidades van de 20 a 600 personas y los precios abarcan desde opciones económicas hasta venues premium. Si el salón que elijas renta solo el espacio, EVENTECH lo complementa con <a href="/servicios/mobiliario/">renta de mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio</a> e <a href="/servicios/iluminacion/">iluminación</a>, con entrega y montaje en toda la alcaldía.`,
    ],
    faqs: [
      {
        question: `¿Cuántos salones para eventos hay en Álvaro Obregón?`,
        answer: `En este directorio documentamos 9 venues verificados en Álvaro Obregón: 7 salones de fiestas, un centro de convenciones y una terraza, en colonias como Guadalupe Inn, Cristo Rey, Olivar del Conde y El Contadero.`,
      },
      {
        question: `¿Cuánto cuesta rentar un salón de fiestas en Álvaro Obregón?`,
        answer: `Los precios varían por venue: hay salones económicos ideales para fiestas familiares (Casa Ángel, Kristel, Pavo Real) y opciones de mayor nivel como el salón premium Kalesh o el Centro de Convenciones Insurgentes. Cada ficha indica su rango de precio y capacidad; para una cotización exacta conviene contactar directamente al venue.`,
      },
      {
        question: `¿Qué capacidad tienen los salones en Álvaro Obregón?`,
        answer: `Van desde espacios íntimos para 20 personas (Salón Casa Ángel) hasta 600 personas en el Centro de Convenciones Insurgentes. La mayoría de los salones acomoda entre 120 y 350 invitados.`,
      },
      {
        question: `¿Qué tipo de eventos puedo hacer en Álvaro Obregón?`,
        answer: `Los venues de la alcaldía son aptos para bodas, XV años, bautizos, fiestas infantiles, cumpleaños y eventos corporativos. La terraza de El Contadero y el centro de convenciones cubren desde eventos sociales íntimos hasta congresos.`,
      },
      {
        question: `¿El salón incluye mobiliario, audio e iluminación?`,
        answer: `Depende del venue; varios rentan solo el espacio. EVENTECH complementa cualquier salón de Álvaro Obregón con <a href="/servicios/mobiliario/">mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio y sonido</a>, <a href="/servicios/iluminacion/">iluminación</a> y <a href="/servicios/audiovisual/pantallas-led/">pantallas</a>, con entrega y montaje incluidos.`,
      },
      {
        question: `¿En qué colonias de Álvaro Obregón hay salones?`,
        answer: `El directorio cubre Guadalupe Inn, Cristo Rey, José María Pino Suárez, Olivar del Conde, Rinconada de Tarango, Pueblo de Axotla y El Contadero.`,
      },
    ],
  },
};
