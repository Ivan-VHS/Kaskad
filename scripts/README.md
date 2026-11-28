# Research automation

- validate-foundation.mjs checks project and quality contracts, notation, documentation standards, multilingual README markers, and base reference-vector arithmetic.
- validate-k3-contract.mjs checks K3 claims and dependency cycles, reference data, catalogue integrity, and selected local links.
- validate-scientific-review-gate.mjs checks the 60-point audit register, unique IDs, evidence-file paths, Markdown traceability and readiness-gate consistency; it does not certify mathematical truth or external review.
- sync_vyunenko_docs.mjs prepares documentation sync updates for dependent repositories; cross-repository writes depend on a configured Actions credential.

A successful validator certifies only checks implemented by that script on the revision where it ran. It does not certify universal theorems or proof-assistant verification.
