# Fast-Track Starters

> **Skip ahead if you already know the basics** — workspaces with prior modules already implemented so you can jump into the new material.

---

## Who Is This For?

If you already have experience with some of the workshop topics, skip to where it gets new:

| Your Experience | Start At | What's Pre-built |
|---|---|---|
| New to Copilot customization | **Module 1** | Nothing — start from scratch |
| Know instructions & file types | **Module 3** | Instructions + reference app |
| Know instructions, prompts, AND agents | **Module 5** | Instructions + prompts + agents + reference app |

---

## The Goal (Same for Everyone)

Regardless of where you start, the end goal is identical:

```
Build a set of customization files (.instructions.md, .prompt.md, .agent.md, SKILL.md)
that form an agentic workflow → run @orchestrator with variables → get a generated app
in ./generated/[appName]/
```

The fast-track starters give you the earlier modules' output so you can focus on the modules that are new to you.

---

## Option A: Start at Module 3 (Reusable Prompts)

You already know `copilot-instructions.md` and `.instructions.md`. This starter has the workspace set up with instructions ready — you'll build the prompts, agents, skills, and orchestrator.

```bash
cp -r fast-track/start-at-module-3 ~/my-workshop
cd ~/my-workshop
npm install
code .
```

**What's included (Modules 1-2 done):**
- ✅ Reference Task Manager API (for testing your workflow output against)
- ✅ `.github/copilot-instructions.md` — project conventions
- ✅ `.github/instructions/testing.instructions.md` — test patterns
- ✅ `.github/instructions/security.instructions.md` — security rules

**What you'll build (Modules 3-7):**
- Prompts including `/generate-app` with variables
- Agents with handoff protocols (@architect, @security-auditor, @reviewer, @orchestrator)
- Skills for workflow automation
- Run the full workflow → generate an app in `./generated/`

**Go to:** [Module 3: Reusable Prompts →](../modules/03-reusable-prompts/README.md)

---

## Option B: Start at Module 5 (Skills & Validation)

You're comfortable with instructions, prompts, AND agents. This starter has the full workflow plumbing ready — you'll build skills, wire everything together, test the pipeline, and run the capstone.

```bash
cp -r fast-track/start-at-module-5 ~/my-workshop
cd ~/my-workshop
npm install
code .
```

**What's included (Modules 1-4 done):**
- ✅ Reference Task Manager API (2 resources, full test suite)
- ✅ `.github/copilot-instructions.md` — project conventions
- ✅ `.github/instructions/` — testing + security instructions
- ✅ `.github/prompts/` — add-feature, write-tests, **generate-app** (with variables)
- ✅ `.github/agents/` — architect, reviewer, security-auditor, **orchestrator** (with handoffs)

**What you'll build (Modules 5-7):**
- Skills (SKILL.md) for workflow procedures
- Wire skills into the orchestrator
- Test the full pipeline (workflow-tests.md)
- Run the capstone — generate apps with different variables

**Go to:** [Module 5: Skills & Validation →](../modules/05-skills-and-plugins/README.md)

---

## Quick Validation

After copying a starter, verify it works:

```bash
# Check the reference app runs
npm run dev
curl http://localhost:3000/health
# → {"status":"ok"}
```

Then open Copilot Chat (`Ctrl+Shift+I`) and verify:
- Ask: *"What are the coding conventions for this project?"* — should reference your instructions
- Module 5 starter: Type `/generate-app` — should be available as a slash command
- Module 5 starter: Type `@orchestrator` — should respond as the workflow coordinator

> **Prefer a different language?** The `.github/` structure is language-agnostic. Use the reference app as a model for what your workflow should generate, then adapt the instructions/prompts for your preferred stack.
