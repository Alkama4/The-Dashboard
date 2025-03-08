// Here a fake response is stored for each and every endpoint call that the app can make
// Most of them are just 'this isn't supported' responses, but some contain fake data.

// IMPORTANT! Only the "data" part of the request is stored here since that's all the the getData and postData methods return.

export const STATIC_CONTENT = {

    // - - - - - HOME PAGE - - - - - 
    '/get_backups{}': {
        "backups": {
            "Server Backups": [
                {
                    "backup_name": "Main Server Backup",
                    "backup_direction": "down",
                    "peer_device": "Main Server",
                    "schedule": "Daily, 0:00 AM",
                    "status": "good",
                    "source_path": "\\\\127.0.0.1\\MainServer",
                    "destination_path": "C:\\Server_Backup",
                    "last_success_time_since": "18h 34min",
                    "time_until_next": "5h 26min"
                }
            ],
            "Client-Side Backups": [
                {
                    "backup_name": "Project Files",
                    "backup_direction": "up",
                    "peer_device": "Project PC",
                    "schedule": "Daily, 10:00 AM",
                    "status": "warning",
                    "source_path": "C:\\Users\\User\\Documents\\Projects",
                    "destination_path": "\\\\127.0.0.1\\MainServer\\Backup\\Projects\\",
                    "last_success_time_since": "29h 20min",
                    "time_until_next": "4h 40min"
                },
                {
                    "backup_name": "Game Clips",
                    "backup_direction": "up",
                    "peer_device": "Gaming PC",
                    "schedule": "Daily, 10:00 AM",
                    "status": "good",
                    "source_path": "C:\\Users\\User\\Videos\\GameClips",
                    "destination_path": "\\\\127.0.0.1\\MainServer\\Backup\\Media\\Game Clips\\",
                    "last_success_time_since": "5h 21min",
                    "time_until_next": "4h 39min"
                }
            ],
            "Server-Side Backups": [
                {
                    "backup_name": "Database Backup",
                    "backup_direction": "up",
                    "peer_device": "Database Server",
                    "schedule": "Daily, 0:00 AM",
                    "status": "good",
                    "source_path": "mysqldump",
                    "destination_path": "\\\\127.0.0.1\\MainServer\\Backup\\mysql_backup",
                    "last_success_time_since": "18h 19min",
                    "time_until_next": "5h 40min"
                },
                {
                    "backup_name": "API Server Files",
                    "backup_direction": "up",
                    "peer_device": "Webserver",
                    "schedule": "Daily, 0:00 AM",
                    "status": "bad",
                    "source_path": "server root",
                    "destination_path": "\\\\127.0.0.1\\MainServer\\Backup\\api_server_backup",
                    "last_success_time_since": "66h 19min",
                    "time_until_next": "5h 40min"
                }
            ]
        }
    },

    '/get_server_drives_info{}': [
        {
            "name": "Boot drive",
            "total": 137438953472,
            "used": 29108864000,
            "free": 108330089472
        },
        {
            "name": "Mass storage drive",
            "total": 3936818806784,
            "used": 3200000000000,
            "free": 737018806784
        },
        {
            "name": "Mass storage drive 2",
            "total": 3936818806784,
            "used": 3822030000000,
            "free": 115788806784
        }
    ],

    // Vois vaihtaa joskus ku ei oo rakoja datassa
    '/get_server_resource_logs{"timeframe":"24h"}': {
        "data": [
        {
            "cpu_temperature": 46.9667,
            "cpu_usage": 2.51833,
            "ram_usage": 35.8,
            "system_load": 0.154785,
            "network_sent_bytes": 156389719951,
            "network_recv_bytes": 13903804515,
            "timestamp": "2025-03-06T22:20:00"
        },
        {
            "cpu_temperature": 47.0167,
            "cpu_usage": 4.775,
            "ram_usage": 35.7,
            "system_load": 0.491699,
            "network_sent_bytes": 156390338150,
            "network_recv_bytes": 13904450695,
            "timestamp": "2025-03-06T22:21:00"
        },
        {
            "cpu_temperature": 48,
            "cpu_usage": 5.375,
            "ram_usage": 35.7,
            "system_load": 0.386719,
            "network_sent_bytes": 156391379329,
            "network_recv_bytes": 13905761030,
            "timestamp": "2025-03-06T22:22:00"
        },
        {
            "cpu_temperature": 47.0167,
            "cpu_usage": 1.20167,
            "ram_usage": 35.7,
            "system_load": 0.310059,
            "network_sent_bytes": 156391412488,
            "network_recv_bytes": 13905793763,
            "timestamp": "2025-03-06T22:23:00"
        },
        {
            "cpu_temperature": 47.145,
            "cpu_usage": 5.69833,
            "ram_usage": 35.7,
            "system_load": 0.760742,
            "network_sent_bytes": 156392420940,
            "network_recv_bytes": 13907088007,
            "timestamp": "2025-03-06T22:24:00"
        },
        {
            "cpu_temperature": 47.9283,
            "cpu_usage": 4.215,
            "ram_usage": 35.8,
            "system_load": 0.277832,
            "network_sent_bytes": 156393219559,
            "network_recv_bytes": 13907999598,
            "timestamp": "2025-03-06T22:25:00"
        },
        {
            "cpu_temperature": 48.6683,
            "cpu_usage": 7.79167,
            "ram_usage": 35.8,
            "system_load": 0.475586,
            "network_sent_bytes": 156397695955,
            "network_recv_bytes": 13915015918,
            "timestamp": "2025-03-06T22:26:00"
        },
        {
            "cpu_temperature": 47.8967,
            "cpu_usage": 6.535,
            "ram_usage": 35.8,
            "system_load": 0.579102,
            "network_sent_bytes": 156398571619,
            "network_recv_bytes": 13915951452,
            "timestamp": "2025-03-06T22:27:00"
        },
        {
            "cpu_temperature": 47.6133,
            "cpu_usage": 3.75167,
            "ram_usage": 35.8,
            "system_load": 0.291992,
            "network_sent_bytes": 156399016639,
            "network_recv_bytes": 13916426974,
            "timestamp": "2025-03-06T22:28:00"
        },
        {
            "cpu_temperature": 46.975,
            "cpu_usage": 2.585,
            "ram_usage": 35.8,
            "system_load": 0.82959,
            "network_sent_bytes": 156399259848,
            "network_recv_bytes": 13916684905,
            "timestamp": "2025-03-06T22:29:00"
        },
        {
            "cpu_temperature": 46.94,
            "cpu_usage": 2.47,
            "ram_usage": 35.7,
            "system_load": 0.351562,
            "network_sent_bytes": 156399506618,
            "network_recv_bytes": 13916946189,
            "timestamp": "2025-03-06T22:30:00"
        },
        {
            "cpu_temperature": 46.225,
            "cpu_usage": 1.17167,
            "ram_usage": 35.7,
            "system_load": 0.259277,
            "network_sent_bytes": 156399555910,
            "network_recv_bytes": 13917001383,
            "timestamp": "2025-03-06T22:31:00"
        },
        {
            "cpu_temperature": 46.425,
            "cpu_usage": 5.21833,
            "ram_usage": 35.7,
            "system_load": 0.733887,
            "network_sent_bytes": 156400201761,
            "network_recv_bytes": 13917693663,
            "timestamp": "2025-03-06T22:32:00"
        },
        {
            "cpu_temperature": 47.4683,
            "cpu_usage": 4.03,
            "ram_usage": 35.6,
            "system_load": 0.373535,
            "network_sent_bytes": 156400919694,
            "network_recv_bytes": 13918512777,
            "timestamp": "2025-03-06T22:33:00"
        },
        {
            "cpu_temperature": 46.485,
            "cpu_usage": 1.24167,
            "ram_usage": 35.7,
            "system_load": 0.297852,
            "network_sent_bytes": 156400955793,
            "network_recv_bytes": 13918548615,
            "timestamp": "2025-03-06T22:34:00"
        },
        {
            "cpu_temperature": 46.43,
            "cpu_usage": 2.35,
            "ram_usage": 35.5,
            "system_load": 0.27002,
            "network_sent_bytes": 156401284378,
            "network_recv_bytes": 13918918400,
            "timestamp": "2025-03-06T22:35:00"
        },
        {
            "cpu_temperature": 46.2083,
            "cpu_usage": 1.12333,
            "ram_usage": 35.7,
            "system_load": 0.178223,
            "network_sent_bytes": 156401326410,
            "network_recv_bytes": 13918961816,
            "timestamp": "2025-03-06T22:36:00"
        },
        {
            "cpu_temperature": 46.015,
            "cpu_usage": 1.14833,
            "ram_usage": 35.7,
            "system_load": 0.212891,
            "network_sent_bytes": 156401378644,
            "network_recv_bytes": 13919013873,
            "timestamp": "2025-03-06T22:37:00"
        },
        {
            "cpu_temperature": 45.8433,
            "cpu_usage": 1.10667,
            "ram_usage": 35.7,
            "system_load": 0.0766602,
            "network_sent_bytes": 156401413726,
            "network_recv_bytes": 13919048692,
            "timestamp": "2025-03-06T22:38:00"
        },
        {
            "cpu_temperature": 46.4,
            "cpu_usage": 4.15,
            "ram_usage": 35.7,
            "system_load": 0.158203,
            "network_sent_bytes": 156401920771,
            "network_recv_bytes": 13919593138,
            "timestamp": "2025-03-06T22:39:00"
        },
        {
            "cpu_temperature": 46.5017,
            "cpu_usage": 5.65667,
            "ram_usage": 35.7,
            "system_load": 0.135742,
            "network_sent_bytes": 156402713232,
            "network_recv_bytes": 13920444246,
            "timestamp": "2025-03-06T22:40:00"
        },
        {
            "cpu_temperature": 46.585,
            "cpu_usage": 1.18667,
            "ram_usage": 35.4,
            "system_load": 0.0473633,
            "network_sent_bytes": 156402779623,
            "network_recv_bytes": 13920518927,
            "timestamp": "2025-03-06T22:41:00"
        },
        {
            "cpu_temperature": 47.6683,
            "cpu_usage": 8.90667,
            "ram_usage": 35.7,
            "system_load": 0.210449,
            "network_sent_bytes": 156404051973,
            "network_recv_bytes": 13921897088,
            "timestamp": "2025-03-06T22:42:00"
        },
        {
            "cpu_temperature": 48.0833,
            "cpu_usage": 9.135,
            "ram_usage": 35.5,
            "system_load": 0.364258,
            "network_sent_bytes": 156405334723,
            "network_recv_bytes": 13923269361,
            "timestamp": "2025-03-06T22:43:00"
        },
        {
            "cpu_temperature": 47.7383,
            "cpu_usage": 4.01167,
            "ram_usage": 35.7,
            "system_load": 0.351562,
            "network_sent_bytes": 156405816879,
            "network_recv_bytes": 13923781597,
            "timestamp": "2025-03-06T22:44:00"
        },
        {
            "cpu_temperature": 47.4233,
            "cpu_usage": 6.30833,
            "ram_usage": 35.7,
            "system_load": 0.487793,
            "network_sent_bytes": 156406687060,
            "network_recv_bytes": 13924710948,
            "timestamp": "2025-03-06T22:45:00"
        },
        {
            "cpu_temperature": 48.585,
            "cpu_usage": 9.42833,
            "ram_usage": 35.7,
            "system_load": 0.445312,
            "network_sent_bytes": 156408155012,
            "network_recv_bytes": 13926294761,
            "timestamp": "2025-03-06T22:46:00"
        },
        {
            "cpu_temperature": 47.4283,
            "cpu_usage": 1.41667,
            "ram_usage": 35.7,
            "system_load": 0.292969,
            "network_sent_bytes": 156409708745,
            "network_recv_bytes": 13936655249,
            "timestamp": "2025-03-06T22:47:00"
        },
        {
            "cpu_temperature": 49.3583,
            "cpu_usage": 14.4517,
            "ram_usage": 36.2,
            "system_load": 0.526855,
            "network_sent_bytes": 156421479906,
            "network_recv_bytes": 13954132271,
            "timestamp": "2025-03-06T22:48:00"
        },
        {
            "cpu_temperature": 48.48,
            "cpu_usage": 3.98667,
            "ram_usage": 36.6,
            "system_load": 0.249023,
            "network_sent_bytes": 156431164424,
            "network_recv_bytes": 13967832920,
            "timestamp": "2025-03-06T22:49:00"
        },
        {
            "cpu_temperature": 48.3283,
            "cpu_usage": 4.97,
            "ram_usage": 36.6,
            "system_load": 0.378418,
            "network_sent_bytes": 156433087410,
            "network_recv_bytes": 13970333128,
            "timestamp": "2025-03-06T22:50:00"
        },
        {
            "cpu_temperature": 49.17,
            "cpu_usage": 12.4383,
            "ram_usage": 36.5,
            "system_load": 0.97998,
            "network_sent_bytes": 156437952062,
            "network_recv_bytes": 13977722979,
            "timestamp": "2025-03-06T22:51:00"
        },
        {
            "cpu_temperature": 49.3683,
            "cpu_usage": 7.13,
            "ram_usage": 36.6,
            "system_load": 0.599121,
            "network_sent_bytes": 156439028106,
            "network_recv_bytes": 13978909782,
            "timestamp": "2025-03-06T22:52:00"
        },
        {
            "cpu_temperature": 47.955,
            "cpu_usage": 2.79333,
            "ram_usage": 36.5,
            "system_load": 0.490234,
            "network_sent_bytes": 156441025475,
            "network_recv_bytes": 13982430810,
            "timestamp": "2025-03-06T22:53:00"
        },
        {
            "cpu_temperature": 48.5867,
            "cpu_usage": 9.975,
            "ram_usage": 36.5,
            "system_load": 0.578613,
            "network_sent_bytes": 156451372496,
            "network_recv_bytes": 14001002384,
            "timestamp": "2025-03-06T22:54:00"
        },
        {
            "cpu_temperature": 48.9467,
            "cpu_usage": 6.83,
            "ram_usage": 36.6,
            "system_load": 0.251953,
            "network_sent_bytes": 156452205534,
            "network_recv_bytes": 14001866741,
            "timestamp": "2025-03-06T22:55:00"
        },
        {
            "cpu_temperature": 47.455,
            "cpu_usage": 1.16,
            "ram_usage": 36.5,
            "system_load": 0.408203,
            "network_sent_bytes": 156452240807,
            "network_recv_bytes": 14001906572,
            "timestamp": "2025-03-06T22:56:00"
        },
        {
            "cpu_temperature": 47.6217,
            "cpu_usage": 5.61333,
            "ram_usage": 36.2,
            "system_load": 0.470215,
            "network_sent_bytes": 156455299317,
            "network_recv_bytes": 14007103413,
            "timestamp": "2025-03-06T22:57:00"
        },
        {
            "cpu_temperature": 47.6467,
            "cpu_usage": 2.98333,
            "ram_usage": 36.6,
            "system_load": 0.23877,
            "network_sent_bytes": 156457642438,
            "network_recv_bytes": 14011250630,
            "timestamp": "2025-03-06T22:58:00"
        },
        {
            "cpu_temperature": 47.355,
            "cpu_usage": 3.76333,
            "ram_usage": 36.4,
            "system_load": 0.317383,
            "network_sent_bytes": 156460108302,
            "network_recv_bytes": 14015606300,
            "timestamp": "2025-03-06T22:59:00"
        },
        {
            "cpu_temperature": 46.9233,
            "cpu_usage": 1.53,
            "ram_usage": 36.8,
            "system_load": 0.114258,
            "network_sent_bytes": 156460195688,
            "network_recv_bytes": 14015692183,
            "timestamp": "2025-03-06T23:00:00"
        },
        {
            "cpu_temperature": 47.375,
            "cpu_usage": 7.75833,
            "ram_usage": 36.3,
            "system_load": 0.681152,
            "network_sent_bytes": 156461259584,
            "network_recv_bytes": 14016834836,
            "timestamp": "2025-03-06T23:01:00"
        },
        {
            "cpu_temperature": 48.085,
            "cpu_usage": 6.33833,
            "ram_usage": 36.7,
            "system_load": 0.376465,
            "network_sent_bytes": 156462119396,
            "network_recv_bytes": 14017754522,
            "timestamp": "2025-03-06T23:02:00"
        },
        {
            "cpu_temperature": 47.47,
            "cpu_usage": 3.69333,
            "ram_usage": 36.3,
            "system_load": 0.296875,
            "network_sent_bytes": 156462570871,
            "network_recv_bytes": 14018234681,
            "timestamp": "2025-03-06T23:03:00"
        },
        {
            "cpu_temperature": 47.4083,
            "cpu_usage": 3.73333,
            "ram_usage": 36.6,
            "system_load": 0.834961,
            "network_sent_bytes": 156463025014,
            "network_recv_bytes": 14018718278,
            "timestamp": "2025-03-06T23:04:00"
        },
        {
            "cpu_temperature": 47.6517,
            "cpu_usage": 5.05167,
            "ram_usage": 36.4,
            "system_load": 0.432617,
            "network_sent_bytes": 156463696274,
            "network_recv_bytes": 14019435114,
            "timestamp": "2025-03-06T23:05:00"
        },
        {
            "cpu_temperature": 47,
            "cpu_usage": 2.25,
            "ram_usage": 36.7,
            "system_load": 0.465332,
            "network_sent_bytes": 156464260278,
            "network_recv_bytes": 14020389884,
            "timestamp": "2025-03-06T23:06:00"
        },
        {
            "cpu_temperature": 46.8167,
            "cpu_usage": 1.14833,
            "ram_usage": 36.3,
            "system_load": 0.348633,
            "network_sent_bytes": 156465769956,
            "network_recv_bytes": 14030679863,
            "timestamp": "2025-03-06T23:07:00"
        },
        {
            "cpu_temperature": 47.5783,
            "cpu_usage": 4.69333,
            "ram_usage": 37.5,
            "system_load": 0.125977,
            "network_sent_bytes": 156469652494,
            "network_recv_bytes": 14036999169,
            "timestamp": "2025-03-06T23:08:00"
        },
        {
            "cpu_temperature": 46.875,
            "cpu_usage": 1.25833,
            "ram_usage": 37.1,
            "system_load": 0.236816,
            "network_sent_bytes": 156469702148,
            "network_recv_bytes": 14037047428,
            "timestamp": "2025-03-06T23:09:00"
        },
        {
            "cpu_temperature": 46.475,
            "cpu_usage": 1.06333,
            "ram_usage": 37.5,
            "system_load": 0.243652,
            "network_sent_bytes": 156469788062,
            "network_recv_bytes": 14037137334,
            "timestamp": "2025-03-06T23:10:00"
        },
        {
            "cpu_temperature": 46.3533,
            "cpu_usage": 1.09833,
            "ram_usage": 37.2,
            "system_load": 0.0874023,
            "network_sent_bytes": 156469819547,
            "network_recv_bytes": 14037168955,
            "timestamp": "2025-03-06T23:11:00"
        },
        {
            "cpu_temperature": 46.0517,
            "cpu_usage": 1.06,
            "ram_usage": 37.6,
            "system_load": 0.241211,
            "network_sent_bytes": 156469909198,
            "network_recv_bytes": 14037254824,
            "timestamp": "2025-03-06T23:12:00"
        },
        {
            "cpu_temperature": 45.93,
            "cpu_usage": 1.075,
            "ram_usage": 37.3,
            "system_load": 0.0869141,
            "network_sent_bytes": 156469941553,
            "network_recv_bytes": 14037287467,
            "timestamp": "2025-03-06T23:13:00"
        },
        {
            "cpu_temperature": 45.985,
            "cpu_usage": 1.07167,
            "ram_usage": 37.4,
            "system_load": 0.178223,
            "network_sent_bytes": 156469966874,
            "network_recv_bytes": 14037311963,
            "timestamp": "2025-03-06T23:14:00"
        },
        {
            "cpu_temperature": 45.8783,
            "cpu_usage": 1.15333,
            "ram_usage": 37.3,
            "system_load": 0.137207,
            "network_sent_bytes": 156469999726,
            "network_recv_bytes": 14037344324,
            "timestamp": "2025-03-06T23:15:00"
        },
        {
            "cpu_temperature": 45.8283,
            "cpu_usage": 1.03667,
            "ram_usage": 37.5,
            "system_load": 0.0834961,
            "network_sent_bytes": 156470031628,
            "network_recv_bytes": 14037378715,
            "timestamp": "2025-03-06T23:16:00"
        },
        {
            "cpu_temperature": 45.785,
            "cpu_usage": 1.17833,
            "ram_usage": 37.4,
            "system_load": 0.220703,
            "network_sent_bytes": 156470069676,
            "network_recv_bytes": 14037416384,
            "timestamp": "2025-03-06T23:17:00"
        },
        {
            "cpu_temperature": 45.78,
            "cpu_usage": 1.11833,
            "ram_usage": 37.5,
            "system_load": 0.246094,
            "network_sent_bytes": 156470094080,
            "network_recv_bytes": 14037440833,
            "timestamp": "2025-03-06T23:18:00"
        },
        {
            "cpu_temperature": 45.92,
            "cpu_usage": 1.22667,
            "ram_usage": 37.4,
            "system_load": 0.0878906,
            "network_sent_bytes": 156470129432,
            "network_recv_bytes": 14037475969,
            "timestamp": "2025-03-06T23:19:00"
        },
        {
            "cpu_temperature": 45.9167,
            "cpu_usage": 1.13667,
            "ram_usage": 37.6,
            "system_load": 0.322266,
            "network_sent_bytes": 156470163652,
            "network_recv_bytes": 14037508887,
            "timestamp": "2025-03-06T23:20:00"
        },
        {
            "cpu_temperature": 45.6683,
            "cpu_usage": 1.06,
            "ram_usage": 37.2,
            "system_load": 0.117188,
            "network_sent_bytes": 156470205544,
            "network_recv_bytes": 14037561060,
            "timestamp": "2025-03-06T23:21:00"
        },
        {
            "cpu_temperature": 45.6733,
            "cpu_usage": 1.05333,
            "ram_usage": 37.6,
            "system_load": 0.166016,
            "network_sent_bytes": 156470234314,
            "network_recv_bytes": 14037589244,
            "timestamp": "2025-03-06T23:22:00"
        },
        {
            "cpu_temperature": 45.6883,
            "cpu_usage": 1.04333,
            "ram_usage": 37.2,
            "system_load": 0.25293,
            "network_sent_bytes": 156470256372,
            "network_recv_bytes": 14037610038,
            "timestamp": "2025-03-06T23:23:00"
        },
        {
            "cpu_temperature": 45.7633,
            "cpu_usage": 1.04167,
            "ram_usage": 37.5,
            "system_load": 0.0908203,
            "network_sent_bytes": 156470289811,
            "network_recv_bytes": 14037637799,
            "timestamp": "2025-03-06T23:24:00"
        },
        {
            "cpu_temperature": 45.6633,
            "cpu_usage": 1.21833,
            "ram_usage": 37.3,
            "system_load": 0.466797,
            "network_sent_bytes": 156470431986,
            "network_recv_bytes": 14037788404,
            "timestamp": "2025-03-06T23:25:00"
        },
        {
            "cpu_temperature": 45.6633,
            "cpu_usage": 1.14833,
            "ram_usage": 37.5,
            "system_load": 0.256836,
            "network_sent_bytes": 156470476740,
            "network_recv_bytes": 14037837655,
            "timestamp": "2025-03-06T23:26:00"
        },
        {
            "cpu_temperature": 45.64,
            "cpu_usage": 1.21833,
            "ram_usage": 37.4,
            "system_load": 0.172852,
            "network_sent_bytes": 156470503809,
            "network_recv_bytes": 14037867134,
            "timestamp": "2025-03-06T23:27:00"
        },
        {
            "cpu_temperature": 45.6367,
            "cpu_usage": 1.11167,
            "ram_usage": 37.5,
            "system_load": 0.381836,
            "network_sent_bytes": 156470538495,
            "network_recv_bytes": 14037902718,
            "timestamp": "2025-03-06T23:28:00"
        },
        {
            "cpu_temperature": 45.73,
            "cpu_usage": 1.175,
            "ram_usage": 37.6,
            "system_load": 0.288574,
            "network_sent_bytes": 156470570510,
            "network_recv_bytes": 14037937579,
            "timestamp": "2025-03-06T23:29:00"
        },
        {
            "cpu_temperature": 45.6933,
            "cpu_usage": 1.19333,
            "ram_usage": 37.6,
            "system_load": 0.184082,
            "network_sent_bytes": 156470612412,
            "network_recv_bytes": 14037980965,
            "timestamp": "2025-03-06T23:30:00"
        },
        {
            "cpu_temperature": 45.69,
            "cpu_usage": 1.19,
            "ram_usage": 37.6,
            "system_load": 0.34082,
            "network_sent_bytes": 156470645081,
            "network_recv_bytes": 14038017928,
            "timestamp": "2025-03-06T23:31:00"
        },
        {
            "cpu_temperature": 45.6233,
            "cpu_usage": 1.21333,
            "ram_usage": 37.6,
            "system_load": 0.123047,
            "network_sent_bytes": 156470680621,
            "network_recv_bytes": 14038052052,
            "timestamp": "2025-03-06T23:32:00"
        },
        {
            "cpu_temperature": 45.6767,
            "cpu_usage": 1.27667,
            "ram_usage": 37.5,
            "system_load": 0.227539,
            "network_sent_bytes": 156470748389,
            "network_recv_bytes": 14038123879,
            "timestamp": "2025-03-06T23:33:00"
        },
        {
            "cpu_temperature": 45.88,
            "cpu_usage": 1.20833,
            "ram_usage": 37.6,
            "system_load": 0.168457,
            "network_sent_bytes": 156470783932,
            "network_recv_bytes": 14038158392,
            "timestamp": "2025-03-06T23:34:00"
        },
        {
            "cpu_temperature": 45.7667,
            "cpu_usage": 1.18667,
            "ram_usage": 37.6,
            "system_load": 0.110352,
            "network_sent_bytes": 156470833167,
            "network_recv_bytes": 14038205981,
            "timestamp": "2025-03-06T23:35:00"
        },
        {
            "cpu_temperature": 45.8167,
            "cpu_usage": 1.19833,
            "ram_usage": 37.6,
            "system_load": 0.262695,
            "network_sent_bytes": 156470870396,
            "network_recv_bytes": 14038243886,
            "timestamp": "2025-03-06T23:36:00"
        },
        {
            "cpu_temperature": 45.8483,
            "cpu_usage": 1.15833,
            "ram_usage": 37.6,
            "system_load": 0.165039,
            "network_sent_bytes": 156470897773,
            "network_recv_bytes": 14038270541,
            "timestamp": "2025-03-06T23:37:00"
        },
        {
            "cpu_temperature": 45.7083,
            "cpu_usage": 1.14833,
            "ram_usage": 37.6,
            "system_load": 0.165039,
            "network_sent_bytes": 156470933471,
            "network_recv_bytes": 14038305558,
            "timestamp": "2025-03-06T23:38:00"
        },
        {
            "cpu_temperature": 45.5883,
            "cpu_usage": 1.29,
            "ram_usage": 37.6,
            "system_load": 0.334473,
            "network_sent_bytes": 156470962235,
            "network_recv_bytes": 14038333976,
            "timestamp": "2025-03-06T23:39:00"
        },
        {
            "cpu_temperature": 45.7317,
            "cpu_usage": 1.16333,
            "ram_usage": 37.6,
            "system_load": 0.19873,
            "network_sent_bytes": 156471003548,
            "network_recv_bytes": 14038373185,
            "timestamp": "2025-03-06T23:40:00"
        },
        {
            "cpu_temperature": 45.5933,
            "cpu_usage": 1.105,
            "ram_usage": 37.3,
            "system_load": 0.13916,
            "network_sent_bytes": 156471036503,
            "network_recv_bytes": 14038410068,
            "timestamp": "2025-03-06T23:41:00"
        },
        {
            "cpu_temperature": 45.645,
            "cpu_usage": 1.10333,
            "ram_usage": 37.6,
            "system_load": 0.28418,
            "network_sent_bytes": 156471063961,
            "network_recv_bytes": 14038436322,
            "timestamp": "2025-03-06T23:42:00"
        },
        {
            "cpu_temperature": 45.6983,
            "cpu_usage": 1.11333,
            "ram_usage": 37.3,
            "system_load": 0.111816,
            "network_sent_bytes": 156471112770,
            "network_recv_bytes": 14038486869,
            "timestamp": "2025-03-06T23:43:00"
        },
        {
            "cpu_temperature": 45.855,
            "cpu_usage": 1.17,
            "ram_usage": 37.6,
            "system_load": 0.231445,
            "network_sent_bytes": 156471143640,
            "network_recv_bytes": 14038519843,
            "timestamp": "2025-03-06T23:44:00"
        },
        {
            "cpu_temperature": 45.66,
            "cpu_usage": 1.14667,
            "ram_usage": 37.3,
            "system_load": 0.0834961,
            "network_sent_bytes": 156471171583,
            "network_recv_bytes": 14038546693,
            "timestamp": "2025-03-06T23:45:00"
        },
        {
            "cpu_temperature": 45.63,
            "cpu_usage": 1.08167,
            "ram_usage": 37.5,
            "system_load": 0.103027,
            "network_sent_bytes": 156471195763,
            "network_recv_bytes": 14038574851,
            "timestamp": "2025-03-06T23:46:00"
        },
        {
            "cpu_temperature": 45.7433,
            "cpu_usage": 0.958333,
            "ram_usage": 37.1,
            "system_load": 0.399902,
            "network_sent_bytes": 156471217810,
            "network_recv_bytes": 14038595504,
            "timestamp": "2025-03-06T23:47:00"
        },
        {
            "cpu_temperature": 45.8,
            "cpu_usage": 1.08,
            "ram_usage": 37.4,
            "system_load": 0.14502,
            "network_sent_bytes": 156471246181,
            "network_recv_bytes": 14038618710,
            "timestamp": "2025-03-06T23:48:00"
        },
        {
            "cpu_temperature": 45.7983,
            "cpu_usage": 1.035,
            "ram_usage": 37.1,
            "system_load": 0.241699,
            "network_sent_bytes": 156471268140,
            "network_recv_bytes": 14038639453,
            "timestamp": "2025-03-06T23:49:00"
        },
        {
            "cpu_temperature": 45.715,
            "cpu_usage": 1.10167,
            "ram_usage": 37.5,
            "system_load": 0.213379,
            "network_sent_bytes": 156471300263,
            "network_recv_bytes": 14038669379,
            "timestamp": "2025-03-06T23:50:00"
        },
        {
            "cpu_temperature": 45.655,
            "cpu_usage": 1.13,
            "ram_usage": 37.5,
            "system_load": 0.176758,
            "network_sent_bytes": 156471324941,
            "network_recv_bytes": 14038698597,
            "timestamp": "2025-03-06T23:51:00"
        },
        {
            "cpu_temperature": 45.52,
            "cpu_usage": 1.11333,
            "ram_usage": 37.5,
            "system_load": 0.255371,
            "network_sent_bytes": 156471346817,
            "network_recv_bytes": 14038719197,
            "timestamp": "2025-03-06T23:52:00"
        },
        {
            "cpu_temperature": 45.5333,
            "cpu_usage": 1.13167,
            "ram_usage": 37.5,
            "system_load": 0.210449,
            "network_sent_bytes": 156471372084,
            "network_recv_bytes": 14038743170,
            "timestamp": "2025-03-06T23:53:00"
        },
        {
            "cpu_temperature": 45.36,
            "cpu_usage": 1.22333,
            "ram_usage": 37.5,
            "system_load": 0.0751953,
            "network_sent_bytes": 156471393905,
            "network_recv_bytes": 14038763763,
            "timestamp": "2025-03-06T23:54:00"
        },
        {
            "cpu_temperature": 45.3067,
            "cpu_usage": 1.18333,
            "ram_usage": 37.5,
            "system_load": 0.237793,
            "network_sent_bytes": 156471433646,
            "network_recv_bytes": 14038802039,
            "timestamp": "2025-03-06T23:55:00"
        },
        {
            "cpu_temperature": 45.345,
            "cpu_usage": 1.21,
            "ram_usage": 37.6,
            "system_load": 0.0859375,
            "network_sent_bytes": 156471491974,
            "network_recv_bytes": 14038865605,
            "timestamp": "2025-03-06T23:56:00"
        },
        {
            "cpu_temperature": 45.2867,
            "cpu_usage": 1.28667,
            "ram_usage": 37.6,
            "system_load": 0.165527,
            "network_sent_bytes": 156471519603,
            "network_recv_bytes": 14038891884,
            "timestamp": "2025-03-06T23:57:00"
        },
        {
            "cpu_temperature": 45.1333,
            "cpu_usage": 1.10833,
            "ram_usage": 37.5,
            "system_load": 0.185059,
            "network_sent_bytes": 156471542797,
            "network_recv_bytes": 14038914018,
            "timestamp": "2025-03-06T23:58:00"
        },
        {
            "cpu_temperature": 45.23,
            "cpu_usage": 1.085,
            "ram_usage": 37.1,
            "system_load": 0.0664062,
            "network_sent_bytes": 156471572219,
            "network_recv_bytes": 14038941852,
            "timestamp": "2025-03-06T23:59:00"
        },
        {
            "cpu_temperature": 45.2767,
            "cpu_usage": 1.46167,
            "ram_usage": 37.5,
            "system_load": 0.214355,
            "network_sent_bytes": 156471640635,
            "network_recv_bytes": 14039004880,
            "timestamp": "2025-03-07T00:00:00"
        },
        {
            "cpu_temperature": 45.4967,
            "cpu_usage": 1.515,
            "ram_usage": 37.5,
            "system_load": 0.114258,
            "network_sent_bytes": 156471669086,
            "network_recv_bytes": 14039039470,
            "timestamp": "2025-03-07T00:01:00"
        },
        {
            "cpu_temperature": 45.2,
            "cpu_usage": 1.18,
            "ram_usage": 37.5,
            "system_load": 0.0395508,
            "network_sent_bytes": 156471707076,
            "network_recv_bytes": 14039075537,
            "timestamp": "2025-03-07T00:02:00"
        },
        {
            "cpu_temperature": 45.3167,
            "cpu_usage": 1.16667,
            "ram_usage": 37.5,
            "system_load": 0.297852,
            "network_sent_bytes": 156471733713,
            "network_recv_bytes": 14039100906,
            "timestamp": "2025-03-07T00:03:00"
        },
        {
            "cpu_temperature": 45.29,
            "cpu_usage": 1.12667,
            "ram_usage": 37.6,
            "system_load": 0.10791,
            "network_sent_bytes": 156471759825,
            "network_recv_bytes": 14039125858,
            "timestamp": "2025-03-07T00:04:00"
        },
        {
            "cpu_temperature": 45.26,
            "cpu_usage": 1.20833,
            "ram_usage": 37.5,
            "system_load": 0.138672,
            "network_sent_bytes": 156471798747,
            "network_recv_bytes": 14039163050,
            "timestamp": "2025-03-07T00:05:00"
        },
        {
            "cpu_temperature": 45.1933,
            "cpu_usage": 1.19833,
            "ram_usage": 37.5,
            "system_load": 0.175293,
            "network_sent_bytes": 156471826639,
            "network_recv_bytes": 14039195472,
            "timestamp": "2025-03-07T00:06:00"
        },
        {
            "cpu_temperature": 45.175,
            "cpu_usage": 1.18167,
            "ram_usage": 37.4,
            "system_load": 0.0620117,
            "network_sent_bytes": 156471856331,
            "network_recv_bytes": 14039224002,
            "timestamp": "2025-03-07T00:07:00"
        },
        {
            "cpu_temperature": 44.9933,
            "cpu_usage": 1.145,
            "ram_usage": 37.5,
            "system_load": 0.212891,
            "network_sent_bytes": 156471883367,
            "network_recv_bytes": 14039249940,
            "timestamp": "2025-03-07T00:08:00"
        },
        {
            "cpu_temperature": 45.2383,
            "cpu_usage": 1.25167,
            "ram_usage": 37.6,
            "system_load": 0.163086,
            "network_sent_bytes": 156471909364,
            "network_recv_bytes": 14039274657,
            "timestamp": "2025-03-07T00:09:00"
        },
        {
            "cpu_temperature": 45.0533,
            "cpu_usage": 1.33667,
            "ram_usage": 37.5,
            "system_load": 0.125977,
            "network_sent_bytes": 156471950424,
            "network_recv_bytes": 14039314024,
            "timestamp": "2025-03-07T00:10:00"
        },
        {
            "cpu_temperature": 45.1567,
            "cpu_usage": 1.14167,
            "ram_usage": 37.5,
            "system_load": 0.415039,
            "network_sent_bytes": 156471994423,
            "network_recv_bytes": 14039362958,
            "timestamp": "2025-03-07T00:11:00"
        },
        {
            "cpu_temperature": 45.205,
            "cpu_usage": 1.06333,
            "ram_usage": 37.6,
            "system_load": 0.188477,
            "network_sent_bytes": 156472023283,
            "network_recv_bytes": 14039386660,
            "timestamp": "2025-03-07T00:12:00"
        },
        {
            "cpu_temperature": 45.1617,
            "cpu_usage": 1.15833,
            "ram_usage": 37.6,
            "system_load": 0.135254,
            "network_sent_bytes": 156472050757,
            "network_recv_bytes": 14039412904,
            "timestamp": "2025-03-07T00:13:00"
        },
        {
            "cpu_temperature": 45.1883,
            "cpu_usage": 1.205,
            "ram_usage": 37.5,
            "system_load": 0.173828,
            "network_sent_bytes": 156472078601,
            "network_recv_bytes": 14039438977,
            "timestamp": "2025-03-07T00:14:00"
        },
        {
            "cpu_temperature": 44.9583,
            "cpu_usage": 1.235,
            "ram_usage": 37.6,
            "system_load": 0.0615234,
            "network_sent_bytes": 156472121117,
            "network_recv_bytes": 14039485968,
            "timestamp": "2025-03-07T00:15:00"
        },
        {
            "cpu_temperature": 45.1583,
            "cpu_usage": 1.12,
            "ram_usage": 37.6,
            "system_load": 0.212402,
            "network_sent_bytes": 156472149141,
            "network_recv_bytes": 14039512699,
            "timestamp": "2025-03-07T00:16:00"
        },
        {
            "cpu_temperature": 45.0417,
            "cpu_usage": 0.993333,
            "ram_usage": 37.2,
            "system_load": 0.151367,
            "network_sent_bytes": 156472178084,
            "network_recv_bytes": 14039540256,
            "timestamp": "2025-03-07T00:17:00"
        },
        {
            "cpu_temperature": 45.0433,
            "cpu_usage": 1.04667,
            "ram_usage": 37.5,
            "system_load": 0.0541992,
            "network_sent_bytes": 156472203782,
            "network_recv_bytes": 14039565103,
            "timestamp": "2025-03-07T00:18:00"
        },
        {
            "cpu_temperature": 44.94,
            "cpu_usage": 1.18833,
            "ram_usage": 37,
            "system_load": 0.22998,
            "network_sent_bytes": 156472228991,
            "network_recv_bytes": 14039589044,
            "timestamp": "2025-03-07T00:19:00"
        },
        {
            "cpu_temperature": 45.0917,
            "cpu_usage": 1.005,
            "ram_usage": 37.5,
            "system_load": 0.0830078,
            "network_sent_bytes": 156472262230,
            "network_recv_bytes": 14039620651,
            "timestamp": "2025-03-07T00:20:00"
        },
        {
            "cpu_temperature": 45.1183,
            "cpu_usage": 1.15333,
            "ram_usage": 37.6,
            "system_load": 0.0966797,
            "network_sent_bytes": 156472291327,
            "network_recv_bytes": 14039654556,
            "timestamp": "2025-03-07T00:21:00"
        },
        {
            "cpu_temperature": 45.2767,
            "cpu_usage": 1.11167,
            "ram_usage": 37.5,
            "system_load": 0.160645,
            "network_sent_bytes": 156472319210,
            "network_recv_bytes": 14039681125,
            "timestamp": "2025-03-07T00:22:00"
        },
        {
            "cpu_temperature": 45.165,
            "cpu_usage": 1.15167,
            "ram_usage": 37.6,
            "system_load": 0.0561523,
            "network_sent_bytes": 156472345558,
            "network_recv_bytes": 14039706219,
            "timestamp": "2025-03-07T00:23:00"
        },
        {
            "cpu_temperature": 45.1883,
            "cpu_usage": 1.18333,
            "ram_usage": 37.5,
            "system_load": 0.210449,
            "network_sent_bytes": 156472374220,
            "network_recv_bytes": 14039733707,
            "timestamp": "2025-03-07T00:24:00"
        },
        {
            "cpu_temperature": 45.185,
            "cpu_usage": 1.2,
            "ram_usage": 37.5,
            "system_load": 0.151367,
            "network_sent_bytes": 156472406598,
            "network_recv_bytes": 14039760563,
            "timestamp": "2025-03-07T00:25:00"
        },
        {
            "cpu_temperature": 44.98,
            "cpu_usage": 1.13,
            "ram_usage": 37.3,
            "system_load": 0.123047,
            "network_sent_bytes": 156472434659,
            "network_recv_bytes": 14039792666,
            "timestamp": "2025-03-07T00:26:00"
        },
        {
            "cpu_temperature": 45.1617,
            "cpu_usage": 1.09,
            "ram_usage": 37.5,
            "system_load": 0.254883,
            "network_sent_bytes": 156472463102,
            "network_recv_bytes": 14039820077,
            "timestamp": "2025-03-07T00:27:00"
        },
        {
            "cpu_temperature": 45.1833,
            "cpu_usage": 1.10333,
            "ram_usage": 37.3,
            "system_load": 0.321289,
            "network_sent_bytes": 156472493701,
            "network_recv_bytes": 14039849250,
            "timestamp": "2025-03-07T00:28:00"
        },
        {
            "cpu_temperature": 45.1167,
            "cpu_usage": 1.22,
            "ram_usage": 37.6,
            "system_load": 0.185059,
            "network_sent_bytes": 156472556850,
            "network_recv_bytes": 14039909619,
            "timestamp": "2025-03-07T00:29:00"
        },
        {
            "cpu_temperature": 45.22,
            "cpu_usage": 1.13833,
            "ram_usage": 37.6,
            "system_load": 0.266113,
            "network_sent_bytes": 156472587307,
            "network_recv_bytes": 14039938234,
            "timestamp": "2025-03-07T00:30:00"
        },
        {
            "cpu_temperature": 45.1433,
            "cpu_usage": 1.2,
            "ram_usage": 37.7,
            "system_load": 0.0952148,
            "network_sent_bytes": 156472616122,
            "network_recv_bytes": 14039971320,
            "timestamp": "2025-03-07T00:31:00"
        },
        {
            "cpu_temperature": 45.1683,
            "cpu_usage": 1.11833,
            "ram_usage": 37.5,
            "system_load": 0.225098,
            "network_sent_bytes": 156472642333,
            "network_recv_bytes": 14039996183,
            "timestamp": "2025-03-07T00:32:00"
        },
        {
            "cpu_temperature": 45.0667,
            "cpu_usage": 1.05833,
            "ram_usage": 37.5,
            "system_load": 0.118652,
            "network_sent_bytes": 156472668241,
            "network_recv_bytes": 14040020969,
            "timestamp": "2025-03-07T00:33:00"
        },
        {
            "cpu_temperature": 45.1917,
            "cpu_usage": 1.12667,
            "ram_usage": 37.2,
            "system_load": 0.0419922,
            "network_sent_bytes": 156472695519,
            "network_recv_bytes": 14040047113,
            "timestamp": "2025-03-07T00:34:00"
        },
        {
            "cpu_temperature": 45.21,
            "cpu_usage": 1.15833,
            "ram_usage": 37.6,
            "system_load": 0.385742,
            "network_sent_bytes": 156472732568,
            "network_recv_bytes": 14040088332,
            "timestamp": "2025-03-07T00:35:00"
        },
        {
            "cpu_temperature": 45.0967,
            "cpu_usage": 1.08833,
            "ram_usage": 37.3,
            "system_load": 0.18457,
            "network_sent_bytes": 156472760208,
            "network_recv_bytes": 14040114601,
            "timestamp": "2025-03-07T00:36:00"
        },
        {
            "cpu_temperature": 45.1883,
            "cpu_usage": 1.08333,
            "ram_usage": 37.6,
            "system_load": 0.45459,
            "network_sent_bytes": 156472792502,
            "network_recv_bytes": 14040141741,
            "timestamp": "2025-03-07T00:37:00"
        },
        {
            "cpu_temperature": 45.1,
            "cpu_usage": 1.02667,
            "ram_usage": 37.3,
            "system_load": 0.291504,
            "network_sent_bytes": 156472820289,
            "network_recv_bytes": 14040167693,
            "timestamp": "2025-03-07T00:38:00"
        },
        {
            "cpu_temperature": 45.0817,
            "cpu_usage": 1.18167,
            "ram_usage": 37.6,
            "system_load": 0.10498,
            "network_sent_bytes": 156472846091,
            "network_recv_bytes": 14040192371,
            "timestamp": "2025-03-07T00:39:00"
        },
        {
            "cpu_temperature": 45.0733,
            "cpu_usage": 1.09833,
            "ram_usage": 37.3,
            "system_load": 0.228516,
            "network_sent_bytes": 156472876747,
            "network_recv_bytes": 14040221347,
            "timestamp": "2025-03-07T00:40:00"
        },
        {
            "cpu_temperature": 45.02,
            "cpu_usage": 1.09,
            "ram_usage": 37.5,
            "system_load": 0.188477,
            "network_sent_bytes": 156472905140,
            "network_recv_bytes": 14040254518,
            "timestamp": "2025-03-07T00:41:00"
        },
        {
            "cpu_temperature": 44.975,
            "cpu_usage": 1.20333,
            "ram_usage": 37.5,
            "system_load": 0.0668945,
            "network_sent_bytes": 156472933801,
            "network_recv_bytes": 14040282095,
            "timestamp": "2025-03-07T00:42:00"
        },
        {
            "cpu_temperature": 45.1317,
            "cpu_usage": 1.16833,
            "ram_usage": 37.5,
            "system_load": 0.308105,
            "network_sent_bytes": 156472960475,
            "network_recv_bytes": 14040307435,
            "timestamp": "2025-03-07T00:43:00"
        },
        {
            "cpu_temperature": 44.9917,
            "cpu_usage": 1.14667,
            "ram_usage": 37.6,
            "system_load": 0.3125,
            "network_sent_bytes": 156472987426,
            "network_recv_bytes": 14040333306,
            "timestamp": "2025-03-07T00:44:00"
        },
        {
            "cpu_temperature": 44.9867,
            "cpu_usage": 1.13833,
            "ram_usage": 37.5,
            "system_load": 0.180664,
            "network_sent_bytes": 156473017496,
            "network_recv_bytes": 14040361851,
            "timestamp": "2025-03-07T00:45:00"
        },
        {
            "cpu_temperature": 45.1067,
            "cpu_usage": 1.13333,
            "ram_usage": 37.5,
            "system_load": 0.243652,
            "network_sent_bytes": 156473044374,
            "network_recv_bytes": 14040393444,
            "timestamp": "2025-03-07T00:46:00"
        },
        {
            "cpu_temperature": 44.8867,
            "cpu_usage": 1.21,
            "ram_usage": 37.6,
            "system_load": 0.0874023,
            "network_sent_bytes": 156473070386,
            "network_recv_bytes": 14040418134,
            "timestamp": "2025-03-07T00:47:00"
        },
        {
            "cpu_temperature": 45.095,
            "cpu_usage": 1.14,
            "ram_usage": 37.5,
            "system_load": 0.222168,
            "network_sent_bytes": 156473098154,
            "network_recv_bytes": 14040445121,
            "timestamp": "2025-03-07T00:48:00"
        },
        {
            "cpu_temperature": 45.095,
            "cpu_usage": 1.26167,
            "ram_usage": 37.6,
            "system_load": 0.198242,
            "network_sent_bytes": 156473137678,
            "network_recv_bytes": 14040478983,
            "timestamp": "2025-03-07T00:49:00"
        },
        {
            "cpu_temperature": 44.9983,
            "cpu_usage": 1.23333,
            "ram_usage": 37.5,
            "system_load": 0.115723,
            "network_sent_bytes": 156473169295,
            "network_recv_bytes": 14040508589,
            "timestamp": "2025-03-07T00:50:00"
        },
        {
            "cpu_temperature": 44.985,
            "cpu_usage": 1.14833,
            "ram_usage": 37.5,
            "system_load": 0.310059,
            "network_sent_bytes": 156473199077,
            "network_recv_bytes": 14040542830,
            "timestamp": "2025-03-07T00:51:00"
        },
        {
            "cpu_temperature": 45.025,
            "cpu_usage": 1.09167,
            "ram_usage": 37.5,
            "system_load": 0.186035,
            "network_sent_bytes": 156473225237,
            "network_recv_bytes": 14040567844,
            "timestamp": "2025-03-07T00:52:00"
        },
        {
            "cpu_temperature": 44.985,
            "cpu_usage": 1.16333,
            "ram_usage": 37.5,
            "system_load": 0.184082,
            "network_sent_bytes": 156473251690,
            "network_recv_bytes": 14040593087,
            "timestamp": "2025-03-07T00:53:00"
        },
        {
            "cpu_temperature": 45.07,
            "cpu_usage": 1.15,
            "ram_usage": 37.5,
            "system_load": 0.13916,
            "network_sent_bytes": 156473278254,
            "network_recv_bytes": 14040618559,
            "timestamp": "2025-03-07T00:54:00"
        },
        {
            "cpu_temperature": 45.13,
            "cpu_usage": 1.24167,
            "ram_usage": 37.5,
            "system_load": 0.0498047,
            "network_sent_bytes": 156473307526,
            "network_recv_bytes": 14040646213,
            "timestamp": "2025-03-07T00:55:00"
        },
        {
            "cpu_temperature": 45.105,
            "cpu_usage": 1.16333,
            "ram_usage": 37.5,
            "system_load": 0.208496,
            "network_sent_bytes": 156473334364,
            "network_recv_bytes": 14040677701,
            "timestamp": "2025-03-07T00:56:00"
        },
        {
            "cpu_temperature": 45.0533,
            "cpu_usage": 1.22333,
            "ram_usage": 37.5,
            "system_load": 0.193359,
            "network_sent_bytes": 156473365163,
            "network_recv_bytes": 14040707271,
            "timestamp": "2025-03-07T00:57:00"
        },
        {
            "cpu_temperature": 45.1183,
            "cpu_usage": 1.17667,
            "ram_usage": 37.5,
            "system_load": 0.149414,
            "network_sent_bytes": 156473392234,
            "network_recv_bytes": 14040733270,
            "timestamp": "2025-03-07T00:58:00"
        },
        {
            "cpu_temperature": 45.365,
            "cpu_usage": 1.14833,
            "ram_usage": 37.1,
            "system_load": 0.264648,
            "network_sent_bytes": 156473417850,
            "network_recv_bytes": 14040757760,
            "timestamp": "2025-03-07T00:59:00"
        },
        {
            "cpu_temperature": 45.3767,
            "cpu_usage": 1.32333,
            "ram_usage": 37.6,
            "system_load": 0.297363,
            "network_sent_bytes": 156473478676,
            "network_recv_bytes": 14040822381,
            "timestamp": "2025-03-07T01:00:00"
        },
        {
            "cpu_temperature": 45.3283,
            "cpu_usage": 1.32333,
            "ram_usage": 37.6,
            "system_load": 0.175781,
            "network_sent_bytes": 156473512538,
            "network_recv_bytes": 14040851899,
            "timestamp": "2025-03-07T01:01:00"
        },
        {
            "cpu_temperature": 45.2617,
            "cpu_usage": 1.11333,
            "ram_usage": 37.6,
            "system_load": 0.27002,
            "network_sent_bytes": 156473540499,
            "network_recv_bytes": 14040878269,
            "timestamp": "2025-03-07T01:02:00"
        },
        {
            "cpu_temperature": 45.2433,
            "cpu_usage": 1.19667,
            "ram_usage": 37.6,
            "system_load": 0.240723,
            "network_sent_bytes": 156473570101,
            "network_recv_bytes": 14040906431,
            "timestamp": "2025-03-07T01:03:00"
        },
        {
            "cpu_temperature": 45.4017,
            "cpu_usage": 1.25333,
            "ram_usage": 37.5,
            "system_load": 0.358887,
            "network_sent_bytes": 156473597152,
            "network_recv_bytes": 14040932308,
            "timestamp": "2025-03-07T01:04:00"
        },
        {
            "cpu_temperature": 45.27,
            "cpu_usage": 1.20833,
            "ram_usage": 37.6,
            "system_load": 0.293457,
            "network_sent_bytes": 156473630899,
            "network_recv_bytes": 14040964443,
            "timestamp": "2025-03-07T01:05:00"
        },
        {
            "cpu_temperature": 45.4367,
            "cpu_usage": 1.19,
            "ram_usage": 37.5,
            "system_load": 0.249023,
            "network_sent_bytes": 156473658070,
            "network_recv_bytes": 14040996201,
            "timestamp": "2025-03-07T01:06:00"
        },
        {
            "cpu_temperature": 45.3167,
            "cpu_usage": 1.14333,
            "ram_usage": 37.6,
            "system_load": 0.333984,
            "network_sent_bytes": 156473687830,
            "network_recv_bytes": 14041024936,
            "timestamp": "2025-03-07T01:07:00"
        },
        {
            "cpu_temperature": 45.2483,
            "cpu_usage": 1.265,
            "ram_usage": 37.5,
            "system_load": 0.302734,
            "network_sent_bytes": 156473715238,
            "network_recv_bytes": 14041051016,
            "timestamp": "2025-03-07T01:08:00"
        },
        {
            "cpu_temperature": 44.9233,
            "cpu_usage": 1.40667,
            "ram_usage": 37.5,
            "system_load": 0.177734,
            "network_sent_bytes": 156473741715,
            "network_recv_bytes": 14041076477,
            "timestamp": "2025-03-07T01:09:00"
        },
        {
            "cpu_temperature": 44.985,
            "cpu_usage": 1.18667,
            "ram_usage": 37.5,
            "system_load": 0.26416,
            "network_sent_bytes": 156473771266,
            "network_recv_bytes": 14041104422,
            "timestamp": "2025-03-07T01:10:00"
        },
        {
            "cpu_temperature": 45.0333,
            "cpu_usage": 1.185,
            "ram_usage": 37.5,
            "system_load": 0.317383,
            "network_sent_bytes": 156473800412,
            "network_recv_bytes": 14041138164,
            "timestamp": "2025-03-07T01:11:00"
        },
        {
            "cpu_temperature": 45.155,
            "cpu_usage": 1.09833,
            "ram_usage": 37.6,
            "system_load": 0.307129,
            "network_sent_bytes": 156473829081,
            "network_recv_bytes": 14041165503,
            "timestamp": "2025-03-07T01:12:00"
        },
        {
            "cpu_temperature": 45.1,
            "cpu_usage": 1.14,
            "ram_usage": 37.5,
            "system_load": 0.161621,
            "network_sent_bytes": 156473858914,
            "network_recv_bytes": 14041190154,
            "timestamp": "2025-03-07T01:13:00"
        },
        {
            "cpu_temperature": 45.14,
            "cpu_usage": 1.19167,
            "ram_usage": 37.6,
            "system_load": 0.0522461,
            "network_sent_bytes": 156473885857,
            "network_recv_bytes": 14041215242,
            "timestamp": "2025-03-07T01:14:00"
        },
        {
            "cpu_temperature": 45.2433,
            "cpu_usage": 1.12,
            "ram_usage": 37.6,
            "system_load": 0.168945,
            "network_sent_bytes": 156473917767,
            "network_recv_bytes": 14041245272,
            "timestamp": "2025-03-07T01:15:00"
        },
        {
            "cpu_temperature": 45.305,
            "cpu_usage": 1.1,
            "ram_usage": 37.5,
            "system_load": 0.141113,
            "network_sent_bytes": 156473945540,
            "network_recv_bytes": 14041277733,
            "timestamp": "2025-03-07T01:16:00"
        },
        {
            "cpu_temperature": 45.2783,
            "cpu_usage": 1.13833,
            "ram_usage": 37.5,
            "system_load": 0.15625,
            "network_sent_bytes": 156473971899,
            "network_recv_bytes": 14041302826,
            "timestamp": "2025-03-07T01:17:00"
        },
        {
            "cpu_temperature": 45.1367,
            "cpu_usage": 1.04667,
            "ram_usage": 37.1,
            "system_load": 0.291504,
            "network_sent_bytes": 156474002090,
            "network_recv_bytes": 14041332121,
            "timestamp": "2025-03-07T01:18:00"
        },
        {
            "cpu_temperature": 45.0967,
            "cpu_usage": 1.09,
            "ram_usage": 37.5,
            "system_load": 0.236328,
            "network_sent_bytes": 156474030925,
            "network_recv_bytes": 14041359730,
            "timestamp": "2025-03-07T01:19:00"
        },
        {
            "cpu_temperature": 45.0867,
            "cpu_usage": 1.02167,
            "ram_usage": 37.2,
            "system_load": 0.213867,
            "network_sent_bytes": 156474068120,
            "network_recv_bytes": 14041395189,
            "timestamp": "2025-03-07T01:20:00"
        },
        {
            "cpu_temperature": 45.0733,
            "cpu_usage": 1.1,
            "ram_usage": 37.5,
            "system_load": 0.196289,
            "network_sent_bytes": 156474098037,
            "network_recv_bytes": 14041428713,
            "timestamp": "2025-03-07T01:21:00"
        },
        {
            "cpu_temperature": 44.9067,
            "cpu_usage": 0.996667,
            "ram_usage": 37.2,
            "system_load": 0.0766602,
            "network_sent_bytes": 156474128119,
            "network_recv_bytes": 14041457645,
            "timestamp": "2025-03-07T01:22:00"
        },
        {
            "cpu_temperature": 44.8367,
            "cpu_usage": 1.04,
            "ram_usage": 37.5,
            "system_load": 0.338867,
            "network_sent_bytes": 156474164122,
            "network_recv_bytes": 14041492020,
            "timestamp": "2025-03-07T01:23:00"
        },
        {
            "cpu_temperature": 44.8,
            "cpu_usage": 1.12667,
            "ram_usage": 37.1,
            "system_load": 0.133789,
            "network_sent_bytes": 156474190959,
            "network_recv_bytes": 14041517489,
            "timestamp": "2025-03-07T01:24:00"
        },
        {
            "cpu_temperature": 45.0567,
            "cpu_usage": 1.14333,
            "ram_usage": 37.4,
            "system_load": 0.111328,
            "network_sent_bytes": 156474226889,
            "network_recv_bytes": 14041547633,
            "timestamp": "2025-03-07T01:25:00"
        },
        {
            "cpu_temperature": 45.0833,
            "cpu_usage": 1.155,
            "ram_usage": 37.4,
            "system_load": 0.165527,
            "network_sent_bytes": 156474257484,
            "network_recv_bytes": 14041580608,
            "timestamp": "2025-03-07T01:26:00"
        },
        {
            "cpu_temperature": 45.1067,
            "cpu_usage": 1.20667,
            "ram_usage": 37.3,
            "system_load": 0.0644531,
            "network_sent_bytes": 156474284095,
            "network_recv_bytes": 14041606159,
            "timestamp": "2025-03-07T01:27:00"
        },
        {
            "cpu_temperature": 45.1383,
            "cpu_usage": 1.18667,
            "ram_usage": 37.3,
            "system_load": 0.175293,
            "network_sent_bytes": 156474310204,
            "network_recv_bytes": 14041630960,
            "timestamp": "2025-03-07T01:28:00"
        },
        {
            "cpu_temperature": 45.005,
            "cpu_usage": 1.22667,
            "ram_usage": 37.3,
            "system_load": 0.167969,
            "network_sent_bytes": 156474337827,
            "network_recv_bytes": 14041657411,
            "timestamp": "2025-03-07T01:29:00"
        },
        {
            "cpu_temperature": 45.02,
            "cpu_usage": 1.095,
            "ram_usage": 37.4,
            "system_load": 0.0917969,
            "network_sent_bytes": 156474365761,
            "network_recv_bytes": 14041684389,
            "timestamp": "2025-03-07T01:30:00"
        },
        {
            "cpu_temperature": 45.0433,
            "cpu_usage": 1.135,
            "ram_usage": 37.3,
            "system_load": 0.212891,
            "network_sent_bytes": 156474393594,
            "network_recv_bytes": 14041716154,
            "timestamp": "2025-03-07T01:31:00"
        },
        {
            "cpu_temperature": 45.035,
            "cpu_usage": 1.02333,
            "ram_usage": 37.3,
            "system_load": 0.0766602,
            "network_sent_bytes": 156474429881,
            "network_recv_bytes": 14041751033,
            "timestamp": "2025-03-07T01:32:00"
        },
        {
            "cpu_temperature": 45.1383,
            "cpu_usage": 1.10667,
            "ram_usage": 37.3,
            "system_load": 0.23877,
            "network_sent_bytes": 156474455839,
            "network_recv_bytes": 14041775695,
            "timestamp": "2025-03-07T01:33:00"
        },
        {
            "cpu_temperature": 45.04,
            "cpu_usage": 1.08667,
            "ram_usage": 37.1,
            "system_load": 0.370117,
            "network_sent_bytes": 156474483502,
            "network_recv_bytes": 14041802242,
            "timestamp": "2025-03-07T01:34:00"
        },
        {
            "cpu_temperature": 45.28,
            "cpu_usage": 1.11833,
            "ram_usage": 37.4,
            "system_load": 0.134277,
            "network_sent_bytes": 156474515369,
            "network_recv_bytes": 14041832425,
            "timestamp": "2025-03-07T01:35:00"
        },
        {
            "cpu_temperature": 45.0367,
            "cpu_usage": 1.06167,
            "ram_usage": 37.2,
            "system_load": 0.167969,
            "network_sent_bytes": 156474543007,
            "network_recv_bytes": 14041864792,
            "timestamp": "2025-03-07T01:36:00"
        },
        {
            "cpu_temperature": 45.0583,
            "cpu_usage": 1.06333,
            "ram_usage": 37.4,
            "system_load": 0.133301,
            "network_sent_bytes": 156474575619,
            "network_recv_bytes": 14041892010,
            "timestamp": "2025-03-07T01:37:00"
        },
        {
            "cpu_temperature": 45.0517,
            "cpu_usage": 1.1,
            "ram_usage": 37.1,
            "system_load": 0.046875,
            "network_sent_bytes": 156474605249,
            "network_recv_bytes": 14041919967,
            "timestamp": "2025-03-07T01:38:00"
        },
        {
            "cpu_temperature": 45.0483,
            "cpu_usage": 1.25,
            "ram_usage": 37.4,
            "system_load": 0.245117,
            "network_sent_bytes": 156474632402,
            "network_recv_bytes": 14041945846,
            "timestamp": "2025-03-07T01:39:00"
        },
        {
            "cpu_temperature": 44.9833,
            "cpu_usage": 1.08333,
            "ram_usage": 37.3,
            "system_load": 0.217773,
            "network_sent_bytes": 156474667803,
            "network_recv_bytes": 14041980336,
            "timestamp": "2025-03-07T01:40:00"
        },
        {
            "cpu_temperature": 44.91,
            "cpu_usage": 1.09833,
            "ram_usage": 37.4,
            "system_load": 0.151855,
            "network_sent_bytes": 156474697650,
            "network_recv_bytes": 14042014017,
            "timestamp": "2025-03-07T01:41:00"
        },
        {
            "cpu_temperature": 44.9767,
            "cpu_usage": 1.01833,
            "ram_usage": 37.2,
            "system_load": 0.223145,
            "network_sent_bytes": 156474727395,
            "network_recv_bytes": 14042042582,
            "timestamp": "2025-03-07T01:42:00"
        },
        {
            "cpu_temperature": 45.0017,
            "cpu_usage": 1.03167,
            "ram_usage": 37.3,
            "system_load": 0.0800781,
            "network_sent_bytes": 156474753867,
            "network_recv_bytes": 14042067834,
            "timestamp": "2025-03-07T01:43:00"
        },
        {
            "cpu_temperature": 44.98,
            "cpu_usage": 1.125,
            "ram_usage": 37.2,
            "system_load": 0.148438,
            "network_sent_bytes": 156474779858,
            "network_recv_bytes": 14042092661,
            "timestamp": "2025-03-07T01:44:00"
        },
        {
            "cpu_temperature": 45.055,
            "cpu_usage": 1.12833,
            "ram_usage": 37.4,
            "system_load": 0.125977,
            "network_sent_bytes": 156474820567,
            "network_recv_bytes": 14042131494,
            "timestamp": "2025-03-07T01:45:00"
        },
        {
            "cpu_temperature": 45.0667,
            "cpu_usage": 1.08667,
            "ram_usage": 37,
            "system_load": 0.0444336,
            "network_sent_bytes": 156474848894,
            "network_recv_bytes": 14042164441,
            "timestamp": "2025-03-07T01:46:00"
        },
        {
            "cpu_temperature": 45.03,
            "cpu_usage": 0.993333,
            "ram_usage": 37.3,
            "system_load": 0.324707,
            "network_sent_bytes": 156474876036,
            "network_recv_bytes": 14042190309,
            "timestamp": "2025-03-07T01:47:00"
        },
        {
            "cpu_temperature": 45.0333,
            "cpu_usage": 1.06,
            "ram_usage": 36.9,
            "system_load": 0.185059,
            "network_sent_bytes": 156474902319,
            "network_recv_bytes": 14042215669,
            "timestamp": "2025-03-07T01:48:00"
        },
        {
            "cpu_temperature": 45.1817,
            "cpu_usage": 1.02167,
            "ram_usage": 37.4,
            "system_load": 0.140137,
            "network_sent_bytes": 156474935550,
            "network_recv_bytes": 14042243572,
            "timestamp": "2025-03-07T01:49:00"
        },
        {
            "cpu_temperature": 45.18,
            "cpu_usage": 1.02667,
            "ram_usage": 37,
            "system_load": 0.187012,
            "network_sent_bytes": 156474968787,
            "network_recv_bytes": 14042275016,
            "timestamp": "2025-03-07T01:50:00"
        },
        {
            "cpu_temperature": 45.22,
            "cpu_usage": 1.00167,
            "ram_usage": 37.3,
            "system_load": 0.102051,
            "network_sent_bytes": 156475002577,
            "network_recv_bytes": 14042311976,
            "timestamp": "2025-03-07T01:51:00"
        },
        {
            "cpu_temperature": 45.13,
            "cpu_usage": 1.15833,
            "ram_usage": 37.3,
            "system_load": 0.156738,
            "network_sent_bytes": 156475029156,
            "network_recv_bytes": 14042337499,
            "timestamp": "2025-03-07T01:52:00"
        },
        {
            "cpu_temperature": 44.9967,
            "cpu_usage": 1.21167,
            "ram_usage": 37.4,
            "system_load": 0.128906,
            "network_sent_bytes": 156475055612,
            "network_recv_bytes": 14042362639,
            "timestamp": "2025-03-07T01:53:00"
        },
        {
            "cpu_temperature": 45.0867,
            "cpu_usage": 1.15167,
            "ram_usage": 37.3,
            "system_load": 0.0458984,
            "network_sent_bytes": 156475083376,
            "network_recv_bytes": 14042389235,
            "timestamp": "2025-03-07T01:54:00"
        },
        {
            "cpu_temperature": 45.135,
            "cpu_usage": 1.225,
            "ram_usage": 37.4,
            "system_load": 0.245117,
            "network_sent_bytes": 156475113550,
            "network_recv_bytes": 14042417146,
            "timestamp": "2025-03-07T01:55:00"
        },
        {
            "cpu_temperature": 45.1683,
            "cpu_usage": 1.12167,
            "ram_usage": 37.3,
            "system_load": 0.194336,
            "network_sent_bytes": 156475142196,
            "network_recv_bytes": 14042450561,
            "timestamp": "2025-03-07T01:56:00"
        },
        {
            "cpu_temperature": 45.2183,
            "cpu_usage": 1.12833,
            "ram_usage": 37.3,
            "system_load": 0.144043,
            "network_sent_bytes": 156475170874,
            "network_recv_bytes": 14042478065,
            "timestamp": "2025-03-07T01:57:00"
        },
        {
            "cpu_temperature": 45.1933,
            "cpu_usage": 1.14333,
            "ram_usage": 37.3,
            "system_load": 0.246582,
            "network_sent_bytes": 156475196920,
            "network_recv_bytes": 14042502849,
            "timestamp": "2025-03-07T01:58:00"
        },
        {
            "cpu_temperature": 45.1883,
            "cpu_usage": 1.21333,
            "ram_usage": 37.3,
            "system_load": 0.0883789,
            "network_sent_bytes": 156475225535,
            "network_recv_bytes": 14042530268,
            "timestamp": "2025-03-07T01:59:00"
        },
        {
            "cpu_temperature": 44.94,
            "cpu_usage": 1.45833,
            "ram_usage": 37.4,
            "system_load": 0.151367,
            "network_sent_bytes": 156475288432,
            "network_recv_bytes": 14042591193,
            "timestamp": "2025-03-07T02:00:00"
        },
        {
            "cpu_temperature": 44.995,
            "cpu_usage": 1.27167,
            "ram_usage": 37.4,
            "system_load": 0.167969,
            "network_sent_bytes": 156475320574,
            "network_recv_bytes": 14042623905,
            "timestamp": "2025-03-07T02:01:00"
        },
        {
            "cpu_temperature": 44.925,
            "cpu_usage": 1.10333,
            "ram_usage": 37.4,
            "system_load": 0.0600586,
            "network_sent_bytes": 156475356099,
            "network_recv_bytes": 14042657703,
            "timestamp": "2025-03-07T02:02:00"
        },
        {
            "cpu_temperature": 45.1683,
            "cpu_usage": 1.13,
            "ram_usage": 37.4,
            "system_load": 0.250488,
            "network_sent_bytes": 156475383332,
            "network_recv_bytes": 14042683876,
            "timestamp": "2025-03-07T02:03:00"
        },
        {
            "cpu_temperature": 45.1567,
            "cpu_usage": 1.2,
            "ram_usage": 37.4,
            "system_load": 0.090332,
            "network_sent_bytes": 156475411650,
            "network_recv_bytes": 14042710818,
            "timestamp": "2025-03-07T02:04:00"
        },
        {
            "cpu_temperature": 45.1017,
            "cpu_usage": 1.30667,
            "ram_usage": 37.4,
            "system_load": 0.158691,
            "network_sent_bytes": 156475448810,
            "network_recv_bytes": 14042746126,
            "timestamp": "2025-03-07T02:05:00"
        },
        {
            "cpu_temperature": 45.1867,
            "cpu_usage": 1.11833,
            "ram_usage": 37.2,
            "system_load": 0.425293,
            "network_sent_bytes": 156475477198,
            "network_recv_bytes": 14042779264,
            "timestamp": "2025-03-07T02:06:00"
        },
        {
            "cpu_temperature": 45.195,
            "cpu_usage": 1.115,
            "ram_usage": 37.4,
            "system_load": 0.191895,
            "network_sent_bytes": 156475503258,
            "network_recv_bytes": 14042804128,
            "timestamp": "2025-03-07T02:07:00"
        },
        {
            "cpu_temperature": 45.0667,
            "cpu_usage": 1.115,
            "ram_usage": 37.2,
            "system_load": 0.19043,
            "network_sent_bytes": 156475532220,
            "network_recv_bytes": 14042831852,
            "timestamp": "2025-03-07T02:08:00"
        },
        {
            "cpu_temperature": 45.0583,
            "cpu_usage": 1.37,
            "ram_usage": 37.4,
            "system_load": 0.141602,
            "network_sent_bytes": 156475560689,
            "network_recv_bytes": 14042859251,
            "timestamp": "2025-03-07T02:09:00"
        },
        {
            "cpu_temperature": 45.0533,
            "cpu_usage": 1.11,
            "ram_usage": 37.4,
            "system_load": 0.050293,
            "network_sent_bytes": 156475591062,
            "network_recv_bytes": 14042888447,
            "timestamp": "2025-03-07T02:10:00"
        },
        {
            "cpu_temperature": 45.025,
            "cpu_usage": 1.11667,
            "ram_usage": 37.3,
            "system_load": 0.246582,
            "network_sent_bytes": 156475619942,
            "network_recv_bytes": 14042921296,
            "timestamp": "2025-03-07T02:11:00"
        },
        {
            "cpu_temperature": 45.1617,
            "cpu_usage": 1.155,
            "ram_usage": 37.4,
            "system_load": 0.129883,
            "network_sent_bytes": 156475646609,
            "network_recv_bytes": 14042946669,
            "timestamp": "2025-03-07T02:12:00"
        },
        {
            "cpu_temperature": 45.08,
            "cpu_usage": 1.105,
            "ram_usage": 37.3,
            "system_load": 0.120117,
            "network_sent_bytes": 156475681840,
            "network_recv_bytes": 14042976738,
            "timestamp": "2025-03-07T02:13:00"
        },
        {
            "cpu_temperature": 45.1883,
            "cpu_usage": 1.15167,
            "ram_usage": 37.4,
            "system_load": 0.179688,
            "network_sent_bytes": 156475708389,
            "network_recv_bytes": 14043001628,
            "timestamp": "2025-03-07T02:14:00"
        },
        {
            "cpu_temperature": 45.15,
            "cpu_usage": 1.16167,
            "ram_usage": 37.4,
            "system_load": 0.0644531,
            "network_sent_bytes": 156475736996,
            "network_recv_bytes": 14043028016,
            "timestamp": "2025-03-07T02:15:00"
        },
        {
            "cpu_temperature": 45.0417,
            "cpu_usage": 1.18167,
            "ram_usage": 37.3,
            "system_load": 0.217773,
            "network_sent_bytes": 156475767037,
            "network_recv_bytes": 14043061172,
            "timestamp": "2025-03-07T02:16:00"
        },
        {
            "cpu_temperature": 45.0867,
            "cpu_usage": 1.23,
            "ram_usage": 37.3,
            "system_load": 0.256348,
            "network_sent_bytes": 156475795145,
            "network_recv_bytes": 14043087980,
            "timestamp": "2025-03-07T02:17:00"
        },
        {
            "cpu_temperature": 45.135,
            "cpu_usage": 1.07333,
            "ram_usage": 37.4,
            "system_load": 0.172852,
            "network_sent_bytes": 156475824451,
            "network_recv_bytes": 14043116255,
            "timestamp": "2025-03-07T02:18:00"
        },
        {
            "cpu_temperature": 45.02,
            "cpu_usage": 1.225,
            "ram_usage": 37.4,
            "system_load": 0.519531,
            "network_sent_bytes": 156475851112,
            "network_recv_bytes": 14043141626,
            "timestamp": "2025-03-07T02:19:00"
        },
        {
            "cpu_temperature": 44.9433,
            "cpu_usage": 1.20333,
            "ram_usage": 37.4,
            "system_load": 0.314453,
            "network_sent_bytes": 156475892322,
            "network_recv_bytes": 14043181064,
            "timestamp": "2025-03-07T02:20:00"
        },
        {
            "cpu_temperature": 44.86,
            "cpu_usage": 1.185,
            "ram_usage": 37.4,
            "system_load": 0.267578,
            "network_sent_bytes": 156475921189,
            "network_recv_bytes": 14043214383,
            "timestamp": "2025-03-07T02:21:00"
        },
        {
            "cpu_temperature": 44.8867,
            "cpu_usage": 1.17167,
            "ram_usage": 37.3,
            "system_load": 0.4375,
            "network_sent_bytes": 156475948218,
            "network_recv_bytes": 14043240420,
            "timestamp": "2025-03-07T02:22:00"
        },
        {
            "cpu_temperature": 44.87,
            "cpu_usage": 1.26167,
            "ram_usage": 37.4,
            "system_load": 0.200195,
            "network_sent_bytes": 156475975911,
            "network_recv_bytes": 14043266805,
            "timestamp": "2025-03-07T02:23:00"
        },
        {
            "cpu_temperature": 44.9617,
            "cpu_usage": 1.31333,
            "ram_usage": 37.3,
            "system_load": 0.241699,
            "network_sent_bytes": 156476003603,
            "network_recv_bytes": 14043293327,
            "timestamp": "2025-03-07T02:24:00"
        },
        {
            "cpu_temperature": 44.855,
            "cpu_usage": 1.31833,
            "ram_usage": 37.4,
            "system_load": 0.20166,
            "network_sent_bytes": 156476037167,
            "network_recv_bytes": 14043321205,
            "timestamp": "2025-03-07T02:25:00"
        },
        {
            "cpu_temperature": 44.8917,
            "cpu_usage": 1.18333,
            "ram_usage": 37.3,
            "system_load": 0.0722656,
            "network_sent_bytes": 156476066363,
            "network_recv_bytes": 14043354650,
            "timestamp": "2025-03-07T02:26:00"
        },
        {
            "cpu_temperature": 44.8983,
            "cpu_usage": 1.13833,
            "ram_usage": 37.4,
            "system_load": 0.254883,
            "network_sent_bytes": 156476093648,
            "network_recv_bytes": 14043380661,
            "timestamp": "2025-03-07T02:27:00"
        },
        {
            "cpu_temperature": 44.9433,
            "cpu_usage": 1.12667,
            "ram_usage": 37.3,
            "system_load": 0.0913086,
            "network_sent_bytes": 156476121047,
            "network_recv_bytes": 14043406798,
            "timestamp": "2025-03-07T02:28:00"
        },
        {
            "cpu_temperature": 45.915,
            "cpu_usage": 5.005,
            "ram_usage": 37.4,
            "system_load": 0.258789,
            "network_sent_bytes": 156476645332,
            "network_recv_bytes": 14058801834,
            "timestamp": "2025-03-07T02:29:00"
        },
        {
            "cpu_temperature": 45.2067,
            "cpu_usage": 1.25333,
            "ram_usage": 37.4,
            "system_load": 0.230469,
            "network_sent_bytes": 156476674563,
            "network_recv_bytes": 14058829639,
            "timestamp": "2025-03-07T02:30:00"
        },
        {
            "cpu_temperature": 45.1033,
            "cpu_usage": 1.04333,
            "ram_usage": 37,
            "system_load": 0.141113,
            "network_sent_bytes": 156476705405,
            "network_recv_bytes": 14058864752,
            "timestamp": "2025-03-07T02:31:00"
        },
        {
            "cpu_temperature": 45.0733,
            "cpu_usage": 0.995,
            "ram_usage": 37.4,
            "system_load": 0.171387,
            "network_sent_bytes": 156476732607,
            "network_recv_bytes": 14058890702,
            "timestamp": "2025-03-07T02:32:00"
        },
        {
            "cpu_temperature": 44.955,
            "cpu_usage": 1.06333,
            "ram_usage": 37,
            "system_load": 0.134277,
            "network_sent_bytes": 156476759771,
            "network_recv_bytes": 14058916716,
            "timestamp": "2025-03-07T02:33:00"
        },
        {
            "cpu_temperature": 44.9717,
            "cpu_usage": 1.05167,
            "ram_usage": 37.4,
            "system_load": 0.046875,
            "network_sent_bytes": 156476786228,
            "network_recv_bytes": 14058941947,
            "timestamp": "2025-03-07T02:34:00"
        },
        {
            "cpu_temperature": 45.1183,
            "cpu_usage": 1.155,
            "ram_usage": 37,
            "system_load": 0.366699,
            "network_sent_bytes": 156476819529,
            "network_recv_bytes": 14058973708,
            "timestamp": "2025-03-07T02:35:00"
        },
        {
            "cpu_temperature": 45.0417,
            "cpu_usage": 1.00833,
            "ram_usage": 37.4,
            "system_load": 0.181641,
            "network_sent_bytes": 156476849302,
            "network_recv_bytes": 14059008064,
            "timestamp": "2025-03-07T02:36:00"
        },
        {
            "cpu_temperature": 44.9933,
            "cpu_usage": 0.983333,
            "ram_usage": 37,
            "system_load": 0.13916,
            "network_sent_bytes": 156476883916,
            "network_recv_bytes": 14059037136,
            "timestamp": "2025-03-07T02:37:00"
        },
        {
            "cpu_temperature": 45.015,
            "cpu_usage": 1.05667,
            "ram_usage": 37.4,
            "system_load": 0.367676,
            "network_sent_bytes": 156476912121,
            "network_recv_bytes": 14059063648,
            "timestamp": "2025-03-07T02:38:00"
        },
        {
            "cpu_temperature": 44.855,
            "cpu_usage": 1.13,
            "ram_usage": 37,
            "system_load": 0.133301,
            "network_sent_bytes": 156476938028,
            "network_recv_bytes": 14059088417,
            "timestamp": "2025-03-07T02:39:00"
        },
        {
            "cpu_temperature": 44.82,
            "cpu_usage": 1.07167,
            "ram_usage": 37.4,
            "system_load": 0.200684,
            "network_sent_bytes": 156476971093,
            "network_recv_bytes": 14059125883,
            "timestamp": "2025-03-07T02:40:00"
        },
        {
            "cpu_temperature": 44.9933,
            "cpu_usage": 1.045,
            "ram_usage": 37,
            "system_load": 0.208008,
            "network_sent_bytes": 156476998717,
            "network_recv_bytes": 14059152097,
            "timestamp": "2025-03-07T02:41:00"
        },
        {
            "cpu_temperature": 44.85,
            "cpu_usage": 1.00667,
            "ram_usage": 37.3,
            "system_load": 0.0742188,
            "network_sent_bytes": 156477026061,
            "network_recv_bytes": 14059178473,
            "timestamp": "2025-03-07T02:42:00"
        },
        {
            "cpu_temperature": 44.9217,
            "cpu_usage": 1.02167,
            "ram_usage": 36.9,
            "system_load": 0.174805,
            "network_sent_bytes": 156477055793,
            "network_recv_bytes": 14059206801,
            "timestamp": "2025-03-07T02:43:00"
        },
        {
            "cpu_temperature": 44.795,
            "cpu_usage": 1.18667,
            "ram_usage": 37.3,
            "system_load": 0.14209,
            "network_sent_bytes": 156477082453,
            "network_recv_bytes": 14059232363,
            "timestamp": "2025-03-07T02:44:00"
        },
        {
            "cpu_temperature": 44.7383,
            "cpu_usage": 1.09833,
            "ram_usage": 36.9,
            "system_load": 0.124512,
            "network_sent_bytes": 156477108764,
            "network_recv_bytes": 14059257696,
            "timestamp": "2025-03-07T02:45:00"
        },
        {
            "cpu_temperature": 44.78,
            "cpu_usage": 1.01167,
            "ram_usage": 37.3,
            "system_load": 0.181641,
            "network_sent_bytes": 156477139378,
            "network_recv_bytes": 14059292295,
            "timestamp": "2025-03-07T02:46:00"
        },
        {
            "cpu_temperature": 44.73,
            "cpu_usage": 1.155,
            "ram_usage": 37.3,
            "system_load": 0.0649414,
            "network_sent_bytes": 156477168035,
            "network_recv_bytes": 14059319770,
            "timestamp": "2025-03-07T02:47:00"
        },
        {
            "cpu_temperature": 44.7067,
            "cpu_usage": 1.13333,
            "ram_usage": 37.4,
            "system_load": 0.143555,
            "network_sent_bytes": 156477205036,
            "network_recv_bytes": 14059355734,
            "timestamp": "2025-03-07T02:48:00"
        },
        {
            "cpu_temperature": 44.75,
            "cpu_usage": 1.20333,
            "ram_usage": 37.4,
            "system_load": 0.124023,
            "network_sent_bytes": 156477237970,
            "network_recv_bytes": 14059383320,
            "timestamp": "2025-03-07T02:49:00"
        },
        {
            "cpu_temperature": 44.6317,
            "cpu_usage": 1.20167,
            "ram_usage": 37.3,
            "system_load": 0.0429688,
            "network_sent_bytes": 156477272849,
            "network_recv_bytes": 14059416423,
            "timestamp": "2025-03-07T02:50:00"
        },
        {
            "cpu_temperature": 44.5667,
            "cpu_usage": 1.17667,
            "ram_usage": 37.4,
            "system_load": 0.415039,
            "network_sent_bytes": 156477301986,
            "network_recv_bytes": 14059448959,
            "timestamp": "2025-03-07T02:51:00"
        },
        {
            "cpu_temperature": 44.5817,
            "cpu_usage": 1.20833,
            "ram_usage": 37.3,
            "system_load": 0.150879,
            "network_sent_bytes": 156477331762,
            "network_recv_bytes": 14059477525,
            "timestamp": "2025-03-07T02:52:00"
        },
        {
            "cpu_temperature": 44.6667,
            "cpu_usage": 1.07667,
            "ram_usage": 37.4,
            "system_load": 0.12793,
            "network_sent_bytes": 156477358792,
            "network_recv_bytes": 14059503419,
            "timestamp": "2025-03-07T02:53:00"
        },
        {
            "cpu_temperature": 44.7333,
            "cpu_usage": 1.20833,
            "ram_usage": 37.4,
            "system_load": 0.263184,
            "network_sent_bytes": 156477385885,
            "network_recv_bytes": 14059529234,
            "timestamp": "2025-03-07T02:54:00"
        },
        {
            "cpu_temperature": 44.7233,
            "cpu_usage": 1.105,
            "ram_usage": 37.4,
            "system_load": 0.224121,
            "network_sent_bytes": 156477417853,
            "network_recv_bytes": 14059559492,
            "timestamp": "2025-03-07T02:55:00"
        },
        {
            "cpu_temperature": 44.5717,
            "cpu_usage": 1.16,
            "ram_usage": 37.4,
            "system_load": 0.281738,
            "network_sent_bytes": 156477449878,
            "network_recv_bytes": 14059596106,
            "timestamp": "2025-03-07T02:56:00"
        },
        {
            "cpu_temperature": 44.675,
            "cpu_usage": 1.06,
            "ram_usage": 37.3,
            "system_load": 0.255371,
            "network_sent_bytes": 156477476785,
            "network_recv_bytes": 14059621961,
            "timestamp": "2025-03-07T02:57:00"
        },
        {
            "cpu_temperature": 44.5567,
            "cpu_usage": 1.07667,
            "ram_usage": 37.3,
            "system_load": 0.14502,
            "network_sent_bytes": 156477503169,
            "network_recv_bytes": 14059647209,
            "timestamp": "2025-03-07T02:58:00"
        },
        {
            "cpu_temperature": 44.62,
            "cpu_usage": 1.18833,
            "ram_usage": 37.3,
            "system_load": 0.281738,
            "network_sent_bytes": 156477531052,
            "network_recv_bytes": 14059673824,
            "timestamp": "2025-03-07T02:59:00"
        },
        {
            "cpu_temperature": 44.6117,
            "cpu_usage": 1.405,
            "ram_usage": 37.4,
            "system_load": 0.182617,
            "network_sent_bytes": 156477592136,
            "network_recv_bytes": 14059732944,
            "timestamp": "2025-03-07T03:00:00"
        },
        {
            "cpu_temperature": 44.55,
            "cpu_usage": 1.26333,
            "ram_usage": 37.4,
            "system_load": 0.151855,
            "network_sent_bytes": 156477627122,
            "network_recv_bytes": 14059768643,
            "timestamp": "2025-03-07T03:01:00"
        },
        {
            "cpu_temperature": 44.815,
            "cpu_usage": 1.12,
            "ram_usage": 37.3,
            "system_load": 0.203125,
            "network_sent_bytes": 156477654529,
            "network_recv_bytes": 14059794405,
            "timestamp": "2025-03-07T03:02:00"
        },
        {
            "cpu_temperature": 44.5083,
            "cpu_usage": 1.25333,
            "ram_usage": 37.3,
            "system_load": 0.104492,
            "network_sent_bytes": 156477680475,
            "network_recv_bytes": 14059819129,
            "timestamp": "2025-03-07T03:03:00"
        },
        {
            "cpu_temperature": 44.565,
            "cpu_usage": 1.21667,
            "ram_usage": 37.3,
            "system_load": 0.200684,
            "network_sent_bytes": 156477709515,
            "network_recv_bytes": 14059847041,
            "timestamp": "2025-03-07T03:04:00"
        },
        {
            "cpu_temperature": 44.6433,
            "cpu_usage": 1.26833,
            "ram_usage": 37.3,
            "system_load": 0.184082,
            "network_sent_bytes": 156477749298,
            "network_recv_bytes": 14059885128,
            "timestamp": "2025-03-07T03:05:00"
        },
        {
            "cpu_temperature": 44.61,
            "cpu_usage": 1.07833,
            "ram_usage": 37.1,
            "system_load": 0.100586,
            "network_sent_bytes": 156477776532,
            "network_recv_bytes": 14059916995,
            "timestamp": "2025-03-07T03:06:00"
        },
        {
            "cpu_temperature": 44.5233,
            "cpu_usage": 1.09333,
            "ram_usage": 37.4,
            "system_load": 0.197754,
            "network_sent_bytes": 156477804015,
            "network_recv_bytes": 14059943458,
            "timestamp": "2025-03-07T03:07:00"
        },
        {
            "cpu_temperature": 44.51,
            "cpu_usage": 1.04167,
            "ram_usage": 37.3,
            "system_load": 0.134277,
            "network_sent_bytes": 156477835959,
            "network_recv_bytes": 14059974224,
            "timestamp": "2025-03-07T03:08:00"
        },
        {
            "cpu_temperature": 44.665,
            "cpu_usage": 1.24167,
            "ram_usage": 37.4,
            "system_load": 0.127441,
            "network_sent_bytes": 156477863626,
            "network_recv_bytes": 14060000577,
            "timestamp": "2025-03-07T03:09:00"
        },
        {
            "cpu_temperature": 44.625,
            "cpu_usage": 1.12833,
            "ram_usage": 37.3,
            "system_load": 0.164062,
            "network_sent_bytes": 156477893360,
            "network_recv_bytes": 14060028681,
            "timestamp": "2025-03-07T03:10:00"
        },
        {
            "cpu_temperature": 44.5817,
            "cpu_usage": 1.27833,
            "ram_usage": 37.4,
            "system_load": 0.0585938,
            "network_sent_bytes": 156477921912,
            "network_recv_bytes": 14060061890,
            "timestamp": "2025-03-07T03:11:00"
        },
        {
            "cpu_temperature": 44.6817,
            "cpu_usage": 1.11667,
            "ram_usage": 37.3,
            "system_load": 0.189941,
            "network_sent_bytes": 156477947437,
            "network_recv_bytes": 14060086409,
            "timestamp": "2025-03-07T03:12:00"
        },
        {
            "cpu_temperature": 44.7567,
            "cpu_usage": 1.12333,
            "ram_usage": 37.3,
            "system_load": 0.205566,
            "network_sent_bytes": 156477977688,
            "network_recv_bytes": 14060111216,
            "timestamp": "2025-03-07T03:13:00"
        },
        {
            "cpu_temperature": 44.7617,
            "cpu_usage": 1.18167,
            "ram_usage": 37.3,
            "system_load": 0.0732422,
            "network_sent_bytes": 156478009044,
            "network_recv_bytes": 14060140655,
            "timestamp": "2025-03-07T03:14:00"
        },
        {
            "cpu_temperature": 44.9067,
            "cpu_usage": 1.22167,
            "ram_usage": 37.3,
            "system_load": 0.323242,
            "network_sent_bytes": 156478041569,
            "network_recv_bytes": 14060177540,
            "timestamp": "2025-03-07T03:15:00"
        },
        {
            "cpu_temperature": 44.9367,
            "cpu_usage": 1.235,
            "ram_usage": 37.4,
            "system_load": 0.21875,
            "network_sent_bytes": 156478069061,
            "network_recv_bytes": 14060203836,
            "timestamp": "2025-03-07T03:16:00"
        },
        {
            "cpu_temperature": 44.785,
            "cpu_usage": 1.165,
            "ram_usage": 37,
            "system_load": 0.15918,
            "network_sent_bytes": 156478095122,
            "network_recv_bytes": 14060228601,
            "timestamp": "2025-03-07T03:17:00"
        },
        {
            "cpu_temperature": 44.9667,
            "cpu_usage": 1.04333,
            "ram_usage": 37.3,
            "system_load": 0.206055,
            "network_sent_bytes": 156478122524,
            "network_recv_bytes": 14060255192,
            "timestamp": "2025-03-07T03:18:00"
        },
        {
            "cpu_temperature": 45.0367,
            "cpu_usage": 1.205,
            "ram_usage": 37.3,
            "system_load": 0.203125,
            "network_sent_bytes": 156478148692,
            "network_recv_bytes": 14060280062,
            "timestamp": "2025-03-07T03:19:00"
        },
        {
            "cpu_temperature": 45.0383,
            "cpu_usage": 1.17333,
            "ram_usage": 37.2,
            "system_load": 0.246094,
            "network_sent_bytes": 156478180650,
            "network_recv_bytes": 14060310561,
            "timestamp": "2025-03-07T03:20:00"
        },
        {
            "cpu_temperature": 45.0217,
            "cpu_usage": 1.13667,
            "ram_usage": 37.3,
            "system_load": 0.168457,
            "network_sent_bytes": 156478209217,
            "network_recv_bytes": 14060343659,
            "timestamp": "2025-03-07T03:21:00"
        },
        {
            "cpu_temperature": 45.0233,
            "cpu_usage": 1.17167,
            "ram_usage": 37.3,
            "system_load": 0.0922852,
            "network_sent_bytes": 156478244698,
            "network_recv_bytes": 14060377866,
            "timestamp": "2025-03-07T03:22:00"
        },
        {
            "cpu_temperature": 44.9467,
            "cpu_usage": 1.165,
            "ram_usage": 37.3,
            "system_load": 0.194824,
            "network_sent_bytes": 156478274222,
            "network_recv_bytes": 14060406148,
            "timestamp": "2025-03-07T03:23:00"
        },
        {
            "cpu_temperature": 45.0783,
            "cpu_usage": 1.265,
            "ram_usage": 37.2,
            "system_load": 0.102051,
            "network_sent_bytes": 156478302924,
            "network_recv_bytes": 14060433544,
            "timestamp": "2025-03-07T03:24:00"
        },
        {
            "cpu_temperature": 44.93,
            "cpu_usage": 1.22667,
            "ram_usage": 37.4,
            "system_load": 0.116211,
            "network_sent_bytes": 156478340291,
            "network_recv_bytes": 14060465213,
            "timestamp": "2025-03-07T03:25:00"
        },
        {
            "cpu_temperature": 44.965,
            "cpu_usage": 1.20667,
            "ram_usage": 37.4,
            "system_load": 0.19043,
            "network_sent_bytes": 156478368327,
            "network_recv_bytes": 14060497349,
            "timestamp": "2025-03-07T03:26:00"
        },
        {
            "cpu_temperature": 45.1467,
            "cpu_usage": 1.21833,
            "ram_usage": 37.3,
            "system_load": 0.0673828,
            "network_sent_bytes": 156478397483,
            "network_recv_bytes": 14060525139,
            "timestamp": "2025-03-07T03:27:00"
        },
        {
            "cpu_temperature": 44.9633,
            "cpu_usage": 1.22333,
            "ram_usage": 37.3,
            "system_load": 0.154297,
            "network_sent_bytes": 156478424710,
            "network_recv_bytes": 14060551310,
            "timestamp": "2025-03-07T03:28:00"
        },
        {
            "cpu_temperature": 45.1533,
            "cpu_usage": 1.17833,
            "ram_usage": 37.3,
            "system_load": 0.279297,
            "network_sent_bytes": 156478451581,
            "network_recv_bytes": 14060576909,
            "timestamp": "2025-03-07T03:29:00"
        },
        {
            "cpu_temperature": 45.045,
            "cpu_usage": 1.13833,
            "ram_usage": 37.4,
            "system_load": 0.17627,
            "network_sent_bytes": 156478491376,
            "network_recv_bytes": 14060615373,
            "timestamp": "2025-03-07T03:30:00"
        },
        {
            "cpu_temperature": 45.12,
            "cpu_usage": 1.195,
            "ram_usage": 37.3,
            "system_load": 0.260254,
            "network_sent_bytes": 156478520479,
            "network_recv_bytes": 14060648968,
            "timestamp": "2025-03-07T03:31:00"
        },
        {
            "cpu_temperature": 45.175,
            "cpu_usage": 1.145,
            "ram_usage": 37.4,
            "system_load": 0.125977,
            "network_sent_bytes": 156478547838,
            "network_recv_bytes": 14060675303,
            "timestamp": "2025-03-07T03:32:00"
        },
        {
            "cpu_temperature": 45.2583,
            "cpu_usage": 1.12833,
            "ram_usage": 37.4,
            "system_load": 0.125,
            "network_sent_bytes": 156478573829,
            "network_recv_bytes": 14060700154,
            "timestamp": "2025-03-07T03:33:00"
        },
        {
            "cpu_temperature": 45.1467,
            "cpu_usage": 1.18833,
            "ram_usage": 37.4,
            "system_load": 0.193848,
            "network_sent_bytes": 156478599935,
            "network_recv_bytes": 14060724940,
            "timestamp": "2025-03-07T03:34:00"
        },
        {
            "cpu_temperature": 45.075,
            "cpu_usage": 1.20833,
            "ram_usage": 37.3,
            "system_load": 0.0693359,
            "network_sent_bytes": 156478633655,
            "network_recv_bytes": 14060757122,
            "timestamp": "2025-03-07T03:35:00"
        },
        {
            "cpu_temperature": 45.16,
            "cpu_usage": 1.00167,
            "ram_usage": 37.2,
            "system_load": 0.155273,
            "network_sent_bytes": 156478662028,
            "network_recv_bytes": 14060790091,
            "timestamp": "2025-03-07T03:36:00"
        },
        {
            "cpu_temperature": 45.2233,
            "cpu_usage": 1.135,
            "ram_usage": 37.3,
            "system_load": 0.214355,
            "network_sent_bytes": 156478692952,
            "network_recv_bytes": 14060815659,
            "timestamp": "2025-03-07T03:37:00"
        },
        {
            "cpu_temperature": 45.2333,
            "cpu_usage": 1.085,
            "ram_usage": 37.2,
            "system_load": 0.0771484,
            "network_sent_bytes": 156478720459,
            "network_recv_bytes": 14060841469,
            "timestamp": "2025-03-07T03:38:00"
        },
        {
            "cpu_temperature": 45.1883,
            "cpu_usage": 1.29,
            "ram_usage": 37.4,
            "system_load": 0.189453,
            "network_sent_bytes": 156478748827,
            "network_recv_bytes": 14060868785,
            "timestamp": "2025-03-07T03:39:00"
        },
        {
            "cpu_temperature": 45.205,
            "cpu_usage": 1.08667,
            "ram_usage": 37.3,
            "system_load": 0.0996094,
            "network_sent_bytes": 156478788224,
            "network_recv_bytes": 14060906126,
            "timestamp": "2025-03-07T03:40:00"
        },
        {
            "cpu_temperature": 45.1783,
            "cpu_usage": 1.175,
            "ram_usage": 37.3,
            "system_load": 0.115723,
            "network_sent_bytes": 156478821375,
            "network_recv_bytes": 14060941267,
            "timestamp": "2025-03-07T03:41:00"
        },
        {
            "cpu_temperature": 45.1317,
            "cpu_usage": 1.175,
            "ram_usage": 37.3,
            "system_load": 0.235352,
            "network_sent_bytes": 156478849376,
            "network_recv_bytes": 14060967996,
            "timestamp": "2025-03-07T03:42:00"
        },
        {
            "cpu_temperature": 45.1433,
            "cpu_usage": 1.14667,
            "ram_usage": 37.3,
            "system_load": 0.158691,
            "network_sent_bytes": 156478875190,
            "network_recv_bytes": 14060992808,
            "timestamp": "2025-03-07T03:43:00"
        },
        {
            "cpu_temperature": 45.3117,
            "cpu_usage": 1.18333,
            "ram_usage": 37.3,
            "system_load": 0.223633,
            "network_sent_bytes": 156478901389,
            "network_recv_bytes": 14061017653,
            "timestamp": "2025-03-07T03:44:00"
        },
        {
            "cpu_temperature": 45.0667,
            "cpu_usage": 1.15667,
            "ram_usage": 37.4,
            "system_load": 0.228516,
            "network_sent_bytes": 156478932537,
            "network_recv_bytes": 14061052601,
            "timestamp": "2025-03-07T03:45:00"
        },
        {
            "cpu_temperature": 45.1183,
            "cpu_usage": 1.075,
            "ram_usage": 37.3,
            "system_load": 0.0820312,
            "network_sent_bytes": 156478960475,
            "network_recv_bytes": 14061079906,
            "timestamp": "2025-03-07T03:46:00"
        },
        {
            "cpu_temperature": 45.2467,
            "cpu_usage": 1.11,
            "ram_usage": 37.4,
            "system_load": 0.258301,
            "network_sent_bytes": 156478988847,
            "network_recv_bytes": 14061107124,
            "timestamp": "2025-03-07T03:47:00"
        },
        {
            "cpu_temperature": 45.3667,
            "cpu_usage": 1.09333,
            "ram_usage": 37.3,
            "system_load": 0.124512,
            "network_sent_bytes": 156479019740,
            "network_recv_bytes": 14061136850,
            "timestamp": "2025-03-07T03:48:00"
        },
        {
            "cpu_temperature": 45.3533,
            "cpu_usage": 1.19,
            "ram_usage": 37.4,
            "system_load": 0.172852,
            "network_sent_bytes": 156479053044,
            "network_recv_bytes": 14061165028,
            "timestamp": "2025-03-07T03:49:00"
        },
        {
            "cpu_temperature": 45.2067,
            "cpu_usage": 1.12833,
            "ram_usage": 37.3,
            "system_load": 0.291504,
            "network_sent_bytes": 156479084004,
            "network_recv_bytes": 14061193663,
            "timestamp": "2025-03-07T03:50:00"
        },
        {
            "cpu_temperature": 44.9767,
            "cpu_usage": 1.12167,
            "ram_usage": 37.3,
            "system_load": 0.10498,
            "network_sent_bytes": 156479113266,
            "network_recv_bytes": 14061227726,
            "timestamp": "2025-03-07T03:51:00"
        },
        {
            "cpu_temperature": 45.0183,
            "cpu_usage": 1.07,
            "ram_usage": 37.3,
            "system_load": 0.167969,
            "network_sent_bytes": 156479140442,
            "network_recv_bytes": 14061253686,
            "timestamp": "2025-03-07T03:52:00"
        },
        {
            "cpu_temperature": 45.0183,
            "cpu_usage": 1.19167,
            "ram_usage": 37.2,
            "system_load": 0.139648,
            "network_sent_bytes": 156479168664,
            "network_recv_bytes": 14061280902,
            "timestamp": "2025-03-07T03:53:00"
        },
        {
            "cpu_temperature": 44.96,
            "cpu_usage": 1.18833,
            "ram_usage": 37.4,
            "system_load": 0.0498047,
            "network_sent_bytes": 156479194125,
            "network_recv_bytes": 14061305055,
            "timestamp": "2025-03-07T03:54:00"
        },
        {
            "cpu_temperature": 45.0617,
            "cpu_usage": 1.18833,
            "ram_usage": 37.3,
            "system_load": 0.179199,
            "network_sent_bytes": 156479223608,
            "network_recv_bytes": 14061333018,
            "timestamp": "2025-03-07T03:55:00"
        },
        {
            "cpu_temperature": 45.1167,
            "cpu_usage": 1.18,
            "ram_usage": 37.3,
            "system_load": 0.149414,
            "network_sent_bytes": 156479253485,
            "network_recv_bytes": 14061366310,
            "timestamp": "2025-03-07T03:56:00"
        },
        {
            "cpu_temperature": 45.0467,
            "cpu_usage": 1.19333,
            "ram_usage": 37.4,
            "system_load": 0.133301,
            "network_sent_bytes": 156479281191,
            "network_recv_bytes": 14061392800,
            "timestamp": "2025-03-07T03:57:00"
        },
        {
            "cpu_temperature": 45.085,
            "cpu_usage": 1.15167,
            "ram_usage": 37.3,
            "system_load": 0.264648,
            "network_sent_bytes": 156479312427,
            "network_recv_bytes": 14061422606,
            "timestamp": "2025-03-07T03:58:00"
        },
        {
            "cpu_temperature": 45.2017,
            "cpu_usage": 1.22167,
            "ram_usage": 37.3,
            "system_load": 0.212402,
            "network_sent_bytes": 156479337031,
            "network_recv_bytes": 14061446160,
            "timestamp": "2025-03-07T03:59:00"
        },
        {
            "cpu_temperature": 45.09,
            "cpu_usage": 1.97667,
            "ram_usage": 37.5,
            "system_load": 0.208008,
            "network_sent_bytes": 156479394748,
            "network_recv_bytes": 14061501881,
            "timestamp": "2025-03-07T04:00:00"
        },
        {
            "cpu_temperature": 45.1583,
            "cpu_usage": 1.845,
            "ram_usage": 37.3,
            "system_load": 0.199219,
            "network_sent_bytes": 156479448125,
            "network_recv_bytes": 14061555414,
            "timestamp": "2025-03-07T04:01:00"
        },
        {
            "cpu_temperature": 45.2283,
            "cpu_usage": 1.04,
            "ram_usage": 37.3,
            "system_load": 0.0712891,
            "network_sent_bytes": 156479476042,
            "network_recv_bytes": 14061581590,
            "timestamp": "2025-03-07T04:02:00"
        },
        {
            "cpu_temperature": 44.9983,
            "cpu_usage": 1.15,
            "ram_usage": 37.3,
            "system_load": 0.26709,
            "network_sent_bytes": 156479501031,
            "network_recv_bytes": 14061605405,
            "timestamp": "2025-03-07T04:03:00"
        },
        {
            "cpu_temperature": 45.0683,
            "cpu_usage": 1.11833,
            "ram_usage": 37.4,
            "system_load": 0.261719,
            "network_sent_bytes": 156479528539,
            "network_recv_bytes": 14061631802,
            "timestamp": "2025-03-07T04:04:00"
        },
        {
            "cpu_temperature": 44.9867,
            "cpu_usage": 1.135,
            "ram_usage": 37.4,
            "system_load": 0.237305,
            "network_sent_bytes": 156479569898,
            "network_recv_bytes": 14061670905,
            "timestamp": "2025-03-07T04:05:00"
        },
        {
            "cpu_temperature": 44.9733,
            "cpu_usage": 1.04333,
            "ram_usage": 37.2,
            "system_load": 0.288574,
            "network_sent_bytes": 156479595787,
            "network_recv_bytes": 14061701476,
            "timestamp": "2025-03-07T04:06:00"
        },
        {
            "cpu_temperature": 45.005,
            "cpu_usage": 1.01833,
            "ram_usage": 37.4,
            "system_load": 0.103516,
            "network_sent_bytes": 156479622182,
            "network_recv_bytes": 14061726487,
            "timestamp": "2025-03-07T04:07:00"
        },
        {
            "cpu_temperature": 45.0633,
            "cpu_usage": 1.09,
            "ram_usage": 37.1,
            "system_load": 0.167969,
            "network_sent_bytes": 156479655479,
            "network_recv_bytes": 14061758344,
            "timestamp": "2025-03-07T04:08:00"
        },
        {
            "cpu_temperature": 45.41,
            "cpu_usage": 2.18,
            "ram_usage": 37.4,
            "system_load": 0.139648,
            "network_sent_bytes": 156480261134,
            "network_recv_bytes": 14067822960,
            "timestamp": "2025-03-07T04:09:00"
        },
        {
            "cpu_temperature": 45.0267,
            "cpu_usage": 1.135,
            "ram_usage": 37.2,
            "system_load": 0.0498047,
            "network_sent_bytes": 156480290030,
            "network_recv_bytes": 14067850867,
            "timestamp": "2025-03-07T04:10:00"
        },
        {
            "cpu_temperature": 44.88,
            "cpu_usage": 1.14333,
            "ram_usage": 37.4,
            "system_load": 0.179199,
            "network_sent_bytes": 156480321140,
            "network_recv_bytes": 14067885755,
            "timestamp": "2025-03-07T04:11:00"
        },
        {
            "cpu_temperature": 44.7867,
            "cpu_usage": 1.215,
            "ram_usage": 37.3,
            "system_load": 0.137695,
            "network_sent_bytes": 156480348445,
            "network_recv_bytes": 14067911980,
            "timestamp": "2025-03-07T04:12:00"
        },
        {
            "cpu_temperature": 44.8617,
            "cpu_usage": 1.06833,
            "ram_usage": 37.4,
            "system_load": 0.128906,
            "network_sent_bytes": 156480378603,
            "network_recv_bytes": 14067936754,
            "timestamp": "2025-03-07T04:13:00"
        },
        {
            "cpu_temperature": 44.7417,
            "cpu_usage": 1.2,
            "ram_usage": 37.4,
            "system_load": 0.194824,
            "network_sent_bytes": 156480405618,
            "network_recv_bytes": 14067962196,
            "timestamp": "2025-03-07T04:14:00"
        },
        {
            "cpu_temperature": 44.7767,
            "cpu_usage": 1.27167,
            "ram_usage": 37.5,
            "system_load": 0.132812,
            "network_sent_bytes": 156480470525,
            "network_recv_bytes": 14068024748,
            "timestamp": "2025-03-07T04:15:00"
        },
        {
            "cpu_temperature": 44.7283,
            "cpu_usage": 1.17,
            "ram_usage": 37.5,
            "system_load": 0.231445,
            "network_sent_bytes": 156480511647,
            "network_recv_bytes": 14068067943,
            "timestamp": "2025-03-07T04:16:00"
        },
        {
            "cpu_temperature": 44.7917,
            "cpu_usage": 1.18833,
            "ram_usage": 37.5,
            "system_load": 0.256836,
            "network_sent_bytes": 156480550869,
            "network_recv_bytes": 14068105295,
            "timestamp": "2025-03-07T04:17:00"
        },
        {
            "cpu_temperature": 44.8183,
            "cpu_usage": 1.175,
            "ram_usage": 37.4,
            "system_load": 0.0922852,
            "network_sent_bytes": 156480597174,
            "network_recv_bytes": 14068150053,
            "timestamp": "2025-03-07T04:18:00"
        },
        {
            "cpu_temperature": 44.805,
            "cpu_usage": 1.26833,
            "ram_usage": 37.4,
            "system_load": 0.229492,
            "network_sent_bytes": 156480624880,
            "network_recv_bytes": 14068176705,
            "timestamp": "2025-03-07T04:19:00"
        },
        {
            "cpu_temperature": 44.6767,
            "cpu_usage": 1.185,
            "ram_usage": 37.5,
            "system_load": 0.149414,
            "network_sent_bytes": 156480660347,
            "network_recv_bytes": 14068210354,
            "timestamp": "2025-03-07T04:20:00"
        },
        {
            "cpu_temperature": 44.6883,
            "cpu_usage": 1.15833,
            "ram_usage": 37.4,
            "system_load": 0.258789,
            "network_sent_bytes": 156480699446,
            "network_recv_bytes": 14068253832,
            "timestamp": "2025-03-07T04:21:00"
        },
        {
            "cpu_temperature": 44.8567,
            "cpu_usage": 1.19167,
            "ram_usage": 37.4,
            "system_load": 0.287598,
            "network_sent_bytes": 156480734581,
            "network_recv_bytes": 14068287577,
            "timestamp": "2025-03-07T04:22:00"
        },
        {
            "cpu_temperature": 44.6167,
            "cpu_usage": 1.14167,
            "ram_usage": 37.4,
            "system_load": 0.103516,
            "network_sent_bytes": 156480761787,
            "network_recv_bytes": 14068313557,
            "timestamp": "2025-03-07T04:23:00"
        },
        {
            "cpu_temperature": 44.7467,
            "cpu_usage": 1.16333,
            "ram_usage": 37.3,
            "system_load": 0.167969,
            "network_sent_bytes": 156480790626,
            "network_recv_bytes": 14068341218,
            "timestamp": "2025-03-07T04:24:00"
        },
        {
            "cpu_temperature": 44.7483,
            "cpu_usage": 1.185,
            "ram_usage": 37.3,
            "system_load": 0.188477,
            "network_sent_bytes": 156480823377,
            "network_recv_bytes": 14068368404,
            "timestamp": "2025-03-07T04:25:00"
        },
        {
            "cpu_temperature": 44.6367,
            "cpu_usage": 1.10667,
            "ram_usage": 37.3,
            "system_load": 0.0668945,
            "network_sent_bytes": 156480852006,
            "network_recv_bytes": 14068401197,
            "timestamp": "2025-03-07T04:26:00"
        },
        {
            "cpu_temperature": 44.7183,
            "cpu_usage": 1.15167,
            "ram_usage": 37.3,
            "system_load": 0.185059,
            "network_sent_bytes": 156480882321,
            "network_recv_bytes": 14068430216,
            "timestamp": "2025-03-07T04:27:00"
        },
        {
            "cpu_temperature": 44.6283,
            "cpu_usage": 1.18833,
            "ram_usage": 37.3,
            "system_load": 0.179199,
            "network_sent_bytes": 156480909029,
            "network_recv_bytes": 14068455780,
            "timestamp": "2025-03-07T04:28:00"
        },
        {
            "cpu_temperature": 44.6917,
            "cpu_usage": 1.23333,
            "ram_usage": 37.3,
            "system_load": 0.225098,
            "network_sent_bytes": 156480935397,
            "network_recv_bytes": 14068481010,
            "timestamp": "2025-03-07T04:29:00"
        },
        {
            "cpu_temperature": 44.69,
            "cpu_usage": 1.16667,
            "ram_usage": 37.3,
            "system_load": 0.311035,
            "network_sent_bytes": 156480963537,
            "network_recv_bytes": 14068507524,
            "timestamp": "2025-03-07T04:30:00"
        },
        {
            "cpu_temperature": 44.675,
            "cpu_usage": 1.07167,
            "ram_usage": 37.3,
            "system_load": 0.112305,
            "network_sent_bytes": 156480991910,
            "network_recv_bytes": 14068540402,
            "timestamp": "2025-03-07T04:31:00"
        },
        {
            "cpu_temperature": 44.9233,
            "cpu_usage": 1.17167,
            "ram_usage": 37.4,
            "system_load": 0.251953,
            "network_sent_bytes": 156481027227,
            "network_recv_bytes": 14068574345,
            "timestamp": "2025-03-07T04:32:00"
        },
        {
            "cpu_temperature": 44.7067,
            "cpu_usage": 1.14,
            "ram_usage": 37.4,
            "system_load": 0.331055,
            "network_sent_bytes": 156481056931,
            "network_recv_bytes": 14068602837,
            "timestamp": "2025-03-07T04:33:00"
        },
        {
            "cpu_temperature": 44.7467,
            "cpu_usage": 1.18167,
            "ram_usage": 37.3,
            "system_load": 0.119629,
            "network_sent_bytes": 156481084820,
            "network_recv_bytes": 14068629424,
            "timestamp": "2025-03-07T04:34:00"
        },
        {
            "cpu_temperature": 44.8417,
            "cpu_usage": 1.22667,
            "ram_usage": 37.3,
            "system_load": 0.338379,
            "network_sent_bytes": 156481112728,
            "network_recv_bytes": 14068655822,
            "timestamp": "2025-03-07T04:35:00"
        },
        {
            "cpu_temperature": 44.8783,
            "cpu_usage": 1.15333,
            "ram_usage": 37.4,
            "system_load": 0.234863,
            "network_sent_bytes": 156481149556,
            "network_recv_bytes": 14068697114,
            "timestamp": "2025-03-07T04:36:00"
        },
        {
            "cpu_temperature": 45.0417,
            "cpu_usage": 1.16,
            "ram_usage": 37.4,
            "system_load": 0.164551,
            "network_sent_bytes": 156481181004,
            "network_recv_bytes": 14068723354,
            "timestamp": "2025-03-07T04:37:00"
        },
        {
            "cpu_temperature": 44.9383,
            "cpu_usage": 1.13333,
            "ram_usage": 37.3,
            "system_load": 0.351074,
            "network_sent_bytes": 156481208181,
            "network_recv_bytes": 14068748772,
            "timestamp": "2025-03-07T04:38:00"
        },
        {
            "cpu_temperature": 45.025,
            "cpu_usage": 1.265,
            "ram_usage": 37.4,
            "system_load": 0.12793,
            "network_sent_bytes": 156481235042,
            "network_recv_bytes": 14068774543,
            "timestamp": "2025-03-07T04:39:00"
        },
        {
            "cpu_temperature": 44.93,
            "cpu_usage": 1.06,
            "ram_usage": 37.4,
            "system_load": 0.257812,
            "network_sent_bytes": 156481264400,
            "network_recv_bytes": 14068802261,
            "timestamp": "2025-03-07T04:40:00"
        },
        {
            "cpu_temperature": 44.8417,
            "cpu_usage": 1.19833,
            "ram_usage": 37.4,
            "system_load": 0.217285,
            "network_sent_bytes": 156481294417,
            "network_recv_bytes": 14068836348,
            "timestamp": "2025-03-07T04:41:00"
        },
        {
            "cpu_temperature": 44.9467,
            "cpu_usage": 1.18833,
            "ram_usage": 37.4,
            "system_load": 0.0776367,
            "network_sent_bytes": 156481323434,
            "network_recv_bytes": 14068864019,
            "timestamp": "2025-03-07T04:42:00"
        },
        {
            "cpu_temperature": 44.8983,
            "cpu_usage": 1.11333,
            "ram_usage": 37.4,
            "system_load": 0.24707,
            "network_sent_bytes": 156481350356,
            "network_recv_bytes": 14068889689,
            "timestamp": "2025-03-07T04:43:00"
        },
        {
            "cpu_temperature": 44.6917,
            "cpu_usage": 1.23667,
            "ram_usage": 37.4,
            "system_load": 0.131836,
            "network_sent_bytes": 156481376818,
            "network_recv_bytes": 14068914959,
            "timestamp": "2025-03-07T04:44:00"
        },
        {
            "cpu_temperature": 44.7767,
            "cpu_usage": 1.11,
            "ram_usage": 37.3,
            "system_load": 0.0463867,
            "network_sent_bytes": 156481414515,
            "network_recv_bytes": 14068950938,
            "timestamp": "2025-03-07T04:45:00"
        },
        {
            "cpu_temperature": 44.8717,
            "cpu_usage": 1.085,
            "ram_usage": 37.1,
            "system_load": 0.241699,
            "network_sent_bytes": 156481443825,
            "network_recv_bytes": 14068984747,
            "timestamp": "2025-03-07T04:46:00"
        },
        {
            "cpu_temperature": 44.83,
            "cpu_usage": 1.10167,
            "ram_usage": 37.3,
            "system_load": 0.13916,
            "network_sent_bytes": 156481470025,
            "network_recv_bytes": 14069009919,
            "timestamp": "2025-03-07T04:47:00"
        },
        {
            "cpu_temperature": 44.9233,
            "cpu_usage": 1.01333,
            "ram_usage": 37.2,
            "system_load": 0.197754,
            "network_sent_bytes": 156481499165,
            "network_recv_bytes": 14069038074,
            "timestamp": "2025-03-07T04:48:00"
        },
        {
            "cpu_temperature": 45.0117,
            "cpu_usage": 1.135,
            "ram_usage": 37.4,
            "system_load": 0.203613,
            "network_sent_bytes": 156481532686,
            "network_recv_bytes": 14069066341,
            "timestamp": "2025-03-07T04:49:00"
        },
        {
            "cpu_temperature": 44.9883,
            "cpu_usage": 1.10167,
            "ram_usage": 37.2,
            "system_load": 0.132812,
            "network_sent_bytes": 156481563002,
            "network_recv_bytes": 14069095137,
            "timestamp": "2025-03-07T04:50:00"
        },
        {
            "cpu_temperature": 45.0183,
            "cpu_usage": 1.15,
            "ram_usage": 37.4,
            "system_load": 0.510254,
            "network_sent_bytes": 156481599980,
            "network_recv_bytes": 14069134824,
            "timestamp": "2025-03-07T04:51:00"
        },
        {
            "cpu_temperature": 44.91,
            "cpu_usage": 1.18667,
            "ram_usage": 37.3,
            "system_load": 0.27832,
            "network_sent_bytes": 156481627221,
            "network_recv_bytes": 14069160893,
            "timestamp": "2025-03-07T04:52:00"
        },
        {
            "cpu_temperature": 44.89,
            "cpu_usage": 1.21167,
            "ram_usage": 37.3,
            "system_load": 0.196289,
            "network_sent_bytes": 156481654304,
            "network_recv_bytes": 14069186802,
            "timestamp": "2025-03-07T04:53:00"
        },
        {
            "cpu_temperature": 44.94,
            "cpu_usage": 1.28667,
            "ram_usage": 37.4,
            "system_load": 0.228516,
            "network_sent_bytes": 156481680301,
            "network_recv_bytes": 14069211691,
            "timestamp": "2025-03-07T04:54:00"
        },
        {
            "cpu_temperature": 44.8917,
            "cpu_usage": 1.29333,
            "ram_usage": 37.4,
            "system_load": 0.130859,
            "network_sent_bytes": 156481708927,
            "network_recv_bytes": 14069238687,
            "timestamp": "2025-03-07T04:55:00"
        },
        {
            "cpu_temperature": 44.8617,
            "cpu_usage": 1.15333,
            "ram_usage": 37.4,
            "system_load": 0.189453,
            "network_sent_bytes": 156481736292,
            "network_recv_bytes": 14069270808,
            "timestamp": "2025-03-07T04:56:00"
        },
        {
            "cpu_temperature": 44.8867,
            "cpu_usage": 1.27167,
            "ram_usage": 37.3,
            "system_load": 0.255859,
            "network_sent_bytes": 156481764118,
            "network_recv_bytes": 14069297304,
            "timestamp": "2025-03-07T04:57:00"
        },
        {
            "cpu_temperature": 44.8433,
            "cpu_usage": 1.16167,
            "ram_usage": 37.4,
            "system_load": 0.0922852,
            "network_sent_bytes": 156481792888,
            "network_recv_bytes": 14069325085,
            "timestamp": "2025-03-07T04:58:00"
        },
        {
            "cpu_temperature": 44.8467,
            "cpu_usage": 1.26,
            "ram_usage": 37.3,
            "system_load": 0.282227,
            "network_sent_bytes": 156481819676,
            "network_recv_bytes": 14069350695,
            "timestamp": "2025-03-07T04:59:00"
        },
        {
            "cpu_temperature": 44.7817,
            "cpu_usage": 1.48,
            "ram_usage": 37.4,
            "system_load": 0.13623,
            "network_sent_bytes": 156481873834,
            "network_recv_bytes": 14069403359,
            "timestamp": "2025-03-07T05:00:00"
        },
        {
            "cpu_temperature": 44.965,
            "cpu_usage": 1.275,
            "ram_usage": 37.3,
            "system_load": 0.0478516,
            "network_sent_bytes": 156481910794,
            "network_recv_bytes": 14069440774,
            "timestamp": "2025-03-07T05:01:00"
        },
        {
            "cpu_temperature": 44.83,
            "cpu_usage": 1.24333,
            "ram_usage": 37.4,
            "system_load": 0.210938,
            "network_sent_bytes": 156481939091,
            "network_recv_bytes": 14069467787,
            "timestamp": "2025-03-07T05:02:00"
        },
        {
            "cpu_temperature": 44.9333,
            "cpu_usage": 1.195,
            "ram_usage": 37.3,
            "system_load": 0.0756836,
            "network_sent_bytes": 156481966682,
            "network_recv_bytes": 14069493805,
            "timestamp": "2025-03-07T05:03:00"
        },
        {
            "cpu_temperature": 44.915,
            "cpu_usage": 1.16333,
            "ram_usage": 37.4,
            "system_load": 0.168945,
            "network_sent_bytes": 156481994648,
            "network_recv_bytes": 14069520575,
            "timestamp": "2025-03-07T05:04:00"
        },
        {
            "cpu_temperature": 44.9267,
            "cpu_usage": 1.265,
            "ram_usage": 37.4,
            "system_load": 0.209961,
            "network_sent_bytes": 156482023070,
            "network_recv_bytes": 14069547501,
            "timestamp": "2025-03-07T05:05:00"
        },
        {
            "cpu_temperature": 44.98,
            "cpu_usage": 1.08167,
            "ram_usage": 37.2,
            "system_load": 0.112793,
            "network_sent_bytes": 156482055726,
            "network_recv_bytes": 14069584541,
            "timestamp": "2025-03-07T05:06:00"
        },
        {
            "cpu_temperature": 44.7933,
            "cpu_usage": 1.065,
            "ram_usage": 37.3,
            "system_load": 0.28418,
            "network_sent_bytes": 156482084479,
            "network_recv_bytes": 14069612060,
            "timestamp": "2025-03-07T05:07:00"
        },
        {
            "cpu_temperature": 44.8567,
            "cpu_usage": 1.085,
            "ram_usage": 37.2,
            "system_load": 0.172363,
            "network_sent_bytes": 156482113439,
            "network_recv_bytes": 14069639784,
            "timestamp": "2025-03-07T05:08:00"
        },
        {
            "cpu_temperature": 44.8383,
            "cpu_usage": 1.20333,
            "ram_usage": 37.4,
            "system_load": 0.0615234,
            "network_sent_bytes": 156482145781,
            "network_recv_bytes": 14069670898,
            "timestamp": "2025-03-07T05:09:00"
        },
        {
            "cpu_temperature": 44.8083,
            "cpu_usage": 1.18333,
            "ram_usage": 37.3,
            "system_load": 0.283203,
            "network_sent_bytes": 156482175200,
            "network_recv_bytes": 14069698579,
            "timestamp": "2025-03-07T05:10:00"
        },
        {
            "cpu_temperature": 44.7617,
            "cpu_usage": 1.16833,
            "ram_usage": 37.3,
            "system_load": 0.143555,
            "network_sent_bytes": 156482202308,
            "network_recv_bytes": 14069730301,
            "timestamp": "2025-03-07T05:11:00"
        },
        {
            "cpu_temperature": 44.76,
            "cpu_usage": 1.16833,
            "ram_usage": 37.4,
            "system_load": 0.193848,
            "network_sent_bytes": 156482248286,
            "network_recv_bytes": 14069774701,
            "timestamp": "2025-03-07T05:12:00"
        },
        {
            "cpu_temperature": 44.7567,
            "cpu_usage": 1.19667,
            "ram_usage": 37.4,
            "system_load": 0.15625,
            "network_sent_bytes": 156482278382,
            "network_recv_bytes": 14069799309,
            "timestamp": "2025-03-07T05:13:00"
        },
        {
            "cpu_temperature": 44.7117,
            "cpu_usage": 1.22,
            "ram_usage": 37.4,
            "system_load": 0.0556641,
            "network_sent_bytes": 156482300323,
            "network_recv_bytes": 14069820046,
            "timestamp": "2025-03-07T05:14:00"
        },
        {
            "cpu_temperature": 44.775,
            "cpu_usage": 1.17,
            "ram_usage": 37.5,
            "system_load": 0.195312,
            "network_sent_bytes": 156482324717,
            "network_recv_bytes": 14069842281,
            "timestamp": "2025-03-07T05:15:00"
        },
        {
            "cpu_temperature": 44.8483,
            "cpu_usage": 1.21333,
            "ram_usage": 37.3,
            "system_load": 0.178711,
            "network_sent_bytes": 156482347990,
            "network_recv_bytes": 14069870125,
            "timestamp": "2025-03-07T05:16:00"
        },
        {
            "cpu_temperature": 44.815,
            "cpu_usage": 1.17667,
            "ram_usage": 37.3,
            "system_load": 0.0991211,
            "network_sent_bytes": 156482370083,
            "network_recv_bytes": 14069891046,
            "timestamp": "2025-03-07T05:17:00"
        },
        {
            "cpu_temperature": 44.8533,
            "cpu_usage": 1.15,
            "ram_usage": 37.2,
            "system_load": 0.229004,
            "network_sent_bytes": 156482392277,
            "network_recv_bytes": 14069912141,
            "timestamp": "2025-03-07T05:18:00"
        },
        {
            "cpu_temperature": 44.7367,
            "cpu_usage": 1.16167,
            "ram_usage": 37.3,
            "system_load": 0.131348,
            "network_sent_bytes": 156482414292,
            "network_recv_bytes": 14069933070,
            "timestamp": "2025-03-07T05:19:00"
        },
        {
            "cpu_temperature": 44.5967,
            "cpu_usage": 1.21333,
            "ram_usage": 37.3,
            "system_load": 0.24707,
            "network_sent_bytes": 156482453908,
            "network_recv_bytes": 14069970736,
            "timestamp": "2025-03-07T05:20:00"
        },
        {
            "cpu_temperature": 44.55,
            "cpu_usage": 1.21667,
            "ram_usage": 37.3,
            "system_load": 0.175293,
            "network_sent_bytes": 156482477310,
            "network_recv_bytes": 14069998749,
            "timestamp": "2025-03-07T05:21:00"
        },
        {
            "cpu_temperature": 44.7317,
            "cpu_usage": 1.15833,
            "ram_usage": 37.3,
            "system_load": 0.0620117,
            "network_sent_bytes": 156482500119,
            "network_recv_bytes": 14070020140,
            "timestamp": "2025-03-07T05:22:00"
        },
        {
            "cpu_temperature": 44.6883,
            "cpu_usage": 1.14833,
            "ram_usage": 37.2,
            "system_load": 0.327637,
            "network_sent_bytes": 156482522273,
            "network_recv_bytes": 14070041100,
            "timestamp": "2025-03-07T05:23:00"
        },
        {
            "cpu_temperature": 44.5733,
            "cpu_usage": 1.23167,
            "ram_usage": 37.3,
            "system_load": 0.118164,
            "network_sent_bytes": 156482544164,
            "network_recv_bytes": 14070061611,
            "timestamp": "2025-03-07T05:24:00"
        },
        {
            "cpu_temperature": 44.8217,
            "cpu_usage": 1.16167,
            "ram_usage": 37.3,
            "system_load": 0.0766602,
            "network_sent_bytes": 156482574392,
            "network_recv_bytes": 14070086261,
            "timestamp": "2025-03-07T05:25:00"
        },
        {
            "cpu_temperature": 44.9383,
            "cpu_usage": 1.07333,
            "ram_usage": 37.1,
            "system_load": 0.221191,
            "network_sent_bytes": 156482597791,
            "network_recv_bytes": 14070114219,
            "timestamp": "2025-03-07T05:26:00"
        },
        {
            "cpu_temperature": 44.9033,
            "cpu_usage": 1.095,
            "ram_usage": 37.3,
            "system_load": 0.15332,
            "network_sent_bytes": 156482620490,
            "network_recv_bytes": 14070135163,
            "timestamp": "2025-03-07T05:27:00"
        },
        {
            "cpu_temperature": 44.8917,
            "cpu_usage": 1.04667,
            "ram_usage": 37.1,
            "system_load": 0.198242,
            "network_sent_bytes": 156482642860,
            "network_recv_bytes": 14070156313,
            "timestamp": "2025-03-07T05:28:00"
        },
        {
            "cpu_temperature": 45.2083,
            "cpu_usage": 1.06833,
            "ram_usage": 37.3,
            "system_load": 0.157227,
            "network_sent_bytes": 156482665025,
            "network_recv_bytes": 14070177086,
            "timestamp": "2025-03-07T05:29:00"
        },
        {
            "cpu_temperature": 45.1617,
            "cpu_usage": 1.11,
            "ram_usage": 37.2,
            "system_load": 0.0561523,
            "network_sent_bytes": 156482690933,
            "network_recv_bytes": 14070201946,
            "timestamp": "2025-03-07T05:30:00"
        },
        {
            "cpu_temperature": 45.1567,
            "cpu_usage": 1.07333,
            "ram_usage": 37.3,
            "system_load": 0.195312,
            "network_sent_bytes": 156482716786,
            "network_recv_bytes": 14070229978,
            "timestamp": "2025-03-07T05:31:00"
        },
        {
            "cpu_temperature": 45.02,
            "cpu_usage": 0.975,
            "ram_usage": 37.1,
            "system_load": 0.104492,
            "network_sent_bytes": 156482738531,
            "network_recv_bytes": 14070250483,
            "timestamp": "2025-03-07T05:32:00"
        },
        {
            "cpu_temperature": 44.9383,
            "cpu_usage": 1.13,
            "ram_usage": 37.3,
            "system_load": 0.0356445,
            "network_sent_bytes": 156482760565,
            "network_recv_bytes": 14070271255,
            "timestamp": "2025-03-07T05:33:00"
        },
        {
            "cpu_temperature": 45.0217,
            "cpu_usage": 1.07667,
            "ram_usage": 37,
            "system_load": 0.258301,
            "network_sent_bytes": 156482782322,
            "network_recv_bytes": 14070291762,
            "timestamp": "2025-03-07T05:34:00"
        },
        {
            "cpu_temperature": 44.8833,
            "cpu_usage": 1.15,
            "ram_usage": 37.3,
            "system_load": 0.0932617,
            "network_sent_bytes": 156482815770,
            "network_recv_bytes": 14070323452,
            "timestamp": "2025-03-07T05:35:00"
        },
        {
            "cpu_temperature": 44.7917,
            "cpu_usage": 1.11833,
            "ram_usage": 37.1,
            "system_load": 0.175781,
            "network_sent_bytes": 156482840594,
            "network_recv_bytes": 14070352899,
            "timestamp": "2025-03-07T05:36:00"
        },
        {
            "cpu_temperature": 44.745,
            "cpu_usage": 1.095,
            "ram_usage": 37.3,
            "system_load": 0.183105,
            "network_sent_bytes": 156482868446,
            "network_recv_bytes": 14070375349,
            "timestamp": "2025-03-07T05:37:00"
        },
        {
            "cpu_temperature": 44.6267,
            "cpu_usage": 1.07167,
            "ram_usage": 37.2,
            "system_load": 0.232422,
            "network_sent_bytes": 156482890481,
            "network_recv_bytes": 14070396032,
            "timestamp": "2025-03-07T05:38:00"
        },
        {
            "cpu_temperature": 44.7233,
            "cpu_usage": 1.23833,
            "ram_usage": 37.3,
            "system_load": 0.259766,
            "network_sent_bytes": 156482912945,
            "network_recv_bytes": 14070416773,
            "timestamp": "2025-03-07T05:39:00"
        },
        {
            "cpu_temperature": 44.5967,
            "cpu_usage": 1.155,
            "ram_usage": 37.1,
            "system_load": 0.128418,
            "network_sent_bytes": 156482937227,
            "network_recv_bytes": 14070439481,
            "timestamp": "2025-03-07T05:40:00"
        },
        {
            "cpu_temperature": 44.6617,
            "cpu_usage": 1.06167,
            "ram_usage": 37.2,
            "system_load": 0.0454102,
            "network_sent_bytes": 156482960524,
            "network_recv_bytes": 14070467284,
            "timestamp": "2025-03-07T05:41:00"
        },
        {
            "cpu_temperature": 44.6533,
            "cpu_usage": 1.15333,
            "ram_usage": 37.2,
            "system_load": 0.209473,
            "network_sent_bytes": 156482983895,
            "network_recv_bytes": 14070489459,
            "timestamp": "2025-03-07T05:42:00"
        },
        {
            "cpu_temperature": 44.6717,
            "cpu_usage": 1.08167,
            "ram_usage": 37.3,
            "system_load": 0.187012,
            "network_sent_bytes": 156483009249,
            "network_recv_bytes": 14070513493,
            "timestamp": "2025-03-07T05:43:00"
        },
        {
            "cpu_temperature": 44.7283,
            "cpu_usage": 1.15167,
            "ram_usage": 37.3,
            "system_load": 0.28418,
            "network_sent_bytes": 156483031040,
            "network_recv_bytes": 14070534154,
            "timestamp": "2025-03-07T05:44:00"
        },
        {
            "cpu_temperature": 44.8367,
            "cpu_usage": 1.18667,
            "ram_usage": 37.3,
            "system_load": 0.237793,
            "network_sent_bytes": 156483055756,
            "network_recv_bytes": 14070556525,
            "timestamp": "2025-03-07T05:45:00"
        },
        {
            "cpu_temperature": 44.78,
            "cpu_usage": 1.09667,
            "ram_usage": 37.2,
            "system_load": 0.13916,
            "network_sent_bytes": 156483079697,
            "network_recv_bytes": 14070584534,
            "timestamp": "2025-03-07T05:46:00"
        },
        {
            "cpu_temperature": 44.8617,
            "cpu_usage": 1.02833,
            "ram_usage": 36.9,
            "system_load": 0.294434,
            "network_sent_bytes": 156483101770,
            "network_recv_bytes": 14070605329,
            "timestamp": "2025-03-07T05:47:00"
        },
        {
            "cpu_temperature": 44.8433,
            "cpu_usage": 0.956667,
            "ram_usage": 37.3,
            "system_load": 0.222168,
            "network_sent_bytes": 156483124087,
            "network_recv_bytes": 14070626691,
            "timestamp": "2025-03-07T05:48:00"
        },
        {
            "cpu_temperature": 44.9417,
            "cpu_usage": 0.986667,
            "ram_usage": 36.9,
            "system_load": 0.0800781,
            "network_sent_bytes": 156483150092,
            "network_recv_bytes": 14070647314,
            "timestamp": "2025-03-07T05:49:00"
        },
        {
            "cpu_temperature": 44.87,
            "cpu_usage": 0.956667,
            "ram_usage": 37.3,
            "system_load": 0.330566,
            "network_sent_bytes": 156483174869,
            "network_recv_bytes": 14070676637,
            "timestamp": "2025-03-07T05:50:00"
        },
        {
            "cpu_temperature": 44.9667,
            "cpu_usage": 1.01,
            "ram_usage": 37,
            "system_load": 0.160645,
            "network_sent_bytes": 156483197614,
            "network_recv_bytes": 14070697622,
            "timestamp": "2025-03-07T05:51:00"
        },
        {
            "cpu_temperature": 44.8517,
            "cpu_usage": 1,
            "ram_usage": 37.2,
            "system_load": 0.249023,
            "network_sent_bytes": 156483219891,
            "network_recv_bytes": 14070718705,
            "timestamp": "2025-03-07T05:52:00"
        },
        {
            "cpu_temperature": 44.8533,
            "cpu_usage": 0.976667,
            "ram_usage": 37,
            "system_load": 0.17627,
            "network_sent_bytes": 156483242129,
            "network_recv_bytes": 14070739557,
            "timestamp": "2025-03-07T05:53:00"
        },
        {
            "cpu_temperature": 45.0067,
            "cpu_usage": 1.01833,
            "ram_usage": 37.3,
            "system_load": 0.0629883,
            "network_sent_bytes": 156483264034,
            "network_recv_bytes": 14070760390,
            "timestamp": "2025-03-07T05:54:00"
        },
        {
            "cpu_temperature": 44.875,
            "cpu_usage": 1.09833,
            "ram_usage": 37.1,
            "system_load": 0.197754,
            "network_sent_bytes": 156483288269,
            "network_recv_bytes": 14070783471,
            "timestamp": "2025-03-07T05:55:00"
        },
        {
            "cpu_temperature": 44.965,
            "cpu_usage": 1.07667,
            "ram_usage": 37.3,
            "system_load": 0.150879,
            "network_sent_bytes": 156483313312,
            "network_recv_bytes": 14070811550,
            "timestamp": "2025-03-07T05:56:00"
        },
        {
            "cpu_temperature": 45.0683,
            "cpu_usage": 1.10333,
            "ram_usage": 37.1,
            "system_load": 0.141602,
            "network_sent_bytes": 156483335524,
            "network_recv_bytes": 14070832454,
            "timestamp": "2025-03-07T05:57:00"
        },
        {
            "cpu_temperature": 44.845,
            "cpu_usage": 1.04,
            "ram_usage": 37.3,
            "system_load": 0.38916,
            "network_sent_bytes": 156483357425,
            "network_recv_bytes": 14070853225,
            "timestamp": "2025-03-07T05:58:00"
        },
        {
            "cpu_temperature": 45.0567,
            "cpu_usage": 1.08333,
            "ram_usage": 37.1,
            "system_load": 0.211426,
            "network_sent_bytes": 156483379409,
            "network_recv_bytes": 14070873783,
            "timestamp": "2025-03-07T05:59:00"
        },
        {
            "cpu_temperature": 44.9017,
            "cpu_usage": 1.45,
            "ram_usage": 37.3,
            "system_load": 0.219727,
            "network_sent_bytes": 156483426217,
            "network_recv_bytes": 14070919123,
            "timestamp": "2025-03-07T06:00:00"
        },
        {
            "cpu_temperature": 45.1333,
            "cpu_usage": 1.21333,
            "ram_usage": 37.2,
            "system_load": 0.165039,
            "network_sent_bytes": 156483455220,
            "network_recv_bytes": 14070948609,
            "timestamp": "2025-03-07T06:01:00"
        },
        {
            "cpu_temperature": 45.075,
            "cpu_usage": 1.12333,
            "ram_usage": 37.3,
            "system_load": 0.059082,
            "network_sent_bytes": 156483477264,
            "network_recv_bytes": 14070969321,
            "timestamp": "2025-03-07T06:02:00"
        },
        {
            "cpu_temperature": 45.0533,
            "cpu_usage": 1.125,
            "ram_usage": 37.3,
            "system_load": 0.323242,
            "network_sent_bytes": 156483499638,
            "network_recv_bytes": 14070989944,
            "timestamp": "2025-03-07T06:03:00"
        },
        {
            "cpu_temperature": 44.9883,
            "cpu_usage": 1.20833,
            "ram_usage": 37.3,
            "system_load": 0.186035,
            "network_sent_bytes": 156483521505,
            "network_recv_bytes": 14071010449,
            "timestamp": "2025-03-07T06:04:00"
        },
        {
            "cpu_temperature": 45.05,
            "cpu_usage": 0.975,
            "ram_usage": 36.9,
            "system_load": 0.0668945,
            "network_sent_bytes": 156483543588,
            "network_recv_bytes": 14071031268,
            "timestamp": "2025-03-07T06:05:00"
        },
        {
            "cpu_temperature": 45.0483,
            "cpu_usage": 1.02833,
            "ram_usage": 37.3,
            "system_load": 0.342773,
            "network_sent_bytes": 156483568929,
            "network_recv_bytes": 14071060905,
            "timestamp": "2025-03-07T06:06:00"
        },
        {
            "cpu_temperature": 45.0483,
            "cpu_usage": 1.20333,
            "ram_usage": 37.2,
            "system_load": 0.123535,
            "network_sent_bytes": 156483590990,
            "network_recv_bytes": 14071081850,
            "timestamp": "2025-03-07T06:07:00"
        },
        {
            "cpu_temperature": 45.05,
            "cpu_usage": 1.075,
            "ram_usage": 37.3,
            "system_load": 0.186523,
            "network_sent_bytes": 156483613234,
            "network_recv_bytes": 14071102764,
            "timestamp": "2025-03-07T06:08:00"
        },
        {
            "cpu_temperature": 45.1117,
            "cpu_usage": 1.20333,
            "ram_usage": 37.3,
            "system_load": 0.153809,
            "network_sent_bytes": 156483635148,
            "network_recv_bytes": 14071123570,
            "timestamp": "2025-03-07T06:09:00"
        },
        {
            "cpu_temperature": 45.0667,
            "cpu_usage": 1.23333,
            "ram_usage": 37.3,
            "system_load": 0.0922852,
            "network_sent_bytes": 156483658554,
            "network_recv_bytes": 14071145832,
            "timestamp": "2025-03-07T06:10:00"
        },
        {
            "cpu_temperature": 45.065,
            "cpu_usage": 1.22167,
            "ram_usage": 37.3,
            "system_load": 0.282227,
            "network_sent_bytes": 156483683213,
            "network_recv_bytes": 14071174497,
            "timestamp": "2025-03-07T06:11:00"
        },
        {
            "cpu_temperature": 44.9917,
            "cpu_usage": 1.13,
            "ram_usage": 37.3,
            "system_load": 0.13623,
            "network_sent_bytes": 156483705104,
            "network_recv_bytes": 14071195008,
            "timestamp": "2025-03-07T06:12:00"
        },
        {
            "cpu_temperature": 45.04,
            "cpu_usage": 1.13833,
            "ram_usage": 37.3,
            "system_load": 0.0478516,
            "network_sent_bytes": 156483731029,
            "network_recv_bytes": 14071215549,
            "timestamp": "2025-03-07T06:13:00"
        },
        {
            "cpu_temperature": 45.03,
            "cpu_usage": 1.195,
            "ram_usage": 37.3,
            "system_load": 0.246094,
            "network_sent_bytes": 156483752748,
            "network_recv_bytes": 14071236046,
            "timestamp": "2025-03-07T06:14:00"
        },
        {
            "cpu_temperature": 45.0083,
            "cpu_usage": 1.18333,
            "ram_usage": 37.3,
            "system_load": 0.0878906,
            "network_sent_bytes": 156483777097,
            "network_recv_bytes": 14071258432,
            "timestamp": "2025-03-07T06:15:00"
        },
        {
            "cpu_temperature": 45.0517,
            "cpu_usage": 1.05,
            "ram_usage": 37,
            "system_load": 0.172852,
            "network_sent_bytes": 156483800305,
            "network_recv_bytes": 14071286043,
            "timestamp": "2025-03-07T06:16:00"
        },
        {
            "cpu_temperature": 45.1883,
            "cpu_usage": 1.07,
            "ram_usage": 37.3,
            "system_load": 0.147949,
            "network_sent_bytes": 156483822360,
            "network_recv_bytes": 14071306906,
            "timestamp": "2025-03-07T06:17:00"
        },
        {
            "cpu_temperature": 45.07,
            "cpu_usage": 1.02167,
            "ram_usage": 37.1,
            "system_load": 0.0517578,
            "network_sent_bytes": 156483844777,
            "network_recv_bytes": 14071328240,
            "timestamp": "2025-03-07T06:18:00"
        },
        {
            "cpu_temperature": 45.0683,
            "cpu_usage": 1.14667,
            "ram_usage": 37.3,
            "system_load": 0.337402,
            "network_sent_bytes": 156483866526,
            "network_recv_bytes": 14071348841,
            "timestamp": "2025-03-07T06:19:00"
        },
        {
            "cpu_temperature": 45.0867,
            "cpu_usage": 1.08667,
            "ram_usage": 37.1,
            "system_load": 0.191406,
            "network_sent_bytes": 156483889971,
            "network_recv_bytes": 14071371079,
            "timestamp": "2025-03-07T06:20:00"
        },
        {
            "cpu_temperature": 45.015,
            "cpu_usage": 1.08333,
            "ram_usage": 37.3,
            "system_load": 0.0683594,
            "network_sent_bytes": 156483913830,
            "network_recv_bytes": 14071398924,
            "timestamp": "2025-03-07T06:21:00"
        },
        {
            "cpu_temperature": 45.0283,
            "cpu_usage": 1.16333,
            "ram_usage": 37.2,
            "system_load": 0.218262,
            "network_sent_bytes": 156483935682,
            "network_recv_bytes": 14071419422,
            "timestamp": "2025-03-07T06:22:00"
        },
        {
            "cpu_temperature": 44.975,
            "cpu_usage": 1.14167,
            "ram_usage": 37.2,
            "system_load": 0.078125,
            "network_sent_bytes": 156483957431,
            "network_recv_bytes": 14071440023,
            "timestamp": "2025-03-07T06:23:00"
        },
        {
            "cpu_temperature": 45.0583,
            "cpu_usage": 1.19833,
            "ram_usage": 37.3,
            "system_load": 0.169922,
            "network_sent_bytes": 156483979165,
            "network_recv_bytes": 14071460589,
            "timestamp": "2025-03-07T06:24:00"
        },
        {
            "cpu_temperature": 44.8933,
            "cpu_usage": 1.22833,
            "ram_usage": 37.4,
            "system_load": 0.228027,
            "network_sent_bytes": 156484007443,
            "network_recv_bytes": 14071483699,
            "timestamp": "2025-03-07T06:25:00"
        },
        {
            "cpu_temperature": 45.04,
            "cpu_usage": 1.14,
            "ram_usage": 37.3,
            "system_load": 0.0820312,
            "network_sent_bytes": 156484031423,
            "network_recv_bytes": 14071511567,
            "timestamp": "2025-03-07T06:26:00"
        },
        {
            "cpu_temperature": 44.95,
            "cpu_usage": 1.17333,
            "ram_usage": 37.3,
            "system_load": 0.285156,
            "network_sent_bytes": 156484054123,
            "network_recv_bytes": 14071532506,
            "timestamp": "2025-03-07T06:27:00"
        },
        {
            "cpu_temperature": 45.0767,
            "cpu_usage": 1.15667,
            "ram_usage": 37.4,
            "system_load": 0.246582,
            "network_sent_bytes": 156484076041,
            "network_recv_bytes": 14071553060,
            "timestamp": "2025-03-07T06:28:00"
        },
        {
            "cpu_temperature": 45.0217,
            "cpu_usage": 1.23167,
            "ram_usage": 37.3,
            "system_load": 0.0961914,
            "network_sent_bytes": 156484098000,
            "network_recv_bytes": 14071573803,
            "timestamp": "2025-03-07T06:29:00"
        },
        {
            "cpu_temperature": 44.7717,
            "cpu_usage": 1.23833,
            "ram_usage": 37.3,
            "system_load": 0.397949,
            "network_sent_bytes": 156484122082,
            "network_recv_bytes": 14071596271,
            "timestamp": "2025-03-07T06:30:00"
        },
        {
            "cpu_temperature": 44.9783,
            "cpu_usage": 1.10667,
            "ram_usage": 37.1,
            "system_load": 0.156738,
            "network_sent_bytes": 156484145322,
            "network_recv_bytes": 14071624062,
            "timestamp": "2025-03-07T06:31:00"
        },
        {
            "cpu_temperature": 44.825,
            "cpu_usage": 1.11333,
            "ram_usage": 37.3,
            "system_load": 0.282227,
            "network_sent_bytes": 156484167227,
            "network_recv_bytes": 14071644835,
            "timestamp": "2025-03-07T06:32:00"
        },
        {
            "cpu_temperature": 44.9767,
            "cpu_usage": 1.10667,
            "ram_usage": 37.1,
            "system_load": 0.325195,
            "network_sent_bytes": 156484189121,
            "network_recv_bytes": 14071665393,
            "timestamp": "2025-03-07T06:33:00"
        },
        {
            "cpu_temperature": 44.9133,
            "cpu_usage": 1.155,
            "ram_usage": 37.3,
            "system_load": 0.137207,
            "network_sent_bytes": 156484211111,
            "network_recv_bytes": 14071686105,
            "timestamp": "2025-03-07T06:34:00"
        },
        {
            "cpu_temperature": 44.8933,
            "cpu_usage": 1.21333,
            "ram_usage": 37.1,
            "system_load": 0.325195,
            "network_sent_bytes": 156484235116,
            "network_recv_bytes": 14071708476,
            "timestamp": "2025-03-07T06:35:00"
        },
        {
            "cpu_temperature": 45.5883,
            "cpu_usage": 4.09167,
            "ram_usage": 37.4,
            "system_load": 0.200195,
            "network_sent_bytes": 156484259663,
            "network_recv_bytes": 14071736592,
            "timestamp": "2025-03-07T06:36:00"
        },
        {
            "cpu_temperature": 45.0783,
            "cpu_usage": 1.16667,
            "ram_usage": 37.2,
            "system_load": 0.103516,
            "network_sent_bytes": 156484285792,
            "network_recv_bytes": 14071757273,
            "timestamp": "2025-03-07T06:37:00"
        },
        {
            "cpu_temperature": 44.98,
            "cpu_usage": 1.11167,
            "ram_usage": 37.4,
            "system_load": 0.280273,
            "network_sent_bytes": 156484307691,
            "network_recv_bytes": 14071778044,
            "timestamp": "2025-03-07T06:38:00"
        },
        {
            "cpu_temperature": 44.8683,
            "cpu_usage": 1.24167,
            "ram_usage": 37.4,
            "system_load": 0.133301,
            "network_sent_bytes": 156484330444,
            "network_recv_bytes": 14071798958,
            "timestamp": "2025-03-07T06:39:00"
        },
        {
            "cpu_temperature": 45.0267,
            "cpu_usage": 1.19167,
            "ram_usage": 37.4,
            "system_load": 0.183105,
            "network_sent_bytes": 156484354272,
            "network_recv_bytes": 14071821329,
            "timestamp": "2025-03-07T06:40:00"
        },
        {
            "cpu_temperature": 45.025,
            "cpu_usage": 1.11333,
            "ram_usage": 37.3,
            "system_load": 0.191406,
            "network_sent_bytes": 156484378657,
            "network_recv_bytes": 14071850134,
            "timestamp": "2025-03-07T06:41:00"
        },
        {
            "cpu_temperature": 45.12,
            "cpu_usage": 1.04333,
            "ram_usage": 37.3,
            "system_load": 0.0683594,
            "network_sent_bytes": 156484400355,
            "network_recv_bytes": 14071870672,
            "timestamp": "2025-03-07T06:42:00"
        },
        {
            "cpu_temperature": 44.91,
            "cpu_usage": 1.10167,
            "ram_usage": 37.3,
            "system_load": 0.294922,
            "network_sent_bytes": 156484422285,
            "network_recv_bytes": 14071891242,
            "timestamp": "2025-03-07T06:43:00"
        },
        {
            "cpu_temperature": 44.8983,
            "cpu_usage": 1.21833,
            "ram_usage": 37.3,
            "system_load": 0.144531,
            "network_sent_bytes": 156484443989,
            "network_recv_bytes": 14071911782,
            "timestamp": "2025-03-07T06:44:00"
        },
        {
            "cpu_temperature": 44.8167,
            "cpu_usage": 1.21667,
            "ram_usage": 37.3,
            "system_load": 0.173828,
            "network_sent_bytes": 156484468282,
            "network_recv_bytes": 14071934465,
            "timestamp": "2025-03-07T06:45:00"
        },
        {
            "cpu_temperature": 44.8067,
            "cpu_usage": 1.06,
            "ram_usage": 37.2,
            "system_load": 0.40918,
            "network_sent_bytes": 156484497568,
            "network_recv_bytes": 14071968807,
            "timestamp": "2025-03-07T06:46:00"
        },
        {
            "cpu_temperature": 44.9633,
            "cpu_usage": 1.08333,
            "ram_usage": 37.3,
            "system_load": 0.224121,
            "network_sent_bytes": 156484519481,
            "network_recv_bytes": 14071989548,
            "timestamp": "2025-03-07T06:47:00"
        },
        {
            "cpu_temperature": 44.9867,
            "cpu_usage": 1.09333,
            "ram_usage": 37.3,
            "system_load": 0.148438,
            "network_sent_bytes": 156484541997,
            "network_recv_bytes": 14072011023,
            "timestamp": "2025-03-07T06:48:00"
        },
        {
            "cpu_temperature": 45.1033,
            "cpu_usage": 1.18667,
            "ram_usage": 37.4,
            "system_load": 0.347168,
            "network_sent_bytes": 156484564206,
            "network_recv_bytes": 14072031988,
            "timestamp": "2025-03-07T06:49:00"
        },
        {
            "cpu_temperature": 44.975,
            "cpu_usage": 1.17,
            "ram_usage": 37.4,
            "system_load": 0.125488,
            "network_sent_bytes": 156484595173,
            "network_recv_bytes": 14072057165,
            "timestamp": "2025-03-07T06:50:00"
        },
        {
            "cpu_temperature": 44.9183,
            "cpu_usage": 0.998333,
            "ram_usage": 37,
            "system_load": 0.270996,
            "network_sent_bytes": 156484619141,
            "network_recv_bytes": 14072085083,
            "timestamp": "2025-03-07T06:51:00"
        },
        {
            "cpu_temperature": 44.755,
            "cpu_usage": 1.03833,
            "ram_usage": 37.3,
            "system_load": 0.135254,
            "network_sent_bytes": 156484640944,
            "network_recv_bytes": 14072105744,
            "timestamp": "2025-03-07T06:52:00"
        },
        {
            "cpu_temperature": 44.8433,
            "cpu_usage": 1.105,
            "ram_usage": 37,
            "system_load": 0.046875,
            "network_sent_bytes": 156484666862,
            "network_recv_bytes": 14072130254,
            "timestamp": "2025-03-07T06:53:00"
        },
        {
            "cpu_temperature": 44.8933,
            "cpu_usage": 1.1,
            "ram_usage": 37.4,
            "system_load": 0.300293,
            "network_sent_bytes": 156484688655,
            "network_recv_bytes": 14072150867,
            "timestamp": "2025-03-07T06:54:00"
        },
        {
            "cpu_temperature": 44.9633,
            "cpu_usage": 1.26833,
            "ram_usage": 37,
            "system_load": 0.10791,
            "network_sent_bytes": 156484713685,
            "network_recv_bytes": 14072174660,
            "timestamp": "2025-03-07T06:55:00"
        },
        {
            "cpu_temperature": 44.8483,
            "cpu_usage": 0.968333,
            "ram_usage": 37.3,
            "system_load": 0.106445,
            "network_sent_bytes": 156484737460,
            "network_recv_bytes": 14072202471,
            "timestamp": "2025-03-07T06:56:00"
        },
        {
            "cpu_temperature": 44.8967,
            "cpu_usage": 1.085,
            "ram_usage": 37.3,
            "system_load": 0.208496,
            "network_sent_bytes": 156484759362,
            "network_recv_bytes": 14072223243,
            "timestamp": "2025-03-07T06:57:00"
        },
        {
            "cpu_temperature": 44.94,
            "cpu_usage": 1.18833,
            "ram_usage": 37.3,
            "system_load": 0.074707,
            "network_sent_bytes": 156484781450,
            "network_recv_bytes": 14072243985,
            "timestamp": "2025-03-07T06:58:00"
        },
        {
            "cpu_temperature": 44.835,
            "cpu_usage": 1.14833,
            "ram_usage": 37.3,
            "system_load": 0.286133,
            "network_sent_bytes": 156484803444,
            "network_recv_bytes": 14072264837,
            "timestamp": "2025-03-07T06:59:00"
        },
        {
            "cpu_temperature": 44.805,
            "cpu_usage": 1.50833,
            "ram_usage": 37.3,
            "system_load": 0.141602,
            "network_sent_bytes": 156484854984,
            "network_recv_bytes": 14072314479,
            "timestamp": "2025-03-07T07:00:00"
        },
        {
            "cpu_temperature": 44.715,
            "cpu_usage": 1.19167,
            "ram_usage": 37.3,
            "system_load": 0.15625,
            "network_sent_bytes": 156484879994,
            "network_recv_bytes": 14072344089,
            "timestamp": "2025-03-07T07:01:00"
        },
        {
            "cpu_temperature": 44.5983,
            "cpu_usage": 0.97,
            "ram_usage": 36.9,
            "system_load": 0.430176,
            "network_sent_bytes": 156484906153,
            "network_recv_bytes": 14072364766,
            "timestamp": "2025-03-07T07:02:00"
        },
        {
            "cpu_temperature": 44.5867,
            "cpu_usage": 1.00333,
            "ram_usage": 37.3,
            "system_load": 0.15625,
            "network_sent_bytes": 156484928412,
            "network_recv_bytes": 14072385426,
            "timestamp": "2025-03-07T07:03:00"
        },
        {
            "cpu_temperature": 44.63,
            "cpu_usage": 1.06667,
            "ram_usage": 37,
            "system_load": 0.204102,
            "network_sent_bytes": 156484950311,
            "network_recv_bytes": 14072406043,
            "timestamp": "2025-03-07T07:04:00"
        },
        {
            "cpu_temperature": 44.4967,
            "cpu_usage": 1.04,
            "ram_usage": 37.3,
            "system_load": 0.200195,
            "network_sent_bytes": 156484976906,
            "network_recv_bytes": 14072431611,
            "timestamp": "2025-03-07T07:05:00"
        },
        {
            "cpu_temperature": 44.5033,
            "cpu_usage": 1.01333,
            "ram_usage": 37,
            "system_load": 0.0717773,
            "network_sent_bytes": 156485028993,
            "network_recv_bytes": 14072481552,
            "timestamp": "2025-03-07T07:06:00"
        },
        {
            "cpu_temperature": 44.5967,
            "cpu_usage": 1.04333,
            "ram_usage": 37.3,
            "system_load": 0.216797,
            "network_sent_bytes": 156485058256,
            "network_recv_bytes": 14072509463,
            "timestamp": "2025-03-07T07:07:00"
        },
        {
            "cpu_temperature": 44.4783,
            "cpu_usage": 0.993333,
            "ram_usage": 37,
            "system_load": 0.115723,
            "network_sent_bytes": 156485081671,
            "network_recv_bytes": 14072531504,
            "timestamp": "2025-03-07T07:08:00"
        },
        {
            "cpu_temperature": 44.66,
            "cpu_usage": 1.305,
            "ram_usage": 37.4,
            "system_load": 0.121094,
            "network_sent_bytes": 156485103786,
            "network_recv_bytes": 14072552537,
            "timestamp": "2025-03-07T07:09:00"
        },
        {
            "cpu_temperature": 44.4367,
            "cpu_usage": 0.928333,
            "ram_usage": 37,
            "system_load": 0.254395,
            "network_sent_bytes": 156485126054,
            "network_recv_bytes": 14072573297,
            "timestamp": "2025-03-07T07:10:00"
        },
        {
            "cpu_temperature": 44.5667,
            "cpu_usage": 1.075,
            "ram_usage": 37.5,
            "system_load": 0.0913086,
            "network_sent_bytes": 156485192091,
            "network_recv_bytes": 14072645635,
            "timestamp": "2025-03-07T07:11:00"
        },
        {
            "cpu_temperature": 44.4983,
            "cpu_usage": 1.10667,
            "ram_usage": 37.1,
            "system_load": 0.100586,
            "network_sent_bytes": 156485294490,
            "network_recv_bytes": 14072747976,
            "timestamp": "2025-03-07T07:12:00"
        },
        {
            "cpu_temperature": 44.5267,
            "cpu_usage": 1.175,
            "ram_usage": 37.9,
            "system_load": 0.195801,
            "network_sent_bytes": 156485512511,
            "network_recv_bytes": 14072959377,
            "timestamp": "2025-03-07T07:13:00"
        },
        {
            "cpu_temperature": 44.5817,
            "cpu_usage": 1.345,
            "ram_usage": 37.8,
            "system_load": 0.0703125,
            "network_sent_bytes": 156485552876,
            "network_recv_bytes": 14072994546,
            "timestamp": "2025-03-07T07:14:00"
        },
        {
            "cpu_temperature": 44.6783,
            "cpu_usage": 1.15833,
            "ram_usage": 37.8,
            "system_load": 0.21582,
            "network_sent_bytes": 156485593893,
            "network_recv_bytes": 14073034008,
            "timestamp": "2025-03-07T07:15:00"
        },
        {
            "cpu_temperature": 44.5167,
            "cpu_usage": 1.26833,
            "ram_usage": 37.4,
            "system_load": 0.178711,
            "network_sent_bytes": 156485625295,
            "network_recv_bytes": 14073069197,
            "timestamp": "2025-03-07T07:16:00"
        },
        {
            "cpu_temperature": 44.34,
            "cpu_usage": 1.16333,
            "ram_usage": 37.2,
            "system_load": 0.0639648,
            "network_sent_bytes": 156485660345,
            "network_recv_bytes": 14073102833,
            "timestamp": "2025-03-07T07:17:00"
        },
        {
            "cpu_temperature": 44.4,
            "cpu_usage": 1.14833,
            "ram_usage": 37.4,
            "system_load": 0.233398,
            "network_sent_bytes": 156485699390,
            "network_recv_bytes": 14073141255,
            "timestamp": "2025-03-07T07:18:00"
        },
        {
            "cpu_temperature": 44.5217,
            "cpu_usage": 1.27833,
            "ram_usage": 37.5,
            "system_load": 0.137207,
            "network_sent_bytes": 156485870475,
            "network_recv_bytes": 14073307493,
            "timestamp": "2025-03-07T07:19:00"
        },
        {
            "cpu_temperature": 44.6,
            "cpu_usage": 1.12833,
            "ram_usage": 37.7,
            "system_load": 0.19043,
            "network_sent_bytes": 156485908797,
            "network_recv_bytes": 14073344694,
            "timestamp": "2025-03-07T07:20:00"
        },
        {
            "cpu_temperature": 44.6367,
            "cpu_usage": 1.11833,
            "ram_usage": 37.6,
            "system_load": 0.194824,
            "network_sent_bytes": 156485951267,
            "network_recv_bytes": 14073394497,
            "timestamp": "2025-03-07T07:21:00"
        },
        {
            "cpu_temperature": 44.5,
            "cpu_usage": 1.1,
            "ram_usage": 37.5,
            "system_load": 0.0703125,
            "network_sent_bytes": 156485987927,
            "network_recv_bytes": 14073433128,
            "timestamp": "2025-03-07T07:22:00"
        },
        {
            "cpu_temperature": 44.5233,
            "cpu_usage": 1.145,
            "ram_usage": 37.5,
            "system_load": 0.35498,
            "network_sent_bytes": 156486024535,
            "network_recv_bytes": 14073468503,
            "timestamp": "2025-03-07T07:23:00"
        },
        {
            "cpu_temperature": 44.5683,
            "cpu_usage": 1.20167,
            "ram_usage": 37.4,
            "system_load": 0.283203,
            "network_sent_bytes": 156486054625,
            "network_recv_bytes": 14073497950,
            "timestamp": "2025-03-07T07:24:00"
        },
        {
            "cpu_temperature": 44.6033,
            "cpu_usage": 1.14667,
            "ram_usage": 37.3,
            "system_load": 0.102051,
            "network_sent_bytes": 156486087493,
            "network_recv_bytes": 14073529666,
            "timestamp": "2025-03-07T07:25:00"
        },
        {
            "cpu_temperature": 44.525,
            "cpu_usage": 1.19333,
            "ram_usage": 37.4,
            "system_load": 0.247559,
            "network_sent_bytes": 156486124747,
            "network_recv_bytes": 14073566681,
            "timestamp": "2025-03-07T07:26:00"
        },
        {
            "cpu_temperature": 44.6983,
            "cpu_usage": 1.11333,
            "ram_usage": 37.4,
            "system_load": 0.0893555,
            "network_sent_bytes": 156486166599,
            "network_recv_bytes": 14073606779,
            "timestamp": "2025-03-07T07:27:00"
        },
        {
            "cpu_temperature": 44.7283,
            "cpu_usage": 1.36833,
            "ram_usage": 37.7,
            "system_load": 0.271484,
            "network_sent_bytes": 156486374278,
            "network_recv_bytes": 14073808476,
            "timestamp": "2025-03-07T07:28:00"
        },
        {
            "cpu_temperature": 44.8133,
            "cpu_usage": 1.17667,
            "ram_usage": 37.8,
            "system_load": 0.406738,
            "network_sent_bytes": 156486404083,
            "network_recv_bytes": 14073837167,
            "timestamp": "2025-03-07T07:29:00"
        },
        {
            "cpu_temperature": 44.805,
            "cpu_usage": 1.24333,
            "ram_usage": 37.4,
            "system_load": 0.147461,
            "network_sent_bytes": 156486439023,
            "network_recv_bytes": 14073871042,
            "timestamp": "2025-03-07T07:30:00"
        },
        {
            "cpu_temperature": 44.7033,
            "cpu_usage": 1.235,
            "ram_usage": 37.4,
            "system_load": 0.301758,
            "network_sent_bytes": 156486470975,
            "network_recv_bytes": 14073907659,
            "timestamp": "2025-03-07T07:31:00"
        },
        {
            "cpu_temperature": 44.825,
            "cpu_usage": 1.13,
            "ram_usage": 37.3,
            "system_load": 0.356445,
            "network_sent_bytes": 156486494659,
            "network_recv_bytes": 14073929831,
            "timestamp": "2025-03-07T07:32:00"
        },
        {
            "cpu_temperature": 44.5433,
            "cpu_usage": 1.26,
            "ram_usage": 37.4,
            "system_load": 0.422852,
            "network_sent_bytes": 156486576344,
            "network_recv_bytes": 14074013820,
            "timestamp": "2025-03-07T07:33:00"
        },
        {
            "cpu_temperature": 44.5833,
            "cpu_usage": 1.435,
            "ram_usage": 37.7,
            "system_load": 0.452148,
            "network_sent_bytes": 156486760762,
            "network_recv_bytes": 14074195127,
            "timestamp": "2025-03-07T07:34:00"
        },
        {
            "cpu_temperature": 44.7567,
            "cpu_usage": 1.24,
            "ram_usage": 37.8,
            "system_load": 0.164551,
            "network_sent_bytes": 156486797369,
            "network_recv_bytes": 14074230296,
            "timestamp": "2025-03-07T07:35:00"
        },
        {
            "cpu_temperature": 44.6183,
            "cpu_usage": 1.2,
            "ram_usage": 37.4,
            "system_load": 0.185059,
            "network_sent_bytes": 156486837508,
            "network_recv_bytes": 14074275531,
            "timestamp": "2025-03-07T07:36:00"
        },
        {
            "cpu_temperature": 44.7033,
            "cpu_usage": 1.17,
            "ram_usage": 37.4,
            "system_load": 0.245117,
            "network_sent_bytes": 156486866163,
            "network_recv_bytes": 14074302954,
            "timestamp": "2025-03-07T07:37:00"
        },
        {
            "cpu_temperature": 44.75,
            "cpu_usage": 1.155,
            "ram_usage": 37.3,
            "system_load": 0.0878906,
            "network_sent_bytes": 156486907599,
            "network_recv_bytes": 14074339272,
            "timestamp": "2025-03-07T07:38:00"
        },
        {
            "cpu_temperature": 44.905,
            "cpu_usage": 1.27167,
            "ram_usage": 37.4,
            "system_load": 0.222168,
            "network_sent_bytes": 156486939351,
            "network_recv_bytes": 14074369333,
            "timestamp": "2025-03-07T07:39:00"
        },
        {
            "cpu_temperature": 44.6483,
            "cpu_usage": 1.35,
            "ram_usage": 37.7,
            "system_load": 0.117676,
            "network_sent_bytes": 156487153353,
            "network_recv_bytes": 14074577547,
            "timestamp": "2025-03-07T07:40:00"
        },
        {
            "cpu_temperature": 44.73,
            "cpu_usage": 1.20833,
            "ram_usage": 37.8,
            "system_load": 0.0415039,
            "network_sent_bytes": 156487193775,
            "network_recv_bytes": 14074622107,
            "timestamp": "2025-03-07T07:41:00"
        },
        {
            "cpu_temperature": 44.9167,
            "cpu_usage": 1.19,
            "ram_usage": 37.8,
            "system_load": 0.225098,
            "network_sent_bytes": 156487230788,
            "network_recv_bytes": 14074658325,
            "timestamp": "2025-03-07T07:42:00"
        },
        {
            "cpu_temperature": 44.8533,
            "cpu_usage": 1.12667,
            "ram_usage": 37.5,
            "system_load": 0.169922,
            "network_sent_bytes": 156487272198,
            "network_recv_bytes": 14074702671,
            "timestamp": "2025-03-07T07:43:00"
        },
        {
            "cpu_temperature": 44.8117,
            "cpu_usage": 1.27333,
            "ram_usage": 37.4,
            "system_load": 0.128906,
            "network_sent_bytes": 156487306633,
            "network_recv_bytes": 14074737392,
            "timestamp": "2025-03-07T07:44:00"
        },
        {
            "cpu_temperature": 44.845,
            "cpu_usage": 1.20167,
            "ram_usage": 37.5,
            "system_load": 0.171875,
            "network_sent_bytes": 156487343302,
            "network_recv_bytes": 14074773218,
            "timestamp": "2025-03-07T07:45:00"
        },
        {
            "cpu_temperature": 44.8433,
            "cpu_usage": 1.17167,
            "ram_usage": 37.4,
            "system_load": 0.0957031,
            "network_sent_bytes": 156487378502,
            "network_recv_bytes": 14074807464,
            "timestamp": "2025-03-07T07:46:00"
        },
        {
            "cpu_temperature": 45.03,
            "cpu_usage": 1.095,
            "ram_usage": 37.4,
            "system_load": 0.225098,
            "network_sent_bytes": 156487406494,
            "network_recv_bytes": 14074834496,
            "timestamp": "2025-03-07T07:47:00"
        },
        {
            "cpu_temperature": 44.9083,
            "cpu_usage": 1.27,
            "ram_usage": 37.4,
            "system_load": 0.312012,
            "network_sent_bytes": 156487447777,
            "network_recv_bytes": 14074874980,
            "timestamp": "2025-03-07T07:48:00"
        },
        {
            "cpu_temperature": 44.8833,
            "cpu_usage": 1.42,
            "ram_usage": 37.7,
            "system_load": 0.224121,
            "network_sent_bytes": 156487638913,
            "network_recv_bytes": 14075061056,
            "timestamp": "2025-03-07T07:49:00"
        },
        {
            "cpu_temperature": 44.99,
            "cpu_usage": 1.25833,
            "ram_usage": 37.7,
            "system_load": 0.291504,
            "network_sent_bytes": 156487674068,
            "network_recv_bytes": 14075090811,
            "timestamp": "2025-03-07T07:50:00"
        },
        {
            "cpu_temperature": 44.7783,
            "cpu_usage": 1.08333,
            "ram_usage": 37.1,
            "system_load": 0.162598,
            "network_sent_bytes": 156487710263,
            "network_recv_bytes": 14075131269,
            "timestamp": "2025-03-07T07:51:00"
        },
        {
            "cpu_temperature": 44.9,
            "cpu_usage": 1.18833,
            "ram_usage": 37.4,
            "system_load": 0.351074,
            "network_sent_bytes": 156487743810,
            "network_recv_bytes": 14075163957,
            "timestamp": "2025-03-07T07:52:00"
        },
        {
            "cpu_temperature": 44.9217,
            "cpu_usage": 1.06333,
            "ram_usage": 37.2,
            "system_load": 0.306641,
            "network_sent_bytes": 156487788425,
            "network_recv_bytes": 14075211452,
            "timestamp": "2025-03-07T07:53:00"
        },
        {
            "cpu_temperature": 44.9133,
            "cpu_usage": 1.15833,
            "ram_usage": 37.4,
            "system_load": 0.111328,
            "network_sent_bytes": 156487823363,
            "network_recv_bytes": 14075246881,
            "timestamp": "2025-03-07T07:54:00"
        },
        {
            "cpu_temperature": 44.99,
            "cpu_usage": 1.06167,
            "ram_usage": 37.3,
            "system_load": 0.230957,
            "network_sent_bytes": 156487856630,
            "network_recv_bytes": 14075279438,
            "timestamp": "2025-03-07T07:55:00"
        },
        {
            "cpu_temperature": 44.805,
            "cpu_usage": 1.26667,
            "ram_usage": 37.4,
            "system_load": 0.165527,
            "network_sent_bytes": 156487918551,
            "network_recv_bytes": 14075344749,
            "timestamp": "2025-03-07T07:56:00"
        },
        {
            "cpu_temperature": 44.74,
            "cpu_usage": 1.21167,
            "ram_usage": 37.5,
            "system_load": 0.059082,
            "network_sent_bytes": 156487972019,
            "network_recv_bytes": 14075396428,
            "timestamp": "2025-03-07T07:57:00"
        },
        {
            "cpu_temperature": 44.8117,
            "cpu_usage": 1.315,
            "ram_usage": 37.5,
            "system_load": 0.263184,
            "network_sent_bytes": 156488050389,
            "network_recv_bytes": 14075472510,
            "timestamp": "2025-03-07T07:58:00"
        },
        {
            "cpu_temperature": 44.8983,
            "cpu_usage": 1.31667,
            "ram_usage": 37.9,
            "system_load": 0.0952148,
            "network_sent_bytes": 156488264538,
            "network_recv_bytes": 14075680572,
            "timestamp": "2025-03-07T07:59:00"
        },
        {
            "cpu_temperature": 45.0217,
            "cpu_usage": 1.43167,
            "ram_usage": 37.9,
            "system_load": 0.100586,
            "network_sent_bytes": 156488316030,
            "network_recv_bytes": 14075730690,
            "timestamp": "2025-03-07T08:00:00"
        },
        {
            "cpu_temperature": 45.0817,
            "cpu_usage": 1.16833,
            "ram_usage": 37.2,
            "system_load": 0.276855,
            "network_sent_bytes": 156488349943,
            "network_recv_bytes": 14075769311,
            "timestamp": "2025-03-07T08:01:00"
        },
        {
            "cpu_temperature": 45.035,
            "cpu_usage": 1.155,
            "ram_usage": 37.4,
            "system_load": 0.323242,
            "network_sent_bytes": 156488384919,
            "network_recv_bytes": 14075799285,
            "timestamp": "2025-03-07T08:02:00"
        },
        {
            "cpu_temperature": 44.9233,
            "cpu_usage": 1.10833,
            "ram_usage": 37.2,
            "system_load": 0.394531,
            "network_sent_bytes": 156488434123,
            "network_recv_bytes": 14075849908,
            "timestamp": "2025-03-07T08:03:00"
        },
        {
            "cpu_temperature": 45.0717,
            "cpu_usage": 1.16,
            "ram_usage": 37.4,
            "system_load": 0.299316,
            "network_sent_bytes": 156488481133,
            "network_recv_bytes": 14075897819,
            "timestamp": "2025-03-07T08:04:00"
        },
        {
            "cpu_temperature": 44.955,
            "cpu_usage": 1.08,
            "ram_usage": 37.2,
            "system_load": 0.10791,
            "network_sent_bytes": 156488506916,
            "network_recv_bytes": 14075922375,
            "timestamp": "2025-03-07T08:05:00"
        },
        {
            "cpu_temperature": 44.86,
            "cpu_usage": 1.14,
            "ram_usage": 37.4,
            "system_load": 0.249023,
            "network_sent_bytes": 156488563055,
            "network_recv_bytes": 14075981407,
            "timestamp": "2025-03-07T08:06:00"
        },
        {
            "cpu_temperature": 45.0367,
            "cpu_usage": 1.15167,
            "ram_usage": 37.4,
            "system_load": 0.0893555,
            "network_sent_bytes": 156488602428,
            "network_recv_bytes": 14076019308,
            "timestamp": "2025-03-07T08:07:00"
        },
        {
            "cpu_temperature": 44.8983,
            "cpu_usage": 1.21667,
            "ram_usage": 37.4,
            "system_load": 0.256348,
            "network_sent_bytes": 156488639775,
            "network_recv_bytes": 14076055589,
            "timestamp": "2025-03-07T08:08:00"
        },
        {
            "cpu_temperature": 44.8933,
            "cpu_usage": 1.38,
            "ram_usage": 37.4,
            "system_load": 0.379395,
            "network_sent_bytes": 156488666624,
            "network_recv_bytes": 14076081132,
            "timestamp": "2025-03-07T08:09:00"
        },
        {
            "cpu_temperature": 44.8983,
            "cpu_usage": 1.22333,
            "ram_usage": 37.4,
            "system_load": 0.217773,
            "network_sent_bytes": 156488710368,
            "network_recv_bytes": 14076124009,
            "timestamp": "2025-03-07T08:10:00"
        },
        {
            "cpu_temperature": 44.83,
            "cpu_usage": 1.255,
            "ram_usage": 37.4,
            "system_load": 0.634766,
            "network_sent_bytes": 156488745949,
            "network_recv_bytes": 14076163721,
            "timestamp": "2025-03-07T08:11:00"
        },
        {
            "cpu_temperature": 44.9217,
            "cpu_usage": 1.10667,
            "ram_usage": 37.4,
            "system_load": 0.331543,
            "network_sent_bytes": 156488773011,
            "network_recv_bytes": 14076189749,
            "timestamp": "2025-03-07T08:12:00"
        },
        {
            "cpu_temperature": 44.9433,
            "cpu_usage": 1.21167,
            "ram_usage": 37.4,
            "system_load": 0.199219,
            "network_sent_bytes": 156488803913,
            "network_recv_bytes": 14076219179,
            "timestamp": "2025-03-07T08:13:00"
        },
        {
            "cpu_temperature": 45.1017,
            "cpu_usage": 1.27,
            "ram_usage": 37.4,
            "system_load": 0.282715,
            "network_sent_bytes": 156488835747,
            "network_recv_bytes": 14076245787,
            "timestamp": "2025-03-07T08:14:00"
        },
        {
            "cpu_temperature": 45.0033,
            "cpu_usage": 1.225,
            "ram_usage": 37.4,
            "system_load": 0.241699,
            "network_sent_bytes": 156488875178,
            "network_recv_bytes": 14076283164,
            "timestamp": "2025-03-07T08:15:00"
        },
        {
            "cpu_temperature": 44.8033,
            "cpu_usage": 1.10333,
            "ram_usage": 37.4,
            "system_load": 0.161621,
            "network_sent_bytes": 156488902230,
            "network_recv_bytes": 14076314203,
            "timestamp": "2025-03-07T08:16:00"
        },
        {
            "cpu_temperature": 44.775,
            "cpu_usage": 1.15,
            "ram_usage": 37.3,
            "system_load": 0.227051,
            "network_sent_bytes": 156488929424,
            "network_recv_bytes": 14076340028,
            "timestamp": "2025-03-07T08:17:00"
        },
        {
            "cpu_temperature": 44.8467,
            "cpu_usage": 1.11167,
            "ram_usage": 37.3,
            "system_load": 0.081543,
            "network_sent_bytes": 156488958109,
            "network_recv_bytes": 14076367760,
            "timestamp": "2025-03-07T08:18:00"
        },
        {
            "cpu_temperature": 45.03,
            "cpu_usage": 1.13,
            "ram_usage": 37.3,
            "system_load": 0.181152,
            "network_sent_bytes": 156488982530,
            "network_recv_bytes": 14076391101,
            "timestamp": "2025-03-07T08:19:00"
        },
        {
            "cpu_temperature": 44.9567,
            "cpu_usage": 1.13333,
            "ram_usage": 37.4,
            "system_load": 0.138672,
            "network_sent_bytes": 156489009830,
            "network_recv_bytes": 14076421925,
            "timestamp": "2025-03-07T08:20:00"
        },
        {
            "cpu_temperature": 44.8533,
            "cpu_usage": 1.11667,
            "ram_usage": 37.3,
            "system_load": 0.134277,
            "network_sent_bytes": 156489036612,
            "network_recv_bytes": 14076447863,
            "timestamp": "2025-03-07T08:21:00"
        },
        {
            "cpu_temperature": 44.8417,
            "cpu_usage": 1.135,
            "ram_usage": 37.4,
            "system_load": 0.277344,
            "network_sent_bytes": 156489062817,
            "network_recv_bytes": 14076472976,
            "timestamp": "2025-03-07T08:22:00"
        },
        {
            "cpu_temperature": 44.92,
            "cpu_usage": 1.09,
            "ram_usage": 37.2,
            "system_load": 0.0996094,
            "network_sent_bytes": 156489087895,
            "network_recv_bytes": 14076496664,
            "timestamp": "2025-03-07T08:23:00"
        },
        {
            "cpu_temperature": 44.665,
            "cpu_usage": 1.19333,
            "ram_usage": 37.3,
            "system_load": 0.23877,
            "network_sent_bytes": 156489111959,
            "network_recv_bytes": 14076519684,
            "timestamp": "2025-03-07T08:24:00"
        },
        {
            "cpu_temperature": 44.615,
            "cpu_usage": 1.13,
            "ram_usage": 37.3,
            "system_load": 0.463379,
            "network_sent_bytes": 156489149660,
            "network_recv_bytes": 14076555443,
            "timestamp": "2025-03-07T08:25:00"
        },
        {
            "cpu_temperature": 44.6183,
            "cpu_usage": 1.145,
            "ram_usage": 37.3,
            "system_load": 0.168457,
            "network_sent_bytes": 156489181665,
            "network_recv_bytes": 14076588031,
            "timestamp": "2025-03-07T08:26:00"
        },
        {
            "cpu_temperature": 44.71,
            "cpu_usage": 1.18833,
            "ram_usage": 37.4,
            "system_load": 0.243164,
            "network_sent_bytes": 156489225623,
            "network_recv_bytes": 14076631441,
            "timestamp": "2025-03-07T08:27:00"
        },
        {
            "cpu_temperature": 44.7033,
            "cpu_usage": 1.16333,
            "ram_usage": 37.4,
            "system_load": 0.119629,
            "network_sent_bytes": 156489253230,
            "network_recv_bytes": 14076657832,
            "timestamp": "2025-03-07T08:28:00"
        },
        {
            "cpu_temperature": 44.7133,
            "cpu_usage": 1.175,
            "ram_usage": 37.4,
            "system_load": 0.0419922,
            "network_sent_bytes": 156489280643,
            "network_recv_bytes": 14076683829,
            "timestamp": "2025-03-07T08:29:00"
        },
        {
            "cpu_temperature": 44.615,
            "cpu_usage": 1.15333,
            "ram_usage": 37.3,
            "system_load": 0.403809,
            "network_sent_bytes": 156489307569,
            "network_recv_bytes": 14076709195,
            "timestamp": "2025-03-07T08:30:00"
        },
        {
            "cpu_temperature": 44.5583,
            "cpu_usage": 1.09,
            "ram_usage": 37.3,
            "system_load": 0.195801,
            "network_sent_bytes": 156489337840,
            "network_recv_bytes": 14076741020,
            "timestamp": "2025-03-07T08:31:00"
        },
        {
            "cpu_temperature": 44.615,
            "cpu_usage": 1.04833,
            "ram_usage": 37.1,
            "system_load": 0.305176,
            "network_sent_bytes": 156489362375,
            "network_recv_bytes": 14076764549,
            "timestamp": "2025-03-07T08:32:00"
        },
        {
            "cpu_temperature": 44.6617,
            "cpu_usage": 1.155,
            "ram_usage": 37.5,
            "system_load": 0.247559,
            "network_sent_bytes": 156489414743,
            "network_recv_bytes": 14076815557,
            "timestamp": "2025-03-07T08:33:00"
        },
        {
            "cpu_temperature": 44.775,
            "cpu_usage": 1.06,
            "ram_usage": 37.2,
            "system_load": 0.0893555,
            "network_sent_bytes": 156489439997,
            "network_recv_bytes": 14076841063,
            "timestamp": "2025-03-07T08:34:00"
        },
        {
            "cpu_temperature": 44.74,
            "cpu_usage": 0.936667,
            "ram_usage": 37.2,
            "system_load": 0.151855,
            "network_sent_bytes": 156489467262,
            "network_recv_bytes": 14076867243,
            "timestamp": "2025-03-07T08:35:00"
        },
        {
            "cpu_temperature": 44.6517,
            "cpu_usage": 1.005,
            "ram_usage": 37.4,
            "system_load": 0.168457,
            "network_sent_bytes": 156489508199,
            "network_recv_bytes": 14076914939,
            "timestamp": "2025-03-07T08:36:00"
        },
        {
            "cpu_temperature": 44.6683,
            "cpu_usage": 1.13333,
            "ram_usage": 37.4,
            "system_load": 0.0600586,
            "network_sent_bytes": 156489533530,
            "network_recv_bytes": 14076938896,
            "timestamp": "2025-03-07T08:37:00"
        },
        {
            "cpu_temperature": 44.4917,
            "cpu_usage": 1.13667,
            "ram_usage": 37.3,
            "system_load": 0.39209,
            "network_sent_bytes": 156489563418,
            "network_recv_bytes": 14076963406,
            "timestamp": "2025-03-07T08:38:00"
        },
        {
            "cpu_temperature": 44.51,
            "cpu_usage": 1.22333,
            "ram_usage": 37.4,
            "system_load": 0.206055,
            "network_sent_bytes": 156489585808,
            "network_recv_bytes": 14076984007,
            "timestamp": "2025-03-07T08:39:00"
        },
        {
            "cpu_temperature": 44.715,
            "cpu_usage": 1.13167,
            "ram_usage": 37.3,
            "system_load": 0.192383,
            "network_sent_bytes": 156489611353,
            "network_recv_bytes": 14077008427,
            "timestamp": "2025-03-07T08:40:00"
        },
        {
            "cpu_temperature": 44.45,
            "cpu_usage": 1.22833,
            "ram_usage": 37.3,
            "system_load": 0.347656,
            "network_sent_bytes": 156489635831,
            "network_recv_bytes": 14077036314,
            "timestamp": "2025-03-07T08:41:00"
        },
        {
            "cpu_temperature": 44.4817,
            "cpu_usage": 1.15333,
            "ram_usage": 37.2,
            "system_load": 0.125488,
            "network_sent_bytes": 156489657884,
            "network_recv_bytes": 14077057047,
            "timestamp": "2025-03-07T08:42:00"
        },
        {
            "cpu_temperature": 44.5717,
            "cpu_usage": 1.17,
            "ram_usage": 37.2,
            "system_load": 0.165527,
            "network_sent_bytes": 156489679916,
            "network_recv_bytes": 14077077999,
            "timestamp": "2025-03-07T08:43:00"
        },
        {
            "cpu_temperature": 44.5067,
            "cpu_usage": 1.17667,
            "ram_usage": 37.3,
            "system_load": 0.132324,
            "network_sent_bytes": 156489702027,
            "network_recv_bytes": 14077098912,
            "timestamp": "2025-03-07T08:44:00"
        },
        {
            "cpu_temperature": 44.6067,
            "cpu_usage": 1.165,
            "ram_usage": 37.3,
            "system_load": 0.046875,
            "network_sent_bytes": 156489725708,
            "network_recv_bytes": 14077121788,
            "timestamp": "2025-03-07T08:45:00"
        },
        {
            "cpu_temperature": 44.5933,
            "cpu_usage": 1.15833,
            "ram_usage": 37.3,
            "system_load": 0.245117,
            "network_sent_bytes": 156489749944,
            "network_recv_bytes": 14077149833,
            "timestamp": "2025-03-07T08:46:00"
        },
        {
            "cpu_temperature": 44.6483,
            "cpu_usage": 1.13167,
            "ram_usage": 37.3,
            "system_load": 0.162109,
            "network_sent_bytes": 156489771934,
            "network_recv_bytes": 14077170545,
            "timestamp": "2025-03-07T08:47:00"
        },
        {
            "cpu_temperature": 44.765,
            "cpu_usage": 1.12667,
            "ram_usage": 37.3,
            "system_load": 0.131836,
            "network_sent_bytes": 156489794173,
            "network_recv_bytes": 14077191817,
            "timestamp": "2025-03-07T08:48:00"
        },
        {
            "cpu_temperature": 44.7367,
            "cpu_usage": 1.24833,
            "ram_usage": 37.3,
            "system_load": 0.185059,
            "network_sent_bytes": 156489816254,
            "network_recv_bytes": 14077212724,
            "timestamp": "2025-03-07T08:49:00"
        },
        {
            "cpu_temperature": 44.7117,
            "cpu_usage": 1.2,
            "ram_usage": 37.3,
            "system_load": 0.0664062,
            "network_sent_bytes": 156489845142,
            "network_recv_bytes": 14077235885,
            "timestamp": "2025-03-07T08:50:00"
        },
        {
            "cpu_temperature": 44.6283,
            "cpu_usage": 1.19167,
            "ram_usage": 37.3,
            "system_load": 0.143555,
            "network_sent_bytes": 156489868982,
            "network_recv_bytes": 14077263913,
            "timestamp": "2025-03-07T08:51:00"
        },
        {
            "cpu_temperature": 44.8583,
            "cpu_usage": 1.07,
            "ram_usage": 37.3,
            "system_load": 0.124023,
            "network_sent_bytes": 156489891026,
            "network_recv_bytes": 14077284595,
            "timestamp": "2025-03-07T08:52:00"
        },
        {
            "cpu_temperature": 44.6583,
            "cpu_usage": 1.105,
            "ram_usage": 37.2,
            "system_load": 0.0429688,
            "network_sent_bytes": 156489913044,
            "network_recv_bytes": 14077305419,
            "timestamp": "2025-03-07T08:53:00"
        },
        {
            "cpu_temperature": 44.68,
            "cpu_usage": 1.17667,
            "ram_usage": 37.3,
            "system_load": 0.243652,
            "network_sent_bytes": 156489935451,
            "network_recv_bytes": 14077326560,
            "timestamp": "2025-03-07T08:54:00"
        },
        {
            "cpu_temperature": 44.7733,
            "cpu_usage": 1.21833,
            "ram_usage": 37.3,
            "system_load": 0.0874023,
            "network_sent_bytes": 156489959294,
            "network_recv_bytes": 14077348841,
            "timestamp": "2025-03-07T08:55:00"
        },
        {
            "cpu_temperature": 44.8583,
            "cpu_usage": 1.04,
            "ram_usage": 37,
            "system_load": 0.104004,
            "network_sent_bytes": 156489982427,
            "network_recv_bytes": 14077376517,
            "timestamp": "2025-03-07T08:56:00"
        },
        {
            "cpu_temperature": 44.695,
            "cpu_usage": 1.03167,
            "ram_usage": 37.3,
            "system_load": 0.218262,
            "network_sent_bytes": 156490004281,
            "network_recv_bytes": 14077397271,
            "timestamp": "2025-03-07T08:57:00"
        },
        {
            "cpu_temperature": 44.5133,
            "cpu_usage": 1.05333,
            "ram_usage": 37.1,
            "system_load": 0.158203,
            "network_sent_bytes": 156490026144,
            "network_recv_bytes": 14077417834,
            "timestamp": "2025-03-07T08:58:00"
        },
        {
            "cpu_temperature": 44.6917,
            "cpu_usage": 1.12167,
            "ram_usage": 37.3,
            "system_load": 0.292969,
            "network_sent_bytes": 156490048070,
            "network_recv_bytes": 14077438462,
            "timestamp": "2025-03-07T08:59:00"
        },
        {
            "cpu_temperature": 44.93,
            "cpu_usage": 1.25333,
            "ram_usage": 37.1,
            "system_load": 0.179199,
            "network_sent_bytes": 156490078849,
            "network_recv_bytes": 14077467980,
            "timestamp": "2025-03-07T09:00:00"
        },
        {
            "cpu_temperature": 44.93,
            "cpu_usage": 1.21833,
            "ram_usage": 37.2,
            "system_load": 0.0644531,
            "network_sent_bytes": 156490122029,
            "network_recv_bytes": 14077513636,
            "timestamp": "2025-03-07T09:01:00"
        },
        {
            "cpu_temperature": 44.7667,
            "cpu_usage": 1.04833,
            "ram_usage": 37.3,
            "system_load": 0.251465,
            "network_sent_bytes": 156490148016,
            "network_recv_bytes": 14077534407,
            "timestamp": "2025-03-07T09:02:00"
        },
        {
            "cpu_temperature": 44.8583,
            "cpu_usage": 1.1,
            "ram_usage": 37.2,
            "system_load": 0.0908203,
            "network_sent_bytes": 156490170460,
            "network_recv_bytes": 14077554978,
            "timestamp": "2025-03-07T09:03:00"
        },
        {
            "cpu_temperature": 44.8267,
            "cpu_usage": 1.07333,
            "ram_usage": 37.2,
            "system_load": 0.105957,
            "network_sent_bytes": 156490192405,
            "network_recv_bytes": 14077575675,
            "timestamp": "2025-03-07T09:04:00"
        },
        {
            "cpu_temperature": 44.8183,
            "cpu_usage": 1.17,
            "ram_usage": 37.2,
            "system_load": 0.117676,
            "network_sent_bytes": 156490215606,
            "network_recv_bytes": 14077597801,
            "timestamp": "2025-03-07T09:05:00"
        },
        {
            "cpu_temperature": 44.815,
            "cpu_usage": 1.09,
            "ram_usage": 37.3,
            "system_load": 0.0415039,
            "network_sent_bytes": 156490240303,
            "network_recv_bytes": 14077625930,
            "timestamp": "2025-03-07T09:06:00"
        },
        {
            "cpu_temperature": 44.7967,
            "cpu_usage": 1.12,
            "ram_usage": 37,
            "system_load": 0.134277,
            "network_sent_bytes": 156490262353,
            "network_recv_bytes": 14077646660,
            "timestamp": "2025-03-07T09:07:00"
        },
        {
            "cpu_temperature": 44.8717,
            "cpu_usage": 1.09667,
            "ram_usage": 37.3,
            "system_load": 0.121094,
            "network_sent_bytes": 156490284349,
            "network_recv_bytes": 14077667374,
            "timestamp": "2025-03-07T09:08:00"
        },
        {
            "cpu_temperature": 44.7833,
            "cpu_usage": 1.22,
            "ram_usage": 37.3,
            "system_load": 0.0424805,
            "network_sent_bytes": 156490306298,
            "network_recv_bytes": 14077688113,
            "timestamp": "2025-03-07T09:09:00"
        },
        {
            "cpu_temperature": 44.8317,
            "cpu_usage": 1.2,
            "ram_usage": 37.4,
            "system_load": 0.32373,
            "network_sent_bytes": 156490330211,
            "network_recv_bytes": 14077710568,
            "timestamp": "2025-03-07T09:10:00"
        },
        {
            "cpu_temperature": 44.7383,
            "cpu_usage": 1.12833,
            "ram_usage": 37.3,
            "system_load": 0.165527,
            "network_sent_bytes": 156490353761,
            "network_recv_bytes": 14077738535,
            "timestamp": "2025-03-07T09:11:00"
        },
        {
            "cpu_temperature": 44.665,
            "cpu_usage": 1.24333,
            "ram_usage": 37.3,
            "system_load": 0.133301,
            "network_sent_bytes": 156490375624,
            "network_recv_bytes": 14077759248,
            "timestamp": "2025-03-07T09:12:00"
        },
        {
            "cpu_temperature": 44.7483,
            "cpu_usage": 1.17167,
            "ram_usage": 37.3,
            "system_load": 0.241699,
            "network_sent_bytes": 156490397557,
            "network_recv_bytes": 14077779819,
            "timestamp": "2025-03-07T09:13:00"
        },
        {
            "cpu_temperature": 44.765,
            "cpu_usage": 1.245,
            "ram_usage": 37.3,
            "system_load": 0.275879,
            "network_sent_bytes": 156490423397,
            "network_recv_bytes": 14077800421,
            "timestamp": "2025-03-07T09:14:00"
        },
        {
            "cpu_temperature": 44.8033,
            "cpu_usage": 1.17833,
            "ram_usage": 37.3,
            "system_load": 0.258301,
            "network_sent_bytes": 156490448674,
            "network_recv_bytes": 14077823570,
            "timestamp": "2025-03-07T09:15:00"
        },
        {
            "cpu_temperature": 44.8867,
            "cpu_usage": 1.09833,
            "ram_usage": 37,
            "system_load": 0.166016,
            "network_sent_bytes": 156490471677,
            "network_recv_bytes": 14077851277,
            "timestamp": "2025-03-07T09:16:00"
        },
        {
            "cpu_temperature": 44.8383,
            "cpu_usage": 1.08,
            "ram_usage": 37.3,
            "system_load": 0.140137,
            "network_sent_bytes": 156490493819,
            "network_recv_bytes": 14077872167,
            "timestamp": "2025-03-07T09:17:00"
        },
        {
            "cpu_temperature": 44.6333,
            "cpu_usage": 1.08667,
            "ram_usage": 37.1,
            "system_load": 0.279297,
            "network_sent_bytes": 156490516461,
            "network_recv_bytes": 14077893700,
            "timestamp": "2025-03-07T09:18:00"
        },
        {
            "cpu_temperature": 44.735,
            "cpu_usage": 1.12,
            "ram_usage": 37.4,
            "system_load": 0.100586,
            "network_sent_bytes": 156490538444,
            "network_recv_bytes": 14077914561,
            "timestamp": "2025-03-07T09:19:00"
        },
        {
            "cpu_temperature": 44.7667,
            "cpu_usage": 1.09667,
            "ram_usage": 37.2,
            "system_load": 0.154297,
            "network_sent_bytes": 156490562585,
            "network_recv_bytes": 14077937084,
            "timestamp": "2025-03-07T09:20:00"
        },
        {
            "cpu_temperature": 44.75,
            "cpu_usage": 1.08167,
            "ram_usage": 37.3,
            "system_load": 0.192383,
            "network_sent_bytes": 156490585846,
            "network_recv_bytes": 14077964995,
            "timestamp": "2025-03-07T09:21:00"
        },
        {
            "cpu_temperature": 44.715,
            "cpu_usage": 1.115,
            "ram_usage": 37.3,
            "system_load": 0.145996,
            "network_sent_bytes": 156490607739,
            "network_recv_bytes": 14077985642,
            "timestamp": "2025-03-07T09:22:00"
        },
        {
            "cpu_temperature": 44.7383,
            "cpu_usage": 1.16,
            "ram_usage": 37.3,
            "system_load": 0.172852,
            "network_sent_bytes": 156490629738,
            "network_recv_bytes": 14078006313,
            "timestamp": "2025-03-07T09:23:00"
        },
        {
            "cpu_temperature": 44.6417,
            "cpu_usage": 1.235,
            "ram_usage": 37.3,
            "system_load": 0.134277,
            "network_sent_bytes": 156490651499,
            "network_recv_bytes": 14078026824,
            "timestamp": "2025-03-07T09:24:00"
        },
        {
            "cpu_temperature": 44.765,
            "cpu_usage": 1.165,
            "ram_usage": 37.4,
            "system_load": 0.121094,
            "network_sent_bytes": 156490674790,
            "network_recv_bytes": 14078048868,
            "timestamp": "2025-03-07T09:25:00"
        },
        {
            "cpu_temperature": 44.635,
            "cpu_usage": 1.08167,
            "ram_usage": 37.3,
            "system_load": 0.330078,
            "network_sent_bytes": 156490703352,
            "network_recv_bytes": 14078077443,
            "timestamp": "2025-03-07T09:26:00"
        },
        {
            "cpu_temperature": 44.6533,
            "cpu_usage": 1.09,
            "ram_usage": 37.2,
            "system_load": 0.119141,
            "network_sent_bytes": 156490725765,
            "network_recv_bytes": 14078098215,
            "timestamp": "2025-03-07T09:27:00"
        },
        {
            "cpu_temperature": 44.69,
            "cpu_usage": 1.21,
            "ram_usage": 37.3,
            "system_load": 0.116211,
            "network_sent_bytes": 156490747767,
            "network_recv_bytes": 14078118883,
            "timestamp": "2025-03-07T09:28:00"
        },
        {
            "cpu_temperature": 44.7533,
            "cpu_usage": 1.2,
            "ram_usage": 37.3,
            "system_load": 0.23584,
            "network_sent_bytes": 156490769913,
            "network_recv_bytes": 14078139813,
            "timestamp": "2025-03-07T09:29:00"
        },
        {
            "cpu_temperature": 44.6417,
            "cpu_usage": 1.145,
            "ram_usage": 37.3,
            "system_load": 0.125977,
            "network_sent_bytes": 156490794586,
            "network_recv_bytes": 14078163021,
            "timestamp": "2025-03-07T09:30:00"
        },
        {
            "cpu_temperature": 44.6583,
            "cpu_usage": 1.07833,
            "ram_usage": 37.3,
            "system_load": 0.165527,
            "network_sent_bytes": 156490817619,
            "network_recv_bytes": 14078190713,
            "timestamp": "2025-03-07T09:31:00"
        },
        {
            "cpu_temperature": 44.6683,
            "cpu_usage": 1.19833,
            "ram_usage": 37.3,
            "system_load": 0.309082,
            "network_sent_bytes": 156490839708,
            "network_recv_bytes": 14078211456,
            "timestamp": "2025-03-07T09:32:00"
        },
        {
            "cpu_temperature": 44.7383,
            "cpu_usage": 1.18667,
            "ram_usage": 37.3,
            "system_load": 0.149902,
            "network_sent_bytes": 156490861748,
            "network_recv_bytes": 14078232304,
            "timestamp": "2025-03-07T09:33:00"
        },
        {
            "cpu_temperature": 44.5917,
            "cpu_usage": 1.28167,
            "ram_usage": 37.3,
            "system_load": 0.401367,
            "network_sent_bytes": 156490883618,
            "network_recv_bytes": 14078252810,
            "timestamp": "2025-03-07T09:34:00"
        },
        {
            "cpu_temperature": 44.75,
            "cpu_usage": 1.17833,
            "ram_usage": 37.3,
            "system_load": 0.145508,
            "network_sent_bytes": 156490907700,
            "network_recv_bytes": 14078275278,
            "timestamp": "2025-03-07T09:35:00"
        },
        {
            "cpu_temperature": 44.64,
            "cpu_usage": 1.165,
            "ram_usage": 37.2,
            "system_load": 0.125488,
            "network_sent_bytes": 156490930825,
            "network_recv_bytes": 14078302951,
            "timestamp": "2025-03-07T09:36:00"
        },
        {
            "cpu_temperature": 44.655,
            "cpu_usage": 1.12667,
            "ram_usage": 37.3,
            "system_load": 0.182129,
            "network_sent_bytes": 156490952821,
            "network_recv_bytes": 14078323665,
            "timestamp": "2025-03-07T09:37:00"
        },
        {
            "cpu_temperature": 44.6483,
            "cpu_usage": 1.16167,
            "ram_usage": 37.3,
            "system_load": 0.109375,
            "network_sent_bytes": 156490978793,
            "network_recv_bytes": 14078344337,
            "timestamp": "2025-03-07T09:38:00"
        },
        {
            "cpu_temperature": 44.6017,
            "cpu_usage": 1.19167,
            "ram_usage": 37.4,
            "system_load": 0.159668,
            "network_sent_bytes": 156491001362,
            "network_recv_bytes": 14078365273,
            "timestamp": "2025-03-07T09:39:00"
        },
        {
            "cpu_temperature": 44.8383,
            "cpu_usage": 1.22,
            "ram_usage": 37.2,
            "system_load": 0.170898,
            "network_sent_bytes": 156491025459,
            "network_recv_bytes": 14078387586,
            "timestamp": "2025-03-07T09:40:00"
        },
        {
            "cpu_temperature": 44.6367,
            "cpu_usage": 1.11667,
            "ram_usage": 37.3,
            "system_load": 0.0615234,
            "network_sent_bytes": 156491050304,
            "network_recv_bytes": 14078415373,
            "timestamp": "2025-03-07T09:41:00"
        },
        {
            "cpu_temperature": 44.62,
            "cpu_usage": 1.14,
            "ram_usage": 37.3,
            "system_load": 0.288086,
            "network_sent_bytes": 156491072234,
            "network_recv_bytes": 14078435943,
            "timestamp": "2025-03-07T09:42:00"
        },
        {
            "cpu_temperature": 44.7117,
            "cpu_usage": 1.08833,
            "ram_usage": 37.3,
            "system_load": 0.179688,
            "network_sent_bytes": 156491094055,
            "network_recv_bytes": 14078456642,
            "timestamp": "2025-03-07T09:43:00"
        },
        {
            "cpu_temperature": 44.7867,
            "cpu_usage": 1.165,
            "ram_usage": 37.4,
            "system_load": 0.274414,
            "network_sent_bytes": 156491115792,
            "network_recv_bytes": 14078477209,
            "timestamp": "2025-03-07T09:44:00"
        },
        {
            "cpu_temperature": 44.7717,
            "cpu_usage": 1.22,
            "ram_usage": 37.3,
            "system_load": 0.318848,
            "network_sent_bytes": 156491139829,
            "network_recv_bytes": 14078500148,
            "timestamp": "2025-03-07T09:45:00"
        },
        {
            "cpu_temperature": 44.5633,
            "cpu_usage": 1.11167,
            "ram_usage": 37.3,
            "system_load": 0.249023,
            "network_sent_bytes": 156491163984,
            "network_recv_bytes": 14078528076,
            "timestamp": "2025-03-07T09:46:00"
        },
        {
            "cpu_temperature": 44.5833,
            "cpu_usage": 1.105,
            "ram_usage": 37.3,
            "system_load": 0.211426,
            "network_sent_bytes": 156491185676,
            "network_recv_bytes": 14078548610,
            "timestamp": "2025-03-07T09:47:00"
        },
        {
            "cpu_temperature": 44.54,
            "cpu_usage": 1.05667,
            "ram_usage": 37.3,
            "system_load": 0.148926,
            "network_sent_bytes": 156491207954,
            "network_recv_bytes": 14078569809,
            "timestamp": "2025-03-07T09:48:00"
        },
        {
            "cpu_temperature": 45,
            "cpu_usage": 2.15667,
            "ram_usage": 37.3,
            "system_load": 0.0942383,
            "network_sent_bytes": 156495654516,
            "network_recv_bytes": 14082896318,
            "timestamp": "2025-03-07T09:49:00"
        },
        {
            "cpu_temperature": 45.1817,
            "cpu_usage": 2.71833,
            "ram_usage": 37.3,
            "system_load": 0.432617,
            "network_sent_bytes": 156498781116,
            "network_recv_bytes": 14085317604,
            "timestamp": "2025-03-07T09:50:00"
        },
        {
            "cpu_temperature": 46.505,
            "cpu_usage": 10.785,
            "ram_usage": 37.4,
            "system_load": 0.368652,
            "network_sent_bytes": 156512576638,
            "network_recv_bytes": 14098757280,
            "timestamp": "2025-03-07T09:51:00"
        },
        {
            "cpu_temperature": 46.0167,
            "cpu_usage": 3.00333,
            "ram_usage": 37.3,
            "system_load": 0.288086,
            "network_sent_bytes": 156513049794,
            "network_recv_bytes": 14099222812,
            "timestamp": "2025-03-07T09:52:00"
        },
        {
            "cpu_temperature": 46.6283,
            "cpu_usage": 6.42167,
            "ram_usage": 37.3,
            "system_load": 0.241211,
            "network_sent_bytes": 156515534767,
            "network_recv_bytes": 14101668490,
            "timestamp": "2025-03-07T09:53:00"
        },
        {
            "cpu_temperature": 45.9183,
            "cpu_usage": 1.44167,
            "ram_usage": 37.3,
            "system_load": 0.0947266,
            "network_sent_bytes": 156515706996,
            "network_recv_bytes": 14101837425,
            "timestamp": "2025-03-07T09:54:00"
        },
        {
            "cpu_temperature": 45.2117,
            "cpu_usage": 1.18833,
            "ram_usage": 37.3,
            "system_load": 0.180664,
            "network_sent_bytes": 156515736819,
            "network_recv_bytes": 14101864096,
            "timestamp": "2025-03-07T09:55:00"
        },
        {
            "cpu_temperature": 44.9833,
            "cpu_usage": 1.19,
            "ram_usage": 37.3,
            "system_load": 0.194824,
            "network_sent_bytes": 156515763579,
            "network_recv_bytes": 14101894418,
            "timestamp": "2025-03-07T09:56:00"
        },
        {
            "cpu_temperature": 44.915,
            "cpu_usage": 1.16,
            "ram_usage": 37.3,
            "system_load": 0.102051,
            "network_sent_bytes": 156515786825,
            "network_recv_bytes": 14101915862,
            "timestamp": "2025-03-07T09:57:00"
        },
        {
            "cpu_temperature": 44.9017,
            "cpu_usage": 1.19167,
            "ram_usage": 37.3,
            "system_load": 0.22998,
            "network_sent_bytes": 156515812042,
            "network_recv_bytes": 14101939766,
            "timestamp": "2025-03-07T09:58:00"
        },
        {
            "cpu_temperature": 44.9283,
            "cpu_usage": 0.99,
            "ram_usage": 36.9,
            "system_load": 0.114258,
            "network_sent_bytes": 156515838142,
            "network_recv_bytes": 14101961701,
            "timestamp": "2025-03-07T09:59:00"
        },
        {
            "cpu_temperature": 44.9567,
            "cpu_usage": 1.42167,
            "ram_usage": 37.4,
            "system_load": 0.168945,
            "network_sent_bytes": 156515889556,
            "network_recv_bytes": 14102007638,
            "timestamp": "2025-03-07T10:00:00"
        },
        {
            "cpu_temperature": 45.06,
            "cpu_usage": 1.25333,
            "ram_usage": 37.3,
            "system_load": 0.353027,
            "network_sent_bytes": 156515915918,
            "network_recv_bytes": 14102038542,
            "timestamp": "2025-03-07T10:01:00"
        },
        {
            "cpu_temperature": 44.8983,
            "cpu_usage": 1.14667,
            "ram_usage": 37.2,
            "system_load": 0.159668,
            "network_sent_bytes": 156515945829,
            "network_recv_bytes": 14102061265,
            "timestamp": "2025-03-07T10:02:00"
        },
        {
            "cpu_temperature": 44.9167,
            "cpu_usage": 1.14333,
            "ram_usage": 37.3,
            "system_load": 0.284668,
            "network_sent_bytes": 156515972527,
            "network_recv_bytes": 14102084994,
            "timestamp": "2025-03-07T10:03:00"
        },
        {
            "cpu_temperature": 45.1317,
            "cpu_usage": 1.18,
            "ram_usage": 37.3,
            "system_load": 0.182617,
            "network_sent_bytes": 156515998303,
            "network_recv_bytes": 14102106484,
            "timestamp": "2025-03-07T10:04:00"
        },
        {
            "cpu_temperature": 45.08,
            "cpu_usage": 1.14833,
            "ram_usage": 37.4,
            "system_load": 0.0654297,
            "network_sent_bytes": 156516026403,
            "network_recv_bytes": 14102128920,
            "timestamp": "2025-03-07T10:05:00"
        },
        {
            "cpu_temperature": 45.165,
            "cpu_usage": 1.095,
            "ram_usage": 37.1,
            "system_load": 0.185059,
            "network_sent_bytes": 156516051509,
            "network_recv_bytes": 14102157163,
            "timestamp": "2025-03-07T10:06:00"
        },
        {
            "cpu_temperature": 45.1067,
            "cpu_usage": 1.09833,
            "ram_usage": 37.3,
            "system_load": 0.0664062,
            "network_sent_bytes": 156516073426,
            "network_recv_bytes": 14102177846,
            "timestamp": "2025-03-07T10:07:00"
        },
        {
            "cpu_temperature": 45.035,
            "cpu_usage": 1.07167,
            "ram_usage": 37.2,
            "system_load": 0.135742,
            "network_sent_bytes": 156516095410,
            "network_recv_bytes": 14102198556,
            "timestamp": "2025-03-07T10:08:00"
        },
        {
            "cpu_temperature": 45.1217,
            "cpu_usage": 1.21333,
            "ram_usage": 37.3,
            "system_load": 0.197754,
            "network_sent_bytes": 156516117308,
            "network_recv_bytes": 14102219296,
            "timestamp": "2025-03-07T10:09:00"
        },
        {
            "cpu_temperature": 45.1233,
            "cpu_usage": 1.06667,
            "ram_usage": 37.3,
            "system_load": 0.0708008,
            "network_sent_bytes": 156516141275,
            "network_recv_bytes": 14102241639,
            "timestamp": "2025-03-07T10:10:00"
        },
        {
            "cpu_temperature": 45.1433,
            "cpu_usage": 1.09667,
            "ram_usage": 37.1,
            "system_load": 0.191406,
            "network_sent_bytes": 156516166875,
            "network_recv_bytes": 14102269531,
            "timestamp": "2025-03-07T10:11:00"
        },
        {
            "cpu_temperature": 45.06,
            "cpu_usage": 1.11167,
            "ram_usage": 37.2,
            "system_load": 0.192871,
            "network_sent_bytes": 156516188825,
            "network_recv_bytes": 14102290361,
            "timestamp": "2025-03-07T10:12:00"
        },
        {
            "cpu_temperature": 45.24,
            "cpu_usage": 1.02667,
            "ram_usage": 37.2,
            "system_load": 0.175293,
            "network_sent_bytes": 156516210818,
            "network_recv_bytes": 14102310984,
            "timestamp": "2025-03-07T10:13:00"
        },
        {
            "cpu_temperature": 45.2267,
            "cpu_usage": 1.20667,
            "ram_usage": 37.3,
            "system_load": 0.224609,
            "network_sent_bytes": 156516236670,
            "network_recv_bytes": 14102331496,
            "timestamp": "2025-03-07T10:14:00"
        },
        {
            "cpu_temperature": 45.2183,
            "cpu_usage": 1.06667,
            "ram_usage": 37.2,
            "system_load": 0.0800781,
            "network_sent_bytes": 156516261187,
            "network_recv_bytes": 14102354606,
            "timestamp": "2025-03-07T10:15:00"
        },
        {
            "cpu_temperature": 45.3183,
            "cpu_usage": 1.10167,
            "ram_usage": 37.3,
            "system_load": 0.10791,
            "network_sent_bytes": 156516285849,
            "network_recv_bytes": 14102382363,
            "timestamp": "2025-03-07T10:16:00"
        },
        {
            "cpu_temperature": 45.3833,
            "cpu_usage": 1.04,
            "ram_usage": 36.9,
            "system_load": 0.19873,
            "network_sent_bytes": 156516307881,
            "network_recv_bytes": 14102402995,
            "timestamp": "2025-03-07T10:17:00"
        },
        {
            "cpu_temperature": 45.2917,
            "cpu_usage": 1,
            "ram_usage": 37.3,
            "system_load": 0.0712891,
            "network_sent_bytes": 156516330165,
            "network_recv_bytes": 14102424388,
            "timestamp": "2025-03-07T10:18:00"
        },
        {
            "cpu_temperature": 45.42,
            "cpu_usage": 1.07833,
            "ram_usage": 36.9,
            "system_load": 0.15625,
            "network_sent_bytes": 156516351953,
            "network_recv_bytes": 14102444988,
            "timestamp": "2025-03-07T10:19:00"
        },
        {
            "cpu_temperature": 45.305,
            "cpu_usage": 1.11167,
            "ram_usage": 37.3,
            "system_load": 0.250977,
            "network_sent_bytes": 156516376857,
            "network_recv_bytes": 14102474050,
            "timestamp": "2025-03-07T10:20:00"
        },
        {
            "cpu_temperature": 45.4483,
            "cpu_usage": 0.985,
            "ram_usage": 36.9,
            "system_load": 0.0908203,
            "network_sent_bytes": 156516399321,
            "network_recv_bytes": 14102495237,
            "timestamp": "2025-03-07T10:21:00"
        },
        {
            "cpu_temperature": 45.3517,
            "cpu_usage": 1.14833,
            "ram_usage": 37.3,
            "system_load": 0.194336,
            "network_sent_bytes": 156516421391,
            "network_recv_bytes": 14102516151,
            "timestamp": "2025-03-07T10:22:00"
        },
        {
            "cpu_temperature": 45.3167,
            "cpu_usage": 0.988333,
            "ram_usage": 37,
            "system_load": 0.102051,
            "network_sent_bytes": 156516443293,
            "network_recv_bytes": 14102536923,
            "timestamp": "2025-03-07T10:23:00"
        },
        {
            "cpu_temperature": 45.9717,
            "cpu_usage": 3.12167,
            "ram_usage": 37.3,
            "system_load": 0.222656,
            "network_sent_bytes": 156544030563,
            "network_recv_bytes": 14118057762,
            "timestamp": "2025-03-07T10:24:00"
        },
        {
            "cpu_temperature": 45.5433,
            "cpu_usage": 1.19167,
            "ram_usage": 37.1,
            "system_load": 0.229492,
            "network_sent_bytes": 156553592347,
            "network_recv_bytes": 14123026098,
            "timestamp": "2025-03-07T10:25:00"
        },
        {
            "cpu_temperature": 45.5383,
            "cpu_usage": 1.085,
            "ram_usage": 37.4,
            "system_load": 0.0825195,
            "network_sent_bytes": 156554450808,
            "network_recv_bytes": 14123539757,
            "timestamp": "2025-03-07T10:26:00"
        },
        {
            "cpu_temperature": 45.465,
            "cpu_usage": 1.105,
            "ram_usage": 37.3,
            "system_load": 0.160156,
            "network_sent_bytes": 156555014597,
            "network_recv_bytes": 14123885718,
            "timestamp": "2025-03-07T10:27:00"
        },
        {
            "cpu_temperature": 45.4383,
            "cpu_usage": 1.16833,
            "ram_usage": 37.3,
            "system_load": 0.136719,
            "network_sent_bytes": 156555055603,
            "network_recv_bytes": 14123924285,
            "timestamp": "2025-03-07T10:28:00"
        },
        {
            "cpu_temperature": 45.5433,
            "cpu_usage": 1.17667,
            "ram_usage": 37.3,
            "system_load": 0.0483398,
            "network_sent_bytes": 156555080579,
            "network_recv_bytes": 14123947815,
            "timestamp": "2025-03-07T10:29:00"
        },
        {
            "cpu_temperature": 45.2867,
            "cpu_usage": 1.23,
            "ram_usage": 37.3,
            "system_load": 0.219727,
            "network_sent_bytes": 156555298442,
            "network_recv_bytes": 14124136556,
            "timestamp": "2025-03-07T10:30:00"
        },
        {
            "cpu_temperature": 45.335,
            "cpu_usage": 1.16333,
            "ram_usage": 37.3,
            "system_load": 0.0786133,
            "network_sent_bytes": 156556356322,
            "network_recv_bytes": 14124776098,
            "timestamp": "2025-03-07T10:31:00"
        },
        {
            "cpu_temperature": 45.32,
            "cpu_usage": 1.195,
            "ram_usage": 37.3,
            "system_load": 0.10791,
            "network_sent_bytes": 156557665930,
            "network_recv_bytes": 14125531279,
            "timestamp": "2025-03-07T10:32:00"
        },
        {
            "cpu_temperature": 45.235,
            "cpu_usage": 1.43,
            "ram_usage": 37.2,
            "system_load": 0.239746,
            "network_sent_bytes": 156582009715,
            "network_recv_bytes": 14138574346,
            "timestamp": "2025-03-07T10:33:00"
        },
        {
            "cpu_temperature": 45.3983,
            "cpu_usage": 1.15333,
            "ram_usage": 37.3,
            "system_load": 0.121094,
            "network_sent_bytes": 156584953628,
            "network_recv_bytes": 14140155563,
            "timestamp": "2025-03-07T10:34:00"
        },
        {
            "cpu_temperature": 45.1933,
            "cpu_usage": 1.21167,
            "ram_usage": 37.3,
            "system_load": 0.174316,
            "network_sent_bytes": 156585294654,
            "network_recv_bytes": 14140376205,
            "timestamp": "2025-03-07T10:35:00"
        },
        {
            "cpu_temperature": 45.1283,
            "cpu_usage": 1.16833,
            "ram_usage": 37.3,
            "system_load": 0.249512,
            "network_sent_bytes": 156585383324,
            "network_recv_bytes": 14140451755,
            "timestamp": "2025-03-07T10:36:00"
        },
        {
            "cpu_temperature": 45.1367,
            "cpu_usage": 1.34667,
            "ram_usage": 37.3,
            "system_load": 0.0898438,
            "network_sent_bytes": 156587451561,
            "network_recv_bytes": 14142108755,
            "timestamp": "2025-03-07T10:37:00"
        },
        {
            "cpu_temperature": 45.395,
            "cpu_usage": 1.58667,
            "ram_usage": 37.3,
            "system_load": 0.251953,
            "network_sent_bytes": 156595930166,
            "network_recv_bytes": 14147135763,
            "timestamp": "2025-03-07T10:38:00"
        },
        {
            "cpu_temperature": 45.3283,
            "cpu_usage": 1.565,
            "ram_usage": 37.3,
            "system_load": 0.157227,
            "network_sent_bytes": 156625915040,
            "network_recv_bytes": 14162654606,
            "timestamp": "2025-03-07T10:39:00"
        },
        {
            "cpu_temperature": 45.3033,
            "cpu_usage": 1.36,
            "ram_usage": 37.4,
            "system_load": 0.136719,
            "network_sent_bytes": 156629846747,
            "network_recv_bytes": 14164859285,
            "timestamp": "2025-03-07T10:40:00"
        },
        {
            "cpu_temperature": 45.3233,
            "cpu_usage": 1.14833,
            "ram_usage": 37.3,
            "system_load": 0.272461,
            "network_sent_bytes": 156629880838,
            "network_recv_bytes": 14164895973,
            "timestamp": "2025-03-07T10:41:00"
        },
        {
            "cpu_temperature": 45.1667,
            "cpu_usage": 1.14333,
            "ram_usage": 37.3,
            "system_load": 0.0986328,
            "network_sent_bytes": 156629906668,
            "network_recv_bytes": 14164922061,
            "timestamp": "2025-03-07T10:42:00"
        },
        {
            "cpu_temperature": 45.2617,
            "cpu_usage": 1.15667,
            "ram_usage": 37.3,
            "system_load": 0.166504,
            "network_sent_bytes": 156629932673,
            "network_recv_bytes": 14164946010,
            "timestamp": "2025-03-07T10:43:00"
        },
        {
            "cpu_temperature": 45.27,
            "cpu_usage": 1.21333,
            "ram_usage": 37.3,
            "system_load": 0.13916,
            "network_sent_bytes": 156629958848,
            "network_recv_bytes": 14164969624,
            "timestamp": "2025-03-07T10:44:00"
        },
        {
            "cpu_temperature": 45.21,
            "cpu_usage": 1.15167,
            "ram_usage": 37.3,
            "system_load": 0.141602,
            "network_sent_bytes": 156629986727,
            "network_recv_bytes": 14164993105,
            "timestamp": "2025-03-07T10:45:00"
        },
        {
            "cpu_temperature": 45.0533,
            "cpu_usage": 1.24833,
            "ram_usage": 37.3,
            "system_load": 0.212402,
            "network_sent_bytes": 156630010563,
            "network_recv_bytes": 14165021232,
            "timestamp": "2025-03-07T10:46:00"
        },
        {
            "cpu_temperature": 45.125,
            "cpu_usage": 1.15667,
            "ram_usage": 37.3,
            "system_load": 0.156738,
            "network_sent_bytes": 156630036904,
            "network_recv_bytes": 14165044502,
            "timestamp": "2025-03-07T10:47:00"
        },
        {
            "cpu_temperature": 45.0383,
            "cpu_usage": 1.16,
            "ram_usage": 37.2,
            "system_load": 0.136719,
            "network_sent_bytes": 156630063896,
            "network_recv_bytes": 14165068357,
            "timestamp": "2025-03-07T10:48:00"
        },
        {
            "cpu_temperature": 45.1167,
            "cpu_usage": 1.20333,
            "ram_usage": 37.2,
            "system_load": 0.198242,
            "network_sent_bytes": 156630089606,
            "network_recv_bytes": 14165095062,
            "timestamp": "2025-03-07T10:49:00"
        },
        {
            "cpu_temperature": 44.995,
            "cpu_usage": 1.21833,
            "ram_usage": 37.3,
            "system_load": 0.14502,
            "network_sent_bytes": 156630121494,
            "network_recv_bytes": 14165125016,
            "timestamp": "2025-03-07T10:50:00"
        },
        {
            "cpu_temperature": 45,
            "cpu_usage": 1.16833,
            "ram_usage": 37.3,
            "system_load": 0.228516,
            "network_sent_bytes": 156630150344,
            "network_recv_bytes": 14165154745,
            "timestamp": "2025-03-07T10:51:00"
        },
        {
            "cpu_temperature": 44.8967,
            "cpu_usage": 1.17833,
            "ram_usage": 37.3,
            "system_load": 0.185059,
            "network_sent_bytes": 156630176159,
            "network_recv_bytes": 14165175950,
            "timestamp": "2025-03-07T10:52:00"
        },
        {
            "cpu_temperature": 45.0317,
            "cpu_usage": 1.10833,
            "ram_usage": 37.3,
            "system_load": 0.128906,
            "network_sent_bytes": 156630202502,
            "network_recv_bytes": 14165197061,
            "timestamp": "2025-03-07T10:53:00"
        },
        {
            "cpu_temperature": 45.0567,
            "cpu_usage": 1.205,
            "ram_usage": 37.3,
            "system_load": 0.20752,
            "network_sent_bytes": 156630228222,
            "network_recv_bytes": 14165217825,
            "timestamp": "2025-03-07T10:54:00"
        },
        {
            "cpu_temperature": 44.8683,
            "cpu_usage": 0.95,
            "ram_usage": 36.9,
            "system_load": 0.0737305,
            "network_sent_bytes": 156630250340,
            "network_recv_bytes": 14165238741,
            "timestamp": "2025-03-07T10:55:00"
        },
        {
            "cpu_temperature": 44.9383,
            "cpu_usage": 1.03667,
            "ram_usage": 37.3,
            "system_load": 0.105469,
            "network_sent_bytes": 156630275564,
            "network_recv_bytes": 14165268143,
            "timestamp": "2025-03-07T10:56:00"
        },
        {
            "cpu_temperature": 45.0267,
            "cpu_usage": 1.08333,
            "ram_usage": 37.3,
            "system_load": 0.248535,
            "network_sent_bytes": 156630297644,
            "network_recv_bytes": 14165288883,
            "timestamp": "2025-03-07T10:57:00"
        },
        {
            "cpu_temperature": 44.9633,
            "cpu_usage": 1.09,
            "ram_usage": 37.3,
            "system_load": 0.0893555,
            "network_sent_bytes": 156630319393,
            "network_recv_bytes": 14165309484,
            "timestamp": "2025-03-07T10:58:00"
        },
        {
            "cpu_temperature": 45.0717,
            "cpu_usage": 1.19833,
            "ram_usage": 37.3,
            "system_load": 0.20752,
            "network_sent_bytes": 156630341397,
            "network_recv_bytes": 14165330288,
            "timestamp": "2025-03-07T10:59:00"
        },
        {
            "cpu_temperature": 44.9983,
            "cpu_usage": 1.51833,
            "ram_usage": 37.3,
            "system_load": 0.203613,
            "network_sent_bytes": 156630387637,
            "network_recv_bytes": 14165375365,
            "timestamp": "2025-03-07T11:00:00"
        },
        {
            "cpu_temperature": 45.1417,
            "cpu_usage": 1.23333,
            "ram_usage": 37.3,
            "system_load": 0.0727539,
            "network_sent_bytes": 156630414487,
            "network_recv_bytes": 14165405632,
            "timestamp": "2025-03-07T11:01:00"
        },
        {
            "cpu_temperature": 45.0983,
            "cpu_usage": 1.05833,
            "ram_usage": 37,
            "system_load": 0.335938,
            "network_sent_bytes": 156630440492,
            "network_recv_bytes": 14165426345,
            "timestamp": "2025-03-07T11:02:00"
        },
        {
            "cpu_temperature": 45.0367,
            "cpu_usage": 1.04833,
            "ram_usage": 37.4,
            "system_load": 0.154297,
            "network_sent_bytes": 156630462893,
            "network_recv_bytes": 14165447023,
            "timestamp": "2025-03-07T11:03:00"
        },
        {
            "cpu_temperature": 45.1267,
            "cpu_usage": 1.18833,
            "ram_usage": 37,
            "system_load": 0.135742,
            "network_sent_bytes": 156630485086,
            "network_recv_bytes": 14165467874,
            "timestamp": "2025-03-07T11:04:00"
        },
        {
            "cpu_temperature": 45.0033,
            "cpu_usage": 1.02833,
            "ram_usage": 37.3,
            "system_load": 0.197754,
            "network_sent_bytes": 156630508927,
            "network_recv_bytes": 14165490215,
            "timestamp": "2025-03-07T11:05:00"
        },
        {
            "cpu_temperature": 45.075,
            "cpu_usage": 1.04167,
            "ram_usage": 36.9,
            "system_load": 0.128418,
            "network_sent_bytes": 156630532339,
            "network_recv_bytes": 14165518061,
            "timestamp": "2025-03-07T11:06:00"
        },
        {
            "cpu_temperature": 44.9867,
            "cpu_usage": 0.981667,
            "ram_usage": 37.3,
            "system_load": 0.177246,
            "network_sent_bytes": 156630554332,
            "network_recv_bytes": 14165538774,
            "timestamp": "2025-03-07T11:07:00"
        },
        {
            "cpu_temperature": 45,
            "cpu_usage": 0.946667,
            "ram_usage": 36.9,
            "system_load": 0.251953,
            "network_sent_bytes": 156630576533,
            "network_recv_bytes": 14165559767,
            "timestamp": "2025-03-07T11:08:00"
        },
        {
            "cpu_temperature": 45.0233,
            "cpu_usage": 1.09,
            "ram_usage": 37.3,
            "system_load": 0.128906,
            "network_sent_bytes": 156630598392,
            "network_recv_bytes": 14165580524,
            "timestamp": "2025-03-07T11:09:00"
        },
        {
            "cpu_temperature": 44.89,
            "cpu_usage": 1.06833,
            "ram_usage": 37,
            "system_load": 0.20752,
            "network_sent_bytes": 156630620429,
            "network_recv_bytes": 14165601203,
            "timestamp": "2025-03-07T11:10:00"
        },
        {
            "cpu_temperature": 44.86,
            "cpu_usage": 1.01667,
            "ram_usage": 37.3,
            "system_load": 0.0737305,
            "network_sent_bytes": 156630646435,
            "network_recv_bytes": 14165630772,
            "timestamp": "2025-03-07T11:11:00"
        },
        {
            "cpu_temperature": 44.8317,
            "cpu_usage": 0.925,
            "ram_usage": 36.9,
            "system_load": 0.105469,
            "network_sent_bytes": 156630668368,
            "network_recv_bytes": 14165651343,
            "timestamp": "2025-03-07T11:12:00"
        },
        {
            "cpu_temperature": 44.8767,
            "cpu_usage": 0.953333,
            "ram_usage": 37.3,
            "system_load": 0.186035,
            "network_sent_bytes": 156630690264,
            "network_recv_bytes": 14165672113,
            "timestamp": "2025-03-07T11:13:00"
        },
        {
            "cpu_temperature": 44.9917,
            "cpu_usage": 1.24,
            "ram_usage": 37.3,
            "system_load": 0.0668945,
            "network_sent_bytes": 156630716242,
            "network_recv_bytes": 14165692623,
            "timestamp": "2025-03-07T11:14:00"
        },
        {
            "cpu_temperature": 44.7933,
            "cpu_usage": 1.22333,
            "ram_usage": 37.4,
            "system_load": 0.154297,
            "network_sent_bytes": 156630741501,
            "network_recv_bytes": 14165715800,
            "timestamp": "2025-03-07T11:15:00"
        },
        {
            "cpu_temperature": 44.7833,
            "cpu_usage": 1.08167,
            "ram_usage": 37.1,
            "system_load": 0.231445,
            "network_sent_bytes": 156630764687,
            "network_recv_bytes": 14165743530,
            "timestamp": "2025-03-07T11:16:00"
        },
        {
            "cpu_temperature": 44.7717,
            "cpu_usage": 1.07167,
            "ram_usage": 37.3,
            "system_load": 0.0834961,
            "network_sent_bytes": 156630786716,
            "network_recv_bytes": 14165764221,
            "timestamp": "2025-03-07T11:17:00"
        },
        {
            "cpu_temperature": 44.5433,
            "cpu_usage": 1.14,
            "ram_usage": 37.2,
            "system_load": 0.190918,
            "network_sent_bytes": 156630809088,
            "network_recv_bytes": 14165785434,
            "timestamp": "2025-03-07T11:18:00"
        },
        {
            "cpu_temperature": 44.6467,
            "cpu_usage": 1.10667,
            "ram_usage": 37.3,
            "system_load": 0.167969,
            "network_sent_bytes": 156630830836,
            "network_recv_bytes": 14165806140,
            "timestamp": "2025-03-07T11:19:00"
        },
        {
            "cpu_temperature": 44.58,
            "cpu_usage": 1.135,
            "ram_usage": 37.2,
            "system_load": 0.140625,
            "network_sent_bytes": 156630854661,
            "network_recv_bytes": 14165828389,
            "timestamp": "2025-03-07T11:20:00"
        },
        {
            "cpu_temperature": 44.4267,
            "cpu_usage": 1.14167,
            "ram_usage": 37.3,
            "system_load": 0.39502,
            "network_sent_bytes": 156630877936,
            "network_recv_bytes": 14165856155,
            "timestamp": "2025-03-07T11:21:00"
        },
        {
            "cpu_temperature": 44.5833,
            "cpu_usage": 1.16333,
            "ram_usage": 37.3,
            "system_load": 0.243652,
            "network_sent_bytes": 156630900118,
            "network_recv_bytes": 14165877005,
            "timestamp": "2025-03-07T11:22:00"
        },
        {
            "cpu_temperature": 44.55,
            "cpu_usage": 1.135,
            "ram_usage": 37.2,
            "system_load": 0.21875,
            "network_sent_bytes": 156630922023,
            "network_recv_bytes": 14165897778,
            "timestamp": "2025-03-07T11:23:00"
        },
        {
            "cpu_temperature": 44.6817,
            "cpu_usage": 1.215,
            "ram_usage": 37.3,
            "system_load": 0.283691,
            "network_sent_bytes": 156630943871,
            "network_recv_bytes": 14165918456,
            "timestamp": "2025-03-07T11:24:00"
        },
        {
            "cpu_temperature": 44.6583,
            "cpu_usage": 1.26667,
            "ram_usage": 37.4,
            "system_load": 0.42334,
            "network_sent_bytes": 156630968163,
            "network_recv_bytes": 14165941096,
            "timestamp": "2025-03-07T11:25:00"
        },
        {
            "cpu_temperature": 44.6783,
            "cpu_usage": 1.08667,
            "ram_usage": 37.3,
            "system_load": 0.315918,
            "network_sent_bytes": 156630995386,
            "network_recv_bytes": 14165968714,
            "timestamp": "2025-03-07T11:26:00"
        },
        {
            "cpu_temperature": 44.5983,
            "cpu_usage": 1.05667,
            "ram_usage": 37.3,
            "system_load": 0.334473,
            "network_sent_bytes": 156631017703,
            "network_recv_bytes": 14165989376,
            "timestamp": "2025-03-07T11:27:00"
        },
        {
            "cpu_temperature": 44.6617,
            "cpu_usage": 1.05667,
            "ram_usage": 37.2,
            "system_load": 0.20166,
            "network_sent_bytes": 156631039610,
            "network_recv_bytes": 14166010059,
            "timestamp": "2025-03-07T11:28:00"
        },
        {
            "cpu_temperature": 44.4917,
            "cpu_usage": 1.17,
            "ram_usage": 37.3,
            "system_load": 0.413574,
            "network_sent_bytes": 156631061543,
            "network_recv_bytes": 14166030630,
            "timestamp": "2025-03-07T11:29:00"
        },
        {
            "cpu_temperature": 44.6083,
            "cpu_usage": 1.17333,
            "ram_usage": 37.2,
            "system_load": 0.150391,
            "network_sent_bytes": 156631086047,
            "network_recv_bytes": 14166053709,
            "timestamp": "2025-03-07T11:30:00"
        },
        {
            "cpu_temperature": 44.575,
            "cpu_usage": 1.085,
            "ram_usage": 37.3,
            "system_load": 0.234375,
            "network_sent_bytes": 156631109456,
            "network_recv_bytes": 14166081556,
            "timestamp": "2025-03-07T11:31:00"
        },
        {
            "cpu_temperature": 44.5867,
            "cpu_usage": 1.11333,
            "ram_usage": 37.3,
            "system_load": 0.262695,
            "network_sent_bytes": 156631131346,
            "network_recv_bytes": 14166102324,
            "timestamp": "2025-03-07T11:32:00"
        },
        {
            "cpu_temperature": 44.5367,
            "cpu_usage": 1.135,
            "ram_usage": 37.3,
            "system_load": 0.212891,
            "network_sent_bytes": 156631153387,
            "network_recv_bytes": 14166123005,
            "timestamp": "2025-03-07T11:33:00"
        },
        {
            "cpu_temperature": 44.5767,
            "cpu_usage": 1.17,
            "ram_usage": 37.3,
            "system_load": 0.318848,
            "network_sent_bytes": 156631175334,
            "network_recv_bytes": 14166143702,
            "timestamp": "2025-03-07T11:34:00"
        },
        {
            "cpu_temperature": 44.38,
            "cpu_usage": 1.18,
            "ram_usage": 37.3,
            "system_load": 0.228027,
            "network_sent_bytes": 156631199300,
            "network_recv_bytes": 14166166080,
            "timestamp": "2025-03-07T11:35:00"
        },
        {
            "cpu_temperature": 44.565,
            "cpu_usage": 1.15667,
            "ram_usage": 37.3,
            "system_load": 0.242676,
            "network_sent_bytes": 156631231217,
            "network_recv_bytes": 14166203199,
            "timestamp": "2025-03-07T11:36:00"
        },
        {
            "cpu_temperature": 44.6217,
            "cpu_usage": 1.09667,
            "ram_usage": 37.3,
            "system_load": 0.365723,
            "network_sent_bytes": 156631256497,
            "network_recv_bytes": 14166227019,
            "timestamp": "2025-03-07T11:37:00"
        },
        {
            "cpu_temperature": 44.6267,
            "cpu_usage": 1.12,
            "ram_usage": 37.2,
            "system_load": 0.212891,
            "network_sent_bytes": 156631282607,
            "network_recv_bytes": 14166247905,
            "timestamp": "2025-03-07T11:38:00"
        },
        {
            "cpu_temperature": 44.6883,
            "cpu_usage": 1.20333,
            "ram_usage": 37.3,
            "system_load": 0.32959,
            "network_sent_bytes": 156631305159,
            "network_recv_bytes": 14166268586,
            "timestamp": "2025-03-07T11:39:00"
        },
        {
            "cpu_temperature": 44.7283,
            "cpu_usage": 1.17833,
            "ram_usage": 37.3,
            "system_load": 0.199219,
            "network_sent_bytes": 156631338961,
            "network_recv_bytes": 14166300530,
            "timestamp": "2025-03-07T11:40:00"
        },
        {
            "cpu_temperature": 44.7567,
            "cpu_usage": 1.30333,
            "ram_usage": 37.2,
            "system_load": 0.151855,
            "network_sent_bytes": 156633116928,
            "network_recv_bytes": 14166518704,
            "timestamp": "2025-03-07T11:41:00"
        },
        {
            "cpu_temperature": 45.0717,
            "cpu_usage": 2.83667,
            "ram_usage": 37.4,
            "system_load": 0.313965,
            "network_sent_bytes": 156635144519,
            "network_recv_bytes": 14169226835,
            "timestamp": "2025-03-07T11:42:00"
        },
        {
            "cpu_temperature": 45.1167,
            "cpu_usage": 1.20333,
            "ram_usage": 37.1,
            "system_load": 0.216309,
            "network_sent_bytes": 156635237990,
            "network_recv_bytes": 14169323473,
            "timestamp": "2025-03-07T11:43:00"
        },
        {
            "cpu_temperature": 45.1067,
            "cpu_usage": 1.18167,
            "ram_usage": 37.3,
            "system_load": 0.240234,
            "network_sent_bytes": 156635312201,
            "network_recv_bytes": 14169398363,
            "timestamp": "2025-03-07T11:44:00"
        },
        {
            "cpu_temperature": 45.11,
            "cpu_usage": 3.67833,
            "ram_usage": 37.2,
            "system_load": 0.349121,
            "network_sent_bytes": 156639242611,
            "network_recv_bytes": 14171086936,
            "timestamp": "2025-03-07T11:45:00"
        },
        {
            "cpu_temperature": 45.7583,
            "cpu_usage": 2.63333,
            "ram_usage": 37.4,
            "system_load": 0.246094,
            "network_sent_bytes": 156650574713,
            "network_recv_bytes": 14172430506,
            "timestamp": "2025-03-07T11:46:00"
        },
        {
            "cpu_temperature": 45.69,
            "cpu_usage": 2.23,
            "ram_usage": 37,
            "system_load": 0.239258,
            "network_sent_bytes": 156650831706,
            "network_recv_bytes": 14172709411,
            "timestamp": "2025-03-07T11:47:00"
        },
        {
            "cpu_temperature": 45.52,
            "cpu_usage": 2.42,
            "ram_usage": 37.4,
            "system_load": 0.187988,
            "network_sent_bytes": 156651105822,
            "network_recv_bytes": 14173005940,
            "timestamp": "2025-03-07T11:48:00"
        },
        {
            "cpu_temperature": 45.4267,
            "cpu_usage": 1.10333,
            "ram_usage": 37,
            "system_load": 0.0732422,
            "network_sent_bytes": 156651154893,
            "network_recv_bytes": 14173055424,
            "timestamp": "2025-03-07T11:49:00"
        },
        {
            "cpu_temperature": 45.3683,
            "cpu_usage": 1.145,
            "ram_usage": 37.4,
            "system_load": 0.217285,
            "network_sent_bytes": 156651192633,
            "network_recv_bytes": 14173093013,
            "timestamp": "2025-03-07T11:50:00"
        },
        {
            "cpu_temperature": 45.33,
            "cpu_usage": 0.968333,
            "ram_usage": 37,
            "system_load": 0.120117,
            "network_sent_bytes": 156651238761,
            "network_recv_bytes": 14173140062,
            "timestamp": "2025-03-07T11:51:00"
        },
        {
            "cpu_temperature": 45.37,
            "cpu_usage": 1.13167,
            "ram_usage": 37.4,
            "system_load": 0.0424805,
            "network_sent_bytes": 156651272132,
            "network_recv_bytes": 14173173325,
            "timestamp": "2025-03-07T11:52:00"
        },
        {
            "cpu_temperature": 45.4517,
            "cpu_usage": 1.305,
            "ram_usage": 37.1,
            "system_load": 0.240723,
            "network_sent_bytes": 156651349118,
            "network_recv_bytes": 14173249733,
            "timestamp": "2025-03-07T11:53:00"
        },
        {
            "cpu_temperature": 47.4933,
            "cpu_usage": 12.2817,
            "ram_usage": 37.4,
            "system_load": 0.226074,
            "network_sent_bytes": 156658309904,
            "network_recv_bytes": 14185089766,
            "timestamp": "2025-03-07T11:54:00"
        },
        {
            "cpu_temperature": 46.68,
            "cpu_usage": 2.80667,
            "ram_usage": 37.1,
            "system_load": 0.288086,
            "network_sent_bytes": 156658854720,
            "network_recv_bytes": 14185758743,
            "timestamp": "2025-03-07T11:55:00"
        },
        {
            "cpu_temperature": 46.03,
            "cpu_usage": 1.09667,
            "ram_usage": 37.4,
            "system_load": 0.190918,
            "network_sent_bytes": 156658917643,
            "network_recv_bytes": 14185826228,
            "timestamp": "2025-03-07T11:56:00"
        },
        {
            "cpu_temperature": 45.94,
            "cpu_usage": 1.18667,
            "ram_usage": 37.5,
            "system_load": 0.100586,
            "network_sent_bytes": 156659013588,
            "network_recv_bytes": 14185920668,
            "timestamp": "2025-03-07T11:57:00"
        },
        {
            "cpu_temperature": 45.7833,
            "cpu_usage": 1.40333,
            "ram_usage": 37.9,
            "system_load": 0.244141,
            "network_sent_bytes": 156659230031,
            "network_recv_bytes": 14186131015,
            "timestamp": "2025-03-07T11:58:00"
        },
        {
            "cpu_temperature": 45.6683,
            "cpu_usage": 1.305,
            "ram_usage": 37.9,
            "system_load": 0.543457,
            "network_sent_bytes": 156659267335,
            "network_recv_bytes": 14186168042,
            "timestamp": "2025-03-07T11:59:00"
        },
        {
            "cpu_temperature": 45.63,
            "cpu_usage": 1.43833,
            "ram_usage": 37.9,
            "system_load": 0.197754,
            "network_sent_bytes": 156659313594,
            "network_recv_bytes": 14186213772,
            "timestamp": "2025-03-07T12:00:00"
        },
        {
            "cpu_temperature": 45.74,
            "cpu_usage": 1.37,
            "ram_usage": 37.4,
            "system_load": 0.196777,
            "network_sent_bytes": 156659371109,
            "network_recv_bytes": 14186276745,
            "timestamp": "2025-03-07T12:01:00"
        },
        {
            "cpu_temperature": 45.445,
            "cpu_usage": 1.1,
            "ram_usage": 37,
            "system_load": 0.0708008,
            "network_sent_bytes": 156659418045,
            "network_recv_bytes": 14186318671,
            "timestamp": "2025-03-07T12:02:00"
        },
        {
            "cpu_temperature": 45.6417,
            "cpu_usage": 1.08667,
            "ram_usage": 37.5,
            "system_load": 0.199219,
            "network_sent_bytes": 156659463643,
            "network_recv_bytes": 14186382860,
            "timestamp": "2025-03-07T12:03:00"
        },
        {
            "cpu_temperature": 45.85,
            "cpu_usage": 1.21833,
            "ram_usage": 37.2,
            "system_load": 0.157715,
            "network_sent_bytes": 156659637536,
            "network_recv_bytes": 14186552065,
            "timestamp": "2025-03-07T12:04:00"
        },
        {
            "cpu_temperature": 45.87,
            "cpu_usage": 1.09667,
            "ram_usage": 37.7,
            "system_load": 0.100586,
            "network_sent_bytes": 156659679649,
            "network_recv_bytes": 14186599220,
            "timestamp": "2025-03-07T12:05:00"
        },
        {
            "cpu_temperature": 45.6383,
            "cpu_usage": 1.13333,
            "ram_usage": 37.3,
            "system_load": 0.211914,
            "network_sent_bytes": 156659723321,
            "network_recv_bytes": 14186643013,
            "timestamp": "2025-03-07T12:06:00"
        },
        {
            "cpu_temperature": 45.7417,
            "cpu_usage": 1.08167,
            "ram_usage": 37.5,
            "system_load": 0.145508,
            "network_sent_bytes": 156659772988,
            "network_recv_bytes": 14186691970,
            "timestamp": "2025-03-07T12:07:00"
        },
        {
            "cpu_temperature": 45.6417,
            "cpu_usage": 1.07,
            "ram_usage": 37.2,
            "system_load": 0.0512695,
            "network_sent_bytes": 156659818299,
            "network_recv_bytes": 14186736763,
            "timestamp": "2025-03-07T12:08:00"
        },
        {
            "cpu_temperature": 45.7567,
            "cpu_usage": 1.17833,
            "ram_usage": 37.4,
            "system_load": 0.217773,
            "network_sent_bytes": 156659856717,
            "network_recv_bytes": 14186775295,
            "timestamp": "2025-03-07T12:09:00"
        },
        {
            "cpu_temperature": 45.8217,
            "cpu_usage": 1.07167,
            "ram_usage": 37.2,
            "system_load": 0.078125,
            "network_sent_bytes": 156659891280,
            "network_recv_bytes": 14186809695,
            "timestamp": "2025-03-07T12:10:00"
        },
        {
            "cpu_temperature": 45.5217,
            "cpu_usage": 1.02167,
            "ram_usage": 37.4,
            "system_load": 0.294922,
            "network_sent_bytes": 156659941415,
            "network_recv_bytes": 14186864834,
            "timestamp": "2025-03-07T12:11:00"
        },
        {
            "cpu_temperature": 45.63,
            "cpu_usage": 1.275,
            "ram_usage": 37.4,
            "system_load": 0.193848,
            "network_sent_bytes": 156659981150,
            "network_recv_bytes": 14186904216,
            "timestamp": "2025-03-07T12:12:00"
        },
        {
            "cpu_temperature": 45.7217,
            "cpu_usage": 1.25667,
            "ram_usage": 37.7,
            "system_load": 0.102051,
            "network_sent_bytes": 156660190609,
            "network_recv_bytes": 14187109152,
            "timestamp": "2025-03-07T12:13:00"
        },
        {
            "cpu_temperature": 45.7083,
            "cpu_usage": 1.26667,
            "ram_usage": 37.8,
            "system_load": 0.212402,
            "network_sent_bytes": 156660233913,
            "network_recv_bytes": 14187147532,
            "timestamp": "2025-03-07T12:14:00"
        },
        {
            "cpu_temperature": 45.6833,
            "cpu_usage": 1.2,
            "ram_usage": 37.4,
            "system_load": 0.151855,
            "network_sent_bytes": 156660265241,
            "network_recv_bytes": 14187180266,
            "timestamp": "2025-03-07T12:15:00"
        },
        {
            "cpu_temperature": 45.7717,
            "cpu_usage": 1.20167,
            "ram_usage": 37.5,
            "system_load": 0.102539,
            "network_sent_bytes": 156660403951,
            "network_recv_bytes": 14187334069,
            "timestamp": "2025-03-07T12:16:00"
        },
        {
            "cpu_temperature": 45.7083,
            "cpu_usage": 1.14167,
            "ram_usage": 37.1,
            "system_load": 0.347168,
            "network_sent_bytes": 156660475313,
            "network_recv_bytes": 14187405188,
            "timestamp": "2025-03-07T12:17:00"
        },
        {
            "cpu_temperature": 45.7217,
            "cpu_usage": 1.13167,
            "ram_usage": 37.4,
            "system_load": 0.193848,
            "network_sent_bytes": 156660564538,
            "network_recv_bytes": 14187493621,
            "timestamp": "2025-03-07T12:18:00"
        },
        {
            "cpu_temperature": 45.8883,
            "cpu_usage": 1.12167,
            "ram_usage": 37.2,
            "system_load": 0.212891,
            "network_sent_bytes": 156660639300,
            "network_recv_bytes": 14187568921,
            "timestamp": "2025-03-07T12:19:00"
        },
        {
            "cpu_temperature": 45.71,
            "cpu_usage": 1.25,
            "ram_usage": 37.4,
            "system_load": 0.163086,
            "network_sent_bytes": 156660715619,
            "network_recv_bytes": 14187644478,
            "timestamp": "2025-03-07T12:20:00"
        },
        {
            "cpu_temperature": 45.815,
            "cpu_usage": 1.18667,
            "ram_usage": 37.4,
            "system_load": 0.0957031,
            "network_sent_bytes": 156660801656,
            "network_recv_bytes": 14187736287,
            "timestamp": "2025-03-07T12:21:00"
        },
        {
            "cpu_temperature": 46.2617,
            "cpu_usage": 4.55,
            "ram_usage": 36.7,
            "system_load": 0.641113,
            "network_sent_bytes": 156664063324,
            "network_recv_bytes": 14192927820,
            "timestamp": "2025-03-07T12:22:00"
        },
        {
            "cpu_temperature": 46.7067,
            "cpu_usage": 2.205,
            "ram_usage": 36.8,
            "system_load": 0.268555,
            "network_sent_bytes": 156668483631,
            "network_recv_bytes": 14195304938,
            "timestamp": "2025-03-07T12:23:00"
        },
        {
            "cpu_temperature": 45.8117,
            "cpu_usage": 1.31333,
            "ram_usage": 36.8,
            "system_load": 0.0961914,
            "network_sent_bytes": 156668509686,
            "network_recv_bytes": 14195330989,
            "timestamp": "2025-03-07T12:24:00"
        },
        {
            "cpu_temperature": 45.65,
            "cpu_usage": 1.1,
            "ram_usage": 36.9,
            "system_load": 0.228516,
            "network_sent_bytes": 156668536395,
            "network_recv_bytes": 14195362770,
            "timestamp": "2025-03-07T12:25:00"
        },
        {
            "cpu_temperature": 45.545,
            "cpu_usage": 1.12833,
            "ram_usage": 36.7,
            "system_load": 0.0820312,
            "network_sent_bytes": 156668565507,
            "network_recv_bytes": 14195387417,
            "timestamp": "2025-03-07T12:26:00"
        },
        {
            "cpu_temperature": 45.6233,
            "cpu_usage": 1.005,
            "ram_usage": 36.3,
            "system_load": 0.171387,
            "network_sent_bytes": 156668595533,
            "network_recv_bytes": 14195416766,
            "timestamp": "2025-03-07T12:27:00"
        },
        {
            "cpu_temperature": 45.5433,
            "cpu_usage": 1.10833,
            "ram_usage": 36.7,
            "system_load": 0.196289,
            "network_sent_bytes": 156668620961,
            "network_recv_bytes": 14195441776,
            "timestamp": "2025-03-07T12:28:00"
        },
        {
            "cpu_temperature": 45.5167,
            "cpu_usage": 1.28,
            "ram_usage": 36.6,
            "system_load": 0.0703125,
            "network_sent_bytes": 156668649409,
            "network_recv_bytes": 14195470382,
            "timestamp": "2025-03-07T12:29:00"
        },
        {
            "cpu_temperature": 45.5633,
            "cpu_usage": 1.225,
            "ram_usage": 36.7,
            "system_load": 0.299805,
            "network_sent_bytes": 156668680909,
            "network_recv_bytes": 14195500589,
            "timestamp": "2025-03-07T12:30:00"
        },
        {
            "cpu_temperature": 45.3883,
            "cpu_usage": 1.08833,
            "ram_usage": 36.7,
            "system_load": 0.490234,
            "network_sent_bytes": 156668710262,
            "network_recv_bytes": 14195534042,
            "timestamp": "2025-03-07T12:31:00"
        },
        {
            "cpu_temperature": 45.425,
            "cpu_usage": 1.015,
            "ram_usage": 36.3,
            "system_load": 0.178711,
            "network_sent_bytes": 156668734772,
            "network_recv_bytes": 14195558112,
            "timestamp": "2025-03-07T12:32:00"
        },
        {
            "cpu_temperature": 45.25,
            "cpu_usage": 1.08333,
            "ram_usage": 36.7,
            "system_load": 0.258301,
            "network_sent_bytes": 156668761504,
            "network_recv_bytes": 14195584508,
            "timestamp": "2025-03-07T12:33:00"
        },
        {
            "cpu_temperature": 45.405,
            "cpu_usage": 1.02167,
            "ram_usage": 36.3,
            "system_load": 0.0932617,
            "network_sent_bytes": 156668789590,
            "network_recv_bytes": 14195613023,
            "timestamp": "2025-03-07T12:34:00"
        },
        {
            "cpu_temperature": 45.3133,
            "cpu_usage": 1.00667,
            "ram_usage": 36.7,
            "system_load": 0.237793,
            "network_sent_bytes": 156668816538,
            "network_recv_bytes": 14195644180,
            "timestamp": "2025-03-07T12:35:00"
        },
        {
            "cpu_temperature": 45.4283,
            "cpu_usage": 0.996667,
            "ram_usage": 36.3,
            "system_load": 0.172363,
            "network_sent_bytes": 156668845073,
            "network_recv_bytes": 14195672721,
            "timestamp": "2025-03-07T12:36:00"
        },
        {
            "cpu_temperature": 45.3967,
            "cpu_usage": 0.943333,
            "ram_usage": 36.6,
            "system_load": 0.119141,
            "network_sent_bytes": 156668870333,
            "network_recv_bytes": 14195697559,
            "timestamp": "2025-03-07T12:37:00"
        },
        {
            "cpu_temperature": 45.3833,
            "cpu_usage": 0.986667,
            "ram_usage": 36.3,
            "system_load": 0.250488,
            "network_sent_bytes": 156668900832,
            "network_recv_bytes": 14195723488,
            "timestamp": "2025-03-07T12:38:00"
        },
        {
            "cpu_temperature": 45.4017,
            "cpu_usage": 1.095,
            "ram_usage": 36.7,
            "system_load": 0.228027,
            "network_sent_bytes": 156668928180,
            "network_recv_bytes": 14195750830,
            "timestamp": "2025-03-07T12:39:00"
        },
        {
            "cpu_temperature": 45.2983,
            "cpu_usage": 1.17833,
            "ram_usage": 36.7,
            "system_load": 0.257324,
            "network_sent_bytes": 156668956534,
            "network_recv_bytes": 14195783465,
            "timestamp": "2025-03-07T12:40:00"
        },
        {
            "cpu_temperature": 45.2167,
            "cpu_usage": 1.095,
            "ram_usage": 36.7,
            "system_load": 0.287598,
            "network_sent_bytes": 156668982578,
            "network_recv_bytes": 14195809692,
            "timestamp": "2025-03-07T12:41:00"
        },
        {
            "cpu_temperature": 45.1,
            "cpu_usage": 1.02833,
            "ram_usage": 36.3,
            "system_load": 0.171875,
            "network_sent_bytes": 156669008908,
            "network_recv_bytes": 14195835049,
            "timestamp": "2025-03-07T12:42:00"
        },
        {
            "cpu_temperature": 45.26,
            "cpu_usage": 1.00333,
            "ram_usage": 36.7,
            "system_load": 0.204102,
            "network_sent_bytes": 156669037199,
            "network_recv_bytes": 14195862718,
            "timestamp": "2025-03-07T12:43:00"
        },
        {
            "cpu_temperature": 45.1033,
            "cpu_usage": 1.125,
            "ram_usage": 36.3,
            "system_load": 0.159668,
            "network_sent_bytes": 156669064666,
            "network_recv_bytes": 14195890401,
            "timestamp": "2025-03-07T12:44:00"
        },
        {
            "cpu_temperature": 45.145,
            "cpu_usage": 1.11333,
            "ram_usage": 36.8,
            "system_load": 0.336914,
            "network_sent_bytes": 156669116303,
            "network_recv_bytes": 14195946298,
            "timestamp": "2025-03-07T12:45:00"
        },
        {
            "cpu_temperature": 45.045,
            "cpu_usage": 1.21333,
            "ram_usage": 36.7,
            "system_load": 0.459473,
            "network_sent_bytes": 156669141004,
            "network_recv_bytes": 14195971197,
            "timestamp": "2025-03-07T12:46:00"
        },
        {
            "cpu_temperature": 45.1883,
            "cpu_usage": 1.13,
            "ram_usage": 36.7,
            "system_load": 0.347656,
            "network_sent_bytes": 156669164228,
            "network_recv_bytes": 14195994039,
            "timestamp": "2025-03-07T12:47:00"
        },
        {
            "cpu_temperature": 45.1283,
            "cpu_usage": 1.18667,
            "ram_usage": 36.6,
            "system_load": 0.160645,
            "network_sent_bytes": 156669195629,
            "network_recv_bytes": 14196024987,
            "timestamp": "2025-03-07T12:48:00"
        },
        {
            "cpu_temperature": 45.1233,
            "cpu_usage": 1.07667,
            "ram_usage": 36.2,
            "system_load": 0.251953,
            "network_sent_bytes": 156669224096,
            "network_recv_bytes": 14196053612,
            "timestamp": "2025-03-07T12:49:00"
        },
        {
            "cpu_temperature": 45.22,
            "cpu_usage": 1.02167,
            "ram_usage": 36.7,
            "system_load": 0.131836,
            "network_sent_bytes": 156669256997,
            "network_recv_bytes": 14196086680,
            "timestamp": "2025-03-07T12:50:00"
        },
        {
            "cpu_temperature": 45.2467,
            "cpu_usage": 0.931667,
            "ram_usage": 36.3,
            "system_load": 0.189941,
            "network_sent_bytes": 156669281389,
            "network_recv_bytes": 14196110576,
            "timestamp": "2025-03-07T12:51:00"
        },
        {
            "cpu_temperature": 45.0967,
            "cpu_usage": 1.09167,
            "ram_usage": 36.7,
            "system_load": 0.154297,
            "network_sent_bytes": 156669309834,
            "network_recv_bytes": 14196138386,
            "timestamp": "2025-03-07T12:52:00"
        },
        {
            "cpu_temperature": 45.05,
            "cpu_usage": 0.991667,
            "ram_usage": 36.3,
            "system_load": 0.0551758,
            "network_sent_bytes": 156669332156,
            "network_recv_bytes": 14196160340,
            "timestamp": "2025-03-07T12:53:00"
        },
        {
            "cpu_temperature": 44.8967,
            "cpu_usage": 1.08667,
            "ram_usage": 36.7,
            "system_load": 0.244141,
            "network_sent_bytes": 156669363333,
            "network_recv_bytes": 14196190942,
            "timestamp": "2025-03-07T12:54:00"
        },
        {
            "cpu_temperature": 44.9,
            "cpu_usage": 1.04,
            "ram_usage": 36.3,
            "system_load": 0.157227,
            "network_sent_bytes": 156669394970,
            "network_recv_bytes": 14196221851,
            "timestamp": "2025-03-07T12:55:00"
        },
        {
            "cpu_temperature": 45.0183,
            "cpu_usage": 1.11167,
            "ram_usage": 36.6,
            "system_load": 0.0561523,
            "network_sent_bytes": 156669422217,
            "network_recv_bytes": 14196253907,
            "timestamp": "2025-03-07T12:56:00"
        },
        {
            "cpu_temperature": 45.0133,
            "cpu_usage": 1.08833,
            "ram_usage": 36.6,
            "system_load": 0.213379,
            "network_sent_bytes": 156669445804,
            "network_recv_bytes": 14196276954,
            "timestamp": "2025-03-07T12:57:00"
        },
        {
            "cpu_temperature": 45.0633,
            "cpu_usage": 1.13167,
            "ram_usage": 36.7,
            "system_load": 0.13916,
            "network_sent_bytes": 156669471352,
            "network_recv_bytes": 14196302309,
            "timestamp": "2025-03-07T12:58:00"
        },
        {
            "cpu_temperature": 45.0567,
            "cpu_usage": 1.13167,
            "ram_usage": 36.6,
            "system_load": 0.282227,
            "network_sent_bytes": 156669498905,
            "network_recv_bytes": 14196330086,
            "timestamp": "2025-03-07T12:59:00"
        },
        {
            "cpu_temperature": 45.13,
            "cpu_usage": 1.84167,
            "ram_usage": 36.7,
            "system_load": 0.307129,
            "network_sent_bytes": 156669637999,
            "network_recv_bytes": 14196469578,
            "timestamp": "2025-03-07T13:00:00"
        },
        {
            "cpu_temperature": 45.7283,
            "cpu_usage": 5.525,
            "ram_usage": 36.4,
            "system_load": 0.382324,
            "network_sent_bytes": 156674444744,
            "network_recv_bytes": 14204957051,
            "timestamp": "2025-03-07T13:01:00"
        },
        {
            "cpu_temperature": 46.5533,
            "cpu_usage": 4.88333,
            "ram_usage": 36.4,
            "system_load": 0.31543,
            "network_sent_bytes": 156675742051,
            "network_recv_bytes": 14206805519,
            "timestamp": "2025-03-07T13:02:00"
        },
        {
            "cpu_temperature": 45.455,
            "cpu_usage": 1.10833,
            "ram_usage": 36.4,
            "system_load": 0.148926,
            "network_sent_bytes": 156675777724,
            "network_recv_bytes": 14206840910,
            "timestamp": "2025-03-07T13:03:00"
        },
        {
            "cpu_temperature": 45.4833,
            "cpu_usage": 1.19333,
            "ram_usage": 36.2,
            "system_load": 0.0527344,
            "network_sent_bytes": 156675805262,
            "network_recv_bytes": 14206868694,
            "timestamp": "2025-03-07T13:04:00"
        },
        {
            "cpu_temperature": 45.4283,
            "cpu_usage": 1.18833,
            "ram_usage": 36.4,
            "system_load": 0.260742,
            "network_sent_bytes": 156675830165,
            "network_recv_bytes": 14206901149,
            "timestamp": "2025-03-07T13:05:00"
        },
        {
            "cpu_temperature": 45.1333,
            "cpu_usage": 1.16333,
            "ram_usage": 36.3,
            "system_load": 0.206543,
            "network_sent_bytes": 156675854758,
            "network_recv_bytes": 14206937524,
            "timestamp": "2025-03-07T13:06:00"
        },
        {
            "cpu_temperature": 45.3233,
            "cpu_usage": 1.16333,
            "ram_usage": 36.3,
            "system_load": 0.27002,
            "network_sent_bytes": 156675876889,
            "network_recv_bytes": 14206959127,
            "timestamp": "2025-03-07T13:07:00"
        },
        {
            "cpu_temperature": 45.3067,
            "cpu_usage": 1.05,
            "ram_usage": 35.9,
            "system_load": 0.184082,
            "network_sent_bytes": 156675902025,
            "network_recv_bytes": 14206983887,
            "timestamp": "2025-03-07T13:08:00"
        },
        {
            "cpu_temperature": 45.4517,
            "cpu_usage": 1.22167,
            "ram_usage": 36.3,
            "system_load": 0.178711,
            "network_sent_bytes": 156675930844,
            "network_recv_bytes": 14207012664,
            "timestamp": "2025-03-07T13:09:00"
        },
        {
            "cpu_temperature": 45.365,
            "cpu_usage": 0.99,
            "ram_usage": 35.9,
            "system_load": 0.240723,
            "network_sent_bytes": 156675960623,
            "network_recv_bytes": 14207041944,
            "timestamp": "2025-03-07T13:10:00"
        },
        {
            "cpu_temperature": 45.3983,
            "cpu_usage": 1.04667,
            "ram_usage": 36.3,
            "system_load": 0.121582,
            "network_sent_bytes": 156675987205,
            "network_recv_bytes": 14207072824,
            "timestamp": "2025-03-07T13:11:00"
        },
        {
            "cpu_temperature": 45.0883,
            "cpu_usage": 1.32167,
            "ram_usage": 36.3,
            "system_load": 0.0429688,
            "network_sent_bytes": 156676014159,
            "network_recv_bytes": 14207099352,
            "timestamp": "2025-03-07T13:12:00"
        },
        {
            "cpu_temperature": 45.2633,
            "cpu_usage": 1.15833,
            "ram_usage": 36.3,
            "system_load": 0.246582,
            "network_sent_bytes": 156676037986,
            "network_recv_bytes": 14207122644,
            "timestamp": "2025-03-07T13:13:00"
        },
        {
            "cpu_temperature": 45.2283,
            "cpu_usage": 1.28,
            "ram_usage": 36.2,
            "system_load": 0.0883789,
            "network_sent_bytes": 156676068250,
            "network_recv_bytes": 14207148902,
            "timestamp": "2025-03-07T13:14:00"
        },
        {
            "cpu_temperature": 45.1883,
            "cpu_usage": 1.26167,
            "ram_usage": 36.3,
            "system_load": 0.17334,
            "network_sent_bytes": 156676093373,
            "network_recv_bytes": 14207173746,
            "timestamp": "2025-03-07T13:15:00"
        },
        {
            "cpu_temperature": 45.215,
            "cpu_usage": 1.16667,
            "ram_usage": 36.3,
            "system_load": 0.277344,
            "network_sent_bytes": 156676120683,
            "network_recv_bytes": 14207205671,
            "timestamp": "2025-03-07T13:16:00"
        },
        {
            "cpu_temperature": 45.2383,
            "cpu_usage": 1.13667,
            "ram_usage": 36.2,
            "system_load": 0.0996094,
            "network_sent_bytes": 156676145266,
            "network_recv_bytes": 14207229850,
            "timestamp": "2025-03-07T13:17:00"
        },
        {
            "cpu_temperature": 45.28,
            "cpu_usage": 1.21833,
            "ram_usage": 36.2,
            "system_load": 0.29248,
            "network_sent_bytes": 156676183610,
            "network_recv_bytes": 14207267356,
            "timestamp": "2025-03-07T13:18:00"
        },
        {
            "cpu_temperature": 45.3933,
            "cpu_usage": 1.15333,
            "ram_usage": 36.2,
            "system_load": 0.220703,
            "network_sent_bytes": 156676216774,
            "network_recv_bytes": 14207300526,
            "timestamp": "2025-03-07T13:19:00"
        },
        {
            "cpu_temperature": 45.2917,
            "cpu_usage": 1.18833,
            "ram_usage": 36.3,
            "system_load": 0.0791016,
            "network_sent_bytes": 156676242224,
            "network_recv_bytes": 14207325274,
            "timestamp": "2025-03-07T13:20:00"
        },
        {
            "cpu_temperature": 45.3317,
            "cpu_usage": 1.06,
            "ram_usage": 36,
            "system_load": 0.32373,
            "network_sent_bytes": 156676271320,
            "network_recv_bytes": 14207358925,
            "timestamp": "2025-03-07T13:21:00"
        },
        {
            "cpu_temperature": 45.4567,
            "cpu_usage": 1.05,
            "ram_usage": 36.3,
            "system_load": 0.221191,
            "network_sent_bytes": 156676293528,
            "network_recv_bytes": 14207380890,
            "timestamp": "2025-03-07T13:22:00"
        },
        {
            "cpu_temperature": 45.3083,
            "cpu_usage": 0.995,
            "ram_usage": 36,
            "system_load": 0.154297,
            "network_sent_bytes": 156676320372,
            "network_recv_bytes": 14207407166,
            "timestamp": "2025-03-07T13:23:00"
        },
        {
            "cpu_temperature": 45.3683,
            "cpu_usage": 1.17167,
            "ram_usage": 36.3,
            "system_load": 0.303223,
            "network_sent_bytes": 156676345889,
            "network_recv_bytes": 14207432901,
            "timestamp": "2025-03-07T13:24:00"
        },
        {
            "cpu_temperature": 45.3283,
            "cpu_usage": 1.15833,
            "ram_usage": 36.1,
            "system_load": 0.119141,
            "network_sent_bytes": 156676390992,
            "network_recv_bytes": 14207476971,
            "timestamp": "2025-03-07T13:25:00"
        },
        {
            "cpu_temperature": 45.495,
            "cpu_usage": 1.095,
            "ram_usage": 36.3,
            "system_load": 0.35498,
            "network_sent_bytes": 156676421969,
            "network_recv_bytes": 14207508081,
            "timestamp": "2025-03-07T13:26:00"
        },
        {
            "cpu_temperature": 45.3017,
            "cpu_usage": 1.14333,
            "ram_usage": 36.3,
            "system_load": 0.32373,
            "network_sent_bytes": 156676443992,
            "network_recv_bytes": 14207529528,
            "timestamp": "2025-03-07T13:27:00"
        },
        {
            "cpu_temperature": 45.3133,
            "cpu_usage": 1.175,
            "ram_usage": 36.3,
            "system_load": 0.198242,
            "network_sent_bytes": 156676473304,
            "network_recv_bytes": 14207558428,
            "timestamp": "2025-03-07T13:28:00"
        },
        {
            "cpu_temperature": 45.24,
            "cpu_usage": 1.25,
            "ram_usage": 36.2,
            "system_load": 0.265625,
            "network_sent_bytes": 156676501204,
            "network_recv_bytes": 14207586602,
            "timestamp": "2025-03-07T13:29:00"
        },
        {
            "cpu_temperature": 45.2817,
            "cpu_usage": 1.245,
            "ram_usage": 36.2,
            "system_load": 0.103516,
            "network_sent_bytes": 156676531925,
            "network_recv_bytes": 14207615996,
            "timestamp": "2025-03-07T13:30:00"
        },
        {
            "cpu_temperature": 45.2767,
            "cpu_usage": 1.23667,
            "ram_usage": 36.3,
            "system_load": 0.303711,
            "network_sent_bytes": 156676563840,
            "network_recv_bytes": 14207650269,
            "timestamp": "2025-03-07T13:31:00"
        },
        {
            "cpu_temperature": 45.2817,
            "cpu_usage": 1.11167,
            "ram_usage": 36.2,
            "system_load": 0.276855,
            "network_sent_bytes": 156676587062,
            "network_recv_bytes": 14207673109,
            "timestamp": "2025-03-07T13:32:00"
        },
        {
            "cpu_temperature": 45.3217,
            "cpu_usage": 1.20667,
            "ram_usage": 36.2,
            "system_load": 0.108398,
            "network_sent_bytes": 156676613288,
            "network_recv_bytes": 14207698721,
            "timestamp": "2025-03-07T13:33:00"
        },
        {
            "cpu_temperature": 45.3833,
            "cpu_usage": 1.27,
            "ram_usage": 36.3,
            "system_load": 0.293457,
            "network_sent_bytes": 156676639909,
            "network_recv_bytes": 14207725812,
            "timestamp": "2025-03-07T13:34:00"
        },
        {
            "cpu_temperature": 45.405,
            "cpu_usage": 1.17667,
            "ram_usage": 36.2,
            "system_load": 0.208008,
            "network_sent_bytes": 156676665716,
            "network_recv_bytes": 14207750709,
            "timestamp": "2025-03-07T13:35:00"
        },
        {
            "cpu_temperature": 45.43,
            "cpu_usage": 1.185,
            "ram_usage": 36.3,
            "system_load": 0.23877,
            "network_sent_bytes": 156676690722,
            "network_recv_bytes": 14207781058,
            "timestamp": "2025-03-07T13:36:00"
        },
        {
            "cpu_temperature": 45.3233,
            "cpu_usage": 1.13,
            "ram_usage": 36.2,
            "system_load": 0.533203,
            "network_sent_bytes": 156676716147,
            "network_recv_bytes": 14207806071,
            "timestamp": "2025-03-07T13:37:00"
        },
        {
            "cpu_temperature": 45.3117,
            "cpu_usage": 1.14,
            "ram_usage": 36.3,
            "system_load": 0.298828,
            "network_sent_bytes": 156676745599,
            "network_recv_bytes": 14207830865,
            "timestamp": "2025-03-07T13:38:00"
        },
        {
            "cpu_temperature": 45.31,
            "cpu_usage": 1.325,
            "ram_usage": 36.3,
            "system_load": 0.233398,
            "network_sent_bytes": 156676779631,
            "network_recv_bytes": 14207864839,
            "timestamp": "2025-03-07T13:39:00"
        },
        {
            "cpu_temperature": 45.1233,
            "cpu_usage": 1.16,
            "ram_usage": 36.3,
            "system_load": 0.294922,
            "network_sent_bytes": 156676803111,
            "network_recv_bytes": 14207888086,
            "timestamp": "2025-03-07T13:40:00"
        },
        {
            "cpu_temperature": 45.2817,
            "cpu_usage": 1.19167,
            "ram_usage": 36.3,
            "system_load": 0.278809,
            "network_sent_bytes": 156676829832,
            "network_recv_bytes": 14207917967,
            "timestamp": "2025-03-07T13:41:00"
        },
        {
            "cpu_temperature": 45.34,
            "cpu_usage": 1.095,
            "ram_usage": 36.3,
            "system_load": 0.341309,
            "network_sent_bytes": 156676858438,
            "network_recv_bytes": 14207945514,
            "timestamp": "2025-03-07T13:42:00"
        },
        {
            "cpu_temperature": 45.2967,
            "cpu_usage": 1.135,
            "ram_usage": 36.3,
            "system_load": 0.296875,
            "network_sent_bytes": 156676880557,
            "network_recv_bytes": 14207967177,
            "timestamp": "2025-03-07T13:43:00"
        },
        {
            "cpu_temperature": 45.2717,
            "cpu_usage": 1.30333,
            "ram_usage": 36.2,
            "system_load": 0.14502,
            "network_sent_bytes": 156676906344,
            "network_recv_bytes": 14207993164,
            "timestamp": "2025-03-07T13:44:00"
        },
        {
            "cpu_temperature": 45.225,
            "cpu_usage": 1.29,
            "ram_usage": 36.4,
            "system_load": 0.336914,
            "network_sent_bytes": 156676961976,
            "network_recv_bytes": 14208054031,
            "timestamp": "2025-03-07T13:45:00"
        },
        {
            "cpu_temperature": 45.2067,
            "cpu_usage": 1.14833,
            "ram_usage": 36.1,
            "system_load": 0.159668,
            "network_sent_bytes": 156676992768,
            "network_recv_bytes": 14208091157,
            "timestamp": "2025-03-07T13:46:00"
        },
        {
            "cpu_temperature": 45.1867,
            "cpu_usage": 1.15833,
            "ram_usage": 36.3,
            "system_load": 0.124023,
            "network_sent_bytes": 156677016428,
            "network_recv_bytes": 14208115921,
            "timestamp": "2025-03-07T13:47:00"
        },
        {
            "cpu_temperature": 45.2833,
            "cpu_usage": 1.15167,
            "ram_usage": 36.1,
            "system_load": 0.169922,
            "network_sent_bytes": 156677054260,
            "network_recv_bytes": 14208154214,
            "timestamp": "2025-03-07T13:48:00"
        },
        {
            "cpu_temperature": 45.3917,
            "cpu_usage": 1.21667,
            "ram_usage": 36.3,
            "system_load": 0.0610352,
            "network_sent_bytes": 156677086056,
            "network_recv_bytes": 14208187640,
            "timestamp": "2025-03-07T13:49:00"
        },
        {
            "cpu_temperature": 45.3917,
            "cpu_usage": 1.22,
            "ram_usage": 36.1,
            "system_load": 0.212402,
            "network_sent_bytes": 156677120405,
            "network_recv_bytes": 14208220652,
            "timestamp": "2025-03-07T13:50:00"
        },
        {
            "cpu_temperature": 45.4483,
            "cpu_usage": 1.09667,
            "ram_usage": 36.3,
            "system_load": 0.290039,
            "network_sent_bytes": 156677150479,
            "network_recv_bytes": 14208254093,
            "timestamp": "2025-03-07T13:51:00"
        },
        {
            "cpu_temperature": 45.33,
            "cpu_usage": 1.13,
            "ram_usage": 36.1,
            "system_load": 0.13916,
            "network_sent_bytes": 156677174746,
            "network_recv_bytes": 14208277962,
            "timestamp": "2025-03-07T13:52:00"
        },
        {
            "cpu_temperature": 45.37,
            "cpu_usage": 1.03167,
            "ram_usage": 36.3,
            "system_load": 0.402832,
            "network_sent_bytes": 156677201609,
            "network_recv_bytes": 14208304359,
            "timestamp": "2025-03-07T13:53:00"
        },
        {
            "cpu_temperature": 45.38,
            "cpu_usage": 1.17667,
            "ram_usage": 36.2,
            "system_load": 0.145996,
            "network_sent_bytes": 156677229709,
            "network_recv_bytes": 14208331988,
            "timestamp": "2025-03-07T13:54:00"
        },
        {
            "cpu_temperature": 45.3917,
            "cpu_usage": 1.115,
            "ram_usage": 36.3,
            "system_load": 0.119629,
            "network_sent_bytes": 156677260591,
            "network_recv_bytes": 14208362084,
            "timestamp": "2025-03-07T13:55:00"
        },
        {
            "cpu_temperature": 45.3917,
            "cpu_usage": 1.275,
            "ram_usage": 36.2,
            "system_load": 0.221191,
            "network_sent_bytes": 156677286896,
            "network_recv_bytes": 14208394105,
            "timestamp": "2025-03-07T13:56:00"
        },
        {
            "cpu_temperature": 45.7317,
            "cpu_usage": 1.62167,
            "ram_usage": 36.3,
            "system_load": 0.128418,
            "network_sent_bytes": 156678598509,
            "network_recv_bytes": 14209123776,
            "timestamp": "2025-03-07T13:57:00"
        },
        {
            "cpu_temperature": 45.4983,
            "cpu_usage": 1.145,
            "ram_usage": 36.3,
            "system_load": 0.237305,
            "network_sent_bytes": 156678624101,
            "network_recv_bytes": 14209149081,
            "timestamp": "2025-03-07T13:58:00"
        },
        {
            "cpu_temperature": 45.485,
            "cpu_usage": 1.17667,
            "ram_usage": 36.4,
            "system_load": 0.161133,
            "network_sent_bytes": 156678652732,
            "network_recv_bytes": 14209177850,
            "timestamp": "2025-03-07T13:59:00"
        },
        {
            "cpu_temperature": 45.4233,
            "cpu_usage": 1.26833,
            "ram_usage": 36.2,
            "system_load": 0.0566406,
            "network_sent_bytes": 156678687992,
            "network_recv_bytes": 14209212092,
            "timestamp": "2025-03-07T14:00:00"
        },
        {
            "cpu_temperature": 45.575,
            "cpu_usage": 1.30833,
            "ram_usage": 36.3,
            "system_load": 0.22998,
            "network_sent_bytes": 156678742190,
            "network_recv_bytes": 14209270277,
            "timestamp": "2025-03-07T14:01:00"
        },
        {
            "cpu_temperature": 45.4833,
            "cpu_usage": 1.12333,
            "ram_usage": 36.3,
            "system_load": 0.0830078,
            "network_sent_bytes": 156678768173,
            "network_recv_bytes": 14209295790,
            "timestamp": "2025-03-07T14:02:00"
        },
        {
            "cpu_temperature": 45.4867,
            "cpu_usage": 1.03833,
            "ram_usage": 36.3,
            "system_load": 0.0966797,
            "network_sent_bytes": 156678800919,
            "network_recv_bytes": 14209324022,
            "timestamp": "2025-03-07T14:03:00"
        },
        {
            "cpu_temperature": 45.3633,
            "cpu_usage": 1.185,
            "ram_usage": 36.3,
            "system_load": 0.360352,
            "network_sent_bytes": 156678828921,
            "network_recv_bytes": 14209352252,
            "timestamp": "2025-03-07T14:04:00"
        },
        {
            "cpu_temperature": 45.2117,
            "cpu_usage": 1.21833,
            "ram_usage": 36.3,
            "system_load": 0.130371,
            "network_sent_bytes": 156678855495,
            "network_recv_bytes": 14209386249,
            "timestamp": "2025-03-07T14:05:00"
        },
        {
            "cpu_temperature": 45.14,
            "cpu_usage": 1.16333,
            "ram_usage": 36.3,
            "system_load": 0.291016,
            "network_sent_bytes": 156678887854,
            "network_recv_bytes": 14209431426,
            "timestamp": "2025-03-07T14:06:00"
        },
        {
            "cpu_temperature": 45.1967,
            "cpu_usage": 1.08167,
            "ram_usage": 36.3,
            "system_load": 0.143555,
            "network_sent_bytes": 156678911368,
            "network_recv_bytes": 14209454242,
            "timestamp": "2025-03-07T14:07:00"
        },
        {
            "cpu_temperature": 45.1517,
            "cpu_usage": 0.941667,
            "ram_usage": 35.9,
            "system_load": 0.0507812,
            "network_sent_bytes": 156678936695,
            "network_recv_bytes": 14209479399,
            "timestamp": "2025-03-07T14:08:00"
        },
        {
            "cpu_temperature": 45.26,
            "cpu_usage": 1.095,
            "ram_usage": 36.3,
            "system_load": 0.277344,
            "network_sent_bytes": 156678966944,
            "network_recv_bytes": 14209509832,
            "timestamp": "2025-03-07T14:09:00"
        },
        {
            "cpu_temperature": 45.2083,
            "cpu_usage": 1.15833,
            "ram_usage": 35.9,
            "system_load": 0.303223,
            "network_sent_bytes": 156678997303,
            "network_recv_bytes": 14209540114,
            "timestamp": "2025-03-07T14:10:00"
        },
        {
            "cpu_temperature": 45.1533,
            "cpu_usage": 1.01833,
            "ram_usage": 36.3,
            "system_load": 0.177734,
            "network_sent_bytes": 156679028608,
            "network_recv_bytes": 14209575857,
            "timestamp": "2025-03-07T14:11:00"
        },
        {
            "cpu_temperature": 45.19,
            "cpu_usage": 1.23667,
            "ram_usage": 36.2,
            "system_load": 0.19043,
            "network_sent_bytes": 156679052903,
            "network_recv_bytes": 14209599612,
            "timestamp": "2025-03-07T14:12:00"
        },
        {
            "cpu_temperature": 45.195,
            "cpu_usage": 1.15,
            "ram_usage": 36.2,
            "system_load": 0.0673828,
            "network_sent_bytes": 156679077213,
            "network_recv_bytes": 14209623324,
            "timestamp": "2025-03-07T14:13:00"
        },
        {
            "cpu_temperature": 45.1917,
            "cpu_usage": 1.22667,
            "ram_usage": 36.3,
            "system_load": 0.276855,
            "network_sent_bytes": 156679106452,
            "network_recv_bytes": 14209652871,
            "timestamp": "2025-03-07T14:14:00"
        },
        {
            "cpu_temperature": 45.1167,
            "cpu_usage": 1.19167,
            "ram_usage": 36.3,
            "system_load": 0.138184,
            "network_sent_bytes": 156679141382,
            "network_recv_bytes": 14209683448,
            "timestamp": "2025-03-07T14:15:00"
        },
        {
            "cpu_temperature": 45.0983,
            "cpu_usage": 1.2,
            "ram_usage": 36.3,
            "system_load": 0.0488281,
            "network_sent_bytes": 156679170958,
            "network_recv_bytes": 14209717122,
            "timestamp": "2025-03-07T14:16:00"
        },
        {
            "cpu_temperature": 45.1817,
            "cpu_usage": 0.981667,
            "ram_usage": 35.9,
            "system_load": 0.333008,
            "network_sent_bytes": 156679194806,
            "network_recv_bytes": 14209740374,
            "timestamp": "2025-03-07T14:17:00"
        },
        {
            "cpu_temperature": 45.18,
            "cpu_usage": 0.998333,
            "ram_usage": 36.3,
            "system_load": 0.120605,
            "network_sent_bytes": 156679231953,
            "network_recv_bytes": 14209776731,
            "timestamp": "2025-03-07T14:18:00"
        },
        {
            "cpu_temperature": 45.175,
            "cpu_usage": 1.03667,
            "ram_usage": 35.8,
            "system_load": 0.11084,
            "network_sent_bytes": 156679262740,
            "network_recv_bytes": 14209807424,
            "timestamp": "2025-03-07T14:19:00"
        },
        {
            "cpu_temperature": 45.1117,
            "cpu_usage": 1.07167,
            "ram_usage": 36.3,
            "system_load": 0.165039,
            "network_sent_bytes": 156679291385,
            "network_recv_bytes": 14209841215,
            "timestamp": "2025-03-07T14:20:00"
        },
        {
            "cpu_temperature": 45.155,
            "cpu_usage": 1.00167,
            "ram_usage": 35.9,
            "system_load": 0.059082,
            "network_sent_bytes": 156679320357,
            "network_recv_bytes": 14209868673,
            "timestamp": "2025-03-07T14:21:00"
        },
        {
            "cpu_temperature": 45.155,
            "cpu_usage": 1.06333,
            "ram_usage": 36.2,
            "system_load": 0.212402,
            "network_sent_bytes": 156679351253,
            "network_recv_bytes": 14209899350,
            "timestamp": "2025-03-07T14:22:00"
        },
        {
            "cpu_temperature": 45.1,
            "cpu_usage": 1.015,
            "ram_usage": 35.9,
            "system_load": 0.184082,
            "network_sent_bytes": 156679378496,
            "network_recv_bytes": 14209926049,
            "timestamp": "2025-03-07T14:23:00"
        },
        {
            "cpu_temperature": 45.3333,
            "cpu_usage": 1.07333,
            "ram_usage": 36.1,
            "system_load": 0.065918,
            "network_sent_bytes": 156679410756,
            "network_recv_bytes": 14209958619,
            "timestamp": "2025-03-07T14:24:00"
        },
        {
            "cpu_temperature": 45.1417,
            "cpu_usage": 0.975,
            "ram_usage": 36,
            "system_load": 0.234375,
            "network_sent_bytes": 156679437145,
            "network_recv_bytes": 14209984683,
            "timestamp": "2025-03-07T14:25:00"
        },
        {
            "cpu_temperature": 45.0667,
            "cpu_usage": 1.12167,
            "ram_usage": 36.2,
            "system_load": 0.0839844,
            "network_sent_bytes": 156679465684,
            "network_recv_bytes": 14210017073,
            "timestamp": "2025-03-07T14:26:00"
        },
        {
            "cpu_temperature": 45.09,
            "cpu_usage": 1.07833,
            "ram_usage": 36.3,
            "system_load": 0.255859,
            "network_sent_bytes": 156679491926,
            "network_recv_bytes": 14210038875,
            "timestamp": "2025-03-07T14:27:00"
        },
        {
            "cpu_temperature": 45.0367,
            "cpu_usage": 1.21167,
            "ram_usage": 36.3,
            "system_load": 0.334473,
            "network_sent_bytes": 156679522486,
            "network_recv_bytes": 14210068713,
            "timestamp": "2025-03-07T14:28:00"
        },
        {
            "cpu_temperature": 45.035,
            "cpu_usage": 1.17333,
            "ram_usage": 36.3,
            "system_load": 0.281738,
            "network_sent_bytes": 156679549455,
            "network_recv_bytes": 14210095854,
            "timestamp": "2025-03-07T14:29:00"
        },
        {
            "cpu_temperature": 45.2433,
            "cpu_usage": 1.215,
            "ram_usage": 36.3,
            "system_load": 0.453613,
            "network_sent_bytes": 156679575995,
            "network_recv_bytes": 14210120911,
            "timestamp": "2025-03-07T14:30:00"
        },
        {
            "cpu_temperature": 45.25,
            "cpu_usage": 1.14333,
            "ram_usage": 36.3,
            "system_load": 0.283203,
            "network_sent_bytes": 156679606902,
            "network_recv_bytes": 14210156388,
            "timestamp": "2025-03-07T14:31:00"
        },
        {
            "cpu_temperature": 45.225,
            "cpu_usage": 1.225,
            "ram_usage": 36.3,
            "system_load": 0.17627,
            "network_sent_bytes": 156679634257,
            "network_recv_bytes": 14210183115,
            "timestamp": "2025-03-07T14:32:00"
        },
        {
            "cpu_temperature": 45.2133,
            "cpu_usage": 1.11167,
            "ram_usage": 36.3,
            "system_load": 0.348633,
            "network_sent_bytes": 156679667974,
            "network_recv_bytes": 14210216344,
            "timestamp": "2025-03-07T14:33:00"
        },
        {
            "cpu_temperature": 45.39,
            "cpu_usage": 1.21333,
            "ram_usage": 36.3,
            "system_load": 0.170898,
            "network_sent_bytes": 156679695523,
            "network_recv_bytes": 14210244662,
            "timestamp": "2025-03-07T14:34:00"
        },
        {
            "cpu_temperature": 45.2867,
            "cpu_usage": 1.14833,
            "ram_usage": 36.3,
            "system_load": 0.161621,
            "network_sent_bytes": 156679727236,
            "network_recv_bytes": 14210275555,
            "timestamp": "2025-03-07T14:35:00"
        },
        {
            "cpu_temperature": 45.2817,
            "cpu_usage": 1.21333,
            "ram_usage": 36.3,
            "system_load": 0.18457,
            "network_sent_bytes": 156679757204,
            "network_recv_bytes": 14210310993,
            "timestamp": "2025-03-07T14:36:00"
        },
        {
            "cpu_temperature": 45.25,
            "cpu_usage": 1.10333,
            "ram_usage": 36.3,
            "system_load": 0.065918,
            "network_sent_bytes": 156679784066,
            "network_recv_bytes": 14210337423,
            "timestamp": "2025-03-07T14:37:00"
        },
        {
            "cpu_temperature": 45.2683,
            "cpu_usage": 1.21667,
            "ram_usage": 36.3,
            "system_load": 0.214355,
            "network_sent_bytes": 156679809364,
            "network_recv_bytes": 14210362261,
            "timestamp": "2025-03-07T14:38:00"
        },
        {
            "cpu_temperature": 45.31,
            "cpu_usage": 1.19333,
            "ram_usage": 36.4,
            "system_load": 0.114258,
            "network_sent_bytes": 156679844666,
            "network_recv_bytes": 14210393589,
            "timestamp": "2025-03-07T14:39:00"
        },
        {
            "cpu_temperature": 45.385,
            "cpu_usage": 1.31833,
            "ram_usage": 36.2,
            "system_load": 0.0395508,
            "network_sent_bytes": 156679873075,
            "network_recv_bytes": 14210420918,
            "timestamp": "2025-03-07T14:40:00"
        },
        {
            "cpu_temperature": 45.5,
            "cpu_usage": 1.13,
            "ram_usage": 36.3,
            "system_load": 0.370117,
            "network_sent_bytes": 156679909682,
            "network_recv_bytes": 14210462688,
            "timestamp": "2025-03-07T14:41:00"
        },
        {
            "cpu_temperature": 45.3067,
            "cpu_usage": 1.19,
            "ram_usage": 36.2,
            "system_load": 0.134277,
            "network_sent_bytes": 156679945204,
            "network_recv_bytes": 14210497609,
            "timestamp": "2025-03-07T14:42:00"
        },
        {
            "cpu_temperature": 45.4717,
            "cpu_usage": 1.00667,
            "ram_usage": 35.8,
            "system_load": 0.172852,
            "network_sent_bytes": 156679976287,
            "network_recv_bytes": 14210537134,
            "timestamp": "2025-03-07T14:43:00"
        },
        {
            "cpu_temperature": 45.375,
            "cpu_usage": 1.11167,
            "ram_usage": 36.3,
            "system_load": 0.1875,
            "network_sent_bytes": 156680012446,
            "network_recv_bytes": 14210578639,
            "timestamp": "2025-03-07T14:44:00"
        },
        {
            "cpu_temperature": 45.2567,
            "cpu_usage": 1.02,
            "ram_usage": 35.9,
            "system_load": 0.125,
            "network_sent_bytes": 156680041185,
            "network_recv_bytes": 14210607296,
            "timestamp": "2025-03-07T14:45:00"
        },
        {
            "cpu_temperature": 45.495,
            "cpu_usage": 1.03167,
            "ram_usage": 36.3,
            "system_load": 0.293457,
            "network_sent_bytes": 156680074985,
            "network_recv_bytes": 14210646253,
            "timestamp": "2025-03-07T14:46:00"
        },
        {
            "cpu_temperature": 45.345,
            "cpu_usage": 1.13667,
            "ram_usage": 36.2,
            "system_load": 0.105957,
            "network_sent_bytes": 156680099293,
            "network_recv_bytes": 14210670171,
            "timestamp": "2025-03-07T14:47:00"
        },
        {
            "cpu_temperature": 45.3283,
            "cpu_usage": 1.15,
            "ram_usage": 36.2,
            "system_load": 0.0371094,
            "network_sent_bytes": 156680134055,
            "network_recv_bytes": 14210704918,
            "timestamp": "2025-03-07T14:48:00"
        },
        {
            "cpu_temperature": 45.4983,
            "cpu_usage": 1.07833,
            "ram_usage": 36.2,
            "system_load": 0.285645,
            "network_sent_bytes": 156680167858,
            "network_recv_bytes": 14210738809,
            "timestamp": "2025-03-07T14:49:00"
        },
        {
            "cpu_temperature": 45.3183,
            "cpu_usage": 1.045,
            "ram_usage": 36.3,
            "system_load": 0.466309,
            "network_sent_bytes": 156680197524,
            "network_recv_bytes": 14210766271,
            "timestamp": "2025-03-07T14:50:00"
        },
        {
            "cpu_temperature": 45.31,
            "cpu_usage": 1.07333,
            "ram_usage": 36.3,
            "system_load": 0.290527,
            "network_sent_bytes": 156680234992,
            "network_recv_bytes": 14210804144,
            "timestamp": "2025-03-07T14:51:00"
        },
        {
            "cpu_temperature": 45.43,
            "cpu_usage": 1.13,
            "ram_usage": 36.3,
            "system_load": 0.231445,
            "network_sent_bytes": 156680259597,
            "network_recv_bytes": 14210828385,
            "timestamp": "2025-03-07T14:52:00"
        },
        {
            "cpu_temperature": 45.47,
            "cpu_usage": 1.09,
            "ram_usage": 36.3,
            "system_load": 0.164062,
            "network_sent_bytes": 156680285760,
            "network_recv_bytes": 14210853918,
            "timestamp": "2025-03-07T14:53:00"
        },
        {
            "cpu_temperature": 45.485,
            "cpu_usage": 1.20833,
            "ram_usage": 36.3,
            "system_load": 0.250488,
            "network_sent_bytes": 156680318290,
            "network_recv_bytes": 14210885941,
            "timestamp": "2025-03-07T14:54:00"
        },
        {
            "cpu_temperature": 45.34,
            "cpu_usage": 1.11667,
            "ram_usage": 36.3,
            "system_load": 0.170898,
            "network_sent_bytes": 156680343529,
            "network_recv_bytes": 14210916213,
            "timestamp": "2025-03-07T14:55:00"
        },
        {
            "cpu_temperature": 45.2433,
            "cpu_usage": 1.19,
            "ram_usage": 36.3,
            "system_load": 0.179688,
            "network_sent_bytes": 156680368901,
            "network_recv_bytes": 14210941184,
            "timestamp": "2025-03-07T14:56:00"
        },
        {
            "cpu_temperature": 45.35,
            "cpu_usage": 0.953333,
            "ram_usage": 35.9,
            "system_load": 0.274902,
            "network_sent_bytes": 156680391104,
            "network_recv_bytes": 14210962933,
            "timestamp": "2025-03-07T14:57:00"
        },
        {
            "cpu_temperature": 45.3033,
            "cpu_usage": 0.975,
            "ram_usage": 36.2,
            "system_load": 0.179688,
            "network_sent_bytes": 156680420554,
            "network_recv_bytes": 14210992410,
            "timestamp": "2025-03-07T14:58:00"
        },
        {
            "cpu_temperature": 45.4217,
            "cpu_usage": 1.08167,
            "ram_usage": 35.9,
            "system_load": 0.195801,
            "network_sent_bytes": 156680447612,
            "network_recv_bytes": 14211019576,
            "timestamp": "2025-03-07T14:59:00"
        },
        {
            "cpu_temperature": 45.285,
            "cpu_usage": 1.42,
            "ram_usage": 36.2,
            "system_load": 0.356445,
            "network_sent_bytes": 156680500927,
            "network_recv_bytes": 14211071979,
            "timestamp": "2025-03-07T15:00:00"
        },
        {
            "cpu_temperature": 45.3217,
            "cpu_usage": 1.195,
            "ram_usage": 36.3,
            "system_load": 0.291992,
            "network_sent_bytes": 156680534735,
            "network_recv_bytes": 14211110477,
            "timestamp": "2025-03-07T15:01:00"
        },
        {
            "cpu_temperature": 45.3917,
            "cpu_usage": 1.23167,
            "ram_usage": 36.2,
            "system_load": 0.297363,
            "network_sent_bytes": 156680558731,
            "network_recv_bytes": 14211134175,
            "timestamp": "2025-03-07T15:02:00"
        },
        {
            "cpu_temperature": 45.2433,
            "cpu_usage": 1.205,
            "ram_usage": 36.2,
            "system_load": 0.288574,
            "network_sent_bytes": 156680595331,
            "network_recv_bytes": 14211166055,
            "timestamp": "2025-03-07T15:03:00"
        },
        {
            "cpu_temperature": 45.3417,
            "cpu_usage": 1.245,
            "ram_usage": 36.2,
            "system_load": 0.177734,
            "network_sent_bytes": 156680625875,
            "network_recv_bytes": 14211196769,
            "timestamp": "2025-03-07T15:04:00"
        },
        {
            "cpu_temperature": 45.485,
            "cpu_usage": 1.17,
            "ram_usage": 36.3,
            "system_load": 0.307129,
            "network_sent_bytes": 156680655893,
            "network_recv_bytes": 14211232819,
            "timestamp": "2025-03-07T15:05:00"
        },
        {
            "cpu_temperature": 45.4217,
            "cpu_usage": 1.09333,
            "ram_usage": 36.1,
            "system_load": 0.191895,
            "network_sent_bytes": 156680681154,
            "network_recv_bytes": 14211271326,
            "timestamp": "2025-03-07T15:06:00"
        },
        {
            "cpu_temperature": 45.2,
            "cpu_usage": 1.20833,
            "ram_usage": 36.2,
            "system_load": 0.19043,
            "network_sent_bytes": 156680703112,
            "network_recv_bytes": 14211292838,
            "timestamp": "2025-03-07T15:07:00"
        },
        {
            "cpu_temperature": 45.4167,
            "cpu_usage": 1.06667,
            "ram_usage": 36.2,
            "system_load": 0.154297,
            "network_sent_bytes": 156680734537,
            "network_recv_bytes": 14211324342,
            "timestamp": "2025-03-07T15:08:00"
        },
        {
            "cpu_temperature": 45.3017,
            "cpu_usage": 1.22833,
            "ram_usage": 36.3,
            "system_load": 0.0800781,
            "network_sent_bytes": 156680764129,
            "network_recv_bytes": 14211353950,
            "timestamp": "2025-03-07T15:09:00"
        },
        {
            "cpu_temperature": 45.3317,
            "cpu_usage": 1.16333,
            "ram_usage": 36.2,
            "system_load": 0.192383,
            "network_sent_bytes": 156680793494,
            "network_recv_bytes": 14211382970,
            "timestamp": "2025-03-07T15:10:00"
        },
        {
            "cpu_temperature": 45.43,
            "cpu_usage": 1.11667,
            "ram_usage": 36.3,
            "system_load": 0.12207,
            "network_sent_bytes": 156680817959,
            "network_recv_bytes": 14211412330,
            "timestamp": "2025-03-07T15:11:00"
        },
        {
            "cpu_temperature": 45.335,
            "cpu_usage": 1.16833,
            "ram_usage": 36.2,
            "system_load": 0.117188,
            "network_sent_bytes": 156680840047,
            "network_recv_bytes": 14211434052,
            "timestamp": "2025-03-07T15:12:00"
        },
        {
            "cpu_temperature": 45.2433,
            "cpu_usage": 1.16167,
            "ram_usage": 36.3,
            "system_load": 0.194336,
            "network_sent_bytes": 156680865176,
            "network_recv_bytes": 14211458583,
            "timestamp": "2025-03-07T15:13:00"
        },
        {
            "cpu_temperature": 45.2983,
            "cpu_usage": 1.11,
            "ram_usage": 36.3,
            "system_load": 0.0698242,
            "network_sent_bytes": 156680894755,
            "network_recv_bytes": 14211488612,
            "timestamp": "2025-03-07T15:14:00"
        },
        {
            "cpu_temperature": 45.1867,
            "cpu_usage": 1.2,
            "ram_usage": 36.2,
            "system_load": 0.674316,
            "network_sent_bytes": 156680930001,
            "network_recv_bytes": 14211518832,
            "timestamp": "2025-03-07T15:15:00"
        },
        {
            "cpu_temperature": 45.4233,
            "cpu_usage": 1.11,
            "ram_usage": 35.9,
            "system_load": 0.42627,
            "network_sent_bytes": 156680956135,
            "network_recv_bytes": 14211550407,
            "timestamp": "2025-03-07T15:16:00"
        },
        {
            "cpu_temperature": 45.4483,
            "cpu_usage": 1.01667,
            "ram_usage": 36.2,
            "system_load": 0.201172,
            "network_sent_bytes": 156680983577,
            "network_recv_bytes": 14211577209,
            "timestamp": "2025-03-07T15:17:00"
        },
        {
            "cpu_temperature": 45.4267,
            "cpu_usage": 1.12833,
            "ram_usage": 35.9,
            "system_load": 0.241699,
            "network_sent_bytes": 156681017203,
            "network_recv_bytes": 14211610015,
            "timestamp": "2025-03-07T15:18:00"
        },
        {
            "cpu_temperature": 45.5417,
            "cpu_usage": 1.16833,
            "ram_usage": 36.2,
            "system_load": 0.13916,
            "network_sent_bytes": 156681049413,
            "network_recv_bytes": 14211642377,
            "timestamp": "2025-03-07T15:19:00"
        },
        {
            "cpu_temperature": 45.485,
            "cpu_usage": 1.09667,
            "ram_usage": 36,
            "system_load": 0.134766,
            "network_sent_bytes": 156681081088,
            "network_recv_bytes": 14211673493,
            "timestamp": "2025-03-07T15:20:00"
        },
        {
            "cpu_temperature": 45.5817,
            "cpu_usage": 1.075,
            "ram_usage": 36.3,
            "system_load": 0.22998,
            "network_sent_bytes": 156681109471,
            "network_recv_bytes": 14211704207,
            "timestamp": "2025-03-07T15:21:00"
        },
        {
            "cpu_temperature": 45.51,
            "cpu_usage": 1.14167,
            "ram_usage": 36.1,
            "system_load": 0.090332,
            "network_sent_bytes": 156681135741,
            "network_recv_bytes": 14211730194,
            "timestamp": "2025-03-07T15:22:00"
        },
        {
            "cpu_temperature": 45.4883,
            "cpu_usage": 1.125,
            "ram_usage": 36.3,
            "system_load": 0.163086,
            "network_sent_bytes": 156681158549,
            "network_recv_bytes": 14211752640,
            "timestamp": "2025-03-07T15:23:00"
        },
        {
            "cpu_temperature": 45.5717,
            "cpu_usage": 1.155,
            "ram_usage": 36,
            "system_load": 0.214844,
            "network_sent_bytes": 156681188362,
            "network_recv_bytes": 14211782566,
            "timestamp": "2025-03-07T15:24:00"
        },
        {
            "cpu_temperature": 45.335,
            "cpu_usage": 1.10333,
            "ram_usage": 36.3,
            "system_load": 0.0771484,
            "network_sent_bytes": 156681213063,
            "network_recv_bytes": 14211806480,
            "timestamp": "2025-03-07T15:25:00"
        },
        {
            "cpu_temperature": 45.4133,
            "cpu_usage": 1.12667,
            "ram_usage": 36.3,
            "system_load": 0.221191,
            "network_sent_bytes": 156681240068,
            "network_recv_bytes": 14211838872,
            "timestamp": "2025-03-07T15:26:00"
        },
        {
            "cpu_temperature": 45.4867,
            "cpu_usage": 1.14333,
            "ram_usage": 36,
            "system_load": 0.192383,
            "network_sent_bytes": 156681268002,
            "network_recv_bytes": 14211862266,
            "timestamp": "2025-03-07T15:27:00"
        },
        {
            "cpu_temperature": 45.2467,
            "cpu_usage": 1.17167,
            "ram_usage": 36.3,
            "system_load": 0.149414,
            "network_sent_bytes": 156681298014,
            "network_recv_bytes": 14211891622,
            "timestamp": "2025-03-07T15:28:00"
        },
        {
            "cpu_temperature": 45.2967,
            "cpu_usage": 1.01333,
            "ram_usage": 36,
            "system_load": 0.202148,
            "network_sent_bytes": 156681328283,
            "network_recv_bytes": 14211922121,
            "timestamp": "2025-03-07T15:29:00"
        },
        {
            "cpu_temperature": 45.2717,
            "cpu_usage": 1.08,
            "ram_usage": 36.3,
            "system_load": 0.0727539,
            "network_sent_bytes": 156681354011,
            "network_recv_bytes": 14211951613,
            "timestamp": "2025-03-07T15:30:00"
        },
        {
            "cpu_temperature": 45.2617,
            "cpu_usage": 1.105,
            "ram_usage": 36.3,
            "system_load": 0.205566,
            "network_sent_bytes": 156681385131,
            "network_recv_bytes": 14211982201,
            "timestamp": "2025-03-07T15:31:00"
        },
        {
            "cpu_temperature": 45.2617,
            "cpu_usage": 1.05,
            "ram_usage": 35.9,
            "system_load": 0.153809,
            "network_sent_bytes": 156681409142,
            "network_recv_bytes": 14212005820,
            "timestamp": "2025-03-07T15:32:00"
        },
        {
            "cpu_temperature": 45.2167,
            "cpu_usage": 1.015,
            "ram_usage": 36.3,
            "system_load": 0.0546875,
            "network_sent_bytes": 156681435849,
            "network_recv_bytes": 14212032149,
            "timestamp": "2025-03-07T15:33:00"
        },
        {
            "cpu_temperature": 45.1833,
            "cpu_usage": 1.085,
            "ram_usage": 35.9,
            "system_load": 0.248535,
            "network_sent_bytes": 156681464533,
            "network_recv_bytes": 14212061126,
            "timestamp": "2025-03-07T15:34:00"
        },
        {
            "cpu_temperature": 45.2617,
            "cpu_usage": 1.04667,
            "ram_usage": 36.3,
            "system_load": 0.18457,
            "network_sent_bytes": 156681494399,
            "network_recv_bytes": 14212096001,
            "timestamp": "2025-03-07T15:35:00"
        },
        {
            "cpu_temperature": 45.1717,
            "cpu_usage": 1.03833,
            "ram_usage": 35.9,
            "system_load": 0.146484,
            "network_sent_bytes": 156681523225,
            "network_recv_bytes": 14212124309,
            "timestamp": "2025-03-07T15:36:00"
        },
        {
            "cpu_temperature": 45.1283,
            "cpu_usage": 1.02167,
            "ram_usage": 36.2,
            "system_load": 0.20166,
            "network_sent_bytes": 156681556578,
            "network_recv_bytes": 14212157106,
            "timestamp": "2025-03-07T15:37:00"
        },
        {
            "cpu_temperature": 45.2117,
            "cpu_usage": 1.23833,
            "ram_usage": 36.3,
            "system_load": 0.0722656,
            "network_sent_bytes": 156681586946,
            "network_recv_bytes": 14212186712,
            "timestamp": "2025-03-07T15:38:00"
        },
        {
            "cpu_temperature": 45.18,
            "cpu_usage": 1.21167,
            "ram_usage": 36.3,
            "system_load": 0.15625,
            "network_sent_bytes": 156681618281,
            "network_recv_bytes": 14212214118,
            "timestamp": "2025-03-07T15:39:00"
        },
        {
            "cpu_temperature": 45.1567,
            "cpu_usage": 1.26167,
            "ram_usage": 36.3,
            "system_load": 0.135254,
            "network_sent_bytes": 156681687873,
            "network_recv_bytes": 14212283621,
            "timestamp": "2025-03-07T15:40:00"
        },
        {
            "cpu_temperature": 45.11,
            "cpu_usage": 1.23,
            "ram_usage": 36.5,
            "system_load": 0.046875,
            "network_sent_bytes": 156681729733,
            "network_recv_bytes": 14212332367,
            "timestamp": "2025-03-07T15:41:00"
        },
        {
            "cpu_temperature": 45.11,
            "cpu_usage": 1.24,
            "ram_usage": 36.5,
            "system_load": 0.177734,
            "network_sent_bytes": 156681757923,
            "network_recv_bytes": 14212370416,
            "timestamp": "2025-03-07T15:42:00"
        },
        {
            "cpu_temperature": 46.765,
            "cpu_usage": 6.02833,
            "ram_usage": 36.6,
            "system_load": 0.315918,
            "network_sent_bytes": 156690089355,
            "network_recv_bytes": 14227086063,
            "timestamp": "2025-03-07T15:43:00"
        },
        {
            "cpu_temperature": 46.11,
            "cpu_usage": 1.19667,
            "ram_usage": 36.6,
            "system_load": 0.274414,
            "network_sent_bytes": 156690138061,
            "network_recv_bytes": 14227134893,
            "timestamp": "2025-03-07T15:44:00"
        },
        {
            "cpu_temperature": 45.695,
            "cpu_usage": 1.20667,
            "ram_usage": 36.4,
            "system_load": 0.248047,
            "network_sent_bytes": 156690171203,
            "network_recv_bytes": 14227167560,
            "timestamp": "2025-03-07T15:45:00"
        },
        {
            "cpu_temperature": 45.6183,
            "cpu_usage": 1.14667,
            "ram_usage": 36.4,
            "system_load": 0.0893555,
            "network_sent_bytes": 156690201474,
            "network_recv_bytes": 14227201623,
            "timestamp": "2025-03-07T15:46:00"
        },
        {
            "cpu_temperature": 45.3367,
            "cpu_usage": 1.15167,
            "ram_usage": 36.3,
            "system_load": 0.162598,
            "network_sent_bytes": 156690227347,
            "network_recv_bytes": 14227227026,
            "timestamp": "2025-03-07T15:47:00"
        },
        {
            "cpu_temperature": 45.3333,
            "cpu_usage": 1.16833,
            "ram_usage": 36.3,
            "system_load": 0.443359,
            "network_sent_bytes": 156690263610,
            "network_recv_bytes": 14227262980,
            "timestamp": "2025-03-07T15:48:00"
        },
        {
            "cpu_temperature": 45.4067,
            "cpu_usage": 1.22,
            "ram_usage": 36.3,
            "system_load": 0.192871,
            "network_sent_bytes": 156690294957,
            "network_recv_bytes": 14227294390,
            "timestamp": "2025-03-07T15:49:00"
        },
        {
            "cpu_temperature": 45.3733,
            "cpu_usage": 1.21,
            "ram_usage": 36.2,
            "system_load": 0.231445,
            "network_sent_bytes": 156690326607,
            "network_recv_bytes": 14227325290,
            "timestamp": "2025-03-07T15:50:00"
        },
        {
            "cpu_temperature": 45.2367,
            "cpu_usage": 0.956667,
            "ram_usage": 35.9,
            "system_load": 0.115234,
            "network_sent_bytes": 156690362459,
            "network_recv_bytes": 14227361520,
            "timestamp": "2025-03-07T15:51:00"
        },
        {
            "cpu_temperature": 45.2983,
            "cpu_usage": 1.03167,
            "ram_usage": 36.2,
            "system_load": 0.121094,
            "network_sent_bytes": 156690390615,
            "network_recv_bytes": 14227389242,
            "timestamp": "2025-03-07T15:52:00"
        },
        {
            "cpu_temperature": 45.1683,
            "cpu_usage": 0.938333,
            "ram_usage": 35.8,
            "system_load": 0.236816,
            "network_sent_bytes": 156690415395,
            "network_recv_bytes": 14227413378,
            "timestamp": "2025-03-07T15:53:00"
        },
        {
            "cpu_temperature": 45.3283,
            "cpu_usage": 1.01667,
            "ram_usage": 36.2,
            "system_load": 0.0849609,
            "network_sent_bytes": 156690444186,
            "network_recv_bytes": 14227442114,
            "timestamp": "2025-03-07T15:54:00"
        },
        {
            "cpu_temperature": 45.28,
            "cpu_usage": 0.996667,
            "ram_usage": 35.9,
            "system_load": 0.199219,
            "network_sent_bytes": 156690474527,
            "network_recv_bytes": 14227472001,
            "timestamp": "2025-03-07T15:55:00"
        },
        {
            "cpu_temperature": 45.3183,
            "cpu_usage": 0.973333,
            "ram_usage": 36.3,
            "system_load": 0.151367,
            "network_sent_bytes": 156690503813,
            "network_recv_bytes": 14227506493,
            "timestamp": "2025-03-07T15:56:00"
        },
        {
            "cpu_temperature": 45.29,
            "cpu_usage": 1.10667,
            "ram_usage": 36.2,
            "system_load": 0.0541992,
            "network_sent_bytes": 156690525967,
            "network_recv_bytes": 14227528237,
            "timestamp": "2025-03-07T15:57:00"
        },
        {
            "cpu_temperature": 45.3233,
            "cpu_usage": 1.11,
            "ram_usage": 35.9,
            "system_load": 0.180664,
            "network_sent_bytes": 156690556033,
            "network_recv_bytes": 14227558058,
            "timestamp": "2025-03-07T15:58:00"
        },
        {
            "cpu_temperature": 45.465,
            "cpu_usage": 0.998333,
            "ram_usage": 36.3,
            "system_load": 0.175293,
            "network_sent_bytes": 156690586720,
            "network_recv_bytes": 14227588875,
            "timestamp": "2025-03-07T15:59:00"
        },
        {
            "cpu_temperature": 45.4517,
            "cpu_usage": 1.01833,
            "ram_usage": 35.9,
            "system_load": 0.216797,
            "network_sent_bytes": 156690610407,
            "network_recv_bytes": 14227612394,
            "timestamp": "2025-03-07T16:00:00"
        },
        {
            "cpu_temperature": 45.4417,
            "cpu_usage": 1.095,
            "ram_usage": 36.3,
            "system_load": 0.227051,
            "network_sent_bytes": 156690666610,
            "network_recv_bytes": 14227672302,
            "timestamp": "2025-03-07T16:01:00"
        },
        {
            "cpu_temperature": 45.4083,
            "cpu_usage": 1.03667,
            "ram_usage": 35.9,
            "system_load": 0.129883,
            "network_sent_bytes": 156690693424,
            "network_recv_bytes": 14227698784,
            "timestamp": "2025-03-07T16:02:00"
        },
        {
            "cpu_temperature": 45.465,
            "cpu_usage": 0.933333,
            "ram_usage": 36.3,
            "system_load": 0.177734,
            "network_sent_bytes": 156690729826,
            "network_recv_bytes": 14227730370,
            "timestamp": "2025-03-07T16:03:00"
        },
        {
            "cpu_temperature": 45.6617,
            "cpu_usage": 1.04667,
            "ram_usage": 35.9,
            "system_load": 0.196289,
            "network_sent_bytes": 156690760353,
            "network_recv_bytes": 14227760909,
            "timestamp": "2025-03-07T16:04:00"
        },
        {
            "cpu_temperature": 45.4983,
            "cpu_usage": 1.12667,
            "ram_usage": 36.3,
            "system_load": 0.0703125,
            "network_sent_bytes": 156690788701,
            "network_recv_bytes": 14227797377,
            "timestamp": "2025-03-07T16:05:00"
        },
        {
            "cpu_temperature": 45.5733,
            "cpu_usage": 1.01667,
            "ram_usage": 35.9,
            "system_load": 0.244141,
            "network_sent_bytes": 156690816662,
            "network_recv_bytes": 14227836670,
            "timestamp": "2025-03-07T16:06:00"
        },
        {
            "cpu_temperature": 45.4917,
            "cpu_usage": 0.995,
            "ram_usage": 36.3,
            "system_load": 0.268066,
            "network_sent_bytes": 156690840882,
            "network_recv_bytes": 14227860502,
            "timestamp": "2025-03-07T16:07:00"
        },
        {
            "cpu_temperature": 45.4083,
            "cpu_usage": 1.00333,
            "ram_usage": 35.9,
            "system_load": 0.176758,
            "network_sent_bytes": 156690872629,
            "network_recv_bytes": 14227891599,
            "timestamp": "2025-03-07T16:08:00"
        },
        {
            "cpu_temperature": 45.5167,
            "cpu_usage": 1.13333,
            "ram_usage": 36.3,
            "system_load": 0.274902,
            "network_sent_bytes": 156690899481,
            "network_recv_bytes": 14227918627,
            "timestamp": "2025-03-07T16:09:00"
        },
        {
            "cpu_temperature": 45.55,
            "cpu_usage": 1.03667,
            "ram_usage": 35.9,
            "system_load": 0.147461,
            "network_sent_bytes": 156690930986,
            "network_recv_bytes": 14227949553,
            "timestamp": "2025-03-07T16:10:00"
        },
        {
            "cpu_temperature": 45.5133,
            "cpu_usage": 1.04,
            "ram_usage": 36.3,
            "system_load": 0.183594,
            "network_sent_bytes": 156690959786,
            "network_recv_bytes": 14227982267,
            "timestamp": "2025-03-07T16:11:00"
        },
        {
            "cpu_temperature": 45.4567,
            "cpu_usage": 0.973333,
            "ram_usage": 35.9,
            "system_load": 0.145508,
            "network_sent_bytes": 156690981845,
            "network_recv_bytes": 14228004226,
            "timestamp": "2025-03-07T16:12:00"
        },
        {
            "cpu_temperature": 45.5717,
            "cpu_usage": 1.01833,
            "ram_usage": 36.3,
            "system_load": 0.121582,
            "network_sent_bytes": 156691016190,
            "network_recv_bytes": 14228037799,
            "timestamp": "2025-03-07T16:13:00"
        },
        {
            "cpu_temperature": 45.5517,
            "cpu_usage": 1.10667,
            "ram_usage": 35.9,
            "system_load": 0.286133,
            "network_sent_bytes": 156691041878,
            "network_recv_bytes": 14228063633,
            "timestamp": "2025-03-07T16:14:00"
        },
        {
            "cpu_temperature": 45.535,
            "cpu_usage": 0.986667,
            "ram_usage": 36.3,
            "system_load": 0.203613,
            "network_sent_bytes": 156691079020,
            "network_recv_bytes": 14228095533,
            "timestamp": "2025-03-07T16:15:00"
        },
        {
            "cpu_temperature": 45.4833,
            "cpu_usage": 1.16167,
            "ram_usage": 36.3,
            "system_load": 0.15332,
            "network_sent_bytes": 156691153273,
            "network_recv_bytes": 14228173813,
            "timestamp": "2025-03-07T16:16:00"
        },
        {
            "cpu_temperature": 45.2933,
            "cpu_usage": 1.155,
            "ram_usage": 36.4,
            "system_load": 0.203613,
            "network_sent_bytes": 156691178263,
            "network_recv_bytes": 14228198387,
            "timestamp": "2025-03-07T16:17:00"
        },
        {
            "cpu_temperature": 45.3033,
            "cpu_usage": 1.17,
            "ram_usage": 36.5,
            "system_load": 0.0727539,
            "network_sent_bytes": 156691211995,
            "network_recv_bytes": 14228231151,
            "timestamp": "2025-03-07T16:18:00"
        },
        {
            "cpu_temperature": 45.185,
            "cpu_usage": 1.15333,
            "ram_usage": 36.4,
            "system_load": 0.372559,
            "network_sent_bytes": 156691239541,
            "network_recv_bytes": 14228258947,
            "timestamp": "2025-03-07T16:19:00"
        },
        {
            "cpu_temperature": 45.315,
            "cpu_usage": 1.21667,
            "ram_usage": 36.2,
            "system_load": 0.214844,
            "network_sent_bytes": 156691302807,
            "network_recv_bytes": 14228321327,
            "timestamp": "2025-03-07T16:20:00"
        },
        {
            "cpu_temperature": 45.3233,
            "cpu_usage": 1.24833,
            "ram_usage": 36.3,
            "system_load": 0.0771484,
            "network_sent_bytes": 156691354242,
            "network_recv_bytes": 14228377583,
            "timestamp": "2025-03-07T16:21:00"
        },
        {
            "cpu_temperature": 45.3117,
            "cpu_usage": 1.275,
            "ram_usage": 36.3,
            "system_load": 0.375977,
            "network_sent_bytes": 156691409530,
            "network_recv_bytes": 14228432741,
            "timestamp": "2025-03-07T16:22:00"
        },
        {
            "cpu_temperature": 45.3883,
            "cpu_usage": 1.22667,
            "ram_usage": 36.3,
            "system_load": 0.168457,
            "network_sent_bytes": 156691460085,
            "network_recv_bytes": 14228482855,
            "timestamp": "2025-03-07T16:23:00"
        },
        {
            "cpu_temperature": 45.315,
            "cpu_usage": 1.07833,
            "ram_usage": 35.9,
            "system_load": 0.140625,
            "network_sent_bytes": 156691506755,
            "network_recv_bytes": 14228530076,
            "timestamp": "2025-03-07T16:24:00"
        },
        {
            "cpu_temperature": 45.3533,
            "cpu_usage": 1.03,
            "ram_usage": 36.3,
            "system_load": 0.24707,
            "network_sent_bytes": 156691537115,
            "network_recv_bytes": 14228565499,
            "timestamp": "2025-03-07T16:25:00"
        },
        {
            "cpu_temperature": 45.315,
            "cpu_usage": 1.045,
            "ram_usage": 35.9,
            "system_load": 0.0888672,
            "network_sent_bytes": 156691563282,
            "network_recv_bytes": 14228591016,
            "timestamp": "2025-03-07T16:26:00"
        },
        {
            "cpu_temperature": 45.245,
            "cpu_usage": 1.095,
            "ram_usage": 36.3,
            "system_load": 0.162598,
            "network_sent_bytes": 156691591297,
            "network_recv_bytes": 14228614571,
            "timestamp": "2025-03-07T16:27:00"
        },
        {
            "cpu_temperature": 45.345,
            "cpu_usage": 0.935,
            "ram_usage": 35.9,
            "system_load": 0.138184,
            "network_sent_bytes": 156691618728,
            "network_recv_bytes": 14228641358,
            "timestamp": "2025-03-07T16:28:00"
        },
        {
            "cpu_temperature": 45.185,
            "cpu_usage": 1.08,
            "ram_usage": 36.3,
            "system_load": 0.118164,
            "network_sent_bytes": 156691649967,
            "network_recv_bytes": 14228672667,
            "timestamp": "2025-03-07T16:29:00"
        },
        {
            "cpu_temperature": 45.355,
            "cpu_usage": 0.978333,
            "ram_usage": 35.9,
            "system_load": 0.20459,
            "network_sent_bytes": 156691672888,
            "network_recv_bytes": 14228694577,
            "timestamp": "2025-03-07T16:30:00"
        },
        {
            "cpu_temperature": 45.2917,
            "cpu_usage": 0.98,
            "ram_usage": 36.2,
            "system_load": 0.143555,
            "network_sent_bytes": 156691705883,
            "network_recv_bytes": 14228731714,
            "timestamp": "2025-03-07T16:31:00"
        },
        {
            "cpu_temperature": 45.235,
            "cpu_usage": 1.19,
            "ram_usage": 36.3,
            "system_load": 0.131348,
            "network_sent_bytes": 156691730092,
            "network_recv_bytes": 14228755625,
            "timestamp": "2025-03-07T16:32:00"
        },
        {
            "cpu_temperature": 45.26,
            "cpu_usage": 1.12833,
            "ram_usage": 36.3,
            "system_load": 0.195801,
            "network_sent_bytes": 156691756733,
            "network_recv_bytes": 14228781890,
            "timestamp": "2025-03-07T16:33:00"
        },
        {
            "cpu_temperature": 45.22,
            "cpu_usage": 1.20333,
            "ram_usage": 36.2,
            "system_load": 0.0703125,
            "network_sent_bytes": 156691786019,
            "network_recv_bytes": 14228811539,
            "timestamp": "2025-03-07T16:34:00"
        },
        {
            "cpu_temperature": 45.29,
            "cpu_usage": 1.195,
            "ram_usage": 36.3,
            "system_load": 0.15625,
            "network_sent_bytes": 156691812933,
            "network_recv_bytes": 14228837176,
            "timestamp": "2025-03-07T16:35:00"
        },
        {
            "cpu_temperature": 45.3867,
            "cpu_usage": 1.81,
            "ram_usage": 36.3,
            "system_load": 0.203613,
            "network_sent_bytes": 156691843252,
            "network_recv_bytes": 14228872396,
            "timestamp": "2025-03-07T16:36:00"
        },
        {
            "cpu_temperature": 45.5883,
            "cpu_usage": 1.10667,
            "ram_usage": 36.2,
            "system_load": 0.0727539,
            "network_sent_bytes": 156691868675,
            "network_recv_bytes": 14228897737,
            "timestamp": "2025-03-07T16:37:00"
        },
        {
            "cpu_temperature": 45.3717,
            "cpu_usage": 1.09167,
            "ram_usage": 36.3,
            "system_load": 0.229004,
            "network_sent_bytes": 156691897024,
            "network_recv_bytes": 14228925740,
            "timestamp": "2025-03-07T16:38:00"
        },
        {
            "cpu_temperature": 45.3633,
            "cpu_usage": 1.255,
            "ram_usage": 36.2,
            "system_load": 0.11377,
            "network_sent_bytes": 156691930224,
            "network_recv_bytes": 14228954852,
            "timestamp": "2025-03-07T16:39:00"
        },
        {
            "cpu_temperature": 45.4333,
            "cpu_usage": 1.13833,
            "ram_usage": 36.4,
            "system_load": 0.199707,
            "network_sent_bytes": 156691975809,
            "network_recv_bytes": 14229000117,
            "timestamp": "2025-03-07T16:40:00"
        },
        {
            "cpu_temperature": 45.45,
            "cpu_usage": 1.12333,
            "ram_usage": 36.3,
            "system_load": 0.301758,
            "network_sent_bytes": 156692002204,
            "network_recv_bytes": 14229031312,
            "timestamp": "2025-03-07T16:41:00"
        },
        {
            "cpu_temperature": 45.35,
            "cpu_usage": 1.13333,
            "ram_usage": 36.3,
            "system_load": 0.188965,
            "network_sent_bytes": 156692024614,
            "network_recv_bytes": 14229053072,
            "timestamp": "2025-03-07T16:42:00"
        },
        {
            "cpu_temperature": 45.245,
            "cpu_usage": 1.01333,
            "ram_usage": 35.8,
            "system_load": 0.199219,
            "network_sent_bytes": 156692049896,
            "network_recv_bytes": 14229077505,
            "timestamp": "2025-03-07T16:43:00"
        },
        {
            "cpu_temperature": 45.2767,
            "cpu_usage": 1.08167,
            "ram_usage": 36.2,
            "system_load": 0.276367,
            "network_sent_bytes": 156692077431,
            "network_recv_bytes": 14229105238,
            "timestamp": "2025-03-07T16:44:00"
        },
        {
            "cpu_temperature": 45.2783,
            "cpu_usage": 0.953333,
            "ram_usage": 35.8,
            "system_load": 0.144043,
            "network_sent_bytes": 156692101515,
            "network_recv_bytes": 14229128810,
            "timestamp": "2025-03-07T16:45:00"
        },
        {
            "cpu_temperature": 45.27,
            "cpu_usage": 1.085,
            "ram_usage": 36.3,
            "system_load": 0.213379,
            "network_sent_bytes": 156692129973,
            "network_recv_bytes": 14229161886,
            "timestamp": "2025-03-07T16:46:00"
        },
        {
            "cpu_temperature": 45.2817,
            "cpu_usage": 0.985,
            "ram_usage": 35.9,
            "system_load": 0.223633,
            "network_sent_bytes": 156692153463,
            "network_recv_bytes": 14229184772,
            "timestamp": "2025-03-07T16:47:00"
        },
        {
            "cpu_temperature": 45.2917,
            "cpu_usage": 1.00667,
            "ram_usage": 36.3,
            "system_load": 0.160645,
            "network_sent_bytes": 156692189317,
            "network_recv_bytes": 14229220133,
            "timestamp": "2025-03-07T16:48:00"
        },
        {
            "cpu_temperature": 45.3683,
            "cpu_usage": 1.175,
            "ram_usage": 35.9,
            "system_load": 0.277344,
            "network_sent_bytes": 156692221159,
            "network_recv_bytes": 14229251939,
            "timestamp": "2025-03-07T16:49:00"
        },
        {
            "cpu_temperature": 45.21,
            "cpu_usage": 1.03667,
            "ram_usage": 36.2,
            "system_load": 0.121094,
            "network_sent_bytes": 156692257459,
            "network_recv_bytes": 14229292933,
            "timestamp": "2025-03-07T16:50:00"
        },
        {
            "cpu_temperature": 45.14,
            "cpu_usage": 1.015,
            "ram_usage": 35.9,
            "system_load": 0.189941,
            "network_sent_bytes": 156692286840,
            "network_recv_bytes": 14229321129,
            "timestamp": "2025-03-07T16:51:00"
        },
        {
            "cpu_temperature": 45.2533,
            "cpu_usage": 0.975,
            "ram_usage": 36.2,
            "system_load": 0.201172,
            "network_sent_bytes": 156692320189,
            "network_recv_bytes": 14229350022,
            "timestamp": "2025-03-07T16:52:00"
        },
        {
            "cpu_temperature": 45.2717,
            "cpu_usage": 1.01,
            "ram_usage": 35.9,
            "system_load": 0.452637,
            "network_sent_bytes": 156692350738,
            "network_recv_bytes": 14229380137,
            "timestamp": "2025-03-07T16:53:00"
        },
        {
            "cpu_temperature": 45.1033,
            "cpu_usage": 1.015,
            "ram_usage": 36.3,
            "system_load": 0.41748,
            "network_sent_bytes": 156692384518,
            "network_recv_bytes": 14229414099,
            "timestamp": "2025-03-07T16:54:00"
        },
        {
            "cpu_temperature": 45.1567,
            "cpu_usage": 1.01833,
            "ram_usage": 35.9,
            "system_load": 0.200195,
            "network_sent_bytes": 156692410503,
            "network_recv_bytes": 14229439039,
            "timestamp": "2025-03-07T16:55:00"
        },
        {
            "cpu_temperature": 45.0617,
            "cpu_usage": 1.06167,
            "ram_usage": 36.3,
            "system_load": 0.205078,
            "network_sent_bytes": 156692438808,
            "network_recv_bytes": 14229471946,
            "timestamp": "2025-03-07T16:56:00"
        },
        {
            "cpu_temperature": 45.0517,
            "cpu_usage": 1.12,
            "ram_usage": 36.2,
            "system_load": 0.303223,
            "network_sent_bytes": 156692460822,
            "network_recv_bytes": 14229493556,
            "timestamp": "2025-03-07T16:57:00"
        },
        {
            "cpu_temperature": 45.1217,
            "cpu_usage": 1.17333,
            "ram_usage": 36.2,
            "system_load": 0.147461,
            "network_sent_bytes": 156692492423,
            "network_recv_bytes": 14229524784,
            "timestamp": "2025-03-07T16:58:00"
        },
        {
            "cpu_temperature": 45.0533,
            "cpu_usage": 1.18333,
            "ram_usage": 36.2,
            "system_load": 0.199707,
            "network_sent_bytes": 156692521157,
            "network_recv_bytes": 14229553512,
            "timestamp": "2025-03-07T16:59:00"
        },
        {
            "cpu_temperature": 45.0167,
            "cpu_usage": 1.45167,
            "ram_usage": 36.3,
            "system_load": 0.209473,
            "network_sent_bytes": 156692568644,
            "network_recv_bytes": 14229599526,
            "timestamp": "2025-03-07T17:00:00"
        },
        {
            "cpu_temperature": 45.0417,
            "cpu_usage": 1.26833,
            "ram_usage": 36.3,
            "system_load": 0.0820312,
            "network_sent_bytes": 156692601923,
            "network_recv_bytes": 14229635398,
            "timestamp": "2025-03-07T17:01:00"
        },
        {
            "cpu_temperature": 46.2167,
            "cpu_usage": 8.26167,
            "ram_usage": 36.3,
            "system_load": 0.64502,
            "network_sent_bytes": 156703382292,
            "network_recv_bytes": 14248540419,
            "timestamp": "2025-03-07T17:02:00"
        },
        {
            "cpu_temperature": 46.9567,
            "cpu_usage": 8.1,
            "ram_usage": 36.3,
            "system_load": 0.606445,
            "network_sent_bytes": 156706801363,
            "network_recv_bytes": 14254143691,
            "timestamp": "2025-03-07T17:03:00"
        },
        {
            "cpu_temperature": 46.03,
            "cpu_usage": 1.20167,
            "ram_usage": 36.3,
            "system_load": 0.252441,
            "network_sent_bytes": 156706924075,
            "network_recv_bytes": 14254260807,
            "timestamp": "2025-03-07T17:04:00"
        },
        {
            "cpu_temperature": 45.505,
            "cpu_usage": 1.10167,
            "ram_usage": 36.6,
            "system_load": 0.285645,
            "network_sent_bytes": 156707136160,
            "network_recv_bytes": 14254474735,
            "timestamp": "2025-03-07T17:05:00"
        },
        {
            "cpu_temperature": 45.3817,
            "cpu_usage": 1.07333,
            "ram_usage": 36.9,
            "system_load": 0.103027,
            "network_sent_bytes": 156707184540,
            "network_recv_bytes": 14254535418,
            "timestamp": "2025-03-07T17:06:00"
        },
        {
            "cpu_temperature": 45.3217,
            "cpu_usage": 1.04667,
            "ram_usage": 36.3,
            "system_load": 0.179199,
            "network_sent_bytes": 156707223128,
            "network_recv_bytes": 14254572979,
            "timestamp": "2025-03-07T17:07:00"
        },
        {
            "cpu_temperature": 45.2917,
            "cpu_usage": 1.03,
            "ram_usage": 36.8,
            "system_load": 0.150879,
            "network_sent_bytes": 156707261399,
            "network_recv_bytes": 14254611174,
            "timestamp": "2025-03-07T17:08:00"
        },
        {
            "cpu_temperature": 45.31,
            "cpu_usage": 1.04833,
            "ram_usage": 36,
            "system_load": 0.0859375,
            "network_sent_bytes": 156707299419,
            "network_recv_bytes": 14254648562,
            "timestamp": "2025-03-07T17:09:00"
        },
        {
            "cpu_temperature": 45.39,
            "cpu_usage": 1.07333,
            "ram_usage": 36.4,
            "system_load": 0.244141,
            "network_sent_bytes": 156707341220,
            "network_recv_bytes": 14254700967,
            "timestamp": "2025-03-07T17:10:00"
        },
        {
            "cpu_temperature": 45.1,
            "cpu_usage": 1.305,
            "ram_usage": 36.4,
            "system_load": 0.186523,
            "network_sent_bytes": 156707582567,
            "network_recv_bytes": 14254947375,
            "timestamp": "2025-03-07T17:11:00"
        },
        {
            "cpu_temperature": 45.29,
            "cpu_usage": 1.195,
            "ram_usage": 36.6,
            "system_load": 0.0668945,
            "network_sent_bytes": 156707650126,
            "network_recv_bytes": 14255015271,
            "timestamp": "2025-03-07T17:12:00"
        },
        {
            "cpu_temperature": 45.1633,
            "cpu_usage": 1.255,
            "ram_usage": 36.2,
            "system_load": 0.217285,
            "network_sent_bytes": 156707695145,
            "network_recv_bytes": 14255059694,
            "timestamp": "2025-03-07T17:13:00"
        },
        {
            "cpu_temperature": 45.1883,
            "cpu_usage": 1.22833,
            "ram_usage": 36.4,
            "system_load": 0.172363,
            "network_sent_bytes": 156707804155,
            "network_recv_bytes": 14255179028,
            "timestamp": "2025-03-07T17:14:00"
        },
        {
            "cpu_temperature": 45.265,
            "cpu_usage": 1.28,
            "ram_usage": 36.4,
            "system_load": 0.20459,
            "network_sent_bytes": 156707914764,
            "network_recv_bytes": 14255293838,
            "timestamp": "2025-03-07T17:15:00"
        },
        {
            "cpu_temperature": 45.1933,
            "cpu_usage": 1.09333,
            "ram_usage": 36.5,
            "system_load": 0.159668,
            "network_sent_bytes": 156707958990,
            "network_recv_bytes": 14255341057,
            "timestamp": "2025-03-07T17:16:00"
        },
        {
            "cpu_temperature": 45.0333,
            "cpu_usage": 1.06,
            "ram_usage": 36.4,
            "system_load": 0.0561523,
            "network_sent_bytes": 156707989134,
            "network_recv_bytes": 14255374737,
            "timestamp": "2025-03-07T17:17:00"
        },
        {
            "cpu_temperature": 45.2383,
            "cpu_usage": 1.12667,
            "ram_usage": 36.4,
            "system_load": 0.195312,
            "network_sent_bytes": 156708026347,
            "network_recv_bytes": 14255413670,
            "timestamp": "2025-03-07T17:18:00"
        },
        {
            "cpu_temperature": 45.1183,
            "cpu_usage": 1.20667,
            "ram_usage": 36.4,
            "system_load": 0.104492,
            "network_sent_bytes": 156708071223,
            "network_recv_bytes": 14255462507,
            "timestamp": "2025-03-07T17:19:00"
        },
        {
            "cpu_temperature": 45.145,
            "cpu_usage": 1.24333,
            "ram_usage": 36.5,
            "system_load": 0.0356445,
            "network_sent_bytes": 156708169001,
            "network_recv_bytes": 14255565123,
            "timestamp": "2025-03-07T17:20:00"
        },
        {
            "cpu_temperature": 45.525,
            "cpu_usage": 1.29,
            "ram_usage": 36.8,
            "system_load": 0.273438,
            "network_sent_bytes": 156708399811,
            "network_recv_bytes": 14255796386,
            "timestamp": "2025-03-07T17:21:00"
        },
        {
            "cpu_temperature": 45.4867,
            "cpu_usage": 1.21167,
            "ram_usage": 36.7,
            "system_load": 0.0991211,
            "network_sent_bytes": 156708553192,
            "network_recv_bytes": 14255960070,
            "timestamp": "2025-03-07T17:22:00"
        },
        {
            "cpu_temperature": 45.4567,
            "cpu_usage": 1.14667,
            "ram_usage": 36.5,
            "system_load": 0.178223,
            "network_sent_bytes": 156708632767,
            "network_recv_bytes": 14256039308,
            "timestamp": "2025-03-07T17:23:00"
        },
        {
            "cpu_temperature": 45.425,
            "cpu_usage": 1.26833,
            "ram_usage": 36.5,
            "system_load": 0.1875,
            "network_sent_bytes": 156708737425,
            "network_recv_bytes": 14256152417,
            "timestamp": "2025-03-07T17:24:00"
        },
        {
            "cpu_temperature": 45.3717,
            "cpu_usage": 1.15333,
            "ram_usage": 36.4,
            "system_load": 0.0668945,
            "network_sent_bytes": 156708797735,
            "network_recv_bytes": 14256211882,
            "timestamp": "2025-03-07T17:25:00"
        },
        {
            "cpu_temperature": 45.6183,
            "cpu_usage": 1.15333,
            "ram_usage": 36,
            "system_load": 0.199219,
            "network_sent_bytes": 156708912037,
            "network_recv_bytes": 14256349256,
            "timestamp": "2025-03-07T17:26:00"
        },
        {
            "cpu_temperature": 45.4583,
            "cpu_usage": 0.981667,
            "ram_usage": 36.3,
            "system_load": 0.106445,
            "network_sent_bytes": 156708990324,
            "network_recv_bytes": 14256431771,
            "timestamp": "2025-03-07T17:27:00"
        },
        {
            "cpu_temperature": 45.5883,
            "cpu_usage": 1.08,
            "ram_usage": 36.1,
            "system_load": 0.0947266,
            "network_sent_bytes": 156709062457,
            "network_recv_bytes": 14256501664,
            "timestamp": "2025-03-07T17:28:00"
        },
        {
            "cpu_temperature": 45.4617,
            "cpu_usage": 1.39833,
            "ram_usage": 36.8,
            "system_load": 0.262695,
            "network_sent_bytes": 156709353213,
            "network_recv_bytes": 14256790355,
            "timestamp": "2025-03-07T17:29:00"
        },
        {
            "cpu_temperature": 45.5733,
            "cpu_usage": 1.13333,
            "ram_usage": 36.5,
            "system_load": 0.162598,
            "network_sent_bytes": 156709449828,
            "network_recv_bytes": 14256899521,
            "timestamp": "2025-03-07T17:30:00"
        },
        {
            "cpu_temperature": 45.4683,
            "cpu_usage": 1.14167,
            "ram_usage": 36.4,
            "system_load": 0.275391,
            "network_sent_bytes": 156709525903,
            "network_recv_bytes": 14256979673,
            "timestamp": "2025-03-07T17:31:00"
        },
        {
            "cpu_temperature": 45.3833,
            "cpu_usage": 1.21167,
            "ram_usage": 36.4,
            "system_load": 0.205566,
            "network_sent_bytes": 156709557853,
            "network_recv_bytes": 14257010853,
            "timestamp": "2025-03-07T17:32:00"
        },
        {
            "cpu_temperature": 45.39,
            "cpu_usage": 1.20333,
            "ram_usage": 36.4,
            "system_load": 0.141602,
            "network_sent_bytes": 156709587367,
            "network_recv_bytes": 14257039799,
            "timestamp": "2025-03-07T17:33:00"
        },
        {
            "cpu_temperature": 45.5083,
            "cpu_usage": 1.24833,
            "ram_usage": 36.4,
            "system_load": 0.226562,
            "network_sent_bytes": 156709690258,
            "network_recv_bytes": 14257148731,
            "timestamp": "2025-03-07T17:34:00"
        },
        {
            "cpu_temperature": 45.425,
            "cpu_usage": 1.3,
            "ram_usage": 36.7,
            "system_load": 0.157227,
            "network_sent_bytes": 156709934471,
            "network_recv_bytes": 14257387250,
            "timestamp": "2025-03-07T17:35:00"
        },
        {
            "cpu_temperature": 45.4283,
            "cpu_usage": 1.25167,
            "ram_usage": 36.7,
            "system_load": 0.0561523,
            "network_sent_bytes": 156709974109,
            "network_recv_bytes": 14257433263,
            "timestamp": "2025-03-07T17:36:00"
        },
        {
            "cpu_temperature": 45.3583,
            "cpu_usage": 1.18167,
            "ram_usage": 36.4,
            "system_load": 0.374023,
            "network_sent_bytes": 156710010798,
            "network_recv_bytes": 14257471810,
            "timestamp": "2025-03-07T17:37:00"
        },
        {
            "cpu_temperature": 45.4217,
            "cpu_usage": 1.18667,
            "ram_usage": 36.4,
            "system_load": 0.188965,
            "network_sent_bytes": 156710046509,
            "network_recv_bytes": 14257510701,
            "timestamp": "2025-03-07T17:38:00"
        },
        {
            "cpu_temperature": 45.29,
            "cpu_usage": 1.35333,
            "ram_usage": 36.4,
            "system_load": 0.255371,
            "network_sent_bytes": 156710185794,
            "network_recv_bytes": 14257657479,
            "timestamp": "2025-03-07T17:39:00"
        },
        {
            "cpu_temperature": 45.2167,
            "cpu_usage": 1.26833,
            "ram_usage": 36.5,
            "system_load": 0.224121,
            "network_sent_bytes": 156710235646,
            "network_recv_bytes": 14257703661,
            "timestamp": "2025-03-07T17:40:00"
        },
        {
            "cpu_temperature": 45.2383,
            "cpu_usage": 1.17167,
            "ram_usage": 36.5,
            "system_load": 0.0800781,
            "network_sent_bytes": 156710297116,
            "network_recv_bytes": 14257771327,
            "timestamp": "2025-03-07T17:41:00"
        },
        {
            "cpu_temperature": 45.1767,
            "cpu_usage": 1.27,
            "ram_usage": 36.5,
            "system_load": 0.204102,
            "network_sent_bytes": 156710441604,
            "network_recv_bytes": 14257925510,
            "timestamp": "2025-03-07T17:42:00"
        },
        {
            "cpu_temperature": 45.2167,
            "cpu_usage": 1.18,
            "ram_usage": 36.4,
            "system_load": 0.143066,
            "network_sent_bytes": 156710484774,
            "network_recv_bytes": 14257970507,
            "timestamp": "2025-03-07T17:43:00"
        },
        {
            "cpu_temperature": 45.2317,
            "cpu_usage": 1.34667,
            "ram_usage": 36.3,
            "system_load": 0.0507812,
            "network_sent_bytes": 156710749847,
            "network_recv_bytes": 14258250094,
            "timestamp": "2025-03-07T17:44:00"
        },
        {
            "cpu_temperature": 45.285,
            "cpu_usage": 1.23833,
            "ram_usage": 36.3,
            "system_load": 0.249512,
            "network_sent_bytes": 156710854671,
            "network_recv_bytes": 14258357722,
            "timestamp": "2025-03-07T17:45:00"
        },
        {
            "cpu_temperature": 46.1867,
            "cpu_usage": 6.255,
            "ram_usage": 36.3,
            "system_load": 0.0898438,
            "network_sent_bytes": 156714721090,
            "network_recv_bytes": 14264677088,
            "timestamp": "2025-03-07T17:46:00"
        },
        {
            "cpu_temperature": 48.1217,
            "cpu_usage": 15.9417,
            "ram_usage": 36.3,
            "system_load": 0.734863,
            "network_sent_bytes": 156725598209,
            "network_recv_bytes": 14283510444,
            "timestamp": "2025-03-07T17:47:00"
        },
        {
            "cpu_temperature": 46.6417,
            "cpu_usage": 1.2,
            "ram_usage": 36.3,
            "system_load": 0.41748,
            "network_sent_bytes": 156725666466,
            "network_recv_bytes": 14283578629,
            "timestamp": "2025-03-07T17:48:00"
        },
        {
            "cpu_temperature": 46.26,
            "cpu_usage": 1.46333,
            "ram_usage": 36.3,
            "system_load": 0.151367,
            "network_sent_bytes": 156726763796,
            "network_recv_bytes": 14284004465,
            "timestamp": "2025-03-07T17:49:00"
        },
        {
            "cpu_temperature": 46.0183,
            "cpu_usage": 1.19333,
            "ram_usage": 36.4,
            "system_load": 0.22998,
            "network_sent_bytes": 156726826945,
            "network_recv_bytes": 14284073186,
            "timestamp": "2025-03-07T17:50:00"
        },
        {
            "cpu_temperature": 45.945,
            "cpu_usage": 1.32167,
            "ram_usage": 36.4,
            "system_load": 0.117676,
            "network_sent_bytes": 156727833347,
            "network_recv_bytes": 14284651956,
            "timestamp": "2025-03-07T17:51:00"
        },
        {
            "cpu_temperature": 0,
            "cpu_usage": 0,
            "ram_usage": 0,
            "system_load": 0,
            "network_sent_bytes": 156727833347,
            "network_recv_bytes": 14284651956,
            "timestamp": "2025-03-07T17:52:00"
        },
        {
            "cpu_temperature": 48.5183,
            "cpu_usage": 10.9633,
            "ram_usage": 34.3,
            "system_load": 0.49707,
            "network_sent_bytes": 156610594879,
            "network_recv_bytes": 14079982534,
            "timestamp": "2025-03-07T17:53:00"
        },
        {
            "cpu_temperature": 47.415,
            "cpu_usage": 5.465,
            "ram_usage": 34.8,
            "system_load": 0.446777,
            "network_sent_bytes": 156613850737,
            "network_recv_bytes": 14085553549,
            "timestamp": "2025-03-07T17:54:00"
        },
        {
            "cpu_temperature": 46.4333,
            "cpu_usage": 1.24833,
            "ram_usage": 34.7,
            "system_load": 0.293945,
            "network_sent_bytes": 156614182848,
            "network_recv_bytes": 14086085065,
            "timestamp": "2025-03-07T17:55:00"
        },
        {
            "cpu_temperature": 46.08,
            "cpu_usage": 1.27333,
            "ram_usage": 34.4,
            "system_load": 0.220703,
            "network_sent_bytes": 156614511986,
            "network_recv_bytes": 14086619252,
            "timestamp": "2025-03-07T17:56:00"
        },
        {
            "cpu_temperature": 45.6783,
            "cpu_usage": 1.13333,
            "ram_usage": 34.8,
            "system_load": 0.0791016,
            "network_sent_bytes": 156614846290,
            "network_recv_bytes": 14087153143,
            "timestamp": "2025-03-07T17:57:00"
        },
        {
            "cpu_temperature": 45.695,
            "cpu_usage": 1.19333,
            "ram_usage": 34.3,
            "system_load": 0.270996,
            "network_sent_bytes": 156615181249,
            "network_recv_bytes": 14087685889,
            "timestamp": "2025-03-07T17:58:00"
        },
        {
            "cpu_temperature": 45.7083,
            "cpu_usage": 1.22,
            "ram_usage": 34.6,
            "system_load": 0.129883,
            "network_sent_bytes": 156615515584,
            "network_recv_bytes": 14088218150,
            "timestamp": "2025-03-07T17:59:00"
        },
        {
            "cpu_temperature": 45.6183,
            "cpu_usage": 1.27667,
            "ram_usage": 34.3,
            "system_load": 0.167969,
            "network_sent_bytes": 156615837406,
            "network_recv_bytes": 14088727817,
            "timestamp": "2025-03-07T18:00:00"
        },
        {
            "cpu_temperature": 45.6267,
            "cpu_usage": 1.34,
            "ram_usage": 34.7,
            "system_load": 0.375,
            "network_sent_bytes": 156616195648,
            "network_recv_bytes": 14089290283,
            "timestamp": "2025-03-07T18:01:00"
        },
        {
            "cpu_temperature": 45.7233,
            "cpu_usage": 1.15833,
            "ram_usage": 34.2,
            "system_load": 0.135742,
            "network_sent_bytes": 156616526566,
            "network_recv_bytes": 14089818697,
            "timestamp": "2025-03-07T18:02:00"
        },
        {
            "cpu_temperature": 45.6483,
            "cpu_usage": 1.08,
            "ram_usage": 34.7,
            "system_load": 0.179199,
            "network_sent_bytes": 156616854429,
            "network_recv_bytes": 14090345023,
            "timestamp": "2025-03-07T18:03:00"
        },
        {
            "cpu_temperature": 45.5783,
            "cpu_usage": 1.25167,
            "ram_usage": 34.3,
            "system_load": 0.143555,
            "network_sent_bytes": 156617197632,
            "network_recv_bytes": 14090882396,
            "timestamp": "2025-03-07T18:04:00"
        },
        {
            "cpu_temperature": 45.41,
            "cpu_usage": 1.14,
            "ram_usage": 34.7,
            "system_load": 0.0893555,
            "network_sent_bytes": 156617531138,
            "network_recv_bytes": 14091419863,
            "timestamp": "2025-03-07T18:05:00"
        },
        {
            "cpu_temperature": 45.245,
            "cpu_usage": 1.19167,
            "ram_usage": 34.3,
            "system_load": 0.193848,
            "network_sent_bytes": 156617862543,
            "network_recv_bytes": 14091949422,
            "timestamp": "2025-03-07T18:06:00"
        },
        {
            "cpu_temperature": 45.3983,
            "cpu_usage": 1.195,
            "ram_usage": 34.7,
            "system_load": 0.237793,
            "network_sent_bytes": 156618194107,
            "network_recv_bytes": 14092474404,
            "timestamp": "2025-03-07T18:07:00"
        },
        {
            "cpu_temperature": 45.615,
            "cpu_usage": 1.21333,
            "ram_usage": 34.3,
            "system_load": 0.224121,
            "network_sent_bytes": 156618505251,
            "network_recv_bytes": 14092967651,
            "timestamp": "2025-03-07T18:08:00"
        },
        {
            "cpu_temperature": 45.375,
            "cpu_usage": 1.24167,
            "ram_usage": 34.7,
            "system_load": 0.310547,
            "network_sent_bytes": 156618842543,
            "network_recv_bytes": 14093499973,
            "timestamp": "2025-03-07T18:09:00"
        },
        {
            "cpu_temperature": 45.3833,
            "cpu_usage": 1.17667,
            "ram_usage": 34.3,
            "system_load": 0.112305,
            "network_sent_bytes": 156619146542,
            "network_recv_bytes": 14093980569,
            "timestamp": "2025-03-07T18:10:00"
        },
        {
            "cpu_temperature": 45.5333,
            "cpu_usage": 1.145,
            "ram_usage": 34.7,
            "system_load": 0.171387,
            "network_sent_bytes": 156619460461,
            "network_recv_bytes": 14094479681,
            "timestamp": "2025-03-07T18:11:00"
        },
        {
            "cpu_temperature": 45.45,
            "cpu_usage": 1.18667,
            "ram_usage": 34.5,
            "system_load": 0.141113,
            "network_sent_bytes": 156619783569,
            "network_recv_bytes": 14094982181,
            "timestamp": "2025-03-07T18:12:00"
        },
        {
            "cpu_temperature": 45.5417,
            "cpu_usage": 1.18833,
            "ram_usage": 34.7,
            "system_load": 0.0844727,
            "network_sent_bytes": 156620093970,
            "network_recv_bytes": 14095472053,
            "timestamp": "2025-03-07T18:13:00"
        },
        {
            "cpu_temperature": 45.5683,
            "cpu_usage": 1.30833,
            "ram_usage": 34.5,
            "system_load": 0.280273,
            "network_sent_bytes": 156620409207,
            "network_recv_bytes": 14095964303,
            "timestamp": "2025-03-07T18:14:00"
        },
        {
            "cpu_temperature": 45.385,
            "cpu_usage": 1.335,
            "ram_usage": 34.8,
            "system_load": 0.133301,
            "network_sent_bytes": 156620737843,
            "network_recv_bytes": 14096469291,
            "timestamp": "2025-03-07T18:15:00"
        },
        {
            "cpu_temperature": 45.52,
            "cpu_usage": 1.37,
            "ram_usage": 34.7,
            "system_load": 0.243164,
            "network_sent_bytes": 156621098467,
            "network_recv_bytes": 14097007645,
            "timestamp": "2025-03-07T18:16:00"
        },
        {
            "cpu_temperature": 45.3617,
            "cpu_usage": 1.25833,
            "ram_usage": 34.8,
            "system_load": 0.236816,
            "network_sent_bytes": 156621405788,
            "network_recv_bytes": 14097489769,
            "timestamp": "2025-03-07T18:17:00"
        },
        {
            "cpu_temperature": 45.48,
            "cpu_usage": 1.32333,
            "ram_usage": 34.8,
            "system_load": 0.296387,
            "network_sent_bytes": 156621703505,
            "network_recv_bytes": 14097957239,
            "timestamp": "2025-03-07T18:18:00"
        },
        {
            "cpu_temperature": 45.5817,
            "cpu_usage": 1.32333,
            "ram_usage": 34.7,
            "system_load": 0.239258,
            "network_sent_bytes": 156622007633,
            "network_recv_bytes": 14098422902,
            "timestamp": "2025-03-07T18:19:00"
        },
        {
            "cpu_temperature": 45.5617,
            "cpu_usage": 1.38333,
            "ram_usage": 34.8,
            "system_load": 0.165039,
            "network_sent_bytes": 156622306702,
            "network_recv_bytes": 14098884283,
            "timestamp": "2025-03-07T18:20:00"
        },
        {
            "cpu_temperature": 45.5567,
            "cpu_usage": 1.33667,
            "ram_usage": 34.7,
            "system_load": 0.139648,
            "network_sent_bytes": 156622605275,
            "network_recv_bytes": 14099349552,
            "timestamp": "2025-03-07T18:21:00"
        },
        {
            "cpu_temperature": 45.365,
            "cpu_usage": 1.32333,
            "ram_usage": 34.6,
            "system_load": 0.291992,
            "network_sent_bytes": 156622904398,
            "network_recv_bytes": 14099808607,
            "timestamp": "2025-03-07T18:22:00"
        },
        {
            "cpu_temperature": 45.2083,
            "cpu_usage": 1.33833,
            "ram_usage": 34.7,
            "system_load": 0.218262,
            "network_sent_bytes": 156623191888,
            "network_recv_bytes": 14100255897,
            "timestamp": "2025-03-07T18:23:00"
        },
        {
            "cpu_temperature": 45.1933,
            "cpu_usage": 1.35667,
            "ram_usage": 34.7,
            "system_load": 0.29248,
            "network_sent_bytes": 156623486178,
            "network_recv_bytes": 14100724964,
            "timestamp": "2025-03-07T18:24:00"
        },
        {
            "cpu_temperature": 45.2367,
            "cpu_usage": 1.19667,
            "ram_usage": 34.4,
            "system_load": 0.254883,
            "network_sent_bytes": 156623777095,
            "network_recv_bytes": 14101175541,
            "timestamp": "2025-03-07T18:25:00"
        },
        {
            "cpu_temperature": 45.315,
            "cpu_usage": 1.24167,
            "ram_usage": 34.7,
            "system_load": 0.171875,
            "network_sent_bytes": 156624104440,
            "network_recv_bytes": 14101667487,
            "timestamp": "2025-03-07T18:26:00"
        },
        {
            "cpu_temperature": 45.2767,
            "cpu_usage": 1.26333,
            "ram_usage": 34.3,
            "system_load": 0.192871,
            "network_sent_bytes": 156624442093,
            "network_recv_bytes": 14102167413,
            "timestamp": "2025-03-07T18:27:00"
        },
        {
            "cpu_temperature": 45.355,
            "cpu_usage": 1.25167,
            "ram_usage": 34.7,
            "system_load": 0.229492,
            "network_sent_bytes": 156625058998,
            "network_recv_bytes": 14103090073,
            "timestamp": "2025-03-07T18:28:00"
        },
        {
            "cpu_temperature": 45.41,
            "cpu_usage": 1.30167,
            "ram_usage": 34.3,
            "system_load": 0.0825195,
            "network_sent_bytes": 156625447222,
            "network_recv_bytes": 14103609899,
            "timestamp": "2025-03-07T18:29:00"
        },
        {
            "cpu_temperature": 45.47,
            "cpu_usage": 1.245,
            "ram_usage": 34.8,
            "system_load": 0.229004,
            "network_sent_bytes": 156625867941,
            "network_recv_bytes": 14104141072,
            "timestamp": "2025-03-07T18:30:00"
        },
        {
            "cpu_temperature": 45.46,
            "cpu_usage": 1.31167,
            "ram_usage": 34.7,
            "system_load": 0.194336,
            "network_sent_bytes": 156626808170,
            "network_recv_bytes": 14104963332,
            "timestamp": "2025-03-07T18:31:00"
        },
        {
            "cpu_temperature": 45.2267,
            "cpu_usage": 1.27833,
            "ram_usage": 34.7,
            "system_load": 0.150391,
            "network_sent_bytes": 156627105225,
            "network_recv_bytes": 14105420503,
            "timestamp": "2025-03-07T18:32:00"
        },
        {
            "cpu_temperature": 45.3417,
            "cpu_usage": 1.25,
            "ram_usage": 34.7,
            "system_load": 0.363281,
            "network_sent_bytes": 156627409498,
            "network_recv_bytes": 14105885354,
            "timestamp": "2025-03-07T18:33:00"
        },
        {
            "cpu_temperature": 48.2117,
            "cpu_usage": 21.8133,
            "ram_usage": 34.7,
            "system_load": 0.67334,
            "network_sent_bytes": 156631227333,
            "network_recv_bytes": 14110131057,
            "timestamp": "2025-03-07T18:34:00"
        },
        {
            "cpu_temperature": 48.5383,
            "cpu_usage": 6.92333,
            "ram_usage": 35,
            "system_load": 0.529785,
            "network_sent_bytes": 156632578882,
            "network_recv_bytes": 14111882484,
            "timestamp": "2025-03-07T18:35:00"
        },
        {
            "cpu_temperature": 48.3067,
            "cpu_usage": 5.35167,
            "ram_usage": 34.6,
            "system_load": 0.472168,
            "network_sent_bytes": 156634452643,
            "network_recv_bytes": 14113523821,
            "timestamp": "2025-03-07T18:36:00"
        },
        {
            "cpu_temperature": 46.9317,
            "cpu_usage": 1.42833,
            "ram_usage": 35,
            "system_load": 0.187012,
            "network_sent_bytes": 156635864075,
            "network_recv_bytes": 14114760341,
            "timestamp": "2025-03-07T18:37:00"
        },
        {
            "cpu_temperature": 0,
            "cpu_usage": 0,
            "ram_usage": 0,
            "system_load": 0,
            "network_sent_bytes": 156635864075,
            "network_recv_bytes": 14114760341,
            "timestamp": "2025-03-07T18:38:00"
        },
        {
            "cpu_temperature": 50.1367,
            "cpu_usage": 18.5733,
            "ram_usage": 34.9,
            "system_load": 0.938965,
            "network_sent_bytes": 156639984207,
            "network_recv_bytes": 14119388740,
            "timestamp": "2025-03-07T18:39:00"
        },
        {
            "cpu_temperature": 47.2983,
            "cpu_usage": 1.395,
            "ram_usage": 34.9,
            "system_load": 0.503418,
            "network_sent_bytes": 156640363834,
            "network_recv_bytes": 14119968309,
            "timestamp": "2025-03-07T18:40:00"
        },
        {
            "cpu_temperature": 47.7167,
            "cpu_usage": 9.89833,
            "ram_usage": 28,
            "system_load": 0.995605,
            "network_sent_bytes": 156641074508,
            "network_recv_bytes": 14118866156,
            "timestamp": "2025-03-07T18:41:00"
        },
        {
            "cpu_temperature": 49.6583,
            "cpu_usage": 14.285,
            "ram_usage": 34.8,
            "system_load": 0.691406,
            "network_sent_bytes": 156644636982,
            "network_recv_bytes": 14124786018,
            "timestamp": "2025-03-07T18:42:00"
        },
        {
            "cpu_temperature": 47.6717,
            "cpu_usage": 4.01333,
            "ram_usage": 34.9,
            "system_load": 0.463867,
            "network_sent_bytes": 156645431945,
            "network_recv_bytes": 14125829023,
            "timestamp": "2025-03-07T18:43:00"
        },
        {
            "cpu_temperature": 47.81,
            "cpu_usage": 4.16333,
            "ram_usage": 34.9,
            "system_load": 0.373535,
            "network_sent_bytes": 156646244562,
            "network_recv_bytes": 14126903906,
            "timestamp": "2025-03-07T18:44:00"
        },
        {
            "cpu_temperature": 47.0567,
            "cpu_usage": 1.37333,
            "ram_usage": 34.9,
            "system_load": 0.212891,
            "network_sent_bytes": 156646982647,
            "network_recv_bytes": 14127743213,
            "timestamp": "2025-03-07T18:45:00"
        },
        {
            "cpu_temperature": 46.725,
            "cpu_usage": 1.31667,
            "ram_usage": 34.9,
            "system_load": 0.296387,
            "network_sent_bytes": 156647741640,
            "network_recv_bytes": 14128611929,
            "timestamp": "2025-03-07T18:46:00"
        },
        {
            "cpu_temperature": 46.5833,
            "cpu_usage": 1.36,
            "ram_usage": 34.9,
            "system_load": 0.260254,
            "network_sent_bytes": 156648146031,
            "network_recv_bytes": 14129257265,
            "timestamp": "2025-03-07T18:47:00"
        },
        {
            "cpu_temperature": 46.6917,
            "cpu_usage": 1.42667,
            "ram_usage": 34.9,
            "system_load": 0.102051,
            "network_sent_bytes": 156648858675,
            "network_recv_bytes": 14130147956,
            "timestamp": "2025-03-07T18:48:00"
        },
        {
            "cpu_temperature": 46.575,
            "cpu_usage": 1.44833,
            "ram_usage": 34.9,
            "system_load": 0.330078,
            "network_sent_bytes": 156649699320,
            "network_recv_bytes": 14131035041,
            "timestamp": "2025-03-07T18:49:00"
        },
        {
            "cpu_temperature": 46.5183,
            "cpu_usage": 1.30333,
            "ram_usage": 35,
            "system_load": 0.151367,
            "network_sent_bytes": 156650419404,
            "network_recv_bytes": 14131856549,
            "timestamp": "2025-03-07T18:50:00"
        },
        {
            "cpu_temperature": 46.1867,
            "cpu_usage": 1.46,
            "ram_usage": 34.9,
            "system_load": 0.229492,
            "network_sent_bytes": 156651128052,
            "network_recv_bytes": 14132672165,
            "timestamp": "2025-03-07T18:51:00"
        },
        {
            "cpu_temperature": 46.2767,
            "cpu_usage": 1.26167,
            "ram_usage": 34.4,
            "system_load": 0.236328,
            "network_sent_bytes": 156651981177,
            "network_recv_bytes": 14133570080,
            "timestamp": "2025-03-07T18:52:00"
        },
        {
            "cpu_temperature": 46.175,
            "cpu_usage": 1.29333,
            "ram_usage": 34.9,
            "system_load": 0.152832,
            "network_sent_bytes": 156652832779,
            "network_recv_bytes": 14134474345,
            "timestamp": "2025-03-07T18:53:00"
        },
        {
            "cpu_temperature": 46.21,
            "cpu_usage": 1.255,
            "ram_usage": 34.5,
            "system_load": 0.304199,
            "network_sent_bytes": 156653544904,
            "network_recv_bytes": 14135285109,
            "timestamp": "2025-03-07T18:54:00"
        },
        {
            "cpu_temperature": 46.0383,
            "cpu_usage": 1.37,
            "ram_usage": 34.9,
            "system_load": 0.21875,
            "network_sent_bytes": 156654254509,
            "network_recv_bytes": 14136099695,
            "timestamp": "2025-03-07T18:55:00"
        },
        {
            "cpu_temperature": 48.8083,
            "cpu_usage": 20.555,
            "ram_usage": 34.4,
            "system_load": 0.978027,
            "network_sent_bytes": 156657544071,
            "network_recv_bytes": 14139717503,
            "timestamp": "2025-03-07T18:56:00"
        },
        {
            "cpu_temperature": 47.995,
            "cpu_usage": 1.17833,
            "ram_usage": 34.8,
            "system_load": 0.600586,
            "network_sent_bytes": 156657892158,
            "network_recv_bytes": 14140264470,
            "timestamp": "2025-03-07T18:57:00"
        },
        {
            "cpu_temperature": 46.8733,
            "cpu_usage": 1.21667,
            "ram_usage": 34.4,
            "system_load": 0.21875,
            "network_sent_bytes": 156658232528,
            "network_recv_bytes": 14140803481,
            "timestamp": "2025-03-07T18:58:00"
        },
        {
            "cpu_temperature": 46.46,
            "cpu_usage": 1.18333,
            "ram_usage": 34.8,
            "system_load": 0.290527,
            "network_sent_bytes": 156658569992,
            "network_recv_bytes": 14141339952,
            "timestamp": "2025-03-07T18:59:00"
        },
        {
            "cpu_temperature": 46.235,
            "cpu_usage": 1.33333,
            "ram_usage": 34.5,
            "system_load": 0.265137,
            "network_sent_bytes": 156658912544,
            "network_recv_bytes": 14141881599,
            "timestamp": "2025-03-07T19:00:00"
        },
        {
            "cpu_temperature": 46.035,
            "cpu_usage": 1.37167,
            "ram_usage": 34.8,
            "system_load": 0.0952148,
            "network_sent_bytes": 156659302017,
            "network_recv_bytes": 14142474442,
            "timestamp": "2025-03-07T19:01:00"
        },
        {
            "cpu_temperature": 46.0767,
            "cpu_usage": 1.52833,
            "ram_usage": 34.7,
            "system_load": 0.290039,
            "network_sent_bytes": 156660289228,
            "network_recv_bytes": 14143382491,
            "timestamp": "2025-03-07T19:02:00"
        },
        {
            "cpu_temperature": 46.03,
            "cpu_usage": 1.355,
            "ram_usage": 34.7,
            "system_load": 0.212891,
            "network_sent_bytes": 156660949624,
            "network_recv_bytes": 14144105956,
            "timestamp": "2025-03-07T19:03:00"
        },
        {
            "cpu_temperature": 46.0117,
            "cpu_usage": 1.47,
            "ram_usage": 34.8,
            "system_load": 0.0766602,
            "network_sent_bytes": 156661949233,
            "network_recv_bytes": 14145021552,
            "timestamp": "2025-03-07T19:04:00"
        },
        {
            "cpu_temperature": 45.8867,
            "cpu_usage": 1.38833,
            "ram_usage": 34.8,
            "system_load": 0.323242,
            "network_sent_bytes": 156662281940,
            "network_recv_bytes": 14145553303,
            "timestamp": "2025-03-07T19:05:00"
        },
        {
            "cpu_temperature": 45.9617,
            "cpu_usage": 1.34833,
            "ram_usage": 34.7,
            "system_load": 0.169922,
            "network_sent_bytes": 156663256354,
            "network_recv_bytes": 14146443660,
            "timestamp": "2025-03-07T19:06:00"
        },
        {
            "cpu_temperature": 0,
            "cpu_usage": 0,
            "ram_usage": 0,
            "system_load": 0,
            "network_sent_bytes": 156663256354,
            "network_recv_bytes": 14146443660,
            "timestamp": "2025-03-07T19:07:00"
        },
        {
            "cpu_temperature": 49.045,
            "cpu_usage": 17.5767,
            "ram_usage": 34.8,
            "system_load": 0.819824,
            "network_sent_bytes": 156665360766,
            "network_recv_bytes": 14146692486,
            "timestamp": "2025-03-07T19:08:00"
        },
        {
            "cpu_temperature": 47.2267,
            "cpu_usage": 4.39167,
            "ram_usage": 34.8,
            "system_load": 0.379395,
            "network_sent_bytes": 156666170024,
            "network_recv_bytes": 14147749516,
            "timestamp": "2025-03-07T19:09:00"
        },
        {
            "cpu_temperature": 47.535,
            "cpu_usage": 6.495,
            "ram_usage": 34.8,
            "system_load": 0.512695,
            "network_sent_bytes": 156669694441,
            "network_recv_bytes": 14153656888,
            "timestamp": "2025-03-07T19:10:00"
        },
        {
            "cpu_temperature": 47.305,
            "cpu_usage": 2.74833,
            "ram_usage": 34.8,
            "system_load": 0.221191,
            "network_sent_bytes": 156670334881,
            "network_recv_bytes": 14154563347,
            "timestamp": "2025-03-07T19:11:00"
        },
        {
            "cpu_temperature": 47.5617,
            "cpu_usage": 7.42333,
            "ram_usage": 35,
            "system_load": 0.716309,
            "network_sent_bytes": 156673960574,
            "network_recv_bytes": 14160543285,
            "timestamp": "2025-03-07T19:12:00"
        },
        {
            "cpu_temperature": 47.1167,
            "cpu_usage": 1.62833,
            "ram_usage": 35,
            "system_load": 0.518555,
            "network_sent_bytes": 156674677902,
            "network_recv_bytes": 14161474507,
            "timestamp": "2025-03-07T19:13:00"
        },
        {
            "cpu_temperature": 46.9417,
            "cpu_usage": 1.405,
            "ram_usage": 34.6,
            "system_load": 0.223145,
            "network_sent_bytes": 156675065976,
            "network_recv_bytes": 14162066182,
            "timestamp": "2025-03-07T19:14:00"
        },
        {
            "cpu_temperature": 46.6767,
            "cpu_usage": 1.74,
            "ram_usage": 35.1,
            "system_load": 0.223145,
            "network_sent_bytes": 156675512517,
            "network_recv_bytes": 14162728806,
            "timestamp": "2025-03-07T19:15:00"
        },
        {
            "cpu_temperature": 0,
            "cpu_usage": 0,
            "ram_usage": 0,
            "system_load": 0,
            "network_sent_bytes": 156675512517,
            "network_recv_bytes": 14162728806,
            "timestamp": "2025-03-07T19:16:00"
        },
        {
            "cpu_temperature": 49.265,
            "cpu_usage": 15.7383,
            "ram_usage": 34.5,
            "system_load": 0.352539,
            "network_sent_bytes": 156675312619,
            "network_recv_bytes": 14159032885,
            "timestamp": "2025-03-07T19:17:00"
        },
        {
            "cpu_temperature": 47.3167,
            "cpu_usage": 2.07667,
            "ram_usage": 34.6,
            "system_load": 0.304199,
            "network_sent_bytes": 156675750205,
            "network_recv_bytes": 14159651233,
            "timestamp": "2025-03-07T19:18:00"
        },
        {
            "cpu_temperature": 46.8583,
            "cpu_usage": 2.14833,
            "ram_usage": 34.7,
            "system_load": 0.260254,
            "network_sent_bytes": 156676202795,
            "network_recv_bytes": 14160285508,
            "timestamp": "2025-03-07T19:19:00"
        },
        {
            "cpu_temperature": 46.35,
            "cpu_usage": 1.46333,
            "ram_usage": 34.7,
            "system_load": 0.09375,
            "network_sent_bytes": 156676522875,
            "network_recv_bytes": 14160789096,
            "timestamp": "2025-03-07T19:20:00"
        },
        {
            "cpu_temperature": 46.2283,
            "cpu_usage": 1.36,
            "ram_usage": 34.7,
            "system_load": 0.227539,
            "network_sent_bytes": 156676932338,
            "network_recv_bytes": 14161382595,
            "timestamp": "2025-03-07T19:21:00"
        },
        {
            "cpu_temperature": 48.4867,
            "cpu_usage": 16.3817,
            "ram_usage": 34.2,
            "system_load": 0.532715,
            "network_sent_bytes": 156677795773,
            "network_recv_bytes": 14162611097,
            "timestamp": "2025-03-07T19:22:00"
        },
        {
            "cpu_temperature": 47.3717,
            "cpu_usage": 1.405,
            "ram_usage": 34.4,
            "system_load": 0.337402,
            "network_sent_bytes": 156678780483,
            "network_recv_bytes": 14163502417,
            "timestamp": "2025-03-07T19:23:00"
        },
        {
            "cpu_temperature": 46.4767,
            "cpu_usage": 1.53667,
            "ram_usage": 34.5,
            "system_load": 0.276855,
            "network_sent_bytes": 156679442670,
            "network_recv_bytes": 14164224645,
            "timestamp": "2025-03-07T19:24:00"
        },
        {
            "cpu_temperature": 0,
            "cpu_usage": 0,
            "ram_usage": 0,
            "system_load": 0,
            "network_sent_bytes": 156679442670,
            "network_recv_bytes": 14164224645,
            "timestamp": "2025-03-07T19:25:00"
        },
        {
            "cpu_temperature": 49.8767,
            "cpu_usage": 20.6667,
            "ram_usage": 34.8,
            "system_load": 0.550293,
            "network_sent_bytes": 156684251489,
            "network_recv_bytes": 14171037781,
            "timestamp": "2025-03-07T19:26:00"
        },
        {
            "cpu_temperature": 48.575,
            "cpu_usage": 4.21167,
            "ram_usage": 34.8,
            "system_load": 0.30957,
            "network_sent_bytes": 156685105224,
            "network_recv_bytes": 14172131923,
            "timestamp": "2025-03-07T19:27:00"
        },
        {
            "cpu_temperature": 49.065,
            "cpu_usage": 12.6317,
            "ram_usage": 35.1,
            "system_load": 0.741211,
            "network_sent_bytes": 156691701571,
            "network_recv_bytes": 14183159263,
            "timestamp": "2025-03-07T19:28:00"
        },
        {
            "cpu_temperature": 0,
            "cpu_usage": 0,
            "ram_usage": 0,
            "system_load": 0,
            "network_sent_bytes": 156691701571,
            "network_recv_bytes": 14183159263,
            "timestamp": "2025-03-07T19:29:00"
        },
        {
            "cpu_temperature": 50.36,
            "cpu_usage": 17.9533,
            "ram_usage": 34.8,
            "system_load": 0.726562,
            "network_sent_bytes": 156694156124,
            "network_recv_bytes": 14182081181,
            "timestamp": "2025-03-07T19:30:00"
        },
        {
            "cpu_temperature": 0,
            "cpu_usage": 0,
            "ram_usage": 0,
            "system_load": 0,
            "network_sent_bytes": 156694156124,
            "network_recv_bytes": 14182081181,
            "timestamp": "2025-03-07T19:31:00"
        },
        {
            "cpu_temperature": 49.87,
            "cpu_usage": 14.09,
            "ram_usage": 34,
            "system_load": 0.615234,
            "network_sent_bytes": 156695290001,
            "network_recv_bytes": 14181990378,
            "timestamp": "2025-03-07T19:32:00"
        },
        {
            "cpu_temperature": 47.3867,
            "cpu_usage": 1.16667,
            "ram_usage": 34.4,
            "system_load": 0.311035,
            "network_sent_bytes": 156695637733,
            "network_recv_bytes": 14182539147,
            "timestamp": "2025-03-07T19:33:00"
        },
        {
            "cpu_temperature": 48.1467,
            "cpu_usage": 7.62333,
            "ram_usage": 34.8,
            "system_load": 0.112305,
            "network_sent_bytes": 156698771648,
            "network_recv_bytes": 14187648510,
            "timestamp": "2025-03-07T19:34:00"
        },
        {
            "cpu_temperature": 47.125,
            "cpu_usage": 1.205,
            "ram_usage": 34.8,
            "system_load": 0.21582,
            "network_sent_bytes": 156699145376,
            "network_recv_bytes": 14188252858,
            "timestamp": "2025-03-07T19:35:00"
        },
        {
            "cpu_temperature": 47.35,
            "cpu_usage": 4.92,
            "ram_usage": 34.7,
            "system_load": 0.549316,
            "network_sent_bytes": 156701805298,
            "network_recv_bytes": 14192759366,
            "timestamp": "2025-03-07T19:36:00"
        },
        {
            "cpu_temperature": 46.9167,
            "cpu_usage": 1.19667,
            "ram_usage": 35,
            "system_load": 0.200195,
            "network_sent_bytes": 156702184704,
            "network_recv_bytes": 14193361301,
            "timestamp": "2025-03-07T19:37:00"
        },
        {
            "cpu_temperature": 47.9717,
            "cpu_usage": 9.35167,
            "ram_usage": 34.7,
            "system_load": 0.460449,
            "network_sent_bytes": 156705651473,
            "network_recv_bytes": 14198881475,
            "timestamp": "2025-03-07T19:38:00"
        },
        {
            "cpu_temperature": 49.75,
            "cpu_usage": 19.87,
            "ram_usage": 34.5,
            "system_load": 0.845703,
            "network_sent_bytes": 156706527375,
            "network_recv_bytes": 14195187674,
            "timestamp": "2025-03-07T19:39:00"
        },
        {
            "cpu_temperature": 49.4567,
            "cpu_usage": 5.10333,
            "ram_usage": 34.6,
            "system_load": 0.525879,
            "network_sent_bytes": 156709535762,
            "network_recv_bytes": 14200317174,
            "timestamp": "2025-03-07T19:40:00"
        },
        {
            "cpu_temperature": 47.8383,
            "cpu_usage": 2.915,
            "ram_usage": 34.8,
            "system_load": 0.27832,
            "network_sent_bytes": 156710252326,
            "network_recv_bytes": 14201362911,
            "timestamp": "2025-03-07T19:41:00"
        },
        {
            "cpu_temperature": 47.76,
            "cpu_usage": 4.125,
            "ram_usage": 34.9,
            "system_load": 0.600586,
            "network_sent_bytes": 156711040502,
            "network_recv_bytes": 14202391575,
            "timestamp": "2025-03-07T19:42:00"
        },
        {
            "cpu_temperature": 47.2167,
            "cpu_usage": 1.495,
            "ram_usage": 34.9,
            "system_load": 0.476562,
            "network_sent_bytes": 156711452373,
            "network_recv_bytes": 14203036130,
            "timestamp": "2025-03-07T19:43:00"
        },
        {
            "cpu_temperature": 47.4817,
            "cpu_usage": 5.01833,
            "ram_usage": 34.9,
            "system_load": 0.208008,
            "network_sent_bytes": 156714303695,
            "network_recv_bytes": 14207845051,
            "timestamp": "2025-03-07T19:44:00"
        },
        {
            "cpu_temperature": 48.6817,
            "cpu_usage": 10.3217,
            "ram_usage": 35.1,
            "system_load": 0.180664,
            "network_sent_bytes": 156720032906,
            "network_recv_bytes": 14217491766,
            "timestamp": "2025-03-07T19:45:00"
        },
        {
            "cpu_temperature": 48.0833,
            "cpu_usage": 5.72833,
            "ram_usage": 35.1,
            "system_load": 0.259277,
            "network_sent_bytes": 156721375396,
            "network_recv_bytes": 14219330385,
            "timestamp": "2025-03-07T19:46:00"
        },
        {
            "cpu_temperature": 48.1667,
            "cpu_usage": 3.67167,
            "ram_usage": 34.7,
            "system_load": 0.131836,
            "network_sent_bytes": 156722145081,
            "network_recv_bytes": 14220342963,
            "timestamp": "2025-03-07T19:47:00"
        },
        {
            "cpu_temperature": 47.975,
            "cpu_usage": 8.30833,
            "ram_usage": 35.1,
            "system_load": 0.807617,
            "network_sent_bytes": 156723566343,
            "network_recv_bytes": 14222052520,
            "timestamp": "2025-03-07T19:48:00"
        },
        {
            "cpu_temperature": 47.3817,
            "cpu_usage": 2.85667,
            "ram_usage": 34.7,
            "system_load": 0.836914,
            "network_sent_bytes": 156724228042,
            "network_recv_bytes": 14223005871,
            "timestamp": "2025-03-07T19:49:00"
        },
        {
            "cpu_temperature": 47.625,
            "cpu_usage": 3.985,
            "ram_usage": 35.1,
            "system_load": 0.440918,
            "network_sent_bytes": 156725104772,
            "network_recv_bytes": 14224217322,
            "timestamp": "2025-03-07T19:50:00"
        },
        {
            "cpu_temperature": 47.7433,
            "cpu_usage": 6.805,
            "ram_usage": 34.8,
            "system_load": 0.295898,
            "network_sent_bytes": 156726457344,
            "network_recv_bytes": 14225939229,
            "timestamp": "2025-03-07T19:51:00"
        },
        {
            "cpu_temperature": 47.4783,
            "cpu_usage": 4.00333,
            "ram_usage": 35.2,
            "system_load": 0.332031,
            "network_sent_bytes": 156727379018,
            "network_recv_bytes": 14227219379,
            "timestamp": "2025-03-07T19:52:00"
        },
        {
            "cpu_temperature": 47.205,
            "cpu_usage": 2.64833,
            "ram_usage": 34.8,
            "system_load": 0.554199,
            "network_sent_bytes": 156728096612,
            "network_recv_bytes": 14228291830,
            "timestamp": "2025-03-07T19:53:00"
        },
        {
            "cpu_temperature": 47.0167,
            "cpu_usage": 2.715,
            "ram_usage": 35.1,
            "system_load": 0.20166,
            "network_sent_bytes": 156728804547,
            "network_recv_bytes": 14229352525,
            "timestamp": "2025-03-07T19:54:00"
        },
        {
            "cpu_temperature": 47.12,
            "cpu_usage": 3.98833,
            "ram_usage": 34.8,
            "system_load": 0.298828,
            "network_sent_bytes": 156729699524,
            "network_recv_bytes": 14230587696,
            "timestamp": "2025-03-07T19:55:00"
        },
        {
            "cpu_temperature": 47.4467,
            "cpu_usage": 6.245,
            "ram_usage": 35.2,
            "system_load": 0.241211,
            "network_sent_bytes": 156731006582,
            "network_recv_bytes": 14232276849,
            "timestamp": "2025-03-07T19:56:00"
        },
        {
            "cpu_temperature": 47.8483,
            "cpu_usage": 8.22167,
            "ram_usage": 35,
            "system_load": 1.24658,
            "network_sent_bytes": 156732474623,
            "network_recv_bytes": 14234117208,
            "timestamp": "2025-03-07T19:57:00"
        },
        {
            "cpu_temperature": 47.345,
            "cpu_usage": 1.31667,
            "ram_usage": 35.1,
            "system_load": 0.493164,
            "network_sent_bytes": 156732963285,
            "network_recv_bytes": 14234936108,
            "timestamp": "2025-03-07T19:58:00"
        },
        {
            "cpu_temperature": 46.575,
            "cpu_usage": 1.37333,
            "ram_usage": 35,
            "system_load": 0.345215,
            "network_sent_bytes": 156733438847,
            "network_recv_bytes": 14235739362,
            "timestamp": "2025-03-07T19:59:00"
        },
        {
            "cpu_temperature": 46.3833,
            "cpu_usage": 1.58833,
            "ram_usage": 35.3,
            "system_load": 0.30127,
            "network_sent_bytes": 156733933684,
            "network_recv_bytes": 14236559500,
            "timestamp": "2025-03-07T20:00:00"
        },
        {
            "cpu_temperature": 46.12,
            "cpu_usage": 1.50667,
            "ram_usage": 35.1,
            "system_load": 0.108398,
            "network_sent_bytes": 156734412137,
            "network_recv_bytes": 14237364664,
            "timestamp": "2025-03-07T20:01:00"
        },
        {
            "cpu_temperature": 46.0467,
            "cpu_usage": 1.39167,
            "ram_usage": 35.1,
            "system_load": 0.0385742,
            "network_sent_bytes": 156734878414,
            "network_recv_bytes": 14238149663,
            "timestamp": "2025-03-07T20:02:00"
        },
        {
            "cpu_temperature": 45.89,
            "cpu_usage": 1.375,
            "ram_usage": 35.1,
            "system_load": 0.13916,
            "network_sent_bytes": 156735352543,
            "network_recv_bytes": 14238941474,
            "timestamp": "2025-03-07T20:03:00"
        },
        {
            "cpu_temperature": 45.8633,
            "cpu_usage": 1.37,
            "ram_usage": 35.1,
            "system_load": 0.0498047,
            "network_sent_bytes": 156735821378,
            "network_recv_bytes": 14239720978,
            "timestamp": "2025-03-07T20:04:00"
        },
        {
            "cpu_temperature": 45.8467,
            "cpu_usage": 1.385,
            "ram_usage": 35.2,
            "system_load": 0.319824,
            "network_sent_bytes": 156736280645,
            "network_recv_bytes": 14240492615,
            "timestamp": "2025-03-07T20:05:00"
        },
        {
            "cpu_temperature": 45.8867,
            "cpu_usage": 2.565,
            "ram_usage": 34.7,
            "system_load": 0.153809,
            "network_sent_bytes": 156736927607,
            "network_recv_bytes": 14241447539,
            "timestamp": "2025-03-07T20:06:00"
        },
        {
            "cpu_temperature": 46.2183,
            "cpu_usage": 2.69,
            "ram_usage": 35.1,
            "system_load": 0.135254,
            "network_sent_bytes": 156737626606,
            "network_recv_bytes": 14242479372,
            "timestamp": "2025-03-07T20:07:00"
        },
        {
            "cpu_temperature": 46.545,
            "cpu_usage": 4.96333,
            "ram_usage": 34.8,
            "system_load": 0.594238,
            "network_sent_bytes": 156738592466,
            "network_recv_bytes": 14243749492,
            "timestamp": "2025-03-07T20:08:00"
        },
        {
            "cpu_temperature": 46.135,
            "cpu_usage": 1.33333,
            "ram_usage": 35.2,
            "system_load": 0.376953,
            "network_sent_bytes": 156739063358,
            "network_recv_bytes": 14244525797,
            "timestamp": "2025-03-07T20:09:00"
        },
        {
            "cpu_temperature": 46.3183,
            "cpu_usage": 3.24167,
            "ram_usage": 34.8,
            "system_load": 0.13623,
            "network_sent_bytes": 156740729853,
            "network_recv_bytes": 14246812080,
            "timestamp": "2025-03-07T20:10:00"
        },
        {
            "cpu_temperature": 47.7667,
            "cpu_usage": 6.06167,
            "ram_usage": 36.3,
            "system_load": 0.348145,
            "network_sent_bytes": 156759871617,
            "network_recv_bytes": 14258120855,
            "timestamp": "2025-03-07T20:11:00"
        },
        {
            "cpu_temperature": 46.8417,
            "cpu_usage": 1.21,
            "ram_usage": 36.1,
            "system_load": 0.442871,
            "network_sent_bytes": 156760266008,
            "network_recv_bytes": 14258766866,
            "timestamp": "2025-03-07T20:12:00"
        },
        {
            "cpu_temperature": 46.4667,
            "cpu_usage": 1.72333,
            "ram_usage": 36.3,
            "system_load": 0.37793,
            "network_sent_bytes": 156760752605,
            "network_recv_bytes": 14259506519,
            "timestamp": "2025-03-07T20:13:00"
        },
        {
            "cpu_temperature": 46.7283,
            "cpu_usage": 3.95333,
            "ram_usage": 36,
            "system_load": 0.322754,
            "network_sent_bytes": 156761567771,
            "network_recv_bytes": 14260575039,
            "timestamp": "2025-03-07T20:14:00"
        },
        {
            "cpu_temperature": 46.925,
            "cpu_usage": 2.11833,
            "ram_usage": 36.4,
            "system_load": 0.155273,
            "network_sent_bytes": 156762137648,
            "network_recv_bytes": 14261425966,
            "timestamp": "2025-03-07T20:15:00"
        },
        {
            "cpu_temperature": 47.5117,
            "cpu_usage": 5.51,
            "ram_usage": 35.8,
            "system_load": 0.536621,
            "network_sent_bytes": 156763164841,
            "network_recv_bytes": 14262727899,
            "timestamp": "2025-03-07T20:16:00"
        },
        {
            "cpu_temperature": 47.0583,
            "cpu_usage": 3.13333,
            "ram_usage": 36.2,
            "system_load": 0.310059,
            "network_sent_bytes": 156763911553,
            "network_recv_bytes": 14263777719,
            "timestamp": "2025-03-07T20:17:00"
        },
        {
            "cpu_temperature": 47.3117,
            "cpu_usage": 4.55,
            "ram_usage": 35.9,
            "system_load": 0.12207,
            "network_sent_bytes": 156766663469,
            "network_recv_bytes": 14268551017,
            "timestamp": "2025-03-07T20:18:00"
        },
        {
            "cpu_temperature": 46.8317,
            "cpu_usage": 1.52,
            "ram_usage": 36.2,
            "system_load": 0.195801,
            "network_sent_bytes": 156767526881,
            "network_recv_bytes": 14269939627,
            "timestamp": "2025-03-07T20:19:00"
        },
        {
            "cpu_temperature": 46.2267,
            "cpu_usage": 1.33,
            "ram_usage": 36.1,
            "system_load": 0.0766602,
            "network_sent_bytes": 156767955088,
            "network_recv_bytes": 14270655160,
            "timestamp": "2025-03-07T20:20:00"
        },
        {
            "cpu_temperature": 47.2267,
            "cpu_usage": 5.98167,
            "ram_usage": 36.4,
            "system_load": 0.81543,
            "network_sent_bytes": 156770285367,
            "network_recv_bytes": 14273786817,
            "timestamp": "2025-03-07T20:21:00"
        },
        {
            "cpu_temperature": 46.78,
            "cpu_usage": 2.68333,
            "ram_usage": 36.2,
            "system_load": 0.548828,
            "network_sent_bytes": 156771131906,
            "network_recv_bytes": 14275071924,
            "timestamp": "2025-03-07T20:22:00"
        },
        {
            "cpu_temperature": 46.5017,
            "cpu_usage": 1.73667,
            "ram_usage": 36.4,
            "system_load": 0.183594,
            "network_sent_bytes": 156771710503,
            "network_recv_bytes": 14275957713,
            "timestamp": "2025-03-07T20:23:00"
        },
        {
            "cpu_temperature": 46.2667,
            "cpu_usage": 1.43333,
            "ram_usage": 36.5,
            "system_load": 0.312012,
            "network_sent_bytes": 156772149364,
            "network_recv_bytes": 14276677724,
            "timestamp": "2025-03-07T20:24:00"
        },
        {
            "cpu_temperature": 46.2283,
            "cpu_usage": 1.48,
            "ram_usage": 36.8,
            "system_load": 0.274414,
            "network_sent_bytes": 156772727407,
            "network_recv_bytes": 14277501978,
            "timestamp": "2025-03-07T20:25:00"
        },
        {
            "cpu_temperature": 45.8783,
            "cpu_usage": 1.24,
            "ram_usage": 36.3,
            "system_load": 0.130859,
            "network_sent_bytes": 156773143862,
            "network_recv_bytes": 14278187356,
            "timestamp": "2025-03-07T20:26:00"
        },
        {
            "cpu_temperature": 45.8217,
            "cpu_usage": 1.18,
            "ram_usage": 36.4,
            "system_load": 0.227539,
            "network_sent_bytes": 156773556169,
            "network_recv_bytes": 14278862295,
            "timestamp": "2025-03-07T20:27:00"
        },
        {
            "cpu_temperature": 45.8533,
            "cpu_usage": 1.205,
            "ram_usage": 36,
            "system_load": 0.163086,
            "network_sent_bytes": 156773963283,
            "network_recv_bytes": 14279514690,
            "timestamp": "2025-03-07T20:28:00"
        },
        {
            "cpu_temperature": 46.0267,
            "cpu_usage": 1.17833,
            "ram_usage": 36.3,
            "system_load": 0.335449,
            "network_sent_bytes": 156774374231,
            "network_recv_bytes": 14280186552,
            "timestamp": "2025-03-07T20:29:00"
        },
        {
            "cpu_temperature": 45.8,
            "cpu_usage": 1.21333,
            "ram_usage": 36.1,
            "system_load": 0.173828,
            "network_sent_bytes": 156774795589,
            "network_recv_bytes": 14280867187,
            "timestamp": "2025-03-07T20:30:00"
        },
        {
            "cpu_temperature": 45.84,
            "cpu_usage": 1.36333,
            "ram_usage": 36.7,
            "system_load": 0.154297,
            "network_sent_bytes": 156775360531,
            "network_recv_bytes": 14281691835,
            "timestamp": "2025-03-07T20:31:00"
        },
        {
            "cpu_temperature": 45.74,
            "cpu_usage": 1.38333,
            "ram_usage": 36.6,
            "system_load": 0.554199,
            "network_sent_bytes": 156775748368,
            "network_recv_bytes": 14282323770,
            "timestamp": "2025-03-07T20:32:00"
        },
        {
            "cpu_temperature": 45.7967,
            "cpu_usage": 1.33833,
            "ram_usage": 36.3,
            "system_load": 0.185059,
            "network_sent_bytes": 156776153608,
            "network_recv_bytes": 14282981365,
            "timestamp": "2025-03-07T20:33:00"
        },
        {
            "cpu_temperature": 45.7517,
            "cpu_usage": 1.46167,
            "ram_usage": 36.3,
            "system_load": 0.117676,
            "network_sent_bytes": 156776551960,
            "network_recv_bytes": 14283630859,
            "timestamp": "2025-03-07T20:34:00"
        },
        {
            "cpu_temperature": 45.51,
            "cpu_usage": 1.44,
            "ram_usage": 36.3,
            "system_load": 0.26416,
            "network_sent_bytes": 156776931928,
            "network_recv_bytes": 14284245427,
            "timestamp": "2025-03-07T20:35:00"
        },
        {
            "cpu_temperature": 45.4917,
            "cpu_usage": 1.315,
            "ram_usage": 36.3,
            "system_load": 0.251953,
            "network_sent_bytes": 156777323293,
            "network_recv_bytes": 14284883051,
            "timestamp": "2025-03-07T20:36:00"
        },
        {
            "cpu_temperature": 45.5683,
            "cpu_usage": 1.26,
            "ram_usage": 36.2,
            "system_load": 0.19043,
            "network_sent_bytes": 156777698325,
            "network_recv_bytes": 14285487786,
            "timestamp": "2025-03-07T20:37:00"
        },
        {
            "cpu_temperature": 45.6283,
            "cpu_usage": 1.28833,
            "ram_usage": 36.2,
            "system_load": 0.222168,
            "network_sent_bytes": 156778087082,
            "network_recv_bytes": 14286116976,
            "timestamp": "2025-03-07T20:38:00"
        },
        {
            "cpu_temperature": 45.4467,
            "cpu_usage": 1.49833,
            "ram_usage": 36.3,
            "system_load": 0.111816,
            "network_sent_bytes": 156778469658,
            "network_recv_bytes": 14286739510,
            "timestamp": "2025-03-07T20:39:00"
        },
        {
            "cpu_temperature": 45.625,
            "cpu_usage": 1.53167,
            "ram_usage": 36.2,
            "system_load": 0.226562,
            "network_sent_bytes": 156780450469,
            "network_recv_bytes": 14297835739,
            "timestamp": "2025-03-07T20:40:00"
        },
        {
            "cpu_temperature": 45.6433,
            "cpu_usage": 1.31667,
            "ram_usage": 36.3,
            "system_load": 0.0810547,
            "network_sent_bytes": 156780832876,
            "network_recv_bytes": 14298449428,
            "timestamp": "2025-03-07T20:41:00"
        },
        {
            "cpu_temperature": 46.145,
            "cpu_usage": 5.35167,
            "ram_usage": 36.2,
            "system_load": 0.549805,
            "network_sent_bytes": 156783736296,
            "network_recv_bytes": 14303379022,
            "timestamp": "2025-03-07T20:42:00"
        },
        {
            "cpu_temperature": 46.7067,
            "cpu_usage": 6.95167,
            "ram_usage": 36.2,
            "system_load": 1.16602,
            "network_sent_bytes": 156784926783,
            "network_recv_bytes": 14304809785,
            "timestamp": "2025-03-07T20:43:00"
        },
        {
            "cpu_temperature": 46.5583,
            "cpu_usage": 2.77833,
            "ram_usage": 36.3,
            "system_load": 0.426758,
            "network_sent_bytes": 156785521086,
            "network_recv_bytes": 14305646548,
            "timestamp": "2025-03-07T20:44:00"
        },
        {
            "cpu_temperature": 47.7383,
            "cpu_usage": 10.6983,
            "ram_usage": 36.4,
            "system_load": 0.818848,
            "network_sent_bytes": 156793684662,
            "network_recv_bytes": 14319482054,
            "timestamp": "2025-03-07T20:45:00"
        },
        {
            "cpu_temperature": 48.0283,
            "cpu_usage": 8.22667,
            "ram_usage": 36.3,
            "system_load": 0.331055,
            "network_sent_bytes": 156795089659,
            "network_recv_bytes": 14321135652,
            "timestamp": "2025-03-07T20:46:00"
        },
        {
            "cpu_temperature": 47.0067,
            "cpu_usage": 2.72667,
            "ram_usage": 36.3,
            "system_load": 0.182617,
            "network_sent_bytes": 156795661122,
            "network_recv_bytes": 14321937365,
            "timestamp": "2025-03-07T20:47:00"
        },
        {
            "cpu_temperature": 46.8417,
            "cpu_usage": 1.88333,
            "ram_usage": 36.3,
            "system_load": 0.325195,
            "network_sent_bytes": 156796260602,
            "network_recv_bytes": 14322863000,
            "timestamp": "2025-03-07T20:48:00"
        },
        {
            "cpu_temperature": 46.9967,
            "cpu_usage": 3.37667,
            "ram_usage": 36.4,
            "system_load": 0.255371,
            "network_sent_bytes": 156797322664,
            "network_recv_bytes": 14324433964,
            "timestamp": "2025-03-07T20:49:00"
        },
        {
            "cpu_temperature": 46.835,
            "cpu_usage": 4.965,
            "ram_usage": 36.4,
            "system_load": 0.341309,
            "network_sent_bytes": 156800298541,
            "network_recv_bytes": 14329490720,
            "timestamp": "2025-03-07T20:50:00"
        },
        {
            "cpu_temperature": 48.52,
            "cpu_usage": 12.3767,
            "ram_usage": 36.6,
            "system_load": 0.675293,
            "network_sent_bytes": 156815191313,
            "network_recv_bytes": 14361951389,
            "timestamp": "2025-03-07T20:51:00"
        },
        {
            "cpu_temperature": 47.49,
            "cpu_usage": 3.26,
            "ram_usage": 36.6,
            "system_load": 0.299316,
            "network_sent_bytes": 156816587453,
            "network_recv_bytes": 14363567779,
            "timestamp": "2025-03-07T20:52:00"
        },
        {
            "cpu_temperature": 46.8167,
            "cpu_usage": 1.24833,
            "ram_usage": 36.7,
            "system_load": 0.175781,
            "network_sent_bytes": 156816757799,
            "network_recv_bytes": 14363729964,
            "timestamp": "2025-03-07T20:53:00"
        },
        {
            "cpu_temperature": 46.625,
            "cpu_usage": 2.56333,
            "ram_usage": 36.8,
            "system_load": 0.325195,
            "network_sent_bytes": 156817052126,
            "network_recv_bytes": 14364028937,
            "timestamp": "2025-03-07T20:54:00"
        },
        {
            "cpu_temperature": 47.655,
            "cpu_usage": 8.31833,
            "ram_usage": 36.5,
            "system_load": 0.484375,
            "network_sent_bytes": 156826064344,
            "network_recv_bytes": 14387242197,
            "timestamp": "2025-03-07T20:55:00"
        },
        {
            "cpu_temperature": 48.0733,
            "cpu_usage": 6.89833,
            "ram_usage": 37.7,
            "system_load": 0.641602,
            "network_sent_bytes": 156858885788,
            "network_recv_bytes": 14405407307,
            "timestamp": "2025-03-07T20:56:00"
        },
        {
            "cpu_temperature": 48.6833,
            "cpu_usage": 7.645,
            "ram_usage": 38.1,
            "system_load": 0.42627,
            "network_sent_bytes": 156861139893,
            "network_recv_bytes": 14408895191,
            "timestamp": "2025-03-07T20:57:00"
        },
        {
            "cpu_temperature": 47.82,
            "cpu_usage": 4.655,
            "ram_usage": 37.4,
            "system_load": 0.230957,
            "network_sent_bytes": 156862113622,
            "network_recv_bytes": 14410229855,
            "timestamp": "2025-03-07T20:58:00"
        },
        {
            "cpu_temperature": 46.8167,
            "cpu_usage": 1.15833,
            "ram_usage": 37.4,
            "system_load": 0.220703,
            "network_sent_bytes": 156862165242,
            "network_recv_bytes": 14410281267,
            "timestamp": "2025-03-07T20:59:00"
        },
        {
            "cpu_temperature": 46.4833,
            "cpu_usage": 1.20833,
            "ram_usage": 37.3,
            "system_load": 0.0791016,
            "network_sent_bytes": 156862212486,
            "network_recv_bytes": 14410327882,
            "timestamp": "2025-03-07T21:00:00"
        },
        {
            "cpu_temperature": 46.1533,
            "cpu_usage": 1.31833,
            "ram_usage": 37.4,
            "system_load": 0.0952148,
            "network_sent_bytes": 156862267504,
            "network_recv_bytes": 14410387362,
            "timestamp": "2025-03-07T21:01:00"
        },
        {
            "cpu_temperature": 45.9317,
            "cpu_usage": 1.15833,
            "ram_usage": 37.4,
            "system_load": 0.169434,
            "network_sent_bytes": 156862346981,
            "network_recv_bytes": 14410467094,
            "timestamp": "2025-03-07T21:02:00"
        },
        {
            "cpu_temperature": 45.8833,
            "cpu_usage": 1.13667,
            "ram_usage": 37.4,
            "system_load": 0.0605469,
            "network_sent_bytes": 156862380905,
            "network_recv_bytes": 14410501497,
            "timestamp": "2025-03-07T21:03:00"
        },
        {
            "cpu_temperature": 45.8783,
            "cpu_usage": 1.185,
            "ram_usage": 37.4,
            "system_load": 0.212402,
            "network_sent_bytes": 156862440572,
            "network_recv_bytes": 14410559978,
            "timestamp": "2025-03-07T21:04:00"
        },
        {
            "cpu_temperature": 45.9183,
            "cpu_usage": 1.205,
            "ram_usage": 37.4,
            "system_load": 0.150879,
            "network_sent_bytes": 156862473663,
            "network_recv_bytes": 14410588901,
            "timestamp": "2025-03-07T21:05:00"
        },
        {
            "cpu_temperature": 45.7667,
            "cpu_usage": 0.95,
            "ram_usage": 36.9,
            "system_load": 0.0537109,
            "network_sent_bytes": 156862516072,
            "network_recv_bytes": 14410635599,
            "timestamp": "2025-03-07T21:06:00"
        },
        {
            "cpu_temperature": 45.5283,
            "cpu_usage": 1.06667,
            "ram_usage": 37.3,
            "system_load": 0.19043,
            "network_sent_bytes": 156862546936,
            "network_recv_bytes": 14410666396,
            "timestamp": "2025-03-07T21:07:00"
        },
        {
            "cpu_temperature": 45.6333,
            "cpu_usage": 1.06333,
            "ram_usage": 37,
            "system_load": 0.103027,
            "network_sent_bytes": 156862570848,
            "network_recv_bytes": 14410690279,
            "timestamp": "2025-03-07T21:08:00"
        },
        {
            "cpu_temperature": 45.4367,
            "cpu_usage": 1.17,
            "ram_usage": 37.3,
            "system_load": 0.104004,
            "network_sent_bytes": 156862601680,
            "network_recv_bytes": 14410720371,
            "timestamp": "2025-03-07T21:09:00"
        },
        {
            "cpu_temperature": 45.52,
            "cpu_usage": 1.06667,
            "ram_usage": 37,
            "system_load": 0.162598,
            "network_sent_bytes": 156862634668,
            "network_recv_bytes": 14410752845,
            "timestamp": "2025-03-07T21:10:00"
        },
        {
            "cpu_temperature": 45.5767,
            "cpu_usage": 1.065,
            "ram_usage": 37.4,
            "system_load": 0.0927734,
            "network_sent_bytes": 156862666037,
            "network_recv_bytes": 14410789048,
            "timestamp": "2025-03-07T21:11:00"
        },
        {
            "cpu_temperature": 45.1867,
            "cpu_usage": 0.988333,
            "ram_usage": 37,
            "system_load": 0.224609,
            "network_sent_bytes": 156862707396,
            "network_recv_bytes": 14410828911,
            "timestamp": "2025-03-07T21:12:00"
        },
        {
            "cpu_temperature": 45.3667,
            "cpu_usage": 0.951667,
            "ram_usage": 37.3,
            "system_load": 0.0800781,
            "network_sent_bytes": 156862746355,
            "network_recv_bytes": 14410867882,
            "timestamp": "2025-03-07T21:13:00"
        },
        {
            "cpu_temperature": 45.515,
            "cpu_usage": 1.175,
            "ram_usage": 37.4,
            "system_load": 0.0273438,
            "network_sent_bytes": 156862788544,
            "network_recv_bytes": 14410909525,
            "timestamp": "2025-03-07T21:14:00"
        },
        {
            "cpu_temperature": 45.39,
            "cpu_usage": 1.23333,
            "ram_usage": 37.4,
            "system_load": 0.145508,
            "network_sent_bytes": 156862824320,
            "network_recv_bytes": 14410944997,
            "timestamp": "2025-03-07T21:15:00"
        },
        {
            "cpu_temperature": 45.265,
            "cpu_usage": 1.17167,
            "ram_usage": 37.2,
            "system_load": 0.131836,
            "network_sent_bytes": 156862860578,
            "network_recv_bytes": 14410987021,
            "timestamp": "2025-03-07T21:16:00"
        },
        {
            "cpu_temperature": 45.2867,
            "cpu_usage": 1.175,
            "ram_usage": 37.4,
            "system_load": 0.114746,
            "network_sent_bytes": 156862893484,
            "network_recv_bytes": 14411016044,
            "timestamp": "2025-03-07T21:17:00"
        },
        {
            "cpu_temperature": 45.275,
            "cpu_usage": 1.05167,
            "ram_usage": 37.2,
            "system_load": 0.113281,
            "network_sent_bytes": 156862920750,
            "network_recv_bytes": 14411043105,
            "timestamp": "2025-03-07T21:18:00"
        },
        {
            "cpu_temperature": 45.3533,
            "cpu_usage": 1.13333,
            "ram_usage": 37.4,
            "system_load": 0.109375,
            "network_sent_bytes": 156862946687,
            "network_recv_bytes": 14411069099,
            "timestamp": "2025-03-07T21:19:00"
        },
        {
            "cpu_temperature": 45.2217,
            "cpu_usage": 1.13,
            "ram_usage": 37.2,
            "system_load": 0.310547,
            "network_sent_bytes": 156862975464,
            "network_recv_bytes": 14411097235,
            "timestamp": "2025-03-07T21:20:00"
        },
        {
            "cpu_temperature": 45.205,
            "cpu_usage": 1.065,
            "ram_usage": 37.4,
            "system_load": 0.262695,
            "network_sent_bytes": 156863010185,
            "network_recv_bytes": 14411135416,
            "timestamp": "2025-03-07T21:21:00"
        },
        {
            "cpu_temperature": 45.24,
            "cpu_usage": 1.19833,
            "ram_usage": 37.3,
            "system_load": 0.132324,
            "network_sent_bytes": 156863078017,
            "network_recv_bytes": 14411201736,
            "timestamp": "2025-03-07T21:22:00"
        },
        {
            "cpu_temperature": 45.2017,
            "cpu_usage": 1.21333,
            "ram_usage": 37.3,
            "system_load": 0.185059,
            "network_sent_bytes": 156863151883,
            "network_recv_bytes": 14411275608,
            "timestamp": "2025-03-07T21:23:00"
        },
        {
            "cpu_temperature": 45.1467,
            "cpu_usage": 1.28833,
            "ram_usage": 37.3,
            "system_load": 0.101074,
            "network_sent_bytes": 156863206193,
            "network_recv_bytes": 14411345208,
            "timestamp": "2025-03-07T21:24:00"
        },
        {
            "cpu_temperature": 45.19,
            "cpu_usage": 1.185,
            "ram_usage": 37.4,
            "system_load": 0.103516,
            "network_sent_bytes": 156863255362,
            "network_recv_bytes": 14411393989,
            "timestamp": "2025-03-07T21:25:00"
        },
        {
            "cpu_temperature": 45.165,
            "cpu_usage": 1.13333,
            "ram_usage": 37.2,
            "system_load": 0.109375,
            "network_sent_bytes": 156863290947,
            "network_recv_bytes": 14411435020,
            "timestamp": "2025-03-07T21:26:00"
        },
        {
            "cpu_temperature": 46.0817,
            "cpu_usage": 7.04167,
            "ram_usage": 37.5,
            "system_load": 0.546387,
            "network_sent_bytes": 156867154654,
            "network_recv_bytes": 14417474193,
            "timestamp": "2025-03-07T21:27:00"
        },
        {
            "cpu_temperature": 46.3033,
            "cpu_usage": 3.135,
            "ram_usage": 37.3,
            "system_load": 0.621582,
            "network_sent_bytes": 156868352555,
            "network_recv_bytes": 14419009254,
            "timestamp": "2025-03-07T21:28:00"
        },
        {
            "cpu_temperature": 47.1583,
            "cpu_usage": 4.81167,
            "ram_usage": 37.4,
            "system_load": 0.355469,
            "network_sent_bytes": 156869496704,
            "network_recv_bytes": 14420441404,
            "timestamp": "2025-03-07T21:29:00"
        },
        {
            "cpu_temperature": 47.3317,
            "cpu_usage": 6.66833,
            "ram_usage": 37.5,
            "system_load": 0.288086,
            "network_sent_bytes": 156874311626,
            "network_recv_bytes": 14425955215,
            "timestamp": "2025-03-07T21:30:00"
        },
        {
            "cpu_temperature": 46.7017,
            "cpu_usage": 2.355,
            "ram_usage": 37.5,
            "system_load": 0.285645,
            "network_sent_bytes": 156876294904,
            "network_recv_bytes": 14428606624,
            "timestamp": "2025-03-07T21:31:00"
        },
        {
            "cpu_temperature": 47.0317,
            "cpu_usage": 4.10667,
            "ram_usage": 37.5,
            "system_load": 0.141113,
            "network_sent_bytes": 156880811352,
            "network_recv_bytes": 14434444359,
            "timestamp": "2025-03-07T21:32:00"
        },
        {
            "cpu_temperature": 46.2267,
            "cpu_usage": 1.09333,
            "ram_usage": 37.5,
            "system_load": 0.118164,
            "network_sent_bytes": 156880842856,
            "network_recv_bytes": 14434475017,
            "timestamp": "2025-03-07T21:33:00"
        },
        {
            "cpu_temperature": 46.285,
            "cpu_usage": 1.74833,
            "ram_usage": 37.5,
            "system_load": 0.114746,
            "network_sent_bytes": 156881847644,
            "network_recv_bytes": 14435810836,
            "timestamp": "2025-03-07T21:34:00"
        },
        {
            "cpu_temperature": 46.5583,
            "cpu_usage": 2.64,
            "ram_usage": 37.5,
            "system_load": 0.0400391,
            "network_sent_bytes": 156884769571,
            "network_recv_bytes": 14439725312,
            "timestamp": "2025-03-07T21:35:00"
        },
        {
            "cpu_temperature": 45.9933,
            "cpu_usage": 1.165,
            "ram_usage": 37.3,
            "system_load": 0.20459,
            "network_sent_bytes": 156884809476,
            "network_recv_bytes": 14439770662,
            "timestamp": "2025-03-07T21:36:00"
        },
        {
            "cpu_temperature": 46.4633,
            "cpu_usage": 6.82,
            "ram_usage": 37.5,
            "system_load": 0.13623,
            "network_sent_bytes": 156888251395,
            "network_recv_bytes": 14445164131,
            "timestamp": "2025-03-07T21:37:00"
        },
        {
            "cpu_temperature": 46.4283,
            "cpu_usage": 2.21333,
            "ram_usage": 37.1,
            "system_load": 0.0478516,
            "network_sent_bytes": 156890206427,
            "network_recv_bytes": 14447781043,
            "timestamp": "2025-03-07T21:38:00"
        },
        {
            "cpu_temperature": 46.2033,
            "cpu_usage": 2.32833,
            "ram_usage": 37.6,
            "system_load": 0.152832,
            "network_sent_bytes": 156894266622,
            "network_recv_bytes": 14454225621,
            "timestamp": "2025-03-07T21:39:00"
        },
        {
            "cpu_temperature": 46.95,
            "cpu_usage": 3.75167,
            "ram_usage": 37.5,
            "system_load": 0.191406,
            "network_sent_bytes": 156899117622,
            "network_recv_bytes": 14460732583,
            "timestamp": "2025-03-07T21:40:00"
        },
        {
            "cpu_temperature": 46.4333,
            "cpu_usage": 2.11333,
            "ram_usage": 37.7,
            "system_load": 0.262207,
            "network_sent_bytes": 156901083964,
            "network_recv_bytes": 14463362122,
            "timestamp": "2025-03-07T21:41:00"
        },
        {
            "cpu_temperature": 46.26,
            "cpu_usage": 1.08333,
            "ram_usage": 37.6,
            "system_load": 0.283203,
            "network_sent_bytes": 156901120714,
            "network_recv_bytes": 14463397801,
            "timestamp": "2025-03-07T21:42:00"
        },
        {
            "cpu_temperature": 46.055,
            "cpu_usage": 1.34333,
            "ram_usage": 37.5,
            "system_load": 0.102051,
            "network_sent_bytes": 156903386571,
            "network_recv_bytes": 14475304859,
            "timestamp": "2025-03-07T21:43:00"
        },
        {
            "cpu_temperature": 45.8433,
            "cpu_usage": 1.295,
            "ram_usage": 37.6,
            "system_load": 0.352051,
            "network_sent_bytes": 156903428842,
            "network_recv_bytes": 14475347140,
            "timestamp": "2025-03-07T21:44:00"
        },
        {
            "cpu_temperature": 45.7067,
            "cpu_usage": 1.14333,
            "ram_usage": 37.6,
            "system_load": 0.12793,
            "network_sent_bytes": 156903465872,
            "network_recv_bytes": 14475383571,
            "timestamp": "2025-03-07T21:45:00"
        },
        {
            "cpu_temperature": 46.0933,
            "cpu_usage": 2.09167,
            "ram_usage": 37.7,
            "system_load": 0.0942383,
            "network_sent_bytes": 156916423536,
            "network_recv_bytes": 14475536712,
            "timestamp": "2025-03-07T21:46:00"
        },
        {
            "cpu_temperature": 45.9367,
            "cpu_usage": 1.12667,
            "ram_usage": 37.5,
            "system_load": 0.169922,
            "network_sent_bytes": 156916462159,
            "network_recv_bytes": 14475575515,
            "timestamp": "2025-03-07T21:47:00"
        },
        {
            "cpu_temperature": 45.7433,
            "cpu_usage": 1.12833,
            "ram_usage": 37.5,
            "system_load": 0.0610352,
            "network_sent_bytes": 156916517069,
            "network_recv_bytes": 14475627457,
            "timestamp": "2025-03-07T21:48:00"
        },
        {
            "cpu_temperature": 45.695,
            "cpu_usage": 1.075,
            "ram_usage": 37.5,
            "system_load": 0.133789,
            "network_sent_bytes": 156916545322,
            "network_recv_bytes": 14475655463,
            "timestamp": "2025-03-07T21:49:00"
        },
        {
            "cpu_temperature": 45.7067,
            "cpu_usage": 1.23833,
            "ram_usage": 37.4,
            "system_load": 0.121094,
            "network_sent_bytes": 156916641966,
            "network_recv_bytes": 14475752396,
            "timestamp": "2025-03-07T21:50:00"
        },
        {
            "cpu_temperature": 45.9267,
            "cpu_usage": 1.18833,
            "ram_usage": 37.8,
            "system_load": 0.123047,
            "network_sent_bytes": 156920603026,
            "network_recv_bytes": 14482899368,
            "timestamp": "2025-03-07T21:51:00"
        },
        {
            "cpu_temperature": 47.5667,
            "cpu_usage": 11.6417,
            "ram_usage": 37.8,
            "system_load": 0.805664,
            "network_sent_bytes": 156924771862,
            "network_recv_bytes": 14488586070,
            "timestamp": "2025-03-07T21:52:00"
        },
        {
            "cpu_temperature": 46.2833,
            "cpu_usage": 1.17333,
            "ram_usage": 37.9,
            "system_load": 0.374512,
            "network_sent_bytes": 156924820506,
            "network_recv_bytes": 14488630231,
            "timestamp": "2025-03-07T21:53:00"
        },
        {
            "cpu_temperature": 45.9933,
            "cpu_usage": 1.155,
            "ram_usage": 37.7,
            "system_load": 0.135254,
            "network_sent_bytes": 156924853048,
            "network_recv_bytes": 14488662288,
            "timestamp": "2025-03-07T21:54:00"
        },
        {
            "cpu_temperature": 45.865,
            "cpu_usage": 1.28,
            "ram_usage": 37.7,
            "system_load": 0.265625,
            "network_sent_bytes": 156924890423,
            "network_recv_bytes": 14488699197,
            "timestamp": "2025-03-07T21:55:00"
        },
        {
            "cpu_temperature": 45.7733,
            "cpu_usage": 1.18667,
            "ram_usage": 37.7,
            "system_load": 0.255859,
            "network_sent_bytes": 156924927190,
            "network_recv_bytes": 14488741459,
            "timestamp": "2025-03-07T21:56:00"
        },
        {
            "cpu_temperature": 45.75,
            "cpu_usage": 1.1,
            "ram_usage": 37.6,
            "system_load": 0.195801,
            "network_sent_bytes": 156924958108,
            "network_recv_bytes": 14488771879,
            "timestamp": "2025-03-07T21:57:00"
        },
        {
            "cpu_temperature": 45.65,
            "cpu_usage": 1.12333,
            "ram_usage": 37.4,
            "system_load": 0.382324,
            "network_sent_bytes": 156924991105,
            "network_recv_bytes": 14488804414,
            "timestamp": "2025-03-07T21:58:00"
        },
        {
            "cpu_temperature": 45.4333,
            "cpu_usage": 1.16333,
            "ram_usage": 37.6,
            "system_load": 0.13916,
            "network_sent_bytes": 156925021656,
            "network_recv_bytes": 14488834830,
            "timestamp": "2025-03-07T21:59:00"
        },
        {
            "cpu_temperature": 45.605,
            "cpu_usage": 1.24167,
            "ram_usage": 37.4,
            "system_load": 0.175293,
            "network_sent_bytes": 156925069582,
            "network_recv_bytes": 14488881676,
            "timestamp": "2025-03-07T22:00:00"
        },
        {
            "cpu_temperature": 45.615,
            "cpu_usage": 1.24667,
            "ram_usage": 37.6,
            "system_load": 0.20459,
            "network_sent_bytes": 156925128668,
            "network_recv_bytes": 14488947534,
            "timestamp": "2025-03-07T22:01:00"
        },
        {
            "cpu_temperature": 45.6267,
            "cpu_usage": 1.25667,
            "ram_usage": 37.7,
            "system_load": 0.0800781,
            "network_sent_bytes": 156925852459,
            "network_recv_bytes": 14490199052,
            "timestamp": "2025-03-07T22:02:00"
        },
        {
            "cpu_temperature": 46.14,
            "cpu_usage": 3.615,
            "ram_usage": 37.6,
            "system_load": 0.290039,
            "network_sent_bytes": 156929717751,
            "network_recv_bytes": 14495388285,
            "timestamp": "2025-03-07T22:03:00"
        },
        {
            "cpu_temperature": 46.095,
            "cpu_usage": 1.75667,
            "ram_usage": 37.6,
            "system_load": 0.11377,
            "network_sent_bytes": 156930761694,
            "network_recv_bytes": 14496804912,
            "timestamp": "2025-03-07T22:04:00"
        },
        {
            "cpu_temperature": 45.9517,
            "cpu_usage": 1.00333,
            "ram_usage": 37.3,
            "system_load": 0.214355,
            "network_sent_bytes": 156930801622,
            "network_recv_bytes": 14496840517,
            "timestamp": "2025-03-07T22:05:00"
        },
        {
            "cpu_temperature": 45.6733,
            "cpu_usage": 0.953333,
            "ram_usage": 37.6,
            "system_load": 0.173828,
            "network_sent_bytes": 156930838988,
            "network_recv_bytes": 14496881167,
            "timestamp": "2025-03-07T22:06:00"
        },
        {
            "cpu_temperature": 45.6683,
            "cpu_usage": 1.09167,
            "ram_usage": 37.2,
            "system_load": 0.0668945,
            "network_sent_bytes": 156930869858,
            "network_recv_bytes": 14496911880,
            "timestamp": "2025-03-07T22:07:00"
        },
        {
            "cpu_temperature": 45.595,
            "cpu_usage": 1.00333,
            "ram_usage": 37.6,
            "system_load": 0.271484,
            "network_sent_bytes": 156930903733,
            "network_recv_bytes": 14496945590,
            "timestamp": "2025-03-07T22:08:00"
        },
        {
            "cpu_temperature": 45.5817,
            "cpu_usage": 1.16,
            "ram_usage": 37.2,
            "system_load": 0.106934,
            "network_sent_bytes": 156930933346,
            "network_recv_bytes": 14496974826,
            "timestamp": "2025-03-07T22:09:00"
        },
        {
            "cpu_temperature": 45.4883,
            "cpu_usage": 1.05333,
            "ram_usage": 37.6,
            "system_load": 0.09375,
            "network_sent_bytes": 156930976804,
            "network_recv_bytes": 14497017248,
            "timestamp": "2025-03-07T22:10:00"
        },
        {
            "cpu_temperature": 45.5167,
            "cpu_usage": 1.12167,
            "ram_usage": 37.3,
            "system_load": 0.185059,
            "network_sent_bytes": 156931009816,
            "network_recv_bytes": 14497056113,
            "timestamp": "2025-03-07T22:11:00"
        },
        {
            "cpu_temperature": 45.55,
            "cpu_usage": 1.15167,
            "ram_usage": 37.6,
            "system_load": 0.182129,
            "network_sent_bytes": 156931045388,
            "network_recv_bytes": 14497090635,
            "timestamp": "2025-03-07T22:12:00"
        },
        {
            "cpu_temperature": 45.4117,
            "cpu_usage": 1.11667,
            "ram_usage": 37.5,
            "system_load": 0.14502,
            "network_sent_bytes": 156931074629,
            "network_recv_bytes": 14497120031,
            "timestamp": "2025-03-07T22:13:00"
        },
        {
            "cpu_temperature": 45.6133,
            "cpu_usage": 1.14,
            "ram_usage": 37.6,
            "system_load": 0.195801,
            "network_sent_bytes": 156931109405,
            "network_recv_bytes": 14497154165,
            "timestamp": "2025-03-07T22:14:00"
        },
        {
            "cpu_temperature": 45.6767,
            "cpu_usage": 1.12833,
            "ram_usage": 37.6,
            "system_load": 0.0703125,
            "network_sent_bytes": 156931149153,
            "network_recv_bytes": 14497193881,
            "timestamp": "2025-03-07T22:15:00"
        },
        {
            "cpu_temperature": 45.4083,
            "cpu_usage": 1.17333,
            "ram_usage": 37.5,
            "system_load": 0.145508,
            "network_sent_bytes": 156931188916,
            "network_recv_bytes": 14497237689,
            "timestamp": "2025-03-07T22:16:00"
        },
        {
            "cpu_temperature": 45.6983,
            "cpu_usage": 2.715,
            "ram_usage": 37.1,
            "system_load": 0.259277,
            "network_sent_bytes": 156934009118,
            "network_recv_bytes": 14501046889,
            "timestamp": "2025-03-07T22:17:00"
        },
        {
            "cpu_temperature": 46.5583,
            "cpu_usage": 2.75167,
            "ram_usage": 37.6,
            "system_load": 0.199707,
            "network_sent_bytes": 156936830843,
            "network_recv_bytes": 14504860305,
            "timestamp": "2025-03-07T22:18:00"
        },
        {
            "cpu_temperature": 46.8167,
            "cpu_usage": 5.04167,
            "ram_usage": 37.2,
            "system_load": 0.42334,
            "network_sent_bytes": 156943383064,
            "network_recv_bytes": 14513729577,
            "timestamp": "2025-03-07T22:19:00"
        }
        ]
    },

    '/get_fastapi_request_log_data{"timeframe":"24h"}': {
        "data": {
          "total_requests": 4420,
          "avg_backend_time": 313.78876091402736,
          "status_code": [
            {
              "status_code": 200,
              "count": 4367
            },
            {
              "status_code": 404,
              "count": 47
            },
            {
              "status_code": 422,
              "count": 6
            }
          ],
          "method_count": [
            {
              "method": "GET",
              "count": 4316
            },
            {
              "method": "POST",
              "count": 71
            },
            {
              "method": "OPTIONS",
              "count": 33
            }
          ],
          "client_ip_count": [
            {
              "client_ip": "192.168.0.1",
              "count": 3569
            },
            {
              "client_ip": "192.168.0.2",
              "count": 694
            },
            {
              "client_ip": "192.168.0.3",
              "count": 131
            },
            {
              "client_ip": "192.168.0.4",
              "count": 26
            }
          ],
          "endpoint_count": [
            {
              "endpoint": "/watch_list/get_title_cards",
              "count": 1206,
              "avg_response_time_ms": 571
            },
            {
              "endpoint": "/watch_list/list_titles",
              "count": 386,
              "avg_response_time_ms": 405
            },
            {
              "endpoint": "/get_server_drives_info",
              "count": 105,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/get_backups",
              "count": 104,
              "avg_response_time_ms": 180
            },
            {
              "endpoint": "/get_server_resource_logs",
              "count": 104,
              "avg_response_time_ms": 478
            },
            {
              "endpoint": "/get_fastapi_request_log_data",
              "count": 103,
              "avg_response_time_ms": 313
            },
            {
              "endpoint": "/account/get_login_status",
              "count": 92,
              "avg_response_time_ms": 195
            },
            {
              "endpoint": "/image/21/poster.jpg",
              "count": 70,
              "avg_response_time_ms": 91
            },
            {
              "endpoint": "/image/60/poster.jpg",
              "count": 69,
              "avg_response_time_ms": 100
            },
            {
              "endpoint": "/image/14/poster.jpg",
              "count": 69,
              "avg_response_time_ms": 110
            },
            {
              "endpoint": "/image/225/poster.jpg",
              "count": 65,
              "avg_response_time_ms": 107
            },
            {
              "endpoint": "/image/221/poster.jpg",
              "count": 65,
              "avg_response_time_ms": 114
            },
            {
              "endpoint": "/image/23/poster.jpg",
              "count": 64,
              "avg_response_time_ms": 130
            },
            {
              "endpoint": "/image/20/poster.jpg",
              "count": 64,
              "avg_response_time_ms": 84
            },
            {
              "endpoint": "/image/51/poster.jpg",
              "count": 64,
              "avg_response_time_ms": 117
            },
            {
              "endpoint": "/image/22/poster.jpg",
              "count": 62,
              "avg_response_time_ms": 84
            },
            {
              "endpoint": "/image/261/poster.jpg",
              "count": 60,
              "avg_response_time_ms": 70
            },
            {
              "endpoint": "/image/212/poster.jpg",
              "count": 60,
              "avg_response_time_ms": 121
            },
            {
              "endpoint": "/image/156/poster.jpg",
              "count": 59,
              "avg_response_time_ms": 106
            },
            {
              "endpoint": "/image/61/poster.jpg",
              "count": 58,
              "avg_response_time_ms": 119
            },
            {
              "endpoint": "/image/49/poster.jpg",
              "count": 56,
              "avg_response_time_ms": 95
            },
            {
              "endpoint": "/image/9/poster.jpg",
              "count": 49,
              "avg_response_time_ms": 77
            },
            {
              "endpoint": "/image/15/poster.jpg",
              "count": 49,
              "avg_response_time_ms": 95
            },
            {
              "endpoint": "/image/28/poster.jpg",
              "count": 49,
              "avg_response_time_ms": 70
            },
            {
              "endpoint": "/image/8/poster.jpg",
              "count": 49,
              "avg_response_time_ms": 70
            },
            {
              "endpoint": "/image/10/poster.jpg",
              "count": 49,
              "avg_response_time_ms": 93
            },
            {
              "endpoint": "/image/262/poster.jpg",
              "count": 47,
              "avg_response_time_ms": 108
            },
            {
              "endpoint": "/image/237/poster.jpg",
              "count": 47,
              "avg_response_time_ms": 79
            },
            {
              "endpoint": "/watch_list/get_title_info",
              "count": 45,
              "avg_response_time_ms": 527
            },
            {
              "endpoint": "/image/219/poster.jpg",
              "count": 44,
              "avg_response_time_ms": 111
            },
            {
              "endpoint": "/account/update_settings",
              "count": 36,
              "avg_response_time_ms": 104
            },
            {
              "endpoint": "/image/24/poster.jpg",
              "count": 35,
              "avg_response_time_ms": 28
            },
            {
              "endpoint": "/transactions/get_transactions",
              "count": 33,
              "avg_response_time_ms": 715
            },
            {
              "endpoint": "/account/get_settings",
              "count": 27,
              "avg_response_time_ms": 324
            },
            {
              "endpoint": "/transactions/get_filters",
              "count": 25,
              "avg_response_time_ms": 721
            },
            {
              "endpoint": "/cleanup_logs",
              "count": 24,
              "avg_response_time_ms": 519
            },
            {
              "endpoint": "/get_chart/categories_monthly",
              "count": 20,
              "avg_response_time_ms": 984
            },
            {
              "endpoint": "/analytics/get_stats_for_timespan",
              "count": 20,
              "avg_response_time_ms": 1283
            },
            {
              "endpoint": "/image/241/poster.jpg",
              "count": 14,
              "avg_response_time_ms": 50
            },
            {
              "endpoint": "/image/181/poster.jpg",
              "count": 14,
              "avg_response_time_ms": 46
            },
            {
              "endpoint": "/image/59/poster.jpg",
              "count": 14,
              "avg_response_time_ms": 40
            },
            {
              "endpoint": "/image/50/poster.jpg",
              "count": 14,
              "avg_response_time_ms": 80
            },
            {
              "endpoint": "/image/53/poster.jpg",
              "count": 14,
              "avg_response_time_ms": 58
            },
            {
              "endpoint": "/image/218/poster.jpg",
              "count": 14,
              "avg_response_time_ms": 27
            },
            {
              "endpoint": "/image/240/poster.jpg",
              "count": 14,
              "avg_response_time_ms": 72
            },
            {
              "endpoint": "/image/19/poster.jpg",
              "count": 14,
              "avg_response_time_ms": 66
            },
            {
              "endpoint": "/image/199/poster.jpg",
              "count": 14,
              "avg_response_time_ms": 47
            },
            {
              "endpoint": "/image/155/poster.jpg",
              "count": 14,
              "avg_response_time_ms": 56
            },
            {
              "endpoint": "/image/39/poster.jpg",
              "count": 14,
              "avg_response_time_ms": 28
            },
            {
              "endpoint": "/watch_list/modify_title_watch_count",
              "count": 14,
              "avg_response_time_ms": 468
            },
            {
              "endpoint": "/image/250/poster.jpg",
              "count": 13,
              "avg_response_time_ms": 105
            },
            {
              "endpoint": "/transactions/get_options",
              "count": 13,
              "avg_response_time_ms": 393
            },
            {
              "endpoint": "/image/209/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 27
            },
            {
              "endpoint": "/image/216/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 71
            },
            {
              "endpoint": "/image/211/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 89
            },
            {
              "endpoint": "/image/243/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 81
            },
            {
              "endpoint": "/image/238/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 51
            },
            {
              "endpoint": "/image/58/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 30
            },
            {
              "endpoint": "/image/16/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 109
            },
            {
              "endpoint": "/image/248/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 17
            },
            {
              "endpoint": "/image/245/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 76
            },
            {
              "endpoint": "/image/63/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 5
            },
            {
              "endpoint": "/image/55/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 84
            },
            {
              "endpoint": "/image/258/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 65
            },
            {
              "endpoint": "/image/17/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 100
            },
            {
              "endpoint": "/image/18/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 78
            },
            {
              "endpoint": "/image/222/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 72
            },
            {
              "endpoint": "/image/182/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 17
            },
            {
              "endpoint": "/image/260/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 98
            },
            {
              "endpoint": "/image/247/poster.jpg",
              "count": 12,
              "avg_response_time_ms": 44
            },
            {
              "endpoint": "/get_chart/sum_by_month",
              "count": 10,
              "avg_response_time_ms": 702
            },
            {
              "endpoint": "/analytics/get_general_stats",
              "count": 10,
              "avg_response_time_ms": 597
            },
            {
              "endpoint": "/get_chart/balance_over_time",
              "count": 10,
              "avg_response_time_ms": 1062
            },
            {
              "endpoint": "/image/200/poster.jpg",
              "count": 8,
              "avg_response_time_ms": 21
            },
            {
              "endpoint": "/image/152/poster.jpg",
              "count": 8,
              "avg_response_time_ms": 72
            },
            {
              "endpoint": "/watch_list/update_title_info",
              "count": 8,
              "avg_response_time_ms": 5354
            },
            {
              "endpoint": "/image/161/poster.jpg",
              "count": 7,
              "avg_response_time_ms": 49
            },
            {
              "endpoint": "/image/27/poster.jpg",
              "count": 7,
              "avg_response_time_ms": 4
            },
            {
              "endpoint": "/image/159/poster.jpg",
              "count": 7,
              "avg_response_time_ms": 25
            },
            {
              "endpoint": "/image/242/poster.jpg",
              "count": 7,
              "avg_response_time_ms": 4
            },
            {
              "endpoint": "/image/160/poster.jpg",
              "count": 7,
              "avg_response_time_ms": 46
            },
            {
              "endpoint": "/image/26/poster.jpg",
              "count": 7,
              "avg_response_time_ms": 94
            },
            {
              "endpoint": "/image/244/poster.jpg",
              "count": 7,
              "avg_response_time_ms": 45
            },
            {
              "endpoint": "/image/52/poster.jpg",
              "count": 7,
              "avg_response_time_ms": 46
            },
            {
              "endpoint": "/log_backup",
              "count": 7,
              "avg_response_time_ms": 231
            },
            {
              "endpoint": "/transactions/new_transaction",
              "count": 7,
              "avg_response_time_ms": 251
            },
            {
              "endpoint": "/image/259/poster.jpg",
              "count": 6,
              "avg_response_time_ms": 50
            },
            {
              "endpoint": "/image/25/poster.jpg",
              "count": 5,
              "avg_response_time_ms": 5
            },
            {
              "endpoint": "/image/154/poster.jpg",
              "count": 5,
              "avg_response_time_ms": 4
            },
            {
              "endpoint": "/image/56/poster.jpg",
              "count": 5,
              "avg_response_time_ms": 33
            },
            {
              "endpoint": "/image/249/poster.jpg",
              "count": 5,
              "avg_response_time_ms": 103
            },
            {
              "endpoint": "/image/246/poster.jpg",
              "count": 5,
              "avg_response_time_ms": 61
            },
            {
              "endpoint": "/image/51/season6/poster.jpg",
              "count": 5,
              "avg_response_time_ms": 26
            },
            {
              "endpoint": "/image/51/season1/poster.jpg",
              "count": 5,
              "avg_response_time_ms": 32
            },
            {
              "endpoint": "/image/51/season3/poster.jpg",
              "count": 5,
              "avg_response_time_ms": 35
            },
            {
              "endpoint": "/image/51/season2/poster.jpg",
              "count": 5,
              "avg_response_time_ms": 36
            },
            {
              "endpoint": "/image/51/season4/poster.jpg",
              "count": 5,
              "avg_response_time_ms": 101
            },
            {
              "endpoint": "/image/51/season5/poster.jpg",
              "count": 5,
              "avg_response_time_ms": 158
            },
            {
              "endpoint": "/image/51/backdrop1.jpg",
              "count": 5,
              "avg_response_time_ms": 4
            },
            {
              "endpoint": "/image/221/season3/episode4.jpg",
              "count": 5,
              "avg_response_time_ms": 73
            },
            {
              "endpoint": "/image/221/season3/episode3.jpg",
              "count": 5,
              "avg_response_time_ms": 78
            },
            {
              "endpoint": "/image/221/season3/episode2.jpg",
              "count": 5,
              "avg_response_time_ms": 71
            },
            {
              "endpoint": "/image/221/season3/episode1.jpg",
              "count": 5,
              "avg_response_time_ms": 65
            },
            {
              "endpoint": "/image/221/season3/episode7.jpg",
              "count": 5,
              "avg_response_time_ms": 114
            },
            {
              "endpoint": "/image/221/season3/episode5.jpg",
              "count": 5,
              "avg_response_time_ms": 88
            },
            {
              "endpoint": "/image/221/season3/episode6.jpg",
              "count": 5,
              "avg_response_time_ms": 117
            },
            {
              "endpoint": "/image/221/season3/episode8.jpg",
              "count": 5,
              "avg_response_time_ms": 104
            },
            {
              "endpoint": "/image/62/poster.jpg",
              "count": 4,
              "avg_response_time_ms": 6
            },
            {
              "endpoint": "/image/153/poster.jpg",
              "count": 4,
              "avg_response_time_ms": 40
            },
            {
              "endpoint": "/image/57/poster.jpg",
              "count": 4,
              "avg_response_time_ms": 40
            },
            {
              "endpoint": "/watch_list/add_user_title",
              "count": 4,
              "avg_response_time_ms": 4101
            },
            {
              "endpoint": "/image/267/poster.jpg",
              "count": 4,
              "avg_response_time_ms": 94
            },
            {
              "endpoint": "/image/23/season2/episode8.jpg",
              "count": 3,
              "avg_response_time_ms": 259
            },
            {
              "endpoint": "/image/23/season2/episode9.jpg",
              "count": 3,
              "avg_response_time_ms": 358
            },
            {
              "endpoint": "/image/23/season2/episode10.jpg",
              "count": 3,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/221/season3/poster.jpg",
              "count": 3,
              "avg_response_time_ms": 4
            },
            {
              "endpoint": "/image/221/season2/poster.jpg",
              "count": 3,
              "avg_response_time_ms": 95
            },
            {
              "endpoint": "/image/221/backdrop1.jpg",
              "count": 3,
              "avg_response_time_ms": 46
            },
            {
              "endpoint": "/image/221/season1/poster.jpg",
              "count": 3,
              "avg_response_time_ms": 5
            },
            {
              "endpoint": "/watch_list/search",
              "count": 3,
              "avg_response_time_ms": 4761
            },
            {
              "endpoint": "/image/268/poster.jpg",
              "count": 3,
              "avg_response_time_ms": 69
            },
            {
              "endpoint": "/image/269/poster.jpg",
              "count": 3,
              "avg_response_time_ms": 205
            },
            {
              "endpoint": "/transactions/edit_transaction",
              "count": 2,
              "avg_response_time_ms": 382
            },
            {
              "endpoint": "/image/23/backdrop1.jpg",
              "count": 2,
              "avg_response_time_ms": 219
            },
            {
              "endpoint": "/image/50/backdrop1.jpg",
              "count": 2,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/50/season3/episode1.jpg",
              "count": 2,
              "avg_response_time_ms": 5
            },
            {
              "endpoint": "/image/50/season3/episode3.jpg",
              "count": 2,
              "avg_response_time_ms": 82
            },
            {
              "endpoint": "/image/50/season3/episode6.jpg",
              "count": 2,
              "avg_response_time_ms": 6
            },
            {
              "endpoint": "/image/50/season3/episode5.jpg",
              "count": 2,
              "avg_response_time_ms": 78
            },
            {
              "endpoint": "/image/50/season3/episode7.jpg",
              "count": 2,
              "avg_response_time_ms": 294
            },
            {
              "endpoint": "/image/50/season3/episode8.jpg",
              "count": 2,
              "avg_response_time_ms": 167
            },
            {
              "endpoint": "/image/50/season3/episode2.jpg",
              "count": 2,
              "avg_response_time_ms": 241
            },
            {
              "endpoint": "/image/50/season3/episode4.jpg",
              "count": 2,
              "avg_response_time_ms": 164
            },
            {
              "endpoint": "/image/undefined/poster.jpg",
              "count": 2,
              "avg_response_time_ms": 1
            },
            {
              "endpoint": "/account/logout",
              "count": 2,
              "avg_response_time_ms": 57
            },
            {
              "endpoint": "/image/39/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 133
            },
            {
              "endpoint": "/image/39/backdrop2.jpg",
              "count": 1,
              "avg_response_time_ms": 123
            },
            {
              "endpoint": "/image/39/backdrop3.jpg",
              "count": 1,
              "avg_response_time_ms": 207
            },
            {
              "endpoint": "/image/39/backdrop4.jpg",
              "count": 1,
              "avg_response_time_ms": 96
            },
            {
              "endpoint": "/image/39/backdrop5.jpg",
              "count": 1,
              "avg_response_time_ms": 393
            },
            {
              "endpoint": "/image/14/season2/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/14/season1/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/14/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 3
            },
            {
              "endpoint": "/image/14/season4/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 8
            },
            {
              "endpoint": "/image/14/season3/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 190
            },
            {
              "endpoint": "/image/225/season3/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 3
            },
            {
              "endpoint": "/image/225/season1/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 8
            },
            {
              "endpoint": "/image/225/season4/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 3
            },
            {
              "endpoint": "/image/225/season2/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 5
            },
            {
              "endpoint": "/image/225/season5/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 162
            },
            {
              "endpoint": "/image/225/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 4
            },
            {
              "endpoint": "/image/225/season7/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 4
            },
            {
              "endpoint": "/image/225/season8/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 3
            },
            {
              "endpoint": "/image/225/season6/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 321
            },
            {
              "endpoint": "/image/225/backdrop2.jpg",
              "count": 1,
              "avg_response_time_ms": 231
            },
            {
              "endpoint": "/image/225/backdrop3.jpg",
              "count": 1,
              "avg_response_time_ms": 131
            },
            {
              "endpoint": "/image/225/backdrop4.jpg",
              "count": 1,
              "avg_response_time_ms": 462
            },
            {
              "endpoint": "/image/225/backdrop5.jpg",
              "count": 1,
              "avg_response_time_ms": 127
            },
            {
              "endpoint": "/image/212/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 221
            },
            {
              "endpoint": "/image/212/backdrop2.jpg",
              "count": 1,
              "avg_response_time_ms": 360
            },
            {
              "endpoint": "/image/212/backdrop3.jpg",
              "count": 1,
              "avg_response_time_ms": 361
            },
            {
              "endpoint": "/image/212/backdrop4.jpg",
              "count": 1,
              "avg_response_time_ms": 393
            },
            {
              "endpoint": "/image/212/backdrop5.jpg",
              "count": 1,
              "avg_response_time_ms": 370
            },
            {
              "endpoint": "/image/259/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 130
            },
            {
              "endpoint": "/image/259/backdrop2.jpg",
              "count": 1,
              "avg_response_time_ms": 85
            },
            {
              "endpoint": "/image/259/backdrop3.jpg",
              "count": 1,
              "avg_response_time_ms": 227
            },
            {
              "endpoint": "/image/259/backdrop4.jpg",
              "count": 1,
              "avg_response_time_ms": 105
            },
            {
              "endpoint": "/image/259/backdrop5.jpg",
              "count": 1,
              "avg_response_time_ms": 110
            },
            {
              "endpoint": "/image/23/season1/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/23/season2/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 3
            },
            {
              "endpoint": "/image/23/season2/episode3.jpg",
              "count": 1,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/23/season2/episode2.jpg",
              "count": 1,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/23/season2/episode1.jpg",
              "count": 1,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/23/season2/episode7.jpg",
              "count": 1,
              "avg_response_time_ms": 310
            },
            {
              "endpoint": "/image/23/season2/episode6.jpg",
              "count": 1,
              "avg_response_time_ms": 422
            },
            {
              "endpoint": "/image/23/season2/episode4.jpg",
              "count": 1,
              "avg_response_time_ms": 531
            },
            {
              "endpoint": "/image/23/season2/episode5.jpg",
              "count": 1,
              "avg_response_time_ms": 349
            },
            {
              "endpoint": "/image/221/backdrop2.jpg",
              "count": 1,
              "avg_response_time_ms": 6
            },
            {
              "endpoint": "/image/221/backdrop3.jpg",
              "count": 1,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/221/backdrop4.jpg",
              "count": 1,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/221/backdrop5.jpg",
              "count": 1,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/21/season1/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/21/season2/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/image/21/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 2
            },
            {
              "endpoint": "/",
              "count": 1,
              "avg_response_time_ms": 3
            },
            {
              "endpoint": "/image/24/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 566
            },
            {
              "endpoint": "/image/24/backdrop2.jpg",
              "count": 1,
              "avg_response_time_ms": 361
            },
            {
              "endpoint": "/image/156/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 444
            },
            {
              "endpoint": "/favicon.ico",
              "count": 1,
              "avg_response_time_ms": 1
            },
            {
              "endpoint": "/image/20/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 4
            },
            {
              "endpoint": "/image/20/season1/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 133
            },
            {
              "endpoint": "/image/20/season2/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 136
            },
            {
              "endpoint": "/image/20/season3/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 264
            },
            {
              "endpoint": "/image/20/season4/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 132
            },
            {
              "endpoint": "/image/20/season5/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 4
            },
            {
              "endpoint": "/image/267/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 150
            },
            {
              "endpoint": "/image/268/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 129
            },
            {
              "endpoint": "/image/267/backdrop2.jpg",
              "count": 1,
              "avg_response_time_ms": 114
            },
            {
              "endpoint": "/image/267/backdrop3.jpg",
              "count": 1,
              "avg_response_time_ms": 137
            },
            {
              "endpoint": "/image/267/backdrop4.jpg",
              "count": 1,
              "avg_response_time_ms": 76
            },
            {
              "endpoint": "/image/199/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 125
            },
            {
              "endpoint": "/image/250/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 136
            },
            {
              "endpoint": "/image/53/backdrop1.jpg",
              "count": 1,
              "avg_response_time_ms": 418
            },
            {
              "endpoint": "/image/50/season2/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 5
            },
            {
              "endpoint": "/image/50/season3/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 132
            },
            {
              "endpoint": "/image/50/season1/poster.jpg",
              "count": 1,
              "avg_response_time_ms": 247
            }
          ],
          "requests_over_time": [
            {
              "minute_bucket": 29021551,
              "count": 13
            },
            {
              "minute_bucket": 29021552,
              "count": 27
            },
            {
              "minute_bucket": 29021553,
              "count": 0
            },
            {
              "minute_bucket": 29021554,
              "count": 8
            },
            {
              "minute_bucket": 29021555,
              "count": 0
            },
            {
              "minute_bucket": 29021556,
              "count": 0
            },
            {
              "minute_bucket": 29021557,
              "count": 0
            },
            {
              "minute_bucket": 29021558,
              "count": 16
            },
            {
              "minute_bucket": 29021559,
              "count": 24
            },
            {
              "minute_bucket": 29021560,
              "count": 2
            },
            {
              "minute_bucket": 29021561,
              "count": 42
            },
            {
              "minute_bucket": 29021562,
              "count": 41
            },
            {
              "minute_bucket": 29021563,
              "count": 17
            },
            {
              "minute_bucket": 29021564,
              "count": 28
            },
            {
              "minute_bucket": 29021565,
              "count": 48
            },
            {
              "minute_bucket": 29021566,
              "count": 1
            },
            {
              "minute_bucket": 29021567,
              "count": 151
            },
            {
              "minute_bucket": 29021568,
              "count": 17
            },
            {
              "minute_bucket": 29021569,
              "count": 29
            },
            {
              "minute_bucket": 29021570,
              "count": 91
            },
            {
              "minute_bucket": 29021571,
              "count": 33
            },
            {
              "minute_bucket": 29021572,
              "count": 12
            },
            {
              "minute_bucket": 29021573,
              "count": 71
            },
            {
              "minute_bucket": 29021574,
              "count": 48
            },
            {
              "minute_bucket": 29021575,
              "count": 0
            },
            {
              "minute_bucket": 29021576,
              "count": 55
            },
            {
              "minute_bucket": 29021577,
              "count": 14
            },
            {
              "minute_bucket": 29021578,
              "count": 21
            },
            {
              "minute_bucket": 29021579,
              "count": 0
            },
            {
              "minute_bucket": 29021580,
              "count": 28
            },
            {
              "minute_bucket": 29021581,
              "count": 36
            },
            {
              "minute_bucket": 29021582,
              "count": 14
            },
            {
              "minute_bucket": 29021583,
              "count": 14
            },
            {
              "minute_bucket": 29021584,
              "count": 21
            },
            {
              "minute_bucket": 29021585,
              "count": 7
            },
            {
              "minute_bucket": 29021586,
              "count": 0
            },
            {
              "minute_bucket": 29021587,
              "count": 24
            },
            {
              "minute_bucket": 29021588,
              "count": 2
            },
            {
              "minute_bucket": 29021589,
              "count": 0
            },
            {
              "minute_bucket": 29021590,
              "count": 0
            },
            {
              "minute_bucket": 29021591,
              "count": 0
            },
            {
              "minute_bucket": 29021592,
              "count": 0
            },
            {
              "minute_bucket": 29021593,
              "count": 0
            },
            {
              "minute_bucket": 29021594,
              "count": 0
            },
            {
              "minute_bucket": 29021595,
              "count": 0
            },
            {
              "minute_bucket": 29021596,
              "count": 0
            },
            {
              "minute_bucket": 29021597,
              "count": 0
            },
            {
              "minute_bucket": 29021598,
              "count": 0
            },
            {
              "minute_bucket": 29021599,
              "count": 0
            },
            {
              "minute_bucket": 29021600,
              "count": 0
            },
            {
              "minute_bucket": 29021601,
              "count": 0
            },
            {
              "minute_bucket": 29021602,
              "count": 0
            },
            {
              "minute_bucket": 29021603,
              "count": 0
            },
            {
              "minute_bucket": 29021604,
              "count": 0
            },
            {
              "minute_bucket": 29021605,
              "count": 0
            },
            {
              "minute_bucket": 29021606,
              "count": 0
            },
            {
              "minute_bucket": 29021607,
              "count": 0
            },
            {
              "minute_bucket": 29021608,
              "count": 0
            },
            {
              "minute_bucket": 29021609,
              "count": 0
            },
            {
              "minute_bucket": 29021610,
              "count": 0
            },
            {
              "minute_bucket": 29021611,
              "count": 0
            },
            {
              "minute_bucket": 29021612,
              "count": 0
            },
            {
              "minute_bucket": 29021613,
              "count": 0
            },
            {
              "minute_bucket": 29021614,
              "count": 0
            },
            {
              "minute_bucket": 29021615,
              "count": 0
            },
            {
              "minute_bucket": 29021616,
              "count": 0
            },
            {
              "minute_bucket": 29021617,
              "count": 0
            },
            {
              "minute_bucket": 29021618,
              "count": 0
            },
            {
              "minute_bucket": 29021619,
              "count": 0
            },
            {
              "minute_bucket": 29021620,
              "count": 0
            },
            {
              "minute_bucket": 29021621,
              "count": 0
            },
            {
              "minute_bucket": 29021622,
              "count": 0
            },
            {
              "minute_bucket": 29021623,
              "count": 0
            },
            {
              "minute_bucket": 29021624,
              "count": 0
            },
            {
              "minute_bucket": 29021625,
              "count": 0
            },
            {
              "minute_bucket": 29021626,
              "count": 0
            },
            {
              "minute_bucket": 29021627,
              "count": 0
            },
            {
              "minute_bucket": 29021628,
              "count": 0
            },
            {
              "minute_bucket": 29021629,
              "count": 0
            },
            {
              "minute_bucket": 29021630,
              "count": 0
            },
            {
              "minute_bucket": 29021631,
              "count": 0
            },
            {
              "minute_bucket": 29021632,
              "count": 0
            },
            {
              "minute_bucket": 29021633,
              "count": 0
            },
            {
              "minute_bucket": 29021634,
              "count": 0
            },
            {
              "minute_bucket": 29021635,
              "count": 0
            },
            {
              "minute_bucket": 29021636,
              "count": 0
            },
            {
              "minute_bucket": 29021637,
              "count": 0
            },
            {
              "minute_bucket": 29021638,
              "count": 0
            },
            {
              "minute_bucket": 29021639,
              "count": 0
            },
            {
              "minute_bucket": 29021640,
              "count": 1
            },
            {
              "minute_bucket": 29021641,
              "count": 0
            },
            {
              "minute_bucket": 29021642,
              "count": 0
            },
            {
              "minute_bucket": 29021643,
              "count": 0
            },
            {
              "minute_bucket": 29021644,
              "count": 0
            },
            {
              "minute_bucket": 29021645,
              "count": 0
            },
            {
              "minute_bucket": 29021646,
              "count": 0
            },
            {
              "minute_bucket": 29021647,
              "count": 0
            },
            {
              "minute_bucket": 29021648,
              "count": 0
            },
            {
              "minute_bucket": 29021649,
              "count": 0
            },
            {
              "minute_bucket": 29021650,
              "count": 0
            },
            {
              "minute_bucket": 29021651,
              "count": 0
            },
            {
              "minute_bucket": 29021652,
              "count": 0
            },
            {
              "minute_bucket": 29021653,
              "count": 0
            },
            {
              "minute_bucket": 29021654,
              "count": 0
            },
            {
              "minute_bucket": 29021655,
              "count": 0
            },
            {
              "minute_bucket": 29021656,
              "count": 0
            },
            {
              "minute_bucket": 29021657,
              "count": 0
            },
            {
              "minute_bucket": 29021658,
              "count": 0
            },
            {
              "minute_bucket": 29021659,
              "count": 0
            },
            {
              "minute_bucket": 29021660,
              "count": 0
            },
            {
              "minute_bucket": 29021661,
              "count": 0
            },
            {
              "minute_bucket": 29021662,
              "count": 0
            },
            {
              "minute_bucket": 29021663,
              "count": 0
            },
            {
              "minute_bucket": 29021664,
              "count": 0
            },
            {
              "minute_bucket": 29021665,
              "count": 0
            },
            {
              "minute_bucket": 29021666,
              "count": 0
            },
            {
              "minute_bucket": 29021667,
              "count": 0
            },
            {
              "minute_bucket": 29021668,
              "count": 0
            },
            {
              "minute_bucket": 29021669,
              "count": 0
            },
            {
              "minute_bucket": 29021670,
              "count": 0
            },
            {
              "minute_bucket": 29021671,
              "count": 0
            },
            {
              "minute_bucket": 29021672,
              "count": 0
            },
            {
              "minute_bucket": 29021673,
              "count": 0
            },
            {
              "minute_bucket": 29021674,
              "count": 0
            },
            {
              "minute_bucket": 29021675,
              "count": 0
            },
            {
              "minute_bucket": 29021676,
              "count": 0
            },
            {
              "minute_bucket": 29021677,
              "count": 0
            },
            {
              "minute_bucket": 29021678,
              "count": 0
            },
            {
              "minute_bucket": 29021679,
              "count": 0
            },
            {
              "minute_bucket": 29021680,
              "count": 0
            },
            {
              "minute_bucket": 29021681,
              "count": 0
            },
            {
              "minute_bucket": 29021682,
              "count": 0
            },
            {
              "minute_bucket": 29021683,
              "count": 0
            },
            {
              "minute_bucket": 29021684,
              "count": 0
            },
            {
              "minute_bucket": 29021685,
              "count": 0
            },
            {
              "minute_bucket": 29021686,
              "count": 0
            },
            {
              "minute_bucket": 29021687,
              "count": 0
            },
            {
              "minute_bucket": 29021688,
              "count": 0
            },
            {
              "minute_bucket": 29021689,
              "count": 0
            },
            {
              "minute_bucket": 29021690,
              "count": 0
            },
            {
              "minute_bucket": 29021691,
              "count": 0
            },
            {
              "minute_bucket": 29021692,
              "count": 0
            },
            {
              "minute_bucket": 29021693,
              "count": 0
            },
            {
              "minute_bucket": 29021694,
              "count": 0
            },
            {
              "minute_bucket": 29021695,
              "count": 0
            },
            {
              "minute_bucket": 29021696,
              "count": 0
            },
            {
              "minute_bucket": 29021697,
              "count": 0
            },
            {
              "minute_bucket": 29021698,
              "count": 0
            },
            {
              "minute_bucket": 29021699,
              "count": 0
            },
            {
              "minute_bucket": 29021700,
              "count": 1
            },
            {
              "minute_bucket": 29021701,
              "count": 0
            },
            {
              "minute_bucket": 29021702,
              "count": 0
            },
            {
              "minute_bucket": 29021703,
              "count": 0
            },
            {
              "minute_bucket": 29021704,
              "count": 0
            },
            {
              "minute_bucket": 29021705,
              "count": 0
            },
            {
              "minute_bucket": 29021706,
              "count": 0
            },
            {
              "minute_bucket": 29021707,
              "count": 0
            },
            {
              "minute_bucket": 29021708,
              "count": 0
            },
            {
              "minute_bucket": 29021709,
              "count": 0
            },
            {
              "minute_bucket": 29021710,
              "count": 0
            },
            {
              "minute_bucket": 29021711,
              "count": 0
            },
            {
              "minute_bucket": 29021712,
              "count": 0
            },
            {
              "minute_bucket": 29021713,
              "count": 0
            },
            {
              "minute_bucket": 29021714,
              "count": 0
            },
            {
              "minute_bucket": 29021715,
              "count": 0
            },
            {
              "minute_bucket": 29021716,
              "count": 0
            },
            {
              "minute_bucket": 29021717,
              "count": 0
            },
            {
              "minute_bucket": 29021718,
              "count": 0
            },
            {
              "minute_bucket": 29021719,
              "count": 0
            },
            {
              "minute_bucket": 29021720,
              "count": 0
            },
            {
              "minute_bucket": 29021721,
              "count": 0
            },
            {
              "minute_bucket": 29021722,
              "count": 0
            },
            {
              "minute_bucket": 29021723,
              "count": 0
            },
            {
              "minute_bucket": 29021724,
              "count": 0
            },
            {
              "minute_bucket": 29021725,
              "count": 0
            },
            {
              "minute_bucket": 29021726,
              "count": 0
            },
            {
              "minute_bucket": 29021727,
              "count": 0
            },
            {
              "minute_bucket": 29021728,
              "count": 0
            },
            {
              "minute_bucket": 29021729,
              "count": 0
            },
            {
              "minute_bucket": 29021730,
              "count": 0
            },
            {
              "minute_bucket": 29021731,
              "count": 0
            },
            {
              "minute_bucket": 29021732,
              "count": 0
            },
            {
              "minute_bucket": 29021733,
              "count": 0
            },
            {
              "minute_bucket": 29021734,
              "count": 0
            },
            {
              "minute_bucket": 29021735,
              "count": 0
            },
            {
              "minute_bucket": 29021736,
              "count": 0
            },
            {
              "minute_bucket": 29021737,
              "count": 0
            },
            {
              "minute_bucket": 29021738,
              "count": 0
            },
            {
              "minute_bucket": 29021739,
              "count": 0
            },
            {
              "minute_bucket": 29021740,
              "count": 0
            },
            {
              "minute_bucket": 29021741,
              "count": 0
            },
            {
              "minute_bucket": 29021742,
              "count": 0
            },
            {
              "minute_bucket": 29021743,
              "count": 0
            },
            {
              "minute_bucket": 29021744,
              "count": 0
            },
            {
              "minute_bucket": 29021745,
              "count": 0
            },
            {
              "minute_bucket": 29021746,
              "count": 0
            },
            {
              "minute_bucket": 29021747,
              "count": 0
            },
            {
              "minute_bucket": 29021748,
              "count": 0
            },
            {
              "minute_bucket": 29021749,
              "count": 0
            },
            {
              "minute_bucket": 29021750,
              "count": 0
            },
            {
              "minute_bucket": 29021751,
              "count": 0
            },
            {
              "minute_bucket": 29021752,
              "count": 0
            },
            {
              "minute_bucket": 29021753,
              "count": 0
            },
            {
              "minute_bucket": 29021754,
              "count": 0
            },
            {
              "minute_bucket": 29021755,
              "count": 0
            },
            {
              "minute_bucket": 29021756,
              "count": 0
            },
            {
              "minute_bucket": 29021757,
              "count": 0
            },
            {
              "minute_bucket": 29021758,
              "count": 0
            },
            {
              "minute_bucket": 29021759,
              "count": 0
            },
            {
              "minute_bucket": 29021760,
              "count": 1
            },
            {
              "minute_bucket": 29021761,
              "count": 0
            },
            {
              "minute_bucket": 29021762,
              "count": 0
            },
            {
              "minute_bucket": 29021763,
              "count": 0
            },
            {
              "minute_bucket": 29021764,
              "count": 0
            },
            {
              "minute_bucket": 29021765,
              "count": 0
            },
            {
              "minute_bucket": 29021766,
              "count": 0
            },
            {
              "minute_bucket": 29021767,
              "count": 0
            },
            {
              "minute_bucket": 29021768,
              "count": 0
            },
            {
              "minute_bucket": 29021769,
              "count": 0
            },
            {
              "minute_bucket": 29021770,
              "count": 0
            },
            {
              "minute_bucket": 29021771,
              "count": 0
            },
            {
              "minute_bucket": 29021772,
              "count": 0
            },
            {
              "minute_bucket": 29021773,
              "count": 0
            },
            {
              "minute_bucket": 29021774,
              "count": 0
            },
            {
              "minute_bucket": 29021775,
              "count": 0
            },
            {
              "minute_bucket": 29021776,
              "count": 0
            },
            {
              "minute_bucket": 29021777,
              "count": 0
            },
            {
              "minute_bucket": 29021778,
              "count": 0
            },
            {
              "minute_bucket": 29021779,
              "count": 0
            },
            {
              "minute_bucket": 29021780,
              "count": 0
            },
            {
              "minute_bucket": 29021781,
              "count": 0
            },
            {
              "minute_bucket": 29021782,
              "count": 0
            },
            {
              "minute_bucket": 29021783,
              "count": 0
            },
            {
              "minute_bucket": 29021784,
              "count": 0
            },
            {
              "minute_bucket": 29021785,
              "count": 0
            },
            {
              "minute_bucket": 29021786,
              "count": 0
            },
            {
              "minute_bucket": 29021787,
              "count": 0
            },
            {
              "minute_bucket": 29021788,
              "count": 0
            },
            {
              "minute_bucket": 29021789,
              "count": 0
            },
            {
              "minute_bucket": 29021790,
              "count": 0
            },
            {
              "minute_bucket": 29021791,
              "count": 0
            },
            {
              "minute_bucket": 29021792,
              "count": 0
            },
            {
              "minute_bucket": 29021793,
              "count": 0
            },
            {
              "minute_bucket": 29021794,
              "count": 0
            },
            {
              "minute_bucket": 29021795,
              "count": 0
            },
            {
              "minute_bucket": 29021796,
              "count": 0
            },
            {
              "minute_bucket": 29021797,
              "count": 0
            },
            {
              "minute_bucket": 29021798,
              "count": 0
            },
            {
              "minute_bucket": 29021799,
              "count": 0
            },
            {
              "minute_bucket": 29021800,
              "count": 0
            },
            {
              "minute_bucket": 29021801,
              "count": 0
            },
            {
              "minute_bucket": 29021802,
              "count": 0
            },
            {
              "minute_bucket": 29021803,
              "count": 0
            },
            {
              "minute_bucket": 29021804,
              "count": 0
            },
            {
              "minute_bucket": 29021805,
              "count": 0
            },
            {
              "minute_bucket": 29021806,
              "count": 0
            },
            {
              "minute_bucket": 29021807,
              "count": 0
            },
            {
              "minute_bucket": 29021808,
              "count": 0
            },
            {
              "minute_bucket": 29021809,
              "count": 0
            },
            {
              "minute_bucket": 29021810,
              "count": 0
            },
            {
              "minute_bucket": 29021811,
              "count": 0
            },
            {
              "minute_bucket": 29021812,
              "count": 0
            },
            {
              "minute_bucket": 29021813,
              "count": 0
            },
            {
              "minute_bucket": 29021814,
              "count": 0
            },
            {
              "minute_bucket": 29021815,
              "count": 0
            },
            {
              "minute_bucket": 29021816,
              "count": 0
            },
            {
              "minute_bucket": 29021817,
              "count": 0
            },
            {
              "minute_bucket": 29021818,
              "count": 0
            },
            {
              "minute_bucket": 29021819,
              "count": 0
            },
            {
              "minute_bucket": 29021820,
              "count": 1
            },
            {
              "minute_bucket": 29021821,
              "count": 0
            },
            {
              "minute_bucket": 29021822,
              "count": 0
            },
            {
              "minute_bucket": 29021823,
              "count": 0
            },
            {
              "minute_bucket": 29021824,
              "count": 0
            },
            {
              "minute_bucket": 29021825,
              "count": 0
            },
            {
              "minute_bucket": 29021826,
              "count": 0
            },
            {
              "minute_bucket": 29021827,
              "count": 0
            },
            {
              "minute_bucket": 29021828,
              "count": 0
            },
            {
              "minute_bucket": 29021829,
              "count": 0
            },
            {
              "minute_bucket": 29021830,
              "count": 0
            },
            {
              "minute_bucket": 29021831,
              "count": 0
            },
            {
              "minute_bucket": 29021832,
              "count": 0
            },
            {
              "minute_bucket": 29021833,
              "count": 0
            },
            {
              "minute_bucket": 29021834,
              "count": 0
            },
            {
              "minute_bucket": 29021835,
              "count": 0
            },
            {
              "minute_bucket": 29021836,
              "count": 0
            },
            {
              "minute_bucket": 29021837,
              "count": 0
            },
            {
              "minute_bucket": 29021838,
              "count": 0
            },
            {
              "minute_bucket": 29021839,
              "count": 0
            },
            {
              "minute_bucket": 29021840,
              "count": 0
            },
            {
              "minute_bucket": 29021841,
              "count": 0
            },
            {
              "minute_bucket": 29021842,
              "count": 0
            },
            {
              "minute_bucket": 29021843,
              "count": 0
            },
            {
              "minute_bucket": 29021844,
              "count": 0
            },
            {
              "minute_bucket": 29021845,
              "count": 0
            },
            {
              "minute_bucket": 29021846,
              "count": 0
            },
            {
              "minute_bucket": 29021847,
              "count": 0
            },
            {
              "minute_bucket": 29021848,
              "count": 0
            },
            {
              "minute_bucket": 29021849,
              "count": 0
            },
            {
              "minute_bucket": 29021850,
              "count": 0
            },
            {
              "minute_bucket": 29021851,
              "count": 0
            },
            {
              "minute_bucket": 29021852,
              "count": 0
            },
            {
              "minute_bucket": 29021853,
              "count": 0
            },
            {
              "minute_bucket": 29021854,
              "count": 0
            },
            {
              "minute_bucket": 29021855,
              "count": 0
            },
            {
              "minute_bucket": 29021856,
              "count": 0
            },
            {
              "minute_bucket": 29021857,
              "count": 0
            },
            {
              "minute_bucket": 29021858,
              "count": 0
            },
            {
              "minute_bucket": 29021859,
              "count": 0
            },
            {
              "minute_bucket": 29021860,
              "count": 0
            },
            {
              "minute_bucket": 29021861,
              "count": 0
            },
            {
              "minute_bucket": 29021862,
              "count": 0
            },
            {
              "minute_bucket": 29021863,
              "count": 0
            },
            {
              "minute_bucket": 29021864,
              "count": 0
            },
            {
              "minute_bucket": 29021865,
              "count": 0
            },
            {
              "minute_bucket": 29021866,
              "count": 0
            },
            {
              "minute_bucket": 29021867,
              "count": 0
            },
            {
              "minute_bucket": 29021868,
              "count": 0
            },
            {
              "minute_bucket": 29021869,
              "count": 0
            },
            {
              "minute_bucket": 29021870,
              "count": 0
            },
            {
              "minute_bucket": 29021871,
              "count": 0
            },
            {
              "minute_bucket": 29021872,
              "count": 0
            },
            {
              "minute_bucket": 29021873,
              "count": 0
            },
            {
              "minute_bucket": 29021874,
              "count": 0
            },
            {
              "minute_bucket": 29021875,
              "count": 0
            },
            {
              "minute_bucket": 29021876,
              "count": 0
            },
            {
              "minute_bucket": 29021877,
              "count": 0
            },
            {
              "minute_bucket": 29021878,
              "count": 0
            },
            {
              "minute_bucket": 29021879,
              "count": 0
            },
            {
              "minute_bucket": 29021880,
              "count": 3
            },
            {
              "minute_bucket": 29021881,
              "count": 0
            },
            {
              "minute_bucket": 29021882,
              "count": 0
            },
            {
              "minute_bucket": 29021883,
              "count": 0
            },
            {
              "minute_bucket": 29021884,
              "count": 0
            },
            {
              "minute_bucket": 29021885,
              "count": 0
            },
            {
              "minute_bucket": 29021886,
              "count": 0
            },
            {
              "minute_bucket": 29021887,
              "count": 0
            },
            {
              "minute_bucket": 29021888,
              "count": 0
            },
            {
              "minute_bucket": 29021889,
              "count": 0
            },
            {
              "minute_bucket": 29021890,
              "count": 0
            },
            {
              "minute_bucket": 29021891,
              "count": 0
            },
            {
              "minute_bucket": 29021892,
              "count": 0
            },
            {
              "minute_bucket": 29021893,
              "count": 0
            },
            {
              "minute_bucket": 29021894,
              "count": 0
            },
            {
              "minute_bucket": 29021895,
              "count": 0
            },
            {
              "minute_bucket": 29021896,
              "count": 0
            },
            {
              "minute_bucket": 29021897,
              "count": 0
            },
            {
              "minute_bucket": 29021898,
              "count": 0
            },
            {
              "minute_bucket": 29021899,
              "count": 0
            },
            {
              "minute_bucket": 29021900,
              "count": 0
            },
            {
              "minute_bucket": 29021901,
              "count": 0
            },
            {
              "minute_bucket": 29021902,
              "count": 0
            },
            {
              "minute_bucket": 29021903,
              "count": 0
            },
            {
              "minute_bucket": 29021904,
              "count": 0
            },
            {
              "minute_bucket": 29021905,
              "count": 0
            },
            {
              "minute_bucket": 29021906,
              "count": 0
            },
            {
              "minute_bucket": 29021907,
              "count": 0
            },
            {
              "minute_bucket": 29021908,
              "count": 0
            },
            {
              "minute_bucket": 29021909,
              "count": 0
            },
            {
              "minute_bucket": 29021910,
              "count": 0
            },
            {
              "minute_bucket": 29021911,
              "count": 0
            },
            {
              "minute_bucket": 29021912,
              "count": 0
            },
            {
              "minute_bucket": 29021913,
              "count": 0
            },
            {
              "minute_bucket": 29021914,
              "count": 0
            },
            {
              "minute_bucket": 29021915,
              "count": 0
            },
            {
              "minute_bucket": 29021916,
              "count": 0
            },
            {
              "minute_bucket": 29021917,
              "count": 0
            },
            {
              "minute_bucket": 29021918,
              "count": 0
            },
            {
              "minute_bucket": 29021919,
              "count": 0
            },
            {
              "minute_bucket": 29021920,
              "count": 0
            },
            {
              "minute_bucket": 29021921,
              "count": 0
            },
            {
              "minute_bucket": 29021922,
              "count": 0
            },
            {
              "minute_bucket": 29021923,
              "count": 0
            },
            {
              "minute_bucket": 29021924,
              "count": 0
            },
            {
              "minute_bucket": 29021925,
              "count": 0
            },
            {
              "minute_bucket": 29021926,
              "count": 0
            },
            {
              "minute_bucket": 29021927,
              "count": 0
            },
            {
              "minute_bucket": 29021928,
              "count": 0
            },
            {
              "minute_bucket": 29021929,
              "count": 0
            },
            {
              "minute_bucket": 29021930,
              "count": 0
            },
            {
              "minute_bucket": 29021931,
              "count": 0
            },
            {
              "minute_bucket": 29021932,
              "count": 0
            },
            {
              "minute_bucket": 29021933,
              "count": 0
            },
            {
              "minute_bucket": 29021934,
              "count": 0
            },
            {
              "minute_bucket": 29021935,
              "count": 0
            },
            {
              "minute_bucket": 29021936,
              "count": 0
            },
            {
              "minute_bucket": 29021937,
              "count": 0
            },
            {
              "minute_bucket": 29021938,
              "count": 0
            },
            {
              "minute_bucket": 29021939,
              "count": 0
            },
            {
              "minute_bucket": 29021940,
              "count": 1
            },
            {
              "minute_bucket": 29021941,
              "count": 0
            },
            {
              "minute_bucket": 29021942,
              "count": 0
            },
            {
              "minute_bucket": 29021943,
              "count": 0
            },
            {
              "minute_bucket": 29021944,
              "count": 0
            },
            {
              "minute_bucket": 29021945,
              "count": 0
            },
            {
              "minute_bucket": 29021946,
              "count": 0
            },
            {
              "minute_bucket": 29021947,
              "count": 0
            },
            {
              "minute_bucket": 29021948,
              "count": 0
            },
            {
              "minute_bucket": 29021949,
              "count": 0
            },
            {
              "minute_bucket": 29021950,
              "count": 0
            },
            {
              "minute_bucket": 29021951,
              "count": 0
            },
            {
              "minute_bucket": 29021952,
              "count": 0
            },
            {
              "minute_bucket": 29021953,
              "count": 0
            },
            {
              "minute_bucket": 29021954,
              "count": 0
            },
            {
              "minute_bucket": 29021955,
              "count": 0
            },
            {
              "minute_bucket": 29021956,
              "count": 0
            },
            {
              "minute_bucket": 29021957,
              "count": 0
            },
            {
              "minute_bucket": 29021958,
              "count": 0
            },
            {
              "minute_bucket": 29021959,
              "count": 0
            },
            {
              "minute_bucket": 29021960,
              "count": 0
            },
            {
              "minute_bucket": 29021961,
              "count": 0
            },
            {
              "minute_bucket": 29021962,
              "count": 0
            },
            {
              "minute_bucket": 29021963,
              "count": 0
            },
            {
              "minute_bucket": 29021964,
              "count": 0
            },
            {
              "minute_bucket": 29021965,
              "count": 0
            },
            {
              "minute_bucket": 29021966,
              "count": 0
            },
            {
              "minute_bucket": 29021967,
              "count": 0
            },
            {
              "minute_bucket": 29021968,
              "count": 0
            },
            {
              "minute_bucket": 29021969,
              "count": 0
            },
            {
              "minute_bucket": 29021970,
              "count": 0
            },
            {
              "minute_bucket": 29021971,
              "count": 0
            },
            {
              "minute_bucket": 29021972,
              "count": 0
            },
            {
              "minute_bucket": 29021973,
              "count": 0
            },
            {
              "minute_bucket": 29021974,
              "count": 0
            },
            {
              "minute_bucket": 29021975,
              "count": 0
            },
            {
              "minute_bucket": 29021976,
              "count": 0
            },
            {
              "minute_bucket": 29021977,
              "count": 0
            },
            {
              "minute_bucket": 29021978,
              "count": 0
            },
            {
              "minute_bucket": 29021979,
              "count": 0
            },
            {
              "minute_bucket": 29021980,
              "count": 0
            },
            {
              "minute_bucket": 29021981,
              "count": 0
            },
            {
              "minute_bucket": 29021982,
              "count": 0
            },
            {
              "minute_bucket": 29021983,
              "count": 0
            },
            {
              "minute_bucket": 29021984,
              "count": 0
            },
            {
              "minute_bucket": 29021985,
              "count": 0
            },
            {
              "minute_bucket": 29021986,
              "count": 0
            },
            {
              "minute_bucket": 29021987,
              "count": 0
            },
            {
              "minute_bucket": 29021988,
              "count": 0
            },
            {
              "minute_bucket": 29021989,
              "count": 0
            },
            {
              "minute_bucket": 29021990,
              "count": 0
            },
            {
              "minute_bucket": 29021991,
              "count": 0
            },
            {
              "minute_bucket": 29021992,
              "count": 0
            },
            {
              "minute_bucket": 29021993,
              "count": 0
            },
            {
              "minute_bucket": 29021994,
              "count": 0
            },
            {
              "minute_bucket": 29021995,
              "count": 0
            },
            {
              "minute_bucket": 29021996,
              "count": 0
            },
            {
              "minute_bucket": 29021997,
              "count": 0
            },
            {
              "minute_bucket": 29021998,
              "count": 0
            },
            {
              "minute_bucket": 29021999,
              "count": 0
            },
            {
              "minute_bucket": 29022000,
              "count": 1
            },
            {
              "minute_bucket": 29022001,
              "count": 0
            },
            {
              "minute_bucket": 29022002,
              "count": 0
            },
            {
              "minute_bucket": 29022003,
              "count": 0
            },
            {
              "minute_bucket": 29022004,
              "count": 0
            },
            {
              "minute_bucket": 29022005,
              "count": 0
            },
            {
              "minute_bucket": 29022006,
              "count": 0
            },
            {
              "minute_bucket": 29022007,
              "count": 0
            },
            {
              "minute_bucket": 29022008,
              "count": 0
            },
            {
              "minute_bucket": 29022009,
              "count": 0
            },
            {
              "minute_bucket": 29022010,
              "count": 0
            },
            {
              "minute_bucket": 29022011,
              "count": 0
            },
            {
              "minute_bucket": 29022012,
              "count": 0
            },
            {
              "minute_bucket": 29022013,
              "count": 0
            },
            {
              "minute_bucket": 29022014,
              "count": 0
            },
            {
              "minute_bucket": 29022015,
              "count": 0
            },
            {
              "minute_bucket": 29022016,
              "count": 0
            },
            {
              "minute_bucket": 29022017,
              "count": 0
            },
            {
              "minute_bucket": 29022018,
              "count": 0
            },
            {
              "minute_bucket": 29022019,
              "count": 0
            },
            {
              "minute_bucket": 29022020,
              "count": 0
            },
            {
              "minute_bucket": 29022021,
              "count": 0
            },
            {
              "minute_bucket": 29022022,
              "count": 0
            },
            {
              "minute_bucket": 29022023,
              "count": 0
            },
            {
              "minute_bucket": 29022024,
              "count": 0
            },
            {
              "minute_bucket": 29022025,
              "count": 0
            },
            {
              "minute_bucket": 29022026,
              "count": 0
            },
            {
              "minute_bucket": 29022027,
              "count": 0
            },
            {
              "minute_bucket": 29022028,
              "count": 0
            },
            {
              "minute_bucket": 29022029,
              "count": 0
            },
            {
              "minute_bucket": 29022030,
              "count": 0
            },
            {
              "minute_bucket": 29022031,
              "count": 0
            },
            {
              "minute_bucket": 29022032,
              "count": 0
            },
            {
              "minute_bucket": 29022033,
              "count": 0
            },
            {
              "minute_bucket": 29022034,
              "count": 0
            },
            {
              "minute_bucket": 29022035,
              "count": 0
            },
            {
              "minute_bucket": 29022036,
              "count": 0
            },
            {
              "minute_bucket": 29022037,
              "count": 0
            },
            {
              "minute_bucket": 29022038,
              "count": 0
            },
            {
              "minute_bucket": 29022039,
              "count": 0
            },
            {
              "minute_bucket": 29022040,
              "count": 0
            },
            {
              "minute_bucket": 29022041,
              "count": 0
            },
            {
              "minute_bucket": 29022042,
              "count": 0
            },
            {
              "minute_bucket": 29022043,
              "count": 0
            },
            {
              "minute_bucket": 29022044,
              "count": 0
            },
            {
              "minute_bucket": 29022045,
              "count": 0
            },
            {
              "minute_bucket": 29022046,
              "count": 0
            },
            {
              "minute_bucket": 29022047,
              "count": 0
            },
            {
              "minute_bucket": 29022048,
              "count": 0
            },
            {
              "minute_bucket": 29022049,
              "count": 0
            },
            {
              "minute_bucket": 29022050,
              "count": 0
            },
            {
              "minute_bucket": 29022051,
              "count": 0
            },
            {
              "minute_bucket": 29022052,
              "count": 0
            },
            {
              "minute_bucket": 29022053,
              "count": 0
            },
            {
              "minute_bucket": 29022054,
              "count": 0
            },
            {
              "minute_bucket": 29022055,
              "count": 0
            },
            {
              "minute_bucket": 29022056,
              "count": 0
            },
            {
              "minute_bucket": 29022057,
              "count": 0
            },
            {
              "minute_bucket": 29022058,
              "count": 0
            },
            {
              "minute_bucket": 29022059,
              "count": 0
            },
            {
              "minute_bucket": 29022060,
              "count": 1
            },
            {
              "minute_bucket": 29022061,
              "count": 0
            },
            {
              "minute_bucket": 29022062,
              "count": 0
            },
            {
              "minute_bucket": 29022063,
              "count": 0
            },
            {
              "minute_bucket": 29022064,
              "count": 0
            },
            {
              "minute_bucket": 29022065,
              "count": 0
            },
            {
              "minute_bucket": 29022066,
              "count": 0
            },
            {
              "minute_bucket": 29022067,
              "count": 0
            },
            {
              "minute_bucket": 29022068,
              "count": 0
            },
            {
              "minute_bucket": 29022069,
              "count": 0
            },
            {
              "minute_bucket": 29022070,
              "count": 0
            },
            {
              "minute_bucket": 29022071,
              "count": 0
            },
            {
              "minute_bucket": 29022072,
              "count": 0
            },
            {
              "minute_bucket": 29022073,
              "count": 0
            },
            {
              "minute_bucket": 29022074,
              "count": 0
            },
            {
              "minute_bucket": 29022075,
              "count": 0
            },
            {
              "minute_bucket": 29022076,
              "count": 0
            },
            {
              "minute_bucket": 29022077,
              "count": 0
            },
            {
              "minute_bucket": 29022078,
              "count": 0
            },
            {
              "minute_bucket": 29022079,
              "count": 0
            },
            {
              "minute_bucket": 29022080,
              "count": 0
            },
            {
              "minute_bucket": 29022081,
              "count": 0
            },
            {
              "minute_bucket": 29022082,
              "count": 0
            },
            {
              "minute_bucket": 29022083,
              "count": 0
            },
            {
              "minute_bucket": 29022084,
              "count": 0
            },
            {
              "minute_bucket": 29022085,
              "count": 0
            },
            {
              "minute_bucket": 29022086,
              "count": 0
            },
            {
              "minute_bucket": 29022087,
              "count": 0
            },
            {
              "minute_bucket": 29022088,
              "count": 0
            },
            {
              "minute_bucket": 29022089,
              "count": 0
            },
            {
              "minute_bucket": 29022090,
              "count": 0
            },
            {
              "minute_bucket": 29022091,
              "count": 0
            },
            {
              "minute_bucket": 29022092,
              "count": 0
            },
            {
              "minute_bucket": 29022093,
              "count": 0
            },
            {
              "minute_bucket": 29022094,
              "count": 0
            },
            {
              "minute_bucket": 29022095,
              "count": 0
            },
            {
              "minute_bucket": 29022096,
              "count": 0
            },
            {
              "minute_bucket": 29022097,
              "count": 0
            },
            {
              "minute_bucket": 29022098,
              "count": 0
            },
            {
              "minute_bucket": 29022099,
              "count": 0
            },
            {
              "minute_bucket": 29022100,
              "count": 0
            },
            {
              "minute_bucket": 29022101,
              "count": 0
            },
            {
              "minute_bucket": 29022102,
              "count": 0
            },
            {
              "minute_bucket": 29022103,
              "count": 0
            },
            {
              "minute_bucket": 29022104,
              "count": 0
            },
            {
              "minute_bucket": 29022105,
              "count": 0
            },
            {
              "minute_bucket": 29022106,
              "count": 0
            },
            {
              "minute_bucket": 29022107,
              "count": 0
            },
            {
              "minute_bucket": 29022108,
              "count": 0
            },
            {
              "minute_bucket": 29022109,
              "count": 0
            },
            {
              "minute_bucket": 29022110,
              "count": 0
            },
            {
              "minute_bucket": 29022111,
              "count": 0
            },
            {
              "minute_bucket": 29022112,
              "count": 0
            },
            {
              "minute_bucket": 29022113,
              "count": 0
            },
            {
              "minute_bucket": 29022114,
              "count": 0
            },
            {
              "minute_bucket": 29022115,
              "count": 0
            },
            {
              "minute_bucket": 29022116,
              "count": 0
            },
            {
              "minute_bucket": 29022117,
              "count": 0
            },
            {
              "minute_bucket": 29022118,
              "count": 0
            },
            {
              "minute_bucket": 29022119,
              "count": 0
            },
            {
              "minute_bucket": 29022120,
              "count": 1
            },
            {
              "minute_bucket": 29022121,
              "count": 0
            },
            {
              "minute_bucket": 29022122,
              "count": 0
            },
            {
              "minute_bucket": 29022123,
              "count": 0
            },
            {
              "minute_bucket": 29022124,
              "count": 0
            },
            {
              "minute_bucket": 29022125,
              "count": 0
            },
            {
              "minute_bucket": 29022126,
              "count": 0
            },
            {
              "minute_bucket": 29022127,
              "count": 0
            },
            {
              "minute_bucket": 29022128,
              "count": 0
            },
            {
              "minute_bucket": 29022129,
              "count": 0
            },
            {
              "minute_bucket": 29022130,
              "count": 0
            },
            {
              "minute_bucket": 29022131,
              "count": 0
            },
            {
              "minute_bucket": 29022132,
              "count": 0
            },
            {
              "minute_bucket": 29022133,
              "count": 0
            },
            {
              "minute_bucket": 29022134,
              "count": 0
            },
            {
              "minute_bucket": 29022135,
              "count": 0
            },
            {
              "minute_bucket": 29022136,
              "count": 0
            },
            {
              "minute_bucket": 29022137,
              "count": 0
            },
            {
              "minute_bucket": 29022138,
              "count": 0
            },
            {
              "minute_bucket": 29022139,
              "count": 0
            },
            {
              "minute_bucket": 29022140,
              "count": 0
            },
            {
              "minute_bucket": 29022141,
              "count": 0
            },
            {
              "minute_bucket": 29022142,
              "count": 0
            },
            {
              "minute_bucket": 29022143,
              "count": 0
            },
            {
              "minute_bucket": 29022144,
              "count": 0
            },
            {
              "minute_bucket": 29022145,
              "count": 0
            },
            {
              "minute_bucket": 29022146,
              "count": 0
            },
            {
              "minute_bucket": 29022147,
              "count": 0
            },
            {
              "minute_bucket": 29022148,
              "count": 0
            },
            {
              "minute_bucket": 29022149,
              "count": 0
            },
            {
              "minute_bucket": 29022150,
              "count": 0
            },
            {
              "minute_bucket": 29022151,
              "count": 0
            },
            {
              "minute_bucket": 29022152,
              "count": 0
            },
            {
              "minute_bucket": 29022153,
              "count": 0
            },
            {
              "minute_bucket": 29022154,
              "count": 0
            },
            {
              "minute_bucket": 29022155,
              "count": 0
            },
            {
              "minute_bucket": 29022156,
              "count": 0
            },
            {
              "minute_bucket": 29022157,
              "count": 0
            },
            {
              "minute_bucket": 29022158,
              "count": 0
            },
            {
              "minute_bucket": 29022159,
              "count": 0
            },
            {
              "minute_bucket": 29022160,
              "count": 0
            },
            {
              "minute_bucket": 29022161,
              "count": 0
            },
            {
              "minute_bucket": 29022162,
              "count": 0
            },
            {
              "minute_bucket": 29022163,
              "count": 0
            },
            {
              "minute_bucket": 29022164,
              "count": 0
            },
            {
              "minute_bucket": 29022165,
              "count": 0
            },
            {
              "minute_bucket": 29022166,
              "count": 0
            },
            {
              "minute_bucket": 29022167,
              "count": 0
            },
            {
              "minute_bucket": 29022168,
              "count": 0
            },
            {
              "minute_bucket": 29022169,
              "count": 0
            },
            {
              "minute_bucket": 29022170,
              "count": 0
            },
            {
              "minute_bucket": 29022171,
              "count": 0
            },
            {
              "minute_bucket": 29022172,
              "count": 0
            },
            {
              "minute_bucket": 29022173,
              "count": 0
            },
            {
              "minute_bucket": 29022174,
              "count": 0
            },
            {
              "minute_bucket": 29022175,
              "count": 0
            },
            {
              "minute_bucket": 29022176,
              "count": 0
            },
            {
              "minute_bucket": 29022177,
              "count": 0
            },
            {
              "minute_bucket": 29022178,
              "count": 0
            },
            {
              "minute_bucket": 29022179,
              "count": 0
            },
            {
              "minute_bucket": 29022180,
              "count": 1
            },
            {
              "minute_bucket": 29022181,
              "count": 0
            },
            {
              "minute_bucket": 29022182,
              "count": 0
            },
            {
              "minute_bucket": 29022183,
              "count": 0
            },
            {
              "minute_bucket": 29022184,
              "count": 0
            },
            {
              "minute_bucket": 29022185,
              "count": 0
            },
            {
              "minute_bucket": 29022186,
              "count": 0
            },
            {
              "minute_bucket": 29022187,
              "count": 0
            },
            {
              "minute_bucket": 29022188,
              "count": 0
            },
            {
              "minute_bucket": 29022189,
              "count": 0
            },
            {
              "minute_bucket": 29022190,
              "count": 0
            },
            {
              "minute_bucket": 29022191,
              "count": 0
            },
            {
              "minute_bucket": 29022192,
              "count": 0
            },
            {
              "minute_bucket": 29022193,
              "count": 0
            },
            {
              "minute_bucket": 29022194,
              "count": 0
            },
            {
              "minute_bucket": 29022195,
              "count": 0
            },
            {
              "minute_bucket": 29022196,
              "count": 0
            },
            {
              "minute_bucket": 29022197,
              "count": 0
            },
            {
              "minute_bucket": 29022198,
              "count": 0
            },
            {
              "minute_bucket": 29022199,
              "count": 0
            },
            {
              "minute_bucket": 29022200,
              "count": 0
            },
            {
              "minute_bucket": 29022201,
              "count": 0
            },
            {
              "minute_bucket": 29022202,
              "count": 0
            },
            {
              "minute_bucket": 29022203,
              "count": 0
            },
            {
              "minute_bucket": 29022204,
              "count": 0
            },
            {
              "minute_bucket": 29022205,
              "count": 0
            },
            {
              "minute_bucket": 29022206,
              "count": 0
            },
            {
              "minute_bucket": 29022207,
              "count": 0
            },
            {
              "minute_bucket": 29022208,
              "count": 0
            },
            {
              "minute_bucket": 29022209,
              "count": 0
            },
            {
              "minute_bucket": 29022210,
              "count": 0
            },
            {
              "minute_bucket": 29022211,
              "count": 0
            },
            {
              "minute_bucket": 29022212,
              "count": 0
            },
            {
              "minute_bucket": 29022213,
              "count": 0
            },
            {
              "minute_bucket": 29022214,
              "count": 0
            },
            {
              "minute_bucket": 29022215,
              "count": 0
            },
            {
              "minute_bucket": 29022216,
              "count": 0
            },
            {
              "minute_bucket": 29022217,
              "count": 0
            },
            {
              "minute_bucket": 29022218,
              "count": 0
            },
            {
              "minute_bucket": 29022219,
              "count": 0
            },
            {
              "minute_bucket": 29022220,
              "count": 0
            },
            {
              "minute_bucket": 29022221,
              "count": 0
            },
            {
              "minute_bucket": 29022222,
              "count": 0
            },
            {
              "minute_bucket": 29022223,
              "count": 0
            },
            {
              "minute_bucket": 29022224,
              "count": 0
            },
            {
              "minute_bucket": 29022225,
              "count": 0
            },
            {
              "minute_bucket": 29022226,
              "count": 0
            },
            {
              "minute_bucket": 29022227,
              "count": 0
            },
            {
              "minute_bucket": 29022228,
              "count": 6
            },
            {
              "minute_bucket": 29022229,
              "count": 8
            },
            {
              "minute_bucket": 29022230,
              "count": 123
            },
            {
              "minute_bucket": 29022231,
              "count": 7
            },
            {
              "minute_bucket": 29022232,
              "count": 39
            },
            {
              "minute_bucket": 29022233,
              "count": 1
            },
            {
              "minute_bucket": 29022234,
              "count": 0
            },
            {
              "minute_bucket": 29022235,
              "count": 0
            },
            {
              "minute_bucket": 29022236,
              "count": 0
            },
            {
              "minute_bucket": 29022237,
              "count": 0
            },
            {
              "minute_bucket": 29022238,
              "count": 0
            },
            {
              "minute_bucket": 29022239,
              "count": 0
            },
            {
              "minute_bucket": 29022240,
              "count": 1
            },
            {
              "minute_bucket": 29022241,
              "count": 0
            },
            {
              "minute_bucket": 29022242,
              "count": 0
            },
            {
              "minute_bucket": 29022243,
              "count": 0
            },
            {
              "minute_bucket": 29022244,
              "count": 0
            },
            {
              "minute_bucket": 29022245,
              "count": 0
            },
            {
              "minute_bucket": 29022246,
              "count": 0
            },
            {
              "minute_bucket": 29022247,
              "count": 0
            },
            {
              "minute_bucket": 29022248,
              "count": 0
            },
            {
              "minute_bucket": 29022249,
              "count": 0
            },
            {
              "minute_bucket": 29022250,
              "count": 0
            },
            {
              "minute_bucket": 29022251,
              "count": 0
            },
            {
              "minute_bucket": 29022252,
              "count": 0
            },
            {
              "minute_bucket": 29022253,
              "count": 0
            },
            {
              "minute_bucket": 29022254,
              "count": 0
            },
            {
              "minute_bucket": 29022255,
              "count": 0
            },
            {
              "minute_bucket": 29022256,
              "count": 0
            },
            {
              "minute_bucket": 29022257,
              "count": 0
            },
            {
              "minute_bucket": 29022258,
              "count": 0
            },
            {
              "minute_bucket": 29022259,
              "count": 0
            },
            {
              "minute_bucket": 29022260,
              "count": 0
            },
            {
              "minute_bucket": 29022261,
              "count": 0
            },
            {
              "minute_bucket": 29022262,
              "count": 0
            },
            {
              "minute_bucket": 29022263,
              "count": 10
            },
            {
              "minute_bucket": 29022264,
              "count": 0
            },
            {
              "minute_bucket": 29022265,
              "count": 0
            },
            {
              "minute_bucket": 29022266,
              "count": 0
            },
            {
              "minute_bucket": 29022267,
              "count": 0
            },
            {
              "minute_bucket": 29022268,
              "count": 0
            },
            {
              "minute_bucket": 29022269,
              "count": 0
            },
            {
              "minute_bucket": 29022270,
              "count": 0
            },
            {
              "minute_bucket": 29022271,
              "count": 0
            },
            {
              "minute_bucket": 29022272,
              "count": 0
            },
            {
              "minute_bucket": 29022273,
              "count": 0
            },
            {
              "minute_bucket": 29022274,
              "count": 0
            },
            {
              "minute_bucket": 29022275,
              "count": 0
            },
            {
              "minute_bucket": 29022276,
              "count": 0
            },
            {
              "minute_bucket": 29022277,
              "count": 0
            },
            {
              "minute_bucket": 29022278,
              "count": 0
            },
            {
              "minute_bucket": 29022279,
              "count": 0
            },
            {
              "minute_bucket": 29022280,
              "count": 0
            },
            {
              "minute_bucket": 29022281,
              "count": 0
            },
            {
              "minute_bucket": 29022282,
              "count": 0
            },
            {
              "minute_bucket": 29022283,
              "count": 0
            },
            {
              "minute_bucket": 29022284,
              "count": 0
            },
            {
              "minute_bucket": 29022285,
              "count": 0
            },
            {
              "minute_bucket": 29022286,
              "count": 0
            },
            {
              "minute_bucket": 29022287,
              "count": 0
            },
            {
              "minute_bucket": 29022288,
              "count": 0
            },
            {
              "minute_bucket": 29022289,
              "count": 0
            },
            {
              "minute_bucket": 29022290,
              "count": 0
            },
            {
              "minute_bucket": 29022291,
              "count": 0
            },
            {
              "minute_bucket": 29022292,
              "count": 0
            },
            {
              "minute_bucket": 29022293,
              "count": 0
            },
            {
              "minute_bucket": 29022294,
              "count": 0
            },
            {
              "minute_bucket": 29022295,
              "count": 0
            },
            {
              "minute_bucket": 29022296,
              "count": 0
            },
            {
              "minute_bucket": 29022297,
              "count": 0
            },
            {
              "minute_bucket": 29022298,
              "count": 0
            },
            {
              "minute_bucket": 29022299,
              "count": 0
            },
            {
              "minute_bucket": 29022300,
              "count": 1
            },
            {
              "minute_bucket": 29022301,
              "count": 0
            },
            {
              "minute_bucket": 29022302,
              "count": 0
            },
            {
              "minute_bucket": 29022303,
              "count": 0
            },
            {
              "minute_bucket": 29022304,
              "count": 0
            },
            {
              "minute_bucket": 29022305,
              "count": 0
            },
            {
              "minute_bucket": 29022306,
              "count": 0
            },
            {
              "minute_bucket": 29022307,
              "count": 0
            },
            {
              "minute_bucket": 29022308,
              "count": 0
            },
            {
              "minute_bucket": 29022309,
              "count": 0
            },
            {
              "minute_bucket": 29022310,
              "count": 0
            },
            {
              "minute_bucket": 29022311,
              "count": 0
            },
            {
              "minute_bucket": 29022312,
              "count": 0
            },
            {
              "minute_bucket": 29022313,
              "count": 0
            },
            {
              "minute_bucket": 29022314,
              "count": 0
            },
            {
              "minute_bucket": 29022315,
              "count": 0
            },
            {
              "minute_bucket": 29022316,
              "count": 0
            },
            {
              "minute_bucket": 29022317,
              "count": 0
            },
            {
              "minute_bucket": 29022318,
              "count": 0
            },
            {
              "minute_bucket": 29022319,
              "count": 0
            },
            {
              "minute_bucket": 29022320,
              "count": 0
            },
            {
              "minute_bucket": 29022321,
              "count": 0
            },
            {
              "minute_bucket": 29022322,
              "count": 0
            },
            {
              "minute_bucket": 29022323,
              "count": 0
            },
            {
              "minute_bucket": 29022324,
              "count": 0
            },
            {
              "minute_bucket": 29022325,
              "count": 0
            },
            {
              "minute_bucket": 29022326,
              "count": 0
            },
            {
              "minute_bucket": 29022327,
              "count": 0
            },
            {
              "minute_bucket": 29022328,
              "count": 0
            },
            {
              "minute_bucket": 29022329,
              "count": 0
            },
            {
              "minute_bucket": 29022330,
              "count": 0
            },
            {
              "minute_bucket": 29022331,
              "count": 0
            },
            {
              "minute_bucket": 29022332,
              "count": 0
            },
            {
              "minute_bucket": 29022333,
              "count": 0
            },
            {
              "minute_bucket": 29022334,
              "count": 0
            },
            {
              "minute_bucket": 29022335,
              "count": 0
            },
            {
              "minute_bucket": 29022336,
              "count": 0
            },
            {
              "minute_bucket": 29022337,
              "count": 0
            },
            {
              "minute_bucket": 29022338,
              "count": 0
            },
            {
              "minute_bucket": 29022339,
              "count": 0
            },
            {
              "minute_bucket": 29022340,
              "count": 0
            },
            {
              "minute_bucket": 29022341,
              "count": 11
            },
            {
              "minute_bucket": 29022342,
              "count": 0
            },
            {
              "minute_bucket": 29022343,
              "count": 0
            },
            {
              "minute_bucket": 29022344,
              "count": 3
            },
            {
              "minute_bucket": 29022345,
              "count": 2
            },
            {
              "minute_bucket": 29022346,
              "count": 6
            },
            {
              "minute_bucket": 29022347,
              "count": 6
            },
            {
              "minute_bucket": 29022348,
              "count": 0
            },
            {
              "minute_bucket": 29022349,
              "count": 0
            },
            {
              "minute_bucket": 29022350,
              "count": 0
            },
            {
              "minute_bucket": 29022351,
              "count": 0
            },
            {
              "minute_bucket": 29022352,
              "count": 0
            },
            {
              "minute_bucket": 29022353,
              "count": 129
            },
            {
              "minute_bucket": 29022354,
              "count": 15
            },
            {
              "minute_bucket": 29022355,
              "count": 0
            },
            {
              "minute_bucket": 29022356,
              "count": 0
            },
            {
              "minute_bucket": 29022357,
              "count": 0
            },
            {
              "minute_bucket": 29022358,
              "count": 0
            },
            {
              "minute_bucket": 29022359,
              "count": 0
            },
            {
              "minute_bucket": 29022360,
              "count": 1
            },
            {
              "minute_bucket": 29022361,
              "count": 0
            },
            {
              "minute_bucket": 29022362,
              "count": 0
            },
            {
              "minute_bucket": 29022363,
              "count": 0
            },
            {
              "minute_bucket": 29022364,
              "count": 0
            },
            {
              "minute_bucket": 29022365,
              "count": 0
            },
            {
              "minute_bucket": 29022366,
              "count": 0
            },
            {
              "minute_bucket": 29022367,
              "count": 0
            },
            {
              "minute_bucket": 29022368,
              "count": 0
            },
            {
              "minute_bucket": 29022369,
              "count": 0
            },
            {
              "minute_bucket": 29022370,
              "count": 0
            },
            {
              "minute_bucket": 29022371,
              "count": 0
            },
            {
              "minute_bucket": 29022372,
              "count": 0
            },
            {
              "minute_bucket": 29022373,
              "count": 0
            },
            {
              "minute_bucket": 29022374,
              "count": 0
            },
            {
              "minute_bucket": 29022375,
              "count": 0
            },
            {
              "minute_bucket": 29022376,
              "count": 0
            },
            {
              "minute_bucket": 29022377,
              "count": 0
            },
            {
              "minute_bucket": 29022378,
              "count": 0
            },
            {
              "minute_bucket": 29022379,
              "count": 0
            },
            {
              "minute_bucket": 29022380,
              "count": 0
            },
            {
              "minute_bucket": 29022381,
              "count": 28
            },
            {
              "minute_bucket": 29022382,
              "count": 3
            },
            {
              "minute_bucket": 29022383,
              "count": 0
            },
            {
              "minute_bucket": 29022384,
              "count": 0
            },
            {
              "minute_bucket": 29022385,
              "count": 0
            },
            {
              "minute_bucket": 29022386,
              "count": 0
            },
            {
              "minute_bucket": 29022387,
              "count": 0
            },
            {
              "minute_bucket": 29022388,
              "count": 0
            },
            {
              "minute_bucket": 29022389,
              "count": 0
            },
            {
              "minute_bucket": 29022390,
              "count": 0
            },
            {
              "minute_bucket": 29022391,
              "count": 0
            },
            {
              "minute_bucket": 29022392,
              "count": 0
            },
            {
              "minute_bucket": 29022393,
              "count": 0
            },
            {
              "minute_bucket": 29022394,
              "count": 0
            },
            {
              "minute_bucket": 29022395,
              "count": 0
            },
            {
              "minute_bucket": 29022396,
              "count": 0
            },
            {
              "minute_bucket": 29022397,
              "count": 0
            },
            {
              "minute_bucket": 29022398,
              "count": 0
            },
            {
              "minute_bucket": 29022399,
              "count": 0
            },
            {
              "minute_bucket": 29022400,
              "count": 0
            },
            {
              "minute_bucket": 29022401,
              "count": 0
            },
            {
              "minute_bucket": 29022402,
              "count": 0
            },
            {
              "minute_bucket": 29022403,
              "count": 0
            },
            {
              "minute_bucket": 29022404,
              "count": 0
            },
            {
              "minute_bucket": 29022405,
              "count": 0
            },
            {
              "minute_bucket": 29022406,
              "count": 0
            },
            {
              "minute_bucket": 29022407,
              "count": 0
            },
            {
              "minute_bucket": 29022408,
              "count": 0
            },
            {
              "minute_bucket": 29022409,
              "count": 0
            },
            {
              "minute_bucket": 29022410,
              "count": 0
            },
            {
              "minute_bucket": 29022411,
              "count": 0
            },
            {
              "minute_bucket": 29022412,
              "count": 0
            },
            {
              "minute_bucket": 29022413,
              "count": 0
            },
            {
              "minute_bucket": 29022414,
              "count": 0
            },
            {
              "minute_bucket": 29022415,
              "count": 0
            },
            {
              "minute_bucket": 29022416,
              "count": 0
            },
            {
              "minute_bucket": 29022417,
              "count": 0
            },
            {
              "minute_bucket": 29022418,
              "count": 0
            },
            {
              "minute_bucket": 29022419,
              "count": 1
            },
            {
              "minute_bucket": 29022420,
              "count": 37
            },
            {
              "minute_bucket": 29022421,
              "count": 27
            },
            {
              "minute_bucket": 29022422,
              "count": 0
            },
            {
              "minute_bucket": 29022423,
              "count": 0
            },
            {
              "minute_bucket": 29022424,
              "count": 0
            },
            {
              "minute_bucket": 29022425,
              "count": 0
            },
            {
              "minute_bucket": 29022426,
              "count": 0
            },
            {
              "minute_bucket": 29022427,
              "count": 0
            },
            {
              "minute_bucket": 29022428,
              "count": 0
            },
            {
              "minute_bucket": 29022429,
              "count": 0
            },
            {
              "minute_bucket": 29022430,
              "count": 0
            },
            {
              "minute_bucket": 29022431,
              "count": 0
            },
            {
              "minute_bucket": 29022432,
              "count": 0
            },
            {
              "minute_bucket": 29022433,
              "count": 0
            },
            {
              "minute_bucket": 29022434,
              "count": 0
            },
            {
              "minute_bucket": 29022435,
              "count": 0
            },
            {
              "minute_bucket": 29022436,
              "count": 0
            },
            {
              "minute_bucket": 29022437,
              "count": 0
            },
            {
              "minute_bucket": 29022438,
              "count": 0
            },
            {
              "minute_bucket": 29022439,
              "count": 0
            },
            {
              "minute_bucket": 29022440,
              "count": 0
            },
            {
              "minute_bucket": 29022441,
              "count": 0
            },
            {
              "minute_bucket": 29022442,
              "count": 0
            },
            {
              "minute_bucket": 29022443,
              "count": 0
            },
            {
              "minute_bucket": 29022444,
              "count": 0
            },
            {
              "minute_bucket": 29022445,
              "count": 0
            },
            {
              "minute_bucket": 29022446,
              "count": 0
            },
            {
              "minute_bucket": 29022447,
              "count": 0
            },
            {
              "minute_bucket": 29022448,
              "count": 0
            },
            {
              "minute_bucket": 29022449,
              "count": 0
            },
            {
              "minute_bucket": 29022450,
              "count": 0
            },
            {
              "minute_bucket": 29022451,
              "count": 0
            },
            {
              "minute_bucket": 29022452,
              "count": 0
            },
            {
              "minute_bucket": 29022453,
              "count": 0
            },
            {
              "minute_bucket": 29022454,
              "count": 0
            },
            {
              "minute_bucket": 29022455,
              "count": 0
            },
            {
              "minute_bucket": 29022456,
              "count": 0
            },
            {
              "minute_bucket": 29022457,
              "count": 0
            },
            {
              "minute_bucket": 29022458,
              "count": 0
            },
            {
              "minute_bucket": 29022459,
              "count": 0
            },
            {
              "minute_bucket": 29022460,
              "count": 0
            },
            {
              "minute_bucket": 29022461,
              "count": 0
            },
            {
              "minute_bucket": 29022462,
              "count": 0
            },
            {
              "minute_bucket": 29022463,
              "count": 0
            },
            {
              "minute_bucket": 29022464,
              "count": 0
            },
            {
              "minute_bucket": 29022465,
              "count": 0
            },
            {
              "minute_bucket": 29022466,
              "count": 0
            },
            {
              "minute_bucket": 29022467,
              "count": 0
            },
            {
              "minute_bucket": 29022468,
              "count": 0
            },
            {
              "minute_bucket": 29022469,
              "count": 0
            },
            {
              "minute_bucket": 29022470,
              "count": 0
            },
            {
              "minute_bucket": 29022471,
              "count": 0
            },
            {
              "minute_bucket": 29022472,
              "count": 0
            },
            {
              "minute_bucket": 29022473,
              "count": 0
            },
            {
              "minute_bucket": 29022474,
              "count": 0
            },
            {
              "minute_bucket": 29022475,
              "count": 0
            },
            {
              "minute_bucket": 29022476,
              "count": 0
            },
            {
              "minute_bucket": 29022477,
              "count": 0
            },
            {
              "minute_bucket": 29022478,
              "count": 0
            },
            {
              "minute_bucket": 29022479,
              "count": 0
            },
            {
              "minute_bucket": 29022480,
              "count": 1
            },
            {
              "minute_bucket": 29022481,
              "count": 0
            },
            {
              "minute_bucket": 29022482,
              "count": 0
            },
            {
              "minute_bucket": 29022483,
              "count": 0
            },
            {
              "minute_bucket": 29022484,
              "count": 0
            },
            {
              "minute_bucket": 29022485,
              "count": 0
            },
            {
              "minute_bucket": 29022486,
              "count": 0
            },
            {
              "minute_bucket": 29022487,
              "count": 0
            },
            {
              "minute_bucket": 29022488,
              "count": 0
            },
            {
              "minute_bucket": 29022489,
              "count": 0
            },
            {
              "minute_bucket": 29022490,
              "count": 0
            },
            {
              "minute_bucket": 29022491,
              "count": 0
            },
            {
              "minute_bucket": 29022492,
              "count": 0
            },
            {
              "minute_bucket": 29022493,
              "count": 0
            },
            {
              "minute_bucket": 29022494,
              "count": 0
            },
            {
              "minute_bucket": 29022495,
              "count": 0
            },
            {
              "minute_bucket": 29022496,
              "count": 0
            },
            {
              "minute_bucket": 29022497,
              "count": 0
            },
            {
              "minute_bucket": 29022498,
              "count": 0
            },
            {
              "minute_bucket": 29022499,
              "count": 0
            },
            {
              "minute_bucket": 29022500,
              "count": 0
            },
            {
              "minute_bucket": 29022501,
              "count": 0
            },
            {
              "minute_bucket": 29022502,
              "count": 0
            },
            {
              "minute_bucket": 29022503,
              "count": 0
            },
            {
              "minute_bucket": 29022504,
              "count": 0
            },
            {
              "minute_bucket": 29022505,
              "count": 0
            },
            {
              "minute_bucket": 29022506,
              "count": 0
            },
            {
              "minute_bucket": 29022507,
              "count": 0
            },
            {
              "minute_bucket": 29022508,
              "count": 0
            },
            {
              "minute_bucket": 29022509,
              "count": 0
            },
            {
              "minute_bucket": 29022510,
              "count": 0
            },
            {
              "minute_bucket": 29022511,
              "count": 0
            },
            {
              "minute_bucket": 29022512,
              "count": 0
            },
            {
              "minute_bucket": 29022513,
              "count": 0
            },
            {
              "minute_bucket": 29022514,
              "count": 0
            },
            {
              "minute_bucket": 29022515,
              "count": 0
            },
            {
              "minute_bucket": 29022516,
              "count": 0
            },
            {
              "minute_bucket": 29022517,
              "count": 0
            },
            {
              "minute_bucket": 29022518,
              "count": 0
            },
            {
              "minute_bucket": 29022519,
              "count": 0
            },
            {
              "minute_bucket": 29022520,
              "count": 0
            },
            {
              "minute_bucket": 29022521,
              "count": 0
            },
            {
              "minute_bucket": 29022522,
              "count": 0
            },
            {
              "minute_bucket": 29022523,
              "count": 0
            },
            {
              "minute_bucket": 29022524,
              "count": 0
            },
            {
              "minute_bucket": 29022525,
              "count": 0
            },
            {
              "minute_bucket": 29022526,
              "count": 0
            },
            {
              "minute_bucket": 29022527,
              "count": 0
            },
            {
              "minute_bucket": 29022528,
              "count": 0
            },
            {
              "minute_bucket": 29022529,
              "count": 0
            },
            {
              "minute_bucket": 29022530,
              "count": 0
            },
            {
              "minute_bucket": 29022531,
              "count": 0
            },
            {
              "minute_bucket": 29022532,
              "count": 0
            },
            {
              "minute_bucket": 29022533,
              "count": 0
            },
            {
              "minute_bucket": 29022534,
              "count": 0
            },
            {
              "minute_bucket": 29022535,
              "count": 0
            },
            {
              "minute_bucket": 29022536,
              "count": 0
            },
            {
              "minute_bucket": 29022537,
              "count": 0
            },
            {
              "minute_bucket": 29022538,
              "count": 0
            },
            {
              "minute_bucket": 29022539,
              "count": 0
            },
            {
              "minute_bucket": 29022540,
              "count": 1
            },
            {
              "minute_bucket": 29022541,
              "count": 0
            },
            {
              "minute_bucket": 29022542,
              "count": 0
            },
            {
              "minute_bucket": 29022543,
              "count": 0
            },
            {
              "minute_bucket": 29022544,
              "count": 0
            },
            {
              "minute_bucket": 29022545,
              "count": 0
            },
            {
              "minute_bucket": 29022546,
              "count": 0
            },
            {
              "minute_bucket": 29022547,
              "count": 0
            },
            {
              "minute_bucket": 29022548,
              "count": 0
            },
            {
              "minute_bucket": 29022549,
              "count": 0
            },
            {
              "minute_bucket": 29022550,
              "count": 0
            },
            {
              "minute_bucket": 29022551,
              "count": 0
            },
            {
              "minute_bucket": 29022552,
              "count": 0
            },
            {
              "minute_bucket": 29022553,
              "count": 0
            },
            {
              "minute_bucket": 29022554,
              "count": 0
            },
            {
              "minute_bucket": 29022555,
              "count": 0
            },
            {
              "minute_bucket": 29022556,
              "count": 0
            },
            {
              "minute_bucket": 29022557,
              "count": 0
            },
            {
              "minute_bucket": 29022558,
              "count": 0
            },
            {
              "minute_bucket": 29022559,
              "count": 0
            },
            {
              "minute_bucket": 29022560,
              "count": 0
            },
            {
              "minute_bucket": 29022561,
              "count": 0
            },
            {
              "minute_bucket": 29022562,
              "count": 0
            },
            {
              "minute_bucket": 29022563,
              "count": 0
            },
            {
              "minute_bucket": 29022564,
              "count": 0
            },
            {
              "minute_bucket": 29022565,
              "count": 0
            },
            {
              "minute_bucket": 29022566,
              "count": 0
            },
            {
              "minute_bucket": 29022567,
              "count": 0
            },
            {
              "minute_bucket": 29022568,
              "count": 0
            },
            {
              "minute_bucket": 29022569,
              "count": 0
            },
            {
              "minute_bucket": 29022570,
              "count": 0
            },
            {
              "minute_bucket": 29022571,
              "count": 0
            },
            {
              "minute_bucket": 29022572,
              "count": 0
            },
            {
              "minute_bucket": 29022573,
              "count": 0
            },
            {
              "minute_bucket": 29022574,
              "count": 0
            },
            {
              "minute_bucket": 29022575,
              "count": 0
            },
            {
              "minute_bucket": 29022576,
              "count": 0
            },
            {
              "minute_bucket": 29022577,
              "count": 0
            },
            {
              "minute_bucket": 29022578,
              "count": 0
            },
            {
              "minute_bucket": 29022579,
              "count": 0
            },
            {
              "minute_bucket": 29022580,
              "count": 0
            },
            {
              "minute_bucket": 29022581,
              "count": 0
            },
            {
              "minute_bucket": 29022582,
              "count": 24
            },
            {
              "minute_bucket": 29022583,
              "count": 0
            },
            {
              "minute_bucket": 29022584,
              "count": 0
            },
            {
              "minute_bucket": 29022585,
              "count": 0
            },
            {
              "minute_bucket": 29022586,
              "count": 0
            },
            {
              "minute_bucket": 29022587,
              "count": 0
            },
            {
              "minute_bucket": 29022588,
              "count": 0
            },
            {
              "minute_bucket": 29022589,
              "count": 0
            },
            {
              "minute_bucket": 29022590,
              "count": 0
            },
            {
              "minute_bucket": 29022591,
              "count": 0
            },
            {
              "minute_bucket": 29022592,
              "count": 0
            },
            {
              "minute_bucket": 29022593,
              "count": 0
            },
            {
              "minute_bucket": 29022594,
              "count": 0
            },
            {
              "minute_bucket": 29022595,
              "count": 0
            },
            {
              "minute_bucket": 29022596,
              "count": 0
            },
            {
              "minute_bucket": 29022597,
              "count": 0
            },
            {
              "minute_bucket": 29022598,
              "count": 0
            },
            {
              "minute_bucket": 29022599,
              "count": 0
            },
            {
              "minute_bucket": 29022600,
              "count": 1
            },
            {
              "minute_bucket": 29022601,
              "count": 0
            },
            {
              "minute_bucket": 29022602,
              "count": 0
            },
            {
              "minute_bucket": 29022603,
              "count": 0
            },
            {
              "minute_bucket": 29022604,
              "count": 0
            },
            {
              "minute_bucket": 29022605,
              "count": 0
            },
            {
              "minute_bucket": 29022606,
              "count": 0
            },
            {
              "minute_bucket": 29022607,
              "count": 0
            },
            {
              "minute_bucket": 29022608,
              "count": 0
            },
            {
              "minute_bucket": 29022609,
              "count": 0
            },
            {
              "minute_bucket": 29022610,
              "count": 0
            },
            {
              "minute_bucket": 29022611,
              "count": 0
            },
            {
              "minute_bucket": 29022612,
              "count": 0
            },
            {
              "minute_bucket": 29022613,
              "count": 0
            },
            {
              "minute_bucket": 29022614,
              "count": 0
            },
            {
              "minute_bucket": 29022615,
              "count": 0
            },
            {
              "minute_bucket": 29022616,
              "count": 0
            },
            {
              "minute_bucket": 29022617,
              "count": 0
            },
            {
              "minute_bucket": 29022618,
              "count": 0
            },
            {
              "minute_bucket": 29022619,
              "count": 0
            },
            {
              "minute_bucket": 29022620,
              "count": 0
            },
            {
              "minute_bucket": 29022621,
              "count": 0
            },
            {
              "minute_bucket": 29022622,
              "count": 0
            },
            {
              "minute_bucket": 29022623,
              "count": 0
            },
            {
              "minute_bucket": 29022624,
              "count": 0
            },
            {
              "minute_bucket": 29022625,
              "count": 0
            },
            {
              "minute_bucket": 29022626,
              "count": 0
            },
            {
              "minute_bucket": 29022627,
              "count": 0
            },
            {
              "minute_bucket": 29022628,
              "count": 0
            },
            {
              "minute_bucket": 29022629,
              "count": 0
            },
            {
              "minute_bucket": 29022630,
              "count": 0
            },
            {
              "minute_bucket": 29022631,
              "count": 0
            },
            {
              "minute_bucket": 29022632,
              "count": 0
            },
            {
              "minute_bucket": 29022633,
              "count": 0
            },
            {
              "minute_bucket": 29022634,
              "count": 0
            },
            {
              "minute_bucket": 29022635,
              "count": 0
            },
            {
              "minute_bucket": 29022636,
              "count": 0
            },
            {
              "minute_bucket": 29022637,
              "count": 0
            },
            {
              "minute_bucket": 29022638,
              "count": 0
            },
            {
              "minute_bucket": 29022639,
              "count": 0
            },
            {
              "minute_bucket": 29022640,
              "count": 0
            },
            {
              "minute_bucket": 29022641,
              "count": 0
            },
            {
              "minute_bucket": 29022642,
              "count": 0
            },
            {
              "minute_bucket": 29022643,
              "count": 0
            },
            {
              "minute_bucket": 29022644,
              "count": 0
            },
            {
              "minute_bucket": 29022645,
              "count": 0
            },
            {
              "minute_bucket": 29022646,
              "count": 0
            },
            {
              "minute_bucket": 29022647,
              "count": 0
            },
            {
              "minute_bucket": 29022648,
              "count": 0
            },
            {
              "minute_bucket": 29022649,
              "count": 0
            },
            {
              "minute_bucket": 29022650,
              "count": 0
            },
            {
              "minute_bucket": 29022651,
              "count": 0
            },
            {
              "minute_bucket": 29022652,
              "count": 0
            },
            {
              "minute_bucket": 29022653,
              "count": 0
            },
            {
              "minute_bucket": 29022654,
              "count": 0
            },
            {
              "minute_bucket": 29022655,
              "count": 0
            },
            {
              "minute_bucket": 29022656,
              "count": 0
            },
            {
              "minute_bucket": 29022657,
              "count": 0
            },
            {
              "minute_bucket": 29022658,
              "count": 0
            },
            {
              "minute_bucket": 29022659,
              "count": 0
            },
            {
              "minute_bucket": 29022660,
              "count": 1
            },
            {
              "minute_bucket": 29022661,
              "count": 75
            },
            {
              "minute_bucket": 29022662,
              "count": 87
            },
            {
              "minute_bucket": 29022663,
              "count": 0
            },
            {
              "minute_bucket": 29022664,
              "count": 0
            },
            {
              "minute_bucket": 29022665,
              "count": 0
            },
            {
              "minute_bucket": 29022666,
              "count": 0
            },
            {
              "minute_bucket": 29022667,
              "count": 0
            },
            {
              "minute_bucket": 29022668,
              "count": 0
            },
            {
              "minute_bucket": 29022669,
              "count": 0
            },
            {
              "minute_bucket": 29022670,
              "count": 0
            },
            {
              "minute_bucket": 29022671,
              "count": 0
            },
            {
              "minute_bucket": 29022672,
              "count": 0
            },
            {
              "minute_bucket": 29022673,
              "count": 0
            },
            {
              "minute_bucket": 29022674,
              "count": 0
            },
            {
              "minute_bucket": 29022675,
              "count": 0
            },
            {
              "minute_bucket": 29022676,
              "count": 0
            },
            {
              "minute_bucket": 29022677,
              "count": 0
            },
            {
              "minute_bucket": 29022678,
              "count": 0
            },
            {
              "minute_bucket": 29022679,
              "count": 0
            },
            {
              "minute_bucket": 29022680,
              "count": 0
            },
            {
              "minute_bucket": 29022681,
              "count": 0
            },
            {
              "minute_bucket": 29022682,
              "count": 0
            },
            {
              "minute_bucket": 29022683,
              "count": 0
            },
            {
              "minute_bucket": 29022684,
              "count": 0
            },
            {
              "minute_bucket": 29022685,
              "count": 0
            },
            {
              "minute_bucket": 29022686,
              "count": 0
            },
            {
              "minute_bucket": 29022687,
              "count": 0
            },
            {
              "minute_bucket": 29022688,
              "count": 0
            },
            {
              "minute_bucket": 29022689,
              "count": 0
            },
            {
              "minute_bucket": 29022690,
              "count": 0
            },
            {
              "minute_bucket": 29022691,
              "count": 0
            },
            {
              "minute_bucket": 29022692,
              "count": 0
            },
            {
              "minute_bucket": 29022693,
              "count": 0
            },
            {
              "minute_bucket": 29022694,
              "count": 0
            },
            {
              "minute_bucket": 29022695,
              "count": 0
            },
            {
              "minute_bucket": 29022696,
              "count": 0
            },
            {
              "minute_bucket": 29022697,
              "count": 0
            },
            {
              "minute_bucket": 29022698,
              "count": 0
            },
            {
              "minute_bucket": 29022699,
              "count": 0
            },
            {
              "minute_bucket": 29022700,
              "count": 0
            },
            {
              "minute_bucket": 29022701,
              "count": 0
            },
            {
              "minute_bucket": 29022702,
              "count": 0
            },
            {
              "minute_bucket": 29022703,
              "count": 0
            },
            {
              "minute_bucket": 29022704,
              "count": 0
            },
            {
              "minute_bucket": 29022705,
              "count": 56
            },
            {
              "minute_bucket": 29022706,
              "count": 149
            },
            {
              "minute_bucket": 29022707,
              "count": 0
            },
            {
              "minute_bucket": 29022708,
              "count": 0
            },
            {
              "minute_bucket": 29022709,
              "count": 0
            },
            {
              "minute_bucket": 29022710,
              "count": 0
            },
            {
              "minute_bucket": 29022711,
              "count": 5
            },
            {
              "minute_bucket": 29022712,
              "count": 0
            },
            {
              "minute_bucket": 29022713,
              "count": 52
            },
            {
              "minute_bucket": 29022714,
              "count": 0
            },
            {
              "minute_bucket": 29022715,
              "count": 0
            },
            {
              "minute_bucket": 29022716,
              "count": 0
            },
            {
              "minute_bucket": 29022717,
              "count": 0
            },
            {
              "minute_bucket": 29022718,
              "count": 0
            },
            {
              "minute_bucket": 29022719,
              "count": 0
            },
            {
              "minute_bucket": 29022720,
              "count": 1
            },
            {
              "minute_bucket": 29022721,
              "count": 0
            },
            {
              "minute_bucket": 29022722,
              "count": 0
            },
            {
              "minute_bucket": 29022723,
              "count": 0
            },
            {
              "minute_bucket": 29022724,
              "count": 0
            },
            {
              "minute_bucket": 29022725,
              "count": 0
            },
            {
              "minute_bucket": 29022726,
              "count": 0
            },
            {
              "minute_bucket": 29022727,
              "count": 0
            },
            {
              "minute_bucket": 29022728,
              "count": 0
            },
            {
              "minute_bucket": 29022729,
              "count": 0
            },
            {
              "minute_bucket": 29022730,
              "count": 0
            },
            {
              "minute_bucket": 29022731,
              "count": 0
            },
            {
              "minute_bucket": 29022732,
              "count": 0
            },
            {
              "minute_bucket": 29022733,
              "count": 0
            },
            {
              "minute_bucket": 29022734,
              "count": 0
            },
            {
              "minute_bucket": 29022735,
              "count": 0
            },
            {
              "minute_bucket": 29022736,
              "count": 0
            },
            {
              "minute_bucket": 29022737,
              "count": 0
            },
            {
              "minute_bucket": 29022738,
              "count": 0
            },
            {
              "minute_bucket": 29022739,
              "count": 0
            },
            {
              "minute_bucket": 29022740,
              "count": 0
            },
            {
              "minute_bucket": 29022741,
              "count": 0
            },
            {
              "minute_bucket": 29022742,
              "count": 0
            },
            {
              "minute_bucket": 29022743,
              "count": 0
            },
            {
              "minute_bucket": 29022744,
              "count": 0
            },
            {
              "minute_bucket": 29022745,
              "count": 0
            },
            {
              "minute_bucket": 29022746,
              "count": 0
            },
            {
              "minute_bucket": 29022747,
              "count": 0
            },
            {
              "minute_bucket": 29022748,
              "count": 0
            },
            {
              "minute_bucket": 29022749,
              "count": 0
            },
            {
              "minute_bucket": 29022750,
              "count": 0
            },
            {
              "minute_bucket": 29022751,
              "count": 0
            },
            {
              "minute_bucket": 29022752,
              "count": 0
            },
            {
              "minute_bucket": 29022753,
              "count": 52
            },
            {
              "minute_bucket": 29022754,
              "count": 26
            },
            {
              "minute_bucket": 29022755,
              "count": 12
            },
            {
              "minute_bucket": 29022756,
              "count": 0
            },
            {
              "minute_bucket": 29022757,
              "count": 0
            },
            {
              "minute_bucket": 29022758,
              "count": 54
            },
            {
              "minute_bucket": 29022759,
              "count": 0
            },
            {
              "minute_bucket": 29022760,
              "count": 0
            },
            {
              "minute_bucket": 29022761,
              "count": 61
            },
            {
              "minute_bucket": 29022762,
              "count": 14
            },
            {
              "minute_bucket": 29022763,
              "count": 14
            },
            {
              "minute_bucket": 29022764,
              "count": 0
            },
            {
              "minute_bucket": 29022765,
              "count": 0
            },
            {
              "minute_bucket": 29022766,
              "count": 0
            },
            {
              "minute_bucket": 29022767,
              "count": 0
            },
            {
              "minute_bucket": 29022768,
              "count": 0
            },
            {
              "minute_bucket": 29022769,
              "count": 0
            },
            {
              "minute_bucket": 29022770,
              "count": 0
            },
            {
              "minute_bucket": 29022771,
              "count": 0
            },
            {
              "minute_bucket": 29022772,
              "count": 0
            },
            {
              "minute_bucket": 29022773,
              "count": 0
            },
            {
              "minute_bucket": 29022774,
              "count": 0
            },
            {
              "minute_bucket": 29022775,
              "count": 25
            },
            {
              "minute_bucket": 29022776,
              "count": 27
            },
            {
              "minute_bucket": 29022777,
              "count": 0
            },
            {
              "minute_bucket": 29022778,
              "count": 0
            },
            {
              "minute_bucket": 29022779,
              "count": 0
            },
            {
              "minute_bucket": 29022780,
              "count": 1
            },
            {
              "minute_bucket": 29022781,
              "count": 0
            },
            {
              "minute_bucket": 29022782,
              "count": 0
            },
            {
              "minute_bucket": 29022783,
              "count": 0
            },
            {
              "minute_bucket": 29022784,
              "count": 0
            },
            {
              "minute_bucket": 29022785,
              "count": 0
            },
            {
              "minute_bucket": 29022786,
              "count": 0
            },
            {
              "minute_bucket": 29022787,
              "count": 14
            },
            {
              "minute_bucket": 29022788,
              "count": 14
            },
            {
              "minute_bucket": 29022789,
              "count": 59
            },
            {
              "minute_bucket": 29022790,
              "count": 8
            },
            {
              "minute_bucket": 29022791,
              "count": 61
            },
            {
              "minute_bucket": 29022792,
              "count": 1
            },
            {
              "minute_bucket": 29022793,
              "count": 1
            },
            {
              "minute_bucket": 29022794,
              "count": 4
            },
            {
              "minute_bucket": 29022795,
              "count": 1
            },
            {
              "minute_bucket": 29022796,
              "count": 4
            },
            {
              "minute_bucket": 29022797,
              "count": 7
            },
            {
              "minute_bucket": 29022798,
              "count": 8
            },
            {
              "minute_bucket": 29022799,
              "count": 0
            },
            {
              "minute_bucket": 29022800,
              "count": 0
            },
            {
              "minute_bucket": 29022801,
              "count": 0
            },
            {
              "minute_bucket": 29022802,
              "count": 0
            },
            {
              "minute_bucket": 29022803,
              "count": 0
            },
            {
              "minute_bucket": 29022804,
              "count": 0
            },
            {
              "minute_bucket": 29022805,
              "count": 43
            },
            {
              "minute_bucket": 29022806,
              "count": 27
            },
            {
              "minute_bucket": 29022807,
              "count": 126
            },
            {
              "minute_bucket": 29022808,
              "count": 1
            },
            {
              "minute_bucket": 29022809,
              "count": 35
            },
            {
              "minute_bucket": 29022810,
              "count": 0
            },
            {
              "minute_bucket": 29022811,
              "count": 0
            },
            {
              "minute_bucket": 29022812,
              "count": 0
            },
            {
              "minute_bucket": 29022813,
              "count": 49
            },
            {
              "minute_bucket": 29022814,
              "count": 0
            },
            {
              "minute_bucket": 29022815,
              "count": 37
            },
            {
              "minute_bucket": 29022816,
              "count": 0
            },
            {
              "minute_bucket": 29022817,
              "count": 60
            },
            {
              "minute_bucket": 29022818,
              "count": 27
            },
            {
              "minute_bucket": 29022819,
              "count": 41
            },
            {
              "minute_bucket": 29022820,
              "count": 11
            },
            {
              "minute_bucket": 29022821,
              "count": 14
            },
            {
              "minute_bucket": 29022822,
              "count": 2
            },
            {
              "minute_bucket": 29022823,
              "count": 37
            },
            {
              "minute_bucket": 29022824,
              "count": 91
            },
            {
              "minute_bucket": 29022825,
              "count": 30
            },
            {
              "minute_bucket": 29022826,
              "count": 12
            },
            {
              "minute_bucket": 29022827,
              "count": 35
            },
            {
              "minute_bucket": 29022828,
              "count": 8
            },
            {
              "minute_bucket": 29022829,
              "count": 14
            },
            {
              "minute_bucket": 29022830,
              "count": 28
            },
            {
              "minute_bucket": 29022831,
              "count": 14
            },
            {
              "minute_bucket": 29022832,
              "count": 7
            },
            {
              "minute_bucket": 29022833,
              "count": 7
            },
            {
              "minute_bucket": 29022834,
              "count": 14
            },
            {
              "minute_bucket": 29022835,
              "count": 24
            },
            {
              "minute_bucket": 29022836,
              "count": 32
            },
            {
              "minute_bucket": 29022837,
              "count": 0
            },
            {
              "minute_bucket": 29022838,
              "count": 0
            },
            {
              "minute_bucket": 29022839,
              "count": 0
            },
            {
              "minute_bucket": 29022840,
              "count": 1
            },
            {
              "minute_bucket": 29022841,
              "count": 0
            },
            {
              "minute_bucket": 29022842,
              "count": 0
            },
            {
              "minute_bucket": 29022843,
              "count": 0
            },
            {
              "minute_bucket": 29022844,
              "count": 0
            },
            {
              "minute_bucket": 29022845,
              "count": 7
            },
            {
              "minute_bucket": 29022846,
              "count": 8
            },
            {
              "minute_bucket": 29022847,
              "count": 16
            },
            {
              "minute_bucket": 29022848,
              "count": 0
            },
            {
              "minute_bucket": 29022849,
              "count": 13
            },
            {
              "minute_bucket": 29022850,
              "count": 22
            },
            {
              "minute_bucket": 29022851,
              "count": 0
            },
            {
              "minute_bucket": 29022852,
              "count": 2
            },
            {
              "minute_bucket": 29022853,
              "count": 9
            },
            {
              "minute_bucket": 29022854,
              "count": 3
            },
            {
              "minute_bucket": 29022855,
              "count": 18
            },
            {
              "minute_bucket": 29022856,
              "count": 7
            },
            {
              "minute_bucket": 29022857,
              "count": 34
            },
            {
              "minute_bucket": 29022858,
              "count": 0
            },
            {
              "minute_bucket": 29022859,
              "count": 0
            },
            {
              "minute_bucket": 29022860,
              "count": 25
            },
            {
              "minute_bucket": 29022861,
              "count": 10
            },
            {
              "minute_bucket": 29022862,
              "count": 4
            },
            {
              "minute_bucket": 29022863,
              "count": 0
            },
            {
              "minute_bucket": 29022864,
              "count": 0
            },
            {
              "minute_bucket": 29022865,
              "count": 0
            },
            {
              "minute_bucket": 29022866,
              "count": 0
            },
            {
              "minute_bucket": 29022867,
              "count": 0
            },
            {
              "minute_bucket": 29022868,
              "count": 0
            },
            {
              "minute_bucket": 29022869,
              "count": 0
            },
            {
              "minute_bucket": 29022870,
              "count": 0
            },
            {
              "minute_bucket": 29022871,
              "count": 0
            },
            {
              "minute_bucket": 29022872,
              "count": 0
            },
            {
              "minute_bucket": 29022873,
              "count": 0
            },
            {
              "minute_bucket": 29022874,
              "count": 0
            },
            {
              "minute_bucket": 29022875,
              "count": 0
            },
            {
              "minute_bucket": 29022876,
              "count": 0
            },
            {
              "minute_bucket": 29022877,
              "count": 0
            },
            {
              "minute_bucket": 29022878,
              "count": 0
            },
            {
              "minute_bucket": 29022879,
              "count": 0
            },
            {
              "minute_bucket": 29022880,
              "count": 0
            },
            {
              "minute_bucket": 29022881,
              "count": 40
            },
            {
              "minute_bucket": 29022882,
              "count": 28
            },
            {
              "minute_bucket": 29022883,
              "count": 7
            },
            {
              "minute_bucket": 29022884,
              "count": 96
            },
            {
              "minute_bucket": 29022885,
              "count": 35
            },
            {
              "minute_bucket": 29022886,
              "count": 7
            },
            {
              "minute_bucket": 29022887,
              "count": 6
            },
            {
              "minute_bucket": 29022888,
              "count": 13
            },
            {
              "minute_bucket": 29022889,
              "count": 36
            },
            {
              "minute_bucket": 29022890,
              "count": 110
            },
            {
              "minute_bucket": 29022891,
              "count": 12
            },
            {
              "minute_bucket": 29022892,
              "count": 0
            },
            {
              "minute_bucket": 29022893,
              "count": 7
            },
            {
              "minute_bucket": 29022894,
              "count": 82
            },
            {
              "minute_bucket": 29022895,
              "count": 23
            },
            {
              "minute_bucket": 29022896,
              "count": 57
            },
            {
              "minute_bucket": 29022897,
              "count": 19
            },
            {
              "minute_bucket": 29022898,
              "count": 0
            },
            {
              "minute_bucket": 29022899,
              "count": 0
            },
            {
              "minute_bucket": 29022900,
              "count": 1
            },
            {
              "minute_bucket": 29022901,
              "count": 0
            },
            {
              "minute_bucket": 29022902,
              "count": 0
            },
            {
              "minute_bucket": 29022903,
              "count": 0
            },
            {
              "minute_bucket": 29022904,
              "count": 0
            },
            {
              "minute_bucket": 29022905,
              "count": 0
            },
            {
              "minute_bucket": 29022906,
              "count": 0
            },
            {
              "minute_bucket": 29022907,
              "count": 0
            },
            {
              "minute_bucket": 29022908,
              "count": 0
            },
            {
              "minute_bucket": 29022909,
              "count": 0
            },
            {
              "minute_bucket": 29022910,
              "count": 0
            },
            {
              "minute_bucket": 29022911,
              "count": 0
            },
            {
              "minute_bucket": 29022912,
              "count": 0
            },
            {
              "minute_bucket": 29022913,
              "count": 0
            },
            {
              "minute_bucket": 29022914,
              "count": 0
            },
            {
              "minute_bucket": 29022915,
              "count": 0
            },
            {
              "minute_bucket": 29022916,
              "count": 0
            },
            {
              "minute_bucket": 29022917,
              "count": 0
            },
            {
              "minute_bucket": 29022918,
              "count": 0
            },
            {
              "minute_bucket": 29022919,
              "count": 0
            },
            {
              "minute_bucket": 29022920,
              "count": 0
            },
            {
              "minute_bucket": 29022921,
              "count": 0
            },
            {
              "minute_bucket": 29022922,
              "count": 0
            },
            {
              "minute_bucket": 29022923,
              "count": 0
            },
            {
              "minute_bucket": 29022924,
              "count": 0
            },
            {
              "minute_bucket": 29022925,
              "count": 0
            },
            {
              "minute_bucket": 29022926,
              "count": 39
            },
            {
              "minute_bucket": 29022927,
              "count": 5
            },
            {
              "minute_bucket": 29022928,
              "count": 23
            },
            {
              "minute_bucket": 29022929,
              "count": 36
            },
            {
              "minute_bucket": 29022930,
              "count": 9
            },
            {
              "minute_bucket": 29022931,
              "count": 21
            },
            {
              "minute_bucket": 29022932,
              "count": 0
            },
            {
              "minute_bucket": 29022933,
              "count": 4
            },
            {
              "minute_bucket": 29022934,
              "count": 12
            },
            {
              "minute_bucket": 29022935,
              "count": 0
            },
            {
              "minute_bucket": 29022936,
              "count": 42
            },
            {
              "minute_bucket": 29022937,
              "count": 8
            },
            {
              "minute_bucket": 29022938,
              "count": 8
            },
            {
              "minute_bucket": 29022939,
              "count": 20
            },
            {
              "minute_bucket": 29022940,
              "count": 8
            },
            {
              "minute_bucket": 29022941,
              "count": 0
            },
            {
              "minute_bucket": 29022942,
              "count": 1
            },
            {
              "minute_bucket": 29022943,
              "count": 0
            },
            {
              "minute_bucket": 29022944,
              "count": 0
            },
            {
              "minute_bucket": 29022945,
              "count": 0
            },
            {
              "minute_bucket": 29022946,
              "count": 0
            },
            {
              "minute_bucket": 29022947,
              "count": 0
            },
            {
              "minute_bucket": 29022948,
              "count": 0
            },
            {
              "minute_bucket": 29022949,
              "count": 0
            },
            {
              "minute_bucket": 29022950,
              "count": 0
            },
            {
              "minute_bucket": 29022951,
              "count": 49
            },
            {
              "minute_bucket": 29022952,
              "count": 0
            },
            {
              "minute_bucket": 29022953,
              "count": 0
            },
            {
              "minute_bucket": 29022954,
              "count": 0
            },
            {
              "minute_bucket": 29022955,
              "count": 0
            },
            {
              "minute_bucket": 29022956,
              "count": 0
            },
            {
              "minute_bucket": 29022957,
              "count": 0
            },
            {
              "minute_bucket": 29022958,
              "count": 0
            },
            {
              "minute_bucket": 29022959,
              "count": 0
            },
            {
              "minute_bucket": 29022960,
              "count": 1
            },
            {
              "minute_bucket": 29022961,
              "count": 0
            },
            {
              "minute_bucket": 29022962,
              "count": 18
            },
            {
              "minute_bucket": 29022963,
              "count": 4
            },
            {
              "minute_bucket": 29022964,
              "count": 0
            },
            {
              "minute_bucket": 29022965,
              "count": 0
            },
            {
              "minute_bucket": 29022966,
              "count": 0
            },
            {
              "minute_bucket": 29022967,
              "count": 0
            },
            {
              "minute_bucket": 29022968,
              "count": 0
            },
            {
              "minute_bucket": 29022969,
              "count": 0
            },
            {
              "minute_bucket": 29022970,
              "count": 0
            },
            {
              "minute_bucket": 29022971,
              "count": 0
            },
            {
              "minute_bucket": 29022972,
              "count": 0
            },
            {
              "minute_bucket": 29022973,
              "count": 0
            },
            {
              "minute_bucket": 29022974,
              "count": 0
            },
            {
              "minute_bucket": 29022975,
              "count": 0
            },
            {
              "minute_bucket": 29022976,
              "count": 12
            },
            {
              "minute_bucket": 29022977,
              "count": 12
            },
            {
              "minute_bucket": 29022978,
              "count": 27
            },
            {
              "minute_bucket": 29022979,
              "count": 25
            },
            {
              "minute_bucket": 29022980,
              "count": 0
            },
            {
              "minute_bucket": 29022981,
              "count": 16
            },
            {
              "minute_bucket": 29022982,
              "count": 24
            },
            {
              "minute_bucket": 29022983,
              "count": 24
            },
            {
              "minute_bucket": 29022984,
              "count": 4
            },
            {
              "minute_bucket": 29022985,
              "count": 0
            },
            {
              "minute_bucket": 29022986,
              "count": 0
            },
            {
              "minute_bucket": 29022987,
              "count": 12
            },
            {
              "minute_bucket": 29022988,
              "count": 12
            },
            {
              "minute_bucket": 29022989,
              "count": 7
            }
          ],
          "backend_time_histogram": [
            {
              "time_range": "0ms - 50ms",
              "count": 1375
            },
            {
              "time_range": "50ms - 100ms",
              "count": 9
            },
            {
              "time_range": "100ms - 150ms",
              "count": 311
            },
            {
              "time_range": "150ms - 200ms",
              "count": 323
            },
            {
              "time_range": "200ms - 250ms",
              "count": 230
            },
            {
              "time_range": "250ms - 300ms",
              "count": 220
            },
            {
              "time_range": "300ms - 350ms",
              "count": 190
            },
            {
              "time_range": "350ms - 400ms",
              "count": 158
            },
            {
              "time_range": "400ms - 450ms",
              "count": 283
            },
            {
              "time_range": "450ms - 500ms",
              "count": 217
            },
            {
              "time_range": "500ms - 550ms",
              "count": 188
            },
            {
              "time_range": "550ms - 600ms",
              "count": 198
            },
            {
              "time_range": "600ms - 650ms",
              "count": 185
            },
            {
              "time_range": "650ms - 700ms",
              "count": 144
            },
            {
              "time_range": "700ms - 750ms",
              "count": 143
            },
            {
              "time_range": "750ms - 800ms",
              "count": 76
            },
            {
              "time_range": "800ms - 850ms",
              "count": 42
            },
            {
              "time_range": "850ms - 900ms",
              "count": 24
            },
            {
              "time_range": "900ms - 950ms",
              "count": 15
            },
            {
              "time_range": "950ms - 1000ms",
              "count": 18
            },
            {
              "time_range": "1000ms and up",
              "count": 71
            }
          ],
          "endpoint_error_summary": [
            {
              "endpoint": "/image/24/poster.jpg",
              "errors": [
                {
                  "status_code": 404,
                  "count": 33
                }
              ]
            },
            {
              "endpoint": "/watch_list/list_titles",
              "errors": [
                {
                  "status_code": 422,
                  "count": 6
                }
              ]
            },
            {
              "endpoint": "/image/39/poster.jpg",
              "errors": [
                {
                  "status_code": 404,
                  "count": 5
                }
              ]
            },
            {
              "endpoint": "/image/23/season2/episode10.jpg",
              "errors": [
                {
                  "status_code": 404,
                  "count": 3
                }
              ]
            },
            {
              "endpoint": "/image/undefined/poster.jpg",
              "errors": [
                {
                  "status_code": 404,
                  "count": 2
                }
              ]
            },
            {
              "endpoint": "/image/23/season2/episode8.jpg",
              "errors": [
                {
                  "status_code": 404,
                  "count": 1
                }
              ]
            },
            {
              "endpoint": "/image/23/season2/episode9.jpg",
              "errors": [
                {
                  "status_code": 404,
                  "count": 1
                }
              ]
            },
            {
              "endpoint": "/favicon.ico",
              "errors": [
                {
                  "status_code": 404,
                  "count": 1
                }
              ]
            },
            {
              "endpoint": "/image/269/poster.jpg",
              "errors": [
                {
                  "status_code": 404,
                  "count": 1
                }
              ]
            }
          ]
        }
    },



    // - - - - - SPENDINGS - - - - - 
    '/transactions/get_filters{"session_key":null}': {
        "counterparty": {
        "expense": [
            "Cotton Club",
            "K-Citymarket",
            "Minimani",
            "Parturi",
            "Supermarket",
            "S-Market"
        ],
        "income": [
            "Kela"
        ]
        },
        "category": {
        "expense": [
            "Ruokaostokset",
            "Herkut",
            "Parturi",
            "Opiskelija lounas",
            "Yleinen eläminen",
            "Sekalainen",
            "Kulutustavara"
        ],
        "income": [
            "Asumistuki",
            "Opintotuki"
        ]
        },
        "amount": {
        "min": -45.62,
        "max": 179.99
        },
        "date": {
        "min": 1703023200000,
        "max": 1704232800000
        }
    },

    '/transactions/get_transactions{"sort_by":"date","sort_order":"desc","offset":0,"start_date":946684800000,"end_date":2208988800000,"min_amount":-999999,"max_amount":999999,"counterparties":[],"counterparty_inclusion_mode":true,"categories":[],"category_inclusion_mode":true,"session_key":null}': {
        "transactions": [
          {
            "transaction_id": 9,
            "direction": "expense",
            "date": "2024-01-03",
            "counterparty": "K-Citymarket",
            "notes": "Jotaki safkaa",
            "categories": [
              {
                "category": "Ruokaostokset",
                "amount": 4.84
              }
            ],
            "amount_sum": 4.84
          },
          {
            "transaction_id": 7,
            "direction": "expense",
            "date": "2024-01-01",
            "counterparty": "Minimani",
            "notes": "Ruokaa ja palaa",
            "categories": [
              {
                "category": "Ruokaostokset",
                "amount": 15.96
              }
            ],
            "amount_sum": 15.96
          },
          {
            "transaction_id": 6,
            "direction": "expense",
            "date": "2023-12-31",
            "counterparty": "S-Market",
            "notes": "Mässy pussi",
            "categories": [
              {
                "category": "Herkut",
                "amount": 1.99
              },
              {
                "category": "Ruokaostokset",
                "amount": 9.34
              }
            ],
            "amount_sum": 11.33
          },
          {
            "transaction_id": 5,
            "direction": "expense",
            "date": "2023-12-29",
            "counterparty": "Cotton Club",
            "notes": "Hyvää ruokaa",
            "categories": [
              {
                "category": "Kulutustavara",
                "amount": 12.46
              }
            ],
            "amount_sum": 12.46
          },
          {
            "transaction_id": 2,
            "direction": "income",
            "date": "2023-12-28",
            "counterparty": "Kela",
            "notes": "",
            "categories": [
              {
                "category": "Asumistuki",
                "amount": 99.99
              },
              {
                "category": "Opintotuki",
                "amount": 80
              }
            ],
            "amount_sum": 179.99
          },
          {
            "transaction_id": 4,
            "direction": "expense",
            "date": "2023-12-28",
            "counterparty": "Minimani",
            "notes": "safkaa",
            "categories": [
              {
                "category": "Ruokaostokset",
                "amount": 20.24
              }
            ],
            "amount_sum": 20.24
          },
          {
            "transaction_id": 8,
            "direction": "expense",
            "date": "2023-12-26",
            "counterparty": "Supermarket",
            "notes": "Vähään kaikkea kulutustavarasta ruoasta herkkuihin.",
            "categories": [
              {
                "category": "Sekalainen",
                "amount": 25
              },
              {
                "category": "Ruokaostokset",
                "amount": 14.23
              },
              {
                "category": "Herkut",
                "amount": 6.39
              }
            ],
            "amount_sum": 45.62
          },
          {
            "transaction_id": 3,
            "direction": "expense",
            "date": "2023-12-25",
            "counterparty": "K-Citymarket",
            "notes": "Jotaki mikä nyt voitas luokitella yleisen elämisen luokkaan",
            "categories": [
              {
                "category": "Yleinen eläminen",
                "amount": 8.75
              }
            ],
            "amount_sum": 8.75
          },
          {
            "transaction_id": 1,
            "direction": "expense",
            "date": "2023-12-21",
            "counterparty": "Cotton Club",
            "notes": "Hernekeittoa",
            "categories": [
              {
                "category": "Opiskelija lounas",
                "amount": 2.9
              }
            ],
            "amount_sum": 2.9
          },
          {
            "transaction_id": 10,
            "direction": "expense",
            "date": "2023-12-20",
            "counterparty": "Parturi",
            "notes": "Jotaki safkaa",
            "categories": [
              {
                "category": "Parturi",
                "amount": 27.95
              }
            ],
            "amount_sum": 27.95
          }
        ],
        "hasMore": false,
        "offset": 0
    },

    '/transactions/get_options{"session_key":null}': {
        "counterparty": {
          "expense": [
            "Cotton Club",
            "K-Citymarket",
            "Minimani",
            "Parturi",
            "Supermarket",
            "S-Market"
          ],
          "income": [
            "Kela"
          ]
        },
        "category": {
          "expense": [
            "Ruokaostokset",
            "Herkut",
            "Parturi",
            "Opiskelija lounas",
            "Yleinen eläminen",
            "Sekalainen",
            "Kulutustavara"
          ],
          "income": [
            "Asumistuki",
            "Opintotuki"
          ]
        }
    },

    
    // - - - - - ANALYTICS - - - - - 
    '/analytics/get_general_stats{"session_key":null}': {
        "generalStats": {
            "transactionsLogged": 14,
            "daysLogged": 15,
            "avgLogsPerDay": 0.9333,
            "totalExpenses": 150.05,
            "totalIncomes": 179.99
        }
    },

    '/analytics/get_stats_for_timespan{"session_key":null,"timespan":"month"}': {
        "stats": {
            "spendingsAverageDay": 0,
            "spendingsAverageWeek": 0,
            "spendingsAverageMonth": 0,
            "incomeExpenseRatio": null,
            "netTotal": 0,
            "topMostExpensiveCategories": []
        }
    },

    '/analytics/get_stats_for_timespan{"session_key":null,"timespan":"year"}': {
        "stats": {
            "spendingsAverageDay": 0,
            "spendingsAverageWeek": 0,
            "spendingsAverageMonth": 0,
            "incomeExpenseRatio": null,
            "netTotal": 0,
            "topMostExpensiveCategories": []
        }
    },

    '/get_chart/balance_over_time{"session_key":null}': {
        "balanceOverTime": [
            {
              "date": "2023-12-20",
              "runningBalance": 172.05
            },
            {
              "date": "2023-12-21",
              "runningBalance": 169.15
            },
            {
              "date": "2023-12-22",
              "runningBalance": 169.15
            },
            {
              "date": "2023-12-23",
              "runningBalance": 169.15
            },
            {
              "date": "2023-12-24",
              "runningBalance": 169.15
            },
            {
              "date": "2023-12-25",
              "runningBalance": 160.4
            },
            {
              "date": "2023-12-26",
              "runningBalance": 114.78
            },
            {
              "date": "2023-12-27",
              "runningBalance": 114.78
            },
            {
              "date": "2023-12-28",
              "runningBalance": 274.53
            },
            {
              "date": "2023-12-29",
              "runningBalance": 262.07
            },
            {
              "date": "2023-12-30",
              "runningBalance": 262.07
            },
            {
              "date": "2023-12-31",
              "runningBalance": 250.74
            },
            {
              "date": "2024-01-01",
              "runningBalance": 234.78
            },
            {
              "date": "2024-01-02",
              "runningBalance": 234.78
            },
            {
              "date": "2024-01-03",
              "runningBalance": 229.94
            }
        ]
    },

    '/get_chart/sum_by_month{"session_key":null}': {
        "monthlySums": [
            {
                "month": "2023-12",
                "total_income": 179.99,
                "total_expense": -129.25,
                "net_total": 50.74
            },
            {
                "month": "2024-01",
                "total_income": 0,
                "total_expense": -20.8,
                "net_total": -20.8
            }
        ]
    },

    '/get_chart/categories_monthly{"session_key":null,"direction":"expense"}': {
        "monthlyCategoryExpenses": [
            {
              "month": "2023-12",
              "categories": [
                {
                  "category": "Ruokaostokset",
                  "total_expense": 43.81
                },
                {
                  "category": "Parturi",
                  "total_expense": 27.95
                },
                {
                  "category": "Sekalainen",
                  "total_expense": 25
                },
                {
                  "category": "Kulutustavara",
                  "total_expense": 12.46
                },
                {
                  "category": "Yleinen eläminen",
                  "total_expense": 8.75
                },
                {
                  "category": "Herkut",
                  "total_expense": 8.38
                },
                {
                  "category": "Opiskelija lounas",
                  "total_expense": 2.9
                }
              ]
            },
            {
              "month": "2024-01",
              "categories": [
                {
                  "category": "Ruokaostokset",
                  "total_expense": 20.8
                },
                {
                  "category": "Parturi",
                  "total_expense": 0
                },
                {
                  "category": "Sekalainen",
                  "total_expense": 0
                },
                {
                  "category": "Kulutustavara",
                  "total_expense": 0
                },
                {
                  "category": "Yleinen eläminen",
                  "total_expense": 0
                },
                {
                  "category": "Herkut",
                  "total_expense": 0
                },
                {
                  "category": "Opiskelija lounas",
                  "total_expense": 0
                }
              ]
            }
        ]
    },

    '/get_chart/categories_monthly{"session_key":null,"direction":"income"}': {
        "monthlyCategoryExpenses": [
            {
              "month": "2023-12",
              "categories": [
                {
                  "category": "Asumistuki",
                  "total_expense": 99.99
                },
                {
                  "category": "Opintotuki",
                  "total_expense": 80
                }
              ]
            },
            {
              "month": "2024-01",
              "categories": [
                {
                  "category": "Asumistuki",
                  "total_expense": 0
                },
                {
                  "category": "Opintotuki",
                  "total_expense": 0
                }
              ]
            }
        ]
    },



    // - - - - - WATCH LIST - - - - - 
    // In progress
    '/watch_list/get_title_cards{"title_count":12,"session_key":null,"sort_by":"last_watched","title_type":"tv","watched":false,"released":true,"started":true}': {
        "titles": [
          {
            "id": 20,
            "name": "Breaking Bad",
            "vote_average": 8.9,
            "vote_count": 15078,
            "movie_runtime": null,
            "watch_count": 0,
            "type": "tv",
            "release_date": "2008-01-20",
            "backup_poster_url": "/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
            "season_count": 5,
            "episode_count": 62,
            "is_favourite": 1,
            "new_episodes": 0
          }
        ]
    },

    // Movies to watch
    '/watch_list/get_title_cards{"title_count":12,"session_key":null,"sort_by":"release_date","title_type":"tv","watched":false,"released":true,"started":false}': {
        "titles": [
          {
            "id": 199,
            "name": "Howl's Moving Castle",
            "vote_average": 8.4,
            "vote_count": 10077,
            "movie_runtime": 119,
            "watch_count": 0,
            "type": "movie",
            "release_date": "2004-09-09",
            "backup_poster_url": "/23hUJh7JdO23SpgUB5oiFDQk2wX.jpg",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0
          },
          {
            "id": 161,
            "name": "The Lord of the Rings: The Return of the King",
            "vote_average": 8.5,
            "vote_count": 24626,
            "movie_runtime": 201,
            "watch_count": 0,
            "type": "movie",
            "release_date": "2003-12-17",
            "backup_poster_url": "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0
          },
          {
            "id": 160,
            "name": "The Lord of the Rings: The Two Towers",
            "vote_average": 8.4,
            "vote_count": 22205,
            "movie_runtime": 179,
            "watch_count": 0,
            "type": "movie",
            "release_date": "2002-12-18",
            "backup_poster_url": "/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0
          },
          {
            "id": 159,
            "name": "The Lord of the Rings: The Fellowship of the Ring",
            "vote_average": 8.4,
            "vote_count": 25577,
            "movie_runtime": 179,
            "watch_count": 0,
            "type": "movie",
            "release_date": "2001-12-18",
            "backup_poster_url": "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0
          },
          {
            "id": 240,
            "name": "Spirited Away",
            "vote_average": 8.5,
            "vote_count": 16844,
            "movie_runtime": 125,
            "watch_count": 0,
            "type": "movie",
            "release_date": "2001-07-20",
            "backup_poster_url": "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0
          },
          {
            "id": 274,
            "name": "Pulp Fiction",
            "vote_average": 8.5,
            "vote_count": 28399,
            "movie_runtime": 154,
            "watch_count": 0,
            "type": "movie",
            "release_date": "1994-09-10",
            "backup_poster_url": "/jYqKxBbAUdfKq3BfHKivJytFiPL.jpg",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0
          },
          {
            "id": 272,
            "name": "My Neighbor Totoro",
            "vote_average": 8.1,
            "vote_count": 8120,
            "movie_runtime": 86,
            "watch_count": 0,
            "type": "movie",
            "release_date": "1988-04-16",
            "backup_poster_url": "/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0
          }
        ]
      },
        
    // TV-series to start watching
    '/watch_list/get_title_cards{"title_count":12,"session_key":null,"sort_by":"release_date","title_type":"movie","watched":false,"released":true}': {
        "titles": [
          {
            "id": 225,
            "name": "Game of Thrones",
            "vote_average": 8.5,
            "vote_count": 24623,
            "movie_runtime": null,
            "watch_count": 0,
            "type": "tv",
            "release_date": "2011-04-17",
            "backup_poster_url": "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
            "season_count": 8,
            "episode_count": 73,
            "is_favourite": 0,
            "new_episodes": 0
          },
          {
            "id": 273,
            "name": "Friends",
            "vote_average": 8.4,
            "vote_count": 8242,
            "movie_runtime": null,
            "watch_count": 0,
            "type": "tv",
            "release_date": "1994-09-22",
            "backup_poster_url": "/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg",
            "season_count": 10,
            "episode_count": 228,
            "is_favourite": 0,
            "new_episodes": 0
          }
        ]
    },

    // upcoming titles
    '/watch_list/get_title_cards{"title_count":12,"session_key":null,"sort_by":"release_date","direction":"asc","released":false}': {
        "titles": []
    },

    // Favourites
    '/watch_list/get_title_cards{"title_count":12,"session_key":null,"favourite":true}': {
        "titles": [
          {
            "id": 20,
            "name": "Breaking Bad",
            "vote_average": 8.9,
            "vote_count": 15078,
            "movie_runtime": null,
            "watch_count": 0,
            "type": "tv",
            "release_date": "2008-01-20",
            "backup_poster_url": "/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
            "season_count": 5,
            "episode_count": 62,
            "is_favourite": 1,
            "new_episodes": 0
          },
          {
            "id": 270,
            "name": "Titanic",
            "vote_average": 7.9,
            "vote_count": 25747,
            "movie_runtime": 194,
            "watch_count": 1,
            "type": "movie",
            "release_date": "1997-11-18",
            "backup_poster_url": "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 1,
            "new_episodes": 0
          }
        ]
    },
    
    // Watched titles
    '/watch_list/get_title_cards{"title_count":12,"session_key":null,"sort_by":"last_watched","watched":true}': {
        "titles": [
          {
            "id": 27,
            "name": "Forrest Gump",
            "vote_average": 8.5,
            "vote_count": 27919,
            "movie_runtime": 142,
            "watch_count": 1,
            "type": "movie",
            "release_date": "1994-06-23",
            "backup_poster_url": "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0
          },
          {
            "id": 270,
            "name": "Titanic",
            "vote_average": 7.9,
            "vote_count": 25747,
            "movie_runtime": 194,
            "watch_count": 1,
            "type": "movie",
            "release_date": "1997-11-18",
            "backup_poster_url": "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 1,
            "new_episodes": 0
          }
        ]
    },

    // All titles listed
    '/watch_list/list_titles{"session_key":null,"sort_by":"TMDB rating","direction":"desc","offset":0}': {
        "titles": [
          {
            "id": 20,
            "name": "Breaking Bad",
            "name_original": "Breaking Bad",
            "vote_average": 8.9,
            "vote_count": 15078,
            "movie_runtime": null,
            "watch_count": 0,
            "type": "tv",
            "release_date": "2008-01-20",
            "backup_poster_url": "/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
            "overview": "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
            "season_count": 5,
            "episode_count": 62,
            "is_favourite": 1,
            "new_episodes": 0,
            "genres": [
              "Crime",
              "Drama"
            ]
          },
          {
            "id": 27,
            "name": "Forrest Gump",
            "name_original": "Forrest Gump",
            "vote_average": 8.5,
            "vote_count": 27919,
            "movie_runtime": 142,
            "watch_count": 1,
            "type": "movie",
            "release_date": "1994-06-23",
            "backup_poster_url": "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
            "overview": "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0,
            "genres": [
              "Comedy",
              "Drama",
              "Romance"
            ]
          },
          {
            "id": 161,
            "name": "The Lord of the Rings: The Return of the King",
            "name_original": "The Lord of the Rings: The Return of the King",
            "vote_average": 8.5,
            "vote_count": 24626,
            "movie_runtime": 201,
            "watch_count": 0,
            "type": "movie",
            "release_date": "2003-12-17",
            "backup_poster_url": "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
            "overview": "As armies mass for a final battle that will decide the fate of the world--and powerful, ancient forces of Light and Dark compete to determine the outcome--one member of the Fellowship of the Ring is revealed as the noble heir to the throne of the Kings of Men. Yet, the sole hope for triumph over evil lies with a brave hobbit, Frodo, who, accompanied by his loyal friend Sam and the hideous, wretched Gollum, ventures deep into the very dark heart of Mordor on his seemingly impossible quest to destroy the Ring of Power.​",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0,
            "genres": [
              "Action",
              "Adventure",
              "Fantasy"
            ]
          },
          {
            "id": 225,
            "name": "Game of Thrones",
            "name_original": "Game of Thrones",
            "vote_average": 8.5,
            "vote_count": 24623,
            "movie_runtime": null,
            "watch_count": 0,
            "type": "tv",
            "release_date": "2011-04-17",
            "backup_poster_url": "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
            "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
            "season_count": 8,
            "episode_count": 73,
            "is_favourite": 0,
            "new_episodes": 0,
            "genres": [
              "Drama",
              "Action & Adventure",
              "Sci-Fi & Fantasy"
            ]
          },
          {
            "id": 240,
            "name": "Spirited Away",
            "name_original": "千と千尋の神隠し",
            "vote_average": 8.5,
            "vote_count": 16844,
            "movie_runtime": 125,
            "watch_count": 0,
            "type": "movie",
            "release_date": "2001-07-20",
            "backup_poster_url": "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
            "overview": "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0,
            "genres": [
              "Animation",
              "Family",
              "Fantasy"
            ]
          },
          {
            "id": 274,
            "name": "Pulp Fiction",
            "name_original": "Pulp Fiction",
            "vote_average": 8.5,
            "vote_count": 28399,
            "movie_runtime": 154,
            "watch_count": 0,
            "type": "movie",
            "release_date": "1994-09-10",
            "backup_poster_url": "/jYqKxBbAUdfKq3BfHKivJytFiPL.jpg",
            "overview": "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0,
            "genres": [
              "Crime",
              "Thriller"
            ]
          },
          {
            "id": 159,
            "name": "The Lord of the Rings: The Fellowship of the Ring",
            "name_original": "The Lord of the Rings: The Fellowship of the Ring",
            "vote_average": 8.4,
            "vote_count": 25577,
            "movie_runtime": 179,
            "watch_count": 0,
            "type": "movie",
            "release_date": "2001-12-18",
            "backup_poster_url": "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
            "overview": "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator. Along the way, a fellowship is formed to protect the ringbearer and make sure that the ring arrives at its final destination: Mt. Doom, the only place where it can be destroyed.",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0,
            "genres": [
              "Action",
              "Adventure",
              "Fantasy"
            ]
          },
          {
            "id": 160,
            "name": "The Lord of the Rings: The Two Towers",
            "name_original": "The Lord of the Rings: The Two Towers",
            "vote_average": 8.4,
            "vote_count": 22205,
            "movie_runtime": 179,
            "watch_count": 0,
            "type": "movie",
            "release_date": "2002-12-18",
            "backup_poster_url": "/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
            "overview": "Frodo Baggins and the other members of the Fellowship continue on their sacred quest to destroy the One Ring--but on separate paths. Their destinies lie at two towers--Orthanc Tower in Isengard, where the corrupt wizard Saruman awaits, and Sauron's fortress at Barad-dur, deep within the dark lands of Mordor. Frodo and Sam are trekking to Mordor to destroy the One Ring of Power while Gimli, Legolas and Aragorn search for the orc-captured Merry and Pippin. All along, nefarious wizard Saruman awaits the Fellowship members at the Orthanc Tower in Isengard.",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0,
            "genres": [
              "Action",
              "Adventure",
              "Fantasy"
            ]
          },
          {
            "id": 199,
            "name": "Howl's Moving Castle",
            "name_original": "ハウルの動く城",
            "vote_average": 8.4,
            "vote_count": 10077,
            "movie_runtime": 119,
            "watch_count": 0,
            "type": "movie",
            "release_date": "2004-09-09",
            "backup_poster_url": "/23hUJh7JdO23SpgUB5oiFDQk2wX.jpg",
            "overview": "Sophie, a young milliner, is turned into an elderly woman by a witch who enters her shop and curses her. She encounters a wizard named Howl and gets caught up in his resistance to fighting for the king.",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0,
            "genres": [
              "Adventure",
              "Animation",
              "Fantasy"
            ]
          },
          {
            "id": 273,
            "name": "Friends",
            "name_original": "Friends",
            "vote_average": 8.4,
            "vote_count": 8242,
            "movie_runtime": null,
            "watch_count": 0,
            "type": "tv",
            "release_date": "1994-09-22",
            "backup_poster_url": "/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg",
            "overview": "Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.",
            "season_count": 10,
            "episode_count": 228,
            "is_favourite": 0,
            "new_episodes": 0,
            "genres": [
              "Comedy"
            ]
          },
          {
            "id": 272,
            "name": "My Neighbor Totoro",
            "name_original": "となりのトトロ",
            "vote_average": 8.1,
            "vote_count": 8120,
            "movie_runtime": 86,
            "watch_count": 0,
            "type": "movie",
            "release_date": "1988-04-16",
            "backup_poster_url": "/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg",
            "overview": "Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest. When the youngest runs away from home, the older sister seeks help from the spirits to find her.",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 0,
            "new_episodes": 0,
            "genres": [
              "Animation",
              "Family",
              "Fantasy"
            ]
          },
          {
            "id": 270,
            "name": "Titanic",
            "name_original": "Titanic",
            "vote_average": 7.9,
            "vote_count": 25747,
            "movie_runtime": 194,
            "watch_count": 1,
            "type": "movie",
            "release_date": "1997-11-18",
            "backup_poster_url": "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
            "overview": "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic's departure through to its death—on its first and last voyage—on April 15, 1912.",
            "season_count": 0,
            "episode_count": 0,
            "is_favourite": 1,
            "new_episodes": 0,
            "genres": [
              "Drama",
              "Romance"
            ]
          }
        ],
        "has_more": false,
        "offset": 0
    },



    // - - - - - TITLE INFO - - - - - 
    '/watch_list/get_title_info{"session_key":null,"title_id":"270"}': {
        "title_info": {
          "title_id": 270,
          "tmdb_id": 597,
          "imdb_id": "tt0120338",
          "type": "movie",
          "name": "Titanic",
          "original_name": "Titanic",
          "tagline": "Nothing on Earth could come between them.",
          "tmdb_vote_average": 7.9,
          "tmdb_vote_count": 25747,
          "overview": "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship. Rose tells the whole story from Titanic's departure through to its death—on its first and last voyage—on April 15, 1912.",
          "backup_poster_url": "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
          "backup_backdrop_url": "/sDH1LkdFOkQmTJaF1sIIniQyFOk.jpg",
          "movie_runtime": 194,
          "release_date": "1997-11-18",
          "original_language": "en",
          "age_rating": "S",
          "trailer_key": "wO44qBPBG4c",
          "title_info_last_updated": "2025-03-07T23:58:08",
          "user_title_watch_count": 1,
          "user_title_notes": null,
          "user_title_favourite": 1,
          "user_title_last_updated": "2025-03-07T23:58:37",
          "title_genres": [
            "Drama",
            "Romance"
          ],
          "backdrop_image_count": 1
        }
    },
    '/watch_list/get_title_info{"session_key":null,"title_id":"27"}': {
        "title_info": {
          "title_id": 27,
          "tmdb_id": 13,
          "imdb_id": "tt0109830",
          "type": "movie",
          "name": "Forrest Gump",
          "original_name": "Forrest Gump",
          "tagline": "The world will never be the same once you've seen it through the eyes of Forrest Gump.",
          "tmdb_vote_average": 8.5,
          "tmdb_vote_count": 27919,
          "overview": "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
          "backup_poster_url": "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
          "backup_backdrop_url": "/mzfx54nfDPTUXZOG48u4LaEheDy.jpg",
          "movie_runtime": 142,
          "release_date": "1994-06-23",
          "original_language": "en",
          "age_rating": "K-12",
          "trailer_key": "Mj9IA9tTfio",
          "title_info_last_updated": "2025-03-08T11:06:58",
          "user_title_watch_count": 1,
          "user_title_notes": null,
          "user_title_favourite": 0,
          "user_title_last_updated": "2025-03-08T11:02:50",
          "title_genres": [
            "Comedy",
            "Drama",
            "Romance"
          ],
          "backdrop_image_count": 1
        }
    },
    '/watch_list/get_title_info{"session_key":null,"title_id":"20"}': {
        "title_info": {
          "title_id": 20,
          "tmdb_id": 1396,
          "imdb_id": "tt0903747",
          "type": "tv",
          "name": "Breaking Bad",
          "original_name": "Breaking Bad",
          "tagline": "Change the equation.",
          "tmdb_vote_average": 8.9,
          "tmdb_vote_count": 15078,
          "overview": "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
          "backup_poster_url": "/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
          "backup_backdrop_url": "/gc8PfyTqzqltKPW3X0cIVUGmagz.jpg",
          "movie_runtime": null,
          "release_date": "2008-01-20",
          "original_language": "en",
          "age_rating": "K16",
          "trailer_key": "XZ8daibM3AE",
          "title_info_last_updated": "2025-02-22T17:48:49",
          "user_title_watch_count": 0,
          "user_title_notes": null,
          "user_title_favourite": 1,
          "user_title_last_updated": "2025-03-08T11:05:24",
          "title_genres": [
            "Crime",
            "Drama"
          ],
          "backdrop_image_count": 1,
          "seasons": [
            {
              "season_id": 16,
              "season_number": 1,
              "season_name": "Season 1",
              "vote_average": 8.3,
              "vote_count": null,
              "episode_count": 7,
              "overview": "High school chemistry teacher Walter White's life is suddenly transformed by a dire medical diagnosis. Street-savvy former student Jesse Pinkman \"teaches\" Walter a new trade.",
              "backup_poster_url": "/1BP4xYv9ZG4ZVHkL7ocOziBbSYH.jpg",
              "episodes": [
                {
                  "episode_id": 179,
                  "episode_number": 1,
                  "episode_name": "Pilot",
                  "vote_average": 8.5,
                  "vote_count": 402,
                  "overview": "When an unassuming high school chemistry teacher discovers he has a rare form of lung cancer, he decides to team up with a former student and create a top of the line crystal meth in a used RV, to provide for his family once he is gone.",
                  "backup_still_url": "/ydlY3iPfeOAvu8gVqrxPoMvzNCn.jpg",
                  "air_date": "2008-01-20",
                  "runtime": 59,
                  "watch_count": 1,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 180,
                  "episode_number": 2,
                  "episode_name": "Cat's in the Bag...",
                  "vote_average": 8.2,
                  "vote_count": 214,
                  "overview": "Walt and Jesse attempt to tie up loose ends. The desperate situation gets more complicated with the flip of a coin. Walt's wife, Skyler, becomes suspicious of Walt's strange behavior.",
                  "backup_still_url": "/xwQRVskT9IK7ktbrrWc2xoT4nPv.jpg",
                  "air_date": "2008-01-27",
                  "runtime": 49,
                  "watch_count": 1,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 181,
                  "episode_number": 3,
                  "episode_name": "...And the Bag's in the River",
                  "vote_average": 8.3,
                  "vote_count": 194,
                  "overview": "Walter fights with Jesse over his drug use, causing him to leave Walter alone with their captive, Krazy-8. Meanwhile, Hank has a scared straight moment with Walter Jr. after his aunt discovers he has been smoking pot. Also, Skylar is upset when Walter stays away from home.",
                  "backup_still_url": "/dLgiPZCVamFcaa7Gaqudrldj15h.jpg",
                  "air_date": "2008-02-10",
                  "runtime": 49,
                  "watch_count": 1,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 182,
                  "episode_number": 4,
                  "episode_name": "Cancer Man",
                  "vote_average": 7.9,
                  "vote_count": 186,
                  "overview": "Walter finally tells his family that he has been stricken with cancer. Meanwhile, the DEA believes Albuquerque has a new, big time player to worry about. Meanwhile, a worthy recipient is the target of a depressed Walter's anger, and Jesse makes a surprise visit to his parents home.",
                  "backup_still_url": "/2UbRgW6apE4XPzhHPA726wUFyaR.jpg",
                  "air_date": "2008-02-17",
                  "runtime": 49,
                  "watch_count": 1,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 183,
                  "episode_number": 5,
                  "episode_name": "Gray Matter",
                  "vote_average": 8.1,
                  "vote_count": 182,
                  "overview": "Walter and Skyler attend a former colleague's party. Jesse tries to free himself from the drugs, while Skyler organizes an intervention.",
                  "backup_still_url": "/82G3wZgEvZLKcte6yoZJahUWBtx.jpg",
                  "air_date": "2008-02-24",
                  "runtime": 49,
                  "watch_count": 1,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 184,
                  "episode_number": 6,
                  "episode_name": "Crazy Handful of Nothin'",
                  "vote_average": 8.8,
                  "vote_count": 180,
                  "overview": "The side effects of chemo begin to plague Walt. Meanwhile, the DEA rounds up suspected dealers.",
                  "backup_still_url": "/rCCLuycNPL30W3BtuB8HafxEMYz.jpg",
                  "air_date": "2008-03-02",
                  "runtime": 49,
                  "watch_count": 1,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 185,
                  "episode_number": 7,
                  "episode_name": "A No Rough Stuff Type Deal",
                  "vote_average": 8.3,
                  "vote_count": 175,
                  "overview": "Walter accepts his new identity as a drug dealer after a PTA meeting. Elsewhere, Jesse decides to put his aunt's house on the market and Skyler is the recipient of a baby shower.",
                  "backup_still_url": "/1dgFAsajUpUT7DLXgAxHb9GyXHH.jpg",
                  "air_date": "2008-03-09",
                  "runtime": 48,
                  "watch_count": 1,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 17,
              "season_number": 2,
              "season_name": "Season 2",
              "vote_average": 8.4,
              "vote_count": null,
              "episode_count": 13,
              "overview": "Walt must deal with the chain reaction of his choice, as he and Jesse face new and severe consequences. When danger and suspicion around Walt escalate, he is pushed to new levels of desperation. Just how much higher will the stakes rise? How far is Walt willing to go to ensure his family's security? Will his grand plan spiral out of control?",
              "backup_poster_url": "/e3oGYpoTUhOFK0BJfloru5ZmGV.jpg",
              "episodes": [
                {
                  "episode_id": 186,
                  "episode_number": 1,
                  "episode_name": "Seven Thirty-Seven",
                  "vote_average": 8.3,
                  "vote_count": 156,
                  "overview": "Walt and Jesse are vividly reminded of Tuco’s volatile nature, and try to figure a way out of their business partnership. Hank attempts to mend fences between the estranged Marie and Skyler.",
                  "backup_still_url": "/6vMRIwd2WaGsRwR0z3C9BFEth6n.jpg",
                  "air_date": "2009-03-08",
                  "runtime": 48,
                  "watch_count": 1,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 187,
                  "episode_number": 2,
                  "episode_name": "Grilled",
                  "vote_average": 8.8,
                  "vote_count": 162,
                  "overview": "Walt and Jesse find themselves in close quarters with an unhinged Tuco. Marie and Hank comfort Skyler, who is distraught over Walt’s disappearance. Hank pays a visit to Mrs. Pinkman on some not-so-official business.",
                  "backup_still_url": "/43mpP5yxIyBsDeFOMb0WvUh0I4a.jpg",
                  "air_date": "2009-03-15",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 188,
                  "episode_number": 3,
                  "episode_name": "Bit by a Dead Bee",
                  "vote_average": 7.9,
                  "vote_count": 149,
                  "overview": "Walt and Jesse become short on cash when they try to cover their tracks. Meanwhile, the DEA has a lead that could them straight to Walt and Jesse.",
                  "backup_still_url": "/p69fPkpnnxUmevhupJiDeYfQxxl.jpg",
                  "air_date": "2009-03-22",
                  "runtime": 47,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 189,
                  "episode_number": 4,
                  "episode_name": "Down",
                  "vote_average": 7.9,
                  "vote_count": 147,
                  "overview": "Walt attempts to reconnect with his family, while Jesse struggles to rebuild his life.",
                  "backup_still_url": "/gMXeL0qcQZi5Tfd4UhnkRJeI9oa.jpg",
                  "air_date": "2009-03-29",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 190,
                  "episode_number": 5,
                  "episode_name": "Breakage",
                  "vote_average": 8,
                  "vote_count": 143,
                  "overview": "Hank suffers from the aftermath of his encounter with Tuco. Meanwhile, Jesse hires a crew to get their product out on the streets.",
                  "backup_still_url": "/bPQxF63jhfT5eNYjhzuGEO7oMQg.jpg",
                  "air_date": "2009-04-05",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 191,
                  "episode_number": 6,
                  "episode_name": "Peekaboo",
                  "vote_average": 8.4,
                  "vote_count": 147,
                  "overview": "Walt's secret is in jeopardy when Skyler thanks Gretchen for paying for his treatment.",
                  "backup_still_url": "/tfCuh20gNHGGF6A1te3NmiqML6D.jpg",
                  "air_date": "2009-04-12",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 192,
                  "episode_number": 7,
                  "episode_name": "Negro y Azul",
                  "vote_average": 8.2,
                  "vote_count": 143,
                  "overview": "Jesse and Walt discuss expanding into new territories; Hank struggles to fit in; Skyler pursues a new job opportunity; Jesse gets to know his landlord.",
                  "backup_still_url": "/1IOnhCCeru1BZUPeppu7tMmtxvL.jpg",
                  "air_date": "2009-04-19",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 193,
                  "episode_number": 8,
                  "episode_name": "Better Call Saul",
                  "vote_average": 8.8,
                  "vote_count": 148,
                  "overview": "Walt and Jesse seek advice from a shady attorney when Badger gets in trouble with the law; the DEA believes they have caught up with \"Heisenberg\" ; Hank returns.",
                  "backup_still_url": "/KmFdF23FtbPwwz3FJF2T885r2Z.jpg",
                  "air_date": "2009-04-26",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 194,
                  "episode_number": 9,
                  "episode_name": "4 Days Out",
                  "vote_average": 8.7,
                  "vote_count": 148,
                  "overview": "Walt and his family wait for news after he undergoes a PET-CT scan. Walt follows Saul's advice; Jesse's relationship with Jane is put on hold when he and Walt head to the desert for a marathon of cooking.",
                  "backup_still_url": "/331AHaKegOuLZtN3kLvdrO8Yt9s.jpg",
                  "air_date": "2009-05-03",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 195,
                  "episode_number": 10,
                  "episode_name": "Over",
                  "vote_average": 8.1,
                  "vote_count": 147,
                  "overview": "Walt and Hank get into a heated argument at a party. Skyler opens up to her boss. Jane hides her relationship with Jesse from her father.",
                  "backup_still_url": "/wGobAJ0h54788xCMkRKaJTQMMtq.jpg",
                  "air_date": "2009-05-10",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 196,
                  "episode_number": 11,
                  "episode_name": "Mandala",
                  "vote_average": 8.4,
                  "vote_count": 147,
                  "overview": "As the end of her pregnancy finds Skyler conflicted about her feelings, a dealer's death forces Walt to look for somewhere to unload a load of meth.",
                  "backup_still_url": "/yeQAQsV4WPTmKWTyuDhF3DAna1x.jpg",
                  "air_date": "2009-05-17",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 197,
                  "episode_number": 12,
                  "episode_name": "Phoenix",
                  "vote_average": 8.8,
                  "vote_count": 148,
                  "overview": "As Walt explores money laundering options, he and Jesse spar over the profits from their latest deal. Jesse and Jane clash with her father. Walt makes a fatal decision.",
                  "backup_still_url": "/r7FWeTSN6F4M6OEsHXji2Z3462d.jpg",
                  "air_date": "2009-05-24",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 198,
                  "episode_number": 13,
                  "episode_name": "ABQ",
                  "vote_average": 8.7,
                  "vote_count": 151,
                  "overview": "Skyler confronts Walt about his secrecy; Jesse falls apart; and Jane's grief-stricken father takes action that results in further tragedy.",
                  "backup_still_url": "/xdSWJjptnLAvFnh5Is6iJPlH1ds.jpg",
                  "air_date": "2009-05-31",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 18,
              "season_number": 3,
              "season_name": "Season 3",
              "vote_average": 8.4,
              "vote_count": null,
              "episode_count": 13,
              "overview": "Walt continues to battle dueling identities: a desperate husband and father trying to provide for his family, and a newly appointed key player in the Albuquerque drug trade. As the danger around him escalates, Walt is now entrenched in the complex worlds of an angst-ridden family on the verge of dissolution, and the ruthless and unrelenting drug cartel.",
              "backup_poster_url": "/ffP8Q8ew048YofHRnFVM18B2fPG.jpg",
              "episodes": [
                {
                  "episode_id": 199,
                  "episode_number": 1,
                  "episode_name": "No Más",
                  "vote_average": 8.2,
                  "vote_count": 149,
                  "overview": "Walt faces a new threat, on a new front and deals with an increasingly angry Skyler, who must consider what to do next with her life and the kids. Meanwhile, Jesse comes face-to-face with some startling self-revelations.",
                  "backup_still_url": "/gOevWiZjFEeZgJBCQnWySzd6no9.jpg",
                  "air_date": "2010-03-21",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 200,
                  "episode_number": 2,
                  "episode_name": "Caballo sin Nombre",
                  "vote_average": 8.2,
                  "vote_count": 141,
                  "overview": "Despite ever-increasing tension between Walt and Skyler, he pulls out all the stops in an effort to reconcile with the family. Elsewhere, Saul is instrumental in getting Jesse involved in a most-unusual investment opportunity.",
                  "backup_still_url": "/mt9HtDly0I4vmxs5INljWt311IL.jpg",
                  "air_date": "2010-03-28",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 201,
                  "episode_number": 3,
                  "episode_name": "I.F.T.",
                  "vote_average": 8.1,
                  "vote_count": 139,
                  "overview": "Walt ignores Skyler's demands, furthering the rift between them and pushing her to break bad. Still suffering from panic and anxiety attacks, Hank crosses a line at work.",
                  "backup_still_url": "/jH2nkMFxuX5tXc832jyDNU4AjKq.jpg",
                  "air_date": "2010-04-04",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 202,
                  "episode_number": 4,
                  "episode_name": "Green Light",
                  "vote_average": 7.9,
                  "vote_count": 139,
                  "overview": "Walt loses control as he reacts to Skyler's news, endangering his job and relationships with Saul and Jesse. Hank throws himself into his blue meth investigation. Jesse enacts a new plan.",
                  "backup_still_url": "/1Se5PpvIgUey9MgXmrKkgO8HVye.jpg",
                  "air_date": "2010-04-11",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 203,
                  "episode_number": 5,
                  "episode_name": "Más",
                  "vote_average": 8.3,
                  "vote_count": 136,
                  "overview": "Gus increases his efforts to lure Walt back into business, forcing a rift between Walt and Jesse. Skyler doubts her new relationship. Marie confides in Skyler about her concern for Hank's well-being.",
                  "backup_still_url": "/m2cipfAKEdLR4MIZKA3EiOcTYiZ.jpg",
                  "air_date": "2010-04-18",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 204,
                  "episode_number": 6,
                  "episode_name": "Sunset",
                  "vote_average": 8.8,
                  "vote_count": 150,
                  "overview": "Walt settles into his new surroundings; Walt, Jr. wants answers about his parents' relationship; Hank's investigation causes problems for Walt and Jesse.",
                  "backup_still_url": "/sl5zRr0u0kYcIyCdQjOTsexq4bL.jpg",
                  "air_date": "2010-04-25",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 205,
                  "episode_number": 7,
                  "episode_name": "One Minute",
                  "vote_average": 9,
                  "vote_count": 147,
                  "overview": "Hank's increasing volatility forces a confrontation with Jesse and trouble at work. Skyler pressures Walt to make a deal. Gus' actions have severe consequences.",
                  "backup_still_url": "/4yyVAkAQhzc5URhJJiy21biH3FJ.jpg",
                  "air_date": "2010-05-02",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 206,
                  "episode_number": 8,
                  "episode_name": "I See You",
                  "vote_average": 8.3,
                  "vote_count": 135,
                  "overview": "The family waits for news about Hank. While Jesse covers at the lab, Walt attempts to placate Gus. After witnessing a disturbing outburst, Walt worries he and his family are in danger.",
                  "backup_still_url": "/edBDR59bzVWdMtCawimRzOMgrlW.jpg",
                  "air_date": "2010-05-09",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 207,
                  "episode_number": 9,
                  "episode_name": "Kafkaesque",
                  "vote_average": 8.1,
                  "vote_count": 135,
                  "overview": "As Hank's hospital bills stack up, Skyler hatches a plan. Walt and Gus come to a better understanding. Jesse, looking for more independence, pursues a new opportunity.",
                  "backup_still_url": "/ztG7AnGy4YKs1vxLbpK9euPwjaK.jpg",
                  "air_date": "2010-05-16",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 208,
                  "episode_number": 10,
                  "episode_name": "Fly",
                  "vote_average": 7.9,
                  "vote_count": 153,
                  "overview": "Walt becomes obsessed with a contaminant in the lab and refuses to finish the cook until it is eliminated. A frustrated Jesse attempts to get Walt back on track.",
                  "backup_still_url": "/vpXc5zctIc2N0PQif3fG0TGypaX.jpg",
                  "air_date": "2010-05-23",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 209,
                  "episode_number": 11,
                  "episode_name": "Abiquiu",
                  "vote_average": 8.1,
                  "vote_count": 135,
                  "overview": "Skyler gets involved with Walt's business. Hank struggles with his recovery. Jesse makes a startling discovery after meeting a girl at group therapy.",
                  "backup_still_url": "/llw7fwOmOMs6OSqwK96XrPPQZD3.jpg",
                  "air_date": "2010-05-30",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 210,
                  "episode_number": 12,
                  "episode_name": "Half Measures",
                  "vote_average": 9,
                  "vote_count": 144,
                  "overview": "Against Walt's advice, Jesse lashes out. Fearing for Jesse's safety, Walt takes drastic action to intervene and tragic event leads to a shocking confrontation.",
                  "backup_still_url": "/sX4gKwbbtjUjhAjyc0qdkZrM2A3.jpg",
                  "air_date": "2010-06-06",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 211,
                  "episode_number": 13,
                  "episode_name": "Full Measure",
                  "vote_average": 9.3,
                  "vote_count": 144,
                  "overview": "With Jesse on the run and Mike in hot pursuit, Walt negotiates a bargain with Gus and concocts a disturbing plan to provide for his and Jesse's safety.",
                  "backup_still_url": "/mDUs18asTVVfqd56scRQ7W9r781.jpg",
                  "air_date": "2010-06-13",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                }
              ]
            },
            {
              "season_id": 19,
              "season_number": 4,
              "season_name": "Season 4",
              "vote_average": 8.5,
              "vote_count": null,
              "episode_count": 13,
              "overview": "Walt and Jesse must cope with the fallout of their previous actions, both personally and professionally. Tension mounts as Walt faces a true standoff with his employer, Gus, with neither side willing or able to back down. Walt must also adjust to a new relationship with Skyler, whom while still reconciling her relationship with Walt, is committed to properly laundering Walt’s money and ensuring her sister Marie and an ailing Hank are financially stable.",
              "backup_poster_url": "/5ewrnKp4TboU4hTLT5cWO350mHj.jpg",
              "episodes": [
                {
                  "episode_id": 212,
                  "episode_number": 1,
                  "episode_name": "Box Cutter",
                  "vote_average": 8.8,
                  "vote_count": 144,
                  "overview": "Walt and Jesse face the deadly consequences of their actions. Skyler deals with a puzzling disappearance, as Marie struggles to help Hank with his recovery.",
                  "backup_still_url": "/2g6dLvOrLE7tpJatonCchLDkDyF.jpg",
                  "air_date": "2011-07-17",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 213,
                  "episode_number": 2,
                  "episode_name": "Thirty-Eight Snub",
                  "vote_average": 7.9,
                  "vote_count": 133,
                  "overview": "Walt attempts to form a new alliance as he plans his next move. Skyler pushes Walt towards a business opportunity, in hopes of protecting the family.",
                  "backup_still_url": "/ra0R3q9jEOObo6gspjYcbqPmIM.jpg",
                  "air_date": "2011-07-24",
                  "runtime": 46,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 214,
                  "episode_number": 3,
                  "episode_name": "Open House",
                  "vote_average": 7.9,
                  "vote_count": 133,
                  "overview": "Events spiral out of control at Jesse’s place. Skyler reluctantly asks for Saul’s help. Marie returns to an old pastime and a friend asks Hank for help.",
                  "backup_still_url": "/5zQ8TlD9a3TxrhlEEt3TxeFOQh2.jpg",
                  "air_date": "2011-07-31",
                  "runtime": 47,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 215,
                  "episode_number": 4,
                  "episode_name": "Bullet Points",
                  "vote_average": 8.2,
                  "vote_count": 132,
                  "overview": "The Cartel takes steps to gain the upper hand. Walt and Skyler share an embarrassing secret with the rest of the family. Jesse’s activities draw unwanted attention.",
                  "backup_still_url": "/gzHp77NjrkDOu9sgkLB5PYmwArK.jpg",
                  "air_date": "2011-08-07",
                  "runtime": 46,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 216,
                  "episode_number": 5,
                  "episode_name": "Shotgun",
                  "vote_average": 8.1,
                  "vote_count": 134,
                  "overview": "When Jesse goes missing, Walt fears the worst. Skyler has an unlikely reunion. Hank shares some bad news with Detective Tim Roberts.",
                  "backup_still_url": "/cIpk1YHRcySKOET8qUfs2JC3QAy.jpg",
                  "air_date": "2011-08-14",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 217,
                  "episode_number": 6,
                  "episode_name": "Cornered",
                  "vote_average": 8,
                  "vote_count": 134,
                  "overview": "Skyler makes an unsettling discovery. Walter, Jr. pushes his dad into a questionable purchase. Jesse offers Mike some unexpected help.",
                  "backup_still_url": "/3tuFJVKzlWRqstoAOxwWF6lPzJY.jpg",
                  "air_date": "2011-08-21",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 218,
                  "episode_number": 7,
                  "episode_name": "Problem Dog",
                  "vote_average": 8.4,
                  "vote_count": 130,
                  "overview": "A frustrated Walt gambles on a risky new plan.  Skyler's business venture hits a snag.  Hank recruits Walter, Jr. for an unusual outing.",
                  "backup_still_url": "/gXYKZO4nTsDrAc2AjJOhjJkwu1V.jpg",
                  "air_date": "2011-08-28",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 219,
                  "episode_number": 8,
                  "episode_name": "Hermanos",
                  "vote_average": 8.8,
                  "vote_count": 138,
                  "overview": "Skyler develops an unusual solution to her money troubles. Hank enlists Walt to investigate a theory. Walt’s impatience with Jesse grows.",
                  "backup_still_url": "/jwGeSa4lw93UqvxoII5kb4nko1b.jpg",
                  "air_date": "2011-09-04",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 220,
                  "episode_number": 9,
                  "episode_name": "Bug",
                  "vote_average": 8.5,
                  "vote_count": 133,
                  "overview": "Skyler's past mistakes come back to haunt her. Gus takes action to thwart his rivals. Jesse seeks Walt's help, with mixed results.",
                  "backup_still_url": "/bIU8FJxe1yXvMm7yREwj138Z6x8.jpg",
                  "air_date": "2011-09-11",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 221,
                  "episode_number": 10,
                  "episode_name": "Salud",
                  "vote_average": 9.1,
                  "vote_count": 138,
                  "overview": "Walt's family worries when he doesn't turn up for Walter, Jr.'s 16th birthday.  Jesse is forced to put his lab skills to the test without Mr. White's help.",
                  "backup_still_url": "/dBrs0Npmn76g81yel2mjK7mTaOj.jpg",
                  "air_date": "2011-09-18",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 222,
                  "episode_number": 11,
                  "episode_name": "Crawl Space",
                  "vote_average": 9.3,
                  "vote_count": 144,
                  "overview": "Walt takes drastic action to protect his secret and Gus. Skyler's efforts to solve Ted's financial problems hit a wall.",
                  "backup_still_url": "/xMR8o7N4ZBacim1druJ6PanTlPQ.jpg",
                  "air_date": "2011-09-25",
                  "runtime": 47,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 223,
                  "episode_number": 12,
                  "episode_name": "End Times",
                  "vote_average": 8.9,
                  "vote_count": 142,
                  "overview": "Hank pushes Gomez to pursue one last lead, while Walt struggles to protect the family. Jesse gets alarming news and rushes to meet with Mr. White.",
                  "backup_still_url": "/ffIjlpJndsel3FkPMpHCnpJ71lw.jpg",
                  "air_date": "2011-10-02",
                  "runtime": 46,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 224,
                  "episode_number": 13,
                  "episode_name": "Face Off",
                  "vote_average": 9.3,
                  "vote_count": 178,
                  "overview": "Walt and Jesse team up to take on Gus. With Saul's help, Walt finds an unexpected ally.",
                  "backup_still_url": "/Apl61kYZF2zQlUMh13t8zmUD7Vr.jpg",
                  "air_date": "2011-10-09",
                  "runtime": 51,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                }
              ]
            },
            {
              "season_id": 20,
              "season_number": 5,
              "season_name": "Season 5",
              "vote_average": 8.9,
              "vote_count": null,
              "episode_count": 16,
              "overview": "Walt is faced with the prospect of moving on in a world without his enemy. As the pressure of a criminal life starts to build, Skyler struggles to keep Walt’s terrible secrets. Facing resistance from sometime adversary and former Fring lieutenant Mike, Walt tries to keep his world from falling apart even as his DEA Agent brother in law, Hank, finds numerous leads that could blaze a path straight to Walt. ",
              "backup_poster_url": "/r3z70vunihrAkjILQKWHX0G2xzO.jpg",
              "episodes": [
                {
                  "episode_id": 225,
                  "episode_number": 1,
                  "episode_name": "Live Free or Die",
                  "vote_average": 8.6,
                  "vote_count": 160,
                  "overview": "As Walt deals with the aftermath of the Casa Tranquila explosion, Hank works to wrap up his investigation of Gus' empire.",
                  "backup_still_url": "/uShB5dWoA3xIivZ9jvwWnGCVvt4.jpg",
                  "air_date": "2012-07-15",
                  "runtime": 43,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 226,
                  "episode_number": 2,
                  "episode_name": "Madrigal",
                  "vote_average": 8.3,
                  "vote_count": 140,
                  "overview": "Walt and Jesse pursue an unlikely business partner. The DEA filters through various leads in hopes of finding something.",
                  "backup_still_url": "/gf7ipzUCJq20Oxrt3aOafUrjgFU.jpg",
                  "air_date": "2012-07-22",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 227,
                  "episode_number": 3,
                  "episode_name": "Hazard Pay",
                  "vote_average": 8.4,
                  "vote_count": 140,
                  "overview": "Walt and Jesse formulate a new business plan. Walt shares a secret with Marie.",
                  "backup_still_url": "/l84H1dZVkQGgFVomKHc67RKaEC2.jpg",
                  "air_date": "2012-07-29",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 228,
                  "episode_number": 4,
                  "episode_name": "Fifty-One",
                  "vote_average": 8.3,
                  "vote_count": 137,
                  "overview": "Walt celebrates another birthday. Skyler contemplates her options, and an associate puts a crimp in Walt and Jesse's business strategy.",
                  "backup_still_url": "/zxcf3ER2rzU9IxCxJEhCCw1MyT.jpg",
                  "air_date": "2012-08-05",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 229,
                  "episode_number": 5,
                  "episode_name": "Dead Freight",
                  "vote_average": 9.1,
                  "vote_count": 147,
                  "overview": "Walt's team gets creative to obtain the methylamine they need to continue their operation.",
                  "backup_still_url": "/ay9uj9CMQJezaB407JCPMDYSptK.jpg",
                  "air_date": "2012-08-12",
                  "runtime": 49,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 230,
                  "episode_number": 6,
                  "episode_name": "Buyout",
                  "vote_average": 8.5,
                  "vote_count": 138,
                  "overview": "Walt, Jesse, and Mike struggle over the future of their business, as occupational hazards weigh on Jesse.",
                  "backup_still_url": "/vleQ03cr0fb5DBmvLY0WGxfs8wj.jpg",
                  "air_date": "2012-08-19",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 231,
                  "episode_number": 7,
                  "episode_name": "Say My Name",
                  "vote_average": 9,
                  "vote_count": 149,
                  "overview": "Walt takes control of business matters; Mike deals with the consequences of his actions.",
                  "backup_still_url": "/2NA7ti9jsWnG4xreMEFwbq4DH1f.jpg",
                  "air_date": "2012-08-26",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 232,
                  "episode_number": 8,
                  "episode_name": "Gliding Over All",
                  "vote_average": 9.1,
                  "vote_count": 144,
                  "overview": "Walt takes care of loose ends; Walt makes a dangerous decision.",
                  "backup_still_url": "/uTAPBgAah14jQbV98Sw7iqJD4W7.jpg",
                  "air_date": "2012-09-02",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 233,
                  "episode_number": 9,
                  "episode_name": "Blood Money",
                  "vote_average": 8.9,
                  "vote_count": 147,
                  "overview": "As Walt and Jesse adjust to life out of the business, Hank grapples with a troubling lead.",
                  "backup_still_url": "/uvxl7TMG4dZG9D5bzzQzKqfUdnD.jpg",
                  "air_date": "2013-08-11",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 234,
                  "episode_number": 10,
                  "episode_name": "Buried",
                  "vote_average": 8.7,
                  "vote_count": 137,
                  "overview": "While Skyler's past catches up with her, Walt covers his tracks. Jesse continues to struggle with his guilt.",
                  "backup_still_url": "/b0aRvTXslQgJpCmmcmoYqS9MsIB.jpg",
                  "air_date": "2013-08-18",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 235,
                  "episode_number": 11,
                  "episode_name": "Confessions",
                  "vote_average": 9.1,
                  "vote_count": 149,
                  "overview": "Jesse decides to make a change, while Walt and Skyler try to deal with an unexpected demand.",
                  "backup_still_url": "/uEuQEdQiWJc0DRDVkqRG9HaCsKY.jpg",
                  "air_date": "2013-08-25",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 236,
                  "episode_number": 12,
                  "episode_name": "Rabid Dog",
                  "vote_average": 8.7,
                  "vote_count": 144,
                  "overview": "An unusual strategy starts to bear fruit, while plans are set in motion that could change everything.",
                  "backup_still_url": "/5VkI8lm7Xcmlxk92pWRyW341d70.jpg",
                  "air_date": "2013-09-01",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 237,
                  "episode_number": 13,
                  "episode_name": "To'hajiilee",
                  "vote_average": 9.4,
                  "vote_count": 164,
                  "overview": "Things heat up for Walt in unexpected ways.",
                  "backup_still_url": "/lunoCRprYl0jEJEkGTS8v6eFq1n.jpg",
                  "air_date": "2013-09-08",
                  "runtime": 47,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 238,
                  "episode_number": 14,
                  "episode_name": "Ozymandias",
                  "vote_average": 9.4,
                  "vote_count": 269,
                  "overview": "Everyone copes with radically changed circumstances.",
                  "backup_still_url": "/k80r5JYO4LLrPJbWDXmlg7IxRMI.jpg",
                  "air_date": "2013-09-15",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 239,
                  "episode_number": 15,
                  "episode_name": "Granite State",
                  "vote_average": 9.2,
                  "vote_count": 157,
                  "overview": "Events set in motion long ago move toward a conclusion.",
                  "backup_still_url": "/lCVFehyLhc4qlwTxBwbKpYvc3BS.jpg",
                  "air_date": "2013-09-22",
                  "runtime": 54,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 240,
                  "episode_number": 16,
                  "episode_name": "Felina",
                  "vote_average": 9.2,
                  "vote_count": 228,
                  "overview": "All bad things must come to an end.",
                  "backup_still_url": "/pA0YwyhvdDXP3BEGL2grrIhq8aM.jpg",
                  "air_date": "2013-09-29",
                  "runtime": 56,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                }
              ]
            }
          ]
        }
    },
    '/watch_list/get_title_info{"session_key":null,"title_id":"199"}': {
        "title_info": {
          "title_id": 199,
          "tmdb_id": 4935,
          "imdb_id": "tt0347149",
          "type": "movie",
          "name": "Howl's Moving Castle",
          "original_name": "ハウルの動く城",
          "tagline": "The two lived there.",
          "tmdb_vote_average": 8.4,
          "tmdb_vote_count": 10077,
          "overview": "Sophie, a young milliner, is turned into an elderly woman by a witch who enters her shop and curses her. She encounters a wizard named Howl and gets caught up in his resistance to fighting for the king.",
          "backup_poster_url": "/23hUJh7JdO23SpgUB5oiFDQk2wX.jpg",
          "backup_backdrop_url": "/nv5wwZou159v5OC61i4ElR7OqyY.jpg",
          "movie_runtime": 119,
          "release_date": "2004-09-09",
          "original_language": "ja",
          "age_rating": "PG",
          "trailer_key": "ARCQf2CEr8k",
          "title_info_last_updated": "2025-02-12T20:14:27",
          "user_title_watch_count": 0,
          "user_title_notes": null,
          "user_title_favourite": 0,
          "user_title_last_updated": "2025-03-08T10:56:46",
          "title_genres": [
            "Adventure",
            "Animation",
            "Fantasy"
          ],
          "backdrop_image_count": 1
        }
    },
    '/watch_list/get_title_info{"session_key":null,"title_id":"161"}': {
        "title_info": {
          "title_id": 161,
          "tmdb_id": 122,
          "imdb_id": "tt0167260",
          "type": "movie",
          "name": "The Lord of the Rings: The Return of the King",
          "original_name": "The Lord of the Rings: The Return of the King",
          "tagline": "There can be no triumph without loss. No victory without suffering. No freedom without sacrifice.",
          "tmdb_vote_average": 8.5,
          "tmdb_vote_count": 24626,
          "overview": "As armies mass for a final battle that will decide the fate of the world--and powerful, ancient forces of Light and Dark compete to determine the outcome--one member of the Fellowship of the Ring is revealed as the noble heir to the throne of the Kings of Men. Yet, the sole hope for triumph over evil lies with a brave hobbit, Frodo, who, accompanied by his loyal friend Sam and the hideous, wretched Gollum, ventures deep into the very dark heart of Mordor on his seemingly impossible quest to destroy the Ring of Power.​",
          "backup_poster_url": "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
          "backup_backdrop_url": "/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg",
          "movie_runtime": 201,
          "release_date": "2003-12-17",
          "original_language": "en",
          "age_rating": "K-12",
          "trailer_key": "zckJCxYxn1g",
          "title_info_last_updated": "2025-02-12T23:08:23",
          "user_title_watch_count": 0,
          "user_title_notes": null,
          "user_title_favourite": 0,
          "user_title_last_updated": "2025-03-08T10:56:12",
          "title_genres": [
            "Action",
            "Adventure",
            "Fantasy"
          ],
          "backdrop_image_count": 1
        }
    },
    '/watch_list/get_title_info{"session_key":null,"title_id":"160"}': {
        "title_info": {
          "title_id": 160,
          "tmdb_id": 121,
          "imdb_id": "tt0167261",
          "type": "movie",
          "name": "The Lord of the Rings: The Two Towers",
          "original_name": "The Lord of the Rings: The Two Towers",
          "tagline": "The fellowship is broken. The power of darkness grows...",
          "tmdb_vote_average": 8.4,
          "tmdb_vote_count": 22205,
          "overview": "Frodo Baggins and the other members of the Fellowship continue on their sacred quest to destroy the One Ring--but on separate paths. Their destinies lie at two towers--Orthanc Tower in Isengard, where the corrupt wizard Saruman awaits, and Sauron's fortress at Barad-dur, deep within the dark lands of Mordor. Frodo and Sam are trekking to Mordor to destroy the One Ring of Power while Gimli, Legolas and Aragorn search for the orc-captured Merry and Pippin. All along, nefarious wizard Saruman awaits the Fellowship members at the Orthanc Tower in Isengard.",
          "backup_poster_url": "/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
          "backup_backdrop_url": "/jfEOzpsjc6JDlKhUHb4toWQPt.jpg",
          "movie_runtime": 179,
          "release_date": "2002-12-18",
          "original_language": "en",
          "age_rating": "K-12",
          "trailer_key": "nuTU5XcZTLA",
          "title_info_last_updated": "2025-02-12T23:08:39",
          "user_title_watch_count": 0,
          "user_title_notes": null,
          "user_title_favourite": 0,
          "user_title_last_updated": "2025-03-08T10:56:05",
          "title_genres": [
            "Action",
            "Adventure",
            "Fantasy"
          ],
          "backdrop_image_count": 1
        }
    },
    '/watch_list/get_title_info{"session_key":null,"title_id":"159"}': {
        "title_info": {
          "title_id": 159,
          "tmdb_id": 120,
          "imdb_id": "tt0120737",
          "type": "movie",
          "name": "The Lord of the Rings: The Fellowship of the Ring",
          "original_name": "The Lord of the Rings: The Fellowship of the Ring",
          "tagline": "One ring to rule them all.",
          "tmdb_vote_average": 8.4,
          "tmdb_vote_count": 25577,
          "overview": "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator. Along the way, a fellowship is formed to protect the ringbearer and make sure that the ring arrives at its final destination: Mt. Doom, the only place where it can be destroyed.",
          "backup_poster_url": "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
          "backup_backdrop_url": "/x2RS3uTcsJJ9IfjNPcgDmukoEcQ.jpg",
          "movie_runtime": 179,
          "release_date": "2001-12-18",
          "original_language": "en",
          "age_rating": "K-12",
          "trailer_key": "_nZdmwHrcnw",
          "title_info_last_updated": "2025-02-12T19:32:00",
          "user_title_watch_count": 0,
          "user_title_notes": null,
          "user_title_favourite": 0,
          "user_title_last_updated": "2025-03-08T10:55:57",
          "title_genres": [
            "Action",
            "Adventure",
            "Fantasy"
          ],
          "backdrop_image_count": 1
        }
      },
    '/watch_list/get_title_info{"session_key":null,"title_id":"240"}': {
        "title_info": {
          "title_id": 240,
          "tmdb_id": 129,
          "imdb_id": "tt0245429",
          "type": "movie",
          "name": "Spirited Away",
          "original_name": "千と千尋の神隠し",
          "tagline": "",
          "tmdb_vote_average": 8.5,
          "tmdb_vote_count": 16844,
          "overview": "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.",
          "backup_poster_url": "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
          "backup_backdrop_url": "/6oaL4DP75yABrd5EbC4H2zq5ghc.jpg",
          "movie_runtime": 125,
          "release_date": "2001-07-20",
          "original_language": "ja",
          "age_rating": "K-7",
          "trailer_key": "GAp2_0JJskk",
          "title_info_last_updated": "2025-02-24T20:22:34",
          "user_title_watch_count": 0,
          "user_title_notes": null,
          "user_title_favourite": 0,
          "user_title_last_updated": "2025-03-08T10:53:27",
          "title_genres": [
            "Animation",
            "Family",
            "Fantasy"
          ],
          "backdrop_image_count": 1
        }
      },
    '/watch_list/get_title_info{"session_key":null,"title_id":"274"}': {
        "title_info": {
          "title_id": 274,
          "tmdb_id": 680,
          "imdb_id": "tt0110912",
          "type": "movie",
          "name": "Pulp Fiction",
          "original_name": "Pulp Fiction",
          "tagline": "You won't know the facts until you've seen the fiction.",
          "tmdb_vote_average": 8.5,
          "tmdb_vote_count": 28399,
          "overview": "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
          "backup_poster_url": "/jYqKxBbAUdfKq3BfHKivJytFiPL.jpg",
          "backup_backdrop_url": "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
          "movie_runtime": 154,
          "release_date": "1994-09-10",
          "original_language": "en",
          "age_rating": "18",
          "trailer_key": "tGpTpVyI_OQ",
          "title_info_last_updated": "2025-03-08T11:00:29",
          "user_title_watch_count": 0,
          "user_title_notes": null,
          "user_title_favourite": 0,
          "user_title_last_updated": "2025-03-08T11:00:57",
          "title_genres": [
            "Crime",
            "Thriller"
          ],
          "backdrop_image_count": 1
        }
    },
    '/watch_list/get_title_info{"session_key":null,"title_id":"272"}': {
        "title_info": {
          "title_id": 272,
          "tmdb_id": 8392,
          "imdb_id": "tt0096283",
          "type": "movie",
          "name": "My Neighbor Totoro",
          "original_name": "となりのトトロ",
          "tagline": "He's your friendly neighbourhood forest spirit!",
          "tmdb_vote_average": 8.1,
          "tmdb_vote_count": 8120,
          "overview": "Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest. When the youngest runs away from home, the older sister seeks help from the spirits to find her.",
          "backup_poster_url": "/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg",
          "backup_backdrop_url": "/6O1mOoTXuc1WqjKd2R7MFQHZ7Eb.jpg",
          "movie_runtime": 86,
          "release_date": "1988-04-16",
          "original_language": "ja",
          "age_rating": "G",
          "trailer_key": "HaLISMAGdOE",
          "title_info_last_updated": "2025-03-08T10:54:31",
          "user_title_watch_count": 0,
          "user_title_notes": null,
          "user_title_favourite": 0,
          "user_title_last_updated": "2025-03-08T10:54:45",
          "title_genres": [
            "Animation",
            "Family",
            "Fantasy"
          ],
          "backdrop_image_count": 1
        }
    },
    '/watch_list/get_title_info{"session_key":null,"title_id":"273"}': {
        "title_info": {
          "title_id": 273,
          "tmdb_id": 1668,
          "imdb_id": "tt0108778",
          "type": "tv",
          "name": "Friends",
          "original_name": "Friends",
          "tagline": "I'll be there for you.",
          "tmdb_vote_average": 8.4,
          "tmdb_vote_count": 8242,
          "overview": "Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.",
          "backup_poster_url": "/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg",
          "backup_backdrop_url": "/l0qVZIpXtIo7km9u5Yqh0nKPOr5.jpg",
          "movie_runtime": null,
          "release_date": "1994-09-22",
          "original_language": "en",
          "age_rating": "S",
          "trailer_key": "H29XSxoKp80",
          "title_info_last_updated": "2025-03-08T10:59:24",
          "user_title_watch_count": 0,
          "user_title_notes": null,
          "user_title_favourite": 0,
          "user_title_last_updated": "2025-03-08T11:01:17",
          "title_genres": [
            "Comedy"
          ],
          "backdrop_image_count": 1,
          "seasons": [
            {
              "season_id": 240,
              "season_number": 1,
              "season_name": "Season 1",
              "vote_average": 7.9,
              "vote_count": null,
              "episode_count": 24,
              "overview": "",
              "backup_poster_url": "/odCW88Cq5hAF0ZFVOkeJmeQv1nV.jpg",
              "episodes": [
                {
                  "episode_id": 3041,
                  "episode_number": 1,
                  "episode_name": "Pilot",
                  "vote_average": 7.2,
                  "vote_count": 112,
                  "overview": "An introduction to the gang. After Rachel leaves her fiancé at the altar, she moves in with Monica and finds that independence is not so easy, particularly without Daddy's credit cards.",
                  "backup_still_url": "/Slm6IczgHJWpR4dIv33IRtNrq5.jpg",
                  "air_date": "1994-09-22",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3042,
                  "episode_number": 2,
                  "episode_name": "The One with the Sonogram at the End",
                  "vote_average": 7.4,
                  "vote_count": 64,
                  "overview": "Ross's lesbian ex-wife, Carol, is pregnant with his child, and he doesn't like her choice of last name for the baby. Rachel finds out that her ex-fiancé went on what would have been their honeymoon with her maid of honor.",
                  "backup_still_url": "/sRCJ0D0NArqswoo6z26n6Ab11sc.jpg",
                  "air_date": "1994-09-29",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3043,
                  "episode_number": 3,
                  "episode_name": "The One with the Thumb",
                  "vote_average": 8,
                  "vote_count": 63,
                  "overview": "Monica finds it difficult to break up with her latest boyfriend whom everyone likes; Chandler is reunited with his beloved cigarettes; Phoebe receives a large sum of money.",
                  "backup_still_url": "/963xL8QC2In3dvb8ooWWA30M5JI.jpg",
                  "air_date": "1994-10-06",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3044,
                  "episode_number": 4,
                  "episode_name": "The One with George Stephanopoulos",
                  "vote_average": 7.8,
                  "vote_count": 59,
                  "overview": "While the men attend a hockey game and end up at a hospital, a delivery man accidentally brings a pizza meant for George Stephanopoulos, who lives across the street from the girls; they decide to peek at the former White House advisor with their binoculars.",
                  "backup_still_url": "/zydPvr4Fe7mZ1OnWmb1SPr84OD8.jpg",
                  "air_date": "1994-10-13",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3045,
                  "episode_number": 5,
                  "episode_name": "The One with the East German Laundry Detergent",
                  "vote_average": 8,
                  "vote_count": 59,
                  "overview": "While Chandler and Phoebe decide to break up with their significant others on the same night, Ross helps Rachel do laundry and considers the evening a first date. Joey has Monica pose as his new girlfriend, because he wants to get back with the girl he just dumped.",
                  "backup_still_url": "/m2PCayytQnoTOf3u4R6Tt737gFL.jpg",
                  "air_date": "1994-10-20",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3046,
                  "episode_number": 6,
                  "episode_name": "The One with the Butt",
                  "vote_average": 7.6,
                  "vote_count": 59,
                  "overview": "Joey gets his big film break when he's hired to be Al Pacino's stunt butt. Ross tries to be less conservative and Chandler thinks his fantasies have come true when he has an affair with a married woman.",
                  "backup_still_url": "/8zUXN6UqLBdsYQMexxuxku2iBG3.jpg",
                  "air_date": "1994-10-27",
                  "runtime": 21,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3047,
                  "episode_number": 7,
                  "episode_name": "The One with the Blackout",
                  "vote_average": 8.4,
                  "vote_count": 58,
                  "overview": "A power outage leaves Chandler stranded in an ATM vestibule with Victoria's Secret model Jill Goodacre, whom he desperately tries to impress, Ross tries to ask Rachel out on a date, and Joey learns that Monica used to be infatuated with him.",
                  "backup_still_url": "/cHeKaMNEzqBjTOUlrDzr3omLc8E.jpg",
                  "air_date": "1994-11-03",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3048,
                  "episode_number": 8,
                  "episode_name": "The One Where Nana Dies Twice",
                  "vote_average": 7.8,
                  "vote_count": 59,
                  "overview": "Monica and Ross mourn the death of their grandmother with a little help from the gang, and Monica and her mom come to an unspoken understanding about the relationship between mothers and daughters. Meanwhile, Chandler is irritated by office speculation that he is gay.",
                  "backup_still_url": "/8HPwWvfG9nursqepuUQXf2GSggQ.jpg",
                  "air_date": "1994-11-10",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3049,
                  "episode_number": 9,
                  "episode_name": "The One Where Underdog Gets Away",
                  "vote_average": 8.1,
                  "vote_count": 55,
                  "overview": "Monica's first Thanksgiving dinner for the gang goes horribly wrong when they all run to the rooftop to see the runaway Underdog balloon from the parade.",
                  "backup_still_url": "/prrV1RMAl7oi2l3J3dq5SkHpOAN.jpg",
                  "air_date": "1994-11-17",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3050,
                  "episode_number": 10,
                  "episode_name": "The One with the Monkey",
                  "vote_average": 7.9,
                  "vote_count": 53,
                  "overview": "The gang makes--then breaks--a pact to celebrate New Year's Eve without dates. Ross compensates for his loneliness by getting a roommate, a monkey named Marcel.",
                  "backup_still_url": "/wiICkoadRUmcvqYh4a0K10f8Lgo.jpg",
                  "air_date": "1994-12-15",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3051,
                  "episode_number": 11,
                  "episode_name": "The One with Mrs. Bing",
                  "vote_average": 7.9,
                  "vote_count": 54,
                  "overview": "Chandler's romance-novelist mother comes to New York to visit him, and Joey catches her and Ross kissing.",
                  "backup_still_url": "/58nJXiv4gVLpaxKmI937ppmbCgy.jpg",
                  "air_date": "1995-01-05",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3052,
                  "episode_number": 12,
                  "episode_name": "The One with the Dozen Lasagnas",
                  "vote_average": 7.8,
                  "vote_count": 52,
                  "overview": "Everyone knows the sex of Ross's baby, except for Ross, who doesn't want to find out until it's born. Monica gives Paolo one of the dozen lasagnas she made for her aunt, who doesn't want them anymore because they've got meat in them.",
                  "backup_still_url": "/aEzWo1HvNG8yD0eLEB5E2wlpAQc.jpg",
                  "air_date": "1995-01-12",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3053,
                  "episode_number": 13,
                  "episode_name": "The One with the Boobies",
                  "vote_average": 8.1,
                  "vote_count": 55,
                  "overview": "Chandler accidentally sees Rachel wandering around topless after her shower, so Rachel tries to even the score. And no one can stand Phoebe's new boyfriend, an irritating guy named Roger.",
                  "backup_still_url": "/vLXgzuaAJ4bS4DBx4PdbXJhZgmf.jpg",
                  "air_date": "1995-01-19",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3054,
                  "episode_number": 14,
                  "episode_name": "The One with the Candy Hearts",
                  "vote_average": 8,
                  "vote_count": 50,
                  "overview": "Ross's first date in nine years is on Valentine's Day with a beautiful neighbor. Susan and Carol, also out on a romantic date; end up at the same restaurant. Joey sets Chandler up on a blind date. And Phoebe, Rachel and Monica decide to spend the holiday building a boyfriend bonfire in their apartment.",
                  "backup_still_url": "/zDqfFNc2pE5sYiuQvpKOVFPswZZ.jpg",
                  "air_date": "1995-02-09",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3055,
                  "episode_number": 15,
                  "episode_name": "The One with the Stoned Guy",
                  "vote_average": 8.1,
                  "vote_count": 50,
                  "overview": "Monica cooks a gourmet meal for a restaurateur looking for a new chef but, unfortunately, he's stoned. After working as a data processing permanent temp for five years, Chandler gets promoted. And Ross has a date with a beautiful colleague.",
                  "backup_still_url": "/2ShLUPe0boFwe6e9T6nQgRXRFp1.jpg",
                  "air_date": "1995-02-16",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3056,
                  "episode_number": 16,
                  "episode_name": "The One with Two Parts (1)",
                  "vote_average": 7.8,
                  "vote_count": 53,
                  "overview": "Joey falls for Phoebe's twin sister, Ursula, making Phoebe feel neglected. Ross has doubts about parenthood when he attends Lamaze classes with Carol and Susan. Meanwhile, Chandler finds himself between a rock and a hard place, when he is told to fire an employee he is attracted to.",
                  "backup_still_url": "/hAGgLNtQf8mDuqCFDNRLu5igfR9.jpg",
                  "air_date": "1995-02-23",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3057,
                  "episode_number": 17,
                  "episode_name": "The One with Two Parts (2)",
                  "vote_average": 8.1,
                  "vote_count": 52,
                  "overview": "When Rachel sprains her ankle and has no insurance, she cajoles Monica into trading identities so she can use Monica's coverage. When Phoebe's twin sister, Ursula, breaks Joey's heart, Phoebe tries to fix it.",
                  "backup_still_url": "/rq8bmifOZS8TUSSEZol1pcig7xS.jpg",
                  "air_date": "1995-02-23",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3058,
                  "episode_number": 18,
                  "episode_name": "The One with All the Poker",
                  "vote_average": 8.4,
                  "vote_count": 51,
                  "overview": "Tired of being referred to by customers as \"Excuse me\" Rachel interviews for a job as an assistant buyer at Saks Fifth Avenue. She also sees another side of the usually docile Ross when the girls face the boys during a not-so-friendly game of poker.",
                  "backup_still_url": "/7Fbss8xRE5LvJApXHhPczZC5vQk.jpg",
                  "air_date": "1995-03-02",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3059,
                  "episode_number": 19,
                  "episode_name": "The One Where the Monkey Gets Away",
                  "vote_average": 8,
                  "vote_count": 49,
                  "overview": "The gang searches frantically for Marcel, who slipped out of the apartment while Rachel was baby-sitting him. Just as it looks as though Rachel and Ross might actually spend a romantic evening together, her ex-fiancé barges in and declares his love for her.",
                  "backup_still_url": "/rIMnr0VbnW4vBfik4SkOB5piRUH.jpg",
                  "air_date": "1995-03-09",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3060,
                  "episode_number": 20,
                  "episode_name": "The One with the Evil Orthodontist",
                  "vote_average": 7.8,
                  "vote_count": 47,
                  "overview": "Rachel and Barry start dating again, which is kind of awkward since he's now engaged to Mindy, who wants Rachel to be her maid of honor. Meanwhile, Chandler goes nuts when a woman he likes won't return his phone calls.",
                  "backup_still_url": "/vSKytvZZf7ix9Igk12XM8LNN2gY.jpg",
                  "air_date": "1995-04-06",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3061,
                  "episode_number": 21,
                  "episode_name": "The One with the Fake Monica",
                  "vote_average": 7.7,
                  "vote_count": 48,
                  "overview": "When Monica's credit card is stolen, she, along with Phoebe and Rachel, decide to catch the thief. Joey enlists his friends to help him come up with a less ethnic-sounding stage name. And  Ross finds out that Marcel has reached sexual maturity and needs to be with other monkeys.",
                  "backup_still_url": "/dX98yEwqmv8LkcQKUnBSXTBQg9Y.jpg",
                  "air_date": "1995-04-27",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3062,
                  "episode_number": 22,
                  "episode_name": "The One with the Ick Factor",
                  "vote_average": 8,
                  "vote_count": 51,
                  "overview": "After losing his virginity to her, Monica's boyfriend reveals that he's a high school senior. When Phoebe temps as Chandler's secretary, she finds out a secret.",
                  "backup_still_url": "/wdNKFtPbhWUFWvNxgWZT83H0rA5.jpg",
                  "air_date": "1995-05-04",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3063,
                  "episode_number": 23,
                  "episode_name": "The One with the Birth",
                  "vote_average": 8.3,
                  "vote_count": 51,
                  "overview": "As Monica's biological clock ticks away like a time bomb, Carol goes into labor. Ross, Susan and Phoebe end up getting locked in a closet just as Carol's about to give birth to the baby. And Rachel flirts with an OB/GYN.",
                  "backup_still_url": "/vw6110Vh0j0QtmGqB6BnmbOmMda.jpg",
                  "air_date": "1995-05-11",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3064,
                  "episode_number": 24,
                  "episode_name": "The One Where Rachel Finds Out",
                  "vote_average": 8.4,
                  "vote_count": 48,
                  "overview": "Joey's new girlfriend wants to go to bed with him but he can't, yet. During Rachel's birthday party, Chandler accidentally lets it slip that Ross is in love with her. However, Ross is on his way to China and Rachel can't decide whether she wants to be more than friends with Ross.",
                  "backup_still_url": "/lOECP3XDupnaoitl4zLO7TmEdSP.jpg",
                  "air_date": "1995-05-18",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 241,
              "season_number": 2,
              "season_name": "Season 2",
              "vote_average": 8.1,
              "vote_count": null,
              "episode_count": 24,
              "overview": "",
              "backup_poster_url": "/kC9VHoMh1KkoAYfsY3QlHpZRxDy.jpg",
              "episodes": [
                {
                  "episode_id": 3065,
                  "episode_number": 1,
                  "episode_name": "The One with Ross's New Girlfriend",
                  "vote_average": 8.3,
                  "vote_count": 56,
                  "overview": "Rachel waits patiently at the airport for Ross, returning from China. Meanwhile, after giving Joey and Chandler new haircuts, Phoebe is persuaded to cut Monica's hair. And Joey learns that his tailor is a very naughty man.",
                  "backup_still_url": "/uovdoaMdaLnk6vKn2nU5QnyR3zW.jpg",
                  "air_date": "1995-09-21",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3066,
                  "episode_number": 2,
                  "episode_name": "The One with the Breast Milk",
                  "vote_average": 7.8,
                  "vote_count": 49,
                  "overview": "The guys are uncomfortable with the thought of Carol's breast milk while Rachel is upset by Monica's growing friendship with Julie. Meanwhile, Joey competes with a fellow cologne spritzer for the affections of a beautiful colleague.",
                  "backup_still_url": "/dyBB19jEpwj6gzGA1IcXxj9kq1e.jpg",
                  "air_date": "1995-09-28",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3067,
                  "episode_number": 3,
                  "episode_name": "The One Where Heckles Dies",
                  "vote_average": 8.3,
                  "vote_count": 47,
                  "overview": "After Mr. Heckles dies and leaves all his belongings to Monica and Rachel, Chandler discovers eerie similarities between the late eccentric man and his own life. Ross and Phoebe have a dispute over the progression of evolution.",
                  "backup_still_url": "/tKuHYI4ln4OwBVEKYaTb4Xad26g.jpg",
                  "air_date": "1995-10-05",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3068,
                  "episode_number": 4,
                  "episode_name": "The One with Phoebe's Husband",
                  "vote_average": 7.8,
                  "vote_count": 48,
                  "overview": "The gang is amazed to learn that Phoebe married a gay Canadian ice dancer to help him get his green card. And Ross seeks relationship advice from Rachel.",
                  "backup_still_url": "/jtYyA2OO0Xj6GPq7DGCVCOKvspt.jpg",
                  "air_date": "1995-10-12",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3069,
                  "episode_number": 5,
                  "episode_name": "The One with Five Steaks and an Eggplant",
                  "vote_average": 8,
                  "vote_count": 51,
                  "overview": "When a sexy woman calls the wrong number, Chandler seeks to make the most of the situation. Income issues divide the friends; Monica, Ross and Chandler have money, while Phoebe, Rachel and Joey don't.",
                  "backup_still_url": "/8fCf2sdGC5nxfULSTE8VYFMXuJR.jpg",
                  "air_date": "1995-10-19",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3070,
                  "episode_number": 6,
                  "episode_name": "The One with the Baby on the Bus",
                  "vote_average": 8.1,
                  "vote_count": 52,
                  "overview": "Chandler and Joey lose Ross's son, Ben, while checking out women on a bus. Phoebe loses her Central Perk singing gig to a professional singer. And Ross has an allergic reaction to Monica's kiwi-lime pie.",
                  "backup_still_url": "/4RxxAAbQgt8wgOXDWXcKVUVqXr5.jpg",
                  "air_date": "1995-11-02",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3071,
                  "episode_number": 7,
                  "episode_name": "The One Where Ross Finds Out",
                  "vote_average": 8.6,
                  "vote_count": 51,
                  "overview": "A drunken Rachel is persuaded to call Ross and reveal her feelings for him on his answering machine. Now, Ross must make a decision between her and Julie. Meanwhile, Monica finds work as Chandler's personal trainer and Phoebe has a hard time trying to get her boyfriend to have sex with her.",
                  "backup_still_url": "/1oGAR9wigUiz00YiCdTFniTevMx.jpg",
                  "air_date": "1995-11-09",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3072,
                  "episode_number": 8,
                  "episode_name": "The One with the List",
                  "vote_average": 8.1,
                  "vote_count": 48,
                  "overview": "Ross enlists Joey and Chandler to help with his decision to choose Julie or Rachel by making a list of the pros and cons of each. Big mistake. Meanwhile, Monica gets a job making food with a synthetic chocolate substitute called Mockolate.",
                  "backup_still_url": "/ng1mU6n9Yb9JWwNH2bIlzIUdZhx.jpg",
                  "air_date": "1995-11-16",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3073,
                  "episode_number": 9,
                  "episode_name": "The One with Phoebe's Dad",
                  "vote_average": 7.6,
                  "vote_count": 48,
                  "overview": "It's Christmas time and Monica tries tipping with cookies, rather than cash, with mixed results. Phoebe tries to track down her real father. And Chandler and Joey wait too late to shop for presents.",
                  "backup_still_url": "/HiNO3Gyp69e59Pax6a0g2Vhr1S.jpg",
                  "air_date": "1995-12-14",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3074,
                  "episode_number": 10,
                  "episode_name": "The One with Russ",
                  "vote_average": 7.9,
                  "vote_count": 49,
                  "overview": "Monica gets back together with Fun Bobby. Joey lands a role of a neurosurgeon on Days of Our Lives. And Rachel, dating a guy named Russ, can't see his uncanny resemblance to Ross.",
                  "backup_still_url": "/zDoRfPdUWKdhl3MSiMckp1wtzWC.jpg",
                  "air_date": "1996-01-04",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3075,
                  "episode_number": 11,
                  "episode_name": "The One with the Lesbian Wedding",
                  "vote_average": 7.9,
                  "vote_count": 48,
                  "overview": "Monica caters the wedding of Ross's ex-wife and her lesbian lover. Phoebe is possessed by the spirit of an 82-year-old massage client who dies in the middle of a session. And Rachel's mom comes to visit and drops a bombshell.",
                  "backup_still_url": "/sHhsoHmPSG0hVopaKsnM9pu7zD6.jpg",
                  "air_date": "1996-01-18",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3076,
                  "episode_number": 12,
                  "episode_name": "The One After the Super Bowl (1)",
                  "vote_average": 8.2,
                  "vote_count": 51,
                  "overview": "Ross goes to visit Marcel, his monkey, while on a trip to California. Joey gets his first fan letter and ends up dating the woman. Phoebe is asked to sing for the children at the library, but their parents are horrified by her lyrics.",
                  "backup_still_url": "/lPPHEnQDdTEFWzG0fLEFp7AAAU1.jpg",
                  "air_date": "1996-01-28",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3077,
                  "episode_number": 13,
                  "episode_name": "The One After the Super Bowl (2)",
                  "vote_average": 8,
                  "vote_count": 21,
                  "overview": "Rachel and Monica compete for the affections of Jean-Claude Van Damme after meeting him on a movie set. Chandler meets a former schoolmate while an excited Joey gets a role as an extra in the movie. Ross and Marcel go on a whirlwind tour of the city.",
                  "backup_still_url": "/aAOWF2fMQiDrdzb6IpAOiTmnJaC.jpg",
                  "air_date": "1996-01-28",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3078,
                  "episode_number": 14,
                  "episode_name": "The One with the Prom Video",
                  "vote_average": 8.8,
                  "vote_count": 55,
                  "overview": "After getting his big break, with Days of Our Lives, Joey pays Chandler back. Monica is unemployed and hard up for money. Monica and Rachel's prom video reveals Monica's former girth, Rachel's former nose and the way Ross has always felt about Rachel.",
                  "backup_still_url": "/yaj00vryGCmBzpkrEDHgT6Pj5z5.jpg",
                  "air_date": "1996-02-01",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3079,
                  "episode_number": 15,
                  "episode_name": "The One Where Ross and Rachel... You Know",
                  "vote_average": 8.4,
                  "vote_count": 48,
                  "overview": "Joey buys a big screen TV and two leather recliners with his newfound money. Monica has a catering job for one of her parents' friends and becomes infatuated. Ross and Rachel attempt to have their first real date, but Rachel laughs every time they kiss. When they try again the next evening, they are interrupted when Ross is called into the museum.",
                  "backup_still_url": "/vEnD6mvkwRgapYZr8tZBSoEAHcn.jpg",
                  "air_date": "1996-02-08",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3080,
                  "episode_number": 16,
                  "episode_name": "The One Where Joey Moves Out",
                  "vote_average": 8.3,
                  "vote_count": 49,
                  "overview": "After having a fight with Chandler, Joey decides to move out. Rachel and Phoebe decide to get tattoos. And, on his birthday, Mr. Geller receives the unsettling news that his best friend and his daughter are dating.",
                  "backup_still_url": "/7OKGNoKDtFxQY3hNXOP6y3JRO53.jpg",
                  "air_date": "1996-02-15",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3081,
                  "episode_number": 17,
                  "episode_name": "The One Where Eddie Moves In",
                  "vote_average": 8.1,
                  "vote_count": 44,
                  "overview": "Phoebe is discovered by a record producer who wants to make \"Smelly Cat\" a video. Ross's new relationship with Rachel makes Monica feel like she's living with her brother again... and she hates it.  And Joey considers moving back in with Chandler, but Chandler has a new roommate.",
                  "backup_still_url": "/zjGdr3fu5LaoFGKMcXwvwEX3lNu.jpg",
                  "air_date": "1996-02-22",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3082,
                  "episode_number": 18,
                  "episode_name": "The One Where Dr. Ramoray Dies",
                  "vote_average": 7.9,
                  "vote_count": 49,
                  "overview": "Chandler learns more about his new roommate, Eddie. Ross is stressed out to learn that Rachel had 'animal sex' with Paolo. Richard and Monica are uncomfortable to learn what their numbers of ex-lovers are. Joey's remarks to a fan magazine could cause him to lose his job playing Dr Ramoray.",
                  "backup_still_url": "/1Qm6wEdAzXmap2bflb05mlC0jU2.jpg",
                  "air_date": "1996-03-21",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3083,
                  "episode_number": 19,
                  "episode_name": "The One Where Eddie Won't Go",
                  "vote_average": 8.2,
                  "vote_count": 47,
                  "overview": "Creeped out by his bizarre new roommate, Chandler demands he move out; Eddie agrees... but won't go. Joey has trouble coming to grips with the death of Dr. Drake Ramoray and is facing some exorbitant bills. And a new book on women's empowerment inspires the ladies to have a \"goddess meeting.\"",
                  "backup_still_url": "/nPaqxogdoDIb81HJ488dsVbkpCw.jpg",
                  "air_date": "1996-03-28",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3084,
                  "episode_number": 20,
                  "episode_name": "The One Where Old Yeller Dies",
                  "vote_average": 7.9,
                  "vote_count": 46,
                  "overview": "Monica's new boyfriend impresses Chandler and Joey. Phoebe's world view is shattered when she finds out what she missed as a child, and Rachel resents the fact that Ross has planned their whole life together.",
                  "backup_still_url": "/pfBhzSGoBFWnHr7HGo4OHUn48gI.jpg",
                  "air_date": "1996-04-04",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3085,
                  "episode_number": 21,
                  "episode_name": "The One with the Bullies",
                  "vote_average": 7.8,
                  "vote_count": 45,
                  "overview": "Monica is broke and decides to gamble on the stock market, while Chandler and Ross run into a couple of bullies in Central Park. Rachel and Joey help Phoebe locate her father, but a vicious dog prevents Phoebe from finally meeting him.",
                  "backup_still_url": "/cNgv7rAm7YkvooOGOpFSTlfS5wS.jpg",
                  "air_date": "1996-04-25",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3086,
                  "episode_number": 22,
                  "episode_name": "The One with the Two Parties",
                  "vote_average": 8.4,
                  "vote_count": 47,
                  "overview": "Monica decides to hold a surprise birthday for Rachel, but everything goes wrong when Rachel's estranged parents turn up unexpectedly. The party then splits into two factions, but complications inevitably ensue.",
                  "backup_still_url": "/aKmPfjA0QssEqOuiSMyJGEoEJdt.jpg",
                  "air_date": "1996-05-02",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3087,
                  "episode_number": 23,
                  "episode_name": "The One with the Chicken Pox",
                  "vote_average": 7.9,
                  "vote_count": 46,
                  "overview": "Phoebe's submariner ex-boyfriend visits New York on leave for 2 weeks from the Navy. Unfortunately, Phoebe catches chicken pox at Ben's first birthday party. When Monica realizes that Richard has no real neuroses, she worries that she is too strange for him. Chandler organizes a job as a processor for Joey.",
                  "backup_still_url": "/pVSXGWFFGGKs3iWDX8RZmtNJlDA.jpg",
                  "air_date": "1996-05-09",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3088,
                  "episode_number": 24,
                  "episode_name": "The One with Barry and Mindy's Wedding",
                  "vote_average": 8,
                  "vote_count": 46,
                  "overview": "Rachel agrees to be maid of honor at her ex-fiancé's wedding; she relives the nightmare of her own failed wedding day. Meanwhile, Chandler becomes enamored with a woman he meets on the Internet, but is surprised when he finally meets her. Monica ponders her future with Richard.",
                  "backup_still_url": "/3o85MotMLDmbCPIiIwCfPYzDYgY.jpg",
                  "air_date": "1996-05-16",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 242,
              "season_number": 3,
              "season_name": "Season 3",
              "vote_average": 8.3,
              "vote_count": null,
              "episode_count": 25,
              "overview": "",
              "backup_poster_url": "/n9u4pslqb6tpiLc8soldL5IbAyG.jpg",
              "episodes": [
                {
                  "episode_id": 3089,
                  "episode_number": 1,
                  "episode_name": "The One with the Princess Leia Fantasy",
                  "vote_average": 8.5,
                  "vote_count": 47,
                  "overview": "Ross reveals a fantasy to Rachel involving a certain \"Star Wars\" character. Monica suffers from insomnia after her breakup with Richard. And Chandler, back together with Janice, wants Joey to bond with her.",
                  "backup_still_url": "/ci28CPpvg6EEDPlCbMLtNUDJPcR.jpg",
                  "air_date": "1996-09-16",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3090,
                  "episode_number": 2,
                  "episode_name": "The One Where No One's Ready",
                  "vote_average": 8.7,
                  "vote_count": 46,
                  "overview": "In a race against the clock, a stressed Ross tries to get the gang dressed and ready for a black-tie benefit at the museum while Joey and Chandler clash over personal belongings and personal space.",
                  "backup_still_url": "/bBmgNbrW0ozjaiKDKKfijwKWdRc.jpg",
                  "air_date": "1996-09-26",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3091,
                  "episode_number": 3,
                  "episode_name": "The One with the Jam",
                  "vote_average": 8,
                  "vote_count": 44,
                  "overview": "Phoebe dates a man who thinks he's stalking her twin sister. Ross and Rachel give Chandler \"boyfriend\" lessons. Monica decides the best way to get over Richard is to keep herself busy, so she uses her free time to make jam and considers insemination via a sperm bank.",
                  "backup_still_url": "/fNgjqLtlhQBjNRFdX10edanoke1.jpg",
                  "air_date": "1996-10-03",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3092,
                  "episode_number": 4,
                  "episode_name": "The One with the Metaphorical Tunnel",
                  "vote_average": 8,
                  "vote_count": 44,
                  "overview": "Phoebe poses as Joey's agent and has some success in getting him auditions. Ross panics when he sees his son with a Barbie doll. Chandler is advancing in his relationship with Janice and, realizing that he has a fear of commitment, goes to the girls for advice.",
                  "backup_still_url": "/jLnfUmRWirw55UJ9vUu9DBXhxKw.jpg",
                  "air_date": "1996-10-10",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3093,
                  "episode_number": 5,
                  "episode_name": "The One with Frank, Jr.",
                  "vote_average": 8.1,
                  "vote_count": 43,
                  "overview": "Phoebe's half-brother visits, but they have trouble bonding. Joey attempts to build an entertainment center. Ross is challenged to name the five celebrities he'd like to sleep with most.",
                  "backup_still_url": "/xV4gS3ZbpbDDRy1iTAzD9pWone2.jpg",
                  "air_date": "1996-10-17",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3094,
                  "episode_number": 6,
                  "episode_name": "The One with the Flashback",
                  "vote_average": 8.8,
                  "vote_count": 44,
                  "overview": "When Janice asks the gang if any of them have ever slept together, the friends flash back to a time three years before.",
                  "backup_still_url": "/vAVRp4FQO858ZurhMkjy2Ry8BbM.jpg",
                  "air_date": "1996-10-31",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3095,
                  "episode_number": 7,
                  "episode_name": "The One with the Race Car Bed",
                  "vote_average": 8.3,
                  "vote_count": 43,
                  "overview": "Monica buys a new bed from Janice's soon-to-be-ex-husband, \"The Mattress King\", but the wrong one is delivered.  Rachel's attempts to have her father and Ross bond fail, until she stops trying. Joey gets a job teaching a soap opera acting class.",
                  "backup_still_url": "/gCUk2Mytau5IX7oEndRnwtzThOT.jpg",
                  "air_date": "1996-11-07",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3096,
                  "episode_number": 8,
                  "episode_name": "The One with the Giant Poking Device",
                  "vote_average": 8.3,
                  "vote_count": 42,
                  "overview": "When Phoebe believes she's killed the ugly naked guy across the street from Rachel and Monica, Joey constructs a long poking device. Joey and Monica catch Janice kissing her ex-husband; Chandler confronts Janice.",
                  "backup_still_url": "/lu2f7cegzxOPSI3snkYj5CgdEGO.jpg",
                  "air_date": "1996-11-14",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3097,
                  "episode_number": 9,
                  "episode_name": "The One with the Football",
                  "vote_average": 8.5,
                  "vote_count": 43,
                  "overview": "Emotions become the feast of the day when the gang plays a game of touch football on Thanksgiving. Joey and Chandler argue over who gets to date a model while Ross and Monica argue over winning in a case of sibling rivalry. [Thanksgiving Episode]",
                  "backup_still_url": "/nqWtfvNwkbhi6q5ZdPo9Ba1tcPW.jpg",
                  "air_date": "1996-11-21",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3098,
                  "episode_number": 10,
                  "episode_name": "The One Where Rachel Quits",
                  "vote_average": 8.2,
                  "vote_count": 44,
                  "overview": "Rachel makes a rash decision after Gunther tells her she needs to be retrained.  Phoebe tries to help Joey when he gets a job selling Christmas trees.  And Ross accidentally breaks a girl's leg and tries to make it up to her.",
                  "backup_still_url": "/skkFqwQlp7sLZBQTjoRAHoz7SpJ.jpg",
                  "air_date": "1996-12-12",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3099,
                  "episode_number": 11,
                  "episode_name": "The One Where Chandler Can't Remember Which Sister",
                  "vote_average": 8.4,
                  "vote_count": 46,
                  "overview": "Ross is suspicious about Rachel's possible job offer from a good-looking stranger.  And a drunken Chandler fools around with one of Joey's sisters, but he can't remember which one.",
                  "backup_still_url": "/14vp2eC2vuJvvmxry86j6gugpNF.jpg",
                  "air_date": "1997-01-09",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3100,
                  "episode_number": 12,
                  "episode_name": "The One with All the Jealousy",
                  "vote_average": 8,
                  "vote_count": 41,
                  "overview": "Ross becomes increasingly jealous of Rachel's new colleague, Mark, and spies on her. Monica hooks up with a co-worker, who writes her a poem with a hidden meaning. One of Joey's numerous lies on his resume is exposed when he takes part in a Broadway musical.",
                  "backup_still_url": "/yz9hYNhS92EFfii4apZoPaH3TxZ.jpg",
                  "air_date": "1997-01-16",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3101,
                  "episode_number": 13,
                  "episode_name": "The One Where Monica and Richard Are Just Friends",
                  "vote_average": 8.2,
                  "vote_count": 41,
                  "overview": "Monica's willpower is tested when she runs into Richard at the video store. Rachel agrees to read The Shining if Joey reads Little Women. Phoebe's athletic date has a problem with short shorts.",
                  "backup_still_url": "/qIbd5XEEa5gK2oXRbIeYT9PrK2W.jpg",
                  "air_date": "1997-01-30",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3102,
                  "episode_number": 14,
                  "episode_name": "The One with Phoebe's Ex-Partner",
                  "vote_average": 7.9,
                  "vote_count": 41,
                  "overview": "Phoebe is reunited with her former singing partner who thinks \"Smelly Cat\" has hit potential; Chandler dates a woman with a prosthetic leg who also has some history with Joey. Meanwhile, Ross goes to a fashion seminar with Rachel, so she won't go with Mark, but falls asleep in the middle of it.",
                  "backup_still_url": "/3Towvxh6qAtJycuJ7XW8GJQhB3N.jpg",
                  "air_date": "1997-02-06",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3103,
                  "episode_number": 15,
                  "episode_name": "The One Where Ross and Rachel Take a Break",
                  "vote_average": 8.1,
                  "vote_count": 42,
                  "overview": "Wanting more time to focus on her new job, Rachel suggests that she and Ross take a break from their relationship. Ross later seeks solace at a party. Phoebe dates a diplomat who needs an interpreter to communicate with her. Chandler and Joey ponder a ménage a trois with a woman who seems hot for both of them. [First part of a 2-part episode]",
                  "backup_still_url": "/hQ7vb9GxKeHq8zhy3L15TWmcXlq.jpg",
                  "air_date": "1997-02-13",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3104,
                  "episode_number": 16,
                  "episode_name": "The One with the Morning After",
                  "vote_average": 8.6,
                  "vote_count": 43,
                  "overview": "Ross tries to prevent Rachel from learning his disturbing secret. She finds out anyway and they go back to her apartment to have a fight. The other four friends are trapped in Monica's bedroom, forced to listen in.",
                  "backup_still_url": "/5rM97ao2TZZMHUrfsnP1XCOh1Jx.jpg",
                  "air_date": "1997-02-20",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3105,
                  "episode_number": 17,
                  "episode_name": "The One Without the Ski Trip",
                  "vote_average": 8.2,
                  "vote_count": 41,
                  "overview": "Ross and Rachel compete to spend time with their other friends. When a lonely Ross is excluded from Rachel's ski trip with her pals, he visits Carol. On the way to the cabin, they run out of gas. Meanwhile, Chandler starts smoking again.",
                  "backup_still_url": "/6xO5fIPn0xa9IAS30U3POy3ZG8c.jpg",
                  "air_date": "1997-03-06",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3106,
                  "episode_number": 18,
                  "episode_name": "The One with the Hypnosis Tape",
                  "vote_average": 8.3,
                  "vote_count": 42,
                  "overview": "Monica receives a tip from an admirer worth a small fortune then goes out with the guy. A hypnosis tape intended to assist Chandler to stop smoking has a rather strange side effect. Phoebe is upset when her 18-year-old half-brother, Frank Jr., makes a surprise announcement that he is getting married - to a woman more than twice his age.",
                  "backup_still_url": "/l01b0UomTW9WNWmDr87aOFoQW1T.jpg",
                  "air_date": "1997-03-13",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3107,
                  "episode_number": 19,
                  "episode_name": "The One with the Tiny T-Shirt",
                  "vote_average": 8.2,
                  "vote_count": 40,
                  "overview": "Rachel goes on her first date after splitting from Ross...and it's with Mark, her former colleague. Joey is cast in a play and develops a crush on his costar. Monica continues to date Pete, even though she is still not attracted to him.",
                  "backup_still_url": "/sxEjTxnAGl0kTaBJdH0WAF8DmpD.jpg",
                  "air_date": "1997-03-27",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3108,
                  "episode_number": 20,
                  "episode_name": "The One with the Dollhouse",
                  "vote_average": 8,
                  "vote_count": 40,
                  "overview": "Monica inherits a beautiful dollhouse that is too elaborate to play with, so Phoebe makes her own. Joey thinks he's found his true love, and Rachel's boss dates Chandler, placing her in a dangerous situation.",
                  "backup_still_url": "/qKaDNoe48je6AQIjNIM110c8SeY.jpg",
                  "air_date": "1997-04-10",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3109,
                  "episode_number": 21,
                  "episode_name": "The One with the Chick and the Duck",
                  "vote_average": 8.4,
                  "vote_count": 40,
                  "overview": "Monica considers a dream job as head chef in Pete's new restaurant, but Phoebe fears there is more to the deal. Ross makes a sacrifice to help Rachel, who may have a broken rib. Meanwhile, Joey buys Chandler an unusual pet.",
                  "backup_still_url": "/8yZycDRGAImK2Qpmm5PdG3gforx.jpg",
                  "air_date": "1997-04-17",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3110,
                  "episode_number": 22,
                  "episode_name": "The One with the Screamer",
                  "vote_average": 8.2,
                  "vote_count": 39,
                  "overview": "When Rachel finds out that Ross is bringing a date to the premiere of Joey's big play, she finds one of her own. Ross alone concludes that her date is insane. Poor Phoebe is on hold for days with a company she needs to talk to before her phone warranty expires. Meanwhile, Joey's play gets terrible reviews, but his co-star provides some comfort.",
                  "backup_still_url": "/vHqib05ysQ05YcFTdFSNdyKHDA.jpg",
                  "air_date": "1997-04-24",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3111,
                  "episode_number": 23,
                  "episode_name": "The One with Ross's Thing",
                  "vote_average": 8,
                  "vote_count": 40,
                  "overview": "Afflicted with a mysterious skin condition on his butt that doctors cannot identify the cause of, Ross seeks advice from Phoebe's herbalist. Phoebe finds herself in a dilemma when she cannot choose between two guys. Monica can't decide about Pete when she thinks he is going to propose.",
                  "backup_still_url": "/bgQi42yjC73KixG77IDuasPSdXl.jpg",
                  "air_date": "1997-05-01",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3112,
                  "episode_number": 24,
                  "episode_name": "The One with the Ultimate Fighting Champion",
                  "vote_average": 8,
                  "vote_count": 42,
                  "overview": "To Monica's horror, Pete wants to be the Ultimate Fighting Champion. Chandler has a problem when his new boss is slaphappy. Phoebe sets Ross up on a date with a woman who used to be bald. The group overhears a scandalous conversation at Central Perk.",
                  "backup_still_url": "/m2ryBGyo6AAfcGnpGrSNt35lgVF.jpg",
                  "air_date": "1997-05-08",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3113,
                  "episode_number": 25,
                  "episode_name": "The One at the Beach",
                  "vote_average": 8.5,
                  "vote_count": 41,
                  "overview": "Phoebe invites everyone to stay at her massage client's beach house for the weekend. In search of her father, Phoebe meets someone who knows details about her family. Rachel expresses her jealousy of Ross' uninhibited girlfriend and Joey nags the friends into agreeing to play strip poker with unintended results. Chandler wonders why Monica doesn't think he's serious after asking if she would ever date him.",
                  "backup_still_url": "/1YwKZ32SvyhjdA3cBtoyn5oNXFL.jpg",
                  "air_date": "1997-05-15",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 243,
              "season_number": 4,
              "season_name": "Season 4",
              "vote_average": 8.3,
              "vote_count": null,
              "episode_count": 23,
              "overview": "",
              "backup_poster_url": "/3WdH3FNMXgp3Qlx21T7kwKS8Mtc.jpg",
              "episodes": [
                {
                  "episode_id": 3114,
                  "episode_number": 1,
                  "episode_name": "The One with the Jellyfish",
                  "vote_average": 8.7,
                  "vote_count": 46,
                  "overview": "Ross chooses between Rachel and his bald-headed girlfriend Bonnie. Phoebe struggles to deal with the revelation that her mother's friend is actually her mother. Monica gets stung by a jellyfish, forcing Chandler and Joey to step up to the plate in order to relieve her pain.",
                  "backup_still_url": "/67tiGi36IUXlNAPlPJy98INk2DQ.jpg",
                  "air_date": "1997-09-25",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3115,
                  "episode_number": 2,
                  "episode_name": "The One with the Cat",
                  "vote_average": 8,
                  "vote_count": 40,
                  "overview": "Phoebe believes that her adoptive mother's spirit resides in a cat that jumped into her guitar case in Central Perk.  Monica goes on a date with Rachel's hunky high-school boyfriend, who was cool in high-school, but a failure now. And when Joey and Chandler decide to sell the entertainment center, Joey takes stupidity to a new level.",
                  "backup_still_url": "/1zEnoQyjbystjf9nywj07dpMwza.jpg",
                  "air_date": "1997-10-02",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3116,
                  "episode_number": 3,
                  "episode_name": "The One with the 'Cuffs",
                  "vote_average": 8.5,
                  "vote_count": 40,
                  "overview": "Monica caters a party for her mother, who still doesn't quite know how to talk to her daughter. Chandler's encounter with Rachel's boss leads to an embarrassing situation. And an encyclopedia salesman takes advantage of Joey.",
                  "backup_still_url": "/fqXZu4P3QTa27Ne2fzkZM5sdbpG.jpg",
                  "air_date": "1997-10-09",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3117,
                  "episode_number": 4,
                  "episode_name": "The One with the Ballroom Dancing",
                  "vote_average": 8,
                  "vote_count": 41,
                  "overview": "Joey attempts ballroom dancing in order to help Monica and Rachel keep their illegal sublet. Phoebe is attracted to one of her massage clients. And Ross tries to help Chandler quit the gym.",
                  "backup_still_url": "/khxmKmjmsQVXxJW1P8VbCdeFMoA.jpg",
                  "air_date": "1997-10-16",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3118,
                  "episode_number": 5,
                  "episode_name": "The One with Joey's New Girlfriend",
                  "vote_average": 8.3,
                  "vote_count": 40,
                  "overview": "Chandler hits on a woman at Central Perk, not realizing she is Joey's new girlfriend. He soon realizes he is very attracted to, possibly in love, with her. Ross and Rachel play the jealousy game in their relationships. And Phoebe desperately tries to catch a cold after discovering that her voice is sexier and her singing better when she has phlegm in her throat.",
                  "backup_still_url": "/3Hym8m1BzQct9GHljwzNgLPQoLy.jpg",
                  "air_date": "1997-10-30",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3119,
                  "episode_number": 6,
                  "episode_name": "The One with the Dirty Girl",
                  "vote_average": 8.5,
                  "vote_count": 39,
                  "overview": "Ross's new girlfriend seems nearly perfect until he visits her house and discovers that her apartment is incredibly dirty.  Chandler helps Joey pick out a thoughtful present for Kathy's birthday. Rachel attempts to finish a crossword puzzle by herself. And Phoebe helps Monica cater a funeral.",
                  "backup_still_url": "/4yt3mMbJHwNxhFGMzXMWulzfE2T.jpg",
                  "air_date": "1997-11-06",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3120,
                  "episode_number": 7,
                  "episode_name": "The One Where Chandler Crosses the Line",
                  "vote_average": 8.4,
                  "vote_count": 40,
                  "overview": "Chandler must decide between the girl of his dreams and his best friend when he and Kathy share a passionate kiss. Needless to say, Joey is not happy when he finds out about it. And nobody wants to tell Ross how awful his keyboard playing is.",
                  "backup_still_url": "/9MhRmA4n6ZBDum4dBTF9xDBiuwx.jpg",
                  "air_date": "1997-11-13",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3121,
                  "episode_number": 8,
                  "episode_name": "The One with Chandler in a Box",
                  "vote_average": 8.7,
                  "vote_count": 40,
                  "overview": "Chandler agrees to spend Thanksgiving in a shipping crate as penance for kissing Kathy. The gang decides to give each other Secret Santa gifts. After Monica gets ice in her eye, she ends up visiting Richard's son, who is as attracted to Monica as his father was.",
                  "backup_still_url": "/hOz3zqyisPN5MkFi7KMFw2uYx4A.jpg",
                  "air_date": "1997-11-20",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3122,
                  "episode_number": 9,
                  "episode_name": "The One Where They're Going to Party!",
                  "vote_average": 8.1,
                  "vote_count": 39,
                  "overview": "Chandler and Ross's college friend Gandalf is planning to come to town. Gandalf is \"the party wizard.\" Ross and Chandler are very excited until Gandalf cancels. However, they decide to make their own party with Joey's help. Joanna squashes Rachel's chance at a promotion. And when Monica fills in for a friend as food critic for a small newspaper, she must decide between a steady job as head chef of a restaurant she panned or keeping her catering business with her friend Phoebe.",
                  "backup_still_url": "/A8zYaSOftPKM4q05IOQcqYdWrs7.jpg",
                  "air_date": "1997-12-11",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3123,
                  "episode_number": 10,
                  "episode_name": "The One with the Girl from Poughkeepsie",
                  "vote_average": 7.9,
                  "vote_count": 39,
                  "overview": "Ross must decide whether to continue dating a girl he must travel two-and-a-half hours to see. Chandler sets Rachel up with a co-worker who misunderstands her intentions. Monica is being treated poorly by her new co-workers so she hires Joey just so she can fire him and show who's the boss. And Phoebe tries to write the perfect holiday song.",
                  "backup_still_url": "/bNLBOFFQN5r3GpFUKvPmWYWz6DM.jpg",
                  "air_date": "1997-12-18",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3124,
                  "episode_number": 11,
                  "episode_name": "The One with Phoebe's Uterus",
                  "vote_average": 8.6,
                  "vote_count": 39,
                  "overview": "Phoebe considers her options when her brother visits with his new wife and asks her to carry their child. Joey works as a tour guide at Ross's museum and tries to tear down the walls between tour guides and scientists. And Chandler seeks advice from Monica and Rachel after he fears that he will not live up to Kathy's sexual expectations--especially since the last guy she slept with before him was Joey.",
                  "backup_still_url": "/nT2D93C06aLnO8VkxA6rnTSiuVm.jpg",
                  "air_date": "1998-01-08",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3125,
                  "episode_number": 12,
                  "episode_name": "The One with the Embryos",
                  "vote_average": 8.9,
                  "vote_count": 47,
                  "overview": "Phoebe's uterus is examined for implantation of the embryos. Meanwhile, a seemingly harmless game between Chandler and Joey against Monica and Rachel escalates into a full blown contest where the stakes are raised higher and higher.",
                  "backup_still_url": "/nRXtaq1enijfiDwxzAPhJKkFtsu.jpg",
                  "air_date": "1998-01-15",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3126,
                  "episode_number": 13,
                  "episode_name": "The One with Rachel's Crush",
                  "vote_average": 8,
                  "vote_count": 43,
                  "overview": "After seeing Kathy's play, Chandler becomes convinced she is cheating on him with her co-star. Rachel develops a crush on one of her customers. Monica becomes jealous when she realizes she is no longer the 'hostess'.",
                  "backup_still_url": "/vIMOQQjaxNqPdmw0ro3ilrRAC4d.jpg",
                  "air_date": "1998-01-29",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3127,
                  "episode_number": 14,
                  "episode_name": "The One with Joey's Dirty Day",
                  "vote_average": 8.2,
                  "vote_count": 42,
                  "overview": "After a three-day fishing trip with his dad, Joey is in a jam when he doesn't have time to take a shower before going to the set of Charlton Heston's new movie.  Rachel, continuing to fawn over clothing shopper Joshua, sets Ross up with her boss's niece Emily when she is unable to take her to the opera. And while Chandler is despondent after his breakup with Kathy, the girls take him to a strip club.",
                  "backup_still_url": "/bNXV6xfkk1njmF3ftIHxJ3A1vkh.jpg",
                  "air_date": "1998-02-05",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3128,
                  "episode_number": 15,
                  "episode_name": "The One with All the Rugby",
                  "vote_average": 8.3,
                  "vote_count": 40,
                  "overview": "Chandler runs into Janice, and finds her more irritating than ever. Meanwhile, Ross attempts to learn how to play rugby to impress Emily and Monica obsesses over an electric switch in her new apartment.",
                  "backup_still_url": "/sTWf0xRUTztjHXElg65TiXKW4nS.jpg",
                  "air_date": "1998-02-26",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3129,
                  "episode_number": 16,
                  "episode_name": "The One with the Fake Party",
                  "vote_average": 8,
                  "vote_count": 42,
                  "overview": "With two days left until Emily's departure back to England, Rachel throws a fake party for her, just so that she can see Joshua outside of work. And a pregnant (vegetarian) Phoebe craves meat.",
                  "backup_still_url": "/sjFybiEckDorc9beXc8cHxNeAHg.jpg",
                  "air_date": "1998-03-19",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3130,
                  "episode_number": 17,
                  "episode_name": "The One with the Free Porn",
                  "vote_average": 8.4,
                  "vote_count": 40,
                  "overview": "Chandler and Joey discover that they're getting a free porno station on their TV. Monica encourages Ross to tell Emily he loves her just before she leaves for London. Phoebe gets some shocking news when she visits her OB-GYN.",
                  "backup_still_url": "/dlg9ZvKBF6JmxogJx1syGqvXB2D.jpg",
                  "air_date": "1998-03-26",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3131,
                  "episode_number": 18,
                  "episode_name": "The One with Rachel's New Dress",
                  "vote_average": 8.1,
                  "vote_count": 40,
                  "overview": "Rachel has an awkward encounter with Joshua's parents. Phoebe is offered the chance to name one of the triplets. Ross becomes paranoid when Emily goes to London with Susan.",
                  "backup_still_url": "/lX0Ui3DMEyljM5oDWWfInQaGtRP.jpg",
                  "air_date": "1998-04-02",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3132,
                  "episode_number": 19,
                  "episode_name": "The One with All the Haste",
                  "vote_average": 8.6,
                  "vote_count": 42,
                  "overview": "Ross proposes to Emily. Monica and Rachel try to win their apartment back from Chandler and Joey.",
                  "backup_still_url": "/qcJAFWAHCsjcrl4cxB9SLM5vek4.jpg",
                  "air_date": "1998-04-09",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3133,
                  "episode_number": 20,
                  "episode_name": "The One with All the Wedding Dresses",
                  "vote_average": 8.4,
                  "vote_count": 40,
                  "overview": "Chandler takes Joey to a sleep clinic when he starts snoring. After Ross asks Monica to pick up Emily's wedding dress, she tries it on and can't stop wearing it. Meanwhile, jealous of Ross's proposal to Emily, Rachel tries to talk Joshua into marriage.",
                  "backup_still_url": "/5HoqXdCE3NItOrlgKzE5HsUHuSE.jpg",
                  "air_date": "1998-04-16",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3134,
                  "episode_number": 21,
                  "episode_name": "The One with the Invitation",
                  "vote_average": 7.4,
                  "vote_count": 39,
                  "overview": "As Ross and Emily send out wedding invitations, he and Rachel each look back on their relationship together while Joey and Chandler look for a purpose in life.",
                  "backup_still_url": "/xOlyFkFyMhhoeHbVxgKGRneplS9.jpg",
                  "air_date": "1998-04-23",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3135,
                  "episode_number": 22,
                  "episode_name": "The One with the Worst Best Man Ever",
                  "vote_average": 8,
                  "vote_count": 40,
                  "overview": "Joey convinces Ross to pick him as his best man instead of Chandler. He throws a great bachelor party, but the next morning he's shocked to find out that the wedding ring is missing and he suspects that the stripper stole it. Meanwhile, Phoebe is experiencing major mood swings due to her pregnancy and the girls decide to throw her a baby shower to cheer her up, but it only makes matters worse.",
                  "backup_still_url": "/qBaqspVkyo2C7XlEAnGEylM7pG.jpg",
                  "air_date": "1998-04-30",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3136,
                  "episode_number": 23,
                  "episode_name": "The One with Ross's Wedding",
                  "vote_average": 8.4,
                  "vote_count": 42,
                  "overview": "The gang heads over to London for Ross and Emily's wedding. Joey can't contain his excitement about London which annoys Chandler to no end and results in two of them arguing. While the guys are touring the city, Monica, together with Ross and Emily, visit the chapel where the wedding ceremony is supposed to take place only to find out that it's being torn down prematurely.\n\nPhoebe tries to warn the gang that Rachel is coming to London to tell Ross that she still loves him. After the initial excitement about visiting England dissipates, Joey begins to feel homesick, however, one of the bridesmaids helps him to forget about it. Meanwhile, Ross and Emily's parents get into an argument over the bill for the wedding.",
                  "backup_still_url": "/fvRlowH2KAAHaveAHXA6ZvyHPvD.jpg",
                  "air_date": "1998-05-07",
                  "runtime": 46,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 244,
              "season_number": 5,
              "season_name": "Season 5",
              "vote_average": 8.4,
              "vote_count": null,
              "episode_count": 23,
              "overview": "",
              "backup_poster_url": "/aEwLXWbo6gV1TNIv9veu4rRwsPZ.jpg",
              "episodes": [
                {
                  "episode_id": 3137,
                  "episode_number": 1,
                  "episode_name": "The One After Ross Says Rachel",
                  "vote_average": 8.7,
                  "vote_count": 49,
                  "overview": "In the aftermath of his Freudian slip, Ross tries to rescue his marriage with Emily.  Meanwhile, Chandler and Monica try and find a moment alone in order to continue their affair while overseas.",
                  "backup_still_url": "/cy99mz7wO24VK9j6x2fwT0AslMI.jpg",
                  "air_date": "1998-09-24",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3138,
                  "episode_number": 2,
                  "episode_name": "The One with All the Kissing",
                  "vote_average": 8.7,
                  "vote_count": 43,
                  "overview": "Ross continues to try and mend his marriage to Emily. When Chandler accidentally kisses Monica in front of everyone before leaving for work, he tries to recover by kissing Rachel and Phoebe as well. Meanwhile, Phoebe starts getting irritated by everyone's London stories.",
                  "backup_still_url": "/5LswaLN9QpjjBNFbtPrLQoHXSi0.jpg",
                  "air_date": "1998-10-01",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3139,
                  "episode_number": 3,
                  "episode_name": "The One Hundredth",
                  "vote_average": 8.5,
                  "vote_count": 40,
                  "overview": "Phoebe is rushed to the hospital for the birth of her brother's triplets. While there, Joey winds up with severe sympathy pains that turn out to be kidney stones. Meanwhile, Rachel tries to set Monica up on a date with a male nurse.",
                  "backup_still_url": "/f6ZuOAGSqls2mr012J0IK1D7m4u.jpg",
                  "air_date": "1998-10-08",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3140,
                  "episode_number": 4,
                  "episode_name": "The One Where Phoebe Hates PBS",
                  "vote_average": 8.1,
                  "vote_count": 40,
                  "overview": "Joey lands a job with a PBS telethon, which ignites an old hatred Phoebe has towards the network.  Meanwhile, Monica tries to convince Rachel that she's dating someone from work to hide her relationship with Chandler. And Ross finally gets in touch with Emily and they try to work it out.",
                  "backup_still_url": "/8D2MBiGgf1mBPKZ31N3L9sVGNve.jpg",
                  "air_date": "1998-10-15",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3141,
                  "episode_number": 5,
                  "episode_name": "The One with the Kips",
                  "vote_average": 8.6,
                  "vote_count": 41,
                  "overview": "Monica and Chandler plan an Atlantic City getaway in order to have an intimate weekend away from their friends.  Meanwhile, Ross prepares himself to tell Rachel that he can't see her anymore.",
                  "backup_still_url": "/5QOC8UgmezlCsk5vu7DGjtNG1Qd.jpg",
                  "air_date": "1998-10-29",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3142,
                  "episode_number": 6,
                  "episode_name": "The One with the Yeti",
                  "vote_average": 8,
                  "vote_count": 42,
                  "overview": "Emily decides that the only way to continue her marriage with Ross is to have him get rid of all traces of Rachel in his apartment.  Meanwhile, Rachel and Monica mistake a hairy neighbor for a yeti.",
                  "backup_still_url": "/t8frUbTNAaU585dwir1wRcylauR.jpg",
                  "air_date": "1998-11-05",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3143,
                  "episode_number": 7,
                  "episode_name": "The One Where Ross Moves In",
                  "vote_average": 8.2,
                  "vote_count": 40,
                  "overview": "Chandler and Joey let Ross move in with them once his marriage to Emily falls apart.  Meanwhile, Phoebe gets involved with the local health inspector and Rachel becomes convinced that Danny is trying to seduce her with mind games.",
                  "backup_still_url": "/9hBS598Oi90z7A0CRISPbwJ9JPH.jpg",
                  "air_date": "1998-11-12",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3144,
                  "episode_number": 8,
                  "episode_name": "The One with All the Thanksgivings",
                  "vote_average": 8.6,
                  "vote_count": 41,
                  "overview": "Although the Thanksgiving meal is great, Chandler is still moody over his parent's divorce during the holiday when he was a boy and Ross is depressed about his second divorce. The group reminisces about their worst Thanksgivings in order to cheer them up, and Monica's worst memory is revealed.",
                  "backup_still_url": "/49W5shiaO1VYhHErOt2tJXCqfz0.jpg",
                  "air_date": "1998-11-19",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3145,
                  "episode_number": 9,
                  "episode_name": "The One with Ross's Sandwich",
                  "vote_average": 8.7,
                  "vote_count": 42,
                  "overview": "Joey starts to get uncomfortable with protecting Monica and Chandler's secret, especially when it places him in embarrassing situations with the rest of the group. Meanwhile, Ross becomes enraged at work when someone swipes his turkey sandwich. Phoebe and Rachel enroll in a literature class.",
                  "backup_still_url": "/zcsl24ON4OM0O5Nsy6ZAdF9469c.jpg",
                  "air_date": "1998-12-10",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3146,
                  "episode_number": 10,
                  "episode_name": "The One with the Inappropriate Sister",
                  "vote_average": 8,
                  "vote_count": 42,
                  "overview": "Joey teaches Ross how to be unemployed. Phoebe is working for the Salvation Army during the holidays. Monica is tired of Rachel's obsessing about Danny and asks him to go out with her. Ross convinces Joey to write a play about himself. Phoebe is distressed after finding out that New Yorkers are mean. Rachel meets Danny's sister and is dismayed when the two seem a little too playful. Phoebe vows a return to \"Street Phoebe.\"",
                  "backup_still_url": "/pUeg9m9Nplam46nlchyfGeE9ZWC.jpg",
                  "air_date": "1998-12-17",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3147,
                  "episode_number": 11,
                  "episode_name": "The One with All the Resolutions",
                  "vote_average": 8.8,
                  "vote_count": 42,
                  "overview": "With the New Year, the friends make New Year's resolutions. Ross resolves to try a new thing every day. Chandler resolves to not make fun of his friends for a week. Joey resolves to learn how to play the guitar, with Phoebe as his teacher. Rachel resolves to give up gossiping. Chandler nearly goes insane holding it all in. Ross is stuck in a sticky situation at his date's apartment, in constricting and hot leather pants. Rachel discovers a big secret (Monica and Chandler) that threatens to spoil her resolution.",
                  "backup_still_url": "/842QH0JXJixa6GKeL5AyVbbIhrI.jpg",
                  "air_date": "1999-01-07",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3148,
                  "episode_number": 12,
                  "episode_name": "The One with Chandler's Work Laugh",
                  "vote_average": 8.2,
                  "vote_count": 43,
                  "overview": "Monica begins to hang out with Chandler during his work functions, since they don't have to keep their relationship a secret among his coworkers.  However, she learns that Chandler has a second, more annoying personality when he's around his boss.  Meanwhile, Ross learns that Emily is getting remarried and in his grief hooks up with an old nemesis of the gang: Janice.",
                  "backup_still_url": "/6NlO0o3YwcrC22ODfSJJlMq37r5.jpg",
                  "air_date": "1999-01-21",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3149,
                  "episode_number": 13,
                  "episode_name": "The One with Joey's Bag",
                  "vote_average": 7.9,
                  "vote_count": 41,
                  "overview": "Phoebe's grandmother dies, and Phoebe is shocked when her father turns up at the funeral. Meanwhile, Rachel gives Joey a \"man's bag\" for an audition, and Chandler is scared to tell Monica he doesn't like her massages.",
                  "backup_still_url": "/wKV9NJAG9Dey4dMELVFwQWJGlCv.jpg",
                  "air_date": "1999-02-04",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3150,
                  "episode_number": 14,
                  "episode_name": "The One Where Everybody Finds Out",
                  "vote_average": 9,
                  "vote_count": 52,
                  "overview": "When the friends discover that Ugly Naked Guy is moving out of his apartment, Ross leaps at the opportunity to get his own place again. Phoebe finds out about Monica and Chandler's relationship, and tries to get them to reveal the truth by seducing Chandler.",
                  "backup_still_url": "/widPOemNRxvcAnV5QthXouKyTK.jpg",
                  "air_date": "1999-02-11",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 3151,
                  "episode_number": 15,
                  "episode_name": "The One with the Girl Who Hits Joey",
                  "vote_average": 8.3,
                  "vote_count": 41,
                  "overview": "Joey starts dating Katie, a little girl who packs a mean punch.  When Ross refuses to contribute to the retirement fund of the building's maintenance man, he winds up offending everyone in the building. Meanwhile, Chandler freaks out about his relationship with Monica.",
                  "backup_still_url": "/zrc6ZSrttUlXghs2DNgsFOgGGNo.jpg",
                  "air_date": "1999-02-18",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3152,
                  "episode_number": 16,
                  "episode_name": "The One with the Cop",
                  "vote_average": 8.4,
                  "vote_count": 43,
                  "overview": "Joey has a dream about Monica and becomes convinced he is in love with her. Meanwhile, Phoebe finds a police badge in Central Perk and uses it to go on missions of mercy. And Ross buys a new sofa but has trouble moving it up the stairs into his new apartment.",
                  "backup_still_url": "/qDSmE7EeiiWQkVPMTOi7XqtkLsk.jpg",
                  "air_date": "1999-02-25",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3153,
                  "episode_number": 17,
                  "episode_name": "The One with Rachel's Inadvertent Kiss",
                  "vote_average": 8.3,
                  "vote_count": 41,
                  "overview": "Monica becomes jealous of Phoebe and Gary. Rachel has an awkward encounter when she interviews for a new job. Joey tries to meet a girl living in Ross's building, but has trouble with finding her apartment.",
                  "backup_still_url": "/sPCW94qruOX0aRPuj5Uy8vlJKSJ.jpg",
                  "air_date": "1999-03-18",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3154,
                  "episode_number": 18,
                  "episode_name": "The One Where Rachel Smokes",
                  "vote_average": 7.8,
                  "vote_count": 42,
                  "overview": "Rachel decides to start smoking in order to avoid missing important meetings with her boss. Meanwhile, Ben gets offered an audition for a soup commercial, and Joey auditions to be Ben's father during the ad. Also, Monica and Phoebe plan a surprise birthday party for Rachel together, but Monica takes over.",
                  "backup_still_url": "/zXPDYJa1yWBGLRTDOexq6VJMedL.jpg",
                  "air_date": "1999-04-08",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3155,
                  "episode_number": 19,
                  "episode_name": "The One Where Ross Can't Flirt",
                  "vote_average": 8.6,
                  "vote_count": 41,
                  "overview": "As Joey's Italian-speaking grandmother visits to watch him on TV, Ross has trouble flirting with the pizza delivery girl, and Rachel tries to find an earring of Monica's that she has misplaced.",
                  "backup_still_url": "/nURp3j9Fax9yt2qvhRttzPygkJN.jpg",
                  "air_date": "1999-04-22",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3156,
                  "episode_number": 20,
                  "episode_name": "The One with the Ride Along",
                  "vote_average": 8.3,
                  "vote_count": 38,
                  "overview": "While the guys go on a ride-along with Gary, Rachel accidentally deletes a message from Emily on Ross's answering machine.",
                  "backup_still_url": "/5xBJqfHQI3qUOC9XB5ePZzbYD4L.jpg",
                  "air_date": "1999-04-29",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3157,
                  "episode_number": 21,
                  "episode_name": "The One with the Ball",
                  "vote_average": 8.3,
                  "vote_count": 40,
                  "overview": "Phoebe learns that Gary is going to ask her to move in with him and thinking this is way to fast, she tries to get Chandler to talk him out of this decision. Rachel buys an expensive sphynx cat but is disappointed when it doesn't behave as she hoped it would. Meanwhile, Ross and Joey start throwing a ball while they are bored but it changes from a time-filler to a super-competitive obsession when Monica joins in.",
                  "backup_still_url": "/rgMzbHY39qF0uwPfH14jZNJDypw.jpg",
                  "air_date": "1999-05-06",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3158,
                  "episode_number": 22,
                  "episode_name": "The One with Joey's Big Break",
                  "vote_average": 8.1,
                  "vote_count": 41,
                  "overview": "Joey seems to have finally hit big when he gets offered a lead part in a movie shooting outside of Las Vegas. However, when Chandler begins expressing doubts about the film's legitimacy, it causes a rift in their friendship. Also, Rachel gets an eye infection but is reluctant to seek treatment because of her eye phobia. And Phoebe is mad at Ross, but doesn't know why.",
                  "backup_still_url": "/kAV4BBUpsnlPATryvLZyh9aiH1U.jpg",
                  "air_date": "1999-05-13",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3159,
                  "episode_number": 23,
                  "episode_name": "The One in Vegas",
                  "vote_average": 8.3,
                  "vote_count": 43,
                  "overview": "Chandler decides the only way to mend his friendship with Joey is to fly out to Vegas and visit him. Phoebe is determined not to be left out on another adventure, so everyone winds up going. Trouble is in the water, however, when Chandler finds out that Monica had lunch with Richard. Meanwhile, Ross and Rachel try to embarrass each other after an awkward encounter.\n\nChandler and Monica reconcile and hastily decide to get married. Ross and Rachel get drunk and roam the casino. Phoebe deals with a 'lurker' on the slot machines.",
                  "backup_still_url": "/jB39sjCHdWGoyHOkFdbM9AN1fLK.jpg",
                  "air_date": "1999-05-20",
                  "runtime": 46,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 245,
              "season_number": 6,
              "season_name": "Season 6",
              "vote_average": 8.2,
              "vote_count": null,
              "episode_count": 23,
              "overview": "",
              "backup_poster_url": "/7EU6bV6d8j1Xbc1F8QoNkOZrpsi.jpg",
              "episodes": [
                {
                  "episode_id": 3160,
                  "episode_number": 1,
                  "episode_name": "The One After Vegas",
                  "vote_average": 8.6,
                  "vote_count": 45,
                  "overview": "Ross and Rachel experience the world’s worst hangover when they realize they’ve gotten married.  Chandler and Monica back away from their own altar plans.  Phoebe and Joey head back to New York in the taxi cab.",
                  "backup_still_url": "/2T3D3y98XDM2owdjxcj8PEiQFP8.jpg",
                  "air_date": "1999-09-23",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3161,
                  "episode_number": 2,
                  "episode_name": "The One Where Ross Hugs Rachel",
                  "vote_average": 8.2,
                  "vote_count": 43,
                  "overview": "Monica and Chandler decide to move in together, leading Rachel to believe that all three of them will be roommates, and Monica doesn't want to tell her the truth.  Meanwhile, Ross tries to keep Rachel from learning that their marriage hasn't been annulled.",
                  "backup_still_url": "/d5c8xKhUKsR4afHWc17POaCs444.jpg",
                  "air_date": "1999-09-30",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3162,
                  "episode_number": 3,
                  "episode_name": "The One with Ross's Denial",
                  "vote_average": 8.2,
                  "vote_count": 40,
                  "overview": "Monica and Chandler disagree over how to redecorate Rachel's old room. Joey advertises for a \"non-ugly\" roommate. Ross is unwilling to accept that he still has feelings for Rachel.",
                  "backup_still_url": "/brF8eLr2ml3UaNMmBVZQ615iyBy.jpg",
                  "air_date": "1999-10-07",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3163,
                  "episode_number": 4,
                  "episode_name": "The One Where Joey Loses His Insurance",
                  "vote_average": 8.3,
                  "vote_count": 41,
                  "overview": "Joey's health benefits lapse just as he develops a hernia. Ross is asked to give a lecture at NYU and eager to impress his students, he puts on a fake British accent. Meanwhile, Phoebe gets some bad news from her psychic.",
                  "backup_still_url": "/ohFKAbC5iZtGfzLh9JfylXfhwKr.jpg",
                  "air_date": "1999-10-14",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3164,
                  "episode_number": 5,
                  "episode_name": "The One with Joey's Porsche",
                  "vote_average": 8,
                  "vote_count": 42,
                  "overview": "Ross and Rachel try to get an annulment, but run into some legal obstacles. Joey finds keys to a Porsche in Central Perk and discovers some perks of being a fancy car owner. Meanwhile, Chandler, Monica and Phoebe babysit the triplets.",
                  "backup_still_url": "/itDy7O5nij71D7Z1MZXJjlLB9w0.jpg",
                  "air_date": "1999-10-21",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3165,
                  "episode_number": 6,
                  "episode_name": "The One on the Last Night",
                  "vote_average": 8.2,
                  "vote_count": 40,
                  "overview": "On the last night before Chandler and Monica move in together, Monica and Rachel argue, while Chandler tries to give Joey money to help him pay the upcoming bills.",
                  "backup_still_url": "/rGA8jD6BqXSAVoEGy5bmbZOHqQY.jpg",
                  "air_date": "1999-11-04",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3166,
                  "episode_number": 7,
                  "episode_name": "The One Where Phoebe Runs",
                  "vote_average": 8.2,
                  "vote_count": 43,
                  "overview": "Now roommates Phoebe and Rachel decide to start running together, but Rachel is embarrassed by Phoebe's odd running style. Joey finds a sexy new female roommate and tries very hard not to flirt with her. Meanwhile, Chandler decides to surprise Monica by cleaning the apartment, but forgets where everything goes. Ross tries to help him remedy the situation.",
                  "backup_still_url": "/rGA8jD6BqXSAVoEGy5bmbZOHqQY.jpg",
                  "air_date": "1999-11-11",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3167,
                  "episode_number": 8,
                  "episode_name": "The One with Ross's Teeth",
                  "vote_average": 8.1,
                  "vote_count": 42,
                  "overview": "Ross goes too far while trying to impress a date by over-whitening his teeth. Rachel uses gossip to get her boss to like her after Phoebe supposedly makes out with Ralph Lauren. Meanwhile, Chandler convinces Joey that the changes Janine has introduced to their old apartment is making it too girly.",
                  "backup_still_url": "/937TB5b6bv9OJb4OPfXvVTtweOf.jpg",
                  "air_date": "1999-11-18",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3168,
                  "episode_number": 9,
                  "episode_name": "The One Where Ross Got High",
                  "vote_average": 8.6,
                  "vote_count": 43,
                  "overview": "It's Thanksgiving and Monica's parents are coming to visit, which is a problem because, not only they do not like Chandler, they also don't know that he and Monica are living together. Rachel is tasked with making a Thanksgiving dessert, but she does so with mixed results. Meanwhile, Joey and Ross are eager to finish the dinner and leave, because they want to go to a Thanksgiving party with Janine and her dancer friends.",
                  "backup_still_url": "/cu4c4rxWLPox2VAV2kWvT4MpYvO.jpg",
                  "air_date": "1999-11-25",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3169,
                  "episode_number": 10,
                  "episode_name": "The One with the Routine",
                  "vote_average": 8.2,
                  "vote_count": 43,
                  "overview": "Janine gets an invitation to dance on \"Dick Clark's New Year's Rockin' Eve\" and she invites Joey, Monica and Ross to join her. Being huge fans of the show, Monica and Ross get overly excited. At the taping, Joey tries to kiss Janine at midnight and Monica and Ross resurrect their dance routine from high school. Meanwhile, Rachel, Phoebe and Chandler look for Monica's Christmas presents.",
                  "backup_still_url": "/hGOc4JFywXjpQclb0ZFNN1OgOVj.jpg",
                  "air_date": "1999-12-16",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3170,
                  "episode_number": 11,
                  "episode_name": "The One with the Apothecary Table",
                  "vote_average": 8.1,
                  "vote_count": 43,
                  "overview": "Rachel orders an apothecary table from Pottery Barn, which is a problem because Phoebe hates the mass-producing company. After Janine and Joey double date with Chandler and Monica, Janine tells Joey that she thinks the other two are boring. Ross buys a new apothecary table too, which causes problems for Rachel. After a confrontation with Monica and Chandler, Joey breaks up with Janine and she moves out.",
                  "backup_still_url": "/5W0BPGJbP5sjJWgjLlnQGkXWKYF.jpg",
                  "air_date": "2000-01-06",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3171,
                  "episode_number": 12,
                  "episode_name": "The One with the Joke",
                  "vote_average": 8,
                  "vote_count": 40,
                  "overview": "After a joke gets published in Playboy, Chandler and Ross have an argument about who came up with it first. Meanwhile, a wayward remark of Phoebe's leads to trouble between the girls and a broke Joey starts working at Central Perk.",
                  "backup_still_url": "/zaDAyW9hOFhFjhcYBwvNqIpDCe.jpg",
                  "air_date": "2000-01-13",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3172,
                  "episode_number": 13,
                  "episode_name": "The One with Rachel's Sister (1)",
                  "vote_average": 8.1,
                  "vote_count": 42,
                  "overview": "Joey gets in trouble for giving attractive female customers free food at Central Perk. A sick Monica desperately tries to convince Chandler that she's not sick. After her father cuts her off, Rachel's sister Jill comes to town. Rachel encourages her to start an independent life by finding a job and an apartment, but one thing leads to another and Jill ends up asking Ross out on a date. Even though Rachel doesn't want to admit it, she clearly isn't okay with that...",
                  "backup_still_url": "/lIekB9Iqefj7g2RTUgeOrawGhDV.jpg",
                  "air_date": "2000-02-03",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3173,
                  "episode_number": 14,
                  "episode_name": "The One Where Chandler Can't Cry (2)",
                  "vote_average": 8.1,
                  "vote_count": 42,
                  "overview": "Chandler admits that he hasn't cried since he was a child. Phoebe discovers that Ursula is starring in porno movies using her name. Rachel desperately tries to stop Ross and Jill from starting a relationship.",
                  "backup_still_url": "/v9jXwRkamJyt5ZwoC9eD3c2XHKJ.jpg",
                  "air_date": "2000-02-10",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3174,
                  "episode_number": 15,
                  "episode_name": "The One That Could Have Been",
                  "vote_average": 7.6,
                  "vote_count": 46,
                  "overview": "Barry and Mindy's impending divorce prompts the gang to fantasize about what their lives might be like if they'd all taken different courses. Ross is still married to Carol, and Rachel is married to Barry, but fawning over famous soap star Joey Tribbiani. Monica is still fat and dating a doctor. Chandler is an aspiring writer and Phoebe is a Wall Street shark for Merrill Lynch.\n\nThe gang continue to fantasize about how different their lives could have been. Carol and Ross decide to have a threesome to spice up their marriage. Rachel goes to Joey's but is incredibly nervous about cheating and gets drunk. Meanwhile, Monica's dinner date falls through and Chandler tries to cheer her up but things take an unexpected turn.",
                  "backup_still_url": "/fhUs4A5qAOZZRkHsiBNvhUbzAbd.jpg",
                  "air_date": "2000-02-17",
                  "runtime": 45,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3175,
                  "episode_number": 16,
                  "episode_name": "The One with Unagi",
                  "vote_average": 8.6,
                  "vote_count": 45,
                  "overview": "Joey tries to earn some extra money by entering a medical study, however, there's a slight problem: the study is for identical twins. Rachel and Phoebe take self-defense classes, but Ross attempts to give them a lesson in Unagi instead. Meanwhile, Chandler and Monica agree to give each other homemade presents for Valentine's Day.",
                  "backup_still_url": "/kAf0eTcqL8ehrfWYyKbNSzwiHuv.jpg",
                  "air_date": "2000-02-24",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3176,
                  "episode_number": 17,
                  "episode_name": "The One Where Ross Dates a Student",
                  "vote_average": 8.1,
                  "vote_count": 42,
                  "overview": "At the end of semester Ross gets his student evaluations and one of them writes that he's hot. It turns out to be a cute girl named Elizabeth and even though it could cost him his job, Ross considers dating her. An ex-girlfriend of Chandler's from college is directing the new Al Pacino movie and Joey asks Chandler for help with getting an audition. Meanwhile, after a fire ruins Phoebe and Rachel's apartment, they're forced to find temporary living spaces with Monica and Joey.",
                  "backup_still_url": "/12OVdVusbxyZKN5YFEhuMLkuFQP.jpg",
                  "air_date": "2000-03-09",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3177,
                  "episode_number": 18,
                  "episode_name": "The One with Joey's Fridge",
                  "vote_average": 8.2,
                  "vote_count": 40,
                  "overview": "After Joey's fridge breaks, he tries to cajole his friends into helping him buy a new one. Meanwhile, Ralph Lauren is organizing a charity ball and Rachel looks for a date, however, unexpectedly it turns into a competition between Monica & Chandler against Phoebe for finding the best candidate. Ross continues to date Elizabeth, but he gets nervous when she makes plans for a spring break at Daytona Beach.",
                  "backup_still_url": "/AsK0ljsXaUVPJyMMyEZLIFjhHzR.jpg",
                  "air_date": "2000-03-23",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3178,
                  "episode_number": 19,
                  "episode_name": "The One with Mac and C.H.E.E.S.E.",
                  "vote_average": 7.6,
                  "vote_count": 41,
                  "overview": "Joey gets an audition for the lead character in a new TV show. When the audition is rescheduled, Chandler takes the message but forgets to tell Joey. When Joey misses the audition, he gets upset and the group reminisces about their mishaps in the past.",
                  "backup_still_url": "/l8EycgFaGhknaUnWxkMza4Okj24.jpg",
                  "air_date": "2000-04-13",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3179,
                  "episode_number": 20,
                  "episode_name": "The One Where Ross Meets Elizabeth's Dad",
                  "vote_average": 8.3,
                  "vote_count": 39,
                  "overview": "Ross meets Elizabeth's father for the first time and unfortunately he takes an instant disliking to Ross. However Paul does hit it off with Rachel and she tries to talk Ross up but does so with mixed results. Joey almost gets fired from \"Mac and C.H.E.E.S.E.\" after offending the operator of the robot. Meanwhile, Phoebe writes a book based on Monica and Chandler.",
                  "backup_still_url": "/5t8pBcCf87asXhsO1UYvECTKU1b.jpg",
                  "air_date": "2000-04-27",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3180,
                  "episode_number": 21,
                  "episode_name": "The One Where Paul's the Man",
                  "vote_average": 8.6,
                  "vote_count": 40,
                  "overview": "While visiting an art museum, Monica puts her name on a two-year waiting list to use the museum for a wedding. Accidentally Chandler finds out about this and freaks out. Meanwhile, Paul threatens to have Ross fired from the university if he continues to date Elizabeth, however, that doesn't stop the two of them from going to her dad's mountain cabin over the weekend. Unfortunately for them, Paul has the same idea to bring Rachel there.",
                  "backup_still_url": "/jyzT86Ob4sqWevYel1ZdroL2hSV.jpg",
                  "air_date": "2000-05-04",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3181,
                  "episode_number": 22,
                  "episode_name": "The One with the Ring",
                  "vote_average": 8.4,
                  "vote_count": 39,
                  "overview": "Chandler and Phoebe shop for a ring for Monica. Chandler finds the perfect one, but Phoebe accidentally lets it get away. While Chandler is busy with getting the ring back, Joey and Ross are lead to believe that he's mad at them, so they decide to team up and give him a cold shoulder treatment. Rachel continues to date Paul and wants him to open up to her, however, he opens up a bit too much.",
                  "backup_still_url": "/grpysBMIoetM5LqWxWVZwjQsoT3.jpg",
                  "air_date": "2000-05-11",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3182,
                  "episode_number": 23,
                  "episode_name": "The One with the Proposal",
                  "vote_average": 8.4,
                  "vote_count": 41,
                  "overview": "Chandler plans to propose to Monica at dinner, but his plans go awry when Richard shows up at the same restaurant. Meanwhile, Phoebe and Joey join Rachel at a charity auction only to discover that Joey isn't aware what a silent auction is. And Ross and Elizabeth's relationship comes to a crossroad.\n\nChandler continues to pretend to hate the idea of marriage, unaware that Richard wants Monica back. Meanwhile, Rachel and Phoebe discuss their 'back-up' plans, if they are not married by the time they're 40.",
                  "backup_still_url": "/3OWXfD3koZkh2EbTLk95rSGJcG.jpg",
                  "air_date": "2000-05-18",
                  "runtime": 44,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 246,
              "season_number": 7,
              "season_name": "Season 7",
              "vote_average": 8.2,
              "vote_count": null,
              "episode_count": 23,
              "overview": "",
              "backup_poster_url": "/yvUZVChjOnqCjB9rjdEqEmpDdnQ.jpg",
              "episodes": [
                {
                  "episode_id": 3183,
                  "episode_number": 1,
                  "episode_name": "The One with Monica's Thunder",
                  "vote_average": 8.3,
                  "vote_count": 43,
                  "overview": "The gang celebrate Monica and Chandler's engagement. Phoebe wants to be the musician at the wedding and comes up with a new song, while Joey tries to dress and act like a 19-year-old for an audition. Ross and Rachel briefly reunite and after Monica catches them kissing, she's convinced that Rachel is trying to steal her thunder.",
                  "backup_still_url": "/imDBzYIzNH5iSOarKkq84I5L167.jpg",
                  "air_date": "2000-10-12",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3184,
                  "episode_number": 2,
                  "episode_name": "The One with Rachel's Book",
                  "vote_average": 8.1,
                  "vote_count": 36,
                  "overview": "As Monica starts planning her wedding she's shocked to find out that her parents have spent her entire wedding fund. However, her spirits are restored when she discovers that Chandler has enough savings for her dream wedding scenario. Phoebe temporarily moves into Ross's apartment, bringing her massage clients with her. This leads to some weird encounters for Ross. Meanwhile, Joey mocks Rachel when he finds an erotic novel she is reading.",
                  "backup_still_url": "/yV05qgkIsfjEN33gDsuNMgqPjAT.jpg",
                  "air_date": "2000-10-12",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3185,
                  "episode_number": 3,
                  "episode_name": "The One with Phoebe's Cookies",
                  "vote_average": 8,
                  "vote_count": 41,
                  "overview": "Monica tries to figure out Phoebe's grandmother's secret chocolate chip cookie recipe. Meanwhile, Rachel tries to teach Joey how to sail, and Chandler has an awkward encounter when he tries to bond with Monica's father.",
                  "backup_still_url": "/s2jCzF7wnHJMs0gLrJzgPEbd1Zd.jpg",
                  "air_date": "2000-10-19",
                  "runtime": 21,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3186,
                  "episode_number": 4,
                  "episode_name": "The One with Rachel's Assistant",
                  "vote_average": 7.9,
                  "vote_count": 39,
                  "overview": "While hiring a new assistant, Rachel is torn between hiring a much more qualified woman, or a handsome but inexperienced young man. Monica, Chandler and Ross engage in a war of secret sharing after Monica and Chandler vow to be more honest. Meanwhile, Joey has problems when his TV show is cancelled after just one airing.",
                  "backup_still_url": "/o8pwwXI3buttxvgjBvn1ShmFb89.jpg",
                  "air_date": "2000-10-26",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3187,
                  "episode_number": 5,
                  "episode_name": "The One with the Engagement Picture",
                  "vote_average": 8,
                  "vote_count": 40,
                  "overview": "While taking an engagement picture for himself and Monica, Chandler cannot make anything but a weird face. Meanwhile, Rachel enlists Joey to take Tag out for a night on the town. Also, Phoebe and Ross date a couple in the middle of a divorce.",
                  "backup_still_url": "/9SKIbk7GXFVk7o95eLrNXsTboNl.jpg",
                  "air_date": "2000-11-02",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3188,
                  "episode_number": 6,
                  "episode_name": "The One with the Nap Partners",
                  "vote_average": 8.5,
                  "vote_count": 40,
                  "overview": "Joey and Ross accidentally take a nap together - and much to their dismay, find that they liked it. Phoebe and Rachel compete to become Monica's maid of honor.",
                  "backup_still_url": "/d2DIHHrmqqyaEEzwVF6kXGEFUuQ.jpg",
                  "air_date": "2000-11-09",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3189,
                  "episode_number": 7,
                  "episode_name": "The One with Ross's Library Book",
                  "vote_average": 8.2,
                  "vote_count": 41,
                  "overview": "Rachel and Phoebe befriend a girl Joey's dating and they try to convince him to get more serious with her, however he's reluctant to do so. At least at first. Meanwhile, Ross discovers that his doctoral dissertation is hosted at university's library and is very excited about the fact. Unfortunately, he soon finds out that students aren't exactly reading it, but rather engaging in other 'physical activities' in the paleontology section. Also, Monica runs into Janice and before she knows it, Janice has invited herself to Monica's wedding. Needless to say that neither she nor Chandler aren't exactly ecstatic about it and they both try to find a way to tactfully uninvite her.",
                  "backup_still_url": "/st1Om9JiUPGUNuF2gnYfAspMDNY.jpg",
                  "air_date": "2000-11-16",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3190,
                  "episode_number": 8,
                  "episode_name": "The One Where Chandler Doesn't Like Dogs",
                  "vote_average": 8,
                  "vote_count": 41,
                  "overview": "Ross drives himself insane when he can't name all 50 states in a simple game. Tag joins the gang for Thanksgiving dinner, where Joey accidentally spills the beans about Rachel's crush on him. Phoebe sneaks a dog into the apartment, making Chandler extremely nervous.",
                  "backup_still_url": "/yWoxm88Cqir55r6QMQX5ZT4eLQ1.jpg",
                  "air_date": "2000-11-23",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3191,
                  "episode_number": 9,
                  "episode_name": "The One with All the Candy",
                  "vote_average": 8.1,
                  "vote_count": 38,
                  "overview": "When Phoebe tells the gang about how she was too poor to have a bike as a child, Ross goes out and buys her one. While Phoebe absolutely loves the bike, the gang soon discovers that she doesn't actually know how to ride one. Meanwhile, Monica decides to make candy in order to get to know her neighbours, and while they all love the candy, nobody is particularly interested in Monica herself. Rachel and Tag try to hide their relationship at work, but things go awry when Rachel writes a playful work evaluation of Tag that he accidentally turns in to Human Resources.",
                  "backup_still_url": "/9kX1MNGKOCJl5mn6E02upYEvowd.jpg",
                  "air_date": "2000-12-07",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3192,
                  "episode_number": 10,
                  "episode_name": "The One with the Holiday Armadillo",
                  "vote_average": 8.3,
                  "vote_count": 36,
                  "overview": "Ross's plans to teach Ben about Hanukkah are continually thwarted when the young boy can't get his mind off of Santa. Meanwhile, Phoebe prepares to move back into her refurbished apartment, with or without Rachel. However, she'll stop at nothing to get Rachel to go with her, including buying Joey a drum set. Monica is mystified by Chandler's inability to tip properly.",
                  "backup_still_url": "/rfwc29L9N22vhU1mh7I8QBrXLjX.jpg",
                  "air_date": "2000-12-14",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3193,
                  "episode_number": 11,
                  "episode_name": "The One with All the Cheesecakes",
                  "vote_average": 8.4,
                  "vote_count": 38,
                  "overview": "Phoebe gets upset with Joey when he blows off dinner with her for a date, however only a few days later she finds herself in the same situation but with their roles reversed. Meanwhile, Chandler and Rachel enjoy a cheesecake that gets delivered to their address by accident. They feel guilt-ridden at first, but it's just too delicious. Also, Ross and Monica attend a wedding reception of their cousin and find themselves in an awkward situation.",
                  "backup_still_url": "/1WSZPGVEY78CsWiFBr6LfERuZwT.jpg",
                  "air_date": "2001-01-04",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3194,
                  "episode_number": 12,
                  "episode_name": "The One Where They're Up All Night",
                  "vote_average": 8.3,
                  "vote_count": 39,
                  "overview": "After the gang head up to the roof to see a passing comet, separate events unfold that lead to them all having a sleepless night.",
                  "backup_still_url": "/q1lnv5Nar6WIxbrQo5cV7P8YAeU.jpg",
                  "air_date": "2001-01-11",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3195,
                  "episode_number": 13,
                  "episode_name": "The One Where Rosita Dies",
                  "vote_average": 8.3,
                  "vote_count": 38,
                  "overview": "Rachel accidentally breaks Joey's armchair (that he's named Rosita) and while they're out shopping for a new one, it appears that Rosita has magically \"healed\" herself. Meanwhile, Phoebe takes a temp job as a telemarketer for an office supply company and when her first client turns out to be suicidal, she goes out of her way to talk him out of it. Also, Ross and Monica find out that their parents are selling their childhood home.",
                  "backup_still_url": "/oeur7OVIlBZpNXKl4cgsPFQnVJ7.jpg",
                  "air_date": "2001-02-01",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3196,
                  "episode_number": 14,
                  "episode_name": "The One Where They All Turn Thirty",
                  "vote_average": 8.4,
                  "vote_count": 39,
                  "overview": "When Rachel turns 30, the gang reminisces about their 30th birthdays. Ross buys a sports car to look cool, Monica gets drunk, and Phoebe, while trying to patch things up with Ursula, discovers that she is actually 31.",
                  "backup_still_url": "/eghy8EUnsmH6w6vEMAV2Ug18GXn.jpg",
                  "air_date": "2001-02-08",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3197,
                  "episode_number": 15,
                  "episode_name": "The One with Joey's New Brain",
                  "vote_average": 8,
                  "vote_count": 39,
                  "overview": "Joey's character on Days of Our Lives is awakened from his coma with a brain transplant from one of the show's most legendary characters. Ross practices the bagpipes for Monica and Chandler's wedding. Meanwhile, Phoebe and Rachel fight over a guy who left his cell phone in Central Perk.",
                  "backup_still_url": "/jCJg30mOZFUUjAdig3aeSbXL7VW.jpg",
                  "air_date": "2001-02-15",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3198,
                  "episode_number": 16,
                  "episode_name": "The One with the Truth About London",
                  "vote_average": 8.4,
                  "vote_count": 36,
                  "overview": "Chandler is shocked to find out who Monica really wanted to sleep with the night they first got together in London. Meanwhile, Rachel gets into trouble with Ross when she teaches Ben practical jokes.",
                  "backup_still_url": "/tfsPxEQ5cmpg4pEDAWssR3TW489.jpg",
                  "air_date": "2001-02-22",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3199,
                  "episode_number": 17,
                  "episode_name": "The One with the Cheap Wedding Dress",
                  "vote_average": 8.1,
                  "vote_count": 36,
                  "overview": "Monica regrets telling a woman about a discount bridal shop when they end up fighting over the same dress. Meanwhile, Joey and Ross discover that they're dating the same girl.",
                  "backup_still_url": "/6EdqJXkjEaoN09otW5e0Q3fchIl.jpg",
                  "air_date": "2001-03-15",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3200,
                  "episode_number": 18,
                  "episode_name": "The One with Joey's Award",
                  "vote_average": 8.1,
                  "vote_count": 36,
                  "overview": "Joey is nominated for a Soapie Award for his part on Days of Our Lives, and while he doesn't win, he ends up with an award anyway - together with his partner in crime, Rachel. Meanwhile, Ross finds himself in an awkward position when one of his students proclaims that he failed his midterm because he's in love with Ross. Also, Monica freaks out a little when she realizes that after marrying Chandler she's not gonna experience a rush of dating someone new ever again. In a surprising change of roles, Chandler becomes a voice of reason that calms her.",
                  "backup_still_url": "/7j4ammK2F5K9pmyLh946m1eIhOF.jpg",
                  "air_date": "2001-03-29",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3201,
                  "episode_number": 19,
                  "episode_name": "The One with Ross and Monica's Cousin",
                  "vote_average": 8.4,
                  "vote_count": 35,
                  "overview": "Joey auditions for a big movie role which will require him to appear naked. A problem arises, however, when the part calls for an uncircumcised man. Meanwhile, Rachel and Phoebe go through the trouble of organizing  a last minute bridal shower for Monica. And Ross becomes attracted to his cousin after she visits.",
                  "backup_still_url": "/ikhwogIjntfhWquuOfxdJwg8GHL.jpg",
                  "air_date": "2001-04-19",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3202,
                  "episode_number": 20,
                  "episode_name": "The One with Rachel's Big Kiss",
                  "vote_average": 8,
                  "vote_count": 39,
                  "overview": "At Central Perk Rachel runs into her friend from college, Melissa, and it turns out they share something more than just a friendship. Meanwhile, Monica plans the seating arrangement for the wedding and is taken by surprise when Joey mentions that his parents are coming to the wedding too. Also, Chandler and Ross argue who gets to wear a celebrity tux for the event.",
                  "backup_still_url": "/xh9Wk6wyQDza7mKVc39wGcjGDRb.jpg",
                  "air_date": "2001-04-26",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3203,
                  "episode_number": 21,
                  "episode_name": "The One with the Vows",
                  "vote_average": 7.7,
                  "vote_count": 34,
                  "overview": "Monica and Chandler are getting married in four weeks and have to write their vows, but neither has a clue what to say, so they reflect on their past. In the end, the only real problem is who will be saying the vows first.",
                  "backup_still_url": "/kgLt31d0oEed39CIkw3lsO4EZ9c.jpg",
                  "air_date": "2001-05-03",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3204,
                  "episode_number": 22,
                  "episode_name": "The One with Chandler's Dad",
                  "vote_average": 8.2,
                  "vote_count": 37,
                  "overview": "When Monica's Porsche shows up again, Ross and Rachel hit the freeway together and it turns out to be an adventurous ride. Meanwhile, Chandler and Monica go off to Vegas to find Chandler's estranged father. And back at home, Joey proves his masculinity to Phoebe.",
                  "backup_still_url": "/1ApTQ7uUhUkLI3si7r2iLp3xXt4.jpg",
                  "air_date": "2001-05-10",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3205,
                  "episode_number": 23,
                  "episode_name": "The One with Chandler and Monica's Wedding",
                  "vote_average": 8.7,
                  "vote_count": 35,
                  "overview": "So close to the wedding, Chandler suddenly realizes the overwhelming meaning of getting married and takes off without warning anyone. Meanwhile, Joey acts opposite a famous actor in a movie, but can't bring himself to tell him that he spits when he says his lines. Phoebe and Ross try to find Chandler before the wedding starts, while Rachel tries to hinder Monica, so that she doesn't find out the shocking news. On the day of the wedding Joey encounters a scheduling problem, while Phoebe and Rachel come across a surprising discovery.",
                  "backup_still_url": "/omXc88sdzQHamGPW0GR5zL5McPB.jpg",
                  "air_date": "2001-05-17",
                  "runtime": 44,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 247,
              "season_number": 8,
              "season_name": "Season 8",
              "vote_average": 8.5,
              "vote_count": null,
              "episode_count": 23,
              "overview": "",
              "backup_poster_url": "/eh6PPkrzkXsEksRJDcdtx9lZsqX.jpg",
              "episodes": [
                {
                  "episode_id": 3206,
                  "episode_number": 1,
                  "episode_name": "The One After \"I Do\"",
                  "vote_average": 8.7,
                  "vote_count": 44,
                  "overview": "The excitement of Monica and Chandler's wedding is diminished by the news that someone may be pregnant. Chandler's hopes of not embarrassing Monica on the dance floor are ruined by his slippery new shoes, and Ross' attempts to flirt with an attractive wedding guest.",
                  "backup_still_url": "/zTVPfthOgP1yz9PcOxHRwPMEAUS.jpg",
                  "air_date": "2001-09-27",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3207,
                  "episode_number": 2,
                  "episode_name": "The One with the Red Sweater",
                  "vote_average": 8.9,
                  "vote_count": 38,
                  "overview": "Speculation regarding the father of Rachel's baby leads to a misunderstanding when Joey discovers a red sweater left behind in a one-night stand Rachel had. Meanwhile, Chandler and Ross search for the disposable cameras left behind at the wedding and Monica goes on a present-opening binge.",
                  "backup_still_url": "/Ac5DNKZFRjlemuae22SKqI8geEB.jpg",
                  "air_date": "2001-10-04",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3208,
                  "episode_number": 3,
                  "episode_name": "The One Where Rachel Tells...",
                  "vote_average": 8.7,
                  "vote_count": 35,
                  "overview": "Chandler and Monica prepare to leave for their honeymoon as Rachel prepares to tell Ross that he's the father of her baby. While traveling, Monica and Chandler become jealous of another honeymooning couple who get bumped to first class on the airplane. Meanwhile, Joey and Phoebe scheme to get inside the newlyweds' apartment after discovering that they don't have a key.",
                  "backup_still_url": "/wZeIsy5034XouvErUT9fAI8UIjy.jpg",
                  "air_date": "2001-10-11",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3209,
                  "episode_number": 4,
                  "episode_name": "The One with the Videotape",
                  "vote_average": 9.2,
                  "vote_count": 37,
                  "overview": "Monica and Chandler return from their honeymoon with stories of a couple that they met on the flight back, but soon discover that the couple gave them a wrong number. Meanwhile, Ross and Rachel tell everyone about the night they were together, however, their stories differ as to who made the first move. While Ross emphatically defends his side of the story, he accidentally reveals that he has the encounter on videotape. Unsurprisingly, everyone wants to see it.",
                  "backup_still_url": "/1znECVU4xrWkzs2Khs0YHvTNSTo.jpg",
                  "air_date": "2001-10-18",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 3210,
                  "episode_number": 5,
                  "episode_name": "The One with Rachel's Date",
                  "vote_average": 8.3,
                  "vote_count": 37,
                  "overview": "Phoebe begins dating a guy who works for Monica as a sous-chef, however, they soon find themselves in an awkward position when things don't work out for neither of them. Meanwhile, Ross discovers that a co-worker of Chandler's has been calling him Toby for five years. And Joey sets Rachel up on a date with one of his co-stars, which freaks Ross out when he realizes that this guy might become a step-father of his and Rachel's baby.",
                  "backup_still_url": "/hn9Wxur1Y4s8esWI8w8VrNbSbz8.jpg",
                  "air_date": "2001-10-25",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3211,
                  "episode_number": 6,
                  "episode_name": "The One with the Halloween Party",
                  "vote_average": 8.6,
                  "vote_count": 33,
                  "overview": "Monica and Chandler decide to throw a costumed Halloween party. Meanwhile, Phoebe runs into Ursula, who's preparing to get married soon, and as a courtesy invites her and her fiancé to the party. When they finally meet, Phoebe takes an instant liking to him, but soon she discovers that he knows nothing about the \"real\" Ursula.",
                  "backup_still_url": "/etHUWVLhXpPHCbzH4uNNetEQkUq.jpg",
                  "air_date": "2001-11-01",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3212,
                  "episode_number": 7,
                  "episode_name": "The One with the Stain",
                  "vote_average": 8.2,
                  "vote_count": 34,
                  "overview": "Chandler hires a maid, whom Monica suspects is stealing her clothing. Eric has broken up with Ursula and is ready to date Phoebe, except for one problem: he can't look at her without seeing Ursula. Meanwhile, Ross tries to get Rachel an apartment in his building, but the woman living there isn't in a hurry to die, and Joey wants Rachel to stay with him.",
                  "backup_still_url": "/busMxkMHJCt5hyd4LRMH9Teg5KZ.jpg",
                  "air_date": "2001-11-08",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3213,
                  "episode_number": 8,
                  "episode_name": "The One with the Stripper",
                  "vote_average": 8.6,
                  "vote_count": 34,
                  "overview": "Chandler finds out that Monica had a bachelorette party with a stripper, even though they promised not to have bachelor/bachelorette parties. Monica feels bad about it, so she organizes a bachelor party including a stripper for Chandler, however, the only one excited about it seems to be Joey. Meanwhile, Rachel prepares to have dinner with her dad and tell him that she's pregnant and it doesn't go particularly well for either of the involved parties.",
                  "backup_still_url": "/ol7aXhn4TCZmwbud9g72uR8WGFc.jpg",
                  "air_date": "2001-11-15",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3214,
                  "episode_number": 9,
                  "episode_name": "The One with the Rumor",
                  "vote_average": 8.8,
                  "vote_count": 38,
                  "overview": "Monica invites Will, an old high school friend of her and Ross over for a Thanksgiving dinner, unaware that he isn't too fond of Rachel. Meanwhile, Joey vows to eat an entire turkey by himself, and Chandler and Phoebe pretend to watch a football game in order to avoid helping in the kitchen.",
                  "backup_still_url": "/nhQ7irmtvCdMqGbfmN21Vf0FI4H.jpg",
                  "air_date": "2001-11-22",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3215,
                  "episode_number": 10,
                  "episode_name": "The One with Monica's Boots",
                  "vote_average": 8.2,
                  "vote_count": 33,
                  "overview": "Chandler is peeved when Monica splurges on an expensive pair of boots. Meanwhile, Phoebe learns that Ben and Sting's son attend the same school and she angles to meet the celebrity and get concert tickets. Also, after Joey's sister Dina tells him that she's pregnant, he freaks out and goes to find the father to marry them. Rachel tries to calm him down.",
                  "backup_still_url": "/qRRYtxCn7nrS2Y6rHwg2vpnSt68.jpg",
                  "air_date": "2001-12-06",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3216,
                  "episode_number": 11,
                  "episode_name": "The One with Ross's Step Forward",
                  "vote_average": 8.3,
                  "vote_count": 33,
                  "overview": "Ross starts to panic when Mona suggests that the two of them could send out a holiday card together, thinking that their relationship is starting to move too fast. Chandler's newly divorced boss tries to get Monica and Chandler to go out to a dinner with him, but Monica can't stand him, so Chandler steps up to cover for her. Meanwhile, Rachel's hormones start acting up due to her pregnancy, causing her to hit on almost every guy she meets.",
                  "backup_still_url": "/s7JMRcbWK211dg4GUABjZWOjykB.jpg",
                  "air_date": "2001-12-13",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3217,
                  "episode_number": 12,
                  "episode_name": "The One Where Joey Dates Rachel",
                  "vote_average": 8.6,
                  "vote_count": 35,
                  "overview": "Phoebe gets Monica and Chandler a Ms. Pacman arcade game for a wedding present, which leads to some heavy competition between Monica, Phoebe, and, surprisingly, Chandler. Ross gets to teach an advanced class because of a retiring professor, but soon learns that its on the other side of town, and he doesn't have enough time to get there. Meanwhile, Joey takes Rachel to dinner on a pretend date and they have a great time together, however, at the end of the night things take an unexpected turn.",
                  "backup_still_url": "/kagedGmNAj0de2q2ej1CQVyAlsk.jpg",
                  "air_date": "2002-01-10",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3218,
                  "episode_number": 13,
                  "episode_name": "The One Where Chandler Takes a Bath",
                  "vote_average": 8.6,
                  "vote_count": 34,
                  "overview": "Monica turns Chandler on to the concept of taking a bath to relax, complete with scented oils and candles. Ross and Rachel toss baby names back and forth while deciding whether to learn the baby's sex. Meanwhile, Joey struggles with his feelings for Rachel.",
                  "backup_still_url": "/bcmxlN6YdOIScblA4c3qmq2gsx8.jpg",
                  "air_date": "2002-01-17",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3219,
                  "episode_number": 14,
                  "episode_name": "The One with the Secret Closet",
                  "vote_average": 8.5,
                  "vote_count": 33,
                  "overview": "Chandler's very curious about a locked closet by the bathroom in their apartment, but Monica won't tell him what is inside. After Phoebe convinces Monica to get a massage from her, she soon finds out that Monica makes sexual noises during the process, which makes Phoebe very uncomfortable. Meanwhile, Rachel feels her baby kick for the first time and Ross is upset when he can't be more involved in Rachel's pregnancy issues.",
                  "backup_still_url": "/pIZ4ZbdqiUW0X7iGDbC1eTBwSms.jpg",
                  "air_date": "2002-01-31",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3220,
                  "episode_number": 15,
                  "episode_name": "The One with the Birthing Video",
                  "vote_average": 8.5,
                  "vote_count": 34,
                  "overview": "During Valentine's Day, Chandler and Monica discover the miracle of birth by watching an extremely graphic video. Ross hides the fact that Rachel is now living with him from Mona, which only gets him into more trouble. Meanwhile, Phoebe tries to help with Joey's depression caused by his feelings for Rachel by lending him the world's happiest dog.",
                  "backup_still_url": "/dRwuancw8f7wJr5t3bkct4X5E5P.jpg",
                  "air_date": "2002-02-07",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3221,
                  "episode_number": 16,
                  "episode_name": "The One Where Joey Tells Rachel",
                  "vote_average": 8.4,
                  "vote_count": 34,
                  "overview": "After Joey reveals to Ross that he's in love with Rachel, Ross has a hard time accepting this revelation. However, after giving it some thought, he convinces Joey to tell Rachel how he feels. So he does exactly that by taking Rachel out to dinner, however, her reaction to the news isn't quite what he expected. Meanwhile, Phoebe claims that she has met Monica's soulmate which makes Chandler really anxious.",
                  "backup_still_url": "/4t7nMNohxhwKBUuDI1v93Y9ekWF.jpg",
                  "air_date": "2002-02-28",
                  "runtime": 21,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3222,
                  "episode_number": 17,
                  "episode_name": "The One with the Tea Leaves",
                  "vote_average": 8.3,
                  "vote_count": 35,
                  "overview": "At Central Perk Phoebe does a reading of tea leaves which tell her that she's soon going to meet a man of her dreams. In fact, she does meet a man she keeps constantly bumping into, however, he turns out to be a bit creepy to say the least. Meanwhile, after their conversation, things between Joey and Rachel are still weird and Joey keeps finding excuses to avoid her. As a result Rachel comes up with a rather crazy problem at work to draw him into a conversation. She doesn't realize though, how far he's willing to go to help with her fake problem after their conversation is over. Also, Ross tries to retrieve his favorite shirt from Mona's, interrupted when she returns home with a date.",
                  "backup_still_url": "/aZB8MEwEBktPcL2nr8dqyl1bi0x.jpg",
                  "air_date": "2002-03-07",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3223,
                  "episode_number": 18,
                  "episode_name": "The One in Massapequa",
                  "vote_average": 8.2,
                  "vote_count": 35,
                  "overview": "Everybody prepares to go out to Long Island for the elder Gellers' 35th wedding anniversary party. Monica struggles to prepare the perfect toast that would make everybody cry. Meanwhile, Ross and Rachel discover that his parents have told people they're married and they decide to just go along with it for the night. However, Rachel gets carried away a little telling stories about their \"wedding\" that didn't happen. Also, Phoebe invites her new boyfriend, Parker, who is extremely enthusiastic.",
                  "backup_still_url": "/6KO8iJzaNQBbQxYzoJtV1W06T4S.jpg",
                  "air_date": "2002-03-28",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3224,
                  "episode_number": 19,
                  "episode_name": "The One with Joey's Interview",
                  "vote_average": 7.8,
                  "vote_count": 33,
                  "overview": "Joey prepares for an interview with Soap Opera Digest, although he's afraid of saying something stupid and getting himself into trouble, so he enlists his friends to make sure things go well. During the interview, he reminisces about his past acting experiences, his friends and his romantic life.",
                  "backup_still_url": "/yIw1XSopqnujd78Tgm24I2Pzq61.jpg",
                  "air_date": "2002-04-04",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3225,
                  "episode_number": 20,
                  "episode_name": "The One with the Baby Shower",
                  "vote_average": 8.3,
                  "vote_count": 35,
                  "overview": "Monica and Phoebe throw Rachel a baby shower but forget to invite Rachel's mom. During the baby shower Rachel panics when she realizes she has no idea how to look after the baby after the birth. Meanwhile, Joey auditions for a job as a host for a new game show called \"Bamboozled\", and Chandler and Ross help him practice.",
                  "backup_still_url": "/qQIq9ALRWu2WB2WDMVz7lWNTnQd.jpg",
                  "air_date": "2002-04-25",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3226,
                  "episode_number": 21,
                  "episode_name": "The One with the Cooking Class",
                  "vote_average": 8.2,
                  "vote_count": 35,
                  "overview": "Monica's restaurant gets a bad review in the Post. After confronting the critic who wrote it, she decides to join a cooking class, with Joey in tow. Meanwhile, Rachel gets jealous when Ross hits it off with a woman at the baby department store. And Chandler prepares for a job interview after Phoebe tells him that he makes a bad first impression.",
                  "backup_still_url": "/paUWeSKy1BRnh7a1D4hUi8SQnJh.jpg",
                  "air_date": "2002-05-02",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3227,
                  "episode_number": 22,
                  "episode_name": "The One Where Rachel Is Late",
                  "vote_average": 8.5,
                  "vote_count": 33,
                  "overview": "Monica and Phoebe bet on when Rachel's baby will be born as the due date comes and goes as Rachel becomes extremely irritable. Meanwhile, Joey invites Chandler to his big movie premiere and he manages to fall asleep during it. Also, Ross attempts to help Rachel speed things along by trying every possible method suggested by the doctor, except one.",
                  "backup_still_url": "/mtyhJQESigpYObHoJDdfTIjnt8g.jpg",
                  "air_date": "2002-05-09",
                  "runtime": 22,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3228,
                  "episode_number": 23,
                  "episode_name": "The One Where Rachel Has a Baby",
                  "vote_average": 8.8,
                  "vote_count": 33,
                  "overview": "Ross and Rachel go to the hospital to have their baby, but it's a long labor. They get stuck in a semi-private room, and many other couples come and go before Rachel is ready to deliver - the last couple being Janice and her new husband. Meanwhile, Chandler and Monica decide to start trying to have a baby, but can't find an empty hospital room where they wouldn't be disturbed. Also, Phoebe meets a handsome stranger and \"recruits\" Dr. Drake Ramoray to gather some personal information about him.\n\nAfter Rachel gives birth to her little baby girl, she must confront relationship issues around her. So does Ross, who gets an engagement ring from his mother, while she urges him to propose to Rachel. The things, however, take an interesting turn.",
                  "backup_still_url": "/rk7CtLH2RXUK5LBdr6Mg1YZxn3j.jpg",
                  "air_date": "2002-05-16",
                  "runtime": 44,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 248,
              "season_number": 9,
              "season_name": "Season 9",
              "vote_average": 8.3,
              "vote_count": null,
              "episode_count": 23,
              "overview": "",
              "backup_poster_url": "/1IvIdN4I5jJ0bwC3BkmDCy4pQ9j.jpg",
              "episodes": [
                {
                  "episode_id": 3229,
                  "episode_number": 1,
                  "episode_name": "The One Where No One Proposes",
                  "vote_average": 8.8,
                  "vote_count": 37,
                  "overview": "Following Rachel's acceptance of Joey's accidental proposal, confusion reigns as Rachel wonders whether it was the right thing to do and Phoebe can't seem to mind her own business. Finally, Rachel, Ross and Joey get together and figure out that no one was actually going to propose. Meanwhile, Mr. Geller walks in on Monica and Chandler having sex in a closet.",
                  "backup_still_url": "/dNqS2szoMmfgfFttsVZTggXjttz.jpg",
                  "air_date": "2002-09-26",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3230,
                  "episode_number": 2,
                  "episode_name": "The One Where Emma Cries",
                  "vote_average": 8.7,
                  "vote_count": 33,
                  "overview": "Chandler, having trouble getting enough sleep at home, falls asleep in a meeting and accidentally agrees to run his company's Tulsa office. Emma won't stop crying after Rachel interrupts her nap; Monica and Phoebe try to help get her back to sleep. Meanwhile, Ross is still mad at Joey, and breaks his finger trying to punch him.",
                  "backup_still_url": "/1WMGVmrp5ZOiLjMTCcx8J7Ws18g.jpg",
                  "air_date": "2002-10-03",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3231,
                  "episode_number": 3,
                  "episode_name": "The One with the Pediatrician",
                  "vote_average": 8.3,
                  "vote_count": 32,
                  "overview": "Rachel's pediatrician drops her as a client because she calls him incessantly to ask about any insignificant issue concerning Emma, so now she must find a new one, which puts Ross in an awkward situation. Meanwhile, Joey arranges a blind date for Phoebe. Also, as Chandler and Monica are preparing to leave for Tulsa, Monica receives a job offer from a prestige restaurant in Manhattan.",
                  "backup_still_url": "/svtWGUDz560o96lHLSIo0PN8zxS.jpg",
                  "air_date": "2002-10-10",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3232,
                  "episode_number": 4,
                  "episode_name": "The One with the Sharks",
                  "vote_average": 8.5,
                  "vote_count": 32,
                  "overview": "After Phoebe has a talk with Ross, it prompts her to realize that she's never had a long term relationship. Monica makes a startling discovery while visiting Chandler in Tulsa. Also, Joey goes on a date with an attractive woman and discovers that her apartment seems really familiar, although he doesn't remember sleeping with her before.",
                  "backup_still_url": "/nlogeZvRNX0kkN80hhoPAMjMoZT.jpg",
                  "air_date": "2002-10-17",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3233,
                  "episode_number": 5,
                  "episode_name": "The One with Phoebe's Birthday Dinner",
                  "vote_average": 8,
                  "vote_count": 35,
                  "overview": "The friends are looking forward to getting together and celebrating Phoebe's birthday. However, on the day of the party, Ross struggles to convince Rachel to leave Emma with Mrs. Geller babysitting, and Monica and Chandler get into an argument, after Monica discovers that he's been smoking. All of this causes them to be incredibly late, leaving Phoebe and Joey alone at a restaurant with a table for six.",
                  "backup_still_url": "/iAN1Ws0X6seDBw9sSq5IeTThXSh.jpg",
                  "air_date": "2002-10-31",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3234,
                  "episode_number": 6,
                  "episode_name": "The One with the Male Nanny",
                  "vote_average": 8.3,
                  "vote_count": 35,
                  "overview": "Ross and Rachel hire a nanny for Emma named Sandy and things seem to be going great. However, Ross is uncomfortable having a male nanny. Meanwhile, Chandler becomes upset when Monica says that somebody from her new job is the funniest guy she's ever met. Also, after Phoebe and Mike  decide to take their relationship to a new level and exchange apartment keys, Phoebe gets a surprise visit from her ex-boyfriend David.",
                  "backup_still_url": "/95NzE8ACrk96PtNCM88k1o98wuj.jpg",
                  "air_date": "2002-11-07",
                  "runtime": 32,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3235,
                  "episode_number": 7,
                  "episode_name": "The One with Ross's Inappropriate Song",
                  "vote_average": 8.6,
                  "vote_count": 31,
                  "overview": "Ross finds a way to make Emma laugh - singing Sir Mix-A-Lot's \"Baby Got Back.\" Needless to say, Rachel isn't as amused, once she finds out. Meanwhile, Phoebe meets Mike's parents and tries her best to leave a good impression. Also, while viewing Richard's old apartment, Joey and Chandler discover a video tape with Monica's name on it, which causes Chandler to freak out, since he thinks it's a sex tape.",
                  "backup_still_url": "/pBnUEJawXmeYZyY32jxvcepvfFY.jpg",
                  "air_date": "2002-11-14",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3236,
                  "episode_number": 8,
                  "episode_name": "The One with Rachel's Other Sister",
                  "vote_average": 8.5,
                  "vote_count": 35,
                  "overview": "Rachel's sister Amy tags along for Thanksgiving at Monica's place, because her (married) boyfriend cancels their plans. While watching the parade, Joey realizes that he forgot to show up for the Days of Our Lives cast float, and he asks Phoebe's help to come up with a believable lie. The dinner goes fairly well, however, Monica constantly obsesses about anybody damaging her best china. To make matters worse, Amy comes up with a crazy scenario involving Emma, which sparks a massive argument among the gang.",
                  "backup_still_url": "/1ZbrGwsRcMYTJ5eMedOyz16obgO.jpg",
                  "air_date": "2002-11-21",
                  "runtime": 25,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3237,
                  "episode_number": 9,
                  "episode_name": "The One with Rachel's Phone Number",
                  "vote_average": 8.3,
                  "vote_count": 32,
                  "overview": "Joey becomes convinced that Monica is having an affair, after Chandler sneaks back into town without him knowing, in order to have some alone time with his wife. Meanwhile, Rachel and Phoebe have a girls night out, and Rachel gives her phone number to a guy they meet at a bar. Also, Ross and Mike try to hang out together but it doesn't go very well, since they can't find a common interest to talk about.",
                  "backup_still_url": "/9fLrbwWlk71ijfQNQd7ZGIkokgM.jpg",
                  "air_date": "2002-12-05",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3238,
                  "episode_number": 10,
                  "episode_name": "The One with Christmas in Tulsa",
                  "vote_average": 7.9,
                  "vote_count": 33,
                  "overview": "Everyone in the gang gets a little upset when Chandler announces that he'll be spending Christmas and New Year's Eve in Tulsa because of work. To make matters worse, Monica gets quite jealous when she finds out that one of Chandler's co-workers is a former Miss Oklahoma runner-up. After doing some retrospection, Chandler decides to quit his job.",
                  "backup_still_url": "/dg0JY99c3DOKkt9VuBUQ1rYwctA.jpg",
                  "air_date": "2002-12-12",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3239,
                  "episode_number": 11,
                  "episode_name": "The One Where Rachel Goes Back to Work",
                  "vote_average": 8.2,
                  "vote_count": 33,
                  "overview": "Chandler starts looking for a job and is anxious about having a baby with Monica while uncertain about his career prospects. Meanwhile, Rachel visits work and finds out that during her leave, a guy named Gavin has been temporarily assigned to take care of her job. She starts to feel insecure about her job position and decides to come back from her leave early. Also, Phoebe works as an extra on Joey's TV show and brings even more drama to the set.",
                  "backup_still_url": "/zpY4Re3IqvYrPG75AlTrRQAvYNW.jpg",
                  "air_date": "2003-01-09",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3240,
                  "episode_number": 12,
                  "episode_name": "The One with Phoebe's Rats",
                  "vote_average": 7.9,
                  "vote_count": 38,
                  "overview": "Gavin gives Rachel a very interesting birthday gift while Ross begs Joey to stay away from Emma's hot new nanny. Meanwhile, Mike meets and then accidentally murders Phoebe's unusual pet.",
                  "backup_still_url": "/lTlqu2AsioTFRDiok3oVV0OFTGl.jpg",
                  "air_date": "2003-01-16",
                  "runtime": 24,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 3241,
                  "episode_number": 13,
                  "episode_name": "The One Where Monica Sings",
                  "vote_average": 8,
                  "vote_count": 39,
                  "overview": "A night at Mike's piano bar gives Monica a very showy moment in the spotlight. Ross struggles to move on after witnessing Gavin and Rachel kiss. Meanwhile, Chandler employs his secret skill to repair Joey's botched eyebrow-waxing job.",
                  "backup_still_url": "/upFUL4W5piQPWrHRwykCHNnlQe3.jpg",
                  "air_date": "2003-01-30",
                  "runtime": 31,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3242,
                  "episode_number": 14,
                  "episode_name": "The One with the Blind Dates",
                  "vote_average": 8.3,
                  "vote_count": 35,
                  "overview": "Phoebe and Joey purposely set Ross and Rachel up on bad dates in the hopes they'll get back together. Meanwhile, Monica and Chandler babysit Emma, and aren't being as responsible as they should be.",
                  "backup_still_url": "/FRftNRoz7VDKiWMBNfv0uxbMXh.jpg",
                  "air_date": "2003-02-06",
                  "runtime": 24,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3243,
                  "episode_number": 15,
                  "episode_name": "The One with the Mugging",
                  "vote_average": 8.5,
                  "vote_count": 31,
                  "overview": "Joey endures a draining audition at the hands of a pompous actor-director. Ross and Phoebe discover a secret link after being mugged together on the street. Chandler's advertising internship gets off to an impressive start.",
                  "backup_still_url": "/nBEazpZAqKuTMliM1ydfTq2QGWc.jpg",
                  "air_date": "2003-02-13",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3244,
                  "episode_number": 16,
                  "episode_name": "The One with the Boob Job",
                  "vote_average": 8.4,
                  "vote_count": 34,
                  "overview": "While reviewing their monthly expenses, Monica and Chandler discover that their situation is less than stellar. This results in Monica asking Joey to lend her some money without telling Chandler. When Chandler eventually finds out, Joey comes up with a lie that Monica needs the money for breast enhancement procedure. Meanwhile, Phoebe gets really excited as she and Mike decide to move in together, but her excitement quickly dissipates once she discovers that Mike doesn't see himself getting married ever again. Also, Rachel's attempt to baby-proof the apartment tampers with a frustrated Joey's sanity.",
                  "backup_still_url": "/4xNYEIa6uVBNSeplys4pAjT195U.jpg",
                  "air_date": "2003-02-20",
                  "runtime": 24,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3245,
                  "episode_number": 17,
                  "episode_name": "The One with the Memorial Service",
                  "vote_average": 8.4,
                  "vote_count": 31,
                  "overview": "Chandler's jokey entry on his and Ross's college website leads to a faux burial service for the allegedly dead and obviously unpopular Gellar. Meanwhile, Joey is unwilling to give his favorite stuffed animal, Hugsy, to Emma. And Phoebe asks Monica to help her avoid a post-breakup tryst with Mike.",
                  "backup_still_url": "/z0Lu8f06CXqIB1KHqFNdU41zcco.jpg",
                  "air_date": "2003-03-13",
                  "runtime": 24,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3246,
                  "episode_number": 18,
                  "episode_name": "The One with the Lottery",
                  "vote_average": 8.6,
                  "vote_count": 32,
                  "overview": "Monica leads the gang, except for a scoffing Ross, to purchase a bunch of lottery tickets for the multi-million-dollar powerball jackpot. However, as they gleefully plot about how they will spend the fortune if they win, they start bickering among themselves until Phoebe takes matters into her own hands. Meanwhile, Chandler frets as he waits for a phone call about a hiring job position and Rachel thinks baby Emma is close to saying her first words.",
                  "backup_still_url": "/toJZ7LoCvdJRjLFLKmtDav3gBhi.jpg",
                  "air_date": "2003-04-03",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3247,
                  "episode_number": 19,
                  "episode_name": "The One with Rachel's Dream",
                  "vote_average": 8.2,
                  "vote_count": 34,
                  "overview": "After visiting the set of \"Days of Our Lives\", Rachel catches herself dreaming about a romantic encounter with Joey. Meanwhile, Chandler buys a non-refundable weekend getaway for himself and Monica, but when she can't get time off at work, Ross joins him. Also, Phoebe takes advantage of Monica's restaurant clientele.",
                  "backup_still_url": "/862ijAk0BbamUuYNbPAR1vr60ov.jpg",
                  "air_date": "2003-04-17",
                  "runtime": 25,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3248,
                  "episode_number": 20,
                  "episode_name": "The One with the Soap Opera Party",
                  "vote_average": 8.1,
                  "vote_count": 34,
                  "overview": "Joey secretly throws a party on the roof of his building for the \"Days of Our Lives\" cast and he reluctantly invites the rest of the gang, once they discover his plans. Meanwhile, Ross meets a new colleague, Charlie, and is instantly attracted to her, however, he feels intimidated once he learns about her accomplished ex-boyfriends. Also, everyone forgets to tell Chandler about the change of plans and he gets stuck at a theater play by himself.",
                  "backup_still_url": "/4wH9b3svJ1m2kZGc7rNCqfkvvCJ.jpg",
                  "air_date": "2003-04-24",
                  "runtime": 24,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3249,
                  "episode_number": 21,
                  "episode_name": "The One with the Fertility Test",
                  "vote_average": 8.4,
                  "vote_count": 32,
                  "overview": "Joey comes to Ross for advice on dating Charlie, since they don't share much of the same interests. Meanwhile, Chandler and Monica bump into Janice at a fertility clinic. Also, Rachel has a gift certificate for a massage at a fancy massage place which Phoebe doesn't want her to use, since she doesn't approve of big corporations.",
                  "backup_still_url": "/o7VpwLq0wtQLHEl0a05BNq4TWEb.jpg",
                  "air_date": "2003-05-01",
                  "runtime": 28,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3250,
                  "episode_number": 22,
                  "episode_name": "The One with the Donor",
                  "vote_average": 8.3,
                  "vote_count": 31,
                  "overview": "Rachel and Phoebe take Joey's girlfriend Charlie shopping, where she overhears the two of them gossiping about Joey. Meanwhile, Ross gives a presentation to a fellow professor in the hopes of getting the role of keynote speaker at the paleontology convention in Barbados. Also, Monica and Chandler consider alternate pregnancy options making some people really uncomfortable in the process.",
                  "backup_still_url": "/8Wne3Hui6xRR9pmbYr4cjxpvWIU.jpg",
                  "air_date": "2003-05-08",
                  "runtime": 25,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3251,
                  "episode_number": 23,
                  "episode_name": "The One in Barbados",
                  "vote_average": 8.8,
                  "vote_count": 30,
                  "overview": "The gang heads down to Barbados for the paleontology conference. While Ross and Charlie are excited about attending multiple seminars, the rest of the gang just want to enjoy their time on the beach but the rainy weather prevents them from doing so. Things, however, are far from boring - Phoebe discovers that she still has feelings for Mike even though she enjoys spending time with David, Rachel feels lonely and struggles to keep her feelings about Joey to herself, and Chandler is amused by Monica's hair.",
                  "backup_still_url": "/bNPVvR7WmxgxRddVxOA3xdxVOKj.jpg",
                  "air_date": "2003-05-15",
                  "runtime": 51,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 249,
              "season_number": 10,
              "season_name": "Season 10",
              "vote_average": 8.6,
              "vote_count": null,
              "episode_count": 17,
              "overview": "",
              "backup_poster_url": "/67ETB6XIqYc5vZkyAjN8XINOX5i.jpg",
              "episodes": [
                {
                  "episode_id": 3252,
                  "episode_number": 1,
                  "episode_name": "The One After Joey and Rachel Kiss",
                  "vote_average": 8.7,
                  "vote_count": 38,
                  "overview": "After leaving Barbados, Joey and Ross both attempt to come clean to each other that they're dating Rachel and Charlie, however, various obstacles constantly get in their way. Meanwhile, Monica gets a new haircut much to Chandler's dismay and Phoebe finds out that Mike has another girlfriend.",
                  "backup_still_url": "/eo4ySedQXdpKoB2cRshDA9UEbLO.jpg",
                  "air_date": "2003-09-25",
                  "runtime": 30,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3253,
                  "episode_number": 2,
                  "episode_name": "The One Where Ross Is Fine",
                  "vote_average": 8.4,
                  "vote_count": 35,
                  "overview": "After Ross finds out about Joey and Rachel's relationship, he invites Rachel, Joey and Charlie to a dinner party at his apartment, which ends up being really uncomfortable for everyone involved. Meanwhile, Monica and Chandler are overwhelmed by various adoption options and Phoebe suggests talking to a couple that has gone through the process. Unfortunately things go sideways when Chandler can't keep his big mouth shut. Also, Phoebe is visited by her brother, Frank Jr., who is desperate because he can no longer cope with his precocious triplets.",
                  "backup_still_url": "/2K1zPklVTR9Z2l47iJFuvRzGjOx.jpg",
                  "air_date": "2003-10-02",
                  "runtime": 24,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3254,
                  "episode_number": 3,
                  "episode_name": "The One with Ross's Tan",
                  "vote_average": 8.5,
                  "vote_count": 34,
                  "overview": "Ross goes to a spray-on tanning salon but fails to follow the 'simple' instructions. Meanwhile, Joey and Rachel struggle to make the transition from friends to lovers. Also, Monica and Phoebe try to avoid an annoying woman that used to live in their building.",
                  "backup_still_url": "/u2NYOpUX2ZE1KFkBr2h5mrYiN1P.jpg",
                  "air_date": "2003-10-09",
                  "runtime": 25,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3255,
                  "episode_number": 4,
                  "episode_name": "The One with the Cake",
                  "vote_average": 8.2,
                  "vote_count": 32,
                  "overview": "On Emma's first birthday, Ross and Rachel convince everyone to delay their plans so they can attend her party, however plans go awry when Emma's birthday cake is revealed.",
                  "backup_still_url": "/fY5jQGe5Z6yyV66ElDGwDcNZGMQ.jpg",
                  "air_date": "2003-10-23",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3256,
                  "episode_number": 5,
                  "episode_name": "The One Where Rachel's Sister Babysits",
                  "vote_average": 8.5,
                  "vote_count": 34,
                  "overview": "To help her younger sister, Amy, become a more responsible person, Rachel overrides Ross' strong protests and allows Amy to baby-sit Emma but soon regrets that decision. Meanwhile, Joey volunteers to write a recommendation letter for Monica and Chandler's adoption agency, however, he's concerned about not sounding smart. Also, Phoebe unknowingly thwarts Mike's \"anniversary\" surprise for her.",
                  "backup_still_url": "/rCmLkDHifFFkoFnZ9j7h4Vrxnaf.jpg",
                  "air_date": "2003-10-30",
                  "runtime": 29,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3257,
                  "episode_number": 6,
                  "episode_name": "The One with Ross's Grant",
                  "vote_average": 8.5,
                  "vote_count": 32,
                  "overview": "Ross has a chance to be selected by Dr. Benjamin Hobart for an esteemed paleontology grant. Unfortunately, Hobart happens to be Charlie's obsessed ex-boyfriend. Meanwhile, Phoebe tries to give a hideous painting she created to an extremely reluctant Monica and Rachel. Also, Joey is offended when Chandler lies about viewing Joey's bizarre audition tape reel.",
                  "backup_still_url": "/kEsHJvPzYy5ajdY3Rkct2Z5QrZ6.jpg",
                  "air_date": "2003-11-06",
                  "runtime": 25,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3258,
                  "episode_number": 7,
                  "episode_name": "The One with the Home Study",
                  "vote_average": 8.3,
                  "vote_count": 32,
                  "overview": "Monica and Chandler nervously prepare for a visit from an adoption worker who will decide if they would be suitable parents. Meanwhile, Phoebe and Mike keep changing their minds about donating their wedding money to a children's charity. And Ross tries to help Rachel overcome her fear of swing sets so that baby Emma can enjoy the playground.",
                  "backup_still_url": "/mCnDBgrjzDPIBPMSlo1TdMk28C6.jpg",
                  "air_date": "2003-11-13",
                  "runtime": 24,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3259,
                  "episode_number": 8,
                  "episode_name": "The One with the Late Thanksgiving",
                  "vote_average": 8.8,
                  "vote_count": 36,
                  "overview": "Joey, Ross, Rachel and Phoebe convince Monica and Chandler to host a Thanksgiving dinner, however the four of them end up arriving an hour late as the boys decide to go to Rangers game, while the girls take Emma to a baby beauty pageant. This enrages Monica and she refuses to let the famished guests into her and Chandler's apartment which causes even bigger problems.",
                  "backup_still_url": "/wy23se5VuWF574aHoljxvwoSudK.jpg",
                  "air_date": "2003-11-20",
                  "runtime": 24,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3260,
                  "episode_number": 9,
                  "episode_name": "The One with the Birth Mother",
                  "vote_average": 8.8,
                  "vote_count": 32,
                  "overview": "Nervous and excited, Monica and Chandler travel to Ohio to meet a young pregnant woman, Erica Simmons, who is considering allowing them to adopt her child when it's born. Upon meeting her they discover that due to a mix-up at the adoption agency, Erica thinks that Monica is a reverend and Chandler is a doctor. Meanwhile, Joey dates Phoebe's friend but annoys her with his territorial eating habits. Also Rachel picks out an outfit for Ross to wear on a date but due to a mix up he ends up in an awkward position.",
                  "backup_still_url": "/4s7D54BlT3bx1nNoTUEYxofeIMW.jpg",
                  "air_date": "2004-01-08",
                  "runtime": 25,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3261,
                  "episode_number": 10,
                  "episode_name": "The One Where Chandler Gets Caught",
                  "vote_average": 8.3,
                  "vote_count": 32,
                  "overview": "After Phoebe and Rachel catch Chandler getting into a car with an unknown blonde woman, they follow them to the suburbs. Fearing that Chandler is cheating on Monica, they inform her and learn that the woman is a real estate agent. The pair has been secretly shopping for houses and struggling with how to tell their best friends about their plans. Together the friends reminisce about their good times in the apartment.",
                  "backup_still_url": "/Md5d3VpR4MbP0MjbelfmDeB81A.jpg",
                  "air_date": "2004-01-15",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3262,
                  "episode_number": 11,
                  "episode_name": "The One Where the Stripper Cries",
                  "vote_average": 9,
                  "vote_count": 34,
                  "overview": "Joey is a celebrity contestant on \"The $100,000 Pyramid,\" with its actual host, Donny Osmond. Meanwhile, Phoebe's bachelorette party features a rather unexpected surprise when the stripper shows up. Also, Chandler and Ross attend a college reunion and flash back to 1987 to reflect on a pact they made when they were in college.",
                  "backup_still_url": "/8lMKnJt9mdMAOO063pTPp8pDB4A.jpg",
                  "air_date": "2004-02-05",
                  "runtime": 28,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 3263,
                  "episode_number": 12,
                  "episode_name": "The One with Phoebe's Wedding",
                  "vote_average": 8.9,
                  "vote_count": 34,
                  "overview": "As the big day approaches, Phoebe's wedding planner, Monica, makes everyone around her crazy because according to her - every little thing needs to happen around schedule. This doesn't sit well with Phoebe and she fires her. Unfortunately, on the wedding day New York is hit with the worst snowstorm its seen in 20 years, forcing plans to change. As a substitute for Phoebe's incarcerated father, Joey takes his role much too seriously. Meanwhile, Chandler and Ross discover that neither of them has a part in the wedding; however, after one of Mike's groomsmen is unable to attend, they compete for the open position by any means necessary.",
                  "backup_still_url": "/uOQGYXWmvgBVslgEbmy67Zu4eOq.jpg",
                  "air_date": "2004-02-12",
                  "runtime": 30,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3264,
                  "episode_number": 13,
                  "episode_name": "The One Where Joey Speaks French",
                  "vote_average": 8.4,
                  "vote_count": 39,
                  "overview": "Joey implores Francophile Phoebe to teach him French before an important audition, but she quickly becomes exasperated. Meanwhile, surrogate mom Erica is visiting town and tells the Bings that the baby's father may be a shovel killer. Also, Ross and Rachel grow closer after her sarcastic father, Dr. Green, suffers a heart attack.",
                  "backup_still_url": "/xvULxfWrSrPgpaeNF6MqbHRo7jp.jpg",
                  "air_date": "2004-02-19",
                  "runtime": 24,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3265,
                  "episode_number": 14,
                  "episode_name": "The One with Princess Consuela",
                  "vote_average": 8.6,
                  "vote_count": 32,
                  "overview": "Monica and Chandler visit their potential new house and bring Joey along, who's still upset about them moving, so he's determined to change their minds. Meanwhile, Phoebe learns that she can legally change her name to whatever she wants, so she considers something more exotic. Also, Ross gets tenure at his job, while Rachel's unfortunate job interview actually leads her to some new career opportunities.",
                  "backup_still_url": "/tUs9QYIyKLxAqIwLvDDOrTgvkW8.jpg",
                  "air_date": "2004-02-26",
                  "runtime": 24,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3266,
                  "episode_number": 15,
                  "episode_name": "The One Where Estelle Dies",
                  "vote_average": 8.7,
                  "vote_count": 32,
                  "overview": "After Rachel makes a startling announcement about her possibly accepting a new job offer in Paris, Ross secretly schemes to get her former job back at Ralph Lauren. Joey is so flustered by all of the upheaval in his friends' lives that Phoebe prevents him from learning about the sudden death of his agent Estelle. Meanwhile, Monica and Chandler check out the house for sale next door to their new suburban home and make a stunning discovery.",
                  "backup_still_url": "/jsTrgh20e7J7zq8QLbCE7jNVPmH.jpg",
                  "air_date": "2004-04-22",
                  "runtime": 24,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3267,
                  "episode_number": 16,
                  "episode_name": "The One with Rachel's Going Away Party",
                  "vote_average": 8.6,
                  "vote_count": 34,
                  "overview": "Extremely pregnant Erica visits Monica and Chandler just as they are preparing to move to their new house in the suburbs. At the same time Rachel has packed and ready for her move to Paris, so on her last night in New York the gang hosts a farewell party for her. She says goodbye to each of her friends individually, except for Ross and he's offended. However, before the night is over, there will be more surprises.",
                  "backup_still_url": "/hUrlzwAmzoLj7TvZIWs9OJO7up1.jpg",
                  "air_date": "2004-04-29",
                  "runtime": 23,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 3268,
                  "episode_number": 17,
                  "episode_name": "The Last One",
                  "vote_average": 9.4,
                  "vote_count": 44,
                  "overview": "Erica goes into labor and the new parents, Monica and Chandler, get a bit more than they bargained for. Meanwhile, Joey gets them a housewarming gift - Chick Jr. and Duck Jr., who unfortunately get trapped inside the foosball table. Also, after their night together, Ross realizes that he's still in love with Rachel and doesn't want her to leave. Other friends convince him to go after her and Phoebe races Ross to the airport in a bid to stop Rachel from leaving for Paris.\n\nThe six friends prepare to say goodbye and embark on the next chapters of their lives.",
                  "backup_still_url": "/7XmwmXkJtObpt6ABPENanrJHlg9.jpg",
                  "air_date": "2004-05-06",
                  "runtime": 48,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                }
              ]
            }
          ]
        }
    },
    '/watch_list/get_title_info{"session_key":null,"title_id":"225"}': {
        "title_info": {
          "title_id": 225,
          "tmdb_id": 1399,
          "imdb_id": "tt0944947",
          "type": "tv",
          "name": "Game of Thrones",
          "original_name": "Game of Thrones",
          "tagline": "Winter is coming.",
          "tmdb_vote_average": 8.5,
          "tmdb_vote_count": 24623,
          "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
          "backup_poster_url": "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
          "backup_backdrop_url": "/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg",
          "movie_runtime": null,
          "release_date": "2011-04-17",
          "original_language": "en",
          "age_rating": "K18",
          "trailer_key": "KPLWWIOCOOQ",
          "title_info_last_updated": "2025-02-21T23:37:28",
          "user_title_watch_count": 0,
          "user_title_notes": null,
          "user_title_favourite": 0,
          "user_title_last_updated": "2025-03-08T10:51:03",
          "title_genres": [
            "Action & Adventure",
            "Drama",
            "Sci-Fi & Fantasy"
          ],
          "backdrop_image_count": 1,
          "seasons": [
            {
              "season_id": 164,
              "season_number": 1,
              "season_name": "Season 1",
              "vote_average": 8.4,
              "vote_count": null,
              "episode_count": 10,
              "overview": "Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring.",
              "backup_poster_url": "/wgfKiqzuMrFIkU1M68DDDY8kGC1.jpg",
              "episodes": [
                {
                  "episode_id": 2017,
                  "episode_number": 1,
                  "episode_name": "Winter Is Coming",
                  "vote_average": 8,
                  "vote_count": 356,
                  "overview": "Jon Arryn, the Hand of the King, is dead. King Robert Baratheon plans to ask his oldest friend, Eddard Stark, to take Jon's place. Across the sea, Viserys Targaryen plans to wed his sister to a nomadic warlord in exchange for an army.",
                  "backup_still_url": "/9hGF3WUkBf7cSjMg0cdMDHJkByd.jpg",
                  "air_date": "2011-04-17",
                  "runtime": 62,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2018,
                  "episode_number": 2,
                  "episode_name": "The Kingsroad",
                  "vote_average": 7.9,
                  "vote_count": 238,
                  "overview": "While Bran recovers from his fall, Ned takes only his daughters to Kings Landing. Jon Snow goes with his uncle Benjen to The Wall. Tyrion joins them.",
                  "backup_still_url": "/l0GJx3IR8YasbztTJi5uK0XqkEo.jpg",
                  "air_date": "2011-04-24",
                  "runtime": 56,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2019,
                  "episode_number": 3,
                  "episode_name": "Lord Snow",
                  "vote_average": 8.1,
                  "vote_count": 197,
                  "overview": "Lord Stark and his daughters arrive at King's Landing to discover the intrigues of the king's realm.",
                  "backup_still_url": "/8HjOlb4slc1xusMgOtoNpxuTgSI.jpg",
                  "air_date": "2011-05-01",
                  "runtime": 58,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2020,
                  "episode_number": 4,
                  "episode_name": "Cripples, Bastards, and Broken Things",
                  "vote_average": 8.2,
                  "vote_count": 175,
                  "overview": "Eddard investigates Jon Arryn's murder. Jon befriends Samwell Tarly, a coward who has come to join the Night's Watch.",
                  "backup_still_url": "/jri960hz39eulThP66dd9emTxvs.jpg",
                  "air_date": "2011-05-08",
                  "runtime": 56,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2021,
                  "episode_number": 5,
                  "episode_name": "The Wolf and the Lion",
                  "vote_average": 8.5,
                  "vote_count": 177,
                  "overview": "Catelyn has captured Tyrion and plans to bring him to her sister, Lysa Arryn, at The Vale, to be tried for his, supposed, crimes against Bran. Robert plans to have Daenerys killed, but Eddard refuses to be a part of it and quits.",
                  "backup_still_url": "/u7e1qSWE6v8jfY9vGNrckX47DGN.jpg",
                  "air_date": "2011-05-15",
                  "runtime": 55,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2022,
                  "episode_number": 6,
                  "episode_name": "A Golden Crown",
                  "vote_average": 8.4,
                  "vote_count": 174,
                  "overview": "While recovering from his battle with Jamie, Eddard is forced to run the kingdom while Robert goes hunting. Tyrion demands a trial by combat for his freedom. Viserys is losing his patience with Drogo.",
                  "backup_still_url": "/AdhvrJxyYpINwYnGkBIf2krQKg.jpg",
                  "air_date": "2011-05-22",
                  "runtime": 53,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2023,
                  "episode_number": 7,
                  "episode_name": "You Win or You Die",
                  "vote_average": 8.6,
                  "vote_count": 173,
                  "overview": "Robert has been injured while hunting and is dying. Jon and the others finally take their vows to the Night's Watch. A man, sent by Robert, is captured for trying to poison Daenerys. Furious, Drogo vows to attack the Seven Kingdoms.",
                  "backup_still_url": "/o6ldSDhIINGNKZR62mHf2m64dD.jpg",
                  "air_date": "2011-05-29",
                  "runtime": 58,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2024,
                  "episode_number": 8,
                  "episode_name": "The Pointy End",
                  "vote_average": 8.2,
                  "vote_count": 171,
                  "overview": "Eddard and his men are betrayed and captured by the Lannisters. When word reaches Robb, he plans to go to war to rescue them. The White Walkers attack The Wall. Tyrion returns to his father with some new friends.",
                  "backup_still_url": "/9ZvT1IZPcC11eiCByOzqQvC3CCR.jpg",
                  "air_date": "2011-06-05",
                  "runtime": 59,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2025,
                  "episode_number": 9,
                  "episode_name": "Baelor",
                  "vote_average": 8.9,
                  "vote_count": 186,
                  "overview": "Robb goes to war against the Lannisters. Jon finds himself struggling on deciding if his place is with Robb or the Night's Watch. Drogo has fallen ill from a fresh battle wound. Daenerys is desperate to save him.",
                  "backup_still_url": "/fAmBhmw1pQc6fucrdmnRM5FOpXD.jpg",
                  "air_date": "2011-06-12",
                  "runtime": 57,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2026,
                  "episode_number": 10,
                  "episode_name": "Fire and Blood",
                  "vote_average": 8.8,
                  "vote_count": 177,
                  "overview": "With Ned dead, Robb vows to get revenge on the Lannisters. Jon must officially decide if his place is with Robb or the Night's Watch. Daenerys says her final goodbye to Drogo.",
                  "backup_still_url": "/y1BXkhEqBQS3ewQeqqdHpjhTts0.jpg",
                  "air_date": "2011-06-19",
                  "runtime": 53,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 165,
              "season_number": 2,
              "season_name": "Season 2",
              "vote_average": 8.3,
              "vote_count": null,
              "episode_count": 10,
              "overview": "The cold winds of winter are rising in Westeros...war is coming...and five kings continue their savage quest for control of the all-powerful Iron Throne. With winter fast approaching, the coveted Iron Throne is occupied by the cruel Joffrey, counseled by his conniving mother Cersei and uncle Tyrion. But the Lannister hold on the Throne is under assault on many fronts. Meanwhile, a new leader is rising among the wildings outside the Great Wall, adding new perils for Jon Snow and the order of the Night's Watch.",
              "backup_poster_url": "/9xfNkPwDOqyeUvfNhs1XlWA0esP.jpg",
              "episodes": [
                {
                  "episode_id": 2027,
                  "episode_number": 1,
                  "episode_name": "The North Remembers",
                  "vote_average": 8.1,
                  "vote_count": 173,
                  "overview": "As Robb Stark and his northern army continue the war against the Lannisters, Tyrion arrives in King’s Landing to counsel Joffrey and temper the young king’s excesses.  On the island of Dragonstone, Stannis Baratheon plots an invasion to claim his late brother’s throne, allying himself with the fiery Melisandre, a strange priestess of a stranger god.  Across the sea, Daenerys, her three young dragons, and the khalasar trek through the Red Waste in search of allies, or water.  In the North, Bran presides over a threadbare Winterfell, while beyond the Wall, Jon Snow and the Night’s Watch must shelter with a devious wildling.",
                  "backup_still_url": "/gGHtlTvHpSGZ8DIrxMyK3Ewkc1Y.jpg",
                  "air_date": "2012-04-01",
                  "runtime": 53,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2028,
                  "episode_number": 2,
                  "episode_name": "The Night Lands",
                  "vote_average": 7.9,
                  "vote_count": 156,
                  "overview": "In the wake of a bloody purge in the capital, Tyrion chastens Cersei for alienating the king’s subjects.  On the road north, Arya shares a secret with Gendry, a Night’s Watch recruit.  With supplies dwindling, one of Dany’s scouts returns with news of their position.  After nine years as a Stark ward, Theon Greyjoy reunites with his father Balon, who wants to restore the ancient Kingdom of the Iron Islands.  Davos enlists Salladhor Saan, a pirate, to join forces with Stannis and Melisandre for a naval invasion of King’s Landing.",
                  "backup_still_url": "/3EW7wYNXUVaHT4XRuIoNFrqhZh5.jpg",
                  "air_date": "2012-04-08",
                  "runtime": 54,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2029,
                  "episode_number": 3,
                  "episode_name": "What is Dead May Never Die",
                  "vote_average": 8.2,
                  "vote_count": 148,
                  "overview": "At the Red Keep, Tyrion plots three alliances through the promise of marriage.  Catelyn arrives in the Stormlands to forge an alliance of her own, but King Renly, his new wife Margaery, and her brother Loras Tyrell have other plans.  At Winterfell, Luwin tries to decipher Bran’s dreams.",
                  "backup_still_url": "/neKkHgfX7dgi4E47GKT7bYciq93.jpg",
                  "air_date": "2012-04-15",
                  "runtime": 53,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2030,
                  "episode_number": 4,
                  "episode_name": "Garden of Bones",
                  "vote_average": 8.3,
                  "vote_count": 151,
                  "overview": "Joffrey punishes Sansa for Robb’s victories, and Tyrion scrambles to temper the king’s cruelty. Catelyn entreats Stannis and Renly to unite against the Lannisters. Dany and her khalasar arrive at the prosperous city of Qarth. Tyrion coerces a relative into being his eyes and ears. Arya and Gendry are taken to Harrenhal, where their lives are in the hands of Ser Gregor Clegane. Stannis orders Davos to smuggle Melisandre into a secret cove.",
                  "backup_still_url": "/4j2j97GFao2NX4uAtMbr0Qhx2K2.jpg",
                  "air_date": "2012-04-22",
                  "runtime": 51,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2031,
                  "episode_number": 5,
                  "episode_name": "The Ghost of Harrenhal",
                  "vote_average": 8.2,
                  "vote_count": 147,
                  "overview": "The Baratheon rivalry ends, driving Catelyn to flee and Littlefinger to act. At King’s Landing, Tyrion’s source alerts him to Joffrey’s defense plan - and a mysterious secret weapon. Theon sails to the Stony Shore to prove he’s worthy to be called Ironborn. At Harrenhal, Arya receives a promise from Jaqen H’ghar, one of the prisoners she saved from the Gold Cloaks. The Night’s Watch arrive at the Fist of the First Men, an ancient ringfort where they hope to stem the wildings' advance.",
                  "backup_still_url": "/h7HHSQtEyf7cNBYR2G9DjQ78EgV.jpg",
                  "air_date": "2012-04-29",
                  "runtime": 55,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2032,
                  "episode_number": 6,
                  "episode_name": "The Old Gods and the New",
                  "vote_average": 8.3,
                  "vote_count": 153,
                  "overview": "Theon seizes control of Winterfell. Jon captures a wildling, named Ygritte and is given a chance to prove himself. At King's Landing, after the Lannisters send Myrcella off to be married, the people begin to turn against King Joffrey. Arya comes face to face with a surprise visitor. Daenerys looks to buy ships to sail for the Seven Kingdoms.",
                  "backup_still_url": "/bxToPOtlk77Wkxsas0mMgtjvzXS.jpg",
                  "air_date": "2012-05-06",
                  "runtime": 54,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2033,
                  "episode_number": 7,
                  "episode_name": "A Man Without Honor",
                  "vote_average": 8.2,
                  "vote_count": 149,
                  "overview": "Jamie meets a distant relative. Daenerys receives an invitation to the House of the Undying. Theon leads a search party. Jon loses his way in the wilderness. Cersei counsels Sansa.",
                  "backup_still_url": "/bCDklRxVetx1COP4zXLLnXMS2S0.jpg",
                  "air_date": "2012-05-13",
                  "runtime": 56,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2034,
                  "episode_number": 8,
                  "episode_name": "The Prince of Winterfell",
                  "vote_average": 8.1,
                  "vote_count": 147,
                  "overview": "Betrayal befalls Robb. Jon and Qhorin are taken prisoner by the wildlings. Theon receives a visitor at Winterfell and must make an important decision. Meanwhile, Stannis is just days away from reaching King's Landing and Tyrion prepares for his arrival. At Harrenhal, Arya, Gendry and Hot Pie plan their escape.",
                  "backup_still_url": "/4W90HbZcVG54m8HoxaZmXc8rzjy.jpg",
                  "air_date": "2012-05-20",
                  "runtime": 54,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2035,
                  "episode_number": 9,
                  "episode_name": "Blackwater",
                  "vote_average": 8.9,
                  "vote_count": 171,
                  "overview": "Tyrion and the Lannisters fight for their lives as Stannis’ fleet assaults King’s Landing.",
                  "backup_still_url": "/rX44Vfd0iiZDIJWHYZg9j4yLSP9.jpg",
                  "air_date": "2012-05-27",
                  "runtime": 55,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2036,
                  "episode_number": 10,
                  "episode_name": "Valar Morghulis",
                  "vote_average": 8.7,
                  "vote_count": 155,
                  "overview": "Tyrion awakens to a changed situation. King Joffrey doles out rewards to his subjects. As Theon stirs his men to action, Luwin offers some final advice. Brienne silences Jaime. Arya receives a gift from Jaqen. Dany goes to a strange place. Jon proves himself to Qhorin.",
                  "backup_still_url": "/u46jn12qEyaCOe1oqJBwPvL5d7R.jpg",
                  "air_date": "2012-06-03",
                  "runtime": 64,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 166,
              "season_number": 3,
              "season_name": "Season 3",
              "vote_average": 8.3,
              "vote_count": null,
              "episode_count": 10,
              "overview": "Duplicity and treachery...nobility and honor...conquest and triumph...and, of course, dragons. In Season 3, family and loyalty are the overarching themes as many critical storylines from the first two seasons come to a brutal head. Meanwhile, the Lannisters maintain their hold on King's Landing, though stirrings in the North threaten to alter the balance of power; Robb Stark, King of the North, faces a major calamity as he tries to build on his victories; a massive army of wildlings led by Mance Rayder march for the Wall; and Daenerys Targaryen--reunited with her dragons--attempts to raise an army in her quest for the Iron Throne.",
              "backup_poster_url": "/5MkZjRnCKiIGn3bkXrXfndEzqOU.jpg",
              "episodes": [
                {
                  "episode_id": 2037,
                  "episode_number": 1,
                  "episode_name": "Valar Dohaeris",
                  "vote_average": 8.2,
                  "vote_count": 163,
                  "overview": "Jon meets the King-Beyond-the-Wall while his Night Watch Brothers flee south. In King's Landing, Tyrion wants a reward, Margaery shows her charitable nature, Cersei arranges a dinner party, and Littlefinger offers to help Sansa. Across the Narrow Sea, Daenerys starts her journey west.",
                  "backup_still_url": "/3pyS7xz9mprX4OuOCfV261CnGfR.jpg",
                  "air_date": "2013-03-31",
                  "runtime": 55,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2038,
                  "episode_number": 2,
                  "episode_name": "Dark Wings, Dark Words",
                  "vote_average": 7.9,
                  "vote_count": 147,
                  "overview": "Sansa says too much. Shae asks Tyrion for a favor. Jaime finds a way to pass the time, while Arya encounters the Brotherhood Without Banners.",
                  "backup_still_url": "/ydrupjqBj6M68pUwJNJ5rbGmm1O.jpg",
                  "air_date": "2013-04-07",
                  "runtime": 58,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2039,
                  "episode_number": 3,
                  "episode_name": "Walk of Punishment",
                  "vote_average": 8.2,
                  "vote_count": 152,
                  "overview": "Tyrion shoulders new responsibilities. Jon is taken to the Fist of the First Men. Daenerys meets with the slavers. Jaime strikes a deal with his captors.",
                  "backup_still_url": "/i39Itkd76DOXxek0blIO6rI6zsa.jpg",
                  "air_date": "2013-04-14",
                  "runtime": 53,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2040,
                  "episode_number": 4,
                  "episode_name": "And Now His Watch Is Ended",
                  "vote_average": 8.8,
                  "vote_count": 167,
                  "overview": "Trouble brews among the Night's Watch at Craster's. Margaery takes Joffrey out of his comfort zone. Arya meets the leader of the Brotherhood. Varys plots revenge on an old foe. Theon mournfully recalls his missteps. Daenerys deftly orchestrates her exit from Astapor.",
                  "backup_still_url": "/veYx7AoKhxC8Pz8EThNpoOxeSGX.jpg",
                  "air_date": "2013-04-21",
                  "runtime": 54,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2041,
                  "episode_number": 5,
                  "episode_name": "Kissed by Fire",
                  "vote_average": 8.2,
                  "vote_count": 149,
                  "overview": "The Hound is judged by the gods. Jaime is judged by men. Jon proves himself. Robb is betrayed. Tyrion learns the cost of weddings.",
                  "backup_still_url": "/d2b1CWsWCKMt5IpNXKgJfE4fjxj.jpg",
                  "air_date": "2013-04-28",
                  "runtime": 58,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2042,
                  "episode_number": 6,
                  "episode_name": "The Climb",
                  "vote_average": 8.1,
                  "vote_count": 142,
                  "overview": "Tywin plans strategic unions for the Lannisters. Melisandre pays a visit to the Riverlands. Robb weighs a compromise to repair his alliance with House Frey. Roose Bolton decides what to do with Jaime Lannister. Jon, Ygritte, and the Wildlings face a daunting climb.",
                  "backup_still_url": "/eJQ5vnNrlM28fpInn6uGM0xUZRX.jpg",
                  "air_date": "2013-05-05",
                  "runtime": 54,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2043,
                  "episode_number": 7,
                  "episode_name": "The Bear and the Maiden Fair",
                  "vote_average": 8.2,
                  "vote_count": 150,
                  "overview": "Daenerys exchanges gifts with a slave lord outside of Yunkai. As Sansa frets about her prospects, Shae chafes at Tyrion’s new situation. Tywin counsels the king, and Melisandre reveals a secret to Gendry. Brienne faces a formidable foe in Harrenhal.",
                  "backup_still_url": "/2RVD5pIIiv7ZH0qnazwVrsPEFpP.jpg",
                  "air_date": "2013-05-12",
                  "runtime": 58,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2044,
                  "episode_number": 8,
                  "episode_name": "Second Sons",
                  "vote_average": 8.3,
                  "vote_count": 143,
                  "overview": "King’s Landing hosts a wedding, and Tyrion and Sansa spend the night together. Daenerys tries to persuade the Second Sons to join her against Yunkai. Stannis releases Davos from the dungeons. Sam and Gilly meet an older gentleman.",
                  "backup_still_url": "/x3sJ9URXLn9hb6WAqqNhVJQGPut.jpg",
                  "air_date": "2013-05-19",
                  "runtime": 57,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2045,
                  "episode_number": 9,
                  "episode_name": "The Rains of Castamere",
                  "vote_average": 9.2,
                  "vote_count": 219,
                  "overview": "Robb presents himself to Walder Frey, and Edmure meets his bride. Jon faces his harshest test yet. Bran discovers a new gift. Daario and Jorah debate how to take Yunkai. House Frey joins with House Tully.",
                  "backup_still_url": "/8Cvg7NkvDPckIwPKWcyS25YcoSh.jpg",
                  "air_date": "2013-06-02",
                  "runtime": 51,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 2046,
                  "episode_number": 10,
                  "episode_name": "Mhysa",
                  "vote_average": 8.4,
                  "vote_count": 154,
                  "overview": "Bran and company travel beyond the Wall. Sam returns to Castle Black. Jon says goodbye to Ygritte. Jaime returns to King's Landing. The Night's Watch asks for help from Stannis. Daenerys waits to see if she is a conqueror or a liberator.",
                  "backup_still_url": "/wJbEFBLyogHR1GoxfDXNIoP4k1w.jpg",
                  "air_date": "2013-06-09",
                  "runtime": 63,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 167,
              "season_number": 4,
              "season_name": "Season 4",
              "vote_average": 8.5,
              "vote_count": null,
              "episode_count": 10,
              "overview": "The War of the Five Kings is drawing to a close, but new intrigues and plots are in motion, and the surviving factions must contend with enemies not only outside their ranks, but within.",
              "backup_poster_url": "/jXIMScXE4J4EVHUba1JgxZnWbo4.jpg",
              "episodes": [
                {
                  "episode_id": 2047,
                  "episode_number": 1,
                  "episode_name": "Two Swords",
                  "vote_average": 8,
                  "vote_count": 172,
                  "overview": "Tyrion welcomes a guest to King’s Landing. At Castle Black, Jon Snow finds himself unwelcome. Dany is pointed to Meereen, the mother of all slave cities. Arya runs into an old friend.",
                  "backup_still_url": "/gtGrhEOURApsKhbf6tm6leJJmmp.jpg",
                  "air_date": "2014-04-06",
                  "runtime": 59,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2048,
                  "episode_number": 2,
                  "episode_name": "The Lion and the Rose",
                  "vote_average": 8.9,
                  "vote_count": 174,
                  "overview": "Tyrion lends Jaime a hand. Joffrey and Margaery host a breakfast. At Dragonstone, Stannis loses patience with Davos. Ramsay finds a purpose for his pet. North of the Wall, Bran sees where they must go.",
                  "backup_still_url": "/zOeaRpAKbrATuVe8Z5MtVJfair9.jpg",
                  "air_date": "2014-04-13",
                  "runtime": 53,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2049,
                  "episode_number": 3,
                  "episode_name": "Breaker of Chains",
                  "vote_average": 8.2,
                  "vote_count": 149,
                  "overview": "Tyrion ponders his options. Tywin extends an olive branch. Sam realizes Castle Black isn’t safe, and Jon proposes a bold plan. The Hound teaches Arya the way things are. Dany chooses her champion.",
                  "backup_still_url": "/pgwGxEDIv1XyB5TcJcJM7EMLWiX.jpg",
                  "air_date": "2014-04-20",
                  "runtime": 57,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2050,
                  "episode_number": 4,
                  "episode_name": "Oathkeeper",
                  "vote_average": 7.9,
                  "vote_count": 154,
                  "overview": "Dany balances justice and mercy. Jaime tasks Brienne with his honor. Jon secures volunteers while Bran, Jojen, Meera and Hodor stumble on shelter.",
                  "backup_still_url": "/9VolANvmLPcI5ynaCGHvwL1957h.jpg",
                  "air_date": "2014-04-27",
                  "runtime": 56,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2051,
                  "episode_number": 5,
                  "episode_name": "First of His Name",
                  "vote_average": 8.1,
                  "vote_count": 150,
                  "overview": "After Tommen is crowned the King of the Seven Kingdoms, Cersei and Tywin plan the Crown's next move. Meanwhile, Dany weighs her future plans regarding Westeros and Slaver's Bay. Sansa and Lord Baelish arrive at the Eyrie and Jon Snow along with men from the Night's Watch attacks Craster's Keep.",
                  "backup_still_url": "/bf0Z9votO2jqQLI0Y66TqfTjlyq.jpg",
                  "air_date": "2014-05-04",
                  "runtime": 54,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2052,
                  "episode_number": 6,
                  "episode_name": "The Laws of Gods and Men",
                  "vote_average": 9,
                  "vote_count": 175,
                  "overview": "Stannis makes a deal with the Iron Bank of Braavos. Yara and her troops storm the Dreadfort to free Theon. Meanwhile, Daenerys meets Hizdar zo Loraq and her other supplicants. And the day of Tyrion's trial has come where Tyrion faces his father.",
                  "backup_still_url": "/vKt9b7HNYhwM91C7S53zPsAWfT3.jpg",
                  "air_date": "2014-05-11",
                  "runtime": 51,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 2053,
                  "episode_number": 7,
                  "episode_name": "Mockingbird",
                  "vote_average": 8.3,
                  "vote_count": 155,
                  "overview": "Tyrion gains an unlikely ally; Daario asks Dany to allow him to do what he does best; Jon's warnings about the vulnerability of the Wall are ignored; Brienne follows a new lead. ",
                  "backup_still_url": "/u1LNM3vEGX2SWmoDZZC6yxXZXu8.jpg",
                  "air_date": "2014-05-18",
                  "runtime": 52,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2054,
                  "episode_number": 8,
                  "episode_name": "The Mountain and the Viper",
                  "vote_average": 8.8,
                  "vote_count": 182,
                  "overview": "Unexpected visitors arrive in Mole's Town. With assistance from Theon, Ramsay proves himself to his father, Lord Bolton. Littlefinger's motives are questioned when Sansa reveals the fate of Lysa Arryn to other lords of the Vale. Daenerys finds out a secret about Jorah Mormont. Tyrion's fate is decided.",
                  "backup_still_url": "/cOcGpQmBvwuScHJjwQYlCreVl4x.jpg",
                  "air_date": "2014-06-01",
                  "runtime": 53,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2055,
                  "episode_number": 9,
                  "episode_name": "The Watchers on the Wall",
                  "vote_average": 8.7,
                  "vote_count": 170,
                  "overview": "Jon Snow and the Night's Watch face a big challenge.",
                  "backup_still_url": "/vn4ECYuCaV43MEwpyjTdkXg7NPB.jpg",
                  "air_date": "2014-06-08",
                  "runtime": 51,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2056,
                  "episode_number": 10,
                  "episode_name": "The Children",
                  "vote_average": 8.8,
                  "vote_count": 165,
                  "overview": "Circumstances change after an unexpected arrival from north of the Wall. Dany must face harsh realities. Bran learns more about his destiny. Tyrion sees the truth about his situation.",
                  "backup_still_url": "/dEvyoz6NrUGH3nyphu43hAzT1VE.jpg",
                  "air_date": "2014-06-15",
                  "runtime": 66,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 168,
              "season_number": 5,
              "season_name": "Season 5",
              "vote_average": 8.2,
              "vote_count": null,
              "episode_count": 10,
              "overview": "The War of the Five Kings, once thought to be drawing to a close, is instead entering a new and more chaotic phase. Westeros is on the brink of collapse, and many are seizing what they can while the realm implodes, like a corpse making a feast for crows.",
              "backup_poster_url": "/7Q1Hy1AHxAzA2lsmzEMBvuWTX0x.jpg",
              "episodes": [
                {
                  "episode_id": 2057,
                  "episode_number": 1,
                  "episode_name": "The Wars to Come",
                  "vote_average": 7.9,
                  "vote_count": 164,
                  "overview": "Cersei and Jaime adjust to a world without Tywin. Varys reveals a conspiracy to Tyrion. Dany faces a new threat to her rule. Jon is caught between two kings.",
                  "backup_still_url": "/shIFxmFySt9CtGXMTXWBipsNOIs.jpg",
                  "air_date": "2015-04-12",
                  "runtime": 53,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2058,
                  "episode_number": 2,
                  "episode_name": "The House of Black and White",
                  "vote_average": 7.8,
                  "vote_count": 156,
                  "overview": "Arya arrives in Braavos. Podrick and Brienne run into trouble on the road. Cersei fears for her daughter's safety in Dorne as Ellaria Sand seeks revenge for Oberyn's death. Stannis tempts Jon. An adviser tempts Daenerys.",
                  "backup_still_url": "/uCJpE0pfjn78uhr2TjvIrhyTcR8.jpg",
                  "air_date": "2015-04-19",
                  "runtime": 56,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2059,
                  "episode_number": 3,
                  "episode_name": "High Sparrow",
                  "vote_average": 8,
                  "vote_count": 150,
                  "overview": "In Braavos, Arya sees the Many-Faced God. In King's Landing, Queen Margaery enjoys her new husband. Tyrion and Varys walk the Long Bridge of Volantis.",
                  "backup_still_url": "/5b6eUi2w12ao24ug8cL5QqJFKig.jpg",
                  "air_date": "2015-04-26",
                  "runtime": 60,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2060,
                  "episode_number": 4,
                  "episode_name": "Sons of the Harpy",
                  "vote_average": 8,
                  "vote_count": 152,
                  "overview": "The Faith Militant grow increasingly aggressive. Jaime and Bronn head south. Ellaria and the Sand Snakes vow vengeance.",
                  "backup_still_url": "/xJK24ELjz04a05saADPXkYafa21.jpg",
                  "air_date": "2015-05-03",
                  "runtime": 51,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2061,
                  "episode_number": 5,
                  "episode_name": "Kill the Boy",
                  "vote_average": 7.9,
                  "vote_count": 149,
                  "overview": "Dany makes a difficult decision in Meereen. Jon recruits the help of an unexpected ally. Brienne searches for Sansa. Theon remains under Ramsay's control.",
                  "backup_still_url": "/j7fXuI4mC94q7SKbOON5Fnp1Rau.jpg",
                  "air_date": "2015-05-10",
                  "runtime": 57,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2062,
                  "episode_number": 6,
                  "episode_name": "Unbowed, Unbent, Unbroken",
                  "vote_average": 7.6,
                  "vote_count": 145,
                  "overview": "Arya trains. Jorah and Tyrion run into slavers. Trystane and Myrcella make plans. Jaime and Bronn reach their destination. The Sand Snakes attack.",
                  "backup_still_url": "/ihngOB9FfBZvmTy01D836QMFybe.jpg",
                  "air_date": "2015-05-17",
                  "runtime": 54,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2063,
                  "episode_number": 7,
                  "episode_name": "The Gift",
                  "vote_average": 8.3,
                  "vote_count": 152,
                  "overview": "Jon prepares for conflict. Sansa tries to talk to Theon. Brienne waits for a sign. Stannis remains stubborn. Jaime attempts to reconnect with family.",
                  "backup_still_url": "/n4BFZfiqOX1l5l6uYtpDS4m19WX.jpg",
                  "air_date": "2015-05-24",
                  "runtime": 59,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2064,
                  "episode_number": 8,
                  "episode_name": "Hardhome",
                  "vote_average": 9.3,
                  "vote_count": 210,
                  "overview": "Arya makes progress in her training. Sansa confronts an old friend. Cersei struggles. Jon travels.",
                  "backup_still_url": "/58PgfiE8eIOdQ1iDvFnJG471RFB.jpg",
                  "air_date": "2015-05-31",
                  "runtime": 60,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 2065,
                  "episode_number": 9,
                  "episode_name": "The Dance of Dragons",
                  "vote_average": 8.8,
                  "vote_count": 165,
                  "overview": "Stannis confronts a troubling decision. Jon returns to The Wall. Mace visits the Iron Bank. Arya encounters someone from her past. Dany reluctantly oversees a traditional celebration of athleticism.",
                  "backup_still_url": "/ymI7V3wsZRcRqLWgjJ59CTTGvh5.jpg",
                  "air_date": "2015-06-07",
                  "runtime": 53,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2066,
                  "episode_number": 10,
                  "episode_name": "Mother's Mercy",
                  "vote_average": 8.5,
                  "vote_count": 158,
                  "overview": "Stannis marches. Dany is surrounded by strangers. Cersei seeks forgiveness. Jon is challenged.",
                  "backup_still_url": "/b5dIepsIO3robQSe18fWmsQe37R.jpg",
                  "air_date": "2015-06-14",
                  "runtime": 61,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 169,
              "season_number": 6,
              "season_name": "Season 6",
              "vote_average": 8.3,
              "vote_count": null,
              "episode_count": 10,
              "overview": "Following the shocking developments at the conclusion of season five, survivors from all parts of Westeros and Essos regroup to press forward, inexorably, towards their uncertain individual fates. Familiar faces will forge new alliances to bolster their strategic chances at survival, while new characters will emerge to challenge the balance of power in the east, west, north and south.",
              "backup_poster_url": "/p1udLh0gfqyZFmXBGa393gk8go5.jpg",
              "episodes": [
                {
                  "episode_id": 2067,
                  "episode_number": 1,
                  "episode_name": "The Red Woman",
                  "vote_average": 7.6,
                  "vote_count": 203,
                  "overview": "The fate of Jon Snow is revealed. Daenerys meets a strong man. Cersei sees her daughter once again.",
                  "backup_still_url": "/qEu20NFIbwxtyABtFvsyyPaCNDM.jpg",
                  "air_date": "2016-04-24",
                  "runtime": 51,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2068,
                  "episode_number": 2,
                  "episode_name": "Home",
                  "vote_average": 8.3,
                  "vote_count": 178,
                  "overview": "Bran trains with the Three-Eyed Raven. In King’s Landing, Jaime advises Tommen. Tyrion demands good news, but has to make his own. At Castle Black, the Night’s Watch stands behind Thorne. Ramsay Bolton proposes a plan, and Balon Greyjoy entertains other proposals.",
                  "backup_still_url": "/9JlZ6sOXf4nodwWYvoM5zCJIGm9.jpg",
                  "air_date": "2016-05-01",
                  "runtime": 54,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2069,
                  "episode_number": 3,
                  "episode_name": "Oathbreaker",
                  "vote_average": 7.9,
                  "vote_count": 159,
                  "overview": "Daenerys meets her future. Bran meets the past. Tommen confronts the High Sparrow. Arya trains to be No One. Varys finds an answer. Ramsay gets a gift.",
                  "backup_still_url": "/dNp7HBQbwKlgX76fwqM6SWUo5tU.jpg",
                  "air_date": "2016-05-08",
                  "runtime": 53,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2070,
                  "episode_number": 4,
                  "episode_name": "Book of the Stranger",
                  "vote_average": 8.4,
                  "vote_count": 160,
                  "overview": "Tyrion strikes a deal. Jorah and Daario undertake a difficult task. Jaime and Cersei try to improve their situation.",
                  "backup_still_url": "/dY2DbzgIjIatJJCVRgk1gKTJWez.jpg",
                  "air_date": "2016-05-15",
                  "runtime": 59,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2071,
                  "episode_number": 5,
                  "episode_name": "The Door",
                  "vote_average": 8.9,
                  "vote_count": 202,
                  "overview": "Tyrion seeks a strange ally. Bran learns a great deal. Brienne goes on a mission. Arya is given a chance to prove herself.",
                  "backup_still_url": "/96u7HuryCkPEIN3JkZP336KTSq3.jpg",
                  "air_date": "2016-05-22",
                  "runtime": 57,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2072,
                  "episode_number": 6,
                  "episode_name": "Blood of My Blood",
                  "vote_average": 7.8,
                  "vote_count": 153,
                  "overview": "An old foe comes back into the picture. Gilly meets Sam’s family. Arya faces a difficult choice. Jaime faces off against the High Sparrow.",
                  "backup_still_url": "/k01MUth8Xm2y79nvsQ3UF25SN9w.jpg",
                  "air_date": "2016-05-29",
                  "runtime": 52,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2073,
                  "episode_number": 7,
                  "episode_name": "The Broken Man",
                  "vote_average": 7.9,
                  "vote_count": 151,
                  "overview": "The High Sparrow eyes another target. Jaime confronts a hero. Arya makes a plan. The North is reminded.",
                  "backup_still_url": "/ymjvIqw8GClvQpurBYMeyaYXTck.jpg",
                  "air_date": "2016-06-05",
                  "runtime": 51,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2074,
                  "episode_number": 8,
                  "episode_name": "No One",
                  "vote_average": 7.9,
                  "vote_count": 147,
                  "overview": "While Jaime weighs his options, Cersei answers a request. Tyrion's plans bear fruit. Arya faces a new test.",
                  "backup_still_url": "/xl2l1a3kXGxWwZqGDgjowBk4x46.jpg",
                  "air_date": "2016-06-12",
                  "runtime": 59,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2075,
                  "episode_number": 9,
                  "episode_name": "Battle of the Bastards",
                  "vote_average": 9.2,
                  "vote_count": 297,
                  "overview": "As the Starks prepare to fight, Davos loses something dear. Ramsay plays a game. Daenerys faces a choice.",
                  "backup_still_url": "/j2znyjFSe1ol26DeQWMB1yE5EDQ.jpg",
                  "air_date": "2016-06-19",
                  "runtime": 60,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                },
                {
                  "episode_id": 2076,
                  "episode_number": 10,
                  "episode_name": "The Winds of Winter",
                  "vote_average": 9.3,
                  "vote_count": 252,
                  "overview": "Tyrion counsels Daenerys on the upcoming campaign. Jon and Sansa discuss their future. Trials begin in King's Landing.",
                  "backup_still_url": "/8qgIcKTOKeAHlJMjGyPHl3IHjcU.jpg",
                  "air_date": "2016-06-26",
                  "runtime": 68,
                  "watch_count": 0,
                  "tileColor": "rgb(0, 79, 169)"
                }
              ]
            },
            {
              "season_id": 170,
              "season_number": 7,
              "season_name": "Season 7",
              "vote_average": 8.2,
              "vote_count": null,
              "episode_count": 7,
              "overview": "The long winter is here. And with it comes a convergence of armies and attitudes that have been brewing for years.",
              "backup_poster_url": "/oX51n32QyHeFP5kErksemJsJljL.jpg",
              "episodes": [
                {
                  "episode_id": 2077,
                  "episode_number": 1,
                  "episode_name": "Dragonstone",
                  "vote_average": 8,
                  "vote_count": 200,
                  "overview": "Jon organizes the defense of the North. Cersei tries to even the odds. Daenerys comes home.",
                  "backup_still_url": "/3SB4PUzZAnY6HnZbVbktIZoopGs.jpg",
                  "air_date": "2017-07-16",
                  "runtime": 59,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2078,
                  "episode_number": 2,
                  "episode_name": "Stormborn",
                  "vote_average": 7.9,
                  "vote_count": 172,
                  "overview": "Daenerys receives an unexpected visitor. Jon faces a revolt. Tyrion plans the conquest of Westeros.",
                  "backup_still_url": "/6ZLuB2YZeXTCEETnbPe5MNKCsio.jpg",
                  "air_date": "2017-07-23",
                  "runtime": 59,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2079,
                  "episode_number": 3,
                  "episode_name": "The Queen's Justice",
                  "vote_average": 8,
                  "vote_count": 168,
                  "overview": "Daenerys holds court. Tyrion backchannels. Cersei returns a gift. Jaime learns from his mistakes.",
                  "backup_still_url": "/xSqdpR6qADmjsdlcJLX5LXRToQP.jpg",
                  "air_date": "2017-07-30",
                  "runtime": 63,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2080,
                  "episode_number": 4,
                  "episode_name": "The Spoils of War",
                  "vote_average": 8.7,
                  "vote_count": 205,
                  "overview": "Daenerys fights back. Jaime faces an unexpected situation. Arya comes home.",
                  "backup_still_url": "/hH9gSHcisHqoux734Q2SdLPLmsL.jpg",
                  "air_date": "2017-08-06",
                  "runtime": 50,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2081,
                  "episode_number": 5,
                  "episode_name": "Eastwatch",
                  "vote_average": 8,
                  "vote_count": 158,
                  "overview": "Tyrion tries to find a way to make Daenerys listen to reason while Jon plans a dangerous new mission.",
                  "backup_still_url": "/3iaJDPtj75z1YpLDMKR17JRXQdP.jpg",
                  "air_date": "2017-08-13",
                  "runtime": 59,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2082,
                  "episode_number": 6,
                  "episode_name": "Beyond the Wall",
                  "vote_average": 8,
                  "vote_count": 187,
                  "overview": "Jon and his team go beyond the wall to capture a wight. Daenerys has to make a tough decision.",
                  "backup_still_url": "/jDMCK1E4iqH8ZJeZnv3ftpei0nm.jpg",
                  "air_date": "2017-08-20",
                  "runtime": 70,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                },
                {
                  "episode_id": 2083,
                  "episode_number": 7,
                  "episode_name": "The Dragon and the Wolf",
                  "vote_average": 8.5,
                  "vote_count": 178,
                  "overview": "A meeting is held in King's Landing. Problems arise in the North.",
                  "backup_still_url": "/w4N4xxFrfjUyk7wE5hgcoAy0tDc.jpg",
                  "air_date": "2017-08-27",
                  "runtime": 80,
                  "watch_count": 0,
                  "tileColor": "rgb(12, 59, 112)"
                }
              ]
            },
            {
              "season_id": 171,
              "season_number": 8,
              "season_name": "Season 8",
              "vote_average": 6.3,
              "vote_count": null,
              "episode_count": 6,
              "overview": "The Great War has come, the Wall has fallen and the Night King's army of the dead marches towards Westeros. The end is here, but who will take the Iron Throne?",
              "backup_poster_url": "/259Q5FuaD3TNB7DGauTaJVRC8XV.jpg",
              "episodes": [
                {
                  "episode_id": 2084,
                  "episode_number": 1,
                  "episode_name": "Winterfell",
                  "vote_average": 7.2,
                  "vote_count": 259,
                  "overview": "Arriving at Winterfell, Jon and Daenerys struggle to unite a divided North. Jon Snow gets some big news.",
                  "backup_still_url": "/o65qwX1aHJclJ36VDhD3VYzz5em.jpg",
                  "air_date": "2019-04-14",
                  "runtime": 55,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2085,
                  "episode_number": 2,
                  "episode_name": "A Knight of the Seven Kingdoms",
                  "vote_average": 7.4,
                  "vote_count": 244,
                  "overview": "The battle at Winterfell is approaching. Jaime is confronted with the consequences of the past. A tense interaction between Sansa and Daenerys follows.",
                  "backup_still_url": "/vJ8H9WtzbJGfArfdycc4nagQVRU.jpg",
                  "air_date": "2019-04-21",
                  "runtime": 59,
                  "watch_count": 0,
                  "tileColor": "rgb(19, 45, 75)"
                },
                {
                  "episode_id": 2086,
                  "episode_number": 3,
                  "episode_name": "The Long Night",
                  "vote_average": 6.9,
                  "vote_count": 302,
                  "overview": "The Night King and his army have arrived at Winterfell and the great battle begins. Arya looks to prove her worth as a fighter.",
                  "backup_still_url": "/mFtHbZenI5rRPqC5OFafoVmjEjq.jpg",
                  "air_date": "2019-04-28",
                  "runtime": 82,
                  "watch_count": 0,
                  "tileColor": "rgb(24, 37, 53)"
                },
                {
                  "episode_id": 2087,
                  "episode_number": 4,
                  "episode_name": "The Last of the Starks",
                  "vote_average": 5.7,
                  "vote_count": 262,
                  "overview": "In the wake of a costly victory, Jon and Daenerys look to the south as Tyrion eyes a compromise that could save countless lives.",
                  "backup_still_url": "/9jgeANvHuZFVnTIkkKSU3PkGJZA.jpg",
                  "air_date": "2019-05-05",
                  "runtime": 79,
                  "watch_count": 0,
                  "tileColor": "rgb(27, 33, 40)"
                },
                {
                  "episode_id": 2088,
                  "episode_number": 5,
                  "episode_name": "The Bells",
                  "vote_average": 6,
                  "vote_count": 272,
                  "overview": "Daenerys brings her forces to King's Landing.",
                  "backup_still_url": "/xF9hOs5h9sc37oWdtF4RPHq8dXA.jpg",
                  "air_date": "2019-05-12",
                  "runtime": 80,
                  "watch_count": 0,
                  "tileColor": "rgb(24, 37, 53)"
                },
                {
                  "episode_id": 2089,
                  "episode_number": 6,
                  "episode_name": "The Iron Throne",
                  "vote_average": 4.6,
                  "vote_count": 333,
                  "overview": "In the aftermath of the devastating attack on King's Landing, Daenerys must face the survivors.",
                  "backup_still_url": "/zBi2O5EJfgTS6Ae0HdAYLm9o2nf.jpg",
                  "air_date": "2019-05-19",
                  "runtime": 80,
                  "watch_count": 0,
                  "tileColor": "rgb(28, 31, 33)"
                }
              ]
            }
          ]
        }
    },

};
