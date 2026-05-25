import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import MenuOverlay from './MenuOverlay';
import { useLanguage } from '../../../i18n/LanguageContext';

// Hook para detectar ancho de ventana
function useWindowSize() {
  const getDevice = () => {
    const width = window.innerWidth;
    const ua = navigator.userAgent;
    // iPadOS 13+ reports as Macintosh, but has touch events
    const isIpad = (/iPad/.test(ua)) ||
      (/Macintosh/.test(ua) && 'ontouchend' in document) ||
      (/iPad;/.test(ua));
    // Android tablets: has Android but not Mobile, or has Tablet
    const isAndroidTablet = (/Android/.test(ua) && !/Mobile/.test(ua)) || /Tablet/.test(ua);
    const isTablet = isIpad || isAndroidTablet;
    return { width, isIpad, isTablet };
  };
  const [device, setDevice] = useState(getDevice());
  useEffect(() => {
    const handleResize = () => setDevice(getDevice());
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);
  return device;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { width, isTablet } = useWindowSize();

  // Lógica ultra explícita y robusta: solo por ancho
  // Móvil: width < 900
  // Tablet: 900 <= width < 1200
  // Escritorio: width >= 1200
  const isTabletDevice = isTablet || (width >= 900 && width < 1200);
  const isMobile = !isTabletDevice && width < 900;

  // Clases condicionales para forzar estilos desde CSS
  const headerClass = [
    styles.navbar,
    'sticky-navbar',
    isMobile ? styles.isMobile : '',
    isTablet ? styles.isTablet : '',
    (!isMobile && !isTablet) ? styles.isDesktop : '',
  ].join(' ');

  return (
    <header className={headerClass}>
      <nav className={styles.inner}>
        {/* Logo a la izquierda con respiro visual editorial */}
        <div className={styles.logoWrapper}>
          <Link to="/" className={styles.logoLink} aria-label="Museo de Antioquia">
            {isMobile ? (
              <img
                src="/assets/images/Logos/LogoMDABlanco.webp"
                alt="Museo de Antioquia"
                className={styles.logo}
                draggable="false"
              />
            ) : (
              <img
                src="/assets/images/Logos/Logo-Museo-NavBar.webp"
                alt="Museo de Antioquia"
                className={styles.logo}
                draggable="false"
              />
            )}
          </Link>
        </div>
        
        {/* Contenedor derecho: enlaces + acciones alineados horizontalmente */}
        <div className={styles.rightWrapper}>
          {/* Enlaces solo visibles en escritorio (>=1200px) */}
          { width >= 1200 && (
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
                <Link to="/exposiciones" className={styles.navLink}>
                  {t('Exposiciones')}
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
          )}

          {/* Acciones: en móvil solo hamburguesa e idioma, en tablet (>=768 y <1200) CTA, menú, idioma, en desktop todo */}
          <div className={styles.navActions}>
            {isTablet && (
              <Link to="/planea-tu-visita" className={styles.ctaButton}>
                {t('Planea tu visita')}
              </Link>
            )}
            {width >= 1200 && (
              <Link to="/planea-tu-visita" className={styles.ctaButton}>
                {t('Planea tu visita')}
              </Link>
            )}
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