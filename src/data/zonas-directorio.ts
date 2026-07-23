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
  // ── Álvaro Obregón (piloto S1) — 16 fichas verificadas ──
  "alvaro-obregon": {
    intro: [
      `El directorio EVENTECH reúne <strong>16 salones y venues para eventos en Álvaro Obregón</strong>, repartidos en colonias como Guadalupe Inn, Cristo Rey, Santa Fe, Colinas de Tarango, San Ángel, San Bartolo Ameyalco, Tetelpan y El Contadero. Hay desde salones familiares accesibles hasta grandes recintos como el Lienzo Charro La Tapatía (hasta 2,500 personas), Atrio Santa Fe (1,250) y el Jardín de Eventos Santa Fe (1,200), aptos para bodas, XV años, fiestas infantiles, congresos y eventos corporativos.`,
      `Las capacidades van de 20 a 2,500 personas y los precios abarcan desde opciones económicas hasta venues premium. Si el salón que elijas renta solo el espacio, EVENTECH lo complementa con <a href="/servicios/mobiliario/">renta de mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio</a> e <a href="/servicios/iluminacion/">iluminación</a>, con entrega y montaje en toda la alcaldía.`,
    ],
    faqs: [
      {
        question: `¿Cuántos salones para eventos hay en Álvaro Obregón?`,
        answer: `En este directorio documentamos 16 venues verificados en Álvaro Obregón: salones de fiestas, jardines de eventos, un lienzo charro, un centro de convenciones y una terraza, en colonias como Guadalupe Inn, Cristo Rey, Santa Fe, Colinas de Tarango, San Ángel, San Bartolo Ameyalco y El Contadero.`,
      },
      {
        question: `¿Cuánto cuesta rentar un salón de fiestas en Álvaro Obregón?`,
        answer: `Los precios varían por venue: hay salones económicos ideales para fiestas familiares (Casa Ángel, Kristel, Pavo Real) y opciones de mayor nivel como Kalesh, Atrio Santa Fe, La Textilera o el Jardín de Eventos Santa Fe, además de grandes recintos como el Lienzo Charro La Tapatía. Cada ficha indica su rango de precio y capacidad; para una cotización exacta conviene contactar directamente al venue.`,
      },
      {
        question: `¿Qué capacidad tienen los salones en Álvaro Obregón?`,
        answer: `Van desde espacios íntimos para 20 personas (Salón Casa Ángel) hasta 2,500 en el Lienzo Charro La Tapatía, con grandes recintos en Santa Fe como Atrio Santa Fe (1,250) y el Jardín de Eventos Santa Fe (1,200). La mayoría de los salones familiares acomoda entre 120 y 350 invitados.`,
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
        answer: `El directorio cubre Guadalupe Inn, Cristo Rey, José María Pino Suárez, Olivar del Conde, Rinconada de Tarango, Colinas de Tarango, Tetelpan, Pueblo de Axotla, Santa Fe, San Bartolo Ameyalco, San Ángel y El Contadero.`,
      },
    ],
  },
};
