# Module 2: Custom Instructions

> **Duration: 45 minutes** | **Difficulty: Beginner → Intermediate**

---

## Learning Objectives

By the end of this module, you will:

- Create repository-wide custom instructions for your app (`copilot-instructions.md`)
- Create path-specific instructions for different parts of your app (`.instructions.md`)
- Create agent-level instructions (`AGENTS.md`)
- Write effective instructions that measurably improve Copilot output for your stack

---

## 2.1 — Repository-Wide Instructions

The `.github/copilot-instructions.md` file is the **foundation** of Copilot customization. It applies to **every** Copilot interaction in your app's repository — completions, chat, agents, and cloud agent.

### What Makes Good Instructions?

| Do | Don't |
|---|---|
| Be specific and actionable | Write vague aspirations ("write good code") |
| Reference your actual stack and tools | Include task-specific instructions |
| Describe conventions with examples | Write a novel — keep it under 2 pages |
| Use imperative language ("Always...", "Never...") | Contradict organization-level instructions |
| Include build/test/run commands | Include sensitive information |

---

### Exercise 2A: Create Instructions for Your App

In **your app project** (created in Module 1), create the file `.github/copilot-instructions.md`.

Your instructions should describe YOUR app specifically:

1. **What is your app?** — Name, purpose, main features
2. **Tech stack** — Language, framework, database, runtime version
3. **Project structure** — Where source code, tests, and config live
4. **Code conventions** — Naming, patterns, formatting rules
5. **Build & run commands** — How to install, build, test, and run
6. **Response style** — How you want Copilot to communicate

Here are **starter templates** for different stacks — pick yours and customize:

#### Node.js / TypeScript
```markdown
# Copilot Instructions

## Project
This is a [your app name] — a [description]. Built with TypeScript and Express.

## Tech Stack
- Runtime: Node.js 20+
- Language: TypeScript (strict mode)
- Framework: Express
- Database: SQLite / PostgreSQL
- Testing: Vitest
- Package manager: npm

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

## Code Conventions
- Use ES modules (`import`/`export`)
- Prefer `const` over `let`, never use `var`
- Use async/await, never raw Promise chains
- All functions must have explicit return types
- Error handling: use custom error classes, never throw strings
- File naming: kebab-case (e.g., `user-service.ts`)

## Project Structure
- `src/` — Application source code
- `src/routes/` — API route handlers
- `src/services/` — Business logic
- `src/models/` — Data models / types
- `tests/` — Test files (mirror src/ structure)
```

#### Python / FastAPI
```markdown
# Copilot Instructions

## Project
This is a [your app name] — a [description]. Built with Python and FastAPI.

## Tech Stack
- Runtime: Python 3.12+
- Framework: FastAPI
- Database: SQLite with SQLAlchemy
- Testing: pytest
- Package manager: pip with pyproject.toml

## Commands
- Install: `pip install -e ".[dev]"`
- Run: `uvicorn app.main:app --reload`
- Test: `pytest`
- Lint: `ruff check .`
- Format: `ruff format .`

## Code Conventions
- Use type hints on all function signatures
- Use Pydantic models for request/response schemas
- Use dataclasses or Pydantic for internal data structures
- Naming: snake_case for functions/variables, PascalCase for classes
- Use `pathlib.Path` over `os.path`
- Always use async def for route handlers

## Project Structure
- `app/` — Application source code
- `app/routers/` — API route handlers
- `app/services/` — Business logic
- `app/models/` — SQLAlchemy models
- `app/schemas/` — Pydantic schemas
- `tests/` — Test files
```

