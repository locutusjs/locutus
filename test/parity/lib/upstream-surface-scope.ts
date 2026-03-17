/**
 * Canonical upstream-surface discovery scope.
 *
 * This manifest defines which namespaces belong to the tracked official
 * core/stdlib scope for each language, and which source/ref is authoritative
 * for discovering them.
 */

import { readFileSync } from 'node:fs'

import YAML from 'js-yaml'
import { z } from 'zod'

import type { UpstreamSurfaceScope } from './types.ts'

const upstreamSurfaceNamespaceScopeSchema = z
  .object({
    title: z.string().min(1).optional(),
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

export function loadUpstreamSurfaceScope(scopePath: string): UpstreamSurfaceScope {
  const raw = readFileSync(scopePath, 'utf8')
  const parsed = YAML.load(raw) ?? {}
  return upstreamSurfaceScopeSchema.parse(parsed)
}
