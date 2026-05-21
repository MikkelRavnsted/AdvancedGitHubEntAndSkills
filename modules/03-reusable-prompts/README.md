# Module 3: Reusable Prompt Files

> **Duration: 40 minutes** | **Difficulty: Intermediate**

---

## Learning Objectives

By the end of this module, you will:

- Understand the purpose and structure of `.prompt.md` files
- Create reusable prompts that help you build features in your app
- Use template variables and file references in prompts
- Use prompts to actually scaffold and add functionality to your app
- Execute prompts via Copilot Chat slash commands

---

## 3.1 â€” What Are Reusable Prompts?

Reusable prompts (`.prompt.md` files) are **templated, shareable instructions** that you can invoke as slash commands in Copilot Chat. Think of them as "macros" for AI interactions.

### Why Use Prompt Files?

| Without Prompt Files | With Prompt Files |
|---|---|
| Type the same long prompts repeatedly | Invoke `/my-prompt` in one command |
| Inconsistent results across team members | Standardized, predictable outputs |
| Knowledge locked in individuals' heads | Shareable via git |
| No version control on prompts | Full git history on prompt evolution |

### Where Do They Live?

```
.github/
â””â”€â”€ prompts/
    â”œâ”€â”€ scaffold-component.prompt.md
    â”œâ”€â”€ code-review.prompt.md
    â”œâ”€â”€ refactor.prompt.md
    â””â”€â”€ write-tests.prompt.md
```

Prompts are discovered by Copilot when placed in `.github/prompts/`. They show up as slash commands in Copilot Chat (e.g., `/scaffold-component`).

---

## 3.2 â€” Anatomy of a Prompt File

A `.prompt.md` file has two parts:

1. **YAML frontmatter** (optional) â€” metadata, mode, tools, variables
2. **Prompt body** â€” the actual prompt text in Markdown

### Basic Structure

```markdown
---
description: "Scaffold a new component with tests and documentation"
mode: "agent"
tools: ["file_system", "terminal"]
---

# Scaffold Component

Create a new component with the following structure:
- Implementation file
- Unit test file
- README documentation

## Requirements
- Follow the project's code conventions
- Include proper error handling
- Add JSDoc/docstring comments
- Export the component from the module's index file
```

### Frontmatter Options

| Field | Purpose | Values |
|---|---|---|
| `description` | Shows in the slash command list | Any descriptive string |
| `mode` | How Copilot executes the prompt | `"agent"` (can take actions), `"chat"` (conversation only) |
| `tools` | Which tools the agent can use | `["file_system", "terminal", "browser"]` |
| `variables` | Template variables the user fills in | Array of variable definitions |

---

## 3.3 â€” Template Variables

Prompt files support **variables** that get filled in at invocation time. This makes prompts flexible and reusable.

### Defining Variables

```markdown
---
description: "Generate a REST API endpoint"
mode: "agent"
variables:
  - name: "resource"
    description: "The resource name (e.g., 'users', 'orders')"
  - name: "operations"
    description: "CRUD operations to generate"
    default: "create, read, update, delete"
---

# Generate REST API Endpoint

Create a REST API endpoint for the `{{resource}}` resource with the following operations: {{operations}}.

## Requirements
- Follow RESTful conventions
- Include input validation
- Add proper error responses (400, 404, 500)
- Include request/response type definitions
```

### Using File References

You can reference other files as context in your prompts:

```markdown
---
description: "Review code against our standards"
mode: "chat"
---

# Code Review

Review the selected code against our project standards.

Refer to the following guidelines:
- [Code style](.github/instructions/code-style.instructions.md)
- [Security](.github/instructions/security.instructions.md)
- [Testing](.github/instructions/testing.instructions.md)

Provide feedback in this format:
1. **Critical** â€” Must fix before merging
2. **Suggestion** â€” Would improve quality
3. **Praise** â€” What's done well
```

---

## 3.4 â€” Build Your App with Prompts

Now you'll create prompts **for your specific app** and use them to actually add features. This is where your app starts taking shape.

### Exercise 3A: Create a Feature Scaffolding Prompt

This prompt will be your go-to for adding new features to your app. Create `.github/prompts/add-feature.prompt.md` in **your app project**:

```markdown
---
description: "Add a new feature to the app with implementation, tests, and docs"
mode: "agent"
tools: ["file_system", "terminal"]
---

# Add New Feature

Create a new feature for this application following our project conventions.

## What to Create
1. **Implementation** â€” The main feature logic in the appropriate directory
2. **Tests** â€” Unit tests covering the main behaviors
3. **Route/Endpoint** (if applicable) â€” Wire it up to the API

## Requirements
- Follow the conventions in .github/copilot-instructions.md
- Follow testing conventions in .github/instructions/testing.instructions.md
- Include input validation and error handling
- Add appropriate logging
- Make sure existing tests still pass after changes

## After Creating
- Run the test suite to verify nothing is broken
- Show a summary of what was created and how to use it
```

**Now use it!** In Copilot Chat, type `/add-feature` and describe a feature for your app:

