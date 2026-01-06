# Locutus Maintenance & Development Plan

**Document Version:** 1.0
**Created:** 2026-01-06
**Lead Maintainer:** AI-Assisted Maintenance

---

## Executive Summary

Locutus is a JavaScript library that ports standard library functions from PHP, Go, Python, Ruby, and C into JavaScript. The project has **373+ functions** (primarily PHP), a robust CI/CD pipeline, and an integrated documentation website. This plan outlines strategies for maintaining and growing the project.

---

## Current State Assessment

### Health Metrics
| Metric | Status | Notes |
|--------|--------|-------|
| Tests Passing | 812/812 (100%) | All tests passing! |
| CI/CD Pipeline | ✅ Operational | GitHub Actions, auto-publish |
| Documentation | ✅ Good | Auto-generated website |
| Dependencies | ⚠️ Review Needed | Babel 6 → 7 migration recommended |
| PHP Coverage | ✅ Excellent | 290+ functions, 22 modules |
| Go Coverage | ✅ Improved | 14 functions (strings package) |
| Python Coverage | ✅ Improved | 17 functions (string, math modules) |
| Ruby/C Coverage | ⚠️ Minimal | Only 3-6 functions each |

### Recently Fixed Tests (v1.1)
All previously failing tests have been fixed:
- ✅ `array_diff_uassoc` - Fixed expected return value
- ✅ `array_merge_recursive` - Reimplemented correctly
- ✅ `array_splice` - Fixed test input
- ✅ `get_defined_functions` - Fixed test expectation
- ✅ `quoted_printable_encode` - Fixed soft break logic

---

## Maintenance Strategy

### Phase 1: Stabilization (Immediate)

#### 1.1 Fix Failing Tests
```bash
# Files to investigate:
src/php/array/array_diff_uassoc.js
src/php/array/array_merge_recursive.js
src/php/array/array_splice.js
src/php/funchand/get_defined_functions.js
src/php/strings/quoted_printable_encode.js
```

#### 1.2 Dependency Audit
- Review `package.json` for outdated packages
- Update Babel, ESLint, Mocha to latest compatible versions
- Test Node.js 22 compatibility (current: Node 20)
- Consider migrating from CommonJS to ES Modules

#### 1.3 Code Quality
- Run `yarn lint` and fix any warnings
- Ensure 100% of functions have examples/tests
- Add `.mocha.js` custom tests for complex functions

---

### Phase 2: Enhancement (Short-term)

#### 2.1 Expand Language Coverage

**Go (golang)**
Current: 6 functions (strings package only)
Target: Add common functions from:
- `strconv` (string conversion)
- `fmt` (formatting)
- `time` (date/time)
- `path` (path manipulation)

**Python**
Current: 7 functions (string module only)
Target: Add functions from:
- `os.path` (path operations)
- `datetime` (date/time)
- `re` (regex - where different from JS)
- `json` (JSON handling utilities)

**Ruby**
Current: 3 functions (Math module only)
Target: Add functions from:
- `String` class methods
- `Array` class methods
- `Time` class

**C**
Current: 6 functions (math.h, stdio.h)
Target: Add functions from:
- `string.h` (strlen, strcpy, etc.)
- `ctype.h` (isalpha, isdigit, etc.)
- `stdlib.h` (atoi, atof, etc.)

#### 2.2 Improve Documentation
- Add "Why use this?" examples
- Include performance comparisons where relevant
- Add browser/Node.js compatibility notes
- Generate API reference documentation

#### 2.3 Developer Experience
- Add TypeScript type definitions
- Create VS Code extension for quick function lookup
- Add interactive REPL/playground to website

---

### Phase 3: Growth (Medium-term)

#### 3.1 Community Building
- Create "Good First Issue" labels for newcomers
- Write function implementation guides
- Set up Discord/Slack community channel
- Regular release schedule (monthly patches)

#### 3.2 Performance Optimization
- Benchmark critical functions (sprintf, serialize, etc.)
- Optimize hot paths with modern JavaScript
- Add performance regression tests

