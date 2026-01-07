# Maintainer Cycle

## Vision

Locutus is **the** reference implementation for cross-language standard library functions in JavaScript. Every function should be:

1. **Verified** - Tested against actual language runtimes (not just JS unit tests)
2. **Documented** - Clear examples, edge cases, and differences from native
3. **Typed** - Full TypeScript definitions
4. **Modern** - ESM, tree-shakeable, zero dependencies

## Workflow

These steps cover the most important maintainer tasks. When you finish the last, start again at step 1.

Note that for any task, it's important to first get ample context. Search past issues, check project goals, review recent commits, and search the codebase. See if the work was already done and whether it fits the project philosophy.

1. Finish any pending work that is still open locally. This can be determined by looking at `docs/prompts/LOG.md` and inspecting the worktree. Update the last iteration if needed according to the rules in `docs/prompts/LOG.md`, open a new one for the current iteration, updating it with plans, key learinngs, progress as you go. Revise the document if it is in violation of its rules.
2. Use `gh` to check on pending PRs. Make sure they have reviews, ensure they pass, fix them if needed, then re-check next invocation. If all is green, merge. If you write comments, make sure they are hyper concise and dense. Consider that you will be posting as `@kvz`.
3. Triage issues. Confirm repro, decide scope, and say no when needed to protect project goals (see `## Vision`, `README.md` and `website/source/about.md`).
4. To continuously modernize the project, revise the Backlog/Roadmap in `CHANGELOG.md`. Don't forget about the website, which lives in this repo and is deployed via GHA. Check off items and/or move them into releases as appropriate.
5. Pick an issue to work on. It could come from the Backlog/Roadmap in `CHANGELOG.md`, a verified GitHub issue, a PR failure, unfinished business, or a security concern. Do what is most important and impactful first. Define what a successful outcome looks like and how you'll validate it (tests, browser checks, screenshots for design changes, or a working migration). This is imperative: no changes without validation. Anything that can't be validated should not be PR'ed or merged.
6. Start a new branch for any sufficiently new change. No committing to `main`.
7. After the change:
    - Validate the work as planned (browser checks, tests, etc.).
    - Run `yarn check`.
    - If it was a migration, search for the old and remove it.
    - Update `CHANGELOG.md`, the website, `CONTRIBUTING.md`, the `README.md`, etc. if needed.
    - Run one last `yarn check`.
    - If there was any issue, go back to step 7.1.
8. Release any recently merged PRs that are still unreleased.
9. Log an iteration in `docs/prompts/LOG.md`.
10. → Back to step 1
