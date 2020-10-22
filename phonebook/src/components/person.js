import React from 'react';


const Person = ({persons, newSearch}) => {
    return (
        <>
        {persons
            .filter(person => person.name.toLowerCase().includes(newSearch))
            .map(person => <p key={person.id}> {person.name} {person.number} </p>)}
        </>
    )
}

export default Person;