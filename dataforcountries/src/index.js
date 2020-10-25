import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {
const [ countryInfo, setCountryInfo ] = useState([]);
const [ search, setSearch ] = useState('');
const [ foundCountries, setFoundCountries ] = useState([]);

const getCountryInfoHook = () => {
  axios.get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountryInfo(response.data);
    })
}

useEffect(getCountryInfoHook, []);

const handleSearch = (event) => {
  setSearch(event.target.value.toLowerCase());
}

const conductSearchHook = () => {
  const results = countryInfo
    .filter(country => country.name.toLowerCase().includes(search));
    setFoundCountries(results);
    console.log(foundCountries);
}

useEffect(conductSearchHook, [search])

const countryList = () => {
  if (foundCountries.length === 0) {
    return <p>No matches found</p>
  }
  if (foundCountries.length === 1) {
     return foundCountries.map((country, index) => 
     <>
     <h2 key={index}> {country.name}</h2>
     <p> capital: {country.capital}</p>
     <p> population: {country.population}</p>
     <img alt="Country flag" src={country.flag} /> 
     <h2>Languages</h2>
     <ul>
     {country.languages.map((language, index) => <li key={index}>{language.name}</li>)}
     </ul>
     </>
     )
  }
  else if (foundCountries.length <= 10 && foundCountries.length > 1) {
    return foundCountries.map((country, index) => <p key={index}>{country.name}</p>);
  }
  else {
    return <p>Too many matches, specify another filter</p>;
  }
}

  return (
    <div>
      <label>Find Countries: </label>
      <input value={search} onChange={handleSearch} />
      {countryList()}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
