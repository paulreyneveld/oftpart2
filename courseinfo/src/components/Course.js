import React from 'react';

const Course = ({ course }) => {
    let total = course.parts.reduce((acc, part) => acc + part.exercises, 0)
  
    return (
      <>
      <h2>{course.name}</h2>
      {course.parts.map((part) => <p key={part.id}>{part.name} {part.exercises}</p>)}
      <strong>total of {total} exercises</strong>
      </>
    )
  }

  export default Course