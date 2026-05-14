import { Link } from 'react-router-dom';

import { planificaData } from '../../../data/planifica';
import { useLanguage } from '../../../i18n/LanguageContext';
import styles from './TuDiaEnElMuseo.module.css';

const isExternalLink = (value) => /^https?:\/\//.test(value);

export const TuDiaEnElMuseo = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.tuDiaSection} data-no-translate="true">
      <div className="layout-container">
        <div className={styles.tuDiaGrid}>
          {/* Columna izquierda: título y texto */}
          <div className={styles.leftCol}>
            <h2 className={styles.title}>{t('Tu día en el museo')}</h2>
            <p className={styles.intro}>
              {t('Planifica tu recorrido y descubre lo mejor del museo en un solo día. Inspírate con nuestras recomendaciones y vive una experiencia única.')}
            </p>
          </div>
          {/* Columna derecha: Grid de cards */}
          <div className={styles.rightCol}>
            <div className={styles.cardsGrid}>
              {planificaData.map((item) => (
                <article key={item.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img src={item.imagen} alt={t(item.titulo)} loading="lazy" decoding="async" />
                  </div>
                  <div className={styles.cardTitle}>{t(item.titulo)}</div>
                  <div className={styles.info}>{t(item.info)}</div>
                  {isExternalLink(item.link) ? (
                    <a href={item.link} className={styles.cardLink} target="_blank" rel="noopener noreferrer" aria-label={`${t(item.linkText)}: ${t(item.titulo)}`}>
                      {t(item.linkText)}
                    </a>
                  ) : (
                    <Link to={item.link} className={styles.cardLink} aria-label={`${t(item.linkText)}: ${t(item.titulo)}`}>
                      {t(item.linkText)}
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};