import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GameInfo from './components/GameInfo';
import ColumnLayout from './components/ColumnLayout';
import PromotionCard from './components/PromotionCard';
import MenuBar from './components/MenuBar';
import './Promotion.css';

const Promotion = () => {
  const { id } = useParams();
  const [promotion, setPromotion] = useState(null);
  const [otherPromotions, setOtherPromotions] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const promotionResponse = await fetch(`/promotions/${id}`);
        if (!promotionResponse.ok) {
          throw new Error(`Failed to fetch promotion data: ${promotionResponse.statusText}`);
        }
        const promotionData = await promotionResponse.json();
        setPromotion(promotionData);

        const otherPromotionsResponse = await fetch(`/promotions`);
        if (!otherPromotionsResponse.ok) {
          throw new Error(`Failed to fetch other promotions: ${otherPromotionsResponse.statusText}`);
        }
        const otherPromotionsData = await otherPromotionsResponse.json();
        setOtherPromotions(otherPromotionsData.slice(0, 4));

        const profiles = {};
        await Promise.all(
          otherPromotionsData.map(async (promo) => {
            const userResponse = await fetch(`/users/${promo.userId}`);
            if (!userResponse.ok) {
              throw new Error(`Failed to fetch user profile for userId: ${promo.userId}`);
            }
            const userProfile = await userResponse.json();
            profiles[promo.userId] = userProfile;
          })
        );
        setUserProfiles(profiles);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchGameData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!promotion) {
    return <div>Game not found</div>;
  }

  return (
    <div>
      {/* Menu com largura total */}
      <div className="menu-container">
        <div className="menu-content">
          <MenuBar showSearch={false} /> {/* Desabilita a barra de pesquisa */}
        </div>
      </div>
      <div className="main-container">
        <div className="game-presentation">
          <div className="main-content">
            <GameInfo 
              promotion={promotion} 
              userProfile={userProfiles[promotion.userId]} 
            />
            <div className="comments-section">
              <h2>123 Comentários</h2>
              {/* Conteúdo dos comentários aqui */}
            </div>
          </div>
          <ColumnLayout>
            {otherPromotions.map((promo) => (
              <PromotionCard
                key={promo.id}
                id={promo.id}
                title={promo.title}
                originalPrice={promo.originalPrice}
                discountedPrice={promo.discountedPrice}
                discount={promo.discountBadge}
                platform={promo.platform}
                image={promo.imageUrl}
                likes={promo.likes}
                favorites={promo.favorites}
                userAvatar={userProfiles[promo.userId]?.pictureUrl}
              />
            ))}
          </ColumnLayout>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
