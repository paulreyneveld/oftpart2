import React, { useEffect, useState } from 'react';
import Filter from './components/filter';
import PersonForm from './components/personform';
import Person from './components/person';
import peopleService from './services/people';
import './index.css';

const UserMessage = ({ message }) => {
    if (message === null) {
        return null;
    }
    return (
        <p className="success">{message}</p>
    )
}

const App = () => {

    const [ persons, setPersons ] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ newSearch, setNewSearch ] = useState([]);
    const [ userMessage, setUserMessage ] = useState(null);

    const getDataHook = () => {
        peopleService
        .getAll()
        .then(persons => {
            console.log(persons);
            setPersons(persons);
        });
    }

    useEffect(getDataHook, []);

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            id: newNumber
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
            .then(newPerson => {
                console.log(newPerson);
                setUserMessage(`Successfully created ${newPerson.name}`);
                setTimeout(() => setUserMessage(null), 2000);
            })
            .catch(err => { setUserMessage(err)});

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

    const deletePerson = (id) => {
        let deletionTarget = persons.find(person => person.id === id);
        let forSure = window.confirm("Delete this person?");
        if (forSure) {
            peopleService.remove(id)
              .then(response => {
                  setPersons(persons.filter(person => person.id !== id));
                  setUserMessage(`Successfully deleted ${deletionTarget.name}`);
                  setTimeout(() => setUserMessage(null), 2000);
              })
              .catch(() => {
                  setPersons(persons.filter(person => person.id !== id));
              })
        }
    }

    return (
        <div>
            <UserMessage message={userMessage} newName={newName} />
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
                handleDelete={deletePerson}
            />
        </div>
    )
}

export default App;
