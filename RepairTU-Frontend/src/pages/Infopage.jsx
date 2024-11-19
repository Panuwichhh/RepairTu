import React from 'react'
import Nav from '../components/Nav'
import Info from '../components/infomation'
import Footer from '../components/Footer'
import InfoDone from '../components/infoDone'

function Infopage() {

  const status = sessionStorage.getItem('status');
  if (status === 'repaired') {
    return (
      <>
        <Nav />
        <InfoDone />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />
      <Info />
      <Footer />
    </>
  )
}

export default Infopage