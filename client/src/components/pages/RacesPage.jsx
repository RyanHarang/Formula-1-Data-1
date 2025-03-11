import React, { useState } from "react";
import PageContainer from "./PageContainer.jsx";
import Carousel from "../Carousel/Carousel.jsx";
import SearchBar2 from "../SearchBar/SearchBar2.jsx";

const Race = () => {
  const raceData = [
    {
      image: "https://placehold.co/1440x1024",
      date: "14 - 16 Mar",
      name: "Albert Park Grand Prix Circuit",
      location: "Melbourne",
      distance: "306.124 km",
    },
    {
      image: "https://placehold.co/1440x1024",
      date: "21 - 23 Mar",
      name: "Shanghai International Circuit",
      location: "Shanghai",
      distance: "306.124 km",
    },
    {
      image: "https://placehold.co/1440x1024",
      date: "28 - 30 Mar",
      name: "Bahrain International Circuit",
      location: "Sakhir",
      distance: "308.238 km",
    },
  ];

  const [activeTab, setActiveTab] = useState("upcomingRaces");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <PageContainer>
      <SearchBar2
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div>
      <Carousel 
          images={raceData.map(race => race.image)} 
          dates={raceData.map(race => race.date)}
          names={raceData.map(race => race.name)}
          locations={raceData.map(race => race.location)}
          distances={raceData.map(race => race.distance)}
        />
      </div>
    </PageContainer>
  );
};

export default Race;
