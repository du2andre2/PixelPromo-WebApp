import React, { useState } from 'react';
import './MenuBar.css'; 
import logo from '../images/logo.png'; 
import { FaSearch } from "react-icons/fa";
import { IoMdMenu , IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom'; // Importa o Link do react-router-dom

const MenuBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="main-menu-bar">
            <div className="logo">
                <img src={logo} alt="Pixel Promo" />
            </div>
            <nav className="main-menu-links">
                <Link to="/" className="filter-menu-item">Home</Link>
                <a href="#" className="main-menu-item">
                    Destaques
                </a>
                <a href="#" className="main-menu-item">
                    Ofertas
                </a>
                <a href="#" className="main-menu-item">
                    Favoritos
                </a>
                <a href="#" className="main-menu-item">
                    Perfil
                </a>
            </nav>
            <div className="search-container">
                <input type="text" placeholder="O que você procura?" className="search-input" />
                <button className="search-button">
                <FaSearch />
                </button>
            </div>
            <button className="profile-button" onClick={toggleMenu}>
                {menuOpen ? <IoMdClose /> : <IoMdMenu />}
            </button>
            {menuOpen && (
                <div className="dropdown-menu-filter">
                    <a href="#" className="dropdown-item-filter">
                        Home
                    </a>
                    <a href="#" className="dropdown-item-filter">
                        Destaques
                    </a>
                    <a href="#" className="dropdown-item-filter">
                        Ofertas
                    </a>
                    <a href="#" className="dropdown-item-filter">
                        Favoritos
                    </a>
                    <a href="#" className="dropdown-item-filter">
                        Perfil
                    </a>
                </div>
            )}
        </div>
    );
};

export default MenuBar;
