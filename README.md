# create-software-factory

Scaffold and import `.continue/agents/` and `.continue/checks/` files from curated templates or any GitHub repo.

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

- **Code Review** — Reviews code quality, naming conventions, and patterns
- **Security** — Scans for OWASP vulnerabilities, hardcoded secrets, and auth issues
- **Test Coverage** — Ensures new code has appropriate test coverage
- **PR Description** — Validates that PR descriptions cover all meaningful changes

### Agents

Agents are triggered by events or invoked on-demand:

- **All Green** — Fix checks, resolve conflicts, address reviews, and merge the PR (triggered by `ai-merge` label)
- **Fix Issue** — Takes a GitHub issue and creates a fix PR (manual)
- **Triage Issues** — Auto-label and respond to new issues (triggered on issue open)

## How It Works

### Interactive Create

Running without `--from` shows an interactive multi-select menu. You choose which checks and agents to install, and the selected template files are copied into your project's `.continue/checks/` and `.continue/agents/` directories.

### GitHub Import

Running with `--from owner/repo` fetches the `.continue/checks/` and `.continue/agents/` directories from the specified GitHub repository using the GitHub Contents API. It parses YAML frontmatter to show names and descriptions, lets you select which files to import, and writes them locally.

## License

Apache-2.0
