import { configureStore } from '@reduxjs/toolkit'
import surahSlice from './surahSlice'

export default configureStore({
  reducer: {
    surah: surahSlice
  },
})