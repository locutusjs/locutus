import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

type SignatureSet = {
  modulePath: string
  exportName: string
  signatures: string[]
}

type SignatureMetrics = {
  anyCount: number
  unknownCount: number
  functionCount: number
  objectCount: number
  optionalParamCount: number
  restAnyCount: number
}

type DifferenceKind = 'ours-stricter' | 'dt-stricter' | 'inconclusive'

type Difference = {
  key: string
  modulePath: string
  exportName: string
  ours: string[]
  dt: string[]
  oursMetrics: SignatureMetrics
  dtMetrics: SignatureMetrics
  kind: DifferenceKind
}

type NpmRegistryMetadata = {
  'dist-tags'?: {
    latest?: string
  }
}

const cwd = process.cwd()
const srcDir = path.join(cwd, 'src')
const customDtIndexArg = process.argv.find((arg) => arg.startsWith('--dt-index='))
const maxArg = process.argv.find((arg) => arg.startsWith('--max='))
const maxDiffOutput = maxArg ? Number.parseInt(maxArg.slice('--max='.length), 10) : 25
const reportPathArg = process.argv.find((arg) => arg.startsWith('--report='))

const normalizeWhitespace = (value: string): string => value.replace(/\s+/g, ' ').trim()

const sortUnique = (items: string[]): string[] => [...new Set(items)].sort()

const createMetric = (signatures: string[]): SignatureMetrics => {
  const combined = signatures.join(' ')

  return {
    anyCount: (combined.match(/\bany\b/g) ?? []).length,
    unknownCount: (combined.match(/\bunknown\b/g) ?? []).length,
    functionCount: (combined.match(/\bFunction\b/g) ?? []).length,
    objectCount: (combined.match(/:\s*object\b/g) ?? []).length,
    optionalParamCount: (combined.match(/\?:/g) ?? []).length,
    restAnyCount: (combined.match(/\.\.\.\w+:\s*any\[\]/g) ?? []).length,
  }
}

const metricPenalty = (metrics: SignatureMetrics): number =>
  metrics.anyCount * 100 +
  metrics.unknownCount * 25 +
  metrics.restAnyCount * 25 +
  metrics.functionCount * 15 +
  metrics.objectCount * 10 +
  metrics.optionalParamCount

const classifyDifference = (ours: SignatureMetrics, dt: SignatureMetrics): DifferenceKind => {
  const oursPenalty = metricPenalty(ours)
  const dtPenalty = metricPenalty(dt)

  if (oursPenalty < dtPenalty) {
    return 'ours-stricter'
  }

  if (oursPenalty > dtPenalty) {
    return 'dt-stricter'
  }

  return 'inconclusive'
}

const getTsConfigPath = (): string => ts.findConfigFile(cwd, ts.sys.fileExists, 'tsconfig.json') || ''

const collectLocalSignatures = (): Map<string, SignatureSet> => {
  const configPath = getTsConfigPath()
  if (!configPath) {
    throw new Error('Unable to find tsconfig.json')
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
        throw new Error(ts.formatDiagnostic(diagnostic, host))
      },
    },
  )

  if (!parsedConfig) {
    throw new Error('Failed to parse tsconfig.json')
  }

  const program = ts.createProgram({
    rootNames: parsedConfig.fileNames,
    options: parsedConfig.options,
  })
  const checker = program.getTypeChecker()
  const results = new Map<string, SignatureSet>()

  for (const sourceFile of program.getSourceFiles()) {
    if (sourceFile.isDeclarationFile) {
      continue
    }
    if (!sourceFile.fileName.startsWith(srcDir)) {
      continue
    }
    if (sourceFile.fileName.includes(`${path.sep}src${path.sep}_util${path.sep}`)) {
      continue
    }

    const moduleSymbol = checker.getSymbolAtLocation(sourceFile)
    if (!moduleSymbol) {
      continue
    }

    const modulePath = `locutus/${path
      .relative(srcDir, sourceFile.fileName)
      .replaceAll(path.sep, '/')
      .replace(/\.ts$/, '')}`

    for (const exportSymbol of checker.getExportsOfModule(moduleSymbol)) {
      const declarations = exportSymbol.getDeclarations()
      if (!declarations || declarations.length === 0) {
        continue
      }

      const declarationForType = declarations[declarations.length - 1]
      const exportType = checker.getTypeOfSymbolAtLocation(exportSymbol, declarationForType)
      const signatures = checker.getSignaturesOfType(exportType, ts.SignatureKind.Call)
      if (signatures.length === 0) {
        continue
      }

      const signatureTexts = sortUnique(
        signatures.map((signature) =>
          normalizeWhitespace(
            checker.signatureToString(signature, declarationForType, ts.TypeFormatFlags.NoTruncation),
          ),
        ),
      )

      const exportName = exportSymbol.getName()
      const key = `${modulePath}::${exportName}`
      results.set(key, {
        modulePath,
        exportName,
        signatures: signatureTexts,
      })
    }
  }

  return results
}

