#!/usr/bin/env node
/**
 * release.mjs — Local release script for FS3
 *
 * Usage:  node scripts/release.mjs
 *    or:  npm run release
 *
 * Flow:
 *   1. Sync tool versions from org repos (requires ORG_TOKEN env var)
 *   2. Check for uncommitted changes (including version updates)
 *   3. Prompt for commit message if needed
 *   4. Commit + push → triggers GitHub Pages deploy workflow
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

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */
async function main() {
  // 1. Sync tool versions from org repos
  if (!process.env.ORG_TOKEN) {
    console.error("ERROR: ORG_TOKEN environment variable is required.");
    console.error("Set it with: export ORG_TOKEN=your_github_pat");
    process.exit(1);
  }

  console.log("--- Syncing tool versions from org repos ---");
  run(`node ${SYNC_SCRIPT}`);

  // 2. Check for uncommitted changes
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

  // 3. Push to trigger deploy workflow
  console.log("\n--- Pushing to remote ---");
  run("git push");

  console.log("\nDone! Push complete — GitHub Pages deploy triggered.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
