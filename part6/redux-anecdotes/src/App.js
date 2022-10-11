//Components
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

//React Hooks
import { useEffect } from 'react'


//Services and reducers creator
import { useDispatch } from 'react-redux'
import anecdotesService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
const App = () => {
const dispatch= useDispatch()

//Set all anecdotes
  useEffect( ()=>{
    anecdotesService.getAll()
      .then((anecdotes) => {
        //console.log(anecdotes)
        dispatch(setAnecdotes(anecdotes))
      })
    
  }, [dispatch])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>      
      <Notification/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App