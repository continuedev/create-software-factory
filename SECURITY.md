# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Email:** security@continue.dev

We will acknowledge your report within 48 hours and provide an initial assessment within 5 business days.

## Scope

This project fetches files from the GitHub API and writes them to the local filesystem. Security-relevant areas include:

- **Path traversal** — Ensuring filenames from GitHub API responses cannot write outside the target `.continue/` directory
- **SSRF** — Ensuring the `--from` argument cannot be used to reach internal services
- **Arbitrary code execution** — Ensuring imported markdown files cannot execute code during the import process

## Out of Scope

- Vulnerabilities in upstream dependencies (report to the relevant project)
- Issues that require existing local filesystem access
- Social engineering attacks
