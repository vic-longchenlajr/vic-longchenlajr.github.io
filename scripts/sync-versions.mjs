/**
 * sync-versions.mjs
 *
 * Fetches the current version from each external tool's package.json
 * via the GitHub API and patches lib/tools.ts before build.
 *
 * Requires: ORG_TOKEN env var (PAT with repo read access to the org).
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

async function fetchVersion(repo, packagePath, token) {
  const url = `https://api.github.com/repos/${ORG}/${repo}/contents/${packagePath}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) {
    console.warn(`  WARNING: ${repo}/${packagePath} — HTTP ${res.status}`);
    return null;
  }

  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return JSON.parse(content).version;
}

async function fetchLastCommitDate(repo, token) {
  const url = `https://api.github.com/repos/${ORG}/${repo}/commits?per_page=1`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) return null;

  const [commit] = await res.json();
  if (!commit) return null;

  return commit.commit.committer.date.slice(0, 10); // YYYY-MM-DD
}

async function main() {
  const token = process.env.ORG_TOKEN;
  if (!token) {
    console.error("ERROR: ORG_TOKEN environment variable is required.");
    process.exit(1);
  }

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

  writeFileSync(TOOLS_PATH, source, "utf-8");
  console.log(`\nDone — updated ${updated}/${TOOL_REPOS.length} tools.`);
}

main();
