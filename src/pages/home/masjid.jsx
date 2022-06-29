// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "react-select";
import data from "./countries.json";
import { firebase } from "../../config/firebase";
import axios from "axios";
import { headers, routes } from "../../routes";
import { useDispatch } from "react-redux/es/exports";
import { init as userInit } from "../../redux/userSlice";

export default function Masjid() {
  const dispatch = useDispatch()
  let loggedIn = localStorage.getItem("user") ? true : false;
  const [countryCode, setCountryCode] = useState([]);
  const [country, setCountry] = useState([]);
  const [mobileNo, setMobileNo] = useState("");
  const [otp, setOtp] = useState(!loggedIn);
  const [menu, setMenu] = useState(loggedIn);
  const [input, setInput] = useState(false);
  const [mInput, setMInput] = useState(true);
  const [code, setCode] = useState("");

  const getCountryCode = () => {
    let x = country;
    data.map((e) => {
      x.push({ value: e.dial_code, label: e.flag + e.dial_code, flag: e.flag, code: e.code, dial_code: e.dial_code });
    });
    setCountry(x);
  };

  useEffect(() => {
    getCountryCode();
  }, []);

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
    console.log("Here");

    let uCountryCode = countryCode.value;
    let code = uCountryCode.replace("+", "");
    let body = {
      userId: 0,
      countryCode: code,
      phoneNumber: mobileNo,
    };

    axios.post(routes.registerUser, body, {
      headers: headers
    }).then((res) => {
      const userData =  JSON.stringify(res.data.response)
      localStorage.setItem("user", userData);
      dispatch(userInit(res.data.response))
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
      {menu && (
        <>
          <div className={`row`}>
            <div className={`col-md-12 col-sm-12`}>
              <Link className={`home-tile`} to="/profile">
                <i className={`fa fa-user-o`} aria-hidden="true"></i>
                <br />
                <span>profile</span>
              </Link>
              <a className={`home-tile`}>
                <i className={`fa fa-file-text-o`} aria-hidden="true"></i>
                <br />
                <Link to="/surah">
                  <span>surah</span>
                </Link>
              </a>
            </div>
          </div>
          <div className={`row`}>
            <div className={`col-md-12 col-sm-12`}>
              <div className="home-tile-row">
                <Link className={`home-tile`} to="/notes">
                  <i className={`fa fa-file-text-o`} aria-hidden="true"></i>
                  <br />
                  <span>notes</span>
                </Link>
                <a className={`home-tile`}>
                  <i className={`fa fa-bookmark-o`} aria-hidden="true"></i>
                  <br />
                  <span>bookm.</span>
                </a>
                <a className={`home-tile`}>
                  <i className={`fa fa-search`} aria-hidden="true"></i>
                  <br />
                  <span>search</span>
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
              <Link className={`home-tile`} to="/contact">
                <i className={`fa fa-phone`} aria-hidden="true"></i>
                <br />
                <span>contact</span>
              </Link>
              <a className={`home-tile`}>
                <i className={`fa fa-user-circle`} aria-hidden="true"></i>
                <br />
                <span>about</span>
              </a>
            </div>
          </div>
        </>
      )}

      {otp && (
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
                  <button type="button" className={`btn tcq-button`} onClick={guest}>
                    Guest
                  </button>
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

              {/* </form> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
