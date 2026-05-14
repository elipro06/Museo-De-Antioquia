
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageContext';
import styles from "./Eventos.module.css";
import { eventosData } from "../../../data/eventos";
import { useCarousel } from '../../../hooks/useCarousel';

export default function Eventos() {
  const { language, t } = useLanguage();

  const getCardsPerView = () => {
    if (typeof window === 'undefined') {
      return 2;
    }

    if (window.innerWidth <= 900) {
      return 1;
    }

    return 2;
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const totalPages = Math.ceil(eventosData.length / cardsPerView);
  const { index, handlePrev, handleNext, maxIndex, setIndex } = useCarousel(totalPages, 1);
  const viewportRef = React.useRef(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(getCardsPerView());
      setIsMobile(window.innerWidth <= 768);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);

    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const startIndex = index * cardsPerView;
  const visibleEvents = eventosData.slice(startIndex, startIndex + cardsPerView);
  const eventsToRender = isMobile ? eventosData : visibleEvents;

  const scrollByCard = (direction) => {
    if (!viewportRef.current) {
      return;
    }

    const firstCard = viewportRef.current.querySelector(`.${styles.card}`);
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : viewportRef.current.clientWidth * 0.84;
    const gap = 16;
    viewportRef.current.scrollBy({
      left: direction === 'prev' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth',
    });
  };

  const onPrev = () => {
    if (isMobile) {
      scrollByCard('prev');
      return;
    }
    handlePrev();
  };

  const onNext = () => {
    if (isMobile) {
      scrollByCard('next');
      return;
    }
    handleNext();
  };

  return (
    <section className={styles.eventosSection} data-no-translate="true">
      <div className={styles.contentWrap}>
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>{t('Eventos')}</h2>
            <p className={styles.subtitle}>
              {t('Descubre eventos, programas y experiencias que conectan el arte con la educación, la comunidad y la vida cotidiana del museo.')}
            </p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.navButton} aria-label={t('Anterior')} onClick={onPrev} disabled={!isMobile && index === 0}>
              <span aria-hidden="true">‹</span>
            </button>
            <button className={styles.navButton} aria-label={t('Siguiente')} onClick={onNext} disabled={!isMobile && index === maxIndex}>
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>
        <div className={styles.separator} />
        <div className={styles.carouselViewport} ref={viewportRef}>
          <div
            className={styles.carouselTrack}
            style={isMobile ? undefined : { gridTemplateColumns: `repeat(${cardsPerView}, minmax(0, 1fr))` }}
          >
            {eventsToRender.map((evento) => (
              <article className={styles.card} key={evento.id}>
                <div className={styles.imageWrap}>
                  <img src={evento.image} alt={t(evento.title)} className={styles.image} />
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.categoryDate}>{`${t(evento.tipo)} | ${t(evento.dias)}`}</p>
                  <h3 className={styles.cardTitle}>{t(evento.title)}</h3>
                  <p className={styles.cardDescription}>{t(evento.description)}</p>
                  <Link to={evento.link} className={styles.cardLink} aria-label={`${t('Ver más')}: ${t(evento.title)}`}>
                    <span>{t('Ver más')}</span>
                    <span className={styles.cardLinkArrow} aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        {!isMobile ? (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              type="button"
              className={`${styles.paginationDot} ${index === pageIndex ? styles.paginationDotActive : ''}`}
              onClick={() => setIndex(pageIndex)}
              aria-label={language === 'en' ? `Go to event group ${pageIndex + 1}` : `Ir al grupo ${pageIndex + 1} de eventos`}
            />
          ))}
        </div>
        ) : null}
      </div>
    </section>
  );
}