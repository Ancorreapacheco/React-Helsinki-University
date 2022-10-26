import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import messageReducer from './messageReducer'
const store = configureStore({
  reducer: {
    blogs: blogReducer,
    message: messageReducer
  },
})

export default store
