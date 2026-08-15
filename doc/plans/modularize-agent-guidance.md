# Plan: Modularize Reusable Agent Guidance

## Summary

Refactor the reusable software-development guidance into a compact core
document with linked, authoritative Git and validation procedures. Preserve
the existing guidance's intent, remove duplication and ambiguous absolutes,
and add only project-neutral principles distilled from
`signals_from_bob_v2/AGENTS.md`. Update the catalog so consumers install and
retain the linked documents as one portable bundle.

## Problem

`agents_md/software_development_agents.md` is currently a flat list that mixes
always-applicable engineering principles with Git operations, validation
policy, plan lifecycle, review behavior, and writing conventions. Several
rules are duplicated, while terse statements such as "be certain," "ignore
tests," and competing compatibility directives leave room for unsafe or
inconsistent interpretation. Moving every detail into the core document would
make discovery worse, but splitting every topic would create links that agents
are likely to skip and authorities that can drift.

The SFB guidance contains stronger generic formulations for documentation
discovery, compatibility, validation scope, failure handling, unnecessary
machinery, and artifact retention. Its transport architecture, DNS execution
envelope, named paths, platform tooling, and other repository-specific policy
must not leak into this reusable guidance.

## Scope

In scope:

- Restructure `agents_md/software_development_agents.md` as the concise,
  always-applicable guidance and workflow router.
- Add sibling `GIT_WORKFLOW.md` and `VALIDATION.md` documents with one clear
  owner for each detailed workflow.
- Consolidate duplicated rules and replace ambiguous absolutes while
  preserving the intended constraints on tests, compatibility, source style,
  error handling, reviews, and Git publication.
- Incorporate generic SFB principles concerning authoritative documentation,
  established behavior, proportional validation, long-running work,
  unnecessary persistent machinery, and retained artifacts.
- Update `README.md` so the catalog describes the new ownership boundaries and
  tells consumers to copy the linked guidance files together.

Out of scope:

- Changing `signals_from_bob_v2/AGENTS.md` or importing any SFB-specific
  architecture, DNS, tooling, path, platform, or operator policy.
- Modifying the plan, review, execution, or abandonment skills, including
  policy currently embedded in their `SKILL.md` files.
- Adding `PLANS.md`, `ARTIFACTS.md`, or more narrowly divided manuals; the
  existing skills own plan lifecycle, and artifact guidance is not yet large
  enough to justify another required read.
- Renaming `agents_md/software_development_agents.md`, adding a repository-root
  `AGENTS.md`, or building an installer or Markdown link checker.
- Changing or adding tests; this is a documentation-only reorganization.

## Design

### Core guidance and routing

Keep `software_development_agents.md` as the stable entry point so existing
catalog links and consumers do not require a rename migration. Give it a title
and short sections rather than an undifferentiated bullet list. Its first
workflow section must use directive language that tells an agent when to read
each sibling document:

- read `GIT_WORKFLOW.md` before modifying tracked files; and
- read `VALIDATION.md` before running, changing, or designing tests or
  validation infrastructure.

A link alone is not sufficient because an agent may not infer that the linked
document is normative. Keep safety-critical and always-applicable principles
in the core even when a procedural document elaborates on how to apply them.
Do not repeat the procedures themselves.

Organize the remaining core guidance around these project-neutral rules:

- Start with the nearest authoritative documentation and broaden inspection
  for changes that cross architectural or ownership boundaries. Treat
  completed or abandoned plans as historical context rather than current
  authority.
- Treat established code, API, configuration, protocol, and operator behavior
  as the compatibility baseline. Require a concrete correctness, security,
  operational, performance, or architectural reason to change it. When a
  breaking change is accepted, update affected callers and authoritative
  documentation together and state migration consequences rather than adding
  a speculative shim.
- Minimize code and complexity while preserving correctness, useful logging,
  performance, and readability. Prefer direct evidence, explicit invariants,
  and fail-fast errors over guesswork, fallback-heavy behavior, or swallowed
  exceptions. Avoid redesign for novelty.
- Persist verification metadata, recovery state, or provenance only for an
  identified consumer or fail-closed invariant, and replace rather than
  duplicate an existing owner. Version persistent schemas for real supported
  compatibility boundaries rather than ordinary development churn.
- Use operating-system temporary locations for disposable scratch data. Keep
  retained raw artifacts in a project-designated location, avoid committing
  large raw logs or traces by default, and publish compact conclusions and
  relevant paths in the logical documentation location.
- Preserve the intent of the existing source-style restriction without an
  unconditional Markdown exception: keep code and scripts ASCII unless the
  file already uses another character set or the change needs it. Keep the
  existing prohibition on assistant/vendor branding and emoji in project
  material as a clearly labeled writing convention.
- During reviews, resolve factual questions through the code and authoritative
  documentation when possible; otherwise present the best evidence-grounded
  options and identify the decision still required.

