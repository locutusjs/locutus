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

The crucial rule is:

- raw discovery comes only from canonical upstream sources
- folding decides what we actually track
- triage decides what we want, keep, or skip

Saved YAML must not define what raw discovery is allowed to see.

## Source Of Truth

There are five layers:

1. Raw discovered upstream catalogs
   - Path: `test/parity/fixtures/upstream-surface-discovered/*.yml`
   - Produced by: `corepack yarn discover:upstream-surface`
   - Purpose: materialize the full canonical upstream catalog directly from runtime, official docs, or official source for the parity target

2. Canonical tracked scope
   - Path: `docs/upstream-surface-scope.yml`
   - Purpose: declare the explicit tracked-scope/audit contract for official core/stdlib coverage, while preserving canonical provenance

3. Checked-in tracked upstream snapshots
   - Path: `test/parity/fixtures/upstream-surface/*.yml`
   - Produced by: `corepack yarn fold:upstream-surface`
   - Purpose: version-tagged tracked upstream catalogs
   - Source kinds:
     - `runtime`
     - `source_manifest`
     - `manual`

4. Human-maintained inventory decisions
   - Path: `docs/upstream-surface-inventory.yml`
   - Purpose: compact decisions about what we want, keep, or skip

5. Derived combined website data
   - Path: `website/source/_data/upstream_surface.yml`
   - Produced during `yarn injectweb`
   - Purpose: easy website consumption of counts, coverage, wishlist, and non-goal summaries

The website also receives the raw YAML inputs:

- `website/source/_data/upstream_surface_inventory.yml`
- `website/source/_data/upstream_surface_snapshots/*.yml`

## Inventory Shape

The inventory is YAML, validated with Zod in `test/parity/lib/upstream-surface-inventory.ts`.
The tracked scope is separate YAML, validated in `test/parity/lib/upstream-surface-scope.ts`.

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

`scopeNote` is optional, but useful when a language page only tracks a deliberate subset of the raw discovered upstream language or standard library. That keeps the website honest while the tracked slice grows.

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

Canonical namespace audit:

```bash
corepack yarn audit:upstream-scope
```

This audit is intentionally stronger than a plain name diff:

- it validates the discovered namespace list
- it validates the declared target version
- it validates the canonical `sourceKind`
- it validates the canonical `sourceRef`

Every supported language must now expose both:

- a canonical namespace catalog via `discoverNamespaceCatalog`
- a deterministic upstream-surface materialization path via `discover`

For runtime-backed languages, `discover` refreshes directly from the parity target.
For docs/source/manual languages, `discover` extracts directly from official docs or official source for that target.
Tracked snapshots are outputs of discovery, never hidden inputs to it.

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

## Discover, Fold, Check

The intended maintainer loop is:

1. discover the full raw upstream catalog from canonical sources
2. inspect the raw diff and fix discovery if it over- or under-shoots
3. fold the accepted raw catalog into tracked snapshots
4. triage the folded surface with inventory defaults, rules, and exact decisions
5. rerun the check until tracked scope is fully classified

Discover the raw upstream catalog with:

```bash
corepack yarn discover:upstream-surface
```

Or limit it to specific languages:

```bash
corepack yarn discover:upstream-surface python ruby golang
```

Fold discovered catalogs into the tracked snapshots with:

```bash
corepack yarn fold:upstream-surface
```

Or limit it to specific languages:

```bash
corepack yarn fold:upstream-surface python ruby golang
```

Audit canonical namespace coverage with:

```bash
corepack yarn audit:upstream-scope python
```

This command is intentionally separate from discovery:

- discovery must not read saved scope
- audit compares saved tracked scope against raw canonical discovery

Audit failures mean one of three things:

- missing expected namespaces fail
- unexpected namespaces fail
- source-kind/source-ref mismatches fail
- target-version mismatches fail

That keeps raw discovery deterministic instead of relying on memory or ad hoc inspection, while still giving maintainers an explicit fold step.

Discovery should also stay side-effect-safe. If an official namespace can only be found through import-time behavior that mutates the host or opens external tools, prefer excluding that namespace at the source layer over silently keeping it in the canonical catalog.

Refresh only the live-discoverable tracked snapshots with:

```bash
corepack yarn refresh:upstream-surface
```

Or limit it to specific languages:

```bash
corepack yarn refresh:upstream-surface php python ruby golang
```

Notes:

- `discover:upstream-surface` is the raw, exhaustive stage
- `fold:upstream-surface` is the explicit “accept this raw catalog into tracked snapshot YAML” stage
- `refresh:upstream-surface` is the live-only tracked-snapshot refresh helper
- on a parity-target bump, discover first, inspect the raw diff, fold the accepted catalog, then review new `wanted` / `skip_*` / `keep_*` decisions

When a freshly enumerated namespace feels like it is going overboard, prefer one of these two responses:

- exclude or narrow that namespace at the discovery/source layer, then rerun enumeration
- keep the namespace tracked, but give it a namespace-level `default` decision so the catalog stays visible without creating per-function noise

Do not invalidate the entire inventory on target bumps. The workflow should be:

1. discover raw catalogs
2. inspect and fix discovery drift
3. fold accepted catalogs into tracked snapshots
4. update `wanted` / `skip_*` / `keep_*` decisions only where drift actually occurred
5. rerun parity for shipped functions in affected namespaces

Language-level `defaultNamespace` exists to keep broad scope expansions sane: new namespaces can enter under one conservative default, and only the real exceptions need explicit namespace sections.

When a language starts surfacing hundreds of new namespaces at once, prefer `namespaceRules` before adding hundreds of one-off namespace stubs. `namespaceRules` match namespace names (for example `http*`, `crypto*`, or `*Error`) and let maintainers classify whole namespace families explicitly without constraining raw discovery.

The intended precedence is:

1. explicit namespace entry in `namespaces`
2. first matching language-level `namespaceRules` entry
3. `defaultNamespace`

## Canonical Scope

`docs/upstream-surface-scope.yml` is the contract for tracked scope, not the thing that constrains raw discovery.

It should answer:

1. which discovered namespaces belong to the tracked official core/stdlib scope
2. which source kind is canonical for the language-level namespace catalog when discovery supports that
3. which source kind is canonical for each namespace
4. which exact source ref is canonical for the current parity target

That means the system now distinguishes clearly between:

- canonical discovery scope
- canonical namespace catalogs
- discovered catalog snapshots
- triage policy

Raw discovery can drift. The scope file is the thing that says what we deliberately track.

## Website

The website consumes the combined artifact generated during `yarn injectweb`.

Current presentation:

- language pages show tracked namespace counts, optional scope notes, and namespace-by-namespace upstream coverage, wanted ports, intentional extras, and untriaged counts
- category pages show namespace-specific wishlist / non-goal / untriaged detail when the category matches a tracked namespace

That makes the wishlist visible to maintainers and users without inventing a separate admin-only interface.

## Adding A New Language Or Namespace

1. Add or extend `handler.upstreamSurface` in `test/parity/lib/languages/<language>.ts`
   - implement raw `discover()` from runtime, official docs, or official source
   - expose `discoverNamespaceCatalog()` from that same canonical source when possible
2. Run `corepack yarn discover:upstream-surface <language>` and inspect the raw diff
3. Fold the accepted raw catalog into `test/parity/fixtures/upstream-surface/<language>.yml`
4. Add or update the tracked namespaces in `docs/upstream-surface-scope.yml`
5. Add the language and namespace entries to `docs/upstream-surface-inventory.yml`
4. Run:

```bash
corepack yarn discover:upstream-surface <language>
corepack yarn fold:upstream-surface <language>
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
