---
"locutus": major
---

TypeScript migration: all source files converted from CJS to TypeScript with named exports.

Breaking changes:
- Functions now use named exports instead of default exports
  - ESM: `import { sort } from 'locutus/php/array/sort'` (was: `import sort from ...`)
  - CJS: both forms are supported for compatibility (`const sort = require(...)` and `const { sort } = require(...)`)
- The `ini_get` dependency is no longer required — functions read ini values inline via optional chaining on `globalThis.$locutus`
- Repository tooling now runs as native ESM (`"type": "module"`), and Node script invocations no longer need typeless/strip-type flags.
  - Published `dist` output remains CommonJS-compatible for `require(...)` deep imports.
