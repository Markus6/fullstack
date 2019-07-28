import React, { useState } from 'react'

const Number = (props) => {
    return (
        <>
            <p>{props.name}</p>
        </>
    )
}

const Numbers = (props) => {
    const { persons } = props;
    const numbers = () => persons.map(person => <Number key={person.name} name={person.name} />)
    return (
        <>
            {numbers()}
        </>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
      event.preventDefault();
      const personObject = {
          name: newName
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
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
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