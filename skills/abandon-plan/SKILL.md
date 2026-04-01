---
name: abandon-plan
description: "Retire a plan document that should not be executed by documenting why it was abandoned and moving it from `doc/plans/` to `doc/abandoned_plans/`. Use when asked to abandon, retire, cancel, or archive a plan."
---

# Abandon Plan

## Overview

Close out plans that are no longer valid while preserving clear historical context.
Always leave an explicit abandonment reason in the plan before archiving it.

## Abandonment Workflow

1. Identify the target plan under `doc/plans/`.
2. Confirm the abandonment reason from user request or discovered blockers.
3. Update the plan file by adding a short abandonment note near the top:
   - `**ABANDONED YYYY-MM-DD**: <reason>`
   - Include replacement plan path when one exists.
4. Preserve the original technical content below the abandonment note for history.
5. Move the plan to `doc/abandoned_plans/`.
6. Use filename `YYYYMMDD_<original-name>.md` when no date prefix exists.
7. If filename already has a `YYYYMMDD_` prefix, keep it unchanged.
8. Commit and push the abandonment change set.

## Repository-Specific Rules

- Never delete abandoned plans; move them to `doc/abandoned_plans/`.
- Keep abandonment reasons concrete and technical, not generic.
- Include references to replacement plans when applicable.
- Never use `git add .` or `git add -A`; stage explicit files only.
- Commit and push plan file changes after the move.

## Output Contract

After abandoning a plan, report:

```md
Abandoned Plan
- Source: `doc/plans/<file>.md`
- Destination: `doc/abandoned_plans/<file>.md`

Reason Recorded
- <exact abandonment reason summary>

Notes
- Replacement plan: <path or none>
```
