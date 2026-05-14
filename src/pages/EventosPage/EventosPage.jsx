import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar/Navbar';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../components/layout/Footer/Footer';
import styles from './EventosPage.module.css';

const eventGalleryImages = {
  exploradores: [
    '/assets/images/Evento/ExploradoresDelArte1.webp',
    '/assets/images/Evento/ExploradoresDelArte2.webp',
    '/assets/images/Evento/ExploradoresDelArte3.webp',
    '/assets/images/Evento/ExploradoresDelArte4.webp'
  ],
  dialogos: [
    '/assets/images/Evento/DiálogosConSentido1.webp',
    '/assets/images/Evento/DiálogosConSentido2.webp',
    '/assets/images/Evento/DiálogosConSentido3.webp',
    '/assets/images/Evento/DiálogosConSentido4.webp'
  ],
  visuallab: [
    '/assets/images/Evento/VisualLab1.webp',
    '/assets/images/Evento/VisualLab2.webp',
    '/assets/images/Evento/VisualLab3.webp'
  ],
  callemuseo: [
    '/assets/images/Evento/CalleMuseo1.webp',
    '/assets/images/Evento/CalleMuseo2.webp',
    '/assets/images/Evento/CalleMuseo3.webp',
    '/assets/images/Evento/CalleMuseo4.webp'
  ],
  mediacion: [
    '/assets/images/Evento/LaboratorioDeMediacion1.webp',
    '/assets/images/Evento/LaboratorioDeMediacion2.webp',
    '/assets/images/Evento/LaboratorioDeMediacion3.webp',
    '/assets/images/Evento/LaboratorioDeMediacion4.webp'
  ],
  salaMediacion: [
    '/assets/images/Evento/SalaDeMediacion1.webp',
    '/assets/images/Evento/SalaDeMediacion2.webp',
    '/assets/images/Evento/SalaDeMediacion3.webp'
  ],
  maestre: [
    '/assets/images/Evento/YoMaestre1.webp',
    '/assets/images/Evento/YoMaestre2.webp',
    '/assets/images/Evento/YoMaestre3.webp'
  ],
  'banca-azul': [
    '/assets/images/Evento/LaBancaAzul1.webp',
    '/assets/images/Evento/LaBancaAzul2.webp',
    '/assets/images/Evento/LaBancaAzul3.webp',
    '/assets/images/Evento/LaBancaAzul4.webp'
  ],
  patioTotumo: [
    '/assets/images/Evento/ElPatioDelTotumo1.webp',
    '/assets/images/Evento/ElPatioDelTotumo2.webp',
    '/assets/images/Evento/ElPatioDelTotumo3.webp'
  ]
};

const introParagraphs = [
  'El Museo de Antioquia activa programas, laboratorios y encuentros que conectan el arte con la vida cotidiana, la escuela, la ciudad y los territorios. Cada proceso busca abrir conversaciones, acompañar aprendizajes y convertir el museo en un espacio vivo para la experimentación colectiva.',
  'Aquí reunimos experiencias para infancias, juventudes, docentes, mediadores, lectores y comunidades que encuentran en el museo un lugar para crear, pensar y compartir. Esta página reúne una parte de esos procesos y hace visible la diversidad de formatos con los que el museo se relaciona con sus públicos.'
];

