---
name: execute-plan-v2
description: "Execute the smallest coherent repository implementation plan with a mandatory preflight for scope, staleness, and code alignment. Use only when the user explicitly invokes $execute-plan-v2 or requests the version-two scope-controlled execution workflow."
---

# Execute Plan v2

## Overview

Implement an accepted plan without expanding its product outcome or architecture boundary. Treat the plan as an execution checklist, not as authority to ignore the current code.

Stop before code changes when the plan is stale, incoherent, or materially broader than one independently verifiable change. A distilled or approved marker is review evidence, not permission to execute an invalid plan.

## Workflow

1. Resolve the requested plan and repository instructions.
2. Read the entire plan, including scope, affected components, success criteria, risks, and validation.
3. Inspect the current primary implementation paths, callers, authoritative documentation, and relevant working-tree changes.
4. Complete the mandatory execution preflight before editing files.
5. Implement accepted work in dependency order and within the established boundary.
6. Run proportionate validation required by the plan, repository, or user.
7. Verify every success criterion against concrete evidence.
8. Finalize the plan record only after all required work succeeds.

## Mandatory Execution Preflight

Answer these questions from the plan and current repository:

- What single user-visible, operational, correctness, or architectural outcome does the plan promise?
- What is in scope, and what is explicitly or necessarily out of scope?
- Can the work be implemented, validated, and reverted as one coherent change?
- Do the plan's assumptions, named files, ownership boundaries, and interfaces still match the code?
- Does the plan bundle independent outcomes that have separate success criteria or rollback boundaries?
- Does it introduce speculative compatibility, migration, observability, generic abstractions, or cleanup that is not required for the outcome?
- Does it turn a localized change into a repository inventory, hardening campaign, protocol redesign, or tooling project?

Infer the boundary when an older plan lacks an explicit Scope section. Do not reject a plan solely because it predates the v2 template when the outcome and boundary remain clear.

Proceed only when the plan is both:

- **Coherent:** one outcome with a defensible implementation and validation boundary.
- **Current:** its important assumptions agree with the code and authoritative documentation.

If either condition fails:

- Do not edit implementation files.
- Do not silently rewrite the plan and proceed in the same execution.
- Report the concrete mismatch and the smallest corrective next step.
- Recommend `$review-plan-v2` or `$distill-plan-v2` when the plan itself needs revision.

## Implementation Boundaries

Implement only behavior required to achieve the accepted outcome. Update every affected caller and authoritative document within that boundary.

Classify discoveries during implementation:

1. **Required correction:** A small technical adjustment needed for the same outcome and boundary. Make it and record the deviation.
2. **Independent improvement:** Cleanup, hardening, refactoring, or a feature with its own value. Leave it untouched and report it only when useful.
3. **Material invalidation:** Evidence that changes the product outcome, architecture, protocol, compatibility position, or validation strategy. Stop, preserve safe work, and return the plan for revision.

Do not:

- Add opportunistic cleanup or adjacent feature work.
- Create generic interfaces solely for hypothetical reuse, testing, or telemetry.
- Add compatibility layers unless the accepted outcome or repository policy requires them.
- Treat broad call-site searches as permission to redesign neighboring components.
- Overwrite, discard, or absorb unrelated user changes.

Use compiler errors, focused searches, and current callers to find required in-scope updates. Keep the implementation minimal, explicit, readable, and consistent with repository conventions.

## Validation

Run the narrowest validation that proves the plan's success criteria and satisfies repository instructions.

- Prefer focused checks before broader suites.
- Do not invent a new test campaign or validation framework during execution.
- Fix and retry failures caused by the in-scope implementation.
- Distinguish code failures from unavailable infrastructure or external conditions.
- Do not mark the plan complete while required validation is failing or unperformed.

Never modify tests merely to make a failure disappear. Change tests only when the user, plan, or repository instructions authorize it and the accepted behavior requires the change.

## Plan Finalization

Before finalizing, map each success criterion to code, documentation, or validation evidence. Compilation alone does not prove behavioral completion.

Add execution notes covering:

- Actual behavior implemented.
- Files and ownership boundaries changed.
- Material deviations from the plan and why they remained in scope.
- Validation commands and outcomes.
- Implementation commit hashes when commits are part of the repository workflow.
- Any unresolved blocker or deliberately excluded follow-up.

Move the plan to the repository's completed-plan location only when the requested outcome and all required work are complete. Follow its naming convention, such as `doc/completed_plans/YYYYMMDD_<plan>.md`.

When recording commit hashes, commit the implementation first and finalize the plan record afterward. The finalization commit cannot record its own hash; report that hash in the final response.

If blocked or stopped after implementation began, leave the plan active unless repository policy defines another status. Clearly describe the safe state of the worktree.

## Git Discipline

Follow repository-specific commit and push requirements.

- Inspect the worktree before editing.
- Stage explicit task paths only.
- Keep implementation and plan-finalization commits scoped and reviewable when the repository workflow calls for both.
- Never include unrelated changes.
- Report every commit created for the execution.

## Output Contract

For a completed execution, report:

```md
Preflight
- Scope coherent: yes
- Plan current: yes

Implemented
- <completed outcome>

Deviations
- <none, or bounded correction and rationale>

Validation
- `<command>`: <outcome>

Plan Finalization
- Execution notes: <added/not applicable>
- Completed-plan path: <path/not applicable>

Commits
- `<hash>`: <summary>

Open Items
- <only unresolved or deliberately excluded work>
```

When preflight stops execution, lead with that result, state that no implementation files were changed, cite the mismatch, and give the smallest plan-revision step.
