import React, { useState } from "react";
import PageContainer from "./PageContainer.jsx";
import SearchBar2 from "../SearchBar/SearchBar2.jsx";
import ActiveRaces from "../Races/ActiveRaces.jsx";
import AllRaces from "../Races/AllRaces.jsx";

const Race = () => {

  const [activeTab, setActiveTab] = useState("activeRaces");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <PageContainer>
      <SearchBar2
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div>
        {activeTab === "activeRaces" ? (
          <ActiveRaces searchQuery={searchQuery} />
        ) : ( <AllRaces searchQuery={searchQuery} /> )}
      </div>
    </PageContainer>
  );
};

export default Race;
