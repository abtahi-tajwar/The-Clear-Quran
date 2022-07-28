import { createSlice } from '@reduxjs/toolkit'

export const aboutSlice = createSlice({
  name: 'about',
  initialState: {
    colors: {
        base: "#461E27",
        accent: "#F8F682",
        baseLight: '#692937',
        dark: '#210F13',
        gray: '#7d7d7d',
        lightGray: '#f7f7f7'
    }
  },
  reducers: {
    setBaseColor: (state, action) => ({ ...state, colors: { ...state.colors, base: action.payload } })
  },
})

// Action creators are generated for each case reducer function
export const { setColor } = aboutSlice.actions

export default aboutSlice.reducer