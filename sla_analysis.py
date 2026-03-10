import json
from datetime import datetime
from collections import defaultdict

CANCELLED_STATUSES = {"Canceled", "Cancelled", "Duplicate"}

TEAM_TO_PILLAR = {
    "Weight Loss UK": "Scale Pillar",
    "Weight Loss BR": "Scale Pillar",
    "WL DE Migration": "Scale Pillar",
    "Global Hair Loss": "Scale Pillar",
    "Voy Menopause": "Scale Pillar",
    "TRT": "Scale Pillar",
    "Commerce": "Scale Pillar",
    "Payments": "Scale Pillar",
    "Medical Journey": "Scale Pillar",
    "Clinical Experience": "Scale Pillar",
    "Pharmacy & Ops": "Scale Pillar",
    "Patient Experience": "Scale Pillar",
    "Category Tools": "Scale Pillar",
    "Diagnostics": "Scale Pillar",

    "Engagement": "Engage Pillar",
    "Content and Community": "Engage Pillar",
    "Engage Pillar": "Engage Pillar",

    "Unified App": "Growth Pillar",
    "Rebrand": "Growth Pillar",
    "Growth Pillar": "Growth Pillar",
    "Growth Marketing Platform": "Growth Pillar",
    "Organic": "Growth Pillar",
    "RAF": "Growth Pillar",

    "Dev Productivity": "Incubate Pillar",
    "Security": "Incubate Pillar",
    "Observability": "Incubate Pillar",
    "Incubate Pillar": "Incubate Pillar",
    "Voyage Design System": "Incubate Pillar",

    "[QA] General Bugs Collection": "Unassigned Pillar",
}

issues = ISSUES_DATA  # placeholder

total_bugs = 0
excluded_cancelled_duplicate = 0
excluded_open_sla = 0
no_sla = 0

team_stats = defaultdict(lambda: {"total_resolved": 0, "resolved_in_sla": 0, "resolved_failed_sla": 0, "resolved_no_sla": 0, "total_created": 0})

for issue in issues:
    status = issue.get("status", "")
    if status in CANCELLED_STATUSES:
        excluded_cancelled_duplicate += 1
        continue

    total_bugs += 1
    team = issue.get("team", "Unknown")
    team_stats[team]["total_created"] += 1

    completed_at = issue.get("completedAt")
    if not completed_at:
        excluded_open_sla += 1
        continue

    team_stats[team]["total_resolved"] += 1

    sla_breaches_at = issue.get("slaBreachesAt")
    if not sla_breaches_at:
        team_stats[team]["resolved_no_sla"] += 1
        no_sla += 1
        continue

    completed_dt = datetime.fromisoformat(completed_at.replace("Z", "+00:00"))
    breach_dt = datetime.fromisoformat(sla_breaches_at.replace("Z", "+00:00"))

    if completed_dt <= breach_dt:
        team_stats[team]["resolved_in_sla"] += 1
    else:
        team_stats[team]["resolved_failed_sla"] += 1

print("=" * 100)
print("BUG SLA ANALYSIS - Last 30 Days")
print("=" * 100)
print(f"\nTotal bugs created (excl. Cancelled/Duplicate): {total_bugs}")
print(f"Excluded (Cancelled/Duplicate): {excluded_cancelled_duplicate}")
print(f"Still open (ignored): {excluded_open_sla}")
print()

print("=" * 100)
print("BY TEAM")
print("=" * 100)
print(f"{'Team':<35} {'Created':>8} {'Resolved':>9} {'In SLA':>8} {'Failed':>8} {'No SLA':>8} {'% In SLA':>10}")
print("-" * 100)

sorted_teams = sorted(team_stats.items(), key=lambda x: x[1]["total_created"], reverse=True)
for team, stats in sorted_teams:
    resolved_with_sla = stats["resolved_in_sla"] + stats["resolved_failed_sla"]
    pct = f"{stats['resolved_in_sla']/resolved_with_sla*100:.0f}%" if resolved_with_sla > 0 else "N/A"
    print(f"{team:<35} {stats['total_created']:>8} {stats['total_resolved']:>9} {stats['resolved_in_sla']:>8} {stats['resolved_failed_sla']:>8} {stats['resolved_no_sla']:>8} {pct:>10}")

print()
print("=" * 100)
print("BY PILLAR")
print("=" * 100)

pillar_stats = defaultdict(lambda: {"total_created": 0, "total_resolved": 0, "resolved_in_sla": 0, "resolved_failed_sla": 0, "resolved_no_sla": 0, "teams": set()})

for team, stats in team_stats.items():
    pillar = TEAM_TO_PILLAR.get(team, "Unknown Pillar")
    pillar_stats[pillar]["total_created"] += stats["total_created"]
    pillar_stats[pillar]["total_resolved"] += stats["total_resolved"]
    pillar_stats[pillar]["resolved_in_sla"] += stats["resolved_in_sla"]
    pillar_stats[pillar]["resolved_failed_sla"] += stats["resolved_failed_sla"]
    pillar_stats[pillar]["resolved_no_sla"] += stats["resolved_no_sla"]
    pillar_stats[pillar]["teams"].add(team)

print(f"{'Pillar':<25} {'Created':>8} {'Resolved':>9} {'In SLA':>8} {'Failed':>8} {'No SLA':>8} {'% In SLA':>10}")
print("-" * 100)

for pillar in ["Scale Pillar", "Engage Pillar", "Growth Pillar", "Incubate Pillar", "Unassigned Pillar", "Unknown Pillar"]:
    if pillar not in pillar_stats:
        continue
    stats = pillar_stats[pillar]
    resolved_with_sla = stats["resolved_in_sla"] + stats["resolved_failed_sla"]
    pct = f"{stats['resolved_in_sla']/resolved_with_sla*100:.0f}%" if resolved_with_sla > 0 else "N/A"
    teams_list = ", ".join(sorted(stats["teams"]))
    print(f"{pillar:<25} {stats['total_created']:>8} {stats['total_resolved']:>9} {stats['resolved_in_sla']:>8} {stats['resolved_failed_sla']:>8} {stats['resolved_no_sla']:>8} {pct:>10}")
    print(f"  Teams: {teams_list}")
    print()
