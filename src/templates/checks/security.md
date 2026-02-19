---
name: Security
description: Scans for OWASP vulnerabilities, hardcoded secrets, and auth issues
---

Review this pull request for security vulnerabilities. Apply OWASP Top 10 principles and look for common security anti-patterns.

## What to Check

### 1. Hardcoded Secrets

Never commit secrets, API keys, tokens, passwords, or connection strings directly in source code. All sensitive values must come from environment variables or a secrets manager.

Look for patterns like:
- String literals that look like API keys or tokens
- Base64-encoded strings that might be credentials
- Connection strings with embedded passwords
- Private keys or certificates in source files

### 2. Injection Vulnerabilities

- **SQL Injection**: Ensure all database queries use parameterized queries, not string interpolation
- **Command Injection**: User input must never be passed directly to shell commands
- **XSS**: User-supplied content rendered in HTML must be properly escaped
- **Path Traversal**: File paths derived from user input must be validated and sanitized

### 3. Authentication and Authorization

- New endpoints must have authentication middleware
- Actions on resources must verify the user has permission (not just that they're logged in)
- Sensitive operations should require re-authentication or elevated permissions

### 4. Data Exposure

- API responses should not leak internal implementation details
- Error messages should be generic for end users, detailed only in logs
- Stack traces and debug information must not be exposed in production
- PII and sensitive data should not be logged

### 5. Cryptography

- Don't implement custom cryptographic algorithms
- Use established libraries for hashing, encryption, and signing
- Passwords must be hashed with bcrypt, scrypt, or argon2 — never MD5 or SHA alone
- Use constant-time comparison for secrets and tokens

### 6. Dependencies

- New dependencies should be from reputable sources with active maintenance
- Check for known vulnerabilities in added packages
- Avoid dependencies that request excessive permissions

## Severity

- **Error**: Hardcoded secrets, SQL injection, missing auth, plaintext password storage
- **Warning**: Verbose error messages, missing input validation, weak crypto
- **Info**: Dependency concerns, overly broad permissions
