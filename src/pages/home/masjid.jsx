// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ConfirmationPopup from "../../components/ConfirmationPopup";
import LoginModal from "../../components/LoginModal";
import { HomeContext } from "./home";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Masjid() {
  const contextValues = useContext(HomeContext)
  const user = contextValues.user
  const {loggedIn, setLoggedIn} = contextValues.stateLoggedIn
  const {isLoginModalOpen, setIsLoginModalOpen} = contextValues.stateIsLoginModalOpen
  const [confirmationPopup, setConfirmationPopup] = useState({
    isOpen: false,
    text: "",
    error: false
  })
  const openLoginModal = e => {
    e.preventDefault()
    setIsLoginModalOpen(true)
  }
  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("user");
    setLoggedIn(false)
  }
  return (
    <div className={`masjid-container`}>
      {!loggedIn && 
        <React.Fragment>
          <LoginModal 
            open={isLoginModalOpen}
            setOpen={setIsLoginModalOpen}
            setLoggedIn={setLoggedIn}
          />
        </React.Fragment>
      }
      {/* First this React Fragment was embedded with "menu" variable, if menu is true this will show */}
      {loggedIn ?
        <>
          {
              <>
                <div className={`row`}>
                  <div className={`col-md-12 col-sm-12`}>
                    <Link className={`home-tile`} to="/surah">
                      <i className={`fa fa-file-text-o`} aria-hidden="true"></i>
                      <br />
                      <span>surah</span>
                    </Link>
                  </div>
                </div>
                <div className={`row`}>
                  <div className={`col-md-12 col-sm-12`}>
                      {loggedIn && <Link className={`home-tile`} to="/bookmarks">
                        <i className={`fa fa-bookmark-o`} aria-hidden="true"></i>
                        <br />
                        <span>bookm.</span>
                      </Link>}
                    {loggedIn && <Link className={`home-tile`} to="/notes">
                        <i class="fa fa-sticky-note-o"></i>
                        <br />
                        <span>notes</span>
                      </Link>}
                  </div>
                </div>
                <div className={`row`}>
                  <div className={`col-md-12 col-sm-12`}>
                    <div className="home-tile-row">
                      {loggedIn && <a className={`home-tile`} onClick={handleLogout} href="#">
                        <i className={`fa fa-sign-out`} aria-hidden="true"></i>
                        <br />
                        <span>logout</span>
                      </a>}
                      {loggedIn && <Link className={`home-tile`} to="/profile">
                        <i className={`fa fa-user-o`} aria-hidden="true"></i>
                        <br />
                        <span>profile</span>
                      </Link>}
                      <Link className={`home-tile`} to="/search">
                        <i className={`fa fa-search`} aria-hidden="true"></i>
                        <br />
                        <span>search</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={`row`}>
                  <div className={`col-md-12 col-sm-12`}>
                    <a href={`https://alfurqaanfoundation.givingfuel.com/furqaan-project`} className={`home-tile`}>
                      <i className={`fa fa-gift`} aria-hidden="true"></i>
                      <br />
                      <span>donate</span>
                    </a>
                    <a href={`https://theclearquran.org/`} className={`home-tile`}>
                      <i className={`fa fa-shopping-cart`} aria-hidden="true"></i>
                      <br />
                      <span>buy</span>
                    </a>
                    <Link className={`home-tile`} to="/contact">
                      <i className={`fa fa-phone`} aria-hidden="true"></i>
                      <br />
                      <span>contact</span>
                    </Link>
                    <Link className={`home-tile`} to="/about">
                      <i className={`fa fa-user-circle`} aria-hidden="true"></i>
                      <br />
                      <span>about</span>
                    </Link>
                  </div>
                </div>
              </>
              // <>
              //   <div className={`row`}>
              //     <div className={`col-md-12 col-sm-12`}>
              //       <div className="home-tile-row">
              //         <Link className={`home-tile`} to="/surah">
              //           <i className={`fa fa-file-text-o`} aria-hidden="true"></i>
              //           <br />
              //           <span>surah</span>
              //         </Link>
              //         {loggedIn && <Link className={`home-tile`} to="/bookmarks">
              //           <i className={`fa fa-bookmark-o`} aria-hidden="true"></i>
              //           <br />
              //           <span>bookm.</span>
              //         </Link>}
              //         <Link className={`home-tile`} to="/search">
              //           <i className={`fa fa-search`} aria-hidden="true"></i>
              //           <br />
              //           <span>search</span>
              //         </Link>
              //       </div>
              //     </div>
              //   </div>
              //   <div className={`row`}>
              //     <div className={`col-md-12 col-sm-12`}>
              //       <a href={`https://alfurqaanfoundation.givingfuel.com/furqaan-project`} className={`home-tile`}>
              //         <i className={`fa fa-gift`} aria-hidden="true"></i>
              //         <br />
              //         <span>donate</span>
              //       </a>
              //       <a href={`https://theclearquran.org/`} className={`home-tile`}>
              //         <i className={`fa fa-shopping-cart`} aria-hidden="true"></i>
              //         <br />
              //         <span>buy</span>
              //       </a>
              //       <Link className={`home-tile`} to="/contact">
              //         <i className={`fa fa-phone`} aria-hidden="true"></i>
              //         <br />
              //         <span>contact</span>
              //       </Link>
              //       <Link className={`home-tile`} to="/about">
              //         <i className={`fa fa-user-circle`} aria-hidden="true"></i>
              //         <br />
              //         <span>about</span>
              //       </Link>
              //     </div>
              //   </div>
              // </>
          }
        </> :
        <>
          <div className={`row`}>
            <div className={`col-md-12 col-sm-12`}>
              <div className="home-tile-row">
                <Link className={`home-tile`} to="/surah">
                  <i className={`fa fa-file-text-o`} aria-hidden="true"></i>
                  <br />
                  <span>surah</span>
                </Link>
              </div>
            </div>
          </div>
          <div className={`row`}>
            <div className={`col-md-12 col-sm-12`}>
              <div className="home-tile-row">
                <Link className={`home-tile`} to="/search">
                  <i className={`fa fa-search`} aria-hidden="true"></i>
                  <br />
                  <span>search</span>
                </Link>
                <a className={`home-tile`} href="#" onClick={openLoginModal}>
                  <QrCodeScannerIcon />
                  <br />
                  <span>Login</span>
                </a>
              </div>
            </div>
          </div>
          <div className={`row`}>
            <div className={`col-md-12 col-sm-12`}>
              <a href={`https://alfurqaanfoundation.givingfuel.com/furqaan-project`} className={`home-tile`}>
                <i className={`fa fa-gift`} aria-hidden="true"></i>
                <br />
                <span>donate</span>
              </a>
              <a href={`https://theclearquran.org/`} className={`home-tile`}>
                <i className={`fa fa-shopping-cart`} aria-hidden="true"></i>
                <br />
                <span>buy</span>
              </a>
              <Link className={`home-tile`} to="/about">
                <i className={`fa fa-user-circle`} aria-hidden="true"></i>
                <br />
                <span>about</span>
              </Link>
            </div>
          </div>
        </>
      }
      <ConfirmationPopup show={confirmationPopup.isOpen} text={confirmationPopup.text} error={confirmationPopup.error} />
    </div>
  );
}