import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {format} from 'date-fns'
import { IoMdAdd } from "react-icons/io";
import './ViewRegister.css'

const ViewRegister = () => {

  const [records, setRecords] = useState([]);

  useEffect(() => {
      const fetchRecords = async () => {
          try {
              const token = localStorage.getItem('token');
              const response = await axios.get('http://localhost:3000/occurrence/registers', {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              setRecords(response.data.registros);
          } catch (err) {
              console.error(err);
          }
      };

      fetchRecords();
  }, []);

  return (
    <div className='pageViewRegister'>
      <div className='containerpageViewRegister'>

        <div className='startPage'>
          <span>Meus Registros</span>
          <Link to='/addOccurrence'><IoMdAdd className='iconAddOccurrence'/></Link>
        </div>

        <div className='listRegisters'>
          {records.length > 0 ? (
              <ul>
                  {records.map((record) => ( 
                      <li key={record.id_register}>
                          <Link className='ViewRegister' to={`/ViewOccurrence/${record.id_register}`}>
                            <p className='dateRegister'>Data do registro:
                              <span> {format(new Date(record.date_register), 'dd/MM/yyyy')} - </span>
                              <span> {record.time_register} </span>
                            </p>
                            <h3 className='titleRegister'>{record.title_register}</h3>
                            <p className='typeRegister'>Categoria: {record.type}</p>
                            <p className='classRegister'>Turma: {record.class_register}</p>
                          </Link>
                      </li>
                  ))}
              </ul>
          ) : (
              <p className='vazio'>Faça seu primeiro registro.</p>
          )}
        </div>

      </div>
    </div>
  )
}

export default ViewRegister