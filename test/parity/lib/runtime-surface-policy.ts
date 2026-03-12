/**
 * Runtime surface policy loading and validation.
 *
 * This is the human-maintained inventory that distinguishes:
 * - shipped extras we intentionally keep
 * - runtime-only functions we want later
 * - runtime-only functions we explicitly do not want
 */

import { readFileSync } from 'node:fs'

import YAML from 'js-yaml'
import { z } from 'zod'

import type { RuntimeSurfaceLanguagePolicy, RuntimeSurfacePolicy } from './types.ts'

const runtimeSurfaceLocutusExtraPolicyStatusSchema = z.enum([
  'extension_dependent',
  'keep',
  'language_construct',
  'legacy_keep',
  'removed_upstream',
])

const runtimeSurfaceRuntimeOnlyPolicyStatusSchema = z.enum(['out_of_scope', 'wanted'])

const locutusExtraPolicyEntrySchema = z
  .object({
    status: runtimeSurfaceLocutusExtraPolicyStatusSchema,
    reason: z.string().min(1),
  })
  .strict()

const runtimeOnlyPolicyEntrySchema = z
  .object({
    status: runtimeSurfaceRuntimeOnlyPolicyStatusSchema,
    reason: z.string().min(1),
  })
  .strict()

function optionalPolicySection<T extends z.ZodType>(schema: T) {
  return z.preprocess((value) => (value === null ? undefined : value), schema.optional())
}

const runtimeSurfaceLanguagePolicySchema = z
  .object({
    locutusExtras: optionalPolicySection(z.record(z.string(), locutusExtraPolicyEntrySchema)),
    runtimeOnly: optionalPolicySection(z.record(z.string(), runtimeOnlyPolicyEntrySchema)),
  })
  .strict()

const runtimeSurfacePolicySchema = z.record(z.string(), runtimeSurfaceLanguagePolicySchema)

export function loadRuntimeSurfacePolicy(policyPath: string): RuntimeSurfacePolicy {
  const raw = readFileSync(policyPath, 'utf8')
  const parsed = YAML.load(raw) ?? {}
  return runtimeSurfacePolicySchema.parse(parsed)
}

export function getLanguageRuntimeSurfacePolicy(
  policy: RuntimeSurfacePolicy,
  language: string,
): RuntimeSurfaceLanguagePolicy {
  return policy[language] ?? {}
}
