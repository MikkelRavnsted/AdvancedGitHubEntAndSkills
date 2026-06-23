# Module 7: Capstone — Generate Your App

> **Duration: 45 minutes** | **Difficulty: Putting It All Together**

---

## Learning Objectives

- Run the full workflow end-to-end and produce a working app
- Run again with different variables and compare the outputs
- Diagnose and fix issues by editing the right customization file
- Present your workflow to the group

---

## How Everything Connects

```
┌──────────────────────────────────────────────────────────────┐
│  @orchestrator (Module 4)                                    │
│    ↓ reads copilot-instructions.md (Module 2)                │
│    ↓ follows run-workflow SKILL (Module 5)                   │
│    ↓ uses MCP tools if configured (Module 6)                 │
│                                                              │
│  Stage 1: @architect designs → handoff                       │
│  Stage 2: @security-auditor reviews → handoff                │
│  Stage 3: /generate-app creates code (Module 3)              │
│  Stage 4: Tests run → /write-tests if needed                 │
│  Stage 5: @reviewer checks quality → handoff                 │
│  Stage 6: @security-auditor final audit                      │
│                                                              │
│  Output: ./generated/[appName]/                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 7.1 — Choose Your Variables

Pick your first run:

| Variable | Your Choice |
|---|---|
| `appName` | _____________ |
| `theme` | minimal / dark / colorful / retro |
| `features` | basic-crud / basic-crud,auth / basic-crud,search / all |
| `dataStore` | sqlite / json-file / in-memory |
| `framework` | (your language/framework) |

---

## 7.2 — Run the Workflow

Open Copilot Chat and invoke your orchestrator:

> **Note:** The `@orchestrator` agent and full handoff chain require VS Code. If you're using another IDE, follow the **Visual Studio / JetBrains workaround** below.

```
@orchestrator Generate an app with these variables:
- appName: my-tasks
- theme: minimal
- features: basic-crud
- dataStore: json-file
```

(Replace with your own choices from 7.1)

**What should happen:**
1. Orchestrator acknowledges the variables
2. Designs the architecture (or delegates to @architect)
3. Reviews for security concerns
4. Generates the app files in `./generated/my-tasks/`
5. Runs tests
6. Reports what was created

### Visual Studio / JetBrains Workaround

Without custom agents, run the workflow manually using prompts:

1. **Generate** — Run `/generate-app` with your variables (creates the app)
2. **Security review** — Ask Chat: *"Review the generated code in ./generated/my-tasks/ for OWASP Top 10 security issues"*
3. **Code review** — Ask Chat: *"Review the generated code against the conventions in .github/copilot-instructions.md"*
4. **Fix** — Address any issues found, re-run `/generate-app` if needed
5. **Test** — Run tests manually (`npm test` / `pytest` / your command)

You get the same end result — a generated, reviewed, tested app — but you coordinate the stages instead of the orchestrator.

> **If the orchestrator doesn't coordinate all stages**: Your `orchestrator.agent.md` might need stronger instructions. Add "You MUST complete all 7 stages in order. Report progress after each stage."

---

## 7.3 — Verify the Output

Check `./generated/[appName]/`:

| Check | Pass? |
|---|---|
| Folder exists with correct name | |
| Has package manifest (package.json, etc.) | |
| Has entry point / main file | |
| Has route/handler for each feature | |
| Has data models matching dataStore choice | |
| Has tests | |
| Tests pass when run | |
| App starts without errors | |
| Theme reflected in code/config | |

---

## 7.4 — Fix Issues

When something fails (and something will), identify and fix:

| Symptom | Likely Cause | File to Edit |
|---|---|---|
| Wrong folder structure | Prompt lacks specifics | `generate-app.prompt.md` |
| Ignores variables | Agent doesn't pass them | `orchestrator.agent.md` |
| Security issues in output | Auditor skipped | `security-auditor.agent.md` |
| Tests fail | No "run tests" instruction | `generate-app.prompt.md` |
| Convention violations | Instructions unclear | `copilot-instructions.md` |
| Handoff breaks midway | Output format mismatch | Both agent files involved |
| Same output every time | Variables not used in template | `generate-app.prompt.md` |

Fix → Re-run → Verify. This iteration loop IS the skill.

---

## 7.5 — Run Again with Different Variables

Now change at least 2 variables and run again:

```
@orchestrator Generate an app with these variables:
- appName: my-recipes
- theme: colorful
- features: basic-crud,search
- dataStore: sqlite
```

| Variable | Run 1 | Run 2 |
|---|---|---|
| `appName` | ______ | ______ |
| `theme` | ______ | ______ |
| `features` | ______ | ______ |
| `dataStore` | ______ | ______ |

### Compare the Outputs

| Comparison | Expected |
|---|---|
| Different folder names | ✅ |
| Different features present | ✅ (if features changed) |
| Different data layer | ✅ (if dataStore changed) |
| Same conventions/style | ✅ (instructions are constant) |
| Both pass tests | ✅ |

If outputs are identical despite different variables → your prompts/agents aren't using the variables. Fix and re-run.

---

## 7.6 — Present Your Workflow

Show the group (3–5 minutes):

1. **Your file tree** — what `.md` files you created and where
2. **One generation run** — invoke `@orchestrator` live (or show the output folder)
3. **One fix you made** — what broke, which file you edited, how that fixed it
4. **Different variables → different output** — show both `./generated/` folders side by side

> **The point**: You didn't build an app. You built a **workflow that builds apps**. Anyone on your team can run it with different variables and get a working, tested, convention-following app.

---

## Your Final File Tree

```
.github/
├── copilot-instructions.md          ← Module 2
├── instructions/
│   ├── testing.instructions.md      ← Module 2
│   └── security.instructions.md     ← Module 2
├── prompts/
│   ├── add-feature.prompt.md        ← Module 3
│   ├── write-tests.prompt.md        ← Module 3
│   └── generate-app.prompt.md       ← Module 3
├── agents/
│   ├── orchestrator.agent.md        ← Module 4
│   ├── architect.agent.md           ← Module 4
│   ├── reviewer.agent.md            ← Module 4
│   └── security-auditor.agent.md    ← Module 4
├── skills/
│   ├── analyze-deps/SKILL.md        ← Module 5
│   └── run-workflow/SKILL.md        ← Module 5
└── workflow-tests.md                ← Module 5
.vscode/
└── mcp.json                         ← Module 6
AGENTS.md                            ← Module 2
generated/
└── [appName]/                       ← Output (Module 7)
```

---

## Checkpoint (Final)

- [x] Workflow runs end-to-end (orchestrator coordinates all stages)
- [x] Generated app in `./generated/[appName]/` — tests pass
- [x] Ran with different variables — outputs differ correctly
- [x] At least one issue found, diagnosed, and fixed
- [x] Presented workflow to group

---

*Previous: [← Module 6](../06-enterprise-mcp-config/README.md) | [Back to Start →](../01-foundations/README.md)*
