# Module 6: Enterprise Setup, MCP & Access Model

> **Duration: 45 minutes** | **Difficulty: Advanced**

---

## Learning Objectives

By the end of this module, you will:

- Understand the Copilot enterprise access model (org, team, user levels)
- Configure MCP (Model Context Protocol) servers for enhanced agent capabilities
- Set up enterprise-level policies and content exclusions
- Understand cloud vs. local agent configuration alignment
- Configure Copilot for organizational compliance requirements

---

## 6.1 — Enterprise Access Model

GitHub Copilot's enterprise setup controls **who can use what, and how**.

### Access Hierarchy

```
┌─────────────────────────────────────────────────────┐
│ Enterprise                                           │
│  ├─ Organization Policies                           │
│  │   ├─ Copilot enabled/disabled                    │
│  │   ├─ Model selection policies                    │
│  │   ├─ Content exclusion rules                     │
│  │   └─ Custom instructions (org-level)             │
│  ├─ Team Assignments                                │
│  │   ├─ Which teams get Copilot seats              │
│  │   └─ Feature access (chat, agent, cloud agent)  │
│  └─ Repository Settings                             │
│       ├─ Custom instructions                        │
│       ├─ Code review preferences                    │
│       └─ Cloud agent permissions                    │
└─────────────────────────────────────────────────────┘
```

### Key Enterprise Settings

| Setting | Level | Purpose |
|---|---|---|
| **Seat assignment** | Org/Team | Who gets a Copilot license |
| **Suggestions matching public code** | Org | Block/allow suggestions matching public repos |
| **Copilot Chat in IDE** | Org | Enable/disable Chat |
| **Copilot in the CLI** | Org | Enable/disable CLI integration |
| **Cloud Agent** | Org/Repo | Enable autonomous coding agent |
| **Model selection** | Org | Which AI models are available |
| **Content exclusions** | Org/Repo | Files/repos Copilot should ignore |
| **Custom instructions** | Org/Repo | Org-wide coding standards |

### Content Exclusions

Prevent Copilot from accessing sensitive files:

```yaml
# In organization settings → Copilot → Content exclusion
- "**/*.env"
- "**/*secret*"
- "**/credentials/**"
- "internal-tools/proprietary-algo/**"
```

---

## 6.2 — Model Context Protocol (MCP)

**MCP** (Model Context Protocol) gives Copilot access to **external tools and data** — databases, APIs, internal services, and more.

### What Is MCP?

```
┌────────────────┐     ┌─────────────┐     ┌──────────────────┐
│ GitHub Copilot │────→│  MCP Server  │────→│ External Service │
│  (AI Agent)    │←────│  (bridge)    │←────│  (DB, API, etc.) │
└────────────────┘     └─────────────┘     └──────────────────┘
```

MCP servers act as **bridges** between the AI agent and external systems. They expose:
- **Tools** — Actions the agent can perform (query DB, create ticket, deploy)
- **Resources** — Data the agent can read (schemas, documentation, config)
- **Prompts** — Pre-built interaction patterns

### MCP Configuration Files

MCP can be configured at multiple levels:

| Level | File | Scope |
|---|---|---|
| **Repository** | `.github/copilot-mcp.json` | Anyone working in this repo |
| **Workspace** | `.vscode/mcp.json` | VS Code workspace |
| **User** | VS Code settings | Your personal MCP servers |

---

## 6.3 — Configuring MCP Servers

### Repository-Level MCP Configuration

Create `.github/copilot-mcp.json`:

```json
{
  "servers": {
    "database-tools": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "path/to/db.sqlite"]
    },
    "github-tools": {
      "type": "stdio", 
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

### VS Code Workspace MCP Configuration

Create `.vscode/mcp.json`:

```json
{
  "servers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
    },
    "fetch": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}
