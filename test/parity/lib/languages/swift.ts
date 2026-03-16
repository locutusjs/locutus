/**
 * Swift language handler for inventory coverage.
 *
 * Swift parity execution is not implemented yet, but we still track the
 * upstream surface for the String namespace we ship from.
 */

import type { LanguageHandler } from '../types.ts'

export const SWIFT_SKIP_LIST = new Set<string>([])

export const swiftHandler: LanguageHandler = {
  translate: () => '',
  normalize: (output) => output.trim(),
  skipList: SWIFT_SKIP_LIST,
  dockerImage: 'swift:6.0',
  displayName: 'Swift',
  version: '6.0',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: () => ['sh', '-lc', 'exit 1'],
  mountRepo: false,
  upstreamSurface: {
    getLocutusEntry: (func) => ({
      namespace: func.category,
      name: func.name,
    }),
  },
}
