import React, { useState } from "react";
import PageContainer from "./PageContainer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ActiveTeams from "../Teams/ActiveTeams.jsx";

function Teams() {
  const [activeTab, setActiveTab] = useState("active");
  return (
    <PageContainer>
      <SearchBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <ActiveTeams activeTab={activeTab} setActiveTab={setActiveTab} />
    </PageContainer>
  );
}

export default Teams;
