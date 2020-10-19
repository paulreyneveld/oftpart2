import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({ course }) => {
  console.log(course.parts);
  let sum = 0;
  course.parts.forEach(part => sum += part.exercises );
  console.log(sum);
  return (
    <>
    <h1>{course.name}</h1>
    {course.parts.map((part) => <p key={part.id}>{part.name} {part.exercises}</p>)} 
    <strong>total of {sum} exercises</strong>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  
  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))