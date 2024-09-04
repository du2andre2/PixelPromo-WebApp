import React, { useState } from 'react';
import './FilterMenu.css'; // Certifique-se de criar e configurar o CSS correspondente

const FilterMenu = ({ categories }) => {
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const toggleSortingMenu = () => {
    setIsSortingMenuOpen(!isSortingMenuOpen);
    setIsFilterMenuOpen(false);
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
    setIsSortingMenuOpen(false);
  };

  return (
    <div className="filter-menu">
      <div className="filter-menu-links">
        <a href="#" className="filter-menu-item">
          Destaques
        </a>
        <a href="#" className="filter-menu-item">
          Recentes
        </a>
        <a href="#" className="filter-menu-item">
          Em alta
        </a>
        <a href="#" className="filter-menu-item">
          Menores Preços
        </a>
      </div>
      <div className="filter-buttons">
        <button className="filter-button order-button" onClick={toggleSortingMenu}>
          Ordenar
        </button>
        <button className="filter-button" onClick={toggleFilterMenu}>
          Filtros
        </button>
      </div>

      {/* Dropdown de Ordenação */}
      {isSortingMenuOpen && (
        <div className="dropdown-menu show-dropdown">
          <a href="#" className="dropdown-item">
            Destaques
          </a>
          <a href="#" className="dropdown-item">
            Recentes
          </a>
          <a href="#" className="dropdown-item">
            Em alta
          </a>
          <a href="#" className="dropdown-item">
            Menores Preços
          </a>
        </div>
      )}

      {/* Dropdown de Filtros */}
      {isFilterMenuOpen && (
        <div className="dropdown-menu show-dropdown">
          {categories.map((category) => (
            <a href="#" key={category.id} className="dropdown-item">
              {category.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
