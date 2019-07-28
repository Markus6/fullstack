import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const Country = ({list}) => {
    const { name, capital, population, languages, flag } = list[0]

    const languagesMapped = () => languages.map(lang => <li>{lang.name}</li>)

    return (
        <div>
            <h2>{name}</h2>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h3>languages</h3>
            <ul>{languagesMapped()}</ul>
            <img src={flag} alt={"Country's flag"} width={200} />

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
