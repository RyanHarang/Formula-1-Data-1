import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import PageContainer from "./PageContainer.jsx";
import SearchBar2 from "../SearchBar/SearchBar2.jsx";
import ActiveRaces from "../Races/ActiveRaces.jsx";
import AllRaces from "../Races/AllRaces.jsx";
import RaceModal from "../Races/RaceModal.jsx";

const Race = () => {
  const [activeTab, setActiveTab] = useState("activeRaces");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRaces, setSelectedRaces] = useState([]);

  const handleRaceCardClick = (race) => {
    if (!selectedRaces.some((selected) => selected.id === race.id)) {
      // console.log("selectedRaces", selectedRaces);
      setSelectedRaces([...selectedRaces, race]);
    }
  };

  const handleCloseModal = (raceToRemove) => {
    setSelectedRaces(selectedRaces.filter((race) => race !== raceToRemove));
  };

  const closeAllModal = () => {
    setSelectedRaces([]);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        closeAllModal();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {selectedRaces.map((race, index) => (
        <Rnd
          key={race.id || index}
          default={{
            x: window.innerWidth / 2 - 350,
            y: window.scrollY + window.innerHeight / 2 - 300,
            width: 700,
            height: 600,
          }}
          bounds="parent"
          dragHandleClassName="drag-handle"
          enableUserSelectHack={false}
          style={{
            position: "absolute",
            zIndex: 100,
            overflow: "hidden",
          }}
          minWidth={400}
          minHeight={400}
        >
          <div className="h-full w-full">
            <RaceModal
              handleCloseModal={() => handleCloseModal(driver)}
              raceId={race.id}
            />
          </div>
        </Rnd>
      ))}
      <PageContainer>
        <SearchBar2
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="z-10"
        />
        <div className="flex h-full w-full flex-col items-center justify-center">
          {activeTab === "activeRaces" ? (
            <ActiveRaces
              searchQuery={searchQuery}
              onRaceClick={handleRaceCardClick}
            />
          ) : (
            <AllRaces
              searchQuery={searchQuery}
              onRaceClick={handleRaceCardClick}
            />
          )}
        </div>
      </PageContainer>
    </div>
  );
};

export default Race;
