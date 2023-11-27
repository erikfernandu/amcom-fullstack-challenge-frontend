import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../redux/actions';
import logo from '../../img/logo.png'
import './css/header.css';

const Header = () => {
  const title = useSelector((state) => state.title.title);
  const dispatch = useDispatch();
  

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="header-container">
        <span className="menu-icon" onClick={handleToggleSidebar}>
          &#9776;
        </span>
        <img className="logo" src={logo} alt="logo" />
        <h1 className="title">{title}</h1>
    </div>
  );
};

export default Header;