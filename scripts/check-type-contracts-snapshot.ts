import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

type LiteralParamContract = {
  invalidLiteral: number | string
  validLiteral: number | string
}

const cwd = process.cwd()
const shouldUpdate = process.argv.includes('--update')
const outputPath = path.join(cwd, 'test', 'util', 'type-contracts.generated.d.ts')
const srcDir = path.join(cwd, 'src')

const hasExportModifier = (node: ts.Node): boolean =>
  !!node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)

const getConfigPath = (): string => ts.findConfigFile(cwd, ts.sys.fileExists, 'tsconfig.json') || ''
const getStableHashId = (value: string): string => {
  let hash = 0
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  }

  return hash.toString(36)
}

const getTypeLiteralContract = (parameterType: ts.Type): LiteralParamContract | null => {
  const typeMembers = parameterType.isUnion() ? parameterType.types : [parameterType]

  const stringLiterals: string[] = []
  const numberLiterals: number[] = []
  let hasBroadString = false
  let hasBroadNumber = false

  for (const member of typeMembers) {
    if (member.flags & ts.TypeFlags.String) {
      hasBroadString = true
      continue
    }

    if (member.flags & ts.TypeFlags.Number) {
      hasBroadNumber = true
      continue
    }

    if (member.isStringLiteral()) {
      stringLiterals.push(member.value)
      continue
    }

    if (member.isNumberLiteral()) {
      numberLiterals.push(member.value)
    }
  }

  if (!hasBroadString && stringLiterals.length > 0) {
    const sentinelBase = '__LOCUTUS_INVALID_LITERAL__'
    const invalidLiteral = stringLiterals.includes(sentinelBase) ? `${sentinelBase}_X` : sentinelBase
    return { validLiteral: stringLiterals[0], invalidLiteral }
  }

  if (!hasBroadNumber && numberLiterals.length > 0) {
    const sentinelBase = -9007199254740991
    const invalidLiteral = numberLiterals.includes(sentinelBase) ? sentinelBase + 1 : sentinelBase
    return { validLiteral: numberLiterals[0], invalidLiteral }
  }

  return null
}

const configPath = getConfigPath()
if (!configPath) {
  console.error('Unable to find tsconfig.json for type contract generation.')
  process.exit(1)
}

const parsedConfig = ts.getParsedCommandLineOfConfigFile(
  configPath,
  {},
  {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
      const host = {
        getCanonicalFileName: (fileName: string) => fileName,
        getCurrentDirectory: () => cwd,
        getNewLine: () => '\n',
      }
      console.error(ts.formatDiagnostic(diagnostic, host))
      process.exit(1)
    },
  },
)

if (!parsedConfig) {
  console.error('Failed to parse tsconfig.json for type contract generation.')
  process.exit(1)
}

const program = ts.createProgram({
  rootNames: parsedConfig.fileNames,
  options: parsedConfig.options,
})
const checker = program.getTypeChecker()

const importEntries: Array<{ importPath: string; line: string }> = []
const contractLines: string[] = []
const sourceFiles = program
  .getSourceFiles()
  .filter((sourceFile) => !sourceFile.isDeclarationFile)
  .filter((sourceFile) => sourceFile.fileName.startsWith(srcDir))
  .filter((sourceFile) => !sourceFile.fileName.includes(`${path.sep}src${path.sep}_util${path.sep}`))
  .sort((left, right) => (left.fileName < right.fileName ? -1 : left.fileName > right.fileName ? 1 : 0))

let functionIndex = 0
const usedModuleAliases = new Set<string>()

