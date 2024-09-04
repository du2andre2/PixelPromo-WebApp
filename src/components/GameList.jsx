import React, { useState, useEffect } from 'react';
import './GameList.css';
import GridLayout from './GridLayout'; // Importa o componente de grade
import PromotionCard from './PromotionCard';
import FilterMenu from './FilterMenu'; // Importa o componente de filtro

const GameList = () => {
  const [promotions, setPromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});

  useEffect(() => {
    // Fetch promotions data
    const fetchPromotions = async () => {
      const response = await fetch('/promotions');
      const data = await response.json();
      setPromotions(data);
    };

    // Fetch categories data
    const fetchCategories = async () => {
      const response = await fetch('promotions/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchPromotions();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch user data for each promotion's userId
    const fetchUserProfiles = async () => {
      const profiles = {};
      try {
        await Promise.all(
          promotions.map(async (promotion) => {
            const response = await fetch(`/users/${promotion.userId}`);
            
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
              throw new Error(`Failed to fetch user profile for userId: ${promotion.userId}`);
            }
            
            const userProfile = await response.json();
            
            // Verifica se o JSON é válido
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
    <div className="list-container">
      <h2>Ache seu próximo game favorito!</h2>

      {/* Usa o componente FilterMenu */}
      <FilterMenu categories={categories} />

      <div className="game-list">
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
    </div>
  );
};

export default GameList;
