import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModalContainer from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 30001
};

export default function Modal({ open, handleClose, children, title }) {

  return (
    <div>
      <ModalContainer
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{ textAlign: 'center' }} id="modal-modal-title" variant="h6" component="h2">
            <b>{title}</b>
          </Typography>
          <div style={{ marginTop: '15px' }}>
            {children}
          </div>          
        </Box>
      </ModalContainer>
    </div>
  );
}