import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import messageReducer from './messageReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'


const store = configureStore({
	reducer: {
		blogs: blogReducer,
		message: messageReducer,
		user: userReducer,
		users: usersReducer
	},
})

export default store
