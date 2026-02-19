# TypeScript in locutus

## Overview

All source files in `src/` are TypeScript. The migration from JavaScript was completed in PR #535.

- 488 function files (`.ts`) with typed function signatures
- `noImplicitAny: true` — all parameters must have explicit types
- Some files still have `// @ts-nocheck` — these need manual type fixes (complex runtime coercions, dynamic indexing, etc.)
- The long-term goal is to remove all `@ts-nocheck` directives

## Architecture decisions

### Named exports

Every function uses a named export:

```typescript
export function sprintf(format: string, ...args: unknown[]): string {
```

Not default exports. This gives better IDE support, tree-shaking, and consistent import style.

### Barrel files

Each category directory has an `index.ts` that re-exports its functions:

```typescript
export { sprintf } from './sprintf.ts'
export { echo } from './echo.ts'
```

Parent directories use namespace re-exports:

```typescript
export * as strings from './strings/index.ts'
export * as array from './array/index.ts'
```

This gives consumers access at any depth:

```typescript
import { sprintf } from 'locutus/php/strings/sprintf'
import { php } from 'locutus'
php.strings.sprintf(...)
```

### CJS distribution

Source is ESM TypeScript, but the published package ships CJS for backwards compatibility:

- `tsconfig.build.json` compiles to CommonJS with `rewriteRelativeImportExtensions`
- `scripts/fix-cjs-exports.ts` post-processes the dist to add `module.exports = exports.funcName` for each function file, so `require('locutus/php/strings/sprintf')` returns the function directly

### `@ts-nocheck` files

191 files have `// @ts-nocheck` because they have type errors that require careful manual fixes — typically complex runtime type coercions, dynamic object indexing, or loosely typed algorithms. These files still run correctly and have typed function signatures — the directive just suppresses internal type checking.

### `noImplicitAny: true`

All function parameters must have explicit type annotations. The compiler enforces this for all new code. Types were inferred from example comments during the bulk migration — some use `any` where the actual type is complex.

## Contributing a function

### Module format

```typescript
export function functionName(param: string): string {
  //  discuss at: https://locutus.io/php/functionName/
  // original by: Author Name (https://example.com)
  //   example 1: functionName('test')
  //   returns 1: 'result'

  // implementation
}
```

### Comment headers

Keep the comment block inside the function body. These comments are parsed by the build system to generate tests and website content. Do not move, reformat, or reword them.

### Types

- Add type annotations to function parameters and return types
- Use `string`, `number`, `boolean` (lowercase) for primitives
- Use `Record<string, unknown>` for generic objects, not `object` or `any`
- Don't over-annotate — trust TypeScript inference for local variables with obvious types
- Never use `as` casts on values — use runtime conversions (`Number()`, `String()`) and type guards instead
- The only acceptable `as` casts are at boundaries with the global scope (`globalThis as ...`)

### Imports

- Use `.ts` extension for all local imports: `import { dep } from './dep.ts'`
- Use named imports: `import { functionName } from './file.ts'`

### ini values

Prefer `ini_get`/`ini_set` in source functions for consistency and typed runtime access.
Direct global ini reads should only be used when there is a measured performance reason.

```typescript
import { ini_get } from '../info/ini_get.ts'
const iniVal = ini_get('some.key') || 'defaultValue'
```

### Verification

```bash
npm run build       # regenerate indices and test files
npm run check       # biome lint, tsc, header lint, vitest — all must pass
npm run test:module # ESM import chain test
```

## Improving type coverage

The biggest area for contribution is removing `@ts-nocheck` from files and fixing their type errors.

```bash
# Find files that need type work
rg -l '@ts-nocheck' src --glob '*.ts' | rg -v '/_util/' | rg -v '/_helpers/'
```

To fix a `@ts-nocheck` file:
1. Remove the `// @ts-nocheck` directive
2. Run `npx tsc --noEmit` to see the errors
3. Fix type errors using runtime conversions and type guards (no `as` casts)
4. Replace `any` parameter types with specific types where possible
5. Type `= {}` declarations as `Record<string, any>` for dynamic indexing
6. Run `npm run check` to verify

## Iteration 1

- Plans
  - Prefer `ini_get` usage at function callsites now that standalone dependency inlining is available.
  - Remove duplicated direct `$locutus.php.ini` global access from source functions.
  - Keep return/runtime behavior unchanged while narrowing local logic.
- Progress
  - Opened iteration and identified direct ini-read callsites in `src/php/**`.
  - Refactored `assert_options`, `is_array`, `parse_url`, `substr`, and `strlen` to use `ini_get`.
  - Removed duplicated `globalThis.$locutus.php.ini` access logic from these implementations.
  - Validated no remaining direct ini-global access patterns in `src/php/**` (`rg` check).
  - Ran checks: `corepack yarn lint:ts`, `corepack yarn test:util`, and targeted generated tests for all touched functions.
- Key learnings
  - Standalone mode de-risks helper dependencies, so code clarity can be prioritized over manual inlining.
  - Centralizing ini reads through `ini_get` makes behavior easier to reason about while preserving runtime parity.

## Iteration 2

- Plans
  - Expand `_phpTypes` into a reusable lattice (`PhpValue`, scalar/callable descriptors, numeric guards/assertions).
  - Thread generic callback typing through `_callbackResolver` and callback-heavy consumers.
  - Add debt policy ratchets for local `PhpValue` alias redefinitions and direct ini-global reads.
- Progress
  - Expanded `src/php/_helpers/_phpTypes.ts` with reusable lattice/types:
    - `PhpValue`, `PhpNullish`, `PhpScalar`, `PhpKey`, `NumericLike`, `StringLike`
    - generic `PhpCallable<TArgs, TResult>` and `PhpCallableDescriptor<TArgs, TResult>`
    - guards/assertions: `isPhpScalar`, `isNumericLike`, `isPhpCallable`, `assertIsObjectLike`, `assertIsPhpCallable`
  - Refactored `src/php/_helpers/_callbackResolver.ts` to use generic callable descriptors and typed callback scope.
  - Migrated callback-heavy callsites:
    - `array_map` narrowed callback input to `PhpCallableDescriptor<PhpMixed[], TResult> | null | undefined`
    - `call_user_func_array` now threads `<TArgs, TResult>` through resolver/guards
    - comparator users aligned to typed resolver (`array_udiff*`, `array_uintersect*`)
  - Removed several local `type PhpValue = {} | null | undefined` aliases in touched helper/callback paths by importing shared `PhpValue`.
  - Added policy ratchets in `scripts/check-ts-debt-policy.ts`:
    - local `PhpValue` alias redefinition count in `src/php/**` may not increase (excluding canonical `_phpTypes.ts`)
    - direct `$locutus?.php?.ini` reads in `src/php/**` may not increase
  - Reduced local `PhpValue` alias redefinitions from 47 to 35 (excluding `_phpTypes.ts`).
  - Validation passed:
    - `corepack yarn lint`
    - `corepack yarn lint:ts`
    - `corepack yarn lint:ts:debt:policy`
    - targeted vitest suites for helper/callback and affected array/funchand paths
- Key learnings
  - Moving callback semantics into shared generic helper types reduces repeated local alias churn.
  - Ratcheting policy on broad alias patterns keeps migration pressure high without requiring all-or-nothing rewrites.
  - Standalone dependency inlining plus stricter helper typing are complementary: we can centralize more behavior without fear of copy-paste breakage.

## Iteration 3

- Plans
  - Burn down remaining local `type PhpValue = {} | null | undefined` aliases in `src/php/array/**`.
  - Replace with shared `PhpValue` imports from `_phpTypes.ts`.
  - Ratchet debt-policy baseline down again and verify full checks.
