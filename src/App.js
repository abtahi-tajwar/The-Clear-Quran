import React from "react";
import axios from "axios";
import './App.css'
import './config/firebase'
import Home from './pages/home/home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Surah from './pages/surah/Surah'
import SurahSingle from './pages/surah-single/SurahSingle'
import SurahSingle2 from "./pages/surah-single/SurahSingle2";
import { useDispatch } from 'react-redux/es/exports';
import { init } from './redux/surahSlice';
import { mergeBookmarkData } from "./redux/surahSlice";
import { mergeNoteData } from "./redux/surahSlice";
import { init as userInit } from './redux/userSlice';
import { init as notesInit } from './redux/notesSlice';
import { init as aboutInit } from './redux/aboutSlice'
import { init as bookmarkInit } from "./redux/bookmarkSlice";
import { initAndStore as bookmarkInitAndStore } from "./redux/bookmarkSlice";
import { setBaseColor } from "./redux/settingsSlice";
import Contact from './pages/contact/Contact';
import { routes, headers } from './routes'
import { useSelector } from 'react-redux/es/exports';
import Notes from './pages/notes/Notes';
import Profile from './pages/profile/Profile';
import fullQuranData from './quranData.json';
import EditProfile from './pages/profile/EditProfile';
import Payment from './pages/payment/Payment'
import Search from "./pages/search/Search";
import About from "./pages/about/About";
import Bookmark from "./pages/bookmark/Bookmark";

function App() {
  let loggedIn = localStorage.getItem("user") ? true : false;
  let baseColor = localStorage.getItem("basecolor");
  let bookmarkData = localStorage.getItem("bookmarks") ? JSON.parse(localStorage.getItem("bookmarks")) : false
  const allData = useSelector(data => data)
  const userState = allData.user
  const surahData = allData.surah
  const quranData = fullQuranData
  const dispatch = useDispatch()

  // dispatch(init(quranData.response.chapters));

  React.useEffect(() => {
    dispatch(init(quranData.response.chapters))
    if (baseColor) {
      console.log(baseColor)
      dispatch(setBaseColor(baseColor))
    }
  }, [])
  React.useEffect(() => {
    if (!loggedIn) {
      console.log("Not Logged In")
    } else if (!userState && loggedIn) {
      const userInfo = loggedIn ? JSON.parse(localStorage.getItem("user")) : null
      dispatch(userInit(userInfo))
    } else if (userState) {
      // Get chapters data      
      dispatch(init(quranData.response.chapters))
      
      // Initialize bookmark data from chapters
      if (!bookmarkData) {
        handleBookmarksData(quranData.response.chapters, false)
      }
      axios.post(routes.getChapters, {
        userID: userState.userId,
        LastUpdatedTimeTicks: 0,
      }, {
        headers: headers
      }).then((res) => {
        // Initialize bookmark data from chapters and write to local storage
        handleBookmarksData(res.data.response.chapters, true)
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
          dispatch(mergeNoteData(result.data.response.notes))
        });
      ///////


      // Get About data
      axios.get(routes.getAboutUs).then(result => {
        if (result.data.status === "Success") {
          dispatch(aboutInit(result.data.response[0]))
        } else {
          console.log("Error while fetching About us")
        }
      })
      /////

      // Initialize bookmarks data
      if (bookmarkData) {
        console.log("Existing bookmarks", bookmarkData)
        dispatch(mergeBookmarkData(bookmarkData))
        dispatch(bookmarkInit(bookmarkData))      
      }
      ///////////
    }
  }, [userState]);
  const handleBookmarksData = (surah_data, store) => {
    let temp = []
    const currentDate = new Date()
    const timestamp = currentDate.getTime()
    surah_data.forEach(surah => {
        surah.paragraphs.forEach(paragraph => {
            if (paragraph.isUserBookmarked) {
                temp.push({
                    id: paragraph.id,
                    surahId: surah.chapterId,
                    paragraphId: paragraph.id,
                    titleInEnglish: surah.titleInEnglish,
                    titleInAurabic: surah.titleInAurabic,
                    paragraph: paragraph.title,
                    fromVerseId: paragraph.fromVerseId,
                    toVerseId: paragraph.toVerseId,
                    created_at: timestamp
                })
            }
        })
    })
    if (store) {
      console.log("Saved bookmark data to local storage")
      dispatch(bookmarkInitAndStore(temp))
    } else {
      console.log("Bookmark initialized")
      dispatch(bookmarkInit(temp))
    }
    
  }

  return (
    <BrowserRouter>      
        <React.Fragment>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/surah" element={<Surah />} />
                <Route path="/surah-single/:id" element={<SurahSingle2 />} /> 
                <Route path="/contact" element={<Contact />} />                
                <Route path="/payment" element={<Payment />} />
                <Route path="/search" element={<Search />} />
                <Route path="/about" element={<About />} />
                {loggedIn && <Route path="/notes" element={<Notes />} />}
                {loggedIn && <Route path="/profile" element={<Profile />} />}
                {loggedIn && <Route path="/edit-profile" element={<EditProfile />} />}
                {loggedIn && <Route path="/bookmarks" element={<Bookmark />} />}
            </Routes>
        </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
