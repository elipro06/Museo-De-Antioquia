import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar/Navbar';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../components/layout/Footer/Footer';
import {
  arteYArtistas,
  arteYArtistasArtists,
  arteYArtistasSalas,
} from '../../data/arteYArtistas';
import styles from './ArteYArtistasPage.module.css';

const formatDetails = ({ year, technique }) => {
  if (year && technique) {
    return `${year} · ${technique}`;
  }

  return year || technique || null;
};

const ArteYArtistasPage = () => {
  const [selectedSala, setSelectedSala] = useState('Todas');
  const [selectedArtist, setSelectedArtist] = useState('Todos');

  const filteredWorks = useMemo(() => {
    return arteYArtistas.filter((obra) => {
      const salaMatches = selectedSala === 'Todas' || obra.sala === selectedSala;
      const artistMatches = selectedArtist === 'Todos' || obra.artist === selectedArtist;

      return salaMatches && artistMatches;
    });
  }, [selectedArtist, selectedSala]);

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className={styles.page}>
        <div className={styles.pageFrame}>
          <section className={styles.pageContainer}>

          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Arte y artistas</h1>
            <p className={styles.pageIntro}>
              Recorre la colección por salas y artistas, y abre cada obra para ver su ficha individual.
            </p>
          </header>

          <div className={styles.divider}></div>

          <section className={styles.filters} aria-label="Filtros de colección">
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Sala</span>
              <div className={styles.filterChips}>
                {arteYArtistasSalas.map((sala) => (
                  <button
                    key={sala}
                    className={`${styles.filterChip} ${selectedSala === sala ? styles.filterChipActive : ''}`}
                    onClick={() => setSelectedSala(sala)}
                    type="button"
                  >
                    {sala}
                  </button>
                ))}
              </div>
            </div>

            <label className={styles.artistFilter}>
              <span className={styles.filterLabel}>Artista</span>
              <select
                className={styles.artistSelect}
                value={selectedArtist}
                onChange={(event) => setSelectedArtist(event.target.value)}
              >
                {arteYArtistasArtists.map((artist) => (
                  <option key={artist} value={artist}>
                    {artist}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section className={styles.artGrid} aria-label="Colección del museo">
            {filteredWorks.map((obra) => {
              const details = formatDetails(obra);

              return (
                <Link className={styles.artCard} key={obra.id} to={`/arte-y-artistas/${obra.id}`}>
                  <div className={styles.artImageContainer}>
                    <img
                      className={styles.artImage}
                      src={obra.imageUrl}
                      alt={`${obra.title}, ${obra.artist}`}
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.artInfo}>
                    <p className={styles.artSala}>{obra.sala}</p>
                    <h2 className={styles.artistName}>{obra.artist}</h2>
                    <p className={styles.artTitle}>{obra.title}</p>
                    {details ? <p className={styles.artDetails}>{details}</p> : null}
                  </div>
                </Link>
              );
            })}
          </section>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ArteYArtistasPage;