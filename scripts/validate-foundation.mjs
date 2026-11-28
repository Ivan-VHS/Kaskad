import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

function readJson(relativePath) {
  const absolutePath = resolve(root, relativePath);
  if (!existsSync(absolutePath)) {
    fail("Missing required file: " + relativePath);
    return null;
  }

  try {
    return JSON.parse(readFileSync(absolutePath, "utf8"));
  } catch (error) {
    fail("Invalid JSON in " + relativePath + ": " + error.message);
    return null;
  }
}

const project = readJson("project-contract.json");
const mathematics = readJson("quality-mathematics.json");
const computation = readJson("quality-computation.json");
const evolution = readJson("engineering-evolution.v1.json");
const vectors = readJson("docs/K3_REFERENCE_VECTORS.json");
const chumnyVerdict = readJson("docs/CHUMNY_VERDICT_MODEL.v1.json");
const chumnyVerdictSchema = readJson("schemas/chumny-verdict.v1.schema.json");

if (project) {
  if (project.project?.id !== "KASKAD") fail("project-contract.json: project.id must be KASKAD");
  if (project.theory?.id !== "K3") fail("project-contract.json: theory.id must be K3");

  if (project.theory?.specification_version !== "0.5.0") {
    fail("project-contract.json: theory.specification_version must match the integrated K3 theory 0.5.0");
  }
  if (project.theory?.radix !== 1000) fail("project-contract.json: K3 radix must be 1000");
  if (project.theory?.radix_factorization?.["2"] !== 3 || project.theory?.radix_factorization?.["5"] !== 3) {
    fail("project-contract.json: radix factorization must be 2^3 * 5^3");
  }
  if (project.theory?.group_separator !== "k") fail("project-contract.json: K3 separator must be k");
  if (project.theory?.separator_semantics !== "lexical_group_delimiter") {
    fail("project-contract.json: k must remain a lexical group delimiter");
  }
  if (project.theory?.zero_word !== "0" || project.theory?.empty_word_is_canonical !== false) {
    fail("project-contract.json: canonical zero and empty-word semantics are inconsistent");
  }
  if (project.theory?.shift_operator !== "S_B") {
    fail("project-contract.json: positional shift must use the separate S_B operator");
  }
  if (project.theory?.divisor_function_is_multiplicative !== false) {
    fail("project-contract.json: composite-base divisor function must not be marked multiplicative");
  }

  const requiredBoundaries = [
    "mathematics_is_the_permanent_primary_scope",
    "cross_repository_relationships_are_mathematical_only",
    "no_operating_system_programming_language_ide_driver_or_application_product_scope",
    "executable_tools_are_optional_support_for_mathematical_verification",
    "computation_and_experiment_do_not_replace_proofs"
  ];
  const actualBoundaries = new Set(project.scope_boundary ?? []);
  for (const boundary of requiredBoundaries) {
    if (!actualBoundaries.has(boundary)) fail("Project scope boundary is missing: " + boundary);
  }

  for (const relativePath of project.required_documents ?? []) {
    if (!existsSync(resolve(root, relativePath))) {
      fail("Missing required mathematical document: " + relativePath);
    }
  }

  const documentation = project.documentation_standard;
  if (documentation?.edition !== "Cascade Edition" || documentation?.version !== "1.0.0") {
    fail("Project contract must pin Cascade Edition 1.0.0");
  }
  if (documentation?.normative_document !== "docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md") {
    fail("Project contract must identify the normative scientific documentation standard");
  }
  if (JSON.stringify(documentation?.public_languages) !== JSON.stringify(["zh-CN", "en", "ru", "uk"])) {
    fail("Project contract must declare the four public documentation languages");
  }
  for (const citationPath of ["CITATION.cff", "CITATION.bib"]) {
    if (!existsSync(resolve(root, citationPath))) fail("Missing citation metadata: " + citationPath);
  }

  const requiredDomains = [
    "mathematical_logic_and_axiomatics",
    "algebra",
    "arithmetic_and_number_theory",
    "geometry_and_topology",
    "mathematical_analysis",
    "functional_analysis",
    "trigonometry",
    "combinatorics",
    "probability",
    "statistics",
    "numerical_methods",
    "optimization",
    "experimental_mathematics",
    "formal_proof_and_evidence"
  ];
  const actualDomains = new Set(project.scope ?? []);
  for (const domain of requiredDomains) {
    if (!actualDomains.has(domain)) fail("Project scope is missing domain: " + domain);
  }
}

