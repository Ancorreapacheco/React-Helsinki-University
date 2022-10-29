import { useSelector, useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { logIn } from '../reducers/userReducer'
//import { setNotificationSuccess, setNotificationFail } from '../reducers/messageReducer'

const LoginForm = () => {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const username = useField('text', 'username')
	const password = useField('password', 'password')

	const handleLogin = (e) => {
		const credentials = {
			username: username.value,
			password: password.value,
		}
		e.preventDefault()
		dispatch(logIn(credentials))

	}

	if (user === null) {
		return (
			<>
				<h2> Log In to application</h2>
				<form onSubmit={handleLogin} id='logIn_form'>
					<div>
						<label htmlFor='username'> username</label>
						<input className='form-control' {...username}></input>
					</div>
					<div>
						<label htmlFor='password'> password</label>
						<input className='form-control' {...password}></input>
					</div>
					<button id='logIn_btn'>Log In</button>
				</form>
			</>
		)
	}
}

export default LoginForm
