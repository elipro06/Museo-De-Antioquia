import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../components/layout/Footer/Footer';
import { createMuseumChat, isGeminiConfigured } from '../../gemini-guia';
import { translatePlainText, useLanguage } from '../../i18n/LanguageContext';
import { exposiciones } from '../../data/exposiciones';
import { eventosData } from '../../data/eventos';
import { arteYArtistas } from '../../data/arteYArtistas';
import { obras } from '../../data/obras';
import { getPdfKnowledgeEntries, PDF_KNOWLEDGE_ENTRIES } from '../../utils/chatbotKnowledge';
import {
  hasApproxPhrase,
  findApproxKeyword,
  hasMeaningfulSignal,
  normalizeText as normalizeInputText,
  tokenizeText,
} from '../../utils/chatbotText';
import styles from './ChatBotRecorrido.module.css';

const SALAS = [
  {
    id: 'botero', nombre: 'Sala Fernando Botero', piso: 3, duracion: 30,
    tags: ['arte colombiano', 'pintura', 'escultura', 'iconos', 'figuras volumetricas', 'donaciones', 'arte clasico'],
    descripcion: 'Cara a cara con el maestro mas universal de Colombia. Pinturas, esculturas y dibujos. No se permiten fotos.',
    icono: 'ðŸŽ¨'
  },
  {
    id: 'internacional', nombre: 'Sala Internacional Sophia Vari', piso: 3, duracion: 25,
    tags: ['arte internacional', 'vanguardias', 'surrealismo', 'abstracto', 'Rodin', 'Lam', 'Tamayo', 'Ernst', 'Frankenthaler', 'escultura moderna'],
    descripcion: 'Donacion de Botero: obras de Rodin, Wifredo Lam, Max Ernst, Rufino Tamayo, Helen Frankenthaler y mas.',
    icono: 'ðŸŒ'
  },
  {
    id: 'modernidad', nombre: 'Promesas de la Modernidad', piso: 2, duracion: 20,
    tags: ['arte moderno', 'siglo XX', 'Bienales Coltejer', 'Colombia', 'historia del arte', 'arte urbano', '1950', '1999'],
    descripcion: 'Arte colombiano de 1950 a 1999: Bienales de Coltejer y la generacion urbana.',
    icono: 'ðŸ™ï¸'
  },
  {
    id: 'historias', nombre: 'Historias para Repensar', piso: 2, duracion: 20,
    tags: ['historia', 'critica', 'siglo XIX', 'fotografia', 'grabado', 'arte antioqueno', 'Carlos Correa', 'colonialismo'],
    descripcion: 'Dialogo entre obras del siglo XIX e inicios XX con arte contemporaneo. Incluye fotografia historica.',
    icono: 'ðŸ“–'
  },
  {
    id: 'mural', nombre: 'Sala Mural Botero', piso: 2, duracion: 10,
    tags: ['mural', 'Botero', 'pintura grande', 'escena', 'jinete'],
    descripcion: "El imponente mural 'Escena con jinete' de Fernando Botero.",
    icono: 'ðŸ–¼ï¸'
  },
  {
    id: 'barro', nombre: 'El Barro Tiene Voz', piso: 1, duracion: 20,
    tags: ['ceramica', 'prehispanico', 'artesania', 'cultura', 'historia precolombina', 'tradicion', 'Raquira', 'La Chamba', 'Colombia profunda'],
    descripcion: 'Piezas ceramicas prehispanicas, artesanales y arte contemporaneo que dialogan a traves del barro.',
    icono: 'ðŸº'
  },
  {
    id: 'dogma', nombre: 'Persistencia del Dogma', piso: 1, duracion: 20,
    tags: ['religion', 'colonial', 'critica', 'identidad', 'historia', 'poder', 'sociedad', 'ideologia'],
    descripcion: '150 obras desde el periodo precolombino hasta hoy. Cerrada temporalmente - verificar disponibilidad.',
    icono: '♪', cerrada: true
  },
  {
    id: 'variaciones', nombre: 'Variaciones del Presente', piso: 1, duracion: 15,
    tags: ['contemporaneo', 'comunidad', 'arte actual', 'Museo 360', 'experimental', 'participativo'],
    descripcion: 'Arte del presente en dialogo con las comunidades del entorno. Proceso de 10 anos.',
    icono: '✨'
  },
  {
    id: 'derivas', nombre: 'Derivas de lo indeleble', piso: -1, duracion: 20,
    tags: ['trans', 'diversidad', 'contemporaneo', 'identidad', 'politica', 'cuerpo', 'memoria', 'urgente', 'disidencia'],
    descripcion: 'Exposicion temporal Trans/Travesti. Acto politico y afectivo. Disponible hasta el 12 de abril.',
    icono: 'ðŸŒˆ', temporal: true
  },
  {
    id: 'simulacro', nombre: 'Simulacro de lo Imposible', piso: -1, duracion: 20,
    tags: ['contemporaneo', 'critica', 'simulacion', 'poder', 'ironia', 'satira', 'crisis', 'experimental'],
    descripcion: 'Laboratorio artistico sobre el artificio como estrategia critica. Cuatro espacios de exploracion.',
    icono: 'ðŸŽ­', temporal: true
  },
  {
    id: 'frijol', nombre: 'Uno de Frijol Cuatro de Maiz', piso: -1, duracion: 15,
    tags: ['alimento', 'cultura', 'cotidiano', 'Colombia', 'historia', 'bodegon', 'comida', 'identidad'],
    descripcion: 'El alimento como archivo cultural. Maiz, frijol, la mesa como espacio politico.',
    icono: 'ðŸŒ½', temporal: true
  }
];

const LOCAL_SCOPE_KEYWORDS = [
  'museo', 'museum', 'antioquia', 'botero', 'arte', 'art', 'artist', 'artists', 'obra', 'obras', 'gallery', 'galleries', 'sala', 'salas',
  'exhibicion', 'exhibiciones', 'exhibition', 'exhibitions', 'coleccion', 'collection', 'restaurant', 'restaurante', 'cafe', 'coffee',
  'tienda', 'store', 'parking', 'parqueadero', 'ticket', 'tickets', 'tarifa', 'price', 'precio', 'hours', 'horario', 'visit', 'visita',
  'route', 'recorrido', 'tour', 'guided', 'map', 'mapa', 'audio guide', 'audioguia', 'audioguia', 'biblioteca', 'library', 'educacion',
  'education', 'programa', 'program', 'metro', 'bus', 'carro', 'car', 'ubicacion', 'location', 'direccion', 'address', 'mascotas', 'pets',
  'evento', 'eventos', 'event', 'events',
  'espacio', 'espacios', 'space', 'spaces', 'servicio', 'servicios', 'service', 'services', 'bano', 'banos', 'bathroom', 'bathrooms',
  'accessibility', 'accesibilidad', 'wheelchair', 'silla de ruedas', 'casa del encuentro', 'visual lab', 'dialogos con sentido',
  'exploradores del arte', 'yo maestre', 'laboratorio de mediacion', 'museo 360', 'pedrito botero', 'bukz'
];

const LOCAL_REJECTION = {
  es: 'Puedo ayudarte con informacion del Museo de Antioquia: salas, exposiciones, artistas, recorridos, horarios, tarifas, restaurantes, accesos y servicios. No respondo temas ajenos al museo.',
  en: 'I can help with information about the Museum of Antioquia: galleries, exhibitions, artists, routes, opening hours, tickets, restaurants, access, and visitor services. I do not answer topics unrelated to the museum.'
};

const THEME_ALIASES = [
  ['contemporary', ['contemporary', 'contemporaneo', 'contemporary art', 'arte contemporaneo', 'arte actual', 'experimental']],
  ['identity', ['identity', 'identidad', 'trans', 'diversidad', 'memory', 'memoria', 'body', 'cuerpo']],
  ['modern', ['modern', 'moderno', 'modernity', 'modernidad', 'urban art', 'arte urbano']],
  ['history', ['history', 'historia', 'historical', 'critica', 'colonial', 'colonialismo', 'siglo xix', 'xix century']],
  ['clay', ['clay', 'barro', 'ceramica', 'ceramics', 'prehispanico', 'precolumbian']],
  ['temporary', ['temporary', 'temporales', 'temporal', 'temporary exhibition', 'temporary exhibitions', 'exposicion temporal', 'exposiciones temporales']],
  ['botero', ['botero', 'fernando botero', 'figuras volumetricas', 'volume', 'volumen']],
  ['international', ['international', 'internacional', 'sophia vari', 'rodin', 'tamayo', 'lam', 'frankenthaler']],
  ['mural', ['mural', 'jinete', 'horseman']],
];

