# Facilitator Guide

> **For the workshop instructor only** — Do not share with participants before the workshop.

---

## Workshop Preparation

### Before the Day
- [ ] Ensure all participants have Copilot licenses activated
- [ ] Verify VS Code is installed with the Copilot extensions
- [ ] Ensure participants have Git, Node.js, or their preferred language runtime installed
- [ ] Prepare a live demo app to show what participants will build
- [ ] Test that MCP servers (at least the fetch server) work in your environment
- [ ] Have the VS Code Agent Customizations editor open and ready for demo

### Environment Check
- [ ] Copilot Chat works in VS Code
- [ ] Agent mode is available
- [ ] Custom instructions are being picked up (test with a sample file)
- [ ] At least one MCP server can be demonstrated (`npx` must work)

### Key Change from Previous Version
This workshop follows a **"build your own app"** approach. Participants choose an app idea in Module 1 and progressively add Copilot customization while building real features. By the end, they have both a working app AND a complete Copilot enterprise configuration.

---

## Timing Guide

| Time | Activity | Notes |
|---|---|---|
| 13:00–13:30 | Module 1: Foundations & Project Setup | Choose app, create project, git init |
| 13:30–14:15 | Module 2: Custom Instructions | Configure Copilot for their app |
| 14:15–14:55 | Module 3: Reusable Prompts | Build features using prompts |
| 14:55–15:10 | **Break** | 15 minutes |
| 15:10–16:00 | Module 4: Custom Agents | Create agents that work on their app |
| 16:00–16:50 | Module 5: Skills & Plugins | Add skills, explore marketplace |
| 16:50–17:35 | Module 6: Enterprise & MCP | MCP servers, hooks, alignment |
| 17:35–18:00 | Module 7: Validate & Present | Test everything, present to group |

> Adjust timing based on group pace. Modules 1-4 are essential; 5-7 can be compressed.
> The app-building approach means participants stay engaged — they're always making progress on something tangible.

---

## Key Teaching Points Per Module

### Module 1: Foundations & Project Setup
- **Goal**: Everyone leaves with a new project created and a git repo initialized
- **Demo**: Show creating a project via agent mode ("Create a Node.js Express API for managing tasks")
- **Key moment**: The "what do you want to build?" choice — help indecisive participants pick quickly
- **Tip**: Suggest simple apps (Task Manager, Recipe Book) for beginners; complex ones for experienced devs
- **Avoid**: Don't let anyone spend too long on project setup — 10 minutes max

### Module 2: Custom Instructions
- **Demo**: Create `copilot-instructions.md`, ask Copilot a question, show it references the file
- **Key insight**: Instructions shape ALL Copilot interactions — this is the highest-leverage file
- **Common mistake**: Students forget the `.github/` directory prefix
- **Tip**: Have students check the References section in Copilot responses to verify pickup
- **Bridge**: "Now that Copilot knows your conventions, let's use prompts to build features..."

### Module 3: Reusable Prompts
- **Demo**: Create `add-feature.prompt.md`, run `/add-feature add user login` — show it creating files
- **Key insight**: Prompts = repeatable, shareable AI workflows that actually BUILD your app
- **This is where apps come alive**: Participants should have 2-3 real features by end of this module
- **Tip**: Encourage participants to iterate — if the first prompt output isn't great, refine the prompt

### Module 4: Custom Agents
- **Demo**: Create a reviewer agent, invoke with `@reviewer`, show the defined output format
- **Key insight**: Agents persist a persona; prompts persist a task. Different purposes.
- **Fun exercise**: Have participants invoke each other's agents to see different styles
- **Discussion**: "What roles does your team have that the AI could specialize in?"

### Module 5: Skills & Plugins
- **Demo**: Show how a SKILL.md gives an agent new capabilities it didn't have before
- **Bridge**: Connect skills → plugins → marketplace as the enterprise scaling story
- **Note**: Plugin marketplace may have limited availability — focus on skills creation
- **Practical**: The dependency analysis skill is universally useful — everyone should try it

