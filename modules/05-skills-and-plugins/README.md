# Module 5: Skills, Plugins & Marketplace

> **Duration: 50 minutes** | **Difficulty: Advanced**

---

## Learning Objectives

By the end of this module, you will:

- Understand the skills model and how `SKILL.md` files work
- Build and package a custom skill
- Understand the scaling path: skills → plugins → marketplace
- Know how plugins bundle customizations for distribution
- Configure and manage agent plugins in VS Code

---

## 5.1 — What Are Skills?

**Skills** are packaged capabilities that agents can discover and invoke. They represent the **middle layer** in the scaling model between individual customization files and full marketplace plugins.

### The Scaling Pyramid

```
                ┌───────────────┐
                │  Marketplace  │  ← Public/org distribution
                │   Plugins     │     (install & go)
                ├───────────────┤
                │    Skills     │  ← Reusable capabilities
                │  (SKILL.md)  │     (shareable across repos)
                ├───────────────┤
                │ Instructions  │  ← Project-specific rules
                │   & Prompts   │     (single repo)
                └───────────────┘
```

### Skills vs. Other Customizations

| Feature | Instructions | Prompts | Skills | Plugins |
|---|---|---|---|---|
| **Scope** | Rules/behavior | Task templates | Capabilities | Bundles |
| **Reuse** | Per-repo | Per-repo | Cross-repo | Marketplace |
| **Complexity** | Low | Medium | Medium-High | High |
| **Includes** | Text only | Text + variables | Tools + instructions | Everything |
| **Discovery** | Automatic | Slash commands | Agent discovers | Install |

---

## 5.2 — The SKILL.md File

A `SKILL.md` file defines a capability that an agent can use. It describes:
- **What** the skill does
- **When** to use it
- **How** to execute it (tools, commands, steps)

### Structure

```markdown
# Skill Name

## Description
What this skill does and when an agent should use it.

## When to Use
- Trigger conditions
- Context where this skill applies

## Steps
1. Step-by-step instructions for execution
2. Including commands, file operations, etc.

## Tools Required
- List of tools needed (terminal, file_system, etc.)

## Examples
Show example invocations and expected outcomes.
```

---

## 5.3 — Build Skills for Your App

Skills make your agents smarter. You'll create skills that are useful for **your specific app**, then see how they connect to the broader plugin/marketplace ecosystem.

### Exercise 5A: Create a Dependency Analysis Skill

Your app has dependencies. Create a skill that any agent can use to audit them.

Create `.github/skills/analyze-deps/SKILL.md` in **your app project**:

```markdown
# Analyze Dependencies

## Description
Analyzes this project's dependencies to find outdated packages,
security vulnerabilities, and unused dependencies.

## When to Use
- When asked to "check dependencies" or "audit packages"
- When investigating security vulnerabilities
- Before upgrading to a new framework version

## Steps

### 1. Identify Package Manager
Look for manifest files:
- `package.json` → npm/yarn/pnpm
- `requirements.txt` / `pyproject.toml` → pip/poetry
- `go.mod` → Go modules
- `*.csproj` → NuGet
- `pom.xml` / `build.gradle` → Maven/Gradle

### 2. Check for Outdated Packages
Run the appropriate command:
- npm: `npm outdated`
- pip: `pip list --outdated`
- go: `go list -u -m all`

### 3. Check for Vulnerabilities
- npm: `npm audit`
- pip: `pip-audit`
- go: `govulncheck ./...`

### 4. Generate Report
Produce a markdown report with:
- Total dependencies (direct + transitive)
- Outdated packages with versions
- Security vulnerabilities with severity
- Recommended actions (prioritized)

## Tools Required
- terminal (to run package manager commands)
- file_system (to read manifest files)
```

**Use it**: Ask one of your agents (e.g., `@security-auditor`) to analyze your app's dependencies. The agent should discover and follow this skill.

---

### Exercise 5B: Create an App-Specific Skill

Create a skill that's **specific to your app's domain**. This teaches agents how to do something unique to your project.

**Examples by app type:**

| Your App | Skill Idea | What It Does |
|---|---|---|
| Task Manager | `run-workflow-tests` | Validates state machine transitions |
| Weather App | `test-api-integration` | Mocks weather API, tests error handling |
| Expense Tracker | `validate-calculations` | Verifies financial math accuracy |
| Recipe Book | `generate-sample-data` | Creates realistic test recipes |
| URL Shortener | `load-test-endpoints` | Runs performance benchmarks |
| Chat App | `test-websocket-flow` | Validates real-time message delivery |

Create `.github/skills/<your-skill>/SKILL.md`:

```markdown
# [Your Skill Name]

## Description
[What this skill does for your specific app]

## When to Use
[Triggers — when should an agent use this?]

## Steps
[Step-by-step instructions specific to your app]

## Tools Required
- terminal
- file_system

## Examples
[Show what it looks like when invoked]
```

**Use it**: Ask an agent to perform the task your skill describes. Does it follow the steps?

---

### Exercise 5C: Create a Code Health Skill

This skill gives your agents the ability to assess your app's overall quality.

