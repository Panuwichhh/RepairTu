import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Home from '../components/home';
import { useNavigate } from 'react-router-dom';
import StatusAdmin from '../components/StatusAdmin';

function Homepage() {

  return (
    <>
    <Nav/>
    <Home/>
    <Footer/>
    </>
  )
}

export default Homepage