import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from '../../components/layout/Navbar/Navbar';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../components/layout/Footer/Footer';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './ProgramaTuVisita.module.css';

const regularSchedules = [
  {
    id: 1,
    schedule: 'Lunes, 11:00 a.m.',
    topic: 'Botero más allá del volumen (en inglés).'
  },
  {
    id: 2,
    schedule: 'Martes, 3:30 p.m.',
    topic: 'Identidades en tránsito.'
  },
  {
    id: 3,
    schedule: 'Miércoles, 3:30 p.m.',
    topic: 'Memorias en tensión.'
  },
  {
    id: 4,
    schedule: 'Jueves, 3:30 p.m.',
    topic: 'Territorios en movimiento.'
  },
  {
    id: 5,
    schedule: 'Viernes, 3:30 p.m.',
    topic: 'En tiempo presente.'
  },
  {
    id: 6,
    schedule: 'Sábado, 3:30 p.m.',
    topic: 'Cartografía esencial.'
  }
];

const ProgramaTuVisita = () => {
  const { language, t } = useLanguage();
  const whatsappMessage = language === 'en'
    ? 'Hello! I would like more information about guided group tours at the Museum of Antioquia.'
    : '¡Hola! Deseo tener información sobre los recorridos mediados para grupos en el Museo de Antioquia.';
  const whatsappHref = `https://api.whatsapp.com/send?phone=573053980904&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className={styles.page} data-no-translate="true">
        <div className={styles.recorridosContainer}>
          <section className={styles.scheduleSection}>
            <div className={styles.introBlock}>
              <h2 className={styles.sectionTitle}>{t('Programa un recorrido')}</h2>
              <p className={styles.sectionText}>
                {t('Recorridos mediados: El arte te habla diferente cuando lo conversas con nuestros mediadores.')}
              </p>
              <p className={styles.sectionText}>
                {t('Cada semana, nuestro equipo de educación te invita a ver las obras con nuevos ojos:')}
              </p>
            </div>

            <div className={styles.scheduleBody}>
              <figure className={styles.featuredArtwork}>
                <img
                  src="/assets/images/Arte/Sala Internacional/EstadosUnidos.webp"
                  alt="Estados Unidos"
                  className={styles.featuredArtworkImage}
                />
                <figcaption className={styles.artworkCaption}>
                  Broadway mirando hacia Columbus Circle
                  <br />
                  Richard Estes
                </figcaption>
              </figure>

              <div className={styles.scheduleColumn}>
                <ul className={styles.scheduleList}>
                  {regularSchedules.map((item) => (
                    <li className={styles.scheduleItem} key={item.id}>
                      <span className={styles.scheduleTime}>{t(item.schedule)}</span>
                      <span className={styles.scheduleTopic}>{t(item.topic)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.groupSection}>
            <div className={styles.groupContent}>
              <div className={styles.groupCopy}>
                <h3 className={styles.groupTitle}>{t('Recorridos para grupos')}</h3>
                <p className={styles.groupText}>
                  {t('En el Museo contamos con profesionales en formación pedagógica que se encargan de recorridos mediados para diferentes tipos de grupos. En estos recorridos mediados, podrás conocer, debatir y reflexionar sobre las diferentes obras que habitan nuestro museo, todo con el acompañamiento de uno de nuestros mediadores.')}
                </p>
                <p className={styles.groupText}>
                  {t('Comunícate con nosotros a través de nuestro WhatsApp donde podrás recibir más información.')}
                </p>
                <p className={styles.groupNote}>
                  {t('Nota: la agenda de recorridos está determinada por la disponibilidad de nuestros mediadores, pregunta por una fecha tentativa y verificaremos su disponibilidad.')}
                </p>
                <a
                  href={whatsappHref}
                  className={styles.whatsappBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className={styles.whatsappIcon} aria-hidden="true" />
                  {t('Contactar por WhatsApp')}
                </a>
              </div>

              <figure className={styles.groupArtwork}>
                <img
                  src="/assets/images/Arte/SalaFernandoBotero/Flores.webp"
                  alt="Flores"
                  className={styles.groupArtworkImage}
                />
                <figcaption className={styles.artworkCaption}>
                  Flores
                  <br />
                  Fernando Botero
                </figcaption>
              </figure>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProgramaTuVisita;