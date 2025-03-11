import React, { useState } from "react";
import Drivers from "../Drivers/Drivers.jsx";
import PageContainer from "./PageContainer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import DriversModal from "../Drivers/DriverModal.jsx";
import { Rnd } from "react-rnd";

const DriversPage = () => {
  const [activeTab, setActiveTab] = useState("activeDrivers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDrivers, setSelectedDrivers] = useState([]);

  const handleDriverCardClick = (driver) => {
    if (!selectedDrivers.some(selected => selected.id === driver.id)) {
      setSelectedDrivers([...selectedDrivers, driver]);
    }
  };

  const handleCloseModal = (driverToRemove) => {
    setSelectedDrivers(selectedDrivers.filter(driver => driver !== driverToRemove));
  };

  console.log(selectedDrivers);

  return (
    <div className="relative w-full h-full">
      {selectedDrivers.map((driver, index) => (
  <Rnd
    key={driver.id || index}
    default={{
      x: window.innerWidth / 2 - 450,
      y: window.scrollY + window.innerHeight / 2 - 250,
      width: 900,
      height: 600
    }}
    bounds="parent"
    dragHandleClassName="drag-handle"
    enableUserSelectHack={false}
    style={{ position: "absolute", zIndex: 100 }}
    enableResizing={{
      top: true,
      right: true,
      bottom: true,
      left: true,
      topRight: true,
      bottomRight: true,
      bottomLeft: true,
      topLeft: true
    }}
    minWidth={400}
  >
    <DriversModal
      driverId={driver.id}
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
