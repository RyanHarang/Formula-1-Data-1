import os
import json

import DetailedScraper as laps
from DriverScraper import Driver
from TeamScraper import Team
from RaceScraper import Race

CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class AugmentedDriver:
    def print(self):
        for key, value in self.__dict__.items():
            print(f"{key}: {value}")

    def to_dict(self):
        return self.__dict__.copy()
    
    def from_json(data):
        d = AugmentedDriver()
        for key, value in data.items():
            setattr(d, key, value)
        return d

class AugmentedTeam:  
    def print(self):
        for key, value in self.__dict__.items():
            print(f"{key}: {value}")
    
    def to_dict(self):
        return self.__dict__.copy()

    def from_json(data):
        t = AugmentedTeam()
        for key, value in data.items():
            setattr(t, key, value)
        return t

class AugmentedRace:
    def print(self):
        for key, value in self.__dict__.items():
            print(f"{key}: {value}")
    
    def to_dict(self):
        return self.__dict__.copy()
    
    def from_json(data):
        r = AugmentedRace()
        for key, value in data.items():
            setattr(r, key, value)
        return r

class AugmentedLap:
    def print(self):
        for key, value in self.__dict__.items():
            print(f"{key}: {value}")
    
    def to_dict(self):
        return self.__dict__.copy()
    
    def from_json(data):
        l = AugmentedLap()
        for key, value in data.items():
            setattr(l, key, value)
        return l

DRIVER_IDS = {}
DRIVER_LAST_TEAM = {}
TEAM_IDS = {}
RACE_IDS = {}

def augmentedDriverSetup():
    filePath = CURRENT_DIRECTORY + "/JSON/DriverData.json"
    f_in = open(filePath, "r")
    rawData = json.load(f_in)
    f_in.close()
    baseDrivers = [Driver.from_json(data) for data in rawData]
    newDrivers = []
    nextId = 1

    for driver in baseDrivers:
        print(driver.name)
        newDriver = AugmentedDriver()
        setattr(newDriver, "id", nextId)
        for key, value in driver.__dict__.items():
            if key == "team":
                setattr(newDriver, key, 0)
            elif key == "lastYear":
                try:
                    setattr(newDriver, key, int(value))
                except:
                    setattr(newDriver, key, 0)
            else:
                setattr(newDriver, key, value)
        newDrivers.append(newDriver)

        DRIVER_IDS[driver.name] = nextId
        DRIVER_LAST_TEAM[driver.name] = driver.team
        nextId += 1

    return newDrivers

def augmentedTeamSetup():
    filePath = CURRENT_DIRECTORY + "/JSON/TeamData.json"
    f_in = open(filePath, "r")
    rawData = json.load(f_in)
    f_in.close()
    baseTeams = [Team.from_json(data) for data in rawData]
    newTeams = []
    nextId = 1

    for team in baseTeams:
        print(team.name)
        t = AugmentedTeam()
        setattr(t, "id", nextId)

        teamDrivers = team.drivers
        teamDriverIds = []
        #find the IDs of the drivers, NOT their names
        for d in teamDrivers:
            id = DRIVER_IDS[d]
            if id is None:
                print(f"ERROR {d} NOT FOUND")
            else:
                teamDriverIds.append(id)

        for key, value in team.__dict__.items():
            if key == "drivers":
                setattr(t, key, teamDriverIds)
            else:
                setattr(t, key, value)

        TEAM_IDS[t.name] = nextId
        newTeams.append(t)
        nextId += 1

    return newTeams

def augmentedRaceSetup():
    filePath = CURRENT_DIRECTORY + "/JSON/RaceData.json"
    f_in = open(filePath, "r")
    rawData = json.load(f_in)
    f_in.close()
    baseRaces = [Race.from_json(data) for data in rawData]
    newRaces = []
    nextId = 1

    for race in baseRaces:
        r = AugmentedRace()
        setattr(r, "id", nextId)
        #print(race.title)
        poleID = None
        winnerID = None

        try:
            poleID = DRIVER_IDS[race.polePosition]
        except:
            print(f"{race.title} Has no pole driver")
        try:
            winnerID = DRIVER_IDS[race.winner]
        except:
            print(f"{race.title} Has no winner")

        for key, value in race.__dict__.items():
            if key == "winner":
                setattr(r, key, winnerID)
            elif key == "polePosition":
                setattr(r, key, poleID)
            else:
                setattr(r, key, value)

        RACE_IDS[race.title] = nextId
        nextId += 1
        newRaces.append(r)

    return newRaces

def augmentedLapSetup():
    newLaps = []
    f_in = open(CURRENT_DIRECTORY + "/JSON/DetailedRaces.json", "r")
    rawData = json.load(f_in)
    f_in.close()
    baseSessions = [laps.detailedSession.from_json(data) for data in rawData]
    for session in baseSessions:
        raceID = None
        driverID = None
        try:
            raceID = RACE_IDS[session.title]
        except:
            print(f"race {session.title} has no attached ID")
        try:
            driverID = DRIVER_IDS[session.driver]
        except:
            print(f"driver {session.driver} has no attached ID")

        for lap in session.laps:
            l = AugmentedLap()
            setattr(l, "raceId", raceID)
            setattr(l, "driverId", driverID)
            for key, value in lap.__dict__.items():
                if key == "number":
                    try:
                        setattr(l, key, int(value))
                    except:
                        setattr(l, key, 0)
                else:
                    setattr(l, key, value)
            newLaps.append(l)
    
    return newLaps       

def main():
    drivers = augmentedDriverSetup()
    print("Drivers Finished\n--------------------------")
    races = augmentedRaceSetup()
    print("Races Finished\n--------------------------")
    teams = augmentedTeamSetup()
    print("Teams Finished\n--------------------------")
    teamKeys = TEAM_IDS.keys()

    #attach teams to drivers now that teams have IDs
    for driver in drivers:
        teamName = DRIVER_LAST_TEAM[driver.name]
        if teamName is None:
            print(f"Error {driver.name} has no last team")
            return
        
        teamID = None
        for key in teamKeys:
            if teamName in key:
                teamID = TEAM_IDS[key]
                break
        
        if teamID is None:
            print(f"Error {teamName} has no attached ID")

        driver.team = teamID

    laps = augmentedLapSetup()

    driverDicts = [driver.to_dict() for driver in drivers]
    raceDicts = [race.to_dict() for race in races]
    teamDicts = [team.to_dict() for team in teams]
    lapDicts = [lap.to_dict() for lap in laps]
    all = {"drivers":driverDicts, "races":raceDicts, "teams":teamDicts, "laps":lapDicts}
    keys = all.keys()
    for key in keys:
        f_out = open(CURRENT_DIRECTORY + f"/JSON/FINAL{key}.json", "w+")
        f_out.write(json.dumps(all[key], indent=4))
        f_out.close()

main()
print("done")