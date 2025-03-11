import React, { useState } from "react";
import Drivers from "../Drivers/Drivers.jsx";
import PageContainer from "./PageContainer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import DriversModal from "../Drivers/DriverModal.jsx";

const DriversPage = () => {
  const [activeTab, setActiveTab] = useState("activeDrivers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDrivers, setSelectedDrivers] = useState([]);

  const handleDriverCardClick = (driver) => {
    setSelectedDrivers([...selectedDrivers, driver]);
  };

  // const handleCloseModal = (driverToRemove) => {
  //   setSelectedDrivers(selectedDrivers.filter(driver => driver !== driverToRemove));
  // }

  const handleCloseModal = () => {
    setSelectedDrivers([]);
  };

  console.log(selectedDrivers);

  return (
    <div>
      {selectedDrivers.length > 0 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <DriversModal handleCloseModal={handleCloseModal} />
        </div>
      )}
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
