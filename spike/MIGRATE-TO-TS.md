# Instructions: Migrate a locutus JS function to TypeScript

## Goal

Convert a single `src/**/*.js` file to `src/**/*.ts` **in place** (same path, new extension). The TypeScript source should:

1. Be idiomatic TypeScript (proper types, no `any` unless truly unavoidable)
2. Preserve all comment headers exactly as they are (position, content, indentation)
3. Preserve all blank lines exactly as they are in the original
4. Preserve behavior exactly — no logic, algorithm, or control flow changes

## Rules

### Module format
- Replace `module.exports = function name(` with `export default function name(`
- Replace `const foo = require('...')` with `import foo from '...'` at the top of the file
- Keep `.js` extension in import paths (Node ESM resolution requires it)

### Comment headers
- Keep the comment header block **inside** the function body, exactly where it is now
- Do not move, reformat, or reword any comments
- Example:
  ```typescript
  export default function strlen(string: string): number {
    //  discuss at: https://locutus.io/php/strlen/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //   example 1: strlen('Kevin van Zonneveld')
    //   returns 1: 19

    const str = string + ''
    // ...
  }
  ```

### Types
- Add type annotations to function parameters and return types
- Only annotate variable declarations where the type isn't obvious from initialization
  - YES: `let i: number` (uninitialized), `function foo(x: string): number`
  - NO: `const str = string + ''` (obviously string), `let i = 0` (obviously number)
- Use `string`, `number`, `boolean` (lowercase) for primitives
- Use `Record<string, unknown>` for generic objects, not `object` or `any`
- For the `$global`/`$locutus` boilerplate, use a single cast at the point of use:
  ```typescript
  const $global = typeof window !== 'undefined' ? window : global
  ;($global as Record<string, Record<string, unknown>>).$locutus = ($global as Record<string, Record<string, unknown>>).$locutus || {}
  const $locutus = ($global as Record<string, Record<string, unknown>>).$locutus
  ```
  Alternatively, if the function uses `$global` heavily, cast once:
  ```typescript
  const $global = (typeof window !== 'undefined' ? window : global) as typeof globalThis & { $locutus: { php: Record<string, unknown> } }
  ```
- For union types (e.g. function accepts string or array), use explicit union: `string | string[]`
- For callback/count objects, define an interface above the function
- Prefer type narrowing over `as` casts when possible

### Preserve behavior exactly
- Do NOT change any logic, algorithms, or control flow
- Do NOT rename variables
- Do NOT add or remove blank lines — keep them exactly as in the original
- Do NOT change `hasOwnProperty` calls
- Parameters reassigned with the SAME type can stay as-is (TS allows it)
- Only when a parameter is reassigned with a DIFFERENT type, introduce a new `let` variable:
  ```javascript
  // Original JS:
  if (!array) { array = $global }
  // ...later...
  obj = array

  // TypeScript — introduce a new variable, use it everywhere the original used the reassigned param:
  const target = array || $global
  // ...later...
  obj = target
  ```

### require() calls to other locutus functions
- Convert `require('../path/to/func')` to `import func from '../path/to/func.js'`
- If `require` is used conditionally (e.g. `typeof require !== 'undefined' ? require(...)(...) : undefined`), convert to a top-level import and call it directly. The conditional was only needed for CJS/browser compat.

### Things to NOT do
- Do not use `@ts-ignore` or `@ts-expect-error`
- Do not use `as any`
- Do not modify or create test files
- Do not add JSDoc comments (the existing comment format IS the documentation)
- Do not use `enum` or `namespace`
- Do not over-annotate — trust TypeScript inference for obvious types

## Verification

After converting, the file should:
1. Pass: `npx tsc <file> --target ES2020 --module ESNext --moduleResolution node --skipLibCheck --noEmit`
2. Pass: `npx vitest run test/generated/php/<category>/<name>.vitest.ts`

## Output

Return only the complete TypeScript file content, nothing else.
