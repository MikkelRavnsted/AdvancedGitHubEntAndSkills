---
description: "Generate a pull request description from the current branch changes"
agent: agent
tools: [execute, read, search]
---

# Generate PR Description

Analyze the current branch's changes compared to the main branch and generate
a comprehensive pull request description.

## Steps
1. Run `git diff main...HEAD --stat` to see changed files
2. Run `git log main..HEAD --oneline` to see commit messages
3. Analyze the changes to understand the intent

## Output Format

Generate a PR description with:

### Title
A concise, descriptive title following conventional commits format.

### Description
```markdown
## What
[Brief description of what changed]

## Why
[Motivation and context for the change]

## How
[Technical approach taken]

## Testing
[How was this tested?]

## Checklist
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes (or documented in migration guide)
```

## Rules
- Keep the title under 72 characters
- Link related issues if mentioned in commits
- Highlight breaking changes prominently
- Be specific about what reviewers should focus on
