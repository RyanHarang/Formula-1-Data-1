import { useEffect, useState } from "react";

const AllDrivers = () => {
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
          }`,
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
      <h1 className="mb-4 text-center text-2xl font-bold text-black">
        All F1 Drivers
      </h1>
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {drivers.map((driver) => (
            <div
              key={driver.driverId}
              className="rounded-lg border bg-white p-4 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-600">
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