if (mathematics) {
  if (mathematics.contract_id !== "KASKAD-QUALITY-MATHEMATICS") {
    fail("Unexpected mathematical quality contract id");
  }
  if (mathematics.k3_constraints?.radix !== 1000) {
    fail("Mathematical quality contract does not preserve radix 1000");
  }
  if (mathematics.forbidden?.empirical_observation_as_universal_proof !== true) {
    fail("Empirical observations must never be accepted as universal proof");
  }

  const notation = mathematics.k3_constraints?.notation_and_semantics;
  if (notation?.radix_symbol !== "B" || notation?.radix_value !== 1000) {
    fail("K3 numerical radix must be B=1000");
  }
  if (notation?.separator_symbol !== "k" || notation?.separator_role !== "lexical_group_delimiter") {
    fail("K3 k must remain the lexical group delimiter");
  }
  if (notation?.numeric_shift_operator !== "S_B") {
    fail("K3 positional shift must use the separately defined S_B operator");
  }
  if (notation?.raw_coefficient_domain !== "Z" || notation?.canonical_coefficient_range !== "0..999") {
    fail("K3 raw and canonical coefficient domains must remain distinct");
  }
  if (notation?.canonical_zero_word !== "0" || notation?.empty_word_is_canonical !== false) {
    fail("K3 must have one canonical zero word and reject the empty word");
  }
  if (notation?.evaluation_kernel !== "(X-1000)") {
    fail("K3 polynomial evaluation kernel must be (X-1000)");
  }
  if (notation?.empty_sum !== 0 || notation?.empty_product !== 1 || notation?.undefined_marker !== "outside_Z") {
    fail("K3 empty-object and undefined-value semantics are inconsistent");
  }
  if (mathematics.forbidden?.using_k_as_both_numeric_radix_and_word_separator !== true ||
      mathematics.forbidden?.treating_empty_word_as_canonical_zero !== true ||
      mathematics.forbidden?.identifying_null_or_undefined_with_integer_zero !== true) {
    fail("K3 notation and value-type distinctions must be enforced");
  }

  const composite = mathematics.k3_constraints?.composite_radix_arithmetic;
  if (JSON.stringify(composite?.crt_components) !== JSON.stringify(["2^(3r)", "5^(3r)"])) {
    fail("K3 CRT components must be 2^(3r) and 5^(3r)");
  }
  if (composite?.unit_criterion !== "gcd(n,1000)=1") {
    fail("K3 modular units must use the gcd(n,1000)=1 criterion");
  }
  if (composite?.unit_count !== "(2/5)*1000^r") {
    fail("K3 unit count must be (2/5)*1000^r");
  }
  if (composite?.nonzero_zero_divisor_count !== "(3/5)*1000^r-1") {
    fail("K3 nonzero zero-divisor count is inconsistent");
  }
  const branching = composite?.residue_tree_branching;
  if (branching?.["2_primary_branch_factor"] !== 8 ||
      branching?.["5_primary_branch_factor"] !== 125 ||
      branching?.total !== 1000) {
    fail("K3 residue branching must factor as 8 * 125 = 1000");
  }
  if (mathematics.forbidden?.assuming_nu_1000_zero_implies_unit !== true) {
    fail("The contract must forbid treating nu_1000(n)=0 as a unit test");
  }
}

if (computation) {
  if (computation.contract_id !== "KASKAD-QUALITY-COMPUTATION") {
    fail("Unexpected computational quality contract id");
  }
  if (computation.runtime?.silent_overflow !== false) {
    fail("Silent overflow must be forbidden");
  }
  if (!computation.experiment_manifest_required?.includes("prng_and_seed")) {
    fail("Experiment manifest must name the PRNG and seed explicitly");
  }
}

if (computation) {
  if (computation.documentation_standard?.edition !== "Cascade Edition 1.0.0") {
    fail("Computational contract must follow Cascade Edition 1.0.0");
  }
  if (computation.verification?.test_status_requires_actual_execution !== true) {
    fail("Unexecuted tests must not be marked as passed");
  }
  if (computation.verification?.performance_claims_require_measurements !== true) {
    fail("Performance claims must be based on measurements");
  }
}