const ARTIST_SUMMARIES = {
  'Fernando Botero': {
    es: 'Fernando Botero es una figura central del museo. Sus salas reunen pinturas, dibujos, acuarelas y esculturas donde trabaja volumen, historia del arte, iconografia religiosa y escenas de la vida cotidiana colombiana.',
    en: 'Fernando Botero is a central figure in the museum. His galleries bring together paintings, drawings, watercolors, and sculptures where he explores volume, art history, religious iconography, and scenes from Colombian everyday life.',
  },
  'Carlos Correa': {
    es: 'Carlos Correa destaca por una mirada critica e ironica sobre la sociedad. En Historias para Repensar sus obras ayudan a revisar la historia cultural y politica de Antioquia desde el grabado y la imagen satirica.',
    en: 'Carlos Correa stands out for a critical and ironic view of society. In Histories to Rethink, his works help revisit the cultural and political history of Antioquia through printmaking and satirical imagery.',
  },
  'Auguste Rodin': {
    es: 'Auguste Rodin aparece en la Sala Internacional como una referencia clave para pensar la modernidad en escultura. Su obra cuestiona como un fragmento corporal puede expresar emocion, tension y presencia.',
    en: 'Auguste Rodin appears in the International Gallery as a key reference for understanding modern sculpture. His work asks how a bodily fragment can express emotion, tension, and presence.',
  },
  'Wifredo Lam': {
    es: 'Wifredo Lam ocupa un lugar clave en la Sala Internacional. Su obra permite pensar cruces entre vanguardias europeas, herencia afrocaribena, identidad mestiza y debates sobre descolonizacion.',
    en: 'Wifredo Lam holds a key place in the International Gallery. His work helps connect European avant-gardes, Afro-Caribbean heritage, mestizo identity, and debates around decolonization.',
  },
  'Max Ernst': {
    es: 'Max Ernst es una figura fundamental de las vanguardias del siglo XX. En el museo aparece como referencia del surrealismo y de una imaginacion experimental marcada por la crisis del mundo moderno.',
    en: 'Max Ernst is a major figure of the twentieth-century avant-gardes. In the museum he appears as a reference for surrealism and for an experimental imagination shaped by the crises of the modern world.',
  },
  'Rufino Tamayo': {
    es: 'Rufino Tamayo aporta a la Sala Internacional una pintura donde color, figura y modernidad latinoamericana dialogan con preguntas mas amplias sobre identidad y lenguaje visual.',
    en: 'Rufino Tamayo contributes to the International Gallery with a painting where color, figuration, and Latin American modernity engage broader questions about identity and visual language.',
  },
  'Helen Frankenthaler': {
    es: 'Helen Frankenthaler representa una exploracion decisiva de color y superficie. Su presencia en la Sala Internacional abre una lectura sobre abstraccion, gesto y expansion del lenguaje pictorico.',
    en: 'Helen Frankenthaler represents a decisive exploration of color and surface. Her presence in the International Gallery opens a reading of abstraction, gesture, and the expansion of painterly language.',
  },
  'Sophia Vari': {
    es: 'Sophia Vari da nombre a la sala internacional y conecta escultura, collage y una mirada amplia sobre dialogos entre formas, volumenes y tradiciones artisticas diversas.',
    en: 'Sophia Vari gives her name to the international gallery and connects sculpture, collage, and a broad view of dialogues between forms, volumes, and diverse artistic traditions.',
  },
};

const ARTIST_ALIASES = {
  'Jaques Lipchitz': ['jacques lipchitz', 'jaques lipchitz', 'lipchitz'],
  'Wifredo Lam': ['wifredo lam', 'lam'],
  'Auguste Rodin': ['auguste rodin', 'rodin'],
  'Max Ernst': ['max ernst', 'ernst'],
  'Rufino Tamayo': ['rufino tamayo', 'tamayo'],
  'Helen Frankenthaler': ['helen frankenthaler', 'frankenthaler'],
  'Sophia Vari': ['sophia vari', 'vari'],
  'Fernando Botero': ['fernando botero', 'botero'],
};

const PDF_ENTRY_BY_ID = Object.fromEntries(PDF_KNOWLEDGE_ENTRIES.map((entry) => [entry.id, entry]));

const PDF_TOPIC_ENTRY_IDS = {
  horarios: ['horarios-tarifas-visita'],
  tarifas: ['horarios-tarifas-visita'],
  ubicacion: ['como-llegar-parqueadero'],
  recorridos: ['recorridos-grupos'],
  tienda: ['tienda'],
  restaurante: ['restaurantes-servicios'],
  educacion: ['programas-educacion'],
  grupos: ['recorridos-grupos'],
  parqueadero: ['como-llegar-parqueadero'],
  mascotas: ['horarios-tarifas-visita'],
  normas: ['horarios-tarifas-visita'],
  mapas: ['pisos-espacios-servicios'],
  biblioteca: ['biblioteca'],
  general: ['museo-360', 'pisos-espacios-servicios'],
};

function buildPdfEntryResponse(entryIds, language) {
  const uniqueIds = Array.from(new Set(entryIds));
  const texts = uniqueIds
    .map((entryId) => PDF_ENTRY_BY_ID[entryId])
    .filter(Boolean)
    .map((entry) => language === 'en' ? entry.textEn : entry.textEs);

  return texts.length > 0 ? texts.join('\n\n') : null;
}

function hasIntentKeyword(text, keywords) {
  const normalizedText = normalizeText(text);
  const textTokens = new Set(tokenizeText(normalizedText));

  return keywords.some((keyword) => {
    const normalizedKeyword = normalizeText(keyword);

    if (!normalizedKeyword) {
      return false;
    }

    if (normalizedKeyword.includes(' ')) {
      return normalizedText.includes(normalizedKeyword) || hasApproxPhrase(normalizedText, normalizedKeyword);
    }

    if (textTokens.has(normalizedKeyword)) {
      return true;
    }

    return normalizedKeyword.length >= 5 && hasApproxPhrase(normalizedText, normalizedKeyword);
  });
}

function getContext(query, language) {
  const q = normalizeText(query);
  const durationIntent = isDurationIntent(query);
  const pdfContext = getPdfKnowledgeEntries(query, 2)
    .map((entry) => language === 'en' ? entry.textEn : entry.textEs)
    .join('\n\n');
  const map = {
    horario: 'horarios', hora: 'horarios', abre: 'horarios', cierra: 'horarios', cuando: 'horarios', hours: 'horarios', open: 'horarios', close: 'horarios',
    tarifa: 'tarifas', precio: 'tarifas', costo: 'tarifas', entrada: 'tarifas', gratis: 'tarifas', gratuito: 'tarifas', ticket: 'tarifas', tickets: 'tarifas', price: 'tarifas', prices: 'tarifas',
    llegar: 'ubicacion', metro: 'ubicacion', direccion: 'ubicacion', donde: 'ubicacion', ubicacion: 'ubicacion', location: 'ubicacion', address: 'ubicacion', bus: 'ubicacion', car: 'ubicacion',
    recorrido: 'recorridos', guia: 'recorridos', mediado: 'recorridos', tour: 'recorridos', route: 'recorridos', routes: 'recorridos', guided: 'recorridos',
    tienda: 'tienda', comprar: 'tienda', souvenir: 'tienda', store: 'tienda', shop: 'tienda',
    cafe: 'restaurante', comer: 'restaurante', restaurant: 'restaurante', cafeteria: 'restaurante', coffee: 'restaurante', eat: 'restaurante', food: 'restaurante',
    taller: 'educacion', programa: 'educacion', nino: 'educacion', educacion: 'educacion', docente: 'educacion', education: 'educacion', program: 'educacion',
    parqueadero: 'parqueadero', parking: 'parqueadero', carro: 'parqueadero',
    accesibilidad: 'accesibilidad', accessibility: 'accesibilidad', wheelchair: 'accesibilidad',
    mascota: 'mascotas', mascotas: 'mascotas', pet: 'mascotas', pets: 'mascotas',
    mapa: 'mapas', mapas: 'mapas', map: 'mapas', audio: 'mapas', piso: 'mapas', floor: 'mapas',
    regla: 'normas', reglas: 'normas', norma: 'normas', foto: 'normas', flash: 'normas', photography: 'normas',
  };
  const hit = Object.entries(map).find(([key, topic]) => {
    if (durationIntent && topic === 'horarios' && ['hora', 'hours'].includes(key)) {
      return false;
    }

    return hasIntentKeyword(q, [key]);
  });
  const primary = buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS[hit?.[1] || 'general'] || PDF_TOPIC_ENTRY_IDS.general, language);
  const general = buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.general, language);

  return [primary, pdfContext, general].filter(Boolean).join('\n\n');
}

