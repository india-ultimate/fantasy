import json
import os
from os.path import abspath, dirname, exists, join
from pathlib import Path
import pandas as pd

# TODO: Get Team name when running this script
TEAM_NAME = "BPHC Ultimate"
TOURNAMENT = "Regionals"

# Get File Paths
HERE = dirname(abspath(__file__))
ROOT_DIR = Path(HERE).parent.absolute()
STATS_FILE = join(ROOT_DIR, 'data', 'stats.csv')

# Read CSV
DATA = pd.read_csv(STATS_FILE)

# Create Players Dict
players_map = dict()

# Iterate through all the players and add them in the player's dict
for i in range(7):
    for player_name in DATA["Player " + str(i)]:
        players_map[player_name] = {
            "name": player_name,
            "gender": "-",
            "jersey": "-",
            "team": TEAM_NAME,
            "stats": dict(),
            "fantasy-points": 0,
        }

goals = DATA[(DATA['Tournamemnt'] == TOURNAMENT) &
             (DATA['Action'] == 'Goal')]


def initialize_stats(opponent, player):
    if opponent not in players_map[player]['stats']:
        players_map[player]['stats'][opponent] = dict({
            "assist": 0,
            "goal": 0,
            "throwaway": 0,
            "drop": 0,
            "o-line": 0,
            "d-line": 0,
            "o-scoring-line": 0,
            "d-scoring-line": 0,
            "defense": 0,
            "block": 0
        })


def update_stats(opponent, player, action):
    players_map[player]['stats'][opponent][action] += 1


for _, row in goals.iterrows():
    player_columns = ['Player {}'.format(i) for i in range(7)]
    players = set(list(row[player_columns]))

    for player in players:
        initialize_stats(row['Opponent'], player)

        if row["Line"] == "O":
            update_stats(row['Opponent'], player, "o-line")
            if row["Event Type"] == "Offense":
                update_stats(row['Opponent'], player, "o-scoring-line")

        if row["Line"] == "D":
            update_stats(row['Opponent'], player, "d-line")
            if row["Event Type"] == "Offense":
                update_stats(row['Opponent'], player, "d-scoring-line")

    if row["Event Type"] == "Offense":
        update_stats(row['Opponent'], row['Receiver'], "goal")
        update_stats(row['Opponent'], row['Passer'], "assist")

for _, row in DATA.iterrows():
    if row["Action"] == "D":
        initialize_stats(row["Opponent"], row["Defender"])
        update_stats(row["Opponent"], row["Defender"], "defense")

    if row["Action"] == "Throwaway" and row["Event Type"] == "Offense":
        initialize_stats(row["Opponent"], row["Passer"])
        update_stats(row["Opponent"], row["Passer"], "throwaway")

    if row["Action"] == "Drop" and row["Event Type"] == "Offense":
        initialize_stats(row["Opponent"], row["Receiver"])
        update_stats(row["Opponent"], row["Receiver"], "drop")

for player in players_map:
    fantasy_points = 0

    for opponent in players_map[player]['stats']:
        stat = players_map[player]['stats'][opponent]

        fantasy_points += stat["goal"] * 3
        fantasy_points += stat["assist"] * 3
        fantasy_points += stat["throwaway"] * (-2)
        fantasy_points += stat["drop"] * (-2)
        fantasy_points += stat["defense"] * 5
        fantasy_points += stat["block"] * 5
        fantasy_points += stat["o-line"] * 0.5
        fantasy_points += stat["d-line"] * 0.5
        fantasy_points += stat["o-scoring-line"] * 1
        fantasy_points += stat["d-scoring-line"] * 2

    players_map[player]['fantasy-points'] = fantasy_points

players_list = list(players_map.values())
players_list_json = json.dumps(players_list)
print(players_list_json)
