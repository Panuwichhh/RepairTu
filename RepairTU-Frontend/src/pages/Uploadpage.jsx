import React from 'react'
import Footer from "../components/Footer"
import Nav from "../components/Nav"
import Upload from "../components/Upload"
import UploadAdmin from "../components/Uploadadmin"

const Uploadpage = () =>{

    const role = localStorage.getItem('role');
    if(role === "admin") {
        return (
            <>
                <Nav />
                <UploadAdmin />
                <Footer />
            </>
        )
    }

    return (
        <>
            <Nav />
            <Upload />
            <Footer />
        </>
    )

}

export default Uploadpage