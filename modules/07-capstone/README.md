# Module 7: Polish, Validate & Present

> **Duration: 40 minutes** | **Difficulty: Putting It All Together**

---

## Learning Objectives

By the end of this module, you will:

- Validate that your entire Copilot configuration works end-to-end
- Add final features to your app using the full agentic workflow
- Verify instructions, prompts, agents, skills, and MCP work together
- Present your app and its Copilot configuration to the group

---

## 7.1 — What You've Built

Over the past modules, you've created a **real application** with a complete Copilot customization layer:

```
your-app/
├── .github/
│   ├── copilot-instructions.md       # Module 2: Project conventions
│   ├── instructions/
│   │   ├── testing.instructions.md   # Module 2: Test patterns
│   │   └── security.instructions.md  # Module 2: Security rules
│   ├── prompts/
│   │   ├── add-feature.prompt.md     # Module 3: Feature scaffolding
│   │   ├── review.prompt.md          # Module 3: Code review
│   │   ├── write-tests.prompt.md     # Module 3: Test generation
│   │   └── add-endpoint.prompt.md    # Module 3: API endpoints
│   ├── agents/
│   │   ├── reviewer.agent.md         # Module 4: Code reviewer
│   │   ├── architect.agent.md        # Module 4: Feature designer
│   │   ├── security-auditor.agent.md # Module 4: Security specialist
│   │   └── <domain>.agent.md         # Module 4: Domain expert
│   ├── skills/
│   │   ├── analyze-deps/SKILL.md     # Module 5: Dependency analysis
│   │   ├── code-health/SKILL.md      # Module 5: Quality check
│   │   └── <custom>/SKILL.md         # Module 5: App-specific skill
│   ├── copilot-mcp.json              # Module 6: Cloud agent MCP
│   └── copilot-content-exclusions.json
├── .vscode/
│   ├── mcp.json                      # Module 6: Local MCP servers
│   └── settings.json                 # Module 6: Hooks
├── AGENTS.md                         # Module 6: Cloud agent alignment
├── src/                              # Your actual app code!
│   └── ...
└── tests/
    └── ...
```

---

## 7.2 — Validation: Test Everything Together

Work through this checklist to verify your configuration works end-to-end.

### Test 1: Instructions Are Active

Ask Copilot Chat: *"What are the coding conventions for this project?"*

✅ **Pass** if it references your `copilot-instructions.md` content.

### Test 2: Prompts Work

Run `/add-feature` and describe a small feature.

✅ **Pass** if it follows your conventions, creates tests, and uses proper structure.

### Test 3: Agents Have Personality

Invoke `@reviewer` on a file in your app.

✅ **Pass** if it uses the output format you defined (🔴/🟡/🟢) and references your conventions.

### Test 4: MCP Is Connected

In agent mode, ask Copilot to use your MCP server (e.g., "Fetch the Express.js docs and summarize the middleware API").

✅ **Pass** if the agent actually uses the MCP tool.

### Test 5: The Full Workflow

Do a complete cycle:
1. Ask `@architect` to design a small feature
2. Use `/add-feature` to implement it
3. Run `/write-tests` to test it
4. Ask `@reviewer` to review it
5. Ask `@security-auditor` to audit it

✅ **Pass** if each step builds on the previous and stays consistent with your conventions.

### Validation Scorecard

| Test | Result |
|---|---|
| Instructions active | ⬜ |
| Prompts work | ⬜ |
| Agents have personality | ⬜ |
| MCP connected | ⬜ |
| Full workflow | ⬜ |

---

## 7.3 — Final Feature Sprint

Use the remaining time to **add one more feature** to your app using the full workflow:

1. **Design** — Ask `@architect` what feature to add next
2. **Build** — Use `/add-feature` or `/add-endpoint` to implement it
3. **Test** — Use `/write-tests` to cover it
4. **Review** — Ask `@reviewer` to check it
5. **Secure** — Ask `@security-auditor` to verify it
6. **Fix** — Address any issues found

This demonstrates the **complete agentic development loop** — designing, building, testing, reviewing, and securing code with specialized AI assistance at every step.

---

## 7.4 — Present Your App

Prepare a **5-minute presentation** covering:

### 1. The App (1 min)
- What did you build?
- What language/framework?
- How many features?

### 2. The Copilot Config (2 min)
- Show your `.github/` directory structure
- Highlight one agent or prompt you're proud of
- Show a quick demo of the agent in action

### 3. What You Learned (2 min)
- What surprised you?
- What worked better than expected?
- What would you do differently?
- What will you take back to your real projects?

---

## 7.5 — Bonus Challenges

If you finish early:

### Bonus A: Agent Collaboration Chain

Create a prompt that orchestrates multiple agents in sequence:
```
1. @architect designs the solution
2. @security-auditor reviews the design for security
3. Build it with /add-feature
4. @reviewer checks the implementation
```

### Bonus B: Write a Custom MCP Server

Write a simple MCP server that exposes a tool relevant to your app:

```javascript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server({
  name: 'my-app-tools',
  version: '1.0.0'
}, {
  capabilities: { tools: {} }
});

server.setRequestHandler('tools/list', async () => ({
  tools: [{
    name: 'get_app_status',
    description: 'Returns the current app health status',
    inputSchema: { type: 'object', properties: {} }
  }]
}));

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'get_app_status') {
    return { content: [{ type: 'text', text: 'All systems operational' }] };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

### Bonus C: Package as a Plugin

Design what it would look like to package your entire Copilot config as an installable plugin for your team.

---

## 7.6 — Workshop Retrospective

Reflect and discuss:

1. **Most valuable thing** you learned today?
2. **First thing** you'll implement in your real projects?
3. **Biggest surprise** about what's possible with Copilot customization?
4. **What would you teach** your team tomorrow?

---

## Key Takeaways

- A complete Copilot configuration combines **multiple layers** working together
- The workflow: instructions → prompts → agents → skills → MCP → hooks
- **Test your configuration** — verify each piece works and they integrate well
- The real value comes from **iteration** — start simple, measure impact, improve
- Everything you built today is **version-controlled** and **shareable** with your team

---

## What's Next?

1. **Push your app to GitHub** — share the Copilot config with your team
2. **Enable the cloud coding agent** — verify it follows your `AGENTS.md`
3. **Iterate** — add more prompts and agents as you discover repetitive workflows
4. **Publish** — consider packaging popular configs as plugins for your org
5. **Measure** — track how Copilot customization impacts your team's velocity

---

*Previous: [← Module 6: Enterprise Setup, MCP & Access Model](../06-enterprise-mcp-config/README.md)*

---

**Congratulations! You've built an app AND a complete Copilot enterprise configuration.**

You now have hands-on experience with every layer of GitHub Copilot customization — from basic instructions to MCP-connected agentic workflows. Take this back to your teams and multiply the impact.
