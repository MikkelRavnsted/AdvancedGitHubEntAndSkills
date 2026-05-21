# Task Manager API — Fast-Track Starter (Module 3)

> **Skip Modules 1-2** — Jump straight into building reusable prompts.

---

## What Is This App?

A simple **Task Manager REST API** that lets you create, read, update, and delete tasks. Each task has:

- **Title** and **description**
- **Status** tracking: `pending` → `in-progress` → `done`
- Automatic **timestamps** (created/updated)
- **UUID-based IDs**

The app uses **in-memory storage** (no database required) so you can focus entirely on Copilot features without any external setup.

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
cp -r fast-track/start-at-module-3 ~/my-workshop-app
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
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Copilot prompts"}'
```

---

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/tasks` | List tasks (supports `?status=`, `?limit=`, `?offset=`) |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a task (requires `title`) |
| PUT | `/api/tasks/:id` | Update a task (title, description, status) |
| DELETE | `/api/tasks/:id` | Delete a task |

## Testing

```bash
npm test
```

---

## What's Already Done (Modules 1-2)

This starter has all the work from Modules 1-2 implemented:

| Module | What Was Done | Files |
|---|---|---|
| **Module 1** | Project setup, git init, working app | `package.json`, `src/`, `tests/` |
| **Module 2** | Custom instructions configured | `.github/copilot-instructions.md` |
| **Module 2** | Testing instructions | `.github/instructions/testing.instructions.md` |
| **Module 2** | Security instructions | `.github/instructions/security.instructions.md` |

---

## Next Steps

### → Start Module 3: Reusable Prompts

Open [Module 3: Reusable Prompts](../../modules/03-reusable-prompts/README.md) and begin at **Exercise 3A**.

In Module 3, you will:
1. Create a `/add-feature` prompt to scaffold new features
2. Create a `/review` prompt for code review
3. Create a `/write-tests` prompt for test generation
4. Create a `/add-endpoint` prompt with template variables
5. **Use these prompts to actually build new features** into this app

After Module 3, continue with Modules 4 → 5 → 6 → 7 in order.

### Quick Verification

Before starting, verify Copilot picks up your instructions:
1. Open Copilot Chat in VS Code
2. Ask: *"What are the coding conventions for this project?"*
3. ✅ It should reference Express, Node.js test runner, and the patterns from `copilot-instructions.md`
