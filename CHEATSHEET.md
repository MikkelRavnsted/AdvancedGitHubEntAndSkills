# Quick Reference Cheatsheet

## File Locations & Purposes

| File | Location | Purpose |
|---|---|---|
| `copilot-instructions.md` | `.github/` | Always-on rules for all Copilot interactions |
| `*.instructions.md` | `.github/instructions/` | Path-specific rules (with `applyTo` glob) |
| `AGENTS.md` | Anywhere (nearest wins) | Instructions for AI agents specifically |
| `*.prompt.md` | `.github/prompts/` | Reusable slash-command prompts |
| `*.agent.md` | `.github/agents/` | Custom agent personas |
| `SKILL.md` | Any directory | Packaged capability for agents |
| `copilot-mcp.json` | `.github/` | Cloud agent MCP servers |
| `mcp.json` | `.vscode/` | Local (VS Code) MCP servers |

---

## Instructions File Template

```markdown
---
applyTo: "**/*.ts,**/*.tsx"
---

# [Title]

- Rule 1
- Rule 2
- Rule 3
```

---

## Prompt File Template

```markdown
---
description: "What this prompt does"
mode: "agent"
tools: ["file_system", "terminal"]
---

# Prompt Title

Your prompt instructions here.
```

---

## Agent File Template

```markdown
---
description: "One-line description of the agent's role"
tools: ["file_system", "terminal"]
---

# Agent Name

You are a [role] who [does what].

## How You Work
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Handoff Output
- **[Key data]**: [structured output]
- **Verdict**: [status]
- **Ready for**: @next-agent

## Variable Handling
ALWAYS use provided variables. Never substitute defaults.

## Rules
- Rule 1
- Rule 2
```

---

## MCP Configuration Template

```json
{
  "servers": {
    "server-name": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@package/name"],
      "env": {
        "KEY": "${ENV_VAR}"
      }
    }
  }
}
```

---

## VS Code Commands

| Action | Command |
|---|---|
| Open Copilot Chat | `Ctrl+Shift+I` |
| Toggle Agent Mode | Click mode selector in chat |
| Invoke custom agent | `@agent-name` in chat |
| Invoke custom prompt | `/prompt-name` in chat |
| Reload Window | `Ctrl+Shift+P` → "Reload Window" (after MCP changes) |

---

## The Iteration Loop

```
Run (@agent or /prompt) → Inspect output → Fix the .md file → Re-run
```

| Output Problem | File to Fix |
|---|---|
| Wrong code style | `copilot-instructions.md` |
| Wrong structure | `generate-app.prompt.md` |
| Ignores variables | The agent's `## Variable Handling` |
| Unstructured output | The agent's `## Handoff Output` |
| Skips steps | The skill's `## Steps` |

---

## Glob Pattern Quick Reference

| Pattern | Matches |
|---|---|
| `*` | All files in current directory |
| `**` | All files recursively |
| `**/*.py` | All Python files |
| `src/**/*.ts` | TypeScript files under `src/` |
| `**/test/**` | Everything in any `test/` folder |
| `**/*.test.*` | All test files |
| `**/*.{ts,tsx}` | TypeScript + TSX files |

---

## Priority Order (Highest → Lowest)

1. Personal instructions (user settings)
2. Repository instructions (`copilot-instructions.md`)
3. Path-specific instructions (`.instructions.md`)
4. Agent instructions (`AGENTS.md`)
5. Organization instructions (org policies)

> All layers are **combined**, not replaced.
