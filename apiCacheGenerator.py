import requests
import json
import os
from dotenv import load_dotenv

# Load local environment values and get the API URL
load_dotenv(".env.local")
BASE_URL = os.getenv("VUE_APP_API_URL")

PRESET_DATA = {
    "/get_backups" : {
        "backups": {
            "Server Backups": [
                {
                    "backup_name": "Example Server Backup",
                    "backup_direction": "down",
                    "peer_device": "Example Server",
                    "schedule": "Daily, 0:00 AM",
                    "status": "good",
                    "source_path": "\\\\127.0.0.1\\ExampleServer",
                    "destination_path": "C:\\Example_server_backup",
                    "last_success_time_since": "18h 34min",
                    "time_until_next": "5h 26min"
                }
            ],
            "Example Client-Side Backups": [
                {
                    "backup_name": "Example files laptop",
                    "backup_direction": "up",
                    "peer_device": "Example laptop",
                    "schedule": "Daily, 10:00 AM",
                    "status": "warning",
                    "source_path": "C:\\example\\path\\to\\data",
                    "destination_path": "\\\\127.0.0.1\\example\\path",
                    "last_success_time_since": "29h 20min",
                    "time_until_next": "4h 40min"
                },
                {
                    "backup_name": "Example files desktop",
                    "backup_direction": "up",
                    "peer_device": "Example desktop",
                    "schedule": "Daily, 10:00 AM",
                    "status": "good",
                    "source_path": "C:\\example\\path\\to\\data",
                    "destination_path": "\\\\127.0.0.1\\example\\path",
                    "last_success_time_since": "5h 21min",
                    "time_until_next": "4h 39min"
                }
            ],
            "Server-Side Backups": [
                {
                    "backup_name": "Example database backup",
                    "backup_direction": "up",
                    "peer_device": "Database Server",
                    "schedule": "Daily, 0:00 AM",
                    "status": "good",
                    "source_path": "Database dump",
                    "destination_path": "\\\\127.0.0.1\\example\\path",
                    "last_success_time_since": "18h 19min",
                    "time_until_next": "5h 40min"
                },
                {
                    "backup_name": "Example server www backup",
                    "backup_direction": "up",
                    "peer_device": "Webserver",
                    "schedule": "Daily, 0:00 AM",
                    "status": "bad",
                    "source_path": "\\example\\path\\to\\www",
                    "destination_path": "\\\\127.0.0.1\\example\\path",
                    "last_success_time_since": "66h 19min",
                    "time_until_next": "5h 40min"
                }
            ]
        }
    },
    "/get_server_drives_info": [
        {
            "name": "Boot drive",
            "total": 64_000_000_000,
            "used": 32_000_000_000,
            "free": 32_000_000_000
        },
        {
            "name": "Mass storage drive 1",
            "total": 1_024_000_000_000,
            "used": 972_800_000_000,
            "free": 51_200_000_000
        },
        {
            "name": "Mass storage drive 2",
            "total": 1_024_000_000_000,
            "used": 200_000_000_000,
            "free": 824_000_000_000
        }
    ]
}

# The endpoints that I want to store the responses from
ENDPOINTS = [
    "/get_backups",
    "/get_server_drives_info",
    "/get_server_resource_logs?timeframe=1h",
    "/get_fastapi_request_log_data?timeframe=24h",
    "/transactions/get_filters?session_key=null",
    "/transactions/get_transactions?session_key=null",
    "/transactions/get_options?session_key=null",
    "/analytics/get_general_stats?session_key=null",
    "/analytics/get_stats_for_timespan?session_key=null&timespan=month",
    "/analytics/get_stats_for_timespan?session_key=null&timespan=year",
    "/get_chart/balance_over_time?session_key=null",
    "/get_chart/sum_by_month?session_key=null",
    "/get_chart/categories_monthly?session_key=null&direction=expense",
    "/get_chart/categories_monthly?session_key=null&direction=income",
    "/watch_list/get_title_cards?title_count=12&session_key=null&sort_by=last_watched&title_type=tv&watched=false&released=true&started=true",
    "/watch_list/get_title_cards?title_count=12&session_key=null&sort_by=release_date&title_type=movie&watched=false&released=true",
    "/watch_list/get_title_cards?title_count=12&session_key=null&sort_by=release_date&title_type=tv&watched=false&released=true&started=false",
    "/watch_list/get_title_cards?title_count=12&session_key=null&sort_by=release_date&direction=asc&released=false",
    "/watch_list/get_title_cards?title_count=12&session_key=null&favourite=true",
    "/watch_list/get_title_cards?title_count=12&session_key=null&sort_by=last_watched&watched=true",
    "/watch_list/list_titles?session_key=null&sort_by=vote_average&direction=desc&offset=0&all_titles=false",
    "/watch_list/get_title_info?session_key=null&title_id=20",
    "/watch_list/get_title_info?session_key=null&title_id=27",
    "/watch_list/get_title_info?session_key=null&title_id=159",
    "/watch_list/get_title_info?session_key=null&title_id=160",
    "/watch_list/get_title_info?session_key=null&title_id=161",
    "/watch_list/get_title_info?session_key=null&title_id=199",
    "/watch_list/get_title_info?session_key=null&title_id=225",
    "/watch_list/get_title_info?session_key=null&title_id=240",
    "/watch_list/get_title_info?session_key=null&title_id=270",
    "/watch_list/get_title_info?session_key=null&title_id=272",
    "/watch_list/get_title_info?session_key=null&title_id=273",
    "/watch_list/get_title_info?session_key=null&title_id=274",
]

data = {}

# Go through the endpoints and fetch the data
for endpoint in ENDPOINTS:
    if endpoint in PRESET_DATA:
        data[endpoint] = PRESET_DATA[endpoint]  # Use preset data
    else:
        url = f"{BASE_URL}{endpoint}"
        print(f"Fetching URL: {url}")
        try:
            response = requests.get(url)
            response.raise_for_status()
            data[endpoint] = response.json()
        except requests.RequestException:
            data[endpoint] = None  # Handle failed requests gracefully

# Write to a JSON file in src/data/
with open("public/apiCache.json", "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, indent=4)

print("File created successfully!")