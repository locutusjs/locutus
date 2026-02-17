import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const cwd = process.cwd()
const budgetFile = path.join(cwd, 'ts-type-debt-budget.json')
const budget = JSON.parse(fs.readFileSync(budgetFile, 'utf-8'))

const tsNoCheckFileBudget = budget.tsNoCheckFileBudget
const explicitAnyBudget = budget.explicitAnyBudget
const asAnyBudget = budget.asAnyBudget
const nonNullAssertionBudget = budget.nonNullAssertionBudget
const recordStringUnknownBudget = budget.recordStringUnknownBudget
const tsExpectErrorBudget = budget.tsExpectErrorBudget

if (!Number.isInteger(tsNoCheckFileBudget) || tsNoCheckFileBudget < 0) {
  console.error(`Invalid tsNoCheckFileBudget in ${path.basename(budgetFile)}: ${tsNoCheckFileBudget}`)
  process.exit(1)
}

if (!Number.isInteger(explicitAnyBudget) || explicitAnyBudget < 0) {
  console.error(`Invalid explicitAnyBudget in ${path.basename(budgetFile)}: ${explicitAnyBudget}`)
  process.exit(1)
}

if (!Number.isInteger(asAnyBudget) || asAnyBudget < 0) {
  console.error(`Invalid asAnyBudget in ${path.basename(budgetFile)}: ${asAnyBudget}`)
  process.exit(1)
}

if (!Number.isInteger(nonNullAssertionBudget) || nonNullAssertionBudget < 0) {
  console.error(`Invalid nonNullAssertionBudget in ${path.basename(budgetFile)}: ${nonNullAssertionBudget}`)
  process.exit(1)
}

if (!Number.isInteger(recordStringUnknownBudget) || recordStringUnknownBudget < 0) {
  console.error(`Invalid recordStringUnknownBudget in ${path.basename(budgetFile)}: ${recordStringUnknownBudget}`)
  process.exit(1)
}

if (!Number.isInteger(tsExpectErrorBudget) || tsExpectErrorBudget < 0) {
  console.error(`Invalid tsExpectErrorBudget in ${path.basename(budgetFile)}: ${tsExpectErrorBudget}`)
  process.exit(1)
}

const sourceFiles = ts.sys
  .readDirectory(path.join(cwd, 'src'), ['.ts'], undefined, undefined)
  .filter((filePath) => !filePath.endsWith('.d.ts'))

let tsNoCheckFileCount = 0
let explicitAnyCount = 0
let asAnyCount = 0
let nonNullAssertionCount = 0
let recordStringUnknownCount = 0
let tsExpectErrorCount = 0

for (const filePath of sourceFiles) {
  const sourceText = fs.readFileSync(filePath, 'utf8')
  if (/@ts-nocheck\b/.test(sourceText)) {
    tsNoCheckFileCount += 1
  }
  tsExpectErrorCount += (sourceText.match(/@ts-expect-error\b/g) || []).length
  recordStringUnknownCount += (sourceText.match(/\bRecord\s*<\s*string\s*,\s*unknown\s*>/g) || []).length

  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const visit = (node) => {
    if (node.kind === ts.SyntaxKind.AnyKeyword) {
      explicitAnyCount += 1
    }
    if (ts.isAsExpression(node) && node.type.kind === ts.SyntaxKind.AnyKeyword) {
      asAnyCount += 1
    }
    if (ts.isTypeAssertionExpression(node) && node.type.kind === ts.SyntaxKind.AnyKeyword) {
      asAnyCount += 1
    }
    if (ts.isNonNullExpression(node)) {
      nonNullAssertionCount += 1
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
}

const tsNoCheckExceeded = tsNoCheckFileCount > tsNoCheckFileBudget
const explicitAnyExceeded = explicitAnyCount > explicitAnyBudget
const asAnyExceeded = asAnyCount > asAnyBudget
const nonNullAssertionExceeded = nonNullAssertionCount > nonNullAssertionBudget
const recordStringUnknownExceeded = recordStringUnknownCount > recordStringUnknownBudget
const tsExpectErrorExceeded = tsExpectErrorCount > tsExpectErrorBudget

if (
  tsNoCheckExceeded ||
  explicitAnyExceeded ||
  asAnyExceeded ||
  nonNullAssertionExceeded ||
  recordStringUnknownExceeded ||
  tsExpectErrorExceeded
) {
  if (tsNoCheckExceeded) {
    console.error(`@ts-nocheck file budget exceeded: ${tsNoCheckFileCount} > ${tsNoCheckFileBudget}`)
  }
  if (explicitAnyExceeded) {
    console.error(`explicit any budget exceeded: ${explicitAnyCount} > ${explicitAnyBudget}`)
  }
  if (asAnyExceeded) {
    console.error(`as any budget exceeded: ${asAnyCount} > ${asAnyBudget}`)
  }
  if (nonNullAssertionExceeded) {
    console.error(`non-null assertion budget exceeded: ${nonNullAssertionCount} > ${nonNullAssertionBudget}`)
  }
  if (recordStringUnknownExceeded) {
    console.error(`Record<string, unknown> budget exceeded: ${recordStringUnknownCount} > ${recordStringUnknownBudget}`)
  }
  if (tsExpectErrorExceeded) {
    console.error(`@ts-expect-error budget exceeded: ${tsExpectErrorCount} > ${tsExpectErrorBudget}`)
  }
  process.exit(1)
}

console.log(
  `type debt budgets ok: @ts-nocheck ${tsNoCheckFileCount}/${tsNoCheckFileBudget}, explicit any ${explicitAnyCount}/${explicitAnyBudget}, as any ${asAnyCount}/${asAnyBudget}, non-null assertions ${nonNullAssertionCount}/${nonNullAssertionBudget}, Record<string, unknown> ${recordStringUnknownCount}/${recordStringUnknownBudget}, @ts-expect-error ${tsExpectErrorCount}/${tsExpectErrorBudget}`,
)
