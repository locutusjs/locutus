/**
 * Swift language handler for inventory coverage.
 *
 * Swift parity execution is not implemented yet, but we still track the
 * upstream surface for the String namespace we ship from.
 */

import { buildInventoryOnlyUpstreamSurface, discoverSwiftUpstreamSurface } from '../upstream-surface-canonical.ts'
import { createInventoryOnlyLanguageHandler } from '../upstream-surface-scope.ts'

export const SWIFT_SKIP_LIST = new Set<string>([])

export const swiftHandler = createInventoryOnlyLanguageHandler({
  language: 'swift',
  dockerImage: 'swift:6.0',
  displayName: 'Swift',
  version: '6.0',
  skipList: SWIFT_SKIP_LIST,
  upstreamSurface: buildInventoryOnlyUpstreamSurface({
    language: 'swift',
    discover: discoverSwiftUpstreamSurface,
  }),
})
