import React from 'react'
import axios from "axios";
import './App.css'
import Home from './pages/home/home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Surah from './pages/surah/Surah'
import SurahSingle from './pages/surah-single/SurahSingle'
import { useDispatch } from 'react-redux/es/exports';
import { init } from './redux/surahSlice';
import { init as userInit } from './redux/userSlice';
import { init as notesInit } from './redux/notesSlice';
import Contact from './pages/contact/Contact';
import { routes } from './routes'
import { useSelector } from 'react-redux/es/exports';
import Notes from './pages/notes/Notes';

function App() {
  const userInfo = JSON.parse(localStorage.getItem("user")).response
  // dispatch(init(userInfo))
  const dispatch = useDispatch()
  React.useEffect(() => {    
    if (userInfo) {
      // Get chapters data
      dispatch(userInit(userInfo))
      axios.post(routes.getChapters, {
        userID: userInfo.userId,
        LastUpdatedTimeTicks: 0,
      }).then((res) => {
        console.log(res.data.response)
        dispatch(init(res.data.response.chapters));
      });
      ///////////////

      // Get notes data
      axios.post(routes.getAllNotes, {
        UserId: userInfo.userId,
        LastUpdatedTimeTicks: 0
      }).then(result => {
          console.log("Notes", result.data)
          dispatch(notesInit(result.data.response.notes))
      })
      ///////
    }  
  }, [])
  return (
    <BrowserRouter>      
        <React.Fragment>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/surah" element={<Surah />} />
                <Route path="/surah-single/:id" element={<SurahSingle />} /> 
                <Route path="/contact" element={<Contact />} />
                <Route path="/notes" element={<Notes />} />
            </Routes>
        </React.Fragment>
    </BrowserRouter>
  )
}

export default App