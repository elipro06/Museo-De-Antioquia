export default function MuseoMap({ className = '', style = {} }) {
  return (
    <iframe
      title="Ubicación Museo de Antioquia"
      src="https://www.google.com/maps?q=Museo%20de%20Antioquia%2C%20Medell%C3%ADn&z=17&output=embed"
      className={className}
      style={{ width: '100%', height: '400px', border: 0, borderRadius: '0', ...style }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
