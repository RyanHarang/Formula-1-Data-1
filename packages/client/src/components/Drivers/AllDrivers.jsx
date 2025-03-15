import { useEffect, useState } from "react";
import noDriverIcon from "../../assets/svg/NoDriverImage.svg";

const AllDrivers = ({ searchQuery, onDriverClick }) => {
  const [drivers, setDrivers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 48;

  useEffect(() => {
    const fetchAllDrivers = async () => {
      setLoading(true);
      try {
        const [driversResponse, teamsResponse] = await Promise.all([
          fetch("http://localhost:5000/api/data/drivers"),
          fetch("http://localhost:5000/api/data/teams/"),
        ]);

        const driversData = await driversResponse.json();
        const teamsData = await teamsResponse.json();

        const teamsById = teamsData.reduce((acc, team) => {
          acc[team.id] = team;
          return acc;
        }, {});

        const driversWithTeamNames = driversData.map((driver) => ({
          ...driver,
          teamName: teamsById[driver.team]?.name || "Unknown",
        }));

        setDrivers(driversWithTeamNames);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDrivers();
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

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold">All F1 Drivers</h1>
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredDrivers.map((driver, index) => (
            <div
              key={index}
              className="border-black dark:border-accent hover:border-accent dark:bg-dark-bg2 cursor-pointer rounded-lg border-2 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105 flex flex-col"
              onClick={() => onDriverClick(driver)}
            >
              <div className="w-full h-full overflow-hidden rounded-t-md">
                {driver.image ? (
                  <img
                    src={driver.image}
                    alt={`${driver.name}-headshot`}
                    className="w-full h-full object-cover"
                    onError={(error) => {
                      error.target.src = noDriverIcon;
                      error.target.onerror = null;
                    }}
                  />
                ) : (
                  <img
                    src={noDriverIcon}
                    className="w-full h-full object-cover"
                    alt="Placeholder driver image"
                  />
                )}
              </div>
              {/* Fixed: Moved this inside .map() */}
              <div className="flex justify-between items-center px-2 py-2">
                <h2 className="text-left text-xl font-semibold">
                  {(() => {
                    const parts = driver.name.split(" ");
                    return parts
                      .map((part, index) =>
                        index === parts.length - 1
                          ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
                          : part
                      )
                      .join(" ");
                  })()}
                </h2>
                <div>
                  <span className={`fi size-10 px-8 fi-${driver.natCode}`}></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          className="mr-2 rounded bg-gray-500 px-4 py-2 disabled:opacity-50"
          disabled={page === 0 || loading}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
          disabled={loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllDrivers;
