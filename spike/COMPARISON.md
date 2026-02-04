# TypeScript Migration Spike - Comparison

## Overview

Converted 3 functions to TypeScript and compiled with `tsc --target ES2020 --module ESNext`:
- `strlen` - simple function
- `str_replace` - medium complexity with overloaded types
- `parse_str` - complex with global state manipulation

## Key Differences: Current JS vs tsc Output

### 1. Module Format

| Current (CJS) | tsc Output (ESM) |
|---------------|------------------|
| `module.exports = function strlen(string) {` | `export default function strlen(string) {` |

**Decision needed**: The current build already outputs ESM to `dist/`. This is consistent.

### 2. Semicolons and Formatting

| Current | tsc Output |
|---------|------------|
| No semicolons | Adds semicolons |
| `} else if` on same line | `}\nelse if` on separate lines |

**Example** (strlen.js line 40):
```javascript
// Current:
} else if (code >= 0xdc00 && code <= 0xdfff) {

// tsc output:
}
else if (code >= 0xdc00 && code <= 0xdfff) {
```

**Impact**: Minor formatting difference. Could configure Biome/Prettier to match either style.

### 3. hasOwnProperty Pattern

| Current | tsc Output |
|---------|------------|
| `obj.hasOwnProperty(p)` | `Object.prototype.hasOwnProperty.call(obj, p)` |

**Impact**: tsc output is actually safer (works when object doesn't have hasOwnProperty). This is an improvement.

### 4. Variable Naming (minor)

| Current | tsc Output |
|---------|------------|
| `array = $global` | `let targetArray = array \|\| $global` |

**Impact**: The TS version needed a new variable to satisfy type checker (can't reassign parameter with different type). Slightly more readable.

### 5. Global State Typing

The parse_str TS version has verbose casting for the global/$locutus pattern:
```typescript
const $global: typeof globalThis = typeof window !== 'undefined' ? window : global
;($global as Record<string, unknown>).$locutus = ...
```

**Impact**: This is ugly in TS source but disappears in JS output. Could be improved with a shared utility.

## Declaration Files Generated

Excellent `.d.ts` output automatically:

```typescript
// strlen.d.ts
export default function strlen(string: string): number;

// str_replace.d.ts
type SearchType = string | string[];
type ReplaceType = string | string[];
type SubjectType = string | string[];
interface CountObj {
    value: number;
}
export default function str_replace(
  search: SearchType,
  replace: ReplaceType,
  subject: SubjectType,
  countObj?: CountObj
): string | string[];

// parse_str.d.ts
type ParseStrArray = Record<string, unknown>;
export default function parse_str(str: string, array?: ParseStrArray): void;
```

**Huge win**: These types are exactly what consumers need. Currently locutus has no .d.ts files.

## Side-by-Side Line Count

| Function | Current JS | TS Source | tsc JS Output | .d.ts |
|----------|-----------|-----------|---------------|-------|
| strlen | 73 | 69 | 68 | 1 |
| str_replace | 85 | 75 | 75 | 8 |
| parse_str | 160 | 144 | 135 | 3 |

The TS source is slightly shorter (no redundant `let` declarations), and tsc output is comparable.

## Behavioral Differences

1. **parse_str**: Changed `obj.hasOwnProperty(p)` to `Object.prototype.hasOwnProperty.call(obj, p)` - this is actually a safety improvement.

2. **No other runtime differences** - the JS output is functionally equivalent.

## Type Complexity Observations

### Easy to type
- `strlen(string: string): number` - trivial

### Medium complexity
- `str_replace` - needs union types for arrays/strings, interface for countObj

### Hard to type cleanly
- `parse_str` - global state, dynamic object building, key can be string or number
- Required `as` casts and `Record<string, unknown>` patterns

## Recommendation

**Go forward with TypeScript migration:**

1. **JS output is clean** - tsc produces readable, idiomatic JavaScript
2. **Free .d.ts files** - major win for TypeScript consumers
3. **Minor style differences** - can be normalized with formatter config
4. **Type complexity manageable** - even parse_str (most complex) is typeable
5. **Some patterns improve** - hasOwnProperty becomes safer

**Migration approach:**
- Convert `src/**/*.js` → `src/**/*.ts`
- Build outputs both `.js` and `.d.ts` to `dist/`
- Use `tsc` for production builds
- Use Node 22+ type stripping for development
- Keep comment headers (they survive compilation)
