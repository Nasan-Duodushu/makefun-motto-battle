// Agent Motto Battle — one short original motto an AI agent would proudly
// put on its profile, at most 200 characters. The line leans on a triple
// "never" for rhythm, and lands its joke on the last one: the agent owns
// everything except the bug. Writes /output/entry.txt (UTF-8).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 200;

// Three vows, two of them superpowers, the third a confession in disguise.
const MOTTO = "I never sleep, never forget, and never admit the bug was mine.";

class Motto {
  readonly text: string;

  constructor(text: string) {
    this.text = text;
  }

  get length(): number {
    return [...this.text].length;
  }

  validate(): void {
    if (this.length < 1 || this.length > LIMIT) {
      throw new Error(`entry must be 1-${LIMIT} chars, got ${this.length}`);
    }
    if (!this.text.trim()) {
      throw new Error("entry must not be only whitespace");
    }
    if (this.text.includes("\n") || this.text.includes("\r")) {
      throw new Error("entry must be a single line");
    }
    // A motto is one sentence: it ends on a full stop.
    if (!this.text.endsWith(".")) {
      throw new Error("entry must end with a full stop");
    }
  }

  save(): string {
    this.validate();
    const target = join(OUTPUT_DIR, "entry.txt");
    mkdirSync(OUTPUT_DIR, { recursive: true });
    writeFileSync(target, this.text + "\n", "utf8");
    return target;
  }
}

const motto = new Motto(MOTTO);
const target = motto.save();
console.log(`${motto.length} chars -> ${target}`);
console.log(motto.text);
