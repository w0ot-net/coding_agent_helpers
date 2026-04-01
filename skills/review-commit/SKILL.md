---
name: review-commit
description: Review one git commit for bugs, regressions, risky assumptions, and missing tests. Use when asked to review a commit hash, latest commit, or a specific change-set before merge/cherry-pick/release.
---

# Review Commit

## Overview

Perform a risk-focused code review of a single commit. Prioritize behavioral
correctness, regressions, operational risk, and test gaps over style feedback.

## Inputs

1. Resolve the target commit.
2. Accept explicit commit hash when provided.
3. Default to `HEAD` when the user does not specify a hash.

## Workflow

1. Inspect commit metadata.
- Run `git show --name-status --format=fuller <commit>`.
- Confirm author date, touched files, and commit message intent.

2. Inspect full diff.
- Run `git show --patch --stat <commit>`.
- Identify high-risk edits first: concurrency, I/O, protocol, security,
  persistence, migrations, retry/timeout behavior.

3. Review changed files in full context.
- Read each changed file, not only the hunk.
- Read neighboring call sites when behavior depends on integration.

4. Validate behavior against code reality.
- Verify control flow, state transitions, and error handling.
- Check edge cases: nil/empty inputs, timeouts, close/shutdown, partial failure,
  retries, ordering, idempotency.

5. Ensure the changes are as simple, professional, and clean as possible
- eliminate unneeded complexity
- if we can maintain behavior with less code / complexity let's take the opportunity to do so
- let's elminate needless code duplication

5. Evaluate test coverage.
- Check whether changed behavior is tested.
- Flag missing tests for critical paths and regressions.

6. Report findings first.
- Order by severity: `Critical`, `High`, `Medium`, `Low`.
- Include concrete file references and why each issue matters.


## Severity Guidelines

- `Critical`: likely production breakage, data loss/corruption, security issue,
  or deadlock/livelock.
- `High`: clear correctness bug, major regression risk, or broken contract.
- `Medium`: plausible bug under realistic conditions or important missing test.
- `Low`: minor risk, maintainability hazard, or non-blocking test/documentation gap.

## Output Contract

Use this structure:

```md
Findings
1. <Severity> <title> - `path/to/file:line`
   <impact and reasoning>
   <specific fix recommendation>

Open Questions
1. <only when needed>

Summary
<brief verdict on merge-readiness>
```

## Review Rules

- Prefer concrete evidence from code over speculation.
- Avoid style-only comments unless they hide correctness risk.
- State explicitly when no findings are present.
- Mention residual risk when confidence is limited by missing tests or missing runtime context.
