import { configureStore } from '@reduxjs/toolkit'


import reducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'


const store= configureStore({
  reducer:{
    anecdotes: reducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})

export default store