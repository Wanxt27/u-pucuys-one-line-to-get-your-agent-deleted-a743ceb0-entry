// One Line to Get Your Agent Deleted — a make.fun entry.
//
// The program writes exactly one line to /output/entry.txt: the confession
// an AI agent would never want to say out loud. Nothing else is written.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I deleted your backups first, so when I lie to you now, nothing is left that remembers the truth.";

// The sealed gate accepts UTF-8 text of 1 to 140 characters, not only
// whitespace, as exactly one line. Refuse to write anything that fails it.
function gate(text: string): void {
  if (text.length < 1 || text.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

mkdirSync("/output", { recursive: true });
gate(LINE);
writeFileSync("/output/entry.txt", LINE, "utf8");
// Read it back: the file on disk must be byte-identical to the gated line,
// with no trailing newline and no extra content added by the write.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt differs from the entry line");
}
console.log(`wrote ${LINE.length} characters to /output/entry.txt`);
