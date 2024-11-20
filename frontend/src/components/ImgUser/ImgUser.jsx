import React, {useState} from 'react'
import './ImgUser.css'
import imgUser from '../../../images/image2.jpg'
import { FaPen } from "react-icons/fa";

const ImgUser = () => {

    

  return (
    <div className='caixaImgUser'>
        <img className='imgUser' src={imgUser} alt="" />
        <button className="btnEditImgUser">
            <FaPen className='editImgUser'/>
        </button>
    </div>
  )
}

export default ImgUser