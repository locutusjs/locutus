# Maintainer Cycle

## Vision

Locutus is **the** reference implementation for cross-language standard library functions in JavaScript. Every function should be:

1. **Verified** - Tested against actual language runtimes (not just JS unit tests)
2. **Documented** - Clear examples, edge cases, and differences from native
3. **Typed** - Full TypeScript definitions
4. **Modern** - ESM, leverage JS features when 95% of browser support them
5. **Dependency Free** - Locutus only has devDependencies for tooling, but zero for consumers

## Workflow

These steps cover the most important maintainer tasks. When you finish the last, start again at step 1.

Note that for any task, it's important to first get ample context. Search past issues, check project goals, review recent commits, and search the codebase. See if the work was already done and whether it fits the project philosophy.

1. Finish any pending work that is still open locally. This can be determined by looking at `docs/prompts/LOG.md` and inspecting the worktree. Update the last iteration if needed according to the rules in `docs/prompts/LOG.md`, open a new one for the current iteration, updating it with plans, key learinngs, progress as you go. Revise the document if it is in violation of its rules.
2. Use `gh` to check on pending PRs. First run `gh auth status` to understand what our GitHub identity is. Make sure all PRs have reviews by other people than our identity (fixable only when PRs are submitted by others), that PRs pass (fixable only if they were submitted by US), fix what can be fixed, then re-check next iteration. If all is green, merge. LLMs should refrain from commenting on PRs, but deep reviews on PRs by others are allowed.
3. Triage issues. Confirm repro, decide scope, and say no when needed to protect project goals (see `## Vision`, `README.md`, `CHANGELOG.md`, and `website/source/about.md`). LLMs should refrain from commenting on Issues.
4. To continuously modernize the project, revise the Backlog/Roadmap in `CHANGELOG.md`. Don't forget about the website, which lives in this repo and is deployed via GHA. Check off items and/or move them into releases as appropriate.
5. Decide an issue to work on. **Before starting, check:** What areas have received attention in the last 5 iterations? Prioritize neglected areas. Balance time across: verification (all languages), modernization, TypeScript, website, dependencies.

    It could come from:
    - a security concern
    - the Backlog/Roadmap in `CHANGELOG.md` (balance across different items)
    - a verified GitHub issue
    - a PR failure
    - upgrading outdated dependencies, checking release notes, taking care of the potential migration, leveraging new capabilities
    - unfinished business

    Do what is most important and impactful first. First search what is already available, and what we can already re-use, even if it takes a little refactoring. Define what a successful outcome looks like and how you'll validate it (tests, browser checks, screenshots for design changes, or a working migration). This is imperative: no changes without validation. Anything that can't be validated should not be PR'ed or merged.
6. **NEVER commit directly to `main`.** Always create or re-use a goal-oriented branch:
    ```bash
    git checkout [-]b feat/descriptive-goal  # or fix/, chore/, docs/
    ```
    Exceptions: `CORE_MAINTAINER.md`, `CHANGELOG.md`, and `docs/prompts/LOG.md` can be pushed directly to main.
7. Log the plan in `docs/prompts/LOG.md`. Work can span multiple iterations on the same branch.
8. Start implementing. Make incremental commits as you go.
9. **Create a PR only when you've made significant progress** (not after each small change):
    - **Expansion**: ~10-15% coverage increase or ~10+ functions
    - **Verification/Refactoring**: 10+ functions fixed or complete a coherent unit
    - **Bug fixes/security**: Individual PRs are fine for discrete issues

    Before creating the PR:
    - Validate the work (tests, browser checks, etc.)
    - Run `yarn check`
    - Update documentation if needed
    - **For new functions**: Check if semantic equivalents exist in other languages and update `src/rosetta.yml`
    - **For website changes**: After merge, verify the live site at https://locutus.io using Playwright MCP
10. Release recently merged PRs that contain new/changed functions (not just build tools, tests, or docs).
11. Log iteration results in `docs/prompts/LOG.md`.
12. → Back to step 1

## Quality Standards

- Zero tolerance: failing tests, Biome errors, unverified implementations (eventually).
- Acceptable warnings: LGPL code (`src/php/_helpers/_bc.js`, `src/php/bc/*`) that can't be modified; intentional `eval`/`new Function` with `biome-ignore` + explanation; style warnings in complex algorithms.
- Keep one plan: update existing docs (like `CHANGELOG.md` and `CORE_MAINTAINER.md`) instead of creating new plans.

## Lessons Learned

- **Always use branches**: Never push to `main` directly. Create a branch, open a PR, let CI run, then merge. This applies even for "small fixes" - they often aren't.
- Verify against reality: unit tests aren't enough; run actual PHP/Go/Python/Ruby/C when possible.
- Don't duplicate infrastructure: check `src/_util/` before creating new tools.
- Document in the right place: LICENSE, README, SPDX headers, not just issues.
- Biome unsafe fixes can break code: always test after auto-fix.
- `eval()` is sometimes necessary: suppress with explanation, don't fight it.
- **Batch related work**: Accumulate related changes before creating a PR. For expansion, aim for 10+ functions per PR to avoid noise.
- **Rosetta Stone mappings**: When adding functions, check `src/rosetta.yml` for semantic equivalents (e.g., PHP `strtolower` ↔ Ruby `downcase` ↔ Go `ToLower`). This enables cross-language discovery on the website.
