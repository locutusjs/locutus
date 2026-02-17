import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const budgetFile = path.join(cwd, 'ts-strict-next-budget.json')
const budget = JSON.parse(fs.readFileSync(budgetFile, 'utf-8')).strictNextErrorBudget

if (!Number.isInteger(budget) || budget < 0) {
  console.error(`Invalid strictNextErrorBudget in ${path.basename(budgetFile)}: ${budget}`)
  process.exit(1)
}

const result = spawnSync('corepack', ['yarn', 'tsc', '--noEmit', '-p', 'tsconfig.strict-next.json'], {
  cwd,
  encoding: 'utf-8',
})

const combined = `${result.stdout || ''}${result.stderr || ''}`
const matches = combined.match(/error TS\d+:/g)
const errorCount = matches ? matches.length : 0

if (errorCount > budget) {
  console.error(`strict-next error budget exceeded: ${errorCount} > ${budget}`)
  process.stderr.write(combined)
  process.exit(1)
}

console.log(`strict-next error budget ok: ${errorCount}/${budget}`)
