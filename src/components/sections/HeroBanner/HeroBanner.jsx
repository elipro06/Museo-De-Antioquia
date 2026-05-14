import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageContext';
import styles from './HeroBanner.module.css';

export const HeroBanner = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className={styles.hero} data-no-translate="true">
      <div className={styles.videoWrapper}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={styles.video}
        >
          <source src="/assets/videos/Bannerhome.webm" type="video/webm" />
        </video>
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.title} data-no-translate="true">Museo de Antioquia</h1>
        <div className={styles.buttons}>
          <Link to="/planea-tu-visita" className={styles.btnPrimary}>{t('Planea tu visita')}</Link>
          <Link to="/exposiciones" className={styles.btnOutline}>{t('Exposiciones')}</Link>
        </div>
      </div>
    </section>
  );
};