import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdotesService from '../services/anecdotes'


export default function AnecdoteForm() {

  const dispatch= useDispatch()

  const addingAnecdote= async (e) =>{
    e.preventDefault()
    const content= e.target.anecdote.value
    e.target.anecdote.value= ''
    const noteCreated= await anecdotesService.createNew(content)
    dispatch(addAnecdote(noteCreated))
  }

  return (

    <>
      <h2>create new</h2>
      <form onSubmit={addingAnecdote}>
          <div><input  name='anecdote'/></div>
          <button>create</button> 
      </form>
      <hr/>
    </>
  )
}