const readLocalDtIndex = (): string | null => {
  if (customDtIndexArg) {
    const customPath = customDtIndexArg.slice('--dt-index='.length)
    const resolvedPath = path.resolve(cwd, customPath)
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`--dt-index path does not exist: ${resolvedPath}`)
    }
    return fs.readFileSync(resolvedPath, 'utf8')
  }

  const bundledPath = path.join(cwd, 'node_modules', '@types', 'locutus', 'index.d.ts')
  if (fs.existsSync(bundledPath)) {
    return fs.readFileSync(bundledPath, 'utf8')
  }

  return null
}

const fetchLatestDtIndex = async (): Promise<{ version: string; body: string }> => {
  const registryResponse = await fetch('https://registry.npmjs.org/@types/locutus')
  if (!registryResponse.ok) {
    throw new Error(`Failed to read npm metadata for @types/locutus: HTTP ${registryResponse.status}`)
  }

  const metadata = (await registryResponse.json()) as NpmRegistryMetadata
  const latest = metadata['dist-tags']?.latest
  if (!latest) {
    throw new Error('Could not determine latest @types/locutus version from npm metadata.')
  }

  const indexResponse = await fetch(`https://unpkg.com/@types/locutus@${latest}/index.d.ts`)
  if (!indexResponse.ok) {
    throw new Error(`Failed to fetch @types/locutus@${latest} index.d.ts: HTTP ${indexResponse.status}`)
  }

  const body = await indexResponse.text()
  return { version: latest, body }
}

const getModuleBlock = (moduleDeclaration: ts.ModuleDeclaration): ts.ModuleBlock | null => {
  let current: ts.ModuleBody | undefined = moduleDeclaration.body
  while (current && ts.isModuleDeclaration(current)) {
    current = current.body
  }

  if (current && ts.isModuleBlock(current)) {
    return current
  }

  return null
}

const formatDtSignature = (sourceFile: ts.SourceFile, declaration: ts.FunctionDeclaration): string => {
  const typeParameters = declaration.typeParameters
    ? `<${declaration.typeParameters.map((typeParameter) => normalizeWhitespace(typeParameter.getText(sourceFile))).join(', ')}>`
    : ''

  const parameters = declaration.parameters
    .map((parameter) => {
      const name = parameter.name.getText(sourceFile)
      const prefix = parameter.dotDotDotToken ? '...' : ''
      const optional = parameter.questionToken ? '?' : ''
      const typeText = parameter.type ? normalizeWhitespace(parameter.type.getText(sourceFile)) : 'any'
      return `${prefix}${name}${optional}: ${typeText}`
    })
    .join(', ')

  const returnType = declaration.type ? normalizeWhitespace(declaration.type.getText(sourceFile)) : 'any'
  return `${typeParameters}(${parameters}): ${returnType}`
}

