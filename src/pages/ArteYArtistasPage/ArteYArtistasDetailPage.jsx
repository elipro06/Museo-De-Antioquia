import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar/Navbar';
import { Footer } from '../../components/layout/Footer/Footer';


import React from 'react';
import { useParams } from 'react-router-dom';
import { arteYArtistas } from '../../data/arteYArtistas';
import styles from './ArteYArtistasDetailPage.module.css';


export default function ArteYArtistasDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const obra = arteYArtistas.find((item) => String(item.id) === String(id));



  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <Breadcrumbs />
        <div className={styles.pageFrame}>
          {obra ? (
            <>
              <div className={styles.layout}>
                <div className={styles.imageColumn}>
                  <div className={styles.artImageFrame}>
                    <img
                      src={obra.imageUrl}
                      alt={obra.title}
                      className={styles.artImage}
                    />
                  </div>
                </div>
                <div className={styles.contentColumn}>
                  <button
                    onClick={() => navigate(-1)}
                    className={styles.backButton}
                    style={{ display: 'block', marginLeft: 0, marginTop: 0 }}
                  >
                    <span className={styles.backIcon}>&larr;</span> VOLVER
                  </button>
                  <div className={styles.spacerTop} />
                  <div className={styles.eyebrow}>{obra.sala}</div>
                  <h1 className={styles.title}>{obra.title}</h1>
                  <div className={styles.artist}>{obra.artist}</div>
                  <div className={styles.details}><b>Año:</b> {obra.year || 'Desconocido'}</div>
                  <div className={styles.details}><b>Técnica:</b> {obra.technique || 'Desconocida'}</div>
                  {obra.artistImageUrl && (
                    <div className={styles.artistPanel}>
                      <img src={obra.artistImageUrl} alt={obra.artist} className={styles.artistImage} />
                      <div>
                        <div className={styles.artistPanelLabel}>Artista</div>
                        <div className={styles.artistPanelName}>{obra.artist}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className={styles.notFound}>
              <div className={styles.notFoundTitle}>Obra no encontrada.</div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}