# Plan: Modularize Reusable Agent Guidance

*Distilled: 2026-08-15*

## Summary

Turn the reusable software-development guidance into a concise three-file
bundle: one always-loaded core plus linked Git and validation procedures. Keep
each rule in one authoritative document, preserve current intent where it is
project-neutral, and incorporate only the most useful generic lessons from
`signals_from_bob_v2/AGENTS.md`. Keep the entire guidance bundle at or below
700 words unless an essential safety rule requires a documented exception.

## Problem

`agents_md/software_development_agents.md` is a terse flat list that mixes
engineering principles with Git, validation, planning, review, and writing
rules. It duplicates some guidance and leaves phrases such as "be certain" and
"ignore tests" open to unsafe interpretations. Expanding that one file would
increase the context cost on every task; excessive linked documents would
instead make instructions hard to discover.

## Scope

In scope:

- Rewrite the existing file as the compact core and workflow router.
- Add sibling `GIT_WORKFLOW.md` and `VALIDATION.md` authorities.
- Clarify and deduplicate current generic rules and selected SFB guidance.
- Update `README.md` to catalog and explain installation of the bundle.

Out of scope:

- SFB-specific policy or changes to the SFB repository.
- Changes to skills or their plan lifecycle rules.
- Additional manuals, a root `AGENTS.md`, file renames, or installation
  automation.
- Tests or executable behavior.

## Design

Use this ownership split:

| Document | Loaded when | Sole responsibility |
|---|---|---|
| `software_development_agents.md` | Always | Routing, authority, compatibility, implementation, review, and source conventions |
| `GIT_WORKFLOW.md` | Before tracked-file changes | Worktree safety, staging, commits, and pushing |
| `VALIDATION.md` | Before test, validation, benchmark, or evidence work | Test authorization, validation scope, runtime, evidence, and artifacts |

The core must use imperative links requiring `GIT_WORKFLOW.md` before tracked
file changes and `VALIDATION.md` before test, validation, benchmark, or
evidence work. A bare link or README entry is insufficient. State each
detailed rule only in its owning document; the core should route rather than
summarize linked procedures.

Write short sections and direct bullets. Omit rationale, examples, commands,
and edge-case recovery unless needed to disambiguate a safety rule. The three
guidance files should total at most 700 words.

### Core guidance

Retain only generally applicable rules:

- Start with the nearest authoritative documentation; broaden inspection for
  cross-cutting changes. Treat completed and abandoned plans as history, not
  current authority.
- Preserve established behavior absent a concrete correctness, security,
  operational, performance, or architectural reason. For an accepted break,
  update callers and authoritative docs together and state migration effects;
  do not add speculative shims.
- Minimize code and complexity while preserving correctness, useful logging,
  performance, and readability. Prefer direct evidence, explicit invariants,
  and visible failures over guesswork, fallback-heavy behavior, swallowed
  errors, or redesign for novelty.
- Resolve review questions from code and authoritative docs when possible;
  otherwise present evidence-grounded options and the unresolved decision.
- Keep code and scripts ASCII unless existing content or the task requires
  otherwise. Reframe the current blanket vendor-name ban as avoiding
  gratuitous assistant attribution in project content; do not prohibit
  technically relevant names. Retain the no-emoji source convention.

Remove plan lifecycle details because the plan skills own them. Omit niche
schema-version policy rather than charging every task for it.

### Git workflow

Move the current commit-and-push policy into `GIT_WORKFLOW.md`, adding only the
safety needed to apply it: inspect branch/worktree state, preserve unrelated
changes, stage explicit paths (never `git add .` or `git add -A`), inspect the
staged diff, commit and push task changes, and report the result. Require
explicit authorization before discarding changes, rewriting history, or
force-pushing. On conflicts or rejected pushes, preserve both local and remote
work and report a blocker that cannot be resolved within task scope.

### Validation workflow

Clarify that agents may inspect tests to understand contracts but must not
modify or run tests unless asked. When validation is authorized, use the
narrowest sufficient check, disclose omitted validation, and require explicit
direction for aggregate or release suites. Notify the user before work expected
to exceed ten minutes.

Keep conditional SFB-derived guidance here: new verification, persistent
evidence, or recovery machinery needs a concrete failure model and consumer
and should replace rather than duplicate an owner. Use temporary locations for
disposable output, keep retained raw artifacts in project-designated storage,
and commit compact conclusions rather than large logs or traces.

### Catalog

List all three files in `README.md`. Tell consumers to copy them into one
directory, use or rename the core as their `AGENTS.md` or `CLAUDE.md`, and keep
the sibling filenames so relative links resolve. Do not imply that links load
automatically; the core's required-read directives provide that behavior.

## Affected Components

- `agents_md/software_development_agents.md`: compact core and router.
- `agents_md/GIT_WORKFLOW.md`: new Git authority.
- `agents_md/VALIDATION.md`: new validation authority.
- `README.md`: catalog and portable-copy instructions.

## Implementation Sequence

1. Add the two workflow documents.
2. Rewrite the core with directive links and no procedural duplication.
3. Update the README and review the full bundle against the word budget.

## Validation

- Run `git diff --check`.
- Verify both relative link targets exist.
- Run `wc -w agents_md/*.md`; keep the three-file total at or below 700 words,
  or document why an essential safety rule requires exceeding it.
- Use `rg` and manual diff review to confirm detailed Git and validation rules
  have one owner, no SFB-specific policy leaked in, and skill files are
  unchanged.
- Do not run a test suite; no executable behavior changes.

## Success Criteria

- One compact core routes agents to exactly two conditional workflow owners.
- The bundle is at most 700 words, with each rule stated once.
- Current generic intent is preserved without ambiguous absolutes.
- Relative links and documented copy instructions work in source and installed
  layouts.
- No skills, tests, executable files, or SFB files change.