const collectDtSignatures = (dtSourceText: string): Map<string, SignatureSet> => {
  const sourceFile = ts.createSourceFile('definitelytyped-index.d.ts', dtSourceText, ts.ScriptTarget.Latest, true)
  const results = new Map<string, SignatureSet>()

  for (const statement of sourceFile.statements) {
    if (!ts.isModuleDeclaration(statement)) {
      continue
    }
    if (!ts.isStringLiteral(statement.name)) {
      continue
    }

    const modulePath = statement.name.text
    const moduleBlock = getModuleBlock(statement)
    if (!moduleBlock) {
      continue
    }

    for (const moduleStatement of moduleBlock.statements) {
      if (!ts.isFunctionDeclaration(moduleStatement) || !moduleStatement.name) {
        continue
      }

      const exportName = moduleStatement.name.text
      const key = `${modulePath}::${exportName}`
      const previous = results.get(key)
      const signatureText = formatDtSignature(sourceFile, moduleStatement)
      const signatures = previous ? sortUnique([...previous.signatures, signatureText]) : [signatureText]

      results.set(key, {
        modulePath,
        exportName,
        signatures,
      })
    }
  }

  return results
}

const toComparableSignature = (signature: string): string =>
  normalizeWhitespace(signature)
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const compareSignatureSets = (left: string[], right: string[]): boolean => {
  const normalizedLeft = sortUnique(left.map(toComparableSignature))
  const normalizedRight = sortUnique(right.map(toComparableSignature))
  if (normalizedLeft.length !== normalizedRight.length) {
    return false
  }

  for (let index = 0; index < normalizedLeft.length; index += 1) {
    if (normalizedLeft[index] !== normalizedRight[index]) {
      return false
    }
  }

  return true
}

const toReport = (
  differences: Difference[],
  missingInLocal: SignatureSet[],
  missingInDt: SignatureSet[],
  equalCount: number,
  sharedCount: number,
  dtSourceLabel: string,
): string => {
  const lines: string[] = []
  lines.push('# DefinitelyTyped Signature Comparison')
  lines.push('')
  lines.push(`- Compared against: ${dtSourceLabel}`)
  lines.push(`- Shared exports compared: ${sharedCount}`)
  lines.push(`- Signature-identical exports: ${equalCount}`)
  lines.push(`- Different exports: ${differences.length}`)
  lines.push(`- Missing in local types: ${missingInLocal.length}`)
  lines.push(`- Missing in DefinitelyTyped: ${missingInDt.length}`)
  lines.push('')

  const oursStricter = differences.filter((difference) => difference.kind === 'ours-stricter')
  const dtStricter = differences.filter((difference) => difference.kind === 'dt-stricter')
  const inconclusive = differences.filter((difference) => difference.kind === 'inconclusive')

  lines.push('## Difference Breakdown')
  lines.push('')
  lines.push(`- Ours stricter: ${oursStricter.length}`)
  lines.push(`- DT stricter: ${dtStricter.length}`)
  lines.push(`- Inconclusive: ${inconclusive.length}`)
  lines.push('')

  const appendDiffGroup = (title: string, list: Difference[]): void => {
    lines.push(`## ${title}`)
    lines.push('')
    if (list.length === 0) {
      lines.push('- None')
      lines.push('')
      return
    }
    for (const item of list) {
      lines.push(`- \`${item.modulePath}\` / \`${item.exportName}\``)
      lines.push(`  ours: ${item.ours.join(' || ')}`)
      lines.push(`  dt:   ${item.dt.join(' || ')}`)
    }
    lines.push('')
  }

  appendDiffGroup('DT Stricter (Review First)', dtStricter)
  appendDiffGroup('Inconclusive', inconclusive)

  lines.push('## Missing In Local')
  lines.push('')
  if (missingInLocal.length === 0) {
    lines.push('- None')
  } else {
    for (const item of missingInLocal) {
      lines.push(`- \`${item.modulePath}\` / \`${item.exportName}\``)
    }
  }
  lines.push('')

  lines.push('## Missing In DefinitelyTyped')
  lines.push('')
  if (missingInDt.length === 0) {
    lines.push('- None')
  } else {
    for (const item of missingInDt) {
      lines.push(`- \`${item.modulePath}\` / \`${item.exportName}\``)
    }
  }
  lines.push('')

  return lines.join('\n')
}

