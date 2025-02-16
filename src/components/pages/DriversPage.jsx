import React, { useState } from "react";
import Drivers from "../Drivers/Drivers.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import PageContainer from "./PageContainer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";

function DriversPage() {
  const [activeTab, setActiveTab] = useState("activeDrivers");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <PageContainer>
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
    </PageContainer>
  );
}

export default DriversPage;
