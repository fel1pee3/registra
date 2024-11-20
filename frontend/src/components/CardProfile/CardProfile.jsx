import React, {useState} from 'react'
import axios from 'axios'
import './CardProfile.css'
import ImgUser from '../ImgUser/ImgUser';

const CardProfile = () => {
  return (
    <div className='cardProfile'>
        <ImgUser/>
    </div>
  )
}

export default CardProfile