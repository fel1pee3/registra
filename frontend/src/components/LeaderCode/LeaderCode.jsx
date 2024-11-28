import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './LeaderCode.css'

const LeaderCode = () => {

  const [leaderCode, setLeaderCode] = useState(null);
  const [message, setMessage] = useState('');
  const [codeLeader, setCodeLeader] = useState('');

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

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/auth/home', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setCodeLeader(response.data.user.leader_code);
      } else {
        navigate('/login');
      }
    } catch (err) {
      navigate('/login');
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h2>Se tornar líder</h2>
      <p>Seu código de Líder é: <span className='codeLeader'>{codeLeader}</span></p>
      <button onClick={handleClick} className='btnLeaderCode'>Tornar-se Líder</button>
      {message && <p>{message}</p>}
      {leaderCode && <p>Seu código de líder: {leaderCode}</p>}
    </div>
  )
}

export default LeaderCode