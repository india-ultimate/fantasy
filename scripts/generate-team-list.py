import csv
import json
import io
from pathlib import Path

ROOT_DIR = Path(__file__).parent.parent.absolute()
DATA_DIR = ROOT_DIR.joinpath("data")

COLUMNS = [
    "assist",
    "goal",
    "defense",
    "drop",
    "throwaway",
    "o-line",
    "d-line",
    "o-scoring-line",
    "d-scoring-line",
]


def make_row(player, opponent, day):
    return [player["jersey"], player["name"], day, player["team"], opponent] + (
        [""] * (len(COLUMNS))
    )


def main(team, opponent, day, players):
    players = [player for player in players if player["team"] == team]
    female = sorted(
        [player for player in players if player["gender"] == "female"],
        key=lambda x: x["name"],
    )
    male = sorted(
        [player for player in players if player["gender"] == "male"],
        key=lambda x: x["name"],
    )
    f = io.StringIO()
    writer = csv.writer(f)
    headers = ["jersey", "name", "day", "team", "opponent"] + COLUMNS
    rows = (
        [headers]
        + [make_row(p, opponent, day) for p in female]
        + [make_row(p, opponent, day) for p in male]
    )
    writer.writerows(rows)
    print(f.getvalue())


if __name__ == "__main__":
    import argparse

    with open(DATA_DIR.joinpath("teams.json")) as f:
        players = json.load(f)
    teams = {p["team"] for p in players}

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "team", help="Name of the team for which to generate list", choices=teams
    )
    parser.add_argument("opponent", help="Name of the opponent team", choices=teams)
    parser.add_argument(
        "--day", help="Day of the tournament", choices=[1, 2], default=1
    )
    args = parser.parse_args()
    day = f"day-{args.day}"
    main(args.team, args.opponent, day, players)
