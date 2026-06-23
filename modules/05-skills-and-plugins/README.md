# Module 5: Skills & Workflow Validation

> **Duration: 40 minutes** | **Difficulty: Advanced**

---

## Learning Objectives

- Create `SKILL.md` files that teach agents step-by-step procedures
- Wire skills into your agents so they know when/how to use them
- Test the full workflow pipeline and fix issues through iteration
- Validate that variable changes produce different (correct) output

> **\u26a0\ufe0f VS Code only:** Skills (`SKILL.md` files) are currently only supported in VS Code. If you're using another IDE, you can still create these files for use with VS Code or GitHub.com Copilot Chat later.

---

## Role in the Workflow

Skills are **step-by-step procedures** that make agents smarter at specific tasks. Without skills, agents use general knowledge. With skills, they follow YOUR project-specific processes exactly.

You already have agents (Module 4) that know their role. Now you give them **procedures** to follow and then **test the entire pipeline** end-to-end.

---

## 5.1 — The SKILL.md File

Skills live in `.github/skills/[skill-name]/SKILL.md` and are discovered by agents automatically.

```markdown
# Skill Name

## Description
What this skill does.

## When to Use
- [Specific trigger conditions — agents match on these]

## Steps
1. [Precise, numbered step]
2. [Another step with specific commands]
3. [Expected output at each step]

## Tools Required
- terminal, file_system
```

### Dos and Don'ts

| ✅ DO | ❌ DON'T |
|---|---|
| Number every step explicitly | Write vague steps like "analyze the code" |
| Include specific commands to run | Put agent personality here (use .agent.md) |
| Define clear "When to Use" triggers | Duplicate rules from instructions |
| List required tools | Create one massive skill (split them) |
| Add expected output format | Skip the trigger conditions |

---

## 5.2 — Build Your Skills

### `analyze-deps` — Dependency checking

Create `.github/skills/analyze-deps/SKILL.md`:

```markdown
# Analyze Dependencies

## Description
Checks project dependencies for security issues and outdated packages.

## When to Use
- When asked to "check dependencies" or "audit packages"
- Before adding new dependencies to the project

## Steps
1. Identify package manager (look for package.json, pyproject.toml, etc.)
2. Run audit: `npm audit` / `pip-audit` / equivalent
3. Check for outdated: `npm outdated` / `pip list --outdated`
4. Report: total deps, vulnerabilities (by severity), outdated packages

## Tools Required
- terminal, file_system
```

### `run-workflow` — The full workflow procedure

Create `.github/skills/run-workflow/SKILL.md`:

```markdown
# Run Development Workflow

## Description
Executes the full agentic workflow from variables to generated app.

## When to Use
- When asked to "build a feature end-to-end" or "run the full workflow"

## Steps
1. Collect variables: appName, theme, features, dataStore
2. @architect designs the app with provided variables
3. @security-auditor reviews the design
4. /generate-app creates the app in ./generated/[appName]/
5. Run tests — fix failures
6. @reviewer checks code quality
7. @security-auditor final audit
8. Report: all stages passed or issues found

## Tools Required
- terminal, file_system
```

---

## 5.3 — Wire Skills Into Your Orchestrator

Open `.github/agents/orchestrator.agent.md` (created in Module 4) and **add** this section anywhere in the file:

```markdown
## Available Skills
- **analyze-deps**: Use before adding new dependencies
- **run-workflow**: Reference for full workflow steps

## Available Prompts
- `/generate-app`: Main app generation (Stage 4)
- `/write-tests`: Test generation (Stage 5)
- `/add-feature`: Individual feature scaffolding
```

This makes the orchestrator aware of what tools it has. Agents discover skills automatically via "When to Use" triggers, but explicit references make them more reliable.

---

## 5.4 — Test the Full Pipeline

This is where you validate everything works together. Create `.github/workflow-tests.md` as a checklist you'll run through:

```markdown
# Workflow Test Checklist

## Test 1: @architect respects variables
Run in Chat: "@architect Design a task app. Variables: appName=test1, dataStore=json-file"
✅ Must use json-file (not sqlite or in-memory)
✅ Must produce handoff output format
If fails → fix architect.agent.md

## Test 2: Handoff chain works
Copy @architect output → paste to @security-auditor
✅ Security-auditor understands the context
✅ Produces CLEARED/ISSUES verdict
If fails → align output formats between agents

## Test 3: /generate-app produces runnable code
Run: /generate-app with appName="test-app" theme="minimal" features="basic-crud"
✅ Folder ./generated/test-app/ exists
✅ Tests pass when run
✅ App starts correctly
If fails → fix generate-app.prompt.md

## Test 4: Different variables → different output
Run 1: features="basic-crud", dataStore="json-file"
Run 2: features="basic-crud,auth", dataStore="sqlite"
✅ Run 2 has auth files Run 1 doesn't
✅ Run 2 uses sqlite instead of json
If identical → variables aren't being used in the prompt
```

### How to Run Each Test

1. Run the test exactly as described above in Copilot Chat
2. Check the ✅ items against the actual output
3. If any check fails: identify which file caused it, edit that file, re-run
4. Move to the next test only when the current one passes

### Common Fixes

| Problem | File to Fix | What to Add |
|---|---|---|
| Agent ignores variables | `.agent.md` | `## Variable Handling` section |
| Generated code doesn't run | `.prompt.md` | "Run tests and fix failures after generating" |
| Handoff breaks | Both agents | Align output format of sender with input of receiver |
| Same output regardless of variables | `.prompt.md` | More explicit variable usage in template |
| Skill steps skipped | `SKILL.md` | Number steps + "Do NOT skip any step" |

---

## 5.5 — The Reproducibility Test

Run `/generate-app` twice with **identical variables**. Both outputs should be:
- Structurally consistent (same file layout)
- Functionally equivalent (both pass tests)

If wildly different → your prompts need more constraints (exact file paths, explicit structure).

---

## Checkpoint

- [x] `.github/skills/analyze-deps/SKILL.md` — dependency analysis
- [x] `.github/skills/run-workflow/SKILL.md` — workflow procedure
- [x] Orchestrator updated to reference skills and prompts
- [x] `.github/workflow-tests.md` — test checklist created
- [x] Every agent tested and at least one fix applied
- [x] `/generate-app` tested with different variables → different results
- [x] Reproducibility verified (same input → consistent output)

---

*Previous: [← Module 4](../04-custom-agents/README.md) | Next: [Module 6: MCP & Enterprise →](../06-enterprise-mcp-config/README.md)*
