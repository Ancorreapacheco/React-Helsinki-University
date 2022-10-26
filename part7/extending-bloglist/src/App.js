import { useEffect, useRef } from 'react'

//Styles

import './style/app.css'

//Components
import Blog from './components/Blog'
import LoginForm from './components/LogInForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

//Redux App
import { initializeBlogs } from './reducers/blogReducer'
import { logOut } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { addUserLogged } from './reducers/userReducer'

const App = () => {
	//const [user, setUser]= useState(null)
	const blogFormRef = useRef()

	//Using Redux
	const dispatch = useDispatch()
	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)

	//Update blog list at the begining
	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	//Saving user to localStorage
	useEffect(() => {
		const userInLocal= window.localStorage.getItem('userLoggedIn')
		if(userInLocal){
			const user= JSON.parse(userInLocal)
			dispatch(addUserLogged(user))
		}
	},[])

	//----- Handling Options and buttons ---------------

	const handleLogout = (e) => {
		e.preventDefault()
		dispatch(logOut())
	}

	const toggleVisibility = () => {
		blogFormRef.current.changeVisible()
	}

	//---------------- Handling user input-------------

	//-----------------Render -------------------

	if (user === null) {
		return (
			<>
				<Notification />
				<LoginForm />
			</>
		)
	}
	return (
		<>
			<Notification />
			<p> User logged in: {user.username}</p>
			<button onClick={handleLogout}>Log Out</button>

			<Toggleable buttonLabel='New Blog Entry' ref={blogFormRef}>
				<NewBlogForm toggleVisibility={toggleVisibility} />
			</Toggleable>

			<h2>Blogs</h2>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} user={user} />
			))}
		</>
	)
}

export default App
