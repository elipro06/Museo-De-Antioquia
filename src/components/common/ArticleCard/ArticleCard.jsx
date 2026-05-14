import { Link } from 'react-router-dom';

import styles from './ArticleCard.module.css';

export const ArticleCard = ({ image, date, title, description, link = "#" }) => {
  return (
    <article className={styles.articleCard}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} loading="lazy" decoding="async" />
      </div>
      
      <div className={styles.content}>
        <span className={styles.date}>{date}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        <Link to={link} className={styles.readMore} aria-label={`Leer artículo completo: ${title}`}>
          Leer artículo completo <span className={styles.arrow}>→</span>
        </Link>
      </div>
    </article>
  );
};