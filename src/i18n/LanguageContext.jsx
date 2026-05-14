import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { TRANSLATION_PAIRS } from './translations';

const LANGUAGE_STORAGE_KEY = 'mda-language';
const ATTRIBUTE_NAMES = ['placeholder', 'aria-label', 'title', 'alt'];
const EXCLUDED_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT']);

function createTranslationMaps() {
  const esToEn = new Map();
  const enToEs = new Map();

  TRANSLATION_PAIRS.forEach(([source, target]) => {
    if (!source || !target) {
      return;
    }
    // Guardar versiones lowerCase para hacer la búsqueda insensible a mayúsculas/minúsculas
    const sourceKey = source.toLowerCase();
    const targetKey = target.toLowerCase();
    if (!esToEn.has(sourceKey)) {
      esToEn.set(sourceKey, target);
    }
    if (!enToEs.has(targetKey)) {
      enToEs.set(targetKey, source);
    }
  });

  return { esToEn, enToEs };
}

const TRANSLATION_MAPS = createTranslationMaps();

const LanguageContext = createContext({
  language: 'es',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (value) => value,
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildEntries(language) {
  const rawEntries = language === 'en'
    ? TRANSLATION_PAIRS
    : TRANSLATION_PAIRS.map(([source, target]) => [target, source]);

  return rawEntries
    .filter(([source, target]) => source && target)
    .sort((a, b) => b[0].length - a[0].length)
    .map(([source, target]) => ({
      source,
      target,
      regex: new RegExp(escapeRegex(source), 'g'),
    }));
}

function translateValue(value, entries) {
  if (!value) {
    return value;
  }

  return entries.reduce((result, entry) => result.replace(entry.regex, entry.target), value);
}

export function translatePlainText(value, language = 'es') {
  const entries = buildEntries(language === 'en' ? 'en' : 'es');
  return language === 'en' ? translateValue(value, entries) : value;
}

function translateStaticValue(value, language = 'es') {
  if (!value) {
    return value;
  }

  // Prueba con el valor original, capitalizado y en minúsculas
  const variants = [
    value,
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    value.toLowerCase()
  ];

  if (language === 'en') {
    for (const variant of variants) {
      const found = TRANSLATION_MAPS.esToEn.get(variant.toLowerCase());
      if (found) return found;
    }
    return value;
  }

  for (const variant of variants) {
    const found = TRANSLATION_MAPS.enToEs.get(variant.toLowerCase());
    if (found) return found;
  }
  return value;
}

function shouldSkipElement(element) {
  if (!element) {
    return true;
  }

  if (EXCLUDED_TAGS.has(element.tagName)) {
    return true;
  }

  if (element.closest('[data-no-translate="true"]')) {
    return true;
  }

  return false;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'es');
  const originalTextRef = useRef(new WeakMap());

  const entries = useMemo(() => buildEntries(language), [language]);

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(nextLanguage === 'en' ? 'en' : 'es');
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => (current === 'es' ? 'en' : 'es'));
  }, []);

  const t = useCallback((value) => translateStaticValue(value, language), [language]);

  const processTextNode = useCallback((textNode) => {
    if (!textNode || !textNode.parentElement || shouldSkipElement(textNode.parentElement)) {
      return;
    }

    if (!originalTextRef.current.has(textNode)) {
      originalTextRef.current.set(textNode, textNode.nodeValue);
    }

    const original = originalTextRef.current.get(textNode) || '';
    const nextValue = language === 'en' ? translateValue(original, entries) : original;

    if (textNode.nodeValue !== nextValue) {
      textNode.nodeValue = nextValue;
    }
  }, [entries, language]);

  const processAttributes = useCallback((element) => {
    if (!element || shouldSkipElement(element)) {
      return;
    }

    ATTRIBUTE_NAMES.forEach((attributeName) => {
      const currentValue = element.getAttribute(attributeName);
      if (currentValue == null) {
        return;
      }

      const storageAttribute = `data-i18n-original-${attributeName}`;
      const originalValue = element.getAttribute(storageAttribute) || currentValue;

      if (!element.hasAttribute(storageAttribute)) {
        element.setAttribute(storageAttribute, originalValue);
      }

      const nextValue = language === 'en' ? translateValue(originalValue, entries) : originalValue;
      if (currentValue !== nextValue) {
        element.setAttribute(attributeName, nextValue);
      }
    });
  }, [entries, language]);

  const translateTree = useCallback((rootNode) => {
    if (!rootNode) {
      return;
    }

    if (rootNode.nodeType === Node.TEXT_NODE) {
      processTextNode(rootNode);
      return;
    }

    if (rootNode.nodeType !== Node.ELEMENT_NODE || shouldSkipElement(rootNode)) {
      return;
    }

    processAttributes(rootNode);

    const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let currentNode = walker.currentNode;

    while (currentNode) {
      if (currentNode.nodeType === Node.TEXT_NODE) {
        processTextNode(currentNode);
      } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
        processAttributes(currentNode);
      }

      currentNode = walker.nextNode();
    }
  }, [processAttributes, processTextNode]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.title = language === 'en' ? 'Museum of Antioquia' : 'Museo de Antioquia';
  }, [language]);

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) {
      return undefined;
    }

    translateTree(root);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') {
          processTextNode(mutation.target);
          return;
        }

        if (mutation.type === 'attributes') {
          processAttributes(mutation.target);
          return;
        }

        mutation.addedNodes.forEach((node) => translateTree(node));
      });
    });

    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRIBUTE_NAMES,
    });

    return () => observer.disconnect();
  }, [language, processAttributes, processTextNode, translateTree]);

  const value = useMemo(() => ({ language, setLanguage, toggleLanguage, t }), [language, setLanguage, t, toggleLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
