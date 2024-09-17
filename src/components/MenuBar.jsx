import React, { useState, useEffect } from 'react';
import './MenuBar.css';
import { FaSearch } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { Link, useHistory, useLocation } from 'react-router-dom'; 
import logo from '../images/logo.png';

const MenuBar = ({ showSearch }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const history = useHistory();
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            history.push({
                pathname: '/', // Redireciona para a página inicial
                search: `?search=${encodeURIComponent(searchQuery)}`, // Adiciona o valor da busca como query param
            });
        }
    };

    // Atualiza o campo de busca com base na URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get('search') || '';
        setSearchQuery(search);
    }, [location.search]);

    return (
        <div className="main-menu-bar">
            <div className="logo">
                <img src={logo} alt="Pixel Promo" />
            </div>
            <nav className="main-menu-links">
                <Link to="/" className="filter-menu-item">Home</Link>
                <a href="#" className="main-menu-item">Destaques</a>
                <a href="#" className="main-menu-item">Ofertas</a>
                <a href="#" className="main-menu-item">Favoritos</a>
                <a href="#" className="main-menu-item">Perfil</a>
            </nav>
            {showSearch && (  // Exibe o campo de busca apenas se showSearch for true
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="O que você procura?"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className="search-button" onClick={handleSearchSubmit}>
                        <FaSearch />
                    </button>
                </div>
            )}
            <button className="profile-button" onClick={toggleMenu}>
                {menuOpen ? <IoMdClose /> : <IoMdMenu />}
            </button>
            {menuOpen && (
                <div className="dropdown-menu-filter">
                    <a href="#" className="dropdown-item-filter">Home</a>
                    <a href="#" className="dropdown-item-filter">Destaques</a>
                    <a href="#" className="dropdown-item-filter">Ofertas</a>
                    <a href="#" className="dropdown-item-filter">Favoritos</a>
                    <a href="#" className="dropdown-item-filter">Perfil</a>
                </div>
            )}
        </div>
    );
};

export default MenuBar;
