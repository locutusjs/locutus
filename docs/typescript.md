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
