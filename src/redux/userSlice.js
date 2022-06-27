import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
      init: (state, action) => action.payload
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { init } = userSlice.actions
  
  export default userSlice.reducer