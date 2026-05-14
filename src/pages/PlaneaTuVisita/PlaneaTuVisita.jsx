import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar/Navbar';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../components/layout/Footer/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './PlaneaTuVisita.module.css';

const RECOMMENDATION_ICONS = {
  schedule: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3 2" />
      <path d="M8 3.5v2" />
      <path d="M16 3.5v2" />
    </svg>
  ),
  cafe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9h11a0 0 0 0 1 0 0v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9a0 0 0 0 1 0 0z" />
      <path d="M15 10h1.5a2.5 2.5 0 0 1 0 5H15" />
      <path d="M8 5.5c0-1 1-1.6 1-2.6" />
      <path d="M12 5.5c0-1 1-1.6 1-2.6" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h3l1.5-2h7L17 7h3v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M4 4l16 16" />
    </svg>
  ),
  guide: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 5.5h12" />
      <path d="M6 10.5h12" />
      <path d="M6 15.5h7" />
      <path d="M18 14v6" />
      <path d="M15 17h6" />
    </svg>
  ),
  pets: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7.5 11.5c-1.8 0-3 1.2-3 3 0 2.4 2.3 4 7.5 4s7.5-1.6 7.5-4c0-1.8-1.2-3-3-3-.8 0-1.5.2-2.1.6-.6-1.4-1.7-2.1-2.9-2.1s-2.3.7-2.9 2.1c-.6-.4-1.3-.6-2.1-.6z" />
      <circle cx="8" cy="7.5" r="1.5" />
      <circle cx="12" cy="6" r="1.5" />
      <circle cx="16" cy="7.5" r="1.5" />
      <path d="M4 4l16 16" />
    </svg>
  ),
};

/* Sección editorial reutilizable (Home la importa) */
export const PlaneaTuVisitaHero = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.hero}>
      <div className={styles.heroGrid}>
        <div className={styles.heroContent}>
          <img
            src="/assets/images/Logos/Logo_MDA.webp"
            alt={t('MDA')}
            className={styles.heroLogo}
          />

          <p className={styles.heroSubtitle}>
            Cl. 52 #52-43, La Candelaria, Medellín, La Candelaria, Medellín, Antioquia
          </p>

          <p className={styles.heroBody}>
            {t('¿Listo para vivir una experiencia que va más allá de los cuadros y las esculturas? El Museo de Antioquia te espera en pleno centro de Medellín, a pasos del icónico Parque Berrío (Carrera 52 # 52–43), con puertas abiertas para que descubras, te emociones y te conectes con el arte.')}
          </p>

          <Link to="/como-llegar" className={styles.heroLink}>
            {t('¿Cómo llegar?')}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className={styles.heroImageWrapper}>
          <img
            src="/assets/images/TuDia/Museo.webp"
            alt={t('Exterior del Museo de Antioquia')}
            className={styles.heroImage}
          />
        </div>
      </div>
    </section>
  );
};

