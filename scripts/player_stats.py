from functools import reduce
import json
from pathlib import Path

import pandas as pd

ROOT_DIR = Path(__file__).parent.parent.absolute()
DATA_DIR = ROOT_DIR.joinpath("data")
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
    return Path(stats_file).name.split("-", 1)[0]


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
        initialize_stats(opponent, player)
        players_map[player]["stats"][opponent][action] += 1

    for _, row in goals.iterrows():
        players = set(list(row[PLAYER_COLUMNS].fillna("Anonymous")))
        opponent = row["Opponent"]

        for player in players:
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
            update_stats(opponent, player, "defense")

        if row["Action"] == "Throwaway" and row["Event Type"] == "Offense":
            player = row["Passer"]
            update_stats(opponent, player, "throwaway")

        if row["Action"] == "Drop" and row["Event Type"] == "Offense":
            player = row["Receiver"]
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


def merge_stats(player_map1, player_map2=None):
    if player_map2 is None:
        return player_map1

    else:
        # Player names are assumed to be unique in a team, but could be
        # duplicate across teams. So, we use team name to uniquify names.
        m1 = {(player, info["team"]): info for player, info in player_map1.items()}
        m2 = {(player, info["team"]): info for player, info in player_map2.items()}

        for player, info in m2.items():
            if player not in m1:
                m1[player] = info

            else:
                stats1 = m1[player]["stats"]
                stats2 = m2[player]["stats"]

                for opponent, stats in stats2.items():
                    if opponent not in stats1:
                        stats1[opponent] = stats

                    else:
                        other_stats = stats1[opponent]
                        if stats == other_stats:
                            # NOTE: If stats are exactly same we assume they are the same match!
                            continue
                        else:
                            # FIXME: Should we add up the stats?
                            raise NotImplementedError

        return m1


def main(stats_paths):
    if not stats_paths:
        stats_paths = DATA_DIR.glob(f"*stats*.csv")

    players_maps = [compute_stats(path) for path in stats_paths]
    players_map = reduce(merge_stats, players_maps, {})

    with open(DATA_DIR.joinpath("players.json"), "w") as f:
        json.dump(
            sorted(players_map.values(), key=lambda x: (x["team"], x["name"])),
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
