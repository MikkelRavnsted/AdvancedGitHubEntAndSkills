---
applyTo: "**"
---

# Security Instructions

These instructions apply to all files in `src/`.

## Input Validation
- Validate all request body fields at the route handler level
- Check types (string, number, boolean) explicitly
- Trim string inputs to prevent whitespace attacks
- Reject requests with missing required fields (return 400)
- Set maximum lengths for string inputs

## Sensitive Data
- Never log sensitive user data (passwords, tokens, emails)
- Never return internal error details in API responses
- Use environment variables for secrets (`process.env`)
- Never hardcode credentials, API keys, or secrets

## HTTP Security
- Always set appropriate status codes
- Validate `Content-Type` headers on POST/PUT requests
- Sanitize user input before using it in responses (prevent XSS)
- Use parameterized queries if/when a database is added (prevent SQL injection)

## Dependencies
- Only use well-maintained packages with active security patching
- Keep dependencies up to date
- Audit with `npm audit` regularly

## Authentication (when added)
- Use strong password hashing (bcrypt, scrypt, or argon2)
- Use short-lived tokens for sessions
- Validate tokens on every protected route
- Never store plaintext passwords
