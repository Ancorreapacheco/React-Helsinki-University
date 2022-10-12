//Components
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

//React Hooks
import { useEffect } from 'react'


//Services and reducers creator
import { useDispatch } from 'react-redux'
import { initializateAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
const dispatch= useDispatch()

//Set all anecdotes
  useEffect( ()=>{
    dispatch(initializateAnecdotes())
    
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