# Fast-Track: Start at Module 5

> **Modules 1-4 are done.** Jump straight into skills, workflow validation, and the capstone.

---

## What's Here

This workspace has a **reference Task Manager API** (2 resources) and all Module 1-4 customization files pre-built — including the prompts with variables AND agents with handoff protocols. You'll build skills, test the pipeline, and run the full workflow.

### Reference App (for comparison)

A Task Manager API with tasks + categories, priority levels, filtering, and pagination.

```bash
npm install
npm run dev
# → http://localhost:3000

curl http://localhost:3000/health
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Build skills", "priority": "high"}'
```

### Pre-built Customization Files (Modules 1-4)

| File | Purpose | Module |
|---|---|---|
| `.github/copilot-instructions.md` | Project conventions | 2 |
| `.github/instructions/testing.instructions.md` | Test patterns | 2 |
| `.github/instructions/security.instructions.md` | Security rules | 2 |
| `.github/prompts/add-feature.prompt.md` | Feature scaffolding | 3 |
| `.github/prompts/write-tests.prompt.md` | Test generation | 3 |
| `.github/prompts/generate-app.prompt.md` | **App generation with variables** | 3 |
| `.github/agents/architect.agent.md` | Designs app structure (with handoff) | 4 |
| `.github/agents/reviewer.agent.md` | Code quality review (with handoff) | 4 |
| `.github/agents/security-auditor.agent.md` | Security audit (with handoff) | 4 |
| `.github/agents/orchestrator.agent.md` | **Coordinates full workflow** | 4 |

---

## Verify Before Starting

Open Copilot Chat (`Ctrl+Shift+I`) and test:

1. **Instructions**: Ask *"What are the conventions for this project?"* → should reference Express, `node:test`
2. **Prompts**: Type `/generate-app` → should appear as a slash command
3. **Agents**: Type `@orchestrator` → should respond as the workflow coordinator
4. **App**: Run `npm run dev` → `http://localhost:3000/health` returns `{"status":"ok"}`

---

## What You'll Build (Modules 5-7)

| Module | What You Create | Result |
|---|---|---|
| **5** | Skills (SKILL.md) + workflow testing | Procedures + pipeline validation |
| **6** | MCP config (optional) | External tool access |
| **7** | Run the full workflow | Generated app in `./generated/[appName]/` |

Your main tasks:
1. Create skills that teach agents specific procedures
2. Wire skills into the orchestrator
3. Test the full pipeline (does @architect → @security-auditor → /generate-app → @reviewer work?)
4. Run `@orchestrator` with variables and get a working app out

---

## → Start Module 5

Open [Module 5: Skills & Validation](../../modules/05-skills-and-plugins/README.md) and begin at Section 5.1.
