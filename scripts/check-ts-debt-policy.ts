import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

interface Finding {
  file: string
  count: number
}

const MAX_SRC_PHP_RAW_INDEX_SIGNATURE_UNKNOWN = 0
const MAX_SRC_PHP_EXPORTED_UNKNOWN_RETURN_TYPES = 0
const MAX_SRC_PHP_EXPORTED_OBJECT_KEYWORD = 0
const MAX_SRC_PHP_EXPORTED_EMPTY_OBJECT_TYPE = 0
const MAX_SRC_PHP_EXPORTED_FUNCTION_WITHOUT_RETURN_TYPE = 0
const MAX_SRC_PHP_EXPORTED_PHPVALUE_IDENTIFIER = 56
const MAX_SRC_PHP_ARRAY_EXPORTED_PHPVALUE_IDENTIFIER = 0
const MAX_SRC_PHP_UNKNOWN_KEYWORD = 0
const MAX_SRC_PHP_ARRAY_UNKNOWN_KEYWORD = 0
const MAX_SRC_PHP_VAR_UNKNOWN_KEYWORD = 0
const MAX_SRC_PHP_STRINGS_AS_EXPRESSION = 0
const MAX_SRC_PHP_CTYPE_AS_EXPRESSION = 0
const MAX_SRC_PHP_INFO_AS_EXPRESSION = 0
const MAX_SRC_PHP_HELPERS_AS_EXPRESSION = 0
const MAX_SRC_PHP_URL_AS_EXPRESSION = 0
const MAX_SRC_PHP_FUNCHAND_AS_EXPRESSION = 0
const MAX_SRC_PHP_JSON_AS_EXPRESSION = 0
const MAX_SRC_PHP_DATETIME_AS_EXPRESSION = 0
const MAX_SRC_PHP_ARRAY_AS_EXPRESSION = 0
const MAX_SRC_PHP_BC_AS_EXPRESSION = 0
const MAX_SRC_PHP_FILESYSTEM_AS_EXPRESSION = 0
const MAX_SRC_PHP_MISC_AS_EXPRESSION = 0
const MAX_SRC_PHP_PCRE_AS_EXPRESSION = 0
const MAX_SRC_PHP_VAR_AS_EXPRESSION = 0
const MAX_SRC_PHP_XDIFF_AS_EXPRESSION = 0
const MAX_SRC_PHP_LOCAL_PHPVALUE_ALIAS = 0
const MAX_SRC_PHP_DIRECT_INI_GLOBAL_READS = 0
const MAX_SRC_PHP_PHPMIXED_KEYWORD = 0
const MAX_SRC_PHP_ARRAY_PHPMIXED_KEYWORD = 0
const MAX_SRC_PHP_VAR_PHPMIXED_KEYWORD = 0
const MAX_SRC_PHP_STRINGS_PHPMIXED_KEYWORD = 0

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
const exportedUnknownReturnTypeFindings: Finding[] = []
const exportedObjectKeywordFindings: Finding[] = []
const exportedEmptyObjectTypeFindings: Finding[] = []
const exportedFunctionWithoutReturnTypeFindings: Finding[] = []
const exportedPhpValueIdentifierFindings: Finding[] = []
const arrayExportedPhpValueIdentifierFindings: Finding[] = []
const localPhpValueAliasFindings: Finding[] = []
const directIniGlobalReadFindings: Finding[] = []
const stringsAsExpressionFindings: Finding[] = []
const ctypeAsExpressionFindings: Finding[] = []
const infoAsExpressionFindings: Finding[] = []
const helpersAsExpressionFindings: Finding[] = []
const urlAsExpressionFindings: Finding[] = []
const funchandAsExpressionFindings: Finding[] = []
const jsonAsExpressionFindings: Finding[] = []
const datetimeAsExpressionFindings: Finding[] = []
const arrayAsExpressionFindings: Finding[] = []
const bcAsExpressionFindings: Finding[] = []
const filesystemAsExpressionFindings: Finding[] = []
const miscAsExpressionFindings: Finding[] = []
const pcreAsExpressionFindings: Finding[] = []
const varAsExpressionFindings: Finding[] = []
const xdiffAsExpressionFindings: Finding[] = []
const phpMixedFindings: Finding[] = []
const arrayPhpMixedFindings: Finding[] = []
const varPhpMixedFindings: Finding[] = []
const stringsPhpMixedFindings: Finding[] = []
let srcPhpRawIndexSignatureUnknownCount = 0
let srcPhpExportedUnknownReturnTypeCount = 0
let srcPhpExportedObjectKeywordCount = 0
let srcPhpExportedEmptyObjectTypeCount = 0
let srcPhpExportedFunctionWithoutReturnTypeCount = 0
let srcPhpExportedPhpValueIdentifierCount = 0
let srcPhpArrayExportedPhpValueIdentifierCount = 0
let srcPhpUnknownKeywordCount = 0
let srcPhpArrayUnknownKeywordCount = 0
let srcPhpVarUnknownKeywordCount = 0
let srcPhpStringsAsExpressionCount = 0
let srcPhpCtypeAsExpressionCount = 0
let srcPhpInfoAsExpressionCount = 0
let srcPhpHelpersAsExpressionCount = 0
let srcPhpUrlAsExpressionCount = 0
let srcPhpFunchandAsExpressionCount = 0
let srcPhpJsonAsExpressionCount = 0
let srcPhpDatetimeAsExpressionCount = 0
let srcPhpArrayAsExpressionCount = 0
let srcPhpBcAsExpressionCount = 0
let srcPhpFilesystemAsExpressionCount = 0
let srcPhpMiscAsExpressionCount = 0
let srcPhpPcreAsExpressionCount = 0
let srcPhpVarAsExpressionCount = 0
let srcPhpXdiffAsExpressionCount = 0
let srcPhpLocalPhpValueAliasCount = 0
let srcPhpDirectIniGlobalReadCount = 0
let srcPhpPhpMixedKeywordCount = 0
let srcPhpArrayPhpMixedKeywordCount = 0
let srcPhpVarPhpMixedKeywordCount = 0
let srcPhpStringsPhpMixedKeywordCount = 0

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