Remove detailed plan lifecycle instructions from the core because the plan
skills already own plan creation, review, execution, and archival behavior.
The README remains the discovery point for those skills.

### Git workflow owner

Create `agents_md/GIT_WORKFLOW.md` as the only detailed Git authority for the
reusable guidance. It should require agents to:

- inspect the current branch and worktree before editing and again before
  staging;
- preserve unrelated, pre-existing, and untracked user changes;
- never use `git add .` or `git add -A`, and stage only explicit task paths;
- inspect the staged diff and commit only task-related files;
- commit and push after code or documentation changes;
- avoid discarding changes, amending or rewriting history, and force-pushing
  unless the user explicitly authorizes the exact operation;
- avoid resolving unrelated conflicts or overwriting remote work; and
- report the commit identifier and push result.

Keep commands illustrative rather than assuming a branch name, remote, shell,
or hosting service. State how to stop safely on an unexpected dirty worktree,
conflict, rejected push, or missing publication authority without prescribing
project-specific recovery machinery.

### Validation workflow owner

Create `agents_md/VALIDATION.md` as the only detailed validation authority.
Distinguish inspecting existing tests from modifying or running them so
"ignore tests" cannot be read as permission to overlook test contracts during
design or review. Preserve the current policy that agents do not modify tests
or run them unless explicitly asked, while requiring them to reason about
affected test behavior and disclose unperformed validation.

When validation is authorized, require the narrowest check that covers the
change. Aggregate or release suites require explicit direction, independent
validators must not recursively invoke one another, and agents should avoid
duplicated verification or persistent evidence machinery without a concrete
failure model and consumer. Before work expected to exceed ten minutes, tell
the user what will run and provide an estimate. Validation failures must be
reported rather than hidden by retries or fallbacks unless a repository-specific
policy explicitly defines a bounded retry.

### Catalog and portability

Update the README's agent-guidance section to list the core file, Git workflow,
and validation workflow separately with their ownership descriptions. Explain
that consumers should copy all three files into the same destination directory
and use or rename `software_development_agents.md` as their primary
`AGENTS.md`/`CLAUDE.md` entry point while retaining the sibling filenames so
relative links continue to resolve.

Do not claim that Markdown links are automatically loaded by every agent. The
directive routing text in the core document is the behavioral mechanism; the
links provide discoverability and portability.

## Affected Components

- `agents_md/software_development_agents.md`: replace the flat, duplicated
  list with structured core guidance and explicit workflow routing.
- `agents_md/GIT_WORKFLOW.md`: add the authoritative Git safety, staging,
  commit, and publication workflow.
- `agents_md/VALIDATION.md`: add the authoritative test and validation scope
  policy.
- `README.md`: catalog the split documents and document how to copy the bundle
  without breaking its relative links.

## Implementation Sequence

1. Add `GIT_WORKFLOW.md` and `VALIDATION.md` so the new workflow owners exist
   before the core begins pointing to them.
2. Rewrite `software_development_agents.md` around the routing, authority,
   compatibility, engineering, review, writing, and artifact decisions above;
   remove procedural duplication and skill-owned plan lifecycle details.
3. Update the README catalog and installation/copy guidance for the three-file
   bundle.
4. Inspect the complete documentation diff for rule loss, conflicting owners,
   repository-specific leakage, and valid relative links.

## Validation

- Run `git diff --check` for whitespace and patch-format errors.
- Use `rg` across `README.md` and `agents_md/` to confirm that detailed Git and
  validation rules have one owner and that the core contains the required-read
  directives rather than duplicate procedures.
- Verify `agents_md/GIT_WORKFLOW.md` and `agents_md/VALIDATION.md` exist at the
  exact relative targets used by `software_development_agents.md` and the
  README.
- Inspect the changed documents for SFB-specific names, hosts, paths,
  transports, platform assumptions, and operator limits; none should remain.
- Review `git diff -- README.md agents_md/` manually to ensure current
  compatibility, test, review, source-style, and publication intent is either
  preserved in clearer form or deliberately assigned to an existing skill.
- Do not run a test suite; the repository has no documentation test harness,
  and the change does not alter executable behavior.

## Success Criteria

- The reusable guidance has one concise entry point and exactly two linked
  procedural owners: Git and validation.
- The core explicitly tells agents when each linked document must be read, and
  all source and documented installation-layout links resolve.
- Detailed Git and validation rules are not duplicated across the three
  guidance documents.
- Existing user intent around commits, pushes, test authorization,
  compatibility, invariants, errors, source style, reviews, and complexity is
  preserved with less ambiguous language.
- Added guidance is applicable across projects and contains no SFB-specific
  implementation or operating policy.
- The README accurately describes the ownership and portable installation of
  the complete guidance bundle.
- Existing skill files and the SFB repository remain unchanged.
