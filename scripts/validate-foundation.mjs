import { readFileSync, existsSync } from "node:fs";
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

if (project) {
  if (project.project?.id !== "KASKAD") fail("project-contract.json: project.id must be KASKAD");
  if (project.theory?.id !== "K3") fail("project-contract.json: theory.id must be K3");
  if (project.theory?.radix !== 1000) fail("project-contract.json: K3 radix must be 1000");
  if (project.theory?.radix_factorization?.["2"] !== 3 || project.theory?.radix_factorization?.["5"] !== 3) {
    fail("project-contract.json: radix factorization must be 2^3 * 5^3");
  }
  if (project.theory?.group_separator !== "k") fail("project-contract.json: K3 separator must be k");
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
  const links = readme.matchAll(/\]\(([^)]+)\)/g);
  for (const match of links) {
    const href = match[1].split("#")[0];
    if (!href || href.startsWith("https://") || href.startsWith("http://") || href.startsWith("mailto:")) continue;
    if (!existsSync(resolve(root, href))) fail("README contains a broken local link: " + match[1]);
  }
}

if (failures.length > 0) {
  for (const failure of failures) process.stderr.write("FAIL: " + failure + "\n");
  process.exitCode = 1;
} else {
  process.stdout.write("Kaskad mathematical scope, K3 arithmetic contracts and local links: OK\n");
}
