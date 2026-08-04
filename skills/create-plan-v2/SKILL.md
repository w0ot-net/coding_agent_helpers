---
name: create-plan-v2
description: "Draft the smallest coherent repository-specific implementation plan, with an explicit scope gate, simplification pass, non-goals, and decomposition of independently executable outcomes. Use only when the user explicitly invokes $create-plan-v2 or requests the version-two scoped planning workflow."
---

# Create Plan V2

## Overview

Create a concrete, code-aware implementation plan under `doc/plans/` while
keeping the requested outcome as the scope boundary. Optimize for the smallest
coherent change that is safe to implement and validate; completeness applies
within that boundary, not to adjacent improvements discovered during research.

## Workflow

1. Resolve repository instructions and state the requested outcome in one
   sentence.
2. Run the scope gate before broad code inspection.
3. Inspect the real code, current callers, and nearest authoritative documents
   needed to validate the provisional scope.
4. Run the simplification pass before choosing the design.
5. Draft one plan or a small ordered set of plans under `doc/plans/`.
6. Recheck scope, affected components, sequencing, validation, and success
   criteria against the inspected code.
7. Follow repository-specific git instructions for plan changes.

## Scope Gate

Classify discovered work as:

- **Core correctness:** required to deliver the requested behavior safely.
- **Required migration:** current callers, contracts, tests, or authoritative
  documentation that must change with the core behavior.
- **Independent follow-up:** useful observability, experimental tooling,
  defensive hardening, cleanup, or redesign that can be implemented and
  validated separately.

Keep the first two categories in scope. Exclude the third category and name it
briefly under `Out of scope` when omitting it would otherwise be surprising.
Do not create follow-up plans for incidental discoveries unless the user asks
for them.

Create multiple ordered plans when the user's requested outcome itself contains
independently executable and independently validatable changes. Do not use
phases inside one document to hide separable plans. A cross-cutting change may
remain one plan only when one correctness or migration invariant genuinely
requires atomic implementation.

Treat these as strong decomposition signals:

- production behavior is coupled to experimental analysis or evidence schemas;
- tests or telemetry require new production abstractions not otherwise needed;
- unrelated hardening or cleanup expands the requested change;
- distinct changes can be reverted or validated independently; or
- affected components spread across unrelated architectural owners for
  different reasons.

Large word or file counts are diagnostic signals, not quotas to work around.

## Simplification Pass

Before drafting the design, answer from the inspected code:

- Can an existing interface, invariant, or owner implement the outcome?
- Can direct validation of actual state or values replace new derived state?
- Is each new abstraction needed by core production behavior and more than one
  real consumer?
- Are compatibility paths required by the user or repository, or merely
  speculative?
- Can any state, callback, option, migration, or fallback be deleted or
  deferred without weakening correctness?

If validation, observability, or experimental tooling begins to reshape the
production architecture, return to the scope gate and split the work.

## Required Plan Shape

Use this structure unless a section is genuinely inapplicable:

```md
# Plan: <Title>

## Summary
<2-5 sentences describing one outcome and the minimal approach>

## Problem
<current behavior and why it is insufficient>

## Scope

In scope:
- <required behavior or migration>

Out of scope:
- <independent work deliberately deferred>

## Design
<key decisions, ownership, invariants, and failure scope>

## Affected Components
- `path/to/file.go`: <why this primary component changes>
- `path/to/package/*`: <bounded mechanical consumers, when appropriate>

## Implementation Sequence
<dependency order; omit for a truly single-step change>

## Validation
<focused commands or inspections proving the behavior>

## Success Criteria
<observable conditions that complete the requested outcome>
```

## Affected Components

List every primary component expected to change within the accepted scope.
Group purely mechanical consumers by a bounded package or path pattern when a
file-by-file manifest would obscure the design. The implementation agent must
still search for and update every caller before coding is complete.

List only tests that require material new or changed coverage. Put existing
unchanged test suites and commands under `Validation`. Update only the nearest
authoritative documents whose contracts change; do not sweep every document
that merely mentions the feature.

Do not add a component because inspection revealed an adjacent improvement.
Either exclude it or decompose the requested work before continuing.

## Final Scope Check

Before writing or committing the plan, confirm:

- the summary describes one coherent outcome;
- every in-scope item is required for that outcome;
- every out-of-scope item can be deferred safely;
- the design uses the least new state and fewest new abstractions that preserve
  correctness;
- affected components describe owners and meaningful changes rather than
  becoming a repository inventory;
- validation is proportional and does not introduce another project; and
- success criteria do not include optional follow-up work.

If the plan grows materially during this check, return to the scope gate rather
than adding more sections or affected files.

## Repository and Output Rules

- Evaluate behavior from real code, not only existing plans.
- Follow repository architecture, compatibility, testing, and documentation
  instructions.
- Prefer invariants and clean ownership over fallbacks and compatibility shims
  unless compatibility is required.
- Do not implement the planned code or tests while creating the plan.
- Never overwrite an unrelated plan or include unrelated worktree changes.
- Use short hyphen-case filenames; use ordering prefixes only when several
  requested plans have real dependencies.
- Report the created plan path or ordered plan paths, the scope boundary, and
  any deliberately deferred work concisely.
