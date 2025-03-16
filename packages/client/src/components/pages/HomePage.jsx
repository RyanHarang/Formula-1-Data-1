import React, { useState } from "react";
import { Rnd } from "react-rnd";
import PageContainer from "./PageContainer.jsx";
import Home from "../Home/Home.jsx";
import DriversModal from "../Drivers/DriverModal.jsx";
import TeamModal from "../Teams/TeamModal.jsx";
import RaceModal from "../Races/RaceModal.jsx";

const HomePage = () => {
  const [selectedDrivers, setSelectedDrivers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [selectedRace, setSelectedRace] = useState([]);

  const handleDriverCardClick = (driver) => {
    if (!selectedDrivers.some((selected) => selected.id === driver.id)) {
      setSelectedDrivers([...selectedDrivers, driver]);
    }
  };

  const handleTeamCardClick = (team) => {
    if (!selectedTeam.some((selected) => selected.id === team.id)) {
      setSelectedTeam([...selectedTeam, team]);
    }
  };

  const handleRaceCardClick = (race) => {
    if (!selectedRace.some((selected) => selected.id === race.id)) {
      setSelectedRace([...selectedRace, race]);
    }
  };

  const handleCloseDriverModal = (driverToRemove) => {
    setSelectedDrivers(
      selectedDrivers.filter((driver) => driver !== driverToRemove),
    );
  };

  const handleCloseTeamModal = (teamToRemove) => {
    setSelectedTeam(selectedTeam.filter((team) => team !== teamToRemove));
  };

  const handleCloseRaceModal = (raceToRemove) => {
    setSelectedRace(selectedRace.filter((race) => race !== raceToRemove));
  };

  return (
    <div className="relative h-full w-full">
      {selectedDrivers.map((driver, index) => (
        <Rnd
          key={driver.id || index}
          default={{
            x: window.innerWidth / 2 - 450,
            y: window.scrollY + window.innerHeight / 2 - 250,
            width: 900,
            height: 600,
          }}
          bounds="parent"
          dragHandleClassName="drag-handle"
          enableUserSelectHack={false}
          style={{ position: "absolute", zIndex: 100 }}
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
          minWidth={400}
        >
          <DriversModal
            driverId={driver.id}
            handleCloseModal={() => handleCloseDriverModal(driver)}
          />
        </Rnd>
      ))}

      {selectedTeam.map((team, index) => (
        <Rnd
          key={team.id || index}
          default={{
            x: window.innerWidth / 2 - 450,
            y: window.scrollY + window.innerHeight / 2 - 250,
            width: 900,
            height: 600,
          }}
          bounds="parent"
          dragHandleClassName="drag-handle"
          enableUserSelectHack={false}
          style={{ position: "absolute", zIndex: 100 }}
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
          minWidth={400}
        >
          <TeamModal
            teamId={team.id}
            handleCloseModal={() => handleCloseTeamModal(team)}
          />
        </Rnd>
      ))}

      {selectedRace.map((race, index) => (
        <Rnd
          key={race.id || index}
          default={{
            x: window.innerWidth / 2 - 450,
            y: window.scrollY + window.innerHeight / 2 - 250,
            width: 900,
            height: 600,
          }}
          bounds="parent"
          dragHandleClassName="drag-handle"
          enableUserSelectHack={false}
          style={{ position: "absolute", zIndex: 100 }}
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
          minWidth={400}
        >
          <RaceModal
            raceId={race.id}
            handleCloseModal={() => handleCloseRaceModal(race)}
          />
        </Rnd>
      ))}

      <PageContainer>
        <Home
          onDriverClick={handleDriverCardClick}
          onTeamClick={handleTeamCardClick}
          onRaceClick={handleRaceCardClick}
        />
      </PageContainer>
    </div>
  );
};

export default HomePage;
