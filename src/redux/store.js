import { configureStore } from '@reduxjs/toolkit'
import surahSlice from './surahSlice'
import userSlice from './userSlice'
import notesSlice from './notesSlice'
import aboutSlice from './aboutSlice'
import bookmarkSlice from './bookmarkSlice'

export default configureStore({
  reducer: {
    surah: surahSlice,
    user: userSlice,
    notes: notesSlice,
    about: aboutSlice,
    bookmark: bookmarkSlice
  },
})