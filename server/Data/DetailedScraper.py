import time
import os
import json
import requests

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from typing import List

CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Driver:
    def __init__(self, driver_id, name):
        self.driver_id = driver_id
        self.name = name

    def to_json(self):
        return {"driver_id": self.driver_id, "name": self.name}

    @classmethod
    def from_json(cls, data):
        return cls(driver_id=data["driver_id"], name=data["name"])

class Race:
    def __init__(self, race_id, title):
        self.race_id = race_id
        self.title = title
        self.drivers:List[Driver] = []

    def to_json(self):
        return {
            "race_id": self.race_id,
            "title": self.title,
            "drivers": [driver.to_json() for driver in self.drivers]
        }

    @classmethod
    def from_json(cls, data):
        race = cls(race_id=data["race_id"], title=data["title"])
        race.drivers = [Driver.from_json(driver_data) for driver_data in data["drivers"]]  # Correct usage
        return race

class Season:
    def __init__(self, ID, year):
        self.ID = ID
        self.year = year
        self.races: List[Race]
    
    def toJson(self):
        return{
            "season_id":self.ID,
            "year":self.year,
            "races":[race.toJson() for race in self.races]
        }
    
    @classmethod
    def from_json(cls, data):
        season = cls(ID = data["season_id"], year = data["year"])
        season.races = [Race.from_json(race) for race in data.get("races", [])]
        return season

class Lap:
    def __init__(self, no, pos, time):
        self.number = no
        self.position = pos
        self.time = time

    def toJson(self):
        return{
            "lapNumber":self.number,
            "position":self.position,
            "time":self.time
        }
    
    def from_json(data):
        return (Lap(
            no = data["lapNumber"],
            pos=data["position"],
            time = data["time"]
        ))

class detailedSession:
    def __init__(self, year, title, driver, laps):
        self.year = year
        self.title = title
        self.driver = driver
        self.laps:List[Lap] = laps

    def toJson(self):
        return{
            "year":self.year,
            "title":self.title,
            "driver":self.driver,
            "laps":[lap.toJson() for lap in self.laps]
        }
    
    def from_json(data):
        laps = [Lap.from_json(lap) for lap in data["laps"]]
        return detailedSession(
            year = data["year"],
            title = data["title"],
            driver = data["driver"],
            laps=laps
        )


# options = webdriver.ChromeOptions()
# allData = []
# args = ["--headless", "--disable-gpu", "--window-size=1920x1080"]
# for arg in args:
#     options.add_argument(arg)

# # Setup WebDriver (make sure you have chromedriver installed)
# driver = webdriver.Chrome(options=options)
# driver.get("https://pitwall.app/analysis/race-report")  # Replace with actual URL

# wait = WebDriverWait(driver, 10)

# def select_dropdown_option(dropdown_id, option_data_id):
#     """Select an option from a custom dropdown menu by data-id."""
#     dropdown = wait.until(EC.element_to_be_clickable((By.ID, dropdown_id)))
#     dropdown.click()  # Open the dropdown
#     option = wait.until(EC.element_to_be_clickable((By.XPATH, f"//span[@input-id='{dropdown_id.split('-')[-1]}' and @data-id='{option_data_id}']")))
#     option.click()  # Select the option
#     time.sleep(2)  # Allow time for next dropdown to update

# def getIdentificationData():

#     # Get all seasons
#     season_options = driver.find_elements(By.XPATH, "//span[@input-id='season']")
#     seasons:List[Season] = []
#     for s in season_options:
#         seasonID = s.get_attribute("data-id")
#         year = s.get_attribute("textContent")
#         seasons.append(Season(seasonID, year))

#     for season in seasons:
#         print(season.year)
#         select_dropdown_option("dropdown-select-season", season.ID)

#         # Get all races for the selected season
#         race_options = driver.find_elements(By.XPATH, "//span[@input-id='race']")
#         races: List[Race] = []

#         for o in race_options:
#             raceID = o.get_attribute("data-id")
#             title = o.get_attribute("textContent")
#             races.append(Race(raceID, title))

#         for race in races:
#             select_dropdown_option("dropdown-select-race", race.ID)

#             # Get all drivers for the selected race
#             driver_options = driver.find_elements(By.XPATH, "//span[@input-id='driver']")
#             drivers = []
#             for option in driver_options:
#                 driverID = option.get_attribute("data-id")
#                 name = option.get_attribute("textContent")
#                 drivers.append(Driver(driverID, name))
            
#             race.drivers=drivers
        
#         season.races = races

#     f_out = open(CURRENT_DIRECTORY + "/detailedRaces.json", "w+")
#     json.dump([season.toJson() for season in seasons], f_out, indent=4)
#     f_out.close()
#     driver.quit()

def getRaceDetails():
    session = requests.session()
    f_in = open(CURRENT_DIRECTORY + "/detailedRaces.json", "r")
    rawData = json.load(f_in)
    seasons = [Season.from_json(season) for season in rawData]
    allDetails = []
    for season in seasons:
        sID = season.ID
        for race in season.races:
            rID = race.race_id
            for driver in race.drivers:
                dID = driver.driver_id
                print(f"{race.title} : {driver.name}")
                try:
                    result = session.get(f"https://pitwall.app/analysis/race-report?season={sID}&race={rID}&driver={dID}&button=")
                    src = BeautifulSoup(result.content, "html.parser")
                    table = src.find("table", {"class":"data-table"})
                    rows = table.find("tbody").find_all("tr")
                    laps = []
                    for row in rows:
                        dataPoints = row.find_all("td")
                        no = dataPoints[0].text.strip()
                        pos = dataPoints[1].text
                        time = dataPoints[2].text
                        laps.append(Lap(no, pos, time))
                    allDetails.append(detailedSession(season.year, race.title, driver.name, laps))
                except:
                    continue

    f_out = open(CURRENT_DIRECTORY + f"/JSON/DetailedRaces.json", "w+")
    json.dump([s.toJson() for s in allDetails], f_out, indent=4)
    f_out.close()

#start = time.time()
#getRaceDetails()
#end = time.time()
# runtime = end-start
# print(f"Completed after {runtime:.4f} seconds")