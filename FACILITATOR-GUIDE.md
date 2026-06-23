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

### Key Concept: Workflow IS the Product
This workshop follows a **"build a workflow that generates apps"** approach. Participants create customization files (instructions, prompts, agents, skills) that form a reusable agentic workflow. By the end, they invoke `@orchestrator` with variables and get a generated app in `./generated/`. The iteration loop — run → inspect output → fix the file → re-run — is the core skill.

---

## Timing Guide

| Time | Activity | Notes |
|---|---|---|
| 13:00–13:20 | Module 1: Foundations & Setup | Choose app type, create workspace, understand vision |
| 13:20–13:50 | Module 2: Custom Instructions | Write copilot-instructions.md + path-specific |
| 13:50–14:25 | Module 3: Reusable Prompts | Build /generate-app prompt with variables |
| 14:25–14:40 | **Break** | 15 minutes |
| 14:40–15:25 | Module 4: Custom Agents | Agents with handoff protocols, test individually |
| 15:25–16:05 | Module 5: Skills & Validation | Skills + test the full pipeline |
| 16:05–16:35 | Module 6: MCP (optional) | MCP config, enterprise patterns |
| 16:35–17:20 | Module 7: Capstone | Run workflow, compare outputs, present |

> Adjust timing based on group pace. Modules 1-5 are essential; Module 6 can be skipped. The testing/iteration loop in Modules 4-5 is where participants learn the most — don't rush it.

---

## Key Teaching Points Per Module

### Module 1: Foundations & Setup
- **Goal**: Everyone leaves with a workspace created (`.github/` folders) and understands the vision
- **Demo**: Show the final state — invoke `@orchestrator`, watch it generate an app
- **Key insight**: "You're building a workflow, not an app. The app is just the output."
- **Common issue**: Participants try to build the app manually — redirect them to building the workflow files
- **Tip**: Have them pick an app type fast (suggest Task Manager for indecisive ones)

### Module 2: Custom Instructions
- **Demo**: Create `copilot-instructions.md`, ask Copilot a question, show it references the file
- **Key insight**: Instructions shape ALL Copilot interactions — highest-leverage file
- **Common mistake**: Students forget the `.github/` directory prefix
- **Verification**: Have them ask "What are the conventions?" and check Copilot's answer
- **Bridge**: "Now Copilot knows your rules. Next we'll build templates that USE those rules..."

### Module 3: Reusable Prompts
- **Demo**: Create `generate-app.prompt.md` with variables, run `/generate-app`, show it creates files
- **Key insight**: Variables make the workflow reusable — different inputs → different apps
- **Critical moment**: The `/generate-app` prompt is THE core template. Help them get it right.
- **Tip**: Run it once immediately after creating — don't wait. Iterate on the spot.

### Module 4: Custom Agents
- **Demo**: Create `@architect`, invoke it, show the structured handoff output
- **Key insight**: Agents add judgment and coordination. Handoff protocols make them composable.
- **Critical pattern**: Test each agent INDIVIDUALLY before connecting them. The `run → inspect → fix` loop.
- **Common issue**: Agents ignore variables → show them how to add `## Variable Handling`
- **Fun exercise**: Have participants pass @architect output to @security-auditor manually

### Module 5: Skills & Validation
- **Demo**: Show how a SKILL.md gives an agent a procedure to follow exactly
- **Key moment**: Testing the full pipeline — this is where the workflow proves it works
- **Practical**: Walk through `workflow-tests.md` together as a group
- **Common issue**: Skills too vague → show that numbered, specific steps work better

### Module 6: MCP (Optional)
- **Demo**: Configure the fetch MCP server, ask Copilot to fetch a URL
- **Key moment**: "Your workflow already works. MCP adds real-world connectivity."
- **Skip if**: Short on time — participants can add MCP later independently
- **Security discussion**: "What should agents NOT have access to?"

### Module 7: Capstone
- **Facilitate**: Help each participant run `@orchestrator` with their chosen variables
- **Presentations**: 3-5 minutes each. Focus on: what they built, what broke, what they fixed.
- **Key question**: "Run it again with different variables — did you get a different app?"
- **Close with**: "What will you build with this workflow pattern in your real projects?"

---

## Common Issues & Solutions

| Issue | Solution |
|---|---|
| Copilot doesn't pick up instructions | Check file is in `.github/`, restart Copilot |
| Agent not appearing in chat | Check file is in `.github/agents/` with `.agent.md` extension |
| Prompt not showing as slash command | Verify `.github/prompts/` path and `.prompt.md` extension |
| MCP server not connecting | Check `npx` is available, look at Output panel for errors |
| "I don't know what app to build" | Suggest Task Manager — simple CRUD, enough depth |
| Agent ignores variables | Add `## Variable Handling` section to the agent file |
| Generated app doesn't run | Add "Run tests and fix failures" to the prompt |
| Same output regardless of variables | Variables not referenced explicitly in prompt template |
| Handoff breaks between agents | Align output format of sender with input of receiver |
| Student using JetBrains | Most features work, some agent/prompt features are VS Code only |
| Participant far ahead of others | Have them run with different variables and compare outputs |

---

## Discussion Prompts

Use these to spark conversation during or between modules:

1. "What repetitive workflow would you automate with this pattern in your real project?"
2. "If you could teach the AI one thing about your codebase, what would it be?"
3. "What guardrails would you set for an autonomous AI agent on your repo?"
4. "How would you test that your workflow produces correct output?"
5. "What happens when you change the dataStore variable — what files SHOULD change?"

---

## Morning Session Demo Notes

The morning session (before lunch) covers concepts and demos. These are NOT in the written modules — they're presented by the facilitator:

### Demo: GitHub Desktop / Agent Experience
- Show the new GitHub Desktop with Copilot integration
- Demonstrate the cloud coding agent: assign an issue → agent creates a PR
- Show how `AGENTS.md` and `copilot-instructions.md` control the cloud agent's behavior
- If available, show the web-based agent chat on github.com

### Enterprise Overview (slides/live)
- Walk through the enterprise access model (org policies, content exclusions)
- Show org-level policy configuration on github.com (Settings → Copilot)
- Demonstrate content exclusions in action
- Show how the workflow pattern scales: share `.github/` folder → whole team gets the same workflow

---

## Afternoon-Only Variant (2 hours: 13:00–15:00)

If the hands-on is limited to 2 hours after a morning concept session:

| Time | Activity | Notes |
|---|---|---|
| 13:00–13:10 | Setup | Use `fast-track/start-at-module-5/` (has instructions+prompts+agents) |
| 13:10–13:50 | Module 5: Skills & Validation | Build skills, test pipeline |
| 13:50–14:30 | Module 7: Capstone | Run `@orchestrator`, generate app, iterate |
| 14:30–14:50 | Presentations + Discussion | Show workflows, compare outputs |
| 14:50–15:00 | Wrap-up | What will you build with this pattern? |

Participants skip Modules 1-4 (covered conceptually in the morning) and use the fast-track starter that has the full workflow pre-built. They focus on skills, testing, and actually running the workflow.

---

## Post-Workshop Follow-Up

Suggest to participants:
1. Use their workflow to generate an app for a real project scenario
2. Share the `.github/` folder with their team — everyone gets the same workflow
3. Enable the cloud coding agent and test if it follows their `AGENTS.md`
4. Add more variables (e.g., `framework`, `auth-provider`) to make the workflow more flexible
5. Iterate on agent handoffs when they find edge cases that break
