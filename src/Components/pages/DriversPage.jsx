import Drivers from "../Drivers/Drivers.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import React, { useState } from "react";

function DriversPage() {
  const [activeTab, setActiveTab] = useState("activeDrivers");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navigation />
      <SearchBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Drivers
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
      />
    </>
  );
}

export default DriversPage;
