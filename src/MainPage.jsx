import React from 'react';
import './MainPage.css';
import RecommendedGames from './components/RecommendedGames'; 
import MenuBar from './components/MenuBar';
import GameList from './components/GameList'; 

const MainPage = () => {
  return (
    <div>
      {/* Menu com largura total */}
      <div className="menu-container">
        <div className="menu-content">
          <MenuBar />
        </div>
      </div>

      {/* Conteúdo Principal Centralizado */}
      <div className="main-container">
        <section className="main-recommended-section">
          <RecommendedGames />
        </section>

        <section className="main-game-list-section">
          <GameList />
        </section>
      </div>
    </div>
  );
};

export default MainPage;