- Progress
  - Removed all local `type PhpValue = {} | null | undefined` aliases from `src/php/array/**`.
  - Migrated affected array functions to import shared `PhpValue` from `src/php/_helpers/_phpTypes.ts`.
  - Reduced repository-wide local alias count (excluding `_phpTypes.ts`) from 35 to 11.
  - Lowered debt-policy ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_LOCAL_PHPVALUE_ALIAS`: `35 -> 11`
  - Validation passed:
    - `corepack yarn biome check --write docs/typescript.md src/php/array/*.ts`
    - `corepack yarn lint`
    - `corepack yarn lint:ts`
    - `corepack yarn lint:ts:debt:policy`
- Key learnings
  - Systematic alias removal works best as scoped directory passes (`array/**`, then next family), with ratchets tightened immediately after each pass.
  - Shared lattice imports (`PhpValue` from `_phpTypes.ts`) improve consistency and make follow-up narrowing safer.

## Iteration 4

- Plans
  - Remove all remaining local `type PhpValue = {} | null | undefined` aliases in non-array directories.
  - Migrate each file to shared `PhpValue` from `_phpTypes.ts`.
  - Ratchet debt policy to disallow any local aliases.
- Progress
  - Removed final local aliases from:
    - `src/php/var/{empty,var_export,var_dump,serialize,gettype,is_callable}.ts`
    - `src/php/strings/{implode,strtr,sprintf}.ts`
    - `src/php/json/json_encode.ts`
    - `src/php/bc/bccomp.ts`
  - Reduced repository-wide local alias count (excluding `_phpTypes.ts`) from `11 -> 0`.
  - Lowered debt-policy ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_LOCAL_PHPVALUE_ALIAS`: `11 -> 0`
- Key learnings
  - Once shared base types are in place, repo-wide alias burn-down becomes mostly mechanical and low-risk.
  - Keeping ratchets at the newly achieved floor prevents easy regression from opportunistic local aliases.

## Iteration 5

- Plans
  - Reduce cast-heavy flows in `src/php/var/**` by using runtime guards/shared helpers instead of local `as` assertions.
  - Add a debt ratchet for `as`-expression usage in `src/php/var/**`.
- Progress
  - Refactored `src/php/var/{empty,var_export,serialize,gettype,var_dump}.ts` to remove targeted local `as` casts and lean on `Reflect`/`toPhpArrayObject`-based narrowing.
  - Added debt-policy ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_VAR_AS_EXPRESSION = 5` (current floor, must not increase).
- Key learnings
  - In dynamic ports, replacing casts with guard-driven reads (`Reflect.get`, helper conversion) preserves behavior while improving local type soundness.
  - Ratcheting cast usage by directory is a practical bridge between permissive legacy code and strict long-term type goals.

## Iteration 6

- Plans
  - Continue cast burn-down in array sorting family while preserving runtime behavior.
  - Remove remaining direct global ini reads in untouched array sort helpers.
  - Add a debt ratchet for `as`-expression usage in `src/php/array/**`.
- Progress
  - Refactored `src/php/array/{natsort,natcasesort,shuffle}.ts`:
    - replaced direct global ini reads with `ini_get('locutus.sortByReference')`.
    - removed redundant `as` assertions in collection/repopulation flows.
    - narrowed `natsort`/`natcasesort` value generic to `T extends string | number` to reflect natural string comparison semantics.
  - Added debt-policy ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_ARRAY_AS_EXPRESSION = 48` (new floor, must not increase).
  - Reduced `src/php/array/**` `as`-expression count from `58 -> 48`.
- Key learnings
  - Converting legacy global lookups to typed `ini_get` reads removes casts and improves standalone consistency simultaneously.
  - Directory-level cast ratchets create momentum: each focused cleanup pass can lock in gains immediately.

## Iteration 7

- Plans
  - Continue reducing high-cast array hotspots after Iteration 6.
  - Keep parser/build constraints intact (function header comments must remain parseable by tooling).
- Progress
  - Refactored `src/php/array/array_pop.ts` to remove all local `as` assertions using direct `Array.isArray` narrowing and guarded object-key reads.
  - Attempted overload-based tightening in `array_slice`, then reverted to parser-compatible single-signature shape after `test:languages` parse failure.
  - Lowered debt-policy ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_ARRAY_AS_EXPRESSION`: `48 -> 43`
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Type strictness improvements must respect codegen/header-parser assumptions; overload-heavy signatures can violate tooling expectations even when TypeScript is valid.
  - Cast burn-down still progresses effectively with targeted function-level refactors (`array_pop`) plus immediate ratchet updates.

## Iteration 8

- Plans
  - Continue array cast burn-down with small, behavior-preserving refactors in comparator/sort helpers.
  - Reduce assertions by replacing raw casts with callable guards and undefined checks.
- Progress
  - Refactored `src/php/array/uksort.ts`:
    - replaced string sorter cast with `isPhpCallable<[string, string], number>` guard.
    - removed value casts in rebuild loops using guarded indexed reads.
  - Lowered debt-policy ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_ARRAY_AS_EXPRESSION`: `43 -> 40`
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Callable guards are a low-friction way to remove dynamic function casts while preserving runtime flexibility.
  - The best momentum pattern remains: small cast-removal pass, immediate ratchet tighten, then repeat.

## Iteration 9

- Plans
  - Continue reducing `as` assertions in high-frequency array mutation helpers without changing tsconfig.
  - Prefer guard-driven indexed access and structural reads over casts.
- Progress
  - Refactored `src/php/array/array_splice.ts`:
    - removed replacement-item casts in `toReplacementItems`.
    - replaced casted length access with `Object.keys(arr).length` for associative input.
  - Lowered debt-policy ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_ARRAY_AS_EXPRESSION`: `40 -> 37`
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Generic helper branches (`ReplacementValue<T>`) often allow cast removal with better control-flow narrowing than expected.
  - Repeated ratchet-tighten loops keep the branch moving steadily toward narrower, assertion-light implementations.

## Iteration 10

- Plans
  - Keep attacking `src/php/array/**` cast hotspots while preserving parser/test harness constraints.
  - Replace casted callback resolution with shared callable guards.
  - Tighten the array cast debt ratchet immediately after each successful pass.
- Progress
  - Refactored `src/php/array/array_slice.ts`:
    - removed generic default cast (`false as TPreserve`) and local object-cast branching.
    - collapsed multi-branch cast returns into a single final return cast.
  - Refactored `src/php/array/array_reverse.ts`:
    - removed generic default cast and reduced to single boundary cast.
  - Refactored `src/php/array/{usort,uasort}.ts`:
    - replaced method casts with `isPhpCallable<[T, T], number>` guard-based resolution.
  - Refactored `src/php/array/{ksort,krsort}.ts`:
    - removed remaining `as T` value casts in rebuild loops using guarded indexed reads.
  - Lowered debt-policy ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_ARRAY_AS_EXPRESSION`: `37 -> 21`
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Shared guard primitives (`isPhpCallable`) remove cast pressure in callback-heavy code without widening signatures.
  - Large cast-count reductions are possible without tsconfig changes by focusing on repetitive sort/rebuild patterns.

## Iteration 11

- Plans
  - Continue lowering `src/php/array/**` cast debt with low-risk guard/control-flow rewrites.
  - Prioritize helpers with repeated cast patterns (`array_filter`, `count`, key-transform paths).
- Progress
  - Refactored `src/php/array/array_filter.ts` to branch on array/object and use `Object.entries`-driven flows without local casts.
  - Refactored `src/php/array/count.ts`:
    - split array/object iteration paths to avoid casted indexing.
    - introduced `isCountable` guard for recursive traversal.
  - Refactored `src/php/array/array_change_key_case.ts`:
    - replaced cast helper pattern with single boundary cast return.
    - switched source normalization to `toPhpArrayObject`.
  - Lowered debt-policy ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_ARRAY_AS_EXPRESSION`: `21 -> 16`
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - `Object.entries` plus explicit branch splits can remove assertion-heavy indexed access while preserving behavior.
  - Small, repeatable cleanup slices continue to produce meaningful debt-ratchet gains even late in the migration.

## Iteration 12

- Plans
  - Continue cast cleanup in low-complexity traversal helpers without tsconfig changes.
  - Keep callback signature compatibility for generated type-signature tests.
- Progress
  - Refactored `src/php/array/each.ts` to remove function-property cast via `Reflect.get(each, 'returnArrayOnly')`.
  - Refactored `src/php/array/in_array.ts` to remove casted haystack projection by explicit array/object branches.
  - Refactored `src/php/array/array_walk.ts` to remove casted `Object.entries` tuple typing.
  - Lowered debt-policy ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_ARRAY_AS_EXPRESSION`: `16 -> 13`
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Branching on structural variants (`Array.isArray`) is a reliable way to eliminate boundary casts with minimal behavioral risk.
  - Type-signature tests are a useful guardrail against over-widening callback-heavy APIs during cleanup.

## Iteration 13

- Plans
  - Continue removing remaining assertion-heavy loops in `src/php/array/**` with behavior-preserving refactors.
  - Prefer shared typed helpers over repeated local tuple casts.
- Progress
  - Added `entriesOfPhpAssoc<T>()` in `src/php/_helpers/_phpTypes.ts` for typed associative iteration.
  - Refactored `src/php/array/{array_diff,array_diff_assoc,array_diff_key,array_intersect,array_intersect_assoc,array_intersect_key,array_unique}.ts` to use typed-entry iteration and remove local tuple/index casts.
  - Refactored `src/php/array/array_walk_recursive.ts` callback invocation to use `Reflect.apply(...)`, removing local value casts.
  - Lowered debt-policy ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_ARRAY_AS_EXPRESSION`: `13 -> 4`
  - Validation passed:
    - `corepack yarn check`
    - `corepack yarn lint:ts:debt:policy`
- Key learnings
  - Centralized typed-entry helpers remove repetitive cast patterns and avoid `T | undefined` indexed-access regressions.
  - Deep ratchet drops become practical once helper primitives are in place and reused across similar algorithms.

## Iteration 14

- Plans
  - Keep pushing cast elimination in high-dynamic code (`var/**`) without changing tsconfig.
  - Remove low-value assertion residue in `array/**` where possible, then ratchet immediately.
- Progress
  - Refactored `src/php/var/is_array.ts`:
    - replaced direct casts with `hasNumericLength` guard and `Reflect.get` constructor access.
  - Refactored `src/php/var/is_callable.ts`:
    - removed global-context cast by using `globalThis`/`Reflect.set` with record-typed lookup flow.
  - Refactored `src/php/var/unserialize.ts`:
    - replaced cache-function assertion with `Object.assign` typed construction.
    - removed array-item object assertion by keeping `UnserializedObject` as canonical mutable accumulator.
  - Refactored `src/php/array/array_multisort.ts`:
    - removed `as const` flag assertion via explicit readonly type annotation.
  - Lowered debt-policy ratchets in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_VAR_AS_EXPRESSION`: `5 -> 0`
    - `MAX_SRC_PHP_ARRAY_AS_EXPRESSION`: `4 -> 3`
  - Validation passed:
    - `corepack yarn check`
    - `corepack yarn lint:ts:debt:policy`
- Key learnings
  - Guard-based narrowing (`Reflect.get` + typed predicates) is enough to eliminate most legacy `as` usage in dynamic PHP ports.
  - Zero-cast policy for `var/**` is achievable incrementally when helper construction patterns are tightened.

## Iteration 15

- Plans
  - Start strictness expansion beyond `array/**` and `var/**` into `strings/**`.
  - Prioritize low-risk cast removals that preserve runtime behavior and generated test expectations.
- Progress
  - Refactored `src/php/strings/implode.ts` to remove argument-shape cast and keep glue/pieces flow explicit.
  - Refactored `src/php/strings/count_chars.ts` to remove mixed-value result map cast by splitting mode-specific flows.
  - Refactored `src/php/strings/{htmlspecialchars,htmlspecialchars_decode}.ts`:
    - replaced `as const` flags with explicit readonly object typing.
    - removed quote-style numeric casts via `resolvedQuoteStyle` narrowing.
  - Added a new strings debt ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_STRINGS_AS_EXPRESSION = 8`
  - Reduced `src/php/strings/**` `as`-expression count:
    - `14 -> 8`
  - Validation passed:
    - `corepack yarn lint:ts:debt:policy`
    - `corepack yarn check`
- Key learnings
  - Cast-removal momentum remains high when we separate mode-specific return paths instead of relying on mixed intermediate objects.
  - Adding new directory-level ratchets as soon as a first reduction lands keeps strictness gains from slipping back.

## Iteration 16

- Plans
  - Keep reducing `strings/**` cast debt by removing remaining global-context boundary casts where runtime guards are sufficient.
  - Tighten the new strings ratchet immediately after each successful drop.
- Progress
  - Refactored `src/php/strings/strcoll.ts` to replace global-context cast access with `Reflect.get` guarded lookups.
  - Refactored `src/php/strings/strtok.ts` to use guarded global bag init (`Reflect.get`/`Reflect.set`) instead of typed global casts.
  - Refactored `src/php/strings/localeconv.ts` to read locale groups via guarded reflective access without global/context assertions.
  - Lowered strings debt ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_STRINGS_AS_EXPRESSION`: `8 -> 5`
  - Reduced `src/php/strings/**` `as`-expression count:
    - `8 -> 5`
  - Validation passed:
    - `corepack yarn check`
    - `corepack yarn lint:ts:debt:policy`
- Key learnings
  - Reflective guarded access can remove global-context casting pressure while preserving runtime behavior in legacy ported functions.
  - Short, targeted passes continue to produce meaningful debt reductions even after introducing a new directory ratchet.

## Iteration 17

- Plans
  - Continue reducing the remaining `strings/**` cast hotspots without widening public signatures.
  - Prioritize single-cast files first to keep iteration risk low.
- Progress
  - Refactored `src/php/strings/money_format.ts` global runtime lookup from casted global context to guarded reflective access.
  - Lowered strings debt ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_STRINGS_AS_EXPRESSION`: `5 -> 4`
  - Reduced `src/php/strings/**` `as`-expression count:
    - `5 -> 4`
  - Validation passed:
    - `corepack yarn check`
    - `corepack yarn lint:ts:debt:policy`
- Key learnings
  - Even complex formatting functions can drop boundary casts safely when runtime bag access is normalized through explicit guards.

## Iteration 18

- Plans
  - Keep chipping away at the remaining `strings/**` cast surfaces while preserving locale behavior.
  - Focus on single-cast callsites before attempting larger parser-heavy rewrites.
- Progress
  - Refactored `src/php/strings/nl_langinfo.ts` global context initialization to guarded reflective access.
  - Added explicit locale-shape guards (`isLocaleTime`, `isLocaleData`) to preserve safe narrowed reads after removing the cast.
  - Lowered strings debt ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_STRINGS_AS_EXPRESSION`: `4 -> 3`
  - Reduced `src/php/strings/**` `as`-expression count:
    - `4 -> 3` (remaining cast-only hotspot: `parse_str.ts`)
  - Validation passed:
    - `corepack yarn check`
    - `corepack yarn lint:ts:debt:policy`
- Key learnings
  - A small runtime-shape guard layer is enough to remove context casts without sacrificing type-safe property access in locale-heavy functions.

## Iteration 19

- Plans
  - Eliminate the last `strings/**` cast hotspot (`parse_str.ts`) to complete the strings cast burn-down.
  - Immediately ratchet strings cast policy to zero after successful refactor and validation.
- Progress
  - Refactored `src/php/strings/parse_str.ts`:
    - replaced casted global/context target setup with guarded reflective access.
    - replaced casted nested object indexing with `Reflect.get`/`Reflect.set` object-container flow.
  - Lowered strings debt ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_STRINGS_AS_EXPRESSION`: `3 -> 0`
  - Reduced `src/php/strings/**` `as`-expression count:
    - `3 -> 0`
  - Validation passed:
    - `corepack yarn check`
    - `corepack yarn lint:ts:debt:policy`
- Key learnings
  - Reflective container updates are a practical pattern for removing final cast residue in highly dynamic parser-style ports.
  - Reaching a zero-floor ratchet per directory is feasible with iterative, behavior-preserving rewrites.

## Iteration 20

- Plans
  - Expand cast burn-down into `ctype/**` without tsconfig changes.
  - Add a dedicated debt ratchet for `src/php/ctype/**` cast usage.
- Progress
  - Added `src/php/_helpers/_ctypePattern.ts` to centralize guarded LC_CTYPE regex lookup.
  - Refactored all `src/php/ctype/ctype_*.ts` functions to use `getCtypePattern(...)` and removed local/global cast-based runtime access.
  - Extended `scripts/check-ts-debt-policy.ts` with:
    - `MAX_SRC_PHP_CTYPE_AS_EXPRESSION = 0`
    - enforcement and findings output for `src/php/ctype/**` cast expressions.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - A tiny shared runtime accessor can remove repeated cast-heavy dynamic lookups across an entire category.
  - New directory ratchets are easiest to land when paired with a helper-first refactor that collapses repeated patterns.

## Iteration 21

- Plans
  - Remove remaining cast-based global/runtime access in `src/php/info/**`.
  - Add a dedicated `info/**` cast ratchet to lock improvements.
- Progress
  - Refactored `src/php/info/set_time_limit.ts` to replace casted global runtime access with guarded `Reflect.get`/`Reflect.set` flow.
  - Refactored `src/php/info/getenv.ts` to remove global/process cast and use reflective guarded reads.
  - Refactored `src/php/info/ini_set.ts` to replace `entry.local_value` cast with explicit `IniValue` guards.
  - Extended `scripts/check-ts-debt-policy.ts` with:
    - `MAX_SRC_PHP_INFO_AS_EXPRESSION = 0`
    - enforcement and findings output for `src/php/info/**` cast expressions.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Reflective guarded access removes cast pressure in runtime/global boundary code without tsconfig changes.
  - Small type guards are enough to replace return-value casts even in coercion-heavy ini paths.

## Iteration 22

- Plans
  - Remove remaining cast hotspots in `src/php/_helpers/**` to tighten foundational runtime helpers.
  - Add a dedicated `_helpers/**` cast ratchet to keep helper-level strictness locked.
- Progress
  - Refactored `src/php/_helpers/_arrayPointers.ts` to remove casted pointer target and casted cursor-entry returns.
  - Refactored `src/php/_helpers/_callbackResolver.ts` to replace casted global callback/scope lookups with reflective guarded reads.
  - Refactored `src/php/_helpers/_phpRuntimeState.ts` to replace casted global runtime setup with shared reflective initialization.
  - Refactored `src/php/_helpers/_phpTypes.ts` to remove casted `Object.entries` helper return typing.
  - Extended `scripts/check-ts-debt-policy.ts` with:
    - `MAX_SRC_PHP_HELPERS_AS_EXPRESSION = 0`
    - enforcement and findings output for `src/php/_helpers/**` cast expressions.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Tightening shared helper surfaces gives broad strictness gains with low regression risk when behavior is preserved.
  - Reflective initialization and callback resolution patterns scale well across dynamic runtime boundaries without relying on assertions.

## Iteration 23

- Plans
  - Remove remaining cast hotspots in `src/php/url/**` and lock that area with a ratchet.
  - Keep helper-generated tests deterministic after runtime helper tightening.
- Progress
  - Refactored `src/php/url/base64_decode.ts` and `src/php/url/base64_encode.ts` to replace casted global Buffer/atob/btoa access with guarded reflective paths.
  - Refactored `src/php/url/http_build_query.ts` to remove casted object projections by splitting array/object traversal flows.
  - Refactored `src/php/url/parse_url.ts` to remove parser-mode key cast via explicit mode narrowing.
  - Extended `scripts/check-ts-debt-policy.ts` with:
    - `MAX_SRC_PHP_URL_AS_EXPRESSION = 0`
    - enforcement and findings output for `src/php/url/**` cast expressions.
  - Stabilized generated helper test behavior:
    - changed `_ctypePattern` example to a guaranteed-missing key and updated `test/generated/php/_helpers/_ctypePattern.vitest.ts` accordingly.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Reflective access plus explicit mode/shape branching removes most global/runtime casts without changing public API signatures.
  - Generated example tests should avoid state-dependent values to remain stable as runtime typing gets stricter.

## Iteration 24

- Plans
  - Eliminate remaining cast sites in `src/php/funchand/**` and `src/php/json/**`.
  - Add explicit debt ratchets for both folders once cast count reaches zero.
- Progress
  - Refactored `src/php/funchand/{call_user_func_array,create_function,function_exists,get_defined_functions}.ts` to remove casted global/callable handling and use reflective access or typed wrappers.
  - Refactored `src/php/json/{json_decode,json_encode,json_last_error}.ts` to remove casted global runtime access and casted parse/eval results.
  - Extended `scripts/check-ts-debt-policy.ts` with:
    - `MAX_SRC_PHP_FUNCHAND_AS_EXPRESSION = 0`
    - `MAX_SRC_PHP_JSON_AS_EXPRESSION = 0`
    - enforcement + findings output for both folders.
  - Reduced cast-expression counts:
    - `src/php/funchand/**: 5 -> 0`
    - `src/php/json/**: 5 -> 0`
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Reflective global access plus callable guards removes most dynamic-boundary casts without changing runtime semantics.
  - Generic return casts in parser-style helpers can be avoided by letting JS runtime boundaries flow through as-is and relying on call-site typing.

## Iteration 25

- Plans
  - Remove remaining cast sites in `src/php/datetime/**`.
  - Add a dedicated `datetime/**` cast ratchet at zero.
- Progress
  - Refactored `src/php/datetime/{date,gmmktime,mktime,strftime,strptime,strtotime}.ts` to remove casted formatter/global/result handling and replace with explicit tuple typing, reflective runtime guards, and typed object construction.
  - Extended `scripts/check-ts-debt-policy.ts` with:
    - `MAX_SRC_PHP_DATETIME_AS_EXPRESSION = 0`
    - enforcement + findings output for `src/php/datetime/**`.
  - Stabilized type-signature test order dependence by setting `ini_set('locutus.objectsAsArrays', 'on')` in `test/util/type-signatures.vitest.ts`.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Date/time ports with dynamic globals can be moved to guarded reflective access without changing runtime parity.
  - Ratcheting by folder keeps incremental strictness work measurable and regression-resistant.

## Iteration 26

- Plans
  - Eliminate remaining cast hotspots in `src/php/{xdiff,array,bc,filesystem,misc,pcre}/**`.
  - Ratchet these folders to zero cast expressions in debt policy.
- Progress
  - Refactored:
    - `src/php/xdiff/xdiff_string_patch.ts` to replace regex metadata/flag casts with guarded reflective access.
    - `src/php/array/{array_slice,array_change_key_case,array_reverse}.ts` to remove return casts and preserve typed call-site relations.
    - `src/php/bc/bccomp.ts` to remove casted `bc()` facade typing.
    - `src/php/filesystem/pathinfo.ts` to remove option-key return cast.
    - `src/php/misc/uniqid.ts` and `src/php/pcre/sql_regcase.ts` to replace global-context casts with guarded reflective runtime access.
  - Extended `scripts/check-ts-debt-policy.ts` with zero-floor ratchets for:
    - `src/php/bc/**`
    - `src/php/filesystem/**`
    - `src/php/misc/**`
    - `src/php/pcre/**`
    - `src/php/xdiff/**`
  - Lowered `MAX_SRC_PHP_ARRAY_AS_EXPRESSION` from `3 -> 0`.
  - Updated parser support in `src/_util/util.ts` to ignore export overload signatures without bodies, so type-rich overloads remain compatible with generation scripts.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Overload-friendly source parsing is necessary once stricter type modeling relies on declaration signatures.
  - Frontier cleanup is fastest when each directory gets both a cast removal pass and an immediate zero-floor ratchet.

## Iteration 27

- Plans
  - Add a public API quality gate for broad exported signature types (`object`, `{}`, and missing return types).
  - Add deterministic API snapshot checking in CI so exported signature changes are always explicit.
- Progress
  - Extended `scripts/check-ts-debt-policy.ts` with new exported-signature gates for `src/php/**` (excluding `_helpers/**`):
    - `MAX_SRC_PHP_EXPORTED_OBJECT_KEYWORD = 0`
    - `MAX_SRC_PHP_EXPORTED_EMPTY_OBJECT_TYPE = 0`
    - `MAX_SRC_PHP_EXPORTED_FUNCTION_WITHOUT_RETURN_TYPE = 0`
  - Refactored exported signatures to satisfy zero-floor gate:
    - `src/php/info/ini_set.ts` replaced raw `{}` in `IniValue` with recursive named object/list types.
    - `src/php/var/is_object.ts` removed `object` predicate in favor of associative-object predicate.
    - added explicit return types in `src/php/{datetime/time,math/getrandmax,math/lcg_value,math/mt_getrandmax,math/pi,strings/echo}.ts`.
  - Added API signature snapshot tool:
    - `scripts/check-api-signature-snapshot.ts`
    - snapshot file: `docs/php-api-signatures.snapshot`
    - scripts:
      - `lint:api:snapshot`
      - `fix:api:snapshot`
  - Wired snapshot check into local and CI pipelines:
    - `package.json` `check` now includes `lint:api:snapshot`
    - `.github/workflows/ci.yml` now runs `corepack yarn lint:api:snapshot`
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Narrowing exported signatures is tractable when enforced by AST-level debt gates and cleaned in small batches.
  - Snapshot-gating declared signatures makes type evolution intentional and prevents accidental API drift under broad refactors.

## Iteration 28

- Plans
  - Include `src/php/_helpers/**` in exported runtime signature quality gates.
  - Keep the gate scope strict but pragmatic by checking exported runtime APIs (functions/vars) and leaving exported type declarations for a later dedicated pass.
- Progress
  - Updated `scripts/check-ts-debt-policy.ts`:
    - removed `_helpers/**` exclusion from exported-signature gate counting.
    - scoped broad-marker counting to exported runtime APIs only.
  - Refactored helper signatures to satisfy zero-floor broad-type constraints:
    - `src/php/_helpers/_bc.ts`:
      - split implementation to `createBcLibrary()`.
      - exported `_bc()` now has explicit return type `ReturnType<typeof createBcLibrary>`.
      - narrowed internal `cint` arg type to `PhpValue`.
    - `src/php/_helpers/_phpTypes.ts`:
      - `isObjectLike()` now narrows to `PhpArrayLike<PhpValue>`.
      - `assertIsObjectLike()` now asserts `PhpArrayLike<PhpValue>`.
  - Updated `docs/php-api-signatures.snapshot` for new helper export signatures.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Pulling `_helpers` under the same exported-runtime gate is feasible when helper exports are made explicit instead of inferred.
  - Keeping gate scope on runtime exports avoids blocking on legitimate type-alias lattice redesign work and preserves forward momentum.

## Iteration 29

- Plans
  - Narrow callback-heavy `array_u*` exported signatures with explicit tuple shapes and typed callback descriptors.
  - Preserve runtime behavior while strengthening input/output type relations.
- Progress
  - Tightened signatures in:
    - `src/php/array/array_udiff.ts`
    - `src/php/array/array_udiff_assoc.ts`
    - `src/php/array/array_udiff_uassoc.ts`
    - `src/php/array/array_uintersect.ts`
    - `src/php/array/array_uintersect_uassoc.ts`
  - Improvements made:
    - Required at least one compare-array argument in rest tuples before callback(s).
    - Typed callback parameters using `PhpCallableDescriptor` tuple descriptors.
    - Propagated `arr1` value type through return type via `PhpAssoc<T>`.
    - Replaced `for..in` index access with `entriesOfPhpAssoc(...)` to keep strict-next inference narrow and avoid undefined index widening.
  - Updated `docs/php-api-signatures.snapshot` to reflect narrowed public signatures.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Variadic tuple rest parameters deliver strong callback API narrowing without touching runtime code paths.
  - `entriesOfPhpAssoc(...)` is a reliable pattern to avoid strict-next `index signature -> T | undefined` friction in generic object loops.

## Iteration 30

- Plans
  - Tighten callback entrypoints in `funchand` so callable APIs no longer accept unconstrained `PhpValue`.
  - Keep runtime fallback behavior unchanged while narrowing the public TS surface.
- Progress
  - Narrowed callback parameter types:
    - `src/php/funchand/call_user_func.ts`: `cb` now `PhpCallableDescriptor<TArgs, TResult>`.
    - `src/php/funchand/call_user_func_array.ts`: `cb` now `PhpCallableDescriptor<TArgs, TResult>`.
  - Updated imports in `call_user_func_array.ts` to include `PhpCallableDescriptor`.
  - Updated `docs/php-api-signatures.snapshot` to track the narrowed exported signatures.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Callable boundary narrowing in entrypoint functions yields immediate API quality gains with minimal blast radius because runtime fallback machinery already enforces descriptor semantics.

## Iteration 31

- Plans
  - Apply the same callback-tuple narrowing pattern to `array_diff_ukey`, `array_diff_uassoc`, `array_intersect_ukey`, and `array_intersect_uassoc`.
  - Preserve value-type propagation from `arr1` while avoiding strict-next index-access widening.
- Progress
  - Tightened signatures in:
    - `src/php/array/array_diff_uassoc.ts`
    - `src/php/array/array_diff_ukey.ts`
    - `src/php/array/array_intersect_uassoc.ts`
    - `src/php/array/array_intersect_ukey.ts`
  - Improvements made:
    - required at least one compare-array argument before callback via variadic tuple rest params.
    - typed key callback as `PhpCallableDescriptor<[string, string], PhpValue>`.
    - propagated `arr1` value type to return type via generic `PhpAssoc<T>`.
    - replaced `for..in` index access with `entriesOfPhpAssoc(...)` loops.
  - Updated `docs/php-api-signatures.snapshot` for the narrowed API surface.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - The tuple-rest + typed-descriptor pattern scales across the remaining callback families with low risk and consistent inference improvements.

## Iteration 32

- Plans
  - Tighten callback helper boundaries in `_helpers/_callbackResolver.ts`.
  - Remove broad callback union from `array_walk` exported signature.
- Progress
  - Narrowed `resolvePhpCallable` input from `PhpCallableDescriptor | PhpValue` to `PhpCallableDescriptor` in `src/php/_helpers/_callbackResolver.ts`.
  - Added `isPhpCallableDescriptorValue(...)` guard and used it in `resolveNumericComparator` so invalid scalar callbacks fail early while preserving runtime behavior.
  - Narrowed `array_walk` callback parameter in `src/php/array/array_walk.ts` from `ArrayWalkCallback | PhpValue` to `ArrayWalkCallback`.
  - Updated `docs/php-api-signatures.snapshot` for the narrowed helper and array callback signatures.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Boundary helpers can be narrowed safely when guarded conversion remains inside the implementation.
  - Tight callback typing in exported APIs improves call-site inference and removes accidental permissiveness with low runtime risk.

## Iteration 33

- Plans
  - Remove small remaining permissive signature artifacts with zero runtime impact.
- Progress
  - Narrowed `ArrayWalkRecursiveCallback` return type in `src/php/array/array_walk_recursive.ts` from `PhpValue` to `void` (return value is ignored in runtime flow).
  - Simplified `src/php/var/is_callable.ts` return type from `boolean | false` to `boolean`.
  - Updated `docs/php-api-signatures.snapshot`.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Finishing small redundant unions in public signatures compounds API clarity and lowers accidental widening noise for consumers.

## Iteration 34

- Plans
  - Tighten callback/array-shape relations in `array_map`.
  - Narrow `array_walk_recursive` and `array_replace_recursive` exported inputs to more meaningful shapes.
- Progress
  - `src/php/array/array_map.ts`
    - added overloads separating callable and null-callback behavior.
    - introduced `ArrayMapInputs` tuple type to require at least one input array.
  - `src/php/array/array_walk_recursive.ts`
    - narrowed `array` parameter from `PhpValue` to `PhpValue[] | PhpAssoc<PhpValue>`.
  - `src/php/array/array_replace_recursive.ts`
    - narrowed first parameter to `RecursiveReplaceTarget`.
    - required at least one replacement via tuple rest:
      - `[replacement: PhpValue, ...additionalReplacements: PhpValue[]]`.
  - Updated `docs/php-api-signatures.snapshot` for these narrowed signatures.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Overloads plus tuple-rest input constraints provide strong API narrowing without runtime churn.
  - Requiring minimum variadic arguments in signatures turns runtime error contracts into compile-time guarantees.

## Iteration 35

- Plans
  - Encode tighter callback-to-input relations for `array_map` without changing runtime behavior.
  - Further narrow internal replace-target helper types in `array_replace_recursive`.
- Progress
  - `src/php/array/array_map.ts`
    - added 1-array overloads:
      - callback mode: `PhpCallableDescriptor<[TValue | undefined], TResult>`
      - null-callback mode: `Array<[TValue | undefined]>`
    - added 2-array overloads:
      - callback mode: `PhpCallableDescriptor<[TLeft | undefined, TRight | undefined], TResult>`
      - null-callback mode: `Array<[TLeft | undefined, TRight | undefined]>`
    - kept existing variadic fallback overloads for broader compatibility.
  - `src/php/array/array_replace_recursive.ts`
    - narrowed `cloneReplaceTarget()` parameter from `PhpValue` to `RecursiveReplaceTarget`.
    - simplified object clone path to direct spread now that input shape is explicit.
  - Updated `docs/php-api-signatures.snapshot`.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Targeted overloads on high-traffic APIs can materially improve inference for common usage patterns while preserving legacy-compatible fallback signatures.

## Iteration 36

- Plans
  - Tighten remaining broad parameters in array helpers where runtime behavior is already deterministic.
  - Keep all changes compatible with strict-next and existing runtime tests.
- Progress
  - `src/php/array/array_replace_recursive.ts`
    - narrowed replacements to recursive object/array targets:
      - `...replacements: [replacement: RecursiveReplaceTarget, ...additionalReplacements: RecursiveReplaceTarget[]]`
    - refined recursive merge branch to recurse only when both current and incoming values are object-like.
    - propagated `RecursiveReplaceValue` through `toPhpArrayObject<...>` calls for stronger local inference.
  - `src/php/array/array_search.ts`
    - narrowed strictness flag type:
      - `argStrict?: boolean`
  - Updated `docs/php-api-signatures.snapshot`.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Type narrowing can surface and codify intended recursive semantics (object-like + object-like recursion) while keeping behavior stable for supported input shapes.

## Iteration 37

- Plans
  - Tighten remaining callback descriptor boundaries in helper and sort APIs.
  - Remove tuple-index widening friction in `array_u*` implementations without casts.
  - Narrow boolean control-flag semantics in `var_export`.
- Progress
  - `src/php/_helpers/_callbackResolver.ts`
    - narrowed `resolveNumericComparator()` callback parameter to:
      - `PhpCallableDescriptor<[TLeft, TRight], PhpValue>`
    - removed now-redundant local descriptor guard helper.
  - `src/php/_helpers/_phpTypes.ts`
    - added shared guard:
      - `isPhpCallableDescriptor<TArgs, TResult>(value): value is PhpCallableDescriptor<TArgs, TResult>`
  - `src/php/array/{array_udiff,array_udiff_assoc,array_udiff_uassoc,array_uintersect,array_uintersect_uassoc,array_diff_uassoc,array_diff_ukey,array_intersect_uassoc,array_intersect_ukey}.ts`
    - replaced brittle callback extraction with strict guards using `at(-1)/at(-2)` + `isPhpCallableDescriptor(...)`.
    - preserved runtime behavior while removing strict-next union leakage (`undefined`/`null`) into comparator resolver calls.
  - `src/php/array/{uasort,usort,uksort}.ts`
    - narrowed `sorter` parameter to `PhpCallableDescriptor` tuple model.
    - removed permissive `string[]` sorter surface and aligned tuple resolution with callable descriptor semantics.
  - `src/php/var/var_export.ts`
    - narrowed `boolReturn` to boolean overloads (`true` => returns value, omitted/false => returns `null`).
    - updated recursive internal call to pass `true` explicitly.
  - Updated `docs/php-api-signatures.snapshot` for intentional exported API changes.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - A shared descriptor guard in the type helper layer unlocks broad strictness wins across multiple callback-heavy families with minimal runtime churn.
  - Tightening sort callback signatures to descriptor tuples removes permissive legacy unions while remaining compatible with existing callable resolution patterns.

## Iteration 38

- Plans
  - Remove redundant `boolean | false` return unions where parameter typing already guarantees boolean-only intent.
  - Keep runtime guard branches intact for JS callers while narrowing TypeScript signatures.
- Progress
  - Narrowed return types from `boolean | false` to `boolean` in:
    - `src/php/array/array_key_exists.ts`
    - `src/php/ctype/ctype_alnum.ts`
    - `src/php/ctype/ctype_alpha.ts`
    - `src/php/ctype/ctype_cntrl.ts`
    - `src/php/ctype/ctype_digit.ts`
    - `src/php/ctype/ctype_graph.ts`
    - `src/php/ctype/ctype_lower.ts`
    - `src/php/ctype/ctype_print.ts`
    - `src/php/ctype/ctype_punct.ts`
    - `src/php/ctype/ctype_space.ts`
    - `src/php/ctype/ctype_upper.ts`
    - `src/php/ctype/ctype_xdigit.ts`
  - Updated `docs/php-api-signatures.snapshot`.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Redundant false unions are a low-risk, high-volume cleanup pattern that improves API clarity and completion quality without runtime churn.

## Iteration 39

- Plans
  - Tighten variadic callback typing in `array_map` so declared callback args reflect runtime `undefined` padding.
- Progress
  - `src/php/array/array_map.ts`
    - added `ArrayMapCallbackArgsVariadic = Array<PhpMixed | undefined>`.
    - narrowed variadic callback overloads and implementation callback type from `PhpMixed[]` to `ArrayMapCallbackArgsVariadic`.
    - aligned `resolvePhpCallable` generic argument and internal `args` arrays with the new variadic callback arg type.
  - Updated `docs/php-api-signatures.snapshot`.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Encoding optionality in variadic callback argument tuples prevents silent unsoundness and materially improves callback-site inference for uneven input arrays.

## Iteration 40

- Plans
  - Improve `array_filter` API precision with overloads that preserve container shape and support type-predicate callbacks.
- Progress
  - `src/php/array/array_filter.ts`
    - added overloads for:
      - array input + predicate callback => narrowed array output.
      - associative-object input + predicate callback => narrowed associative output.
      - array/object input with regular callback => same-shape output.
    - normalized object side to `PhpAssoc<T>` instead of inline object literal types.
  - Updated `docs/php-api-signatures.snapshot`.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Type-predicate overloads deliver stronger consumer-side narrowing at near-zero runtime risk when implementation behavior already preserves container shape.

## Iteration 41

- Plans
  - Remove legacy Node runtime flags from CI/tooling (`--experimental-strip-types`, `--disable-warning=MODULE_TYPELESS_PACKAGE_JSON`).
  - Switch project runtime metadata to explicit ESM while preserving published CommonJS compatibility.
  - Clean temporary root artifacts.
- Progress
  - Updated `package.json`:
    - added `"type": "module"`.
    - removed strip-type/typeless-warning flags from script invocations.
    - reordered `build:dist` to copy package metadata before post-processing.
  - Updated CI:
    - `.github/workflows/ci.yml` engine guard now runs `node scripts/check-engine-bump.ts` without flags.
  - Updated dist post-processing:
    - `scripts/fix-cjs-exports.ts` now sets `dist/package.json` to `"type": "commonjs"` (and ensures `main`) to keep `require(...)` behavior stable after root ESM switch.
  - Updated tests:
    - `test/util/fix-cjs-exports.vitest.ts` now invokes Node script directly without legacy flags.
  - Compatibility follow-up:
    - replaced `Array.prototype.at(...)` usage in callback-heavy `array_u*` files with index-based access (`length - 1/-2`) so `tsconfig.build` target (`ES2020`) still compiles.
  - Updated release notes:
    - `.changeset/typescript-migration.md` now states root tooling ESM + dist CommonJS compatibility.
  - Cleaned root artifacts:
    - removed `strlen-page-current.png`
    - removed `strlen-tabs-js.png`
    - removed `strlen-tabs-ts.png`
    - removed `strlen-tabs-view.png`
  - Validation passed:
    - `corepack yarn check`
    - `corepack yarn test:module`
- Key learnings
  - Root-level ESM ergonomics and warning removal can be adopted without disrupting CommonJS consumers by explicitly pinning dist package type to CommonJS.

## Iteration 42

- Plans
  - Align package engine policy with the new major release direction and current tooling/runtime assumptions.
- Progress
  - Updated `package.json`:
    - `engines.node` from `>= 14` to `>= 22`.
  - Updated `.changeset/typescript-migration.md`:
    - added explicit breaking-change note for minimum Node.js version `22`.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - If contributor and consumer runtime policy intentionally converge in a major, encoding it in both `engines` and the changeset prevents ambiguity downstream.

## Iteration 43

- Plans
  - Expand `src/php/_helpers/_phpTypes.ts` into a clearer PHP-oriented lattice (array/list/object/callable/context primitives) while preserving runtime behavior.
  - Start migrating first consumers from broad aliases (`PhpMixed`, `PhpValue`) to narrower helper types where semantics are already deterministic.
  - Keep this pass incremental and push-sized: helper foundation first, then targeted high-traffic callsites.
- Progress
  - Expanded `src/php/_helpers/_phpTypes.ts` with lattice primitives and guards:
    - added list/object/read-only array aliases (`PhpList`, `PhpReadonlyList`, `PhpReadonlyAssoc`, `PhpReadonlyArrayLike`).
    - added callable aliases (`PhpCallableArgs`, `PhpCallableTuple`) and tightened `isPhpCallableDescriptor(...)` to validate tuple callable slots.
    - added guards/assertions for nullish/list/assoc/key semantics (`isPhpNullish`, `isPhpList`, `isPhpAssocObject`, `isPhpKey`, `assertIsPhpAssocObject`).
  - Migrated helper/runtime consumers to narrower lattice aliases:
    - `src/php/_helpers/_phpRuntimeState.ts` now uses `PhpAssoc<...>` and `PhpList<PhpValue>` for runtime state bags/pointers.
    - `src/php/_helpers/_arrayPointers.ts` now threads `PhpList<PhpValue>` through pointer index resolution.
  - Narrowed numeric comparator callback contracts in callback-heavy array families:
    - `src/php/_helpers/_callbackResolver.ts` now requires comparator callbacks returning `NumericLike`.
    - updated `array_udiff*`, `array_uintersect*`, `array_diff_ukey`, `array_diff_uassoc`, `array_intersect_ukey`, `array_intersect_uassoc` to type comparator descriptors/guards as `NumericLike` return.
  - Migrated first high-traffic array APIs to list-centric aliases:
    - `src/php/array/array_map.ts` now uses `PhpList`/`PhpValue` across overloads and variadic callback args.
    - `src/php/array/array_filter.ts` now uses `PhpList` in overload and implementation surfaces.
  - Updated `docs/php-api-signatures.snapshot` for intentional public type changes.
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Lattice-first helper expansion enables broad signature tightening with minimal runtime churn when comparator/callback semantics are centralized.
  - Numeric comparator return narrowing (`NumericLike`) is a high-leverage strictness win across multiple array families with low implementation risk.

## Iteration 44

- Plans
  - Burn down `PhpMixed` usage in coercion-heavy `src/php/var/*` APIs.
  - Replace broad parameter aliases with narrower `PhpValue`/scalar-oriented types while preserving runtime behavior.
  - Keep the pass scoped to `intval`, `floatval`, `doubleval`, `boolval`, `strval`, `is_numeric`, `is_int`, `is_scalar`, and `is_object`.
- Progress
  - Narrowed `src/php/var/{boolval,strval,is_numeric,is_int,is_scalar,is_object}.ts` from `PhpMixed` inputs to `PhpValue`/`PhpScalar`-oriented signatures.
  - Narrowed numeric coercion surfaces:
    - `src/php/var/intval.ts` now uses `IntvalInput = NumericLike | boolean | PhpNullish`.
    - `src/php/var/floatval.ts` now exports `FloatvalInput = NumericLike | boolean | PhpNullish`.
    - `src/php/var/doubleval.ts` now consumes `FloatvalInput` directly.
  - Updated `docs/php-api-signatures.snapshot` for intentional public signature changes.
  - Reduced `PhpMixed` usage:
    - `src/php/**`: `126 -> 108` (`rg` line count).
    - `src/php/var/**`: `27 -> 9` (`rg` line count).
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Introducing shared input aliases (`FloatvalInput`, `IntvalInput`) gives better API clarity and reuse while preserving behavior.
  - Concentrated family passes can materially reduce broad-type footprint without touching tsconfig or runtime architecture.

## Iteration 45

- Plans
  - Narrow high-traffic `src/php/array/*` value/collection signatures that still used `PhpMixed`.
  - Encode argument-shape contracts where runtime already enforces them (tuple-rest requirements, list/object distinctions).
- Progress
  - Narrowed collection/value surfaces in:
    - `src/php/array/array_sum.ts`
    - `src/php/array/array_product.ts`
    - `src/php/array/array_rand.ts`
    - `src/php/array/sizeof.ts`
    - `src/php/array/array_merge.ts`
    - `src/php/array/array_replace.ts`
    - `src/php/array/array_fill_keys.ts`
    - `src/php/array/array_flip.ts`
  - Added stronger contracts:
    - `array_product` now has overloads (`typed list` => `number`, broad runtime boundary => `number | null`).
    - `array_merge` now uses tuple-rest overloads that preserve all-list merging vs general array-like merging.
    - `array_replace` now requires at least one replacement at the type boundary.
  - Updated `docs/php-api-signatures.snapshot` for intentional public API narrowing.
  - Reduced `PhpMixed` usage:
    - `src/php/**`: `108 -> 92` (`rg` line count).
    - `src/php/array/**`: `33 -> 17` (`rg` line count).
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Overloads at boundary-heavy array APIs let us keep permissive runtime behavior for JS callers while giving TS consumers materially stricter inference.
  - Replacing `PhpMixed` with specific `PhpArrayLike`/`PhpList` contracts yields large strictness gains with low implementation churn.

## Iteration 46

- Plans
  - Unify callback resolution in sort-family functions via shared resolver helpers to remove duplicated permissive logic.
  - Further reduce `PhpMixed` leakage in `src/php/array/*` callback/context surfaces.
- Progress
  - Refactored callback resolution in:
    - `src/php/array/usort.ts`
    - `src/php/array/uasort.ts`
    - `src/php/array/uksort.ts`
  - Replaced local `isPhpCallable`/`isObjectLike` callback branching with centralized `resolvePhpCallable(...)` flow and scoped error handling.
  - Narrowed `this` context typing in `usort`/`uasort` from `PhpAssoc<PhpMixed>` to `PhpAssoc<PhpValue>`.
  - Updated `docs/php-api-signatures.snapshot` for intentional exported signature changes.
  - Reduced `PhpMixed` usage:
    - `src/php/**`: `92 -> 88` (`rg` line count).
    - `src/php/array/**`: `17 -> 13` (`rg` line count).
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Centralizing callback resolution through one helper tightens type safety and behavior consistency at the same time.
  - Sort-family cleanup is high-yield because it removes repetitive dynamic callback branches across multiple APIs in one pass.

## Iteration 47

- Plans
  - Add a CI debt-policy ratchet for `PhpMixed` usage so newly achieved narrowing cannot regress.
  - Keep ratchets scoped and measurable (global `src/php` + focused `array`/`var` subsets).
- Progress
  - Updated `scripts/check-ts-debt-policy.ts` to track and gate:
    - total `src/php` `PhpMixed` keyword occurrences.
    - `src/php/array` `PhpMixed` keyword occurrences.
    - `src/php/var` `PhpMixed` keyword occurrences.
  - Established new ceilings at current baseline (occurrence-count based):
    - `MAX_SRC_PHP_PHPMIXED_KEYWORD = 94`
    - `MAX_SRC_PHP_ARRAY_PHPMIXED_KEYWORD = 15`
    - `MAX_SRC_PHP_VAR_PHPMIXED_KEYWORD = 9`
  - Extended success/failure reporting to include the new `PhpMixed` ratchets.
  - Validation passed:
    - `corepack yarn lint:ts:debt:policy`
    - `corepack yarn check`
- Key learnings
  - Ratcheting broad-type keywords by occurrence count (not line count) provides stable, enforcement-grade progress tracking.
  - Adding policy checks right after cleanup passes locks in gains and prevents backsliding during high-velocity refactors.

## Iteration 48

- Plans
  - Remove the remaining `PhpMixed` usage from `src/php/array/**`.
  - Immediately lower debt-policy ceilings to the newly achieved floor.
- Progress
  - Removed `PhpMixed` from all remaining array hotspots:
    - `src/php/array/array_count_values.ts`
    - `src/php/array/array_filter.ts`
    - `src/php/array/array_key_exists.ts`
    - `src/php/array/array_unshift.ts`
    - `src/php/array/in_array.ts`
  - Updated `docs/php-api-signatures.snapshot` for intentional signature narrowing.
  - Lowered policy ratchets in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_PHPMIXED_KEYWORD`: `94 -> 79`
    - `MAX_SRC_PHP_ARRAY_PHPMIXED_KEYWORD`: `15 -> 0`
    - `MAX_SRC_PHP_VAR_PHPMIXED_KEYWORD`: unchanged at `9`
  - Measured reduction:
    - `src/php/**` `PhpMixed`: `94 -> 79` (occurrence count).
    - `src/php/array/**` `PhpMixed`: `15 -> 0` (occurrence count).
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Finishing a whole directory (`array/**`) to zero broad aliases is realistic when done in focused, boundary-first passes.
  - Ratcheting at each floor is essential to prevent regression while proceeding to the next directory family.

## Iteration 49

- Plans
  - Continue `PhpMixed` burn-down in `src/php/strings/**` with low-risk formatter/caster-style APIs first.
  - Ratchet global `src/php` `PhpMixed` ceiling down to the new measured floor.
- Progress
  - Narrowed `PhpMixed` signatures in:
    - `src/php/strings/echo.ts`
    - `src/php/strings/join.ts`
    - `src/php/strings/printf.ts`
    - `src/php/strings/vprintf.ts`
    - `src/php/strings/vsprintf.ts`
    - `src/php/strings/strnatcmp.ts`
    - `src/php/strings/soundex.ts`
    - `src/php/strings/metaphone.ts`
    - `src/php/strings/convert_uuencode.ts`
    - `src/php/strings/money_format.ts`
    - `src/php/strings/similar_text.ts`
  - Updated `docs/php-api-signatures.snapshot` for intentional API narrowing.
  - Lowered policy ratchet in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_PHPMIXED_KEYWORD`: `79 -> 56`
  - Measured reduction:
    - `src/php/**` `PhpMixed`: `79 -> 56` (occurrence count).
    - `src/php/strings/**` `PhpMixed`: `40 -> 19` (occurrence count).
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Utility-style string functions often tolerate aggressive type narrowing because runtime behavior is already explicit (string coercion, numeric guards, variadic forwarding).
  - Iterating from low-risk to parser-heavy modules preserves momentum while steadily shrinking broad type debt.

## Iteration 50

- Plans
  - Finish `PhpMixed` removal in remaining parser/locale-oriented `src/php/strings/**` modules.
  - Add a dedicated `strings` `PhpMixed` debt gate at zero.
- Progress
  - Removed remaining `PhpMixed` usage from:
    - `src/php/strings/setlocale.ts`
    - `src/php/strings/explode.ts`
    - `src/php/strings/split.ts`
    - `src/php/strings/parse_str.ts`
    - `src/php/strings/html_entity_decode.ts`
    - `src/php/strings/htmlentities.ts`
    - `src/php/strings/localeconv.ts`
  - Updated `docs/php-api-signatures.snapshot` for intentional signature changes.
  - Strengthened policy ratchets in `scripts/check-ts-debt-policy.ts`:
    - `MAX_SRC_PHP_PHPMIXED_KEYWORD`: `56 -> 37`
    - added `MAX_SRC_PHP_STRINGS_PHPMIXED_KEYWORD = 0`
  - Measured reduction:
    - `src/php/**` `PhpMixed`: `56 -> 37` (occurrence count).
    - `src/php/strings/**` `PhpMixed`: `19 -> 0` (occurrence count).
  - Validation passed:
    - `corepack yarn check`
- Key learnings
  - Parser/locale modules can still be narrowed safely when dynamic object flows are kept but broad aliases are replaced with shared lattice primitives.
  - Dedicated directory ratchets (`strings = 0`) prevent broad aliases from silently re-entering via future utility additions.
