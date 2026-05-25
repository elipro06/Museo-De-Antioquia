
import React, { useState } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Navbar from '../../components/layout/Navbar/Navbar';
import { Footer } from '../../components/layout/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './MapasPisos.module.css';

// Hook para detectar móvil (debe ir fuera del componente y antes de cualquier uso)
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(() => typeof window !== 'undefined' && window.innerWidth <= breakpoint);
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= breakpoint);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
}

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
        id: 3,
        title: 'La persistencia del Dogma',
        description:
          '¿¿Cuáles elementos de nuestra vida en esta tierra están ordenados por la religión católica? La familia, las ideas de patria y nación, el rol del padre y la madre, lo que se espera de un hombre y de una mujer.',
        imageUrl: '/assets/images/Exposiciones/Persistencia.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/64croF6bA96HC5nSjtERv2?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/5YPVyJNtQgIznBg4MBJQJP?utm_source=generator'
        }
      },
      {
        id: 2,
        title: 'Diálogos interculturales',
        description:
          'Objetos artesanales o utilitarios para hacernos ver que el Museo no está lejos de la vida cotidiana, y que en la casa está presente aquello que nos hace comunidad desde la cultura.',
        imageUrl: '/assets/images/Exposiciones/Barro.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/3eQg7JTEKb3v87S4QIpyKW?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/5RnlQan7UM2zb8zLt4caH6?utm_source=generator'
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
        id: 8,
        title: 'Sala Mural Botero',
        description:
          'Contempla esta pieza monumental e histórica, un fresco esencial para entender la evolución artística de Antioquia y la obra temprana del maestro.',
        imageUrl: '/assets/images/Exposiciones/Mural.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/0uo7Kr7C2CV0TFtucPg7Gt?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/3qoFSUJdTT6BqjlTPauU8w?utm_source=generator'
        }
      },
      {
        id: 7,
        title: 'Promesas de la Modernidad',
        description:
          'Jóvenes artistas de la mitad del siglo XX, de los cuales emergería una nueva generación: la Urbana, que por primera vez vio a la ciudad en medio de sus contradicciones y bellezas.',
        imageUrl: '/assets/images/Exposiciones/Promesas.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/29MO6kPUdXxVTO3O592Q0R?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/0GsImZqVCtDgK7u2DT4XAX?utm_source=generator'
        }
      },
      {
        id: 6,
        title: 'Historias para repensar',
        description:
          'No hay una sola historia, así como no hay una única versión. Descubre las reflexiones de los inicios del siglo XX.',
        imageUrl: '/assets/images/Exposiciones/Repensar.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/2mgF7XN6paW2RMr2cYBxyi?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/1mPtoRzkMoKKr7BrbZVflH?utm_source=generator'
        }
      }
    ]
  },
  {
    floor: '3',
    exhibitions: [
      {
        id: 9,
        title: 'Sala donación Botero',
        description:
          'Cara a cara con el maestro más universal de Colombia y con sus obras más íntimas.',
        imageUrl: '/assets/images/Exposiciones/Botero.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/7w6TxQ59WuDcS4v7Vo2tV8?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/4oain6dodlgItyT2gEia5j?utm_source=generator'
        }
      },
      {
        id: 10,
        title: 'Sala Internacional',
        description:
          'Esculturas y pinturas que reflejan la rica exploración geométrica, volumétrica y el uso del color de la artista griega Sophia Vari.',
        imageUrl: '/assets/images/Exposiciones/Internacional.webp',
        spotifyEmbedUrls: {
          es: 'https://open.spotify.com/embed/episode/3k4D6gUiSUsFkBksrNzksC?utm_source=generator',
          en: 'https://open.spotify.com/embed/episode/5AkK33UtmiIPMg0KljMNyS?utm_source=generator'
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
  const { language, t } = useLanguage();
  const isMobile = useIsMobile();
  const currentFloor = floorsData.find((floorItem) => floorItem.floor === selectedFloor) ?? floorsData[1];

  // Render blocks
  const MapBlock = (
    <section className={styles.mapColumn}>
      <div className={styles.mapHeading}>
        <span className={styles.mapLabel}>{t('Mapa interactivo')}</span>
        <p className={styles.mapHint}>{t('Haz zoom y arrastra para explorar cada sala.')}</p>
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
      <div className={styles.floorSelector} role="tablist" aria-label={t('Seleccionar piso del museo')}>
        <span className={styles.floorSelectorLabel}>{t('Piso')}</span>
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
  );

  const SalasBlock = (
    <aside className={styles.exhibitionsColumn}>
      <div className={styles.columnHeader}>
        <span className={styles.columnLabel}>{t('Exposiciones')}</span>
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
                  alt={t(exhibition.title)}
                  className={styles.exhibitionImage}
                />
              ) : (
                <div className={styles.placeholderImage} aria-hidden="true">
                  <span className={styles.placeholderLabel}>{t('Museo de Antioquia')}</span>
                </div>
              )}
              <div className={styles.exhibitionContent}>
                <h2 className={styles.exhibitionTitle}>{t(exhibition.title)}</h2>
                <p className={styles.exhibitionDescription}>{t(exhibition.description)}</p>
                {spotifyEmbedUrl ? (
                  <div className={styles.embedWrapper}>
                    <iframe
                      data-testid="embed-iframe"
                      title={`Spotify ${t(exhibition.title)}`}
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
  );

  const PassportBlock = (
    <section className={styles.passportSection}>
      <div className={styles.passportHeader}>
        <span className={styles.passportLabel}>{t('Pasaporte de visita')}</span>
      </div>
      <p className={styles.passportDescription}>
        {t('Como parte de tu visita al Museo de Antioquia, recibirás un fanzine tipo pasaporte. Úsalo para recorrer las salas, reunir sellos y, al completarlo, obtener 10% de descuento en la tienda.')}
      </p>
      <div className={styles.passportGallery}>
        <img
          src="/assets/images/Mapas/MockUp1.webp"
          alt={t('Mockup 1 del pasaporte de visita')}
          className={styles.passportImage}
        />
        <img
          src="/assets/images/Mapas/MockUp2.webp"
          alt={t('Mockup 2 del pasaporte de visita')}
          className={styles.passportImage}
        />
      </div>
    </section>
  );

  return (
    <>
      <div className={styles.pageShell}>
        <Navbar />
        <Breadcrumbs />
        <main className={styles.pageMain}>
          <div className={styles.pageContainer}>
            <header className={styles.heroHeader}>
              <div className={styles.titleRow}>
                <h1 className={styles.sectionTitle}>{t('En este piso')}</h1>
              </div>
              <p className={styles.sectionIntro}>
                {t('Explora el mapa del museo, revisa lo que encontrarás en cada piso y accede a las audioguías disponibles durante tu recorrido.')}
              </p>
            </header>
            {isMobile ? (
              <section className={styles.mainContent}>
                {MapBlock}
                {SalasBlock}
                {PassportBlock}
              </section>
            ) : (
              <section className={styles.mainContent}>
                {SalasBlock}
                <div className={styles.mapColumnStack}>
                  {MapBlock}
                  {PassportBlock}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
