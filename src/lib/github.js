import fetch from 'node-fetch';

const API_BASE = 'https://api.github.com';

/**
 * Fetch directory listing from GitHub Contents API.
 * Returns an array of { name, path, type, download_url } objects.
 */
export async function fetchDirectory(repo, dirPath, { token, branch } = {}) {
  const url = new URL(`${API_BASE}/repos/${repo}/contents/${dirPath}`);
  if (branch) {
    url.searchParams.set('ref', branch);
  }

  const headers = { Accept: 'application/vnd.github.v3+json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url.toString(), { headers });

  if (res.status === 404) {
    return [];
  }

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter((item) => item.type === 'file' && item.name.endsWith('.md'));
}

/**
 * Fetch the raw content of a file from GitHub.
 */
export async function fetchFileContent(repo, filePath, { token, branch } = {}) {
  const url = new URL(`${API_BASE}/repos/${repo}/contents/${filePath}`);
  if (branch) {
    url.searchParams.set('ref', branch);
  }

  const headers = { Accept: 'application/vnd.github.v3.raw' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url.toString(), { headers });

  if (!res.ok) {
    throw new Error(`GitHub API error fetching ${filePath}: ${res.status} ${res.statusText}`);
  }

  return res.text();
}
