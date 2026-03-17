/**
 * Language handler registry
 */

import type { LanguageHandler } from '../types.ts'
import { awkHandler } from './awk.ts'
import { cHandler } from './c.ts'
import { clojureHandler } from './clojure.ts'
import { elixirHandler } from './elixir.ts'
import { golangHandler } from './golang.ts'
import { haskellHandler } from './haskell.ts'
import { juliaHandler } from './julia.ts'
import { kotlinHandler } from './kotlin.ts'
import { luaHandler } from './lua.ts'
import { perlHandler } from './perl.ts'
import { phpHandler } from './php.ts'
import { powershellHandler } from './powershell.ts'
import { pythonHandler } from './python.ts'
import { rHandler } from './r.ts'
import { rubyHandler } from './ruby.ts'
import { rustHandler } from './rust.ts'
import { swiftHandler } from './swift.ts'
import { tclHandler } from './tcl.ts'

const handlers: Record<string, LanguageHandler> = {
  awk: awkHandler,
  c: cHandler,
  clojure: clojureHandler,
  elixir: elixirHandler,
  golang: golangHandler,
  haskell: haskellHandler,
  julia: juliaHandler,
  kotlin: kotlinHandler,
  lua: luaHandler,
  perl: perlHandler,
  php: phpHandler,
  powershell: powershellHandler,
  python: pythonHandler,
  r: rHandler,
  rust: rustHandler,
  ruby: rubyHandler,
  swift: swiftHandler,
  tcl: tclHandler,
}

function hasParitySupport(handler: LanguageHandler | undefined): boolean {
  return !!handler && handler.parityEnabled !== false
}

/**
 * Get the language handler for a given language
 * Returns undefined if the language is not supported yet
 */
export function getLanguageHandler(language: string): LanguageHandler | undefined {
  return handlers[language]
}

/**
 * Get the language handler for a given language if it can execute parity tests.
 * Returns undefined for inventory-only handlers.
 */
export function getParityLanguageHandler(language: string): LanguageHandler | undefined {
  const handler = getLanguageHandler(language)
  return hasParitySupport(handler) ? handler : undefined
}

/**
 * Check if a language has verification support
 */
export function isLanguageSupported(language: string): boolean {
  return hasParitySupport(getLanguageHandler(language))
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages(): string[] {
  return Object.keys(handlers)
}

/**
 * Get all languages that support executable parity tests.
 */
export function getParitySupportedLanguages(): string[] {
  return Object.entries(handlers)
    .filter(([, handler]) => hasParitySupport(handler))
    .map(([language]) => language)
}
