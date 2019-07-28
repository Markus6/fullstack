import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <>
            <h1>{props.course.name}</h1>
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

const Course = (props) => {
    const course = props.course;
    return (
        <div>
          <Header course={course} />
          <Content course={course}/>
          <Total course={course} />
        </div>
      )
}

  const App = () => {
    const course = {
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
          exercises: 10,
          id: 4
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))