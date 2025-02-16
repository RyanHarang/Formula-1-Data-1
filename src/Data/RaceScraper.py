import requests
from bs4 import BeautifulSoup
import unicodedata
import os
import json

SESSION = requests.Session()
CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
BASE_URL = "https://pitwall.app/"

class Race:
    def __init__(self, title, date, track, winner, fastestLap, polePosition):
        self.title = title
        self.date = date
        self.track = track
        self.winner = winner
        self.fastestLap = fastestLap
        self.polePosition = polePosition
    
    def print(self):
        print("Title: " + self.title)
        print("Date: " + self.date)
        print("Track: " + self.track)
        print("Winner: " + self.winner)
        print("Fastest Lap: " + self.fastestLap)
        print("Pole Position: " + self.polePosition)
    
    def to_dict(self):
        return {
            "title": self.title,
            "date": self.date,
            "track": self.track,
            "winner": self.winner,
            "fastestLap": self.fastestLap,
            "polePosition": self.polePosition
        }

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


    overallInfo = src.find('div', {'class': "small-blocks"}).find_all('div', {'class': 'stats-block'})
    for cell in overallInfo:
        title = cell.find('div', {'class': 'title'}).text.strip()
        if title == "Winner":
            winner = cell.find('div', {'class': 'value'}).text.strip()
        elif title == "Fastest lap time":
            fastestLap = cell.find('div', {'class': 'value'}).text.strip()
        elif title == "Pole position":
            polePosition = cell.find('div', {'class': 'value'}).text.strip()
    
    race = Race(name, date, track, winner, fastestLap, polePosition)
    return race

def main():
    raceLinks = getAllRaceLinks()
    races = []
    for link in raceLinks:
        races.append(getRaceData(link))

    raceDicts = [race.to_dict() for race in races]
    f_out = open(CURRENT_DIRECTORY + "/RaceData.json", "w+")
    f_out.write(json.dumps(raceDicts, indent=4))
    f_out.close()

main()