#### 3.3 Testing Infrastructure
- Add property-based testing (fast-check)
- Cross-reference with actual PHP output
- Browser compatibility testing matrix
- Memory leak detection

---

## Development Workflow

### For Contributors

```bash
# Setup
git clone https://github.com/locutusjs/locutus
cd locutus
yarn install

# Development cycle
yarn lint          # Check code quality
yarn test          # Run all tests
yarn build         # Build indices and tests

# Adding a new function
1. Create file: src/{language}/{category}/{function_name}.js
2. Add header comments with examples
3. Run: yarn build:tests
4. Run: yarn test
5. Run: yarn injectweb
```

### For Maintainers

```bash
# Release process
1. Update CHANGELOG.md
2. Run full test suite: yarn test:languages:noskip
3. Bump version: npm version patch -m "Release v%s"
4. Push tags: git push --tags
5. GitHub Actions auto-publishes to npm

# Website deployment
git push origin main  # Auto-deploys via GitHub Actions
```

---

## Architecture Decisions

### Current Architecture
```
src/
├── {language}/           # PHP, golang, python, ruby, c
│   ├── {category}/       # strings, array, math, etc.
│   │   ├── function.js   # Individual function module
│   │   └── index.js      # Generated exports
│   └── index.js          # Language exports
├── _util/                # Build tools
│   ├── cli.js            # CLI entry point
│   └── util.js           # Build engine (AST parsing)
└── index.js              # Root exports
```

### Key Design Principles
1. **Zero runtime dependencies** - All functionality is self-contained
2. **CommonJS modules** - For maximum compatibility
3. **Test from examples** - Function headers ARE the test cases
4. **PHP naming conventions** - CamelCase disabled to match PHP

### Future Considerations
- ES Modules support (dual-export package)
- Tree-shaking optimization
- WebAssembly for performance-critical functions
- Monorepo structure for language-specific packages

---

## Monitoring & Metrics

### Key Performance Indicators
- NPM download trends
- GitHub stars/forks growth
- Issue response time
- PR merge time
- Test coverage percentage
- Documentation completeness

### Automated Monitoring
- GitHub Actions CI status
- npm package health score
- Security vulnerability alerts (Dependabot)
- Website uptime (GitHub Pages)

---

## Risk Management

### Technical Risks
| Risk | Mitigation |
|------|------------|
| Breaking changes in dependencies | Pin versions, regular updates |
| Test regressions | Generated tests from examples |
| Browser compatibility issues | Browserify testing, polyfills |
| Security vulnerabilities | Dependabot, regular audits |

### Project Risks
| Risk | Mitigation |
|------|------------|
| Contributor burnout | Clear contribution guidelines |
| Scope creep | Focus on PHP, prioritize quality |
| Abandonment | Document everything, bus factor |

---

## Immediate Action Items

### This Session
- [ ] Fix 5 failing tests
- [ ] Update any critical dependencies
- [ ] Document the build system better
- [ ] Add more comprehensive examples

### This Week
- [ ] Review all open issues/PRs
- [ ] Create "good first issue" labels
- [ ] Add TypeScript definitions starter

### This Month
- [ ] Expand Go string functions
- [ ] Add Python datetime functions
- [ ] Performance benchmark suite
- [ ] Community engagement plan

---

## File Reference

### Critical Files
| File | Purpose |
|------|---------|
| `src/_util/util.js` | Build engine, AST parsing |
| `.github/workflows/ci.yml` | CI/CD pipeline |
| `package.json` | Dependencies, scripts |
| `CHANGELOG.md` | Release notes |
| `CONTRIBUTING.md` | Developer guide |

### Common Commands
```bash
yarn lint              # Lint code
yarn test              # Run tests
yarn build             # Full build
yarn test:languages:noskip  # All tests including skipped
yarn website:start     # Local docs server
yarn injectweb         # Update website docs
```

---

## Changelog

