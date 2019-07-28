import React, { useState } from 'react'

const Number = (props) => {
    return (
        <>
            <p>{props.name} {props.number}</p>
        </>
    )
}

const Numbers = (props) => {
    const { persons } = props;
    const numbers = () => persons.map(person => <Number key={person.name} name={person.name} number={person.number}/>)
    return (
        <>
            {numbers()}
        </>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

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

      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
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
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={handleFilterchange} />
      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons}/>
    </div>
  )

}

export default App