import React from 'react'
import ModalContainer from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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
function Modal2({ open, handleClose, heading, children }) {
    const colors = useSelector(data => data.settings.colors)
  return (
    <ModalContainer
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Heading colors={colors}>
                <h5 className="title">{ heading }</h5>
                <button className="close-btn" onClick={handleClose}><CancelRoundedIcon /></button>
            </Heading>
            <Bar colors={colors}/>
            <Content>
                {children}
            </Content>
        </Box>
        
    </ModalContainer>
  )
}
const Content = styled.div`
    padding:  25px 25px;
`
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
export default Modal2