import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const cwd = process.cwd()
const budgetFile = path.join(cwd, 'ts-type-debt-budget.json')
const budget = JSON.parse(fs.readFileSync(budgetFile, 'utf-8'))

const tsNoCheckFileBudget = budget.tsNoCheckFileBudget
const explicitAnyBudget = budget.explicitAnyBudget

if (!Number.isInteger(tsNoCheckFileBudget) || tsNoCheckFileBudget < 0) {
  console.error(`Invalid tsNoCheckFileBudget in ${path.basename(budgetFile)}: ${tsNoCheckFileBudget}`)
  process.exit(1)
}

if (!Number.isInteger(explicitAnyBudget) || explicitAnyBudget < 0) {
  console.error(`Invalid explicitAnyBudget in ${path.basename(budgetFile)}: ${explicitAnyBudget}`)
  process.exit(1)
}

const sourceFiles = ts.sys
  .readDirectory(path.join(cwd, 'src'), ['.ts'], undefined, undefined)
  .filter((filePath) => !filePath.endsWith('.d.ts'))

let tsNoCheckFileCount = 0
let explicitAnyCount = 0

for (const filePath of sourceFiles) {
  const sourceText = fs.readFileSync(filePath, 'utf8')
  if (/@ts-nocheck\b/.test(sourceText)) {
    tsNoCheckFileCount += 1
  }

  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const visit = (node) => {
    if (node.kind === ts.SyntaxKind.AnyKeyword) {
      explicitAnyCount += 1
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
}

const tsNoCheckExceeded = tsNoCheckFileCount > tsNoCheckFileBudget
const explicitAnyExceeded = explicitAnyCount > explicitAnyBudget

if (tsNoCheckExceeded || explicitAnyExceeded) {
  if (tsNoCheckExceeded) {
    console.error(`@ts-nocheck file budget exceeded: ${tsNoCheckFileCount} > ${tsNoCheckFileBudget}`)
  }
  if (explicitAnyExceeded) {
    console.error(`explicit any budget exceeded: ${explicitAnyCount} > ${explicitAnyBudget}`)
  }
  process.exit(1)
}

console.log(
  `type debt budgets ok: @ts-nocheck ${tsNoCheckFileCount}/${tsNoCheckFileBudget}, explicit any ${explicitAnyCount}/${explicitAnyBudget}`,
)
