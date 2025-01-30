import { useEffect, useState } from "react";

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 48;

  useEffect(() => {
    fetch(
      `https://api.jolpi.ca/ergast/f1/drivers/?limit=${limit}&offset=${
        page * limit
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data.MRData &&
          data.MRData.DriverTable &&
          data.MRData.DriverTable.Drivers
        ) {
          setDrivers(data.MRData.DriverTable.Drivers);
          console.log("Fetched drivers:", data.MRData.DriverTable.Drivers);
        }
      })
      .catch((error) => console.error("Error fetching drivers:", error));
  }, [page]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">F1 Drivers</h1>
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
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          className="px-4 py-2 bg-gray-300 rounded mr-2 disabled:opacity-50"
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Drivers;
