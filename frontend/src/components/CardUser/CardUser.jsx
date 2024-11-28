import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import img from '../../../images/imageUser.png'
import './CardUser.css'

const CardUser = () => {

    const [userId, setUserId] = useState('');
    const [userPosition, setUserPosition] = useState('');
    const [recordCount, setRecordCount] = useState(0);
    const formattedCount = recordCount.toString().padStart(3, '0');
    const formattedId = userId.toString().padStart(6, '0');
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
          setUserId(response.data.user.id);
          setUserPosition(response.data.user.position);
        } else {
          navigate('/login');
        }
      } catch (err) {
        navigate('/login');
        console.log(err);
      }
    };

    const fetchRecordCount = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:3000/occurrence/count', {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
            setRecordCount(response.data.totalRecords);
        } catch (error) {
            console.error("Erro ao buscar a contagem de registros:", error);
        }
    };
  
    useEffect(() => {
      fetchUser();
      fetchRecordCount();
    }, []);

  return (
    <div className='cardUser'>
        <img className='imgUser' src={img} alt="image user" />
        <div className='contentUser'>
            <p className='idUser'>{formattedId}</p>
            <p className='positonUser'>{userPosition}</p>
            <p className='quantRegister'><span>{formattedCount}</span> Registros</p>
        </div>
    </div>
  )
}

export default CardUser