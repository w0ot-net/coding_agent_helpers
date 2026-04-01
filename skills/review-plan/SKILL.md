---
name: review-plan
description: "Review implementation plans in `doc/plans/*.md` for technical correctness, missing scope, and execution risk. Use when asked to review or evaluate a plan, sanity-check a planning doc, validate affected components, or determine whether a plan is ready to execute."
---

# Review Plan

## Overview

Evaluate whether a plan is complete, correct, and executable against the real codebase.
Prioritize technical gaps, behavioral risks, and missing validation over style edits.

## Review Workflow

1. Identify the target plan in `doc/plans/`.
2. Read the full plan before judging details.
3. Extract every item under `## Affected Components`.
4. Perform full code review of all affected components listed in the plan.
5. Read neighboring call sites and architecture docs when needed to validate assumptions.
6. Check plan-to-code alignment:
   - Verify every claimed behavior exists in code.
   - Verify key impacted files are listed; flag missing components.
   - Verify sequencing is safe and realistic.
7. Check risk and validation quality:
   - Look for regression risk, invariants, performance impact, and rollback gaps.
   - Require concrete validation steps, not generic "run tests" statements.
   - check for oportunities to eliminate code and/or reduce complexity without hurting performance or correctness
8. Report findings ordered by severity, each with file references.
9. State explicitly when no findings are present; include residual risks or unknowns.
10. When the review is complete, at the very top of the file, add a timestamp stating that review number N (1,2,3...) has been completed
11. do not write the review finding into the plan. just put them into the chat
12. check to see if any code can be eliminated as a result of the proposed changes

## Repository-Specific Requirements

- Enforce the rule: evaluating a plan requires full code review of all affected components.
- Enforce the rule: plans must include `## Affected Components`.
- Focus on correctness and risk reduction, not broad rewrites.

## Output Contract

Use this response shape:

```md
Findings
1. <Severity> <title> - `path/to/file:line`
   <why this is a problem and expected impact>
   <what the plan should change>

Open Questions
1. <only if needed>

Summary
<1-3 sentences>
```

Use `Critical`, `High`, `Medium`, and `Low` severities.
