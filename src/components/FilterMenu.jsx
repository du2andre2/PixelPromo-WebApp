import React, { useState } from 'react';
import './FilterMenu.css';

const FilterMenu = ({ categories, onApplyFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const applyFilters = () => {
    onApplyFilters(selectedCategories);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    onApplyFilters([]); // Chama a função para aplicar os filtros com categorias vazias
  };

  return (
    <div className="filter-menu">
      <div className="filter-buttons">
        <button className="filter-button" onClick={toggleFilterMenu}>
          Filtros
        </button>
      </div>
  
      {isFilterMenuOpen && (
        <div className="dropdown-menu show-dropdown">
          <h3>Filtrar por Categoria</h3>
          {categories.map((category, index) => (
            <label key={index} className="checkbox-item">
              <input
                type="checkbox"
                value={category.name}
                onChange={() => handleCategoryChange(category.name)}
                checked={selectedCategories.includes(category.name)}
              />
              {category.name}
            </label>
          ))}
  
          <div className="filter-actions">
            <button 
              className="apply-filters" 
              onClick={applyFilters}
              disabled={selectedCategories.length === 0}  // Desabilitar se nenhum filtro for selecionado
            >
              Aplicar Filtros
            </button>
            <button className="reset-filters" onClick={resetFilters}>
              Limpar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
