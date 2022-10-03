import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'


const Anecdote = ({ anecdote, handleVote}) => {

  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}


export default function AnecdoteList() {

  const anecdotes = useSelector(state => state)
  const dispatch= useDispatch()

  return (
    <>
      {anecdotes.map(anecdote=> 
      <Anecdote anecdote={anecdote} key={anecdote.id} handleVote={() => dispatch(voteAnecdote(anecdote.id))}/>)}
    </>
  )
}
