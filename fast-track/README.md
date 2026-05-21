# Fast-Track Starters

> **Skip ahead if you already know the basics** — pre-built apps with all prior modules implemented.

---

## Who Is This For?

If you already have experience with some of the workshop topics, you can skip the earlier modules and jump in where it gets new for you:

| Your Experience | Start At | Use |
|---|---|---|
| New to Copilot customization | **Module 1** | Start from scratch (the normal path) |
| Already know custom instructions & file structure | **Module 3** | `fast-track/start-at-module-3/` |
| Already know instructions, prompts, AND agents | **Module 5** | `fast-track/start-at-module-5/` |

---

## How to Use

### Option A: Start at Module 3 (Reusable Prompts)

You already know how to set up `copilot-instructions.md` and `.instructions.md` files. This starter has a working app with all Module 1-2 content implemented.

```bash
# Copy the starter to your own workspace
cp -r fast-track/start-at-module-3 ~/my-workshop-app
cd ~/my-workshop-app

# Install and run
npm install
npm run dev

# Open in VS Code
code .
```

**What's included:**
- ✅ Working Task Manager API (Express, Node.js)
- ✅ CRUD endpoints with validation and error handling
- ✅ Tests using Node.js built-in test runner
- ✅ `.github/copilot-instructions.md` — full project conventions
- ✅ `.github/instructions/testing.instructions.md` — test patterns
- ✅ `.github/instructions/security.instructions.md` — security rules

**Go to:** [Module 3: Reusable Prompts →](../modules/03-reusable-prompts/README.md)

---

### Option B: Start at Module 5 (Skills & Plugins)

You're comfortable with instructions, prompts, AND agents. This starter has a more complete app with Modules 1-4 fully implemented.

```bash
# Copy the starter to your own workspace
cp -r fast-track/start-at-module-5 ~/my-workshop-app
cd ~/my-workshop-app

# Install and run
npm install
npm run dev

# Open in VS Code
code .
```

**What's included:**
- ✅ Working Task Manager API with Tasks + Categories (2 resources)
- ✅ Priority system, filtering, pagination
- ✅ Full test suite
- ✅ `.github/copilot-instructions.md` — project conventions
- ✅ `.github/instructions/` — testing + security instructions
- ✅ `.github/prompts/` — add-feature, review, write-tests, add-endpoint
- ✅ `.github/agents/` — reviewer, architect, security-auditor, task-expert

**Go to:** [Module 5: Skills & Plugins →](../modules/05-skills-and-plugins/README.md)

---

## About the Reference App

Both starters use a **Task Manager API** built with:
- **Node.js 20+** with ES modules
- **Express 5** for the web framework
- **Node.js test runner** (`node:test`) for tests
- **In-memory storage** (no database setup required)

The app is intentionally simple so you can focus on learning Copilot features rather than wrestling with app complexity.

> **Prefer a different language?** You can use these starters as a reference for what Copilot config files to create, then build your own app in your preferred language. The `.github/` directory structure is language-agnostic.

---

## Quick Validation

After setting up, verify everything works:

```bash
# Run the app
npm run dev

# In another terminal, test it
curl http://localhost:3000/health
# → {"status":"ok","timestamp":"..."}

curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My first task"}'
# → {"id":"...","title":"My first task","status":"pending",...}
```

Then open Copilot Chat and verify:
- Ask: *"What are the coding conventions for this project?"* — should reference your instructions
- Try: `/add-feature` (Module 5 starter) — should be available as a slash command
- Try: `@reviewer` (Module 5 starter) — should respond with the defined format
