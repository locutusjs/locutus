# Migrating a locutus JS function to TypeScript

## Goal

Convert a single `src/**/*.js` file to `src/**/*.ts` **in place** (same path, new extension). The TypeScript source should:

1. Be idiomatic TypeScript (proper types, no `any` unless truly unavoidable)
2. Preserve all comment headers exactly as they are (position, content, indentation)
3. Preserve all blank lines exactly as they are in the original
4. Preserve behavior exactly — no logic, algorithm, or control flow changes

## Rules

### Module format
- Replace `module.exports = function name(` with `export function name(`
- Replace `const foo = require('...')` with `import foo from '...'` at the top of the file
- Use `import { foo } from '...'` (named import) when importing a `.ts` file
- Use `import foo from '...'` (default import) when importing a `.js` file that still uses CJS
- Use `.ts` extension when importing a file that has already been migrated to TypeScript
- Use `.js` extension when importing a file that is still CJS JavaScript
- **Do NOT import `ini_get`** — read ini values inline instead (see "ini values" below)
- Conditional requires like `typeof require !== 'undefined' ? require('../info/ini_get')(...) : undefined`
  should be replaced with the inline ini read pattern below

### Comment headers
- Keep the comment header block **inside** the function body, exactly where it is now
- Do not move, reformat, or reword any comments
- Example:
  ```typescript
  export function strlen(string: string): number {
    //  discuss at: https://locutus.io/php/strlen/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //   example 1: strlen('Kevin van Zonneveld')
    //   returns 1: 19

    const str = string + ''
    // ...
  }
  ```

### Types — prefer narrowing over casting
- Add type annotations to function parameters and return types
- Only annotate variable declarations where the type isn't obvious from initialization
  - YES: `let i: number` (uninitialized), `function foo(x: string): number`
  - NO: `const str = string + ''` (obviously string), `let i = 0` (obviously number)
- Use `string`, `number`, `boolean` (lowercase) for primitives
- Use `Record<string, unknown>` for generic objects, not `object` or `any`
- **Never use `as` casts on values** — use runtime conversions and type guards instead:

  | Bad (unsafe cast) | Good (runtime conversion or guard) |
  |---|---|
  | `(a as number) - (b as number)` | `Number(a) - Number(b)` |
  | `parseFloat(a as string)` | `parseFloat(String(a))` |
  | `(a as string) > (b as string)` | `String(a) > String(b)` |
  | `fn as string` | `String(fn)` |
  | `m!.exec(...)` (non-null assertion) | `if (!m) return ...` (null guard) |
  | `sorter as (a: T) => number` | Introduce `let sortFn: ...` resolved via type guards |
  | `(trFrom as string).charAt(j)` | `const fromStr = typeof trFrom === 'string' ? trFrom : null` then `fromStr.charAt(j)` |

- The only acceptable `as` casts are at **boundaries with the global scope**:
  ```typescript
  const $global = (typeof window !== 'undefined' ? window : global) as typeof globalThis & {
    $locutus: { ... }
  }
  ```
  and initialization of the `$locutus` boilerplate:
  ```typescript
  $global.$locutus = $global.$locutus || ({} as typeof $global.$locutus)
  ```

- For union types (e.g. function accepts string or array), use explicit union: `string | string[]`
- When a parameter is reused for different types (e.g. string then reassigned to array),
  introduce separate typed variables instead of widening the param type

### ini values — keep ini_get optional
Functions should **not** import `ini_get`. Instead, read ini values inline from `globalThis.$locutus`:

For functions that already have `$global`/`$locutus` setup (e.g. sort functions with locale support):
```typescript
// Add ini? to the $locutus.php type:
const $global = (typeof window !== 'undefined' ? window : global) as typeof globalThis & {
  $locutus: {
    php: {
      locales: Record<string, { sorting: ... }>
      ini?: Record<string, { local_value?: unknown }>
    }
  }
}
// ...
const iniVal = String($locutus.php.ini?.['locutus.sortByReference']?.local_value ?? '') || 'on'
```

For simpler functions without `$global` setup:
```typescript
const $loc = (globalThis as any).$locutus
const iniVal = String($loc?.php?.ini?.['some.key']?.local_value ?? '') || 'defaultValue'
```

This makes functions copy-paste friendly — no dependency on `ini_get` needed.

### Preserve behavior exactly
- Do NOT change any logic, algorithms, or control flow
- Do NOT rename variables
- Do NOT add or remove blank lines — keep them exactly as in the original
- Do NOT change `hasOwnProperty` calls
- Parameters reassigned with the SAME type can stay as-is (TS allows it)
- Only when a parameter is reassigned with a DIFFERENT type, introduce a new `let` variable

### Things to NOT do
- Do not use `@ts-ignore` or `@ts-expect-error`
- Do not use `as any` (except for the `(globalThis as any).$locutus` boundary pattern)
- Do not use `as` to cast values (use `Number()`, `String()`, type guards instead)
- Do not modify or create test files
- Do not add JSDoc comments (the existing comment format IS the documentation)
- Do not use `enum` or `namespace`
- Do not over-annotate — trust TypeScript inference for obvious types

## Verification

After converting, rebuild and verify:
```bash
npm run build     # regenerates dist, indices, and tests
npm run check     # lint, tsc, headers, tests — all must pass
npm run test:module  # CJS require chain works
```
