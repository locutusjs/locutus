import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const cwd = process.cwd()
const srcDir = path.join(cwd, 'src')

const sourceFiles = ts.sys
  .readDirectory(srcDir, ['.ts'], undefined, undefined)
  .filter((filePath) => !filePath.endsWith('.d.ts'))

const tsNoCheckFiles = []
const tsExpectErrorFindings = []
const recordStringUnknownFindings = []

for (const filePath of sourceFiles) {
  const sourceText = fs.readFileSync(filePath, 'utf8')

  if (/@ts-nocheck\b/.test(sourceText)) {
    tsNoCheckFiles.push(path.relative(cwd, filePath))
  }

  const tsExpectErrorCount = (sourceText.match(/@ts-expect-error\b/g) || []).length
  if (tsExpectErrorCount > 0) {
    tsExpectErrorFindings.push({
      file: path.relative(cwd, filePath),
      count: tsExpectErrorCount,
    })
  }

  const recordStringUnknownCount = (sourceText.match(/\bRecord\s*<\s*string\s*,\s*unknown\s*>/g) || []).length
  if (recordStringUnknownCount > 0) {
    recordStringUnknownFindings.push({
      file: path.relative(cwd, filePath),
      count: recordStringUnknownCount,
    })
  }
}

let hasFailure = false

if (tsNoCheckFiles.length > 0) {
  hasFailure = true
  console.error(`Forbidden @ts-nocheck directives found in ${tsNoCheckFiles.length} file(s):`)
  for (const file of tsNoCheckFiles) {
    console.error(`  - ${file}`)
  }
}

if (tsExpectErrorFindings.length > 0) {
  hasFailure = true
  const total = tsExpectErrorFindings.reduce((sum, finding) => sum + finding.count, 0)
  console.error(`Forbidden @ts-expect-error directives found: ${total}`)
  for (const finding of tsExpectErrorFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (recordStringUnknownFindings.length > 0) {
  hasFailure = true
  const total = recordStringUnknownFindings.reduce((sum, finding) => sum + finding.count, 0)
  console.error(`Forbidden Record<string, unknown> usages found: ${total}`)
  for (const finding of recordStringUnknownFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (hasFailure) {
  process.exit(1)
}

console.log('ts debt policy ok: @ts-nocheck 0, @ts-expect-error 0, Record<string, unknown> 0')
