import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/queries'

const LoginForm = ({ setToken, show, setPage }) => {

  const [username, setUsername]= useState('')
  const [password, setPassword] = useState('')

  const [login,result]= useMutation(LOGIN,{
    onError:(error) => {
      //setError(error.graphQLErrors[0].message)
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if(result.data){
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('appLibraryToken',token)
    }
  },[result.data])

  const handleLogin = (e) => {
    e.preventDefault()
    login({ variables:{
      username,
      password
    } })
    setPage('authors')

  }

  const handleUsername = e => {
    setUsername(e.target.value)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }
  if(!show){
    return(<></>)
  }
  return (
    <>
      <h2> Log In to application</h2>
      <form onSubmit={handleLogin} id='logIn_form'>
        <div>
          <label htmlFor='username'> username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={handleUsername}
          ></input>
        </div>
        <div>
          <label htmlFor='password'> password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={handlePassword}
          ></input>
        </div>
        <button id='logIn_btn'>Log In</button>
      </form>
    </>
  )
}

export default LoginForm
