import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageContext';
import styles from './ArteYArtistas.module.css';

import { arteYArtistas } from '../../../data/arteYArtistas';

const featuredWorkIds = [5, 25, 37, 18, 43];
const featuredWorks = featuredWorkIds
  .map((id) => arteYArtistas.find((obra) => obra.id === id))
  .filter(Boolean);

export const ArteYArtistas = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.arteSection} data-no-translate="true">
      <div className={styles.arteGrid}>
        {/* Columna izquierda: Título y texto */}
        <div className={styles.leftCol}>
          <h2 className={styles.title}>{t('Arte y Artistas')}</h2>
          <p className={styles.intro}>
            {t('Descubre obras y artistas que hablan de nuestra colección, desde el siglo XIX hasta hoy.')}
          </p>
          <Link to="/arte-y-artistas" className={styles.link}>{t('Encuentra tus favoritas →')}</Link>
        </div>
        {/* Columna derecha: Grid de obras */}
        <div className={styles.rightCol}>
          <div className={styles.obrasGrid}>
            {featuredWorks.map((obra, idx) => (
              <Link
                key={obra.id}
                to={`/arte-y-artistas/${obra.id}`}
                className={
                  idx > 2
                    ? `${styles.obraCard} ${styles.obraCardRow2}`
                    : styles.obraCard
                }
              >
                <div className={styles.imageWrapper}>
                  <img src={obra.imageUrl} alt={obra.title} />
                </div>
                <div className={styles.artista}>{obra.artist}</div>
                <div className={styles.tituloObra}><em>{obra.title}</em></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};