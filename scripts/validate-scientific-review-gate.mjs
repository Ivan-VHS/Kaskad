import { readFileSync, existsSync } from "node:fs";

const fail = (message) => failures.push(message);
const failures = [];
const readJson = (path) => {
  try { return JSON.parse(readFileSync(path, "utf8")); }
  catch (error) { fail(`Cannot read ${path}: ${error.message}`); return null; }
};
const readText = (path) => {
  try { return readFileSync(path, "utf8"); }
  catch (error) { fail(`Cannot read ${path}: ${error.message}`); return ""; }
};

const registryPath = "docs/SCIENTIFIC_REVIEW_GATE.v1.json";
const markdownPath = "docs/SCIENTIFIC_REVIEW_GATE.md";
const schemaPath = "schemas/scientific-review-gate.v1.schema.json";
const registry = readJson(registryPath);
const schema = readJson(schemaPath);
const markdown = readText(markdownPath);
const allowedStatuses = new Set([
  "covered_by_repository_artifact",
  "partially_covered",
  "not_verified",
  "external_action_pending",
  "not_applicable"
]);
const stageFor = (n) => n <= 10 ? "I"
  : n <= 20 ? "II"
  : n <= 30 ? "III"
  : n <= 38 ? "IV"
  : n <= 46 ? "V"
  : n <= 52 ? "VI" : "VII";
const satisfies = (items) => items.every((item) =>
  item.status === "covered_by_repository_artifact" || item.status === "not_applicable"
);

if (!registry || !schema) {
  process.exitCode = 1;
} else {
  if (schema.$schema !== "https://json-schema.org/draft/2020-12/schema") {
    fail("Schema must declare JSON Schema draft 2020-12");
  }
  if (schema.properties?.schema_version?.const !== registry.schema_version) {
    fail("Registry/schema version mismatch");
  }
  if (registry.project !== "Kaskad" || registry.schema_version !== "1.0.0") {
    fail("Unexpected project or scientific review gate version");
  }
  if (!/^[0-9a-f]{40}$/.test(registry.audit?.revision ?? "")) {
    fail("Audit snapshot must name a full 40-character Git revision");
  }
  if (registry.audit?.date !== "2026-11-28") {
    fail("Audit date does not match this initial snapshot");
  }
  if (!Array.isArray(registry.criteria) || registry.criteria.length !== 60) {
    fail("Scientific review register must contain exactly 60 criteria");
  }
  if (!Array.isArray(registry.status_vocabulary) || registry.status_vocabulary.length !== 5) {
    fail("Status vocabulary must define all five supported states");
  }

  const ids = new Set();
  const numbers = new Set();
  for (const item of registry.criteria ?? []) {
    const expectedId = `KASKAD-SR-${String(item.number).padStart(3, "0")}`;
    if (item.id !== expectedId) fail(`Invalid criterion ID for number ${item.number}`);
    if (ids.has(item.id)) fail(`Duplicate criterion ID: ${item.id}`);
    if (numbers.has(item.number)) fail(`Duplicate criterion number: ${item.number}`);
    ids.add(item.id);
    numbers.add(item.number);
    if (item.section !== stageFor(item.number)) {
      fail(`${item.id}: criterion is assigned to the wrong stage`);
    }
    if (!allowedStatuses.has(item.status)) {
      fail(`${item.id}: unsupported status ${item.status}`);
    }
    if (!Array.isArray(item.evidence)) {
      fail(`${item.id}: evidence must be an array`);
    } else {
      for (const evidence of item.evidence) {
        if (typeof evidence.path !== "string" || evidence.path.startsWith("/") || evidence.path.includes("..")) {
          fail(`${item.id}: unsafe evidence path`);
          continue;
        }
        if (!existsSync(evidence.path)) fail(`${item.id}: evidence file does not exist: ${evidence.path}`);
      }
    }
    if (item.status === "covered_by_repository_artifact" && (item.evidence?.length ?? 0) === 0) {
      fail(`${item.id}: covered status requires at least one evidence artifact`);
    }
    if (item.status === "not_applicable" && !/not applicable|не применим/i.test(item.assessment ?? "")) {
      fail(`${item.id}: not_applicable requires an explicit reason`);
    }
    if (!markdown.includes(item.id)) fail(`Markdown audit is missing ${item.id}`);
  }

  for (let n = 1; n <= 60; n++) {
    if (!numbers.has(n)) fail(`Missing criterion number ${n}`);
  }

  const core = (registry.criteria ?? []).filter((x) => x.number >= 1 && x.number <= 20);
  const novelty = (registry.criteria ?? []).filter((x) => x.number >= 39 && x.number <= 46);
  const publication = (registry.criteria ?? []).filter((x) => x.number >= 53 && x.number <= 58);
  const coreReady = satisfies(core);
  const noveltyReady = satisfies(novelty);
  const publicationReady = satisfies(publication);

  if (registry.gate_policy?.stage_1_20?.ready !== coreReady) {
    fail("stage_1_20.ready is inconsistent with criterion statuses");
  }
  if (registry.gate_policy?.stage_39_46?.ready !== noveltyReady) {
    fail("stage_39_46.ready is inconsistent with criterion statuses");
  }
  if (registry.gate_policy?.stage_53_58?.ready !== publicationReady) {
    fail("stage_53_58.ready is inconsistent with criterion statuses");
  }

  if (failures.length === 0) {
    const counts = Object.fromEntries([...allowedStatuses].map((status) => [
      status, registry.criteria.filter((x) => x.status === status).length
    ]));
    process.stdout.write(
      "Scientific review register integrity: PASS (60 criteria, unique IDs, evidence paths and gate calculations valid).\n" +
      "Scientific readiness: core 1-20 " + (coreReady ? "READY" : "NOT READY") +
      "; novelty 39-46 " + (noveltyReady ? "READY" : "NOT READY") +
      "; external reception 53-58 " + (publicationReady ? "READY" : "PENDING") + ".\n" +
      "Status counts: " + JSON.stringify(counts) + ".\n" +
      "This CI check validates registry integrity only; it does not certify proofs, novelty or external review.\n"
    );
  }
}

if (failures.length > 0) {
  for (const message of failures) process.stderr.write("FAIL: " + message + "\n");
  process.exitCode = 1;
}
