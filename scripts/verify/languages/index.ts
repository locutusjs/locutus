/**
 * Language handler registry
 */

import type { LanguageHandler } from '../types.ts'
import { phpHandler } from './php.ts'
import { pythonHandler } from './python.ts'

const handlers: Record<string, LanguageHandler> = {
  php: phpHandler,
  python: pythonHandler,
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
