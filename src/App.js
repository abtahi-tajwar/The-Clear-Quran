import React from "react";
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
import { routes, headers } from './routes'
import { useSelector } from 'react-redux/es/exports';
import Notes from './pages/notes/Notes';
import Profile from './pages/profile/Profile';
import fullQuranData from './quranData.json';
import EditProfile from './pages/profile/EditProfile';
import Payment from './pages/payment/Payment'
import Search from "./pages/search/Search";

function App() {
  let loggedIn = localStorage.getItem("user") ? true : false;
  const userState = useSelector(data => data.user)
  const quranData = fullQuranData
  const dispatch = useDispatch()
  console.log(fullQuranData)
  // dispatch(init(quranData.response.chapters));

  
  React.useEffect(() => {
    if (!userState && loggedIn) {
      const userInfo = loggedIn ? JSON.parse(localStorage.getItem("user")) : null
      console.log(loggedIn, JSON.parse(localStorage.getItem("user")))
      dispatch(userInit(userInfo))
    } else if (userState) {
      // Get chapters data
      console.log(userState)
      dispatch(init(quranData.response.chapters))
      axios.post(routes.getChapters, {
        userID: userState.userId,
        LastUpdatedTimeTicks: 0,
      }, {
        headers: headers
      }).then((res) => {
        dispatch(init(res.data.response.chapters));
      });
      ///////////////

      // Get notes data
      axios.post(
          routes.getAllNotes,
          {
            UserId: userState.userId,
            LastUpdatedTimeTicks: 0,
          },
          {
            headers: headers,
          }
        )
        .then((result) => {
          dispatch(notesInit(result.data.response.notes));
        });
      ///////
    }
  }, [userState]);

  return (
    <BrowserRouter>      
        <React.Fragment>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/surah" element={<Surah />} />
                <Route path="/surah-single/:id" element={<SurahSingle />} /> 
                <Route path="/contact" element={<Contact />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
