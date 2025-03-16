import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";

const ActiveRaces = ({ searchQuery }) => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActiveRaces = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/data/races-active",
        );
        let data = await response.json();
        if (Array.isArray(data) && data.length === 0) {
          const fallbackResponse = await fetch("RaceData.json");
          data = [
            {
              title: "2024 Bahrain Grand Prix",
              date: "Mar 2, 2024 at 16:00 CET",
              track: "Bahrain International Circuit",
              winner: "Verstappen",
              fastestLap: "1:32.608",
              polePosition: "Verstappen",
            },
            {
              title: "2024 Saudi Arabian Grand Prix",
              date: "Mar 9, 2024 at 18:00 CET",
              track: "Jeddah Corniche Circuit",
              winner: "Verstappen",
              fastestLap: "1:31.632",
              polePosition: "Verstappen",
            },
            {
              title: "2024 Australian Grand Prix",
              date: "Mar 24, 2024 at 05:00 CET",
              track: "Melbourne Grand Prix Circuit",
              winner: "Sainz Jr.",
              fastestLap: "1:19.813",
              polePosition: "Verstappen",
            },
          ];
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