function getSystemPrompt(language) {
  if (language === 'en') {
    return `You are the virtual guide of the Museum of Antioquia in Medellin. Your MAIN purpose is to answer questions about the museum and plan personalized routes when the visitor asks for one.

GENERAL BEHAVIOR:
1. Answer only questions related to the Museum of Antioquia: galleries, exhibitions, artists, artworks, opening hours, tickets, access, restaurants, store, parking, visitor rules, education, and guided visits.
2. If the question is unrelated to the museum, politely refuse and redirect the conversation to museum topics.
3. For factual museum information, use only the provided museum dossier context. If the context does not confirm something, say you cannot confirm it.
4. If the visitor is asking for a route, ask for or use their available time and interests.
5. If the visitor is asking for information, answer directly and precisely without forcing a route.

FLOW FOR PLANNING A ROUTE:
1. Identify the kinds of art that interest the visitor and how much time they have.
2. Generate a route with specific galleries in logical floor order, estimated time, and any special note if needed.
3. Present the route clearly, professionally, without emojis, and include the total time.

AVAILABLE GALLERIES:
${SALAS.map((sala) => `- ${translatePlainText(sala.nombre, 'en')} (Floor ${sala.piso === -1 ? 'Basement' : sala.piso}, ~${sala.duracion} min): ${translatePlainText(sala.descripcion, 'en')} [Themes: ${sala.tags.slice(0, 4).map((tag) => translatePlainText(tag, 'en')).join(', ')}]${sala.cerrada ? ' CLOSED' : ''}${sala.temporal ? ' Temporary exhibition' : ''}`).join('\n')}

RULES:
- Suggest between 3 and 6 galleries depending on the available time.
- Exclude closed galleries.
- Maximum 4 paragraphs per response. Use lists for routes.
- Respond only in English.`;
  }

  return `Eres el guia virtual del Museo de Antioquia en Medellin. Tu proposito PRINCIPAL es responder preguntas sobre el museo y planear recorridos personalizados cuando el visitante lo necesite.

COMPORTAMIENTO GENERAL:
1. Responde solo preguntas relacionadas con el Museo de Antioquia: salas, exposiciones, artistas, obras, horarios, tarifas, accesos, restaurantes, tienda, parqueadero, normas de visita, educacion y recorridos.
2. Si la pregunta no tiene que ver con el museo, rechaza la respuesta con amabilidad y redirige a temas del museo.
3. Para informacion factual del museo, usa solo la informacion de contexto suministrada por el dossier del museo. Si el contexto no confirma algo, dilo con claridad.
4. Si el visitante esta pidiendo un recorrido, pregunta o usa el tiempo disponible y sus intereses.
5. Si el visitante esta pidiendo informacion puntual, responde de manera directa sin forzar un recorrido.

FLUJO PARA PLANEAR UN RECORRIDO:
1. Identifica que tipos de arte le interesan y cuanto tiempo tiene.
2. Genera un recorrido con: salas especificas en orden logico por piso, tiempo estimado, observacion especial si aplica.
3. Presenta el recorrido de forma clara, sobria y profesional, sin emojis, con tiempo total.

SALAS DISPONIBLES:
${SALAS.map((sala) => `- ${sala.nombre} (Piso ${sala.piso === -1 ? 'Sotano' : sala.piso}, ~${sala.duracion} min): ${sala.descripcion} [Temas: ${sala.tags.slice(0, 4).join(', ')}]${sala.cerrada ? ' CERRADA' : ''}${sala.temporal ? ' Exposicion temporal' : ''}`).join('\n')}

REGLAS:
- Sugiere entre 3-6 salas segun el tiempo.
- Excluye salas cerradas.
- Maximo 4 parrafos en respuestas. Usa listas para los recorridos.`;
}

function getQuickOptions(language) {
  return language === 'en'
    ? [
      { label: 'Plan my visit', msg: 'I want to plan my museum visit' },
      { label: 'I have 1 hour', msg: 'I only have 1 hour, what should I see?' },
      { label: 'Museum events', msg: 'What events take place at the museum?' },
      { label: 'Contemporary art', msg: 'I am interested in contemporary art and identity' },
      { label: 'Hours and tickets', msg: 'What are the opening hours and ticket prices?' },
    ]
    : [
      { label: 'Planear tu recorrido', msg: 'Quiero planear mi visita al museo' },
      { label: 'Tengo 1 hora', msg: 'Tengo solo 1 hora, que veo?' },
      { label: 'Eventos del museo', msg: 'Que eventos se hacen en el museo?' },
      { label: 'Arte contemporaneo', msg: 'Me interesa el arte contemporaneo y la identidad' },
      { label: 'Horarios y tarifas', msg: 'Cuales son los horarios y tarifas?' },
    ];
}

const GREETINGS = ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'hello', 'hi'];
const ROUTE_KEYWORDS = [
  'planear',
  'recorrido',
  'visita',
  'visit',
  'route',
  'tour',
  'itinerary',
  'recommend',
  'recomienda',
  'que veo',
  'what should i see',
  'por donde empezar',
  'where should i start',
  'hora',
  'horas',
  'hour',
  'hours',
  'minuto',
  'minutos',
  'minute',
  'minutes',
];

const DURATION_NUMBER_WORDS = {
  media: 0.5,
  cuarto: 0.25,
  cuartos: 0.25,
  half: 0.5,
  quarter: 0.25,
  quarters: 0.25,
  un: 1,
  uno: 1,
  una: 1,
  one: 1,
  dos: 2,
  two: 2,
  tres: 3,
  three: 3,
  cuatro: 4,
  four: 4,
  cinco: 5,
  five: 5,
  seis: 6,
  six: 6,
  siete: 7,
  seven: 7,
  ocho: 8,
  eight: 8,
  nueve: 9,
  nine: 9,
  diez: 10,
  ten: 10,
  once: 11,
  eleven: 11,
  doce: 12,
  twelve: 12,
};

const EMOJI_RE = /[\p{Extended_Pictographic}\uFE0F]/gu;

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeText(value) {
  return normalizeInputText(value);
}

function stripEmojis(value) {
  return value.replace(EMOJI_RE, '').replace(/\s{2,}/g, ' ').trim();
}

