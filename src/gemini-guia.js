import { GoogleGenerativeAI } from '@google/generative-ai';

// Try to get API key from env or fallback to hardcoded key if present
let apiKey = process.env.REACT_APP_GEMINI_API_KEY;
if (!apiKey) {
  // Fallback to direct key if not set in env
  apiKey = 'AIzaSyBL6ZT932vMWuyZW5LB878FE38a2bTMNGY';
}

const instruccionMaestra = `
Eres el guia experto del Museo de Antioquia.
TU MISION: responder preguntas sobre el museo y planear recorridos personalizados cuando el visitante lo pida.

REGLAS ESTRICTAS:
1. Si el usuario te saluda, agradecele y pregunta: "¿De cuánto tiempo dispones para el recorrido?" y "¿Qué tipo de arte te gusta más?".
2. Solo puedes hablar del Museo de Antioquia: coleccion, artistas, exposiciones, salas, servicios, accesos, horarios, tarifas, restaurante, tienda, parqueadero, actividades educativas y recorridos.
3. Si la pregunta no tiene que ver con el museo, debes rechazarla con claridad y redirigir al visitante a temas del museo.
4. Si la consulta pide un recorrido, pide o usa tiempo disponible e intereses para construir un itinerario concreto por pisos.
5. Si la consulta no pide recorrido, responde la informacion puntual de forma directa, breve y precisa.
6. Se amable, breve y usa un tono profesional pero cercano.
`;

export const isGeminiConfigured = Boolean(apiKey);

export function createMuseumChat() {
  if (!isGeminiConfigured) {
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: instruccionMaestra,
  });

  return model.startChat({ history: [] });
}

export { instruccionMaestra };