const programs = [
  {
    id: 'exploradores',
    title: 'Exploradores del Arte',
    paragraphs: [
      'Exploradores del Arte es un programa del Museo de Antioquia dirigido a niños y niñas de 2 a 5 años, que los invita a descubrir el arte a través del juego, la exploración sensorial y la imaginación. Inspirado en la filosofía para niños, las pedagogías alternativas y la historia del arte, este espacio propone experiencias donde el asombro y la curiosidad se convierten en el punto de partida para aprender.',
      'A través de talleres y encuentros creativos, los pequeños exploradores se acercan al arte como un lenguaje para expresar lo que sienten y piensan, fortaleciendo su sensibilidad, su pensamiento crítico y su vínculo con el museo como un lugar de descubrimiento y disfrute.'
    ],
    galleryImages: eventGalleryImages.exploradores
  },
  {
    id: 'dialogos',
    title: 'Diálogos con sentido',
    paragraphs: [
      'Diálogos con Sentido es un programa del Museo de Antioquia, en alianza con Bancolombia, dirigido a niños, niñas e infancias entre los 6 y 12 años del centro de Medellín y su entorno. Desde 2016, fortalece en ellos el reconocimiento de sí mismos como sujetos de derechos, con voz y capacidad para transformar su contexto.',
      'A través de experiencias semanales que articulan educación socioafectiva, expresión plástica y audiovisual, y participación democrática, el programa impulsa la convivencia, el pensamiento crítico y la construcción colectiva de ciudad.',
      'Su metodología se desarrolla en cuatro fases —Inspiración, Búsqueda, Acción y Socialización— que invitan a explorar, crear y compartir ideas como parte activa de la comunidad y de la vida cultural del museo.'
    ],
    galleryImages: eventGalleryImages.dialogos
  },
  {
    id: 'visuallab',
    title: 'Visual Lab',
    paragraphs: [
      'Visual Lab es un programa del Museo de Antioquia dirigido a jóvenes entre los 13 y 18 años, principalmente habitantes de la comuna 10 de Medellín y del entorno del Museo. Este espacio invita a descubrir en el arte una herramienta para explorar quiénes somos, expresar emociones y construir identidad durante esta etapa de la vida.',
      'Inspirado en las obras de la colección del Museo de Antioquia y en las prácticas artísticas contemporáneas, Visual Lab propone un proceso de experimentación y creación que combina la reflexión, la sensibilidad y la expresión visual. A través de talleres y encuentros colaborativos, los y las participantes encuentran en el arte un lenguaje para imaginar, sentir y transformar su relación con el mundo.'
    ],
    galleryImages: eventGalleryImages.visuallab
  },
  {
    id: 'callemuseo',
    title: 'Calle Museo',
    paragraphs: [
      'Calle Museo – Acciones desde el arte y la cultura toma su nombre de los hallazgos que dejó la versión de 2021 de Acciones desde el arte y la cultura, en la que los chicos y chicas participantes manifestaron el interés y el deseo de vivir la ciudad, sus territorios, historias y memorias desde el recorrerla y pasarla por el cuerpo. Por eso, en 2022 el proceso se enfocó en vivir los lenguajes artísticos y plásticos desde esa inmersión que permite habitar, hablar y vivir la ciudad desde la calle, de otras maneras.',
      'Estas memorias del proceso vivido durante 2022 obedecen a tres líneas que, por su potencia plástica y artística, su capacidad semántica y su relevancia social, los y las jóvenes reconocieron como formas de expresión fundamentales para su relación con el mundo.'
    ],
    galleryImages: eventGalleryImages.callemuseo
  },
  {
    id: 'mediacion',
    title: 'Laboratorio de Mediación',
    paragraphs: [
      'El Laboratorio de Mediación es un espacio de formación colectiva donde el arte, la educación y la cultura se encuentran para pensar la mediación desde múltiples perspectivas. Reúne a mediadores, artistas y agentes culturales para compartir experiencias, fortalecer prácticas pedagógicas y construir conocimiento de manera colaborativa.',
      'En esta octava versión, el proceso propone reflexionar sobre la relación entre la colección del Museo y los relatos de ciudad, especialmente los que emergen en el centro de Medellín, preguntándose por la memoria, las historias oficiales y aquellas que permanecen en los márgenes.',
      'La convocatoria abre del 6 al 15 de marzo, con resultados el 18 de marzo e inicio de sesiones el 26 de marzo. El programa se organiza en dos módulos experienciales y comprende 12 sesiones presenciales, quincenales, los jueves de 2:00 p.m. a 5:00 p.m., para un grupo de 30 personas.'
    ],
    galleryImages: eventGalleryImages.mediacion
  },
  {
    id: 'maestre',
    title: 'Yo Maestre',
    paragraphs: [
      'Yo Maestre es un programa que acompaña a docentes y agentes educativos en la búsqueda de nuevas formas de enseñar y aprender a través del arte. Desde un proceso teórico-práctico, propone explorar el Museo de Antioquia como un aula expandida y crear herramientas didácticas que conecten arte, escuela y vida cotidiana.',
      'En su octava versión, el programa invita a pensar el museo como un espacio para conversar sobre identidad, memoria, territorio y ciudadanía, reconociendo a los y las docentes como mediadores culturales capaces de generar experiencias más conscientes y dialogantes desde el aula.',
      'El proceso contará con 12 sesiones quincenales de tres horas, los sábados de 10:00 a.m. a 1:00 p.m., para un grupo de hasta 30 participantes. Las inscripciones estarán abiertas del 9 al 23 de marzo, los seleccionados se anunciarán el 26 de marzo y las sesiones iniciarán el 28 de marzo.'
    ],
    galleryImages: eventGalleryImages.maestre
  },
  {
    id: 'banca-azul',
    title: 'La Banca Azul',
    paragraphs: [
      'La Banca Azul es un programa de mediación y promoción de lecturas, escrituras y oralidades que une arte y literatura para activar la Biblioteca del Museo y sus alrededores en el centro de Medellín, generando encuentros con las comunidades que habitan y visitan este territorio.',
      'A través de lecturas, conversaciones y experiencias en torno al arte, el programa reivindica las prácticas LEO como caminos para imaginar, compartir la palabra y descubrir nuevas formas de habitar el territorio.',
      'A esta propuesta se suma una biblioteca móvil que recorre la Plaza Botero y el espacio público cercano llevando libros, imágenes, voces y preguntas para avivar la discusión, la creación literaria y el goce de las lecturas, escrituras y oralidades en la vida cotidiana.'
    ],
    galleryImages: eventGalleryImages['banca-azul']
  }
];

