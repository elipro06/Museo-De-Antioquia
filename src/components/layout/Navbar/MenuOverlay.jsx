import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuOverlay.module.css';
import { useLanguage } from '../../../i18n/LanguageContext';

const MenuOverlay = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  // Función para scroll suave al footer
  const handleContactClick = (e) => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  // 1. Navegación Principal
  const menuItems = [
    { name: t('Inicio'), path: '/' },
    { name: t('Manifiesto'), path: '/conocenos' },
    { name: t('Eventos'), path: '/eventos' },
    { name: t('Arte'), path: '/arte-y-artistas' },
    { name: t('Exposiciones'), path: '/exposiciones' },
    { name: t('Tienda'), path: 'https://tiendamuseodeantioquia.co', external: true },
  ];

  // 2. Utilidades - Asegúrate de que estos "path" coincidan con tu App.jsx
  const utilityItems = [
    {
      name: t('Mapa interactivo pisos'),
      path: '/mapaspisos', // src/pages/MapasPisos/MapasPisos.jsx (ruta exacta)
    },
    {
      name: t('Planea tu recorrido'),
      path: '/chatbot-recorrido', // src/pages/ChatBotRecorrido/ChatBotRecorrido.jsx (ruta exacta)
    },
    {
      name: t('¿Cómo llegar?'),
      path: '/como-llegar', // src/pages/ComoLlegar/ComoLlegar.jsx
    },
    {
      name: t('Comprar tiquetes'),
      path: 'https://tiendamuseodeantioquia.co/products/manillas-de-ingreso-museo-de-antioquia',
      external: true,
    },
    {
      name: t('Parqueadero'),
      path: '/parqueadero', // src/pages/Parqueadero/Parqueadero.jsx
    },
  ];

  return (
    <div className={`${styles.menuOverlay} ${isOpen ? styles.open : ''}`}>
      <div className={styles.menuDrawer}>
        <div className={styles.menuHeader}>
          <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar menú">
            &times;
          </button>
        </div>

        <div className={styles.menuContent}>
          {/* Menú Superior */}
          <nav className={styles.mainNav}>
            {menuItems.map((item) => (
              item.external ? (
                <a key={item.name} href={item.path} target="_blank" rel="noopener noreferrer" className={styles.menuLink} onClick={onClose}>
                  {item.name}
                </a>
              ) : (
                <Link key={item.name} to={item.path} className={styles.menuLink} onClick={onClose}>
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Sección Inferior de Utilidades */}
          <div className={styles.utilitiesSection}>
            <h3 className={styles.utilitiesTitle}>{t('UTILIDADES')}</h3>
            <ul className={styles.utilitiesList}>
              {utilityItems.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a href={item.path} target="_blank" rel="noopener noreferrer" className={styles.utilityLink} onClick={onClose}>
                      {item.name}
                    </a>
                  ) : (
                    <Link to={item.path} className={styles.utilityLink} onClick={onClose}>
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <a href="#footer" className={styles.utilityLink} onClick={handleContactClick}>
                  {t('Contacto')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;