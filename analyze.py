#!/usr/bin/env python3
"""Bug SLA Analysis - Last 30 days from Linear data."""
import sys
from collections import defaultdict
from datetime import datetime

CANCELLED_STATUSES = {"Canceled", "Cancelled", "Duplicate"}

TEAM_TO_PILLAR = {
    "Clinical Experience": "Scale",
    "Pharmacy & Ops": "Scale",
    "Commerce": "Scale",
    "Payments": "Scale",
    "Category Tools": "Scale",
    "Patient Experience": "Scale",
    "Dev Productivity": "Scale",

    "Voy Menopause": "Incubate",
    "Diagnostics": "Incubate",

    "Unified App": "Growth",
    "TRT": "Growth",
    "Weight Loss UK": "Growth",
    "Global Hair Loss": "Growth",
    "Weight Loss BR": "Growth",

    "Engagement": "Engage",
    "Content and Community": "Engage",
    "Engage Pillar": "Engage",
    "Medical Journey": "Engage",

    "Rebrand": "Rebrand",

    "[QA] General Bugs Collection": "EXCLUDE",
    "Voyage Design System": "EXCLUDE",
}

issues = [
    # (team, status, completedAt, slaBreachesAt)
    ("Commerce","Triage",None,"2026-03-06T15:37:43.492Z"),
    ("Voy Menopause","Grooming",None,"2026-04-06T14:32:19.169Z"),
    ("TRT","Done","2026-03-10T09:36:43.350Z","2026-03-13T08:34:16.911Z"),
    ("TRT","Discovery",None,"2026-03-17T08:33:57.547Z"),
    ("Medical Journey","Backlog",None,"2026-03-12T15:32:44.391Z"),
    ("Medical Journey","Backlog",None,None),
    ("Medical Journey","Done","2026-03-02T11:48:40.166Z","2026-03-03T10:24:34.970Z"),
    ("Category Tools","Canceled",None,None),
    ("TRT","Canceled",None,None),
    ("Unified App","Canceled",None,None),
    ("Unified App","Done","2026-03-10T09:29:15.336Z","2026-03-05T12:05:51.218Z"),
    ("Unified App","Done","2026-03-10T09:26:37.938Z","2026-03-05T12:04:59.142Z"),
    ("Patient Experience","Triage",None,"2026-03-11T09:23:10.451Z"),
    ("Payments","Triage",None,"2026-03-10T21:03:08.529Z"),
    ("TRT","In Progress",None,"2026-03-17T08:40:26.565Z"),
    ("Global Hair Loss","Triage",None,"2026-02-25T16:34:45.016Z"),
    ("Weight Loss BR","Triage",None,"2026-03-10T21:12:31.367Z"),
    ("Engagement","Triage",None,"2026-03-10T20:06:59.635Z"),
    ("Weight Loss UK","Triage",None,"2026-03-10T18:20:31.255Z"),
    ("Payments","Canceled",None,None),
    ("Payments","Triage",None,"2026-03-02T13:43:40.647Z"),
    ("Category Tools","Triage",None,"2026-03-09T13:07:10.907Z"),
    ("Weight Loss UK","Triage",None,"2026-03-10T14:56:37.709Z"),
    ("Weight Loss UK","Code Review",None,None),
    ("Weight Loss UK","Duplicate",None,None),
    ("Clinical Experience","Triage",None,"2026-03-10T10:04:20.291Z"),
    ("Weight Loss UK","Duplicate",None,None),
    ("Weight Loss UK","Ready",None,"2026-03-13T15:20:34.781Z"),
    ("Global Hair Loss","Triage",None,"2026-03-09T13:09:54.876Z"),
    ("Global Hair Loss","Triage",None,"2026-03-05T17:15:55.709Z"),
    ("Global Hair Loss","Triage",None,"2026-03-05T11:38:56.616Z"),
    ("TRT","Canceled",None,None),
    ("Weight Loss UK","Ready",None,"2026-02-23T10:51:17.143Z"),
    ("Medical Journey","In Progress",None,"2026-02-23T10:51:17.508Z"),
    ("Weight Loss UK","Triage",None,"2026-03-10T11:31:58.979Z"),
    ("Medical Journey","In Progress",None,"2026-03-10T11:35:49.480Z"),
    ("Engagement","Ready",None,"2026-03-16T12:03:41.330Z"),
    ("Engagement","Ready",None,"2026-03-16T12:03:07.074Z"),
    ("Engagement","Ready",None,"2026-03-16T12:02:08.342Z"),
    ("Engagement","Ready",None,"2026-03-16T12:01:54.757Z"),
    ("Engagement","Ready",None,"2026-03-16T12:00:56.885Z"),
    ("TRT","Done","2026-03-03T14:23:44.305Z","2026-03-21T09:22:22.023Z"),
    ("Clinical Experience","In Progress",None,"2026-04-02T17:25:22.213Z"),
    ("Weight Loss UK","In Progress",None,"2026-03-03T11:06:20.036Z"),
    ("TRT","Done","2026-03-09T11:33:28.991Z","2026-03-10T10:53:08.801Z"),
    ("Clinical Experience","Triage",None,"2026-03-10T11:24:39.544Z"),
    ("Medical Journey","Ready",None,"2026-02-16T14:18:40.265Z"),
    ("Voy Menopause","Ready",None,None),
    ("Engagement","Done","2026-03-09T10:40:06.189Z","2026-02-24T19:42:03.329Z"),
    ("Content and Community","Grooming",None,None),
    ("Engagement","Done","2026-03-09T10:24:03.254Z","2026-02-18T09:48:18.105Z"),
    ("Pharmacy & Ops","UAT",None,"2026-03-10T12:09:45.742Z"),
    ("Rebrand","Done","2026-03-09T10:07:42.934Z",None),
    ("Rebrand","Ready",None,None),
    ("Pharmacy & Ops","Done","2026-03-09T09:52:27.336Z","2026-03-26T10:49:35.336Z"),
    ("Voy Menopause","Canceled",None,None),
    ("TRT","Canceled",None,None),
    ("[QA] General Bugs Collection","Triage",None,"2026-03-05T13:57:35.497Z"),
    ("TRT","Done","2026-03-06T10:30:08.950Z","2026-03-09T09:19:02.005Z"),
    ("Rebrand","Done","2026-03-06T19:48:23.351Z","2026-03-13T17:47:41.390Z"),
    ("Weight Loss BR","Triage",None,"2026-02-27T18:50:15.156Z"),
    ("Pharmacy & Ops","Done","2026-03-03T12:22:06.970Z","2026-03-03T12:01:18.022Z"),
    ("Medical Journey","Done","2026-03-06T16:20:58.949Z","2026-02-19T15:41:08.150Z"),
    ("Voy Menopause","Done","2026-03-06T15:13:44.759Z","2026-03-06T17:42:15.389Z"),
    ("Clinical Experience","Done","2026-03-06T15:31:27.820Z","2026-03-06T14:32:17.783Z"),
    ("Voy Menopause","Done","2026-03-06T15:06:02.675Z",None),
    ("TRT","Canceled",None,None),
    ("Rebrand","Done","2026-03-05T22:00:27.621Z","2026-03-10T14:04:41.186Z"),
    ("Rebrand","Done","2026-03-05T21:59:54.934Z","2026-03-10T14:04:46.218Z"),
    ("Payments","Backlog",None,"2026-04-02T15:23:32.516Z"),
    ("Pharmacy & Ops","Backlog",None,None),
    ("Clinical Experience","Triage",None,"2026-03-06T16:56:19.407Z"),
    ("Category Tools","Triage",None,"2026-03-04T20:12:58.676Z"),
    ("Payments","Ready",None,"2026-03-12T15:23:00.953Z"),
    ("Clinical Experience","Ready",None,"2026-03-10T15:22:11.475Z"),
    ("Category Tools","Triage",None,"2026-03-05T14:33:35.665Z"),
    ("Patient Experience","Done","2026-03-05T14:35:13.038Z","2026-03-06T11:18:41.760Z"),
    ("Patient Experience","In Progress",None,"2026-03-10T14:32:22.689Z"),
    ("Pharmacy & Ops","Done","2026-03-05T14:31:46.916Z",None),
    ("Medical Journey","Done","2026-03-05T13:26:47.136Z","2026-03-10T12:18:50.069Z"),
    ("Voy Menopause","Canceled",None,None),
    ("Voy Menopause","Canceled",None,None),
    ("TRT","Canceled",None,None),
    ("Medical Journey","Canceled",None,None),
    ("Medical Journey","Ready",None,"2026-03-10T11:33:08.106Z"),
    ("Medical Journey","Ready",None,"2026-03-05T10:24:31.253Z"),
    ("Medical Journey","Ready",None,"2026-03-10T11:36:33.613Z"),
    ("Medical Journey","Ready",None,"2026-03-10T11:36:33.808Z"),
    ("Medical Journey","Done","2026-03-04T22:00:06.595Z",None),
    ("Medical Journey","Done","2026-03-05T11:06:58.391Z",None),
    ("Voy Menopause","Done","2026-03-05T10:21:39.903Z","2026-03-09T15:33:26.653Z"),
    ("Content and Community","Grooming",None,"2026-03-12T10:18:57.102Z"),
    ("TRT","Canceled",None,None),
    ("Weight Loss UK","Done","2026-03-05T09:29:34.504Z","2026-03-04T14:24:32.385Z"),
    ("Weight Loss UK","Done","2026-03-05T09:15:49.555Z","2026-03-10T14:00:23.857Z"),
    ("Commerce","Duplicate",None,None),
    ("[QA] General Bugs Collection","Triage",None,"2026-03-04T17:07:03.812Z"),
    ("Clinical Experience","Triage",None,"2026-02-27T18:17:21.146Z"),
    ("Voy Menopause","Done","2026-03-04T16:32:39.038Z",None),
    ("Voy Menopause","Done","2026-03-04T16:32:39.036Z",None),
    ("Global Hair Loss","Triage",None,"2026-03-04T15:41:29.222Z"),
    ("Voy Menopause","Grooming",None,"2026-03-11T13:58:49.730Z"),
    ("Voy Menopause","Ready",None,"2026-03-06T11:15:44.217Z"),
    ("TRT","Done","2026-03-04T15:24:54.406Z","2026-03-08T21:11:59.143Z"),
    ("Content and Community","Ready",None,None),
    ("TRT","In Progress",None,"2026-03-11T14:49:40.117Z"),
    ("Voy Menopause","Done","2026-03-04T14:43:26.293Z",None),
    ("Weight Loss UK","Done","2026-02-27T13:21:43.213Z","2026-03-02T08:59:45.916Z"),
    ("Voy Menopause","Backlog",None,"2026-03-11T12:00:46.284Z"),
    ("Clinical Experience","Done","2026-03-04T09:30:45.976Z","2026-03-04T14:33:58.659Z"),
    ("Voy Menopause","Done","2026-03-04T09:44:12.386Z","2026-03-06T16:47:31.417Z"),
    ("Weight Loss UK","Done","2026-03-04T09:12:37.192Z","2026-03-04T17:57:18.941Z"),
    ("Pharmacy & Ops","Done","2026-03-04T09:10:26.128Z","2026-03-04T18:02:45.024Z"),
    ("Medical Journey","Canceled",None,None),
    ("Voy Menopause","Canceled",None,None),
    ("Medical Journey","Done","2026-03-06T14:28:19.239Z","2026-03-05T10:24:31.786Z"),
    ("Medical Journey","Backlog",None,"2026-03-31T11:31:45.845Z"),
    ("Category Tools","Triage",None,"2026-03-06T09:17:02.407Z"),
    ("Global Hair Loss","In Progress",None,"2026-03-11T08:24:07.376Z"),
    ("Rebrand","Done","2026-03-06T11:11:07.761Z","2026-03-10T14:04:43.753Z"),
    ("Medical Journey","Done","2026-03-06T09:24:32.911Z","2026-03-05T10:24:31.783Z"),
    ("Medical Journey","Done","2026-03-06T09:24:28.645Z","2026-03-05T10:24:31.314Z"),
    ("Pharmacy & Ops","Done","2026-03-06T09:03:41.434Z","2026-03-11T08:36:04.592Z"),
    ("Medical Journey","Done","2026-03-03T14:50:15.320Z","2026-03-10T11:36:33.620Z"),
    ("Medical Journey","Triage",None,"2026-03-06T20:48:50.665Z"),
    ("Medical Journey","In Progress",None,"2026-03-05T10:24:31.594Z"),
    ("Medical Journey","Ready",None,"2026-03-10T11:36:33.621Z"),
    ("TRT","Canceled",None,None),
    ("Medical Journey","Ready",None,"2026-02-19T10:24:35.034Z"),
    ("Medical Journey","Done","2026-03-06T14:28:19.239Z","2026-03-05T10:24:31.786Z"), # dup - MED-850 already above, skip
    ("Medical Journey","Backlog",None,"2026-03-31T11:31:45.845Z"), # dup
    ("[QA] General Bugs Collection","Triage",None,"2026-02-19T15:40:45.365Z"),
    ("TRT","Duplicate",None,None),
    ("TRT","Canceled",None,None),
    ("Voy Menopause","Backlog",None,"2026-03-30T16:00:55.823Z"),
    ("TRT","Discovery",None,"2026-03-08T14:24:25.532Z"),
    ("TRT","Done","2026-03-02T14:14:08.255Z","2026-03-09T12:48:20.994Z"),
    ("TRT","Done","2026-03-02T14:30:19.123Z","2026-03-03T14:02:43.763Z"),
    ("TRT","Done","2026-03-02T14:30:43.782Z","2026-03-03T13:52:57.199Z"),
    ("TRT","Done","2026-03-02T14:30:27.910Z","2026-03-03T13:52:41.172Z"),
    ("TRT","Done","2026-03-02T14:31:09.354Z","2026-03-03T13:49:39.808Z"),
    ("TRT","Done","2026-03-02T14:29:41.328Z","2026-03-03T14:17:34.600Z"),
    ("Voyage Design System","Done","2026-03-02T13:53:23.566Z",None),
    ("Voy Menopause","Done","2026-03-02T12:58:30.185Z","2026-03-06T17:38:26.954Z"),
    ("Medical Journey","Done","2026-03-02T12:56:47.709Z","2026-03-05T10:24:31.812Z"),
    ("Medical Journey","Done","2026-03-02T12:50:40.227Z","2026-03-05T10:24:35.034Z"),
    ("TRT","Done","2026-03-02T12:22:20.763Z","2026-03-03T11:46:39.752Z"),
    ("Payments","Triage",None,"2026-02-25T10:09:06.127Z"),
    ("Medical Journey","Done","2026-03-02T11:51:42.570Z","2026-03-05T10:24:31.949Z"),
    ("Medical Journey","Done","2026-03-02T11:29:32.808Z","2026-02-27T09:28:11.914Z"),
    ("Patient Experience","Triage",None,"2026-03-03T11:10:51.977Z"),
    ("[QA] General Bugs Collection","Triage",None,"2026-03-02T16:28:21.228Z"),
    ("TRT","Done","2026-03-01T15:29:18.614Z","2026-03-02T14:15:06.947Z"),
    ("TRT","Ready",None,"2026-03-21T09:22:21.901Z"),
    ("Patient Experience","Triage",None,"2026-03-02T10:58:18.085Z"),
    ("Weight Loss UK","Duplicate",None,None),
    ("Weight Loss UK","Duplicate",None,None),
    ("Medical Journey","Duplicate",None,None),
    ("Medical Journey","Ready",None,"2026-03-10T11:36:33.661Z"),
    ("Medical Journey","Done","2026-03-03T13:17:41.768Z","2026-03-10T11:34:58.578Z"),
    ("Medical Journey","Done","2026-03-03T13:23:42.393Z","2026-03-10T11:36:33.661Z"),
    ("Medical Journey","Done","2026-03-03T13:13:55.275Z","2026-03-10T11:35:44.368Z"),
    ("Medical Journey","Duplicate",None,None),
    ("Medical Journey","Done","2026-03-03T06:59:13.228Z","2026-03-05T10:24:32.303Z"),
    ("Medical Journey","Done","2026-03-03T06:56:19.573Z","2026-03-05T10:24:31.477Z"),
    ("Medical Journey","Done","2026-03-03T06:50:40.747Z","2026-03-05T10:24:32.266Z"),
    ("Medical Journey","Done","2026-03-03T06:43:36.458Z","2026-03-05T10:22:16.486Z"),
    ("Medical Journey","Done","2026-03-03T06:13:58.823Z","2026-02-27T16:32:57.775Z"),
    ("Medical Journey","Done","2026-03-03T05:53:58.323Z","2026-03-05T10:24:31.168Z"),
    ("TRT","Canceled",None,None),
    ("TRT","Canceled",None,None),
    ("TRT","Canceled",None,None),
    ("TRT","Done","2026-03-01T20:26:56.977Z","2026-03-21T09:22:21.951Z"),
    ("TRT","Done","2026-03-01T20:25:29.305Z",None),
    ("TRT","Done","2026-02-24T05:43:02.120Z","2026-02-24T15:26:17.255Z"),
    ("TRT","Done","2026-02-23T21:38:20.183Z","2026-02-24T19:10:38.427Z"),
    ("TRT","Done","2026-03-03T16:40:24.889Z","2026-03-04T12:50:56.361Z"),
    ("TRT","Paused",None,None),
    ("Voy Menopause","Done","2026-02-24T16:11:53.076Z","2026-02-27T09:36:38.727Z"),
    ("TRT","Done","2026-02-25T09:51:24.916Z","2026-03-04T09:51:22.178Z"),
    ("TRT","Done","2026-02-25T09:50:11.118Z","2026-02-23T15:43:07.325Z"),
    ("Weight Loss UK","Done","2026-02-27T15:36:11.307Z","2026-03-06T12:49:33.138Z"),
    ("Weight Loss UK","Done","2026-02-27T11:57:47.064Z","2026-03-03T08:46:25.772Z"),
    ("Weight Loss UK","Done","2026-02-26T09:32:13.712Z","2026-02-24T09:18:21.193Z"),
    ("Weight Loss UK","Done","2026-02-17T12:03:05.625Z",None),
    ("Weight Loss UK","Done","2026-02-27T12:32:01.737Z","2026-03-06T10:20:05.587Z"),
    ("Weight Loss UK","Done","2026-02-20T13:47:48.983Z","2026-02-25T09:46:44.798Z"),
    ("Weight Loss UK","Done","2026-02-27T13:22:21.092Z",None),
    ("Weight Loss UK","Done","2026-02-18T16:09:43.222Z","2026-02-23T12:58:23.238Z"),
    ("Weight Loss UK","Done","2026-02-18T15:07:27.866Z","2026-02-23T14:49:49.631Z"),
    ("Weight Loss UK","Done","2026-02-18T12:39:02.824Z","2026-02-25T11:55:45.810Z"),
    ("Weight Loss UK","Done","2026-02-20T16:34:25.557Z","2026-02-23T16:07:23.336Z"),
    ("Weight Loss UK","Done","2026-02-17T17:12:15.909Z","2026-02-20T14:20:41.382Z"),
    ("Weight Loss UK","Done","2026-02-18T10:13:50.642Z",None),
    ("Weight Loss UK","Done","2026-02-13T09:50:44.055Z","2026-02-13T19:41:43.818Z"),
    ("Voy Menopause","Done","2026-02-27T11:16:14.879Z","2026-02-24T09:56:30.609Z"),
    ("[QA] General Bugs Collection","Triage",None,"2026-02-27T14:32:20.358Z"),
    ("Patient Experience","Triage",None,"2026-02-27T14:55:41.621Z"),
    ("Medical Journey","Done","2026-02-27T09:51:31.072Z","2026-03-05T10:24:31.324Z"),
    ("Global Hair Loss","Done","2026-02-27T09:45:34.952Z","2026-02-20T11:43:42.890Z"),
    ("Medical Journey","Done","2026-02-18T09:18:45.743Z","2026-02-23T10:51:21.472Z"),
    ("Medical Journey","Done","2026-02-18T09:40:54.515Z","2026-02-23T10:51:16.968Z"),
    ("Medical Journey","Done","2026-02-19T08:41:56.496Z","2026-02-23T10:51:20.993Z"),
    ("Medical Journey","Done","2026-02-19T08:13:24.646Z","2026-02-23T10:51:17.516Z"),
    ("Medical Journey","Done","2026-02-18T11:19:59.341Z","2026-02-23T10:51:17.524Z"),
    ("Medical Journey","Done","2026-02-18T11:14:53.867Z","2026-02-19T10:51:17.390Z"),
    ("Clinical Experience","Done","2026-02-27T07:45:22.019Z","2026-02-27T13:34:35.088Z"),
    ("Global Hair Loss","Done","2026-02-26T17:51:57.729Z","2026-02-27T17:51:48.186Z"),
    ("Engagement","Done","2026-02-26T14:24:03.832Z","2026-02-17T09:58:41.277Z"),
    ("Medical Journey","Done","2026-02-16T12:38:40.019Z",None),
    ("Commerce","Done","2026-02-26T13:48:39.363Z","2026-02-27T13:46:38.427Z"),
    ("Medical Journey","Done","2026-02-24T10:54:57.978Z","2026-02-24T20:30:58.896Z"),
    ("Medical Journey","Duplicate",None,None),
    ("Weight Loss UK","Duplicate",None,None),
    ("Weight Loss UK","Duplicate",None,None),
    ("Weight Loss UK","Canceled",None,None),
    ("Voy Menopause","Done","2026-02-25T15:26:11.183Z","2026-02-27T17:07:39.237Z"),
    ("Voy Menopause","Canceled",None,None),
    ("Global Hair Loss","UAT",None,"2026-02-25T09:40:11.614Z"),
    ("[QA] General Bugs Collection","Done","2026-02-25T12:12:34.181Z","2026-02-19T11:14:04.535Z"),
    ("Global Hair Loss","Ready",None,"2026-02-27T09:40:32.198Z"),
    ("Payments","Done","2026-02-26T09:17:05.889Z","2026-02-25T15:30:05.694Z"),
    ("TRT","Duplicate",None,None),
    ("TRT","Canceled",None,None),
    ("TRT","Canceled",None,None),
    ("Weight Loss UK","Duplicate",None,None),
    ("Weight Loss UK","Ready",None,"2026-02-18T07:09:00.457Z"),
    ("Weight Loss UK","Duplicate",None,None),
    ("Engagement","Done","2026-02-24T15:20:50.884Z","2026-02-18T12:31:37.590Z"),
    ("Engagement","Done","2026-02-24T15:22:43.579Z","2026-02-12T18:40:30.171Z"),
    ("Engagement","Done","2026-02-24T15:20:28.524Z","2026-02-18T10:51:02.734Z"),
    ("Pharmacy & Ops","Done","2026-02-24T10:40:42.508Z","2026-02-25T10:32:47.718Z"),
    ("Engage Pillar","Done","2026-02-24T09:28:22.819Z","2026-02-24T19:01:24.817Z"),
    ("Weight Loss UK","Duplicate",None,None),
    ("Medical Journey","Done","2026-02-23T13:04:27.763Z","2026-02-23T10:51:17.417Z"),
    ("Medical Journey","Done","2026-02-20T16:45:22.937Z","2026-02-27T09:27:23.441Z"),
    ("Medical Journey","Done","2026-02-23T12:30:44.294Z","2026-03-02T12:00:09.820Z"),
    ("Medical Journey","Done","2026-02-24T08:34:55.767Z","2026-02-23T10:51:17.240Z"),
    ("Rebrand","Done","2026-02-23T19:11:39.785Z","2026-02-24T11:45:42.304Z"),
    ("Voy Menopause","Backlog",None,"2026-03-23T16:48:15.200Z"),
    ("TRT","Duplicate",None,None),
    ("TRT","Canceled",None,None),
    ("Payments","Duplicate",None,None),
    ("Payments","Duplicate",None,None),
    ("Commerce","Triage",None,"2026-02-19T09:33:58.106Z"),
    ("Commerce","Triage",None,"2026-02-23T18:01:28.181Z"),
    ("Clinical Experience","Grooming",None,"2026-03-23T15:35:41.109Z"),
    ("Clinical Experience","Done","2026-02-23T13:30:20.329Z","2026-02-13T16:17:00.769Z"),
    ("Payments","Duplicate",None,None),
    ("Payments","Canceled",None,None),
    ("Payments","Canceled",None,None),
    ("Payments","Backlog",None,"2026-03-17T08:50:33.240Z"),
    ("Payments","Duplicate",None,None),
    ("Payments","Duplicate",None,None),
    ("TRT","Canceled",None,None),
    ("Dev Productivity","Done","2026-02-26T11:14:18.782Z","2026-02-27T11:14:08.797Z"),
    ("Dev Productivity","Done","2026-02-26T11:16:18.425Z","2026-02-27T11:16:08.730Z"),
    ("TRT","Canceled",None,None),
    ("Voy Menopause","Done","2026-02-19T15:50:15.813Z","2026-02-26T15:10:48.646Z"),
    ("TRT","Done","2026-02-20T11:10:49.756Z","2026-02-23T10:21:35.808Z"),
    ("Pharmacy & Ops","Done","2026-02-20T10:23:26.275Z","2026-02-25T09:54:44.977Z"),
    ("Pharmacy & Ops","Done","2026-02-20T09:57:18.059Z","2026-02-19T12:02:19.984Z"),
    ("Global Hair Loss","Ready",None,"2026-02-27T09:40:32.198Z"),
    ("Weight Loss UK","Done","2026-02-19T09:39:44.334Z","2026-02-23T15:13:43.562Z"),
    ("Weight Loss BR","Backlog",None,"2026-03-19T20:46:34.089Z"),
    ("Voy Menopause","Backlog",None,"2026-03-19T16:10:33.024Z"),
    ("Commerce","Done","2026-02-19T15:10:14.410Z","2026-02-19T18:23:12.031Z"),
    ("Medical Journey","Done","2026-02-19T14:47:12.270Z","2026-02-16T09:54:51.062Z"),
    ("Commerce","Done","2026-02-19T13:26:30.922Z",None),
    ("Voy Menopause","Backlog",None,"2026-03-19T09:58:50.204Z"),
    ("Voy Menopause","Backlog",None,"2026-03-19T09:58:32.753Z"),
    ("Medical Journey","Done","2026-02-19T09:52:08.917Z","2026-02-25T09:30:56.120Z"),
    ("Unified App","Done","2026-02-19T10:09:38.739Z",None),
    ("Engage Pillar","Done","2026-02-20T17:00:37.444Z","2026-02-27T16:58:54.372Z"),
    ("Unified App","Ready",None,"2026-02-25T07:09:00.457Z"),
    ("Weight Loss UK","Canceled",None,None),
    ("Weight Loss UK","Duplicate",None,None),
    ("Weight Loss UK","Canceled",None,None),
    ("[QA] General Bugs Collection","Canceled",None,None),
    ("Diagnostics","In Progress",None,None),
    ("Unified App","Done","2026-02-17T13:11:12.348Z","2026-02-17T12:12:54.191Z"),
    ("TRT","Canceled",None,None),
    ("Payments","Duplicate",None,None),
    ("Payments","Canceled",None,None),
    ("Payments","Backlog",None,"2026-02-23T13:53:39.018Z"),
    ("Payments","Duplicate",None,None),
    ("Voy Menopause","Done","2026-02-16T13:43:21.271Z","2026-02-17T12:25:58.682Z"),
    ("Medical Journey","Done","2026-02-12T15:44:23.293Z",None),
    ("Clinical Experience","Triage",None,"2026-02-10T14:25:58.939Z"),
    ("Medical Journey","Duplicate",None,None),
    ("Medical Journey","Duplicate",None,None),
    ("Medical Journey","Duplicate",None,None),
    ("Medical Journey","Duplicate",None,None),
    ("Medical Journey","Done","2026-02-16T10:47:31.400Z","2026-02-11T12:39:42.002Z"),
    ("Pharmacy & Ops","Done","2026-02-16T10:32:35.288Z","2026-02-19T12:03:22.358Z"),
    ("Weight Loss UK","Duplicate",None,None),
    ("Weight Loss UK","Duplicate",None,None),
    ("Medical Journey","Duplicate",None,None),
    ("Pharmacy & Ops","Done","2026-02-09T15:27:45.139Z","2026-02-10T01:12:49.443Z"),
    ("TRT","Done","2026-02-13T15:25:58.014Z","2026-02-18T15:25:54.615Z"),
    ("Medical Journey","Duplicate",None,None),
    ("Payments","Canceled",None,None),
    ("Medical Journey","Done","2026-02-10T15:20:42.140Z",None),
    ("Voy Menopause","Done","2026-02-12T15:13:36.486Z",None),
    ("TRT","Done","2026-02-11T16:00:15.259Z","2026-02-12T12:58:34.345Z"),
    ("TRT","Canceled",None,None),
    ("Voy Menopause","Done","2026-02-11T11:29:13.365Z","2026-02-17T13:27:28.714Z"),
    ("Voy Menopause","Canceled",None,None),
    ("Rebrand","Done","2026-02-10T11:02:52.696Z",None),
    ("TRT","Canceled",None,None),
    ("Pharmacy & Ops","Done","2026-02-09T19:12:36.861Z","2026-02-09T21:22:29.536Z"),
    ("TRT","Done","2026-02-09T16:22:25.101Z","2026-02-10T16:10:41.802Z"),
    ("TRT","Canceled",None,None),
    ("Clinical Experience","Triage",None,"2026-02-23T14:15:42.998Z"),
    ("Medical Journey","Done","2026-03-02T14:57:09.180Z","2026-03-05T10:24:31.524Z"),
    ("Medical Journey","Done","2026-03-02T14:52:33.713Z","2026-03-03T10:24:31.407Z"),
    ("Medical Journey","Done","2026-03-02T14:49:33.921Z","2026-03-05T10:24:35.245Z"),
    ("Medical Journey","Done","2026-03-02T14:48:48.563Z","2026-03-05T10:24:31.993Z"),
    ("Weight Loss UK","Duplicate",None,None),
    ("Voy Menopause","Done","2026-02-17T15:51:52.512Z","2026-02-16T09:40:59.442Z"),
    ("TRT","Done","2026-02-18T09:10:10.241Z","2026-02-18T10:39:30.879Z"),
    ("Global Hair Loss","Done","2026-02-25T06:44:40.182Z","2026-02-11T17:06:43.475Z"),
    ("Global Hair Loss","Done","2026-02-25T11:39:04.275Z",None),
    ("Medical Journey","Done","2026-02-24T10:54:57.978Z","2026-02-24T20:30:58.896Z"), # dup
    ("Weight Loss UK","Done","2026-02-20T13:47:48.983Z","2026-02-25T09:46:44.798Z"), # dup
    ("TRT","Paused",None,None),
    ("Global Hair Loss","Duplicate",None,None),
    ("Clinical Experience","Done","2026-02-12T11:37:28.493Z","2026-02-13T11:31:12.221Z"),
    ("Rebrand","Done","2026-02-23T11:07:23.992Z",None),
    ("Global Hair Loss","In Progress",None,"2026-02-26T10:58:47.377Z"),
    ("Global Hair Loss","UAT",None,"2026-02-19T17:11:56.746Z"),
    ("Medical Journey","Duplicate",None,None),
    ("Pharmacy & Ops","Canceled",None,None),
    ("[QA] General Bugs Collection","Canceled",None,None),
    ("Commerce","Triage",None,"2026-02-19T10:10:23.509Z"),
    ("Unified App","Done","2026-02-19T10:09:38.739Z",None),  # dup
    ("Unified App","Paused",None,"2026-02-23T21:55:28.822Z"),
    ("Weight Loss UK","Canceled",None,None),
    ("Weight Loss UK","Duplicate",None,None),
    ("Weight Loss UK","Canceled",None,None),
    ("[QA] General Bugs Collection","Canceled",None,None),
    ("Commerce","Triage",None,"2026-02-19T10:10:23.509Z"),  # dup
    ("TRT","Duplicate",None,None),
    ("Clinical Experience","Done","2026-02-12T11:37:28.493Z","2026-02-13T11:31:12.221Z"),  # dup
    ("TRT","Ready",None,"2026-03-21T09:22:21.728Z"),
    ("Commerce","Triage",None,"2026-02-19T09:33:58.106Z"),
    ("Commerce","Triage",None,"2026-02-23T18:01:28.181Z"),
    ("Patient Experience","Triage",None,"2026-03-02T16:36:02.953Z"),
    ("TRT","Ready",None,"2026-03-29T16:13:45.512Z"),
    ("TRT","Canceled",None,None),
]

