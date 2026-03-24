/**
 * Kotlin language handler for inventory coverage.
 *
 * Kotlin parity execution is not implemented yet, but we still track the
 * upstream surface for the stdlib namespaces we ship from.
 */

import { buildInventoryOnlyUpstreamSurface, discoverKotlinUpstreamSurface } from '../upstream-surface-canonical.ts'
import { createInventoryOnlyLanguageHandler } from '../upstream-surface-scope.ts'

export const KOTLIN_SKIP_LIST = new Set<string>([])

const KOTLIN_NAMESPACE_MAP: Record<string, string> = {
  arrays: 'kotlin',
  collections: 'kotlin.collections',
  comparisons: 'kotlin.comparisons',
  math: 'kotlin.math',
  random: 'kotlin.random',
  ranges: 'kotlin.ranges',
  sequences: 'kotlin.sequences',
  text: 'kotlin.text',
}

export const kotlinHandler = createInventoryOnlyLanguageHandler({
  language: 'kotlin',
  dockerImage: 'kotlin:2.2',
  displayName: 'Kotlin',
  version: '2.2',
  skipList: KOTLIN_SKIP_LIST,
  upstreamSurface: buildInventoryOnlyUpstreamSurface({
    language: 'kotlin',
    discover: discoverKotlinUpstreamSurface,
    getLocutusEntry: (func) => ({
      namespace: KOTLIN_NAMESPACE_MAP[func.category] ?? func.category,
      name: func.name,
    }),
  }),
})