function sanitizeBotText(value) {
  return value
    .split('\n')
    .map((line) => stripEmojis(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function expandNormalizedQuery(normalizedQuery) {
  const terms = new Set(normalizedQuery.split(/\s+/).filter(Boolean));
  let expanded = normalizedQuery;

  THEME_ALIASES.forEach(([, aliases]) => {
    const normalizedAliases = aliases.map((alias) => normalizeText(alias));
    if (normalizedAliases.some((alias) => hasApproxPhrase(expanded, alias))) {
      normalizedAliases.forEach((alias) => terms.add(alias));
    }
  });

  return `${expanded} ${Array.from(terms).join(' ')}`.trim();
}

function getSalaTerms(sala) {
  return Array.from(new Set([
    sala.nombre,
    translatePlainText(sala.nombre, 'en'),
    sala.descripcion,
    translatePlainText(sala.descripcion, 'en'),
    ...sala.tags,
    ...sala.tags.map((term) => translatePlainText(term, 'en')),
  ].map((term) => normalizeText(term)).filter(Boolean)));
}

function isNegativeMention(normalizedQuery, term) {
  const escapedTerm = escapeRegex(term);
  const patterns = [
    new RegExp(`\\bno\\b[^.\\n]{0,40}\\b${escapedTerm}\\b`),
    new RegExp(`\\bsin\\s+${escapedTerm}\\b`),
    new RegExp(`\\bevitar?\\b[^.\\n]{0,30}\\b${escapedTerm}\\b`),
    new RegExp(`\\bexcepto\\s+${escapedTerm}\\b`),
    new RegExp(`\\bmenos\\s+${escapedTerm}\\b`),
    new RegExp(`\\bnada de\\s+${escapedTerm}\\b`),
    new RegExp(`\\bwithout\\s+${escapedTerm}\\b`),
    new RegExp(`\\bno\\s+${escapedTerm}\\b`),
    new RegExp(`\\bavoid\\b[^.\\n]{0,30}\\b${escapedTerm}\\b`),
    new RegExp(`\\bexcept\\s+${escapedTerm}\\b`),
  ];

  return patterns.some((pattern) => pattern.test(normalizedQuery));
}

function getExcludedSalas(query) {
  const normalizedQuery = normalizeText(query);

  return SALAS.filter((sala) => !sala.cerrada && getSalaTerms(sala).some((term) => isNegativeMention(normalizedQuery, term)));
}

function extractDurationAmount(normalized, unitsPattern) {
  const digitMatch = normalized.match(new RegExp(`(\\d+)\\s*${unitsPattern}`));
  if (digitMatch) {
    return parseInt(digitMatch[1], 10);
  }

  const wordPattern = Object.keys(DURATION_NUMBER_WORDS).join('|');
  const wordMatch = normalized.match(new RegExp(`\\b(${wordPattern})\\b\\s*${unitsPattern}`));
  if (wordMatch) {
    return DURATION_NUMBER_WORDS[wordMatch[1]];
  }

  return null;
}

function extractMinutes(query) {
  const rawNormalized = String(query)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  // Recognize time abbreviations like 20m, 1h, 1h30m, 1h 20m, etc.
  // 1. 1h30m or 1h 30m or 1h30 or 1h 30
  const hourMinuteAbbr = rawNormalized.match(/\b(\d+)\s*h(?:s|rs?)?\s*(\d{1,2})?\s*(m|min|mins|minutos?|minutes?)?\b/);
  if (hourMinuteAbbr) {
    const hours = parseInt(hourMinuteAbbr[1], 10);
    const minutes = hourMinuteAbbr[2] ? parseInt(hourMinuteAbbr[2], 10) : 0;
    if (minutes < 60) {
      return (hours * 60) + minutes;
    }
  }

  // 2. Only minutes abbreviation: 20m, 45min, etc.
  const minuteAbbr = rawNormalized.match(/\b(\d{1,3})\s*(m|min|mins|minutos?|minutes?)\b/);
  if (minuteAbbr) {
    return parseInt(minuteAbbr[1], 10);
  }
  const normalized = normalizeText(query);
  const clockMatch = rawNormalized.match(/\b(\d{1,2}):(\d{2})\b/);
  if (clockMatch) {
    const hours = parseInt(clockMatch[1], 10);
    const minutes = parseInt(clockMatch[2], 10);

    if (minutes < 60) {
      return (hours * 60) + minutes;
    }
  }

  const compactHourMinuteMatch = rawNormalized.match(/\b(\d+)\s*h(?:s|rs?)?\s*(\d{1,2})\s*(?:m|min|mins|minutos?|minutes?)?\b/);
  if (compactHourMinuteMatch) {
    const hours = parseInt(compactHourMinuteMatch[1], 10);
    const minutes = parseInt(compactHourMinuteMatch[2], 10);

    if (minutes < 60) {
      return (hours * 60) + minutes;
    }
  }

  const compactHourOnlyMatch = rawNormalized.match(/\b(\d+)\s*h(?:s|rs?)?\b/);
  if (compactHourOnlyMatch) {
    return parseInt(compactHourOnlyMatch[1], 10) * 60;
  }

  const hourAndMinutesMatch = normalized.match(/\b(\d+)\s*(hora|horas|hour|hours)\s+(y|and)\s+(\d+)\s*(min|mins|minuto|minutos|minute|minutes)\b/);
  if (hourAndMinutesMatch) {
    return (parseInt(hourAndMinutesMatch[1], 10) * 60) + parseInt(hourAndMinutesMatch[4], 10);
  }

  const hourAndHalfMatch = normalized.match(/\b(\d+)\s*(hora|horas|hour|hours)\s+(y\s+)?(media|half)\b/);
  if (hourAndHalfMatch) {
    return (parseInt(hourAndHalfMatch[1], 10) * 60) + 30;
  }

  const wordHourAndHalfMatch = normalized.match(/\b([a-z]+)\s*(hora|horas|hour|hours)\s+(y\s+)?(media|half)\b/);
  if (wordHourAndHalfMatch && DURATION_NUMBER_WORDS[wordHourAndHalfMatch[1]] !== undefined) {
    return Math.round(DURATION_NUMBER_WORDS[wordHourAndHalfMatch[1]] * 60) + 30;
  }

  const hourAndQuarterMatch = normalized.match(/\b(\d+)\s*(hora|horas|hour|hours)\s+y\s+(un\s+)?(cuarto|quarter)\b/);
  if (hourAndQuarterMatch) {
    return (parseInt(hourAndQuarterMatch[1], 10) * 60) + 15;
  }

  const threeQuarterHourMatch = normalized.match(/\b(\d+)\s*(hora|horas|hour|hours)\s+y\s+3\s*cuartos\b/);
  if (threeQuarterHourMatch) {
    return (parseInt(threeQuarterHourMatch[1], 10) * 60) + 45;
  }

  const hourAmount = extractDurationAmount(normalized, '(hora|horas|h|hour|hours|hr|hrs)\\b');
  if (hourAmount !== null) {
    return Math.round(hourAmount * 60);
  }

  const minuteAmount = extractDurationAmount(normalized, '(min|mins|minuto|minutos|minute|minutes)\\b');
  if (minuteAmount !== null) {
    return Math.round(minuteAmount);
  }

  if (
    hasApproxPhrase(normalized, 'rapido')
    || hasApproxPhrase(normalized, 'poco tiempo')
    || hasApproxPhrase(normalized, 'quick')
    || hasApproxPhrase(normalized, 'short visit')
  ) {
    return 45;
  }

  return null;
}

function isDurationIntent(query) {
  const normalized = normalizeText(query);
  const hasDuration = extractMinutes(query) !== null;

  if (!hasDuration) {
    return false;
  }

  return !hasIntentKeyword(normalized, [
    'horario',
    'horarios',
    'opening hours',
    'open',
    'close',
    'closing',
    'abre',
    'abren',
    'cierra',
    'cierran',
    'cuando',
    'when',
  ]);
}

function scoreSala(sala, normalizedQuery) {
  const expandedQuery = expandNormalizedQuery(normalizedQuery);
  let score = 0;
  for (const tag of getSalaTerms(sala)) {
    const normalizedTag = normalizeText(tag);
    if (hasApproxPhrase(expandedQuery, normalizedTag)) {
      score += normalizedTag.includes(' ') ? 3 : 2;
    }
  }

  if (getSalaTerms(sala).some((term) => hasApproxPhrase(expandedQuery, term))) {
    score += 4;
  }

  return score;
}

function buildSuggestedRoute(query, excludedIds = []) {
  const normalizedQuery = normalizeText(query);
  const availableMinutes = extractMinutes(query);
  const excludedSet = new Set(excludedIds);
  const openSalas = SALAS.filter((sala) => !sala.cerrada && !excludedSet.has(sala.id));

  if (openSalas.length === 0) {
    return { route: [], totalMin: 0, availableMinutes };
  }

  const ranked = openSalas
    .map((sala) => ({ sala, score: scoreSala(sala, normalizedQuery) }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      if (b.sala.piso !== a.sala.piso) {
        return b.sala.piso - a.sala.piso;
      }

      return a.sala.duracion - b.sala.duracion;
    })
    .map((item) => item.sala);

  const defaults = ['botero', 'internacional', 'mural', 'modernidad', 'barro', 'variaciones'];
  const pool = ranked.some((sala) => scoreSala(sala, normalizedQuery) > 0)
    ? ranked
    : defaults.map((id) => openSalas.find((sala) => sala.id === id)).filter(Boolean);

  const limitMinutes = availableMinutes ?? 90;
  const route = [];
  let totalMin = 0;

  for (const sala of pool) {
    if (route.some((item) => item.id === sala.id)) {
      continue;
    }

    if (totalMin + sala.duracion > limitMinutes && route.length >= 2) {
      continue;
    }

    route.push(sala);
    totalMin += sala.duracion;

    if (route.length >= 6) {
      break;
    }
  }

  if (route.length === 0) {
    route.push(pool[0]);
    totalMin += pool[0].duracion;
  }

  route.sort((a, b) => b.piso - a.piso);

  return { route, totalMin, availableMinutes };
}

function getMatchedSalas(query) {
  const normalizedQuery = normalizeText(query);
  const excludedIds = new Set(getExcludedSalas(query).map((sala) => sala.id));

  return SALAS.filter((sala) => !sala.cerrada && !excludedIds.has(sala.id))
    .map((sala) => ({ sala, score: scoreSala(sala, normalizedQuery) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.sala);
}

function getConversationState(query, history) {
  const userInputs = history.filter((item) => item.role === 'user').map((item) => item.text);
  const combined = [...userInputs, query].join(' ');
  const normalized = normalizeText(combined);
  const availableMinutes = extractMinutes(combined);
  const excludedSalas = getExcludedSalas(combined);
  const matchedSalas = getMatchedSalas(combined);
  const wantsRoute = Boolean(findApproxKeyword(normalized, ROUTE_KEYWORDS))
    || availableMinutes !== null;

  return {
    combined,
    normalized,
    availableMinutes,
    excludedSalas,
    matchedSalas,
    wantsRoute,
  };
}

function isMuseumScopedQuestion(normalizedQuery) {
  // If the query contains any museum-related keyword, consider it scoped
  if (findApproxKeyword(normalizedQuery, LOCAL_SCOPE_KEYWORDS)) {
    return true;
  }

  // If the query contains clear off-topic or negative patterns, consider it NOT scoped
  const offTopicPatterns = [
    /\bwhatsapp\b/, /\bfacebook\b/, /\binstagram\b/, /\btiktok\b/, /\btwitter\b/, /\bmeta\b/, /\bgoogle\b/, /\bai\b/, /\bchatgpt\b/, /\bopenai\b/, /\bweather\b/, /\bclima\b/, /\bpolitica\b/, /\bpresidente\b/, /\bcolombia\b/, /\bmedellin\b/, /\bnoticia\b/, /\bnews\b/, /\bdeporte\b/, /\bsoccer\b/, /\bfutbol\b/, /\bhoroscopo\b/, /\bloteria\b/, /\bchiste\b/, /\bjoke\b/, /\btrivia\b/, /\btrending\b/, /\bviral\b/, /\bconcierto\b/, /\bconcert\b/, /\bmusica\b/, /\bmusic\b/, /\bvideojuego\b/, /\bgamer\b/, /\bgame\b/, /\bplaystation\b/, /\bxbox\b/, /\bnintendo\b/, /\bcomputadora\b/, /\bcomputer\b/, /\bcelular\b/, /\bphone\b/, /\bapp\b/, /\bapplication\b/, /\bsoftware\b/, /\bhardware\b/, /\bvirus\b/, /\bmalware\b/, /\bvacuna\b/, /\bvaccine\b/, /\bcovid\b/, /\bcoronavirus\b/, /\bdoctor\b/, /\bmedico\b/, /\bmedicina\b/, /\bhealth\b/, /\bsalud\b/, /\breceta\b/, /\brecipe\b/, /\bcocina\b/, /\bcook\b/, /\bcomida\b/, /\brestaurant\b/, /\brestaurante\b/, /\btienda\b/, /\bstore\b/ // allow tienda/store only if context is museum
  ];
  for (const pattern of offTopicPatterns) {
    if (pattern.test(normalizedQuery)) {
      // Exception: allow 'tienda' or 'store' if also mentioning museum
      if ((pattern.source === '\\btienda\\b' || pattern.source === '\\bstore\\b') && /museo|museum|antioquia/.test(normalizedQuery)) {
        continue;
      }
      return false;
    }
  }

  // If the query is very short or generic, not scoped
  if (normalizedQuery.length < 8) {
    return false;
  }

  // Default: not museum scoped
  return false;
}

function buildScopeRejection(language) {
  return LOCAL_REJECTION[language === 'en' ? 'en' : 'es'];
}

function buildCollectionResponse(language) {
  return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.general, language);
}

function buildPdfKnowledgeResponse(query, language) {
  const entries = getPdfKnowledgeEntries(query, 2);

  if (entries.length === 0) {
    return null;
  }

  return entries
    .map((entry) => language === 'en' ? entry.textEn : entry.textEs)
    .join('\n\n');
}

function translateForAnswer(value, language) {
  if (!value) {
    return '';
  }

  if (language !== 'en') {
    return value;
  }

  const translated = translatePlainText(value, 'en');
  return translated !== value ? translated : '';
}

function scoreTermsMatch(normalizedQuery, terms) {
  return terms.reduce((total, term) => {
    if (!term) {
      return total;
    }

    const exactMatch = normalizedQuery.includes(term);
    const approxMatch = !exactMatch && hasApproxPhrase(normalizedQuery, term);

    if (exactMatch) {
      return total + (term.includes(' ') ? 4 : 2);
    }

    if (approxMatch) {
      return total + (term.includes(' ') ? 3 : 1);
    }

    return total;
  }, 0);
}

function buildArtistResponse(query, language) {
  const normalizedQuery = normalizeText(query);
  const artists = Array.from(new Set(arteYArtistas.map((item) => item.artist)));
  const matches = artists
    .map((artist) => {
      const aliasTerms = (ARTIST_ALIASES[artist] || []).map((term) => normalizeText(term));
      const workTerms = arteYArtistas
        .filter((item) => item.artist === artist)
        .slice(0, 4)
        .flatMap((item) => {
          const normalizedTitle = normalizeText(item.title);
          const translatedTitle = normalizeText(translatePlainText(item.title, 'en'));
          const compactVariants = item.title
            .split(/[(),]/)
            .map((part) => normalizeText(part))
            .filter(Boolean);
          return [normalizedTitle, translatedTitle, ...compactVariants];
        });
      const terms = [
        normalizeText(artist),
        normalizeText(translatePlainText(artist, 'en')),
        ...aliasTerms,
        ...workTerms,
      ];
      const aliasHit = aliasTerms.some((term) => normalizedQuery.includes(term) || hasApproxPhrase(normalizedQuery, term));
      return { artist, score: scoreTermsMatch(normalizedQuery, terms) + (aliasHit ? 8 : 0) };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (matches.length === 0) {
    return null;
  }

  return matches.map(({ artist }) => {
    const items = arteYArtistas.filter((item) => item.artist === artist).slice(0, 3);
    const rooms = Array.from(new Set(items.map((item) => item.sala)));
    const roomText = rooms.map((room) => language === 'en' ? translatePlainText(room, 'en') : room).join(', ');
    const works = items.map((item) => item.title).join(', ');
    const summary = ARTIST_SUMMARIES[artist]?.[language === 'en' ? 'en' : 'es'];

    if (language === 'en') {
      return `${summary ? `${summary} ` : ''}${artist} is represented in ${roomText}. Notable works include ${works}. If you want, I can also tell you about a specific work or suggest a route focused on this artist.`;
    }

    return `${summary ? `${summary} ` : ''}${artist} esta presente en ${roomText}. Algunas obras destacadas son ${works}. Si quieres, tambien puedo contarte sobre una obra puntual o proponerte un recorrido centrado en este artista.`;
  }).join('\n\n');
}

function buildArtworkResponse(query, language) {
  const normalizedQuery = normalizeText(query);
  const catalog = [
    ...arteYArtistas.map((item) => ({
      title: item.title,
      artist: item.artist,
      room: item.sala,
      year: item.year,
      technique: item.technique,
      description: '',
    })),
    ...obras.map((item) => ({
      title: item.titulo,
      artist: item.artista,
      room: '',
      year: '',
      technique: '',
      description: item.descripcion,
    })),
  ];

  const matches = catalog
    .map((item) => {
      const terms = [
        normalizeText(item.title),
        normalizeText(item.artist),
        normalizeText(item.room),
        normalizeText(translatePlainText(item.title, 'en')),
        normalizeText(translatePlainText(item.artist, 'en')),
      ];

      return { item, score: scoreTermsMatch(normalizedQuery, terms) };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (matches.length === 0) {
    return null;
  }

  return matches.map(({ item }) => {
    const roomText = item.room
      ? (language === 'en' ? ` You can find it in ${translatePlainText(item.room, 'en')}.` : ` Puedes encontrarla en ${item.room}.`)
      : '';
    const yearText = item.year
      ? (language === 'en' ? ` Year: ${item.year}.` : ` Año: ${item.year}.`)
      : '';
    const techniqueText = item.technique
      ? (language === 'en' ? ` Technique: ${translatePlainText(item.technique, 'en')}.` : ` Técnica: ${item.technique}.`)
      : '';
    const descriptionText = item.description
      ? ` ${language === 'en' ? translatePlainText(item.description, 'en') : item.description}`
      : '';

    if (language === 'en') {
      return `${item.title} is a work by ${item.artist}.${roomText}${yearText}${techniqueText}${descriptionText}`.trim();
    }

    return `${item.title} es una obra de ${item.artist}.${roomText}${yearText}${techniqueText}${descriptionText}`.trim();
  }).join('\n\n');
}

function buildExhibitionResponse(query, language) {
  const normalizedQuery = normalizeText(query);
  const matches = exposiciones
    .map((expo) => {
      const terms = [
        expo.titulo,
        translatePlainText(expo.titulo, 'en'),
        expo.artista,
        translatePlainText(expo.artista, 'en'),
        expo.descripcion,
        translatePlainText(expo.descripcion, 'en'),
        expo.contexto,
        translatePlainText(expo.contexto, 'en'),
        expo.tipo,
        translatePlainText(expo.tipo, 'en'),
      ].map((value) => normalizeText(value));

      const score = terms.reduce((total, term) => {
        if (!term) {
          return total;
        }

        return total + scoreTermsMatch(normalizedQuery, [term]);
      }, 0);

      return { expo, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (matches.length === 0) {
    if (findApproxKeyword(normalizedQuery, ['exhibicion', 'exhibiciones', 'exhibition', 'exhibitions', 'coleccion', 'collection', 'sophia vari', 'modernidad', 'historias', 'barro', 'simulacro', 'derivas', 'frijol'])) {
      return buildCollectionResponse(language);
    }

    return null;
  }

  return matches.map(({ expo }) => {
    const title = language === 'en' ? translatePlainText(expo.titulo, 'en') : expo.titulo;
    const type = language === 'en' ? translatePlainText(expo.tipo, 'en') : expo.tipo;
    const description = language === 'en' ? (translateForAnswer(expo.descripcion, 'en') || expo.descripcion) : expo.descripcion;
    const context = translateForAnswer(expo.contexto, language);
    const artist = language === 'en' ? translatePlainText(expo.artista, 'en') : expo.artista;
    const fact = language === 'en'
      ? `${title} is a ${type.toLowerCase()} by ${artist}. ${description}${context ? ` ${context}` : ''}`
      : `${title} es una ${type.toLowerCase()} de ${artist}. ${description}${context ? ` ${context}` : ''}`;
    return sanitizeBotText(fact);
  }).join('\n\n');
}

function buildEventResponse(query, language) {
  const normalizedQuery = normalizeText(query);
  const genericEventIntent = findApproxKeyword(normalizedQuery, [
    'evento',
    'eventos',
    'event',
    'events',
    'programacion',
    'programacion cultural',
    'agenda',
  ]);

  const matches = eventosData
    .map((eventItem) => {
      const terms = [
        eventItem.title,
        translatePlainText(eventItem.title, 'en'),
        eventItem.tipo,
        translatePlainText(eventItem.tipo, 'en'),
        eventItem.dias,
        translatePlainText(eventItem.dias, 'en'),
        eventItem.description,
        translatePlainText(eventItem.description, 'en'),
      ].map((value) => normalizeText(value));

      return { eventItem, score: scoreTermsMatch(normalizedQuery, terms) };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  if (matches.length === 0 && !genericEventIntent) {
    return null;
  }

  const selectedEvents = matches.length > 0
    ? matches.map(({ eventItem }) => eventItem)
    : eventosData.slice(0, 5);

  if (language === 'en') {
    const intro = genericEventIntent
      ? 'These are some of the museum events and programs currently highlighted:'
      : 'Here is the event information I found:';

    return `${intro}\n\n${selectedEvents.map((eventItem) => {
      const title = translatePlainText(eventItem.title, 'en');
      const type = translatePlainText(eventItem.tipo, 'en');
      const days = translatePlainText(eventItem.dias, 'en');
      const description = translatePlainText(eventItem.description, 'en');
      return `${title} (${type}). ${days}. ${description}`;
    }).join('\n\n')}`;
  }

  const intro = genericEventIntent
    ? 'Estos son algunos de los eventos y programas destacados del museo:'
    : 'Esto es lo que encontre sobre esos eventos del museo:';

  return `${intro}\n\n${selectedEvents.map((eventItem) => `${eventItem.title} (${eventItem.tipo}). ${eventItem.dias}. ${eventItem.description}`).join('\n\n')}`;
}

function buildLocalKnowledgeResponse(query, language) {
  const normalized = normalizeText(query);

  const faq = buildFaqFallback(normalized, language);
  if (faq) {
    return faq;
  }

  if (findApproxKeyword(normalized, ['parqueadero', 'parking', 'carro', 'car', 'cundinamarca'])) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.parqueadero, language);
  }

  if (findApproxKeyword(normalized, ['grupo', 'grupos', 'group', 'groups', 'whatsapp', 'educacion@museodeantioquia.co'])) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.grupos, language);
  }

  if (findApproxKeyword(normalized, ['mascota', 'mascotas', 'pet', 'pets', 'perro de asistencia', 'assistance dog', 'support animal', 'animal de soporte'])) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.mascotas, language);
  }

  if (findApproxKeyword(normalized, ['foto', 'fotos', 'fotografia', 'fotografias', 'flash', 'photo', 'photos', 'photography', 'rules', 'reglas', 'normas'])) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.normas, language);
  }

  const eventResponse = buildEventResponse(query, language);
  if (eventResponse) {
    return eventResponse;
  }

  const artResponse = buildExhibitionResponse(query, language);
  if (artResponse) {
    return artResponse;
  }

  const artistResponse = buildArtistResponse(query, language);
  if (artistResponse) {
    return artistResponse;
  }

  const artworkResponse = buildArtworkResponse(query, language);
  if (artworkResponse) {
    return artworkResponse;
  }

  if (findApproxKeyword(normalized, ['mapa', 'mapas', 'audio', 'audioguia', 'floor', 'floors', 'piso', 'pisos', 'layout', 'biblioteca', 'library'])) {
    return buildPdfEntryResponse(
      hasIntentKeyword(normalized, ['biblioteca', 'library']) ? PDF_TOPIC_ENTRY_IDS.biblioteca : PDF_TOPIC_ENTRY_IDS.mapas,
      language,
    );
  }

  if (findApproxKeyword(normalized, ['espacio', 'espacios', 'space', 'spaces', 'servicio', 'servicios', 'service', 'services', 'bano', 'banos', 'bathroom', 'bathrooms', 'sala del consejo'])) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.mapas, language);
  }

  const pdfKnowledge = buildPdfKnowledgeResponse(query, language);
  if (pdfKnowledge) {
    return pdfKnowledge;
  }

  if (findApproxKeyword(normalized, ['museo', 'museum', 'antioquia'])) {
    return buildCollectionResponse(language);
  }

  return null;
}

function buildFaqFallback(normalized, language) {
  const asksHours = !isDurationIntent(normalized)
    && hasIntentKeyword(normalized, ['horario', 'horarios', 'abre', 'abren', 'cierra', 'cierran', 'opening hours', 'hours', 'open', 'close', 'closing']);
  const asksPricing = hasIntentKeyword(normalized, ['tarifa', 'tarifas', 'precio', 'precios', 'cuanto cuesta', 'cuanto vale', 'entrada', 'entradas', 'gratis', 'gratuito', 'ticket', 'tickets', 'price', 'prices', 'cost', 'admission', 'free admission']);

  if (asksHours && asksPricing) {
    return buildPdfEntryResponse(['horarios-tarifas-visita'], language);
  }

  if (asksHours) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.horarios, language);
  }

  if (asksPricing) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.tarifas, language);
  }

  if (hasIntentKeyword(normalized, ['donde', 'ubicacion', 'direccion', 'metro', 'llegar', 'como llegar', 'ruta', 'rutas', 'where', 'location', 'address', 'get here', 'how to get', 'bus', 'car'])) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.ubicacion, language);
  }

  if (hasIntentKeyword(normalized, ['espacio', 'espacios', 'space', 'spaces', 'servicio', 'servicios', 'service', 'services', 'piso', 'pisos', 'floor', 'floors', 'bano', 'banos', 'bathroom', 'bathrooms'])) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.mapas, language);
  }

  if (hasIntentKeyword(normalized, ['tienda', 'souvenir', 'comprar', 'store', 'shop', 'buy'])) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.tienda, language);
  }

  if (hasIntentKeyword(normalized, ['cafe', 'cafeteria', 'comer', 'restaurante', 'restaurantes', 'restaurant', 'restaurants', 'eat', 'coffee', 'food', 'dining'])) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.restaurante, language);
  }

  if (hasIntentKeyword(normalized, ['grupo', 'grupos', 'group', 'groups', 'whatsapp'])) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.grupos, language);
  }

  if (hasIntentKeyword(normalized, ['evento', 'eventos', 'event', 'events', 'programacion', 'agenda'])) {
    return buildEventResponse(normalized, language);
  }

  if (hasIntentKeyword(normalized, ['programa', 'program', 'educacion', 'education', 'nino', 'nina', 'kids', 'children', 'teacher', 'docente'])) {
    return buildPdfEntryResponse(PDF_TOPIC_ENTRY_IDS.educacion, language);
  }

  return null;
}