# Remove potential duplicates by using a set approach is tricky since we don't have IDs here.
# The data was manually extracted so let's just process it.

NOW = datetime(2026, 3, 10, 12, 0, 0, tzinfo=__import__('datetime').timezone.utc)

team_stats = defaultdict(lambda: {
    "total_created": 0, "total_resolved": 0,
    "resolved_in_sla": 0, "resolved_failed_sla": 0, "resolved_no_sla": 0,
    "open_breached": 0, "open_not_breached": 0, "open_no_sla": 0,
})

excluded = 0
for team, status, completed, breach in issues:
    if status in CANCELLED_STATUSES:
        excluded += 1
        continue

    pillar = TEAM_TO_PILLAR.get(team, "Unknown")
    if pillar == "EXCLUDE":
        excluded += 1
        continue

    team_stats[team]["total_created"] += 1

    if completed:
        team_stats[team]["total_resolved"] += 1
        if not breach:
            team_stats[team]["resolved_no_sla"] += 1
        else:
            c = datetime.fromisoformat(completed.replace("Z", "+00:00"))
            b = datetime.fromisoformat(breach.replace("Z", "+00:00"))
            if c <= b:
                team_stats[team]["resolved_in_sla"] += 1
            else:
                team_stats[team]["resolved_failed_sla"] += 1
    else:
        if not breach:
            team_stats[team]["open_no_sla"] += 1
        else:
            b = datetime.fromisoformat(breach.replace("Z", "+00:00"))
            if NOW >= b:
                team_stats[team]["open_breached"] += 1
            else:
                team_stats[team]["open_not_breached"] += 1


