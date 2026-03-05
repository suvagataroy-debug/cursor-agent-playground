# WL BR Weekly Update — March 5, 2026

---

## Shipped This Week

### Projects Completed

| Project | Lead | Status |
|---------|------|--------|
| [Experiment] Mounjaro Pharmacy Price Match | Alberto Pena Pereira Timóteo | Completed |
| [Experiment] Price Communication | Jefferson Iyobosa | Completed |

### Issues Completed (Feb 27 – Mar 5)

| Issue | Summary | Assignee | Done |
|-------|---------|----------|------|
| WLBR-358 | Clean up quiz-glp1-start experiment | Jefferson Iyobosa | Mar 5 |
| WLBR-338 | Add tracking to discount error toast | Jefferson Iyobosa | Mar 5 |
| WLBR-368 | Apply new Mounjaro Longer Plans + Pharmacy Price Match as main offering | Marcelo Canabrava | Mar 4 |
| WLBR-363 | Wegovy Bundle | Alberto Pena | Mar 4 |
| WLBR-288 | Provide user feedback on missing checkout information | Jefferson Iyobosa | Mar 4 |
| WLBR-306 | Clean up pharmacy picking experiment from code | Jefferson Iyobosa | Mar 4 |
| WLBR-360 | Rollout checkoutRevamp variant-1 as default flow | Jefferson Iyobosa | Mar 4 |
| WLBR-366 | Remove "farmácia de manipulação" in the LP | Julio Mendes | Mar 4 |
| WLBR-359 | Clean up questionnaire-narrative experiment | Jefferson Iyobosa | Mar 4 |
| WLBR-339 | Improve error logs on Payment Step | Alberto Pena | Mar 3 |
| WLBR-242 | Spike – add user telephone and email to user_data JSON | Luiz Carlos | Mar 3 |
| WLBR-278 | Fix checkout and recommendation communication | Luiz Carlos | Mar 2 |
| WLBR-317 | Fix CVE-2026-26278 fast-xml-parser vulnerability | — | Feb 27 |
| WLBR-256 | Implement unboxing flow | Alberto Pena | Feb 27 |
| WLBR-114 | Fix duplicated tracking events | Luiz Carlos | Feb 27 |
| WLBR-334 | Alert for variant tracking exceptions | Alberto Pena | Feb 27 |

**Highlights:**
- Mounjaro Pharmacy Price Match experiment concluded and new pricing rolled out as the main offering.
- Checkout Revamp variant-1 declared winner and deployed as the default checkout flow.
- Several experiment clean-ups shipped (quiz-glp1-start, questionnaire-narrative, pharmacy picking) — reducing tech debt.
- Unboxing flow implemented and live.
- Key tracking improvements landed (duplicated events fix, error logs on payment step, discount error toast tracking).

---

## In Progress

### Active Projects

| Project | Lead | Target Date | Status |
|---------|------|-------------|--------|
| Mounjaro Price Match offer for all | — | **Mar 6** | In Progress |
| [Experiment] Cancelation Flow Revamp | Alberto Pena | **Mar 6** | In Progress |
| [Experiment] Checkout Revamp with benefits | Luiz Carlos | **Mar 8** | In Progress |
| Wegovy Promo 0.25 + 0.5mg | — | **Mar 9** | In Progress |
| [Experiment] Protocolo Voy+ | — | Start Mar 8 | In Progress |
| [Experiment] Wegovy Longer Plans v1 | — | Start Mar 16 | In Progress |
| Facebook data integration improvements | Anne Lesinhovski | Feb 16 (overdue) | In Progress |

### Active Issues

| Issue | Summary | Assignee | Status |
|-------|---------|----------|--------|
| WLBR-369 | Wegovy Bundle – Logged Area + Unboxing updates | Alberto Pena | In Progress |
| WLBR-160 | Update banner inside logged area (RAF Q1) | Luiz Carlos | In Progress |
| WLBR-258 | Scope Cancelation Flow phase 3 and 4 | Marcelo Canabrava | In Progress |
| WLBR-290 | Improve delivery information on checkout | Luiz Carlos | Code Review |
| WLBR-270 | Fix – password requested when user has never registered | Luiz Carlos | Code Review |
| WLBR-293 | Send tags for value proposition experiment | Luiz Carlos | Paused |
| WLBR-294 | Add CTA "Agende sua consulta médica" after Body Pic upload | Luiz Carlos | Paused |

---

## Due in the Next 2 Weeks (Mar 5 – Mar 19)

### Project Deadlines

| Project | Target Date | Status | Notes |
|---------|-------------|--------|-------|
| Mounjaro Price Match offer for all | **Mar 6** | In Progress | Due tomorrow |
| [Experiment] Cancelation Flow Revamp | **Mar 6** | In Progress | Due tomorrow |
| [Experiment] Checkout Revamp with benefits | **Mar 8** | In Progress | Due this weekend |
| Wegovy Promo 0.25 + 0.5mg | **Mar 9** | In Progress | Due next week |

### Projects Starting Soon

| Project | Start Date | Target Date | Lead |
|---------|------------|-------------|------|
| [Experiment] Multiple Checkout Changes | Mar 9 | Mar 23 | — |
| [MKT] RAF Q1 | Mar 9 | — | Marcelo Canabrava |
| Change dosage flow | Mar 9 | Mar 27 | Julio Mendes |
| [Experiment] Protocolo Voy+ | Mar 8 | — | — |
| [Experiment] Wegovy Longer Plans v1 | Mar 16 | — | — |
| [Experiment] LP CTA | Mar 17 | Mar 31 | Marcelo Canabrava |

---

## Key Takeaways

1. **Big wins this week:** Mounjaro Pharmacy Price Match pricing went live as the default offering, and the Checkout Revamp variant-1 was rolled out to all users after a successful experiment.
2. **Upcoming deadlines:** Cancelation Flow Revamp and Mounjaro Price Match "offer for all" projects are due **tomorrow (Mar 6)** — these need close attention.
3. **Heavy sprint ahead:** Three projects kick off on **Mar 9** (Multiple Checkout Changes, RAF Q1, Change dosage flow) alongside ongoing Wegovy Promo work.
4. **Risks:** Facebook data integration improvements project is **overdue** (original target Feb 16). The value proposition experiment work (WLBR-293 / WLBR-294) is paused pending Mounjaro offering rollout.
