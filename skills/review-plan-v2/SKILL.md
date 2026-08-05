---
name: review-plan-v2
description: "Review repository implementation plans with scope coherence and simplicity gates before exhaustive technical review. Use only when the user explicitly invokes $review-plan-v2 or requests the version-two scope-first plan review workflow."
---

# Review Plan V2

## Overview

Determine whether a plan is the smallest coherent, correct, and executable
change for the requested outcome. Review scope and design simplicity before
spending effort on exhaustive component coverage or adding more work to the
plan.

Keep review read-only. Report findings in chat; do not edit, stamp, commit, or
otherwise mutate the plan unless the user separately asks for revisions.

## Workflow

1. Resolve the target plan and repository instructions.
2. Read the complete plan once to understand its claimed outcome, scope,
   design, affected components, sequencing, validation, and success criteria.
3. Run the scope-coherence gate.
4. If scope is coherent, run the simplicity gate against targeted code and
   architecture evidence.
5. Only after both gates pass, perform the full technical review of the
   accepted scope.
6. Report only actionable findings required to make that scope safe and
   executable.

## Scope-Coherence Gate

Judge whether the plan describes one outcome or one genuinely atomic group of
changes. Distinguish:

- core correctness for the requested behavior;
- required migration of current callers, contracts, tests, and authoritative
  documentation; and
- independent observability, experimental tooling, hardening, cleanup, or
  redesign.

Require decomposition when independently executable work has been bundled into
the plan. Treat these as strong evidence:

- product behavior and experimental evidence or analysis schemas change for
  separate reasons;
- tests or telemetry introduce production abstractions not needed by the
  requested behavior;
- defensive hardening or cleanup can be implemented and validated separately;
- multiple outcomes have independent rollback or success criteria;
- phases exist mainly to contain unrelated architectural owners; or
- the affected-components list has become a repository inventory rather than
  a map of one change.

Do not use file count or word count as a rigid threshold. A cross-cutting plan
may remain coherent when one invariant requires atomic implementation across
layers.

If the scope is incoherent:

1. Gather enough code and architecture evidence to prove the boundary problem.
2. Report one or more `High` scope findings and recommended plan boundaries.
3. Stop before exhaustive file-by-file review and minor technical findings.
4. Mark the plan not ready for execution.

Do not respond to an overbroad plan by asking it to list still more components.
Move separable work out instead.

## Simplicity Gate

For a scope-coherent plan, inspect the primary code paths and challenge the
proposed mechanism:

- Can current owners, interfaces, or invariants deliver the outcome?
- Can validation of actual values replace new derived state or coordination?
- Is each new generic abstraction required by core production behavior and
  more than one real consumer?
- Are compatibility branches required, or merely speculative?
- Can state, callbacks, options, migrations, fallbacks, or layers be removed?
- Does instrumentation remain observational, or has it begun driving product
  architecture?

Compare against the simplest viable design that preserves correctness,
failure scope, performance, and repository constraints. A simpler alternative
is a finding only when code evidence shows it is viable; do not substitute
personal style preferences.

If a fundamental design problem makes downstream detail unstable, report it
and stop before exhaustive review. Otherwise carry the accepted design into
the technical review.

## Full Technical Review

After the first two gates pass:

1. Extract the primary components and bounded mechanical consumer groups from
   `## Affected Components`.
2. Review every primary component and its relevant neighboring call sites.
3. Inspect enough mechanical consumers to validate that the migration category
   and package boundary are accurate; use code search or compiler-visible
   caller discovery rather than requiring a file manifest.
4. Read the nearest authoritative architecture documents needed to verify
   ownership and invariants.
5. Check plan-to-code alignment:
   - claimed current behavior is accurate;
   - required owners and call sites are covered;
   - sequencing preserves intermediate invariants;
   - concurrency, failure scope, platform support, and performance are safe;
   - validation directly proves the changed behavior; and
   - success criteria complete the requested outcome without absorbing
     deferred work.

Do not require every document mentioning a feature to change. Require only the
authoritative documents whose contracts change.

## Finding Discipline

- Report a finding only when the plan must change to deliver its accepted
  outcome safely, simply, and completely.
- Prefer removing or deferring unnecessary work over specifying it in greater
  detail.
- Do not turn an independent improvement into a missing-scope finding.
- Do not demand production machinery solely to make tests or telemetry more
  exact; recommend separation when appropriate.
- Support every finding with plan and code evidence plus a concrete correction.
- Order findings by severity: `Critical`, `High`, `Medium`, then `Low`.
- Avoid low-value style findings and exhaustive restatement of correct plan
  content.

Use `Deferred Observations` only for a small number of valuable independent
issues that should not block this plan. Omit the section when empty.

## Readiness Rule

Report `No findings` only when:

- the scope is coherent;
- the design is the simplest viable safe design;
- required callers, contracts, tests, and authoritative documents are covered;
- sequencing and validation are executable; and
- no independent follow-up has been made a prerequisite without cause.

State residual risks or unknowns even when there are no findings. A prior
review marker, approval, or distilled label is evidence only; it does not make
the plan ready.

## Output Contract

For a coherent plan, use:

```md
Scope Verdict
Coherent.

Findings
1. <Severity> <title> - `path/to/file:line`
   <evidence, impact, and required correction>

Open Questions
1. <only when a material decision cannot be resolved from the repository>

Deferred Observations
- <optional independent issue that does not block the plan>

Summary
<readiness and residual risk in 1-3 sentences>
```

For an incoherent plan, use:

```md
Scope Verdict
Needs decomposition.

Findings
1. High <scope boundary problem> - `plan/path.md:line`
   <evidence, impact, and required decomposition>

Recommended Plan Boundaries
1. <smallest coherent plan and outcome>
2. <independent plan, only when part of the user's requested outcome>

Summary
Not ready for execution; exhaustive technical review intentionally stopped at
the failed scope gate.
```

Omit empty optional sections. When no findings exist, write:

```md
Findings
None.
```
