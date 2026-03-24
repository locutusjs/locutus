/**
 * Shared types for the parity test system
 *
 * Parity tests verify that locutus JS implementations produce identical
 * output to native language runtimes (PHP, Python, etc.) via Docker.
 */

export interface Example {
  number: number
  code: string[]
  expectedRaw: string
}

/**
 * Verification status for a function:
 * - parity value (e.g., "PHP 8.3"): verified against that runtime
 * - "impossible": cannot be tested (pass-by-ref, side effects, etc.)
 */
export type VerifiedStatus = string

export interface FunctionInfo {
  path: string
  language: string
  category: string
  name: string
  examples: Example[]
  dependsOn: string[]
  verified: VerifiedStatus[] // Runtime versions or "impossible"
  isImpossible: boolean // True if verified: impossible
}

export interface CacheEntry {
  hash: string
  results: VerifyResult[]
  timestamp: number
  version: number
}

export interface VerifyResult {
  example: number
  passed: boolean
  expected: string
  jsResult: string
  nativeResult?: string
  error?: string
}

export interface DockerConfig {
  image: string
  cmd: (code: string) => string[]
  mountRepo?: boolean
}

export interface RuntimeSurfaceSnapshot {
  language: string
  target: string
  functions: string[]
}

export type UpstreamSurfaceSourceKind = 'runtime' | 'source_manifest' | 'manual'

export type UpstreamSurfaceDecision =
  | 'wanted'
  | 'keep_extension'
  | 'keep_language_construct'
  | 'keep_legacy'
  | 'keep_locutus_only'
  | 'skip_environment'
  | 'skip_low_value'
  | 'skip_plain_value_mismatch'
  | 'skip_runtime_model'
  | 'skip_security'
  | 'skip_side_effects'

export interface UpstreamSurfaceDecisionEntry {
  decision: UpstreamSurfaceDecision
  note?: string | undefined
}

export interface UpstreamSurfaceCatalogDecisionRule extends UpstreamSurfaceDecisionEntry {
  match: string
}

export interface UpstreamSurfaceNamespaceInventory {
  title?: string | undefined
  default?: UpstreamSurfaceDecisionEntry | undefined
  rules?: UpstreamSurfaceCatalogDecisionRule[] | undefined
  decisions?: Record<string, UpstreamSurfaceDecisionEntry> | undefined
}

export interface UpstreamSurfaceNamespaceInventoryRule extends UpstreamSurfaceNamespaceInventory {
  match: string
}

export interface UpstreamSurfaceLanguageInventory {
  title?: string | undefined
  scopeNote?: string | undefined
  namespaceRules?: UpstreamSurfaceNamespaceInventoryRule[] | undefined
  defaultNamespace?: UpstreamSurfaceNamespaceInventory | undefined
  namespaces?: Record<string, UpstreamSurfaceNamespaceInventory> | undefined
}

export type UpstreamSurfaceInventory = Record<string, UpstreamSurfaceLanguageInventory>

export interface UpstreamSurfaceNamespaceScope {
  title?: string | undefined
  catalogNamespace?: string | undefined
  target: string
  sourceKind: UpstreamSurfaceSourceKind
  sourceRef: string
}

export interface UpstreamSurfaceLanguageNamespaceCatalog {
  target: string
  sourceKind: UpstreamSurfaceSourceKind
  sourceRef: string
}

export interface DiscoveredUpstreamSurfaceNamespaceCatalog extends UpstreamSurfaceLanguageNamespaceCatalog {
  namespaces: string[]
}

export interface UpstreamSurfaceLanguageScope {
  namespaceCatalog?: UpstreamSurfaceLanguageNamespaceCatalog | undefined
  namespaces: Record<string, UpstreamSurfaceNamespaceScope>
}

export type UpstreamSurfaceScope = Record<string, UpstreamSurfaceLanguageScope>

export interface RuntimeSurfaceLocutusFunction {
  path: string
  language: string
  category: string
  name: string
}

export interface UpstreamSurfaceNamespaceSnapshot {
  namespace: string
  title?: string | undefined
  target: string
  sourceKind: UpstreamSurfaceSourceKind
  sourceRef: string
  entries: string[]
}

export interface UpstreamSurfaceSnapshot {
  language: string
  catalog?: {
    target: string
    sourceKind: UpstreamSurfaceSourceKind
    sourceRef: string
  }
  namespaces: UpstreamSurfaceNamespaceSnapshot[]
}

export interface UpstreamSurfaceLocutusEntry {
  namespace: string
  name: string
}

export interface UpstreamSurfaceAdapter {
  /** Discover comparable upstream entries for one language. */
  discover?: (() => Promise<UpstreamSurfaceSnapshot> | UpstreamSurfaceSnapshot) | undefined
  /** Whether discovery refreshes a canonical source live or reuses a checked-in snapshot. */
  discoverMode?: 'live' | 'snapshot' | undefined
  /** Whether live discovery requires Docker rather than direct network/source fetches. */
  discoverUsesDocker?: boolean | undefined
  /** Discover the canonical official namespace list for one language. */
  discoverNamespaceCatalog?:
    | (() => Promise<DiscoveredUpstreamSurfaceNamespaceCatalog> | DiscoveredUpstreamSurfaceNamespaceCatalog)
    | undefined
  /** Map a Locutus function into the comparable upstream namespace entry, or null to ignore it. */
  getLocutusEntry(func: RuntimeSurfaceLocutusFunction): UpstreamSurfaceLocutusEntry | null
}

export interface LanguageHandler {
  /** Whether this handler can execute real parity tests rather than inventory-only tracking. */
  parityEnabled?: boolean
  /** Translate JS example code to native language code */
  translate(jsCode: string[], funcName: string, category?: string): string
  /** Normalize native output for comparison. Expected value provided for context-aware normalization. */
  normalize(output: string, expected?: string): string
  /** Functions to skip (removed, deprecated, etc.) */
  skipList: Set<string>
  /** Docker image for this language */
  dockerImage: string
  /** Display name for headers (e.g., "PHP", "Python", "Go") */
  displayName: string
  /** Version string (e.g., "8.3", "3.12", "1.23") */
  version: string
  /** Full parity value for header matching (e.g., "PHP 8.3") */
  readonly parityValue: string
  /** Generate Docker command for running code */
  dockerCmd(code: string): string[]
  /** Whether to mount the repo in Docker */
  mountRepo?: boolean
  /** Optional upstream surface discovery for guardrail and backlog checks. */
  upstreamSurface?: UpstreamSurfaceAdapter
}

export interface VerifyOptions {
  useCache: boolean
  includeUnverified: boolean
  filter?: string
  /** Docker image digests for cache invalidation */
  dockerDigests: Record<string, string>
}

export interface ParitySummary {
  passed: number
  failed: number
  skipped: number
  impossible: number
  unverified: number
}
