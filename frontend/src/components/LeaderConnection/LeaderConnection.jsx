import React, {useState} from 'react'
import axios from 'axios'
import './LeaderConnection.css'

const LeaderConnection = () => {

    const [leaderCode, setLeaderCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/profile/associate-leader',
        { leaderCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao associar o líder.');
    }
  };

  return (
    <div>
      <h2>Associar a um líder</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o código do líder"
          value={leaderCode}
          onChange={(e) => setLeaderCode(e.target.value)}
        />
        <button type="submit">Associar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default LeaderConnection