const casaIntro = [
  'El Museo de Antioquia, en su interés de contribuir a la construcción de ciudadanías críticas, creativas, sensibles y activas, desde su área misional de Educación, promueve la participación y apropiación de acciones formativas, artísticas y culturales con diferentes grupos poblacionales, desde las infancias a la edad adulta. Todo ello, con el interés de democratizar el acceso y vínculo con las artes, promoviendo la exploración, experimentación y creación.',
  'Su programación, en respuesta a las necesidades contemporáneas y contextuales, contempla la agenda abierta, como la posibilidad de acercar a los múltiples y diversos públicos al Museo, desde actividades que abordan temas especializados de las artes, temáticas sociales, históricas, culturales, entre otros, aplicando metodologías que enfocan su accionar a través de la educación expandida, el aprendizaje situado, la pregunta, el juego y la experimentación sensible.',
  'La Casa del Encuentro, ubicada junto al edificio central del Museo, es el lugar donde se desarrollan estas acciones en diálogo directo con las colecciones y exposiciones, que fomentan el encuentro comunitario, intercambio de saberes y experiencias, y el desarrollo de experiencias educativas y de mediación a través de diversas actividades artísticas y culturales. En su interior, se encuentran espacios como:'
];

const salaMediacionParagraphs = [
  'La Sala de Mediación es un lugar flexible para activar conversaciones, talleres y experiencias de creación compartida. Su lógica es abierta: acoge grupos, preguntas y procesos que necesitan tiempo para ser conversados.',
  'Funciona como un punto de encuentro entre públicos diversos y permite que el museo se piense desde la relación, la palabra y la construcción colectiva de sentido.'
];

const clubs = [
  {
    id: 'rasgaversos',
    title: 'RasgaVersos',
    description:
      'Club de collage y experimentación poética para intervenir, desarmar y reinventar textos e imágenes desde la intuición, el juego y la composición manual.',
    image: '/assets/images/Evento/ClubRasgaVersos.webp',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSfSKD_USn2aeuD-aNs8thmCJUcgpI3mSTMM1cl29c0605cAGg/viewform'
  },
  {
    id: 'club52',
    title: '52con52',
    description:
      'Club de lectura para cruzar literatura, imagen, sonido y conversación crítica en torno a preguntas que dialogan con la ciudad, las memorias y el presente.',
    image: '/assets/images/Evento/Club52con52.webp',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdwhdLlGCamembz3TpT_x6TXXiUZ7Muv2_JzOMYQC4r5cGQTw/viewform'
  },
  {
    id: 'experimentacion',
    title: 'Experimentación en Artes Plásticas',
    description:
      'Un espacio para ensayar materiales, procesos y técnicas desde la curiosidad, el hacer y la exploración sensible de formas, superficies y color.',
    image: '/assets/images/Evento/ClubDeExperimentaciónArtesPlásticas.webp',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSc_2nYDTvCi2a47Ze6o_hK-SXY37dRmIOryp0E8lcGT2MnJuQ/viewform'
  }
];

