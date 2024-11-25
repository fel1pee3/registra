import React, {useState} from 'react'
import axios from 'axios'
import './CardProfile.css'
import imgUser from '../../../images/imageUser.png'

const CardProfile = () => {

  const [newUsername, setNewUsername] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Obtém o token do localStorage
      const response = await axios.put(
        'http://localhost:3000/profile/update-username',
        { newUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitPosition = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:3000/profile/update-position',
        { position },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.log(err);
    }
  };


  return (
    <div className='cardProfile'>
      <img className='imgUser' src={imgUser} alt="" /> 
      <div className='contentCardProfile'>
        <form onSubmit={handleSubmit} className="inputNomeUser">
          <input type="text" 
          placeholder='Alterar nome'
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}/>
          <button className='btnSalveConfig'>confirmar alteração</button>
        </form>
        <form onSubmit={handleSubmitPosition} className="positionUser">
          <select
            name="type"
            onChange={(e) => setPosition(e.target.value)}
            className="selectCargo"
          >
            <option value="Escolha seu cargo">Escolha seu cargo</option>
            <option value="Professo(a)">Professo(a)</option>
            <option value="Diretor(a)">Direto(a)</option>
            <option value="Vice diretor(a)">Vice diretor(a)</option>
            <option value="Secrétario(a) escolar">Secrétario(a) escolar</option>
            <option value="Auxiliar de limpeza">Auxiliar de limpeza</option>
            <option value="Porteiro(a)">Porteiro(a)</option>
            <option value="Plágio ou Fraude Acadêmica">Plágio ou Fraude Acadêmica</option>
            <option value="merendeiro(a">merendeiro(a)</option>
            <option value="outros...">Outros...</option>
          </select>
          <button className='btnSalveConfig' type='submit'>Salvar</button>
        </form>
      </div> 
    </div>
  )
}

export default CardProfile