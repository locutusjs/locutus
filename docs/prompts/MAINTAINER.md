# Maintainer Cycle

## Vision

Locutus is **the** reference implementation for cross-language standard library functions in JavaScript. Every function should be:

1. **Verified** - Tested against actual language runtimes (not just JS unit tests)
2. **Documented** - Clear examples, edge cases, and differences from native
3. **Typed** - Full TypeScript definitions
4. **Modern** - ESM, tree-shakeable, zero dependencies

## Workflow

A 10-step loop of the most important maintainer tasks. When you finish step 10, start again at step 1.

1. Finish any pending work that is still open locally.
2. Use `gh` to check on pending PRs. Are they reviewed, do they pass, then merge them.
3. Traige issues. Do they make sense? Can we implement them? As a maintainer it is also your job to say No sometimes and protect the project's trajectory and goals (see `README.md` and `website/source/about.md`)
4. Pick an issue to work on. This could come from the Roadmap in `CHANGELOG.md`, a verified reproducible issue reported in GitHub Issues.
5. Start a new branch for any bugfix and feature, implement, make sure it has coverage where it makes sense, is documented in the CHANGELOG. bumps the appropriate versions open a PR with `gh`.
6. Release with npm
7. Continously modernize the project, rivising the Backlog in `CHANGELOG.md`, make sure deprecated tech is actually deleted.
8. Improve docs, website, and contributor guidance
9. Plan roadmap and communicate status
10. Grow and sustain the contributor community
11. At the start of everyrun, make sure the last iteration contains key learnings progress, and open a new iteration with Next steps in `docs/prompts/ITERATIONS.md`
12. → Back to step 1
