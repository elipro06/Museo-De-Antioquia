import React from 'react';
import { BsBusFront, BsCarFront, BsTrainFront } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar/Navbar';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../components/layout/Footer/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './ComoLlegar.module.css';
import MuseoMap from '../../components/common/MuseoMap';

const ComoLlegar = () => {
  const { t } = useLanguage();

  const transportOptions = [
    {
      title: t('Metro'),
      Icon: BsTrainFront,
      description: t('La estación Parque Berrío, en la Línea A, te deja a pocos pasos del museo. El pasaje peatonal Carabobo conecta de forma directa con la entrada, así que el recorrido desde el andén es breve y claro.')
    },
    {
      title: t('Carro'),
      Icon: BsCarFront,
      description: (
        <>
          {t('Puedes ingresar por la calle Cundinamarca, donde se encuentra el')}{' '}
          <Link to="/parqueadero" className={styles.inlineLink}>
            {t('Parqueadero').toLowerCase()}
          </Link>
          {' '}{t('con acceso directo a la entrada posterior del museo. Es la ruta más simple si llegas en vehículo particular.')}
        </>
      )
    },
    {
      title: t('Bus'),
      Icon: BsBusFront,
      description: t('Las rutas que van hacia el centro por la avenida de Greiff o por Carabobo te dejan muy cerca del museo. Desde allí el acceso peatonal es inmediato y bien conectado con la Plaza Botero.')
    }
  ];

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className={styles.page} data-no-translate="true">
        <div className={styles.pageContainer}>
          <section className={styles.hero}>
            <div className={styles.heroMeta}>{t('Visita')}</div>
            <div className={styles.heroGrid}>
              <div className={styles.heroHeadingColumn}>
                <h1 className={styles.title}>{t('¿Cómo llegar?')}</h1>
              </div>
              <div className={styles.heroCopyColumn}>
                <p className={styles.subtitle}>
                  Cl. 52 #52-43, La Candelaria, Medellín, Antioquia.
                </p>
                <p className={styles.heroText}>
                  {t('El museo se encuentra en el corazón del centro de Medellín, frente a la Plaza Botero y a pocos pasos de corredores peatonales, estaciones de transporte masivo y rutas metropolitanas.')}
                </p>
              </div>
            </div>
          </section>

          <section className={styles.mapSection}>
            <MuseoMap className={styles.mapFrame} />
          </section>

          <section className={styles.infoSection}>
            <div className={styles.infoHeader}>
              <span className={styles.infoEyebrow}>{t('Transporte')}</span>
              <p className={styles.infoLead}>
                {t('Tres accesos claros, directos y urbanos para llegar al museo desde distintos puntos de la ciudad.')}
              </p>
            </div>

            <div className={styles.infoGrid}>
              {transportOptions.map(({ title, Icon, description }) => (
                <article key={title} className={styles.infoBlock}>
                  <Icon className={styles.infoIcon} aria-hidden="true" />
                  <h2 className={styles.infoTitle}>{title}</h2>
                  <p className={styles.infoText}>{description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ComoLlegar;
