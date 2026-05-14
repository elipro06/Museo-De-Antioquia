import React from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { Footer } from '../../components/layout/Footer/Footer';
import styles from './Conocenos.module.css';

const pullQuotes = [
  'Consideramos que esta es una de las principales funciones de la institución: cuidar la conversación pública entre el arte, la ciudad y sus habitantes.',
  'El museo no existe para aislarse del presente, sino para darle forma, espesor y memoria a lo que todavía estamos aprendiendo a nombrar.'
];

const manifestoSections = [
  [
    'Desde la dirección del Museo de Antioquia, estos últimos años han significado un ejercicio constante de escucha, revisión y responsabilidad pública. Más que administrar una institución cultural, nos ha correspondido preguntarnos qué clase de museo necesita hoy Medellín, cómo debe habitarse un edificio atravesado por memorias diversas y de qué manera una colección puede seguir produciendo sentido en medio de un presente tan cambiante.',
    'Durante este tiempo entendimos que el museo no podía limitarse a custodiar obras ni a repetir un relato estable sobre el arte. Tenía que convertirse en un lugar capaz de abrir preguntas, tensionar las versiones oficiales, recibir contradicciones y ofrecer a sus públicos un espacio donde el pasado y el presente se miraran de frente. Esa convicción ha orientado decisiones curatoriales, pedagógicas, editoriales y comunitarias.'
  ],
  [
    'También aprendimos que una institución cultural no se sostiene solamente en la programación visible. Se sostiene en los vínculos que es capaz de tejer. En la confianza que construye con artistas, mediadores, docentes, lectores, investigadores, vecinas, niños y jóvenes que encuentran aquí no una respuesta definitiva, sino una plataforma para ensayar otras formas de encuentro.',
    'Por eso insistimos en que el museo debía extenderse más allá de sus salas. Habitar la Plaza Botero, activar la calle Cundinamarca, acompañar procesos educativos, escuchar los territorios y revisar nuestras formas de acceso no fueron gestos periféricos sino parte central de nuestra razón de ser. La institución debía respirar al ritmo de la ciudad y no detrás de sus muros.'
  ],
  [
    'En estos siete años fortalecimos una idea de museo que no teme a la complejidad. Un museo que puede albergar la obra de Fernando Botero y, al mismo tiempo, discutir críticamente los relatos que han organizado la historia del arte en Antioquia. Un museo que reconoce el valor del patrimonio, pero que no confunde conservación con inmovilidad. Un museo que mira la tradición no como una vitrina cerrada, sino como una materia viva que se transforma cada vez que alguien la interpreta desde el presente.',
    'Ese trabajo ha exigido revisar lenguajes, formatos y jerarquías. Nos ha pedido pensar mejor cómo se escribe un texto de sala, cómo se media una exposición, cómo se acoge a quien llega por primera vez y cómo se diseñan experiencias que no expulsen a quienes históricamente no se han sentido convocados por los espacios culturales. En cada una de esas preguntas hay una toma de posición ética.'
  ],
  [
    'Si algo hemos confirmado es que el museo tiene una función pública insustituible: ofrecer contexto cuando la velocidad del presente simplifica, ofrecer tiempo cuando todo parece exigir inmediatez, y ofrecer sensibilidad cuando el lenguaje político y social se endurece. El arte no resuelve por sí solo los conflictos de una ciudad, pero sí puede ampliar la capacidad colectiva de observarlos, narrarlos y comprenderlos.',
    'Por eso defendemos un museo atento al disenso, a la imaginación y a la conversación. Un museo que no se conforma con ser visitado, sino que aspira a ser apropiado. Que no busca públicos obedientes, sino comunidades activas. Que no teme cambiar cuando el contexto lo exige, porque sabe que la relevancia institucional no se hereda: se construye todos los días, con trabajo, rigor y apertura.'
  ],
  [
    'Mirar hacia atrás permite reconocer avances, pero sobre todo confirma la magnitud de lo que aún falta. Queremos un museo cada vez más permeable, más generoso, más crítico y más hospitalario. Un museo capaz de hacerse preguntas incómodas sin perder su vocación de encuentro. Un museo que entienda que la cultura no es un lujo complementario, sino una forma concreta de producir ciudadanía y de imaginar futuros compartidos.',
    'Ese ha sido, en esencia, el horizonte de estos últimos siete años: sostener al Museo de Antioquia como una institución viva, situada, intelectual y sensible. Un lugar donde el arte no se separa de la vida y donde la vida, con toda su densidad, sigue entrando para transformar lo que entendemos por museo.'
  ]
];

export default function Conocenos() {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className={styles.page}>
        <article className={styles.pageFrame}>
          <header className={styles.articleHeader}>
            <p className={styles.eyebrow}>Manifiesto</p>
            <h1 className={styles.title}>El Museo de Antioquia, los últimos siete años</h1>
            <div className={styles.heroImageContainer}>
              <img
                src="/assets/images/Conocenos/Conocenos.webp"
                alt="Museo de Antioquia"
                className={styles.heroImage}
                loading="lazy"
              />
            </div>
            <div className={styles.authorBlock}>
              <span className={styles.authorLabel}>Por:</span>
              <span className={styles.authorName}>María del Rosario Escobar</span>
              <span className={styles.authorMeta}>Directora del Museo de Antioquia</span>
            </div>
            <div className={styles.anchorRule} />
          </header>

          <div className={styles.articleBody}>
            <p className={styles.kicker}>
              Un manifiesto editorial sobre el museo como espacio público, archivo vivo y plataforma de conversación con la ciudad.
            </p>
            {manifestoSections.map((section, index) => (
              <section key={`section-${index}`} className={styles.textSection}>
                {section.map((paragraph, paragraphIndex) => (
                  <React.Fragment key={paragraph}>
                    <p className={styles.paragraph}>{paragraph}</p>
                    {index === 1 && paragraphIndex === 0 ? (
                      <blockquote className={`${styles.pullQuote} ${styles.pullQuotePrimary}`}>
                        {pullQuotes[0]}
                      </blockquote>
                    ) : null}
                    {index === 3 && paragraphIndex === 0 ? (
                      <blockquote className={`${styles.pullQuote} ${styles.pullQuoteSecondary}`}>
                        {pullQuotes[1]}
                      </blockquote>
                    ) : null}
                  </React.Fragment>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