const PlaneaTuVisita = () => {
  const { t } = useLanguage();
  const visitRecommendations = [
    {
      key: 'schedule',
      text: 'Antes de visitarnos, revisa los horarios disponibles y la programación de las visitas guiadas o los recorridos mediados.',
    },
    {
      key: 'cafe',
      text: 'Si deseas consumir alimentos te invitamos a Café Urbania o al Laboratorio del Café, no está permitido hacerlo en las salas.',
    },
    {
      key: 'camera',
      text: 'En las Salas donde se exhibe la colección del Maestro Botero no está permitido tomar fotografías. En las otras salas puedes hacerlo pero evita el uso del flash.',
    },
    {
      key: 'guide',
      text: 'Sigue las indicaciones de los acompañantes de sala, recuerda que no debes pasar la línea gris marcada en el piso que indica la distancia entre el espectador y la obra.',
    },
    {
      key: 'pets',
      text: 'No podemos recibirte con tu mascota.',
      alert: true,
    },
  ];

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className={styles.page} data-no-translate="true">
        <PlaneaTuVisitaHero />

        {/* Tarifas */}
        <section className={styles.tarifas}>
          <div className={styles.tarifasGrid}>
            {/* Col 1 — Título + Obra */}
            <div className={styles.tarifasCol1}>
              <h2 className={styles.tarifasTitle}>{t('Tarifas')}</h2>
              <figure className={styles.tarifasObra}>
                <img
                  src="/assets/images/Arte/PromesasDeLaModernidad/El_pueblo_y_el_Guayacan-Ethel Gilmour.webp"
                  alt="El pueblo y el Guayacán – Ethel Gilmour"
                  className={styles.tarifasObraImg}
                />
                <figcaption className={styles.tarifasObraCaption}>
                  El pueblo y el Guayacán, Ethel Gilmour
                </figcaption>
              </figure>
            </div>

            {/* Col 2 — Tabla de precios + Ingreso gratuito */}
            <div className={styles.tarifasList}>
              <div className={styles.tarifaRow}>
                <span className={styles.tarifaName}>{t('Nacionales')}</span>
                <span className={styles.tarifaPrice}>COP 18,000</span>
              </div>

              <div className={styles.tarifaRow}>
                <span className={styles.tarifaName}>{t('Extranjeros')}</span>
                <span className={styles.tarifaPrice}>COP 46,000</span>
              </div>

              <div className={styles.tarifaRow}>
                <div className={styles.tarifaNameBlock}>
                  <span className={styles.tarifaName}>{t('Especial Nacional')}</span>
                  <span className={styles.tarifaDetail}>{t('Estudiantes y personas mayores de 62 años')}</span>
                </div>
                <span className={styles.tarifaPrice}>COP 14,000</span>
              </div>

              <div className={styles.tarifaRow}>
                <div className={styles.tarifaNameBlock}>
                  <span className={styles.tarifaName}>{t('Grupos +8 Personas')}</span>
                  <div className={styles.tarifaSubRow}>
                    <span className={styles.tarifaDetail}>{t('Nacionales')}</span>
                    <span className={styles.tarifaPrice}>COP 15,000</span>
                  </div>
                  <div className={styles.tarifaSubRow}>
                    <span className={styles.tarifaDetail}>{t('Extranjeros')}</span>
                    <span className={styles.tarifaPrice}>COP 40,000</span>
                  </div>
                </div>
              </div>

              <p className={styles.tarifasDesc}>
                {t('Disfruta de nuestras exposiciones permanentes y temporales. Consulta tarifas especiales para grupos escolares y corporativos contactándonos directamente.')}
              </p>

              <div className={styles.tarifaRowFree}>
                <span className={styles.tarifaName}>{t('Ingreso gratuito:')}</span>
                <ul className={styles.tarifaFreeList}>
                  <li>{t('El museo de Antioquia ofrece ingreso gratuito para estratos 1,2 y 3, Sisben A, B y C o Comfama tarifa A y B (Hasta 5 personas presentando la cuenta de servicios público)')}</li>
                  <li>{t('Estudiantes de Medellín y el área metropolitana (presentando el carnet de lunes a viernes desde las 3:00 p.m. hasta las 5:30 p.m.)')}</li>
                  <li>{t('Niños menores de 7 años nacionales y extranjeros.')}</li>
                </ul>
              </div>
            </div>

            {/* Col 3 — CTA */}
            <div className={styles.tarifasCta}>
              <a
                href="https://tiendamuseodeantioquia.co/products/manillas-de-ingreso-museo-de-antioquia"
                className={styles.tarifasBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                  {t('Comprar tiquete')}
              </a>
            </div>
          </div>
        </section>

        {/* Horarios */}
        <section className={styles.horarios}>
          <div className={styles.horariosGrid}>
            {/* Col 1-2 — Vacía */}
            <div className={styles.horariosEmpty} />

            {/* Col 2 — Lista de días */}
            <div className={styles.horariosList}>
              <div className={styles.horarioRow}>
                <span className={styles.horarioDay}>{t('Lunes')}</span>
                <span className={styles.horarioTime}>10:00 a.m. – 5:30 p.m.</span>
              </div>
              <div className={styles.horarioRow}>
                <span className={styles.horarioDay}>{t('Martes')}</span>
                <span className={styles.horarioTime}>10:00 a.m. – 5:30 p.m.</span>
              </div>
              <div className={styles.horarioRow}>
                <span className={styles.horarioDay}>{t('Miércoles')}</span>
                <span className={styles.horarioTime}>10:00 a.m. – 5:30 p.m.</span>
              </div>
              <div className={styles.horarioRow}>
                <span className={styles.horarioDay}>{t('Jueves')}</span>
                <span className={styles.horarioTime}>10:00 a.m. – 5:30 p.m.</span>
              </div>
              <div className={`${styles.horarioRow} ${styles.horarioRowLast}`}>
                <span className={styles.horarioDay}>{t('Viernes')}</span>
                <span className={styles.horarioTime}>10:00 a.m. – 5:30 p.m.</span>
              </div>
              <div className={styles.horarioRow}>
                <span className={styles.horarioDay}>{t('Sábados')}</span>
                <span className={styles.horarioTime}>10:00 a.m. – 4:30 p.m.</span>
              </div>
              <div className={styles.horarioRow}>
                <span className={styles.horarioDay}>{t('Domingo')}</span>
                <span className={styles.horarioTime}>10:00 a.m. – 4:30 p.m.</span>
              </div>
              <div className={styles.horarioRow}>
                <span className={styles.horarioDay}>{t('Festivos')}</span>
                <span className={styles.horarioTime}>10:00 a.m. – 4:30 p.m.</span>
              </div>
              <div className={styles.horarioRow}>
                <span className={styles.horarioInfo} style={{color:'#9d2235', fontWeight:600, fontSize:'0.95rem'}}>{t('No abrimos 1 de enero, 1 de mayo y 25 de diciembre')}</span>
              </div>
            </div>

            {/* Col 3 — Título + Imagen */}
            <div className={styles.horariosCol3}>
              <h2 className={styles.horariosTitle}>{t('Horarios')}</h2>
              <figure className={styles.horariosObra}>
                <img
                  src="/assets/images/Arte/SalaFernandoBotero/Pedro-Fernando_Botero.webp"
                  alt="Pedro – Fernando Botero"
                  className={styles.horariosObraImg}
                />
                <figcaption className={styles.horariosObraCaption}>
                  Pedro, Fernando Botero
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Planea tu visita */}
        <section className={styles.planifica}>
          <div className={styles.planificaLayout}>
            {/* Bloque de texto a la izquierda */}
            <div className={styles.planificaHeader}>
              <h2 className={styles.planificaTitle}>{t('Planea tu visita')}</h2>
              <p className={styles.planificaDesc}>
                {t('Organiza tu visita con todo lo que necesitas para recorrer el museo: mapas, audioguías, recomendaciones personalizadas, recorridos programados y servicios como restaurantes y parqueadero.')}
              </p>
            </div>
            {/* Grid 3x2 a la derecha */}
            <div className={styles.planificaGrid}>
              {/* 1. Por dónde empezar */}
              <Link to="/chatbot-recorrido" className={styles.planificaItem}>
                <div className={styles.planificaImgWrap}>
                  <img src="/assets/images/TuDia/Recorridos.webp" alt="¿Por dónde empezar?" className={styles.planificaImg} />
                </div>
                <h3 className={styles.planificaLabel}>{t('¿Por dónde empezar?')}</h3>
                <p className={styles.planificaDescCorta}>{t('Recibe un recorrido sugerido según tu tiempo e intereses.')}</p>
              </Link>
              {/* 2. Mapas, audio y más */}

              <Link to="/mapaspisos" className={styles.planificaItem}>
                <div className={styles.planificaImgWrap}>
                  <img src="/assets/images/TuDia/Museo.webp" alt="Mapas, audio y más" className={styles.planificaImg} />
                </div>
                <h3 className={styles.planificaLabel}>{t('Mapas, audio y más')}</h3>
                <p className={styles.planificaDescCorta}>{t('Ubícate y recorre el museo a tu ritmo.')}</p>
              </Link>
              {/* 3. Programa un recorrido */}
              <Link to="/programa-tu-visita" className={styles.planificaItem}>
                <div className={styles.planificaImgWrap}>
                  <img src="/assets/images/TuDia/Recorridos_Guiados.webp" alt="Programa un Recorrido" className={styles.planificaImg} />
                </div>
                <h3 className={styles.planificaLabel}>{t('Programa un Recorrido')}</h3>
                <p className={styles.planificaDescCorta}>{t('Reserva visitas guiadas.')}</p>
              </Link>
              {/* 4. Restaurantes */}
              <Link to="/restaurantes" className={styles.planificaItem}>
                <div className={styles.planificaImgWrap}>
                  <img src="/assets/images/TuDia/Restaurantes.webp" alt="Restaurantes" className={styles.planificaImg} />
                </div>
                <h3 className={styles.planificaLabel}>{t('Restaurantes')}</h3>
                <p className={styles.planificaDescCorta}>{t('Explora las opciones de comida del museo.')}</p>
              </Link>
              {/* 5. Tienda */}
              <a href="https://tiendamuseodeantioquia.co" className={styles.planificaItem}>
                <div className={styles.planificaImgWrap}>
                  <img src="/assets/images/TuDia/Tienda.webp" alt="Tienda" className={styles.planificaImg} />
                </div>
                <h3 className={styles.planificaLabel}>{t('Tienda')}</h3>
                <p className={styles.planificaDescCorta}>{t('Explora recuerdos y regalos únicos del museo.')}</p>
              </a>
              {/* 6. Parqueadero */}
              <Link to="/parqueadero" className={styles.planificaItem}>
                <div className={styles.planificaImgWrap}>
                  <img src="/assets/images/TuDia/Parqueadero.webp" alt="Parqueadero" className={styles.planificaImg} />
                </div>
                <h3 className={styles.planificaLabel}>{t('Parqueadero')}</h3>
                <p className={styles.planificaDescCorta}>{t('Consulta la información para tu llegada en vehículo.')}</p>
              </Link>
            </div>
          </div>
        </section>

        <section id="recomendaciones" className={styles.recommendationsSection}>
          <div className={styles.recommendationsLayout}>
            <div className={styles.recommendationsIntro}>
              <h2 className={styles.recommendationsTitle}>{t('Recomendaciones')}</h2>
              <p className={styles.recommendationsLead}>
                {t('Te compartimos toda la información que debes tener en cuenta para planificar tu visita al Museo:')}
              </p>
            </div>

            <div className={styles.recommendationsList}>
              {visitRecommendations.map((recommendation) => (
                <article
                  key={recommendation.text}
                  className={`${styles.recommendationCard} ${recommendation.alert ? styles.recommendationCardAlert : ''}`}
                >
                  <span className={styles.recommendationIcon}>
                    {RECOMMENDATION_ICONS[recommendation.key]}
                  </span>
                  <div className={styles.recommendationBody}>
                    {recommendation.alert ? <span className={styles.recommendationBadge}>{t('Importante')}</span> : null}
                    <p className={styles.recommendationText}>{t(recommendation.text)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PlaneaTuVisita;
