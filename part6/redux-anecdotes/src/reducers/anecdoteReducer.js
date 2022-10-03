const anecdotesAtStart = [
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

export default reducer