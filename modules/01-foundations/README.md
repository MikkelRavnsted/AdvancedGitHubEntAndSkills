# Module 1: Foundations & Workspace Setup

> **Duration: 20 minutes** | **Difficulty: Beginner**

---

## Learning Objectives

- Understand the Copilot customization file types and how they layer
- Set up the workspace where you'll build your workflow
- Understand the end goal: a reusable workflow that generates apps from variables

---

## 1.1 — The Customization Files

Every file you create in this workshop lives in `.github/` and serves a specific role:

| File Type | Location | Purpose in Your Workflow |
|---|---|---|
| **Instructions** | `.github/copilot-instructions.md` | Rules ALL generated code must follow |
| **Path Instructions** | `.github/instructions/*.instructions.md` | Rules for specific file types |
| **Prompts** | `.github/prompts/*.prompt.md` | Repeatable generation templates with variables |
| **Agents** | `.github/agents/*.agent.md` | Specialized roles that orchestrate the workflow |
| **Skills** | `.github/skills/*/SKILL.md` | Step-by-step procedures agents can follow |
| **MCP Config** | `.vscode/mcp.json` | External tools agents can access |
| **Agent Instructions** | `AGENTS.md` | Rules for the cloud coding agent |

These files layer together — instructions apply to everything, agents invoke prompts, prompts follow instructions, skills teach agents procedures.

---

## 1.2 — What You're Building

**The app is not the product — the workflow is.**

You'll build a set of customization files that can generate your chosen app from scratch based on variables:

```
INPUTS (Variables)              YOUR WORKFLOW                 OUTPUT
──────────────────              ─────────────                 ──────
• appName                       Instructions ┐
• theme (dark/minimal/etc)      Prompts      │──→  Complete app
• features (crud, auth, etc)    Agents       │     in ./generated/
• dataStore (sqlite/json/etc)   Skills       ┘     (runnable + tested)
```

Change the variables → get a different app. Run it again → same result. That's a reusable agentic workflow.

---

## 1.3 — Set Up Your Workspace

You're NOT building an app by hand. You're building **the workflow that generates apps**. The app comes out at the end (Module 7) in `./generated/`.

### Choose What Your Workflow Will Generate

Pick one — this decides what your instructions, prompts, and agents will target:

| App Type | One-liner |
|---|---|
| Task Manager API | CRUD API for tasks with categories and due dates |
| URL Shortener | Shorten URLs and track click analytics |
| Recipe Book | Store and search recipes by ingredients |
| Expense Tracker | Track spending with categories and reports |
| Blog Platform | Posts, comments, tags, and markdown support |

> **Can't decide?** Go with **Task Manager API** — simple to start, enough depth for all exercises.

### Set Up the Workspace

```bash
# This is your WORKFLOW workspace (not the generated app)
mkdir .github .github/prompts .github/agents .github/instructions .github/skills
mkdir generated
git init && git add . && git commit -m "chore: initial workspace setup"
```

Verify: Copilot Chat works (`Ctrl+Shift+I`) and the `.github/` folder exists.

---

## 1.4 — The Testing Loop

After each module, you'll test what you built and iterate:

1. **Run** — invoke the agent or prompt in Copilot Chat
2. **Inspect** — did the output match what you expected?
3. **Fix** — edit the `.md` file that caused the issue
4. **Re-run** — same input, verify the improvement

This loop is the core skill. Your `.agent.md` and `.prompt.md` files are code — bugs in output mean bugs in the file.

> **Think of it like debugging**: the output is wrong → find which file caused it → fix that file → run again.

---

## Module-by-Module Journey

| Module | What You Build | Role in Workflow |
|---|---|---|
| 2 | Instructions | The rules all generated code follows |
| 3 | Prompts with variables | The generation templates |
| 4 | Agents with handoffs | The specialists that orchestrate |
| 5 | Skills + testing | The procedures + workflow validation |
| 6 | MCP + enterprise | External tools + governance |
| 7 | Run the full workflow | Generate the app, prove it's reusable |

---

*Next: [Module 2: Custom Instructions →](../02-custom-instructions/README.md)*
