import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import {format} from 'date-fns'
import { useParams } from 'react-router-dom'
import './ViewReport.css'

const ViewReport = () => {

    const { id } = useParams(); // Captura o ID da URL
    const [registro, setRegistro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegistro = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/report/reports/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setRegistro(response.data.registro); 
            } catch (err) {
                setError('Erro ao buscar registro');
            } finally {
                setLoading(false);
            }
        };

        fetchRegistro();
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

  return (
    <div className='pageViewReport'>
        <div className="caixaStart">
          <Link to='/reportsCreated'><IoIosArrowBack className='arrowLeft' /></Link>
          <h1>Detalhes da Relatório</h1>
        </div>
        <div className='contentReport'>
            <p><span className="title">Relatório da turma:</span> {registro.class_report}</p>
            <p className='description'><span className="title">Descrição:</span> {registro.description}</p>
            <p className='dateAndTime'>Criado em:
                <span> {format(new Date(registro.date_report), 'dd/MM/yyyy')} - </span>
                <span> {registro.time_report} </span>
            </p>
        </div>
    </div>
  )
}

export default ViewReport