const countAsExpressions = (sourceFile: ts.SourceFile): number => {
  let count = 0

  const visit = (node: ts.Node): void => {
    if (ts.isAsExpression(node)) {
      count += 1
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return count
}

const hasExportModifier = (node: ts.Node): boolean =>
  !!node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)

const isUnknownTopLevelReturnType = (typeNode: ts.TypeNode): boolean => {
  if (typeNode.kind === ts.SyntaxKind.UnknownKeyword) {
    return true
  }

  if (ts.isUnionTypeNode(typeNode)) {
    return typeNode.types.some((member) => member.kind === ts.SyntaxKind.UnknownKeyword)
  }

  return false
}

const countExportedUnknownReturnTypes = (sourceFile: ts.SourceFile): number => {
  let count = 0

  const visit = (node: ts.Node): void => {
    if (
      ts.isFunctionDeclaration(node) &&
      hasExportModifier(node) &&
      node.type &&
      isUnknownTopLevelReturnType(node.type)
    ) {
      count += 1
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return count
}

const countObjectAndEmptyObjectTypeNodes = (
  typeNode: ts.TypeNode,
): { objectKeywordCount: number; emptyObjectTypeCount: number } => {
  let objectKeywordCount = 0
  let emptyObjectTypeCount = 0

  const visit = (node: ts.Node): void => {
    if (node.kind === ts.SyntaxKind.ObjectKeyword) {
      objectKeywordCount += 1
    }
    if (ts.isTypeLiteralNode(node) && node.members.length === 0) {
      emptyObjectTypeCount += 1
    }
    ts.forEachChild(node, visit)
  }

  visit(typeNode)
  return { objectKeywordCount, emptyObjectTypeCount }
}

const countTypeIdentifierNodes = (typeNode: ts.TypeNode, identifierName: string): number => {
  let count = 0

  const visit = (node: ts.Node): void => {
    if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName) && node.typeName.text === identifierName) {
      count += 1
    }
    ts.forEachChild(node, visit)
  }

  visit(typeNode)
  return count
}

const countExportedTypeBroadMarkers = (
  sourceFile: ts.SourceFile,
): {
  objectKeywordCount: number
  emptyObjectTypeCount: number
  functionWithoutReturnTypeCount: number
  phpValueIdentifierCount: number
} => {
  let objectKeywordCount = 0
  let emptyObjectTypeCount = 0
  let functionWithoutReturnTypeCount = 0
  let phpValueIdentifierCount = 0

  const addTypeNodeCounts = (typeNode: ts.TypeNode): void => {
    const counts = countObjectAndEmptyObjectTypeNodes(typeNode)
    objectKeywordCount += counts.objectKeywordCount
    emptyObjectTypeCount += counts.emptyObjectTypeCount
    phpValueIdentifierCount += countTypeIdentifierNodes(typeNode, 'PhpValue')
  }

  sourceFile.forEachChild((node) => {
    if (ts.isFunctionDeclaration(node) && hasExportModifier(node)) {
      if (node.type) {
        addTypeNodeCounts(node.type)
      } else if (node.body) {
        functionWithoutReturnTypeCount += 1
      }

      for (const parameter of node.parameters) {
        if (parameter.type) {
          addTypeNodeCounts(parameter.type)
        }
      }

      for (const typeParameter of node.typeParameters ?? []) {
        if (typeParameter.constraint) {
          addTypeNodeCounts(typeParameter.constraint)
        }
        if (typeParameter.default) {
          addTypeNodeCounts(typeParameter.default)
        }
      }
      return
    }

    if (ts.isVariableStatement(node) && hasExportModifier(node)) {
      for (const declaration of node.declarationList.declarations) {
        if (declaration.type) {
          addTypeNodeCounts(declaration.type)
        }
      }
      return
    }

    // Intentionally scoped to exported runtime APIs (functions/vars).
    // Type aliases/interfaces are tracked separately and can evolve in staged passes.
  })

  return {
    objectKeywordCount,
    emptyObjectTypeCount,
    functionWithoutReturnTypeCount,
    phpValueIdentifierCount,
  }
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
    const srcPhpUnknownCount = (sourceText.match(/\bunknown\b/g) || []).length
    srcPhpUnknownKeywordCount += srcPhpUnknownCount
    const srcPhpMixedCount = (sourceText.match(/\bPhpMixed\b/g) || []).length
    srcPhpPhpMixedKeywordCount += srcPhpMixedCount
    if (srcPhpMixedCount > 0) {
      phpMixedFindings.push({
        file: path.relative(cwd, filePath),
        count: srcPhpMixedCount,
      })
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}array${path.sep}`)) {
      srcPhpArrayUnknownKeywordCount += srcPhpUnknownCount
      srcPhpArrayPhpMixedKeywordCount += srcPhpMixedCount
      if (srcPhpMixedCount > 0) {
        arrayPhpMixedFindings.push({
          file: path.relative(cwd, filePath),
          count: srcPhpMixedCount,
        })
      }
      const arrayAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpArrayAsExpressionCount += arrayAsExpressionCount
      if (arrayAsExpressionCount > 0) {
        arrayAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: arrayAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}var${path.sep}`)) {
      srcPhpVarUnknownKeywordCount += srcPhpUnknownCount
      srcPhpVarPhpMixedKeywordCount += srcPhpMixedCount
      if (srcPhpMixedCount > 0) {
        varPhpMixedFindings.push({
          file: path.relative(cwd, filePath),
          count: srcPhpMixedCount,
        })
      }
      const varAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpVarAsExpressionCount += varAsExpressionCount
      if (varAsExpressionCount > 0) {
        varAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: varAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}strings${path.sep}`)) {
      srcPhpStringsPhpMixedKeywordCount += srcPhpMixedCount
      if (srcPhpMixedCount > 0) {
        stringsPhpMixedFindings.push({
          file: path.relative(cwd, filePath),
          count: srcPhpMixedCount,
        })
      }
      const stringsAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpStringsAsExpressionCount += stringsAsExpressionCount
      if (stringsAsExpressionCount > 0) {
        stringsAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: stringsAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}ctype${path.sep}`)) {
      const ctypeAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpCtypeAsExpressionCount += ctypeAsExpressionCount
      if (ctypeAsExpressionCount > 0) {
        ctypeAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: ctypeAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}info${path.sep}`)) {
      const infoAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpInfoAsExpressionCount += infoAsExpressionCount
      if (infoAsExpressionCount > 0) {
        infoAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: infoAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}_helpers${path.sep}`)) {
      const helpersAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpHelpersAsExpressionCount += helpersAsExpressionCount
      if (helpersAsExpressionCount > 0) {
        helpersAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: helpersAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}url${path.sep}`)) {
      const urlAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpUrlAsExpressionCount += urlAsExpressionCount
      if (urlAsExpressionCount > 0) {
        urlAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: urlAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}funchand${path.sep}`)) {
      const funchandAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpFunchandAsExpressionCount += funchandAsExpressionCount
      if (funchandAsExpressionCount > 0) {
        funchandAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: funchandAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}json${path.sep}`)) {
      const jsonAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpJsonAsExpressionCount += jsonAsExpressionCount
      if (jsonAsExpressionCount > 0) {
        jsonAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: jsonAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}datetime${path.sep}`)) {
      const datetimeAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpDatetimeAsExpressionCount += datetimeAsExpressionCount
      if (datetimeAsExpressionCount > 0) {
        datetimeAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: datetimeAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}bc${path.sep}`)) {
      const bcAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpBcAsExpressionCount += bcAsExpressionCount
      if (bcAsExpressionCount > 0) {
        bcAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: bcAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}filesystem${path.sep}`)) {
      const filesystemAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpFilesystemAsExpressionCount += filesystemAsExpressionCount
      if (filesystemAsExpressionCount > 0) {
        filesystemAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: filesystemAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}misc${path.sep}`)) {
      const miscAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpMiscAsExpressionCount += miscAsExpressionCount
      if (miscAsExpressionCount > 0) {
        miscAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: miscAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}pcre${path.sep}`)) {
      const pcreAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpPcreAsExpressionCount += pcreAsExpressionCount
      if (pcreAsExpressionCount > 0) {
        pcreAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: pcreAsExpressionCount,
        })
      }
    }
    if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}xdiff${path.sep}`)) {
      const xdiffAsExpressionCount = countAsExpressions(sourceFile)
      srcPhpXdiffAsExpressionCount += xdiffAsExpressionCount
      if (xdiffAsExpressionCount > 0) {
        xdiffAsExpressionFindings.push({
          file: path.relative(cwd, filePath),
          count: xdiffAsExpressionCount,
        })
      }
    }

    const rawIndexSignatureUnknownCount = (sourceText.match(/\{\s*\[\s*key\s*:\s*string\s*]\s*:\s*unknown\s*}/g) || [])
      .length
    srcPhpRawIndexSignatureUnknownCount += rawIndexSignatureUnknownCount

    const localPhpValueAliasCount = filePath.endsWith(
      `${path.sep}src${path.sep}php${path.sep}_helpers${path.sep}_phpTypes.ts`,
    )
      ? 0
      : (sourceText.match(/\btype\s+PhpValue\s*=\s*\{\}\s*\|\s*null\s*\|\s*undefined\b/g) || []).length
    srcPhpLocalPhpValueAliasCount += localPhpValueAliasCount
    if (localPhpValueAliasCount > 0) {
      localPhpValueAliasFindings.push({
        file: path.relative(cwd, filePath),
        count: localPhpValueAliasCount,
      })
    }

    const directIniGlobalReadCount = (sourceText.match(/\$locutus\?\.\s*php\?\.\s*ini\b/g) || []).length
    srcPhpDirectIniGlobalReadCount += directIniGlobalReadCount
    if (directIniGlobalReadCount > 0) {
      directIniGlobalReadFindings.push({
        file: path.relative(cwd, filePath),
        count: directIniGlobalReadCount,
      })
    }

    const argumentsIdentifierCount = countArgumentsIdentifiers(sourceFile)
    if (argumentsIdentifierCount > 0) {
      argumentsIdentifierFindings.push({
        file: path.relative(cwd, filePath),
        count: argumentsIdentifierCount,
      })
    }

    const exportedUnknownReturnTypeCount = countExportedUnknownReturnTypes(sourceFile)
    srcPhpExportedUnknownReturnTypeCount += exportedUnknownReturnTypeCount
    if (exportedUnknownReturnTypeCount > 0) {
      exportedUnknownReturnTypeFindings.push({
        file: path.relative(cwd, filePath),
        count: exportedUnknownReturnTypeCount,
      })
    }

    const exportedTypeBroadCounts = countExportedTypeBroadMarkers(sourceFile)

    srcPhpExportedObjectKeywordCount += exportedTypeBroadCounts.objectKeywordCount
    if (exportedTypeBroadCounts.objectKeywordCount > 0) {
      exportedObjectKeywordFindings.push({
        file: path.relative(cwd, filePath),
        count: exportedTypeBroadCounts.objectKeywordCount,
      })
    }

    srcPhpExportedEmptyObjectTypeCount += exportedTypeBroadCounts.emptyObjectTypeCount
    if (exportedTypeBroadCounts.emptyObjectTypeCount > 0) {
      exportedEmptyObjectTypeFindings.push({
        file: path.relative(cwd, filePath),
        count: exportedTypeBroadCounts.emptyObjectTypeCount,
      })
    }

    srcPhpExportedFunctionWithoutReturnTypeCount += exportedTypeBroadCounts.functionWithoutReturnTypeCount
    if (exportedTypeBroadCounts.functionWithoutReturnTypeCount > 0) {
      exportedFunctionWithoutReturnTypeFindings.push({
        file: path.relative(cwd, filePath),
        count: exportedTypeBroadCounts.functionWithoutReturnTypeCount,
      })
    }

    srcPhpExportedPhpValueIdentifierCount += exportedTypeBroadCounts.phpValueIdentifierCount
    if (exportedTypeBroadCounts.phpValueIdentifierCount > 0) {
      exportedPhpValueIdentifierFindings.push({
        file: path.relative(cwd, filePath),
        count: exportedTypeBroadCounts.phpValueIdentifierCount,
      })
      if (filePath.includes(`${path.sep}src${path.sep}php${path.sep}array${path.sep}`)) {
        srcPhpArrayExportedPhpValueIdentifierCount += exportedTypeBroadCounts.phpValueIdentifierCount
        arrayExportedPhpValueIdentifierFindings.push({
          file: path.relative(cwd, filePath),
          count: exportedTypeBroadCounts.phpValueIdentifierCount,
        })
      }
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

if (srcPhpRawIndexSignatureUnknownCount > MAX_SRC_PHP_RAW_INDEX_SIGNATURE_UNKNOWN) {
  hasFailure = true
  console.error(
    `src/php raw '{ [key: string]: unknown }' count increased: ${srcPhpRawIndexSignatureUnknownCount} > ${MAX_SRC_PHP_RAW_INDEX_SIGNATURE_UNKNOWN}`,
  )
}

if (srcPhpExportedUnknownReturnTypeCount > MAX_SRC_PHP_EXPORTED_UNKNOWN_RETURN_TYPES) {
  hasFailure = true
  console.error(
    `src/php exported unknown return-type count increased: ${srcPhpExportedUnknownReturnTypeCount} > ${MAX_SRC_PHP_EXPORTED_UNKNOWN_RETURN_TYPES}`,
  )
  for (const finding of exportedUnknownReturnTypeFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpExportedObjectKeywordCount > MAX_SRC_PHP_EXPORTED_OBJECT_KEYWORD) {
  hasFailure = true
  console.error(
    `src/php exported signature 'object' keyword count increased: ${srcPhpExportedObjectKeywordCount} > ${MAX_SRC_PHP_EXPORTED_OBJECT_KEYWORD}`,
  )
  for (const finding of exportedObjectKeywordFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpExportedEmptyObjectTypeCount > MAX_SRC_PHP_EXPORTED_EMPTY_OBJECT_TYPE) {
  hasFailure = true
  console.error(
    `src/php exported signature empty-object '{}' count increased: ${srcPhpExportedEmptyObjectTypeCount} > ${MAX_SRC_PHP_EXPORTED_EMPTY_OBJECT_TYPE}`,
  )
  for (const finding of exportedEmptyObjectTypeFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpExportedFunctionWithoutReturnTypeCount > MAX_SRC_PHP_EXPORTED_FUNCTION_WITHOUT_RETURN_TYPE) {
  hasFailure = true
  console.error(
    `src/php exported function-without-return-type count increased: ${srcPhpExportedFunctionWithoutReturnTypeCount} > ${MAX_SRC_PHP_EXPORTED_FUNCTION_WITHOUT_RETURN_TYPE}`,
  )
  for (const finding of exportedFunctionWithoutReturnTypeFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpExportedPhpValueIdentifierCount > MAX_SRC_PHP_EXPORTED_PHPVALUE_IDENTIFIER) {
  hasFailure = true
  console.error(
    `src/php exported signature 'PhpValue' identifier count increased: ${srcPhpExportedPhpValueIdentifierCount} > ${MAX_SRC_PHP_EXPORTED_PHPVALUE_IDENTIFIER}`,
  )
  for (const finding of exportedPhpValueIdentifierFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpArrayExportedPhpValueIdentifierCount > MAX_SRC_PHP_ARRAY_EXPORTED_PHPVALUE_IDENTIFIER) {
  hasFailure = true
  console.error(
    `src/php/array exported signature 'PhpValue' identifier count increased: ${srcPhpArrayExportedPhpValueIdentifierCount} > ${MAX_SRC_PHP_ARRAY_EXPORTED_PHPVALUE_IDENTIFIER}`,
  )
  for (const finding of arrayExportedPhpValueIdentifierFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpUnknownKeywordCount > MAX_SRC_PHP_UNKNOWN_KEYWORD) {
  hasFailure = true
  console.error(
    `src/php 'unknown' keyword count increased: ${srcPhpUnknownKeywordCount} > ${MAX_SRC_PHP_UNKNOWN_KEYWORD}`,
  )
}

if (srcPhpPhpMixedKeywordCount > MAX_SRC_PHP_PHPMIXED_KEYWORD) {
  hasFailure = true
  console.error(
    `src/php 'PhpMixed' keyword count increased: ${srcPhpPhpMixedKeywordCount} > ${MAX_SRC_PHP_PHPMIXED_KEYWORD}`,
  )
  for (const finding of phpMixedFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpArrayUnknownKeywordCount > MAX_SRC_PHP_ARRAY_UNKNOWN_KEYWORD) {
  hasFailure = true
  console.error(
    `src/php/array 'unknown' keyword count increased: ${srcPhpArrayUnknownKeywordCount} > ${MAX_SRC_PHP_ARRAY_UNKNOWN_KEYWORD}`,
  )
}

if (srcPhpArrayPhpMixedKeywordCount > MAX_SRC_PHP_ARRAY_PHPMIXED_KEYWORD) {
  hasFailure = true
  console.error(
    `src/php/array 'PhpMixed' keyword count increased: ${srcPhpArrayPhpMixedKeywordCount} > ${MAX_SRC_PHP_ARRAY_PHPMIXED_KEYWORD}`,
  )
  for (const finding of arrayPhpMixedFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpArrayAsExpressionCount > MAX_SRC_PHP_ARRAY_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/array 'as' expression count increased: ${srcPhpArrayAsExpressionCount} > ${MAX_SRC_PHP_ARRAY_AS_EXPRESSION}`,
  )
  for (const finding of arrayAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpVarUnknownKeywordCount > MAX_SRC_PHP_VAR_UNKNOWN_KEYWORD) {
  hasFailure = true
  console.error(
    `src/php/var 'unknown' keyword count increased: ${srcPhpVarUnknownKeywordCount} > ${MAX_SRC_PHP_VAR_UNKNOWN_KEYWORD}`,
  )
}

