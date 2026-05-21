# Task Manager API — Copilot Instructions

## Project Overview
This is a Task Manager REST API built with Node.js and Express.
It provides CRUD operations for tasks and categories, with filtering and priority support.

## Tech Stack
- **Runtime**: Node.js 20+ (ES modules)
- **Framework**: Express 5
- **Testing**: Node.js built-in test runner (`node:test`)
- **IDs**: UUID v4
- **Storage**: In-memory (array-based) — no database yet

## Project Structure
```
src/
├── index.js          # App entry point, middleware, error handling
├── routes/           # Express route handlers (one file per resource)
└── middleware/       # Custom middleware (auth, validation, etc.)
tests/
└── *.test.js         # Test files mirror src/ structure
```

## Code Conventions
- Use ES module syntax (`import`/`export`)
- Use `const` by default, `let` only when reassignment is needed
- Use descriptive variable names (no abbreviations)
- Functions should do one thing and be < 30 lines
- Always validate input at route handler level
- Return consistent JSON responses: `{ data }` for success, `{ error }` for failures
- Use HTTP status codes correctly (201 for creation, 204 for deletion, 404 for not found)

## Error Handling
- Validate request body fields and return 400 with a descriptive `{ error }` message
- Return 404 for resources that don't exist
- Use the centralized error handler for unexpected errors (500)
- Never expose stack traces in production responses

## Testing
- Use Node.js built-in test runner (`node:test`)
- Test files go in `tests/` with `.test.js` suffix
- Follow Arrange-Act-Assert pattern
- Test both success and error cases for every endpoint
- Run tests with: `npm test`

## Commands
- Install: `npm install`
- Run (dev): `npm run dev`
- Run (prod): `npm start`
- Test: `npm test`
- Lint: `npm run lint`

## Response Style
- Be concise and direct
- Show working code, not pseudocode
- When adding features, include the route handler, validation, and a test
- Follow existing patterns in the codebase
