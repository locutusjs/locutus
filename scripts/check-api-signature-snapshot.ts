import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const cwd = process.cwd()
const shouldUpdate = process.argv.includes('--update')
const scopeArg = process.argv.find((arg) => arg.startsWith('--scope='))
const scope = scopeArg?.slice('--scope='.length) ?? 'php'

if (scope !== 'php' && scope !== 'non-php') {
  console.error(`Invalid --scope value: ${scope}`)
  console.error("Allowed values: 'php', 'non-php'")
  process.exit(1)
}

const isPhpScope = scope === 'php'
const snapshotPath = path.join(
  cwd,
  'docs',
  isPhpScope ? 'php-api-signatures.snapshot' : 'non-php-api-signatures.snapshot',
)
const srcRootDir = path.join(cwd, 'src')
const srcPhpDir = path.join(srcRootDir, 'php')
const label = isPhpScope ? 'PHP' : 'Non-PHP'

const hasExportModifier = (node: ts.Node): boolean =>
  !!node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)

const normalizeWhitespace = (value: string): string => value.replace(/\s+/g, ' ').trim()

const getFunctionSignatureText = (sourceFile: ts.SourceFile, declaration: ts.FunctionDeclaration): string => {
  const sourceText = sourceFile.getFullText()
  const start = declaration.getStart(sourceFile)
  const end = declaration.body ? declaration.body.getStart(sourceFile) : declaration.end
  return normalizeWhitespace(sourceText.slice(start, end))
}

const sourceFiles = ts.sys
  .readDirectory(isPhpScope ? srcPhpDir : srcRootDir, ['.ts'], undefined, undefined)
  .filter((filePath) => !filePath.endsWith('.d.ts'))
  .filter((filePath) => (isPhpScope ? true : !filePath.includes(`${path.sep}src${path.sep}php${path.sep}`)))

const lines = new Set<string>()

for (const filePath of sourceFiles) {
  const sourceText = fs.readFileSync(filePath, 'utf8')
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const relativePath = path.relative(cwd, filePath).replaceAll(path.sep, '/')

  sourceFile.forEachChild((node) => {
    if (ts.isFunctionDeclaration(node) && hasExportModifier(node) && node.name) {
      const signature = getFunctionSignatureText(sourceFile, node)
      lines.add(`${relativePath} :: ${signature}`)
      return
    }

    if (ts.isTypeAliasDeclaration(node) && hasExportModifier(node)) {
      lines.add(`${relativePath} :: ${normalizeWhitespace(node.getText(sourceFile))}`)
      return
    }

    if (ts.isInterfaceDeclaration(node) && hasExportModifier(node)) {
      lines.add(`${relativePath} :: ${normalizeWhitespace(node.getText(sourceFile))}`)
    }
  })
}

const snapshotContent = [...lines].sort().join('\n') + '\n'

if (shouldUpdate) {
  fs.writeFileSync(snapshotPath, snapshotContent)
  console.log(`Updated API signature snapshot at ${path.relative(cwd, snapshotPath)}`)
  process.exit(0)
}

if (!fs.existsSync(snapshotPath)) {
  console.error(`Snapshot file missing: ${path.relative(cwd, snapshotPath)}`)
  console.error('Run: corepack yarn fix:api:snapshot')
  process.exit(1)
}

const expected = fs.readFileSync(snapshotPath, 'utf8')
if (expected !== snapshotContent) {
  const expectedLines = expected.split('\n')
  const currentLines = snapshotContent.split('\n')
  let firstDiffIndex = 0
  while (
    firstDiffIndex < expectedLines.length &&
    firstDiffIndex < currentLines.length &&
    expectedLines[firstDiffIndex] === currentLines[firstDiffIndex]
  ) {
    firstDiffIndex += 1
  }

  console.error(`${label} API signature snapshot mismatch at line ${firstDiffIndex + 1}`)
  console.error(`Expected: ${expectedLines[firstDiffIndex] ?? '<EOF>'}`)
  console.error(`Current:  ${currentLines[firstDiffIndex] ?? '<EOF>'}`)
  console.error('If this change is intentional, run: corepack yarn fix:api:snapshot')
  process.exit(1)
}

console.log(`${label} API signature snapshot is up to date (${path.relative(cwd, snapshotPath)})`)
