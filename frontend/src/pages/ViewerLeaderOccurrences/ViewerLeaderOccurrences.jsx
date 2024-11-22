import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {format} from 'date-fns'
import axios from 'axios'
import LinksOcurrences from '../../components/LinksOcurrences/LinksOcurrences'
import Header from '../../components/Header/Header'
import './ViewerLeaderOccurrences.css'

const ViewerLeaderOccurrences = () => {

    const [occurrences, setOccurrences] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOccurrences = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/profile/leader-occurrences', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOccurrences(response.data.occurrences);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Erro ao buscar ocorrências.');
      }
    };

    fetchOccurrences();
  }, []);

  return (
    <div className="pageViewerLeader">
      <Header />
      <div className='containerViewerLeader'>
        <div className='startPage'>
            <span>Registros</span>
        </div>
        <LinksOcurrences />
        {message && <p>{message}</p>}
        {occurrences.length > 0 ? (
          <ul >
            {occurrences.map((occurrence) => (
              <li key={occurrence.id_register}>
                <Link className='ViewRegister' to={`/ViewOccurrence/${occurrence.id_register}`}>
                <p className='dateRegister'>Data do registro:
                  <span> {format(new Date(occurrence.date_register), 'dd/MM/yyyy')} - </span>
                  <span> {occurrence.time_register} </span>
                </p>
                <h3 className='titleRegister'>{occurrence.title_register}</h3>
                <p className='typeRegister'>Categoria: {occurrence.type}</p>
                <p className='classRegister'>Turma: {occurrence.class_register}</p>
              </Link>
            </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma ocorrência encontrada.</p>
        )}
      </div>
    </div>
  )
}

export default ViewerLeaderOccurrences