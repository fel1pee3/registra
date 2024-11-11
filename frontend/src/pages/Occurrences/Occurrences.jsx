import React, {useEffect, useState} from 'react'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import './Occurrences.css'

const Occurrences = () => {
  return (
    <div className='pageOccurrences'>
      <Header />
      <div className='containerOccurrences'>

        <div className='startPage'>
          <span>Registros</span>
          <Link to='/addOccurrence'><IoMdAdd className='iconAddOccurrence'/></Link>
        </div>

        
        
      </div>
    </div>
  )
}

export default Occurrences