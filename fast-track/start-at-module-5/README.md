# Task Manager API — Fast-Track Starter (Module 5)

> **Skip Modules 1-4** — Jump straight into skills, plugins, and enterprise features.

---

## What Is This App?

A **Task Manager REST API** with two resources — tasks and categories. It supports:

- **Tasks**: Create, list, update, delete with status tracking (`pending` → `in-progress` → `done`)
- **Categories**: Organize tasks by category (e.g., "Work", "Personal") with color coding
- **Priority levels**: `low`, `medium`, `high` on every task
- **Filtering**: Query tasks by status or category
- **Pagination**: `limit` and `offset` support on list endpoints
- **Validation**: Input validation with descriptive error messages
- **Duplicate detection**: Categories enforce unique names

The app uses **in-memory storage** (no database required) so you can focus entirely on Copilot features.

### Tech Stack

| Component | Technology |
|---|---|
| Runtime | Node.js 20+ (ES modules) |
| Framework | Express 5 |
| Testing | Node.js built-in test runner (`node:test`) |
| Storage | In-memory array (no DB needed) |

---

## Quick Start

```bash
# 1. Copy this folder to your workspace
cp -r fast-track/start-at-module-5 ~/my-workshop-app
cd ~/my-workshop-app

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in VS Code
code .
```

The API runs on `http://localhost:3000`. Try it:

```bash
curl http://localhost:3000/health

# Create a category
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Work", "color": "#3b82f6"}'

# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Build skills for my app", "priority": "high"}'
```

---

## Endpoints

### Tasks
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tasks` | List tasks (`?status=`, `?categoryId=`, `?limit=`, `?offset=`) |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a task (requires `title`; optional `priority`, `categoryId`) |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Categories
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/categories` | List all categories |
| GET | `/api/categories/:id` | Get a single category |
| POST | `/api/categories` | Create a category (unique `name` required) |
| PUT | `/api/categories/:id` | Update a category |
| DELETE | `/api/categories/:id` | Delete a category |

### Other
| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |

## Testing

```bash
npm test
```

---

## What's Already Done (Modules 1-4)

This starter has all the work from Modules 1-4 implemented:

| Module | What Was Done | Files |
|---|---|---|
| **Module 1** | Project setup, working app with 2 resources | `package.json`, `src/`, `tests/` |
| **Module 2** | Custom instructions | `.github/copilot-instructions.md` |
| **Module 2** | Testing & security instructions | `.github/instructions/*.instructions.md` |
| **Module 3** | Feature scaffolding prompt | `.github/prompts/add-feature.prompt.md` |
| **Module 3** | Code review prompt | `.github/prompts/review.prompt.md` |
| **Module 3** | Test generation prompt | `.github/prompts/write-tests.prompt.md` |
| **Module 3** | Endpoint scaffold with variables | `.github/prompts/add-endpoint.prompt.md` |
| **Module 4** | Code reviewer agent | `.github/agents/reviewer.agent.md` |
| **Module 4** | Architect agent | `.github/agents/architect.agent.md` |
| **Module 4** | Security auditor agent | `.github/agents/security-auditor.agent.md` |
| **Module 4** | Domain expert agent | `.github/agents/task-expert.agent.md` |

---

## Next Steps

### → Start Module 5: Skills & Plugins

Open [Module 5: Skills & Plugins](../../modules/05-skills-and-plugins/README.md) and begin at **Exercise 5A**.

In Module 5, you will:
1. Create a dependency analysis skill (`SKILL.md`) for this app
2. Create an app-specific skill for your domain
3. Create a code health assessment skill
4. Design a plugin manifest packaging everything together
5. Explore the Agent Plugin Marketplace

After Module 5, continue with Modules 6 → 7 in order.

### Quick Verification

Before starting, verify everything is working:

1. **Instructions**: Ask Copilot *"What are the conventions for this project?"* — should reference Express, `node:test`, etc.
2. **Prompts**: Type `/add-feature` in Copilot Chat — should be available as a slash command
3. **Agents**: Type `@reviewer` in Copilot Chat — should respond using the 🔴/🟡/🟢 format
4. **App**: Run `npm run dev` and hit `http://localhost:3000/health` — should return `{"status":"ok"}`
