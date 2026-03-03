import { execFileSync } from 'node:child_process'
import fs from 'node:fs'

const allowedJsFiles = new Set<string>([
  '.remarkrc.mjs',
  'website/themes/icarus/scripts/fancybox.js',
  'website/themes/icarus/scripts/locutus_stats.js',
  'website/themes/icarus/scripts/meta.js',
  'website/themes/icarus/scripts/thumbnail.js',
  'website/themes/icarus/source/js/insight.js',
  'website/themes/icarus/source/js/locutus.js',
  'website/themes/icarus/source/js/main.js',
  'website/themes/icarus/source/vendor/fancybox/helpers/jquery.fancybox-buttons.js',
  'website/themes/icarus/source/vendor/fancybox/helpers/jquery.fancybox-media.js',
  'website/themes/icarus/source/vendor/fancybox/helpers/jquery.fancybox-thumbs.js',
  'website/themes/icarus/source/vendor/fancybox/jquery.fancybox.js',
  'website/themes/icarus/source/vendor/fancybox/jquery.fancybox.pack.js',
  'website/themes/icarus/source/vendor/jquery/2.1.3/jquery.min.js',
])

const output = execFileSync('git', ['ls-files', '*.js', '*.mjs'], { encoding: 'utf8' }).trim()
const trackedJsFiles = output
  .split('\n')
  .map((filePath) => filePath.trim())
  .filter((filePath) => filePath.length > 0)
  .filter((filePath) => fs.existsSync(filePath))
  .sort((left, right) => left.localeCompare(right))

const unexpectedFiles = trackedJsFiles.filter((filePath) => !allowedJsFiles.has(filePath))

if (unexpectedFiles.length > 0) {
  console.error('Unexpected .js/.mjs files detected. Port these to TypeScript or update allowlist intentionally:')
  for (const filePath of unexpectedFiles) {
    console.error(`  - ${filePath}`)
  }
  process.exit(1)
}

console.log(`js policy ok: ${trackedJsFiles.length} allowed .js/.mjs file(s)`)
