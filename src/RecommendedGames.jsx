import React, { useEffect, useState } from 'react';
import './RecommendedGames.css';
import jogo from './thumb-jogo.jpeg';
import perfil from './perfil.jpeg';

const RecommendedGames = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('promotions'); 
      const data = await response.json();
      setPromotions(data.slice(0, 6)); // Limitar a 6 itens
    };
    fetchApi();
  }, []);

  return (
    <div className="recommended-container">
      <h2>Jogos Recomendados</h2>
      <div className="recommended-list">
        {promotions.map((promotion) => (
          <div className="recommended-game-card" key={promotion.id}>
            <div className="recommended-game-card-header">
              <img src={jogo} alt={promotion.title} className="game-image" />
            </div>
            <div className="recommended-game-card-body">
              <div className="recommended-price-section">
                <span className="recommended-original-price">R$ {promotion.originalPrice}</span>
                <span className="recommended-discounted-price">R$ {promotion.discountedPrice}</span>
                <span className="recommended-discount-badge">-{promotion.discount}%</span>
              </div>
              <div className="recommended-game-title">{promotion.title}</div>
              <div className="recommended-platform">Steam</div>
            </div>
            <div className="recommended-game-card-footer">
              <div className="recommended-user-info">
                <img src={perfil} alt="User Avatar" className="user-avatar" />
              </div>
              <div className="recommended-interaction-icons">
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

export default RecommendedGames;