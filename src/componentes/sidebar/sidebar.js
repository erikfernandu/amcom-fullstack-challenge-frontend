// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/sidebar.css';

const Sidebar = ({ collapsed }) => {
  return (
    <div className={`sidebar-container ${collapsed ? 'collapsed' : ''}`}>
      <Link to="/vendas">
        <button className={`sidebar-button ${collapsed ? 'collapsed' : ''}`}>
          {/* <span className="icon">&#x1F4B0;</span> */}
          Vendas
          <span className="arrow">&#x2192;</span>
        </button>
      </Link>
      <Link to="/comissoes">
        <button className={`sidebar-button ${collapsed ? 'collapsed' : ''}`}>
          {/* <span className="icon">&#x1F4B5;</span> */}
          Comissões
          <span className="arrow">&#x2192;</span>
        </button>
      </Link>
    </div>
  );
};

export default Sidebar;

