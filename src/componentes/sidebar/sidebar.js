import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './css/sidebar.css';

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);

  return (
    <div className={`sidebar-container ${isSidebarOpen ? '' : 'collapsed'}`}>
      <div></div>
      <Link to="/vendas">
        <button className={`sidebar-button ${isSidebarOpen ? '' : 'collapsed'}`}>
          Vendas
          <span className="arrow">&#x2192;</span>
        </button>
      </Link>
      <Link to="/comissoes">
        <button className={`sidebar-button ${isSidebarOpen ? '' : 'collapsed'}`}>
          Comissões
          <span className="arrow">&#x2192;</span>
        </button>
      </Link>
    </div>
  );
};

export default Sidebar;