const printDifferenceGroup = (title: string, list: Difference[]): void => {
  console.log(`\n${title}: ${list.length}`)
  const limited = list.slice(0, Math.max(0, maxDiffOutput))
  for (const item of limited) {
    console.log(`- ${item.modulePath} :: ${item.exportName}`)
    console.log(`  ours: ${item.ours.join(' || ')}`)
    console.log(`  dt:   ${item.dt.join(' || ')}`)
  }
  if (list.length > limited.length) {
    console.log(`  ... and ${list.length - limited.length} more`)
  }
}

const main = async (): Promise<void> => {
  const localSignatures = collectLocalSignatures()
  const localDtIndex = readLocalDtIndex()

  let dtSourceLabel = 'local node_modules/@types/locutus'
  let dtSourceText = localDtIndex

  if (!dtSourceText) {
    const fetched = await fetchLatestDtIndex()
    dtSourceLabel = `@types/locutus@${fetched.version} (fetched from npm/unpkg)`
    dtSourceText = fetched.body
  }

  const dtSignatures = collectDtSignatures(dtSourceText)

  const localKeys = new Set(localSignatures.keys())
  const dtKeys = new Set(dtSignatures.keys())
  const sharedKeys = [...localKeys].filter((key) => dtKeys.has(key)).sort()

  let equalCount = 0
  const differences: Difference[] = []

  for (const key of sharedKeys) {
    const ours = localSignatures.get(key)
    const dt = dtSignatures.get(key)
    if (!ours || !dt) {
      continue
    }

    if (compareSignatureSets(ours.signatures, dt.signatures)) {
      equalCount += 1
      continue
    }

    const oursMetrics = createMetric(ours.signatures)
    const dtMetrics = createMetric(dt.signatures)

    differences.push({
      key,
      modulePath: ours.modulePath,
      exportName: ours.exportName,
      ours: ours.signatures,
      dt: dt.signatures,
      oursMetrics,
      dtMetrics,
      kind: classifyDifference(oursMetrics, dtMetrics),
    })
  }

  const missingInLocal = [...dtKeys]
    .filter((key) => !localKeys.has(key))
    .sort()
    .map((key) => dtSignatures.get(key))
    .filter((value): value is SignatureSet => Boolean(value))

  const missingInDt = [...localKeys]
    .filter((key) => !dtKeys.has(key))
    .sort()
    .map((key) => localSignatures.get(key))
    .filter((value): value is SignatureSet => Boolean(value))

  const oursStricter = differences.filter((difference) => difference.kind === 'ours-stricter')
  const dtStricter = differences.filter((difference) => difference.kind === 'dt-stricter')
  const inconclusive = differences.filter((difference) => difference.kind === 'inconclusive')

  console.log(`Compared against ${dtSourceLabel}`)
  console.log(`Shared exports: ${sharedKeys.length}`)
  console.log(`Signature-identical: ${equalCount}`)
  console.log(`Different signatures: ${differences.length}`)
  console.log(`Missing in local: ${missingInLocal.length}`)
  console.log(`Missing in DefinitelyTyped: ${missingInDt.length}`)
  console.log(`Likely ours stricter: ${oursStricter.length}`)
  console.log(`Likely DT stricter: ${dtStricter.length}`)
  console.log(`Inconclusive: ${inconclusive.length}`)

  printDifferenceGroup('Likely DT stricter', dtStricter)
  printDifferenceGroup('Inconclusive', inconclusive)

  if (reportPathArg) {
    const reportPath = path.resolve(cwd, reportPathArg.slice('--report='.length))
    const reportBody = toReport(differences, missingInLocal, missingInDt, equalCount, sharedKeys.length, dtSourceLabel)
    fs.writeFileSync(reportPath, reportBody)
    console.log(`\nWrote report: ${path.relative(cwd, reportPath)}`)
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`compare-definitelytyped-signatures failed: ${message}`)
  process.exit(1)
})
