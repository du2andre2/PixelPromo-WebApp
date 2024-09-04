import React from 'react';
import { useHistory } from 'react-router-dom';
import './PromotionCard.css';

function PromotionCard({ id, title, originalPrice, discountedPrice, discount, platform, image, likes, favorites, userAvatar }) {
    const history = useHistory();

    const handleClick = () => {
        history.push(`/promotion/${id}`);
    };
    return (
        <div className="promotion-card" onClick={handleClick}>
            <div className="promotion-card-header">
                <img src={image} alt={title} className="game-image" />
            </div>
            <div className="promotion-card-body">
                <div className="price-section">
                    <span className="original-price">R$ {originalPrice}</span>
                    <span className="discounted-price">R$ {discountedPrice}</span>
                    <span className="discount-badge">-{discount}%</span>
                </div>
                <div className="game-title">{title}</div>
                <div className="platform">{platform}</div>
            </div>
            <div className="promotion-card-footer">
                <div className="user-info">
                    {userAvatar && (
                        <img src={userAvatar} alt="User Avatar" className="user-avatar" />
                    )}
                </div>
                <div className="interaction-icons">
                    <button className="heart-icon">10000❤️ {favorites}</button>
                    <button className="like-icon">10000👍 {likes}</button>
                </div>
            </div>
        </div>
    );
}

export default PromotionCard;
