import { createSlice } from '@reduxjs/toolkit'

export const surahSlice = createSlice({
  name: 'surah',
  initialState: [],
  reducers: {
    init: (state, action) => action.payload
  },
})

// Action creators are generated for each case reducer function
export const { init } = surahSlice.actions

export default surahSlice.reducer