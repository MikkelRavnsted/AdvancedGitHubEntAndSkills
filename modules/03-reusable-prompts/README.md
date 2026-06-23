# Module 3: Reusable Prompt Files

> **Duration: 35 minutes** | **Difficulty: Intermediate**

---

## Learning Objectives

- Create `.prompt.md` files with frontmatter, variables, and file references
- Build prompts that generate code following your instructions (Module 2)
- Design the variable system that makes your workflow produce different results
- Create the `/generate-app` prompt — the core generation template

---

## Role in the Workflow

Prompts are the **generation templates**. Instructions (Module 2) define HOW code should look. Prompts define WHAT code to create. In the final workflow, agents (Module 4) invoke your prompts to produce the actual app.

---

## 3.1 — Anatomy of a Prompt File

Prompts live in `.github/prompts/` and show up as **slash commands** in Copilot Chat.

To use a prompt: type `/` in Chat, pick your prompt from the list, fill in variables when asked.

```markdown
---
description: "What this prompt does (shown in command list)"
mode: "agent"
tools: ["file_system", "terminal"]
variables:
  - name: "resource"
    description: "Resource name (e.g., tasks, users)"
  - name: "operations"
    description: "CRUD operations to generate"
    default: "create, read, update, delete"
---

# Generate Endpoint: {{resource}}

Create a REST API endpoint for `{{resource}}` with operations: {{operations}}.

## Requirements
- Follow conventions in .github/copilot-instructions.md
- Include input validation and error handling
- Generate tests for each operation
```

**Key parts:**
- `mode: "agent"` → can create files and run commands
- `variables` → what changes between invocations (the inputs)
- `{{variableName}}` → replaced at runtime
- File references → `[conventions](.github/copilot-instructions.md)` for explicit context

---

## 3.2 — Dos and Don'ts

| ✅ DO | ❌ DON'T |
|---|---|
| Use `mode: "agent"` for file-creating prompts | Forget `tools` — agent can't act without them |
| Define variables for anything that changes | Hardcode values that should differ between runs |
| Reference instruction files for conventions | Copy-paste rules from instructions into prompts |
| Specify exact output structure (files to create) | Put agent personality/role here (use `.agent.md`) |
| Add "After generating, run tests and fix" | Put multi-step decision logic (use skills) |
| Keep each prompt focused on ONE task | Make a prompt that does everything |

---

## 3.3 — Build Your Prompts

Create these three files in `.github/prompts/`. Each becomes a slash command you can run immediately.

### `add-feature.prompt.md`
```markdown
---
description: "Add a new feature with implementation and tests"
mode: "agent"
tools: ["file_system", "terminal"]
---

# Add Feature

Create a new feature following project conventions.

## Create
1. Implementation in the appropriate directory
2. Tests covering main behaviors
3. Route/endpoint (if applicable)

## Rules
- Follow .github/copilot-instructions.md
- Include input validation and error handling
- Run tests after creating to verify
```

### `write-tests.prompt.md`
```markdown
---
description: "Generate tests for existing code"
mode: "agent"
tools: ["file_system", "terminal"]
---

# Write Tests

Generate tests using Arrange-Act-Assert pattern:
- Unit tests for all public functions
- Error/edge case tests
- Descriptive names: "should [behavior] when [condition]"
- Run tests after writing to verify they pass
```

### `generate-app.prompt.md` — The main generation prompt (CRITICAL)

This is the heart of your workflow. When you run this in Module 7, it produces the actual app:

```markdown
---
description: "Generate a complete app in a new folder from variables"
mode: "agent"
tools: ["file_system", "terminal"]
variables:
  - name: "appName"
    description: "Name for the generated application"
  - name: "theme"
    description: "Visual theme"
    default: "minimal"
  - name: "features"
    description: "Comma-separated features to include"
    default: "basic-crud"
  - name: "dataStore"
    description: "Storage backend"
    default: "sqlite"
---

# Generate App: {{appName}}

Create a complete application in `./generated/{{appName}}/`.

## Configuration
- Theme: {{theme}}
- Features: {{features}}
- Data Store: {{dataStore}}

## Generate
1. Project structure with package manifest
2. Entry point and configuration
3. Route handlers for each feature in {{features}}
4. Data models for {{dataStore}}
5. Tests for all features
6. README with setup instructions

## After Generation
- Install dependencies
- Run tests — fix any failures
- Report what was created
```

---

## 3.4 — Design Your Workflow Variables

List what should change between workflow runs:

| Variable | What It Affects |
|---|---|
| `appName` | Folder name, package name, references |
| `theme` | Styling, UI choices, formatting |
| `features` | Which modules/routes get created |
| `dataStore` | Storage layer, model patterns |
| `framework` | All code patterns and imports |

Write these down — your agents (Module 4) will pass these variables to your prompts.

---

## 3.5 — Test Your Prompts

Run `/generate-app` right now with a test name:

1. Open Copilot Chat (`Ctrl+Shift+I`)
2. Type `/generate-app`
3. When asked for variables, use: `appName: test-run-1`, `features: basic-crud`, `dataStore: json-file`
4. Let it run

**Then inspect the output:**
- Did it create `./generated/test-run-1/`?
- Are the files structured like your instructions specify?
- Does `features: basic-crud` actually show up in the code?
- Do tests pass?

If something's wrong → edit `generate-app.prompt.md` → delete the test folder → run again.

> **Tip**: If the output ignores your variables, add "You MUST use the exact values provided above. Do not substitute defaults." to the prompt.

---

## Checkpoint

- [x] `.github/prompts/add-feature.prompt.md`
- [x] `.github/prompts/write-tests.prompt.md`
- [x] `.github/prompts/generate-app.prompt.md` — the core generation prompt
- [x] Variable list designed for your app
- [x] At least one prompt tested and improved based on output

---

*Previous: [← Module 2](../02-custom-instructions/README.md) | Next: [Module 4: Custom Agents →](../04-custom-agents/README.md)*
