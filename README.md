# coding_agent_helpers
Skills and other stuff to improve coding agent performance.

## Skills

Claude Code skills that can be installed into `~/.claude/skills/` for use across projects.

### Installation

Copy any skill directory into your Claude Code skills folder:

```bash
# Install a single skill
cp -r skills/create-plan ~/.claude/skills/

# Install all skills
cp -r skills/* ~/.claude/skills/
```

### Available Skills

| Skill | Type | Description |
|-------|------|-------------|
| [create-plan](skills/create-plan/) | Slash command | Draft implementation plans in `doc/plans/` with affected components |
| [create-plan-v2](skills/create-plan-v2/) | Experimental slash command | Draft minimal plans with explicit scope and decomposition gates |
| [review-plan](skills/review-plan/) | Slash command | Review plans for technical correctness, missing scope, and risk |
| [review-plan-v2](skills/review-plan-v2/) | Experimental slash command | Review scope and simplicity before exhaustive implementation detail |
| [distill-plan](skills/distill-plan/) | Slash command | Iteratively review and revise a plan until no required findings remain |
| [distill-plan-v2](skills/distill-plan-v2/) | Experimental slash command | Distill plans through scope-first review without scope inflation |
| [execute-plan](skills/execute-plan/) | Slash command | Implement a plan from `doc/plans/` and finalize the plan record |
| [execute-plan-v2](skills/execute-plan-v2/) | Experimental slash command | Preflight and execute only coherent, current implementation plans |
| [abandon-plan](skills/abandon-plan/) | Slash command | Retire a plan to `doc/abandoned_plans/` with documented reasons |
| [review-commit](skills/review-commit/) | Slash command | Risk-focused code review of a single git commit |

Versioned experimental skills install alongside their stable counterpart and
must be invoked explicitly, such as `$create-plan-v2`.

### Skill Structure

Each skill follows the Claude Code convention:

```
skills/<skill-name>/
  SKILL.md            # Main skill prompt (frontmatter + instructions)
  agents/
    openai.yaml       # OpenAI-compatible agent interface (optional)
    <agent-name>.md   # Agent definition (for agent-type skills)
```

## Agents MD

Reusable CLAUDE.md fragments for consistent agent behavior across projects.

| File | Description |
|------|-------------|
| [software_development_agents.md](agents_md/software_development_agents.md) | Core coding conventions, git workflow, and review rules |
