#!/usr/bin/env node

// Skip during CI or global installs
if (process.env.CI || process.env.npm_config_global) {
  process.exit(0);
}

const name = "create-software-factory";
const skill = "setup-software-factory";
const org = "continuedev/skills";

console.log();
console.log(`  ${name} installed.`);
console.log();
console.log(`  Get started with a coding agent:`);
console.log(`    npx skills add ${org} --skill ${skill}`);
console.log();
console.log(`  Then ask your agent: "Set up ${name} in this project."`);
console.log();
