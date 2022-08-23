import React from 'react'
import ModalContainer from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { ClipLoader } from "react-spinners";
import styled from 'styled-components';

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

function QRModal({ open, setOpen, qrCode, loginWithQRId, loginLoading, error }) {
    const colors = useSelector(data => data.settings.colors)
  return (
    <ModalContainer
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Heading colors={colors}>
          <h5 className="title">Sync With Mobile Device</h5>
          <button className="close-btn" onClick={() => setOpen(false)}><CancelRoundedIcon /></button>
        </Heading>
        <Bar colors={colors}/>
        {qrCode ?
          <QRCode colors={colors}>
            { error.error && <p className="error">Scane the current QR with mobile first, if still not working refresh and try again</p> }
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
          </Loading>
        }
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
    top: 10px;
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
const Bar = styled.div`
    height: 6px;
    width: 100%;
    background-color: ${props => props.colors.base};
`
const QRCode = styled.div`  
  margin-top: 20px;  
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 25px 50px;
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
export default QRModal