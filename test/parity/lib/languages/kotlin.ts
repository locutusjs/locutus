/**
 * Kotlin language handler for inventory coverage.
 *
 * Kotlin parity execution is not implemented yet, but we still track the
 * upstream surface for the stdlib namespaces we ship from.
 */

import type { LanguageHandler } from '../types.ts'

export const KOTLIN_SKIP_LIST = new Set<string>([])

export const kotlinHandler: LanguageHandler = {
  translate: () => '',
  normalize: (output) => output.trim(),
  skipList: KOTLIN_SKIP_LIST,
  dockerImage: 'kotlin:2.2',
  displayName: 'Kotlin',
  version: '2.2',
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
