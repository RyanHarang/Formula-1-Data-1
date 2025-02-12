import { useEffect, useState } from "react";
import userLight from "../../assets/svg/profile/user-dark.svg";

function ActiveDrivers({ searchQuery }) {
  const [drivers, setDrivers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 24;

  useEffect(() => {
    const fetchActiveDrivers = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.openf1.org/v1/drivers");
        const data = await response.json();

        // Filter drivers to keep most recent entry per driver
        const uniqueDrivers = Object.values(
          data.reduce((acc, driver) => {
            if (
              !acc[driver.full_name] ||
              acc[driver.full_name].meeting_key < driver.meeting_key
            ) {
              acc[driver.full_name] = driver;
            }
            return acc;
          }, {})
        );

        setDrivers(uniqueDrivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveDrivers();
  }, []);

  // Filter drivers using search query
  const filteredDrivers = drivers.filter((driver) =>
    driver.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const startIndex = page * limit;
  const paginatedDrivers = filteredDrivers.slice(
    startIndex,
    startIndex + limit
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-black">
        Active F1 Drivers
      </h1>
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedDrivers.map((driver, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 border"
            >
              <img
                src={driver.headshot_url ? driver.headshot_url : userLight}
                alt={`${driver.full_name}-headshot`}
                className="w-24 h-24 mx-auto rounded-full border border-gray-300 mb-2"
              />
              <h2 className="text-gray-600 text-xl font-semibold">
                {(() => {
                  const parts = driver.full_name.split(" ");
                  return parts
                    .map((part, index) =>
                      index === parts.length - 1
                        ? part.charAt(0).toUpperCase() +
                          part.slice(1).toLowerCase()
                        : part
                    )
                    .join(" ");
                })()}
              </h2>
              <p className="text-gray-600">
                Nationality:{" "}
                {driver.country_code ? driver.country_code : "Unknown"}
              </p>
              <p className="text-gray-600">
                Team: {driver.team_name ? driver.team_name : "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          className="px-4 py-2 bg-gray-500 rounded mr-2 disabled:opacity-50"
          disabled={page === 0 || loading}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={startIndex + limit >= drivers.length || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ActiveDrivers;
