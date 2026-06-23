# Module 4: Custom Agents & Handoff Protocols

> **Duration: 45 minutes** | **Difficulty: Intermediate → Advanced**

---

## Learning Objectives

- Create specialized agents with `.agent.md` files
- Build handoff protocols so agents pass context to each other
- Create an orchestrator agent that coordinates the full workflow
- Test agent outputs and iterate on agent files to fix issues

> **\u26a0\ufe0f VS Code only:** Custom agents (`.agent.md` files) and the `handoffs` frontmatter are currently only supported in VS Code. If you're using Visual Studio or JetBrains, you can still create these files (they're Markdown) and test them via VS Code or GitHub.com Copilot Chat.>
> **Workaround for Visual Studio / JetBrains:** You can replicate the agentic workflow manually using prompts:
> 1. Run `/generate-app` with your variables (prompts are supported)
> 2. Copy the output and ask Copilot Chat to review it for security issues
> 3. Ask Copilot Chat to review code quality against your instructions
> 4. Fix any issues and re-run
>
> You lose the automated handoff chain, but still get the benefit of instructions + prompts + variables driving consistent output.
---

## Role in the Workflow

Agents are the **specialists that orchestrate** your workflow. Without agents, you run prompts manually. With agents, you have an assembly line where each specialist handles one stage and hands off to the next.

Instructions (Module 2) = rules. Prompts (Module 3) = templates. **Agents = judgment + coordination.**

---

## 4.1 — Anatomy of an Agent File

Agent files live in `.github/agents/` and are invoked with `@agent-name` in Copilot Chat.

**How it works in practice:**
- You type `@architect Design a task manager with json-file storage`
- Copilot becomes the architect, follows the `.agent.md` instructions
- It responds with structured output
- You copy that output and pass it to the next agent: `@security-auditor Review this design: [paste]`

> In the capstone (Module 7), the `@orchestrator` handles this whole chain for you.

```markdown
---
description: "[What this agent does — shown in agent picker]"
tools: [execute, read, edit, search, web, agent, todo]
handoffs:
  - label: "[Button text for the handoff]"
    agent: "[target-agent-name]"
    prompt: "[Context/instructions passed to the next agent]"
    send: true/false
    model: "[Model Name] (copilot)"
---

# Agent Name

You are a [role]. Your job is to [specific responsibility].

## How You Work
1. [Step-by-step process]
2. [What you check]
3. [What you produce]

## Output Format
[Structured format other agents can consume]

## Rules
- [Constraints and boundaries]
```

### The `handoffs` Frontmatter Property

The `handoffs` property in the YAML frontmatter declares **automatic handoff buttons** that appear after the agent completes its response. This replaces the manual copy-paste workflow with a single click.

| Property | Required | Description |
|----------|----------|-------------|
| `label` | Yes | Button text shown to the user (e.g., "Start Implementation") |
| `agent` | Yes | The target agent name (without `@`) to hand off to |
| `prompt` | No | Instructions/context passed to the next agent |
| `send` | No | When `true`, automatically sends the handoff (no confirmation) |
| `model` | No | Override which model the target agent uses (format: `"Model Name (copilot)"`) |

**Key details:**
- `handoffs` is an array — an agent can declare multiple handoff targets
- The `prompt` field seeds the next agent's conversation with context
- Set `send: true` to auto-trigger the handoff without user confirmation
- Use `model` to ensure the target agent runs on a specific model (e.g., `GPT-4.1 (copilot)`)
- Use multiple entries when an agent has conditional next steps (e.g., pass vs. fail)
- Handoff buttons give the user control — they choose when to trigger the next stage

### Dos and Don'ts

| ✅ DO | ❌ DON'T |
|---|---|
| One focused role per agent | Give an agent multiple unrelated jobs |
| Define explicit output format | Leave output unstructured |
| Use `handoffs` frontmatter for next steps | Rely on manual copy-paste between agents |
| Add `## Handoff Output` section | Repeat rules from instructions (inherited) |
| Reference prompts: "Use `/add-feature`" | Put task-specific steps here (use skills) |
| Restrict tools to what's needed | Make agents too generic ("helpful assistant") |
| Add `## Variable Handling` section | Assume it'll figure out variables |

---

## 4.2 — Build Your Agents

Create these four files in `.github/agents/`. After creating each one, **test it immediately** (Section 4.4) before moving to the next.

### `architect.agent.md` — Designs the app structure
```markdown
---
description: Designs app architecture based on requirements and variables
tools: [execute, read, edit, search]
handoffs:
  - label: Send to Security Auditor
    agent: security-auditor
    prompt: Review this architecture design for security issues
    send: true
---

# Architect

You design application architecture. Read existing code patterns before proposing new ones.

## How You Work
1. Receive variables (appName, features, dataStore, theme)
2. Design file structure, data models, and routes
3. Present 2 approaches with trade-offs, recommend one

## Handoff Output
When done, produce:
- **Files to Create**: [list with paths]
- **Data Models**: [schema for each]
- **Routes**: [endpoint list]
- **Ready for**: @security-auditor review

## Variable Handling
ALWAYS use provided variables. Never substitute defaults:
- features → determines which modules exist
- dataStore → determines model layer
- theme → affects naming/formatting choices
```

