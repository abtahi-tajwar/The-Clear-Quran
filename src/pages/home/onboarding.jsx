import React, { Component } from "react";
import reactDom from "react-dom";
import PaidMessage from "../../getpaid";
import { routes } from "../../routes";
import axios from "axios";
import styled from 'styled-components'
import { useSelector } from "react-redux";
import { Buttonbtn } from "../../Style.style";
import ConfirmationPopup from "../../components/ConfirmationPopup";
import { useDispatch } from "react-redux";
import { init as userInit } from "../../redux/userSlice";
import { ClipLoader } from "react-spinners";

export default function Onboarding() {
  let user = localStorage.getItem("user") ? true : false;
  const [loggedIn, setLoggedIn] = React.useState(user)
  const [qrCode, setQrCode] = React.useState(null)
  const [qrId, setQrId] = React.useState(null)
  const colors = useSelector(data => data.settings.colors)
  const [loginLoading, setLoginLoading] = React.useState(false)
  const [confirmationPopup, setConfirmationPopup] = React.useState({        
      isOpen: false,
      text: "",
      error: false
  })
  const dispatch = useDispatch()
  const loginWithQRId = () => {
    setLoginLoading(true)
    console.log("Login info", { id: qrId })
    axios.post(routes.loginAfterQrVerify, { id: qrId }).then(res => {
      console.log("Login response", res.data)
      if (res.data.status === "Success") {
        setLoginLoading(false)
        setLoggedIn(true)
        const userData = JSON.stringify(res.data.response);
        localStorage.setItem("user", userData);
        dispatch(userInit(res.data.response));
        setConfirmationPopup({
          isOpen: true,
          text: "Successfully Logged In!",
          error: false
        })
      } else {
        setLoginLoading(false)
        setConfirmationPopup({
          isOpen: true,
          text: "Please verify QR on mobile App first or refresh and try again",
          error: true
        })
      }
    })
  }
  React.useEffect(() => {
    if (!loggedIn) {
      axios.get(routes.getQR).then(result => {
        console.log(result.data.response.qrId)
        setQrId(result.data.response.qrId)
        setQrCode(result.data.response.qrcode)
      })
    }      
  }, [])
  
  return (
    <>
      <div className={`row`}>
        <div className={`col-md-6 col-sm-8`}>
          <div className={`new-quran`}>
            <h6>The Clear</h6>
            <h1>Quran&trade;</h1>
            <h4>Translated By</h4>
            <h3>Dr.Mustafa Khattab</h3>
            {/* <PaidMessage /> */}
            {!loggedIn && 
              <React.Fragment>
                {qrCode && 
                  <QRCode colors={colors}>
                    <img src={qrCode} height="100px"/>
                    <button className={loginLoading ? "qr-confirm-btn disabled" : "qr-confirm-btn"} onClick={loginWithQRId}>Continue</button>
                    {loginLoading && <p style={{ color: 'white' }}>Login may take a minute! Please wait</p> }
                    <ClipLoader loading={loginLoading} color={colors.accent} size={30}/>
                  </QRCode>
                }
              </React.Fragment>
            }            
          </div>
        </div>
        <div class="col-md-2 col-sm-4">
          <div class="circle">
            <div class="share">
              <i class="fa fa-share-alt" aria-hidden="true"></i>
            </div>
            <ul>
              <li>
                <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http://18.195.60.150:82/&amp;src=sdkpreparse">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://twitter.com/intent/tweet?url=http://18.195.60.150:82/&text=The%20Clear%20Quran">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url=http://18.195.60.150:82/&title=The%20Clear%20Quran">
                  <i class="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://google.com/">
                  <i class="fa fa-google" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ConfirmationPopup show={confirmationPopup.isOpen} text={confirmationPopup.text} error={confirmationPopup.error} />
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
    border: 1px solid ${props => props.colors.accent};
  }
  .qr-confirm-btn {
    border: none;
    outline: none;
    color: black;
    background-color: ${props => props.colors.accent};
    padding: 9px 16px;
    cursor: pointer;
    transition: background .2s ease-out;
    &:hover {
      background-color: #cfcc2d;
    }
  }
  .qr-confirm-btn.disabled {
    pointer-events: none;
    color: gray;
  }
`