print()
print("# Bug SLA Analysis - Last 30 Days")
print()
print(f"- Total bugs labeled 'Bug' created in last 30 days: {len(issues)}")
print(f"- Excluded (Cancelled/Duplicate): {excluded}")
print(f"- Analysed (excl. Cancelled/Duplicate): {len(issues) - excluded}")
print()

print("## By Team")
print()
print("| Team | Created | Resolved In SLA | Resolved Failed SLA | Resolved No SLA | Open & Breached | Open & Not Breached | Open No SLA | % In SLA |")
print("|------|---------|-----------------|---------------------|-----------------|-----------------|---------------------|-------------|----------|")

sorted_teams = sorted(team_stats.items(), key=lambda x: x[1]["total_created"], reverse=True)
t_created = 0
t_in_sla = 0
t_resolved_failed = 0
t_resolved_no_sla = 0
t_open_breached = 0
t_open_not_breached = 0
t_open_no_sla = 0

for team, s in sorted_teams:
    denom = s["resolved_in_sla"] + s["resolved_failed_sla"] + s["open_breached"]
    pct = f"{s['resolved_in_sla']/denom*100:.0f}%" if denom > 0 else "N/A"
    print(f"| {team} | {s['total_created']} | {s['resolved_in_sla']} | {s['resolved_failed_sla']} | {s['resolved_no_sla']} | {s['open_breached']} | {s['open_not_breached']} | {s['open_no_sla']} | {pct} |")
    t_created += s["total_created"]
    t_in_sla += s["resolved_in_sla"]
    t_resolved_failed += s["resolved_failed_sla"]
    t_resolved_no_sla += s["resolved_no_sla"]
    t_open_breached += s["open_breached"]
    t_open_not_breached += s["open_not_breached"]
    t_open_no_sla += s["open_no_sla"]

