import React, { useEffect, useState } from "react";
import "flag-icons/css/flag-icons.min.css";

const RaceModal = ({ handleCloseModal, raceId }) => {
  const [race, setRace] = useState(null);
  const [lapTimes, setLapTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/data/drivers`);
        if (!response.ok)
          throw new Error(`Failed to fetch drivers: ${response.status}`);
        const data = await response.json();
        setDrivers(data);
        if (data.length > 0) setSelectedDriver(data[0].id);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDriver) return;

      try {
        setLoading(true);

        const lapTimesResponse = await fetch(
          `http://localhost:5000/api/data/race-laps?driverId=${selectedDriver}&raceId=${raceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!lapTimesResponse.ok)
          throw new Error(
            `Failed to fetch lap times: ${lapTimesResponse.status}`,
          );
        const lapTimesData = await lapTimesResponse.json();

        const raceData = lapTimesData.find((lap) => lap.raceId === raceId);

        if (!raceData) {
          console.error(`Race with id ${raceId} not found.`);
          setRace(null);
          setLapTimes([]);
          return;
        }

        setRace(raceData);
        setLapTimes(lapTimesData.filter((lap) => lap.raceId === raceId));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [raceId, selectedDriver]);

  return (
    <>
      {race && !loading ? (
        <div className="fixed z-100 flex items-center justify-center select-none">
          <div className="dark:bg-dark-bg2 bg-light-bg light-bg dark:border-accent relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl border-2 border-black">
            <div className="drag-handle dark:bg-dark-bg dark:border-accent relative flex cursor-grab items-center justify-start rounded-t-xl border-b-2 border-black bg-white text-black active:cursor-grabbing dark:text-white">
              <h2 className="pl-4 text-2xl">Race ID: {race.id}</h2>
              <div
                onClick={handleCloseModal}
                className="ml-auto pr-4 text-2xl hover:cursor-pointer"
              >
                <button className="dark:text-accent hover:text-accent cursor-pointer pr-1.5 transition-all duration-300 dark:hover:text-white">
                  &#10006;
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-3">
              <div className="dark:bg-dark-bg flex flex-col items-center rounded-lg bg-white p-3 text-center shadow-md">
                <h3 className="text-l dark:border-accent text-dark-bg mx-auto w-[80%] border-b-1 border-black text-left dark:text-white">
                  Race Details
                </h3>
                <p className="mx-auto mt-4 w-[80%] pb-2 text-2xl font-bold">
                  Driver ID: {selectedDriver.id}
                </p>
                <p className="mx-auto mt-4 w-[80%] pb-2 text-2xl font-bold">
                  Position: {race.position}
                </p>
              </div>
              <div className="dark:bg-dark-bg h-full rounded-lg bg-white p-3 shadow-md">
                <h3 className="text-l text-dark-bg dark:border-accent mx-auto mb-4 w-[80%] border-b border-b-1 border-black text-left dark:text-white">
                  Select Driver
                </h3>
                <select
                  className="mx-auto mb-4 w-[80%] rounded border p-2"
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                >
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
                <h3 className="text-l text-dark-bg dark:border-accent mx-auto mb-4 w-[80%] border-b border-b-1 border-black text-left dark:text-white">
                  Lap Times
                </h3>
                <div className="text-dark-bg mx-auto flex w-[80%] flex-col gap-3 border-black text-left">
                  {lapTimes.length > 0 ? (
                    lapTimes.map((lap, index) => (
                      <div key={index} className="flex justify-between">
                        <span>Lap {lap.lapNumber}</span>
                        <span>{lap.time}</span>
                      </div>
                    ))
                  ) : (
                    <p>No lap times available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed z-100 flex items-center justify-center select-none">
          <div className="dark:bg-dark-bg2 bg-light-bg light-bg dark:border-accent relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-xl border-2 border-black">
            <div className="drag-handle dark:bg-dark-bg dark:border-accent relative flex cursor-grab items-center justify-start rounded-t-xl border-b-2 border-black bg-white text-black active:cursor-grabbing dark:text-white">
              <h2 className="pl-4 text-2xl">Loading...</h2>
              <div
                onClick={handleCloseModal}
                className="ml-auto pr-4 text-2xl hover:cursor-pointer"
              >
                <button className="dark:text-accent hover:text-accent cursor-pointer pr-1.5 transition-all duration-300 dark:hover:text-white">
                  &#10006;
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-3">
              <div className="dark:bg-dark-bg flex flex-col items-center rounded-lg bg-white p-3 text-center shadow-md">
                <h3 className="text-l dark:border-accent text-dark-bg mx-auto w-[80%] border-b-1 border-black text-left dark:text-white">
                  Race Details
                </h3>
                <p className="mx-auto mt-4 w-[80%] pb-2 text-2xl font-bold">
                  ...
                </p>
              </div>
              <div className="dark:bg-dark-bg h-full rounded-lg bg-white p-3 shadow-md">
                <h3 className="text-l text-dark-bg dark:border-accent mx-auto mb-4 w-[80%] border-b border-b-1 border-black text-left dark:text-white">
                  Lap Times
                </h3>
                <p>Loading lap times...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RaceModal;
