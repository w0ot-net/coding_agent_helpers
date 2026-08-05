---
name: distill-plan
description: Run an iterative review-and-revision loop for an implementation plan using `/goal` and `$review-plan`. Use when asked to distill, harden, refine, or revise a plan until review no longer finds required fixes.
---

# Distill Plan

## Overview

Use this skill to keep an implementation plan under active review until it is
genuinely clean. The loop is: set a `/goal`, run `$review-plan`, fix valid
findings in the plan, commit the revision, then review the same plan again until
no required revisions remain.

## Workflow

1. Resolve the target plan.
   - Use an explicit `doc/plans/*.md` path when the user provides one.
   - If the user provides a commit, resolve the active plan changed by that
     commit and stop for clarification when more than one plan is possible.
   - Otherwise infer the sole relevant active plan from the request and
     worktree; stop for clarification when the target is ambiguous.
   - If the repository has uncommitted changes, identify whether they are part
     of the requested revision loop or unrelated user work before editing.

2. Start a goal for the loop.
   - Objective shape:
     `Use $review-plan on <plan path>, apply all valid findings to the plan, commit revisions, and repeat until review reports no findings.`
   - If goal tooling is unavailable, keep the same checklist manually in the
     working response and do not lose prior findings between iterations.

3. Run `$review-plan <plan path>`.
   - Use the actual `review-plan` skill, not an informal substitute.
   - Preserve the findings list as the revision checklist.
   - Treat "no findings" as clean only after all previously accepted findings
     have also been resolved or explicitly rejected with evidence.

4. Triage findings.
   - Fix valid findings.
   - Reject only findings that are demonstrably wrong, obsolete after a later
     change, or intentionally out of scope; record the reason briefly.
   - Prefer simple, direct fixes over broad rewrites.

5. Revise the plan.
   - Keep changes scoped to the accepted findings.
   - Do not implement the planned code or documentation during distillation.
   - Preserve unrelated user changes.
   - Run focused validation appropriate to the changed area.
   - Follow repository-specific commit/push rules.

6. Commit the revision.
   - Stage explicit paths only.
   - Commit only the target plan and any plan-owned metadata changed for this
     iteration.
   - Push when the repository instructions require it.

7. Repeat.
   - Keep the review target on the same plan path after each revision commit.
   - Run `$review-plan <plan path>` again against the updated plan and current
     codebase.
   - Continue until the review has no findings and the carried checklist is
     empty.

8. Mark the plan distilled.
   - Add or update `*Distilled: YYYY-MM-DD*` directly below the Markdown title,
     after YAML frontmatter when present.
   - Commit and push the marker using the repository's explicit-path workflow.

9. Complete the goal only when done.
   - Run `$review-plan <plan path>` once more after the marker commit; return to
     triage if it reports a required revision.
   - Mark the goal complete only after the final `$review-plan` pass reports
     no findings requiring revision.
   - If blocked by missing user input or an external dependency, leave the loop
     open unless the normal goal-blocking threshold is met.

## Output

When the loop finishes, report:

- final commit hash containing the distilled plan
- final plan path
- commits made during the loop
- distilled marker added
- validations run
- any intentionally rejected findings with concise rationale

Keep the final response short unless the user asks for the full audit trail.
