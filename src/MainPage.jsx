import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MainPage.css';
import RecommendedGames from './components/RecommendedGames';
import MenuBar from './components/MenuBar';
import GameList from './components/GameList';

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // Função para obter o valor da busca da URL
  const getSearchQueryFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || ''; 
  };

  useEffect(() => {
    const query = getSearchQueryFromURL();
    setSearchQuery(query); // Atualiza o estado com o valor da busca da URL
  }, [location.search]);

  return (
    <div>
      <div className="menu-container">
        <div className="menu-content">
          <MenuBar 
            showSearch={true}  // Habilita a barra de pesquisa
            searchQuery={searchQuery}
            onSearchChange={(newQuery) => setSearchQuery(newQuery)}
          />
        </div>
      </div>
      <div className="main-container">
        <section className="main-recommended-section">
          <RecommendedGames />
        </section>
        <section className="main-game-list-section">
          <GameList searchQuery={searchQuery} /> {/* Passa o valor da busca para GameList */}
        </section>
      </div>
    </div>
  );
};

export default MainPage;
