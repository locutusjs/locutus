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

import type { LanguageHandler, UpstreamSurfaceScope, UpstreamSurfaceSnapshot } from './types.ts'

const upstreamSurfaceNamespaceScopeSchema = z
  .object({
    title: z.string().min(1).optional(),
    target: z.string().min(1),
    sourceKind: z.enum(['runtime', 'source_manifest', 'manual']),
    sourceRef: z.string().min(1),
  })
  .strict()

const upstreamSurfaceLanguageScopeSchema = z
  .object({
    namespaces: z.record(z.string(), upstreamSurfaceNamespaceScopeSchema),
  })
  .strict()

const upstreamSurfaceScopeSchema = z.record(z.string(), upstreamSurfaceLanguageScopeSchema)

export interface DiscoveredUpstreamSurfaceNamespace {
  namespace: string
  entries: string[]
}

interface InventoryOnlyLanguageHandlerConfig {
  dockerImage: string
  displayName: string
  version: string
  skipList: Set<string>
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

export function createInventoryOnlyLanguageHandler(config: InventoryOnlyLanguageHandlerConfig): LanguageHandler {
  return {
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
    upstreamSurface: {
      getLocutusEntry: (func) => ({
        namespace: func.category,
        name: func.name,
      }),
    },
  }
}
