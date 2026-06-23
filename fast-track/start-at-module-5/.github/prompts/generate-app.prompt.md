---
description: "Generate a complete app in a new folder from variables"
mode: "agent"
tools: [execute, read, edit, search]
variables:
  - name: "appName"
    description: "Name for the generated application"
  - name: "theme"
    description: "Visual theme (minimal, dark, colorful, retro)"
    default: "minimal"
  - name: "features"
    description: "Comma-separated features to include"
    default: "basic-crud"
  - name: "dataStore"
    description: "Storage backend (sqlite, json-file, in-memory)"
    default: "sqlite"
---

# Generate App: {{appName}}

Create a complete application in `./generated/{{appName}}/`.

## Configuration
- Theme: {{theme}}
- Features: {{features}}
- Data Store: {{dataStore}}

## Generate
1. Project structure with package.json (name: {{appName}})
2. Entry point and configuration
3. Route handlers for each feature in {{features}}
4. Data models for {{dataStore}}
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
