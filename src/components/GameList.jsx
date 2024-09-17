import React, { useState, useEffect } from 'react';
import './GameList.css';
import GridLayout from './GridLayout';
import PromotionCard from './PromotionCard';
import FilterMenu from './FilterMenu';

const GameList = ({ searchQuery }) => {
  const [promotions, setPromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('categories');
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Função para buscar promoções com base em categorias e termo de busca
  const fetchPromotions = async (categories, search) => {
    setLoading(true); // Inicia o loading
    let url = '/promotions';
    
    const queryParams = [];

    if (categories.length > 0) {
      categories.forEach((category) => {
        queryParams.push(`category=${category}`);
      });
    }
    if (search) {
      queryParams.push(`search=${search}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    const response = await fetch(url);
    if (response.status === 204) {
      setPromotions([]); // Lista vazia
    } else {
      const data = await response.json();
      setPromotions(data);
    }
    setLoading(false); // Finaliza o loading
  };

  useEffect(() => {
    // Busca promoções sempre que as categorias ou o termo de busca mudarem
    fetchPromotions(selectedCategories, searchQuery);
  }, [selectedCategories, searchQuery]);

  const handleApplyFilters = (categories) => {
    setSelectedCategories(categories); // Atualiza categorias selecionadas
  };

  return (
    <div className="list-container">
      <h2>Ache seu próximo game favorito!</h2>

      <FilterMenu categories={categories} onApplyFilters={handleApplyFilters} />

      <div className="game-list">
        {loading ? (
          <p>Carregando...</p>
        ) : promotions.length > 0 ? (
          <GridLayout>
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
                userAvatar={promotion.userAvatar}
              />
            ))}
          </GridLayout>
        ) : (
          <p>Nenhuma promoção encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default GameList;
