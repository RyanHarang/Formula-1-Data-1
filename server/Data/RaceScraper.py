import requests
from bs4 import BeautifulSoup
import unicodedata
import os
import json

SESSION = requests.Session()
CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
BASE_URL = "https://pitwall.app/"

class Race:
    def print(self):
        for key, value in self.__dict__.items():
            print(f"{key}: {value}")

    def to_dict(self):
        return self.__dict__.copy()

    @staticmethod
    def from_json(data):
        race = Race()  # Create an empty Race object
        for key, value in data.items():
            setattr(race, key, value)  # Dynamically assign attributes
        return race


def getYearLinks(year):
    links = []
    url = BASE_URL + "races/archive/{year}".format(year=year)
    print(url)
    result = SESSION.get(url)
    src = BeautifulSoup(result.content, "html.parser")
    table = src.find('table', {'class': 'data-table'}).find('tbody')
    rows = table.find_all('tr')
    for row in rows:
        link = row.find("a")["href"]
        links.append(link)
    return links

def getAllRaceLinks():
    raceLinks = []
    for year in range(2024, 1949, -1):
        raceLinks += getYearLinks(year)
        for link in raceLinks:
            if link not in raceLinks:
                raceLinks.append(link)
    return raceLinks

def getRaceData(link):
    NEW_RACE = Race()
    url = BASE_URL + link
    print(url)
    result = SESSION.get(url)
    src = BeautifulSoup(result.content, "html.parser")

    name = src.find('h1').text.strip()
    date = "null"
    track = "null"
    winner = "null"
    fastestLap = "null"
    polePosition = "null"

    infoPane = src.find('div', {'class': 'info-pane-data'})
    infoPaneStats = infoPane.find_all('div', {'class': 'stats'})
    for cell in infoPaneStats:
        title = cell.find('div', {'class': 'title'}).text.strip()
        if title == "Date":
            date = cell.find('div', {'class': 'content'}).text.strip()
        elif title == "Circuit":
            track = cell.find('div', {'class': 'content'}).text.strip()

    #set name, date, track, winner, fastest lap, and pole
    setattr(NEW_RACE, "title", name)
    setattr(NEW_RACE, "date", date)
    setattr(NEW_RACE, "track", track)

    overallInfo = src.find('div', {'class': "small-blocks"}).find_all('div', {'class': 'stats-block'})
    for cell in overallInfo:
        title = cell.find('div', {'class': 'title'}).text.strip()
        if title == "Fastest lap time":
            fastestLap = cell.find('div', {'class': 'value'}).text.strip()
            break
    
    dataTable = src.find("table", {"class":"data-table"}).find("tbody")
    drivers = dataTable.find_all("tr")
    winner = drivers[0].find("td", {"class":"title"}).find("a").text.strip()
    for driver in drivers:
        cells = driver.find_all("td")
        if cells[4].text.strip() == "1st":
            polePosition = driver.find("td", {"class":"title"}).find("a").text.strip()

    setattr(NEW_RACE, "winner", winner)
    setattr(NEW_RACE, "fastestLap", fastestLap)
    setattr(NEW_RACE, "polePosition", polePosition)

    return NEW_RACE

def main():
    raceLinks = getAllRaceLinks()
    races = []
    for link in raceLinks:
        races.append(getRaceData(link))

    raceDicts = [race.to_dict() for race in races]
    f_out = open(CURRENT_DIRECTORY + "/JSON/RaceData.json", "w+")
    f_out.write(json.dumps(raceDicts, indent=4))
    f_out.close()

#main()