---
name: distill-plan-v2
description: "Iteratively review and revise implementation plans with $review-plan-v2 while preventing scope inflation, removing independent work, and decomposing plans whose boundaries are incoherent. Use only when the user explicitly invokes $distill-plan-v2 or requests the version-two scope-controlled distillation workflow."
---

# Distill Plan V2

## Overview

Refine an implementation plan until it is scope-coherent, minimal, technically
correct, and executable. Use `$review-plan-v2` for every review pass. Treat
deletion, deferral, or approved decomposition as valid progress; do not make
the same document increasingly exhaustive merely to eliminate findings.

## Workflow

1. Resolve the target plan and repository instructions.
2. Identify unrelated worktree changes before editing.
3. Start a goal that permits scope correction as well as technical revision.
4. Run `$review-plan-v2 <plan path>` and preserve its scope verdict and findings
   as the current checklist.
5. Correct a failed scope gate before addressing technical detail.
6. Revise valid findings with the least additional mechanism and text.
7. Commit and push each coherent revision when repository instructions require
   it.
8. Repeat scope-first review until every target plan is coherent and has no
   required findings.
9. Add the distilled marker only after that clean review, commit it, and run one
   final `$review-plan-v2` pass.

## Goal

When goal tooling is available, use an objective shaped like:

```text
Use $review-plan-v2 on <plan path>, correct scope before technical detail,
apply all valid findings with the simplest plan changes, commit required
revisions, and repeat until every final plan is coherent and has no findings.
```

If goal tooling is unavailable, maintain the same checklist manually. Do not
lose accepted findings, rejected findings, deferred work, or an approved change
in target paths between iterations.

## Respond to the Scope Verdict

### Coherent

Triage and revise technical findings normally. Preserve the plan's explicit
in-scope and out-of-scope boundary.

### Needs decomposition

Do not append technical detail to the overbroad plan.

- If the plan absorbed independent incidental work that the user did not ask
  to plan, remove it and record it briefly as out of scope when useful.
- If the requested outcome itself contains independently executable changes,
  propose the smallest ordered plan boundaries.
- Rewrite the existing path as the core plan only when its title and filename
  remain accurate.
- Do not silently rename, retire, or replace the target, and do not create
  additional requested deliverables, unless the user already authorized
  decomposition or multiple planning documents.
- When that authority is absent, pause the revision loop with the proposed
  boundaries instead of continuing to inflate the plan.

After an authorized split, review each resulting plan independently with
`$review-plan-v2`. Do not create an umbrella plan unless it owns a real shared
ordering invariant that cannot be expressed by dependencies between the
smaller plans.

## Triage Findings

Classify each finding as:

- **Scope correction:** remove, defer, or decompose work before continuing.
- **Required technical correction:** revise the accepted scope using the
  simplest code-aware design.
- **Independent observation:** keep it out of the plan and do not create a
  follow-up document unless the user requested one.
- **Rejected finding:** record concise repository evidence showing why it is
  wrong, obsolete, or outside the accepted scope.

Do not convert a useful independent observation into a prerequisite. Prefer
removing unnecessary mechanisms over documenting them more precisely.

## Revise Without Inflation

- Edit planning documents only; do not implement the planned code, tests, or
  documentation.
- Preserve unrelated user changes.
- Keep affected components complete within the accepted scope, using bounded
  package groups for mechanical consumers when appropriate.
- Update only authoritative documents whose contracts change.
- Add validation only when it proves an in-scope behavior or migration.
- Do not add generic interfaces, callbacks, schemas, compatibility paths, or
  observability requirements solely to satisfy optional exactness.
- If a revision grows materially, rerun the scope and simplicity gates before
  committing it.
- If successive reviews keep discovering adjacent work, stop and re-evaluate
  the boundary rather than extending the checklist.

Distillation should usually make a plan smaller or more precise. Growth is
acceptable only when code evidence identifies a missing requirement that
cannot be safely separated.

## Commit and Repeat

1. Validate plan formatting, paths, and internal consistency without running
   implementation tests unless requested.
2. Stage explicit plan paths only and follow repository commit/push rules.
3. Run `$review-plan-v2` again against the committed text and current code.
4. Carry unresolved accepted findings forward; do not declare a pass merely
   because the latest review omitted an earlier item.
5. Continue until the scope verdict is `Coherent` and `Findings` is `None` for
   every final plan.

## Distilled Marker

Add or update `*Distilled: YYYY-MM-DD*` directly below the Markdown title,
after YAML frontmatter when present. Commit and push the marker through the
repository's explicit-path workflow.

Run one final `$review-plan-v2` pass after the marker commit. A marker does not
override a failed scope gate or technical finding. Complete the goal only after
the final clean pass.

## Output

Report concisely:

- final plan path or ordered paths;
- every commit created during distillation;
- whether work was removed, deferred, or decomposed to preserve scope;
- distilled markers added;
- plan-level validations run;
- intentionally rejected findings and evidence; and
- any independent observations deliberately left unplanned.

If the loop paused for decomposition authority, report the proposed boundaries
and make clear that the original plan is not ready for execution.
