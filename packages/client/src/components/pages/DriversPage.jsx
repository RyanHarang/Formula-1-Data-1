import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import Drivers from "../Drivers/Drivers.jsx";
import PageContainer from "./PageContainer.jsx";
import SearchBar from "../SearchBar/DriversSearchBar.jsx";
import DriversModal from "../Drivers/DriverModal.jsx";

const DriversPage = () => {
  const [activeTab, setActiveTab] = useState("activeDrivers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDrivers, setSelectedDrivers] = useState([]);

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
    <div className="relative h-full w-full">
      {selectedDrivers.map((driver, index) => (
        <Rnd
          key={driver.id || index}
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
          </div>
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
