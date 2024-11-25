import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import {format} from 'date-fns'

const ViewerLeaderReports = () => {

    const [reports, setReports] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/profile/leader-reports', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setReports(response.data.reports);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Erro ao buscar ocorrências.');
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="pageViewLeader">
      <div className='containerViewLeader'>
        <div className='startPage'>
            <span>Reatórios de Associados</span>
        </div>
        {message && <p>{message}</p>}
        {reports.length > 0 ? (
          <ul>
            {reports.map((reports) => (
              <li key={reports.id_report}>
              <Link className='ViewReport' to={`/ViewReport/${reports.id_report}`}>
                <p className='dateReport'>Gerado em:
                  <span> {format(new Date(reports.date_report), 'dd/MM/yyyy')} - </span>
                  <span> {reports.time_report} </span>
                </p>
                <h3 className='classReport'>Relatório da turma {reports.class_report}</h3>
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

export default ViewerLeaderReports