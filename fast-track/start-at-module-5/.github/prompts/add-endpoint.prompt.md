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
- [ ] Route/handler definitions in `src/routes/{{resource}}.js`
- [ ] Input validation
- [ ] Error handling with appropriate status codes
- [ ] Wire up in `src/index.js`
- [ ] Unit tests in `tests/{{resource}}.test.js`
- [ ] Follow project conventions from copilot-instructions.md