### Module 6: Enterprise & MCP
- **Demo**: Configure the fetch MCP server, ask Copilot to read docs and implement based on them
- **Key moment**: When agents go from "smart autocomplete" to "can access real data"
- **Security discussion**: "What should agents NOT have access to in your real codebase?"
- **Enterprise context**: Connect to org-level policies, content exclusions, cloud agent alignment

### Module 7: Validate & Present
- **Facilitate**: Help students run through the validation checklist
- **Presentations**: Keep them informal — 3-5 minutes each, focus on "what surprised you"
- **If short on time**: Skip presentations, do a group discussion instead
- **Close with**: "What's the first thing you'll implement in your real projects Monday morning?"

---

## Common Issues & Solutions

| Issue | Solution |
|---|---|
| Copilot doesn't pick up instructions | Check file is in `.github/`, restart Copilot |
| Agent not appearing in chat | Check file is in `.github/agents/` with `.agent.md` extension |
| Prompt not showing as slash command | Verify `.github/prompts/` path and `.prompt.md` extension |
| MCP server not connecting | Check `npx` is available, look at Output panel for errors |
| "I don't know what app to build" | Suggest Task Manager or Recipe Book — simple CRUD apps work great |
| Participant stuck on project setup | Help them use agent mode: "Create a [language] project with..." |
| Agent mode not generating tests | Check their testing instructions exist and are referenced |
| "I don't have enterprise" | All exercises work with Copilot Business or Individual |
| Student using JetBrains | Most features work, some agent/prompt features are VS Code only |
| Participant far ahead of others | Point them to Bonus Challenges in Module 7 |

---

## Discussion Prompts

Use these to spark conversation during or between modules:

1. "What's the most repetitive AI interaction you have? How would you automate it?"
2. "If you could teach the AI one thing about your codebase, what would it be?"
3. "What guardrails would you set for an autonomous AI agent on your repo?"
4. "How would you measure whether Copilot customization is working?"
5. "What's the risk of over-customizing? When do instructions become harmful?"

---

## Morning Session Demo Notes

The morning session (before lunch) covers concepts and demos. These are NOT in the written modules — they're presented by the facilitator:

### Demo: GitHub Desktop / Agent Experience
- Show the new GitHub Desktop with Copilot integration
- Demonstrate the cloud coding agent: assign an issue → agent creates a PR
- Show how `AGENTS.md` and `copilot-instructions.md` control the cloud agent's behavior
- If available, show the web-based agent chat on github.com

### Enterprise Overview (slides/live)
- Walk through the access model hierarchy (Module 6.1 has the diagram)
- Show org-level policy configuration on github.com (Settings → Copilot)
- Demonstrate content exclusions in action
- Show the skills → plugins → marketplace → APM scaling story (Module 1.3 + 5.4)

---

## Afternoon-Only Variant (2 hours: 13:00–15:00)

If the hands-on is limited to 2 hours after the morning session, use this condensed plan:

| Time | Activity | Notes |
|---|---|---|
| 13:00–13:10 | Setup | Participants use `fast-track/start-at-module-5/` |
| 13:10–13:50 | Module 5: Skills & Plugins | Build skills, design plugin |
| 13:50–14:30 | Module 6: Enterprise & MCP | MCP, alignment, hooks |
| 14:30–14:50 | Module 7: Validate & Present | Quick validation + discussion |
| 14:50–15:00 | Wrap-up & Retrospective | What will you implement Monday? |

**This perfectly matches the agenda**: "Build & package skills/plugins" + "Configure enterprise setup (access + MCP/skills)" + "Experiment with distribution & agent configurations"

Participants skip Modules 1-4 (covered conceptually in the morning session) and use the pre-built fast-track app that already has instructions, prompts, and agents configured.

---

## Post-Workshop Follow-Up

Suggest to participants:
1. Push their app to GitHub and share the Copilot config with their team
2. Enable the cloud coding agent and test if it follows their `AGENTS.md`
3. Schedule a 30-min follow-up to discuss what they've implemented
4. Start an internal "Copilot customization" channel for sharing patterns
5. Iterate on their prompts and agents as they discover new workflows
