# Maintainer Cycle

## Vision

Locutus is **the** reference implementation for cross-language standard library functions in JavaScript. Every function should be:

1. **Verified** - Tested against actual language runtimes (not just JS unit tests)
2. **Documented** - Clear examples, edge cases, and differences from native
3. **Typed** - Full TypeScript definitions
4. **Modern** - ESM, tree-shakeable, zero dependencies

## Workflow

The steps the most important maintainer tasks. When you finish the last, start again at step 1.

Note that for any task, it's important to first get ample context. Search past issues, check Project goals, check recent commits, search the codebase. See if the work was already done., and makes sense within the project philosophy.

1. Finish any pending work that is still open locally. This can be determined by looking at the `docs/prompts/LOG.md`, and inspecting the worktree. Update the last iteration if needed according the the rules in `docs/prompts/LOG.md`
2. Use `gh` to check on pending PRs. Make sure they have reviews, ensure they pass, fix them if needed, then look at them a next invocation. If all is green, merge. If you write comments make sure they are hyper consise and dense. Consider that you will be posting as `@kvz`.
3. Triage issues. Confirm repro, decide scope, and say no when needed to protect project goals (see `## Vision`, `README.md` and `website/source/about.md`).
4. In order to continuously modernize the project, revise the Backlog/Roadmap in `CHANGELOG.md`. Don't forget about the website, which lives in this repo and is deployed via GHA. Check off items and/or move them into releases as appropriate.
5. Pick an issue to work on. This could come from the Backlog/Roadmap in `CHANGELOG.md` or a verified GitHub issue, or addresing a PR fail, or unfinished business, security issues, do what is most important and impactful first. Determine what makes a succesful outcome, and if you can test this. It could involve writing a test first, using an MCP browser to make screenshots of a new design, or a working migration, for example. This is imperative. No changes without being able to validate the outcome, and doing so. Any change that we cannot validate shall not be PRed, and shall not be merged. 
6. Start a new branch for any sufficiently new change. No comitting to `main`.
7. After the change:
    1. Validate the work as you planned, use the browser, run the test
    2. Run `yarn check`
    3. If it was a migration, search for the old, and rip it out
    4. Update `CHANGELOG.md`, the website, `CONTRIBUTING.md`, the `README.md`, etc if needed. 
    5. Run one ast `yarn check`
    6. If there was any issue, go back to 7.1
8. Release any unreleased merged PRs on npm
9. Log an iteration in `docs/prompts/LOG.md`.
10. → Back to step 1

