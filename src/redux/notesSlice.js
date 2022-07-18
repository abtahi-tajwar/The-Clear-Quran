import { createSlice } from '@reduxjs/toolkit'

export const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    init: (state, action) => action.payload,
    replace: (state, action) => {
      const temp = [...state]
      return temp.map(item => {
        const note = { ...item }
        console.log(note, action.payload)
        if (note.id === action.payload.id) {
          return action.payload
        }
        return item
      })
    },
    add: (state, action) => ([ ...state, action.payload ])
  },

})

// Action creators are generated for each case reducer function
export const { init, replace, add } = notesSlice.actions

export default notesSlice.reducer