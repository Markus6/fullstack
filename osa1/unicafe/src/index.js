import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    const { handleClick, text } = props
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistics = (props) => {
    const { good, neutral, bad, history, average } = props

    if (history.length > 0) {
        return (
            <div> 
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
                <p>all {history.length}</p>
                <p>average {average / history.length}</p>
                <p>positive {good / history.length * 100} %</p>
            </div>
        )
    }

    else {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

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

    return (
        <div>
            <h1>Give feedback</h1>
            <Button handleClick={handleGoodClick} text='good' />
            <Button handleClick={handleNeutralClick} text='neutral' />
            <Button handleClick={handleBadClick} text='bad' />
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} history={history} average={average} />
        </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)