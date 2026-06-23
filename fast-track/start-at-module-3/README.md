# Fast-Track: Start at Module 3

> **Modules 1-2 are done.** Jump straight into building reusable prompts for your generation workflow.

---

## What's Here

This workspace has a **reference Task Manager API** and all Module 1-2 customization files pre-built. The reference app shows what your workflow should eventually *generate* — it's the target output.

### Reference App (for comparison)

A simple CRUD API for tasks: create, read, update, delete with status tracking.

```bash
npm install
npm run dev
# → http://localhost:3000

curl http://localhost:3000/health
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Copilot prompts"}'
```

### Pre-built Customization Files (Modules 1-2)

| File | Purpose |
|---|---|
| `.github/copilot-instructions.md` | Project conventions (code style, commands, structure) |
| `.github/instructions/testing.instructions.md` | Test patterns for generated test files |
| `.github/instructions/security.instructions.md` | Security rules for all generated code |

---

## Verify Before Starting

Open Copilot Chat (`Ctrl+Shift+I`) and type:

```
What are the coding conventions for this project?
```

✅ Should reference Express, ES modules, `node:test`, kebab-case, etc.  
❌ If it gives generic advice → the `.github/` folder isn't being picked up (check the path).

---

## What You'll Build (Modules 3-7)

Starting at Module 3, you'll create the generation workflow:

| Module | What You Create | Result |
|---|---|---|
| **3** | `/generate-app` prompt with variables | Template that creates apps from inputs |
| **4** | @architect, @security-auditor, @reviewer, @orchestrator | Specialists that coordinate the workflow |
| **5** | Skills + workflow testing | Procedures + validation that it all works |
| **6** | MCP config (optional) | External tool access for agents |
| **7** | Run the full workflow | Generated app in `./generated/[appName]/` |

---

## → Start Module 3

Open [Module 3: Reusable Prompts](../../modules/03-reusable-prompts/README.md) and begin at Section 3.1.

After Module 3, continue with Modules 4 → 5 → 6 → 7 in order.

### Quick Verification

Before starting, verify Copilot picks up your instructions:
1. Open Copilot Chat in VS Code
2. Ask: *"What are the coding conventions for this project?"*
3. ✅ It should reference Express, Node.js test runner, and the patterns from `copilot-instructions.md`
