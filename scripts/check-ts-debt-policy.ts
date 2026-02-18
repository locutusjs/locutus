import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

interface Finding {
  file: string
  count: number
}

const cwd = process.cwd()
const srcDir = path.join(cwd, 'src')

const sourceFiles = ts.sys
  .readDirectory(srcDir, ['.ts'], undefined, undefined)
  .filter((filePath) => !filePath.endsWith('.d.ts'))

const tsNoCheckFiles: string[] = []
const tsIgnoreFindings: Finding[] = []
const tsExpectErrorFindings: Finding[] = []
const recordStringUnknownFindings: Finding[] = []
const functionTypeFindings: Finding[] = []
const asUnknownAsFindings: Finding[] = []
const argumentsIdentifierFindings: Finding[] = []

const countFunctionTypeReferences = (sourceFile: ts.SourceFile): number => {
  let count = 0

  const visit = (node: ts.Node): void => {
    if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName) && node.typeName.text === 'Function') {
      count += 1
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return count
}

const countArgumentsIdentifiers = (sourceFile: ts.SourceFile): number => {
  let count = 0

  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && node.text === 'arguments') {
      count += 1
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return count
}

for (const filePath of sourceFiles) {
  const sourceText = fs.readFileSync(filePath, 'utf8')

  if (/@ts-nocheck\b/.test(sourceText)) {
    tsNoCheckFiles.push(path.relative(cwd, filePath))
  }

  const tsIgnoreCount = (sourceText.match(/@ts-ignore\b/g) || []).length
  if (tsIgnoreCount > 0) {
    tsIgnoreFindings.push({
      file: path.relative(cwd, filePath),
      count: tsIgnoreCount,
    })
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

  const asUnknownAsCount = (sourceText.match(/\bas\s+unknown\s+as\b/g) || []).length
  if (asUnknownAsCount > 0) {
    asUnknownAsFindings.push({
      file: path.relative(cwd, filePath),
      count: asUnknownAsCount,
    })
  }

  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const functionTypeCount = countFunctionTypeReferences(sourceFile)
  if (functionTypeCount > 0) {
    functionTypeFindings.push({
      file: path.relative(cwd, filePath),
      count: functionTypeCount,
    })
  }

  if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}`)) {
    const argumentsIdentifierCount = countArgumentsIdentifiers(sourceFile)
    if (argumentsIdentifierCount > 0) {
      argumentsIdentifierFindings.push({
        file: path.relative(cwd, filePath),
        count: argumentsIdentifierCount,
      })
    }
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

if (tsIgnoreFindings.length > 0) {
  hasFailure = true
  const total = tsIgnoreFindings.reduce((sum, finding) => sum + finding.count, 0)
  console.error(`Forbidden @ts-ignore directives found: ${total}`)
  for (const finding of tsIgnoreFindings) {
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

if (functionTypeFindings.length > 0) {
  hasFailure = true
  const total = functionTypeFindings.reduce((sum, finding) => sum + finding.count, 0)
  console.error(`Forbidden Function type usages found: ${total}`)
  for (const finding of functionTypeFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (asUnknownAsFindings.length > 0) {
  hasFailure = true
  const total = asUnknownAsFindings.reduce((sum, finding) => sum + finding.count, 0)
  console.error(`Forbidden 'as unknown as' casts found: ${total}`)
  for (const finding of asUnknownAsFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (argumentsIdentifierFindings.length > 0) {
  hasFailure = true
  const total = argumentsIdentifierFindings.reduce((sum, finding) => sum + finding.count, 0)
  console.error(`Forbidden 'arguments' identifier usages in src/php found: ${total}`)
  for (const finding of argumentsIdentifierFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (hasFailure) {
  process.exit(1)
}

console.log(
  "ts debt policy ok: @ts-nocheck 0, @ts-ignore 0, @ts-expect-error 0, Function type 0, Record<string, unknown> 0, 'as unknown as' 0, src/php arguments 0",
)
