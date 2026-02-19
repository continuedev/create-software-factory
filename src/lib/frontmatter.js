import YAML from 'yaml';

/**
 * Parse YAML frontmatter from a markdown string.
 * Returns { data, content } where data is the parsed frontmatter object
 * and content is the markdown body after the closing ---.
 */
export function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: text };
  }
  const data = YAML.parse(match[1]) || {};
  const content = match[2];
  return { data, content };
}
