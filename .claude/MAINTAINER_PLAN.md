# Locutus Maintenance Plan

**Last Updated:** 2026-01-06
**Philosophy:** Quality over quantity. Curate with taste.

---

## Project Overview

Locutus is a JavaScript library that ports standard library functions from PHP, Go, Python, Ruby, and C. The project has **373+ functions** (primarily PHP), focusing on complex implementations that provide real value beyond native JavaScript.

### Current Status
- **Tests:** 910 passing
- **Linting:** Biome (migrated from ESLint + Prettier)
- **Build:** Babel 6 (legacy, migration planned)
- **Package Manager:** Yarn 4.12.0

---

## Known Issues & Licensing

### BC Math LGPL Licensing (Issue #473)

The following files contain code derived from PHP's bcmath extension, which is LGPL licensed:

- `src/php/_helpers/_bc.js` - Core bcmath implementation
- `website/source/php/_helpers/_bc.html` - Documentation

**Status:** This code has LGPL copyleft implications. Users of locutus who include these BC math functions may need to comply with LGPL requirements for that portion of their codebase.

**Affected functions:**
- `bcadd`, `bcsub`, `bcmul`, `bcdiv`, `bccomp`, `bcround`, `bcscale`

**Recommendation for users:** If LGPL compliance is a concern, avoid importing the `bc*` functions. The rest of locutus is MIT licensed.

---

## Development Workflow

### Quick Commands

```bash
yarn check          # Format, lint, type-check, test (run after changes)
yarn test           # Full test suite
yarn lint           # Biome check
yarn fix:biome      # Auto-fix linting issues
yarn build          # Build everything
```

### Adding a New Function

1. Create file: `src/{language}/{category}/{function_name}.js`
2. Add header comments with examples (these become tests)
3. Run: `yarn build:tests && yarn test`
4. Run: `yarn check` to verify formatting

### Commit Guidelines

- Get something merged before doing more work
- Keep PRs focused and small
- Run `yarn check` before committing

---

## Strategic Priorities

### Priority 1: Code Quality
- Zero biome warnings (suppress only when necessary with comments)
- Remove trivial wrapper functions
- Verify implementations against actual languages

### Priority 2: Modernization (Planned)
- Vitest migration (from Mocha)
- TypeScript migration (gradual)
- ESM support

### Priority 3: Community
- Respond to PRs/issues within a week
- Regular releases (monthly patches)

---

## Curation Guidelines

### Functions Worth Porting (High Value)
- Complex implementations: `sprintf`, `strtotime`, `serialize`, `date`
- PHP-specific behavior: `array_merge_recursive`, `json_encode` options
- Educational value: showing language differences

### Functions to Avoid (Low Value)
- Direct wrappers (`strlen` = `s.length`)
- Functions in modern JS (`Array.includes`, etc.)
- Trivial transformations

### Before Adding a Function, Ask:
1. Does this provide value beyond native JS?
2. Is the implementation non-trivial?
3. Have you verified against actual PHP/Go/Python?

---

## Changelog

### 2026-01-06 - Biome Migration
- Migrated from ESLint + Prettier to Biome
- Removed 12 ESLint/Prettier dependencies
- Fixed variable scoping issues in 6 files after auto-fix
- Added `yarn check` command for quick validation

### 2026-01-06 - Initial Setup
- Fixed 5 failing tests
- Expanded Go, Python, Ruby, C coverage
- Created TypeScript definitions
- Updated yarn to 4.12.0
- Added knip for unused code detection

---

## Lessons Learned

1. **Biome's unsafe fixes can break code** - Variable declarations with multiple variables (`let i, j = 0`) get split incorrectly. Always run tests after auto-fix.

2. **Keep one plan document** - Don't create multiple strategy docs. Revise this one.

3. **Merge before adding more** - Get changes merged before piling on more work.

4. **Clean up thoroughly** - After migrations, remove ALL traces (including suppression comments).

5. **eval() is sometimes necessary** - For PHP function ports like `json_decode`, `create_function`, `is_callable`, eval is legitimately needed. Suppress the warning with a comment explaining why.

6. **Document licensing in the right places** - Don't just comment on issues. Update LICENSE, README, and add SPDX headers to affected files.

7. **Don't duplicate existing infrastructure** - Check src/_util/ before creating new scripts. The test generation and parsing utilities already exist.

---

## Open Items

### PR #477 - composer.json
Status: Open, awaiting clarification on use case

### Issue #473 - LGPL in _bc.js
Status: **Resolved.** LGPL licensing now documented in LICENSE, README, and _bc.js header.

---

*Review and update this document regularly.*
