import React, { useState } from 'react';
import './MenuBar.css'; // Certifique-se de que o arquivo CSS está corretamente nomeado

const MenuBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="main-menu-bar">
            <div className="logo">
                <img src="logo.png" alt="Pixel Promo" />
            </div>
            <a href="#" className="main-menu-item">
                <i className="icon-home"></i> Home
            </a>
            <a href="#" className="main-menu-item">
                <i className="icon-star"></i> Destaques
            </a>
            <a href="#" className="main-menu-item">
                <i className="icon-tag"></i> Ofertas
            </a>
            <div className="search-container">
                <input type="text" placeholder="O que você procura?" className="search-input" />
                <button className="search-button">
                    <i className="icon-search"></i> Buscar
                </button>
            </div>
            <a href="#" className="main-menu-item">
                <i className="icon-heart"></i> Favoritos
            </a>
            <a href="#" className="main-menu-item">
                <i className="icon-user"></i> Perfil
            </a>
            <button className="profile-button" onClick={toggleMenu}>
                <i className={menuOpen ? "icon-close" : "icon-menu"}></i> {menuOpen ? "Fechar" : "Menu"}
            </button>
            {menuOpen && (
                <div className="dropdown-menu">
                    <a href="#" className="dropdown-item">
                        <i className="icon-home"></i> Home
                    </a>
                    <a href="#" className="dropdown-item">
                        <i className="icon-star"></i> Destaques
                    </a>
                    <a href="#" className="dropdown-item">
                        <i className="icon-tag"></i> Ofertas
                    </a>
                    <a href="#" className="dropdown-item">
                        <i className="icon-heart"></i> Favoritos
                    </a>
                    <a href="#" className="dropdown-item">
                        <i className="icon-user"></i> Meu Perfil
                    </a>
                </div>
            )}
        </div>
    );
};

export default MenuBar;
