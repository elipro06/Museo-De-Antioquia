import React from 'react';
import styles from './Aliados.module.css';
import { logos } from '../../../data/aliados';

export const Aliados = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Nuestros Aliados</h2>
      
      <div className={styles.slider}>
        <div className={styles.slideTrack}>
          {/* Renderizamos la lista dos veces seguidas para que el scroll infinito no tenga cortes */}
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className={styles.slide}>
              <img src={logo} alt={`Aliado ${index}`} className={styles.logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};