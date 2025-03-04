import os
import json

import DetailedScraper as laps
from DriverScraper import Driver
from TeamScraper import Team
from RaceScraper import Race

CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class AugmentedDriver:
    def __init__(self, id, name, picture, number, DOB, lastYear, team, totalRaces, wins):
        self.id = id
        self.name = name
        self.picture = picture
        self.number = number
        self.dateOfBirth = DOB
        try:
            self.lastYear = int(lastYear)
        except:
            self.lastYear = None
        self.lastTeam = team
        self.totalRaces = totalRaces
        self.wins = wins

    def print(self):
        print("ID: " + str(self.id))
        print("Name: " + str(self.name))
        print("Picture: " + str(self.picture))
        print("Number: " + str(self.number))
        print("DOB: " + str(self.dateOfBirth))
        print("Last Year: " + str(self.lastYear))  # Fixed capitalization
        print("Last Team: " + str(self.lastTeam))
        print("Total Races: " + str(self.totalRaces))
        print("Wins: " + str(self.wins))

    def to_dict(self):
        return {
            "id":self.id,
            "name": self.name,
            "image": self.picture,
            "number": self.number,
            "DOB": self.dateOfBirth,
            "lastYear": self.lastYear,
            "team": self.lastTeam,
            "totalRaces": self.totalRaces,
            "wins": self.wins
        }
    
    def from_json(file):
        try:
            f_in = open(file, "r")
            data = json.load(f_in)
            f_in.close()
            return(AugmentedDriver(**data))

        except:
            print("error loading driver")

class AugmentedTeam:
    def __init__(self, id, name, nationality, picture, wins, races, drivers):
        self.id = id
        self.name = name
        self.picture = picture
        self.nationality = nationality
        self.wins = wins
        self.races = races
        self.drivers = drivers
    
    def print(self):
        print(f"ID: " + str(self.id))
        print("Name: " + str(self.name))
        print("Picture: " + str(self.picture))
        print("Nationality: " + str(self.nationality))
        print("Wins: " + str(self.wins))
        print("Races: " + str(self.races))
        print("Drivers: " + str(self.drivers))
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "nationality": self.nationality,
            "image": self.picture,
            "wins": self.wins,
            "races": self.races,
            "drivers": self.drivers
        }
    

    def from_json(data):
        return AugmentedTeam(
            id = data["id"],
            name = data["name"],
            picture = data["picture"],
            nationality = data["nationality"],
            wins = data["wins"],
            races = data["races"],
            drivers = data["drivers"]
        )

class AugmentedRace:
    def __init__(self, id, title, date, track, winner, fastestLap, polePosition):
        self.id = id
        self.title = title
        self.date = date
        self.track = track
        self.winner = winner
        self.fastestLap = fastestLap
        self.polePosition = polePosition
    
    def print(self):
        print("ID: " + str(self.id))
        print("Title: " + str(self.title))
        print("Date: " + str(self.date))
        print("Track: " + str(self.track))
        print("Winner: " + str(self.winner))
        print("Fastest Lap: " + str(self.fastestLap))
        print("Pole Position: " + str(self.polePosition))
    
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "date": self.date,
            "track": self.track,
            "winner": self.winner,
            "fastestLap": self.fastestLap,
            "polePosition": self.polePosition
        }
    
    def from_json(data):
        return AugmentedRace(
            id = data["id"],
            title = data["title"],
            date = data["date"],
            track = data["track"],
            winner = data["winner"],
            fastestLap = data["fastestLap"],
            polePosition = data["polePosition"]
        )

class AugmentedLap:
    def __init__(self, race_id, driver_id, number, time, position):
        self.raceId = race_id
        self.driverId = driver_id
        self.lapNumber = number
        self.time = time
        self.position = position
    
    def print(self):
        print("Race ID: " + str(self.raceId))
        print("Driver ID: " + str(self.driverId))
        print("Lap Number: " + str(self.lapNumber))
        print("Time: " + str(self.time))
        print("Position: " + str(self.position))
    
    def to_dict(self):
        return {
            "raceId": self.raceId,
            "driverId": self.driverId,
            "lapNumber": self.lapNumber,
            "time": self.time,
            "position": self.position
        }
    
    def from_json(data):
        return AugmentedLap(
            race_id = data["raceId"],
            driver_id = data["driverId"],
            number = data["lapNumber"],
            time = data["time"],
            position = data["position"]
        )

DRIVER_IDS = {}
DRIVER_LAST_TEAM = {}
TEAM_IDS = {}
RACE_IDS = {}

def augmentedDriverSetup():
    filePath = CURRENT_DIRECTORY + "/JSON/driverData.json"
    f_in = open(filePath, "r")
    rawData = json.load(f_in)
    f_in.close()
    baseDrivers = [Driver.from_json(data) for data in rawData]
    newDrivers = []
    nextId = 1

    for driver in baseDrivers:
        print(driver.name)
        new = AugmentedDriver(
            id=nextId,
            name=driver.name,
            picture=driver.picture,
            number=driver.number,
            DOB=driver.dateOfBirth,
            lastYear=driver.lastYear,
            team = None,
            totalRaces=driver.totalRaces,
            wins=driver.wins
        )
        DRIVER_IDS[driver.name] = nextId
        DRIVER_LAST_TEAM[driver.name] = driver.lastTeam
        newDrivers.append(new)
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
        teamDrivers = team.drivers
        teamDriverIds = []
        for d in teamDrivers:
            id = DRIVER_IDS[d]
            if id is None:
                print(f"ERROR {d} NOT FOUND")
            else:
                teamDriverIds.append(id)
        
        new = AugmentedTeam(
            id = nextId,
            name = team.name,
            picture = team.picture,
            nationality = None, #team.nationality,
            wins = team.wins,
            races = team.races,
            drivers = teamDriverIds
        )
        TEAM_IDS[team.name] = nextId
        newTeams.append(new)
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

        new = AugmentedRace(
            id = nextId,
            title = race.title,
            date = race.date,
            track = race.track,
            winner = winnerID,
            fastestLap = race.fastestLap,
            polePosition = poleID
        )
        RACE_IDS[race.title] = nextId
        nextId += 1
        newRaces.append(new)

    return newRaces

def augmentedLapSetup():
    path = CURRENT_DIRECTORY + "/JSON/"
    files = [file for file in os.listdir(path) if "detailedRaces" in file]
    newLaps = []
    for file in files:
        f_in = open(path + file, "r")
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
                newLaps.append(AugmentedLap(
                    race_id=raceID,
                    driver_id=driverID,
                    number=lap.number,
                    position=lap.position,
                    time=lap.time
                ))
    
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

        driver.lastTeam = teamID

    laps = augmentedLapSetup()

    driverDicts = [driver.to_dict() for driver in drivers]
    raceDicts = [race.to_dict() for race in races]
    teamDicts = [team.to_dict() for team in teams]
    lapDicts = [lap.to_dict() for lap in laps]
    all = {"drivers":driverDicts, "races":raceDicts, "teams":teamDicts, "laps":lapDicts}
    f_out = open(CURRENT_DIRECTORY + "/FINAL.json", "w+")
    f_out.write(json.dumps(all, indent=4))
    f_out.close()

main()
print("done")