import { createSlice } from '@reduxjs/toolkit'
import quranicThemes from '../QuranicThemes.json'

export const surahSlice = createSlice({
  name: 'surah',
  initialState: [],
  reducers: {
    init: (state, action) => {
      return action.payload.map((surah, i) => {
        return {
          ...surah,
          hasThemeDoctrine: quranicThemes[i].hasThemeDoctrine,
          hasThemeUnseen: quranicThemes[i].hasThemeUnseen,
          hasThemeStories: quranicThemes[i].hasThemeStories
        }
      })
    },
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