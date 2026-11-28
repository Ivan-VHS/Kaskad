import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";

const failures = [];
const fail = (message) => failures.push(message);
const check = (condition, message) => { if (!condition) fail(message); };

function readText(path) {
  if (!existsSync(path)) {
    fail("Missing file: " + path);
    return "";
  }
  return readFileSync(path, "utf8");
}

function readJson(path) {
  try {
    return JSON.parse(readText(path));
  } catch (error) {
    fail("Invalid JSON in " + path + ": " + error.message);
    return null;
  }
}

const requiredFiles = [
  "README.md",
  "docs/VYUNENKO_THEORY.md",
  "docs/K3_CANONICAL_SYNTAX.md",
  "docs/K3_STRUCTURAL_SEMANTICS_AND_ORDERED_SUMS.md",
  "docs/CHAPTER_II_CASCADE_BALANCE.md",
  "docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md",
  "docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md",
  "docs/K3_COMPOSITE_RADIX_ARITHMETIC.md",
  "docs/K3_ORIGINAL_CASCADE_FORMULAS.md",
  "docs/K3_MATHEMATICAL_FOUNDATIONS_AND_4685_INSTANCES.md",
  "docs/K3_STRATIFIED_MATHEMATICS.md",
  "docs/K3_BIPRIME_GEOMETRY_AND_CARRY_LAW.md",
  "docs/CROSS_REPOSITORY_MATHEMATICAL_SYNTHESIS_K3X.md",
  "docs/PYTYLIKI_TO_K3_MATHEMATICAL_FOUNDATION.md",
  "docs/OPLAGUE_MATHEMATICAL_FOUNDATIONS.md",
  "docs/K3_SCIENTIFIC_CONSOLIDATION.md",
  "docs/K3_CLAIM_REGISTRY.json",
  "schemas/k3-claim-registry.v1.schema.json",
  "docs/K3_REFERENCE_VECTORS.json",
  "docs/K3_COMPOSITE_RADIX_ARITHMETIC.md",
  "docs/K3_SCIENTIFIC_CONSOLIDATION.md",
  "docs/K3_CLAIM_REGISTRY.json",
  "schemas/k3-claim-registry.v1.schema.json"
];

for (const path of requiredFiles) {
  check(existsSync(path), "Required file missing: " + path);
}

const B = 1000n;
const canonicalDigit = /^(?:0|[1-9][0-9]{0,2})$/;
const paddedDigit = /^[0-9]{1,3}$/;

function parseWord(word, mode = "canonical") {
  if (word === "0") return [0n];
  if (typeof word !== "string" || word.length === 0 || word.startsWith("-")) {
    throw new Error("expected a nonnegative K3 word");
  }

  const terminalZero = word.endsWith("k");
  const body = terminalZero ? word.slice(0, -1) : word;
  if (body.length === 0) throw new Error("empty positive word");
  const tokens = body.split("k");
  if (tokens.some((token) => token.length === 0)) throw new Error("empty group");

  if (!/^[1-9][0-9]{0,2}$/.test(tokens[0])) {
    throw new Error("the most significant group must be in 1..999");
  }

  if (mode === "canonical") {
    for (const token of tokens) {
      if (!canonicalDigit.test(token)) throw new Error("noncanonical group token");
    }
    if (!terminalZero && tokens.length > 1 && tokens[tokens.length - 1] === "0") {
      throw new Error("an explicit terminal zero requires the terminal separator");
    }
  } else if (mode === "K3-PAD" || mode === "K3-RAW") {
    for (const token of tokens) {
      if (!paddedDigit.test(token) || Number(token) > 999) {
        throw new Error("padded/raw group must contain 1..3 decimal digits");
      }
    }
    if (mode === "K3-PAD" && !terminalZero &&
        tokens.length > 1 && Number(tokens[tokens.length - 1]) === 0) {
      throw new Error("K3-PAD terminal zero requires the terminal separator");
    }
    if (mode === "K3-RAW" && terminalZero) {
      throw new Error("K3-RAW operands use explicit groups, not terminal-k shorthand");
    }
  } else {
    throw new Error("unknown input mode: " + mode);
  }

  const highToLow = tokens.map((token) => BigInt(token));
  if (terminalZero) highToLow.push(0n);
  return highToLow.reverse();
}

