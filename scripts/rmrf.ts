import fs from 'node:fs/promises'

const paths = process.argv.slice(2)

if (paths.length === 0) {
  console.error('rmrf.ts requires at least one path')
  process.exit(1)
}

await Promise.all(
  paths.map((targetPath) =>
    fs.rm(targetPath, {
      force: true,
      recursive: true,
    }),
  ),
)
