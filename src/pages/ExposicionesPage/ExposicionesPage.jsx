import React from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../components/layout/Footer/Footer';
import { ExhibitionCard } from '../../components/common/ExhibitionCard/ExhibitionCard';
import { exposiciones } from '../../data/exposiciones';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './ExposicionesPage.module.css';

const ExposicionesPage = () => {
  const { t } = useLanguage();
  const temporales = exposiciones.filter((e) => e.tipo === 'Exposición temporal');
  const permanentes = exposiciones.filter((e) => e.tipo !== 'Exposición temporal');

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className={styles.page} data-no-translate="true">
        <div className={styles.pageFrame}>
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>{t('Exposiciones')}</h1>
          </header>

          <div className={styles.divider} />

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionEyebrow}>{t('Actuales')}</p>
                <h2 className={styles.sectionTitle}>{t('Exposiciones temporales')}</h2>
              </div>
            </div>

            <div className={styles.grid}>
              {temporales.map((expo) => (
                <ExhibitionCard
                  key={expo.id}
                  image={expo.imagen}
                  label={expo.tipo}
                  title={expo.titulo}
                  description={expo.descripcion}
                  link={expo.link}
                />
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionEyebrow}>{t('Colección')}</p>
                <h2 className={styles.sectionTitle}>{t('Larga duración')}</h2>
              </div>
            </div>

            <div className={styles.grid}>
              {permanentes.map((expo) => (
                <ExhibitionCard
                  key={expo.id}
                  image={expo.imagen}
                  label={expo.tipo}
                  title={expo.titulo}
                  description={expo.descripcion}
                  link={expo.link}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ExposicionesPage;
