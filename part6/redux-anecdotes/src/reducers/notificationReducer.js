import {createSlice} from '@reduxjs/toolkit'

const initialState= null

const notificationSlice = createSlice({
  name:'notification',
  initialState,
  reducers:{
    setMessage(state,action){           
      return state= action.payload
    },
    removeMessage(state,action){
      return state=null
    }
    
  }
})

export const {setMessage, removeMessage} = notificationSlice.actions

let timeOutId= undefined
export const setNotification = (message, time) => {
  return async dispatch =>{
    clearTimeout(timeOutId)
    dispatch(setMessage(message))
    timeOutId= setTimeout(() => {
      dispatch(removeMessage())
    }, time *1000)
    console.log(timeOutId)
  }
}

export default notificationSlice.reducer