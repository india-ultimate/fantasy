#!/bin/bash

python scripts/download-data.py
python scripts/player_stats.py
python scripts/fantasy-scores.py data/fantasy_teams.csv data/players.json
git config user.email "noreply@indiaultimate.org"
git config user.name "India Ultimate GitHub Bot"
git add data/
git commit -m "Auto update data for the website"
git push origin main
