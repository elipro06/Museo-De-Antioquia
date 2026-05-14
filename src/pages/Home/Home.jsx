import React from 'react';
import Navbar from '../../components/layout/Navbar/Navbar';
import { HeroBanner } from '../../components/sections/HeroBanner/HeroBanner';
import { Exposiciones } from '../../components/sections/Exposiciones/Exposiciones';
import { WelcomeSection } from '../../components/sections/WelcomeSection';
import Eventos from '../../components/sections/Eventos/Eventos';
import { ArteYArtistas } from '../../components/sections/ArteYArtistas/ArteYArtistas';
import { TuDiaEnElMuseo } from '../../components/sections/TuDiaEnElMuseo/TuDiaEnElMuseo';
import { NuevasIdeas } from '../../components/sections/NuevasIdeas/NuevasIdeas';
import TiendaDestacados from '../../components/sections/TiendaDestacados/TiendaDestacados';
import { Aliados } from '../../components/sections/Aliados/Aliados';

import { Footer } from '../../components/layout/Footer/Footer';


const Home = () => {


  return (
    <>
      <Navbar />
      <main>

        <HeroBanner />
        <WelcomeSection />

        {/* Exposiciones — Carrusel minimalista */}
        <Exposiciones />
        <ArteYArtistas />
        <Eventos />
        <TuDiaEnElMuseo />
        <NuevasIdeas />
        <TiendaDestacados />
        <Aliados />
      </main>
      <Footer />
    </>
  );
};

export default Home;