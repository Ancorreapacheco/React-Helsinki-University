//React Hooks
import { useEffect } from 'react'

//Styles
import './style/app.css'

//Bootstrap Components
import { Nav,  Button } from 'react-bootstrap'

//Components
import Home from './components/Home'
import LoginForm from './components/LogInForm'
import NewBlogForm from './components/NewBlogForm'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Notification from './components/Notification'

//Router Part
import {
	Routes,
	Route,
	Link,
	Navigate,
	useMatch,
	/*useNavigate,
	useMatch, */
} from 'react-router-dom'

//Redux App
import { initializeBlogs } from './reducers/blogReducer'
import { addUserLogged } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from './reducers/userReducer'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const users = useSelector((state) => state.users)
	const blogs = useSelector((state) => state.blogs)

	//Loading blog list at the begining
	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	//Saving user to localStorage
	useEffect(() => {
		const userInLocal = window.localStorage.getItem('userLoggedIn')
		if (userInLocal) {
			const user = JSON.parse(userInLocal)
			dispatch(addUserLogged(user))
		}
	}, [])

	//Loading user list at the beginning and updating everytime when blogs change
	useEffect(() => {
		dispatch(initializeUsers())
	}, [blogs])

	const handleLogout = (e) => {
		e.preventDefault()
		dispatch(logOut())
	}

	//Router Match
	const userMatch = useMatch('/users/:id')
	const userMatched = userMatch
		? users.find((user) => user.id === userMatch.params.id)
		: null

	const blogMatch = useMatch('/blogs/:id')
	const blogMatched = blogMatch
		? blogs.find((blog) => blog.id === blogMatch.params.id)
		: {}

	return (
		<main className='container'>
			<Notification />


			<div className='header__contain'>
				<Nav justify variant='tabs' defaultActiveKey='/home'>
					<Nav.Item>
						<Nav.Link as={Link} to="/">Home</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link as={Link} to="/users">Users</Nav.Link>
					</Nav.Item>
				</Nav>
				<div className='header__contain__user'>
					{user ? (
						<span variant='info'>User Logged: {user.username}</span>
					) : null}
					{user ? (
						<Button variant='outline-danger' onClick={handleLogout}>
							Log Out
						</Button>
					) : null}
				</div>
			</div>

			<Routes>
				<Route
					path='/blogs/:id'
					element={
						user ? (
							<Blog blog={blogMatched} />
						) : (
							<Navigate replace to='/login' />
						)
					}
				/>
				<Route
					path='/users/:id'
					element={
						user ? (
							<User user={userMatched} />
						) : (
							<Navigate replace to='/login' />
						)
					}
				/>
				<Route
					path='/users'
					element={user ? <Users /> : <Navigate replace to='/login' />}
				/>
				<Route
					path='/newBlog'
					element={user ? <NewBlogForm /> : <Navigate replace to='/login' />}
				/>
				<Route
					path='/login'
					element={user ? <Navigate replace to='/' /> : <LoginForm />}
				/>
				<Route
					path='/'
					element={user ? <Home /> : <Navigate replace to='/login' />}
				/>
			</Routes>
		</main>
	)
}

export default App
