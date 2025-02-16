import React, { useState } from "react";
import Navigation from "../Navigation/Navigation.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ActiveTeams from "../Teams/ActiveTeams.jsx";

function Teams() {
  const [activeTab, setActiveTab] = useState("active");
  return (
    <>
      <Navigation />
      <SearchBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <ActiveTeams activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}

export default Teams;
