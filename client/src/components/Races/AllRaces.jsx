import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";

const ActiveRaces = ({ searchQuery }) => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActiveRaces = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/data/races");
        const data = await response.json();
        console.log(data);
        setRaces(data);
      } catch (error) {
        console.error("Error fetching races:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveRaces();
  }, []);

  const filteredRaces = races.filter(
    (race) =>
      race.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (race.location && race.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold before:transition-all">
        Active F1 Races
      </h1>
      {loading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <Carousel
          titles={filteredRaces.map((race) => race.title)}
          dates={filteredRaces.map((race) => race.date)}
          tracks={filteredRaces.map((race) => race.track)}
          winners={filteredRaces.map((race) => race.winner)}
          fastestLaps={filteredRaces.map((race) => race.fastestLap)}
          polePositions={filteredRaces.map((race) => race.polePosition)}
        />
      )}
    </div>
  );
};

export default ActiveRaces;