---
description: "Generate tests for existing code in this project"
mode: "agent"
tools: [execute, read, edit, search]
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
