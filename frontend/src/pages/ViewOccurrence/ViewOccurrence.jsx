import React, {useState, useEffect} from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import { PiDownloadFill } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import {format} from 'date-fns'
import { useParams } from 'react-router-dom'
import './ViewOccurrence.css'

const ViewOccurrence = () => {

  const navigate = useNavigate();
  const { id } = useParams();
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

    const handleDelete = async () => {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir este registro?');
      if (!confirmDelete) return;
  
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/occurrence/removeRegisters/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Registro excluído com sucesso');
        navigate('/occurrences');
      } catch (err) {
        console.error('Erro ao excluir registro:', err);
        alert('Erro ao excluir o registro');
      }
    };

    const downloadPDF = () => {
      if (!registro) return;
  
      const doc = new jsPDF();
  
      doc.setFontSize(18);
      doc.text("Detalhes da Ocorrência", 10, 10);
  
      doc.setFontSize(12);
      doc.text(`Título: ${registro.title_register}`, 10, 30);
      doc.text(`Tipo: ${registro.type}`, 10, 40);
      doc.text(`Estudante: ${registro.student_name}`, 10, 50);
      doc.text(`Turma: ${registro.class_register}`, 10, 60);
      doc.text(`Descrição:`, 10, 70);
      doc.text(registro.description, 10, 80, { maxWidth: 180 });
      doc.text(
        `Criado em: ${format(new Date(registro.date_register), 'dd/MM/yyyy')} às ${registro.time_register}`,
        10,
        100
      );
  
      doc.save(`Ocorrencia_${registro.id || id}.pdf`);
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

  return (
    <div className='pageViewOccurrence'>
      <div className="caixaStart">
        <Link to='/occurrences'><IoIosArrowBack className='arrowLeft' /></Link>
        <h1>Detalhes da Ocorrência</h1>
      </div>
      <div className='buttons'>
      <button className='btnRemove' onClick={handleDelete}>
        <FaRegTrashAlt /> Remover registro
      </button>
        <button className='downloadPDF' onClick={downloadPDF}><PiDownloadFill /> baixar PDF</button>
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