#### C# / ASP.NET
```markdown
# Copilot Instructions

## Project
This is a [your app name] — a [description]. Built with C# and ASP.NET Core.

## Tech Stack
- Runtime: .NET 8
- Language: C# 12
- Framework: ASP.NET Core Minimal API
- Database: SQLite with Entity Framework Core
- Testing: xUnit + FluentAssertions

## Commands
- Build: `dotnet build`
- Run: `dotnet run`
- Test: `dotnet test`
- Watch: `dotnet watch run`

## Code Conventions
- Use file-scoped namespaces
- Use primary constructors
- Use records for DTOs and value objects
- Use `required` keyword for mandatory properties
- Prefer pattern matching over if-else chains
- Use CancellationToken in all async methods
- Naming: PascalCase for public, _camelCase for private fields

## Project Structure
- `src/` — Application source code
- `src/Endpoints/` — Minimal API endpoint definitions
- `src/Services/` — Business logic
- `src/Models/` — Entity models
- `tests/` — Test project
```

#### Go
```markdown
# Copilot Instructions

## Project
This is a [your app name] — a [description]. Built with Go.

## Tech Stack
- Runtime: Go 1.22+
- Framework: Standard library net/http (or Gin/Echo)
- Database: SQLite with database/sql
- Testing: Go testing package + testify

## Commands
- Build: `go build ./...`
- Run: `go run .`
- Test: `go test ./...`
- Lint: `golangci-lint run`

## Code Conventions
- Follow Effective Go and Go Code Review Comments
- Keep functions short (< 30 lines)
- Return errors, don't panic
- Use table-driven tests
- Accept interfaces, return structs
- Package naming: short, lowercase, no underscores

## Project Structure
- `cmd/` — Main application entry points
- `internal/` — Private application code
- `internal/handler/` — HTTP handlers
- `internal/service/` — Business logic
- `internal/model/` — Data models
- `internal/store/` — Database access
```

> **Adapt the template** to match your actual app and stack. The more specific and accurate, the better Copilot will perform.

### Verify It Works

After creating the file, open Copilot Chat and ask:

```
What tech stack does this project use and how do I run it?
```

Copilot should reference your instructions. Expand the "References" in the response to confirm `copilot-instructions.md` is listed.

---

## 2.2 — Path-Specific Instructions

Path-specific instructions let you apply different rules to different parts of your app. They use **glob patterns** in a YAML frontmatter block.

### Why Path-Specific?

Your app likely has different rules for different file types:
- Source code → coding standards
- Test files → testing patterns
- API routes → REST conventions
- Database code → query patterns
- Config files → specific formats

### Exercise 2B: Create Path-Specific Instructions for Your App

Create **at least 2** of these files in your app project. Choose the ones relevant to your stack:

#### Option 1: `.github/instructions/testing.instructions.md`

```markdown
---
applyTo: "**/*.test.*,**/*.spec.*,**/test/**,**/tests/**,**/*_test.*"
---

# Testing Conventions for [Your App]

- Use the Arrange-Act-Assert pattern
- Each test tests exactly one behavior
- Descriptive test names: "should [expected behavior] when [condition]"
- Mock external dependencies (database, APIs, file system)
- Include both happy path and error cases
- Test edge cases: empty inputs, nulls, boundary values
- Keep tests independent — no shared mutable state between tests
```

#### Option 2: `.github/instructions/api-routes.instructions.md`

```markdown
---
applyTo: "src/routes/**,src/endpoints/**,app/routers/**,**/handler/**"
---

# API Route Conventions

- Follow RESTful naming: plural nouns for resources
- Always validate request input before processing
- Return appropriate HTTP status codes (200, 201, 400, 404, 500)
- Include error messages in a consistent format: `{ "error": "message" }`
- Add request logging for debugging
- Implement pagination for list endpoints (limit + offset)
- Document endpoints with OpenAPI/JSDoc comments
```

#### Option 3: `.github/instructions/security.instructions.md`

```markdown
---
applyTo: "**"
---

# Security Guidelines

- Never hardcode secrets, API keys, or passwords
- Always validate and sanitize user input
- Use parameterized queries — never string concatenation for SQL
- Apply the principle of least privilege
- Log security events but never log sensitive data (passwords, tokens)
- Use HTTPS for all external API calls
- Set appropriate CORS headers for API endpoints
```

