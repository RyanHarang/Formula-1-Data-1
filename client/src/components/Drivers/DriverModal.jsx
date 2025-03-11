import React from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const DriverModal = ({ handleCloseModal }) => {
    return (
        <div className="z-100 flex justify-center items-center fixed">
            <div className="relative max-w-5xl w-full max-h-[90vh] bg-[#35476b] rounded-2xl overflow-hidden border-2 border-black">
                <div className="relative flex items-center justify-between bg-[#2a2a2a] text-white ">
                        <div className=" rounded-tl-2xl border-2 border-[#2a2a2a]">
                            <span class="fi size-10 px-8 fi-gr"></span>
                        </div>
                    <h2 className="text-3xl">Max Verstappen</h2>
                    <button onClick={handleCloseModal} className="text-3xl pr-5 hover:cursor-pointer text-center text-justify">x</button>
                </div>
                <div className="flex flex-row p-3 gap-3">
                    <div className="flex flex-col gap-3 w-full md:w-1/2">
                        <div className="bg-white flex flex-col text-center p-3 rounded-lg shadow-md">
                            <h3 className="text-xl">Current Team</h3>
                            <img
                                className="w-1/2 mx-auto mt-2"
                                src="https://placehold.co/235x72"
                                alt="Team"
                            />
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow-md h-full">
                            <h4 className="text-gray-500">Driver Bio</h4>
                            <p className="text-xl">DOB: September 30, 1997</p>
                            <p className="text-xl">Last Year: 2024</p>
                            <p className="text-xl">Total Races: 209</p>
                            <p className="text-xl">Wins: 63</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            className="rounded-2xl max-w-full h-auto"
                            src="https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2024Drivers/Verstappen"
                            alt="Driver Image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverModal;
