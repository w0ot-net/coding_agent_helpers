# Software Development Agent Guidance

## Required Workflows

- GitHub Actions: never create or use GitHub Actions workflows.
- Before modifying tracked files, read and follow
  [GIT_WORKFLOW.md](GIT_WORKFLOW.md).
- Before test, validation, benchmark, or retained-evidence work, read and
  follow [VALIDATION.md](VALIDATION.md).

## Authority and Compatibility

- The explicit task and nearest repository-specific instructions take
  precedence over this reusable guidance.
- Start with the nearest authoritative documentation. Broaden inspection for
  changes that cross architecture or ownership boundaries.
- Treat completed and abandoned plans as historical context, not current
  authority.
- Preserve established code, API, configuration, protocol, and operator
  behavior unless a concrete correctness, security, operational, performance,
  or architectural reason requires change.
- When a breaking change is accepted, update affected callers and
  authoritative documentation together and state migration consequences. Do
  not add speculative compatibility shims.

## Engineering

- Minimize code and complexity while preserving correctness, useful logging,
  performance, and readability. Avoid redesign for novelty.
- Prefer direct evidence, explicit invariants, and visible failures over
  guesswork, fallback-heavy behavior, or swallowed errors.
- Resolve review questions from code and authoritative documentation when
  possible. Otherwise present evidence-grounded options and identify the
  unresolved decision.

## Source Conventions

- Keep code and scripts ASCII unless existing content or the task requires
  otherwise. Do not use emoji in project content.
- Do not add gratuitous assistant, tool, or vendor attribution to project
  content. Preserve technically relevant names.
