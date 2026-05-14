import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

import styles from './WelcomeSection.module.css';

export const WelcomeSection = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.welcomeSection} data-no-translate="true">
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeLeft}>
          <h2 className={styles.welcomeTitle}>{t('Bienvenidos')}</h2>
          <div className={styles.welcomeDesc}>
            {t('Vive el arte, la historia y la inspiración en el Museo de Antioquia.')}
          </div>
        </div>
        <div className={styles.welcomeRight}>
          <a
            href="https://tiendamuseodeantioquia.co/products/manillas-de-ingreso-museo-de-antioquia"
            className={`${styles.welcomeBtn} ${styles.welcomeBtnPrimary}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Compra tus tiquetes')}
          </a>
          <Link to="/chatbot-recorrido" className={styles.welcomeBtn}>
            {t('Planea tu recorrido')}
          </Link>
        </div>
      </div>
      <div className={styles.welcomeDivider}></div>
    </section>
  );
};
