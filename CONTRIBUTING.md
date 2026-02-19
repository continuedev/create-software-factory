# Contributing to create-software-factory

Thanks for your interest in contributing! This guide will help you get set up.

## Development Setup

```bash
git clone https://github.com/continuedev/create-software-factory.git
cd create-software-factory
npm install
```

## Project Structure

```
create-software-factory/
├── bin/create-software-factory.js   # Entry point
├── src/
│   ├── index.js                     # Commander program
│   ├── commands/
│   │   ├── create.js                # Interactive scaffold flow
│   │   └── import.js                # GitHub import flow
│   ├── lib/
│   │   ├── github.js                # GitHub Contents API client
│   │   ├── frontmatter.js           # YAML frontmatter parser
│   │   └── writer.js                # File writer with conflict prompts
│   └── templates/
│       ├── checks/                  # Curated check templates
│       └── agents/                  # Curated agent templates
├── package.json
└── README.md
```

This is a plain JavaScript (ESM) package with no build step.

## Running Locally

```bash
# Interactive create flow
node bin/create-software-factory.js

# Import from a GitHub repo
node bin/create-software-factory.js --from owner/repo

# Target a specific directory
node bin/create-software-factory.js --dir /tmp/test
```

## Adding Templates

Templates live in `src/templates/checks/` and `src/templates/agents/`. Each is a markdown file with YAML frontmatter:

```markdown
---
name: My Check
description: What this check does
---

Instructions for the check...
```

Agents that should trigger automatically include an `on:` field:

```markdown
---
name: My Agent
description: What this agent does
on:
  github:
    issues:
      types: [labeled]
      labels: ["my-label"]
---
```

After adding a template file, update the `CHECKS` or `AGENTS` array in `src/commands/create.js`.

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature (triggers minor release)
- `fix:` — Bug fix (triggers patch release)
- `docs:` — Documentation only
- `chore:` — Maintenance, no release

Breaking changes should include `BREAKING CHANGE:` in the commit footer.

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Test locally with `node bin/create-software-factory.js`
4. Submit a PR with a clear description

## Reporting Bugs

Use the [bug report template](https://github.com/continuedev/create-software-factory/issues/new?template=bug_report.yml) to file issues.
