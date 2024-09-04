import React, { useEffect, useState } from 'react';
import './RecommendedGames.css';
import GridLayout from './GridLayout'; // Importa o componente de grade
import PromotionCard from './PromotionCard';

const RecommendedGames = () => {
  const [promotions, setPromotions] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('promotions'); 
      const data = await response.json();
      setPromotions(data.slice(0, 6)); // Limitar a 6 itens
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const profiles = {};
      try {
        await Promise.all(
          promotions.map(async (promotion) => {
            const response = await fetch(`/users/${promotion.userId}`);
            
            if (!response.ok) {
              throw new Error(`Failed to fetch user profile for userId: ${promotion.userId}`);
            }
            
            const userProfile = await response.json();
            
            if (userProfile && Object.keys(userProfile).length > 0) {
              profiles[promotion.userId] = userProfile;
            } else {
              throw new Error(`Invalid JSON for userId: ${promotion.userId}`);
            }
          })
        );
        setUserProfiles(profiles);
      } catch (error) {
        console.error("Error fetching user profiles:", error.message);
      }
    };
  
    if (promotions.length > 0) {
      fetchUserProfiles();
    }
  }, [promotions]);

  return (
    <div className="recommended-container">
      <h2>Jogos Recomendados</h2>
      <GridLayout>  {/* Usa o componente GridLayout */}
        {promotions.map((promotion) => (
          <PromotionCard
            key={promotion.id}  
            id={promotion.id}  
            title={promotion.title}
            originalPrice={promotion.originalPrice}
            discountedPrice={promotion.discountedPrice}
            discount={promotion.discountBadge}
            platform={promotion.platform}
            image={promotion.imageUrl}
            likes={promotion.likes}
            favorites={promotion.favorites}
            userAvatar={userProfiles[promotion.userId]?.pictureUrl}
          />
        ))}
      </GridLayout>
    </div>
  );
};

export default RecommendedGames;
