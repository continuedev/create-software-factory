---
name: PR Description
description: Validates that PR descriptions cover all meaningful changes
---

Review this pull request's description to verify it adequately explains what changed and why.

## What to Check

### 1. Summary Present

The PR should have a summary section that explains:
- What was changed
- Why the change was made (motivation, user problem, or bug being fixed)
- Any important context a reviewer needs

A PR with no description or just a title is insufficient for non-trivial changes.

### 2. Changes Are Documented

All meaningful changes should be mentioned. If the diff shows changes to multiple areas (e.g., API + UI + database), the description should cover each area. Look for changes in the diff that aren't mentioned in the description.

### 3. Breaking Changes Called Out

If the PR introduces breaking changes (API changes, removed features, schema migrations, configuration changes), these must be explicitly called out in the description.

### 4. Testing Instructions

For user-facing changes, the description should explain how to test the change — or at minimum, what was tested. This helps reviewers verify the change works.

## What to Ignore

- Trivial changes (typo fixes, dependency bumps, formatting) don't need detailed descriptions
- Draft PRs may have incomplete descriptions
- PRs from automated tools (bots, CI) follow their own format

## Severity

- **Warning**: Non-trivial PR with no description, significant changes not mentioned, breaking changes not called out
- **Info**: Missing testing instructions, description could be more detailed
