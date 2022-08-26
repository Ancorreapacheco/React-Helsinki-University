import { useState, useEffect, useRef } from 'react'

//Styles

import "./style/app.css"


//Components
import Blog from './components/Blog'
import LoginForm from './components/LogInForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'


//Services
import blogService from './services/blogs'
import logInService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]= useState('')
  const [password, setPassword]= useState('')
  const [user, setUser]= useState(null)  
  const [message, setMessage]= useState({content: null, isSuccess: true})

  const blogFormRef= useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const userInLocal= window.localStorage.getItem('userLoggedIn')
    if(userInLocal){
      const user= JSON.parse(userInLocal)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  //----- Handling Options and buttons ---------------

  const handleLogin = async e =>{
    e.preventDefault()
     try {
      const user= await logInService.logIn({ username, password })
      setUser(user)      
      blogService.setToken(user.token)
      setPassword('')
      setUsername('')
      window.localStorage.setItem('userLoggedIn',JSON.stringify(user))
      setMessage({content:'Login Succesful',isSuccess:true})
      setTimeout(() => {
        setMessage({content:null, isSuccess:true})
      }, 5000);      
    } catch (error) {
      setMessage({content:'Username o password wrong',isSuccess:false})
      setTimeout(() => {
        setMessage({content:null, isSuccess:true})
      }, 5000);
      console.log(error.message)
    }

  }

  const handleLogout = e => {
    e.preventDefault()
    try {
      window.localStorage.removeItem('userLoggedIn')
      setUser(null)
      blogService.setToken(null)
      setMessage({content:'LogOut Succesful',isSuccess:true})
      setTimeout(() => {
        setMessage({content:null, isSuccess:true})
      }, 5000);      
    } catch (error) {
      setMessage({content:'Logout failed',isSuccess:false})
      setTimeout(() => {
        setMessage({content:null, isSuccess:true})
      }, 5000);
    }
  }

  const addBlog = async blogObject =>{
    try {
      const blogCreated= await blogService.create(blogObject)
      setBlogs(blogs.concat(blogCreated))      
      setMessage({content:`New blog added: ${blogCreated.title} by ${blogCreated.author}`,isSuccess:true})
      blogFormRef.current.changeVisible()
      setTimeout(() => {
        setMessage({content:null, isSuccess:true})
      }, 5000);
    } catch (error) {
      setBlogs(blogs)
      setMessage({content:`New blog could not be added`,isSuccess:false})
      setTimeout(() => {
        setMessage({content:null, isSuccess:true})
      }, 5000);
    }
  }

  //---------------- Handling user input-------------
  const handleUsername = e =>{
    setUsername(e.target.value)
  }

  const handlePassword = e =>{
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
      <Notification message={message}/>
      <LoginForm props={propsLoginForm}/>
      </>
      ) 
  }
  return (
    <>
    <Notification message={message}/>
    <p> User logged in: {user.username}</p>
    <button onClick={handleLogout}>Log Out</button>
    
    <Toggleable buttonLabel='New Blog Entry' ref={blogFormRef}>
      <NewBlogForm addBlog={addBlog}/>
    </Toggleable>
    
    <h2>Blogs</h2>
    {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
    </>
  )
}

export default App
