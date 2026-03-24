/**
 * Human-maintained upstream surface inventory.
 *
 * This inventory stores compact decisions about upstream entries:
 * - wanted backlog items
 * - explicit non-goals
 * - intentional Locutus-only extras
 */

import { readFileSync } from 'node:fs'

import YAML from 'js-yaml'
import { z } from 'zod'

import type { UpstreamSurfaceDecision, UpstreamSurfaceInventory, UpstreamSurfaceLanguageInventory } from './types.ts'

const upstreamSurfaceDecisionSchema = z.enum([
  'wanted',
  'keep_extension',
  'keep_language_construct',
  'keep_legacy',
  'keep_locutus_only',
  'skip_environment',
  'skip_low_value',
  'skip_plain_value_mismatch',
  'skip_runtime_model',
  'skip_security',
  'skip_side_effects',
])

const upstreamSurfaceCatalogDecisionSchema = z.enum([
  'wanted',
  'skip_environment',
  'skip_low_value',
  'skip_plain_value_mismatch',
  'skip_runtime_model',
  'skip_security',
  'skip_side_effects',
])

const upstreamSurfaceDecisionEntrySchema = z
  .object({
    decision: upstreamSurfaceDecisionSchema,
    note: z.string().min(1).optional(),
  })
  .strict()

const upstreamSurfaceCatalogDecisionEntrySchema = z
  .object({
    decision: upstreamSurfaceCatalogDecisionSchema,
    note: z.string().min(1).optional(),
  })
  .strict()

const upstreamSurfaceCatalogDecisionRuleSchema = z
  .object({
    match: z.string().min(1),
    decision: upstreamSurfaceCatalogDecisionSchema,
    note: z.string().min(1).optional(),
  })
  .strict()

function optionalSection<T extends z.ZodType>(schema: T) {
  return z.preprocess((value) => (value === null ? undefined : value), schema.optional())
}

const upstreamSurfaceNamespaceInventorySchema = z
  .object({
    title: z.string().min(1).optional(),
    default: optionalSection(upstreamSurfaceCatalogDecisionEntrySchema),
    rules: optionalSection(z.array(upstreamSurfaceCatalogDecisionRuleSchema)),
    decisions: optionalSection(z.record(z.string(), upstreamSurfaceDecisionEntrySchema)),
  })
  .strict()

const upstreamSurfaceNamespaceInventoryRuleSchema = upstreamSurfaceNamespaceInventorySchema
  .extend({
    match: z.string().min(1),
  })
  .strict()

const upstreamSurfaceLanguageInventorySchema = z
  .object({
    title: z.string().min(1).optional(),
    scopeNote: z.string().min(1).optional(),
    namespaceRules: optionalSection(z.array(upstreamSurfaceNamespaceInventoryRuleSchema)),
    defaultNamespace: optionalSection(upstreamSurfaceNamespaceInventorySchema),
    namespaces: optionalSection(z.record(z.string(), upstreamSurfaceNamespaceInventorySchema)),
  })
  .strict()

const upstreamSurfaceInventorySchema = z.record(z.string(), upstreamSurfaceLanguageInventorySchema)

export function loadUpstreamSurfaceInventory(inventoryPath: string): UpstreamSurfaceInventory {
  const raw = readFileSync(inventoryPath, 'utf8')
  const parsed = YAML.load(raw) ?? {}
  return upstreamSurfaceInventorySchema.parse(parsed)
}

export function getLanguageUpstreamSurfaceInventory(
  inventory: UpstreamSurfaceInventory,
  language: string,
): UpstreamSurfaceLanguageInventory {
  return inventory[language] ?? {}
}

export function isKeepDecision(decision: UpstreamSurfaceDecision): boolean {
  return decision.startsWith('keep_')
}

export function isSkipDecision(decision: UpstreamSurfaceDecision): boolean {
  return decision.startsWith('skip_')
}

export function isWantedDecision(decision: UpstreamSurfaceDecision): boolean {
  return decision === 'wanted'
}
