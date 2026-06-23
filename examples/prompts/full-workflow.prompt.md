---
description: "Generate a complete application from scratch using the full agentic workflow"
agent: agent
tools: [execute, read, edit, search]
argument-hint: "appName theme features dataStore framework (e.g., my-app minimal basic-crud sqlite express)"
---

# Generate Complete App: ${input:appName}

Generate a complete, runnable application using the full agentic workflow.
The app will be created in `./generated/${input:appName}/`.

## Configuration
- **App Name**: ${input:appName}
- **Theme**: ${input:theme}
- **Features**: ${input:features}
- **Data Store**: ${input:dataStore}
- **Framework**: ${input:framework}

## Workflow Execution

Execute these stages in order. Do NOT skip stages. If a review fails, loop back.

### Stage 1: Architecture Design (@architect)

Design the complete application:
- Full file/folder structure for a ${input:framework} app
- Data models appropriate for ${input:dataStore} storage
- Routes/endpoints for each feature in: ${input:features}
- Consider the ${input:theme} theme in any UI/response formatting decisions
- Present 2 approaches, choose the one that fits a workshop demo best

Produce a structured design spec.

### Stage 2: Security Review (@security-auditor)

Review the design for:
- Input validation on all endpoints
- Proper auth patterns (if "auth" is in ${input:features})
- Safe data storage patterns for ${input:dataStore}
- No hardcoded secrets in the design

### Stage 3: Implementation

Create the app in `./generated/${input:appName}/`:

#### Project Setup
- Create folder `./generated/${input:appName}/`
- Initialize with appropriate package manifest for ${input:framework}
- Set the project name to "${input:appName}"

#### Source Code
Generate all source files following the design spec:
- Entry point (server startup, app initialization)
- Route handlers for each feature in ${input:features}
- Data models/schemas for ${input:dataStore}
- Middleware (error handling, validation, auth if applicable)
- Configuration (environment variables, database setup)

#### Theme Application (${input:theme})
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
cd ./generated/${input:appName}
# Install dependencies
[appropriate install command for ${input:framework}]
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
✅ APP GENERATED: ${input:appName}
═══════════════════════════════════════

📁 Location: ./generated/${input:appName}/
🎨 Theme: ${input:theme}
📦 Features: ${input:features}
💾 Data Store: ${input:dataStore}
🔧 Framework: ${input:framework}

📊 Results:
  - Files created: [count]
  - Tests: [pass count]/[total] passing
  - Security: CLEARED
  - Review: APPROVED

🚀 To run:
  cd generated/${input:appName}
  [install command]
  [start command]

🔄 To regenerate with different inputs:
  /full-workflow appName="new-name" theme="dark" features="crud,auth" dataStore="json-file"
═══════════════════════════════════════
```

## Rules
- ALWAYS create in ./generated/${input:appName}/ — never the repo root
- ALWAYS use the provided inputs — never substitute defaults
- ALWAYS run tests after generation — fix failures before completing
- ALWAYS follow .github/copilot-instructions.md conventions
- If a review stage fails, fix and re-verify before proceeding