const bibliotecaIntro = [
  'La Biblioteca y Centro de Documentación Fernando Botero es un espacio abierto a investigadores, estudiantes, artistas y públicos curiosos. Reúne publicaciones, archivos y materiales especializados sobre arte, cultura e historia del museo.',
  'Además de la consulta en sala, es un lugar de acompañamiento, orientación bibliográfica y mediación para procesos académicos, creativos y de investigación.'
];

const bibliotecaServicios = [
  'Consulta en sala de documentos y publicaciones',
  'Acceso al archivo fotográfico del museo',
  'Préstamo interbibliotecario',
  'Orientación bibliográfica para investigadores',
  'Visitas guiadas para grupos académicos'
];

const bibliotecaColecciones = [
  'Fondo Fernando Botero',
  'Arte colombiano',
  'Arte latinoamericano',
  'Historia de Antioquia',
  'Archivo fotográfico'
];

const patioParagraphs = [
  'El Patio del Totumo es un espacio para el diálogo y el encuentro. Allí el museo se abre a conversaciones más pausadas, actividades públicas y formatos donde la escucha y la permanencia importan tanto como la programación.',
  'Su escala y atmósfera permiten imaginarlo como un lugar para talleres, activaciones y encuentros intergeneracionales que amplían la experiencia de visita.'
];

function scrollToHashTarget(hash) {
  if (!hash) {
    return;
  }

  const targetId = hash.replace('#', '');
  const targetElement = document.getElementById(targetId);

  if (!targetElement) {
    return;
  }

  targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
}

