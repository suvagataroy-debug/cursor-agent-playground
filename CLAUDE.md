# Bug SLA Analysis - Claude Code Instructions

## What This Project Does

Analyses how many bugs were created in Linear in the last 30 days, grouped by team and pillar, and calculates the % resolved within SLA.

## How To Run The Weekly Analysis

When asked to "run the weekly bug SLA analysis", follow these steps exactly:

### Step 1: Fetch all Bug issues from Linear (last 30 days)

Use the Linear MCP tool `list_issues` to fetch all issues with the "Bug" label created in the last 30 days. Paginate through all results (use `limit: 250` and follow `cursor` for subsequent pages until `hasNextPage` is false).

```
label: "Bug"
createdAt: "-P30D"
limit: 250
```

### Step 2: Save the issues to JSON

From each issue, extract these fields and save to `scripts/issues.json`:

```json
[
  {
    "team": "<issue.team>",
    "status": "<issue.status>",
    "completedAt": "<issue.completedAt or null>",
    "slaBreachesAt": "<issue.slaBreachesAt or null>"
  }
]
```

Include ALL issues from ALL pages. Do not filter at this stage.

### Step 3: Run the analysis script

```bash
python3 scripts/analyze_sla.py scripts/issues.json scripts/sla_config.json
```

### Step 4: Present the results

Show the full output to the user. Highlight:
- The pillar table (sorted by % In SLA descending)
- The team table
- Any teams at 0% or with high Open & Breached counts

## Configuration

### Pillar Mapping (`scripts/sla_config.json`)

Teams are grouped into pillars. Edit `scripts/sla_config.json` to change:

- **pillar_mapping**: Which teams belong to which pillar
- **excluded_teams**: Teams to exclude entirely from the analysis
- **excluded_statuses**: Statuses to exclude (Canceled, Duplicate)
- **bug_label**: The label name to filter on (default: "Bug")
- **lookback_days**: Number of days to look back (default: 30)

### Current Pillar Composition

- **Scale**: Clinical Experience, Pharmacy & Ops, Commerce, Payments, Category Tools, Patient Experience, Dev Productivity
- **Growth**: Unified App, TRT, Weight Loss UK, Global Hair Loss, Weight Loss BR
- **Engage**: Engagement, Content and Community, Engage Pillar, Medical Journey
- **Incubate**: Voy Menopause, Diagnostics
- **Rebrand**: Rebrand
- **Excluded**: [QA] General Bugs Collection, Voyage Design System

## SLA % Formula

```
% In SLA = Resolved In SLA / (Resolved In SLA + Resolved Failed SLA + Open & Breached)
```

Where:
- **Resolved In SLA**: Bug completed before the SLA breach deadline
- **Resolved Failed SLA**: Bug completed after the SLA breach deadline
- **Open & Breached**: Bug still unresolved and SLA breach date has already passed

Bugs with no SLA set and bugs still open within their SLA window are shown in separate columns but do not affect the % calculation.

## Files

- `CLAUDE.md` - This file (instructions for Claude Code)
- `scripts/sla_config.json` - Pillar mappings and configuration
- `scripts/analyze_sla.py` - Analysis script (reads issues.json + config, outputs markdown report)
- `scripts/issues.json` - Generated at runtime (raw issue data from Linear)
- `scripts/weekly_sla_prompt.md` - The prompt to use with Claude Code
