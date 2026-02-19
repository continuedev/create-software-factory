---
name: Template Quality
description: Ensures curated templates follow the correct frontmatter format, have meaningful instructions, and match the registry in create.js
---

Review this pull request for issues with the curated check and agent templates.

## What to Check

### 1. Frontmatter Format (Error)

Every template in `src/templates/checks/` and `src/templates/agents/` must have valid YAML frontmatter with at least `name` and `description` fields:

```markdown
---
name: Template Name
description: What this template does
---
```

Agent templates that trigger automatically must also have an `on:` field:

```markdown
---
name: Agent Name
description: What this agent does
on:
  github:
    issues:
      types: [labeled]
      labels: ["some-label"]
---
```

### 2. Registry Sync (Error)

The `CHECKS` and `AGENTS` arrays in `src/commands/create.js` must match the actual template files in `src/templates/`. Check for:

- Template files that exist but aren't listed in the array
- Array entries that reference files that don't exist
- Mismatched `name` or `description` between the array and the frontmatter

### 3. Template Content (Warning)

Templates should:

- Have clear, actionable instructions (not just a title and description)
- Include a "What to Check" or "Instructions" section
- Define severity levels for checks (Error, Warning, Info)
- Be generic enough to work across different project types

### 4. New Templates Need README Update (Warning)

If a template is added or removed, the README's "Included Templates" section should be updated to match.

## Severity

- **Error**: Invalid frontmatter, missing from registry, registry points to nonexistent file
- **Warning**: Thin template content, README out of sync with templates
- **Info**: Template could be more detailed or cover more edge cases
