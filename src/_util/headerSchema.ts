/**
 * Zod schema for locutus function header comments
 *
 * This schema validates the header keys extracted from function files.
 * Any unrecognized header key will cause validation to fail early.
 */

import { z } from 'zod'

// Valid header keys and their descriptions
export const VALID_HEADER_KEYS: Record<string, string> = {
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
export const HeaderKeysSchema = z
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
  .strict()

export type HeaderKeys = z.infer<typeof HeaderKeysSchema>

/**
 * Validate header keys against the schema
 */
export function validateHeaderKeys(headKeys: unknown, filepath: string): HeaderKeys {
  const result = HeaderKeysSchema.safeParse(headKeys)

  if (!result.success) {
    const issues = result.error.issues
    const errors = issues
      .map((e) => {
        if (e.code === 'unrecognized_keys') {
          return `Unrecognized header key(s): ${(e as { keys: string[] }).keys.join(', ')}`
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
 */
export function getValidHeaderKeys(): string[] {
  return Object.keys(VALID_HEADER_KEYS)
}

/**
 * Check if a key is a valid header key (including numbered variants)
 */
export function isValidHeaderKey(key: string): boolean {
  const numberedMatch = key.match(/^(\w+)\s+\d+$/)
  if (numberedMatch) {
    const baseKey = numberedMatch[1]
    return baseKey === 'example' || baseKey === 'returns' || baseKey === 'note'
  }
  return key in VALID_HEADER_KEYS
}
