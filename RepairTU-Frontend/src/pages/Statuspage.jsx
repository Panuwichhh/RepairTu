import React from 'react'
import Nav from '../components/Nav'
import Status from '../components/Status'
import Footer from '../components/Footer'
import StatusAdmin from '../components/StatusAdmin'

function Statuspage() {

  const role = localStorage.getItem('role');

  if(role === "admin") {
    return (
        <>
            <Nav />
            <StatusAdmin />
            <Footer />
        </>
    )
  }
  
  return (
    <>
    <Nav/>
    <Status/>
    <Footer/>
    </>
  )
}

export default Statuspage