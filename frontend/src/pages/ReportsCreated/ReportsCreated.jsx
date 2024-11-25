import React, { useState, useEffect } from 'react'
import './ReportsCreated.css'
import Header from '../../components/Header/Header';
import ViewReportsCreated from '../ViewReportsCreated/ViewReportsCreated';
import ViewerLeaderReports from '../ViewerLeaderReports/ViewerLeaderReports';

const ReportsCreated = () => {

  const [selectedOption, setSelectedOption] = useState('optionA');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='pageOccurences'>
      <Header />
      <div className='containerOccurrences'>
        <div className='startPage'>
          <span>Relatórios</span>
        </div>
        <div className="radio-input">
          <label className="radio">
            <input type="radio" value="optionA"
              checked={selectedOption === 'optionA'}
              onChange={handleOptionChange}/>
            <span>Meus Relatórios</span>
          </label>
          <label className="radio">
            <input type="radio" value="optionB"
              checked={selectedOption === 'optionB'}
              onChange={handleOptionChange}/>
            <span>Relatórios de associados</span>
          </label>
          <span className="selection"></span>
        </div>
        {selectedOption === 'optionA' ? (
          <ViewReportsCreated />
        ) : (
          <ViewerLeaderReports />
        )}
      </div>
    </div>
  )
}

export default ReportsCreated