import React from 'react';
import './MainPage.css';
import RecommendedGames from './RecommendedGames'; 
import MenuBar from './MenuBar';
import GameList from './GameList'; 

const MainPage = () => {
  return (
    <div className="main-container">
      <MenuBar />
      <section className="main-recommended-section">
        <RecommendedGames />
      </section>

      <section className="main-game-list-section">
        <GameList />
      </section>

    </div>
  );
};

export default MainPage;
