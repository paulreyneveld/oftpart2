import React, { useState } from 'react'

const App = () => {
    const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '555-5555', id: 1 },
    { name: 'Ada Lovelace', number: '555-5555', id: 2},
    ]);

    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }

        let dummyBool = false;

        for (const person in persons) {
            if (persons[person].name.toLowerCase() === newName.toLowerCase()) {
                dummyBool = true;
                break;
            }
            else {
                dummyBool = false;
            }
        }  

        if (dummyBool) {
            alert(`${newName} already exists in phonebook`);
        }
        else {
            setPersons(persons.concat(personObject));
            setNewName('');
        }
    }
  
    const handleNewPerson = (event) => {
        setNewName(event.target.value);
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNewPerson} />
                <br />
                number: <input value={newNumber} onChange={handleNewNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
            </form>
            <h2>Numbers</h2>
                {persons.map(person => <p key={person.id}> {person.name} {person.number} </p>)}
        </div>
    )
}

export default App