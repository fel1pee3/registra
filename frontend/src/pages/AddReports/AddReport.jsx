import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import './AddReport.css'

const AddReport = () => {

    const [values, setValues] = useState({
        date_report: '',
        time_report: '',
        class_report: '',
        description: ''
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
            'http://localhost:3000/report/addReport',
            values,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
    
          if (response.status === 201) {
            navigate('/reportsCreated');
          }
        } catch (err) {
          console.log(err);
        }
    };

  return (
    <div className='pageAddReport'>
      <div className='containerAddReport'>
        <div className="caixaStart">
          <Link to='/reportsCreated'><IoIosArrowBack className='arrowLeft' /></Link>
          <h1>Registrar Relatórios</h1>
        </div>
      
        <form className="formRegisterOccurrence" onSubmit={handleSubmit}>
        <div className="caixaDividir">
                <div className="caixaInput">
                <label htmlFor="date_report" className="label">Data</label>
                <input
                    type="date"
                    name="date_report"
                    onChange={handleChanges}
                    className="input"
                />
                </div>
                <div className="caixaInput">
                <label htmlFor="time_report" className="label">Hora</label>
                <input
                    type="time"
                    name="time_report"
                    onChange={handleChanges}
                    className="input"
                />
                </div>  
            </div>

            <div className="caixaInput">
                <label htmlFor="class_report" className="label">Classe</label>
                <input
                type="text"
                placeholder="Classe"
                name="class_report"
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
            <button className="btn">Registrar Ocorrência</button>
        </form>

      </div>
    </div>
  )
}

export default AddReport