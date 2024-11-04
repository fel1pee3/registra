import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { GoHomeFill } from "react-icons/go";
import { FaFolderClosed } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <header className='componentHeader'>
      <Logo />
      <nav className='containerLinksNavigate'>
        <NavLink className={({ isActive }) => `linkNavigate ${isActive ? 'active' : ''}`} to='/'>
          <GoHomeFill className='iconLinkNavigate' />
          <p>Home</p>
        </NavLink>

        <NavLink className={({ isActive }) => `linkNavigate ${isActive ? 'active' : ''}`} to='/Occurrences' >
          <FaFolderClosed className='iconLinkNavigate' />
          <p>Ocorrências</p>
        </NavLink>

        <NavLink className={({ isActive }) => `linkNavigate ${isActive ? 'active' : ''}`} to='/Search'>
          <FaMagnifyingGlass className='iconLinkNavigate' />
          <p>Procurar</p>
        </NavLink>

        <NavLink className={({ isActive }) => `linkNavigate ${isActive ? 'active' : ''}`} to='/reportsCreated'>
          <FaCalendar className='iconLinkNavigate' />
          <p>Relatórios</p>
        </NavLink>
        
        <NavLink className={({ isActive }) => `linkNavigate ${isActive ? 'active' : ''}`} to='/Profile'>
          <FaUser className='iconLinkNavigate' />
          <p>Perfil</p>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
