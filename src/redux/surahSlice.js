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
          const surahParagraphs = surah.paragraphs.map(paragraph => {
            if (paragraph.id === action.payload.id) {
              return { ...paragraph, isUserBookmarked: true }
            }
            return { ...paragraph }
          })
          return { ...surah, paragraphs: surahParagraphs }
        } 
        return { ...surah }
      })
      return newState
    },
    mergeBookmarkData: (state, action) => {
      state.map(surah => {
        if (action.payload.find(bookmark => bookmark.surahId === surah.chapterId)) {
          const updatedParagraphs = surah.paragraphs.map(paragraph => {
            if (action.payload.find(bookmark => bookmark.paragraphId === paragraph.id)) {
              return { ...paragraph, isUserBookmarked: true }
            }
            return { ...paragraph }
          })
          return { ...surah, chapters: updatedParagraphs}
        }
        return { ...surah }
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { init, addBookmark, mergeBookmarkData } = surahSlice.actions

export default surahSlice.reducer