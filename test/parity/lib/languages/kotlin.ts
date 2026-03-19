/**
 * Kotlin language handler for inventory coverage.
 *
 * Kotlin parity execution is not implemented yet, but we still track the
 * upstream surface for the stdlib namespaces we ship from.
 */

import { buildInventoryOnlyUpstreamSurface, discoverKotlinUpstreamSurface } from '../upstream-surface-canonical.ts'
import { createInventoryOnlyLanguageHandler } from '../upstream-surface-scope.ts'

export const KOTLIN_SKIP_LIST = new Set<string>([])

export const kotlinHandler = createInventoryOnlyLanguageHandler({
  language: 'kotlin',
  dockerImage: 'kotlin:2.2',
  displayName: 'Kotlin',
  version: '2.2',
  skipList: KOTLIN_SKIP_LIST,
  upstreamSurface: buildInventoryOnlyUpstreamSurface({
    language: 'kotlin',
    discover: discoverKotlinUpstreamSurface,
  }),
})
