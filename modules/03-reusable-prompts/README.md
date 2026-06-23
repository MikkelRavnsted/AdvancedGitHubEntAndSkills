# Module 3: Reusable Prompt Files

> **Duration: 35 minutes** | **Difficulty: Intermediate**

---

## Learning Objectives

- Create `.prompt.md` files with frontmatter, `argument-hint`, and file references
- Build prompts that generate code following your instructions (Module 2)
- Design the input system that makes your workflow produce different results
- Create the `/generate-app` prompt — the core generation template

---

## Role in the Workflow

Prompts are the **generation templates**. Instructions (Module 2) define HOW code should look. Prompts define WHAT code to create. In the final workflow, agents (Module 4) invoke your prompts to produce the actual app.

---

## 3.1 — Anatomy of a Prompt File

Prompts live in `.github/prompts/` and show up as **slash commands** in Copilot Chat.

To use a prompt: type `/` in Chat, pick your prompt from the list, fill in variables when asked.

> **IDE support:** Reusable prompts work in VS Code, Visual Studio, and JetBrains IDEs. They are not currently supported in Neovim.

```markdown
---
description: "What this prompt does (shown in command list)"
mode: "agent"
tools: [execute, read, edit, search]
argument-hint: "resource name and operations (e.g., tasks create,read,update,delete)"
---

# Generate Endpoint: ${input:resource}

Create a REST API endpoint for `${input:resource}` with operations: ${input:operations}.

## Requirements
- Follow conventions in .github/copilot-instructions.md
- Include input validation and error handling
- Generate tests for each operation
```

**Key parts:**
- `mode: "agent"` → can create files and run commands
- `argument-hint` → hint text shown in the chat input to guide users
- `${input:variableName}` → prompts user for input at runtime
- File references → `[conventions](.github/copilot-instructions.md)` for explicit context

---

## 3.2 — Dos and Don'ts

| ✅ DO | ❌ DON'T |
|---|---|
| Use `mode: "agent"` for file-creating prompts | Forget `tools` — agent can't act without them |
| Use `argument-hint` to guide user input | Hardcode values that should differ between runs |
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
tools: [execute, read, edit, search]
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
tools: [execute, read, edit, search]
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
description: "Generate a complete app in a new folder"
mode: "agent"
tools: [execute, read, edit, search]
argument-hint: "appName theme features dataStore (e.g., my-app minimal basic-crud sqlite)"
---

# Generate App: ${input:appName}

Create a complete application in `./generated/${input:appName}/`.

## Configuration
- Theme: ${input:theme}
- Features: ${input:features}
- Data Store: ${input:dataStore}

## Generate
1. Project structure with package manifest
2. Entry point and configuration
3. Route handlers for each feature in ${input:features}
4. Data models for ${input:dataStore}
5. Tests for all features
6. README with setup instructions

## After Generation
- Install dependencies
- Run tests — fix any failures
- Report what was created
```

---

## 3.4 — Design Your Input Variables

List what should change between workflow runs:

| Variable | What It Affects |
|---|---|
| `appName` | Folder name, package name, references |
| `theme` | Styling, UI choices, formatting |
| `features` | Which modules/routes get created |
| `dataStore` | Storage layer, model patterns |
| `framework` | All code patterns and imports |

Write these down — your agents (Module 4) will pass these as inputs to your prompts.

---

## 3.5 — Test Your Prompts

Run `/generate-app` right now with a test name:

1. Open Copilot Chat (`Ctrl+Shift+I` in VS Code, or your IDE's Copilot Chat shortcut)
2. Type `/generate-app`
3. Provide input in the chat: `appName=test-run-1 features=basic-crud dataStore=json-file`
4. Let it run

**Then inspect the output:**
- Did it create `./generated/test-run-1/`?
- Are the files structured like your instructions specify?
- Does `features: basic-crud` actually show up in the code?
- Do tests pass?

If something's wrong → edit `generate-app.prompt.md` → delete the test folder → run again.

> **Tip**: If the output ignores your inputs, add "You MUST use the exact values provided above. Do not substitute defaults." to the prompt.

---

## Checkpoint

- [x] `.github/prompts/add-feature.prompt.md`
- [x] `.github/prompts/write-tests.prompt.md`
- [x] `.github/prompts/generate-app.prompt.md` — the core generation prompt
- [x] Input variables designed for your app
- [x] At least one prompt tested and improved based on output

---

*Previous: [← Module 2](../02-custom-instructions/README.md) | Next: [Module 4: Custom Agents →](../04-custom-agents/README.md)*