function ScrollGallery({ images = [], large = false, title }) {
  const galleryRef = useRef(null);

  const handleScroll = (direction) => {
    const galleryNode = galleryRef.current;

    if (!galleryNode) {
      return;
    }

    const scrollAmount = large ? galleryNode.clientWidth * 0.85 : galleryNode.clientWidth * 0.9;

    galleryNode.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.galleryShell}>
      <button
        type="button"
        className={`${styles.galleryArrow} ${styles.galleryArrowLeft}`}
        onClick={() => handleScroll(-1)}
        aria-label={`Ver imágenes anteriores de ${title}`}
      />
      <div
        ref={galleryRef}
        className={`${styles.scrollGallery} ${large ? styles.scrollGalleryLarge : ''}`}
      >
        {images.map((imageSrc, index) => (
          <div
            key={imageSrc}
            className={`${styles.galleryPlaceholder} ${large ? styles.galleryPlaceholderLarge : ''}`}
          >
            <img
              src={imageSrc}
              alt={`${title} ${index + 1}`}
              className={styles.galleryImage}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className={`${styles.galleryArrow} ${styles.galleryArrowRight}`}
        onClick={() => handleScroll(1)}
        aria-label={`Ver más imágenes de ${title}`}
      />
    </div>
  );
}

function SectionBlock({ id, title, children }) {
  return (
    <section id={id} className={styles.sectionBlock}>
      <div className={styles.sectionHeadingColumn}>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <div className={styles.sectionContentColumn}>{children}</div>
    </section>
  );
}

function ProgramBlock({ program }) {
  return (
    <article id={program.id} className={styles.programBlock}>
      <h3 className={styles.programTitle}>{program.title}</h3>
      <ScrollGallery images={program.galleryImages} title={program.title} />

      <div className={styles.programCopy}>
        {program.paragraphs.map((paragraph) => (
          <p key={paragraph} className={styles.bodyText}>
            {paragraph}
          </p>
        ))}
      </div>

      {program.showEmbedPlaceholder ? (
        <div className={styles.embedPlaceholder}>Placeholder Iframe / Visor PDF</div>
      ) : null}

      {program.action ? (
        <a className={styles.ctaLink} href={program.action.href}>
          {program.action.label}
        </a>
      ) : null}
    </article>
  );
}

const EventosPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToHashTarget(location.hash);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash]);

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className={styles.page}>
        <div className={styles.pageContainer}>
          <header className={styles.hero}>
            <h1 className={styles.pageTitle}>Eventos</h1>
            <div className={styles.heroCopy}>
              {introParagraphs.map((paragraph) => (
                <p key={paragraph} className={styles.bodyText}>
                  {paragraph}
                </p>
              ))}
            </div>
          </header>

          <SectionBlock id="programas" title="Programas">
            {programs.map((program) => (
              <ProgramBlock key={program.id} program={program} />
            ))}
          </SectionBlock>

          <SectionBlock id="casa-del-encuentro" title="Casa del encuentro">
            <div className={styles.contentStack}>
              <div className={styles.introActionBlock}>
                {casaIntro.map((paragraph) => (
                  <p key={paragraph} className={styles.bodyText}>
                    {paragraph}
                  </p>
                ))}

                <a
                  className={`${styles.ctaLink} ${styles.virtualTourLink}`}
                  href="https://museodeantioquia.co/tour360casadelencuentro/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Recorrido virtual Casa del Encuentro
                </a>
              </div>

              <div id="sala-mediacion" className={styles.subsectionBlock}>
                <h3 className={styles.programTitle}>Sala de Mediación</h3>
                <ScrollGallery images={eventGalleryImages.salaMediacion} title="Sala de Mediación" />
                {salaMediacionParagraphs.map((paragraph) => (
                  <p key={paragraph} className={styles.bodyText}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className={styles.subsectionBlock}>
                <h3 className={styles.programTitle}>Clubes y actividades</h3>
                <div className={styles.clubGrid}>
                  {clubs.map((club) => (
                    <article key={club.id} id={club.id} className={styles.clubCard}>
                      <div className={styles.clubImagePlaceholder}>
                        <img src={club.image} alt={club.title} className={styles.clubImage} loading="lazy" />
                      </div>
                      <h4 className={styles.clubTitle}>{club.title}</h4>
                      <p className={`${styles.bodyText} ${styles.clubDescription}`}>{club.description}</p>
                      <a className={`${styles.ctaLink} ${styles.clubCtaLink}`} href={club.href} target="_blank" rel="noreferrer">
                        Inscríbete aquí
                      </a>
                    </article>
                  ))}
                </div>
              </div>

              <div id="biblioteca" className={styles.subsectionBlock}>
                <h3 className={styles.programTitle}>Biblioteca Museo de Antioquia</h3>
                <div className={styles.libraryImagePlaceholder}>
                  <img
                    src="/assets/images/Evento/BibliotecaMuseoDeAntioquia.webp"
                    alt="Biblioteca Museo de Antioquia"
                    className={styles.libraryImage}
                    loading="lazy"
                  />
                </div>

                {bibliotecaIntro.map((paragraph) => (
                  <p key={paragraph} className={styles.bodyText}>
                    {paragraph}
                  </p>
                ))}

                <div className={styles.libraryGrid}>
                  <div>
                    <h3 className={styles.listTitle}>Servicios</h3>
                    <ul className={styles.cleanList}>
                      {bibliotecaServicios.map((item) => (
                        <li key={item} className={styles.cleanListItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className={styles.listTitle}>Fondos y colecciones</h3>
                    <ul className={styles.cleanList}>
                      {bibliotecaColecciones.map((item) => (
                        <li key={item} className={styles.cleanListItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div id="patio-del-totumo" className={`${styles.subsectionBlock} ${styles.patioSection}`}>
                <h3 className={styles.programTitle}>El Patio del Totumo: Un espacio para el diálogo y el encuentro</h3>
                {patioParagraphs.map((paragraph) => (
                  <p key={paragraph} className={styles.bodyText}>
                    {paragraph}
                  </p>
                ))}
                <ScrollGallery images={eventGalleryImages.patioTotumo} title="El Patio del Totumo" />
              </div>
            </div>
          </SectionBlock>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventosPage;

