import { useEffect, useState } from "react";

const ActiveTeams = () => {
  const [teams, setTeams] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 24;

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.openf1.org/v1/drivers");
        const data = await response.json();

        // Extract unique team names from drivers
        const uniqueTeams = Array.from(
          new Set(data.map((driver) => driver.team_name)),
        ).map((teamName) => {
          return {
            name: teamName,
          };
        });

        setTeams(uniqueTeams);
      } catch (error) {
        console.error("Error fetching teams via drivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  // Pagination logic
  const startIndex = page * limit;
  const paginatedTeams = teams.slice(startIndex, startIndex + limit);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-2xl font-bold text-black">
        Active F1 Teams
      </h1>
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {paginatedTeams.map((team, index) => (
            <div
              key={index}
              className="bg-light-fg2 dark:bg-dark-fg2 rounded-lg border p-4 shadow-lg"
            >
              <h2 className="text-xl font-semibold">{team.name}</h2>
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
          disabled={startIndex + limit >= teams.length || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ActiveTeams;
