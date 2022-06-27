import { createSlice } from '@reduxjs/toolkit'

export const notesSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
      init: (state, action) => action.payload
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { init } = notesSlice.actions
  
  export default notesSlice.reducer