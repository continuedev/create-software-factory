<p align="center">
  <a href="https://continue.dev">
    <img src=".github/assets/continue-banner.png" width="800" alt="Continue" />
  </a>
</p>

<h1 align="center">create-software-factory</h1>

<p align="center">Scaffold and import <code>.continue/agents/</code> and <code>.continue/checks/</code> from curated templates or any GitHub repo.</p>

---

## Why?

Setting up AI-powered checks and agents for your repo means writing markdown files with specific frontmatter, directory structure, and trigger formats. Instead of copying from docs or other repos manually:

```bash
npx create-software-factory
```

Pick from curated templates or import directly from any GitHub repo that already has a great setup.

## Table of Contents

- [Quick Start](#quick-start)
- [Import from GitHub](#import-from-github)
- [Options](#options)
- [Included Templates](#included-templates)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

## Quick Start

```bash
npx create-software-factory
```

This launches an interactive wizard that lets you pick from curated check and agent templates and writes them to your project's `.continue/` directory.

## Import from GitHub

Import checks and agents from any public GitHub repo:

```bash
npx create-software-factory --from continuedev/remote-config-server
```

For private repos, pass a GitHub token:

```bash
npx create-software-factory --from myorg/private-repo --token ghp_xxxxx
```

To fetch from a specific branch:

```bash
npx create-software-factory --from owner/repo --branch develop
```

## Options

```
create-software-factory [options]

Options:
  --from <repo>      Import from GitHub repo (owner/repo)
  --token <token>    GitHub token for private repos
  --branch <branch>  Branch to fetch from
  --dir <path>       Target directory (default: cwd)
  -V, --version      Output version number
  -h, --help         Display help
```

## Included Templates

### Checks

Checks run automatically on pull requests:

| Template | Description |
|----------|-------------|
| **Code Review** | Reviews code quality, naming conventions, and patterns |
| **Security** | Scans for OWASP vulnerabilities, hardcoded secrets, and auth issues |
| **Test Coverage** | Ensures new code has appropriate test coverage |
| **PR Description** | Validates that PR descriptions cover all meaningful changes |

### Agents

Agents are triggered by events or invoked on-demand:

| Template | Trigger | Description |
|----------|---------|-------------|
| **All Green** | `ai-merge` label | Fix checks, resolve conflicts, address reviews, and merge the PR |
| **Fix Issue** | Manual | Takes a GitHub issue and creates a fix PR |
| **Triage Issues** | Issue opened | Auto-label and respond to new issues |

## How It Works

### Interactive Create

Running without `--from` shows an interactive multi-select menu. You choose which checks and agents to install, and the selected template files are copied into your project's `.continue/checks/` and `.continue/agents/` directories.

### GitHub Import

Running with `--from owner/repo` fetches the `.continue/checks/` and `.continue/agents/` directories from the specified GitHub repository using the GitHub Contents API. It parses YAML frontmatter to show names and descriptions, lets you select which files to import, and writes them locally.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

Apache-2.0 — see [LICENSE](LICENSE) for details.

Copyright (c) 2025 Continue Dev, Inc.

---

<p align="center">Built by <a href="https://continue.dev">Continue</a></p>
