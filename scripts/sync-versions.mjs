/**
 * sync-versions.mjs
 *
 * Fetches the current version from each external tool's package.json
 * via the GitHub API and patches lib/tools.ts before build.
 *
 * Requires: ORG_TOKEN env var (PAT with repo read access to the org).
 *
 * Fails LOUDLY: an invalid/expired token, a rate limit, or a release where no
 * tools could be updated aborts the process (non-zero exit) so release.mjs
 * stops before committing/pushing stale versions.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOOLS_PATH = resolve(__dirname, "../lib/tools.ts");

const ORG = "Victaulic-Engineering-Tech-Solutions";

const TOOL_REPOS = [
  {
    toolName: "Vortex Project Builder",
    repo: "vortex-project-builder",
    packagePath: "package.json",
  },
  {
    toolName: "VicFlex Bracket Filter",
    repo: "vicflex-bracket-filter",
    packagePath: "package.json",
  },
  {
    toolName: "LP Resource Dashboard",
    repo: "resource-dashboard",
    packagePath: "resource-dashboard/package.json",
  },
  {
    toolName: "VicForge",
    repo: "vicforge",
    packagePath: "vicforge/package.json",
  },
  {
    toolName: "Product Request Pipeline",
    repo: "product-request-pipeline",
    packagePath: "package.json",
  },
  {
    toolName: "SprayTrace",
    repo: "spray-trace",
    packagePath: "package.json",
  },
];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "fs3-release-sync",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function abort(lines) {
  console.error("");
  for (const line of lines) console.error(line);
  console.error("\nRelease aborted — no changes were committed.\n");
  process.exit(1);
}

/**
 * GET wrapper that treats auth failures as fatal. A 401 (bad/expired token),
 * a rate-limit 403, or an SSO/forbidden 403 aborts the whole release with an
 * actionable message. Other statuses (e.g. 404) are returned for the caller
 * to handle per-repo.
 */
async function ghGet(url, token) {
  let res;
  try {
    res = await fetch(url, { headers: headers(token) });
  } catch (err) {
    abort([
      `ERROR: network request failed for ${url}`,
      `  ${err.message}`,
    ]);
  }

  if (res.status === 401) {
    const body = await res.json().catch(() => ({}));
    const exp = res.headers.get("github-authentication-token-expiration");
    abort([
      `ERROR: GitHub returned 401 — ${body.message || res.statusText}`,
      "  ORG_TOKEN is invalid, expired, or revoked.",
      ...(exp ? [`  Token expiration reported: ${exp}`] : []),
      "  Fix: generate a new fine-grained PAT (Repository → Contents: Read-only)",
      "  for the org repos, reset ORG_TOKEN, then re-run `npm run release`.",
    ]);
  }

  if (res.status === 403) {
    const body = await res.json().catch(() => ({}));
    const remaining = res.headers.get("x-ratelimit-remaining");
    if (remaining === "0") {
      const reset = res.headers.get("x-ratelimit-reset");
      const when = reset
        ? new Date(Number(reset) * 1000).toLocaleString()
        : "shortly";
      abort([
        `ERROR: GitHub API rate limit exceeded. Resets ~${when}.`,
      ]);
    }
    abort([
      `ERROR: GitHub returned 403 — ${body.message || res.statusText}`,
      "  Access forbidden. If the org enforces SAML/SSO, authorize ORG_TOKEN",
      "  for the organization, and confirm it has Contents: Read access.",
    ]);
  }

  return res;
}

async function fetchVersion(repo, packagePath, token) {
  const url = `https://api.github.com/repos/${ORG}/${repo}/contents/${packagePath}`;
  const res = await ghGet(url, token);

  if (!res.ok) {
    console.warn(`  WARNING: ${repo}/${packagePath} — HTTP ${res.status} (skipped)`);
    return null;
  }

  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return JSON.parse(content).version;
}

async function fetchLastCommitDate(repo, token) {
  const url = `https://api.github.com/repos/${ORG}/${repo}/commits?per_page=1`;
  const res = await ghGet(url, token);

  if (!res.ok) return null;

  const [commit] = await res.json();
  if (!commit) return null;

  return commit.commit.committer.date.slice(0, 10); // YYYY-MM-DD
}

async function main() {
  const token = process.env.ORG_TOKEN;
  if (!token) {
    abort([
      "ERROR: ORG_TOKEN environment variable is required.",
      "  Set it with a fine-grained PAT (Contents: Read-only on the org repos).",
    ]);
  }

  // Preflight: verify the token authenticates before touching any repo, so an
  // expired/revoked token fails here loudly instead of silently skipping syncs.
  // /rate_limit needs no scopes — a 401 here means the credential itself is bad.
  console.log("Verifying ORG_TOKEN...");
  await ghGet("https://api.github.com/rate_limit", token);
  console.log("Token OK.\n");

  console.log("Syncing tool versions from org repos...\n");

  let source = readFileSync(TOOLS_PATH, "utf-8");
  let updated = 0;

  for (const { toolName, repo, packagePath } of TOOL_REPOS) {
    const [version, lastCommit] = await Promise.all([
      fetchVersion(repo, packagePath, token),
      fetchLastCommitDate(repo, token),
    ]);

    if (!version) continue;

    const versionStr = `v${version}`;

    // Replace version: "v..." for the matching tool name
    const versionPattern = new RegExp(
      `(name:\\s*"${escapeRegex(toolName)}"[\\s\\S]*?version:\\s*")v[^"]*(")`
    );

    if (versionPattern.test(source)) {
      source = source.replace(versionPattern, `$1${versionStr}$2`);
      updated++;

      // Also update updatedAt if we got a commit date
      if (lastCommit) {
        const datePattern = new RegExp(
          `(name:\\s*"${escapeRegex(toolName)}"[\\s\\S]*?updatedAt:\\s*")\\d{4}-\\d{2}-\\d{2}(")`
        );
        source = source.replace(datePattern, `$1${lastCommit}$2`);
      }

      console.log(`  ${toolName}: ${versionStr} (${lastCommit || "no date"})`);
    } else {
      console.warn(`  WARNING: No entry for "${toolName}" in tools.ts`);
    }
  }

  // A valid token that updates nothing means the repo names or tools.ts entries
  // are out of sync — don't push an empty/no-op release silently.
  if (updated === 0) {
    abort([
      `ERROR: 0/${TOOL_REPOS.length} tools updated despite a valid token.`,
      "  Check the repo names in TOOL_REPOS, the tool names in lib/tools.ts,",
      "  and that ORG_TOKEN has Contents: Read access to those repos.",
    ]);
  }

  writeFileSync(TOOLS_PATH, source, "utf-8");

  if (updated < TOOL_REPOS.length) {
    console.warn(
      `\nWARNING: only ${updated}/${TOOL_REPOS.length} tools updated — see warnings above.`
    );
  }

  console.log(`\nDone — updated ${updated}/${TOOL_REPOS.length} tools.`);
}

main();
