import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    const { handleClick, text } = props
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const HasVotes = (props) => {
    const { index, points } = props
    return (
        <div>
            <p>has {points[index]} votes</p>
        </div>
    )
}

const VotedAnecdote = (props) => {
    
    const { points } = props;
    const maxVotes = Math.max(...points)
    const voteIndex = points.indexOf(maxVotes);
    
    return (
        <>
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[voteIndex]}</p>
            <HasVotes index={voteIndex} points={points} />
        </>
    )   
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initPoints);

  const handleNextClick = () => {
      let rnd = Math.floor(Math.random() * Math.floor(anecdotes.length));
      setSelected(rnd);
  }

  const handleVoteClick = () => {
      const copy = [ ...points ];
      copy[selected] += 1;
      setPoints(copy);
  }

  return (
    <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <HasVotes index={selected} points={points} />
        <Button handleClick={handleVoteClick} text='vote' />
        <Button handleClick={handleNextClick} text='next anecdote' />
        <VotedAnecdote points={points} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const initPoints = Array(anecdotes.length).fill(0);

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)