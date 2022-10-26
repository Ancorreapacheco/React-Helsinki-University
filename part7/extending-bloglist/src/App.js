import { useState, useEffect, useRef } from 'react'

//Styles

import './style/app.css'


//Components
import Blog from './components/Blog'
import LoginForm from './components/LogInForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'


//Services
import blogService from './services/blogs'
import logInService from './services/login'

//Redux App
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {

  const [username,setUsername]= useState('')
  const [password, setPassword]= useState('')
  const [user, setUser]= useState(null)
  const blogFormRef= useRef()


  //Using Redux
  const dispatch= useDispatch()
  const blogs= useSelector(state => state.blogs)

  //Update blog list at the begining
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //Saving user to localStorage
  useEffect(() => {
    const userInLocal= window.localStorage.getItem('userLoggedIn')
    if(userInLocal){
      const user= JSON.parse(userInLocal)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  //----- Handling Options and buttons ---------------

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user= await logInService.logIn({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      setPassword('')
      setUsername('')
      window.localStorage.setItem('userLoggedIn',JSON.stringify(user))
      //setMessage({ content:'Login Succesful',isSuccess:true })
      setTimeout(() => {
        //setMessage({ content:null, isSuccess:true })
      }, 5000)
    } catch (error) {
      //setMessage({ content:'Username o password wrong',isSuccess:false })
      setTimeout(() => {
        //setMessage({ content:null, isSuccess:true })
      }, 5000)
      console.log(error.message)
    }

  }

  const handleLogout = e => {
    e.preventDefault()
    try {
      window.localStorage.removeItem('userLoggedIn')
      setUser(null)
      blogService.setToken(null)
      //setMessage({ content:'LogOut Succesful',isSuccess:true })
      setTimeout(() => {
        //setMessage({ content:null, isSuccess:true })
      }, 5000)
    } catch (error) {
      //setMessage({ content:'Logout failed',isSuccess:false })
      setTimeout(() => {
        //setMessage({ content:null, isSuccess:true })
      }, 5000)
    }
  }

  const toggleVisibility = () => {
    blogFormRef.current.changeVisible()
  }


  //---------------- Handling user input-------------
  const handleUsername = e => {
    setUsername(e.target.value)
  }

  const handlePassword = e => {
    setPassword(e.target.value)
  }



  // --------------Objects Props for components----------------
  const propsLoginForm={
    handleLogin: handleLogin,
    username: username,
    password: password,
    handlePassword: handlePassword,
    handleUsername: handleUsername,
    user:user,
  }

  //-----------------Render -------------------

  if(user=== null){
    return(
      <>
        <Notification/>
        <LoginForm props={propsLoginForm}/>
      </>
    )
  }
  return (
    <>
      <Notification />
      <p> User logged in: {user.username}</p>
      <button onClick={handleLogout}>Log Out</button>

      <Toggleable buttonLabel='New Blog Entry' ref={blogFormRef}>
        <NewBlogForm toggleVisibility={toggleVisibility}/>
      </Toggleable>

      <h2>Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} />)}
    </>
  )
}

export default App
