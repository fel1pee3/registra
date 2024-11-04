import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import CardInfoUser from '../../components/CardInfoUser/CardInfoUser';
import './Home.css'

const Home = () => {
  const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/auth/home', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setUserName(response.data.user.username); // Acessa o username do usuário retornado
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
    <div className='pageHome'>
      <Header />
      <div className="containerHome">
        <h1 className='msgUser'>Bem vindo, <span>{userName}</span></h1>
        <CardInfoUser />
      </div>
    </div>
  );
};

export default Home;
