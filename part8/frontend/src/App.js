import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LogInForm'
import NewBook from './components/NewBook'
import { useApolloClient } from '@apollo/client'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const handleLogOut = (e) => {
    e.preventDefault()
    localStorage.clear()
    setToken(null)
    client.resetStore()
  }

  if(!token){
    return(
      <>

        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>Login</button>
        <LoginForm show={page==='login'} setToken={setToken} setPage={setPage}/>
        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />

      </>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendatios')}>recommendations</button>
        <button onClick={handleLogOut}> LogOut</button>
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommendations show={page === 'recommendatios'}/>
    </div>
  )
}

export default App
