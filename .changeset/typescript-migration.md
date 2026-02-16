---
"locutus": major
---

TypeScript migration: all source files converted from CJS to TypeScript with named exports.

Breaking changes:
- Functions now use named exports instead of default exports
  - ESM: `import { sort } from 'locutus/php/array/sort'` (was: `import sort from ...`)
  - CJS: `const { sort } = require('locutus/php/array/sort')` (was: `const sort = require(...)`)
- The `ini_get` dependency is no longer required — functions read ini values inline via optional chaining on `globalThis.$locutus`
