import React, { useState } from "react";
import PageContainer from "./PageContainer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ActiveTeams from "../Teams/ActiveTeams.jsx";
import TeamModal from "../Teams/TeamModal.jsx";

const TeamsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleTeamCardClick = (team) => {
    setSelectedTeam(team);
  };

  const handleCloseModal = () => {
    setSelectedTeam(null);
  };

  return (
    <div>
      {selectedTeam && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <TeamModal handleCloseModal={handleCloseModal} team={selectedTeam} />
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
        <ActiveTeams
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          onTeamClick={handleTeamCardClick}
        />
      </PageContainer>
    </div>
  );
};

export default TeamsPage;
