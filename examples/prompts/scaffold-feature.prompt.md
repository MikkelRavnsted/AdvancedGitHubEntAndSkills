---
description: "Scaffold a new feature with implementation, tests, and documentation"
mode: "agent"
tools: ["file_system", "terminal"]
variables:
  - name: "featureName"
    description: "Name of the feature to scaffold (e.g., 'user-authentication')"
  - name: "language"
    description: "Programming language to use"
    default: "typescript"
---

# Scaffold Feature: {{featureName}}

Create a complete feature scaffold in {{language}} with all necessary files.

## What to Create

### 1. Implementation
- Main module/class for the feature
- Supporting utilities if needed
- Type definitions / interfaces

### 2. Tests
- Unit tests for all public methods
- At least one integration test
- Test fixtures/helpers if needed

### 3. Documentation
- Module-level documentation (README or docstring)
- Usage examples
- API reference for public interfaces

## Structure
Follow the project's existing directory structure. If no clear pattern exists,
use this layout:

```
src/
└── {{featureName}}/
    ├── index.[ext]          # Public API / exports
    ├── {{featureName}}.[ext] # Main implementation
    ├── types.[ext]          # Type definitions
    └── utils.[ext]          # Helper functions (if needed)

tests/
└── {{featureName}}/
    ├── {{featureName}}.test.[ext]  # Unit tests
    └── integration.test.[ext]       # Integration test
```

## Conventions
- Follow project's code style and naming conventions
- Include error handling for all edge cases
- Make the module self-contained and independently testable
- Export only what's needed (principle of least exposure)
