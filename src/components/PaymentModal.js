import React from 'react'
import ModalContainer from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { useSelector } from 'react-redux/es/exports';
import NumberWithCountryCode from './NumberWithCountryCode';
import { Buttonbtn } from '../Style.style';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import axios from "axios";
import { firebase } from "../config/firebase";
import { headers, routes } from "../routes";
import { ClipLoader } from "react-spinners";
import MessageGif from '../images/messages.gif'
import CompletedGif from '../images/completed.gif'
import LoadingGif from '../images/loading.gif'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { init as userInit } from '../redux/userSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 448,
  maxHeight: '90vh',
  overflowY: 'auto',
  overflowX: 'hidden',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 30001,
  padding: 0
};
function PaymentModal({ open, setOpen }) {
  const colors = useSelector(data => data.settings.colors)
  const dispatch = useDispatch()
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = React.useState(1)
  const [dialCode, setDialCode] = React.useState("+880")
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [sendOtpLoading, setSendOtpLoading] = React.useState(false)
  const [uid, setUid] = React.useState()
  const [otp, setOtp] = React.useState("")
  const [submitOtpLoading, setSubmitOtpLoading] = React.useState(false)
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const [orderID, setOrderID] = React.useState(false);
  const [loginLoading, setLoginLoading] = React.useState(false)
  const [confirmationPopup, setConfirmationPopup] = React.useState({
    isOpen: false,
    text: "",
    error: false
  })

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        sendOtp();
        console.log("Recaptca verified:", response);
      },
      defaultCountry: "BD",
    });
  };

  const sendOtp = () => {
    const promise = new Promise((resolve, reject) => {
      setSendOtpLoading(true)
      configureCaptcha();
      const finalNumber = dialCode + phoneNumber;
      console.log(finalNumber);
      const appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(finalNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          setSendOtpLoading(false)
          console.log(confirmationResult)
          resolve(confirmationResult)
        })
        .catch((error) => {
          console.log(error);
          setSendOtpLoading(false)
          resolve(error)
        });
    }
    )
    return promise
  };
  const submitOTP = () => {
    setSubmitOtpLoading(true)
    const promise = new Promise((resolve, reject) => {
      window.confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          setUid(result.user);
          setSubmitOtpLoading(false)
          resolve(result)
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          setSubmitOtpLoading(false)
          reject(error)
        });
    })
    return promise
  };
  const registerUser = () => {
    setLoginLoading(true)
    const promise = new Promise((resolve, reject) => {
      let uCountryCode = dialCode;
      let code = uCountryCode.replace("+", "");
      let body = {
        userId: 0,
        countryCode: code,
        phoneNumber: phoneNumber,
      };
      console.log(routes.registerUser)
      axios.post(routes.registerUser, body, {
        headers: headers,
      })
      .then((res) => {
        const userData = JSON.stringify(res.data.response);
        localStorage.setItem("user", userData);
        dispatch(userInit(res.data.response));
        resolve(res.data.response)
        setLoginLoading(false)
      });
    })
    return promise
  };
  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "The Clear Quran Premium",
            amount: {
              currency_code: "USD",
              value: 4.99,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setPaymentSuccess(true);
    });
  };
  //capture likely error
  const onError = (data, actions) => {
    setConfirmationPopup({
      isOpen: true,
      text: "An Error occured with your payment",
      error: true
    })
  };
  React.useEffect(() => {
    if (paymentSuccess) {
      registerUser().then(() => {
        setCurrentStep(4)
      })      
    }
  }, [paymentSuccess])
  const completeStep1 = () => {
    sendOtp().then(result => {
      setCurrentStep(2)
    })
  }
  const completeStep2 = () => {
    submitOTP().then(result => {
      console.log(result)
      setCurrentStep(3)
    })
  }

  return (
    <ModalContainer
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Heading colors={colors}>
          <h5 className="title">Donating to The Clear Quran</h5>
          <p>Your donation means a lot for muslim community</p>
          { !loginLoading && <button className="close-btn" onClick={() => setOpen(false)}><CancelRoundedIcon /></button> }
        </Heading>
        <ProgessBar step={currentStep} totalSteps={totalSteps} colors={colors}>
          <div className="bar"></div>
        </ProgessBar>
        <div style={{ padding: '15px 30px', }}><i>Step {currentStep} / {totalSteps}</i></div>
        <Details currentStep={currentStep} totalSteps={totalSteps}>
          {currentStep === 1 && <div className="number-input">

            <b>Select the country code and write your rest of the number excluding the country code</b>
            <div className="input-container">
              <label>Select Country Code</label>
              <NumberWithCountryCode setDialCode={setDialCode} />
            </div>
            <div className="input-container">
              <label>Write your number</label>
              <input
                type="text"
                placeholder="Enter your number"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="input-container" >
              <Buttonbtn onClick={completeStep1} disabled={sendOtpLoading}>Next</Buttonbtn>
            </div>
            <div id="recaptcha-container"></div>
          </div>}
          {currentStep === 2 && <div className="submit-otp">
            <img src={MessageGif} height="200px" />
            <div className="input-container">
              <label>You will receive a 6 digit code through text message to your given number. Write down the code to confirm your phone number.</label>
              <input
                type="text"
                placeholder="Enter your OTP code here"
                value={otp}
                onChange={e => setOtp(e.target.value)}
              />
              <div className="input-container" >
                <Buttonbtn onClick={completeStep2} disabled={submitOtpLoading}>Verify OTP</Buttonbtn>
              </div>
            </div>
          </div>}
          {currentStep === 3 && <div className="payment-select">
            <p>Buy premium subscription for Clear Quran at <b>4.99$</b></p>
            <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={createOrder}
                onApprove={onApprove}
              />
            </PayPalScriptProvider>
          </div>}
          {currentStep === 4 && 
          <div className="finish">
            { loginLoading ? <React.Fragment>
              <img src={LoadingGif} height="200px" />
              <p>Wait till we log you in. It could take upto a minute</p>
            </React.Fragment> :
            <React.Fragment>
              <img src={CompletedGif} height="200px" />
              <Buttonbtn onClick={() => setOpen(false)}>Enjoy Premium Clear Quran!</Buttonbtn>
            </React.Fragment> }
          </div>}
        </Details>
      </Box>
    </ModalContainer>
  )
}
const Heading = styled.div`
  position: relative;
  .title {
    color: ${props => props.colors.base};
    margin-right: 50px;
  }
  .close-btn {
    position: absolute;
    height: 64px;
    top: 30px;
    right: 30px;
    border: none;
    outline: none;
    background-color: transparent;
  }
  padding: 30px;
  padding-bottom: 15px;
  -webkit-box-shadow: 4px 18px 26px -15px rgba(0,0,0,0.47); 
  box-shadow: 4px 18px 26px -15px rgba(0,0,0,0.47);
`
const ProgessBar = styled.div`
  width: 100%;
  height: 6px;
  
  background-color: white;
  .bar {
    height: 100%;
    width: ${props => props.step && `${props.step / props.totalSteps * 100}%`};
    background-color: ${props => props.colors.base};
    transition: width .2s ease-out;
  }
`
const Details = styled.div`
    padding: 30px;
    padding-top: 0px;
    margin-top: 30px;
  & > div {
    animation: slideIn .3s ease-out forwards;
  }
  .input-container {
      margin-top: 15px;
      input {
        outline: none;
        border: 0.5px solid hsl(0, 0%, 80%);
        padding: 5px 8px;
        border-radius: 4px;
        display: block;
        width: 100%;
      }
  }
    
  .number-input {
    height: 350px;
  }
  .submit-otp {
    display: flex;
    flex-direction: column;
    img {
      margin: 0 auto;
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

export default PaymentModal