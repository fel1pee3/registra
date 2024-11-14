import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import {format} from 'date-fns'
import Header from '../../components/Header/Header'
import { IoMdAdd } from "react-icons/io";
import './ReportsCreated.css'

const ReportsCreated = () => {

  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchRecords = async () => {
          try {
              const token = localStorage.getItem('token');
              const response = await axios.get('http://localhost:3000/report/reports', {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              setRecords(response.data.registros);
          } catch (err) {
              setError('Erro ao buscar registros do usuário');
              console.error(err);
          }
      };

      fetchRecords();
  }, []);

  return (
    <div className='pageReports'>
      <Header />
      <div className='containerReports'>
        <div className='startPage'>
          <span>Relatórios</span>
          <Link to='/addReport'><IoMdAdd className='iconAddReports'/></Link>
        </div>
        
        <div className='listReport'>
          {records.length > 0 ? (
              <ul> 
                  {records.map((record) => (
                      <li key={record.id_report}>
                          <p className='dateReport'>Gerado em:  
                            <span> {format(new Date(record.date_report), 'dd/MM/yyyy')} - </span>
                            <span> {record.time_report} </span>
                          </p>
                          <h3 className='classReport'>Relatório da turma {record.class_report}</h3>
                      </li>
                  ))}
              </ul>
          ) : (
              <p className='vazio'>Faça seu primeiro relatório.</p>
          )}
        </div>

      </div>
    </div>
  )
}

export default ReportsCreated