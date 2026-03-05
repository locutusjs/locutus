# Callback Parity Translation Plan

## Context

- Recent expansion added higher-order functions in `elixir`, `clojure`, and `julia`.
- The current parity translators are still mostly regex-based and skip several functions because JS callbacks are not lowered into native anonymous functions yet.
- Callback lowering alone is not sufficient for `elixir` and `clojure`: their current parity handlers print native terms, not JSON-stable output, so maps/lists/vectors need deterministic serialization too.
- We already ship `typescript`, so the correct implementation tool is the TypeScript AST, not regexes.

## Current Blockers

- `test/parity/lib/languages/elixir.ts`
  - `frequencies_by`
  - `group_by`
  - `scan`
- `test/parity/lib/languages/clojure.ts`
  - `update_in`
  - `merge_with`
  - `reduce_kv`
- `test/parity/lib/languages/julia.ts`
  - `findall`

## Supported Callback Subset For First Pass

- Expression-bodied arrow functions only.
- Identifier parameters only.
- No destructuring.
- No default parameters.
- No rest parameters.
- No statement-bodied callbacks.
- Supported expression forms:
  - identifiers and literals
  - array indexing and property access
  - arithmetic: `+`, `-`, `*`, `/`, `%`
  - comparisons: `===`, `!==`, `>`, `>=`, `<`, `<=`
  - boolean operators: `&&`, `||`, `!`
  - ternaries
  - computed object literals only when we explicitly add a target-language emitter for them
  - selected built-ins:
    - `Number(x)`
    - `String(x)`
    - `value.length`
    - `value.charAt(0)`

## Implementation Sequence

1. Build a shared AST parser helper under `test/parity/lib/` that:
   - parses callback source with TypeScript
   - validates the supported subset
   - returns a small target-agnostic expression tree
2. Add unit tests for that parser/helper in `test/util/`.
3. Add an Elixir emitter for the supported subset.
4. Add deterministic Elixir serialization for strings, numbers, booleans, `nil`, arrays, and maps so parity can compare JSON-like output.
5. Remove Elixir skips for:
   - `frequencies_by`
   - `group_by`
   - `scan`
6. Validate with targeted parity runs for all three Elixir functions.
7. Add a Clojure emitter plus deterministic serializer.
8. Remove Clojure skips for:
   - `update_in`
   - `merge_with`
   - `reduce_kv`
9. Add Julia predicate lowering for `findall`.

## Explicit Success Targets

### Elixir

- `frequencies_by(['a', 'aa', 'b'], (value) => value.charAt(0))`
- `frequencies_by([1, 2, 3, 4], (value) => (value % 2 === 0 ? 'even' : 'odd'))`
- `group_by(['one', 'two', 'three'], (value) => value.length)`
- `group_by([1, 2, 3], (value) => (value % 2 === 0 ? 'even' : 'odd'), (value) => value * 10)`
- `scan([1, 2, 3], 10, (acc, value) => Number(acc) + Number(value))`

### Clojure

- `merge_with((a, b) => Number(a) + Number(b), {a: 1}, {a: 2, b: 3})`
- `reduce_kv((acc, key, value) => acc + key + value, '', {a: 1, b: 2})`
- `update_in({a: {b: 1}}, ['a', 'b'], (n) => Number(n) + 1)`

### Julia

- `findall((value) => Number(value) > 2, [1, 2, 3, 4, 5])`

## Non-Goals For This Pass

- Full JS callback semantics.
- Nested closures.
- Statement-bodied functions.
- Arbitrary method-chain lowering.
- Callbacks that depend on JS truthiness quirks beyond the supported subset.
- General-purpose native-language JSON libraries as new dependencies.

## Guardrails

- Fail closed. If the callback is outside the supported subset, the translator should throw a clear error and the function should remain skipped.
- Keep emitters tiny and explicit per language.
- Prefer targeted unit tests around the parser/emitter over debugging only through full parity runs.
- Unlock skip-list entries only after targeted parity passes.
