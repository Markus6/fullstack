import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const Weather = ({city}) => {
    const [ weather, setWeather ] = useState([]);
    const [ weatherIcon, setWeatherIcon ] = useState('');

    const url = `https://api.apixu.com/v1/current.json?key=cd287bb341464ea3910194813192807&q=${city}`;

    useEffect(() => {
        axios.get(url)
        .then(response => {
            setWeather(response.data.current);
            setWeatherIcon(response.data.current.condition.icon);
        })
    }, [url]);

    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>temperature: {weather.temp_c} Celsius</p>
            <img src={weatherIcon} alt={"Icon for weather condition"} />
            <p>wind: {weather.wind_kph} kph direction {weather.wind_dir}</p>
        </div>
    )
}

const Country = ({list}) => {
    const { name, capital, population, languages, flag } = list[0]

    const languagesMapped = () => languages.map(lang => <li key={lang.name}>{lang.name}</li>)

    return (
        <div>
            <h2>{name}</h2>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h3>languages</h3>
            <ul>{languagesMapped()}</ul>
            <img src={flag} alt={"Country's flag"} width={200} />
            <Weather city={capital} />

        </div>
    )
}

const App = () => {
    const [ countries, setCountries ] = useState([]);
    const [ filter, setFilter ] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {setCountries(response.data)})
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));

    const countriesMapped = () => filteredCountries.map(country => 
        <div>
        <p key={country.name}>{country.name}   
        <button onClick={() => setFilter(country.name)}>show</button></p>
        </div>)

    if (filteredCountries.length > 10) {
        return (
            <div>
                find countries <input value={filter} onChange={handleFilterChange} />
                <p>Too many countries, specify another filter</p>
            </div>
        )
    }
    else if (filteredCountries.length > 1) {
        return (
            <div>
                find countries <input value={filter} onChange={handleFilterChange} />
                {countriesMapped()}
            </div>
        )
    }
    else if (filteredCountries.length === 1) {
        return (
            <div>
                find countries <input value={filter} onChange={handleFilterChange} />
                <Country list={filteredCountries}/>
            </div>
        )   
    }
    else {
        return (
            <div>
                find countries <input value={filter} onChange={handleFilterChange} />
            </div>
        )
    }
    
}



export default App;
