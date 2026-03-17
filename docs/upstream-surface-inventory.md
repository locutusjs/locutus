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

There are four layers:

1. Canonical discovery scope
   - Path: `docs/upstream-surface-scope.yml`
   - Purpose: declare which official namespaces belong to the tracked core/stdlib scope for each language, and which source/ref is authoritative for discovering them

2. Checked-in upstream snapshots
   - Path: `test/parity/fixtures/upstream-surface/*.yml`
   - Purpose: version-tagged upstream catalogs
   - Source kinds:
     - `runtime`
     - `source_manifest`
     - `manual`

3. Human-maintained inventory decisions
   - Path: `docs/upstream-surface-inventory.yml`
   - Purpose: compact decisions about what we want, keep, or skip

4. Derived combined website data
   - Path: `website/source/_data/upstream_surface.yml`
   - Produced during `yarn injectweb`
   - Purpose: easy website consumption of counts, coverage, wishlist, and non-goal summaries

The website also receives the raw YAML inputs:

- `website/source/_data/upstream_surface_inventory.yml`
- `website/source/_data/upstream_surface_snapshots/*.yml`

## Inventory Shape

The inventory is YAML, validated with Zod in `test/parity/lib/upstream-surface-inventory.ts`.
The canonical discovery scope is separate YAML, validated in `test/parity/lib/upstream-surface-scope.ts`.

The model is intentionally compact:

```yml
golang:
  title: Go
  scopeNote: This inventory grows namespace-by-namespace rather than pretending to cover every upstream surface at once.
  namespaces:
    filepath:
      title: path/filepath package
      default:
        decision: wanted
        note: Filepath helpers are strong plain string portability targets.
      rules:
        - match: 'Walk*'
          decision: skip_side_effects
          note: Filesystem traversal depends on host state and callbacks.
      decisions:
        HasPrefix:
          decision: skip_low_value
          note: Deprecated path-prefix checks add little value to the roadmap.
```

Decision precedence is:

1. exact `decisions`
2. first matching `rules` entry
3. namespace `default`

Every language and namespace that exists in the checked-in upstream snapshots must also exist in this inventory file, even if the namespace only has a `default` and no exact overrides. CI fails if inventory coverage is incomplete.

`scopeNote` is optional, but useful when a language page only tracks a deliberate subset of the upstream language or standard library. That keeps the website honest while the inventory grows.

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

## Compact Triage Model

Use the narrowest tool that keeps the inventory readable:

- `decisions` for:
  - intentional Locutus-only extras
  - precise one-off non-goals
  - a short explicit wishlist
- `rules` for:
  - prefix families like `curl_*`, `array_*`, `Append*`
  - broad buckets that would be noisy one entry at a time
- `default` for:
  - giant namespaces where the fallback decision is the real story

This keeps the file maintainable even for very large surfaces such as `php/__global`, `clojure/core`, or `r/base`.

## Breadth Strategy

We do not broaden every language in one giant invalidating sweep.

- make tracked scope explicit on the website first
- expand the cheapest trustworthy namespaces next
- keep triage sparse with namespace defaults and wildcard rules
- only add exact entries when they are real exceptions

That lets language pages become progressively more representative without turning the inventory into a hand-maintained database of thousands of one-off lines.

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

## Enumerate, Scope, Check

The intended maintainer loop is:

1. enumerate the full tracked upstream catalog
2. compare it against the canonical discovery scope
3. inspect what looks too broad or too noisy
4. either narrow tracked scope at the discovery/source layer, or keep the namespace and give it a broad inventory default
5. rerun the check until tracked scope is fully classified

Enumerate the full tracked catalog with:

```bash
corepack yarn enumerate:upstream-surface
```

Or limit it to specific languages:

```bash
corepack yarn enumerate:upstream-surface python ruby golang
```

This command is intentionally broader than refresh:

- runtime-backed languages refresh from the parity target container
- docs/source/manual languages validate and reuse their checked-in snapshots as the authoritative tracked catalog
- the result is the full tracked upstream picture we want to inspect before triaging

Enumeration is now also checked against the canonical scope manifest:

- missing expected namespaces fail
- unexpected namespaces fail
- source-kind/source-ref mismatches fail

That makes the discovery layer deterministic instead of relying on memory or ad hoc inspection.

Refresh only the live-discoverable snapshots with:

```bash
corepack yarn refresh:upstream-surface
```

Or limit it to specific languages:

```bash
corepack yarn refresh:upstream-surface php python ruby golang
```

Notes:

- languages with `discover()` adapters refresh from the parity target runtime or source-manifest extraction
- languages without `discover()` keep curated manual snapshots and still participate in full enumeration through `enumerate:upstream-surface`
- on a parity-target bump, regenerate snapshots first, then review new `untriaged` entries and any affected shipped decisions

When a freshly enumerated namespace feels like it is going overboard, prefer one of these two responses:

- exclude or narrow that namespace at the discovery/source layer, then rerun enumeration
- keep the namespace tracked, but give it a namespace-level `default` decision so the catalog stays visible without creating per-function noise

Do not invalidate the entire inventory on target bumps. The workflow should be:

1. refresh snapshots
2. review added / removed / changed surface entries
3. update `wanted` / `skip_*` / `keep_*` decisions only where drift actually occurred
4. rerun parity for shipped functions in affected namespaces

## Canonical Scope

`docs/upstream-surface-scope.yml` is the contract for surface discovery itself.

It should answer:

1. which namespaces belong to the tracked official core/stdlib scope
2. which source kind is canonical for each namespace
3. which exact source ref is canonical for the current parity target

That means the system now distinguishes clearly between:

- canonical discovery scope
- discovered catalog snapshots
- triage policy

Snapshots can drift. The scope file is the thing that says what *should* exist.

## Website

The website consumes the combined artifact generated during `yarn injectweb`.

Current presentation:

- language pages show tracked namespace counts, optional scope notes, and namespace-by-namespace upstream coverage, wanted ports, intentional extras, and untriaged counts
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
