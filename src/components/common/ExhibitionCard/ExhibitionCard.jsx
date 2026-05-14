import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageContext';

import styles from './ExhibitionCard.module.css';

export const ExhibitionCard = ({ image, label, title, description, link = '#' }) => {
  const { t } = useLanguage();

  return (
    <article className={styles.card} data-no-translate="true">
      <Link to={link} className={styles.cardLink} aria-label={`${t('Ver exposición')} ${t(title)}`}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={t(title)} className={styles.image} loading="lazy" decoding="async" />
        </div>
        <div className={styles.body}>
          {label && <span className={styles.label}>{t(label)}</span>}
          <h3 className={styles.title}>{t(title)}</h3>
          {description && <p className={styles.description}>{t(description)}</p>}
          <span className={styles.readMore}>{t('Leer más →')}</span>
        </div>
      </Link>
    </article>
  );
};
