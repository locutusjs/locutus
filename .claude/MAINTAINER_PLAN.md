## Roadmap

- [ ] Docker containers for PHP, Go, Python, Ruby, C
- [ ] JS-to-native code transpilation for each language
- [ ] CI integration - fail if verification diverges
- [ ] Badge: "Verified against PHP 8.3"

**Commands:**
```bash
yarn verify              # Verify all (uses cache)
yarn verify php          # Verify PHP only
yarn verify --no-cache   # Force re-verification
```

### Phase 2: Modernization

**Goal:** Modern toolchain, ESM-first, tree-shakeable.

- [ ] Migrate Babel 6 → native ESM (Node 20+)
- [ ] Migrate Mocha → Vitest
- [ ] Dual CJS/ESM exports
- [ ] Publish as `locutus@3.0.0` with breaking changes
- [ ] Drop Node < 20 support

### Phase 3: TypeScript

**Goal:** Full type safety, better DX.

- [ ] Convert `src/_util/` to TypeScript
- [ ] Generate types from JSDoc in function files
- [ ] Per-function type exports: `import type { SprintfArgs } from 'locutus/php/strings/sprintf'`
- [ ] Strict mode compatible

### Phase 4: Expansion

**Goal:** Best-in-class coverage for target languages.

**PHP Priority Functions:**
- [ ] `preg_match_all` - regex with captures
- [ ] `DateTime` class methods
- [ ] `array_column` improvements
- [ ] `password_hash` / `password_verify`

**Go Expansion:**
- [ ] `fmt.Sprintf` with full verb support
- [ ] `time.Parse` / `time.Format`
- [ ] `regexp` package
- [ ] `encoding/json` with struct tags

**Python Expansion:**
- [ ] `datetime` module
- [ ] `re` module
- [ ] `collections` (Counter, defaultdict)
- [ ] `itertools`

### Phase 5: Documentation & Website

- [ ] Auto-generate docs from source
- [ ] Interactive playground (run in browser)
- [ ] Search by function name or behavior
- [ ] "Rosetta Stone" - same function across all languages

---

## Development Workflow

### Quick Commands

```bash
yarn check              # Format + lint + test (run after changes)
yarn verify             # Cross-language verification
yarn test               # Full test suite
yarn lint               # Biome check
yarn fix:biome          # Auto-fix
```

### Adding a New Function

1. **Check it's worth adding:**
   - Non-trivial implementation?
   - Not available in modern JS?
   - Verified against actual language?

2. **Create the file:**
   ```bash
   # src/{language}/{category}/{function_name}.js
   touch src/php/strings/new_function.js
   ```

3. **Add header with examples:**
   ```javascript
   module.exports = function new_function(arg) {
     //  discuss at: https://locutus.io/php/new_function/
     // original by: Your Name
     //   example 1: new_function('test')
     //   returns 1: 'expected'

     // Implementation...
   }
   ```

4. **Verify and test:**
   ```bash
   yarn verify php/strings/new_function
   yarn build:tests && yarn test
   yarn check
   ```

### Commit Guidelines

- Small, focused PRs
- Run `yarn check` before committing
- Merge early, iterate often

---

## Quality Standards

### Zero Tolerance
- Failing tests
- Biome errors
- Unverified implementations (eventually)

### Acceptable Warnings
- LGPL code (`_bc.js`) - can't modify
- Intentional eval/new Function (with biome-ignore comment)
- Style warnings in complex algorithms

### Curation Rules

**Worth porting:**
- Complex: `sprintf`, `strtotime`, `serialize`, `date`
- Language-specific quirks: `array_merge` vs `array_merge_recursive`
- Educational: showing PHP's type coercion

**Skip:**
- Direct wrappers: `strlen` → `s.length`
- Modern JS equivalents: `Array.includes`, `Object.keys`
- Trivial math: `abs`, `ceil`, `floor`

---

## Licensing

- **MIT** - Everything except BC Math
- **LGPL-2.1** - `src/php/_helpers/_bc.js` and `src/php/bc/*`

See [LICENSE](../LICENSE) for details.

---

## Open Items

### PR #477 - composer.json
Status: Open, needs clarification

### Issue #473 - LGPL
Status: **Resolved** - Documented in LICENSE, README, source files

---

## Lessons Learned

1. **Verify against reality** - Unit tests aren't enough. Run actual PHP/Go/Python.

2. **Don't duplicate infrastructure** - Check `src/_util/` before creating new tools.

3. **Document in the right place** - LICENSE, README, SPDX headers. Not just issues.

4. **Biome unsafe fixes break code** - Always test after auto-fix.

5. **eval() is sometimes necessary** - Suppress with explanation, don't fight it.

6. **Keep one plan** - Revise this document, don't create new ones.

7. **Merge often** - Small PRs, fast iteration.

---

## Changelog

### 2026-01-06 - Cross-Language Verification
- Created `scripts/verify.ts` with Docker support
- Content-based caching for fast re-runs
- Native TypeScript (Node 25+)

### 2026-01-06 - LGPL Documentation
- Added LGPL exception to LICENSE
- Added License section to README
- Added SPDX headers to `_bc.js`

### 2026-01-06 - Biome Migration
- Migrated from ESLint + Prettier
- Reduced warnings from 41 to 25
- Added `yarn check` command

---

*This is a living document. Update it regularly.*
