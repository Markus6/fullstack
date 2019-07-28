import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    const { handleClick, text } = props
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistics = (props) => {
    const { text, value } = props
    return (
        <div> 
            <p>{text} {value}</p>
        </div>
    )
}


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [history, setHistory] = useState([])

    const handleGoodClick = () => {
        setGood(good + 1)
        setHistory(history.concat(1))
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setHistory(history.concat(0))
    }

    const handleBadClick = () => {
        setBad(bad + 1)
        setHistory(history.concat(-1))
    }

    let average = 0
    history.forEach(item => {
        average = average + item
    })

    if (history.length < 1) {
        return (
            <div>
                <h1>Give feedback</h1>
                <Button handleClick={handleGoodClick} text='good' />
                <Button handleClick={handleNeutralClick} text='neutral' />
                <Button handleClick={handleBadClick} text='bad' />
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Give feedback</h1>
                <Button handleClick={handleGoodClick} text='good' />
                <Button handleClick={handleNeutralClick} text='neutral' />
                <Button handleClick={handleBadClick} text='bad' />
                <h1>Statistics</h1>
                <Statistics text='good' value={good} />
                <Statistics text='neutral' value={neutral} />
                <Statistics text='bad' value={bad} />
                <Statistics text='all' value={history.length} />
                <Statistics text='average' value={average / history.length} />
                <Statistics text='positive' value={good / history.length * 100 + ' %'} />
            </div>
        )
    }
    
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)