function valueOf(profile) {
  let value = 0n;
  let weight = 1n;
  for (const coefficient of profile) {
    value += coefficient * weight;
    weight *= B;
  }
  return value;
}

function profileOfValue(value) {
  if (value < 0n) throw new Error("unsigned encoder received a negative value");
  if (value === 0n) return [0n];
  const profile = [];
  let remaining = value;
  while (remaining > 0n) {
    profile.push(remaining % B);
    remaining /= B;
  }
  return profile;
}

function formatCanonical(profile) {
  const digits = profile.map((value) => BigInt(value));
  while (digits.length > 1 && digits[digits.length - 1] === 0n) digits.pop();
  if (digits.every((value) => value === 0n)) return "0";
  const highToLow = digits.slice().reverse().map((value) => value.toString());
  if (digits[0] === 0n) {
    highToLow.pop();
    return highToLow.join("k") + "k";
  }
  return highToLow.join("k");
}

function modeOf(input) {
  const mode = input?.input_mode ?? input?.mode ?? input?.profile;
  if (mode === "K3-PAD" || mode === "K3-RAW") return mode;
  return "canonical";
}

function sameBigIntArray(actual, expected) {
  return actual.length === expected.length &&
    actual.every((value, index) => value === BigInt(expected[index]));
}

const vectors = readJson("docs/K3_REFERENCE_VECTORS.json");
let vectorCount = 0;
if (vectors) {
  check(vectors.theory === "K3", "Reference vectors theory must be K3");
  check(vectors.radix === 1000, "Reference vector radix must equal 1000");
  check(vectors.schema_version === "1.2.0", "Reference vector schema must be 1.2.0");
  check(vectors.coefficient_order === "least_significant_to_most_significant",
    "Reference vector order must be low-to-high");

  for (const item of vectors.vectors ?? []) {
    vectorCount += 1;
    try {
      const left = parseWord(item.left.word, modeOf(item.left));
      check(sameBigIntArray(left, item.left.coefficients),
        item.id + ": left coefficients differ from parsed input");
      check(valueOf(left).toString() === String(item.left.decimal),
        item.id + ": left decimal differs from parsed input");

      const expected = parseWord(item.expected.word, "canonical");
      check(sameBigIntArray(expected, item.expected.coefficients),
        item.id + ": expected coefficients differ from canonical word");
      check(valueOf(expected).toString() === String(item.expected.decimal),
        item.id + ": expected decimal differs from canonical word");

      let computed = valueOf(left);
      if (item.operation === "add" || item.operation === "multiply") {
        const right = parseWord(item.right.word, modeOf(item.right));
        check(sameBigIntArray(right, item.right.coefficients),
          item.id + ": right coefficients differ from parsed input");
        check(valueOf(right).toString() === String(item.right.decimal),
          item.id + ": right decimal differs from parsed input");
        computed = item.operation === "add"
          ? computed + valueOf(right)
          : computed * valueOf(right);
      } else if (item.operation !== "identity") {
        fail(item.id + ": unsupported operation " + item.operation);
      }

      check(computed === valueOf(expected),
        item.id + ": computed operation value differs from expected");
      check(formatCanonical(profileOfValue(computed)) === item.expected.word,
        item.id + ": expected word is not the canonical encoding of computed value");
    } catch (error) {
      fail(item.id + ": " + error.message);
    }
  }

  for (const item of vectors.notation_cases ?? []) {
    try {
      const mode = item.profile === "K3-PAD" || item.profile === "K3-RAW"
        ? item.profile : "canonical";
      const profile = parseWord(item.word, mode);
      check(sameBigIntArray(profile, item.coefficients),
        item.id + ": notation coefficients mismatch");
      check(valueOf(profile).toString() === String(item.decimal),
        item.id + ": notation value mismatch");
      if (item.canonical_word) {
        check(formatCanonical(profile) === item.canonical_word,
          item.id + ": canonicalized word mismatch");
      }
    } catch (error) {
      fail(item.id + ": " + error.message);
    }
  }
}

