import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Status() {

    const [repairedItems, setRepairedItems] = useState([]);
    const [pendingItems, setPendingItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://repairtu.onrender.com/api/upload');
                const data = response.data;

                const repaired = data.filter(item => item.status === 'repaired');
                const pending = data.filter(item => item.status === 'pending');

                setRepairedItems(repaired);
                setPendingItems(pending);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    console.log(pendingItems);
    console.log(repairedItems);
    // สร้าง state เพื่อเก็บสถานะปัจจุบันของสวิตช์
    const [isRepaired, setIsRepaired] = useState(() => sessionStorage.getItem("toggle") === "true");
    useState(() => {
        setIsRepaired(sessionStorage.getItem("toggle") === "true");
    })

    // ฟังก์ชันจัดการการเปลี่ยนสถานะของสวิตช์
    const handleToggle = () => {
        setIsRepaired(prev => {
            const newValue = !prev;
            sessionStorage.setItem("toggle", newValue);
            return newValue;
        })
    };


    return (
        <>
            <div className="min-h-screen">
                <div className="w-full bg-[#F6F6F6] flex items-center indent-10">
                    <h1 className="font-bold text-4xl sm:text-5xl text-[#340000] my-5 sm:my-10">STATUS</h1>
                </div>

                <div className="w-full h-screen bg-gradient-to-t from-[#FFD705] to-[#FF0000] rounded-t-[35px]">

                    <div className="flex justify-between items-center pt-10 px-5 md:px-12 xl:px-24">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="toggleSwitch"
                                className="sr-only peer"
                                onChange={handleToggle}
                                checked={!isRepaired}
                            />
                            <div
                                className="relative w-48 h-10 sm:w-72 sm:h-14 shadow-[0_10px_5px_-5px_rgba(0,0,0,0.3)] 
                         rounded-xl peer dark:bg-[#340000] 
                         peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                         after:absolute after:top-[4px] after:start-[4px] sm:after:start-[6px] after:bg-[#FFD705] after:rounded-xl 
                         after:h-8 sm:after:h-12 after:w-[48%] after:transition-all peer-checked:bg-[#340000]"
                            >
                                <div className="flex items-center justify-between h-full px-2 sm:px-4">
                                    <span className="text-[10px] sm:text-base text-[#340000] font-semibold ml-5 z-10">
                                        REPAIRED
                                    </span>
                                    <span className="text-[10px] sm:text-base text-[#340000] font-semibold mr-1 sm:mr-0 z-10">
                                        PENDING REPAIR
                                    </span>
                                </div>
                            </div>
                        </label>
                        <Link to="/Upload">
                            <button
                                id="to_add_page"
                                className="text-3xl sm:text-4xl md:text-5xl text-white fa-solid fa-plus hover:opacity-80"
                            ></button>
                        </Link>
                    </div>

                    {/* Centering the gray box */}
                    <div className="flex justify-center items-center w-full h-[75%] mt-10">
                        <div id="statusBox" className="w-[85%] h-[90%] bg-gray-200 rounded-md overflow-y-auto">
                            {isRepaired ? (
                                // Display items when status is "Repaired"
                                repairedItems.map((item, index) => (
                                    <Link key={index} to={`/Infomation/${item._id.toString()}`}
                                    onClick={() => {sessionStorage.setItem("status", item.status);}}>
                                        <div className="flex justify-between p-2 bg-white shadow-inner hover:shadow-gray-500">
                                            <div className="w-1/5 flex items-center justify-center">
                                                <div className="w-20 h-20 rounded-md overflow-hidden border-2 border-gray-300 shadow-lg">
                                                    <img
                                                        src={`https://repairtu.onrender.com/api/${item.image_path.replace(/\\/g, '/')}`}
                                                        className="w-full h-full object-cover"
                                                        alt="image"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full h-full ml-2">
                                                <div className="w-full h-1/2 font-black text-[10px] sm:text-xl flex items-center justify-between">
                                                    <p>{item.issue}</p>
                                                    <p className="font-normal text-[10px] sm:text-lg ml-10">{item.time}</p>
                                                </div>
                                                <div className="text-[9px] sm:text-lg text-gray-500">{item.location}</div>
                                            </div>
                                            <div className="w-20 flex items-center justify-center">
                                                <div id="status_color" className="w-3 h-3 sm:w-5 sm:h-5 bg-green-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                // Display items when status is "Pending Repair"
                                pendingItems.map((item, index) => (
                                    <Link key={index} to={`/Infomation/${item._id.toString()}`}
                                    onClick={() => {sessionStorage.setItem("status", item.status);}}>
                                        <div className="flex justify-between p-2 bg-white shadow-inner hover:shadow-gray-500">
                                            <div className="w-1/5 flex items-center justify-center">
                                                <div className="w-20 h-20 rounded-md overflow-hidden border-2 border-gray-300 shadow-lg">
                                                    <img
                                                        src={`https://repairtu.onrender.com/api/${item.image_path.replace(/\\/g, '/')}`}
                                                        className="w-full h-full object-cover"
                                                        alt="image"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full h-full ml-2">
                                                <div className="w-full h-1/2 font-black text-[10px] sm:text-xl flex items-center justify-between">
                                                    <p>{item.issue}</p>
                                                    <p className="font-normal text-[10px] sm:text-lg ml-10">{item.time}</p>
                                                </div>
                                                <div className="text-[9px] sm:text-lg text-gray-500">{item.location}</div>
                                            </div>
                                            <div className="w-20 flex items-center justify-center">
                                                <div id="status_color" className="w-3 h-3 sm:w-5 sm:h-5 bg-red-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Status