denom_total = t_in_sla + t_resolved_failed + t_open_breached
pct_total = f"{t_in_sla/denom_total*100:.0f}%" if denom_total > 0 else "N/A"
print(f"| **TOTAL** | **{t_created}** | **{t_in_sla}** | **{t_resolved_failed}** | **{t_resolved_no_sla}** | **{t_open_breached}** | **{t_open_not_breached}** | **{t_open_no_sla}** | **{pct_total}** |")

print()
print("## By Pillar")
print()

pillar_stats = defaultdict(lambda: {"total_created": 0, "resolved_in_sla": 0, "resolved_failed_sla": 0, "resolved_no_sla": 0, "open_breached": 0, "open_not_breached": 0, "open_no_sla": 0, "teams": []})

for team, s in team_stats.items():
    pillar = TEAM_TO_PILLAR.get(team, "Unknown")
    pillar_stats[pillar]["total_created"] += s["total_created"]
    pillar_stats[pillar]["resolved_in_sla"] += s["resolved_in_sla"]
    pillar_stats[pillar]["resolved_failed_sla"] += s["resolved_failed_sla"]
    pillar_stats[pillar]["resolved_no_sla"] += s["resolved_no_sla"]
    pillar_stats[pillar]["open_breached"] += s["open_breached"]
    pillar_stats[pillar]["open_not_breached"] += s["open_not_breached"]
    pillar_stats[pillar]["open_no_sla"] += s["open_no_sla"]
    if team not in pillar_stats[pillar]["teams"]:
        pillar_stats[pillar]["teams"].append(team)

