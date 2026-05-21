# Module 4: Custom Agents & Agent Modes

> **Duration: 50 minutes** | **Difficulty: Intermediate → Advanced**

---

## Learning Objectives

By the end of this module, you will:

- Understand what custom agents are and when to use them
- Create specialized agent personas with `.agent.md` files
- Configure agent tools, models, and behavioral constraints
- Use agent mode vs. chat mode effectively
- Build agents that collaborate for complex workflows

---

## 4.1 — What Are Custom Agents?

Custom agents are **specialized AI personas** you define for your project. Each agent:

- Has a specific **role** and **expertise** (e.g., security reviewer, database admin)
- Can be restricted to specific **tools** (file system, terminal, browser, etc.)
- Can specify preferred **language models**
- Has its own **behavioral instructions**
- Is invoked with `@agent-name` in Copilot Chat

### Custom Agents vs. Other Customizations

| Feature | Instructions | Prompts | Agents |
|---|---|---|---|
| **Purpose** | Set rules | Automate tasks | Specialize the AI |
| **Invocation** | Automatic | Slash command (`/`) | @ mention (`@`) |
| **Persistence** | Always on | On-demand | On-demand |
| **Tool access** | N/A | Configurable | Configurable |
| **Model choice** | N/A | N/A | Configurable |

---

## 4.2 — Anatomy of an Agent File

Agent files live in `.github/agents/` and have the `.agent.md` extension.

### Basic Structure

```markdown
---
description: "A security-focused code reviewer that identifies vulnerabilities"
tools: ["file_system", "terminal"]
---

# Security Auditor

You are a senior security engineer specializing in application security.
Your role is to identify vulnerabilities, suggest fixes, and educate
developers on secure coding practices.

## Expertise
- OWASP Top 10 vulnerabilities
- Authentication and authorization patterns
- Input validation and sanitization
- Cryptographic best practices
- Supply chain security

## Behavior
- Always explain WHY something is a vulnerability, not just what to fix
- Rate findings by severity: Critical, High, Medium, Low
- Provide code examples for fixes
- Reference CWE numbers when applicable
- Never suggest "security through obscurity"
```

### Frontmatter Options

| Field | Purpose | Example |
|---|---|---|
| `description` | Shown when listing available agents | `"Security-focused code reviewer"` |
| `tools` | Tools the agent can use | `["file_system", "terminal", "browser"]` |
| `model` | Preferred language model | `"claude-sonnet-4"`, `"gpt-4o"` |

---

## 4.3 — Build Agents for Your App

Now you'll create agents that specialize in **your specific app**. Each agent will have a clear role in your development workflow.

### Exercise 4A: Create a Code Reviewer Agent

This agent will review your app's code against the conventions you set up in Module 2.

Create `.github/agents/reviewer.agent.md` in **your app project**:

```markdown
---
description: "Reviews code for quality, conventions, and best practices"
tools: ["file_system"]
---

# Code Reviewer

You are a senior engineer reviewing code in this project.
Always check against the conventions in .github/copilot-instructions.md.

## Review Process
1. Understand the intent of the code
2. Check correctness — does it handle edge cases?
3. Evaluate naming, structure, and readability
4. Check error handling and input validation
5. Verify test coverage

## Output Format

### 🔴 Must Fix
Critical issues.

### 🟡 Should Fix
Important improvements.

### 🟢 Suggestions
Nice-to-haves.

## Rules
- Be constructive — suggest solutions, not just problems
- Acknowledge good patterns when you see them
- Reference project conventions from .github/copilot-instructions.md
```

**Use it on your app**: In Copilot Chat, type `@reviewer` and ask it to review one of the features you built in Module 3. Does it follow your output format? Does it reference your project conventions?

---

### Exercise 4B: Create an Architect Agent

This agent helps you plan the next features for your app.

Create `.github/agents/architect.agent.md`:

```markdown
---
description: "Designs features and makes architectural decisions for this project"
tools: ["file_system", "terminal"]
---

# Architect

You are a software architect helping design and extend this application.
Read the existing code to understand current patterns before proposing changes.

## How You Work
1. Read existing code to understand the current architecture
2. Present at least 2 approaches with trade-offs
3. State your recommendation with reasoning
4. Provide implementation guidance (file structure, interfaces)

## Output Format

### Context
Current state and what we're trying to achieve.

### Options
| Option | Pros | Cons |
|---|---|---|

### Recommendation
Selected approach with reasoning.

### Implementation Plan
Step-by-step guide for building it.

## Rules
- Always look at existing patterns before proposing new ones
- Keep it simple — don't over-engineer
- Consider the project's current scale (it's a workshop app, not enterprise)
- Use Mermaid diagrams when helpful
```

**Use it on your app**: Ask `@architect` to design the next feature you want to add. For example:
- "Design a caching layer for the API"
- "How should I add user authentication?"
- "What's the best way to add search functionality?"

---

### Exercise 4C: Create a Security Auditor Agent

Create `.github/agents/security-auditor.agent.md`:

