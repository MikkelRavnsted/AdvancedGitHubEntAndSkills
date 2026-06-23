# Copilot Instructions for This Workshop Repository

## Project Overview
This is a hands-on workshop repository for GitHub Copilot enterprise features
and agentic workflows. Participants build customization files (.instructions.md,
.prompt.md, .agent.md, SKILL.md) that form a reusable agentic workflow —
run with variables to generate complete apps in `./generated/`.

## Repository Structure
- `modules/` — Workshop modules (01 through 07), each with a README.md
- `exercises/` — Participant scratch space
- `capstone/` — Module 7 capstone notes
- `generated/` — Output folder for generated apps
- `examples/` — Reference examples for each customization type
- `fast-track/` — Pre-built starters for skipping ahead
- `.github/` — Copilot customization files for this repo

## Code Conventions
- Use descriptive names for variables and functions
- Prefer modern language idioms (ES2022+, Python 3.11+, Java 17+, etc.)
- Include error handling in all code examples
- Write code that is readable and self-documenting
- Add comments only to explain "why", not "what"

## Response Style
- Be concise but thorough
- Include working code examples
- Use the participant's preferred programming language
- Reference official documentation when relevant
- Explain trade-offs when multiple approaches exist

## Workshop Context
- Participants build a WORKFLOW, not an app directly
- The workflow generates apps from variables (appName, theme, features, dataStore)
- Generated output goes in `./generated/[appName]/`
- The iteration loop (run → inspect → fix file → re-run) is the core skill
- Participants can use any programming language
