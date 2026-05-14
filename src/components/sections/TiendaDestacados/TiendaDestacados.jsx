import React from 'react';

import styles from './TiendaDestacados.module.css';
import { productosDestacados } from '../../../data/productosDestacados';

const TiendaDestacados = () => {
  return (
    <section className={styles.section}>
      <div className={styles.tiendaGrid}>
        {/* Columna izquierda: Título y link */}
        <div className={styles.leftCol}>
          <h2 className={styles.title}>Desde la Tienda</h2>
          <a href="https://tiendamuseodeantioquia.co" className={styles.link}>
            Ver todos los productos <span className={styles.arrow}>&rarr;</span>
          </a>
        </div>
        {/* Columna derecha: Grid de productos */}
        <div className={styles.rightCol}>
          <div className={styles.grid}>
            {productosDestacados.map((producto, idx) => (
              <a
                key={idx}
                href={producto.enlace}
                className={styles.card}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={producto.imagen}
                    alt={producto.titulo}
                    className={styles.image}
                    loading="lazy"
                  />
                </div>
                <div className={styles.textContent}>
                  <div className={styles.productTitle}>{producto.titulo}</div>
                  <div className={styles.productDesc}>{producto.descripcion}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TiendaDestacados;