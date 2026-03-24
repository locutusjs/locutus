/**
 * Haskell language handler for inventory coverage.
 *
 * Haskell parity execution is not implemented yet, but we still track the
 * upstream surface for the Data.List-derived Locutus namespace.
 */

import { buildInventoryOnlyUpstreamSurface, discoverHaskellUpstreamSurface } from '../upstream-surface-canonical.ts'
import { createInventoryOnlyLanguageHandler } from '../upstream-surface-scope.ts'

export const HASKELL_SKIP_LIST = new Set<string>([])

const HASKELL_NAMESPACE_MAP: Record<string, string> = {
  bool: 'Data.Bool',
  char: 'Data.Char',
  either: 'Data.Either',
  function: 'Data.Function',
  list: 'Data.List',
  maybe: 'Data.Maybe',
  numeric: 'Numeric',
  ord: 'Data.Ord',
  tuple: 'Data.Tuple',
}

export const haskellHandler = createInventoryOnlyLanguageHandler({
  language: 'haskell',
  dockerImage: 'haskell:9.10',
  displayName: 'Haskell',
  version: '9.10',
  skipList: HASKELL_SKIP_LIST,
  upstreamSurface: buildInventoryOnlyUpstreamSurface({
    language: 'haskell',
    discover: discoverHaskellUpstreamSurface,
    discoverUsesDocker: true,
    getLocutusEntry: (func) => ({
      namespace: HASKELL_NAMESPACE_MAP[func.category] ?? func.category,
      name: func.name,
    }),
  }),
})