if (srcPhpVarPhpMixedKeywordCount > MAX_SRC_PHP_VAR_PHPMIXED_KEYWORD) {
  hasFailure = true
  console.error(
    `src/php/var 'PhpMixed' keyword count increased: ${srcPhpVarPhpMixedKeywordCount} > ${MAX_SRC_PHP_VAR_PHPMIXED_KEYWORD}`,
  )
  for (const finding of varPhpMixedFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpVarAsExpressionCount > MAX_SRC_PHP_VAR_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/var 'as' expression count increased: ${srcPhpVarAsExpressionCount} > ${MAX_SRC_PHP_VAR_AS_EXPRESSION}`,
  )
  for (const finding of varAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpStringsAsExpressionCount > MAX_SRC_PHP_STRINGS_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/strings 'as' expression count increased: ${srcPhpStringsAsExpressionCount} > ${MAX_SRC_PHP_STRINGS_AS_EXPRESSION}`,
  )
  for (const finding of stringsAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpStringsPhpMixedKeywordCount > MAX_SRC_PHP_STRINGS_PHPMIXED_KEYWORD) {
  hasFailure = true
  console.error(
    `src/php/strings 'PhpMixed' keyword count increased: ${srcPhpStringsPhpMixedKeywordCount} > ${MAX_SRC_PHP_STRINGS_PHPMIXED_KEYWORD}`,
  )
  for (const finding of stringsPhpMixedFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpCtypeAsExpressionCount > MAX_SRC_PHP_CTYPE_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/ctype 'as' expression count increased: ${srcPhpCtypeAsExpressionCount} > ${MAX_SRC_PHP_CTYPE_AS_EXPRESSION}`,
  )
  for (const finding of ctypeAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpInfoAsExpressionCount > MAX_SRC_PHP_INFO_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/info 'as' expression count increased: ${srcPhpInfoAsExpressionCount} > ${MAX_SRC_PHP_INFO_AS_EXPRESSION}`,
  )
  for (const finding of infoAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpHelpersAsExpressionCount > MAX_SRC_PHP_HELPERS_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/_helpers 'as' expression count increased: ${srcPhpHelpersAsExpressionCount} > ${MAX_SRC_PHP_HELPERS_AS_EXPRESSION}`,
  )
  for (const finding of helpersAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpUrlAsExpressionCount > MAX_SRC_PHP_URL_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/url 'as' expression count increased: ${srcPhpUrlAsExpressionCount} > ${MAX_SRC_PHP_URL_AS_EXPRESSION}`,
  )
  for (const finding of urlAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpFunchandAsExpressionCount > MAX_SRC_PHP_FUNCHAND_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/funchand 'as' expression count increased: ${srcPhpFunchandAsExpressionCount} > ${MAX_SRC_PHP_FUNCHAND_AS_EXPRESSION}`,
  )
  for (const finding of funchandAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpJsonAsExpressionCount > MAX_SRC_PHP_JSON_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/json 'as' expression count increased: ${srcPhpJsonAsExpressionCount} > ${MAX_SRC_PHP_JSON_AS_EXPRESSION}`,
  )
  for (const finding of jsonAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpDatetimeAsExpressionCount > MAX_SRC_PHP_DATETIME_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/datetime 'as' expression count increased: ${srcPhpDatetimeAsExpressionCount} > ${MAX_SRC_PHP_DATETIME_AS_EXPRESSION}`,
  )
  for (const finding of datetimeAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpBcAsExpressionCount > MAX_SRC_PHP_BC_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/bc 'as' expression count increased: ${srcPhpBcAsExpressionCount} > ${MAX_SRC_PHP_BC_AS_EXPRESSION}`,
  )
  for (const finding of bcAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpFilesystemAsExpressionCount > MAX_SRC_PHP_FILESYSTEM_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/filesystem 'as' expression count increased: ${srcPhpFilesystemAsExpressionCount} > ${MAX_SRC_PHP_FILESYSTEM_AS_EXPRESSION}`,
  )
  for (const finding of filesystemAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpMiscAsExpressionCount > MAX_SRC_PHP_MISC_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/misc 'as' expression count increased: ${srcPhpMiscAsExpressionCount} > ${MAX_SRC_PHP_MISC_AS_EXPRESSION}`,
  )
  for (const finding of miscAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpPcreAsExpressionCount > MAX_SRC_PHP_PCRE_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/pcre 'as' expression count increased: ${srcPhpPcreAsExpressionCount} > ${MAX_SRC_PHP_PCRE_AS_EXPRESSION}`,
  )
  for (const finding of pcreAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpXdiffAsExpressionCount > MAX_SRC_PHP_XDIFF_AS_EXPRESSION) {
  hasFailure = true
  console.error(
    `src/php/xdiff 'as' expression count increased: ${srcPhpXdiffAsExpressionCount} > ${MAX_SRC_PHP_XDIFF_AS_EXPRESSION}`,
  )
  for (const finding of xdiffAsExpressionFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpLocalPhpValueAliasCount > MAX_SRC_PHP_LOCAL_PHPVALUE_ALIAS) {
  hasFailure = true
  console.error(
    `src/php local 'type PhpValue = {} | null | undefined' alias count increased: ${srcPhpLocalPhpValueAliasCount} > ${MAX_SRC_PHP_LOCAL_PHPVALUE_ALIAS}`,
  )
  for (const finding of localPhpValueAliasFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (srcPhpDirectIniGlobalReadCount > MAX_SRC_PHP_DIRECT_INI_GLOBAL_READS) {
  hasFailure = true
  console.error(
    `src/php direct '$locutus?.php?.ini' read count increased: ${srcPhpDirectIniGlobalReadCount} > ${MAX_SRC_PHP_DIRECT_INI_GLOBAL_READS}`,
  )
  for (const finding of directIniGlobalReadFindings) {
    console.error(`  - ${finding.file}: ${finding.count}`)
  }
}

if (hasFailure) {
  process.exit(1)
}

console.log(
  'ts debt policy ok: @ts-nocheck 0, @ts-ignore 0, @ts-expect-error 0, Function type 0, Record<string, unknown> 0, as unknown as 0, src/php arguments 0, src/php raw index-signature unknown not increased, src/php exported unknown return-types not increased, src/php exported object keyword count not increased, src/php exported empty-object count not increased, src/php exported missing return-type count not increased, src/php exported PhpValue identifier count not increased, src/php/array exported PhpValue identifier count not increased, src/php unknown keyword count not increased, src/php PhpMixed keyword count not increased, src/php/array unknown keyword count not increased, src/php/array PhpMixed keyword count not increased, src/php/array as-expression count not increased, src/php/var unknown keyword count not increased, src/php/var PhpMixed keyword count not increased, src/php/var as-expression count not increased, src/php/strings as-expression count not increased, src/php/strings PhpMixed keyword count not increased, src/php/ctype as-expression count not increased, src/php/info as-expression count not increased, src/php/_helpers as-expression count not increased, src/php/url as-expression count not increased, src/php/funchand as-expression count not increased, src/php/json as-expression count not increased, src/php/datetime as-expression count not increased, src/php/bc as-expression count not increased, src/php/filesystem as-expression count not increased, src/php/misc as-expression count not increased, src/php/pcre as-expression count not increased, src/php/xdiff as-expression count not increased, src/php local PhpValue alias count not increased, src/php direct $locutus?.php?.ini reads not increased',
)
