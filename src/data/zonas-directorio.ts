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
      `Elegir dónde celebrar en Álvaro Obregón es mucho más fácil cuando tienes todas las opciones en un mismo lugar. En este directorio reunimos <strong>16 salones y venues para eventos en Álvaro Obregón</strong>, repartidos entre colonias como Guadalupe Inn, Cristo Rey, Santa Fe, Colinas de Tarango, San Ángel, San Bartolo Ameyalco, Tetelpan y El Contadero. Hay para cada estilo: desde salones familiares y accesibles hasta grandes recintos como el Lienzo Charro La Tapatía (hasta 2,500 personas), Atrio Santa Fe (1,250) o el Jardín de Eventos Santa Fe (1,200), con espacio de sobra para bodas, XV años, fiestas infantiles, congresos y eventos de empresa.`,
      `Aquí caben todos los tamaños y todos los presupuestos —de 20 a 2,500 invitados, desde opciones económicas hasta venues premium—. Y si el salón que te enamora renta solo el espacio, tú no te preocupas por lo demás: EVENTECH lo completa con <a href="/servicios/mobiliario/">renta de mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio</a> e <a href="/servicios/iluminacion/">iluminación</a>, con entrega y montaje en toda la alcaldía.`,
    ],
    faqs: [
      {
        question: `¿Cuántos salones para eventos hay en Álvaro Obregón?`,
        answer: `Documentamos 16 venues verificados en Álvaro Obregón: salones de fiestas, jardines de eventos, un lienzo charro, un centro de convenciones y una terraza. Los encuentras en colonias como Guadalupe Inn, Cristo Rey, Santa Fe, Colinas de Tarango, San Ángel, San Bartolo Ameyalco y El Contadero, cada uno con su ficha, fotos y datos.`,
      },
      {
        question: `¿Cuánto cuesta rentar un salón de fiestas en Álvaro Obregón?`,
        answer: `Hay para todos los bolsillos. Para fiestas familiares con presupuesto cuidado están opciones como Casa Ángel, Kristel o Pavo Real; si buscas algo de más nivel, mira Kalesh, Atrio Santa Fe, La Textilera o el Jardín de Eventos Santa Fe; y para eventos grandes, el Lienzo Charro La Tapatía. Cada ficha muestra su rango de precio y capacidad, y para el número exacto conviene hablar directo con el venue.`,
      },
      {
        question: `¿Qué capacidad tienen los salones en Álvaro Obregón?`,
        answer: `Desde reuniones íntimas de 20 personas (Salón Casa Ángel) hasta 2,500 en el Lienzo Charro La Tapatía, pasando por grandes recintos de Santa Fe como Atrio Santa Fe (1,250) y el Jardín de Eventos Santa Fe (1,200). La mayoría de los salones familiares acomoda cómodamente entre 120 y 350 invitados.`,
      },
      {
        question: `¿Qué tipo de eventos puedo hacer en Álvaro Obregón?`,
        answer: `Prácticamente cualquiera: bodas, XV años, bautizos, fiestas infantiles, cumpleaños y eventos corporativos. La terraza de El Contadero y el centro de convenciones cubren desde reuniones íntimas hasta congresos de varios cientos de asistentes.`,
      },
      {
        question: `¿El salón incluye mobiliario, audio e iluminación?`,
        answer: `Depende del venue; varios rentan solo el espacio. Ahí entra EVENTECH: complementamos cualquier salón de Álvaro Obregón con <a href="/servicios/mobiliario/">mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio y sonido</a>, <a href="/servicios/iluminacion/">iluminación</a> y <a href="/servicios/audiovisual/pantallas-led/">pantallas</a>, con entrega y montaje incluidos, para que tu evento se vea y se escuche impecable.`,
      },
      {
        question: `¿En qué colonias de Álvaro Obregón hay salones?`,
        answer: `El directorio cubre Guadalupe Inn, Cristo Rey, José María Pino Suárez, Olivar del Conde, Rinconada de Tarango, Colinas de Tarango, Tetelpan, Pueblo de Axotla, Santa Fe, San Bartolo Ameyalco, San Ángel y El Contadero.`,
      },
    ],
  },

  // ── Gustavo A. Madero — top demanda (≈150 búsq/mes) ──
  "gustavo-a-madero": {
    intro: [
      `Si tu fiesta es en el norte de la ciudad, aquí empieza la búsqueda. Reunimos <strong>salones y venues para eventos en Gustavo A. Madero</strong>, en colonias como Lindavista, Residencial Zacatenco, San Juan de Aragón, El Risco CTM y Torres Lindavista. Encuentras desde salones familiares hasta grandes recintos como Salones Alvi (hasta 1,200 personas), el Lienzo Charro de La Villa y el Salón Royal Rizzo Lindavista —de los más queridos y reseñados de la zona, con miles de opiniones en Google— listos para bodas, XV años, bautizos, graduaciones y eventos corporativos.`,
      `Hay opciones para cada tamaño de invitación, desde grupos pequeños hasta 1,200 personas, y para cada presupuesto, de lo accesible a lo premium. Y cuando el salón renta solo el espacio, EVENTECH pone el resto: <a href="/servicios/mobiliario/">renta de mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio</a> e <a href="/servicios/iluminacion/">iluminación</a>, con entrega y montaje en toda la alcaldía.`,
    ],
    faqs: [
      {
        question: `¿Cuáles son los mejores salones para eventos en Gustavo A. Madero?`,
        answer: `Los favoritos de la zona son el Salón Royal Rizzo Lindavista, el Lienzo Charro de La Villa y Salones Alvi —cada uno con más de 2,000 opiniones en Google, así que llegas con la tranquilidad de que muchas familias ya celebraron ahí—. En cada ficha ves su calificación, capacidad y ubicación.`,
      },
      {
        question: `¿Qué capacidad tienen los salones en Gustavo A. Madero?`,
        answer: `Desde salones para grupos pequeños hasta grandes recintos como Salones Alvi, con capacidad para hasta 1,200 invitados. Varios acomodan entre 200 y 500 personas, el punto ideal para bodas y XV años sin quedar apretados ni vacíos.`,
      },
      {
        question: `¿En qué colonias de Gustavo A. Madero hay salones de fiestas?`,
        answer: `El directorio cubre colonias como Lindavista, Residencial Zacatenco, San Pedro Zacatenco, San Juan de Aragón, El Risco CTM y Torres Lindavista, entre otras zonas de la alcaldía.`,
      },
      {
        question: `¿Qué tipo de eventos puedo hacer en Gustavo A. Madero?`,
        answer: `Bodas, XV años, bautizos, graduaciones, cumpleaños y eventos corporativos. Y como hay recintos de gran aforo, también funcionan de maravilla para eventos de empresa y convenciones.`,
      },
      {
        question: `¿El salón incluye mobiliario, audio e iluminación?`,
        answer: `Depende del venue; varios rentan solo el espacio. EVENTECH complementa cualquier salón de Gustavo A. Madero con <a href="/servicios/mobiliario/">mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio y sonido</a>, <a href="/servicios/iluminacion/">iluminación</a> y <a href="/servicios/audiovisual/pantallas-led/">pantallas</a>, con entrega y montaje.`,
      },
    ],
  },

  // ── Iztapalapa — top demanda (≈100 búsq/mes) ──
  "iztapalapa": {
    intro: [
      `En el oriente de la ciudad hay salones con mucha tradición fiestera, y aquí los reunimos todos. Este es el directorio de <strong>salones y venues para eventos en Iztapalapa</strong>, en colonias como Progresista, Leyes de Reforma, Paseos de Churubusco y Ejido del Moral. Vas desde salones familiares hasta recintos muy populares como el Salón El Potrero (hasta 530 personas, con más de 2,200 opiniones en Google) o Eventos Casablanca, perfectos para bodas, XV años, bautizos, graduaciones y esas celebraciones familiares que se recuerdan por años.`,
      `Hay tamaños para todos —desde grupos pequeños hasta más de 500 invitados— y presupuestos para todos, incluidos salones con banquete incluido. Y si el salón renta solo el espacio, EVENTECH lo complementa con <a href="/servicios/mobiliario/">renta de mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio</a> e <a href="/servicios/iluminacion/">iluminación</a>, con entrega y montaje en toda la alcaldía.`,
    ],
    faqs: [
      {
        question: `¿Cuáles son los mejores salones para eventos en Iztapalapa?`,
        answer: `Los más recomendados son el Salón El Potrero (4.6 en Google con más de 2,200 opiniones), Eventos Casablanca y el Salón Grissel. Son de esos lugares donde la gente vuelve y recomienda; en cada ficha ves su calificación, capacidad y ubicación.`,
      },
      {
        question: `¿Qué capacidad tienen los salones en Iztapalapa?`,
        answer: `Desde salones para grupos pequeños hasta recintos como el Salón El Potrero, con capacidad para hasta 530 invitados. Muchos acomodan entre 100 y 500 personas, el rango ideal para bodas y XV años.`,
      },
      {
        question: `¿En qué colonias de Iztapalapa hay salones de fiestas?`,
        answer: `El directorio cubre colonias como Progresista, Leyes de Reforma, Paseos de Churubusco y Ejido del Moral, entre otras zonas de la alcaldía.`,
      },
      {
        question: `¿Qué tipo de eventos puedo hacer en Iztapalapa?`,
        answer: `Bodas, XV años, bautizos, graduaciones, cumpleaños y primeras comuniones. Un plus de la zona: muchos salones cuentan con servicio de banquete propio, así resuelves espacio y comida en un solo lugar.`,
      },
      {
        question: `¿El salón incluye mobiliario, audio e iluminación?`,
        answer: `Depende del venue; varios rentan solo el espacio o incluyen banquete. EVENTECH complementa cualquier salón de Iztapalapa con <a href="/servicios/mobiliario/">mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio y sonido</a>, <a href="/servicios/iluminacion/">iluminación</a> y <a href="/servicios/audiovisual/pantallas-led/">pantallas</a>, con entrega y montaje.`,
      },
    ],
  },

  // ── Coyoacán — "salón de fiestas coyoacan" ≈70 búsq/mes (KD 12) ──
  "coyoacan": {
    intro: [
      `Coyoacán tiene ese encanto que convierte cualquier celebración en algo especial, y aquí encuentras dónde vivirlo. Reunimos <strong>salones y venues para eventos en Coyoacán</strong>, en colonias como Ciudad Universitaria, San Francisco, Presidentes Ejidales, Campestre Churubusco, Los Reyes, Cafetales y Bosques de Tetlameya. Hay desde salones íntimos hasta grandes recintos como Casa Club del Académico (hasta 1,000 personas), el Salón Gran Fórum y el Centro Veracruzano —de los más reseñados de la zona, con miles de opiniones en Google—, listos para bodas, XV años, bautizos, graduaciones y eventos de empresa.`,
      `Las capacidades van de 40 hasta 3,000 invitados y hay para cada presupuesto, con menús que arrancan desde $165 por persona y llegan hasta venues premium. Cuando el salón renta solo el espacio, EVENTECH pone la producción: <a href="/servicios/mobiliario/">renta de mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio</a> e <a href="/servicios/iluminacion/">iluminación</a>, con entrega y montaje en toda la alcaldía.`,
    ],
    faqs: [
      {
        question: `¿Cuáles son los mejores salones para eventos en Coyoacán?`,
        answer: `Los más reseñados son Casa Club del Académico (4.5 en Google con más de 14,000 opiniones), el Centro Veracruzano y el Salón Gran Fórum, todos con miles de opiniones a favor. En cada ficha ves su calificación, capacidad y ubicación para comparar sin complicarte.`,
      },
      {
        question: `¿Cuánto cuesta rentar un salón de fiestas en Coyoacán?`,
        answer: `Para todos los presupuestos: hay opciones accesibles con menús desde $165 por persona (Salón París), salones de nivel medio como Terraza 1810, Salón Brescia y Los Candiles, y venues premium como Los Luceros, el Centro Veracruzano y Casa Club del Académico. Cada ficha indica su rango de precio y capacidad; para el número exacto, lo mejor es contactar directo al venue.`,
      },
      {
        question: `¿Qué capacidad tienen los salones en Coyoacán?`,
        answer: `Desde espacios íntimos para 40 personas (Salón París) hasta 3,000 en el Salón Gran Fórum, con recintos de gran aforo como Casa Club del Académico (1,000) y Banquetes Casino Tlalpan (700). La mayoría acomoda entre 100 y 350 invitados, ideal para bodas y XV años.`,
      },
      {
        question: `¿En qué colonias de Coyoacán hay salones de fiestas?`,
        answer: `El directorio cubre colonias como Ciudad Universitaria, San Francisco, Presidentes Ejidales, Campestre Churubusco, Campestre Coyoacán (Coapa), Los Reyes, Residencial Cafetales, Hacienda de Coyoacán y Bosques de Tetlameya, entre otras zonas de la alcaldía.`,
      },
      {
        question: `¿Qué tipo de eventos puedo hacer en Coyoacán?`,
        answer: `Bodas, XV años, bautizos, primeras comuniones, graduaciones, cumpleaños y eventos corporativos. Y para algo de mayor formato, venues como Casa Club del Académico y el Salón Gran Fórum también reciben cenas de gala, convenciones y congresos.`,
      },
      {
        question: `¿El salón incluye mobiliario, audio e iluminación?`,
        answer: `Depende del venue; varios rentan solo el espacio o incluyen banquete. EVENTECH complementa cualquier salón de Coyoacán con <a href="/servicios/mobiliario/">mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio y sonido</a>, <a href="/servicios/iluminacion/">iluminación</a> y <a href="/servicios/audiovisual/pantallas-led/">pantallas</a>, con entrega y montaje.`,
      },
    ],
  },

  // ── Benito Juárez — head terms "salones para eventos cdmx" (100) + "salon de fiestas benito juarez" (10) ──
  "benito-juarez": {
    intro: [
      `Narvarte, Del Valle, Nápoles… Benito Juárez es de las zonas con más vida para celebrar, y aquí tienes sus mejores espacios en un solo lugar. Reunimos <strong>salones y venues para eventos en Benito Juárez</strong>, en colonias como Narvarte, Del Valle, Nápoles, Portales, Mixcoac, Moderna y Miravalle. Vas desde galerías boutique y salones tipo loft hasta grandes recintos como el Salón Villa Flamingos (hasta 1,100 personas) y salones muy queridos como D'Rubí —con cientos de opiniones en Google—, para bodas, XV años, bautizos, graduaciones y eventos corporativos en el centro-sur de la ciudad.`,
      `Hay opciones para toda invitación —desde eventos íntimos de 20 personas hasta 1,100 invitados— y para todo presupuesto, con menús desde $235 por persona hasta venues premium. Y si el espacio se renta sin servicios, EVENTECH lo completa con <a href="/servicios/mobiliario/">renta de mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio</a> e <a href="/servicios/iluminacion/">iluminación</a>, con entrega y montaje en toda la alcaldía.`,
    ],
    faqs: [
      {
        question: `¿Cuáles son los mejores salones para eventos en Benito Juárez?`,
        answer: `Los mejor calificados son el Salón Loft Amores del Valle (4.8 en Google) y Galería Málaga (4.7), junto con clásicos muy reseñados como el Salón Villa Flamingos y D'Rubí, con cientos o miles de opiniones. En cada ficha ves su calificación, capacidad y ubicación.`,
      },
      {
        question: `¿Cuánto cuesta rentar un salón de fiestas en Benito Juárez?`,
        answer: `Para todos los presupuestos: opciones accesibles con menús desde $235 por persona (Sranders, Salón Amigos), salones de nivel medio como Miravalle y el Salón Nápoles, y venues con más personalidad como Grupo Cardiel, D'Rubí y Galería Málaga. Cada ficha indica su rango de precio y capacidad; para la cotización exacta, contacta directo al venue.`,
      },
      {
        question: `¿Qué capacidad tienen los salones en Benito Juárez?`,
        answer: `Desde espacios íntimos para 20 personas (Galería Málaga, Sranders) hasta 1,100 en el Salón Villa Flamingos, con recintos de buen aforo como Grupo Cardiel (800) y D'Rubí (500). La mayoría acomoda entre 100 y 400 invitados, ideal para bodas y XV años.`,
      },
      {
        question: `¿En qué colonias de Benito Juárez hay salones de fiestas?`,
        answer: `El directorio cubre colonias como Narvarte, Del Valle, Ampliación Nápoles, Portales Sur, Insurgentes Mixcoac, Moderna, Merced Gómez y Miravalle, entre otras zonas de la alcaldía.`,
      },
      {
        question: `¿Qué tipo de eventos puedo hacer en Benito Juárez?`,
        answer: `Bodas, XV años, bautizos, primeras comuniones, graduaciones, cumpleaños y eventos corporativos. Y espacios con más diseño, como Galería Málaga y el Salón Loft, son perfectos también para cenas de gala, lanzamientos de marca y reuniones de empresa.`,
      },
      {
        question: `¿El salón incluye mobiliario, audio e iluminación?`,
        answer: `Depende del venue; varios rentan solo el espacio o incluyen banquete. EVENTECH complementa cualquier salón de Benito Juárez con <a href="/servicios/mobiliario/">mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio y sonido</a>, <a href="/servicios/iluminacion/">iluminación</a> y <a href="/servicios/audiovisual/pantallas-led/">pantallas</a>, con entrega y montaje.`,
      },
    ],
  },

  // ── Miguel Hidalgo — alcaldía premium (Polanco/Anzures/Lomas/Chapultepec) ──
  "miguel-hidalgo": {
    intro: [
      `Si tu evento pide un marco a la altura, Miguel Hidalgo es la zona. Reunimos <strong>salones y venues premium para eventos en Miguel Hidalgo</strong>, en colonias como Anzures, Lomas de Chapultepec, Tacubaya y el Bosque de Chapultepec. Es lo más exclusivo de la ciudad: desde grandes salones con capilla como Monarquía Coronado Excelencia (hasta 1,200 personas) y jardines dentro de Chapultepec como Banquetes Foresta, hasta sedes irrepetibles como el Museo Casa de la Bola y Lago Algo —restaurante y espacio cultural sobre el lago—, ideales para bodas, cenas de gala y eventos corporativos de alto nivel.`,
      `Encuentras desde experiencias íntimas de 20 personas hasta 1,200 invitados, con menús premium de $750 a $5,000 por persona en las sedes de mayor nivel. Y cuando el venue se renta como espacio, EVENTECH aporta la producción completa: <a href="/servicios/mobiliario/">mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio</a>, <a href="/servicios/iluminacion/">iluminación</a> y <a href="/servicios/audiovisual/pantallas-led/">pantallas</a>, con entrega y montaje en toda la alcaldía.`,
    ],
    faqs: [
      {
        question: `¿Cuáles son los mejores venues para eventos en Miguel Hidalgo?`,
        answer: `Los mejor calificados son el Museo Casa de la Bola (4.6 en Google), Studio Gourmet (4.7) y Monarquía Coronado Excelencia (4.5), junto con Banquetes Foresta y Lago Algo, ambos con miles de opiniones. En cada ficha ves su calificación, capacidad y ubicación.`,
      },
      {
        question: `¿Cuánto cuesta un evento en Miguel Hidalgo?`,
        answer: `Es la alcaldía de mayor nivel de la ciudad, y eso se refleja: los menús van de $750 a $5,000 por persona en las sedes premium (Studio Gourmet, Museo Casa de la Bola, Foresta). También hay casas boutique como Casa Picnic, con renta de espacio desde $16,000. Cada ficha indica su rango de precio y capacidad.`,
      },
      {
        question: `¿Qué capacidad tienen los venues en Miguel Hidalgo?`,
        answer: `Desde experiencias íntimas de 20 personas (Studio Gourmet, Lago Algo) hasta 1,200 en Monarquía Coronado Excelencia, con jardines de gran formato como Banquetes Foresta (700). Muchas sedes premium trabajan entre 100 y 400 invitados.`,
      },
      {
        question: `¿Qué colonias de Miguel Hidalgo tienen salones para eventos?`,
        answer: `El directorio cubre Anzures, Verónica Anzures, Lomas de Chapultepec, Tacubaya, San Miguel Chapultepec y el Bosque de Chapultepec, las zonas más exclusivas del poniente de la ciudad.`,
      },
      {
        question: `¿Qué tipo de eventos puedo hacer en Miguel Hidalgo?`,
        answer: `Bodas, cenas de gala, XV años, graduaciones, lanzamientos de marca y eventos corporativos de alto nivel. Y para algo con alma, sedes como el Museo Casa de la Bola y Lago Algo ofrecen un marco histórico o cultural difícil de igualar.`,
      },
      {
        question: `¿El venue incluye mobiliario, audio e iluminación?`,
        answer: `Varias sedes premium se rentan como espacio o incluyen banquete, pero no producción técnica. Ahí entra EVENTECH: complementamos cualquier venue de Miguel Hidalgo con <a href="/servicios/mobiliario/">mobiliario</a>, <a href="/servicios/audiovisual/sonido/">audio y sonido</a>, <a href="/servicios/iluminacion/">iluminación</a> y <a href="/servicios/audiovisual/pantallas-led/">pantallas</a>, con entrega y montaje.`,
      },
    ],
  },
};
