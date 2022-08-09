// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import data from "./countries.json";
import { firebase } from "../../config/firebase";
import axios from "axios";
import { headers, routes } from "../../routes";
import { useDispatch } from "react-redux/es/exports";
import { init as userInit } from "../../redux/userSlice";
import { useSelector } from "react-redux/es/exports";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Modal from '../../components/Modal'
import { ClipLoader } from "react-spinners";


export default function Masjid() {
  const dispatch = useDispatch();
  let isLoggedIn = localStorage.getItem("user") ? true : false;
  let user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null
  const colors = useSelector(data => data.settings.colors)
  const [loggedIn, setLoggedIn] = useState(isLoggedIn)
  const [countryCode, setCountryCode] = useState([]);
  const [country, setCountry] = useState([]);
  const [mobileNo, setMobileNo] = useState("");
  const [otp, setOtp] = useState(!loggedIn);
  const [menu, setMenu] = useState(loggedIn);
  const [input, setInput] = useState(false);
  const [mInput, setMInput] = useState(true);
  const [code, setCode] = useState("");
  const [qrCode, setQrCode] = useState(null)
  const [qrId, setQrId] = useState(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [confirmationPopup, setConfirmationPopup] = useState({
    isOpen: false,
    text: "",
    error: false
  })
  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const openQRLoginModal = e => {
    e.preventDefault()
    setIsQrModalOpen(true)
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
        setLoginLoading(false)
        setLoggedIn(true)
        const userData = JSON.stringify(res.data.response);
        localStorage.setItem("user", userData);
        dispatch(userInit(res.data.response));
        setIsQrModalOpen(false)
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

  const getCountryCode = () => {
    let x = country;
    data.map((e) => {
      x.push({ value: e.dial_code, label: e.flag + e.dial_code, flag: e.flag, code: e.code, dial_code: e.dial_code });
    });
    setCountry(x);
  };

  // useEffect(() => {
  //   getCountryCode();
  // }, []);

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("sign-in-button", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        sendOtp();
        console.log("Recaptca varified:", response);
      },
      defaultCountry: "IN",
    });
  };

  const sendOtp = (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = countryCode.value + mobileNo;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setMInput(false);
        setInput(true);
      })
      .catch((error) => {
        console.log("SMS not sent:", error);
      });
  };

  const submitOTP = (e) => {
    const otpCode = code;
    e.preventDefault();
    window.confirmationResult
      .confirm(otpCode)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        localStorage.setItem("uid", JSON.stringify(user));
        registerUser();
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error);
      });
  };

  const registerUser = () => {
    let uCountryCode = countryCode.value;
    let code = uCountryCode.replace("+", "");
    let body = {
      userId: 0,
      countryCode: code,
      phoneNumber: mobileNo,
    };
    console.log(routes.registerUser)
    axios.post(routes.registerUser, body, {
      headers: headers,
    })
      .then((res) => {
        const userData = JSON.stringify(res.data.response);
        localStorage.setItem("user", userData);
        dispatch(userInit(res.data.response));
        setOtp(false);
        setMenu(true);
      });
  };

  const guest = () => {
    setOtp(false);
    setMenu(true);
  };

  return (
    <div className={`masjid-container`}>
      {!loggedIn && <Modal
        open={isQrModalOpen}
        title={`Sync With Mobile App`}
      >
        {qrCode ?
          <QRCode colors={colors}>
            <button class="close-btn" onClick={() => setIsQrModalOpen(false)}><CancelRoundedIcon /></button>
            <div class="qr-container">
              <img src={qrCode} height="100px" />
              <p>Please Login to access more exciting features. <b><u>Scan the QR code</u></b> with <u><a href="">Clear Quran</a></u> mobile app, after finish scanning press continue  </p>
            </div>
            <button className={loginLoading ? "qr-confirm-btn disabled" : "qr-confirm-btn"} onClick={loginWithQRId}>Continue</button>
            {loginLoading && <p>Login may take a minute! Please wait</p>}
            <ClipLoader loading={loginLoading} color={colors.base} size={30} />
          </QRCode> :
          <ClipLoader />
        }
      </Modal>
      }
      {/* First this React Fragment was embedded with "menu" variable, if menu is true this will show */}
      {loggedIn ?
        <>
          {
            user.isPaid ?
              <>
                <div className={`row`}>
                  <div className={`col-md-12 col-sm-12`}>
                    {loggedIn && <Link className={`home-tile`} to="/profile">
                      <i className={`fa fa-user-o`} aria-hidden="true"></i>
                      <br />
                      <span>profile</span>
                    </Link>}
                    <Link className={`home-tile`} to="/surah">
                      <i className={`fa fa-file-text-o`} aria-hidden="true"></i>
                      <br />
                      <span>surah</span>
                    </Link>
                  </div>
                </div>
                <div className={`row`}>
                  <div className={`col-md-12 col-sm-12`}>
                    <div className="home-tile-row">
                      {loggedIn && <Link className={`home-tile`} to="/notes">
                        <i className={`fa fa-file-text-o`} aria-hidden="true"></i>
                        <br />
                        <span>notes</span>
                      </Link>}
                      {loggedIn && <Link className={`home-tile`} to="/bookmarks">
                        <i className={`fa fa-bookmark-o`} aria-hidden="true"></i>
                        <br />
                        <span>bookm.</span>
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
                      {loggedIn && <Link className={`home-tile`} to="/bookmarks">
                        <i className={`fa fa-bookmark-o`} aria-hidden="true"></i>
                        <br />
                        <span>bookm.</span>
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
          }
        </> :
        <>
          {/* <div className={`row`}>
            <div className={`col-md-12 col-sm-12`}>
              <div className="home-tile-row" style={{ width: '300px', textAlign: 'right', marginBottom: '16px'}}>                 
                Please Login to access more exciting features. <b><u>Scan the QR code</u></b> with <u><a href="">Clear Quran</a></u> mobile app, after finish scanning press continue                
              </div>
            </div>
          </div> */}

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
                {/* <Link className={`home-tile`} to="/contact">
                  <i className={`fa fa-phone`} aria-hidden="true"></i>
                  <br />
                  <span>contact</span>
                </Link> */}
                <Link className={`home-tile`} to="/search">
                  <i className={`fa fa-search`} aria-hidden="true"></i>
                  <br />
                  <span>search</span>
                </Link>
                <a className={`home-tile`} href="#" onClick={openQRLoginModal}>
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


      {/* {otp && (
        <div class="row">
          <div className={`col-md-12 col-sm-12`}>
            <div className={`contact-form-login`}>
              <h4>Log in</h4>

              {mInput && (
                <>
                  <div className={`form-group`}>
                    <label for="phoneNumber">Phone Number:</label>
                    <div className={`input-phone`}>
                      <Select
                        name="colors"
                        options={country}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e) => setCountryCode(e)}
                      />
                      <input type="text" onChange={(e) => setMobileNo(e.target.value)} />
                    </div>
                  </div>

                  <div className={`form-group`}>
                    <button type="button" className={`btn tcq-button`} onClick={(e) => sendOtp(e)}>
                      <div id="sign-in-button"></div>
                      Get OTP
                    </button>
                  </div>
                </>
              )}

              {input && (
                <>
                  <div className={`form-group hidden`} id="divOTP">
                    <label for="password">OTP:</label>
                    <input type="password" className={`form-control`} placeholder="Enter otp" onChange={(e) => setCode(e.target.value)} />
                  </div>
                  <div>
                    <button type="button" className={`btn btn-default hidden tcq-button`} id="contact-us-btn" onClick={(e) => submitOTP(e)}>
                      Sign in
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

const QRCode = styled.div`  
  margin-top: 20px;  
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: flex-start;
  .qr-container {
    display: flex;
    gap: 25px;
    & > img {
      padding: 20px;
      width: 250px;
      height: 250px;
      border: 1px solid ${props => props.colors.base};
    }
    p {
      flex: 1;
      font-size: 1.2rem;
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