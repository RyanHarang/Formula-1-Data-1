import { useEffect, useState } from "react";
import DriverCard from "./DriverCard.jsx";

const AllDrivers = ({ searchQuery, onDriverClick, sortBy }) => {
  const [drivers, setDrivers] = useState([]);
  const [favoriteDrivers, setFavoriteDrivers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 48;

  useEffect(() => {
    const fetchAllDrivers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const [driversResponse, teamsResponse] = await Promise.all([
          fetch("http://3.133.155.165:3000/api/data/drivers"),
          fetch("http://3.133.155.165:3000/api/data/teams/"),
        ]);

        const driversData = await driversResponse.json();
        const teamsData = await teamsResponse.json();

        if (token) {
          const favoritesResponse = await fetch(
            "http://3.133.155.165:3000/api/favorites/all",
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

        let driversWithTeamNames = driversData.map((driver) => ({
          ...driver,
          teamName: teamsById[driver.team]?.name || "Unknown",
          wins: Number(driver.wins) || 0,
          totalRaces: Number(driver.totalRaces) || 0,
          dob: parseDOB(driver.DOB),
          lastYear: driver.lastYear ? Number(driver.lastYear) : "N/A",
        }));

        if (sortBy === "wins") {
          driversWithTeamNames.sort((a, b) => b.wins - a.wins);
        } else if (sortBy === "name") {
          driversWithTeamNames.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "totalRaces") {
          driversWithTeamNames.sort((a, b) => b.totalRaces - a.totalRaces);
        } else if (sortBy === "dob") {
          driversWithTeamNames.sort((a, b) => a.dob - b.dob);
        } else if (sortBy === "totalRaces") {
          driversWithTeamNames.sort((a, b) => b.totalRaces - a.totalRaces);
        } else if (sortBy === "lastYear") {
          driversWithTeamNames.sort((a, b) => b.lastYear - a.lastYear);
        }

        setDrivers(driversWithTeamNames);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDrivers();
  }, [sortBy]);

  const parseDOB = (dobString) => {
    if (!dobString) return new Date(0);
    const datePart = dobString.split(" (")[0];
    return new Date(datePart);
  };

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (driver.nationality &&
        driver.nationality.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (driver.teamName &&
        driver.teamName.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const startIndex = page * limit;
  const endIndex = startIndex + limit;
  const perPageDrivers = filteredDrivers.slice(startIndex, endIndex);
  const hasNextPage = endIndex < filteredDrivers.length;

  const handleAddFavorite = async (type, favoriteId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://3.133.155.165:3000/api/favorites/add/${type}`,
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
      <h1 className="mb-4 text-2xl font-bold">All F1 Drivers</h1>
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {perPageDrivers.map((driver, index) => (
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
          disabled={!hasNextPage || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllDrivers;
