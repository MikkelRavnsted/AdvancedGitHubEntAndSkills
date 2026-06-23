# Module 2: Custom Instructions

> **Duration: 30 minutes** | **Difficulty: Beginner → Intermediate**

---

## Learning Objectives

- Create repository-wide instructions (`copilot-instructions.md`)
- Create path-specific instructions (`.instructions.md`)
- Create agent instructions (`AGENTS.md`)
- Understand what belongs in instructions vs. other file types

---

## Role in the Workflow

Instructions are the **foundation layer**. Every agent, prompt, and skill you create later automatically inherits these rules. When your workflow generates an app in Module 7, the generated code will follow whatever you write here.

> Instructions = "how code should look." Tasks go in prompts (Module 3), roles go in agents (Module 4).

---

## 2.1 — Repository-Wide Instructions

Create `.github/copilot-instructions.md` — this applies to ALL Copilot interactions in this workspace.

### Template (fill in for your chosen app type)

```markdown
# Copilot Instructions

## Project
[App name from Module 1] — [one-line description]. Built with [framework].

## Tech Stack
- Runtime: [e.g., Node.js 20+]
- Framework: [e.g., Express]
- Database: [e.g., SQLite via better-sqlite3]
- Testing: [e.g., Vitest]

## Commands
- Install: `npm install`
- Run: `npm run dev`
- Test: `npm test`

## Code Conventions
- [Naming: e.g., "kebab-case for files, camelCase for variables"]
- [Patterns: e.g., "async/await, never raw callbacks"]
- [Errors: e.g., "throw custom Error classes, never throw strings"]
- [Style: e.g., "single quotes, no semicolons" or "double quotes, semicolons"]

## Project Structure
- `src/` — Source code
- `src/routes/` — API route handlers
- `src/models/` — Data models
- `tests/` — Test files (mirror src/ structure)
```

> **Do this now**: Create the file, fill in the blanks for your app type, save it.

### Dos and Don'ts

| ✅ DO | ❌ DON'T |
|---|---|
| Be specific: `"kebab-case files"` | Be vague: `"good naming"` |
| Include exact commands | Say "latest version" |
| Describe folder structure | Assume Copilot knows your layout |
| State negative rules: `"Never use var"` | Write more than ~2 pages |
| Keep it current | Put task logic here (use prompts) |
| Specify versions: `"Node 20+"` | Put personality here (use agents) |

---

## 2.2 — Path-Specific Instructions

Target rules to specific file types using `applyTo` globs. Create in `.github/instructions/`:

**`.github/instructions/testing.instructions.md`**
```markdown
---
applyTo: "**/*.test.*,**/*.spec.*,**/tests/**"
---
- Use Arrange-Act-Assert pattern
- Test names: "should [behavior] when [condition]"
- Mock external dependencies
- Include happy path AND error cases
```

**`.github/instructions/security.instructions.md`**
```markdown
---
applyTo: "**"
---
- Never hardcode secrets or API keys
- Always validate and sanitize user input
- Use parameterized queries, never string concatenation
- Log security events but never log sensitive data
```

Create at least 2 path-specific files relevant to your app's stack.

---

## 2.3 — Agent Instructions (AGENTS.md)

Create `AGENTS.md` in your project root — this tells autonomous agents how to behave:

```markdown
# Agent Instructions

## Behavior
- Run tests before and after changes: `[your test command]`
- Commit with conventional messages (feat:, fix:, docs:)
- Never modify files outside the assigned task scope

## Working with This App
- Entry point: `[your file]`
- Run: `[your command]`
- Test: `[your command]`

## Rules
- Follow conventions in .github/copilot-instructions.md
- Add tests for new functionality
- Keep changes focused — one concern per commit
```

---

## 2.4 — Verify It Works

Open Copilot Chat (`Ctrl+Shift+I`) and type:

```
What are the coding conventions for this project?
```

✅ **Pass** if it references your conventions (kebab-case, your framework, your test runner, etc.)  
❌ **Fail** if it gives generic advice — your file might not be in `.github/` or has a typo in the filename.

> **Try generating something**: Ask "Create a hello world route" and check if the output follows your conventions. If it uses wrong patterns → your instructions need to be more specific.

---

## How Instructions Connect Forward

| File You Created | Who Will Use It (Later Modules) |
|---|---|
| `copilot-instructions.md` | Every agent, every prompt — defines code style for generated apps |
| `testing.instructions.md` | `/write-tests` prompt, `@reviewer` agent |
| `security.instructions.md` | `@security-auditor` agent, all code generation |
| `AGENTS.md` | Cloud coding agent, orchestrator agent |

You **never need to repeat** these rules in prompts or agents — they're inherited automatically.

---

## Checkpoint

- [x] `.github/copilot-instructions.md` — project conventions
- [x] At least 2 `.github/instructions/*.instructions.md` files
- [x] `AGENTS.md` — autonomous agent behavior
- [x] Verified Copilot reads your instructions

---

*Previous: [← Module 1](../01-foundations/README.md) | Next: [Module 3: Reusable Prompts →](../03-reusable-prompts/README.md)*
