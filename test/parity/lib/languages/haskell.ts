/**
 * Haskell language handler for inventory coverage.
 *
 * Haskell parity execution is not implemented yet, but we still track the
 * upstream surface for the Data.List-derived Locutus namespace.
 */

import type { LanguageHandler } from '../types.ts'

export const HASKELL_SKIP_LIST = new Set<string>([])

export const haskellHandler: LanguageHandler = {
  translate: () => '',
  normalize: (output) => output.trim(),
  skipList: HASKELL_SKIP_LIST,
  dockerImage: 'haskell:9.10',
  displayName: 'Haskell',
  version: '9.10',
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
