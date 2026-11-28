#!/usr/bin/env bash
set -euo pipefail

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

for path in README.md LICENSE CONTRIBUTING.md SECURITY.md CITATION.cff CITATION.bib project-contract.json pyproject.toml; do
  require_file "$path"
done

for path in .github/workflows docs schemas scripts assets formal src/kaskad_k3 tests tests/vectors \
  docs/01-foundations docs/02-core-theory docs/03-proofs-and-theorems \
  docs/04-algebra-and-topology docs/05-classical-crosswalk docs/06-open-problems \
  docs/07-applied-models docs/08-computational-evidence; do
  require_dir "$path"
done

for path in docs/INDEX.md docs/REPOSITORY_ARCHITECTURE.md docs/REPOSITORY_STRUCTURE_PROFILE.md \
  docs/status-and-scope.md docs/VYUNENKO_THEORY.md formal/README.md \
  scripts/verify_repository_structure.sh; do
  require_file "$path"
done

shopt -s nullglob
workflows=(.github/workflows/*.yml .github/workflows/*.yaml)
if (("${#workflows[@]}" == 0)); then
  printf '::error::.github/workflows must contain at least one workflow\n'
  failures=1
fi

if ((failures)); then
  printf 'Kaskad repository structure validation failed.\n'
  exit 1
fi

printf 'Kaskad repository structure validation passed.\n'
