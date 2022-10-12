import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"


const byVotes = (b1, b2) => b2.votes>b1.votes ? 1 : -1

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    /* addAnecdote(state,action){
      const content= action.payload
      state.push(content)
    }, */
    addVote(state,action){
      const id= action.payload.id
      return state.map(note => note.id !== id ? note : {...note,votes: note.votes + 1}).sort(byVotes)
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }

  }
})

export const { addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializateAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  } 
}

export const voteAnecdote = (anecdoteToUpdate) =>{
  return async dispatch =>{
    const id= anecdoteToUpdate.id
    const anecdoteUpdated= await anecdotesService.update(id,anecdoteToUpdate)    
    dispatch(addVote(anecdoteUpdated))
  }
}


export default anecdoteSlice.reducer












//All Reducer without ToolKit
/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const byVotes = (b1, b2) => b2.votes>b1.votes ? 1 : -1

const initialState = anecdotesAtStart.map(asObject).sort(byVotes)



const reducer = (state = initialState, action) => {
  

  switch (action.type) {
    case 'vote':      
      const id= action.data.id
      return state.map(note => note.id !== id ? note : {...note,votes: note.votes + 1}).sort(byVotes)

    case 'add_anecdote':
      const newAnecdote= {
        content: action.data.content,
        id: getId(),
        votes: 0
      }      
      return [...state,newAnecdote].sort(byVotes)
  
    default:
      return state
  }

  
}

export const voteAnecdote = (id) =>{
  return{
    type: 'vote',
    data:{ id }
  }
}

export const addAnecdote= content => {
  return {
    type: 'add_anecdote',
    data:{
      content
    }
  }
} 



export default reducer*/