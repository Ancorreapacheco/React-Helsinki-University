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

export const setNotification = (message, time) => {
  return async dispatch =>{
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(removeMessage())
    }, time *1000);
  }
}

export default notificationSlice.reducer