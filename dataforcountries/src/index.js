import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const CountryList = ({ show, country }) => {
  const [ weatherInfo, setWeatherInfo ] = useState([])

  const getWeatherHook = () => {
    const apiDestination = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
    axios.get(apiDestination)
    .then(response => {
      console.log(response);
      setWeatherInfo(response.data);
    })
    .catch(error => console.log(error));
  }

  useEffect(getWeatherHook, [country.name])
  
  if (show === true) {
    return (
      <>
      <h2> {country.name}</h2>
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
  return (
    <>
    </>
  )
}

const App = () => {
  const [ countryInfo, setCountryInfo ] = useState([]);
  const [ search, setSearch ] = useState('');
  const [ foundCountries, setFoundCountries ] = useState([]);
  const [ singleCountry, setSingleCountry ] = useState([]);
  const [ showValue, setShowValue ] = useState(false);

  const getCountryInfoHook = () => {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountryInfo(response.data);
      })
  }

  useEffect(getCountryInfoHook, []);

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
    setShowValue(false);
    setSingleCountry([]);
  }

  const conductSearchHook = () => {
    const results = countryInfo
      .filter(country => country.name.toLowerCase().includes(search));
      setFoundCountries(results);
  }

  useEffect(conductSearchHook, [search])

  const countryList = () => {
    if (foundCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } 
    else if (foundCountries.length <= 10 && foundCountries.length >= 1) {
      return foundCountries.map((country, index) => <p key={index}>{country.name}<button onClick={() => { setShowValue(true);  setSingleCountry(country); }}>show</button></p>);
    }
    else {
      return <p>No matches found</p>;
    }
  }

  return (
    <div>
      <label>Find Countries: </label>
      <input type="text" value={search} onChange={handleSearch} />
      {countryList()}
      <CountryList show={showValue} country={singleCountry} /> 

    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
