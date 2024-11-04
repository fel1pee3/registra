import React from 'react'
import './Logo.css'
import imageLogo from "../../../images/logo-registra.png"

const Logo = () => {
  return (
    <div className='caixaLogo'>
      <img className='logoImg' src={imageLogo}   alt="logoIcon" /><h1 className='logoText'>Registra</h1>
    </div>
  )
}

export default Logo