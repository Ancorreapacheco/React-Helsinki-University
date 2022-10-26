import { createSlice } from '@reduxjs/toolkit'


const initialState= { content: null, isSuccess: true }

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers:{
    showMessageSuccess(state,action){
      return { ...state, content: action.payload, isSuccess: true }
    },
    showMessageFail(state,action){
      return { ...state, content: action.payload, isSuccess: false }
    },
    hideMessage(state){
      return { ...state, content: null }
    }
  }
})

export const { showMessageSuccess, showMessageFail, hideMessage } = messageSlice.actions

let timeOutId= undefined
export const setNotificationSuccess = (message) => {
  return async dispatch => {
    clearTimeout(timeOutId)
    dispatch(showMessageSuccess(message))
    timeOutId= setTimeout(() => {
      dispatch(hideMessage())
    }, 5000)
  }
}


export const setNotificationFail = (message) => {
  return async dispatch => {
    clearTimeout(timeOutId)
    dispatch(showMessageFail(message))
    timeOutId= setTimeout(() => {
      dispatch(hideMessage())
    }, 5000)
  }
}

export default messageSlice.reducer