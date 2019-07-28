import React from 'react';

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
            <h2>Numbers</h2>
            {numbers()}
        </>
    )
}

export default Numbers;