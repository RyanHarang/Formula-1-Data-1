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

        const driversResponse = await fetch(
          "http://localhost:5000/api/data/drivers",
        );
        if (!driversResponse.ok)
          throw new Error(`Failed to fetch drivers: ${driversResponse.status}`);
        const drivers = await driversResponse.json();
        const driverData = drivers.find((driver) => driver.id === driverId);

        if (!driverData) {
          console.error(`Driver with id ${driverId} not found.`);
          return;
        }

        setDriver(driverData);

        const teamsResponse = await fetch(
          "http://localhost:5000/api/data/teams",
        );
        if (!teamsResponse.ok)
          throw new Error(`Failed to fetch teams: ${teamsResponse.status}`);
        const teams = await teamsResponse.json();

        const team = teams.find((t) => t.id === driverData.team);
        setTeamName(team ? team.name : "Unknown Team");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [driverId]);

  return (
    <>
      {driver && !loading ? (
        <div className="fixed z-100 flex items-center justify-center">
          <div className="dark:bg-dark-bg2 bg-light-bg light-bg dark:border-accent relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl border-2 border-black">
            <div className="drag-handle dark:bg-dark-bg dark:border-accent relative flex cursor-grab items-center justify-start rounded-t-xl border-b-2 border-black bg-white text-black active:cursor-grabbing dark:text-white">
              <div className="border-accent rounded-tl-2xl py-0.75 pl-2.5">
                {driver.natCode ? (
                  <span
                    className={`fi size-10 px-8 fi-${driver.natCode}`}
                  ></span>
                ) : (
                  <span className="text-sm text-gray-400">N/A</span>
                )}
              </div>
              <h2 className="pl-4 text-2xl select-none">
                {driver.name || "Unknown Driver"}
              </h2>
              <div
                onClick={handleCloseModal}
                className="ml-auto pr-4 text-2xl hover:cursor-pointer"
              >
                <button className="dark:text-accent hover:text-accent cursor-pointer pr-1.5 transition-all duration-300 dark:hover:text-white">
                  &#10006;
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-3 p-3">
              <div className="flex w-full flex-col gap-3 md:w-1/2">
                <div className="dark:bg-dark-bg flex flex-col items-center rounded-lg bg-white p-3 text-center shadow-md">
                  <h3 className="text-l dark:border-accent text-dark-bg mx-auto w-[80%] border-b-1 border-black text-left dark:text-white">
                    Last Team
                  </h3>
                  <p className="mx-auto mt-4 w-[80%] pb-2 text-2xl font-bold">
                    {teamName || "Unknown Team"}
                  </p>
                </div>
                <div className="dark:bg-dark-bg h-full rounded-lg bg-white p-3 shadow-md">
                  <h3 className="text-l text-dark-bg dark:border-accent mx-auto mb-4 w-[80%] border-b border-b-1 border-black text-left dark:text-white">
                    Driver Bio
                  </h3>
                  <div className="text-dark-bg mx-auto flex w-[80%] flex-col gap-3 border-black text-left">
                    <div>
                      <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                        DOB
                      </h2>
                      <p className="text-dark-bg dark:text-light-bg2 text-xl">
                        {driver.DOB
                          ? driver.DOB.split("(")[0]
                          : "DOB not available"}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                        Last Year
                      </h2>
                      <p className="text-dark-bg dark:text-light-bg2 text-xl">
                        {driver.lastYear || "N/A"}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                        Total Races
                      </h2>
                      <p className="text-dark-bg dark:text-light-bg2 text-xl">
                        {driver.totalRaces ?? "N/A"}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                        Wins
                      </h2>
                      <p className="text-dark-bg dark:text-light-bg2 text-xl">
                        {driver.wins ?? "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center md:w-1/2">
                <div className="h-full w-full overflow-hidden rounded-t-md">
                  <img
                    src={driver.image || noDriverIcon}
                    alt={`${driver.name || "Driver"}-headshot`}
                    className="h-full w-full object-cover"
                    loading="lazy"
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
      ) : (
        <div className="fixed z-100 flex items-center justify-center">
          <div className="dark:bg-dark-bg2 bg-light-bg light-bg dark:border-accent relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl border-2 border-black">
            <div className="drag-handle dark:bg-dark-bg dark:border-accent relative flex cursor-grab items-center justify-start rounded-t-xl border-b-2 border-black bg-white text-black active:cursor-grabbing dark:text-white">
              <div className="border-accent rounded-tl-2xl py-0.75 pl-2.5">
                <span className="fi fi-xx size-10 px-8"></span>
              </div>
              <h2 className="pl-4 text-2xl select-none">...</h2>
              <div
                onClick={handleCloseModal}
                className="ml-auto pr-4 text-2xl hover:cursor-pointer"
              >
                <button className="dark:text-accent hover:text-accent cursor-pointer pr-1.5 transition-all duration-300 dark:hover:text-white">
                  &#10006;
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-3 p-3">
              <div className="flex w-full flex-col gap-3 md:w-1/2">
                <div className="dark:bg-dark-bg flex flex-col items-center rounded-lg bg-white p-3 text-center shadow-md">
                  <h3 className="text-l dark:border-accent text-dark-bg mx-auto w-[80%] border-b-1 border-black text-left dark:text-white">
                    Last Team
                  </h3>
                  <p className="mx-auto mt-4 w-[80%] pb-2 text-2xl font-bold">
                    ...
                  </p>
                </div>
                <div className="dark:bg-dark-bg h-full rounded-lg bg-white p-3 shadow-md">
                  <h3 className="text-l text-dark-bg dark:border-accent mx-auto mb-4 w-[80%] border-b border-b-1 border-black text-left dark:text-white">
                    Driver Bio
                  </h3>
                  <div className="text-dark-bg mx-auto flex w-[80%] flex-col gap-3 border-black text-left">
                    <div>
                      <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                        DOB
                      </h2>
                      <p className="text-dark-bg dark:text-light-bg2 text-xl">
                        ...
                      </p>
                    </div>
                    <div>
                      <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                        Last Year
                      </h2>
                      <p className="text-dark-bg dark:text-light-bg2 text-xl">
                        ...
                      </p>
                    </div>
                    <div>
                      <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                        Total Races
                      </h2>
                      <p className="text-dark-bg dark:text-light-bg2 text-xl">
                        ...
                      </p>
                    </div>
                    <div>
                      <h2 className="text-l text-dark-bg3 dark:text-light-bg">
                        Wins
                      </h2>
                      <p className="text-dark-bg dark:text-light-bg2 text-xl">
                        ...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center md:w-1/2">
                <div className="h-full w-full overflow-hidden rounded-t-md">
                  <img
                    src={noDriverIcon}
                    alt="Placeholder driver image"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DriverModal;
