import React from 'react';
import ReactDOM from 'react-dom';
import PaidMessage from '../../getpaid';
import Masjid from './masjid';
// import App from './App';
import Onboarding from './onboarding';
import { useSelector } from 'react-redux';

export const HomeContext = React.createContext()
function Home() {
  let isLoggedIn = localStorage.getItem("user") ? true : false;
  let user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null
  const [loggedIn, setLoggedIn] = React.useState(isLoggedIn)
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false)
  const [redirectLogin, setRedirectLogin] = React.useState(false)
  const [openPaymentModal, setOpenPaymentModal] = React.useState(false)
  const contextValues = {
    user: user,
    stateLoggedIn: {loggedIn, setLoggedIn},
    stateIsLoginModalOpen: {isLoginModalOpen, setIsLoginModalOpen},
    stateRedirectLogin: {redirectLogin, setRedirectLogin},
    stateOpenPaymentModal: {openPaymentModal, setOpenPaymentModal}
  }
  const colors = useSelector(data => data.settings.colors)
  return (
    <HomeContext.Provider value={contextValues}>
      <div className='home-page' style={{ backgroundColor: colors.base }}>
        <Onboarding />
        <Masjid />
      </div>
    </HomeContext.Provider>
  )
}

export default Home