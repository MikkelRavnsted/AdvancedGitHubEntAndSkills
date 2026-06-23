# Generate API Documentation

## Description
Automatically generates comprehensive API documentation by analyzing
route handlers, controllers, and type definitions. Produces OpenAPI/Swagger-
compatible documentation in Markdown format.

## When to Use
- When asked to "document this API" or "generate API docs"
- When a new endpoint is created and needs documentation
- When performing an API documentation audit
- Before publishing an API for external consumers

## Steps

### 1. Discover API Endpoints
Scan the codebase for route definitions:
- Express/Koa: Look for `app.get()`, `router.post()`, etc.
- FastAPI/Flask: Look for route decorators
- ASP.NET: Look for `[HttpGet]`, `[HttpPost]` attributes
- Spring: Look for `@RequestMapping`, `@GetMapping`, etc.

### 2. Extract Endpoint Details
For each endpoint, identify:
- HTTP method and path
- Request parameters (path, query, body)
- Request/response types
- Authentication requirements
- Status codes returned

### 3. Analyze Types/Models
Find the data models used:
- TypeScript interfaces/types
- Python Pydantic models / dataclasses
- C# DTOs / records
- Java POJOs / records

### 4. Check for Existing Docs
Look for:
- Inline documentation comments
- Existing OpenAPI/Swagger specs
- README documentation
- Postman collections

### 5. Generate Documentation
Produce documentation in this format:

```markdown
# API Reference

## [Resource Name]

### [METHOD] /path/to/endpoint

[Description of what this endpoint does]

**Authentication**: Required / Optional / None

#### Parameters

| Name | In | Type | Required | Description |
|------|-----|------|----------|-------------|
| id   | path | string | Yes | Resource identifier |

#### Request Body

```json
{
  "field": "type — description"
}
```

#### Response

**200 OK**
```json
{
  "field": "value"
}
```

**400 Bad Request**
```json
{
  "error": "Description of what went wrong"
}
```

#### Example

```bash
curl -X GET https://api.example.com/resource/123 \
  -H "Authorization: Bearer token"
```
```

## Tools Required
- read (to read source code and type definitions)
- execute (to run documentation generators if available)

## Examples

### Example Invocation
"Generate API documentation for all endpoints in the src/routes/ directory"

### Example: Discovery Output
"Found 12 endpoints across 4 route files:
- /api/users (GET, POST, PUT, DELETE)
- /api/orders (GET, POST)
- /api/products (GET, POST, PUT, DELETE)
- /api/auth (POST, DELETE)"
