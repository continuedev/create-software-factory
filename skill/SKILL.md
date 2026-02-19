---
name: setup-software-factory
description: Set up .continue/checks and .continue/agents in a project using create-software-factory. Runs the interactive wizard or imports from an existing repo.
metadata:
  author: continuedev
  version: "1.0.0"
---

# Setup Software Factory

You are setting up AI-powered checks and agents in a project using `create-software-factory`. This tool scaffolds `.continue/checks/` and `.continue/agents/` markdown files that define automated PR review checks and event-triggered agents.

## Prerequisites

Verify the environment:
- Node.js >= 18 is installed (`node --version`)
- The project has a git repository initialized
- Determine if the user wants curated templates or to import from an existing repo

## Step 1: Run the CLI

### Option A: Interactive create (curated templates)

```bash
npx create-software-factory
```

This launches an interactive wizard. Walk the user through selecting:

1. **Categories** — Checks (PR automation), Agents (event-triggered), or both
2. **Checks** — Code Review, Security, Test Coverage, PR Description
3. **Agents** — All Green (merge automation), Fix Issue, Triage Issues

Recommend starting with **Code Review** and **Security** checks as a baseline.

### Option B: Import from a GitHub repo

If the user has a reference repo with good checks/agents:

```bash
npx create-software-factory --from owner/repo
```

For private repos:

```bash
npx create-software-factory --from owner/repo --token ghp_xxxxx
```

The CLI fetches `.continue/checks/` and `.continue/agents/` from the repo and lets the user select which files to import.

## Step 2: Review generated files

After the CLI runs, check the generated files:

```bash
ls .continue/checks/
ls .continue/agents/
```

Each file is a markdown file with YAML frontmatter containing `name` and `description`. Agent files may also have an `on:` field defining their trigger.

Review the content of each file and ask the user if they want to customize any of the instructions for their specific project context. Common customizations:

- Adding project-specific directories to check scopes
- Adjusting severity levels
- Adding or removing check criteria
- Changing agent trigger labels

## Step 3: Commit the files

Stage and commit the new `.continue/` files:

```bash
git add .continue/
git commit -m "feat: add Continue checks and agents"
```

## Step 4: Verify on a PR (optional)

If the user wants to verify the setup works:

1. Create a test branch with a small change
2. Open a PR
3. The checks should run automatically on the PR
4. Agents with triggers will activate when their conditions are met (e.g., adding the `ai-merge` label)

## Advanced: Custom templates

If the user wants to create custom checks or agents beyond the built-in templates:

- **Checks** go in `.continue/checks/` with `name` and `description` frontmatter
- **Agents** go in `.continue/agents/` with `name`, `description`, and optionally `on:` frontmatter
- Point them to [continue.dev/walkthrough](https://continue.dev/walkthrough) for the full guide

## Troubleshooting

- **`npx` fails to find the package** — Try `npx create-software-factory@latest` to force the latest version
- **GitHub import returns 0 files** — The target repo may be private (use `--token`) or may not have `.continue/` files
- **Permission denied writing files** — Check filesystem permissions on the target directory
- **Overwrite prompt keeps appearing** — Files already exist from a previous run. Confirm overwrite or delete them first