Examples:
- "Add a feature to create and list tasks with a title, description, and status"
- "Add user authentication with login and register endpoints"
- "Add a search feature that filters recipes by ingredient"
- "Add an endpoint to shorten a URL and redirect to the original"

---

### Exercise 3B: Create a Code Review Prompt

Create `.github/prompts/review.prompt.md`:

```markdown
---
description: "Review code in this project against our standards"
mode: "chat"
---

# Code Review

Review the provided code against our project standards.

Check against:
- [Security guidelines](.github/instructions/security.instructions.md)
- [Testing conventions](.github/instructions/testing.instructions.md)
- [Project conventions](.github/copilot-instructions.md)

## Review Checklist
1. **Correctness** â€” Does it do what it should? Edge cases handled?
2. **Security** â€” Input validation? No hardcoded secrets? Safe queries?
3. **Conventions** â€” Follows our naming, structure, and patterns?
4. **Tests** â€” Are there tests? Do they cover the important cases?
5. **Maintainability** â€” Will someone else understand this in 6 months?

## Output Format
For each finding:
- **Severity**: Critical | Warning | Suggestion
- **What**: The issue
- **Fix**: How to resolve it (with code example)
```

**Use it**: Select some code you generated in Exercise 3A and run `/review` to check it against your standards.

---

### Exercise 3C: Create a Test Generator Prompt

Create `.github/prompts/write-tests.prompt.md`:

```markdown
---
description: "Generate tests for existing code in this project"
mode: "agent"
tools: ["file_system", "terminal"]
---

# Write Tests

Generate comprehensive tests for the specified code.

## Testing Approach
- Follow the Arrange-Act-Assert pattern
- Include happy path AND error cases
- Test edge cases (empty inputs, nulls, boundaries)
- Use descriptive test names: "should [behavior] when [condition]"
- Mock external dependencies

## What to Generate
1. Unit tests for all public functions/methods
2. At least one integration test if the code has external dependencies
3. Test both success and failure scenarios

## After Writing Tests
- Run the test suite: verify all tests pass
- Report coverage if tooling is available
```

**Use it**: Point at a feature in your app and run `/write-tests` to generate its test suite.

---

### Exercise 3D: Create a Prompt with Variables

Create a prompt with **template variables** that makes it flexible. Create `.github/prompts/add-endpoint.prompt.md`:

```markdown
---
description: "Add a new API endpoint with validation, error handling, and tests"
mode: "agent"
tools: ["file_system", "terminal"]
variables:
  - name: "resource"
    description: "Resource name (e.g., tasks, users, recipes)"
  - name: "operations"
    description: "Which operations to create"
    default: "list, get, create, update, delete"
---

# Add API Endpoint: {{resource}}

Create a complete API endpoint for the `{{resource}}` resource.

## Operations
{{operations}}

## Requirements for Each Operation
- **List**: Pagination (limit + offset), filtering
- **Get**: Return 404 if not found
- **Create**: Validate required fields, return 201
- **Update**: Validate input, return 404 if not found
- **Delete**: Return 404 if not found, return 204 on success

## Implementation Checklist
- [ ] Route/handler definitions
- [ ] Input validation
- [ ] Error handling with appropriate status codes
- [ ] Type/model definitions for the resource
- [ ] Unit tests for each operation
- [ ] Follow project conventions from copilot-instructions.md
```

**Use it**: Run `/add-endpoint` and fill in your resource name. This should generate a complete CRUD endpoint for your app.

---

### Exercise 3E: Use Your Prompts to Build the App

Now put it all together. Use your prompts to **actually build out your app**:

1. Run `/add-feature` or `/add-endpoint` to add 2â€“3 features to your app
2. Run `/write-tests` to generate tests for what you built
3. Run `/review` to check the generated code against your standards
4. Fix any issues the review found

By the end of this exercise, your app should have **real functionality** â€” built entirely through reusable prompts.
---

## Key Takeaways

- **Prompt files** (`.prompt.md`) are reusable, version-controlled AI workflows
- They appear as **slash commands** in Copilot Chat (e.g., `/add-feature`)
- Use **variables** to make prompts flexible for different inputs
- Use **file references** to ground prompts in your existing conventions
- **`mode: "agent"`** allows the prompt to take actions (create files, run commands)
- Prompts aren't just templates — they're **tools for building your app**

---

## Your App Checkpoint

After this module, your app should have:
- [x] Working app with project structure (Module 1)
- [x] Copilot instructions configured (Module 2)
- [x] `.github/prompts/add-feature.prompt.md` — for scaffolding features
- [x] `.github/prompts/review.prompt.md` — for code review
- [x] `.github/prompts/write-tests.prompt.md` — for generating tests
- [x] `.github/prompts/add-endpoint.prompt.md` — for API endpoints (with variables)
- [x] **2-3 actual features** built in your app using these prompts

---

## References

- [VS Code: Prompt Files](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files)
- [Automate tasks and workflows](https://code.visualstudio.com/docs/copilot/customization/prompt-files)

---

*Previous: [← Module 2: Custom Instructions](../02-custom-instructions/README.md) | Next: [Module 4: Custom Agents →](../04-custom-agents/README.md)*