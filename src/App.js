import React from 'react'
import axios from "axios";
import './App.css'
import Home from './pages/home/home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Surah from './pages/surah/Surah'
import SurahSingle from './pages/surah-single/SurahSingle'
import { useDispatch } from 'react-redux/es/exports';
import { init } from './redux/surahSlice';
import Contact from './pages/contact/Contact';

function App() {
  const [data, setData] = React.useState([])
  const dispatch = useDispatch()
  React.useEffect(() => {
    axios.post(`http://122.175.33.146:7070/api/GetChapters`, {
      userID: 2,
      LastUpdatedTimeTicks: 0,
    }).then((res) => {
      dispatch(init(res.data.response.chapters));
    });
  }, [])
  return (
    <BrowserRouter>      
        <React.Fragment>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/surah" element={<Surah />} />
                <Route path="/surah-single/:id" element={<SurahSingle />} /> 
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </React.Fragment>
    </BrowserRouter>
  )
}

export default App