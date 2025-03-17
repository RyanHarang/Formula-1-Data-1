import { useEffect, useState } from "react";
import DriverCard from "../Drivers/DriverCard.jsx";
import TeamCard from "../Teams/TeamCard.jsx";
import RaceCard from "../Races/RaceCard.jsx";

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
      <hr className="my-4" />
      <h1 className="mb-4 text-2xl font-bold before:transition-all">
        Favorite Teams
      </h1>
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.teams.map((team, index) => (
            <TeamCard
              key={index}
              team={team}
              favorite={true}
              onTeamClick={onTeamClick}
              onRemoveFavorite={handleRemoveFavorite}
              showRemoveButton={true} // Pass the prop to show the remove button
            />
          ))}
        </div>
      )}
      <hr className="my-4" />
      <h1 className="mb-4 text-2xl font-bold before:transition-all">
        Favorite Races
      </h1>
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.races.map((race, index) => (
            <RaceCard
              key={index}
              race={race}
              onRaceClick={onRaceClick}
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
