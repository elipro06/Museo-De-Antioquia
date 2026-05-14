export function normalizeText(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9+#\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenizeText(value = '') {
  return normalizeText(value).split(' ').filter(Boolean);
}

function levenshtein(a, b) {
  if (a === b) {
    return 0;
  }

  if (!a.length) {
    return b.length;
  }

  if (!b.length) {
    return a.length;
  }

  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let row = 0; row <= a.length; row += 1) {
    matrix[row][0] = row;
  }

  for (let col = 0; col <= b.length; col += 1) {
    matrix[0][col] = col;
  }

  for (let row = 1; row <= a.length; row += 1) {
    for (let col = 1; col <= b.length; col += 1) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

function areSimilarTokens(a, b) {
  if (!a || !b) {
    return false;
  }

  if (a === b) {
    return true;
  }

  if (a.includes(b) || b.includes(a)) {
    return Math.abs(a.length - b.length) <= 2;
  }

  const maxDistance = a.length <= 4 || b.length <= 4
    ? 1
    : a.length <= 7 || b.length <= 7
      ? 2
      : 3;

  return levenshtein(a, b) <= maxDistance;
}

export function hasApproxPhrase(text, phrase) {
  const normalizedText = normalizeText(text);
  const normalizedPhrase = normalizeText(phrase);

  if (!normalizedText || !normalizedPhrase) {
    return false;
  }

  if (normalizedText.includes(normalizedPhrase)) {
    return true;
  }

  const textTokens = tokenizeText(normalizedText);
  const phraseTokens = tokenizeText(normalizedPhrase);

  if (phraseTokens.length === 1) {
    return textTokens.some((token) => areSimilarTokens(token, phraseTokens[0]));
  }

  return phraseTokens.every((phraseToken) => textTokens.some((textToken) => areSimilarTokens(textToken, phraseToken)));
}

export function findApproxKeyword(text, keywords) {
  return keywords.find((keyword) => hasApproxPhrase(text, keyword)) || null;
}

export function hasMeaningfulSignal(text) {
  const normalized = normalizeText(text);
  if (!normalized) {
    return false;
  }

  const lettersOnly = normalized.replace(/[^a-z0-9]/g, '');
  if (lettersOnly.length < 3) {
    return false;
  }

  const tokens = tokenizeText(normalized);
  if (tokens.length === 1 && tokens[0].length < 4) {
    return false;
  }

  return true;
}