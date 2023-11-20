// Header.js
import React from 'react';
import './header.css';
import logo from '../../img/logo.png'

const Header = ({ onToggleCollapse }) => {
  
  return (
    <div className="header-container">
        <span className="menu-icon" onClick={onToggleCollapse}>
          &#9776;
        </span>
        <img className="logo" src={logo} alt="logo" />
        <h1 className="title">Vendas</h1>
    </div>
  );
};

export default Header;
