import { useState, useEffect } from 'react'

//Styles

import "./style/app.css"


//Components
import Blog from './components/Blog'
import LoginForm from './components/LogInForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'


//Services
import blogService from './services/blogs'
import logInService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]= useState('')
  const [password, setPassword]= useState('')
  const [user, setUser]= useState(null)
  const [author, setAuthor]= useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl]= useState('')
  const [message, setMessage]= useState({content: null, isSuccess: true})

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

  const handleNewBlog = async e =>{
    e.preventDefault()
    const newBlog={
      title,
      author,
      url
    }
    try {
      const blogCreated= await blogService.create(newBlog)
      setBlogs(blogs.concat(blogCreated))
      setTitle("")
      setAuthor("")
      setUrl("")
      setMessage({content:`New blog added: ${blogCreated.title} by ${blogCreated.author}`,isSuccess:true})
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

  const handleTitle= e => {
    setTitle(e.target.value)
  }

  const handleAuthor = e => {
    setAuthor(e.target.value)
  }

  const handleUrl= e => {
    setUrl(e.target.value)
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

  const propsNewBlogForm={
    title,
    handleTitle,
    author,
    handleAuthor,
    url,
    handleUrl,
    handleNewBlog
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
    <NewBlogForm props={propsNewBlogForm}/>
    <h2>Blogs</h2>
    {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
    </>
  )
}

export default App
