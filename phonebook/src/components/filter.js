import React from 'react';

const Filter = ({handleSearch}) => {
    console.log(handleSearch);
    return (
        <>
        <label>filter on basis of: </label>
        <input onChange={handleSearch} />
        </>
    )
}

export default Filter