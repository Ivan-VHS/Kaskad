import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const failures = [];
const fail = (message) => failures.push(message);
const check = (condition, message) => { if (!condition) fail(message); };

function readJson(path) {
  try { return JSON.parse(readFileSync(resolve(root, path), "utf8")); }
  catch (error) { fail("Cannot read " + path + ": " + error.message); return null; }
}

const registryPath = "docs/OMEGA_CLAIM_REGISTRY.v1.json";
const schemaPath = "schemas/omega-claim-registry.v1.schema.json";
const frameworkPath = "docs/VYUNENKO_OMEGA_FORMAL_SYSTEM.md";
const registry = readJson(registryPath);
const schema = readJson(schemaPath);

check(existsSync(resolve(root, frameworkPath)), "Missing framework document: " + frameworkPath);
check(registry?.extension === "K3-Omega", "Registry extension must be K3-Omega");
check(registry?.compatibility?.preserves_k3_radix === 1000, "K3 radix compatibility must remain 1000");
check(registry?.compatibility?.preserves_k3_separator === "k", "K3 separator compatibility must remain k");
check(schema?.$schema === "https://json-schema.org/draft/2020-12/schema", "Expected JSON Schema draft 2020-12");

const allowedStatuses = new Set(registry?.status_vocabulary ?? []);
const claims = Array.isArray(registry?.claims) ? registry.claims : [];
const byId = new Map();

for (const claim of claims) {
  if (!/^OMG-(DEF|AX|OP|THM|HYP|Q)-\d{3}$/.test(claim.id ?? "")) {
    fail("Invalid claim ID: " + String(claim.id));
  }
  if (byId.has(claim.id)) fail("Duplicate claim ID: " + claim.id);
  byId.set(claim.id, claim);
  check(allowedStatuses.has(claim.status), "Unknown status on " + claim.id);
  check(typeof claim.statement === "string" && claim.statement.trim().length >= 12, "Missing statement on " + claim.id);
  check(typeof claim.source === "string" && claim.source.length > 0, "Missing source on " + claim.id);
  check(claim.scope && typeof claim.scope.domain === "string" && claim.scope.domain.length > 0, "Missing scope on " + claim.id);
  if (claim.kind === "theorem") {
    check(typeof claim.proof_reference === "string" && claim.proof_reference.length > 0, "Theorem has no proof reference: " + claim.id);
  }
  const sourcePath = String(claim.source).split("#")[0];
  check(existsSync(resolve(root, sourcePath)), "Missing source file for " + claim.id + ": " + sourcePath);
}

for (const claim of claims) {
  for (const dependency of claim.dependencies ?? []) {
    check(byId.has(dependency), "Unknown dependency " + dependency + " on " + claim.id);
  }
}

const visiting = new Set();
const visited = new Set();
function visit(id, chain = []) {
  if (visiting.has(id)) {
    fail("Dependency cycle: " + [...chain, id].join(" -> "));
    return;
  }
  if (visited.has(id)) return;
  visiting.add(id);
  const claim = byId.get(id);
  for (const dependency of claim?.dependencies ?? []) visit(dependency, [...chain, id]);
  visiting.delete(id);
  visited.add(id);
}
for (const id of byId.keys()) visit(id);

if (failures.length) {
  for (const failure of failures) console.error("FAIL:", failure);
  process.exitCode = 1;
} else {
  console.log("K3-Omega registry valid:", claims.length, "claims;", visited.size, "dependency nodes; no cycles.");
}