const registry = readJson("docs/K3_CLAIM_REGISTRY.json");
const claimSchema = readJson("schemas/k3-claim-registry.v1.schema.json");
check(registry?.schema === "schemas/k3-claim-registry.v1.schema.json", "Claim registry schema path is inconsistent");
check(claimSchema?.$schema === "https://json-schema.org/draft/2020-12/schema", "Claim registry JSON Schema dialect is not declared");
let claimCount = 0;
if (registry) {
  check(registry.theory === "Vyunenko K3", "Claim registry must identify Vyunenko K3");
  check(registry.theory_version === "0.5.0", "Claim registry theory version must be 0.5.0");
  check(registry.base?.radix === 1000, "Claim registry radix must equal 1000");
  check(registry.base?.coefficient_range?.[0] === 0 &&
        registry.base?.coefficient_range?.[1] === 999,
        "Claim registry coefficient range must be 0..999");
  check(registry.base?.separator === "k" && registry.base?.separator_semantics === "lexical_group_delimiter",
    "Claim registry must preserve the lexical separator semantics");
  check(registry.base?.coefficient_order === "least_significant_to_most_significant",
    "Claim registry coefficient order must be low-to-high");

  const knownStatuses = new Set(registry.status_vocabulary ?? []);
  const knownKinds = new Set([
    "definition", "theorem", "catalogue", "hypothesis",
    "application_model", "extension_postulate"
  ]);
  const claims = registry.claims ?? [];
  const byId = new Map();

  for (const claim of claims) {
    claimCount += 1;
    if (byId.has(claim.id)) fail("Duplicate claim identifier: " + claim.id);
    byId.set(claim.id, claim);

    check(knownKinds.has(claim.kind), claim.id + ": unknown claim kind");
    check(knownStatuses.has(claim.evidence_status), claim.id + ": unknown evidence status");
    check(existsSync(claim.source), claim.id + ": missing source " + claim.source);

    if (claim.kind === "theorem") {
      check(Boolean(claim.proof_reference), claim.id + ": theorem needs a proof reference");
      check(
        claim.evidence_status === "proof_written_pending_independent_review" ||
        claim.evidence_status === "classical_specialization_pending_independent_review",
        claim.id + ": theorem must have a proof-related status"
      );
      check(typeof claim.scope?.domain === "string" && claim.scope.domain.length > 0,
        claim.id + ": theorem needs an explicit domain");
      check(Array.isArray(claim.scope?.assumptions) && claim.scope.assumptions.length > 0,
        claim.id + ": theorem needs explicit assumptions");
      check(typeof claim.scope?.boundary === "string" && claim.scope.boundary.length > 0,
        claim.id + ": theorem needs an explicit boundary statement");
    }
    if (claim.kind === "definition") {
      check(claim.evidence_status === "definition",
        claim.id + ": definition must retain definition status");
    }
    if (claim.kind === "hypothesis") {
      check(claim.evidence_status === "open_hypothesis",
        claim.id + ": hypothesis must remain open");
    }
    if (claim.kind === "application_model") {
      check(claim.evidence_status === "application_model_not_theorem",
        claim.id + ": application model must not be labelled a theorem");
    }
    if (claim.kind === "catalogue") {
      check(
        claim.evidence_status === "catalogue_integrity_pending_ci" ||
        claim.evidence_status === "catalogue_integrity_verified_by_ci",
        claim.id + ": catalogue status must be explicit");
      check(Boolean(claim.machine_check_scope),
        claim.id + ": catalogue status must delimit machine-check scope");
      if (claim.evidence_status === "catalogue_integrity_verified_by_ci") {
        check(typeof claim.verification_note === "string" && claim.verification_note.length > 0,
          claim.id + ": verified catalogue must include bounded CI evidence");
      }
    }
  }

  for (const claim of claims) {
    for (const dependency of claim.dependencies ?? []) {
      check(byId.has(dependency), claim.id + ": unknown dependency " + dependency);
    }
    check(!(claim.dependencies ?? []).includes(claim.id),
      claim.id + ": self-dependency is invalid");
  }

  const visiting = new Set();
  const visited = new Set();
  function visit(id) {
    if (visited.has(id)) return;
    if (visiting.has(id)) {
      fail("Cycle in claim dependency graph at " + id);
      return;
    }
    visiting.add(id);
    for (const dependency of byId.get(id)?.dependencies ?? []) {
      if (byId.has(dependency)) visit(dependency);
    }
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of byId.keys()) visit(id);
}

const catalogue = readText("docs/K3_MATHEMATICAL_FOUNDATIONS_AND_4685_INSTANCES.md");
const ids = [...catalogue.matchAll(/\|\s*(K3-(?:MOM|LAG|CAR|CRT|ZER)-\d{4})\s*\|/g)]
  .map((match) => match[1]);