for (const sourceFile of sourceFiles) {
  const relativeSourcePath = path.relative(cwd, sourceFile.fileName).replaceAll(path.sep, '/')
  const importPath = `../../${relativeSourcePath}`
  const functionDeclarations = sourceFile.statements.filter(
    (node): node is ts.FunctionDeclaration =>
      ts.isFunctionDeclaration(node) && hasExportModifier(node) && !!node.name && !!node.body,
  )

  if (functionDeclarations.length === 0) {
    continue
  }

  const baseAlias = `m_${getStableHashId(relativeSourcePath)}`
  let moduleAlias = baseAlias
  let aliasSuffix = 1
  while (usedModuleAliases.has(moduleAlias)) {
    moduleAlias = `${baseAlias}_${aliasSuffix}`
    aliasSuffix += 1
  }
  usedModuleAliases.add(moduleAlias)
  importEntries.push({
    importPath,
    line: `import type * as ${moduleAlias} from '${importPath}'`,
  })

  for (const node of functionDeclarations) {
    if (!node.name) {
      continue
    }

    const functionName = node.name.text
    const contractId = String(functionIndex).padStart(4, '0')
    const contractPrefix = `_TypeContract_${contractId}`
    functionIndex += 1

    const functionRef = `${moduleAlias}.${functionName}`
    contractLines.push(`type ${contractPrefix}_ReturnNotAny = ExpectFalse<IsAny<ReturnType<typeof ${functionRef}>>>`)

    const functionType = checker.getTypeAtLocation(node.name)
    const callSignatures = checker.getSignaturesOfType(functionType, ts.SignatureKind.Call)
    const primarySignature = callSignatures[callSignatures.length - 1]
    if (!primarySignature) {
      continue
    }

    primarySignature.parameters.forEach((parameterSymbol, parameterIndex) => {
      const paramRef = `Parameters<typeof ${functionRef}>[${parameterIndex}]`
      contractLines.push(`type ${contractPrefix}_Param${parameterIndex}_NotAny = ExpectFalse<IsAny<${paramRef}>>`)

      const parameterType = checker.getTypeOfSymbolAtLocation(parameterSymbol, node.name)
      const literalContract = getTypeLiteralContract(parameterType)
      if (!literalContract) {
        return
      }

      const validLiteralText =
        typeof literalContract.validLiteral === 'string'
          ? `'${literalContract.validLiteral.replaceAll("'", "\\'")}'`
          : `${literalContract.validLiteral}`
      const invalidLiteralText =
        typeof literalContract.invalidLiteral === 'string'
          ? `'${literalContract.invalidLiteral.replaceAll("'", "\\'")}'`
          : `${literalContract.invalidLiteral}`

      contractLines.push(
        `type ${contractPrefix}_Param${parameterIndex}_AcceptsKnownLiteral = ExpectTrue<IsAssignable<${validLiteralText}, ${paramRef}>>`,
      )
      contractLines.push(
        `type ${contractPrefix}_Param${parameterIndex}_RejectsInvalidLiteral = ExpectFalse<IsAssignable<${invalidLiteralText}, ${paramRef}>>`,
      )
    })
  }
}

const header = [
  '// This file is generated by scripts/check-type-contracts-snapshot.ts',
  '// Do not edit manually. Run: corepack yarn fix:type:contracts',
  '',
  'type IsAny<T> = 0 extends 1 & T ? true : false',
  'type IsAssignable<From, To> = [From] extends [To] ? true : false',
  'type ExpectTrue<T extends true> = T',
  'type ExpectFalse<T extends false> = T',
  '',
]
const sortedImportLines = [...importEntries]
  .sort((left, right) => {
    const leftKey = left.importPath.toLowerCase()
    const rightKey = right.importPath.toLowerCase()
    if (leftKey < rightKey) {
      return -1
    }
    if (leftKey > rightKey) {
      return 1
    }

    return left.importPath < right.importPath ? -1 : left.importPath > right.importPath ? 1 : 0
  })
  .map((entry) => entry.line)
const content = [...header, ...sortedImportLines, '', ...contractLines, ''].join('\n')
const normalizeForComparison = (value: string): string => {
  const lines = value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
  const importLines = lines.filter((line) => line.startsWith('import type * as '))
  const otherLines = lines.filter((line) => !line.startsWith('import type * as '))
  const normalizedImports = importLines.sort((left, right) => (left < right ? -1 : left > right ? 1 : 0))
  return [...normalizedImports, ...otherLines].join('\n').replaceAll(/\s+/g, ' ').trim()
}

if (shouldUpdate) {
  fs.writeFileSync(outputPath, content)
  console.log(`Updated type contract snapshot at ${path.relative(cwd, outputPath)}`)
  process.exit(0)
}

if (!fs.existsSync(outputPath)) {
  console.error(`Type contract snapshot file missing: ${path.relative(cwd, outputPath)}`)
  console.error('Run: corepack yarn fix:type:contracts')
  process.exit(1)
}

const expected = fs.readFileSync(outputPath, 'utf8')
if (normalizeForComparison(expected) !== normalizeForComparison(content)) {
  const expectedLines = expected.split('\n')
  const currentLines = content.split('\n')
  let firstDiffIndex = 0

  while (
    firstDiffIndex < expectedLines.length &&
    firstDiffIndex < currentLines.length &&
    expectedLines[firstDiffIndex] === currentLines[firstDiffIndex]
  ) {
    firstDiffIndex += 1
  }

  console.error(`Type contract snapshot mismatch at line ${firstDiffIndex + 1}`)
  console.error(`Expected: ${expectedLines[firstDiffIndex] ?? '<EOF>'}`)
  console.error(`Current:  ${currentLines[firstDiffIndex] ?? '<EOF>'}`)
  console.error('If this change is intentional, run: corepack yarn fix:type:contracts')
  process.exit(1)
}

console.log(`Type contract snapshot is up to date (${path.relative(cwd, outputPath)})`)
