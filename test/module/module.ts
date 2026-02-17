// @ts-nocheck
// Execute: test:module
// To test this in a local terminal
// This file tests that the library works when imported via ESM
export {}

import { createRequire } from 'node:module'

const effectiveness = 'futile'
const require = createRequire(import.meta.url)

// Test ESM import chain at various depths
const locutus = await import('../../src/index.ts')
const php = await import('../../src/php/index.ts')
const strings = await import('../../src/php/strings/index.ts')
const sprintfMod = await import('../../src/php/strings/sprintf.ts')
const ruby = await import('../../src/ruby/index.ts')
const mathMod = await import('../../src/ruby/Math/index.ts')
const pregMatchMod = await import('../../src/php/pcre/preg_match.ts')
const pregReplaceMod = await import('../../src/php/pcre/preg_replace.ts')

const { sprintf } = sprintfMod
const { preg_match } = pregMatchMod
const { preg_replace } = pregReplaceMod

console.log(preg_replace('/xmas/i', 'Christmas', 'It was the night before Xmas.')) // Should report It was the night before Christmas.
console.log(preg_replace('/xmas/ig', 'Christmas', 'xMas: It was the night before Xmas.')) // Should report Christmas: It was the night before Christmas.
console.log(preg_replace('/(\\w+) (\\d+), (\\d+)/i', '$11,$3', 'April 15, 2003')) // Should report April1,2003
console.log(preg_replace('/[^a-zA-Z0-9]+/', '', 'The Development of code . http://www.')) // Should report TheDevelopmentofcodehttpwww
console.log(preg_replace('/[^A-Za-z0-9_\\s]/', '', 'D"usseldorfer H"auptstrasse')) // Should report Dusseldorfer Hauptstrasse

console.log(preg_match('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$', 'rony@pharaohtools.com')) // Should report true
console.log(preg_match('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$', 'ronypharaohtools.com')) // Should report false
console.log(preg_match('^[0-9-+s()]*$', '021827495')) // Should report true
console.log(preg_match('^[0-9-+s()]*$', 'phone23no')) // Should report false

console.log(locutus.php.strings.sprintf('Resistance is %s', effectiveness))
console.log(php.strings.sprintf('Resistance is %s', effectiveness))
console.log(strings.sprintf('Resistance is %s', effectiveness))
console.log(sprintf('Resistance is %s', effectiveness))
console.log(ruby.Math.acos(0.3))
console.log(mathMod.acos(0.3))

strings.echo(php.url.parse_url('mysql://kevin:abcd1234@example.com/databasename').pass)
strings.echo(php.datetime.strtotime('2 januari 2012, 11:12:13 GMT'))

// Smoke-test published CommonJS shape from dist
const distLocutus = require('../../dist/index.js')
const distPhpStrings = require('../../dist/php/strings/index.js')
const distGolangStrings = require('../../dist/golang/strings/index.js')
const distSprintf = require('../../dist/php/strings/sprintf.js')
const distCompare = require('../../dist/golang/strings/Compare.js')
const distIndex = require('../../dist/golang/strings/Index2.js')
const distLegacyIndex = require('../../dist/golang/strings/Index.js')

if (typeof distSprintf !== 'function') {
  throw new Error('dist/php/strings/sprintf.js should export a function')
}
if (distSprintf('Resistance is %s', effectiveness) !== 'Resistance is futile') {
  throw new Error('dist/php/strings/sprintf.js deep require should be callable')
}
if (typeof distPhpStrings.sprintf !== 'function') {
  throw new Error('dist/php/strings/index.js should expose strings.sprintf')
}
if (typeof distCompare !== 'function') {
  throw new Error('dist/golang/strings/Compare.js should export a function')
}
if (typeof distIndex !== 'function') {
  throw new Error('dist/golang/strings/Index2.js should export a function')
}
if (typeof distLegacyIndex !== 'function') {
  throw new Error('dist/golang/strings/Index.js should export a function')
}
if (typeof distGolangStrings.Compare !== 'function') {
  throw new Error('dist/golang/strings/index.js should expose strings.Compare')
}
if (typeof distGolangStrings.Index !== 'function') {
  throw new Error('dist/golang/strings/index.js should expose strings.Index')
}
if (typeof distLocutus.php?.strings?.sprintf !== 'function') {
  throw new Error('dist/index.js should expose php.strings.sprintf')
}
