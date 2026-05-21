# Module 1: Foundations & Project Setup

> **Duration: 30 minutes** | **Difficulty: Beginner**

---

## Learning Objectives

By the end of this module, you will:

- Understand the GitHub Copilot distribution model across surfaces (IDE, CLI, Web, Cloud)
- Know the customization hierarchy (personal → repository → organization)
- Recognize where agentic workflows fit in the Copilot ecosystem
- **Create your app project** that you'll build throughout this workshop

---

## 1.1 — The Copilot Ecosystem Map

GitHub Copilot isn't a single tool — it's a platform distributed across multiple surfaces:

| Surface | What It Does | Customization Support |
|---|---|---|
| **IDE (VS Code, JetBrains, Neovim)** | Code completions, inline chat, agent mode | Full: instructions, prompts, agents, skills, MCP |
| **GitHub.com Chat** | Chat with repository context | Repository instructions, AGENTS.md |
| **Copilot CLI** | Terminal assistance, command suggestions | CLI-specific instructions |
| **Cloud Agent (Copilot Coding Agent)** | Autonomous PR creation from issues | Repository instructions, AGENTS.md, MCP |
| **GitHub Mobile** | Chat on the go | Repository instructions |

### Key Insight

> Customization files you create in `.github/` travel with the repository and are picked up by **all surfaces** that support them. Write once, apply everywhere.

---

## 1.2 — The Customization Hierarchy

Copilot applies instructions in a layered priority model:

```
┌──────────────────────────────┐  Highest Priority
│   Personal Instructions      │  (your user settings)
├──────────────────────────────┤
│   Repository Instructions    │  (.github/copilot-instructions.md)
├──────────────────────────────┤
│   Path-Specific Instructions │  (.github/instructions/*.instructions.md)
├──────────────────────────────┤
│   Agent Instructions         │  (AGENTS.md)
├──────────────────────────────┤
│   Organization Instructions  │  (org-level policies)
└──────────────────────────────┘  Lowest Priority
```

All applicable layers are combined — they don't override each other unless they conflict directly.

---

## 1.3 — The Scaling Model: Skills → Plugins → Marketplace

As your customizations mature, they follow a natural scaling path:

```
Individual Files          Packaged Skills           Marketplace Plugins
─────────────────  →  ─────────────────────  →  ─────────────────────────
.instructions.md       SKILL.md bundles           Published plugin packages
.prompt.md files       Reusable across repos      Discoverable by org/public
.agent.md files        Shared via git             Install via marketplace
                       Version controlled          Include MCP, hooks, agents
```

---

## 1.4 — Cloud vs. Local Agent Configuration

| Aspect | Local Agent (VS Code) | Cloud Agent (github.com) |
|---|---|---|
| **Where it runs** | Your machine / Codespace | GitHub's infrastructure |
| **Trigger** | You interact in the IDE | Assign an issue, or prompt via web |
| **Output** | Direct code changes | Pull Request |
| **Instruction files** | `.github/copilot-instructions.md`, `.instructions.md`, `AGENTS.md` | Same, from the repo's default branch |
| **MCP support** | Local MCP servers | Remote MCP servers (configured in repo) |
| **Custom agents** | `.agent.md` files | Not supported (uses AGENTS.md) |

### Alignment Approach

The key to aligning cloud and local agents: use **shared instruction files** that both can read. That's exactly what you'll build for your app.

---

## 1.5 — Exercise: Create Your App Project

### Step 1: Choose Your App

Pick an app idea (see the [main README](../../README.md#choose-your-app) for suggestions). Some quick ideas:

| App | One-liner |
|---|---|
| Task Manager API | CRUD API for tasks with categories and due dates |
| Weather Dashboard | Fetch and display weather forecasts |
| Expense Tracker | Track spending and generate reports |
| URL Shortener | Shorten URLs and track click analytics |
| Recipe Book | Store and search recipes by ingredients |
| Quiz Game | Create quizzes with questions and leaderboards |
| Blog Platform | Posts, comments, tags, and markdown support |
| Inventory System | Products, stock levels, and low-stock alerts |
| Fitness Tracker | Log workouts and visualize progress |
| Chat Application | Real-time messaging with rooms |

> **Can't decide?** Go with a **Task Manager API** — it's simple enough to start quickly but has enough depth for all exercises.

### Step 2: Create the Project

Open your terminal or VS Code and create a new project. Here are examples for various stacks:

**Option A: Use the CLI**
```bash
# Node.js / TypeScript
npx create-next-app@latest my-app --typescript
# or
mkdir my-app && cd my-app && npm init -y && npm install express

# Python
mkdir my-app && cd my-app && python -m venv venv
# or
pip install fastapi uvicorn && mkdir my-app

# C# / .NET
dotnet new webapi -n MyApp

# Go
mkdir my-app && cd my-app && go mod init my-app

# Java
# Use Spring Initializr or:
mvn archetype:generate -DgroupId=com.example -DartifactId=my-app
```

**Option B: Ask Copilot Agent Mode**

Switch to **Agent mode** in VS Code Chat and ask:
```
Create a new [your framework] project called [your-app-name].
It should be a [your app idea] with basic project structure,
a main entry point, and a README.
```

**Option C: Use VS Code's `/init` command**

In Copilot Chat, type `/init` and follow the prompts to scaffold a project.

### Step 3: Verify Your Project

After creation, verify:
- [ ] You can open the project in VS Code
- [ ] The project has a basic structure (entry point, config file)
- [ ] You can run or build the project (even if it's just "hello world")
- [ ] Copilot Chat works in your project (`Ctrl+Shift+I`)

### Step 4: Initialize Git (if not already)

```bash
cd my-app
git init
git add .
git commit -m "feat: initial project setup"
```

---

## 1.6 — Understanding Where We're Going

Over the next modules, you'll add these layers to your app project:

| Module | What You'll Add to Your App |
|---|---|
| Module 2 | `.github/copilot-instructions.md` + path-specific instructions |
| Module 3 | `.github/prompts/` for scaffolding features, reviewing, testing |
| Module 4 | `.github/agents/` for specialized roles (reviewer, architect, tester) |
| Module 5 | `.github/skills/` for domain-specific capabilities |
| Module 6 | MCP configuration + enterprise governance |
| Module 7 | Polish everything, validate, present |

Each module will guide you to both **learn the concept** and **immediately apply it** to your app.

---

## Key Takeaways

- Copilot is a **platform**, not a single tool — spanning IDE, CLI, Web, and Cloud
- Customization files in `.github/` are the **shared language** across all surfaces
- The scaling path: **individual files → skills → plugins → marketplace**
- Cloud and local agents share instruction files but have different capabilities
- **You now have a project** ready for the rest of the workshop

---

## References

- [GitHub Copilot Overview](https://docs.github.com/en/copilot)
- [About customizing Copilot responses](https://docs.github.com/en/copilot/concepts/prompting/response-customization)
- [VS Code Copilot Customization Overview](https://code.visualstudio.com/docs/copilot/copilot-customization)

---

*Next: [Module 2: Custom Instructions →](../02-custom-instructions/README.md)*
