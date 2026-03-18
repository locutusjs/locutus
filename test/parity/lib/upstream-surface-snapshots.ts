/**
 * Version-tagged upstream surface snapshots.
 *
 * These are generated from target runtimes or source manifests and then
 * checked into the repo so CI can validate Locutus surface drift without
 * re-discovering every upstream catalog on each run.
 */

import { readdirSync, readFileSync } from 'node:fs'
import { basename, extname, join } from 'node:path'

import YAML from 'js-yaml'
import { z } from 'zod'

import type { UpstreamSurfaceSnapshot } from './types.ts'

const upstreamSurfaceNamespaceSnapshotSchema = z
  .object({
    namespace: z.string().min(1),
    title: z.string().min(1).optional(),
    target: z.string().min(1),
    sourceKind: z.enum(['runtime', 'source_manifest', 'manual']),
    sourceRef: z.string().min(1),
    entries: z.array(z.string().min(1)),
  })
  .strict()

const upstreamSurfaceSnapshotSchema = z
  .object({
    language: z.string().min(1),
    namespaces: z.array(upstreamSurfaceNamespaceSnapshotSchema).min(1),
  })
  .strict()

export function loadUpstreamSurfaceSnapshot(snapshotPath: string): UpstreamSurfaceSnapshot {
  const raw = readFileSync(snapshotPath, 'utf8')
  const parsed = YAML.load(raw) ?? {}
  return upstreamSurfaceSnapshotSchema.parse(parsed)
}

export function loadUpstreamSurfaceSnapshots(snapshotDir: string): Map<string, UpstreamSurfaceSnapshot> {
  const snapshots = new Map<string, UpstreamSurfaceSnapshot>()
  for (const entry of readdirSync(snapshotDir)) {
    if (extname(entry) !== '.yml' && extname(entry) !== '.yaml') {
      continue
    }
    const snapshot = loadUpstreamSurfaceSnapshot(join(snapshotDir, entry))
    snapshots.set(snapshot.language, snapshot)
  }
  return snapshots
}

export function getUpstreamSurfaceSnapshotPath(snapshotDir: string, language: string): string {
  return join(snapshotDir, `${language}.yml`)
}

export function getSnapshotLanguageName(snapshotPath: string): string {
  return basename(snapshotPath, extname(snapshotPath))
}

export function loadRepoUpstreamSurfaceSnapshot(language: string, rootDir = process.cwd()): UpstreamSurfaceSnapshot {
  const snapshotDir = join(rootDir, 'test', 'parity', 'fixtures', 'upstream-surface')
  return loadUpstreamSurfaceSnapshot(getUpstreamSurfaceSnapshotPath(snapshotDir, language))
}
