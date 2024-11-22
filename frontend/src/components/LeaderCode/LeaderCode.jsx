import React, {useState} from 'react'
import axios from 'axios'
import './LeaderCode.css'

const LeaderCode = () => {

    const [leaderCode, setLeaderCode] = useState(null);
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/profile/become-leader',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLeaderCode(response.data.leaderCode);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao se tornar líder.');
    }
  };

  return (
    <div>
      <h2>Se tornar líder</h2>
      <button onClick={handleClick}>Tornar-se Líder</button>
      {message && <p>{message}</p>}
      {leaderCode && <p>Seu código de líder: {leaderCode}</p>}
    </div>
  )
}

export default LeaderCode