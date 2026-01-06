# Locutus Strategic Roadmap

**Created:** 2026-01-06
**Philosophy:** Quality over quantity. Curate with taste.

---

## Core Insight

Locutus should focus on functions that provide **real value**:
- Complex implementations with non-trivial logic
- Functions PHP/Python/Go developers actually search for
- Educational value showing how languages differ

**Anti-patterns to avoid:**
- Trivial wrappers (`strlen(s)` = `s.length`)
- Functions that duplicate native JS functionality
- Expanding for the sake of expanding

---

## Current State Analysis

### GitHub Status
- **Open PRs:** 1 (#477 - composer.json for PHP package managers)
- **Open Issues:** 1 (#473 - LGPL license references in _bc.js)

### Technical Debt
- Babel 6.x (deprecated since 2018)
- Mocha (works but Vitest is modern standard)
- CommonJS (ESM is the future)
- JavaScript (TypeScript provides safety)
- No cross-language verification

### Test Coverage
- 909 tests passing
- Tests generated from example comments
- **Critical gap:** No verification against actual PHP/Go/Python/Ruby/C

---

## Strategic Priorities

### Priority 1: Cross-Language Verification (HIGH IMPACT)

**Problem:** Expected outputs in comments may be wrong (found 5 bugs already)

**Solution:** Build a verification harness that:
1. Parses example comments from function headers
2. Translates examples to source language syntax
3. Executes in actual PHP/Go/Python/Ruby/C
4. Compares output to our JavaScript implementation

```bash
# Example verification flow for PHP:
# 1. Extract: array_merge_recursive($arr1, $arr2)
# 2. Generate: php -r "print_r(array_merge_recursive(...));"
# 3. Compare output to JS result
```

**Files to create:**
- `scripts/verify-php.js` - Verify PHP functions against `php -r`
- `scripts/verify-go.js` - Verify Go functions against `go run`
- `scripts/verify-python.js` - Verify Python functions against `python -c`
- `scripts/verify.js` - Main harness

### Priority 2: Modernize Test Infrastructure

**Current:** Mocha 10.x + Babel 6.x
**Target:** Vitest + native ESM

**Benefits of Vitest:**
- 10-20x faster than Mocha
- Native TypeScript support
- ESM-first
- Watch mode with HMR
- Compatible with Jest API

**Migration steps:**
1. Install vitest
2. Convert test configuration
3. Update test scripts
4. Remove mocha, babel-register

### Priority 3: TypeScript Migration

**Approach:** Gradual migration with `allowJs: true`
1. Add `tsconfig.json` with loose settings
2. Rename files incrementally (.js → .ts)
3. Add types progressively
4. Enable strict mode eventually

**Benefits:**
- Better IDE support
- Catch bugs at compile time
- Self-documenting code
- Easier refactoring

### Priority 4: Dependency Modernization

```bash
# Safe updates (do first)
yarn add -D prettier@latest debug@latest remark-cli@latest

# Remove Babel (after ESM migration)
yarn remove babel-cli babel-core babel-eslint babel-preset-es2015 \
  babel-register babel-plugin-*

# Major updates (requires testing)
eslint 8 → 9 (breaking changes)
mocha → vitest (different API)
```

**Add new tools:**
```bash
yarn add -D knip vitest @types/node typescript
```

### Priority 5: Community Engagement

**Open PR #477 (composer.json):**
- Review the PR
- If sensible, merge it
- Allows PHP developers to use locutus via Composer

**Open Issue #473 (LGPL in _bc.js):**
- Check if _bc.js code is actually LGPL-derived
- If so, either:
  - Rewrite from scratch (MIT compatible)
  - Clearly document the dual-licensing
  - Remove the file

---

## Curation Guidelines

### Functions Worth Porting

**High Value:**
- `sprintf` / `printf` - Complex formatting
- `strtotime` - Date parsing from strings
- `serialize` / `unserialize` - PHP serialization format
- `date` / `strftime` - Date formatting with format strings
- `preg_*` - Regex with PHP-style patterns
- `json_encode` / `json_decode` - With PHP-specific options
- `array_*` - Functions with complex logic (merge_recursive, multisort)

**Medium Value:**
- Functions that differ subtly from JS equivalents
- Functions with edge cases JS doesn't handle
- Educational examples of language differences

**Low Value (avoid):**
- Direct wrappers (`strlen` → `s.length`)
- Functions that exist in modern JS (`Array.includes`, etc.)
- Trivial transformations

### Before Adding a Function, Ask:

1. Does this provide value beyond native JS?
2. Is the implementation non-trivial?
3. Do developers actually search for this?
4. Does it match PHP/Go/Python behavior correctly?
5. Is it tested against the actual language?

---

## Website Improvements

### Current Issues
- Search functionality needs improvement
- No interactive examples
- No performance comparisons
- Dated design

### Improvements
1. Add interactive REPL for each function
2. Show "equivalent native JS" where applicable
3. Add browser/Node compatibility notes
4. Performance benchmarks for critical functions
5. Better SEO for function pages

---

## Release Process

### Regular Releases
1. Review open PRs monthly
2. Close stale issues
3. Update CHANGELOG.md
4. `npm version patch -m "Release v%s"`
5. `git push --tags` (triggers npm publish)

### Major Releases (TypeScript, ESM)
1. Create migration branch
2. Document breaking changes
3. Beta testing period
4. Major version bump

---

## Immediate Action Items

### This Session
- [ ] Create cross-language verification POC for PHP
- [ ] Review PR #477 (composer.json)
- [ ] Investigate issue #473 (LGPL)
- [ ] Update yarn to 4.12.0

### This Week
- [ ] Add knip, run analysis
- [ ] Create vitest migration branch
- [ ] Document functions that should be removed (trivial wrappers)

### This Month
- [ ] Complete vitest migration
- [ ] Start TypeScript migration
- [ ] First verified release

---

## Metrics for Success

- Test pass rate: 100%
- Cross-language verification: 100% of functions
- No trivial wrapper functions
- Regular releases (monthly)
- PR response time < 1 week
- Issue response time < 1 week

---

*This roadmap should be reviewed and updated quarterly.*