const families = ["K3-MOM", "K3-LAG", "K3-CAR", "K3-CRT", "K3-ZER"];
check(ids.length === 4685, "Expected 4685 catalogue identifiers, found " + ids.length);
check(new Set(ids).size === ids.length, "Catalogue identifiers are not unique");

for (const family of families) {
  const familyIds = ids.filter((id) => id.startsWith(family + "-"));
  check(familyIds.length === 937, family + " must have exactly 937 records");
  const numbers = familyIds.map((id) => Number(id.slice(-4))).sort((a, b) => a - b);
  check(numbers.every((value, index) => value === index + 1),
    family + " identifiers must run consecutively from 0001 to 0937");
}

let crtRows = 0;
for (const line of catalogue.split(/\r?\n/)) {
  const match = line.match(/^\|\s*(K3-CRT-\d{4})\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|/);
  if (!match) continue;
  crtRows += 1;
  const u = Number(match[2]);
  const v = Number(match[3]);
  const g = Number(match[4]);
  const t = ((5 * (u - v)) % 8 + 8) % 8;
  const reconstructed = v + 125 * t;
  check(u >= 0 && u < 8 && v >= 0 && v < 125,
    match[1] + ": residue coordinates outside their domains");
  check(g >= 0 && g < 1000 && g === reconstructed &&
        g % 8 === u && g % 125 === v,
        match[1] + ": CRT reconstruction is incorrect");
}
check(crtRows === 937, "Expected exactly 937 parsed CRT rows, found " + crtRows);

const theory = readText("docs/VYUNENKO_THEORY.md");
const sectionIds = [...theory.matchAll(/^## (\d+(?:\.\d+)*)\./gm)]
  .map((match) => match[1]);
check(new Set(sectionIds).size === sectionIds.length,
  "Duplicate numeric section identifiers in the fundamental theory");

function validateLocalLinks(path) {
  const source = readText(path);
  const links = [...source.matchAll(/\]\(([^)]+)\)/g)].map((match) => match[1]);
  for (const link of links) {
    if (/^(https?:|mailto:|#)/i.test(link)) continue;
    const localPart = link.split("#")[0];
    if (!localPart || /[\s\\]/.test(localPart)) continue;
    const target = resolve(dirname(path), localPart);
    check(existsSync(target), path + ": unresolved local link " + link);
  }
}

for (const path of [
  "README.md",
  "docs/K3_SCIENTIFIC_CONSOLIDATION.md",
  "docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md",
  "docs/K3_ORIGINAL_CASCADE_FORMULAS.md",
  "docs/K3_BIPRIME_GEOMETRY_AND_CARRY_LAW.md",
  "docs/K3_COMPOSITE_RADIX_ARITHMETIC.md",
  "docs/K3_SCIENTIFIC_CONSOLIDATION.md",
  "schemas/k3-claim-registry.v1.schema.json"
]) {
  validateLocalLinks(path);
}

const readme = readText("README.md");
for (const requiredLink of [
  "docs/K3_SCIENTIFIC_CONSOLIDATION.md",
  "docs/FORMAL_EPISTEMIC_AND_PROOF_FRAMEWORK.md",
  "docs/K3_CLAIM_REGISTRY.json",
  "docs/K3_REFERENCE_VECTORS.json",
  "docs/K3_ORIGINAL_CASCADE_FORMULAS.md",
  "docs/K3_BIPRIME_GEOMETRY_AND_CARRY_LAW.md",
  "docs/K3_COMPOSITE_RADIX_ARITHMETIC.md",
  "docs/K3_SCIENTIFIC_CONSOLIDATION.md",
  "docs/K3_CLAIM_REGISTRY.json"
]) {
  check(readme.includes(requiredLink), "README lacks module index entry: " + requiredLink);
}

if (failures.length > 0) {
  for (const failure of failures) process.stderr.write("FAIL: " + failure + "\n");
  process.exitCode = 1;
} else {
  process.stdout.write(
    "K3 contract validation passed: " + vectorCount +
    " reference vectors; " + claimCount +
    " claim records; 4685 catalogue IDs; 937 exact CRT rows; unique theory section IDs.\n" +
    "Scope: repository contracts and finite reference data only; CI does not certify universal mathematical theorems.\n"
  );
}
