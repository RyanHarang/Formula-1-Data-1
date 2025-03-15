import { useEffect, useState } from "react";
import DriverCard from "../Drivers/DriverCard.jsx";
import TeamCard from "../Teams/TeamCard.jsx";

const Home = ({ onDriverClick, onTeamClick, onRaceClick }) => {
  const [favorites, setFavorites] = useState({
    drivers: [],
    teams: [],
    races: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/favorites/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setFavorites({
        drivers: data.favoriteDrivers || [],
        teams: data.favoriteTeams || [],
        races: data.favoriteRaces || [],
      });

      // const teamsById = teamsData.reduce((acc, team) => {
      //   acc[team.id] = team;
      //   return acc;
      // }, {});

      // const driversWithTeamNames = driversData.map((driver) => ({
      //   ...driver,
      //   teamName: teamsById[driver.team]?.name || "Unknown",
      // }));

      // setDrivers(driversWithTeamNames);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (type, favoriteId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/favorites/remove/${type}/${favoriteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item: favoriteId }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        fetchFavorites();
        // failing to simply update state so currently refetching every time
        // setFavorites((prevFavorites) => ({
        //   ...prevFavorites,
        //   [type]: data.favorites,
        // }));
      } else {
        console.error("Error removing item from favorites:", data.message);
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold before:transition-all">
        Favorite Drivers
      </h1>
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.drivers
            .filter((driver) => driver)
            .map((driver, index) => (
              <DriverCard
                key={index}
                driver={driver}
                onDriverClick={onDriverClick}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))}
        </div>
      )}
      <h1 className="mb-4 text-2xl font-bold before:transition-all">
        Favorite Teams
      </h1>
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.teams.map((team, index) => (
            <TeamCard key={index} team={team} onTeamClick={onTeamClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
