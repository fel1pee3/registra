import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import CardUser from '../../components/CardUser/CardUser';
import PrevOccurrences from '../../components/PrevOccurrences/PrevOccurrences';
import './Home.css'

const Home = () => {
  
  const [userName, setUserName] = useState('');
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
        setUserName(response.data.user.username);
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
        <CardUser />
        <PrevOccurrences />
      </div>
    </div>
  );
};

export default Home;
