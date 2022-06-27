import { configureStore } from '@reduxjs/toolkit'
import surahSlice from './surahSlice'
import userSlice from './userSlice'
import notesSlice from './notesSlice'

export default configureStore({
  reducer: {
    surah: surahSlice,
    user: userSlice,
    notes: notesSlice
  },
})