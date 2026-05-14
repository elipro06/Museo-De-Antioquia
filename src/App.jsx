import MapasPisos from './pages/MapasPisos/MapasPisos';
import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home/Home';
import PlaneaTuVisita from './pages/PlaneaTuVisita/PlaneaTuVisita';
import ProgramaTuVisita from './pages/ProgramaTuVisita/ProgramaTuVisita';
import ExposicionesPage from './pages/ExposicionesPage/ExposicionesPage';
import DetailView from './pages/DetailView/DetailView';
// import PersonalizaRecorrido from './pages/PersonalizaRecorrido/PersonalizaRecorrido';
import ChatBotRecorrido from './pages/ChatBotRecorrido/ChatBotRecorrido';
import ComoLlegar from './pages/ComoLlegar/ComoLlegar';
import ArteYArtistasPage from './pages/ArteYArtistasPage/ArteYArtistasPage';
import ArteYArtistasDetailPage from './pages/ArteYArtistasPage/ArteYArtistasDetailPage';
import EventosPage from './pages/EventosPage/EventosPage';
import Conocenos from './pages/Conocenos/Conocenos';
import Parqueadero from './pages/Parqueadero/Parqueadero';
import Restaurantes from './pages/Restaurantes/Restaurantes';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planea-tu-visita" element={<PlaneaTuVisita />} />
        <Route path="/recomendaciones" element={<Navigate to="/planea-tu-visita#recomendaciones" replace />} />
        <Route path="/programa-tu-visita" element={<ProgramaTuVisita />} />
        <Route path="/exposiciones" element={<ExposicionesPage />} />
        <Route path="/exposiciones/:id" element={<DetailView />} />
        <Route path="/educacion" element={<Navigate to="/eventos" replace />} />
        {/* <Route path="/personaliza" element={<PersonalizaRecorrido />} /> */}
        <Route path="/chatbot-recorrido" element={<ChatBotRecorrido />} />
        <Route path="/como-llegar" element={<ComoLlegar />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/conocenos" element={<Conocenos />} />
        <Route path="/arte-y-artistas" element={<ArteYArtistasPage />} />
        <Route path="/arte-y-artistas/:id" element={<ArteYArtistasDetailPage />} />
        <Route path="/parqueadero" element={<Parqueadero />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        <Route path="/mapaspisos" element={<MapasPisos />} />
        {/* ...existing code... */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;