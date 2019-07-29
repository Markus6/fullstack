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
      
      const alreadyExists = persons.find(function(element) {
          return element.name === personObject.name && element.number === personObject.number;
      });

      const differentNumber = persons.find(function(element) {
        return element.name === personObject.name && element.number !== personObject.number;
      });

      if (!alreadyExists && !differentNumber) {
        personService
        .create(personObject)
        .then(returnedPersons => {
            setPersons(persons.concat(returnedPersons))
            setNewName('');
            setNewNumber('');
        });
      }

      else if (alreadyExists) {
        window.alert(`${newName} is already added to phonebook`);
        return;
      }

      
      else if (differentNumber) {
        const message = `${newName} is already added to phonebook, replace the old number with a new one?` 
        const askForUpdate = window.confirm(message);

        if (askForUpdate) {
            const person = persons.find(p => p.name === personObject.name);
            const changedPerson = { ...person, number: personObject.number }
            personService
            .update(person.id, changedPerson)
            .then(returnData => {
                setPersons(persons.map(p => p.id !== person.id ? p : returnData));
                setNewName('');
                setNewNumber('');
            });
        }
    }
  }

  const removePerson = (id, name) => {
      const message = `Delete ${name} ?` 
      let result = window.confirm(message);
      
      if (result) {
        personService.remove(id)
        .then(response => {
            if (response.status === 200) {
              const newPersons = persons.filter(person => person.id !== id);
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