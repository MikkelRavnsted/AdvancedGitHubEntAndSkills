---
applyTo: "**/tests/**,**/*.test.*,**/*.spec.*"
---

# Testing Instructions

These instructions apply to all files in `tests/`.

## Testing Framework
- Use Node.js built-in test runner (`node:test` module)
- Import `describe`, `it`, `before`, `after` from `node:test`
- Import `assert` from `node:assert`

## Test Structure
- One test file per route/module: `tests/<module>.test.js`
- Group related tests with `describe` blocks
- Use descriptive test names: "should [behavior] when [condition]"

## Patterns
- **Arrange-Act-Assert**: Set up data, perform action, check result
- Test happy path first, then error cases
- Test input validation (missing fields, invalid types, boundary values)
- Test 404 responses for non-existent resources
- Each test should be independent — don't rely on test execution order

## What to Test
- All CRUD operations for each resource
- Input validation (400 responses)
- Not-found cases (404 responses)
- Edge cases (empty strings, null values, very long inputs)
- Status code correctness

## What NOT to Test
- Framework internals (Express routing mechanics)
- Third-party library behavior
- Implementation details (private functions)
