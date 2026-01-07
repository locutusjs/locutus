/**
 * Language handler registry
 */

import type { LanguageHandler } from '../types.ts'
import { cHandler } from './c.ts'
import { golangHandler } from './golang.ts'
import { phpHandler } from './php.ts'
import { pythonHandler } from './python.ts'
import { rubyHandler } from './ruby.ts'

const handlers: Record<string, LanguageHandler> = {
  c: cHandler,
  golang: golangHandler,
  php: phpHandler,
  python: pythonHandler,
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
