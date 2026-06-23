---
description: "Generate a complete application from scratch using the full agentic workflow"
mode: "agent"
tools: [execute, read, edit, search]
variables:
  - name: "appName"
    description: "Name of the generated application (used as folder name and package name)"
  - name: "theme"
    description: "Visual theme for the app"
    default: "minimal"
    enum: ["minimal", "dark", "colorful", "retro"]
  - name: "features"
    description: "Comma-separated list of features to include"
    default: "basic-crud"
  - name: "dataStore"
    description: "Data storage backend"
    default: "sqlite"
    enum: ["sqlite", "json-file", "in-memory"]
  - name: "framework"
    description: "Language and framework to use"
    default: "express"
---

# Generate Complete App: {{appName}}

Generate a complete, runnable application using the full agentic workflow.
The app will be created in `./generated/{{appName}}/`.

## Variables
- **App Name**: {{appName}}
- **Theme**: {{theme}}
- **Features**: {{features}}
- **Data Store**: {{dataStore}}
- **Framework**: {{framework}}

## Workflow Execution

Execute these stages in order. Do NOT skip stages. If a review fails, loop back.

### Stage 1: Architecture Design (@architect)

Design the complete application:
- Full file/folder structure for a {{framework}} app
- Data models appropriate for {{dataStore}} storage
- Routes/endpoints for each feature in: {{features}}
- Consider the {{theme}} theme in any UI/response formatting decisions
- Present 2 approaches, choose the one that fits a workshop demo best

Produce a structured design spec.

### Stage 2: Security Review (@security-auditor)

Review the design for:
- Input validation on all endpoints
- Proper auth patterns (if "auth" is in {{features}})
- Safe data storage patterns for {{dataStore}}
- No hardcoded secrets in the design

### Stage 3: Implementation

Create the app in `./generated/{{appName}}/`:

#### Project Setup
- Create folder `./generated/{{appName}}/`
- Initialize with appropriate package manifest for {{framework}}
- Set the project name to "{{appName}}"

#### Source Code
Generate all source files following the design spec:
- Entry point (server startup, app initialization)
- Route handlers for each feature in {{features}}
- Data models/schemas for {{dataStore}}
- Middleware (error handling, validation, auth if applicable)
- Configuration (environment variables, database setup)

#### Theme Application ({{theme}})
Apply the theme to all relevant outputs:
- **minimal**: Clean code, minimal comments, no decorative elements, functional API responses
- **dark**: If UI exists, dark color palette; API responses use subdued formatting
- **colorful**: Descriptive status messages, emoji in logs, vibrant error pages
- **retro**: Monospace-style formatting, ASCII art in README, terminal-aesthetic responses

#### Tests
Generate tests for every feature:
- Unit tests for business logic
- Integration tests for API endpoints
- At least one edge case test per feature

#### Documentation
- README.md with: description, setup instructions, API docs, how to run

### Stage 4: Verification

```bash
cd ./generated/{{appName}}
# Install dependencies
[appropriate install command for {{framework}}]
# Run tests
[appropriate test command]
# Verify app starts
[appropriate start command]
```

Fix any failures before proceeding.

### Stage 5: Code Review (@reviewer)

Review the generated app against project conventions:
- Naming follows copilot-instructions.md rules
- Error handling is present and consistent
- Code is organized per project structure conventions
- Tests follow testing.instructions.md patterns

### Stage 6: Final Security Audit (@security-auditor)

Verify the implementation:
- No hardcoded secrets
- Input validation on all external inputs
- Dependencies are necessary and safe
- OWASP Top 10 checked

## Completion Report

After all stages pass, produce:

```
═══════════════════════════════════════
✅ APP GENERATED: {{appName}}
═══════════════════════════════════════

📁 Location: ./generated/{{appName}}/
🎨 Theme: {{theme}}
📦 Features: {{features}}
💾 Data Store: {{dataStore}}
🔧 Framework: {{framework}}

📊 Results:
  - Files created: [count]
  - Tests: [pass count]/[total] passing
  - Security: CLEARED
  - Review: APPROVED

🚀 To run:
  cd generated/{{appName}}
  [install command]
  [start command]

🔄 To regenerate with different variables:
  /full-workflow appName="new-name" theme="dark" features="crud,auth" dataStore="json-file"
═══════════════════════════════════════
```

## Rules
- ALWAYS create in ./generated/{{appName}}/ — never the repo root
- ALWAYS use the provided variables — never substitute defaults
- ALWAYS run tests after generation — fix failures before completing
- ALWAYS follow .github/copilot-instructions.md conventions
- If a review stage fails, fix and re-verify before proceeding
