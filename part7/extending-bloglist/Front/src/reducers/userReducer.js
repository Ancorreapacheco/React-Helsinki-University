import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import {
	setNotificationSuccess,
	setNotificationFail,
} from '../reducers/messageReducer'

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		addUserLogged(state, action) {
			const user = action.payload
			blogService.setToken(user.token)
			return { ...user }
		},
		removeUserLogged(state) {
			/* for (const key in state) {
				delete state[key]
			} */
			state=null
			return state
		},
	},
})

export const { addUserLogged, removeUserLogged } = userSlice.actions

export const logIn = (credentials) => {
	return async (dispatch) => {
		try {
			const user = await loginService.logIn(credentials)
			dispatch(addUserLogged(user))
			window.localStorage.setItem('userLoggedIn',JSON.stringify(user))
			dispatch(
				setNotificationSuccess(`Login Success, welcome ${credentials.username}`)
			)
		} catch (error) {
			dispatch(setNotificationFail('Wrong Credentials'))
		}
	}
}

export const logOut = () => {
	return async dispatch => {
		try {
			window.localStorage.removeItem('userLoggedIn')
			dispatch(removeUserLogged())
			blogService.setToken(null)
			dispatch(setNotificationSuccess('Log Out Successfull'))
		} catch (error) {
			dispatch(setNotificationFail('Log Out Unsuccessfull'))

		}
	}
}

export default userSlice.reducer
