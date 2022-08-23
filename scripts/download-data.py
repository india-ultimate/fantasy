import os
from pathlib import Path

import requests

ROOT_DIR = Path(__file__).parent.parent.absolute()
DATA_DIR = ROOT_DIR.joinpath("data")


def get_fantasy_teams_csv(sheet_id):
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"
    response = requests.get(url)
    path = DATA_DIR.joinpath("fantasy_teams.csv")
    with open(path, "w") as f:
        f.write(response.text)
    return path


def main():
    sheet_id = os.environ["GOOGLE_SHEET_ID"]
    get_fantasy_teams_csv(sheet_id)


if __name__ == "__main__":
    main()
    pass
