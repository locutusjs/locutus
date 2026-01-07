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

export interface LanguageHandler {
  /** Translate JS example code to native language code */
  translate(jsCode: string[], funcName: string): string
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
