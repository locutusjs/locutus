# Migrating a locutus JS function to TypeScript

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
- Use `.ts` extension when importing a file that has already been migrated to TypeScript
- Use `.js` extension when importing a file that is still CJS JavaScript
- Conditional requires like `typeof require !== 'undefined' ? require('../info/ini_get')(...) : undefined`
  become a top-level `import` and a direct call — the conditional was only needed for CJS/browser compat

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
  const $global = (typeof window !== 'undefined' ? window : global) as typeof globalThis & {
    $locutus: { php: Record<string, unknown> }
  }
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
- Only when a parameter is reassigned with a DIFFERENT type, introduce a new `let` variable

### Things to NOT do
- Do not use `@ts-ignore` or `@ts-expect-error`
- Do not use `as any`
- Do not modify or create test files
- Do not add JSDoc comments (the existing comment format IS the documentation)
- Do not use `enum` or `namespace`
- Do not over-annotate — trust TypeScript inference for obvious types

## Verification

After converting, rebuild and verify:
```bash
yarn build     # regenerates indices and tests
yarn test      # all tests pass
yarn check     # lint, tsc, headers clean
```
