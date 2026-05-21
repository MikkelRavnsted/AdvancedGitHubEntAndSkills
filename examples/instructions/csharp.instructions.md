---
applyTo: "**/*.cs"
---

# C# Conventions

- Target .NET 8+ and C# 12+ features
- Use file-scoped namespaces
- Use primary constructors where appropriate
- Prefer records for immutable data types
- Use `required` keyword for mandatory properties
- Use pattern matching for type checks and deconstruction
- Prefer LINQ methods over manual loops for collection operations
- Use `IAsyncEnumerable` for streaming data
- Always use `CancellationToken` for async methods
- Follow .NET naming conventions (PascalCase for public, _camelCase for private fields)
