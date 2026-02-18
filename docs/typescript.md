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
