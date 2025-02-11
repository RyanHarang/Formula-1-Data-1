import Navigation from "../Components/Navigation/Navigation.jsx";
import React, { useState } from "react";
import SearchBar from "../Components/SearchBar/SearchBar.jsx";
import ActiveTeams from "../Components/Teams/ActiveTeams.jsx";

function Teams() {
  const [activeTab, setActiveTab] = useState("active");
  return (
    <>
      <Navigation/>
      <SearchBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <ActiveTeams activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}

export default Teams;
