import React, {useState, useEffect} from 'react'
import axios from 'axios'
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
      <div>
            <input
                type="text"
                placeholder="Buscar registros..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <ul>
                {results.map((registro) => (
                    <li key={registro.id_register}>
                        <strong>Descrição:</strong> {registro.description}
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Search