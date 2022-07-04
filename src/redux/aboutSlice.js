import { createSlice } from '@reduxjs/toolkit'

export const aboutSlice = createSlice({
  name: 'about',
  initialState: null,
  reducers: {
    init: (state, action) => action.payload
  },
})

// Action creators are generated for each case reducer function
export const { init } = aboutSlice.actions

export default aboutSlice.reducer