```

### Exercise 6A: Add MCP to Your App

Add an MCP server configuration to **your app project**. Create `.vscode/mcp.json`:

```json
{
  "servers": {
    "fetch": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"],
      "description": "Fetches web content for the agent to read"
    }
  }
}
```

**Test it**: In agent mode, ask Copilot to:
- Fetch the documentation for a library your app uses
- Read an API specification and implement a client for it
- Look up best practices for a pattern you're using

Then add a **second MCP server** that makes sense for your app:

| Your App | Useful MCP Server | Why |
|---|---|---|
| Any app with a DB | `@modelcontextprotocol/server-sqlite` | Query your database directly |
| Any app | `@modelcontextprotocol/server-filesystem` | Read docs or data files |
| API-based app | `@modelcontextprotocol/server-fetch` | Test endpoints, read API docs |
| GitHub-hosted | `@modelcontextprotocol/server-github` | Read issues, PRs, wiki |

---

## 6.4 — Enterprise MCP Patterns

### Pattern: Internal API Gateway

Connect agents to your internal services:

```json
{
  "servers": {
    "internal-api": {
      "type": "stdio",
      "command": "node",
      "args": ["./tools/mcp-internal-api-server.js"],
      "env": {
        "API_BASE_URL": "${INTERNAL_API_URL}",
        "API_TOKEN": "${INTERNAL_API_TOKEN}"
      }
    }
  }
}
```

### Pattern: Database Access (Read-Only)

Give agents read-only access to query databases:

```json
{
  "servers": {
    "db-readonly": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${DB_READONLY_URL}"
      }
    }
  }
}
```

### Pattern: Documentation Server

Expose internal documentation to agents:

```json
{
  "servers": {
    "docs": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./docs"],
      "description": "Access to project documentation"
    }
  }
}
```

---

## 6.5 — Cloud vs. Local Agent Alignment

### The Alignment Challenge

Your team uses both:
- **Local agents** (VS Code agent mode) — for individual development
- **Cloud agent** (Copilot coding agent on github.com) — for issue-to-PR automation

Both should follow the same conventions. Here's how to align them:

### Shared Configuration Layer

```
.github/
├── copilot-instructions.md        ← BOTH read this
├── instructions/
│   └── *.instructions.md          ← BOTH read these
├── copilot-mcp.json               ← Cloud agent MCP
└── agents/
    └── *.agent.md                 ← Local only (for now)

AGENTS.md                          ← BOTH read this
.vscode/
└── mcp.json                       ← Local only
```

### Exercise 6B: Align Cloud and Local for Your App

Your app now has local Copilot configuration. Set it up so the **cloud agent** (Copilot coding agent) would also work well if you pushed this repo to GitHub.

1. **Verify `.github/copilot-instructions.md`** exists (you created this in Module 2)
2. **Create `AGENTS.md`** in your app's root if you haven't already:

```markdown
# Agent Instructions

## General Behavior
- Always create a new branch before making changes
- Run existing tests before and after making changes
- Commit with conventional commit messages (feat:, fix:, docs:, chore:)
- Never modify files outside the scope of the assigned task

