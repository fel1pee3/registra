import React  from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import './AddOccurrence.css'

const AddOccurrence = () => {
  
  return (
    <div className='pageAddOccurrence'>
      <div className='containerAddOccurrence'>
        <div className="caixaStart">
          <Link to='/occurrences'><IoIosArrowBack className='arrowLeft' /></Link>
          <h1>Registrar Ocorrência</h1>
        </div>
      
        <form>

        </form>

      </div>
    </div>
  )
}

export default AddOccurrence