import { createSlice } from '@reduxjs/toolkit'

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: null,
  reducers: {
    initAndStore: (state, action) => { 
        localStorage.setItem("bookmarks", JSON.stringify(action.payload))
        return action.payload
    },
    init: (state, action) => action.payload,
    add: (state, action) => {
        const newBookmarks = [
            ...state,
            action.payload
        ]
        localStorage.setItem("bookmarks", JSON.stringify(newBookmarks))
        return newBookmarks
    }
  },
})

// Action creators are generated for each case reducer function
export const { init, initAndStore, add } = bookmarkSlice.actions

export default bookmarkSlice.reducer