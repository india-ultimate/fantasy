from collections import namedtuple
import csv
import json
import os
import re

from translate import translate_name

TEAM_RE = re.compile(r"\s*([^,]+) - #(\d*), ([^,]+), \(([^,]+)\)")
HERE = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(HERE, "..", "data")

Player = namedtuple("Player", ("team", "jersey", "name", "gender"))


def is_valid_team(team):
    """Check if a team is valid.

    Should contain 8 unique players, 4 male and 4 female. Only 1 player of each
    gender allowed from each team.

    """

    if len(set(team)) != 8:
        return False

    if len({(p.gender, p.team) for p in team}) != 8:
        return False

    return True


def team_from_csv(entry):
    """Returns a `team` in the format expected by `score` from a CSV row."""
    male = "Select 4 Male Players (max 1 from each State)"
    female = "Select 4 Female Players (max 1 from each State)"
    names = f"{entry[female]}, {entry[male]}"
    return [
        Player(team, jersey, translate_name(name), gender)
        for team, jersey, name, gender in TEAM_RE.findall(names)
    ]


def reshape_stats(stats):
    """Convert stats from a list of players info to a dict.

    NOTE: This is written as a separate function to allow reshaping as
    required, based on how we collect the data.

    """
    return {(player["name"], player["team"]): player for player in stats}


def score(team, data):
    """Return the score for a fantasy league team.

    `team` is simply a list of Players.

    `data` is a dict mapping (player name, team name) to player information
    that includes fantasy-points along with other information.

    """

    return sum(
        data.get((player.name, player.team), {}).get("fantasy-points", 0)
        for player in team
    )


def generate_slugs(team):
    return sorted({player.name.lower().strip().replace(" ", "-") for player in team})


def perfect_team(stats):
    # print(stats)
    teams = {p["team"] for p in stats}
    top_male = [
        max(
            stats,
            key=lambda p: p["team"] == team
            and p["gender"] == "male"
            and p["fantasy-points"],
        )
        for team in teams
    ]
    top_female = [
        max(
            stats,
            key=lambda p: p["team"] == team
            and p["gender"] == "female"
            and p["fantasy-points"],
        )
        for team in teams
    ]

    male = sorted(top_male, key=lambda p: p["fantasy-points"], reverse=True)[:4]
    female = sorted(top_female, key=lambda p: p["fantasy-points"], reverse=True)[:4]
    team = [
        Player(p["team"], p["jersey"], p["name"], p["gender"]) for p in female + male
    ]
    return team


def main(teams_csv, stats_json):
    with open(stats_json) as f:
        stats_data = json.load(f)
        stats = reshape_stats(stats_data)

    with open(teams_csv) as f:
        data = list(csv.DictReader(f))

        entries = []

        for row in data:
            if not row["Timestamp"] or not row["Enter your Name"]:
                continue

            team = team_from_csv(row)
            valid_team = is_valid_team(team)
            fantasy_score = score(team, stats) if valid_team else 0
            entry = {
                "name": row["Enter your Name"].strip(),
                "valid_team": valid_team,
                "fantasy_score": fantasy_score,
                "timestamp": row["Timestamp"],
                "team_slugs": generate_slugs(team),
                "is_perfect": False,
            }
            entries.append(entry)

    t = perfect_team(stats_data)
    perfect = {
        "name": "Perfect 8",
        "valid_team": True,
        "fantasy_score": score(t, stats),
        "timestamp": "now",
        "team_slugs": generate_slugs(t),
        "is_perfect": True,
    }
    entries.append(perfect)
    entries = sorted(
        entries, key=lambda x: (-x["fantasy_score"], -x["valid_team"], x["name"])
    )
    with open(os.path.join(DATA_DIR, "fantasy_scores.json"), "w") as f:
        json.dump(entries, f, indent=2)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("teams", help="Path to CSV containing fantasy league teams")
    parser.add_argument("stats", help="Path to JSON containing stats data")

    args = parser.parse_args()
    main(args.teams, args.stats)
