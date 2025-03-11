import { useEffect, useState } from "react";
import noDriverIcon from "../../assets/svg/NoDriverImage.svg";

const ActiveDrivers = ({ searchQuery, onDriverClick }) => {
  const [drivers, setDrivers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const limit = 24;

  useEffect(() => {
    const fetchActiveDrivers = async () => {
      setLoading(true);
      try {
        const [driversResponse, teamsResponse] = await Promise.all([
          fetch("http://localhost:5000/api/data/drivers-active"),
          fetch("http://localhost:5000/api/data/teams/"),
        ]);

        const driversData = await driversResponse.json();
        const teamsData = await teamsResponse.json();

        const teamsById = teamsData.reduce((acc, team) => {
          acc[team.id] = team;
          return acc;
        }, {});

        const driversWithTeamNames = driversData.map(driver => ({
          ...driver,
          teamName: teamsById[driver.team]?.name || "Unknown"
        }));

        setDrivers(driversWithTeamNames);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveDrivers();
  }, []);

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (driver.nationality &&
        driver.nationality
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (driver.teamName &&
        driver.teamName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  const startIndex = page * limit;
  const paginatedDrivers = filteredDrivers.slice(
    startIndex,
    startIndex + limit,
  );

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold">Active F1 Drivers</h1>
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedDrivers.map((driver, index) => (
            <div
              key={index}
              className="border-accent dark:bg-dark-bg2 cursor-pointer rounded-lg border-2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105"
              onClick={() => onDriverClick(driver)}
            >
              {driver.image ? (
                <img
                  src={driver.image}
                  alt={`${driver.name}-headshot`}
                  className="rounded-t-md"
                  onError={(error) => {
                    error.target.src = noDriverIcon;
                    error.target.onerror = null;
                  }}
                />
              ) : (
                <div className="rounded-t-md">
                  <img
                    src={noDriverIcon}
                    className="border-accent h-full rounded-t-md border-x-0 border-t-0"
                    alt="Placeholder driver image"
                  />
                </div>
              )}
              <div className="flex flex-row">
                <h2 className=" my-2 pl-2 text-left text-xl font-semibold">
                  {(() => {
                    const parts = driver.name.split(" ");
                    return parts
                      .map((part, index) =>
                        index === parts.length - 1
                          ? part.charAt(0).toUpperCase() +
                          part.slice(1).toLowerCase()
                          : part,
                      )
                      .join(" ");
                  })()}
                </h2>
                <div>
                  <span className={`fi size-10 px-8 fi-${driver.natCode}`}></span>
                </div>
              </div>

              {/* <p className="text-light-fg2 dark:text-dark-fg2">
                Nationality:{" "}
                {driver.country_code ? driver.country_code : "Unknown"}
              </p>
              <p className="text-light-fg2 dark:text-dark-fg2">
                Team: {driver.team_name ? driver.team_name : "Unknown"}
              </p> */}
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          className="border-accent bg-light-bg2 dark:bg-dark-bg3 hover mr-2 cursor-pointer rounded border px-4 py-2 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={page === 0 || loading}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-accent hover:bg-accent/80 disabled:hover:bg-accent cursor-pointer rounded px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={startIndex + limit >= drivers.length || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ActiveDrivers;
