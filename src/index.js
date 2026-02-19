#!/usr/bin/env node
import { Command } from 'commander';
import { createCommand } from './commands/create.js';
import { importCommand } from './commands/import.js';

// Support --from as a top-level shortcut: npx create-software-factory --from owner/repo
// We intercept before Commander parses to avoid option conflicts with the import subcommand.
const args = process.argv.slice(2);
const fromIndex = args.indexOf('--from');
if (fromIndex !== -1 && !args.includes('import')) {
  // Inject the import subcommand before --from
  process.argv.splice(2, 0, 'import');
}

const program = new Command();

program
  .name('create-software-factory')
  .description('Scaffold and import .continue/agents and .continue/checks from curated templates or any GitHub repo')
  .version('0.1.0');

// Register commands
createCommand(program);
importCommand(program);

program.parse(process.argv);
