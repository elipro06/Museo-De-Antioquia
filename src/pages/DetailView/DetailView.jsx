import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar/Navbar';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../components/layout/Footer/Footer';
import { Button } from '../../components/common/Button/Button';
import { exposiciones } from '../../data/exposiciones';
import styles from './DetailView.module.css';

const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.accordionItem}>
      <button
        className={`${styles.accordionBtn} ${open ? styles.accordionOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className={styles.accordionIcon}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className={styles.accordionBody}>
          {children}
        </div>
      )}
    </div>
  );
};

const DetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const expo = exposiciones.find((e) => String(e.id) === id);
  const fichaTecnica = expo?.ficha
    ?.replace(/\s*[·•]\s*Per[ií]odo:\s*[^·•]+/i, '')
    ?.trim();
  const hasVideo = Boolean(expo?.videoUrl || expo?.videoEmbedUrl);
  const showMediaBeforeAccordions = hasVideo && expo?.mediaPlacement === 'beforeAccordions';
  const showMediaInFicha = hasVideo && expo?.mediaPlacement !== 'beforeAccordions';

  if (!expo) {
    return (
      <>
        <Navbar />
        <main className={styles.notFound}>
          <h1>Exposición no encontrada</h1>
          <Button className="brandRed" onClick={() => navigate('/exposiciones')}>
            ← Volver a exposiciones
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  const renderMedia = () => {
    if (!hasVideo) {
      return null;
    }

    return (
      <section className={styles.videoSection} aria-label="Video de la exposición">
        {expo.videoEmbedUrl ? (
          <div className={styles.videoEmbedWrapper}>
            <iframe
              className={styles.videoEmbed}
              src={expo.videoEmbedUrl}
              title={expo.videoTitle || `Video de ${expo.titulo}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <video className={styles.videoPlayer} controls preload="metadata">
            <source src={expo.videoUrl} type={expo.videoType || 'video/mp4'} />
            Tu navegador no soporta la reproducción de video.
          </video>
        )}
      </section>
    );
  };

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className={styles.page}>
        <article className={styles.layout}>
          {/* Imagen — 60% */}
          <div className={styles.imageCol}>
            <div className={`${styles.imageWrapper} ${imageLoaded ? styles.imageLoaded : ''}`}>
              <img
                src={expo.imagen}
                alt={expo.titulo}
                className={styles.image}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

          {/* Texto — 40% */}
          <div className={styles.textCol}>
            <span className={styles.label}>{expo.tipo}</span>
            <h1 className={styles.title}>{expo.titulo}</h1>

            <hr className="editorial-divider" />

            <dl className={styles.meta}>
              <div className={styles.metaRow}>
                <dt>Artista</dt>
                <dd>{expo.artista}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Técnica</dt>
                <dd>{expo.tecnica}</dd>
              </div>
            </dl>

            <hr className="editorial-divider" />

            <p className={styles.description}>{expo.descripcion}</p>

            {showMediaBeforeAccordions ? renderMedia() : null}

            {/* Acordeones */}
            <div className={styles.accordions}>
              <Accordion title="Contexto Histórico">
                <p className={styles.accordionText}>{expo.contexto}</p>
              </Accordion>
              <Accordion title="Ficha Técnica">
                <div className={styles.fichaContent}>
                  <p className={styles.accordionText}>{fichaTecnica}</p>
                  {showMediaInFicha ? renderMedia() : null}
                </div>
              </Accordion>
            </div>

            {/* Botón Volver — sticker variant */}
            <div className={styles.backBtn}>
              <Button className="brandRed" onClick={() => navigate(-1)}>
                ← Volver
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default DetailView;
