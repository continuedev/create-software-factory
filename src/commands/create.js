import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkbox } from '@inquirer/prompts';
import chalk from 'chalk';
import { parseFrontmatter } from '../lib/frontmatter.js';
import { writeFile } from '../lib/writer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

const CHECKS = [
  { file: 'code-review.md', name: 'Code Review', description: 'Reviews code quality and patterns' },
  { file: 'security.md', name: 'Security', description: 'Scans for OWASP vulnerabilities, hardcoded secrets' },
  { file: 'test-coverage.md', name: 'Test Coverage', description: 'Ensures new code has tests' },
  { file: 'pr-description.md', name: 'PR Description', description: 'Validates PR descriptions' },
];

const AGENTS = [
  { file: 'all-green.md', name: 'All Green', description: 'Fix checks, resolve conflicts, address reviews, merge' },
  { file: 'fix-issue.md', name: 'Fix Issue', description: 'Takes a GitHub issue and creates a fix PR' },
  { file: 'triage-issues.md', name: 'Triage Issues', description: 'Auto-label and respond to new issues' },
];

export function createCommand(program) {
  program
    .command('create', { isDefault: true })
    .description('Interactively scaffold .continue/checks and .continue/agents')
    .option('--dir <path>', 'Target directory', process.cwd())
    .action(async (opts) => {
      console.log();
      console.log(chalk.bold('  Continue Software Factory'));
      console.log();

      const categories = await checkbox({
        message: 'What would you like to set up?',
        choices: [
          { name: 'Checks (run automatically on PRs)', value: 'checks', checked: true },
          { name: 'Agents (triggered by events or on-demand)', value: 'agents', checked: true },
        ],
      });

      if (categories.length === 0) {
        console.log(chalk.yellow('\n  Nothing selected. Exiting.\n'));
        return;
      }

      let selectedChecks = [];
      let selectedAgents = [];

      if (categories.includes('checks')) {
        selectedChecks = await checkbox({
          message: 'Select checks:',
          choices: CHECKS.map((c) => ({
            name: `${c.name} — ${c.description}`,
            value: c.file,
            checked: false,
          })),
        });
      }

      if (categories.includes('agents')) {
        selectedAgents = await checkbox({
          message: 'Select agents:',
          choices: AGENTS.map((a) => ({
            name: `${a.name} — ${a.description}`,
            value: a.file,
            checked: false,
          })),
        });
      }

      const total = selectedChecks.length + selectedAgents.length;
      if (total === 0) {
        console.log(chalk.yellow('\n  No files selected. Exiting.\n'));
        return;
      }

      console.log();

      let written = 0;

      for (const file of selectedChecks) {
        const src = path.join(TEMPLATES_DIR, 'checks', file);
        const dest = path.join(opts.dir, '.continue', 'checks', file);
        const content = fs.readFileSync(src, 'utf-8');
        if (await writeFile(dest, content)) {
          written++;
        }
      }

      for (const file of selectedAgents) {
        const src = path.join(TEMPLATES_DIR, 'agents', file);
        const dest = path.join(opts.dir, '.continue', 'agents', file);
        const content = fs.readFileSync(src, 'utf-8');
        if (await writeFile(dest, content)) {
          written++;
        }
      }

      console.log(chalk.bold(`\n  Done! ${written} file${written === 1 ? '' : 's'} created.\n`));
    });
}
