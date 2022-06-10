import React from 'react';
import ReactDOM from 'react-dom';
import PaidMessage from '../../getpaid';
import Masjid from './masjid';
// import App from './App';
import Onboarding from './onboarding';

function home() {
  return (
    <div className='home-page'>
      <Onboarding />
      <Masjid />
    </div>
  )
}

export default home