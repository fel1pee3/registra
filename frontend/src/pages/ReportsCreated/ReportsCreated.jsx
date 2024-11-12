import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { IoMdAdd } from "react-icons/io";
import './ReportsCreated.css'

const ReportsCreated = () => {
  return (
    <div className='pageReports'>
      <Header />
      <div className='containerReports'>
        <div className='startPage'>
          <span>Relatórios</span>
          <Link to='/addReport'><IoMdAdd className='iconAddReports'/></Link>
        </div>
        
        
      </div>
    </div>
  )
}

export default ReportsCreated