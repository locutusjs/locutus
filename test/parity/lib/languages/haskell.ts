/**
 * Haskell language handler for inventory coverage.
 *
 * Haskell parity execution is not implemented yet, but we still track the
 * upstream surface for the Data.List-derived Locutus namespace.
 */

import { createInventoryOnlyLanguageHandler } from '../upstream-surface-scope.ts'

export const HASKELL_SKIP_LIST = new Set<string>([])

export const haskellHandler = createInventoryOnlyLanguageHandler({
  dockerImage: 'haskell:9.10',
  displayName: 'Haskell',
  version: '9.10',
  skipList: HASKELL_SKIP_LIST,
})
