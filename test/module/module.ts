// Execute: test:module
// To test this in a local terminal
// This file tests that the library works when imported via require()

import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const effectiveness = 'futile'
const location = '../../src'

// Test CJS require() compatibility
const locutus = require(location) as {
  php: { strings: { sprintf: (format: string, ...args: unknown[]) => string } }
}
const php = require(location + '/php') as {
  strings: { sprintf: (format: string, ...args: unknown[]) => string; echo: (str: unknown) => void }
  url: { parse_url: (url: string) => { pass: string } }
  datetime: { strtotime: (str: string) => number }
}
const strings = require(location + '/php/strings') as {
  sprintf: (format: string, ...args: unknown[]) => string
  echo: (str: unknown) => void
}
const sprintf = require(location + '/php/strings/sprintf') as (format: string, ...args: unknown[]) => string
const ruby = require(location + '/ruby') as { Math: { acos: (n: number) => number } }
const math = require(location + '/ruby/Math') as { acos: (n: number) => number }
const preg_match = require(location + '/php/pcre/preg_match') as (pattern: string, subject: string) => boolean | number
const preg_replace = require(location + '/php/pcre/preg_replace') as (
  pattern: string,
  replacement: string,
  subject: string,
) => string

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
console.log(math.acos(0.3))

strings.echo(php.url.parse_url('mysql://kevin:abcd1234@example.com/databasename').pass)
strings.echo(php.datetime.strtotime('2 januari 2012, 11:12:13 GMT'))
