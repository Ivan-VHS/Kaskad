#!/usr/bin/env bash
set -euo pipefail

repo="${GITHUB_REPOSITORY:-}"
repo="${repo##*/}"
repo="${repo:-$(basename "$PWD")}"
failures=0

require_file() {
  if [[ ! -f "$1" ]]; then
    printf '::error file=%s::required file is missing\n' "$1"
    failures=1
  fi
}

require_dir() {
  if [[ ! -d "$1" ]]; then
    printf '::error file=%s::required directory is missing\n' "$1"
    failures=1
  fi
}

for path in README.md LICENSE CONTRIBUTING.md SECURITY.md; do require_file "$path"; done
for path in .github/workflows docs tests schemas scripts assets; do require_dir "$path"; done
require_file docs/REPOSITORY_STRUCTURE_PROFILE.md
require_file scripts/verify_repository_structure.sh

shopt -s nullglob
workflows=(.github/workflows/*.yml .github/workflows/*.yaml)
if (("${#workflows[@]}" == 0)); then
  printf '::error::.github/workflows must contain at least one workflow\n'
  failures=1
fi

case "$repo" in
  Pytyliki)
    for path in src include cmake fixtures; do require_dir "$path"; done
    for path in CMakeLists.txt project-contract.json; do require_file "$path"; done
    ;;
  Reaper)
    for path in reaper language src include stdlib frameworks tests; do require_dir "$path"; done
    for path in CMakeLists.txt project-contract.json; do require_file "$path"; done
    ;;
  OPlague)
    for path in oplague crates tools; do require_dir "$path"; done
    for path in pyproject.toml project-contract.json; do require_file "$path"; done
    ;;
  VentuSample)
    for path in src tests examples; do require_dir "$path"; done
    for path in CMakeLists.txt project-contract.json; do require_file "$path"; done
    ;;
  DAK)
    for path in duckos kernel desktop foundation boot; do require_dir "$path"; done
    for path in CMakeLists.txt package.json engineering-evolution.v1.json; do require_file "$path"; done
    ;;
  Kaskad)
    for path in src/kaskad_k3 tests/vectors docs/01-foundations docs/02-core-theory docs/03-proofs-and-theorems docs/04-algebra-and-topology docs/05-classical-crosswalk docs/06-open-problems docs/07-applied-models docs/08-computational-evidence formal; do require_dir "$path"; done
    for path in project-contract.json pyproject.toml CITATION.cff CITATION.bib docs/VYUNENKO_THEORY.md docs/REPOSITORY_ARCHITECTURE.md docs/INDEX.md docs/status-and-scope.md docs/roadmap.md formal/README.md; do require_file "$path"; done
    for path in docs/01-foundations/README.md docs/02-core-theory/README.md docs/03-proofs-and-theorems/README.md docs/04-algebra-and-topology/README.md docs/05-classical-crosswalk/README.md docs/06-open-problems/README.md docs/07-applied-models/README.md docs/08-computational-evidence/README.md; do require_file "$path"; done
    for link in 01-foundations/README.md 02-core-theory/README.md 03-proofs-and-theorems/README.md 04-algebra-and-topology/README.md 05-classical-crosswalk/README.md 06-open-problems/README.md 07-applied-models/README.md 08-computational-evidence/README.md status-and-scope.md roadmap.md REPOSITORY_STRUCTURE_PROFILE.md ../formal/README.md; do
      if ! grep -Fq -- "$link" docs/INDEX.md; then
        printf '::error file=docs/INDEX.md::navigation entry is missing: %s\n' "$link"
        failures=1
      fi
    done
    ;;
  *)
    printf '::error::No repository-specific structure profile for %s\n' "$repo"
    failures=1
    ;;
esac

if ((failures)); then
  printf 'Repository structure validation failed for %s.\n' "$repo"
  exit 1
fi
printf 'Repository structure validation passed for %s.\n' "$repo"
