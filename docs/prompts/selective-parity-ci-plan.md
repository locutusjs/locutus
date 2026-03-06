# Selective Parity CI Plan

## Context

- Full parity on every PR is now the dominant CI bottleneck.
- Most of that cost comes from cold-runner Docker image pulls across many runtimes, not from the changed functions themselves.
- The repo already has dependency extraction for Locutus source modules in `src/_util/util.ts`, so we can select affected parity targets instead of always running the whole zoo.
- We still want strong confidence, so the goal is not "less parity"; it is "smarter parity on PRs, full parity on a different cadence".

## Goal

- On pull requests:
  - run a tiny always-on smoke parity set
  - run a dynamically selected parity set based on changed files and reverse dependents
- On nightly and release tags:
  - run full parity

## Selector Rules

### Selective Mode

- Direct function source changes select that function:
  - `src/<language>/<category>/<function>.ts`
- Helper and shared dependency changes select reverse dependents:
  - especially `src/**/_helpers/*.ts`
- Source-level dependency edges come from Locutus import/require usage, not from generated tests.

### Force-Full Mode

- Any change to parity core or translation/runtime machinery:
  - `test/parity/index.ts`
  - `test/parity/lib/**`
- Any change to global code/test generation that could alter examples or dependency extraction broadly:
  - `src/_util/util.ts`
  - `src/_util/cli.ts`
  - `src/_util/headerSchema.ts`
- Any workflow or parity-runtime config change:
  - `.github/workflows/ci.yml`
  - parity config files
- Any release tag should still run full parity regardless of selector output.

### Force-Skip Parity

- Pure website/content changes should skip dynamic parity entirely on PRs.
- The smoke subset still runs unless we explicitly decide to skip parity for website-only PRs later.

## PR Safety Net

- Keep a fixed smoke subset on every PR even when the selector finds no targets.
- The smoke set should cover:
  - one PHP helper-heavy function
  - one callback-heavy function
  - a couple of non-PHP runtimes with stable parity

## Explainability Requirement

- The selector output must explain why each target was chosen:
  - direct file change
  - reverse dependency from helper/shared module
  - force-full trigger
- CI logs should show the decision, not just the final list.

## Implementation Sequence

1. Add a selector script in `scripts/` that:
   - reads changed files against a configurable base ref
   - builds a source dependency graph from `src/**`
   - computes reverse dependents
   - emits one of:
     - `full`
     - `smoke`
     - `smoke + selected targets`
2. Add unit tests for selector behavior:
   - direct function change
   - helper change
   - parity-core change
   - website-only change
   - no-op diff
3. Add a small smoke target list in repo config.
4. Wire PR CI to:
   - compute parity targets
   - run smoke + selected targets
5. Wire scheduled full parity:
   - nightly workflow
6. Keep release tags on full parity.

## Success Criteria

- A PR touching one function does not pull the entire parity matrix.
- A PR touching a shared helper selects that helper's reverse dependents.
- A PR touching parity internals triggers full parity.
- A website-only PR does not trigger dynamic parity target expansion.
- The selected target list is deterministic and inspectable in CI logs.

## Non-Goals For First Pass

- Perfect minimality of the affected set.
- Language-semantic dependency inference beyond Locutus source imports/requires.
- Rewriting the parity runner itself.

## Expected Outcome

- Much faster PR feedback.
- Full parity confidence preserved on nightly and release paths.
- A documented, testable selector rather than implicit CI heuristics.
