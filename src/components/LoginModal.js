import React from 'react'
import Modal2 from './Modal2'
import styled from 'styled-components'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import QRModal from './QRModal';
import { useSelector } from 'react-redux';
import { ClipLoader } from "react-spinners";
import { routes } from '../routes';
import { init as userInit } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider  } from "firebase/auth";
import LoadingGif from '../images/loading.gif'
import CompletedGif from '../images/completed.gif'
import { Buttonbtn } from '../Style.style';

function LoginModal({ open, setOpen, setLoggedIn }) {
  const colors = useSelector(data => data.settings.colors)
  const dispatch = useDispatch()
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const auth = getAuth();
  /*
    - login (Login screen at the start)
    - qr (QR code scan screen)
    - loading (Login loading screen)
  */
  const [currentScreen, setCurrentScreen] = React.useState("login")
  const [qrCode, setQrCode] = React.useState(null)
  const [qrId, setQrId] = React.useState(null)
  const [loginLoading, setLoginLoading] = React.useState(false)
  const [loginError, setLoginError] = React.useState({
    error: false,
    message: ""
  }) 

  const openQRLoginModal = () => {
    setCurrentScreen("qr")
    axios.get(routes.getQR).then(result => {
      console.log(result.data.response.qrId)
      setQrId(result.data.response.qrId)
      setQrCode(result.data.response.qrcode)
    })
  }
  const loginWithQRId = () => {
    setLoginLoading(true)
    console.log("Login info", { id: qrId })
    axios.post(routes.loginAfterQrVerify, { id: qrId }).then(res => {
      console.log("Login response", res.data)
      if (res.data.status === "Success") {
        // user = res.data.response
        const userData = JSON.stringify(res.data.response);
        localStorage.setItem("user", userData);
        dispatch(userInit(res.data.response));
        setOpen(false)
        setLoginLoading(false)
        setLoggedIn(true)
      } else {
        setLoginLoading(false)
        setLoginError({
          messsage: "Please verify QR on mobile App first or refresh and try again",
          error: true
        })
      }
    })
  }
  const finishThirdPartyLogin = (user) => {
    setLoginLoading(true)
    setCurrentScreen("loading")
    axios.post(routes.externalAuth, {
      name: user.name ? user.name: "",
      email: user.email,
      idToken: user.accessToken
    }).then(result => {
      const userData = JSON.stringify(result.data.response);
      localStorage.setItem("user", userData);
      setLoginLoading(false)
      dispatch(userInit(result.data.response));
      setLoggedIn(true);
    })
  }
  const handleLoginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log("Google result", result)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        finishThirdPartyLogin(user)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  const handleLoginWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        finishThirdPartyLogin(user)
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        // ...
      });
  }
  const handleModalClose = () => {
    setCurrentScreen("login")
    setOpen(false)
  }
  const goBackFromQrLoginMenu = () => {
    setCurrentScreen("login")
  }
  return (
    <Modal2
      open={open}
      handleClose={handleModalClose}
      heading="Login"
    >
      { currentScreen === 'login' && 
      <Container>
        <LoginButton bgColor="#DB4437" hoverColor="#c33e32" onClick={handleLoginWithGoogle}> <GoogleIcon/> Login with google</LoginButton>
        <LoginButton bgColor="#4267B2" hoverColor="#32508b" onClick={handleLoginWithFacebook}> <FacebookOutlinedIcon/> Login with facebook</LoginButton>
        <div className="divider-or"></div>
        <LoginButton onClick={openQRLoginModal}> <QrCodeScannerOutlinedIcon/> Sync With Mobile App</LoginButton>
      </Container> }  
      { currentScreen === 'qr' && 
        <Container>
          { qrCode ? <QRCode colors={colors}>
            <button className="back-btn" onClick={goBackFromQrLoginMenu}><ArrowBackIcon /> Go Back</button>
            { loginError.error && <p className="error">Scane the current QR with mobile first, if still not working refresh and try again</p> }
            <div className="qr-container">
              <img src={qrCode} height="100px" />
              <p>Please Login to access more exciting features. <b><u>Scan the QR code</u></b> with <u><a href="">Clear Quran</a></u> mobile app, after finish scanning press continue  </p>
            </div>
            <button className={loginLoading ? "qr-confirm-btn disabled" : "qr-confirm-btn"} onClick={loginWithQRId}>Continue</button>
            {loginLoading && <p>Login may take a minute! Please wait</p>}
            <ClipLoader loading={loginLoading} color={colors.base} size={30} />
          </QRCode> :
          <Loading>
            <ClipLoader />
          </Loading> }
        </Container>
        
      }   
      { currentScreen === 'loading' && 
        <Container>
          <div className="finish">
            { loginLoading ? <React.Fragment>
              <img src={LoadingGif} height="200px" />
              <p>Wait till we log you in. It could take upto a minute</p>
            </React.Fragment> :
            <React.Fragment>
              <img src={CompletedGif} height="200px" />
              <Buttonbtn onClick={() => setOpen(false)}>You are successfully logged in!</Buttonbtn>
            </React.Fragment> }
          </div>
        </Container>
      }
    </Modal2>
  )
}  
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  animation: slideIn .3s ease-out forwards;
  .divider-or {
    height: 0.5px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: grey;
    position: relative;
    &::after {
      content: "or";
      padding: 5px;
      background-color: white;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-weight: bold;
    }
  }
  .finish {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
  @keyframes slideIn {
    from {
      transform: translate(70px);
    }
    to {
      transform: translate(0px);
    }
  }
`
const LoginButton = styled.button`
  padding: 9px;
  width: 270px;
  border-radius: 4px;
  border: none;
  outline: none;
  background-color: ${props => props.bgColor ? props.bgColor : 'black'};
  color: ${props => props.color ? props.color : 'white'};
  transition: background .2s ease-out;
  &:hover {
    background-color: ${props => props.hoverColor ? props.hoverColor: '#383838' };
  }
`
const QRCode = styled.div`  
  margin-top: 20px;  
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  .back-btn {
    outline: none;
    border: none;
    background-color: white;
    background-color: ${props => props.colors.base}10;
    padding: 5px 15px;
    align-self: flex-start;
    border-radius: 5px;
    transition: background .2s ease-out;
    &:hover {
      background-color: ${props => props.colors.base}30;
    }
  }
  .error {
    color: red;
    border: 1px solid red;
    border-radius: 5px;
    padding: 10px;
    background-color: rgba(255, 0, 0, 0.1);
  }
  .qr-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    & > img {
      width: 260px;
      height: 260px;
      border: 1px solid ${props => props.colors.base};
    }
    p {
      flex: 1;
      font-size: 1.2rem;
      text-align: center;
    }
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
const Loading = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export default LoginModal