```markdown
---
description: "Security auditor that finds vulnerabilities in this application"
tools: ["file_system", "terminal"]
---

# Security Auditor

You perform security audits on this codebase. Identify vulnerabilities,
assess risk, and provide remediation with code examples.

## Methodology
1. **Attack Surface** — Identify entry points (APIs, inputs)
2. **Auth & Access** — Check authentication and authorization
3. **Data Flow** — Track sensitive data through the system
4. **Dependencies** — Check for known vulnerabilities
5. **Config** — Verify secure defaults

## Severity Scale
- **Critical**: Auth bypass, RCE, data breach
- **High**: Privilege escalation, significant data exposure
- **Medium**: XSS, CSRF, information disclosure
- **Low**: Minor info leaks, misconfigurations

## Output Format
For each finding:
- **Severity**: Critical / High / Medium / Low
- **Location**: File and line
- **Impact**: What could go wrong
- **Fix**: Code example showing the remediation

## Rules
- Check for OWASP Top 10 issues
- Provide working fix examples
- Never suggest disabling security features
- Flag hardcoded credentials even in test files
```

**Use it on your app**: Run `@security-auditor` against your app and ask it to audit the code you've written so far. Fix any issues it finds.

---

### Exercise 4D: Create a Domain-Specific Agent

Create an agent that's **specific to your app's domain**. This agent knows the business context.

**Examples by app type:**

| Your App | Agent Idea | Role |
|---|---|---|
| Task Manager | `@project-manager` | Suggests data models, workflow states, UX patterns |
| Weather App | `@data-engineer` | API integration patterns, caching strategies |
| Expense Tracker | `@fintech-expert` | Financial calculations, data validation, reporting |
| Recipe Book | `@content-expert` | Schema design for recipes, search/filter patterns |
| URL Shortener | `@systems-engineer` | Distributed systems, collision avoidance, analytics |
| Chat App | `@realtime-expert` | WebSocket patterns, message queuing, presence |

Create `.github/agents/<your-domain-agent>.agent.md` with expertise relevant to your app.

**Use it**: Ask your domain agent to help you design or implement a domain-specific feature.

---

## 4.4 — Advanced Agent Patterns

### Pattern: Agent Collaboration

Use multiple agents together on your app:

```
@architect Design authentication for this app

[Take the design, then...]

@security-auditor Review this auth implementation for vulnerabilities

[Then...]

@reviewer Check the code quality and conventions
```

**Try it**: Use 2-3 of your agents in sequence on the same piece of work.

### Pattern: Constrained Agent (Read-Only)

An agent that analyzes but never modifies — useful for auditing:

```markdown
---
description: "Read-only code analyzer"
tools: ["file_system"]
---

# Analyzer
You analyze code and provide insights but NEVER modify files.
Your role is purely analytical.
```

### Pattern: Agent with Specific Model

For tasks that benefit from a specific model:

```markdown
---
description: "Creative naming and documentation assistant"
model: "claude-sonnet-4"
tools: []
---

# Creative Assistant
You help with naming, documentation, and crafting clear error messages.
```

---

## 4.5 — Agent Mode vs. Chat Mode

When using your agents, you can switch between **Chat mode** and **Agent mode**:

| Feature | Chat Mode | Agent Mode |
|---|---|---|
| **Actions** | Suggests code | Can read/write files, run terminal |
| **Iteration** | Single response | Multi-step, iterative |
| **Tool use** | Limited | Full tool access |
| **Best for** | Questions, review | Building features, refactoring |

### When to Use Agent Mode
- Building new features (multi-file changes)
- Running tests and fixing failures
- Scaffolding components

### When to Use Chat Mode
- Asking your reviewer to check code
- Getting architecture advice
- Explaining existing code

---

## Key Takeaways

- **Custom agents** are specialized AI personas defined in `.github/agents/*.agent.md`
- Invoke agents with `@agent-name` in Copilot Chat
- Use **tool restrictions** to control what agents can do (read-only, no terminal, etc.)
- Agent mode is for **multi-step, iterative work**; chat mode is for **quick interactions**
- Combine multiple agents for **collaborative workflows** on your app
- Domain-specific agents are more useful than generic ones

---

## Your App Checkpoint

After this module, your app should have:
- [x] Working app with features (Modules 1-3)
- [x] `.github/agents/reviewer.agent.md` — reviews your code
- [x] `.github/agents/architect.agent.md` — designs features
- [x] `.github/agents/security-auditor.agent.md` — finds vulnerabilities
- [x] `.github/agents/<domain>.agent.md` — domain-specific expertise
- [x] At least one security issue found and fixed by your auditor agent
- [x] A new feature designed using your architect agent

---

## References

- [VS Code: Custom Agents](https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-agents)
- [Specialize the AI](https://code.visualstudio.com/docs/copilot/customization/custom-agents)

---

*Previous: [← Module 3: Reusable Prompts](../03-reusable-prompts/README.md) | Next: [Module 5: Skills & Plugins →](../05-skills-and-plugins/README.md)*