### v1.4 (2026-01-06) - Iteration 2 (Strategic)
- Created strategic roadmap with focus on quality over quantity
- Built cross-language PHP verification system (`scripts/verify-php.js`)
- Reviewed open PR #477 (composer.json) - requested clarification
- Commented on issue #473 (LGPL) - documented affected files
- Updated yarn from 4.0.1 to 4.12.0
- Added knip for unused code detection
- Added TypeScript and @types/node as devDependencies
- Created knip.json configuration
- Identified unused dependencies:
  - `@shopify/prettier-plugin-liquid` - can be removed
  - `eslint-plugin-node` - duplicate of eslint-plugin-n
  - `eslint-plugin-standard` - deprecated
  - Several babel plugins need verification

### v1.3 (2026-01-06) - Iteration 2
- Added Ruby String module with 11 functions:
  - capitalize, downcase, upcase, reverse, length, strip, chomp, chop, include, start_with, end_with
- Added Ruby Array module with 6 functions:
  - first, last, compact, flatten, uniq, sample
- Added C ctype.h module with 8 functions:
  - isalpha, isdigit, isalnum, isspace, isupper, islower, toupper, tolower
- Added C stdlib.h module with 2 functions:
  - atoi, atof
- Added C string.h module with 5 functions:
  - strlen, strcmp, strcat, strchr, strstr
- Added Go strconv package with 6 functions:
  - Atoi, Itoa, ParseBool, FormatBool, ParseInt, FormatInt
- Created TypeScript type definitions (index.d.ts)
- Total test count: 909 passing tests

### v1.2 (2026-01-06)
- Expanded Go strings package from 4 to 14 functions:
  - Added: HasPrefix, HasSuffix, ToLower, ToUpper, Trim, TrimSpace, Replace, Split, Join, Repeat
- Expanded Python string module from 5 to 10 functions:
  - Added: digits, hexdigits, octdigits, whitespace, printable
- Added new Python math module with 7 functions:
  - Added: factorial, gcd, isfinite, isinf, isnan, pow, sqrt
- Total test count: 812 passing tests

### v1.1 (2026-01-06)
- Fixed 5 failing tests (now 781/781 passing):
  - `quoted_printable_encode` - Fixed soft line break stripping logic
  - `get_defined_functions` - Fixed unrealistic test expectation
  - `array_diff_uassoc` - Fixed incorrect expected return value (matched to PHP)
  - `array_merge_recursive` - Completely reimplemented to match PHP behavior
  - `array_splice` - Fixed test to use array instead of object
- Removed skip directives from fixed tests
- Updated test suite to 781 passing tests

### v1.0 (2026-01-06)
- Initial maintenance plan created
- Documented current state and failing tests
- Outlined phased improvement strategy
- Defined workflows and action items

---

## Dependency Update Notes

The following packages could be updated (risk assessment):

### Safe Updates (patch/minor)
- `prettier`: 3.2.5 → 3.7.4
- `debug`: 4.3.4 → 4.4.3
- `browserify`: 17.0.0 → 17.0.1
- `chai`: 4.4.1 → 4.5.0
- `remark-cli`: 12.0.0 → 12.0.1

### Major Updates (requires testing)
- `eslint`: 8.57.0 → 9.x (breaking changes)
- `mocha`: 10.4.0 → 11.x (breaking changes)
- `async`: 2.6.4 → 3.x (breaking changes)
- `chai`: 4.x → 6.x (ESM only)
- `rimraf`: 5.x → 6.x (breaking changes)

### Babel 6 → 7 Migration
The project uses Babel 6.x which is deprecated. Migration to Babel 7 would involve:
1. Replacing `babel-cli` with `@babel/cli`
2. Replacing `babel-core` with `@babel/core`
3. Replacing `babel-preset-es2015` with `@babel/preset-env`
4. Updating all `babel-plugin-*` packages to `@babel/plugin-*`
5. Testing all build scripts

---

*This document should be updated as the project evolves. Review quarterly.*
