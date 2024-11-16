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
          <Link to='/reportsCreated'><IoIosArrowBack className='arrowLeft' /></Link>
          <h1>Detalhes do Relatório</h1>
        </div>
      <div>
        <p>Id: {registro.id_register}</p>
        <p>Usuário: {registro.user_registration}</p>
        <p>Usuário: {registro.title_register}</p>
        <p>Usuário: {registro.type}</p>
        <p>Usuário: {registro.class_register}</p>
        <p>Estudante: {registro.student_name}</p>
        <p>Criado em:
            <span> {format(new Date(registro.date_register), 'dd/MM/yyyy')} - </span>
            <span> {registro.time_register} </span>
        </p>
        <p>Descrição: {registro.class_register}</p>
        <p>Descrição: {registro.description}</p>
        </div>
    </div>
  )
}

export default ViewOccurrence