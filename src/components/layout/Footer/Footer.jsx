import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../common/Button/Button';
import { useLanguage } from '../../../i18n/LanguageContext';
import styles from './Footer.module.css';

const FOOTER_LOGO_SRC = '/assets/images/Logos/Logo-Museo-NavBar.webp?v=20260507';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer} data-no-translate="true">
      <div className={styles.container}>

        {/* Columna 1: Logo + Suscripción */}
        <div className={styles.column}>
          <Link to="/">
            <img src={FOOTER_LOGO_SRC} alt={t('Museo de Antioquia')} />
          </Link>
          <p className={styles.description}>
            {t('Sé parte de lo que está pasando en el Museo de Antioquia. Recibe historias, exposiciones y eventos directamente en tu correo.')}
          </p>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder={t('Tu correo electrónico')}
              aria-label={t('Tu correo electrónico')}
              className={styles.input}
              required
            />
            <Button className="brandRed" variant={null} type="submit">{t('Suscribir')}</Button>
          </form>
        </div>

        {/* Columna 2: Navegación rápida */}
        <div className={styles.column}>
          <h4 className={styles.title}>{t('Explora')}</h4>
          <ul className={styles.links}>
            <li><Link to="/planea-tu-visita">{t('Planea tu visita')}</Link></li>
            <li><Link to="/chatbot-recorrido">{t('Personaliza tu recorrido')}</Link></li>
            <li><Link to="/exposiciones">{t('Exposiciones')}</Link></li>
            <li><Link to="/eventos">{t('Eventos')}</Link></li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div className={styles.column}>
          <h4 className={styles.title}>{t('Visítanos')}</h4>
          <p className={styles.text}>
            Cra. 52 #52-43, Plaza Botero
          </p>
          <p className={styles.text}>
            Medellín, Antioquia, Colombia
          </p>
          <p className={styles.textSecondary}>{t('Cerca de la estación Parque Berrío')}</p>
          <p className={styles.text}>Tel: +57 (604) 251 3636</p>
          <a href="mailto:info@museodeantioquia.co" className={styles.emailLink}>
            info@museodeantioquia.co
          </a>
        </div>

      </div>

      {/* Barra inferior */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {t('Museo de Antioquia')}. {t('Todos los derechos reservados.')}
          </p>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/museodeantioquia/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/museodantioquia/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://x.com/MuseodeAntioq" target="_blank" rel="noopener noreferrer">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
};