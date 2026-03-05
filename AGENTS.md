# Agent Rules

## Rosetta Mapping Is Mandatory

- When adding or renaming any function in `src/<language>/<category>/<function>.ts`, update `website/source/_data/rosetta.yml` in the same change.
- If a semantic equivalent exists, add the function path to that existing group.
- If no reasonable equivalent exists yet, create a new group and include the function there (single-entry groups are allowed until more equivalents are added).
- Do not merge function additions that leave Rosetta entries missing.