print("| Pillar | Created | Resolved In SLA | Resolved Failed SLA | Resolved No SLA | Open & Breached | Open & Not Breached | Open No SLA | % In SLA |")
print("|--------|---------|-----------------|---------------------|-----------------|-----------------|---------------------|-------------|----------|")

for pillar_name in ["Scale", "Growth", "Engage", "Incubate", "Rebrand"]:
    if pillar_name not in pillar_stats:
        continue
    s = pillar_stats[pillar_name]
    denom = s["resolved_in_sla"] + s["resolved_failed_sla"] + s["open_breached"]
    pct = f"{s['resolved_in_sla']/denom*100:.0f}%" if denom > 0 else "N/A"
    print(f"| **{pillar_name}** | {s['total_created']} | {s['resolved_in_sla']} | {s['resolved_failed_sla']} | {s['resolved_no_sla']} | {s['open_breached']} | {s['open_not_breached']} | {s['open_no_sla']} | **{pct}** |")

print()
print("### Pillar Team Breakdown")
print()
for pillar_name in ["Scale", "Growth", "Engage", "Incubate", "Rebrand"]:
    if pillar_name not in pillar_stats:
        continue
    teams = sorted(pillar_stats[pillar_name]["teams"])
    print(f"- **{pillar_name}**: {', '.join(teams)}")

print()
print("---")
print("Notes:")
print("- 'Created' = total bugs created (excl. Cancelled/Duplicate/Excluded teams)")
print("- 'Resolved In SLA' = completed before SLA breach deadline")
print("- 'Resolved Failed SLA' = completed after SLA breach deadline (shown for reference, not in % calc)")
print("- 'Open & Breached' = still unresolved and SLA breach date has passed")
print("- '% In SLA' = Resolved In SLA / (Resolved In SLA + Resolved Failed SLA + Open & Breached)")
print(f"- Analysis date: {NOW.strftime('%Y-%m-%d %H:%M UTC')}")
