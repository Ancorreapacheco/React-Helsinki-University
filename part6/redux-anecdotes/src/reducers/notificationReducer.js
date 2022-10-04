import {createSlice} from '@reduxjs/toolkit'

const initialState= {
  message: 'React is Great',
  show:false
}

const notificationSlice = createSlice({
  name:'notification',
  initialState,
  reducers:{
    setMessage(state,action){
      const content= action.payload      
      return state={message: content.message,show: true}
    },
    removeMessage(state,action){
      const message= 'Default Message'
      return state={message,show: false}
    }
    
  }
})

export const {setMessage, removeMessage} = notificationSlice.actions
export default notificationSlice.reducer