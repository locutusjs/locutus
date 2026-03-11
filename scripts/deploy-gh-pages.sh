#!/usr/bin/env bash

set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
deploy_branch="${DEPLOY_BRANCH:-gh-pages}"
deploy_remote="${DEPLOY_REMOTE:-origin}"
source_dir="${DEPLOY_SOURCE_DIR:-$repo_root/website/public}"
dry_run="${DRY_RUN:-0}"
worktree_dir="$(mktemp -d "${TMPDIR:-/tmp}/locutus-gh-pages.XXXXXX")"
worktree_branch="deploy-gh-pages-${RANDOM}-$$"
default_commit_message="Deploy website from ${GITHUB_SHA:-local}"
commit_message="${DEPLOY_COMMIT_MESSAGE:-$default_commit_message}"

cleanup() {
  git -C "$repo_root" worktree remove --force "$worktree_dir" >/dev/null 2>&1 || true
  rm -rf "$worktree_dir"
  git -C "$repo_root" branch -D "$worktree_branch" >/dev/null 2>&1 || true
}

trap cleanup EXIT

if [ ! -d "$source_dir" ]; then
  printf 'Missing deploy source directory: %s\n' "$source_dir" >&2
  exit 1
fi

if ! git ls-remote --exit-code --heads "$deploy_remote" "$deploy_branch" >/dev/null 2>&1; then
  printf 'Missing remote branch %s/%s\n' "$deploy_remote" "$deploy_branch" >&2
  exit 1
fi

git -C "$repo_root" fetch "$deploy_remote" "$deploy_branch"
git -C "$repo_root" branch -f "$worktree_branch" "refs/remotes/$deploy_remote/$deploy_branch" >/dev/null
git -C "$repo_root" worktree add --force --detach "$worktree_dir" "$worktree_branch" >/dev/null

rsync -a --delete --exclude=.git --exclude=.git/ "$source_dir"/ "$worktree_dir"/

if [ -z "$(git -C "$worktree_dir" status --short)" ]; then
  printf 'No website changes to deploy\n'
  exit 0
fi

git -C "$worktree_dir" config user.name "${GIT_AUTHOR_NAME:-github-actions[bot]}"
git -C "$worktree_dir" config user.email "${GIT_AUTHOR_EMAIL:-41898282+github-actions[bot]@users.noreply.github.com}"
git -C "$worktree_dir" add --all

if [ -z "$(git -C "$worktree_dir" diff --cached --name-only)" ]; then
  printf 'No staged website changes to deploy\n'
  exit 0
fi

git -C "$worktree_dir" commit -m "$commit_message" >/dev/null

if [ "$dry_run" = "1" ]; then
  printf 'Dry run enabled; skipping push to %s/%s\n' "$deploy_remote" "$deploy_branch"
  exit 0
fi

git -C "$worktree_dir" push --force "$deploy_remote" "HEAD:$deploy_branch"
