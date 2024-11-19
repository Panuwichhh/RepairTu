import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'

function Home() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const handleClick = () => {
        if (role === "admin") navigate('/Status');
        else navigate('/Upload');
    }

    return (
        <>

            <div className="w-full  min-h-screen flex flex-col items-center justify-center  lg:flex-row bg-[#F6F6F6]">

                <div className="w-full flex flex-col items-center justify-center lg:flex-row bg-[#F6F6F6]">

                    <div className="w-full ">
                        <div className="text-[#340000] mt-10 flex flex-col justify-center items-center">
                            <p className="font-bold text-6xl md:text-[100px] lg:text-[120px] xl:text-[175px] m-5">WELCOME</p>
                            <p className="w-[80%] h-4/5 text-xs sm:text-xl indent-5 my-5">
                                Welcome to Repair TU System!
                                Streamline your maintenance requests with ease. Upload a photo, provide necessary details,
                                and stay updated on the status of your report. Our goal is to ensure quick, efficient,
                                and transparent repair services to keep your facilities in top condition.
                            </p>
                        </div>
                        <div className="text-[#340000] mx-16 my-10 md:mb-20 ">
                            <h1 className="font-bold text-2xl md:text-3xl ">How to use</h1>
                            <p className='md:text-xl'>1. Upload picture</p>
                            <p className='md:text-xl'>2. Fill in the information</p>
                            <p className='md:text-xl'>3. Submit the information and check the status</p>
                        </div>

                    </div>

                    <div className="flex flex-col items-center w-full h-96 justify-center ">

                        <div className="flex flex-col items-center w-full h-96 justify-center ">
                            <i className="text-[10rem] sm:text-[15rem] xl:text-[20rem] text-[#340000] fa-solid fa-screwdriver-wrench mb-5"></i>
                            <Link onClick={handleClick} ><button className="hover:scale-110  duration-500 w-44 h-12 sm:w-60 sm:h-14 font-black m-5 bg-[#E20B0B] text-white rounded-3xl hover:opacity-80 hover:text-orange-300 shadow-lg shadow-black/35">GET STARTED</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home