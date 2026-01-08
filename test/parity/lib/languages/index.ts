/**
 * Language handler registry
 */

import type { LanguageHandler } from '../types.ts'
import { awkHandler } from './awk.ts'
import { cHandler } from './c.ts'
import { clojureHandler } from './clojure.ts'
import { elixirHandler } from './elixir.ts'
import { golangHandler } from './golang.ts'
import { juliaHandler } from './julia.ts'
import { luaHandler } from './lua.ts'
import { perlHandler } from './perl.ts'
import { phpHandler } from './php.ts'
import { pythonHandler } from './python.ts'
import { rHandler } from './r.ts'
import { rubyHandler } from './ruby.ts'

const handlers: Record<string, LanguageHandler> = {
  awk: awkHandler,
  c: cHandler,
  clojure: clojureHandler,
  elixir: elixirHandler,
  golang: golangHandler,
  julia: juliaHandler,
  lua: luaHandler,
  perl: perlHandler,
  php: phpHandler,
  python: pythonHandler,
  r: rHandler,
  ruby: rubyHandler,
}

/**
 * Get the language handler for a given language
 * Returns undefined if the language is not supported yet
 */
export function getLanguageHandler(language: string): LanguageHandler | undefined {
  return handlers[language]
}

/**
 * Check if a language has verification support
 */
export function isLanguageSupported(language: string): boolean {
  return language in handlers
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages(): string[] {
  return Object.keys(handlers)
}
