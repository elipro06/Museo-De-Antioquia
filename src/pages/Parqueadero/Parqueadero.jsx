

import styles from './Parqueadero.module.css';

import Navbar from '../../components/layout/Navbar/Navbar';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../components/layout/Footer/Footer';

const parkingRates = [
  { label: 'Hora carro', value: 'COP 5,200' },
  { label: 'Jornada 12 horas carro', value: 'COP 22,500' },
  { label: 'Tiquetera 10 dias*', value: 'COP 202,000' },
  { label: 'Mensualidad moto', value: 'COP 59,000' }
];

const parkingHours = [
  { label: 'Lunes - Sabado', value: '6:20 a.m. a 9:00 p.m.' },
  { label: 'Domingos y festivos', value: '9:45 a.m. a 5:00 p.m.' }
];

export default function Parqueadero() {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className={styles.parqueaderoMain}>
        <div className={styles.parqueaderoLayout}>
          <div className={styles.parqueaderoMapRect}>
            <iframe
              title="Ubicación Parqueadero Museo de Antioquia"
              src="https://www.google.com/maps?q=Parqueadero%20Museo%20de%20Antioquia%2C%20Medell%C3%ADn&z=18&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className={styles.parqueaderoContent}>
            <h1 className={styles.parqueaderoTitle}>Parqueadero</h1>
            <p className={styles.parqueaderoIntro}>
              Ubicado en la zona exterior del Museo por la carrera 53 Cundinamarca. Las tarifas para 2026 son:
            </p>
            <div className={styles.dataGroup}>
              {parkingRates.map((item) => (
                <div key={item.label} className={styles.dataRow}>
                  <span className={styles.dataLabel}>{item.label}</span>
                  <span className={styles.dataValue}>{item.value}</span>
                </div>
              ))}
            </div>
            <p className={styles.parqueaderoNote}>
              *Los 10 días de la tiquetera son válidos durante todo el año hasta agotarlas
            </p>
            <h2 className={styles.parqueaderoHorarioTitle}>Horario:</h2>
            <div className={styles.dataGroup}>
              {parkingHours.map((item) => (
                <div key={item.label} className={styles.dataRow}>
                  <span className={styles.dataLabel}>{item.label}</span>
                  <span className={styles.dataValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
