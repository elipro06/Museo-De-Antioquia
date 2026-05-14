import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import MenuOverlay from './MenuOverlay';
import { useLanguage } from '../../../i18n/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className={styles.navbar}>
      <nav className={styles.inner}>
        {/* Logo a la izquierda con respiro visual editorial */}
        <div className={styles.logoWrapper}>
          <Link to="/" className={styles.logoLink} aria-label="Museo de Antioquia">
            <img
              src="/assets/images/Logos/Logo-Museo-NavBar.webp"
              alt="Museo de Antioquia"
              className={styles.logo}
              draggable="false"
            />
          </Link>
        </div>
        
        {/* Contenedor derecho: enlaces + acciones alineados horizontalmente */}
        <div className={styles.rightWrapper}>
          {/* Grupo de enlaces */}
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <Link to="/conocenos" className={styles.navLink}>
                {t('Manifiesto')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/eventos" className={styles.navLink}>
                {t('Eventos')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/arte-y-artistas" className={styles.navLink}>
                {t('Arte')}
              </Link>
            </li>
            <li className={styles.navItem}>
              <a 
                href="https://tiendamuseodeantioquia.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.navLink}
              >
                {t('Tienda')}
              </a>
            </li>
          </ul>

          {/* Grupo de acciones (Botón CTA + Hamburguesa + Selector de Idioma) */}
          <div className={styles.navActions}>
            <Link to="/planea-tu-visita" className={styles.ctaButton}>
              {t('Planea tu visita')}
            </Link>
            
            <button
              className={styles.hamburgerBtn}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setIsOpen((v) => !v)}
              type="button"
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>

            <div className={styles.langSelector}>
              <button
                className={`${styles.langBtn} ${language === 'es' ? styles.langActive : styles.langInactive}`}
                onClick={() => setLanguage('es')}
                type="button"
                aria-pressed={language === 'es'}
              >
                ES
              </button>
              <span className={styles.langBar}>|</span>
              <button
                className={`${styles.langBtn} ${language === 'en' ? styles.langActive : styles.langInactive}`}
                onClick={() => setLanguage('en')}
                type="button"
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </nav>
      <MenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}