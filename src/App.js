import React from 'react'
import './App.css'
import Home from './pages/home/home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Surah from './pages/surah/Surah'
import SurahSingle from './pages/surah-single/SurahSingle'

function App() {
  return (
    <BrowserRouter>      
        <React.Fragment>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/surah" element={<Surah />} />
                <Route path="/surah-single" element={<SurahSingle />} /> 
            </Routes>
        </React.Fragment>
    </BrowserRouter>
  )
}

export default App