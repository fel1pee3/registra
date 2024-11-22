import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import './LinksOcurrences.css'

const LinksOcurrences = () => {

  return (
    <header className='headerLinksOccurrences'>
      
      <nav className='containerLinksOccurrences'>

        <NavLink className={({ isActive }) => `linkNavigate ${isActive ? 'active' : ''}`} to='/occurrences'>
          <p>Minhas Ocorrências</p>
        </NavLink>

        <NavLink className={({ isActive }) => `linkNavigate ${isActive ? 'active' : ''}`} to='/viewerLeaderOccurrences' >
          <p>Ocorrências de associados</p>
        </NavLink>

      </nav>
    </header>
  )
}

export default LinksOcurrences