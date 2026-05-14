import React, { useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Navbar from '../../components/layout/Navbar/Navbar';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './MapasPisos.module.css';

const floorsData = [
  {
    floor: '-1',
    exhibitions: [
      {
        id: 1,
        title: 'Sala exposiciones temporales',
        description:
          'Espacio dinámico dedicado a exhibiciones itinerantes y propuestas contemporáneas que renuevan constantemente la oferta cultural.',
        imageUrl: '/assets/images/Exposiciones/Simulacro.webp'
      }
    ]
  },
  {
    floor: '1',
    exhibitions: [
      {
        id: 2,
        title: 'Diálogos Interculturales – El Barro tiene voz',
        description:
          'Objetos artesanales o utilitarios para hacernos ver que el Museo no está lejos de la vida cotidiana, y que en la casa está presente aquello que nos hace comunidad desde la cultura.',
        imageUrl: '/assets/images/Exposiciones/Barro.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/11URtRzH26L268vtF2OaGZ?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/6MMAhJWUnFxJVcbadYGW9m?utm_source=generator'
        }
      },
      {
        id: 3,
        title: 'Diálogos Descoloniales e Interculturales – La Persistencia del Dogma',
        description:
          '¿¿Cuáles elementos de nuestra vida en esta tierra están ordenados por la religión católica? La familia, las ideas de patria y nación, el rol del padre y la madre, lo que se espera de un hombre y de una mujer.',
        imageUrl: '/assets/images/Exposiciones/Persistencia.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/4wz1nJ8REsfMzZ8h5NR3Pe?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/32laFaSJFV5o35y2zE6cL9?utm_source=generator'
        }
      },
      {
        id: 4,
        title: 'Sala exposiciones temporales',
        description:
          'Muestras transitorias que conectan el arte contemporáneo nacional e internacional con el público visitante.',
        imageUrl: '/assets/images/Exposiciones/Derivas.webp'
      },
      {
        id: 5,
        title: 'Sala de lectura Ver para Leer',
        description:
          'Un espacio tranquilo e iluminado para consultar libros, catálogos y material bibliográfico especializado en arte y cultura.',
        imageUrl: '/assets/images/Evento/BibliotecaMuseoDeAntioquia.webp'
      }
    ]
  },
  {
    floor: '2',
    exhibitions: [
      {
        id: 6,
        title: 'Historias para repensar',
        description:
          'No hay una sola historia, así como no hay una única versión. Descubre las reflexiones de los inicios del siglo XX.',
        imageUrl: '/assets/images/Exposiciones/Repensar.webp'
      },
      {
        id: 7,
        title: 'Promesas de la Modernidad',
        description:
          'Jóvenes artistas de la mitad del siglo XX, de los cuales emergería una nueva generación: la Urbana, que por primera vez vio a la ciudad en medio de sus contradicciones y bellezas.',
        imageUrl: '/assets/images/Exposiciones/Promesas.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/2GmPjB1m5Dlx54OddJSixL?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/4JOlCWY8kuZzPpUKusdvtK?utm_source=generator'
        }
      },
      {
        id: 8,
        title: 'Sala Mural Botero',
        description:
          'Contempla esta pieza monumental e histórica, un fresco esencial para entender la evolución artística de Antioquia y la obra temprana del maestro.',
        imageUrl: '/assets/images/Exposiciones/Mural.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/4V4YdivVWp8SqXyP3jtW78?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/7n2KV1CLaDmLc5mOB4paef?utm_source=generator'
        }
      }
    ]
  },
  {
    floor: '3',
    exhibitions: [
      {
        id: 9,
        title: 'Sala Fernando Botero',
        description:
          'Cara a cara con el maestro más universal de Colombia y con sus obras más íntimas.',
        imageUrl: '/assets/images/Exposiciones/Botero.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/2INIiPObxywdLwKTfm1gan?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/44rNQpmZRgatyluVtf9JBo?utm_source=generator'
        }
      },
      {
        id: 10,
        title: 'Sala colección internacional Sophia Vari',
        description:
          'Esculturas y pinturas que reflejan la rica exploración geométrica, volumétrica y el uso del color de la artista griega Sophia Vari.',
        imageUrl: '/assets/images/Exposiciones/Internacional.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/5L3iavHld6lrYWJ0H9mx6n?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/5uMZqLnedZs6mzcXv4ATjN?utm_source=generator'
        }
      },
      {
        id: 11,
        title: 'Sala del concejo',
        description:
          'Espacio de carácter institucional que resguarda parte de la memoria administrativa y patrimonial del museo.',
        imageUrl: '/assets/images/Exposiciones/Concejo.webp'
      }
    ]
  }
];

const floorImages = {
  '-1': '/assets/images/Mapas/Piso-1.webp',
  '1': '/assets/images/Mapas/Piso1.webp',
  '2': '/assets/images/Mapas/Piso2.webp',
  '3': '/assets/images/Mapas/Piso3.webp'
};

