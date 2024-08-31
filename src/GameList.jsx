import React, { useState, useEffect } from 'react';
import './GameList.css';
import jogo from './thumb-jogo.jpeg';
import perfil from './perfil.jpeg';

const GameList = () => {
  const [promotions, setPromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('/api/promotions'); 
      const data = await response.json();
      setPromotions(data);
      const response2 = await fetch('/api/promotions/categories'); 
      const data2 = await response2.json();
      setCategories(data2);
    };
    fetchApi();
  }, []);

  const toggleSortingMenu = () => {
    setIsSortingMenuOpen(!isSortingMenuOpen);
    setIsFilterMenuOpen(false); // Fecha o outro menu se estiver aberto
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
    setIsSortingMenuOpen(false); // Fecha o outro menu se estiver aberto
  };

  return (
    <div className="list-container">
      <h2>Ache seu próximo game favorito!</h2>

      <div className="filter-menu">
        <button className="filter-button" onClick={toggleSortingMenu}>
          Ordenar
        </button>
        <button className="filter-button" onClick={toggleFilterMenu}>
          Filtros
        </button>

        {/* Dropdown de Ordenação */}
        {isSortingMenuOpen && (
          <div className="dropdown-menu show-dropdown">
            <a href="#">Destaques</a>
            <a href="#">Recentes</a>
            <a href="#">Em alta</a>
            <a href="#">Menores Preços</a>
          </div>
        )}

        {/* Dropdown de Filtros */}
        {isFilterMenuOpen && (
          <div className="dropdown-menu show-dropdown">
            <a href="#">teste</a>
           {categories.map((category) => ( 
              <a href="#">{category.name}</a>
            ))}            
          </div>
        )}
      </div>

      <div className="game-list">
        {promotions.map((promotion) => (
          <div className="game-card" key={promotion.id}>
            <div className="game-card-header">
              <img src={jogo} alt={promotion.title} className="game-image" />
            </div>
            <div className="game-card-body">
              <div className="price-section">
                <span className="original-price">R$ {promotion.originalPrice}</span>
                <span className="discounted-price">R$ {promotion.discountedPrice}</span>
                <span className="discount-badge">-{promotion.discount}%</span>
              </div>
              <div className="game-title">{promotion.title}</div>
              <div className="platform">Steam</div>
            </div>
            <div className="game-card-footer">
              <div className="user-info">
                <img src={perfil} alt="User Avatar" className="user-avatar" />
              </div>
              <div className="interaction-icons">
                <button className="heart-icon">❤️</button>
                <button className="like-icon">👍 {promotion.likes}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
