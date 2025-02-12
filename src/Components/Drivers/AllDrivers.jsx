import { useEffect, useState } from "react";

function AllDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 48;

  useEffect(() => {
    const fetchAllDrivers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.jolpi.ca/ergast/f1/drivers/?limit=${limit}&offset=${
            page * limit
          }`
        );
        const data = await response.json();
        if (data.MRData?.DriverTable?.Drivers) {
          setDrivers(data.MRData.DriverTable.Drivers);
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDrivers();
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-black text-center mb-4">
        All F1 Drivers
      </h1>
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {drivers.map((driver) => (
            <div
              key={driver.driverId}
              className="bg-white shadow-lg rounded-lg p-4 border"
            >
              <h2 className="text-gray-600 text-xl font-semibold">
                {driver.givenName} {driver.familyName}
              </h2>
              <p className="text-gray-600">Nationality: {driver.nationality}</p>
              <p className="text-gray-600">DOB: {driver.dateOfBirth}</p>
              <a
                href={driver.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                More Info
              </a>
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
          disabled={loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllDrivers;
