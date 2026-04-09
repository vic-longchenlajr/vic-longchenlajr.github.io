#!/usr/bin/env node
/**
 * release.mjs — Local release script for FS3
 *
 * Usage:  node scripts/release.mjs
 *    or:  npm run release
 *
 * Flow:
 *   1. Validate version — compare package.json against CHANGELOG.md
 *   2. Sync tool versions from org repos (requires ORG_TOKEN env var)
 *   3. Check for uncommitted changes (including version updates)
 *   4. Prompt for commit message if needed
 *   5. Commit + push → triggers GitHub Pages deploy workflow
 */

import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ------------------------------------------------------------------ */
/*  Paths                                                              */
/* ------------------------------------------------------------------ */
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SYNC_SCRIPT = path.join(__dirname, "sync-versions.mjs");
const PKG_PATH = path.join(PROJECT_ROOT, "package.json");
const CHANGELOG_PATH = path.join(PROJECT_ROOT, "CHANGELOG.md");

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function run(cmd, cwd = PROJECT_ROOT) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function hasUncommittedChanges(cwd = PROJECT_ROOT) {
  const status = execSync("git status --porcelain", {
    cwd,
    encoding: "utf-8",
  }).trim();
  return status.length > 0;
}

function readPkg() {
  return JSON.parse(fs.readFileSync(PKG_PATH, "utf-8"));
}

function writePkg(pkg) {
  fs.writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Parse the latest version entry from CHANGELOG.md.
 * Expects format: ## v{version} — {YYYY-MM-DD}
 * Returns { version, date } or null if no entry found.
 */
function parseChangelog() {
  if (!fs.existsSync(CHANGELOG_PATH)) return null;

  const content = fs.readFileSync(CHANGELOG_PATH, "utf-8");
  const match = content.match(/^## v(\d+\.\d+\.\d+)\s*[—–-]\s*(\d{4}-\d{2}-\d{2})/m);
  if (!match) return null;

  return { version: match[1], date: match[2] };
}

/**
 * Compare two semver strings.
 * Returns -1 if a < b, 0 if equal, 1 if a > b.
 */
function compareSemver(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if (pa[i] < pb[i]) return -1;
    if (pa[i] > pb[i]) return 1;
  }
  return 0;
}

/**
 * Scaffold a new changelog entry header at the top of the changelog.
 */
function scaffoldChangelogEntry(version, date) {
  const content = fs.readFileSync(CHANGELOG_PATH, "utf-8");
  const header = `## v${version} — ${date}\n\n### Changes\n- \n`;

  // Insert after the first line (# Changelog) and any description lines
  const insertPoint = content.match(/^# Changelog.*\n(?:.*\n)?\n/m);
  if (insertPoint) {
    const idx = insertPoint.index + insertPoint[0].length;
    const updated = content.slice(0, idx) + header + "\n" + content.slice(idx);
    fs.writeFileSync(CHANGELOG_PATH, updated, "utf-8");
  } else {
    // Fallback: prepend after first line
    const lines = content.split("\n");
    lines.splice(2, 0, "", header);
    fs.writeFileSync(CHANGELOG_PATH, lines.join("\n"), "utf-8");
  }
}

/* ------------------------------------------------------------------ */
/*  Version validation                                                 */
/* ------------------------------------------------------------------ */
async function validateVersion() {
  const pkg = readPkg();
  const pkgVersion = pkg.version;
  const changelog = parseChangelog();

  console.log("--- Version check ---");
  console.log(`  package.json:  v${pkgVersion}`);

  if (!changelog) {
    console.log("  CHANGELOG.md:  (no version entry found)");
    console.log("\n  No changelog entry detected. Proceeding with release.\n");
    return;
  }

  console.log(`  CHANGELOG.md:  v${changelog.version} (${changelog.date})`);

  const cmp = compareSemver(pkgVersion, changelog.version);

  // ── package.json is BEHIND changelog ──
  if (cmp < 0) {
    console.log(`\n  package.json is behind — updating to v${changelog.version}`);
    pkg.version = changelog.version;
    writePkg(pkg);
    console.log(`  Updated package.json to v${changelog.version}\n`);
    return;
  }

  // ── package.json is AHEAD of changelog ──
  if (cmp > 0) {
    console.log(`\n  package.json (v${pkgVersion}) is ahead of CHANGELOG (v${changelog.version}).`);
    console.log("  Update CHANGELOG.md with an entry for this version before releasing.\n");

    const scaffold = await ask("  Scaffold a changelog entry for v" + pkgVersion + "? (y/N): ");
    if (scaffold.toLowerCase() === "y") {
      scaffoldChangelogEntry(pkgVersion, today());
      console.log(`\n  Scaffolded entry for v${pkgVersion} in CHANGELOG.md.`);
      console.log("  Fill in the changes, then run npm run release again.\n");
    } else {
      console.log("  Update the changelog manually, then run npm run release again.\n");
    }
    process.exit(0);
  }

  // ── Versions match — compare dates ──
  if (changelog.date === today()) {
    console.log("\n  Versions match and changelog is dated today. Proceeding.\n");
    return;
  }

  // Same version but dated in the past
  console.log(`\n  v${pkgVersion} was released on ${changelog.date}.`);
  console.log("  You need a new version for today's changes.\n");

  const newVersion = await ask("  Enter new version number (X.Y.Z): ");
  if (!newVersion || !/^\d+\.\d+\.\d+$/.test(newVersion)) {
    console.error("  Invalid or empty version. Aborting.");
    process.exit(1);
  }

  if (compareSemver(newVersion, pkgVersion) <= 0) {
    console.error(`  New version must be greater than v${pkgVersion}. Aborting.`);
    process.exit(1);
  }

  // Update package.json
  pkg.version = newVersion;
  writePkg(pkg);
  console.log(`  Updated package.json to v${newVersion}`);

  // Scaffold changelog entry
  scaffoldChangelogEntry(newVersion, today());
  console.log(`  Scaffolded entry for v${newVersion} in CHANGELOG.md.`);
  console.log("\n  Fill in the changes, then run npm run release again.\n");
  process.exit(0);
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */
async function main() {
  // 1. Validate version against changelog
  await validateVersion();

  // 2. Sync tool versions from org repos
  if (!process.env.ORG_TOKEN) {
    console.error("ERROR: ORG_TOKEN environment variable is required.");
    console.error("Set it with: export ORG_TOKEN=your_github_pat");
    process.exit(1);
  }

  console.log("--- Syncing tool versions from org repos ---");
  run(`node ${SYNC_SCRIPT}`);

  // 3. Check for uncommitted changes
  if (hasUncommittedChanges()) {
    console.log("\nUncommitted changes detected:\n");
    run("git status --short");

    const msg = await ask("\nEnter a commit message (or press Enter for default): ");
    const commitMsg = msg || "sync tool versions and release";

    run("git add -A");
    run(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`);
    console.log("Changes committed.");
  } else {
    console.log("\nNo changes — tool versions already up to date.");
  }

  // 4. Push to trigger deploy workflow
  console.log("\n--- Pushing to remote ---");
  run("git push");

  console.log("\nDone! Push complete — GitHub Pages deploy triggered.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
