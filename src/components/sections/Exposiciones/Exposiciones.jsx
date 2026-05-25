import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageContext';
import styles from './Exposiciones.module.css';
import { exposiciones } from '../../../data/exposiciones';
import { useCarousel } from '../../../hooks/useCarousel';

export const Exposiciones = () => {
  const { t } = useLanguage();
  const cardsToShow = 4;
  const total = exposiciones.length;
  const { index, handlePrev, handleNext, maxIndex } = useCarousel(total, cardsToShow);

  // Refs y estado para el ancho real del viewport y de las tarjetas
  const viewportRef = useRef(null);
  const cardRefs = useRef([]);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gap, setGap] = useState(0);
  const [isMobileView, setIsMobileView] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  const scrollMobile = (direction) => {
    if (!viewportRef.current || !cardRefs.current[0]) return;
    const cardW = cardRefs.current[0].offsetWidth;
    const gapW = gap || 16;
    const scrollAmount = cardW + gapW;
    viewportRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const onPrev = () => {
    if (isMobileView) {
      scrollMobile('left');
      return;
    }
    handlePrev();
  };

  const onNext = () => {
    if (isMobileView) {
      scrollMobile('right');
      return;
    }
    handleNext();
  };

  useEffect(() => {
    function updateSizes() {
      setIsMobileView(window.innerWidth <= 768);
      if (viewportRef.current) {
        setViewportWidth(viewportRef.current.offsetWidth);
      }
      // Medir el ancho de la primera tarjeta visible
      if (cardRefs.current[0]) {
        setCardWidth(cardRefs.current[0].offsetWidth);
      }
      // Medir el gap real entre tarjetas
      if (cardRefs.current[0] && cardRefs.current[1]) {
        const gapPx = cardRefs.current[1].offsetLeft - (cardRefs.current[0].offsetLeft + cardRefs.current[0].offsetWidth);
        setGap(gapPx);
      }
    }
    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  // Función para saber si el tipo es destacado
  const isDestacado = (tipo) => {
    const tipos = ["larga duracion", "larga duración", "exposicion temporal", "exposición temporal"];
    return tipos.includes(
      tipo.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
    );
  };

  return (
    <section id="exposiciones" className={styles.section} data-no-translate="true">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.mainTitle}>{t('Exposiciones')}</h2>
          <div className={styles.navButtons}>
            <button className={styles.arrowLeft} onClick={onPrev} aria-label={t('Anterior')} disabled={!isMobileView && index === 0}>‹</button>
            <button className={styles.arrowRight} onClick={onNext} aria-label={t('Siguiente')} disabled={!isMobileView && index === maxIndex}>›</button>
          </div>
        </div>
        <div className={styles.carouselContainer}>
          <div className={styles.viewport} ref={viewportRef}>
            <div
              className={styles.track}
              style={{
                transform: (() => {
                  if (isMobileView) return 'none';
                  const totalCards = exposiciones.length;
                  if (!cardWidth || !viewportWidth) return 'translateX(0)';
                  const totalWidth = totalCards * cardWidth + (totalCards - 1) * gap;
                  // Si todas las tarjetas caben, no mover
                  if (totalCards <= cardsToShow) return 'translateX(0)';
                  const maxOffset = Math.max(0, totalWidth - viewportWidth);
                  const rawOffset = index * (cardWidth + gap);
                  const offset = Math.min(rawOffset, maxOffset);
                  return `translateX(-${offset}px)`;
                })()
              }}
            >
              {exposiciones.map((expo, idx) => (
                <article
                  key={expo.id}
                  className={styles.card}
                  ref={el => cardRefs.current[idx] = el}
                >
                  <Link to={expo.link} className={styles.cardLink}>
                    <div className={styles.imageWrapper}>
                      <img src={expo.imagen} alt={t(expo.titulo)} className={styles.image} />
                    </div>
                    <div className={styles.cardContent}>
                      <p
                        className={`${styles.tipo} ${isDestacado(expo.tipo) ? styles.tipoDestacado : ''}`}
                      >
                        {t(expo.tipo)}
                      </p>
                      <h3 className={styles.cardTitle}>{t(expo.titulo)}</h3>
                      <p className={styles.descripcion}>{t(expo.descripcion)}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};