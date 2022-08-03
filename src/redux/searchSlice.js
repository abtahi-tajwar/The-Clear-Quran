import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState: "",
    reducers: {
      update: (state, action) => action.payload
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { update } = searchSlice.actions
  
  export default searchSlice.reducer