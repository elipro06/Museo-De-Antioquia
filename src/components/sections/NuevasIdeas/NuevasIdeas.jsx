import React, { useRef } from 'react';
import styles from './NuevasIdeas.module.css';

// Lista de URLs de posts de Instagram para embeber
const instagramPosts = [
  'https://www.instagram.com/reel/DXXwZrnCmWF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/p/DXUOPcvDRml/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/reel/DW4228aDDti/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/reel/DXcmWAGAKvn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/reel/DXDQqwBtaxB/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/reel/DWeeoMLpskx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/reel/DV7Ka7bpCb3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/reel/DVoA1kwp1uU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/reel/DUhCo1gjiNK/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
];

export const NuevasIdeas = () => {
  const carouselRef = useRef(null);

  const getScrollStep = () => {
    if (!carouselRef.current) {
      return 0;
    }

    const firstCard = carouselRef.current.querySelector(`.${styles.instagramCard}`);
    if (!firstCard) {
      return carouselRef.current.clientWidth * 0.85;
    }

    const gap = parseFloat(window.getComputedStyle(carouselRef.current).columnGap || window.getComputedStyle(carouselRef.current).gap || '0');
    return firstCard.getBoundingClientRect().width + gap;
  };

  const handlePrev = () => {
    if (!carouselRef.current) {
      return;
    }
    carouselRef.current.scrollLeft -= getScrollStep();
  };

  const handleNext = () => {
    if (!carouselRef.current) {
      return;
    }
    carouselRef.current.scrollLeft += getScrollStep();
  };

  return (
    <section id="aprende" className={styles.section}>
      <div className={styles.carouselContainer}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Nuevas ideas y perspectivas</h2>
        </div>
        <div className={styles.subtitle}>Reflexiones, artículos y voces que inspiran.</div>
        <div className={styles.carousel} style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
          <button type="button" className={styles.arrow} style={{position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)'}} onClick={handlePrev} aria-label="Anterior">‹</button>
          <div className={styles.iframeMultiWrapper} ref={carouselRef} style={{margin: '0 56px', width: '100%'}}>
            {instagramPosts.map((url, idx) => {
              // Detecta si es post o reel y arma el src adecuado
              let embedSrc = '';
              if (url.includes('/p/')) {
                const code = url.split('/p/')[1]?.split('/')[0];
                embedSrc = `https://www.instagram.com/p/${code}/embed`;
              } else if (url.includes('/reel/')) {
                const code = url.split('/reel/')[1]?.split('/')[0];
                embedSrc = `https://www.instagram.com/reel/${code}/embed`;
              }
              return (
                <div key={`${url}-${idx}`} className={styles.instagramCard}>
                  <iframe
                    src={embedSrc}
                    title={`Publicación de Instagram ${idx + 1}`}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                    className={styles.instagramEmbed}
                  ></iframe>
                </div>
              );
            })}
          </div>
          <button type="button" className={styles.arrow} style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)'}} onClick={handleNext} aria-label="Siguiente">›</button>
        </div>
      </div>
    </section>
  );
}