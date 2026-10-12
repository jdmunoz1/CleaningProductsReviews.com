/**
 * QA entrypoint. Runs (in order):
 *  1. orphan/reference check across every content module
 *  2. internal link + asset check against the built .next output
 * Requires a successful `npm run build` first (checklinks reads .next/server/app).
 */
import { execSync } from "node:child_process";

for (const [label, cmd] of [
  ["check-orphans", "npx tsx scripts/check-orphans.mts"],
  ["check-links", "node scripts/checklinks.mjs"],
]) {
  console.log(`\n== ${label} ==`);
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch (e) {
    process.exitCode = 1;
    console.error(`qa step failed: ${label}`);
  }
}
