import React from 'react';
import Lobby from './components/Lobby';
import GameScreen from './components/GameScreen';
import RankingScreen from './components/RankingScreen'; // Importe o novo componente
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const roomId = useSelector((state) => state.game.roomId); // Ainda pode ser útil para alguma lógica futura

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/ranking" element={<RankingScreen />} /> {/* Adicione a nova rota */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;