from functools import reduce
from glob import glob
import json
import os
from pathlib import Path
import pandas as pd

# Get File Paths
ROOT_DIR = Path(__file__).parent.parent.absolute()
DATA_DIR = os.path.join(ROOT_DIR, "data")
POINTS = {
    "assist": 3,
    "goal": 3,
    "throwaway": -2,
    "drop": -2,
    "o-line": 0.5,
    "d-line": 0.5,
    "o-scoring-line": 1,
    "d-scoring-line": 2,
    "defense": 5,
    "block": 5,
}
PLAYER_COLUMNS = ["Player {}".format(i) for i in range(7)]


def get_team_name(stats_file):
    filename = os.path.basename(stats_file)
    return filename.split("-", 1)[0]


def compute_stats(stats_file):
    DATA = pd.read_csv(stats_file)
    team_name = get_team_name(stats_file)
    names_columns = PLAYER_COLUMNS + ["Passer", "Receiver"]
    player_names = set(DATA[names_columns].fillna("Anonymous").values.flatten())
    players_map = {
        name: {
            "name": name,
            "gender": "-",
            "jersey": "-",
            "team": team_name,
            "stats": dict(),
            "fantasy-points": 0,
        }
        for name in player_names
    }

    goals = DATA[DATA["Action"] == "Goal"]

    def initialize_stats(opponent, player):
        if opponent not in players_map[player]["stats"]:
            zeros = {key: 0 for key in POINTS.keys()}
            players_map[player]["stats"][opponent] = zeros

    def update_stats(opponent, player, action):
        players_map[player]["stats"][opponent][action] += 1

    for _, row in goals.iterrows():
        players = set(list(row[PLAYER_COLUMNS].fillna("Anonymous")))
        opponent = row["Opponent"]

        for player in players:
            initialize_stats(opponent, player)

            if row["Line"] == "O":
                update_stats(opponent, player, "o-line")
                if row["Event Type"] == "Offense":
                    update_stats(opponent, player, "o-scoring-line")

            if row["Line"] == "D":
                update_stats(opponent, player, "d-line")
                if row["Event Type"] == "Offense":
                    update_stats(opponent, player, "d-scoring-line")

        if row["Event Type"] == "Offense":
            update_stats(opponent, row["Receiver"], "goal")
            update_stats(opponent, row["Passer"], "assist")

    for _, row in DATA.iterrows():
        opponent = row["Opponent"]
        if row["Action"] == "D":
            player = row["Defender"]
            initialize_stats(opponent, player)
            update_stats(opponent, player, "defense")

        if row["Action"] == "Throwaway" and row["Event Type"] == "Offense":
            player = row["Passer"]
            initialize_stats(opponent, player)
            update_stats(opponent, player, "throwaway")

        if row["Action"] == "Drop" and row["Event Type"] == "Offense":
            player = row["Receiver"]
            initialize_stats(opponent, player)
            update_stats(opponent, player, "drop")

    for player in players_map:
        fantasy_points = sum(
            [
                sum(count * POINTS[stat] for stat, count in stats.items())
                for stats in players_map[player]["stats"].values()
            ]
        )

        players_map[player]["fantasy-points"] = fantasy_points

    return players_map


def merge_stats(player_maps):
    if len(player_maps) == 1:
        return player_maps[0]
    else:
        # FIXME: Add logic to merge two player maps from different CSVs
        raise NotImplementedError


def main(stats_paths):
    if not stats_paths:
        stats_paths = glob(f"{DATA_DIR}/*stats*.csv")

    players_maps = [compute_stats(path) for path in stats_paths]
    players_map = reduce(merge_stats, players_maps)

    with open(os.path.join(DATA_DIR, "sample.json"), "w") as f:
        json.dump(
            sorted(players_map.values(), key=lambda x: x["name"]),
            f,
            indent=2,
            sort_keys=True,
        )


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("stats", help="Path to CSV containing stats", nargs="*")
    args = parser.parse_args()
    main(args.stats)
