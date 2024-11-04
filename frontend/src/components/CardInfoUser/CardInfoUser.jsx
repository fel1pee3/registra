import React from 'react'
import img from '../../../images/imageUser.png'
import './CardInfoUser.css'

const CardInfoUser = () => {
  return (
    <div className='cardInfoUser'>
        <img className='imgPerfil' src={img} alt="image Perfil" />
        <div className='caixaInfosUser'>
            <p className='idUser'>0000000000</p>
            <p className='cargoUser'>Professor</p>
            <p className='quantResgistros'><span>99</span>Registros</p>
        </div>
    </div>
  )
}

export default CardInfoUser