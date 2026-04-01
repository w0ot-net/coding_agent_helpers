---
name: execute-plan
description: "Execute an implementation plan from `doc/plans/*.md` by making the required code and documentation changes, then finalize the plan record. Use when asked to implement a plan, execute a planning doc, carry out all plan tasks, or finish a plan end-to-end."
---

# Execute Plan

## Overview

Implement approved plan documents with minimal, correct code changes and close out the plan artifact.
Treat the plan as an executable checklist, but verify assumptions against current code before editing.

## Execution Workflow

1. Locate the target plan in `doc/plans/`.
2. Read the full plan, especially `## Affected Components`, risks, and validation steps.
3. Inspect affected files in code before implementing to confirm assumptions.
4. Execute tasks in dependency order:
   - Apply code and doc changes.
   - Update all impacted call sites in the same change.
   - Prefer clean breaks over compatibility shims.
5. Keep changes minimal and deterministic; preserve performance, readability, logging, and correctness.
6. Run only the validation steps required by the plan or explicitly requested by the user.
7. Update the plan with execution notes that summarize what was implemented and any deviations.
8. Move the executed plan to `doc/completed_plans/` with `YYYYMMDD_` filename prefix.
9. Commit and push all related changes with explicit path staging.
10. Track every commit created for the execution and report all commit hashes.
11. Log the commit hash in the execution notes of the plan

## Repository-Specific Rules

- Do not modify files under `./tests` unless explicitly asked.
- Always prefer invariants to fallbacks; fail fast when assumptions are violated.
- Ensure architecture docs are updated when the implementation changes architecture behavior.
- If the plan is incomplete or stale, fix the plan first or call out the gap before coding.
- Never use `git add .` or `git add -A`; stage explicit files only.

## Output Contract

After execution, report:

```md
Implemented
- <concise list of completed plan items>

Files Changed
- `path/to/file`: <what changed>

Plan Finalization
- Execution notes added: <yes/no>
- Moved to `doc/completed_plans/YYYYMMDD_<plan>.md`: <yes/no>

Validation
- <commands run and key outcomes>

Commits
- `<hash>`: <commit summary>
- `<hash>`: <commit summary>

Open Items
- <only if something remains>
```
