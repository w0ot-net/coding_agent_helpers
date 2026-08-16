# Git Workflow

- Inspect the branch and worktree before editing and again before staging.
- Preserve unrelated, pre-existing, and untracked user changes. If task work
  overlaps them and cannot be separated safely, stop and report the conflict.
- Stage explicit task paths only. Never use `git add .` or `git add -A`.
- Review the staged diff and commit only task-related files.
- Commit and push after code or documentation changes. Report the commit
  identifier and push result.
- Do not discard changes, amend or rewrite history, or force-push unless the
  user explicitly authorizes the exact operation.
- On conflicts or rejected pushes, preserve local and remote work. Resolve
  only task-scoped issues; report blockers that require broader changes or
  authority.
