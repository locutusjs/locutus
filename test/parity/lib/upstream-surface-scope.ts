/**
 * Canonical upstream-surface discovery scope.
 *
 * This manifest defines which namespaces belong to the tracked official
 * core/stdlib scope for each language, and which source/ref is authoritative
 * for discovering them.
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import YAML from 'js-yaml'
import { z } from 'zod'

import type {
  DiscoveredUpstreamSurfaceNamespaceCatalog,
  LanguageHandler,
  UpstreamSurfaceScope,
  UpstreamSurfaceSnapshot,
} from './types.ts'
import { loadRepoUpstreamSurfaceSnapshot } from './upstream-surface-snapshots.ts'

const upstreamSurfaceNamespaceScopeSchema = z
  .object({
    title: z.string().min(1).optional(),
    catalogNamespace: z.string().min(1).optional(),
    target: z.string().min(1),
    sourceKind: z.enum(['runtime', 'source_manifest', 'manual']),
    sourceRef: z.string().min(1),
  })
  .strict()

const upstreamSurfaceLanguageNamespaceCatalogSchema = z
  .object({
    target: z.string().min(1),
    sourceKind: z.enum(['runtime', 'source_manifest', 'manual']),
    sourceRef: z.string().min(1),
  })
  .strict()

const upstreamSurfaceLanguageScopeSchema = z
  .object({
    namespaceCatalog: upstreamSurfaceLanguageNamespaceCatalogSchema.optional(),
    namespaces: z.record(z.string(), upstreamSurfaceNamespaceScopeSchema),
  })
  .strict()

const upstreamSurfaceScopeSchema = z.record(z.string(), upstreamSurfaceLanguageScopeSchema)

export interface DiscoveredUpstreamSurfaceNamespace {
  namespace: string
  entries: string[]
}

interface InventoryOnlyLanguageHandlerConfig {
  language: string
  dockerImage: string
  displayName: string
  version: string
  skipList: Set<string>
  upstreamSurface?: LanguageHandler['upstreamSurface']
}

let cachedRepoScope:
  | {
      rootDir: string
      scope: UpstreamSurfaceScope
    }
  | undefined

export function loadUpstreamSurfaceScope(scopePath: string): UpstreamSurfaceScope {
  const raw = readFileSync(scopePath, 'utf8')
  const parsed = YAML.load(raw) ?? {}
  return upstreamSurfaceScopeSchema.parse(parsed)
}

export function loadRepoUpstreamSurfaceScope(rootDir = process.cwd()): UpstreamSurfaceScope {
  if (cachedRepoScope?.rootDir === rootDir) {
    return cachedRepoScope.scope
  }

  const scope = loadUpstreamSurfaceScope(join(rootDir, 'docs', 'upstream-surface-scope.yml'))
  cachedRepoScope = {
    rootDir,
    scope,
  }
  return scope
}

export function buildScopedUpstreamSurfaceSnapshot(
  language: string,
  namespaces: DiscoveredUpstreamSurfaceNamespace[],
  rootDir = process.cwd(),
): UpstreamSurfaceSnapshot {
  const scope = loadRepoUpstreamSurfaceScope(rootDir)
  const languageScope = scope[language]
  if (!languageScope) {
    throw new Error(`No canonical upstream surface scope is defined for ${language}.`)
  }

  return {
    language,
    namespaces: namespaces.map((namespace) => {
      const scopeNamespace = languageScope.namespaces[namespace.namespace]
      if (!scopeNamespace) {
        throw new Error(`No canonical upstream surface scope is defined for ${language}/${namespace.namespace}.`)
      }

      return {
        namespace: namespace.namespace,
        title: scopeNamespace.title ?? namespace.namespace,
        target: scopeNamespace.target,
        sourceKind: scopeNamespace.sourceKind,
        sourceRef: scopeNamespace.sourceRef,
        entries: [...new Set(namespace.entries)].sort(),
      }
    }),
  }
}

export function getUpstreamSurfaceLanguageScope(
  language: string,
  rootDir = process.cwd(),
): UpstreamSurfaceScope[string] {
  const scope = loadRepoUpstreamSurfaceScope(rootDir)
  const languageScope = scope[language]
  if (!languageScope) {
    throw new Error(`No canonical upstream surface scope is defined for ${language}.`)
  }
  return languageScope
}

export function getUpstreamSurfaceScopeNamespaceNames(language: string, rootDir = process.cwd()): string[] {
  return Object.keys(getUpstreamSurfaceLanguageScope(language, rootDir).namespaces).sort()
}

export function getUpstreamSurfaceNamespaceScope(language: string, namespace: string, rootDir = process.cwd()) {
  const languageScope = getUpstreamSurfaceLanguageScope(language, rootDir)
  const namespaceScope = languageScope.namespaces[namespace]
  if (!namespaceScope) {
    throw new Error(`No canonical upstream surface scope is defined for ${language}/${namespace}.`)
  }
  return namespaceScope
}

export function discoverUpstreamSurfaceNamespaceCatalogFromScope(
  language: string,
  rootDir = process.cwd(),
): DiscoveredUpstreamSurfaceNamespaceCatalog {
  const languageScope = getUpstreamSurfaceLanguageScope(language, rootDir)
  if (!languageScope.namespaceCatalog) {
    throw new Error(`No canonical namespace catalog is defined for ${language}.`)
  }

  return {
    ...languageScope.namespaceCatalog,
    namespaces: [
      ...new Set(
        Object.entries(languageScope.namespaces).map(
          ([namespace, namespaceScope]) => namespaceScope.catalogNamespace ?? namespace,
        ),
      ),
    ].sort(),
  }
}

export function createInventoryOnlyLanguageHandler(config: InventoryOnlyLanguageHandlerConfig): LanguageHandler {
  return {
    parityEnabled: false,
    translate: () => '',
    normalize: (output) => output.trim(),
    skipList: config.skipList,
    dockerImage: config.dockerImage,
    displayName: config.displayName,
    version: config.version,
    get parityValue() {
      return `${this.displayName} ${this.version}`
    },
    dockerCmd: () => ['sh', '-lc', 'exit 1'],
    mountRepo: false,
    upstreamSurface: config.upstreamSurface ?? {
      discover: () => loadRepoUpstreamSurfaceSnapshot(config.language),
      discoverMode: 'snapshot',
      discoverNamespaceCatalog: () => discoverUpstreamSurfaceNamespaceCatalogFromScope(config.language),
      getLocutusEntry: (func) => ({
        namespace: func.category,
        name: func.name,
      }),
    },
  }
}
