import cgi
import csv
import io
import json
import os
from pathlib import Path

import requests

ROOT_DIR = Path(__file__).parent.parent.absolute()
DATA_DIR = ROOT_DIR.joinpath("data")
UPAI_BASE_URL = "https://upai.usetopscore.com"


def get_fantasy_teams_csv(sheet_id):
    print("Downloading Fantasy Teams from Google Spreadsheet")
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"
    response = requests.get(url)
    path = DATA_DIR.joinpath("fantasy_teams.csv")
    with open(path, "w") as f:
        f.write(response.text)
    return path


def get_player_stats(sheet_id, sheet_name):
    print(f"Downloading Stats from '{sheet_name}' sheet in the Google Spreadsheet")
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}"
    response = requests.get(url)
    path = DATA_DIR.joinpath(f"player-stats-{sheet_name}.csv")
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


def get_topscore_access_token(client_id, client_secret, session):
    data = {
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret,
    }
    print("Fetching access token")
    response = session.post(
        "{}/api/oauth/server".format(UPAI_BASE_URL), data=data)
    if response.status_code != 200:
        print("Could not fetch access token")
        return ""

    access_token = response.json()["access_token"]
    return "Bearer {}".format(access_token)


def fetch_registration_data(event_id, client_id, client_secret):
    """Fetch registration data for the specified event."""
    url = "{}{}?event_id={}&fields[]=Person&fields[]=Team&per_page=1000&page=1".format(
        UPAI_BASE_URL, "/api/registrations", event_id
    )
    session = requests.Session()
    headers = {
        "Authorization": get_topscore_access_token(client_id, client_secret, session)
    }
    print("Fetching event registrations")
    r = session.get(url, headers=headers)
    return r.json()["result"]


def download_teams_info(sheet_id, event_id, client_id, client_secret):
    print("Downloading State Championship Teams from Google Spreadsheet")
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"
    response = requests.get(url)
    team_data = {row["id"]: row for row in csv.DictReader(
        io.StringIO(response.text))}
    registration_data = {
        person["person_id"]: person
        for person in fetch_registration_data(event_id, client_id, client_secret)
    }
    data = []
    for id_, row in team_data.items():
        if not id_:
            continue
        id_ = int(id_) if id_ else -1
        if id_ not in registration_data:
            print(row)
            continue

        person = registration_data[id_]
        first_name = row["first_name"].title().strip()
        last_name = row["last_name"].strip()
        last_name = (
            last_name.title()
            if last_name not in {"AP", "JMP", "GK"}
            else last_name.upper()
        )
        player = {
            "name": f"{first_name} {last_name}",
            "gender": person["Person"]["gender"],
            "jersey": row["uniform_number"],
            "photo": person["Person"]["images"]["280"],
            "team": person["Team"]["name"].title(),
            "ucID": id_,
        }
        data.append(player)

    for id_, person in registration_data.items():
        if str(id_) not in team_data:
            if "player" in person.get("roles", []):
                first_name = person["Person"]["first_name"].strip()
                last_name = person["Person"]["last_name"]
                player_info = {
                    "name": f"{first_name} {last_name}",
                    "gender": person["Person"]["gender"],
                    "jersey": "",
                    "photo": person["Person"]["images"]["280"],
                    "team": person["Team"]["name"].title(),
                    "ucID": id_,
                }
                data.append(player_info)

    # Add couple of missing players
    hannah = {
        "name": "Hannah Deborah",
        "gender": "female",
        "jersey": "",
        "photo": "https://d36m266ykvepgv.cloudfront.net/uploads/person/PWnDrAUK.280.jpg",
        "team": "Tamilnadu",
        "ucID": 1033257,
    }
    mirra = {
        "name": "Mirra",
        "gender": "female",
        "jersey": "",
        "photo": "",
        "team": "Tamilnadu",
        "ucID": 0,
    }
    data.extend([hannah, mirra])

    print(f"Saving data for {len(data)} players...")

    with open(DATA_DIR.joinpath("teams.json"), "w") as f:
        json.dump(
            sorted(data, key=lambda x: x["ucID"]),
            f,
            indent=2,
            sort_keys=True,
        )


def main():
    sheet_id = os.environ["GOOGLE_SHEET_ID"]
    get_fantasy_teams_csv(sheet_id)

    sheet_id = os.environ["STATS_SHEET_ID"]
    get_player_stats(sheet_id, "Pool-A")
    get_player_stats(sheet_id, "Pool-B")
    get_player_stats(sheet_id, "Brackets")

    sheet_id = os.environ["PLAYERS_SHEET_ID"]
    event_id = "152238"
    client_id = os.environ["UPAI_CLIENT_ID"]
    client_secret = os.environ["UPAI_CLIENT_SECRET"]
    download_teams_info(sheet_id, event_id, client_id, client_secret)


if __name__ == "__main__":
    main()
