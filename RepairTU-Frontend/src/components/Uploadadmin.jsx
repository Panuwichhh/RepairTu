import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Uploadadmin() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null); // เก็บไฟล์ที่ผู้ใช้อัปโหลด
  const [value, setValue] = useState({
    major: '',
    details: '',
  });
  const [preview, setPreview] = useState(null); // สำหรับแสดงภาพพื้นหลัง

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // เก็บไฟล์ที่ผู้ใช้เลือก
    setFile(selectedFile); // อัปเดต state ด้วยไฟล์ที่เลือก
    setPreview(URL.createObjectURL(selectedFile)); // สร้าง URL ของไฟล์เพื่อแสดงภาพตัวอย่างเป็นพื้นหลัง
  };

  const handleInputChange = (event) => {
    const { name, value: inputValue } = event.target;
    setValue((prevValue) => ({
      ...prevValue, // เก็บค่า input
      [name]: inputValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file); // แนบไฟล์ที่เลือก
    formData.append('referencePostId', sessionStorage.getItem('postId'));
    formData.append('major', value.major);
    formData.append('details', value.details);

    axios.post('https://repairtu.onrender.com/api/uploadAdmin', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + localStorage.getItem('accessToken')
      },
    })
      .then((response) => {
        console.log('Success', response.data);
        Swal.fire({
          title: "Success",
          icon: "success",
          showConfirmButton: "OK"
        }).then((result) => {
          sessionStorage.setItem("toggle", "true");
          if(result.isConfirmed) navigate("/Status");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          showConfirmButton: "OK"
        }).then((result) => {
          sessionStorage.setItem("toggle", "true");
          if(result.isConfirmed) navigate("/Status");
        });
        console.log('Error', error.message);
      });
  };

  return (
    <>
      <div className="font-inter">
        <h1 className="font-inter mt-4 ml-[5vw] text-[4.5rem] font-bold text-[#340000] max-lg:text-[2rem] ">INFORMATION</h1>
        <form className="justify-center flex max-xl:grid max-xl:grid-cols-1" onSubmit={handleSubmit}>
          <div className="flex item-center justify-center w-full h-[50rem] max-xl:h-[30rem] max-lg:w-full ">
            {/* กำหนดพื้นหลังเป็นภาพที่ผู้ใช้อัปโหลด */}
            <label htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center h-auto w-full mx-5 mb-[2rem] mt-[3rem] border rounded-[35px] cursor-pointer hover:bg-gray-300 border-4 border-dashed border-red-600"
              style={{
                backgroundImage: preview ? `url(${preview})` : 'none', // ตั้งพื้นหลังเป็นภาพที่อัปโหลด
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {!preview && (
                  <>
                    <i className="fa-solid fa-cloud-arrow-up text-[5rem] text-red-400"></i>
                    <div className="text-lg flex">
                      <p>Click to upload image</p> <p className="text-red-400 ml-2 underline underline-offset-2">Here</p>
                    </div>
                  </>
                )}
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          <div className="mt-[3rem] p-4 w-1/3 max-xl:w-full max-xl:mt-1">
            <div className="bg-gradient-to-b from-[#FF0000] to-[#FFD705] shadow-2xl item-center mx-5 mb-5 rounded-3xl p-4">
              {/* ฟอร์มกรอกข้อมูล */}

              <div className="mb-5">
                <label className="text-white block mb-2 text-lg font-medium">ชื่อหน่วยงาน</label>
                <input type='text' name="major" required onChange={handleInputChange} value={value.major} className="shadow-sm bg-white border border-gray-300 text-gray-900 rounded-lg w-full p-2.5" placeholder="" />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-lg font-medium text-white">รายละเอียดเพิ่มเติม</label>
                <textarea name="details" onChange={handleInputChange} value={value.details} className="shadow-sm bg-white border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 h-64" placeholder="ใส่รายละเอียด"></textarea>
              </div>
              <div className="mb-5 text-center">
                <button className="shadow bg-red-500 text-white hover:bg-red-400 font-bold py-2 px-4 rounded" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Uploadadmin;
