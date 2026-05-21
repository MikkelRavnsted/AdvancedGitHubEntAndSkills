# GitHub Copilot Enterprise: Skills, Agents & Agentic Workflows

> **A 5-hour hands-on workshop** — Build a real app from scratch while mastering Copilot's enterprise customization system

---

## Welcome

In this workshop, you'll **build an app from scratch** — using any language and framework you want — while progressively configuring GitHub Copilot's enterprise features to supercharge your workflow. Each module teaches a Copilot capability and has you immediately apply it to your app.

By the end, you'll have both a **working application** and a **production-ready Copilot configuration** (custom instructions, agents, skills, prompts, and MCP) that you can take back to your real projects.

**No forking required.** Create a new project right from your IDE or CLI.

---

## Prerequisites

| Requirement | Details |
|---|---|
| **GitHub Copilot license** | Copilot Business or Enterprise (Individual works for most labs) |
| **IDE** | VS Code (recommended), JetBrains, or Neovim with Copilot extension |
| **GitHub account** | With access to this repository |
| **Language/Framework** | Your choice — use whatever you're comfortable with |

---

## Choose Your App

Pick an app idea to build throughout the workshop. You'll start it in Module 1 and progressively enhance it while configuring Copilot features in each module.

### App Ideas (Pick One or Invent Your Own!)

| App | Description | Good For |
|---|---|---|
| **Task Manager API** | REST API with CRUD operations, user auth, and categories | Backend-focused devs |
| **Weather Dashboard** | Fetches weather data, displays forecasts, stores favorites | Full-stack / frontend devs |
| **Expense Tracker** | Track spending, categorize expenses, generate reports | Business logic & data |
| **Recipe Book** | Store recipes, search by ingredient, meal planning | CRUD + search features |
| **URL Shortener** | Shorten URLs, track clicks, analytics dashboard | Simple but extensible |
| **Chat Application** | Real-time messaging, rooms, user presence | Event-driven architecture |
| **Fitness Tracker** | Log workouts, track progress, set goals | Mobile / API devs |
| **Inventory System** | Product catalog, stock management, low-stock alerts | Enterprise patterns |
| **Blog Platform** | Posts, comments, tags, markdown rendering | Content-focused apps |
| **Quiz Game** | Create quizzes, answer questions, leaderboards | Gamification / fun |

> **Any complexity is fine!** The app doesn't need to be "finished" — the goal is to apply each Copilot feature while building it. Start simple and grow.

### What Language/Framework?

Use **anything** you want:
- **TypeScript/JavaScript** — Node.js, Express, React, Next.js, Deno
- **Python** — FastAPI, Flask, Django
- **C#** — ASP.NET Core, Blazor, Minimal API
- **Java** — Spring Boot, Quarkus
- **Go** — Gin, Echo, standard library
- **Rust** — Actix, Axum
- **Other** — Ruby, PHP, Kotlin, Swift — all work!

---

## Workshop Structure

Each module teaches a Copilot concept **and** has you apply it to your app:

| Module | Title | Duration | You'll Learn | You'll Build |
|---|---|---|---|---|
| [Module 1](modules/01-foundations/README.md) | **Foundations & Project Setup** | 30 min | Copilot ecosystem | Create your app project |
| [Module 2](modules/02-custom-instructions/README.md) | **Custom Instructions** | 45 min | Instructions system | Configure Copilot for your app |
| [Module 3](modules/03-reusable-prompts/README.md) | **Reusable Prompt Files** | 40 min | Prompt automation | Build features via prompts |
| [Module 4](modules/04-custom-agents/README.md) | **Custom Agents** | 50 min | Specialized AI personas | Use agents to build & review |
| [Module 5](modules/05-skills-and-plugins/README.md) | **Skills & Plugins** | 50 min | Packaged capabilities | Add skills for your app's domain |
| [Module 6](modules/06-enterprise-mcp-config/README.md) | **Enterprise & MCP** | 45 min | External tools & governance | Connect tools to your app |
| [Module 7](modules/07-capstone/README.md) | **Capstone: Ship It** | 40 min | Full agentic workflow | Polish & present |

**Total estimated time: ~5 hours**

---

## How to Start

### Step 1: Read Module 1
Open [Module 1](modules/01-foundations/README.md) to understand the Copilot ecosystem.

### Step 2: Create Your Project
In Module 1, you'll create a brand-new project using your preferred method:

