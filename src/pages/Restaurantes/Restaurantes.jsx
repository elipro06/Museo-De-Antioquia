
import React from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../components/layout/Footer/Footer';

import styles from './Restaurantes.module.css';


const servicios = [
  {
    titulo: 'Café Urbania (Terraza Sophía)',
    descripcion: 'El lugar perfecto para cerrar tu recorrido con un café y buena conversación. Abierto desde las 11:00 a. m.',
    imagen: '/assets/images/Restaurantes/Urbania.webp',
  },
  {
    titulo: 'Laboratorio del Café',
    descripcion: 'Una experiencia con el café con la magia de la Plaza Botero de fondo.',
    imagen: '/assets/images/Restaurantes/Laboratorio.webp',
  },
  {
    titulo: 'Restaurante El Social',
    descripcion: 'Para quienes quieren que la visita se extienda un poco más y disfrutar de la cocina criolla.',
    imagen: '/assets/images/Restaurantes/Social.webp',
  },
  {
    titulo: 'Librería Bukz',
    descripcion: 'Un espacio para los amantes de la lectura. Libros y otros contenidos que transformarán tu mente.',
    imagen: '/assets/images/Restaurantes/Bukz.webp',
  },
];

export default function Restaurantes() {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className={styles.restaurantesMain}>
        <div className={styles.restaurantesContainer}>
          <header className={styles.header}>
            <h1 className={styles.restaurantesTitle}>
              Más que un museo: un destino completo
            </h1>
            <p className={styles.restaurantesIntro}>
              Una buena visita también se siente, se saborea y se lleva a casa:
            </p>
          </header>

          <div className={styles.serviciosGrid}>
            {servicios.map((servicio) => (
              <article
                className={styles.servicioBlock}
                key={servicio.titulo}
              >
                <div className={styles.servicioImgWrap}>
                  <img
                    src={servicio.imagen}
                    alt={servicio.titulo}
                    className={styles.servicioImg}
                  />
                </div>
                <div className={styles.servicioInfo}>
                  <h2 className={styles.servicioTitulo}>{servicio.titulo}</h2>
                  <p className={styles.servicioDesc}>{servicio.descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
