import React, { useEffect, useState } from 'react';
import Filter from './components/filter';
import PersonForm from './components/personform';
import Person from './components/person';
import peopleService from './services/people';

const App = () => {

    const [ persons, setPersons ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ newSearch, setNewSearch ] = useState([]);

    const getDataHook = () => {
            peopleService
            .getAll()
            .then(persons => {
                setPersons(persons);
            });
    }
    
    useEffect(getDataHook, []);

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
            peopleService
            .create(personObject)
            .then(newPerson => console.log(newPerson));

            setPersons(persons.concat(personObject));
            setNewName('');
        }
        setNewNumber('');
    }
  
    const handleNewPerson = (event) => {
        setNewName(event.target.value);
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value);
    }

    const handleSearch = (event) => {
        setNewSearch(event.target.value.toLowerCase());
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleSearch={handleSearch} />
            <h2>Add a new person</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNewPerson={handleNewPerson}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber}
            />
            <h2>Numbers</h2>
            <Person 
                persons={persons}
                newSearch={newSearch}
            />
        </div>
    )
}

export default App;