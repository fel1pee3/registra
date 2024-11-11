import React, {useState}  from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import './AddOccurrence.css'

const AddOccurrence = () => {
  
  const [values, setValues] = useState({
    title_register: '',
    type: '',
    description: '',
    date_register: '',
    time_register: '',
    class_register: '',
    student_name: ''
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/occurrence/addOccurrence',
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        navigate('/occurrences');
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className='pageAddOccurrence'>
      <div className='containerAddOccurrence'>
        <div className="caixaStart">
          <Link to='/occurrences'><IoIosArrowBack className='arrowLeft' /></Link>
          <h1>Registrar Ocorrência</h1>
        </div>
      
        <form className="formRegisterOccurrence" onSubmit={handleSubmit}>
          <div className="caixaInput">
            <label htmlFor="title_register" className="label">Título</label>
            <input
              type="text"
              placeholder="Título da Ocorrência"
              name="title_register"
              onChange={handleChanges}
              className="input"
            />
          </div>
          <div className="caixaInput">
            <label htmlFor="type" className="label">Tipo</label>
            <input
              type="text"
              placeholder="Tipo de Ocorrência"
              name="type"
              onChange={handleChanges}
              className="input"
            />
          </div>
          <div className="caixaInput">
            <label htmlFor="description" className="label">Descrição</label>
            <textarea
              placeholder="Descrição da Ocorrência"
              name="description"
              onChange={handleChanges}
              className="input"
            />
          </div>
          <div className="caixaInput">
            <label htmlFor="date_register" className="label">Data</label>
            <input
              type="date"
              name="date_register"
              onChange={handleChanges}
              className="input"
            />
          </div>
          <div className="caixaInput">
            <label htmlFor="time_register" className="label">Hora</label>
            <input
              type="time"
              name="time_register"
              onChange={handleChanges}
              className="input"
            />
          </div>
          <div className="caixaInput">
            <label htmlFor="class_register" className="label">Classe</label>
            <input
              type="text"
              placeholder="Classe"
              name="class_register"
              onChange={handleChanges}
              className="input"
            />
          </div>
          <div className="caixaInput">
            <label htmlFor="student_name" className="label">Nome do Estudante</label>
            <input
              type="text"
              placeholder="Nome do Estudante"
              name="student_name"
              onChange={handleChanges}
              className="input"
            />
          </div>
          <button className="btn">Registrar Ocorrência</button>
        </form>

      </div>
    </div>
  )
}

export default AddOccurrence