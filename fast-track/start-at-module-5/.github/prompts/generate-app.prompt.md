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
1. Project structure with package.json (name: ${input:appName})
2. Entry point and configuration
3. Route handlers for each feature in ${input:features}
4. Data models for ${input:dataStore}
5. Tests for all features
6. README with setup instructions

## Requirements
- Follow conventions in .github/copilot-instructions.md
- Follow security rules in .github/instructions/security.instructions.md
- Follow test patterns in .github/instructions/testing.instructions.md
- Include input validation and error handling

## After Generation
- Install dependencies
- Run tests — fix any failures before reporting
- Report what was created (file list + how to run)
