import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {  

  const addingAnecdote= async (e) =>{
    e.preventDefault()
    const content= e.target.anecdote.value
    e.target.anecdote.value= ''    
    props.addAnecdote(content)
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

export default connect(null,{addAnecdote})(AnecdoteForm)