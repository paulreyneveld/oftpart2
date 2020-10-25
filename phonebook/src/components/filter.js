import React from 'react';

const Filter = ({handleSearch}) => {
    return (
        <>
        <label>filter on basis of: </label>
        <input onChange={handleSearch} />
        </>
    )
}

export default Filter