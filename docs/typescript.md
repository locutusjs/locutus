# TypeScript in locutus

## Overview

All source files in `src/` are TypeScript. The migration from JavaScript was completed in PR #535.

- 488 function files (`.ts`) with typed function signatures
- `noImplicitAny: true` — all parameters must have explicit types
- 191 files still have `// @ts-nocheck` — these need manual type fixes (complex runtime coercions, dynamic indexing, etc.)
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
- `scripts/fix-cjs-exports.mjs` post-processes the dist to add `module.exports = exports.funcName` for each function file, so `require('locutus/php/strings/sprintf')` returns the function directly

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

The biggest area for contribution is removing `@ts-nocheck` from files and fixing their type errors.

```bash
# Find files that need type work
grep -rl '@ts-nocheck' src/ --include='*.ts' | grep -v _util | grep -v _helpers
```

To fix a `@ts-nocheck` file:
1. Remove the `// @ts-nocheck` directive
2. Run `npx tsc --noEmit` to see the errors
3. Fix type errors using runtime conversions and type guards (no `as` casts)
4. Replace `any` parameter types with specific types where possible
5. Type `= {}` declarations as `Record<string, any>` for dynamic indexing
6. Run `npm run check` to verify
