import fs from 'node:fs';
import path from 'node:path';
import { confirm } from '@inquirer/prompts';
import chalk from 'chalk';

/**
 * Write content to a file path, creating directories as needed.
 * If the file already exists, prompt the user to overwrite.
 * Returns true if the file was written, false if skipped.
 */
export async function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(filePath)) {
    const overwrite = await confirm({
      message: `${filePath} already exists. Overwrite?`,
      default: false,
    });
    if (!overwrite) {
      console.log(chalk.yellow(`  ⊘ ${filePath} (skipped)`));
      return false;
    }
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(chalk.green(`  ✓ ${filePath}`));
  return true;
}
