import React, { useState, useEffect } from 'react';
import './GameList.css';

const GameList = () => {
  const [promotions, setPromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch promotions data
    const fetchPromotions = async () => {
      const response = await fetch('promotions');
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

  const toggleSortingMenu = () => {
    setIsSortingMenuOpen(!isSortingMenuOpen);
    setIsFilterMenuOpen(false);
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
    setIsSortingMenuOpen(false);
  };

  return (
    <div className="list-container">
      <h2>Ache seu próximo game favorito!</h2>

      <div className="filter-menu">
        <a href="#" className="">
            <i className="icon-home"></i> Destaques
        </a>
        <a href="#" className="">
            <i className="icon-star"></i> Recentes
        </a>
        <a href="#" className="">
            <i className="icon-tag"></i> Em alta
        </a>
        <a href="#" className="">
            <i className="icon-tag"></i> Menores Preços
        </a>
        <button className="filter-button" onClick={toggleSortingMenu}>
          Ordenar
        </button>
        <button className="filter-button" onClick={toggleFilterMenu}>
          Filtros
        </button>

        {/* Dropdown de Ordenação */}
        {isSortingMenuOpen && (
          <div className="dropdown-menu show-dropdown">
            <a href="#" className="dropdown-item">
              <i className="icon-home"></i> Destaques
            </a>
            <a href="#" className="dropdown-item">
              <i className="icon-home"></i> Recentes
            </a>
            <a href="#" className="dropdown-item">
              <i className="icon-home"></i> Em alta
            </a>
            <a href="#" className="dropdown-item">
              <i className="icon-home"></i> Menores Preços
            </a>
          </div>
        )}

        {/* Dropdown de Filtros */}
        {isFilterMenuOpen && (
          <div className="dropdown-menu show-dropdown">
            {categories.map((category) => ( 
              <a href="#" className="dropdown-item">
                <i className="icon-home"></i> {category.name}
              </a>
            ))}
          </div>
    
        )}
      </div>

      <div className="game-list">
        {promotions.map((promotion) => (
          <div className="game-card" key={promotion.id}>
            <div className="game-card-header">
              <img src={promotion.imageUrl} alt={promotion.title} className="game-image" />
            </div>
            <div className="game-card-body">
              <div className="price-section">
                <span className="original-price">R$ {promotion.originalPrice}</span>
                <span className="discounted-price">R$ {promotion.discountedPrice}</span>
                <span className="discount-badge">-{promotion.discountBadge}%</span>
              </div>
              <div className="game-title">{promotion.title}</div>
              <div className="platform">{promotion.platform}</div>
            </div>
            <div className="game-card-footer">
              <div className="user-info">
                {userProfiles[promotion.userId] && (
                  <img src={userProfiles[promotion.userId].pictureUrl} alt="User Avatar" className="user-avatar" />
                )}
              </div>
              <div className="interaction-icons">
                <button className="heart-icon">❤️{promotion.favorites}</button>
                <button className="like-icon">👍{promotion.likes}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
