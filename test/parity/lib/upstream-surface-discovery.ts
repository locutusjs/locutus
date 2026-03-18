import type {
  DiscoveredUpstreamSurfaceNamespaceCatalog,
  UpstreamSurfaceNamespaceSnapshot,
  UpstreamSurfaceSnapshot,
  UpstreamSurfaceSourceKind,
} from './types.ts'

export interface DiscoveredUpstreamSurfaceNamespaceData {
  namespace: string
  entries: string[]
  title?: string | undefined
  target?: string | undefined
  sourceKind?: UpstreamSurfaceSourceKind | undefined
  sourceRef?: string | undefined
}

export function uniqueSorted(values: Iterable<string>): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b))
}

export function buildDiscoveredUpstreamSurfaceSnapshot(input: {
  language: string
  catalog: Pick<DiscoveredUpstreamSurfaceNamespaceCatalog, 'target' | 'sourceKind' | 'sourceRef'>
  namespaces: DiscoveredUpstreamSurfaceNamespaceData[]
}): UpstreamSurfaceSnapshot {
  return {
    language: input.language,
    catalog: {
      target: input.catalog.target,
      sourceKind: input.catalog.sourceKind,
      sourceRef: input.catalog.sourceRef,
    },
    namespaces: input.namespaces
      .map<UpstreamSurfaceNamespaceSnapshot>((namespace) => ({
        namespace: namespace.namespace,
        title: namespace.title ?? namespace.namespace,
        target: namespace.target ?? input.catalog.target,
        sourceKind: namespace.sourceKind ?? input.catalog.sourceKind,
        sourceRef: namespace.sourceRef ?? input.catalog.sourceRef,
        entries: uniqueSorted(namespace.entries),
      }))
      .sort((left, right) => left.namespace.localeCompare(right.namespace)),
  }
}
