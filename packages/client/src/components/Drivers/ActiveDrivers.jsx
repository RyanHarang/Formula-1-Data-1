import { useEffect, useState } from "react";
import DriverCard from "./DriverCard.jsx";

const ActiveDrivers = ({ searchQuery, onDriverClick }) => {
  const [drivers, setDrivers] = useState([]);
  const [favoriteDrivers, setFavoriteDrivers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 24;

  useEffect(() => {
    const fetchActiveDrivers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const [driversResponse, teamsResponse] = await Promise.all([
          fetch("http://localhost:5000/api/data/drivers-active"),
          fetch("http://localhost:5000/api/data/teams/"),
        ]);

        const driversData = await driversResponse.json();
        const teamsData = await teamsResponse.json();

        // const favoritesPromise = token
        //   ? fetch("http://localhost:5000/api/favorites/all", {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //       },
        //     })
        //   : null;

        if (token) {
          const favoritesResponse = await fetch(
            "http://localhost:5000/api/favorites/all",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (favoritesResponse.ok) {
            const favoritesData = await favoritesResponse.json();
            setFavoriteDrivers(
              favoritesData.favoriteDrivers.map((driver) => driver._id),
            );
          } else {
            console.error(
              "Could not fetch favorites. Status:",
              favoritesResponse.status,
            );
            setFavoriteDrivers([]);
          }
        } else {
          setFavoriteDrivers([]);
        }

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

    fetchActiveDrivers();
  }, []);

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (driver.nationality &&
        driver.nationality.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (driver.teamName &&
        driver.teamName.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const startIndex = page * limit;
  const paginatedDrivers = filteredDrivers.slice(
    startIndex,
    startIndex + limit,
  );

  const handleAddFavorite = async (type, favoriteId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/favorites/add/${type}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item: favoriteId }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Error adding item to favorites:", data.message);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold before:transition-all">
        Active F1 Drivers
      </h1>
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedDrivers.map((driver, index) => (
            <DriverCard
              key={index}
              driver={driver}
              favorite={favoriteDrivers.includes(driver._id)}
              onDriverClick={onDriverClick}
              onAddFavorite={handleAddFavorite}
            />
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
