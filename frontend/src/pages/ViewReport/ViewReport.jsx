import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import { PiDownloadFill } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import {format} from 'date-fns'
import { useParams } from 'react-router-dom'
import './ViewReport.css'

const ViewReport = () => {

    const navigate = useNavigate();
    const { id } = useParams();
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

    const handleDelete = async () => {
      const confirmDelete = window.confirm('Tem certeza que deseja excluir este registro?');
      if (!confirmDelete) return;
  
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/report/removeReports/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Registro excluído com sucesso');
        navigate('/ReportsCreated');
      } catch (err) {
        console.error('Erro ao excluir registro:', err);
        alert('Erro ao excluir o registro');
      }
    };

    const downloadPDF = () => {
        if (!registro) return;
      
        const doc = new jsPDF();
      
        doc.setFontSize(18);
        doc.text("Detalhes do Relatório", 10, 10);
      
        doc.setFontSize(12);
        doc.text(`Relatório da turma: ${registro.class_report}`, 10, 20);
      
        const descriptionY = 30;
        const descriptionText = `Descrição: ${registro.description}`;
        const maxWidth = 180;
        const lineHeight = 7;
        const descriptionLines = doc.splitTextToSize(descriptionText, maxWidth);
        doc.text(descriptionLines, 10, descriptionY);
      
        const nextY = descriptionY + descriptionLines.length * lineHeight;
      
        const formattedDate = format(new Date(registro.date_report), 'dd/MM/yyyy');
        doc.text(`Criado em: ${formattedDate} - ${registro.time_report}`, 10, nextY);
      
        doc.save(`Relatorio_${registro.id || 'sem-id'}.pdf`);
      };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

  return (
    <div className='pageViewReport'>
        <div className="caixaStart">
          <Link to='/reportsCreated'><IoIosArrowBack className='arrowLeft' /></Link>
          <h1>Detalhes da Relatório</h1>
        </div>
        <div className='buttons'>
          <button className='btnRemove' onClick={handleDelete}>
            <FaRegTrashAlt /> Remover registro
          </button>
        <button className='downloadPDF' onClick={downloadPDF}><PiDownloadFill /> baixar PDF</button>
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