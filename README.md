# GitHub Copilot Enterprise: Skills, Agents & Agentic Workflows

> **A half-day hands-on workshop** — Build a reusable agentic workflow that generates complete apps from variables

---

## Welcome

In this workshop, you'll build an **agentic workflow** — a set of customization files (instructions, prompts, agents, skills) that work together to generate complete applications on demand. Change the variables, run the workflow again, get a different app.

**The app is not the product. The workflow is.**

```
INPUTS (Variables)              YOUR WORKFLOW                 OUTPUT
──────────────────              ─────────────                 ──────
• appName                       Instructions ┐
• theme (dark/minimal/etc)      Prompts      │──→  Complete app
• features (crud, auth, etc)    Agents       │     in ./generated/
• dataStore (sqlite/json/etc)   Skills       ┘     (runnable + tested)
```

By the end, you'll invoke `@orchestrator` with a set of variables and get a working, tested application — generated entirely by your workflow.

---

## Prerequisites

| Requirement | Details |
|---|---|
| **GitHub Copilot license** | Copilot Business or Enterprise (Individual works for most labs) |
| **VS Code** | With GitHub Copilot + Copilot Chat extensions |
| **GitHub account** | With access to this repository |
| **Runtime** | Node.js 20+, Python 3.11+, or your preferred language runtime |

---

## Choose What Your Workflow Will Generate

Pick an app type — this decides what your instructions, prompts, and agents will target:

| App Type | Description |
|---|---|
| **Task Manager API** | CRUD API with tasks, categories, due dates |
| **URL Shortener** | Shorten URLs, track clicks, analytics |
| **Recipe Book** | Store/search recipes by ingredients |
| **Expense Tracker** | Track spending, categories, reports |
| **Blog Platform** | Posts, comments, tags, markdown |

> **Can't decide?** Go with **Task Manager API** — simple to start, enough depth for all exercises.

Use **any language/framework** you want: Node.js, Python, C#, Go, Rust, Java, etc.

---

## Workshop Structure

| Module | What You Build | Duration |
|---|---|---|
| [Module 1](modules/01-foundations/README.md) | Workspace setup + understand the vision | 20 min |
| [Module 2](modules/02-custom-instructions/README.md) | Instructions (rules for generated code) | 30 min |
| [Module 3](modules/03-reusable-prompts/README.md) | Prompts with variables (`/generate-app`) | 35 min |
| [Module 4](modules/04-custom-agents/README.md) | Agents with handoff protocols (@orchestrator) | 45 min |
| [Module 5](modules/05-skills-and-plugins/README.md) | Skills + full pipeline testing | 40 min |
| [Module 6](modules/06-enterprise-mcp-config/README.md) | MCP + enterprise patterns (optional) | 30 min |
| [Module 7](modules/07-capstone/README.md) | Run the workflow, generate apps, present | 45 min |

**Total: ~4 hours hands-on**

---

## How to Start

### Option 1: Start from Scratch (Recommended)
Open [Module 1](modules/01-foundations/README.md) and follow from the beginning.

### Option 2: Fast-Track (Skip Ahead)

Already familiar with some concepts? Use a pre-built starter:

| Your Experience | Start At | Starter |
|---|---|---|
| Brand new | Module 1 | Start from scratch |
| Know instructions & file types | Module 3 | [`fast-track/start-at-module-3/`](fast-track/README.md) |
| Know instructions, prompts, AND agents | Module 5 | [`fast-track/start-at-module-5/`](fast-track/README.md) |

See **[Fast-Track instructions →](fast-track/README.md)**

---

## What You'll End Up With

```
your-workspace/
├── .github/
│   ├── copilot-instructions.md          ← Rules for generated code
│   ├── instructions/
│   │   ├── testing.instructions.md      ← Test conventions
│   │   └── security.instructions.md     ← Security rules
│   ├── prompts/
│   │   ├── generate-app.prompt.md       ← Main generation template (with variables)
│   │   ├── add-feature.prompt.md        ← Feature scaffolding
│   │   └── write-tests.prompt.md        ← Test generation
│   ├── agents/
│   │   ├── orchestrator.agent.md        ← Coordinates the full workflow
│   │   ├── architect.agent.md           ← Designs app structure
│   │   ├── reviewer.agent.md            ← Code quality review
│   │   └── security-auditor.agent.md    ← Security audit
│   ├── skills/
│   │   ├── analyze-deps/SKILL.md        ← Dependency analysis procedure
│   │   └── run-workflow/SKILL.md        ← Full workflow steps
│   └── workflow-tests.md                ← Pipeline validation checklist
├── .vscode/
│   └── mcp.json                         ← MCP server connections (optional)
├── AGENTS.md                            ← Autonomous agent behavior
└── generated/
    └── [appName]/                       ← Your generated app (the output!)
```

---

## Workshop Flow

```
Module 1          Module 2          Module 3          Module 4
Set up workspace → Instructions  →  Prompts        →  Agents + Handoffs
                   (rules)           (templates)       (specialists)
                                                           │
            ┌──────────────────────────────────────────────┘
            ▼
       Module 5          Module 6          Module 7
    Skills + Testing →  MCP (optional) →  Run Workflow → Generated App!
    (validation)        (external tools)   (capstone)
```

---

## Key Concepts

| Concept | File | Purpose |
|---|---|---|
| **Instructions** | `.github/copilot-instructions.md` | Rules ALL generated code follows |
| **Path Instructions** | `.github/instructions/*.instructions.md` | Rules for specific file types |
| **Prompts** | `.github/prompts/*.prompt.md` | Reusable generation templates with variables |
| **Agents** | `.github/agents/*.agent.md` | Specialized roles with handoff protocols |
| **Skills** | `.github/skills/*/SKILL.md` | Step-by-step procedures agents follow |
| **MCP** | `.vscode/mcp.json` | External tool connections |
| **AGENTS.md** | `AGENTS.md` | Rules for autonomous/cloud agents |

---

## Tips for Success

- **The workflow is the product** — Don't worry about building a perfect app. Focus on making the workflow generate good output.
- **Test and iterate** — If output is wrong, fix the `.md` file that caused it, then re-run.
- **Use any language** — Every exercise works with whatever stack you choose.
- **Start simple** — Begin with `basic-crud` features, add complexity in later runs.
- **Compare notes** — After each module, compare your approach with colleagues.

---

## Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code Copilot Customization](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [Custom Instructions Reference](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
- [Model Context Protocol](https://modelcontextprotocol.io/)

---

*Ready? Start with [Module 1: Foundations & Project Setup →](modules/01-foundations/README.md)*
