const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const input = process.argv[2] || path.join("data", "guest-list.sample.csv");
const baseUrl = process.argv[3] || "https://your-domain.example";
const output = process.argv[4] || path.join("data", "invite-links.csv");
const mapOutput = process.argv[5] || path.join("data", "invite-map.json");

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

function readExistingInviteMap(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return {};
  }
}

function createToken(existingTokens) {
  let token = "";

  do {
    token = crypto.randomBytes(7).toString("base64url");
  } while (existingTokens.has(token));

  existingTokens.add(token);
  return token;
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

const existingInviteMap = readExistingInviteMap(mapOutput);
const existingByGuest = new Map(
  Object.entries(existingInviteMap).map(([token, invite]) => [`${invite.guest}\u0000${invite.party || ""}`, token])
);
const usedTokens = new Set(Object.keys(existingInviteMap));
const inviteMap = {};
const lines = [["guest", "party", "invite", "link"]];

for (const row of guests) {
  const guest = row[guestIndex];
  const party = partyIndex === -1 ? "" : row[partyIndex];
  const guestKey = `${guest}\u0000${party || ""}`;
  const invite = existingByGuest.get(guestKey) || createToken(usedTokens);
  const url = new URL(baseUrl);

  url.searchParams.set("invite", invite);
  inviteMap[invite] = { guest, party };

  lines.push([guest, party, invite, url.toString()]);
}

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${lines.map((line) => line.map(csvEscape).join(",")).join("\n")}\n`);
fs.mkdirSync(path.dirname(mapOutput), { recursive: true });
fs.writeFileSync(mapOutput, `${JSON.stringify(inviteMap, null, 2)}\n`);

console.log(`Wrote ${lines.length - 1} invite links to ${output}`);
console.log(`Wrote invite token map to ${mapOutput}`);
