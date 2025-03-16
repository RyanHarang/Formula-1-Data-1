import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import Drivers from "../Drivers/Drivers.jsx";
import PageContainer from "./PageContainer.jsx";
import SearchBar from "../SearchBar/DriversSearchBar.jsx";
import DriversModal from "../Drivers/DriverModal.jsx";

const DriversPage = () => {
  const [activeTab, setActiveTab] = useState("allDrivers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [sortBy, setSortBy] = useState("wins");

  const handleDriverCardClick = (driver) => {
    if (!selectedDrivers.some((selected) => selected.id === driver.id)) {
      setSelectedDrivers([...selectedDrivers, driver]);
    }
    console.log(driver);
  };

  const handleCloseModal = (driverToRemove) => {
    setSelectedDrivers(
      selectedDrivers.filter((driver) => driver !== driverToRemove),
    );
    console.log(driverToRemove);
  };

  const closeAllModal = () => {
    setSelectedDrivers([]);
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
    <div className="relative h-full w-full overflow-hidden">
      {selectedDrivers.map((driver, index) => (
        <Rnd
        key={driver.id || index}
        default={{
          x: Math.max(0, (window.innerWidth - 700) / 2),
          y: Math.max(0, window.scrollY + (window.innerHeight - 600) / 2),
          width: Math.min(700, window.innerWidth - 20),
          height: Math.min(600, window.innerHeight - 20),
        }}
        bounds="window"
        dragHandleClassName="drag-handle"
        enableUserSelectHack={false}
        style={{
          position: "absolute",
          zIndex: 100,
        }}
        minWidth={350}
        minHeight={400}
        maxWidth="95vw"
      >
        <DriversModal
          natCode={driver.natCode}
          name={driver.name}
          teamName={driver.teamName}
          DOB={driver.DOB}
          lastYear={driver.lastYear}
          totalRaces={driver.totalRaces}
          wins={driver.wins}
          image={driver.image}
          handleCloseModal={() => handleCloseModal(driver)}
        />
      </Rnd>
      ))}

      <PageContainer>
        <SearchBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="z-10"
        />
        <Drivers
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          onDriverClick={handleDriverCardClick}
        />
      </PageContainer>
    </div>
  );
};

export default DriversPage;
