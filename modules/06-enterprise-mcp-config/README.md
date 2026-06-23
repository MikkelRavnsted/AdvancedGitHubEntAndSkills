# Module 6: MCP Configuration & Enterprise Patterns

> **Duration: 30 minutes** | **Difficulty: Advanced** | **⚠️ Optional Enhancement**

> Your workflow from Modules 2–5 already works without MCP. This module adds external tool access — skip it if you're short on time and go straight to Module 7.

---

## Learning Objectives

- Configure MCP servers in `.vscode/mcp.json` to give agents external capabilities
- Understand enterprise MCP distribution (org-level servers)
- Apply pre/post chat hooks for guardrails
- Know what MCP adds to your workflow vs. what you already have

> **IDE support:** MCP configuration is supported in VS Code (`.vscode/mcp.json`) and Visual Studio (Preview). JetBrains supports MCP through its own configuration format. If you're not on VS Code or Visual Studio, you can still review the concepts and apply them when support arrives in your IDE.

---

## Role in the Workflow

MCP (Model Context Protocol) gives your agents **access to external tools** — databases, APIs, cloud services, internal systems. Your workflow already works with built-in tools. MCP extends it to connect with real infrastructure.

---

## 6.1 — MCP Configuration

MCP servers are configured in `.vscode/mcp.json` (workspace-level):

```json
{
  "servers": {
    "fetch": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-fetch"]
    },
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-filesystem", "./generated"]
    }
  }
}
```

Each server exposes tools that agents can use. After adding a server:
1. Reload VS Code
2. The tools appear in agent `tools:` lists
3. Agents can invoke them like built-in tools

### Dos and Don'ts

| ✅ DO | ❌ DON'T |
|---|---|
| Scope filesystem access to specific dirs | Give unrestricted filesystem access |
| Use `stdio` type for local servers | Expose internal APIs without auth |
| Pin versions (`@1.2.3`) for reproducibility | Use `latest` for shared configs |
| Document what each server provides | Add servers without clear use cases |
| Restrict tools per-agent (only what's needed) | Give every agent access to every server |

---

## 6.2 — Practical Exercise: Add Fetch Server

This gives your agents the ability to make HTTP requests (useful for checking API docs, validating URLs, etc.).

**Step 1** — Create `.vscode/mcp.json`:
```json
{
  "servers": {
    "fetch": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-fetch"]
    }
  }
}
```

**Step 2** — Reload your IDE (VS Code: `Ctrl+Shift+P` → "Reload Window")

**Step 3** — Test it in Chat:
```
Use the fetch tool to get the contents of https://jsonplaceholder.typicode.com/todos/1
```

✅ **Pass** if it fetches and shows the JSON response.  
❌ **Fail** if it says it can't access URLs — the MCP server didn't load (check the file path and reload).

---

## 6.3 — Enterprise Distribution

In enterprise environments, MCP servers can be distributed at org-level:

| Level | Config Location | Who Manages |
|---|---|---|
| Workspace | `.vscode/mcp.json` | Developer |
| Organization | GitHub org settings | Platform team |
| Policy | Copilot admin settings | Security team |

Org-level servers appear automatically — developers don't configure them. Policies can restrict which servers are allowed.

---

## 6.4 — Hooks (Pre/Post Chat Guardrails)

Hooks run automatically before or after agent interactions:

```json
{
  "hooks": {
    "pre-chat": [
      {
        "command": "npx eslint --quiet {{file}}",
        "description": "Lint before processing"
      }
    ],
    "post-chat": [
      {
        "command": "npm test",
        "description": "Run tests after changes"
      }
    ]
  }
}
```

Use cases:
- **Pre-chat**: Validate current state, check branch, lint
- **Post-chat**: Run tests, format code, security scan

---

## 6.5 — What MCP Adds to Your Workflow

Your workflow without MCP:
```
@orchestrator → @architect → @security-auditor → /generate-app → @reviewer
(uses: execute, read, edit, search)
```

Your workflow with MCP:
```
Same chain, but agents can also:
- Query a real database to check schema
- Fetch API docs for accurate integration
- Call internal services for validation
- Push to deployment pipelines
```

MCP is **optional enhancement** — your workflow must function without it. MCP adds real-world connectivity.

---

## 6.6 — Cloud & Infrastructure Alignment

If your generated apps target cloud deployment, MCP can validate alignment:

```json
{
  "servers": {
    "azure": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@azure/mcp-server"],
      "env": {
        "AZURE_SUBSCRIPTION": "${env:AZURE_SUBSCRIPTION_ID}"
      }
    }
  }
}
```

Agents can then verify: Does this generated app match our infrastructure? Are the resource names valid? Do IAM policies allow this?

---

## Checkpoint

- [x] `.vscode/mcp.json` created with at least one server (fetch)
- [x] One agent updated to use the MCP tool
- [x] MCP server tested — agent successfully used the tool
- [x] Understand: workspace vs. org-level configuration
- [x] Optional: hooks configured for pre/post guardrails

---

*Previous: [← Module 5](../05-skills-and-plugins/README.md) | Next: [Module 7: Capstone →](../07-capstone/README.md)*