export default function MapasPisos() {
  const [selectedFloor, setSelectedFloor] = useState('3');
  const { language } = useLanguage();
  const currentFloor =
    floorsData.find((floorItem) => floorItem.floor === selectedFloor) ?? floorsData[1];

  return (
    <div className={styles.pageShell}>
      <Navbar />
      <Breadcrumbs />

      <main className={styles.pageMain}>
        <div className={styles.pageContainer}>
          <header className={styles.heroHeader}>
          <div className={styles.titleRow}>
            <h1 className={styles.sectionTitle}>En este piso</h1>
          </div>
          <p className={styles.sectionIntro}>
            Explora el mapa del museo, revisa lo que encontrarás en cada piso y accede a las audioguías disponibles durante tu recorrido.
          </p>
          </header>

          <section className={styles.mainContent}>
          <aside className={styles.exhibitionsColumn}>
            <div className={styles.columnHeader}>
              <span className={styles.columnLabel}>Exposiciones</span>
            </div>

            <div className={styles.exhibitionsList}>
              {currentFloor.exhibitions.map((exhibition) => {
                const spotifyEmbedUrl = exhibition.spotifyEmbedUrls
                  ? exhibition.spotifyEmbedUrls[language === 'en' ? 'en' : 'es']
                  : exhibition.spotifyEmbedUrl;

                return (
                <article
                  className={`${styles.exhibitionCard} ${spotifyEmbedUrl ? styles.exhibitionCardWithEmbed : ''}`}
                  key={exhibition.id}
                >
                  {exhibition.imageUrl ? (
                    <img
                      src={exhibition.imageUrl}
                      alt={exhibition.title}
                      className={styles.exhibitionImage}
                    />
                  ) : (
                    <div className={styles.placeholderImage} aria-hidden="true">
                      <span className={styles.placeholderLabel}>Museo de Antioquia</span>
                    </div>
                  )}

                  <div className={styles.exhibitionContent}>
                    <h2 className={styles.exhibitionTitle}>{exhibition.title}</h2>
                    <p className={styles.exhibitionDescription}>{exhibition.description}</p>

                    {spotifyEmbedUrl ? (
                      <div className={styles.embedWrapper}>
                        <iframe
                          data-testid="embed-iframe"
                          title={`Spotify ${exhibition.title}`}
                          className={styles.spotifyEmbed}
                          src={spotifyEmbedUrl}
                          width="100%"
                          height="152"
                          frameBorder="0"
                          allowFullScreen
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        ></iframe>
                      </div>
                    ) : null}
                  </div>
                </article>
                );
              })}
            </div>
          </aside>

          <div className={styles.mapColumnStack}>
            <section className={styles.mapColumn}>
              <div className={styles.mapHeading}>
                <span className={styles.mapLabel}>Mapa interactivo</span>
                <p className={styles.mapHint}>Haz zoom y arrastra para explorar cada sala.</p>
              </div>

              <div className={styles.mapViewport}>
                <TransformWrapper
                  minScale={1}
                  initialScale={1}
                  maxScale={4}
                  centerOnInit
                  limitToBounds
                  wheel={{ step: 0.15 }}
                  doubleClick={{ disabled: true }}
                  pinch={{ step: 5 }}
                >
                  <TransformComponent
                    wrapperClass={styles.transformWrapper}
                    contentClass={styles.transformContent}
                  >
                    <img
                      src={floorImages[selectedFloor]}
                      alt={`Mapa del piso ${selectedFloor} del Museo de Antioquia`}
                      className={styles.mapImage}
                      draggable={false}
                    />
                  </TransformComponent>
                </TransformWrapper>
              </div>

              <div className={styles.floorSelector} role="tablist" aria-label="Seleccionar piso del museo">
                <span className={styles.floorSelectorLabel}>Piso</span>
                {floorsData.map((floorItem) => {
                  const isActive = floorItem.floor === selectedFloor;

                  return (
                    <button
                      key={floorItem.floor}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`${styles.floorButton} ${isActive ? styles.floorButtonActive : ''}`}
                      onClick={() => setSelectedFloor(floorItem.floor)}
                    >
                      {floorItem.floor}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className={styles.passportSection}>
              <div className={styles.passportHeader}>
                <span className={styles.passportLabel}>Pasaporte de visita</span>
              </div>

              <p className={styles.passportDescription}>
                Como parte de tu visita al Museo de Antioquia, recibirás un fanzine tipo pasaporte. Úsalo para recorrer las salas, reunir sellos y, al completarlo, obtener 10% de descuento en la tienda.
              </p>

              <div className={styles.passportGallery}>
                <img
                  src="/assets/images/Mapas/MockUp1.webp"
                  alt="Mockup 1 del pasaporte de visita"
                  className={styles.passportImage}
                />
                <img
                  src="/assets/images/Mapas/MockUp2.webp"
                  alt="Mockup 2 del pasaporte de visita"
                  className={styles.passportImage}
                />
              </div>
            </section>
          </div>
        </section>
        </div>
      </main>
    </div>
  );
}
