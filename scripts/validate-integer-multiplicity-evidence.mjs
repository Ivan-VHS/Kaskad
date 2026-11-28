import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const failures = [];
const fail = (message) => failures.push(message);
const readText = (relativePath) => {
  const absolutePath = resolve(root, relativePath);
  if (!existsSync(absolutePath)) {
    fail("Missing required file: " + relativePath);
    return "";
  }
  return readFileSync(absolutePath, "utf8");
};
const readJson = (relativePath) => {
  try {
    return JSON.parse(readText(relativePath));
  } catch (error) {
    fail("Invalid JSON in " + relativePath + ": " + error.message);
    return null;
  }
};
const registerPath = "docs/K3_INTEGER_MULTIPLICITY_EVIDENCE.v1.json";
const standardPath = "docs/K3_INTEGER_MULTIPLICITY_EVIDENCE_STANDARD.md";
const auditPath = "docs/K3_INTEGER_MULTIPLICITY_AUDIT.md";
const schemaPath = "schemas/k3-integer-multiplicity-evidence.v1.schema.json";
const register = readJson(registerPath);
const schema = readJson(schemaPath);
const standard = readText(standardPath);
readText(auditPath);

const requiredIds = Array.from({ length: 20 }, (_, index) => "IME-" + String(index + 1).padStart(2, "0"));
const B = 1000n;

function depthBase(value) {
  let n = value < 0n ? -value : value;
  if (n === 0n) return Infinity;
  let depth = 0;
  while (n % B === 0n) {
    n /= B;
    depth += 1;
  }
  return depth;
}

function gcd(a, b) {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
}

function valueOf(coefficients) {
  return coefficients.reduce(
    (sum, coefficient, index) => sum + BigInt(coefficient) * (B ** BigInt(index)),
    0n
  );
}

function factorExponent(value, prime) {
  let n = value < 0n ? -value : value;
  const p = BigInt(prime);
  if (n === 0n || p < 2n) return null;
  let exponent = 0;
  while (n % p === 0n) {
    n /= p;
    exponent += 1;
  }
  return exponent;
}

