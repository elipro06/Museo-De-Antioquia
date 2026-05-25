import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import { getMuseoHorario } from '../../utils/museoHorario';
import { translateTemplateRobust, interpolate } from '../../utils/i18n';

import styles from './WelcomeSection.module.css';

export const WelcomeSection = () => {
  const { t, language } = useLanguage();
  const [horario, setHorario] = useState(null);


  useEffect(() => {
    let mounted = true;
    getMuseoHorario().then((h) => {
      if (mounted) setHorario(h);
    });
    return () => { mounted = false; };
  }, [language]);

  return (
    <section className={styles.welcomeSection} data-no-translate="true">
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeLeft}>
          <h2 className={styles.welcomeTitle}>{t('Bienvenidos')}</h2>
          <div className={styles.welcomeDesc}>
            {t('Vive el arte, la historia y la inspiración en el Museo de Antioquia.')}
          </div>
          {horario && (
            <div className={styles.welcomeMeta}>
              {interpolate(
                translateTemplateRobust('El museo está abierto hoy de {{hora_apertura}} a {{hora_cierre}}', language),
                { hora_apertura: horario.open, hora_cierre: horario.close }
              )}
            </div>
          )}
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