if (vectors) {
  if (vectors.theory !== "K3" || vectors.radix !== 1000 ||
      vectors.coefficient_order !== "least_significant_to_most_significant") {
    fail("K3 reference-vector metadata is inconsistent");
  }
  const evaluate = (coefficients) => coefficients.reduce(
    (sum, coefficient, index) => sum + BigInt(coefficient) * (1000n ** BigInt(index)), 0n
  );
  for (const vector of vectors.vectors ?? []) {
    for (const operand of [vector.left, vector.right, vector.expected].filter(Boolean)) {
      if (!Array.isArray(operand.coefficients) || operand.coefficients.length === 0) {
        fail("Reference vector " + vector.id + " has no coefficient sequence");
        continue;
      }
      if (operand.coefficients.some((coefficient) => !Number.isInteger(coefficient) || coefficient < 0 || coefficient > 999)) {
        fail("Reference vector " + vector.id + " contains a non-canonical coefficient");
        continue;
      }
      if (evaluate(operand.coefficients).toString() !== operand.decimal) {
        fail("Reference vector " + vector.id + " has an incorrect decimal value");
      }
    }
    if (vector.operation === "add" && vector.left && vector.right && vector.expected) {
      const actual = BigInt(vector.left.decimal) + BigInt(vector.right.decimal);
      if (actual.toString() !== vector.expected.decimal) fail("Reference addition failed: " + vector.id);
    } else if (vector.operation === "multiply" && vector.left && vector.right && vector.expected) {
      const actual = BigInt(vector.left.decimal) * BigInt(vector.right.decimal);
      if (actual.toString() !== vector.expected.decimal) fail("Reference multiplication failed: " + vector.id);
    } else if (vector.operation === "identity" && vector.left && vector.expected) {
      if (vector.left.decimal !== vector.expected.decimal) fail("Reference identity failed: " + vector.id);
    }
    if (vector.status === "PASS") fail("Reference expectations must not be labeled PASS without an executed test");
  }
}


if (chumnyVerdict) {
  if (chumnyVerdict.theory?.id !== "CV-1" ||
      chumnyVerdict.theory?.version !== "1.2.0" ||
      chumnyVerdict.theory?.base_theory !== "K3" ||
      chumnyVerdict.theory?.base_radix !== 1000 ||
      chumnyVerdict.theory?.base_k3_semantics_changed !== false ||
      chumnyVerdict.theory?.ordinary_integer_equality_changed !== false) {
    fail("Chumny Verdict model must preserve K3 base semantics and ordinary equality");
  }
  if (chumnyVerdict.instance?.parameter !== "c" ||
      chumnyVerdict.instance?.domain !== "Z" ||
      chumnyVerdict.instance?.nonzero_required !== true ||
      chumnyVerdict.instance?.exactly_one_value_per_instance !== true ||
      chumnyVerdict.instance?.global_default !== null) {
    fail("Chumny Verdict requires one fixed nonzero parameter per instance");
  }
  if (chumnyVerdict.projection?.symbol !== "P_c" ||
      chumnyVerdict.projection?.idempotent !== true ||
      chumnyVerdict.projection?.preserves_raw_evaluation !== true ||
      chumnyVerdict.projection?.kernel_is_additive_congruence !== false ||
      chumnyVerdict.projection?.image !== "Z excluding 0") {
    fail("CV-P projection metadata is inconsistent");
  }
  const sample = chumnyVerdict.illustrative_instance;
  if (!sample || !Number.isSafeInteger(sample.c) || sample.c === 0) {
    fail("Chumny Verdict sample parameter must be a nonzero exact integer");
  } else {
    const c = BigInt(sample.c);
    const P = (n) => n === 0n ? c : n;
    for (const item of sample.map_cases ?? []) {
      const actual = P(BigInt(item.input));
      if (actual !== BigInt(item.output) || P(actual) !== actual) {
        fail("CV-P map/idempotence check failed for " + item.input);
      }
    }
    for (const item of sample.primary_relation_cases ?? []) {
      const actual = BigInt(item.from) === 0n && BigInt(item.to) === c;
      if (actual !== item.expected) fail("CV primary relation check failed");
    }
    for (const item of sample.transfer_cases ?? []) {
      const actual = BigInt(item.to) === BigInt(item.from) + c;
      if (actual !== item.expected) fail("CV additive-transfer graph check failed");
    }
    for (const item of sample.post_evaluation_cases ?? []) {
      if (P(BigInt(item.raw_value)) !== BigInt(item.cv_value)) {
        fail("CV-P post-evaluation check failed for " + item.expression);
      }
    }
    const positional = sample.positional_zero_group_example;
    if (!positional ||
        positional.radix !== 1000 ||
        positional.coefficient_order !== "least_significant_to_most_significant" ||
        positional.coefficients.some((x) => !Number.isInteger(x) || x < 0 || x > 999)) {
      fail("CV positional zero-group example has invalid K3 coefficients");
    } else {
      const value = positional.coefficients.reduce(
        (sum, coefficient, index) => sum + BigInt(coefficient) * (1000n ** BigInt(index)), 0n
      );
      if (value !== BigInt(positional.evaluated_value) ||
          P(value) !== BigInt(positional.cv_value) ||
          value !== 1000n) {
        fail("CV-P must operate on the evaluated K3 integer, not on a zero coefficient");
      }
    }
    for (const item of sample.kernel_equivalence_cases ?? []) {
      const actual = P(BigInt(item.left)) === P(BigInt(item.right));
      if (actual !== item.expected) fail("CV-P kernel-equivalence control failed");
    }
    if (P(0n) !== c || P(c) !== c || P(1n) !== 1n ||
        P(P(0n)) !== P(0n) || P(1000n) !== 1000n) {
      fail("CV-P image, fixed-point or idempotence invariant failed");
    }
    if (P(0n) !== P(c) || P(1n) === P(c + 1n)) {
      fail("CV-P kernel must identify the 0/c pair and must not be an additive congruence");
    }
  }
}
if (chumnyVerdictSchema) {
  if (chumnyVerdictSchema.$schema !== "https://json-schema.org/draft/2020-12/schema" ||
      chumnyVerdictSchema.properties?.theory?.properties?.base_radix?.const !== 1000 ||
      chumnyVerdictSchema.properties?.instance?.properties?.nonzero_required?.const !== true ||
      chumnyVerdictSchema.properties?.projection?.properties?.preserves_raw_evaluation?.const !== true) {
    fail("Chumny Verdict JSON Schema does not enforce the mathematical contract");
  }
}

