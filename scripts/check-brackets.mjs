/**
 * check-brackets — quick sanity scan for unbalanced brackets in content part
 * files before assembly. Usage: node scripts/check-brackets.mjs [paths...]
 * Defaults to src/content/parts; accepts files or directories (recursively).
 * Skips strings, template literals and comments. Exits non-zero on any bad
 * file so CI fails loudly. Not part of npm chain — run manually.
 */
import fs from "node:fs";
import path from "node:path";

const PAIR = { "{": "}", "[": "]", "(": ")" };
const OPEN = new Set(["{", "[", "("]);

function collectFiles(inputs) {
  const out = [];
  for (const inp of inputs) {
    const st = fs.statSync(inp);
    if (st.isDirectory()) {
      out.push(...collectFiles(fs.readdirSync(inp).map((e) => path.join(inp, e))));
    } else if (inp.endsWith(".ts")) {
      out.push(inp);
    }
  }
  return [...new Set(out)];
}

function scan(text, file) {
  const stack = [];
  let i = 0;
  const n = text.length;
  while (i < n) {
    const ch = text[i];
    // line comments
    if (ch === "/" && text[i + 1] === "/") {
      while (i < n && text[i] !== "\n") i++;
      continue;
    }
    // block comments
    if (ch === "/" && text[i + 1] === "*") {
      i += 2;
      while (i < n && !(text[i] === "*" && text[i + 1] === "/")) i++;
      i += 2;
      continue;
    }
    // template literal with interpolation: treat ${ } as one unit and the
    // closing backtick normally — skip by counting back, we just skip the
    // whole literal and let the outer parser handle the rest via raw scan.
    if (ch === "`") {
      i++;
      while (i < n && text[i] !== "`") {
        if (text[i] === "\\") i += 2;
        else i++;
      }
      i++; // closing tick
      continue;
    }
    // normal strings
    if (ch === '"' || ch === "'") {
      const quote = ch;
      i++;
      while (i < n && text[i] !== quote) {
        if (text[i] === "\\") i += 2;
        else i++;
      }
      i++;
      continue;
    }
    if (OPEN.has(ch)) stack.push(ch);
    else if (ch === "}" || ch === "]" || ch === ")") {
      const top = stack.pop();
      if (!top || PAIR[top] !== ch) {
        console.log(`MISMATCH in ${file}: got ${ch} at col ${i}, expected ${top ? PAIR[top] : "nothing on stack"}`);
        return false;
      }
    }
    i++;
  }
  if (stack.length) {
    console.log(`UNCLOSED in ${file}: ${stack.join(" ")}`);
    return false;
  }
  return true;
}

const targets = process.argv.slice(2).length ? process.argv.slice(2) : ["src/content/parts"];
let bad = 0;
let good = 0;
for (const f of collectFiles(targets)) {
  if (scan(fs.readFileSync(f, "utf8"), f)) good++;
  else bad++;
}
console.log(`\ncheck-brackets: ${good} ok, ${bad} bad`);
process.exit(bad ? 1 : 0);
