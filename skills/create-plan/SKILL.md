---
name: create-plan
description: "Draft repository-specific implementation plans as Markdown files in `doc/plans/` for modifying existing code or adding new features. Use when asked to create a plan, planning doc, implementation plan, or issue-resolution plan (for example: \"create a plan to address all these issues\" or \"create a plan to add this\")."
---

# Create Plan

## Overview

Create a concrete, code-aware plan document under `doc/plans/` before implementation.
Inspect relevant code first, then write a scoped plan that lists affected components.

## Workflow

1. Determine scope from the request.
2. Inspect relevant code paths and architecture docs before writing the plan.
3. Write a new Markdown file in `doc/plans/` using a short hyphen-case filename.
4. Include `## Affected Components` with explicit file paths and a short reason for each.
5. Prefer phased, low-risk changes with clear validation and success criteria.

## Required Plan Shape

Use this structure unless the request needs a different order:

```md
# Plan: <Title>

## Summary
<2-5 sentences on intent and expected outcome>

## Problem
<current behavior and why it is insufficient>

## Goal
<what must be true after implementation>

## Design
<proposed approach and key decisions>

## Affected Components
- `path/to/file.go`: <why this file changes>
- `path/to/other.md`: <why this file changes>

```

## Repository-Specific Rules

- Always write draft plans to `doc/plans/`.
- Always include `## Affected Components`.
- be 100% certain that all affected components are listed
- ensure the plan includes requisite changes to the architecture docs
- don't write or modify test unless you are asked to do so
- Evaluate affected components by reading the real code, not only existing plans.
- Keep plans implementation-oriented; avoid generic checklists.
- If a plan is later executed, append execution notes and move it to `doc/completed_plans/` with `YYYYMMDD_` prefix.
- Git workflow: always commit + push after code/doc changes; never `git add .` or `git add -A`; stage explicit paths; commit only touched files; ignore unrelated changes
- always commit and push the plan when it's created, edited, deleted, moved, etc.
- Invariants: always prefer invariants to fallbacks; be certain about behavior and fail fast when expectations are violated.
- Coding: minimize code and complexity while maximizing performance, readability, logging, and correctness; optimize for the least code and complexity with the highest performance while maintaining readability, logging, and correctness.
- Breaking changes: prefer clean breaks over compatibility shims; update all call sites in the same change.