#### Option 4: `.github/instructions/database.instructions.md`

```markdown
---
applyTo: "**/models/**,**/store/**,**/repository/**,**/migrations/**,**/db/**"
---

# Database Conventions

- Always use migrations for schema changes — never manual DDL
- Use transactions for operations that modify multiple tables
- Add indexes for columns used in WHERE clauses and JOINs
- Use parameterized queries — never string interpolation
- Name tables in plural (users, orders), columns in snake_case
- Always include created_at and updated_at timestamps
- Soft-delete where appropriate (add deleted_at column)
```

### Glob Pattern Reference

| Pattern | Matches |
|---|---|
| `**/*.py` | All Python files recursively |
| `src/**/*.ts` | TypeScript files under `src/` |
| `**/test/**` | Everything inside any `test/` folder |
| `**/*.test.*,**/*.spec.*` | All test/spec files |
| `*` | All files in current directory only |

---

## 2.3 — Agent Instructions (AGENTS.md)

`AGENTS.md` is for **AI agents** specifically — both the local agent mode in VS Code and the cloud coding agent. It tells agents how to behave when working autonomously on your app.

### Exercise 2C: Create AGENTS.md for Your App

Create an `AGENTS.md` file in the **root** of your app project:

```markdown
# Agent Instructions for [Your App Name]

## Behavior
- Always create a new branch before making changes
- Run tests before and after making changes: `[your test command]`
- Commit with conventional commit messages (feat:, fix:, docs:, test:, refactor:)
- Never modify configuration files without being explicitly asked

## Working with This App
- The main entry point is `[your entry point file]`
- To start the app: `[your run command]`
- To run tests: `[your test command]`
- To install dependencies: `[your install command]`

## Code Changes
- Follow the conventions in `.github/copilot-instructions.md`
- Add tests for any new functionality
- Update the README when adding new features or endpoints
- Keep changes focused — one feature or fix per commit

## What NOT to Do
- Don't modify existing tests unless fixing a bug in them
- Don't add dependencies without a clear reason
- Don't change the project structure without being asked
- Don't commit generated files (node_modules, __pycache__, bin/, etc.)
```

> **Fill in the placeholders** with your app's actual commands and file paths.

---

## 2.4 — Verify Your Instructions Work

### Test 1: General Copilot Chat

Ask Copilot Chat:
```
How do I add a new endpoint to this project?
```

Does the response follow your conventions (naming, structure, error handling)?

### Test 2: Path-Specific Activation

Open a test file (or create one), then ask Copilot:
```
Write a test for [some feature]
```

Does it follow your testing instructions (AAA pattern, descriptive names)?

### Test 3: Compare With and Without

Try asking Copilot to generate code **before** and **after** you add instructions. Note the difference in quality and convention adherence.

---

## Key Takeaways

- **`copilot-instructions.md`** is always-on for every Copilot interaction in your app
- **`.instructions.md`** files with `applyTo` globs target specific file types
- **`AGENTS.md`** tells agents how to work autonomously in your project
- Instructions are **additive** — they combine across all layers
- The more **specific and accurate** your instructions, the better Copilot performs
- **Test your instructions** — ask Copilot questions and verify it uses them

---

## Your App Checkpoint

After this module, your app project should have:
- [x] A working app (from Module 1)
- [x] `.github/copilot-instructions.md` — describing your app and conventions
- [x] At least 2 path-specific `.instructions.md` files
- [x] `AGENTS.md` — agent behavior guidelines

---

## References

- [Adding repository custom instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
- [Path-specific custom instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot#creating-path-specific-custom-instructions)
- [AGENTS.md specification](https://github.com/agentsmd/agents.md)

---

*Previous: [← Module 1: Foundations](../01-foundations/README.md) | Next: [Module 3: Reusable Prompt Files →](../03-reusable-prompts/README.md)*
