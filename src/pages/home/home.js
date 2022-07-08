import React from 'react';
import ReactDOM from 'react-dom';
import PaidMessage from '../../getpaid';
import Masjid from './masjid';
// import App from './App';
import Onboarding from './onboarding';
import { useSelector } from 'react-redux';

function Home() {
  const colors = useSelector(data => data.settings.colors)
  return (
    <div className='home-page' style={{ backgroundColor: colors.base }}>
      <Onboarding />
      <Masjid />
    </div>
  )
}

export default Home