## Code Changes
- Follow the conventions in `.github/copilot-instructions.md`
- Add tests for any new functionality
- Update documentation when behavior changes
```

3. **Create `.github/copilot-mcp.json`** for the cloud agent (what MCP servers should it have access to?):

```json
{
  "servers": {}
}
```

The goal: if someone assigns a GitHub issue to the Copilot coding agent, it should produce code that matches what you'd build locally.

### Exercise 6C: Use MCP to Enhance Your App

Now use your MCP-enabled agent to **actually build something** in your app:

1. Ask Copilot (in agent mode) to fetch documentation for a library you're using, then implement a feature based on it
2. If you configured a database MCP server, ask Copilot to query your database and generate code based on the schema
3. Ask Copilot to read an external API's documentation and generate a client for it

**The point**: MCP makes your agents dramatically more capable because they can access real data and documentation instead of relying only on training data.

---

## 6.6 — Security Considerations for Enterprise

### MCP Security Checklist

- [ ] MCP servers use **read-only** access where possible
- [ ] Secrets are in **environment variables**, never hardcoded
- [ ] MCP server packages are from **trusted sources**
- [ ] Network access is **scoped** (not open internet for cloud agents)
- [ ] Agent actions are **auditable** (logging enabled)
- [ ] Content exclusions cover **sensitive directories**

### Enterprise Governance Checklist

- [ ] Organization-level instructions define **baseline standards**
- [ ] Content exclusions prevent AI access to **secrets and proprietary code**
- [ ] Model selection policy aligns with **data residency requirements**
- [ ] Cloud agent is enabled only for **appropriate repositories**
- [ ] Code review with Copilot has **custom instructions for standards**
- [ ] Audit logs are enabled for **Copilot usage tracking**

### Exercise 6D: Security Review of Your App's Copilot Config

Review your app's Copilot configuration for security:

1. **Content exclusions**: Are there files Copilot shouldn't see? Create or verify your `.github/copilot-content-exclusions.json`:
   ```json
   {
     "exclude": [
       "**/*.env",
       "**/*secret*",
       "**/credentials/**"
     ]
   }
   ```

2. **MCP access**: Are your MCP servers using least-privilege access?
3. **Secrets**: Are all credentials in environment variables, never hardcoded?
4. **Agent constraints**: Should any agents be read-only?

Ask your `@security-auditor` agent to review your Copilot config files for security issues.

---

## 6.7 — Hooks: Lifecycle Automation

**Hooks** run shell commands at key points in the agent's workflow:

| Hook | Trigger | Example Use |
|---|---|---|
| `post-edit` | After agent edits a file | Run formatter, linter |
| `pre-commit` | Before agent commits | Run tests, security scan |
| `post-create` | After creating a file | Add license header |

### Hook Configuration

Hooks are defined in `.github/hooks/` or via VS Code settings:

```json
// .vscode/settings.json
{
  "github.copilot.chat.hooks": {
    "postEdit": {
      "command": "npx prettier --write ${file}",
      "description": "Auto-format edited files"
    }
  }
}
```

### Exercise 6E: Add a Hook to Your App

Add automatic formatting or linting to your app's agent workflow. Create or update `.vscode/settings.json`:

```json
{
  "github.copilot.chat.hooks": {
    "postEdit": {
      "command": "[your-formatter] ${file}",
      "description": "Auto-format files after agent edits"
    }
  }
}
```

Replace `[your-formatter]` with your language's formatter:
- **Node.js**: `npx prettier --write`
- **Python**: `black` or `ruff format`
- **Go**: `gofmt -w`
- **C#**: `dotnet format`

**Test it**: Ask Copilot to add a feature in agent mode. The hook should auto-format the result.

---

## Key Takeaways

- Enterprise access controls **who** uses Copilot and **what features** they access
- **MCP servers** connect agents to external tools and data (databases, APIs, docs)
- MCP can be configured at **repo level** (shared) or **workspace level** (personal)
- **Align cloud and local agents** by sharing instruction files both can read
- **Security first** — use read-only access, environment variables, content exclusions
- **Hooks** automate quality enforcement in agent workflows

---

## Your App Checkpoint

After this module, your app should have:
- [x] Working app with agents and skills (Modules 1-5)
- [x] `.vscode/mcp.json` — at least one MCP server configured
- [x] `AGENTS.md` — cloud agent alignment
- [x] Content exclusions for sensitive files
- [x] A formatting hook for agent mode
- [x] At least one feature built using MCP-enhanced agents

---

## References

- [Managing Copilot for your enterprise](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-for-your-enterprise)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [VS Code MCP Servers](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [VS Code Hooks](https://code.visualstudio.com/docs/copilot/customization/hooks)
- [Content exclusion](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/setting-policies-for-copilot-in-your-organization/excluding-content-from-github-copilot)

---

*Previous: [← Module 5: Skills & Plugins](../05-skills-and-plugins/README.md) | Next: [Module 7: Capstone Project →](../07-capstone/README.md)*
