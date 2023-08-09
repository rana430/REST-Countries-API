import { useState,useEffect ,useRef} from 'react';
import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { createContext } from 'react';
import { useContext } from 'react';
import { themeConstext } from '../App';


import '../App.css';
import { Countries } from './Countries';

export const HeaderSection = ({ handleInput, CountryInputRef,RegionRef ,handleRegion}) =>  {
    const { theme } = useContext(themeConstext);
    const [selectedRegion, setSelectedRegion] = useState('All');
    const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    handleInput(); 
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    handleRegion();
  };
    return(
        <div className="container-header" id={theme}>
        <div className="search-bar">
            <FaSearch id="search-icon"/>
        <input type="search" id="search-input" className="search-input" value={inputValue} onChange={handleInputChange} placeholder="Search for a country..." ref={CountryInputRef}/>
        </div>
        <div className="filter-bar">
            <select ref={RegionRef} onChange={handleRegionChange}>
                <option>All</option>
                <option>Africa</option>
                <option>America</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>Oceania</option>

            </select>
        </div>
        </div>
    );
}