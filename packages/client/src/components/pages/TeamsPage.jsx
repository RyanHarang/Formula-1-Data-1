import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import PageContainer from "./PageContainer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import ActiveTeams from "../Teams/ActiveTeams.jsx";
import TeamModal from "../Teams/TeamModal.jsx";

const TeamsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);

  const handleTeamCardClick = (teamId) => {
    if (!selectedTeams.some((selected) => selected.id === teamId)) {
      setSelectedTeams([...selectedTeams, { id: teamId }]);
    }
  };

  const handleCloseModal = (teamToRemove) => {
    setSelectedTeams(
      selectedTeams.filter((team) => team.id !== teamToRemove.id),
    );
  };

  const closeAllModal = () => {
    setSelectedTeams([]);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        closeAllModal();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {selectedTeams.map((team, index) => (
        <Rnd
          key={team.id || index}
          default={{
            x: Math.max(0, (window.innerWidth - 700) / 2),
            y: Math.max(0, window.scrollY + (window.innerHeight - 600) / 2),
            width: Math.min(1000, window.innerWidth - 20),
            height: Math.min(600, window.innerHeight - 20),
          }}
          bounds="window"
          dragHandleClassName="drag-handle"
          enableUserSelectHack={true}
          style={{
            position: "absolute",
            zIndex: 100,
          }}
          minWidth={350}
          minHeight={400}
          maxWidth="95vw"
        >
          <TeamModal
            teamId={team.id}
            handleCloseModal={() => handleCloseModal(team)}
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
// import React, { useState, useEffect } from "react";
// import { Rnd } from "react-rnd";
// import PageContainer from "./PageContainer.jsx";
// import SearchBar from "../SearchBar/SearchBar.jsx";
// import ActiveTeams from "../Teams/ActiveTeams.jsx";
// import TeamModal from "../Teams/TeamModal.jsx";

// const TeamsPage = () => {
//   const [activeTab, setActiveTab] = useState("active");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedTeams, setSelectedTeams] = useState([]);

//   const handleTeamCardClick = (team) => {
//     if (!selectedTeams.some((selected) => selected.id === team.id)) {
//       setSelectedTeams([...selectedTeams, team]);
//     }
//   };

//   const handleCloseModal = (teamToRemove) => {
//     setSelectedTeams(
//       selectedTeams.filter((team) => team !== teamToRemove),
//     );
//   };

//   const closeAllModal = () => {
//     setSelectedTeams([]);
//   };

//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === "Escape") {
//         closeAllModal();
//       }
//     };

//     document.addEventListener("keydown", handleKeyPress);
//     return () => {
//       document.removeEventListener("keydown", handleKeyPress);
//     };
//   }, []);

//   return (
//     <div className="relative h-full w-full overflow-hidden">
//       {selectedTeams.map((team, index) => (
//         <Rnd
//           key={team.id || index}
//           default={{
//             x: Math.max(0, (window.innerWidth - 700) / 2),
//             y: Math.max(0, window.scrollY + (window.innerHeight - 600) / 2),
//             width: Math.min(700, window.innerWidth - 20),
//             height: Math.min(600, window.innerHeight - 20),
//           }}
//           bounds="window"
//           dragHandleClassName="drag-handle"
//           enableUserSelectHack={true}
//           style={{
//             position: "absolute",
//             zIndex: 100,
//           }}
//           minWidth={350}
//           minHeight={400}
//           maxWidth="95vw"
//         >
//           <TeamModal
//             teamId={team.id}
//             handleCloseModal={() => handleCloseModal(team)}
//           />
//         </Rnd>
//       ))}

//       <PageContainer>
//         <SearchBar
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           className="z-10"
//         />
//         <ActiveTeams
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           searchQuery={searchQuery}
//           onTeamClick={handleTeamCardClick}
//         />
//       </PageContainer>
//     </div>
//   );
// };

// export default TeamsPage;