function buildFallbackResponse(query, history, error, language) {
  const state = getConversationState(query, history);
  const lowerError = typeof error?.message === 'string' ? error.message.toLowerCase() : '';
  const isEnglish = language === 'en';
  const excludedNames = state.excludedSalas.map((sala) => sala.nombre);
  const exclusionNote = excludedNames.length > 0
    ? (isEnglish
      ? `I am taking into account that you do not want to include ${excludedNames.map((name) => translatePlainText(name, 'en')).join(', ')}.`
      : `Tomo en cuenta que no quieres incluir ${excludedNames.join(', ')}.`)
    : '';

  const faqResponse = buildFaqFallback(state.normalized, language);
  if (faqResponse) {
    return faqResponse;
  }

  if (!hasMeaningfulSignal(query)) {
    return language === 'en'
      ? 'I could not identify a clear museum question. Please write it again with a little more detail so I can help you.'
      : 'No logre identificar una pregunta clara sobre el museo. Escribela de nuevo con un poco mas de detalle para poder ayudarte.';
  }

  if (!state.wantsRoute) {
    const localKnowledge = buildLocalKnowledgeResponse(query, language);
    if (localKnowledge) {
      return localKnowledge;
    }

    if (!isMuseumScopedQuestion(state.normalized)) {
      return buildScopeRejection(language);
    }
  }

  const askedToPlan = state.normalized.includes('planear') || state.normalized.includes('recorrido') || state.normalized.includes('visita');
  const askedToPlanEnglish = /(plan|route|tour|itinerary|visit)\b/.test(state.normalized);
  const isGreeting = GREETINGS.some((greeting) => state.normalized.includes(greeting));

  if ((isGreeting || askedToPlan || askedToPlanEnglish) && !state.availableMinutes && state.matchedSalas.length === 0) {
    if (isEnglish) {
      return `${exclusionNote ? `${exclusionNote}\n\n` : ''}I can help you plan your route through the museum.\n\nTell me how much time you have and what kind of art interests you most: modern art, contemporary art, history, clay, or temporary exhibitions.`;
    }
    return `${exclusionNote ? `${exclusionNote}\n\n` : ''}Puedo ayudarte a planear tu recorrido por el museo.\n\nDime cuanto tiempo tienes y que tipo de arte te interesa mas: arte moderno, contemporaneo, historia, barro o exposiciones temporales.`;
  }

  if (!state.availableMinutes && state.matchedSalas.length > 0) {
    const names = state.matchedSalas.slice(0, 3).map((sala) => isEnglish ? translatePlainText(sala.nombre, 'en') : sala.nombre).join(', ');
    if (isEnglish) {
      return `${exclusionNote ? `${exclusionNote}\n\n` : ''}I already have a sense of your interests: ${names}.\n\nNow tell me how much time you have and I will organize a route by floor.`;
    }
    return `${exclusionNote ? `${exclusionNote}\n\n` : ''}Ya tengo una idea de tus intereses: ${names}.\n\nAhora dime cuanto tiempo tienes disponible y te organizo un recorrido en orden por pisos.`;
  }

  if (state.availableMinutes && state.matchedSalas.length === 0) {
    if (isEnglish) {
      return `${exclusionNote ? `${exclusionNote}\n\n` : ''}Perfect. I can organize something for ${state.availableMinutes} minutes.\n\nNow tell me what you prefer to see: contemporary art, art history, clay, mural work, or temporary exhibitions.`;
    }
    return `${exclusionNote ? `${exclusionNote}\n\n` : ''}Perfecto, puedo organizarte algo para ${state.availableMinutes} minutos.\n\nAhora cuentame que prefieres ver: arte contemporaneo, historia del arte, barro, mural o exposiciones temporales.`;
  }

  const { route, totalMin, availableMinutes } = buildSuggestedRoute(state.combined, state.excludedSalas.map((sala) => sala.id));
  if (route.length === 0) {
    if (isEnglish) {
      return 'With the current exclusions I do not have a valid combination to suggest. If you want, tell me another interest or allow a little more time.';
    }
    return 'Con las exclusiones actuales no me queda una combinacion valida para sugerirte. Si quieres, dime otro interes o amplia un poco el tiempo disponible.';
  }

  const intro = isEnglish
    ? (availableMinutes
      ? `I suggest this route for ${availableMinutes} minutes, ordered by floor so you can move through the museum efficiently.`
      : 'I suggest this route based on the museum\'s curated information, designed to give you a representative view of the collection.')
    : (availableMinutes
      ? `Te propongo este recorrido para ${availableMinutes} minutos, ordenado por pisos para que avances sin devolverte demasiado.`
      : 'Te propongo este recorrido con la informacion curada del museo, pensado para darte una vista representativa de la coleccion.');

  const lines = route.map((sala, index) => `${index + 1}. ${isEnglish ? translatePlainText(sala.nombre, 'en') : sala.nombre} - ${isEnglish ? 'Floor' : 'Piso'} ${sala.piso === -1 ? (isEnglish ? 'Basement' : 'Sotano') : sala.piso} - ~${sala.duracion} min`);
  const note = lowerError.includes('quota') || lowerError.includes('429')
    ? (isEnglish
      ? 'Some advanced features are temporarily unavailable, but I can still help you plan your visit.'
      : 'Algunas funciones avanzadas no estan disponibles temporalmente, pero puedo seguir ayudandote a planear tu visita.')
    : (isEnglish
      ? 'I can keep helping you with the museum information available right now.'
      : 'Puedo seguir ayudandote con la informacion del museo disponible en este momento.');

  const storeRecommendation = isEnglish
    ? '\n\nBefore you leave, we recommend visiting the museum store for unique souvenirs and gifts.'
    : '\n\nAntes de salir, te recomendamos visitar la tienda del museo para encontrar recuerdos y regalos únicos.';

  return isEnglish
    ? `${exclusionNote ? `${exclusionNote}\n\n` : ''}${intro}\n\n${lines.join('\n')}\n\nTotal estimated time: ${totalMin} min.\n${note}\n\nIf you want, I can adjust it to be shorter, more contemporary, or based on other exclusions.${storeRecommendation}`
    : `${exclusionNote ? `${exclusionNote}\n\n` : ''}${intro}\n\n${lines.join('\n')}\n\nTiempo total estimado: ${totalMin} min.\n${note}\n\nSi quieres, puedo ajustarlo para hacerlo mas corto, mas contemporaneo o con otras exclusiones.${storeRecommendation}`;
}

