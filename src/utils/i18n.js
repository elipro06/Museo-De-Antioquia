// utils/i18n.js
// Traducción robusta de plantillas con variables

import { TRANSLATION_PAIRS } from '../i18n/translations';

export function translateTemplateRobust(template, language) {
  // Busca la traducción de la plantilla ignorando los valores de las variables
  const entry = TRANSLATION_PAIRS.find(([es, en]) =>
    es.replace(/{{\s*\w+\s*}}/g, '{}') === template.replace(/{{\s*\w+\s*}}/g, '{}')
  );
  if (!entry) return template;
  return language === 'en' ? entry[1] : entry[0];
}

export function interpolate(str, vars) {
  return str.replace(/{{\s*(\w+)\s*}}/g, (_, k) => vars[k] ?? '');
}
