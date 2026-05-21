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
1. **Correctness** — Does it do what it should? Edge cases handled?
2. **Security** — Input validation? No hardcoded secrets? Safe queries?
3. **Conventions** — Follows our naming, structure, and patterns?
4. **Tests** — Are there tests? Do they cover the important cases?
5. **Maintainability** — Will someone else understand this in 6 months?

## Output Format
For each finding:
- **Severity**: Critical | Warning | Suggestion
- **What**: The issue
- **Fix**: How to resolve it (with code example)
