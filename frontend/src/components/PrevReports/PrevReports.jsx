import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {format} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import './PrevReports.css'

const PrevReports = () => {

    const [records, setRecords] = useState([]);
    const recentRecords = records.slice(0, 8);

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
                console.error(err);
            }
        };

        fetchRecords();

    }, []);

  return (
    <div className='prevReports'>
        <div className='infos'>
            <span className='txt'>Últimos Relatórios</span>
            <Link to="/reportsCreated" className='more'>Ver Maia</Link>
        </div>
            {recentRecords.length > 0 ? (
                <ul className='latestReports'>
                    {recentRecords.map((record) => (
                        <li key={record.id_report}>
                            <Link className='ViewReport' to={`/ViewReport/${record.id_report}`}>
                                <h3 className='titleReport'>
                                {record.description.length > 100
                                    ? record.description.substring(0, 100) + '...'
                                    : record.description}
                                </h3>
                                <p className='dateReport'>
                                    <span> {format(new Date(record.date_report), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='vazio'>Faça seu primeiro registro.</p>
            )}
    </div>
  )
}

export default PrevReports