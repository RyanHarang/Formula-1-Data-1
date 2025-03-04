import requests
from bs4 import BeautifulSoup
import os
import json

SESSION = requests.Session()
CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
BASE_URL = "https://pitwall.app/"

# src = BeautifulSoup(result.content, "html.parser")
# print(src)
# print("Done")

class Driver:
    def __init__(self, name, picture, number, DOB, lastYear, team, totalRaces, wins):
        self.name = name
        self.picture = picture
        self.number = number
        self.dateOfBirth = DOB
        self.lastYear = lastYear
        self.lastTeam = team
        self.totalRaces = totalRaces
        self.wins = wins

    def print(self):
        print("Name: " + self.name)
        print("Picture: " + self.picture)
        print("Number:" + self.number)
        print("DOB: " + self.dateOfBirth)
        print("Last Year: " + self.lastyear)
        print("Last Team: " + self.lastTeam)
        print("Total Races: " + self.totalRaces)
        print("Wins: " + self.wins)

    def to_dict(self):
        return {
            "name": self.name,
            "image": self.picture,
            "number": self.number,
            "DOB": self.dateOfBirth,
            "lastYear": self.lastYear,
            "team": self.lastTeam,
            "totalRaces": self.totalRaces,
            "wins": self.wins
        }
    
    def from_json(data):
        return(Driver(
            name = data["name"],
            picture = data["image"],
            number = data["number"],
            DOB = data["DOB"],
            lastYear = data["lastYear"],
            team = data["team"],
            totalRaces = data["totalRaces"],
            wins = data["wins"]
        ))

def fetchYear(year):
    drivers = []
    url = 'https://pitwall.app/drivers/archive/{year}'.format(year=year)
    print(url)
    result = SESSION.get(url)
    src = BeautifulSoup(result.content, "html.parser")
    table = src.find('table', {'class': 'data-table'}).find('tbody')
    tr = table.find_all('tr')

    for i in range(0, len(tr)):
        td = tr[i].find('td', {'class': 'title'})
        link = td.find("a")["href"]
        if link not in drivers:
            drivers.append(link)

    return drivers

def fetchDriverLinks():
    drivers = []
    startYear = 2025
    lastYear = 1950
    while startYear >= lastYear:
        tempDrivers = fetchYear(startYear)
        startYear -= 1
        for driver in tempDrivers:
            if driver not in drivers:
                drivers.append(driver)
    
    return drivers

def getDriverData(driver):
    url = BASE_URL + driver
    print(url)
    result = SESSION.get(url)
    src = BeautifulSoup(result.content, "html.parser")

    #get name and image
    name = src.find("h1").text.strip()
    imageDiv = src.find("div",{"class":"image"})
    imageSrc = imageDiv.find("img")
    if imageSrc is None:
        image = "null"
    else:
        image = imageSrc['src']
    
    #get number and DOB
    summary = src.find("div",{"class":"info-pane-data"})
    cells = summary.find_all("div", {"class":"stats"}) + summary.find_all("div", {"class":"stats stats-full"})
    number = "null"
    DOB = "null"
    for cell in cells:
        title = cell.find("div", {"class":"title"}).text.strip()
        if title == "Number":
            number = cell.find("div", {"class":"content"}).text.strip()
        elif title == "Date of birth":
            DOB = cell.find("div", {"class":"content"}).text.strip()

    #total races
    totalRaces = src.find("div", {"class":"big-blocks"}).find_all("div", {"class":"stats-block"})[2].find("div", {"class":"value"}).text.strip()

    #rest of stats
    mainData = src.find("div", {"class":"wrapper", "id":"page"}).find("div", {"class":"row"})
    smallBlocks = mainData.find("div", {"class":"small-blocks"}).find("div", {"class":"left"}).find_all("div", {"class":"stats-block"})
    team = "null"
    lastYear = "null"
    wins = "null"
    for block in smallBlocks:
        title = block.find("div", {"class":"title"}).text.strip()
        if title == "Last team" or title == "Current team":
            team = block.find("a").text.strip()
        elif title == "Last race":
            lastYear = block.find("a").text.split(" ")[0].strip()
        elif title == "Wins":
            wins = block.find("div", {"class":"value"}).text.strip()
    
    #make object
    driver = Driver(name, image, number, DOB, lastYear, team, totalRaces, wins)
    return driver

def getAllDriverData(drivers):
    #driverNames = ["alexander-albon", "fernando-alonso", "andrea-kimi-antonelli"]
    f_out = open(CURRENT_DIRECTORY + "/JSON/driverData.json", "w+")
    allData = []
    for driver in drivers:
        #print(driver)
        data = getDriverData(driver.strip())
        allData.append(data)
    driverDicts = [driver.to_dict() for driver in allData]
    json.dump(driverDicts, f_out, indent=4)
    f_out.close()

def main():
    drivers = fetchDriverLinks()
    
    #erase old data
    f_out = open(CURRENT_DIRECTORY + "/JSON/driverData.json", "w+")
    f_out.write("")
    f_out.close()
    getAllDriverData(drivers)
    
#main()
#dr = fetchDriverLinks()
#for d in dr:
#    print(d)