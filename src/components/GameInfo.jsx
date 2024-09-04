import React from 'react';
import './GameInfo.css';

const GameInfo = ({ promotion, userProfile }) => {
  if (!promotion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-info">
      <img src={promotion.imageUrl} alt={promotion.title} className="game-info-image" />
      <div className="game-info-details">
        <h2>{promotion.title}</h2>
        <p className="price">De R$ {promotion.originalPrice} por R$ {promotion.discountedPrice}</p>
        <div className="game-info-actions">
          <button className="btn-access">Acessar oferta</button>
          <button className="btn-share">Compartilhar</button>
        </div>
        {userProfile && (
          <div className="game-info-user">
            <div className="interaction-icons">
              <span>11 ❤️</span>
              <span>111 👍</span>
            </div>
            <div>
              <img src={userProfile.pictureUrl} alt="User Avatar" />
              <span>{userProfile.name}</span>
            </div>
          
          </div>
        )}
      </div>
      <span className="discount-badge">-{promotion.discountBadge}%</span>
    </div>
  );
};

export default GameInfo;
