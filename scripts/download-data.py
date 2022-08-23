import cgi
import os
from pathlib import Path

import requests

ROOT_DIR = Path(__file__).parent.parent.absolute()
DATA_DIR = ROOT_DIR.joinpath("data")


def get_fantasy_teams_csv(sheet_id):
    print("Downloading Fantasy Teams from Google Spreadsheet")
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"
    response = requests.get(url)
    path = DATA_DIR.joinpath("fantasy_teams.csv")
    with open(path, "w") as f:
        f.write(response.text)
    return path


def get_stats_csvs(team_ids):
    # Delete all existsing stats files. Useful to remove old stats files for
    # teams removed from the team_ids list.
    for path in DATA_DIR.glob("*stats*.csv"):
        path.unlink()

    session = requests.session()

    for team_id in team_ids:
        url = f"https://www.ultianalytics.com/rest/view/team/{team_id}/stats/export"
        print(f"Downloading data from {url}")
        response = session.get(url)
        header = response.headers.get("Content-Disposition", "")
        _, headers = cgi.parse_header(header)
        filename = headers.get("filename", "")
        name, ext = os.path.splitext(filename)
        # FIXME: May need to add spaces in team names to match with actual names
        filename = f"{name}-{team_id}{ext}"
        with open(DATA_DIR.joinpath(filename), "w") as f:
            f.write(response.text)


def main():
    sheet_id = os.environ["GOOGLE_SHEET_ID"]
    get_fantasy_teams_csv(sheet_id)

    team_ids = os.environ["ULTI_ANALYTICS_TEAM_IDS"].split()
    get_stats_csvs(team_ids)


if __name__ == "__main__":
    main()
    pass
