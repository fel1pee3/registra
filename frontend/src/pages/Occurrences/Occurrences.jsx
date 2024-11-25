import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './Occurrences.css';
import ViewRegister from '../ViewRegister/ViewRegister';
import ViewerLeaderOccurrences from '../ViewerLeaderOccurrences/ViewerLeaderOccurrences';

const Occurrences = () => {
  const [selectedOption, setSelectedOption] = useState('optionA');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='pageOccurences'>
      <Header />
      <div className='containerOccurrences'>
        <div className='startPage'>
          <span>Ocorrências</span>
        </div>
        <div className="radio-input">
          <label className="radio">
            <input type="radio" value="optionA"
              checked={selectedOption === 'optionA'}
              onChange={handleOptionChange}/>
            <span>Minhas ocorrências</span>
          </label>
          <label className="radio">
            <input type="radio" value="optionB"
              checked={selectedOption === 'optionB'}
              onChange={handleOptionChange}/>
            <span>Ocorrências de associados</span>
          </label>
          <span className="selection"></span>
        </div>
        {selectedOption === 'optionA' ? (
          <ViewRegister />
        ) : (
          <ViewerLeaderOccurrences />
        )}
      </div>
    </div>
  );
};

export default Occurrences;