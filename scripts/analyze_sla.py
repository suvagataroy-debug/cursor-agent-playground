#!/usr/bin/env python3
"""
Bug SLA Analysis Script.

Reads a JSON file of Linear issues (exported by Claude Code) and a config file
with pillar mappings, then outputs a markdown report.

Usage:
    python3 scripts/analyze_sla.py scripts/issues.json scripts/sla_config.json
"""
import json
import sys
from collections import defaultdict
from datetime import datetime, timezone


def load_config(config_path):
    with open(config_path) as f:
        return json.load(f)


def build_team_to_pillar(config):
    mapping = {}
    for pillar, teams in config["pillar_mapping"].items():
        for team in teams:
            mapping[team] = pillar
    for team in config.get("excluded_teams", []):
        mapping[team] = "EXCLUDE"
    return mapping


def analyze(issues, config):
    team_to_pillar = build_team_to_pillar(config)
    excluded_statuses = set(config.get("excluded_statuses", []))
    now = datetime.now(timezone.utc)

    stats_template = lambda: {
        "total_created": 0,
        "resolved_in_sla": 0,
        "resolved_failed_sla": 0,
        "resolved_no_sla": 0,
        "open_breached": 0,
        "open_not_breached": 0,
        "open_no_sla": 0,
    }

    team_stats = defaultdict(stats_template)
    total_issues = len(issues)
    excluded_count = 0

    for issue in issues:
        status = issue.get("status", "")
        team = issue.get("team", "Unknown")
        completed_at = issue.get("completedAt")
        sla_breaches_at = issue.get("slaBreachesAt")

        if status in excluded_statuses:
            excluded_count += 1
            continue

        pillar = team_to_pillar.get(team, "Unknown")
        if pillar == "EXCLUDE":
            excluded_count += 1
            continue

        team_stats[team]["total_created"] += 1

        if completed_at:
            if not sla_breaches_at:
                team_stats[team]["resolved_no_sla"] += 1
            else:
                c = datetime.fromisoformat(completed_at.replace("Z", "+00:00"))
                b = datetime.fromisoformat(sla_breaches_at.replace("Z", "+00:00"))
                if c <= b:
                    team_stats[team]["resolved_in_sla"] += 1
                else:
                    team_stats[team]["resolved_failed_sla"] += 1
        else:
            if not sla_breaches_at:
                team_stats[team]["open_no_sla"] += 1
            else:
                b = datetime.fromisoformat(sla_breaches_at.replace("Z", "+00:00"))
                if now >= b:
                    team_stats[team]["open_breached"] += 1
                else:
                    team_stats[team]["open_not_breached"] += 1

    return team_stats, team_to_pillar, total_issues, excluded_count, now


def calc_pct(s):
    denom = s["resolved_in_sla"] + s["resolved_failed_sla"] + s["open_breached"]
    if denom == 0:
        return "N/A"
    return f"{s['resolved_in_sla'] / denom * 100:.0f}%"


def print_report(team_stats, team_to_pillar, total_issues, excluded_count, now, config):
    analysed = total_issues - excluded_count

    print()
    print("# Bug SLA Analysis - Last 30 Days")
    print()
    print(f"- Total bugs labeled 'Bug' created in last {config.get('lookback_days', 30)} days: {total_issues}")
    print(f"- Excluded (Cancelled/Duplicate/Excluded teams): {excluded_count}")
    print(f"- Analysed: {analysed}")
    print()

    # --- By Team ---
    print("## By Team")
    print()
    print("| Team | Created | Resolved In SLA | Resolved Failed SLA | Resolved No SLA | Open & Breached | Open & Not Breached | Open No SLA | % In SLA |")
    print("|------|---------|-----------------|---------------------|-----------------|-----------------|---------------------|-------------|----------|")

    sorted_teams = sorted(team_stats.items(), key=lambda x: x[1]["total_created"], reverse=True)

    totals = defaultdict(int)
    for team, s in sorted_teams:
        pct = calc_pct(s)
        print(f"| {team} | {s['total_created']} | {s['resolved_in_sla']} | {s['resolved_failed_sla']} | {s['resolved_no_sla']} | {s['open_breached']} | {s['open_not_breached']} | {s['open_no_sla']} | {pct} |")
        for k, v in s.items():
            totals[k] += v

    pct_total = calc_pct(totals)
    print(f"| **TOTAL** | **{totals['total_created']}** | **{totals['resolved_in_sla']}** | **{totals['resolved_failed_sla']}** | **{totals['resolved_no_sla']}** | **{totals['open_breached']}** | **{totals['open_not_breached']}** | **{totals['open_no_sla']}** | **{pct_total}** |")

    # --- By Pillar ---
    print()
    print("## By Pillar")
    print()

    pillar_stats = defaultdict(lambda: defaultdict(int))
    pillar_teams = defaultdict(list)

    for team, s in team_stats.items():
        pillar = team_to_pillar.get(team, "Unknown")
        for k, v in s.items():
            pillar_stats[pillar][k] += v
        pillar_teams[pillar].append(team)

    pillar_order = list(config["pillar_mapping"].keys())

    print("| Pillar | Created | Resolved In SLA | Resolved Failed SLA | Resolved No SLA | Open & Breached | Open & Not Breached | Open No SLA | % In SLA |")
    print("|--------|---------|-----------------|---------------------|-----------------|-----------------|---------------------|-------------|----------|")

    for pillar_name in pillar_order:
        if pillar_name not in pillar_stats:
            continue
        s = pillar_stats[pillar_name]
        pct = calc_pct(s)
        print(f"| **{pillar_name}** | {s['total_created']} | {s['resolved_in_sla']} | {s['resolved_failed_sla']} | {s['resolved_no_sla']} | {s['open_breached']} | {s['open_not_breached']} | {s['open_no_sla']} | **{pct}** |")

    print()
    print("### Pillar Team Breakdown")
    print()
    for pillar_name in pillar_order:
        if pillar_name not in pillar_teams:
            continue
        teams = sorted(pillar_teams[pillar_name])
        print(f"- **{pillar_name}**: {', '.join(teams)}")

    print()
    print("---")
    print("Notes:")
    print("- 'Created' = total bugs created (excl. Cancelled/Duplicate/Excluded teams)")
    print("- 'Resolved In SLA' = completed before SLA breach deadline")
    print("- 'Resolved Failed SLA' = completed after SLA breach deadline")
    print("- 'Resolved No SLA' = completed but had no SLA set")
    print("- 'Open & Breached' = still unresolved and SLA breach date has passed")
    print("- 'Open & Not Breached' = still unresolved but SLA breach date has not passed yet")
    print("- 'Open No SLA' = still unresolved with no SLA set")
    print("- '% In SLA' = Resolved In SLA / (Resolved In SLA + Resolved Failed SLA + Open & Breached)")
    print(f"- Analysis date: {now.strftime('%Y-%m-%d %H:%M UTC')}")


def main():
    if len(sys.argv) < 3:
        print("Usage: python3 analyze_sla.py <issues.json> <sla_config.json>", file=sys.stderr)
        sys.exit(1)

    issues_path = sys.argv[1]
    config_path = sys.argv[2]

    with open(issues_path) as f:
        issues = json.load(f)

    config = load_config(config_path)

    team_stats, team_to_pillar, total_issues, excluded_count, now = analyze(issues, config)
    print_report(team_stats, team_to_pillar, total_issues, excluded_count, now, config)


if __name__ == "__main__":
    main()
