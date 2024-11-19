import React, { useState } from 'react';
import axios from 'axios';

function Login() {

    // เก็บข้อมูลผู้ใช้
    const [value, setValue] = useState({
        studentId: '',
        password: '',
    });

    //ตรวจจับ input
    const handleInputChange = (event) => {
        const { name, value: inputValue } = event.target;
        setValue((prevValue) => ({
            ...prevValue,
            [name]: inputValue,
        }));
    };


    // ส่งข้อมูลด้วย json ไปยัง api
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(value);

        axios.post( `https://repairtu.onrender.com/api/login` , value)
            .then((response) => {
                console.log('Success', response.data);
                // alert('Success')
                localStorage.setItem("accessToken", response.data.accessToken,);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                localStorage.setItem("role", response.data.role);
                //ย้ายไปหน้า home
                window.location.href = '/Home';
            })
            // จับ error
            .catch((error) => {
                if (error.response) {
                    console.log('Server Error', error.response.data);
                    alert(error.response.data.message)
                } else if (error.request) {
                    console.log('Network Error', error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
    };

    return (
        <>
            <div className="font-inter grid grid-cols-2 h-screen items-center mx-10 max-md:grid-cols-1 max-md:mx-1">
                <div className="text-center ">
                    <i className="text-[15vw] text-[#340000] fa-solid fa-screwdriver-wrench max-md:text-[20vw] "></i>
                    <p className="text-[#340000] font-bold text-[9vw] leading-none max-md:text-[15vw]">WELCOME</p>
                </div>

                <div className="item-center my-10 max-md:my-5 mx-5 ">


                    <form onSubmit={handleSubmit} className="p-5 bordershadow-sm rounded-2xl bg-gradient-to-b from-[#FF0000] to-[#FFD705] shadow-2xl mr-2">
                        <div>
                            <div className="text-[5rem] font-bold text-center text-white my-2">LOGIN</div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="student_id">
                                &#x1FAAA; <span className="text-white text-xl">STUDENT ID</span>
                            </label>
                            <input
                                type='text'
                                name='studentId' 
                                value={value.studentId}
                                onChange={handleInputChange}
                                className="shadow-sm bg-white border border-gray-300 text-gray-900 rounded-xl w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="mb-5 ">
                            <label htmlFor="password">
                                &#128274; <span className="text-white text-xl">PASSWORD</span>
                            </label>
                            <input
                                type="password"
                                name='password' 
                                value={value.password}
                                onChange={handleInputChange}
                                id="password" 
                                className="shadow-sm bg-white border border-gray-300 text-gray-900 rounded-xl w-full p-2.5"
                                required
                            />
                        </div>
                        <div className="mb-5 text-center ">
                            <button
                                type="submit"
                                className="shadow-lg bg-[#E20B0B] hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                            >
                                Login
                            </button>
                        </div>
                    </form>



                </div>
            </div>
        </>
    );
}

export default Login;
