import { createSlice } from "@reduxjs/toolkit";

const filterSlice= createSlice({
  name:'filter',
  initialState: null,
  reducers:{
    setFilter(state,action){
      const content= action.payload
      return state= content
    }
  }
})

export const {setFilter}= filterSlice.actions
export default filterSlice.reducer 