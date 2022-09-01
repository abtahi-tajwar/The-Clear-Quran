import React from "react";
import styled from 'styled-components'
import { useSelector } from "react-redux";
import { Buttonbtn } from "../../Style.style";
import Modal from '../../components/Modal'
import PaymentModal from "../../components/PaymentModal";
import { HomeContext } from "./home";
import LogoutIcon from '@mui/icons-material/Logout';


export default function Onboarding() {
  const contextValues = React.useContext(HomeContext)
  const colors = useSelector(data => data.settings.colors)
  
  const { loggedIn, setLoggedIn } = contextValues.stateLoggedIn
  const user =  contextValues.user
  const {openPaymentModal, setOpenPaymentModal} = contextValues.stateOpenPaymentModal
  const setIsLoginModalOpen = contextValues.stateIsLoginModalOpen.setIsLoginModalOpen
  const {redirectLogin, setRedirectLogin} = contextValues.stateRedirectLogin
  const handleOpenPremiumModal = () => {
    if (!loggedIn) {
      setRedirectLogin(true)
      setIsLoginModalOpen(true)
    } else {
      setOpenPaymentModal(true)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false)
  }
  return (
    <>
      <PaymentModal open={openPaymentModal} setOpen={setOpenPaymentModal}/>
      <div className={`row`}>
        <div className={`col-md-6 col-sm-8`}>
          <div className={`new-quran`}>
            <h6>The Clear</h6>
            <h1>Quran<span className="registered">&reg;</span></h1>
            <h1 className="series-text">Series</h1>
            <h4>Translated By</h4>
            <h3>Dr.Mustafa Khattab</h3>
            
            { !user ? 
              <Buttonbtn 
                  bgColor={colors.accent}
                  hoverBgColor="#ebe83b"
                  color="#000000"
                  onClick={handleOpenPremiumModal}>UPGRADE TO PREMIUM
              </Buttonbtn> :
              <React.Fragment>
                {!user.isPaid && <Buttonbtn 
                  bgColor={colors.accent}
                  hoverBgColor="#ebe83b"
                  color="#000000"
                  onClick={handleOpenPremiumModal}>UPGRADE TO PREMIUM
                </Buttonbtn>}
              </React.Fragment>
            }      
          </div>
        </div>
        <div className="share-container" style={{ position: 'absolute', right: '70px', top: '70px' }}>
          <div className="circle">
            <div className="share">
              <i className="fa fa-share-alt" aria-hidden="true"></i>
            </div>
            <ul>
              <li>
                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://18.195.60.150:82/&amp;src=sdkpreparse">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://twitter.com/intent/tweet?url=http://18.195.60.150:82/&text=The%20Clear%20Quran">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url=http://18.195.60.150:82/&title=The%20Clear%20Quran">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://google.com/">
                  <i className="fa fa-google" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
const QRCode = styled.div`  
  margin-top: 20px;  
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-start;
  & > img {
    padding: 20px;
    width: 20vh;
    height: 20vh;
    border: 1px solid ${props => props.colors.base};
  }
  .qr-confirm-btn {
    border: none;
    outline: none;
    color: white;
    background-color: ${props => props.colors.base};
    padding: 9px 16px;
    cursor: pointer;
    transition: background .2s ease-out;
    &:hover {
      background-color: ${props => props.colors.dark};
    }
  }
  .qr-confirm-btn.disabled {
    pointer-events: none;
    color: gray;
  }
  .close-btn {
    position: absolute;
    height: 64px;
    top: 0px;
    right: 20px;
    border: none;
    outline: none;
    background-color: transparent;
  }
`