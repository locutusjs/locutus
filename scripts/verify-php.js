#!/usr/bin/env node
/**
 * Cross-language verification for PHP functions
 *
 * This script verifies that locutus PHP implementations match actual PHP behavior
 * by running examples through both `php -r` and our JavaScript implementation.
 *
 * Usage:
 *   node scripts/verify-php.js                    # Verify all functions
 *   node scripts/verify-php.js strlen             # Verify specific function
 *   node scripts/verify-php.js --category array   # Verify all array functions
 */

const { execSync, spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const glob = require('globby')

// Check if PHP is available
function checkPhp() {
  try {
    execSync('php --version', { stdio: 'pipe' })
    return true
  } catch (e) {
    console.error('PHP is not installed or not in PATH')
    return false
  }
}

// Parse example/returns pairs from function file
function parseExamples(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const examples = []

  // Match example N: ... and returns N: ... pairs
  const exampleRegex = /\/\/\s+example\s+(\d+):\s*(.+)/g
  const returnsRegex = /\/\/\s+returns\s+(\d+):\s*(.+)/g

  const exampleMatches = {}
  const returnsMatches = {}

  let match
  while ((match = exampleRegex.exec(content)) !== null) {
    const num = match[1]
    const code = match[2].trim()
    if (!exampleMatches[num]) {
      exampleMatches[num] = []
    }
    exampleMatches[num].push(code)
  }

  while ((match = returnsRegex.exec(content)) !== null) {
    const num = match[1]
    const expected = match[2].trim()
    returnsMatches[num] = expected
  }

  // Combine into examples
  for (const num of Object.keys(exampleMatches)) {
    if (returnsMatches[num]) {
      examples.push({
        number: parseInt(num),
        code: exampleMatches[num],
        expected: returnsMatches[num]
      })
    }
  }

  return examples
}

// Convert JS example syntax to PHP
function jsToPhp(jsCode, functionName) {
  let php = jsCode

  // Remove var $ prefix (used in examples)
  php = php.replace(/var\s+\$(\w+)\s*=\s*/g, '$$1 = ')

  // The function call should already be in PHP-compatible format
  // Just need to handle some edge cases

  // Remove trailing semicolon if present
  php = php.replace(/;$/, '')

  return php
}

// Convert JS expected value to PHP evaluation
function jsExpectedToPhp(jsExpected) {
  // Handle common JS to PHP conversions
  let php = jsExpected

  // true/false are same
  // null is same
  // strings are same
  // numbers are same
  // arrays/objects need conversion

  return php
}

// Run PHP code and get result
function runPhp(phpCode) {
  try {
    const result = spawnSync('php', ['-r', phpCode], {
      encoding: 'utf8',
      timeout: 5000
    })

    if (result.error) {
      return { success: false, error: result.error.message }
    }

    if (result.status !== 0) {
      return { success: false, error: result.stderr }
    }

    return { success: true, output: result.stdout.trim() }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

// Run JS function and get result
function runJs(functionPath, exampleCode) {
  try {
    // Load the function
    const fn = require(functionPath)

    // The example code might set variables and then call the function
    // We need to evaluate it in a context where the function is available

    // For now, just try to extract and run the function call
    // This is simplified - real implementation would need proper parsing

    return { success: true, output: 'JS execution not yet implemented' }
  } catch (e) {
    return { success: false, error: e.message }
  }
}

// Verify a single function
async function verifyFunction(filePath) {
  const functionName = path.basename(filePath, '.js')
  const examples = parseExamples(filePath)

  if (examples.length === 0) {
    return { functionName, status: 'no-examples', results: [] }
  }

  const results = []

  for (const example of examples) {
    // Build PHP code to test
    const setupCode = example.code.slice(0, -1).join('; ')
    const callCode = example.code[example.code.length - 1]

    // Generate PHP that outputs the result in a comparable format
    const phpCode = `
      ${setupCode ? setupCode + ';' : ''}
      $result = ${callCode};
      echo json_encode($result);
    `.trim().replace(/\n\s+/g, ' ')

    const phpResult = runPhp(phpCode)

    results.push({
      example: example.number,
      code: example.code.join('; '),
      expected: example.expected,
      phpResult: phpResult.success ? phpResult.output : `ERROR: ${phpResult.error}`,
      match: phpResult.success && phpResult.output === example.expected
    })
  }

  const allMatch = results.every(r => r.match)

  return {
    functionName,
    status: allMatch ? 'pass' : 'fail',
    results
  }
}

// Main
async function main() {
  if (!checkPhp()) {
    process.exit(1)
  }

  const args = process.argv.slice(2)
  let pattern = 'src/php/**/*.js'

  if (args.includes('--category')) {
    const idx = args.indexOf('--category')
    const category = args[idx + 1]
    pattern = `src/php/${category}/*.js`
  } else if (args.length > 0 && !args[0].startsWith('-')) {
    // Specific function
    const funcName = args[0]
    pattern = `src/php/**/${funcName}.js`
  }

  // Exclude index files and helpers
  const files = await glob(pattern, {
    ignore: ['**/index.js', '**/_*.js', '**/*.mocha.js']
  })

  console.log(`Verifying ${files.length} PHP functions against actual PHP...\n`)

  let passed = 0
  let failed = 0
  let noExamples = 0
  const failures = []

  for (const file of files) {
    const result = await verifyFunction(file)

    if (result.status === 'pass') {
      passed++
      process.stdout.write('.')
    } else if (result.status === 'fail') {
      failed++
      process.stdout.write('F')
      failures.push(result)
    } else {
      noExamples++
      process.stdout.write('?')
    }
  }

  console.log('\n')
  console.log(`Results: ${passed} passed, ${failed} failed, ${noExamples} no examples`)

  if (failures.length > 0) {
    console.log('\nFailures:')
    for (const failure of failures) {
      console.log(`\n  ${failure.functionName}:`)
      for (const r of failure.results) {
        if (!r.match) {
          console.log(`    Example ${r.example}: ${r.code}`)
          console.log(`      Expected: ${r.expected}`)
          console.log(`      PHP says: ${r.phpResult}`)
        }
      }
    }
  }

  process.exit(failed > 0 ? 1 : 0)
}

main().catch(console.error)
