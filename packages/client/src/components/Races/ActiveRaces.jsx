import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";

const ActiveRaces = ({ searchQuery, onRaceClick }) => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favoriteRaces, setFavoriteRaces] = useState([]);

  useEffect(() => {
    const fetchActiveRaces = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/data/races-active",
        );
        let data = await response.json();

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
            setFavoriteRaces(
              favoritesData.favoriteRaces.map((race) => race._id),
            );
          } else {
            console.error(
              "Could not fetch favorites. Status:",
              favoritesResponse.status,
            );
            setFavoriteRaces([]);
          }
        } else {
          setFavoriteRaces([]);
        }

        setRaces(data);
      } catch (error) {
        console.error("Error fetching races:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveRaces();
  }, []);

  const filteredRaces = races.filter((race) =>
    searchQuery
      ? race.track.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (race.title &&
          race.title.toLowerCase().includes(searchQuery.toLowerCase()))
      : race,
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

  const handleRemoveFavorite = async (type, favoriteId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/favorites/remove/${type}`,
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
      if (!response.ok) {
        console.error("Error removing item from favorites:", data.message);
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold before:transition-all">
        Active F1 Races
      </h1>
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <Carousel
          className="flex h-full w-full overflow-hidden transition-transform duration-500"
          ids={filteredRaces.map((race) => race._id)}
          titles={filteredRaces.map((race) => race.title)}
          dates={filteredRaces.map((race) => race.date)}
          tracks={filteredRaces.map((race) => race.track)}
          winners={filteredRaces.map((race) => race.winner)}
          fastestLaps={filteredRaces.map((race) => race.fastestLap)}
          polePositions={filteredRaces.map((race) => race.polePosition)}
          onRaceClick={() => onRaceClick}
          favorites={favoriteRaces}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </div>
  );
};

export default ActiveRaces;
