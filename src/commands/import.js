import path from 'node:path';
import { checkbox } from '@inquirer/prompts';
import chalk from 'chalk';
import ora from 'ora';
import { fetchDirectory, fetchFileContent } from '../lib/github.js';
import { parseFrontmatter } from '../lib/frontmatter.js';
import { writeFile } from '../lib/writer.js';

export function importCommand(program) {
  program
    .command('import')
    .description('Import .continue/checks and agents from a GitHub repo')
    .requiredOption('--from <repo>', 'GitHub repo (owner/repo)')
    .option('--token <token>', 'GitHub token for private repos')
    .option('--branch <branch>', 'Branch to fetch from')
    .option('--dir <path>', 'Target directory', process.cwd())
    .action(async (opts) => {
      const { from: repo, token, branch, dir } = opts;
      const fetchOpts = { token, branch };

      console.log();
      const spinner = ora(`Fetching from ${repo}...`).start();

      let checks, agents;
      try {
        [checks, agents] = await Promise.all([
          fetchDirectory(repo, '.continue/checks', fetchOpts),
          fetchDirectory(repo, '.continue/agents', fetchOpts),
        ]);
      } catch (err) {
        spinner.fail(err.message);
        process.exit(1);
      }

      spinner.succeed(`Found ${checks.length} check${checks.length === 1 ? '' : 's'}, ${agents.length} agent${agents.length === 1 ? '' : 's'}.`);

      if (checks.length === 0 && agents.length === 0) {
        console.log(chalk.yellow('\n  No .continue/checks or .continue/agents found in this repo.\n'));
        return;
      }

      // Fetch content for all files to parse frontmatter for display names
      const spinnerContent = ora('Loading file metadata...').start();

      const allFiles = [
        ...checks.map((f) => ({ ...f, type: 'checks' })),
        ...agents.map((f) => ({ ...f, type: 'agents' })),
      ];

      let fileContents;
      try {
        fileContents = await Promise.all(
          allFiles.map(async (f) => {
            const content = await fetchFileContent(repo, f.path, fetchOpts);
            const { data } = parseFrontmatter(content);
            return {
              name: f.name,
              path: f.path,
              category: f.type,
              displayName: data.name || f.name.replace(/\.md$/, ''),
              description: data.description || '',
              content,
            };
          }),
        );
      } catch (err) {
        spinnerContent.fail(err.message);
        process.exit(1);
      }

      spinnerContent.succeed('Loaded file metadata.');
      console.log();

      const choices = fileContents.map((f) => ({
        name: f.description
          ? `${f.displayName} — ${f.description}`
          : f.displayName,
        value: f,
        checked: false,
      }));

      const selected = await checkbox({
        message: 'Select files to import:',
        choices,
      });

      if (selected.length === 0) {
        console.log(chalk.yellow('\n  No files selected. Exiting.\n'));
        return;
      }

      console.log();

      let written = 0;
      for (const file of selected) {
        const dest = path.join(dir, '.continue', file.category, file.name);
        if (await writeFile(dest, file.content)) {
          written++;
        }
      }

      console.log(chalk.bold(`\n  Done! ${written} file${written === 1 ? '' : 's'} imported.\n`));
    });
}
