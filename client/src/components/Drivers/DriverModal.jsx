import React, { useEffect, useState } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import noDriverIcon from "../../assets/svg/NoDriverImage.svg";

const DriverModal = ({ handleCloseModal, driverId }) => {
    const [driver, setDriver] = useState(null);
    const [teamName, setTeamName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const driversResponse = await fetch("http://localhost:5000/api/data/drivers");
                if (!driversResponse.ok) throw new Error(`Failed to fetch drivers: ${driversResponse.status}`);
                const drivers = await driversResponse.json();
                const driverData = drivers.find(driver => driver.id === driverId);

                if (!driverData) {
                    console.error(`Driver with id ${driverId} not found.`);
                    return;
                }

                setDriver(driverData);

                const teamsResponse = await fetch("http://localhost:5000/api/data/teams");
                if (!teamsResponse.ok) throw new Error(`Failed to fetch teams: ${teamsResponse.status}`);
                const teams = await teamsResponse.json();

                const team = teams.find(t => t.id === driverData.team);
                setTeamName(team ? team.name : "Unknown Team");
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [driverId]);

    if (loading) return <div></div>;
    if (!driver) return <div></div>;

    return (
        <div className="z-100 flex justify-center items-center fixed">
            <div className="relative max-w-5xl w-full max-h-[90vh] dark:bg-dark-bg2 bg-light-bg light-bg rounded-xl overflow-hidden border-2 border-black dark:border-accent">
                <div className="drag-handle cursor-grab active:cursor-grabbing relative flex items-center justify-start dark:bg-dark-bg bg-white dark:text-white text-black border-b-2 border-black dark:border-accent rounded-t-xl">
                    <div className="rounded-tl-2xl border-accent pl-2.5 py-0.75">
                        {driver.natCode ? (
                            <span className={`fi size-10 px-8 fi-${driver.natCode}`}></span>
                        ) : (
                            <span className="text-sm text-gray-400">N/A</span>
                        )}
                    </div>
                    <h2 className="text-2xl pl-4 select-none">
                        {driver.name || "Unknown Driver"}
                    </h2>
                    <div
                        onClick={handleCloseModal}
                        className="text-2xl pr-4 ml-auto hover:cursor-pointer"
                    >
                        <p className="pr-1.5 dark:text-accent dark:hover:text-white hover:text-accent transition-all duration-300">
                            X
                        </p>
                    </div>
                </div>
                <div className="flex flex-row p-3 gap-3">
                    <div className="flex flex-col gap-3 w-full md:w-1/2">
                        <div className="dark:bg-dark-bg bg-white flex flex-col items-center text-center p-3 rounded-lg shadow-md">
                            <h3 className="text-l dark:text-white border-b-1 dark:border-accent border-black text-left text-dark-bg w-[80%] mx-auto">
                                Last Team
                            </h3>
                            <p className="text-2xl font-bold mt-4 w-[80%] pb-2 mx-auto">
                                {teamName || "Unknown Team"}
                            </p>
                        </div>
                        <div className="dark:bg-dark-bg bg-white p-3 rounded-lg shadow-md h-full">
                            <h3 className="text-l text-left text-dark-bg border-b w-[80%] mx-auto mb-4 dark:text-white border-b-1 border-black dark:border-accent">
                                Driver Bio
                            </h3>
                            <div className="text-left text-dark-bg w-[80%] border-black mx-auto flex flex-col gap-3">
                                <div>
                                    <h2 className="text-l text-dark-bg3 dark:text-light-bg">DOB</h2>
                                    <p className="text-xl text-dark-bg dark:text-light-bg2">
                                        {driver.DOB ? driver.DOB.split("(")[0] : "DOB not available"}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                                        Last Year
                                    </h2>
                                    <p className="text-xl text-dark-bg dark:text-light-bg2">
                                        {driver.lastYear || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                                        Total Races
                                    </h2>
                                    <p className="text-xl text-dark-bg dark:text-light-bg2">
                                        {driver.totalRaces ?? "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-l text-dark-bg3 dark:text-light-bg">Wins</h2>
                                    <p className="text-xl text-dark-bg dark:text-light-bg2">
                                        {driver.wins ?? "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="w-full h-full overflow-hidden rounded-t-md">
                            <img
                                src={driver.image || noDriverIcon}
                                alt={`${driver.name || "Driver"}-headshot`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = noDriverIcon;
                                    e.target.onerror = null;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverModal;
