---
name: Test Coverage
description: Ensures new code has appropriate test coverage
---

Review this pull request to verify that new or modified functionality has adequate test coverage.

## What to Check

### 1. New Features Have Tests

Any new feature, endpoint, or user-facing behavior should have at least one test verifying it works correctly. If the PR introduces a new function or module with no corresponding test file, flag it.

### 2. Bug Fixes Include Regression Tests

When a bug is fixed, there should be a test that would have caught the bug — ensuring it doesn't regress. The test should fail without the fix and pass with it.

### 3. Edge Cases Are Covered

Tests should cover not just the happy path but also:
- Empty inputs, null values, missing fields
- Boundary conditions (zero, one, max values)
- Error paths (invalid input, network failures, permission denied)

### 4. Tests Are Meaningful

- Tests should assert on behavior, not implementation details
- Avoid tests that just check a function was called without verifying the outcome
- Mock only what's necessary — prefer integration tests where practical

### 5. Test Quality

- Test names should describe what they verify (`should return 404 when user not found`)
- Tests should be independent and not rely on shared mutable state
- Setup and teardown should be clean

## What to Ignore

- Pure refactors that don't change behavior (existing tests provide coverage)
- Documentation-only changes
- Configuration file changes (unless they affect runtime behavior)
- Test files themselves (don't need tests for tests)

## Severity

- **Error**: New endpoint or critical business logic with zero test coverage
- **Warning**: New feature with only happy-path tests, missing edge cases
- **Info**: Opportunities to improve existing test quality
