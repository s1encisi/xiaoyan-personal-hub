import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const git = (args, options = {}) => execFileSync("git", ["-c", "core.quotePath=false", ...args], {
  maxBuffer: 128 * 1024 * 1024,
  ...options,
});
const refs = process.argv.slice(2);
if (refs.length === 0) {
  for (const line of readFileSync(0, "utf8").trim().split("\n")) {
    const sha = line.trim().split(/\s+/)[1];
    if (sha && !/^0+$/.test(sha)) refs.push(sha);
  }
}
if (refs.length === 0) process.exit(0);
const commits = [...new Set(refs.map((ref) => git(["rev-parse", "--verify", `${ref}^{commit}`]).toString().trim()))];
const denyPaths = [
  /^(?:university|postgraduate ?1)\//i,
  /^(?:local|work|output|outputs|data|datasets|raw-data|private|confidential|node_modules|dist)\//i,
  /^\.(?:impeccable|claude|codex|agents|agent|workbuddy-ai|next|vinext|wrangler|npm-cache|playwright-cli)\//i,
  /^app\/_data\/animation\/source-content\.json$/i,
  /(?:^|\/)(?:\.env(?:\..*)?|\.dev\.vars(?:\..*)?|\.npmrc|id_rsa|id_ed25519|credentials[^/]*\.json|secrets[^/]*\.json)$/i,
  /\.(?:xls[^.]*|xlt[^.]*|ods|csv|tsv|parquet|feather|pkl|pickle|npy|npz|mat|h5|hdf5|rds|db|sqlite3?|docx?|docm|pdf|pptx?|pptm|zip|7z|rar|tar|gz|bundle|pem|key|p12|pfx)$/i,
  /保密|机密|隐私|身份证|护照|合同/,
];
const objects = git(["rev-list", "--objects", ...commits]).toString().trim().split("\n").map((line) => {
  const space = line.indexOf(" ");
  return { sha: space < 0 ? line : line.slice(0, space), path: space < 0 ? "" : line.slice(space + 1) };
});
// Inspect every historical path, including deleted files and renamed blobs.
const historicalPaths = git(["log", "--format=", "--name-only", "--no-renames", ...commits]).toString().split("\n");
const forbiddenPaths = [...new Set(historicalPaths.filter((path) => denyPaths.some((rule) => rule.test(path))))];
const metadata = git(["cat-file", "--batch-check=%(objectname) %(objecttype) %(objectsize)"], {
  input: `${objects.map(({ sha }) => sha).join("\n")}\n`,
}).toString().trim().split("\n");
const textBlobs = objects.filter(({ path }, index) => {
  const [, type, size] = metadata[index].split(" ");
  return type === "blob" && Number(size) < 5_000_000 &&
    (/\.(?:tsx?|jsx?|mjs|cjs|json|md|css|txt|ya?ml|toml|sql|svg|sh|ps1)$/i.test(path) || /(?:^|\/)\.gitignore$/.test(path));
});
const rules = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH |DSA |ENCRYPTED )?PRIVATE KEY-----/],
  ["GitHub token", /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/],
  ["OpenAI key", /\bsk-(?:(?:proj|svcacct)-)?[A-Za-z0-9_-]{35,}\b/],
  ["AWS access key", /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],
  ["credential in URL", /https?:\/\/[^\s/:]+:[^\s/@]+@/],
];
const findings = [];
if (textBlobs.length) {
  const batch = git(["cat-file", "--batch"], { input: `${textBlobs.map(({ sha }) => sha).join("\n")}\n` });
  let cursor = 0;
  for (const blob of textBlobs) {
    const end = batch.indexOf(10, cursor);
    const size = Number(batch.subarray(cursor, end).toString().split(" ")[2]);
    const content = batch.subarray(end + 1, end + 1 + size).toString("utf8");
    cursor = end + size + 2;
    for (const [kind, rule] of rules) if (rule.test(content)) findings.push({ path: blob.path, kind });
  }
}
if (forbiddenPaths.length || findings.length) {
  console.error(JSON.stringify({ blocked: true, forbiddenPaths, credentialPatterns: findings }, null, 2));
  process.exit(1);
}
console.log(`GitHub upload check passed: ${commits.length} ref(s), ${textBlobs.length} text blobs, no blocked paths or credential patterns.`);
