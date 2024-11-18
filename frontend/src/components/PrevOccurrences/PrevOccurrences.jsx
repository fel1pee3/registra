import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {format} from 'date-fns'
import { Swiper, SwiperSlide } from 'swiper/react'
import './PrevOccurrences.css'


const PrevOccurrences = () => {

  const [records, setRecords] = useState([]);
  const recentRecords = records.slice(0, 8);
  const [slidePerView, setSlidePerView] = useState(3);

  useEffect(() => {
      const fetchRecords = async () => {
          try {
              const token = localStorage.getItem('token');
              const response = await axios.get('http://localhost:3000/occurrence/registers', {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              setRecords(response.data.registros);
          } catch (err) {
              console.error(err);
          }
      };

      fetchRecords();

      function handleResize(){
        if(window.innerWidth < 750){
            setSlidePerView(1)
        } else{
            setSlidePerView(2)
        }
      }

      handleResize()

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }

  }, []);

  return (
    <div className='prevOccurrences'>
        <div className='infos'>
            <span className='txt'>Últimos Registros</span>
            <Link to="/occurrences" className='more'>Ver Maia</Link>
        </div>
        {recentRecords.length > 0 ? (
            <ul className='latestOccurrences'>
                <Swiper
                slidesPerView={slidePerView}
                pagination={{clickable: true}}
                loop={true}
                spaceBetween={20}
                style={{ paddingBottom: '35px' }}
                >
                    {recentRecords.map((record) => (
                        <SwiperSlide key={record.id_register}>
                            <li key={record.id_register}>
                                <Link className='ViewRegister' to={`/ViewOccurrence/${record.id_register}`}>
                                <p className='dateRegister'>
                                <span> {format(new Date(record.date_register), 'dd/MM/yyyy')} - </span>
                                <span> {record.time_register} </span>
                                </p>
                                <h3 className='titleRegister'>{record.title_register}</h3>
                                <p className='typeRegister'>{record.type}</p>
                                <p className='classRegister'>{record.class_register}</p>
                                </Link>
                            </li>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </ul>
        ) : (
            <p className='vazio'>Faça seu primeiro registro.</p>
        )}
    </div>
  )
}

export default PrevOccurrences