```bash
# Examples — use whatever suits your stack:
npx create-next-app my-app
dotnet new webapi -n MyApp
django-admin startproject myapp
go mod init my-app
cargo new my-app
mkdir my-app && cd my-app && npm init -y
```

Or simply ask Copilot in agent mode:
> "Create a new [framework] project called [name] with [features]"

### Step 3: Follow the Modules
Each module adds both **app features** and **Copilot configuration** to your project.

---

## Fast-Track: Skip Ahead

Already familiar with some of the concepts? Use a pre-built starter app and jump to the module where it gets new for you:

| Your Experience | Start At | Starter |
|---|---|---|
| Brand new to Copilot customization | Module 1 | Start from scratch (above) |
| Know instructions & file structure | Module 3 | [`fast-track/start-at-module-3/`](fast-track/README.md#option-a-start-at-module-3-reusable-prompts) |
| Know instructions, prompts, AND agents | Module 5 | [`fast-track/start-at-module-5/`](fast-track/README.md#option-b-start-at-module-5-skills--plugins) |

Each starter is a **complete Task Manager API** (Node.js/Express) with all prior modules fully implemented — Copilot config, app code, and tests. Copy it, `npm install`, and you're ready to go.

👉 **[See Fast-Track instructions →](fast-track/README.md)**

---

## What You'll End Up With

By the end, your project will have both a working app AND a complete Copilot configuration:

```
my-app/
├── src/                              # Your app code (built throughout)
│   ├── [your app files]
│   └── [tests]
├── .github/
│   ├── copilot-instructions.md       # Your app's coding standards
│   ├── instructions/
│   │   ├── [language].instructions.md # Language-specific rules
│   │   ├── testing.instructions.md    # Testing conventions
│   │   └── security.instructions.md   # Security guidelines
│   ├── prompts/
│   │   ├── add-feature.prompt.md      # Scaffold new features
│   │   ├── code-review.prompt.md      # Structured reviews
│   │   └── [your prompts]             # Your custom workflows
│   ├── agents/
│   │   ├── reviewer.agent.md          # Code reviewer persona
│   │   ├── architect.agent.md         # Design advisor
│   │   └── [your agents]              # Your specialized agents
│   ├── skills/
│   │   └── [your-skill]/SKILL.md      # Domain-specific capabilities
│   └── copilot-mcp.json              # MCP server connections
├── .vscode/
│   └── mcp.json                       # Local MCP servers
└── AGENTS.md                          # Agent behavior guidelines
```

---

## Workshop Flow

```
Module 1              Module 2              Module 3              Module 4
Create Project  →  Add Instructions  →  Build via Prompts  →  Review with Agents
(your app)        (teach Copilot)      (add features)        (quality check)
                                                                   │
                ┌──────────────────────────────────────────────────┘
                ▼
           Module 5              Module 6              Module 7
        Add Skills        →  Connect MCP/Tools  →   Polish & Present
        (extend agents)     (enterprise config)    (ship your app)
```

---

## Key Concepts Quick Reference

| Concept | File/Location | Purpose |
|---|---|---|
| **Repository Instructions** | `.github/copilot-instructions.md` | Always-on rules for all Copilot interactions |
| **Path-Specific Instructions** | `.github/instructions/*.instructions.md` | Rules for matching file paths |
| **Agent Instructions** | `AGENTS.md` (anywhere in repo) | Instructions for AI agents |
| **Reusable Prompts** | `.github/prompts/*.prompt.md` | Templated prompts as slash commands |
| **Custom Agents** | `.github/agents/*.agent.md` | Specialized AI personas |
| **Skills** | `SKILL.md` files | Packaged capabilities |
| **MCP Servers** | `.github/copilot-mcp.json` | External tool connections |
| **Plugins** | Marketplace | Pre-packaged bundles |

---

## Tips for Success

- **Start simple** — Your app can be minimal at first. You'll add features in each module.
- **Use any language** — Every exercise works with whatever stack you choose.
- **Let Copilot do the heavy lifting** — The point is to experience how customization improves output.
- **Experiment freely** — Customization files are just Markdown. Iterate and improve.
- **Compare notes** — After each module, compare your approach with colleagues.

---

## Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code Copilot Customization](https://code.visualstudio.com/docs/copilot/copilot-customization)
- [Custom Instructions Reference](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
- [AGENTS.md Specification](https://github.com/agentsmd/agents.md)
- [Model Context Protocol](https://modelcontextprotocol.io/)

---

*Ready? Start with [Module 1: Foundations & Project Setup →](modules/01-foundations/README.md)*