Create `.github/skills/code-health/SKILL.md`:

```markdown
# Code Health Check

## Description
Assesses the overall health of this codebase: complexity, test coverage,
documentation, and adherence to project conventions.

## When to Use
- When asked about "code quality" or "code health"
- Before refactoring
- When evaluating if code is ready for review

## Steps

### 1. Check Test Coverage
- Run test suite and report pass/fail
- Identify files with no test coverage
- Report overall coverage percentage if tooling is available

### 2. Measure Complexity
- Identify functions longer than 30 lines
- Flag deeply nested code (> 3 levels)
- Find files with too many responsibilities

### 3. Check Conventions
Verify against .github/copilot-instructions.md:
- Naming conventions followed?
- File organization correct?
- Error handling present?

### 4. Generate Scorecard
```
| Metric | Score | Status |
|--------|-------|--------|
| Tests passing | X/Y | ✅/❌ |
| Avg function length | N lines | ✅/⚠️ |
| Convention adherence | X% | ✅/⚠️ |
| Documentation | Present/Missing | ✅/❌ |
```

## Tools Required
- file_system (to read source files)
- terminal (to run tests and analysis tools)
```

**Use it**: Ask your `@reviewer` agent to run a health check on your app. What score does your app get?

---

## 5.4 — From Skills to Plugins

### What Is a Plugin?

A **plugin** is a pre-packaged bundle that can include:
- Custom agents
- Skills
- MCP server configurations
- Hooks (lifecycle scripts)
- Instructions

Plugins are distributed via **marketplaces** and can be installed with a single click.

### Plugin Architecture

```
my-plugin/
├── package.json              # Plugin manifest
├── agents/
│   └── my-agent.agent.md    # Custom agents
├── skills/
│   └── my-skill/
│       └── SKILL.md         # Skills
├── prompts/
│   └── my-prompt.prompt.md  # Reusable prompts
├── mcp/
│   └── config.json          # MCP server config
└── hooks/
    └── post-edit.sh         # Lifecycle hooks
```

### Exercise 5D: Design a Plugin for Your App

Imagine packaging your app's Copilot config as a plugin that other developers on your team could install. What would it include?

Create a brief design doc (you can ask Copilot to help):

```markdown
# Plugin Design: [Your App Name] Development Kit

## Purpose
What does this plugin give developers working on this app?

## Contents

### Agents
- reviewer — Code reviewer with project conventions
- architect — Feature designer for this app
- security-auditor — Security specialist
- [your domain agent]

### Skills
- analyze-deps — Dependency auditing
- code-health — Quality scorecard
- [your custom skill]

### Prompts
- /add-feature — Scaffold new features
- /write-tests — Generate test suites
- /review — Code review

### Instructions
- copilot-instructions.md — Project conventions
- testing.instructions.md — Test patterns
- security.instructions.md — Security rules

## Target Audience
Developers joining this project who need the full Copilot setup instantly.
```

This is a **thought exercise** — you don't need to actually build the plugin. The point is understanding how everything you've built connects into a distributable package.

---

## 5.5 — The APM (Agent Plugin Marketplace)

The marketplace allows organizations to:

1. **Discover** — Browse available plugins by category
2. **Install** — Add plugins to repos/workspaces with one click
3. **Manage** — Enable/disable plugins, manage versions
4. **Publish** — Share plugins with your org or publicly

### Managing Plugins in VS Code

Access the Agent Customizations editor:
1. Click the **Configure Chat** (gear icon) in the Chat view
2. Or run: `Chat: Open Customizations` from the Command Palette
3. Navigate to the **Plugins** tab

### Exercise 5E: Explore the Plugin Marketplace

1. Open the Agent Customizations editor in VS Code
2. Browse available plugins
3. Find a plugin that could enhance your app development
4. Install it and try using it on your app
5. Discuss with your neighbor: what would you publish as a plugin?

---

## Key Takeaways

- **Skills** (`SKILL.md`) teach agents **how** to do specific tasks
- Skills are discovered automatically by agents when relevant
- The scaling path: **instructions → skills → plugins → marketplace**
- **Plugins** bundle everything (agents + skills + prompts + MCP) into installable packages
- Design skills to be **composable** — small, focused, combinable
- Your app's Copilot config could itself become a plugin for your team

---

## Your App Checkpoint

After this module, your app should have:
- [x] Working app with agents (Modules 1-4)
- [x] `.github/skills/analyze-deps/SKILL.md` — dependency analysis
- [x] `.github/skills/<custom>/SKILL.md` — app-specific skill
- [x] `.github/skills/code-health/SKILL.md` — quality assessment
- [x] A plugin design doc showing how everything connects
- [x] An understanding of the skills → plugins → marketplace path

---

## References

- [VS Code: Agent Skills](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [VS Code: Agent Plugins](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)
- [Agent Customizations Editor](https://code.visualstudio.com/docs/copilot/copilot-customization#_agent-customizations-editor)

---

*Previous: [← Module 4: Custom Agents](../04-custom-agents/README.md) | Next: [Module 6: Enterprise Setup, MCP & Access Model →](../06-enterprise-mcp-config/README.md)*
