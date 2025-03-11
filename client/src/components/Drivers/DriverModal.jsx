import React from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const DriverModal = ({ handleCloseModal }) => {
    return (
        <div className="z-100 flex justify-center items-center fixed">
            <div className="relative max-w-5xl w-full max-h-[90vh] dark:bg-dark-bg2 bg-light-bg light-bg rounded-xl overflow-hidden border-2 border-black dark:border-white">
                <div className="relative flex items-center justify-start dark:bg-dark-bg bg-white dark:text-white text-black border-b-2 border-black dark:border-white rounded-t-xl">
                    <div className="rounded-tl-2xl border-dark-bg pl-2.5 py-0.75">
                        <span className="fi size-8 rounded-tl-2xl p-6 fi-gr"></span>
                    </div>
                    <h2 className="text-2xl pl-4">Max Verstappen</h2>
                    <div onClick={handleCloseModal} className="text-2xl pr-4 ml-auto hover:cursor-pointer">
                        <p className="pr-1.5">X</p>
                    </div>
                </div>
                <div className="flex flex-row p-3 gap-3">
                    <div className="flex flex-col gap-3 w-full md:w-1/2">
                        <div className="dark:bg-dark-bg bg-white flex flex-col items-center text-center p-3 rounded-lg shadow-md">
                            <h3 className="text-l dark:text-white border-b-1 dark:border-light-bg border-dark-bg text-left text-dark-bg w-[80%] mx-auto">Current Team</h3>
                            <img
                                className="w-1/2 mx-auto mt-2"
                                src="https://placehold.co/235x72"
                                alt="Team"
                            />
                        </div>

                        <div className="dark:bg-dark-bg bg-white p-3 rounded-lg shadow-md h-full">
                            <div>
                                <h3 className="text-l text-left text-dark-bg border-b w-[80%] border-dark-bg mx-auto mb-4 dark:text-white border-b-1 dark:border-light-bg border-dark-bg">Driver Bio</h3>
                            </div>
                            <div className="text-left text-dark-bg w-[80%] border-dark-bg mx-auto flex flex-col gap-3">
                                <div>
                                    <h2 className="text-l text-dark-bg3 dark:text-light-bg">DOB</h2>
                                    <p className="text-xl text-dark-bg dark:text-light-bg2">September 30, 1997</p>
                                </div>
                                <div>
                                    <h2 className="text-l text-dark-bg3 dark:text-light-bg">Last Year</h2>
                                    <p className="text-xl text-dark-bg dark:text-light-bg2">2024</p>
                                </div>
                                <div>
                                    <h2 className="text-l text-dark-bg3 dark:text-light-bg">Total Races</h2>
                                    <p className="text-xl text-dark-bg dark:text-light-bg2">209</p>
                                </div>
                                <div>
                                    <h2 className="text-l text-dark-bg3 dark:text-light-bg">Wins</h2>
                                    <p className="text-xl text-dark-bg dark:text-light-bg2">63</p>
                                </div>
                            </div>
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
