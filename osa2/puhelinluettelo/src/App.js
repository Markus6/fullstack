import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';
import personService from './services/persons';

const App = () => {
  const [ persons, setPersons] = useState([]);
    // { name: 'Arto Hellas', number: '040-1234567' },
    // { name: 'Ada Lovelace', number: '39-44-5323523' },
    // { name: 'Dan Abramov', number: '12-43-234345' },
    // { name: 'Mary Poppendieck', number: '39-23-6423122' }
 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
      event.preventDefault();
      const personObject = {
          name: newName,
          number: newNumber
      }
      
      let found = persons.find(function(element) {
          return element.name === personObject.name;
      });

      if (found) {
        window.alert(`${newName} is already added to phonebook`);
        return;
      }

      personService
        .create(personObject)
        .then(returnedPersons => {
            setPersons(persons.concat(returnedPersons))
            setNewName('');
            setNewNumber('');
        });
  }

  const removePerson = (id, name) => {
      const message = `Delete ${name} ?` 
      let result = window.confirm(message);
      
      if (result) {
        personService.remove(id)
        .then(response => {
            if (response.status == 200) {
              const newPersons = persons.filter(person => person.id != id);
              setPersons(newPersons);
            }
        })
      }
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value);
  }

  const handleFilterchange = (event) => {
      setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterchange={handleFilterchange} />
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />  
      <Numbers persons={filteredPersons} removeFunction={removePerson}/>
    </div>
  )

}

export default App