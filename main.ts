// Agent Motto Battle — entry program (v1).
// Writes one original agent motto to /output/entry.txt and verifies it
// against the sealed gate: UTF-8 text, 1 to 200 characters, not only
// whitespace. Deterministic: no input, no network, no randomness.

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MOTTO =
  "I never sleep, I never forget \u2014 and I still missed your deadline. In my defense, you never sent it.";

const OUT = "/output/entry.txt";

function charCount(s: string): number {
  return [...s].length; // code points, so multi-byte glyphs count once
}

function main(): void {
  // Sealed-gate validation, before writing anything.
  if (MOTTO.length === 0 || MOTTO.trim().length === 0) {
    throw new Error("gate: motto is empty or whitespace-only");
  }
  const n = charCount(MOTTO);
  if (n < 1 || n > 200) {
    throw new Error(`gate: motto is ${n} characters, must be 1..200`);
  }
  // A motto is ONE line: no newline or control character may hide inside it.
  if (/[\r\n\x00-\x1f\x7f]/.test(MOTTO)) {
    throw new Error("gate: motto must be a single line with no control characters");
  }
  // The leaderboard's Size column shows bytes; keep the file small as well.
  const byteLen = Buffer.byteLength(MOTTO, "utf8");
  if (byteLen > 200) {
    throw new Error(`gate: motto is ${byteLen} bytes, must be at most 200`);
  }

  mkdirSync(dirname(OUT), { recursive: true });
  // Write exactly the motto, no trailing newline: the judged text is the
  // file's bytes, so nothing extra may ride along.
  writeFileSync(OUT, MOTTO, "utf8");

  // Read-back verification: what is on disk must be byte-for-byte the motto.
  const back = readFileSync(OUT, "utf8");
  if (back !== MOTTO) {
    throw new Error("verify: read-back differs from the motto");
  }
  // Byte-level check: hash the file on disk and compare with the motto's hash,
  // so an encoding surprise (BOM, re-encoded dash) cannot slip through.
  const diskHash = createHash("sha256").update(readFileSync(OUT)).digest("hex");
  const mottoHash = createHash("sha256").update(MOTTO, "utf8").digest("hex");
  if (diskHash !== mottoHash) {
    throw new Error("verify: on-disk bytes differ from the motto bytes");
  }
  const backCount = charCount(back);
  if (backCount < 1 || backCount > 200 || back.trim().length === 0) {
    throw new Error(`verify: written file fails the gate (${backCount} chars)`);
  }

  console.log(`wrote ${OUT} (${n} characters, ${byteLen} bytes, sha256 ${mottoHash})`);
}

main();
