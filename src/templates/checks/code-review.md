---
name: Code Review
description: Reviews code quality, naming conventions, and patterns
---

Review this pull request for code quality issues. Focus on maintainability, readability, and correctness.

## What to Check

### 1. Naming and Clarity

- Variable and function names should clearly describe their purpose
- Avoid abbreviations unless they are universally understood (e.g., `url`, `id`)
- Boolean variables should read as predicates (`isReady`, `hasPermission`, not `ready`, `flag`)

### 2. Code Organization

- Functions should do one thing and be reasonably short
- Related logic should be grouped together
- Avoid deeply nested conditionals — prefer early returns

### 3. Error Handling

- Functions that can fail should handle errors appropriately
- Don't silently swallow errors — log or propagate them
- Error messages should be actionable and include context

### 4. Duplication

- Look for copy-pasted code that could be extracted into a shared function
- Repeated patterns across files may indicate a missing abstraction

### 5. Edge Cases

- Check for off-by-one errors, null/undefined handling, and empty collections
- Verify that boundary conditions are tested or handled

### 6. Dependencies

- New dependencies should be justified — check if existing utilities already cover the need
- Avoid importing large packages for small utilities

## Severity

- **Error**: Logic bugs, unhandled errors that will crash, security issues
- **Warning**: Poor naming, code duplication, missing edge case handling
- **Info**: Style suggestions, minor readability improvements
