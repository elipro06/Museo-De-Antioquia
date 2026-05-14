import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { exposiciones } from '../../../data/exposiciones';
import { arteYArtistas } from '../../../data/arteYArtistas';
import styles from './Breadcrumbs.module.css';

const homeItem = { name: 'Inicio', path: '/' };
const conocenosItem = { name: 'Conócenos', path: '/conocenos' };
const planeaItem = { name: 'Planea tu visita', path: '/planea-tu-visita' };
const exposicionesItem = { name: 'Exposiciones', path: '/exposiciones' };
const eventosItem = { name: 'Eventos', path: '/eventos' };
const arteYArtistasItem = { name: 'Arte y artistas', path: '/arte-y-artistas' };

function getExpoLabel(id) {
  return exposiciones.find((item) => String(item.id) === String(id))?.titulo || 'Detalle de exposición';
}

function getArtworkLabel(id) {
  return arteYArtistas.find((item) => String(item.id) === String(id))?.title || 'Detalle de obra';
}

const routeMap = [
  {
    pattern: '/',
    getItems: () => [homeItem]
  },
  {
    pattern: '/conocenos',
    getItems: () => [homeItem, conocenosItem]
  },
  {
    pattern: '/planea-tu-visita',
    getItems: () => [homeItem, planeaItem]
  },
  {
    pattern: '/programa-tu-visita',
    getItems: () => [homeItem, planeaItem, { name: 'Programa tu visita' }]
  },
  {
    pattern: '/chatbot-recorrido',
    getItems: () => [homeItem, planeaItem, { name: 'Por dónde empezar' }]
  },
  {
    pattern: '/como-llegar',
    getItems: () => [homeItem, planeaItem, { name: 'Cómo llegar' }]
  },
  {
    pattern: '/parqueadero',
    getItems: () => [homeItem, planeaItem, { name: 'Parqueadero' }]
  },
  {
    pattern: '/restaurantes',
    getItems: () => [homeItem, planeaItem, { name: 'Restaurantes' }]
  },
  {
    pattern: '/mapaspisos',
    getItems: () => [homeItem, planeaItem, { name: 'Mapas de pisos' }]
  },
  {
    pattern: '/personaliza',
    getItems: () => [homeItem, planeaItem, { name: 'Personaliza tu recorrido' }]
  },
  {
    pattern: '/eventos',
    getItems: () => [homeItem, eventosItem]
  },
  {
    pattern: '/arte-y-artistas/:id',
    getItems: ({ params }) => [homeItem, arteYArtistasItem, { name: getArtworkLabel(params.id) }]
  },
  {
    pattern: '/arte-y-artistas',
    getItems: () => [homeItem, arteYArtistasItem]
  },
  {
    pattern: '/biblioteca',
    getItems: () => [homeItem, { name: 'Biblioteca' }]
  },
  {
    pattern: '/exposiciones/:id',
    getItems: ({ currentLabel, params }) => [
      homeItem,
      exposicionesItem,
      { name: currentLabel || getExpoLabel(params.id) }
    ]
  },
  {
    pattern: '/exposiciones',
    getItems: () => [homeItem, exposicionesItem]
  }
];

function resolveItems(pathname, currentLabel) {
  const route = routeMap.find(({ pattern }) => matchPath({ path: pattern, end: true }, pathname));

  const match = route ? matchPath({ path: route.pattern, end: true }, pathname) : null;

  return route ? route.getItems({ currentLabel, params: match?.params || {} }) : [];
}

export default function Breadcrumbs({ items, currentLabel, withinContainer = false }) {
  const location = useLocation();
  const resolvedItems = items ?? resolveItems(location.pathname, currentLabel);

  if (!resolvedItems.length) {
    return null;
  }

  return (
    <div className={`${styles.breadcrumbsContainer} ${withinContainer ? styles.withinContainer : ''}`.trim()}>
      <nav className={styles.breadcrumbsNav} aria-label="Breadcrumb">
        {resolvedItems.map((item, idx) => {
          const isLast = idx === resolvedItems.length - 1;
          return (
            <span key={item.path || item.name} className={styles.breadcrumbItem}>
              {!isLast ? (
                <>
                  <Link to={item.path} className={styles.breadcrumbLink}>
                    {item.name}
                  </Link>
                  <span className={styles.separator}>/</span>
                </>
              ) : (
                <span className={styles.breadcrumbCurrent}>{item.name}</span>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
