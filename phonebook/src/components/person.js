import React from 'react';

const Person = ({persons, newSearch, handleDelete}) => {
    console.log(persons)
    return (
        <>
        {persons
            .filter(person => person.name.toLowerCase().includes(newSearch))
            .map(person => <p key={person.id}> {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>Delete</button> </p>)   
        }
        </>
    )
}

export default Person;