if (register) {
  if (register.schema_version !== "1.0.0" || register.standard_id !== "K3-IME-1.0.0") {
    fail("Evidence register version or identifier is inconsistent");
  }
  if (register.project !== "Kaskad" || register.theory_id !== "K3" || register.radix !== 1000) {
    fail("Evidence register project, theory or radix is inconsistent");
  }
  if (register.radix_factorization?.["2"] !== 3 || register.radix_factorization?.["5"] !== 3) {
    fail("Radix must retain the factorization 2^3 * 5^3");
  }
  if (JSON.stringify(register.coefficient_range) !== JSON.stringify([0, 999])) {
    fail("Canonical K3 coefficient range must be 0..999");
  }
  if (register.coefficient_order !== "least_significant_to_most_significant") {
    fail("K3 coefficient order must start with the least significant group");
  }
  if (JSON.stringify(register.status_vocabulary) !== JSON.stringify(["met", "partial", "not_met", "not_applicable", "not_audited"])) {
    fail("Evidence status vocabulary is inconsistent");
  }

  const criteria = register.criteria ?? [];
  const actualIds = criteria.map((criterion) => criterion.id);
  if (JSON.stringify(actualIds) !== JSON.stringify(requiredIds)) {
    fail("Evidence register must contain IME-01 through IME-20 exactly once and in order");
  }
  if (new Set(actualIds).size !== actualIds.length) {
    fail("Evidence criterion identifiers must be unique");
  }
  for (const criterion of criteria) {
    for (const field of ["label", "test", "evidence"]) {
      if (typeof criterion[field] !== "string" || criterion[field].trim().length < 5) {
        fail("Criterion " + criterion.id + " has no usable " + field);
      }
    }
    if (criterion.mandatory !== true) fail("Every core IME criterion must be mandatory: " + criterion.id);
  }

  const known = new Set(requiredIds);
  for (const [profileName, ids] of Object.entries(register.profiles ?? {})) {
    if (!Array.isArray(ids) || ids.length === 0) fail("Empty evidence profile: " + profileName);
    if (new Set(ids).size !== ids.length) fail("Duplicate criterion in profile: " + profileName);
    for (const id of ids) if (!known.has(id)) fail("Unknown criterion " + id + " in profile " + profileName);
  }
  if (Object.keys(register.profiles ?? {}).length < 5) fail("At least five typed multiplicity profiles are required");

  for (const path of register.source_documents ?? []) {
    if (!existsSync(resolve(root, path))) fail("Evidence source document is missing: " + path);
  }

  const cases = register.reference_cases ?? [];
  if (cases.length < 15) fail("At least 15 exact arithmetic reference cases are required");
  const caseIds = new Set();
  for (const vector of cases) {
    if (caseIds.has(vector.id)) fail("Duplicate reference case: " + vector.id);
    caseIds.add(vector.id);
    try {
      let actual;
      switch (vector.type) {
        case "exact_divisibility": {
          const d = BigInt(vector.divisor);
          const n = BigInt(vector.dividend);
          if (d === 0n) throw new Error("zero divisor must use the degenerate-case record");
          const q = n / d;
          const r = n % d;
          actual = (r === 0n);
          if (q.toString() !== vector.quotient || r.toString() !== vector.remainder) {
            fail("Incorrect quotient/remainder in " + vector.id);
          }
          if (actual !== vector.expected_divisible) fail("Incorrect divisibility expectation in " + vector.id);
          break;
        }
        case "zero_divisor":
          if (vector.divisor !== "0" || vector.dividend !== "0" || vector.status !== "degenerate_no_unique_quotient") {
            fail("Zero-divisor case must remain explicitly degenerate: " + vector.id);
          }
          break;
        case "radix_divisibility": {
          const n = BigInt(vector.number);
          const modulus = B ** BigInt(vector.power);
          actual = n % modulus === 0n;
          if (actual !== vector.expected_divisible) fail("Radix divisibility case failed: " + vector.id);
          break;
        }
        case "positional_divisibility": {
          const coefficients = vector.coefficients_le;
          if (!Array.isArray(coefficients) || coefficients.length === 0 ||
              coefficients.some((x) => !Number.isInteger(x) || x < 0 || x > 999)) {
            fail("Invalid canonical coefficient vector in " + vector.id);
            break;
          }
          const value = valueOf(coefficients);
          const modulus = B ** BigInt(vector.power);
          actual = value % modulus === 0n;
          if (actual !== vector.expected_divisible || value.toString() !== vector.expected_value) {
            fail("Positional divisibility case failed: " + vector.id);
          }
          if (vector.power > coefficients.length && value !== 0n) {
            fail("Positive finite vector cannot contain more trailing radix zeros than its depth: " + vector.id);
          }
          break;
        }
        case "valuation_product": {
          const left = BigInt(vector.left);
          const right = BigInt(vector.right);
          const productDepth = depthBase(left * right);
          if (depthBase(left) !== vector.expected_left_depth ||
              depthBase(right) !== vector.expected_right_depth ||
              productDepth !== vector.expected_product_depth) {
            fail("Composite-base product counterexample failed: " + vector.id);
          }
          break;
        }
        case "prime_factor_multiplicity": {
          const exponent = factorExponent(BigInt(vector.number), vector.prime);
          if (exponent !== vector.expected_exponent) fail("Prime factor multiplicity failed: " + vector.id);
          break;
        }
        case "multiset_repetition": {
          const count = vector.sequence.filter((item) => item === vector.element).length;
          if (count !== vector.expected_count) fail("Multiset repetition count failed: " + vector.id);
          break;
        }
        case "positional_scale": {
          const coefficients = vector.coefficients_le;
          const shifted = Array(Number(vector.positions)).fill(0).concat(coefficients);
          const value = valueOf(shifted);
          if (JSON.stringify(shifted) !== JSON.stringify(vector.expected_coefficients_le) ||
              value.toString() !== vector.expected_value ||
              value !== valueOf(coefficients) * (B ** BigInt(vector.positions))) {
            fail("Positional scale identity failed: " + vector.id);
          }
          break;
        }
        case "unit_mod_radix": {
          const n = BigInt(vector.number);
          const actualUnit = gcd(n, B) === 1n;
          if (actualUnit !== vector.expected_unit) fail("Modular unit criterion failed: " + vector.id);
          break;
        }
        default:
          fail("Unknown reference case type: " + vector.type);
      }
    } catch (error) {
      fail("Reference case " + vector.id + " could not be checked: " + error.message);
    }
  }
}

if (schema) {
  if (schema.$schema !== "https://json-schema.org/draft/2020-12/schema" ||
      schema.title !== "Kaskad K3 integer multiplicity evidence register") {
    fail("JSON Schema metadata is inconsistent");
  }
  if (!schema.properties?.criteria?.items?.required?.includes("id") ||
      schema.properties?.criteria?.minItems !== 20 ||
      schema.properties?.criteria?.maxItems !== 20) {
    fail("JSON Schema must require exactly twenty identified IME criteria");
  }
}

for (const requiredText of [
  "IME-01", "IME-20", "1000=2^3", "chi_B", "n=qd",
  "not_audited", "K3-PAD", "K3-RAW"
]) {
  if (!standard.includes(requiredText)) fail("Normative standard is missing required concept: " + requiredText);
}

if (failures.length > 0) {
  for (const failure of failures) process.stderr.write("FAIL: " + failure + "\n");
  process.exitCode = 1;
} else {
  process.stdout.write(
    "K3-IME structure, 20 criteria, source links and " +
    (register.reference_cases?.length ?? 0) +
    " exact reference cases: OK. This is contract validation, not proof-assistant verification.\n"
  );
}
