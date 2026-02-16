# TypeScript Migration Spike — Comparison

## Approach

1. Write `.ts` source following `MIGRATE-TO-TS.md` instructions
2. Compile with `tsc --target ES2020 --module ESNext`
3. Run `biome format` on both the original JS and the tsc output
4. Diff the Biome-formatted versions

## parse_str — Biome-formatted diff (original JS vs tsc output)

After Biome-formatting both sides, the diff is **only blank lines + one variable rename**:

```diff
- if (!array) {
-   array = $global
- }
+ const target = array || $global
```

```diff
- obj = array
+ obj = target
```

Every other `-` line in the diff is just a removed blank line — tsc strips blank lines
from emitted JS ([microsoft/TypeScript#843](https://github.com/microsoft/TypeScript/issues/843),
open since 2014, won't be fixed).

## Blank line strategies

| Approach | Blank lines? | Speed | Complexity |
|----------|-------------|-------|------------|
| tsc | Stripped | Baseline | None |
| Post-process tsc output (re-insert blanks) | Preserved | Baseline + script | Medium (fragile regex) |
| Accept blank line diff | N/A | N/A | None |

**Recommendation**: Accept it. The TS source has blank lines and is what devs read on GitHub.
The emitted JS in `dist/` is a build artifact.

## $global/$locutus typing

58 files use this boilerplate:
```javascript
const $global = typeof window !== 'undefined' ? window : global
$global.$locutus = $global.$locutus || {}
```

In TypeScript, a single cast is clean enough:
```typescript
const $global = (typeof window !== 'undefined' ? window : global) as typeof globalThis & Record<string, unknown>
```

The cast disappears entirely in the JS output — zero runtime impact. The `$locutus` lines
type-check fine after the cast because `Record<string, unknown>` allows arbitrary property access.

## Subagent workflow test

Fed `MIGRATE-TO-TS.md` + the original `parse_str.js` to a sonnet subagent.

**Result**: The subagent produced a clean TypeScript conversion on the first try that:
- Compiles with zero errors
- Preserves all comments in place
- Preserves all blank lines
- Only changes the `array` → `target` variable (required by TS)
- Keeps `hasOwnProperty` as-is per instructions
- Types the `$global` pattern correctly

**Conclusion**: The instructions are good enough for parallel subagent migration.
