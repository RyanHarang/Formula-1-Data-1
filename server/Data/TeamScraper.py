import requests
from bs4 import BeautifulSoup
import os
import json

SESSION = requests.Session()
CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))
BASE_URL = "https://pitwall.app"

class Team:
    def __init__(self, name, nationality, natCode, picture, wins, races, drivers):
        self.name = name
        self.picture = picture
        self.nationality = nationality
        self.natCode = natCode
        self.wins = wins
        self.races = races
        self.drivers = drivers
    
    def print(self):
        print("Name: " + str(self.name))
        print("Picture: " + str(self.picture))
        print("Nationality: " + str(self.nationality))
        print("Nation Code: " + str(self.natCode))
        print("Wins: " + str(self.wins))
        print("Races: " + str(self.races))
        print("Drivers: " + str(self.drivers))
    
    def to_dict(self):
        return {
            "name": self.name,
            "image": self.picture,
            "nationality": self.nationality,
            "natCode":self.natCode,
            "wins": self.wins,
            "races": self.races,
            "drivers": self.drivers
        }
    
    def from_json(data):
        return (Team(
            name = data["name"],
            picture = data["image"],
            nationality = data["nationality"],
            natCode = data["natCode"],
            wins = data["wins"],
            races = data["races"],
            drivers = data["drivers"]
        ))
    
def fetchYear(year):
    teams = []
    url = 'https://pitwall.app/teams/archive/{year}'.format(year=year)
    print(url)
    result = SESSION.get(url)
    src = BeautifulSoup(result.content, "html.parser")
    table = src.find('table', {'class': 'data-table'}).find('tbody')
    tr = table.find_all('tr')

    for i in range(0, len(tr)):
        td = tr[i].find('td', {'class': 'title'})
        link = td.find("a")["href"]
        if link not in teams:
            teams.append(link)
    
    return teams

def fetchAllTeamLinks():
    teams = []
    for year in range(1950, 2026):
        newTeams = fetchYear(year)
        for team in newTeams:
            if team not in teams:
                teams.append(team)
    
    return teams

def fetchTeamData(team):
    url = BASE_URL + team
    print(url)
    result = SESSION.get(url)
    src = BeautifulSoup(result.content, "html.parser")

    teamName = "null"
    picture = "null"
    nationality = "null"
    wins = "null"
    races = "null"
    drivers = []

    infoPane = src.find('div', {'id': 'info-pane'})
    teamName = infoPane.find('h1').text.strip()
    try:
        picture = infoPane.find('div', {'class': 'image'}).find('img')['src']
    except:
        picture = "null"

    natCode = infoPane.find("span")["class"][1].split("-")[-1].strip()
    stats = src.find_all('div', {'class': 'stats'})
    for stat in stats:
        title = stat.find('div', {'class': 'title'}).text.strip()
        if "drivers" in title:
            names = stat.find_all('a')
            for name in names:
                drivers.append(name.text.strip())
        elif "Nationality" in title:
            nationality = stat.find("div", {"class":"content"}).text.strip()
    
    bigBlocks = src.find('div', {'class': 'big-blocks'})
    blocks = bigBlocks.find_all('div', {'class': 'stats-block'})
    for block in blocks:
        label = block.find('div', {'class': 'title'}).text.strip()
        if "Wins" == label:
            wins = block.find('div', {'class': 'value'}).text.strip().split("/")[0]
        elif "Races" == label:
            races = block.find('div', {'class': 'value'}).text.strip()

    team = Team(teamName, nationality, natCode, picture, wins, races, drivers)
    return team

def main():
    teams = []
    teamLinks = fetchAllTeamLinks()
    for team in teamLinks:
        teams.append(fetchTeamData(team))
    f_out = open(os.path.join(CURRENT_DIRECTORY, "JSON/TeamData.json"), "w+")
    teamDicts = [team.to_dict() for team in teams]
    json.dump(teamDicts, f_out, indent=4)
    f_out.close()

#main()