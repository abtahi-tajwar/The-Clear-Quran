import { createSlice } from '@reduxjs/toolkit'

export const surahSlice = createSlice({
  name: 'surah',
  initialState: [],
  reducers: {
    init: (state, action) => action.payload,
    addBookmark: (state, action) => {
      const newState = state.map(surah => {
        if (surah.titleInEnglish === action.payload.titleInEnglish) {
          surah.paragraphs.map(paragraph => {
            if (paragraph.id === action.payload.id) {
              console.log("Updated bookmark at ", {
                ...paragraph,
                isUserBookmarked: true
              })
              return {
                ...paragraph,
                isUserBookmarked: true
              }
            }
            return { ...paragraph }
          })
        } 
        return { ...surah }
      })
      console.log(newState)
      return newState
    }
  },
})

// Action creators are generated for each case reducer function
export const { init, addBookmark } = surahSlice.actions

export default surahSlice.reducer