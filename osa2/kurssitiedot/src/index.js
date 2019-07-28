import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <>
            <h2>{props.course.name}</h2>
        </>
    )
}

const Part = (props) => {
    return (
        <>
           <p>{props.name} {props.exercises}</p> 
        </>
    )
}

const Content  = (props) => {
    const parts = props.course.parts;
    const content = () => parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)

    return (
        <>
            {content()}
        </>
    )
}

const Total = (props) => {
    const parts = props.course.parts;
    const total = parts.reduce( (total, part) => { 
        return total  + part.exercises ;
    }, 0);

    return (
        <>
            <p>tota of {total} exercises</p>
        </>
    )
}

const Course = ({ courses}) => {

    const courseInfo = () => courses.map(course => 
        <div>
            <Header course={course} />
            <Content course={course}/>
            <Total course={course} />
        </div>)

    return (
        courseInfo()
      )
}

  const App = () => {
    const courses = [
        {
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
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]
  
    return (
        <div>
            <h1>Web development curriculum</h1>
            <Course courses={courses} />
        </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))