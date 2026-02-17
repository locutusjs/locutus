# TypeScript in locutus

## Overview

All source files in `src/` are TypeScript. The migration from JavaScript was completed in PR #535.

- 488 function files (`.ts`)
- 98 files still have `// @ts-nocheck` — these compile but have type errors that need manual attention
- `noImplicitAny` is `false` in tsconfig.json, so many functions still have untyped parameters
- The long-term goal is to enable `noImplicitAny: true` and remove all `@ts-nocheck` directives

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
- `scripts/fix-cjs-exports.mjs` post-processes the dist to add `module.exports = exports.funcName` for each function file, so `require('locutus/php/strings/sprintf')` returns the function directly

### `@ts-nocheck` files

98 files have `// @ts-nocheck` because they have legitimate type errors that require careful manual fixes (complex runtime type coercions, loosely typed algorithms, etc.). These files still run correctly — the directive just suppresses the type checker.

### `noImplicitAny: false`

Most functions were auto-converted from JavaScript and don't have parameter types yet. With `noImplicitAny: false`, TypeScript accepts `function foo(x)` where `x` is implicitly `any`. This avoids hundreds of errors while allowing incremental typing.

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

Functions should not import `ini_get`. Read ini values inline:

```typescript
const $loc = (globalThis as any).$locutus
const iniVal = String($loc?.php?.ini?.['some.key']?.local_value ?? '') || 'defaultValue'
```

### Verification

```bash
npm run build       # regenerate indices and test files
npm run check       # biome lint, tsc, header lint, vitest — all must pass
npm run test:module # ESM import chain test
```

## Improving type coverage

The biggest area for contribution is adding types to existing functions. To find untyped functions:

```bash
# Functions with @ts-nocheck (need type fixes before the directive can be removed)
grep -rl '@ts-nocheck' src/ --include='*.ts' | grep -v _util | grep -v _helpers

# Functions with untyped parameters (will error when noImplicitAny is enabled)
# Look for export function foo(x, y) with no type annotations
```

When adding types to a `@ts-nocheck` file:
1. Remove the `// @ts-nocheck` directive
2. Fix all type errors using runtime conversions and type guards (no `as` casts)
3. Run `npm run check` to verify
