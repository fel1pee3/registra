import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {format} from 'date-fns'
import './Search.css'
import Header from '../../components/Header/Header'

const Search = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query.trim()) {
            const fetchResults = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(
                        `http://localhost:3000/search/searchs?q=${query}`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    setResults(response.data);
                } catch (error) {
                    console.error('Erro ao buscar registros:', error);
                }
            };

            fetchResults();
        } else {
            setResults([]);
        }
    }, [query]);

  return (
    <div className='pageSearch'>
      <Header />
        <div className='containerSearch'>
        <div className='startPage'>
          <span>Pesquisar</span>
        </div>
      <div>
            <input
                type="text"
                placeholder="Buscar registros..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='inputSearch'
            />
            <ul className='caixaRegisterSearch'>
                {results.map((registro) => (
                    <li key={registro.id_register}>
                        <Link className='link' to={`/ViewOccurrence/${registro.id_register}`}>
                            <p className='dateRegister'>Data do registro:
                              <span> {format(new Date(registro.date_register), 'dd/MM/yyyy')} - </span>
                              <span> {registro.time_register} </span>
                            </p>
                            <h3 className='titleRegister'>{registro.title_register}</h3>
                            <p className='typeRegister'>Categoria: {registro.type}</p>
                            <p className='classRegister'>Turma: {registro.class_register}</p>
                            <p><span className='descriptionS'>Descrição:</span> {registro.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Search