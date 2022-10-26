import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import messageReducer from './messageReducer'
import userReducer from './userReducer'


const store = configureStore({
	reducer: {
		blogs: blogReducer,
		message: messageReducer,
		user: userReducer
	},
})

export default store