if (evolution) {
  if (evolution.contract_id !== "KASKAD-ENGINEERING-EVOLUTION") {
    fail("Unexpected engineering evolution contract id");
  }
  if (!Array.isArray(evolution.stages) || evolution.stages.length < 7) {
    fail("Engineering evolution must define all research stages");
  }
}

const readmePath = resolve(root, "README.md");
if (!existsSync(readmePath)) {
  fail("README.md is missing");
} else {
  const readme = readFileSync(readmePath, "utf8");
  const languageMarkers = [
    ["Russian", "Kaskad — Теория Вьюненко K3"],
    ["English", "<summary><strong>English</strong></summary>"],
    ["Ukrainian", "<summary><strong>Українська</strong></summary>"],
    ["Chinese", "<summary><strong>中文</strong></summary>"]
  ];
  for (const [language, marker] of languageMarkers) {
    if (!readme.includes(marker)) fail("README is missing a language edition: " + language);
  }
  if (!readme.includes("## Краткие аннотации")) {
    fail("README must expose the multilingual summary annotations");
  }
  if (!readme.includes("docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md")) {
    fail("README must link to the normative Cascade documentation standard");
  }
  const links = readme.matchAll(/\]\(([^)]+)\)/g);
  for (const match of links) {
    const href = match[1].split("#")[0];
    if (!href || href.startsWith("https://") || href.startsWith("http://") || href.startsWith("mailto:")) continue;
    if (!existsSync(resolve(root, href))) fail("README contains a broken local link: " + match[1]);
  }
}

const docsPath = resolve(root, "docs");
if (existsSync(docsPath)) {
  for (const fileName of readdirSync(docsPath)) {
    if (!fileName.endsWith(".md")) continue;
    const fileText = readFileSync(resolve(docsPath, fileName), "utf8");
    if (!fileText.includes("Cascade Edition 1.0.0")) {
      fail("Scientific document is missing the Cascade Edition header: docs/" + fileName);
    }
  }
}

const standardPath = resolve(root, "docs/SCIENTIFIC_MATHEMATICAL_DOCUMENTATION_STANDARD.md");
if (existsSync(standardPath)) {
  const standardText = readFileSync(standardPath, "utf8");
  for (const ruleHeading of [
    "### 1.", "### 2.", "### 3.", "### 4.", "### 5.",
    "### 6.", "### 7.", "### 8.", "### 9.", "### 10."
  ]) {
    if (!standardText.includes(ruleHeading)) fail("Cascade standard is missing rule section " + ruleHeading);
  }
  for (const languageMarker of ["## 中文", "## English", "## Русский", "## Українська"]) {
    if (!standardText.includes(languageMarker)) fail("Cascade standard is missing language section " + languageMarker);
  }
}


const theoryPath = resolve(root, "docs/VYUNENKO_THEORY.md");
if (existsSync(theoryPath)) {
  const theoryText = readFileSync(theoryPath, "utf8");
  for (const section of ["# ЧАСТЬ XIX.", "# ЧАСТЬ XX.", "# ЧАСТЬ XXI.", "# ЧАСТЬ XXII.", "## 99."]) {
    if (!theoryText.includes(section)) fail("Integrated Vyunenko Theory is missing section " + section);
  }
}

if (failures.length > 0) {
  for (const failure of failures) process.stderr.write("FAIL: " + failure + "\n");
  process.exitCode = 1;
} else {
  process.stdout.write("Kaskad scientific documentation standard, multilingual README, K3 notation, reference vectors, CV-1/CV-P semantics and local links: OK\n");
}
