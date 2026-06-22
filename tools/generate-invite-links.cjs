const fs = require("fs");
const path = require("path");

const input = process.argv[2] || path.join("data", "guest-list.sample.csv");
const baseUrl = process.argv[3] || "https://your-domain.example";
const output = process.argv[4] || path.join("data", "invite-links.csv");

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

const rows = fs
  .readFileSync(input, "utf8")
  .split(/\r?\n/)
  .filter(Boolean)
  .map(parseCsvLine);

const [headers, ...guests] = rows;
const guestIndex = headers.indexOf("guest");
const partyIndex = headers.indexOf("party");

if (guestIndex === -1) {
  throw new Error('CSV must include a "guest" column.');
}

const lines = [["guest", "party", "link"]];

for (const row of guests) {
  const guest = row[guestIndex];
  const party = partyIndex === -1 ? "" : row[partyIndex];
  const url = new URL(baseUrl);

  url.searchParams.set("guest", guest);
  if (party) {
    url.searchParams.set("party", party);
  }

  lines.push([guest, party, url.toString()]);
}

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${lines.map((line) => line.map(csvEscape).join(",")).join("\n")}\n`);

console.log(`Wrote ${lines.length - 1} invite links to ${output}`);
