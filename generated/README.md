# Generated Apps

This folder holds the output of your agentic workflow runs.

Each time you run the full workflow with different variables, a new app appears here:

```
generated/
├── my-task-app/       ← Run 1: theme=minimal, features=crud, dataStore=sqlite
├── my-dark-app/       ← Run 2: theme=dark, features=crud,auth, dataStore=json-file
└── my-retro-app/      ← Run 3: theme=retro, features=crud,search, dataStore=in-memory
```

## How to Use

Each generated app is self-contained and runnable:

```bash
cd generated/[app-name]
npm install        # or pip install, dotnet restore, etc.
npm test           # verify tests pass
npm start          # run the app
```

## Comparing Runs

The whole point is that the same workflow produces different results based on variables.
Compare two runs side by side:
- Do they have different features?
- Do they use different data stores?
- Do they both follow the same conventions?
- Do they both pass tests?

If yes to all → your workflow is working correctly.