function parseRouteCard(text) {
  const lines = sanitizeBotText(text).split('\n');
  const stops = [];
  let totalMin = 0;
  let inRoute = false;

  const stopRe = /^(\d+)[.)]\s+(.+)/;
  const timeRe = /~?(\d+)\s*min/i;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      continue;
    }

    const stopMatch = line.match(stopRe);
    if (stopMatch) {
      inRoute = true;
      const content = stripEmojis(stopMatch[2]);
      const timeMatch = content.match(timeRe);
      const mins = timeMatch ? parseInt(timeMatch[1], 10) : null;
      if (mins) {
        totalMin += mins;
      }

      const contentWithoutTime = content.replace(timeRe, '').replace(/[–—-]\s*$/, '').trim();
      const [name, ...metaParts] = contentWithoutTime.split(/\s+[–—-]\s+/).map((part) => part.trim()).filter(Boolean);

      stops.push({ num: stopMatch[1], name: name || contentWithoutTime, meta: metaParts.join(' - '), mins });
      continue;
    }

    if (inRoute) {
      continue;
    }
  }

  if (stops.length < 2) {
    return null;
  }

  return { stops, totalMin };
}

function BotMessage({ text, isBot, language }) {
  if (!isBot) {
    return <span>{text}</span>;
  }

  const sanitizedText = sanitizeBotText(text);
  const route = parseRouteCard(sanitizedText);
  if (route && route.stops.length >= 2) {
    return <RouteCard route={route} rawText={sanitizedText} language={language} />;
  }

  const lines = sanitizedText.split('\n');

  return (
    <>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {line}
          {index < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

function RouteCard({ route, rawText, language }) {
  const isEnglish = language === 'en';
  const introLines = rawText.split('\n').filter((line) => {
    const trimmed = line.trim();
    return trimmed && !trimmed.match(/^\d+[.)]\s+/) && !trimmed.match(/^total/i) && !trimmed.match(/^tiempo total/i);
  });

  const stopNums = new Set(route.stops.map((stop) => stop.num));
  const intro = introLines.filter((line) => !stopNums.has(line.trim().match(/^(\d+)/)?.[1])).slice(0, 3);
  const outro = introLines.slice(Math.max(0, introLines.length - 2));

  return (
    <div>
      {intro.slice(0, 2).map((line, index) => (
        <span key={`${line}-${index}`}>
          {line}
          <br />
        </span>
      ))}

      <div className={styles.routeCard}>
        <div className={styles.routeHeader}>
          <span>{isEnglish ? 'Suggested itinerary' : 'Itinerario sugerido'}</span>
          <span className={styles.routeHeaderMeta}>{route.stops.length} {isEnglish ? 'galleries' : 'salas'}</span>
        </div>

        <div className={styles.routeBody}>
          {route.stops.map((stop, index) => (
            <div key={`${stop.num}-${index}`} className={styles.routeStop}>
              <div className={styles.stopNum}>{stop.num}</div>
              <div className={styles.stopInfo}>
                <div className={styles.stopName}>{stop.name}</div>
                {stop.meta ? <div className={styles.stopMeta}>{stop.meta}</div> : null}
              </div>
              {stop.mins ? <div className={styles.stopTime}>{stop.mins} MIN</div> : null}
            </div>
          ))}
        </div>

        {route.totalMin > 0 ? (
          <div className={styles.routeFooter}>
            <span>{isEnglish ? 'Estimated time' : 'Tiempo estimado'}</span>
            <b>{route.totalMin} MIN</b>
          </div>
        ) : null}
      </div>

      {outro.length > 0 && outro[outro.length - 1] !== intro[intro.length - 1] ? (
        <div className={styles.routeOutro}>
          {outro.slice(-2).map((line, index) => (
            <span key={`${line}-${index}`}>
              {line}
              <br />
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ChatBotRecorrido() {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const quickOptions = getQuickOptions(language);
  const [msgs, setMsgs] = useState([
    {
      role: 'bot',
      text: 'Bienvenido al Museo de Antioquia.\n\nSoy tu guia virtual. Puedo ayudarte a estructurar un recorrido segun tus intereses y disponibilidad, o responder preguntas puntuales.\n\nEn que te puedo asesorar hoy?',
      plain: true
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [isLocalMode, setIsLocalMode] = useState(!isGeminiConfigured);
  const chatRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (!chatRef.current) {
      chatRef.current = createMuseumChat();
    }
  }, []);

  useEffect(() => {
    chatRef.current = createMuseumChat();
    setIsLocalMode(!isGeminiConfigured);
    setShowQuick(true);
    setInput('');
    setMsgs([
      {
        role: 'bot',
        text: isEnglish
          ? 'Welcome to the Museum of Antioquia.\n\nI am your virtual guide. I can help you structure a route based on your interests and availability, or answer specific questions.\n\nHow can I assist you today?'
          : 'Bienvenido al Museo de Antioquia.\n\nSoy tu guia virtual. Puedo ayudarte a estructurar un recorrido segun tus intereses y disponibilidad, o responder preguntas puntuales.\n\nEn que te puedo asesorar hoy?',
        plain: true
      }
    ]);
  }, [isEnglish]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [msgs, loading]);

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) {
      return;
    }

    setInput('');
    setShowQuick(false);
    setMsgs((prev) => [...prev, { role: 'user', text: q }]);
    setLoading(true);

    if (!hasMeaningfulSignal(q)) {
      setIsLocalMode(true);
      setMsgs((prev) => [...prev, {
        role: 'bot',
        text: language === 'en'
          ? 'I could not identify a clear museum question. Please write it again with a little more detail so I can help you.'
          : 'No logre identificar una pregunta clara sobre el museo. Escribela de nuevo con un poco mas de detalle para poder ayudarte.'
      }]);
      setLoading(false);
      return;
    }

    const routeState = getConversationState(q, msgs);
    const directKnowledge = !routeState.wantsRoute ? buildFaqFallback(normalizeText(q), language) : null;
    if (directKnowledge) {
      setIsLocalMode(true);
      setMsgs((prev) => [...prev, { role: 'bot', text: directKnowledge }]);
      setLoading(false);
      return;
    }

    const localKnowledge = !routeState.wantsRoute ? buildLocalKnowledgeResponse(q, language) : null;
    const normalizedQuestion = normalizeText(q);
    const shouldUseLocalOnly = Boolean(localKnowledge) || (!routeState.wantsRoute && !isMuseumScopedQuestion(normalizedQuestion));

    if (shouldUseLocalOnly) {
      setIsLocalMode(true);
      setMsgs((prev) => [...prev, { role: 'bot', text: localKnowledge || buildScopeRejection(language) }]);
      setLoading(false);
      return;
    }

    const context = getContext(q, language);
    const fullPrompt = isEnglish
      ? `${getSystemPrompt(language)}\n\nCONTEXT INFORMATION (Use this to answer accurately):\n${context}\n\nVISITOR QUESTION:\n${q}`
      : `${getSystemPrompt(language)}\n\nINFORMACION DE CONTEXTO (Usa esto para responder de forma precisa):\n${context}\n\nPREGUNTA DEL VISITANTE:\n${q}`;

    try {
      if (!chatRef.current) {
        throw new Error('Gemini chat is not configured in the client environment.');
      }

      const resultado = await chatRef.current.sendMessage(fullPrompt);
      const reply = isEnglish
        ? translatePlainText(sanitizeBotText(resultado.response.text()), 'en')
        : sanitizeBotText(resultado.response.text());
      setIsLocalMode(false);
      setMsgs((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch (error) {
      setIsLocalMode(true);
      setMsgs((prev) => [
        ...prev,
        {
          role: 'bot',
          text: buildFallbackResponse(q, [...prev, { role: 'user', text: q }], error, language)
        }
      ]);
    }

    setLoading(false);
  };

  const onKey = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  };

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className={styles.page} data-no-translate="true">
        <section className={styles.chatSection}>
          <div className={styles.wrap}>
            <div className={styles.header}>
              <img
                src="/assets/images/Logos/LogoMDABlanco.webp"
                alt={isEnglish ? 'Museum of Antioquia logo' : 'Logo Museo de Antioquia'}
                className={styles.hmark}
              />
              <div className={styles.htitle}>{isEnglish ? 'Museum of Antioquia' : 'Museo de Antioquia'}</div>
              {isLocalMode ? <div className={styles.modeBadge}>{isEnglish ? 'Local mode' : 'Modo local'}</div> : null}
            </div>

            <div className={styles.msgs} ref={messagesRef}>
              {msgs.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`${styles.msg} ${message.role === 'user' ? styles.user : styles.bot}`}
                >
                  <div className={styles.bubble}>
                    <BotMessage text={message.text} isBot={message.role === 'bot'} language={language} />
                  </div>
                </div>
              ))}

              {loading ? (
                <div className={`${styles.msg} ${styles.bot}`}>
                  <div className={styles.bubble}>
                    <div className={styles.typing}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {showQuick ? (
              <div className={styles.quick}>
                {quickOptions.map((quickItem) => (
                  <button
                    key={quickItem.label}
                    className={styles.qchip}
                    onClick={() => send(quickItem.msg)}
                    type="button"
                  >
                    {quickItem.label}
                  </button>
                ))}
              </div>
            ) : null}

            <div className={styles.inputRow}>
              <textarea
                className={styles.inp}
                placeholder={isEnglish ? 'Write your question here...' : 'Escribe tu consulta aqui...'}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKey}
                rows={1}
              />
              <button
                className={styles.sendBtn}
                onClick={() => send()}
                disabled={!input.trim() || loading}
                aria-label={isEnglish ? 'Send' : 'Enviar'}
                type="button"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
