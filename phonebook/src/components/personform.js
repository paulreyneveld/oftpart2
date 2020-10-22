import React from 'react';

const PersonForm = ({addPerson, newName, handleNewPerson, newNumber, handleNewNumber }) => {
    return (
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
    )
}

export default PersonForm;