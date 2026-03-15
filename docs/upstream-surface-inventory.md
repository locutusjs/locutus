# Upstream Surface Inventory

This document describes the upstream-surface inventory system that now backs:

- CI checks for whether Locutus still ships symbols that make sense for the current parity target
- a living wishlist of desirable future ports
- explicit non-goals and intentional extras
- website presentation of shipped coverage, wishlist items, and untriaged upstream entries

## Goals

We want one maintainable source of truth that answers four questions:

1. What does the upstream language or namespace currently expose?
2. What do we already ship in Locutus?
3. Which missing upstream functions do we actually want?
4. Which upstream functions should we intentionally skip, and why?

This replaces the older PHP-only runtime-surface guardrail with a namespace-aware, multi-language inventory.

## Source Of Truth

There are three layers:

1. Checked-in upstream snapshots
   - Path: `test/parity/fixtures/upstream-surface/*.yml`
   - Purpose: version-tagged upstream catalogs
   - Source kinds:
     - `runtime`
     - `source_manifest`
     - `manual`

2. Human-maintained inventory decisions
   - Path: `docs/upstream-surface-inventory.yml`
   - Purpose: compact decisions about what we want, keep, or skip

3. Derived combined website data
   - Path: `website/source/_data/upstream_surface.yml`
   - Produced during `yarn injectweb`
   - Purpose: easy website consumption of counts, coverage, wishlist, and non-goal summaries

The website also receives the raw YAML inputs:

- `website/source/_data/upstream_surface_inventory.yml`
- `website/source/_data/upstream_surface_snapshots/*.yml`

## Inventory Shape

The inventory is YAML, validated with Zod in `test/parity/lib/upstream-surface-inventory.ts`.

The model is intentionally compact:

```yml
golang:
  title: Go
  namespaces:
    filepath:
      title: path/filepath package
      decisions:
        Join:
          decision: wanted
          note: Natural follow-up to Rel for path composition.
```

Every language and namespace that exists in the checked-in upstream snapshots must also exist in this inventory file, even if the `decisions` map is empty. CI fails if inventory coverage is incomplete.

## Decision Enum

Current decisions:

- `wanted`
- `keep_extension`
- `keep_language_construct`
- `keep_legacy`
- `keep_locutus_only`
- `skip_environment`
- `skip_low_value`
- `skip_plain_value_mismatch`
- `skip_runtime_model`
- `skip_security`
- `skip_side_effects`

Rules of thumb:

- `wanted` means “good candidate for future porting”
- `keep_*` means “Locutus intentionally ships this even though it is not in the upstream catalog we compare against”
- `skip_*` means “upstream exposes this, but it is not a good Locutus target”

The optional `note` should explain the maintainer rationale in one sentence.

## CI Behavior

Primary command:

```bash
corepack yarn test:upstream-surface
```

Selective PR routing is driven by:

- `scripts/select-parity-targets.ts`
- `.github/workflows/ci.yml`

Failure conditions are intentionally narrow:

- shipped extras with no explicit `keep_*` decision
- duplicate Locutus-to-upstream mappings inside one namespace
- stale decisions that no longer match shipped or upstream entries
- incomplete inventory coverage for a snapshot-backed language or namespace

Informational only:

- `wanted`
- `skip_*`
- `untriaged`

That keeps CI sharp without turning the roadmap into a mandatory porting checklist.

## Refresh Flow

Refresh live-discoverable snapshots with:

```bash
corepack yarn refresh:upstream-surface
```

Or limit it to specific languages:

```bash
corepack yarn refresh:upstream-surface php python ruby golang
```

Notes:

- languages with `discover()` adapters refresh from the parity target runtime or source-manifest extraction
- languages without `discover()` keep curated manual snapshots
- on a parity-target bump, regenerate snapshots first, then review new `untriaged` entries and any affected shipped decisions

Do not invalidate the entire inventory on target bumps. The workflow should be:

1. refresh snapshots
2. review added / removed / changed surface entries
3. update `wanted` / `skip_*` / `keep_*` decisions only where drift actually occurred
4. rerun parity for shipped functions in affected namespaces

## Website

The website consumes the combined artifact generated during `yarn injectweb`.

Current presentation:

- language pages show namespace-by-namespace upstream coverage, wanted ports, intentional extras, and untriaged counts
- category pages show namespace-specific wishlist / non-goal / untriaged detail when the category matches a tracked namespace

That makes the wishlist visible to maintainers and users without inventing a separate admin-only interface.

## Adding A New Language Or Namespace

1. Add or extend `handler.upstreamSurface` in `test/parity/lib/languages/<language>.ts`
2. Add or refresh the snapshot in `test/parity/fixtures/upstream-surface/<language>.yml`
3. Add the language and namespace entries to `docs/upstream-surface-inventory.yml`
4. Run:

```bash
corepack yarn test:upstream-surface <language>
corepack yarn injectweb
corepack yarn website:build
corepack yarn website:verify
```

## Intentional Scope Limits

This system is about surface inventory, not semantic guarantees.

- snapshots tell us what exists upstream
- parity tests still tell us whether shipped behavior matches the target runtime

That separation is intentional. Surface drift and behavior drift are related, but they are not the same problem.
