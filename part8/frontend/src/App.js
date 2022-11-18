import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LogInForm'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user] = useState(null)
  const [username, setUsername]= useState('')
  const [password, setPassword] = useState('')

  const handleLogin = e => {
    e.preventDefault()
    console.log('login in')
    console.log(username, password)
  }

  const handleUsername = e => {
    setUsername(e.target.value)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }

  const loginFormProps = {
    handleLogin,
    handleUsername,
    handlePassword,
    username,
    password
  }


  if(!user){
    return(
      <>

        <LoginForm props={loginFormProps }/>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
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
        <button> LogOut</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
