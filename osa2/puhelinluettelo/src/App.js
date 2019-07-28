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
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const addPerson = (event) => {
      event.preventDefault();
      const personObject = {
          name: newName,
          number: newNumber
      }
      
      let found = persons.find(function(element) {
          return element.name == personObject.name;
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Numbers persons={persons}/>
    </div>
  )

}

export default App