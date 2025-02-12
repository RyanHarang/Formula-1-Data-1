import Drivers from "../Components/Drivers/Drivers.jsx";
import Navigation from "../Components/Navigation/Navigation.jsx";
import SearchBar from "../Components/SearchBar/SearchBar.jsx";
import React, { useState } from "react";

function DriversPage() {
  const [activeTab, setActiveTab] = useState("active");
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
