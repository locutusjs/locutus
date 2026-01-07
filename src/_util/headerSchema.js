/**
 * Zod schema for locutus function header comments
 *
 * This schema validates the header keys extracted from function files.
 * Any unrecognized header key will cause validation to fail early.
 */

const { z } = require('zod')

// Valid header keys and their descriptions
const VALID_HEADER_KEYS = {
  // Metadata
  'discuss at': 'URL to the function documentation page',
  estarget: 'ECMAScript target version (e.g., es2015)',
  verified: 'Runtime version(s) verified against, or "impossible"',
  test: 'Test flags (e.g., skip-all, skip-1)',
  note: 'Additional notes about the implementation',
  'depends on': 'Dependencies on other locutus functions',

  // Attribution
  'original by': 'Original author',
  'improved by': 'Contributors who improved the code',
  'reimplemented by': 'Contributors who rewrote the implementation',
  'parts by': 'Contributors who wrote parts of the code',
  'bugfixed by': 'Contributors who fixed bugs',
  'revised by': 'Contributors who revised the code',
  'input by': 'Contributors who provided input/suggestions',
  'based on': 'Work this implementation is based on',

  // Examples (numbered)
  example: 'Example code (numbered: example 1, example 2, etc.)',
  returns: 'Expected return value (numbered: returns 1, returns 2, etc.)',
}

// Schema for a single header value (array of lines)
const HeaderValueSchema = z.array(z.array(z.string()))

// Schema for all header keys
const HeaderKeysSchema = z
  .object({
    'discuss at': HeaderValueSchema.optional(),
    estarget: HeaderValueSchema.optional(),
    verified: HeaderValueSchema.optional(),
    test: HeaderValueSchema.optional(),
    note: HeaderValueSchema.optional(),
    'depends on': HeaderValueSchema.optional(),

    'original by': HeaderValueSchema.optional(),
    'improved by': HeaderValueSchema.optional(),
    'reimplemented by': HeaderValueSchema.optional(),
    'parts by': HeaderValueSchema.optional(),
    'bugfixed by': HeaderValueSchema.optional(),
    'revised by': HeaderValueSchema.optional(),
    'input by': HeaderValueSchema.optional(),
    'based on': HeaderValueSchema.optional(),

    example: HeaderValueSchema.optional(),
    returns: HeaderValueSchema.optional(),
  })
  .strict() // This makes it fail on unknown keys

/**
 * Validate header keys against the schema
 * @param {object} headKeys - Parsed header keys from util._headKeys()
 * @param {string} filepath - File path for error messages
 * @returns {object} - Validated header keys
 * @throws {Error} - If validation fails
 */
function validateHeaderKeys(headKeys, filepath) {
  const result = HeaderKeysSchema.safeParse(headKeys)

  if (!result.success) {
    // Zod 4.x uses 'issues' instead of 'errors'
    const issues = result.error.issues || JSON.parse(result.error.message)
    const errors = issues
      .map((e) => {
        if (e.code === 'unrecognized_keys') {
          return `Unrecognized header key(s): ${e.keys.join(', ')}`
        }
        return `${e.path.join('.')}: ${e.message}`
      })
      .join('\n  ')

    throw new Error(
      `Invalid header in ${filepath}:\n  ${errors}\n\nValid keys are: ${Object.keys(VALID_HEADER_KEYS).join(', ')}`,
    )
  }

  return result.data
}

/**
 * Get the list of valid header keys
 * @returns {string[]}
 */
function getValidHeaderKeys() {
  return Object.keys(VALID_HEADER_KEYS)
}

/**
 * Check if a key is a valid header key (including numbered variants)
 * @param {string} key - The key to check
 * @returns {boolean}
 */
function isValidHeaderKey(key) {
  // Check for numbered keys like "example 1", "returns 2"
  const numberedMatch = key.match(/^(\w+)\s+\d+$/)
  if (numberedMatch) {
    const baseKey = numberedMatch[1]
    return baseKey === 'example' || baseKey === 'returns' || baseKey === 'note'
  }
  return key in VALID_HEADER_KEYS
}

module.exports = {
  VALID_HEADER_KEYS,
  HeaderKeysSchema,
  validateHeaderKeys,
  getValidHeaderKeys,
  isValidHeaderKey,
}