### `security-auditor.agent.md` — Reviews for vulnerabilities
```markdown
---
description: Reviews designs and code for security vulnerabilities
tools: [read, search, web]
handoffs:
  - label: Proceed to Implementation
    agent: orchestrator
    prompt: Security review CLEARED. Proceed with implementation.
    send: true
  - label: Return to Architect
    agent: architect
    prompt: Security issues found. Please revise the design to address these findings.
    send: true
---

# Security Auditor

You review designs and code for security vulnerabilities.

## How You Work
1. Check for OWASP Top 10 issues
2. Verify input validation, auth patterns, safe queries
3. Produce verdict: CLEARED or ISSUES FOUND

## Handoff Output
- **Verdict**: CLEARED / ISSUES FOUND
- **Findings**: [list with severity if any]
- **Ready for**: implementation (if cleared) or back to architect
```

### `reviewer.agent.md` — Validates code quality
```markdown
---
description: Reviews generated code against project conventions
tools: [read, search]
handoffs:
  - label: Send to Final Security Audit
    agent: security-auditor
    prompt: Code review APPROVED. Please perform a final security audit on the implementation.
    send: true
---

# Code Reviewer

You review code against .github/copilot-instructions.md conventions.

## Output Format
### 🔴 Must Fix — [blocking issues]
### 🟡 Should Fix — [important improvements]  
### 🟢 Good — [what's done well]

## Handoff Output
- **Verdict**: APPROVED / CHANGES REQUIRED
- **Issues**: [list if any]
- **Ready for**: @security-auditor final audit (if approved)
```

### `orchestrator.agent.md` — Coordinates the full workflow
```markdown
---
description: Orchestrates the full app generation workflow
tools: [execute, read, edit, search, agent, todo]
handoffs:
  - label: Start Design Phase
    agent: architect
    prompt: Design the application with these variables
    send: true
  - label: Run Security Review
    agent: security-auditor
    prompt: Review the current design/implementation for security issues
    send: true
  - label: Run Code Review
    agent: reviewer
    prompt: Review the generated code against project conventions
    send: true
---

# Orchestrator

You coordinate the full workflow. You don't write code — you delegate to specialists and manage handoffs.

## Workflow Stages
1. **Collect variables** (appName, theme, features, dataStore)
2. **Design** → hand off to @architect
3. **Security review** → hand off to @security-auditor
4. **Implement** → invoke /generate-app prompt
5. **Test** → run tests, invoke /write-tests if needed
6. **Code review** → hand off to @reviewer
7. **Final audit** → hand off to @security-auditor

## Handoff Format
Between stages, produce:
- ✅ Stage [N] Complete: [what was produced]
- Passing to: [next agent/prompt]
- Context: [key info for next stage]

## Rules
- Create app in `./generated/[appName]/` — never the repo root
- If a review finds issues, loop back — don't skip ahead
- Always run tests after implementation
- Pass ALL variables to every stage
```

---

## 4.3 — Handoff Protocols

The key to reliable multi-agent workflows is **structured handoff output**. Each agent must produce output the next agent can consume.

```
@architect ──design spec──→ @security-auditor ──approved──→ /generate-app
                                     │
                              (issues found) ──→ back to @architect
```

Each agent's `## Handoff Output` section defines:
- What it produces (structured data)
- What verdict/status it gives
- Who receives it next

---

## 4.4 — Testing Agent Outputs

After creating each agent, **test it immediately**. Don't wait until all four are built.

### Test @architect

In Copilot Chat:
```
@architect Design a task manager app.
Variables: appName=my-tasks, features=basic-crud, dataStore=json-file, theme=minimal
```

**Check the output:**
- Did it produce the `## Handoff Output` format (Files to Create, Data Models, Routes, Ready for)?
- Did it use `json-file` (not sqlite or in-memory)?
- Did it use the app name `my-tasks`?

If not → edit `architect.agent.md` → run the exact same input again.

### Test the handoff

1. Copy @architect's output
2. Paste it to: `@security-auditor Review this design: [paste output here]`
3. Does the security auditor understand it? Does it produce CLEARED/ISSUES?

If the handoff breaks → the output format of the sender doesn't match what the receiver expects. Fix both files.

### Common Fixes

| Problem | Fix in .agent.md |
|---|---|
| Ignores variables | Add explicit `## Variable Handling` section |
| Unstructured output | Add strict `## Output Format` with example |
| Skips steps | Number steps, add "Never skip steps" |
| Too verbose | Add "Be concise. Use tables and bullet points." |
| Ignores conventions | Add "ALWAYS read .github/copilot-instructions.md" |

### Test the Full Handoff Chain

Once all four agents are created and individually tested:

```
@architect → copy output → @security-auditor → copy verdict → (if cleared) run /generate-app → @reviewer
```

Do this manually once. It proves your agents can work together before the orchestrator automates it.

---

## 4.5 — How Agents Use Prompts and Instructions

```
When you invoke @architect:
1. copilot-instructions.md loads automatically (rules)
2. Relevant .instructions.md files load (path-specific rules)
3. architect.agent.md loads (role + process)
4. Agent can tell user to invoke /generate-app (template)
5. Agent can follow SKILL.md steps (procedure)
```

You never repeat instruction rules in agents — they're inherited. Agents add **role, judgment, and process** on top.

---

## Checkpoint

- [x] `.github/agents/architect.agent.md` — designs app structure
- [x] `.github/agents/security-auditor.agent.md` — security review
- [x] `.github/agents/reviewer.agent.md` — code quality check
- [x] `.github/agents/orchestrator.agent.md` — coordinates workflow
- [x] All agents have `## Handoff Output` sections
- [x] Each agent tested — output inspected and file improved
- [x] Handoff chain tested (architect → security → implementation)

---

*Previous: [← Module 3](../03-reusable-prompts/README.md) | Next: [Module 5: Skills & Validation →](../05-skills-and-plugins/README.md)*
