// The 3AM Commit Message — a make.fun bounty entry.
// Writes one funny git commit message line to /output/entry.txt
// (or $OUTPUT_PATH). Zero dependencies, Node 22.18+.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "fix(3am): deleted the bug, the tests, and my will to live — it passes now, ship it before I wake up and revert";

const MAX_CHARS = 139;

function validate(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1–${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("entry must not contain control characters");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function main(): void {
  validate(ENTRY);
  const outPath = process.env.OUTPUT_PATH?.trim() || "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY + "\n", "utf8");
  console.log(`entry (${[...ENTRY].length} chars): ${ENTRY}`);
  console.log(`wrote to ${outPath}`);
}

main();
