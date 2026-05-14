import { useState } from 'react';

/**
 * Hook para manejar la lógica de carrusel (índice, navegación, límites).
 * @param {number} totalItems - Total de elementos en el carrusel.
 * @param {number} itemsPerView - Elementos visibles a la vez.
 * @returns {Object} { index, setIndex, handlePrev, handleNext, maxIndex }
 */
export function useCarousel(totalItems, itemsPerView = 1) {
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const handlePrev = () => setIndex((prev) => (prev > 0 ? prev - 1 : 0));
  const handleNext = () => setIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));

  return { index, setIndex, handlePrev, handleNext, maxIndex };
}
