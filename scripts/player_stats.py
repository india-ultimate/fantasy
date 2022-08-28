import csv
from fnmatch import filter
import json
import os
from pathlib import Path

from translate import translate_player_name, translate_name

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


def slugify(name):
    return name.lower().strip().replace(" ", "-")


def generate_slugs(player_names):
    return {name: slugify(name) for name in player_names}


def default_player_list():
    with open(DATA_DIR.joinpath("teams.json")) as f:
        teams = json.load(f)
    teams = [translate_player_name(p) for p in teams]
    players_map = {p["name"]: p for p in teams}
    player_names = set(p["name"] for p in teams)
    slugs = generate_slugs(player_names)
    for name, player in players_map.items():
        player["slug"] = slugs[name]
        player["stats"] = dict()
        player["fantasy-points"] = 0
        player["points-distribution"] = {key: 0 for key in POINTS.keys()}

    return players_map


def compute_stats(paths):

    data = list()
    for path in paths:
        with open(path) as f:
            data.extend(list(csv.DictReader(f)))

    with open(DATA_DIR.joinpath("teams.json")) as f:
        teams = json.load(f)

    teams = [translate_player_name(p) for p in teams]

    players = {
        (player["name"], player["team"]): {
            "name": player["name"],
            "slug": slugify(player["name"]),
            "gender": player["gender"],
            "jersey": player["jersey"],
            "photo": player["photo"],
            "team": player["team"],
            "stats": {
                row["Opponent"]: {
                    key: int(row.get(key, 0) or 0) for key in POINTS.keys()
                }
                for row in data
                if translate_name(row["Name"]) == player["name"]
            },
        }
        for player in teams
    }

    for player in players.values():
        stats = player["stats"]
        stats_distribution = dict()
        for stat in stats.values():
            for key, count in stat.items():
                _ = stats_distribution.setdefault(key, 0)
                stats_distribution[key] += count

        player["stats-distribution"] = stats_distribution
        player["points-distribution"] = {
            key: POINTS[key] * count for key, count in stats_distribution.items()
        }
        player["fantasy-points"] = sum(player["points-distribution"].values())

    return players


def compute_stats_ultianalytics(stats_file):
    DATA = pd.read_csv(stats_file)
    team_name = get_team_name(stats_file)
    names_columns = PLAYER_COLUMNS + ["Passer", "Receiver"]
    player_names = set(DATA[names_columns].fillna(
        "Anonymous").values.flatten())
    slugs = generate_slugs(player_names)
    with open(DATA_DIR.joinpath("teams.json")) as f:
        teams = json.load(f)
        players_info = {(p["name"], p["team"]): p for p in teams}
    default = {"gender": "-", "jersey": "-", "photo": ""}
    players_map = {
        name: {
            "name": name,
            "slug": slugs[name],
            "gender": players_info.get((name, team_name), default)["gender"],
            "jersey": players_info.get((name, team_name), default)["jersey"],
            "photo": players_info.get((name, team_name), default)["photo"],
            "team": team_name,
            "stats": dict(),
            "fantasy-points": 0,
            "points-distribution": {key: 0 for key in POINTS.keys()},
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
        players_map[player]["points-distribution"][action] += POINTS[action]

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
        m1 = {(player, info["team"]): info for player,
              info in player_map1.items()}
        m2 = {(player, info["team"]): info for player,
              info in player_map2.items()}

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


def main():
    # stats_path = DATA_DIR.joinpath("player-stats.csv")
    stats_paths = [DATA_DIR.joinpath(p) for p in filter(
        os.listdir(DATA_DIR), 'player-stats*.csv')]
    players_map = compute_stats(stats_paths)
    with open(DATA_DIR.joinpath("players.json"), "w") as f:
        json.dump(
            sorted(players_map.values(), key=lambda x: (x["team"], x["name"])),
            f,
            indent=2,
            sort_keys=True,
        )


if __name__ == "__main__":
    main()
