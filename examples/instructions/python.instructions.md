---
applyTo: "**/*.py"
---

# Python Conventions

- Target Python 3.11+ features
- Use type hints for all function signatures
- Use dataclasses or Pydantic models for data structures
- Follow PEP 8 naming conventions (snake_case for functions/variables)
- Use f-strings for string formatting
- Prefer pathlib over os.path for file operations
- Use context managers (`with` statements) for resource management
- Handle exceptions specifically — never use bare `except:`
- Use `logging` module instead of `print()` for diagnostics
