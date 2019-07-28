import React from 'react';


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
        <div key={course.name}>
            <Header course={course} />
            <Content course={course}/>
            <Total course={course} />
        </div>
    )

    return (
        courseInfo()
      )
}

export default Course;