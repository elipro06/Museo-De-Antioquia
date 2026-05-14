import { Button } from '../Button/Button';

import styles from './Card.module.css';

export const Card = ({ image, title, description, link = '#' }) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} loading="lazy" decoding="async" />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.buttonWrapper}>
          <Button href={link} variant="outline" className={styles.verMasBtn} ariaLabel={`Ver más sobre ${title}`}>
            Ver más
          </Button>
        </div>
      </div>
    </article>
  );
};