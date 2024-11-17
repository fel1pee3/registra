import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import {format} from 'date-fns'
import { useParams } from 'react-router-dom'
import './ViewOccurrence.css'

const ViewOccurrence = () => {

  const { id } = useParams(); // Captura o ID da URL
    const [registro, setRegistro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegistro = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/occurrence/registers/${id}`, {
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
    <div className='pageViewOccurrence'>
      <div className="caixaStart">
          <Link to='/occurrences'><IoIosArrowBack className='arrowLeft' /></Link>
          <h1>Detalhes da Ocorrência</h1>
        </div>
      <div className='contentOccurrencia'>
        <div className='titleAndType'>
          <p><span className="title">Título da ocorrência:</span> {registro.title_register}</p>
          <p><span className="title">Tipo da ocorrência:</span> {registro.type}</p>
        </div>
        <div className='studentAndClass'>
          <p><span className="title">Nome do estudante:</span> {registro.student_name}</p>
          <p><span className="title">Turma do aluno:</span> {registro.class_register}</p>
        </div>
        <p className='description'><span className="title">Descrição:</span> {registro.description}</p>
        <p className='dateAndTime'>Criado em:
            <span> {format(new Date(registro.date_register), 'dd/MM/yyyy')} às </span>
            <span> {registro.time_register} </span>
        </p>
        </div>
    </div>
  )
}

export default ViewOccurrence