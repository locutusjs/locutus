/**
 * Parity test configuration - source of truth for supported languages
 *
 * This config is used by both:
 * - The parity test system (to run tests)
 * - The header validation schema (to validate `parity verified:` headers)
 */

/**
 * Supported parity language configuration
 */
export interface ParityLanguageConfig {
  /** Internal identifier (used in file paths, e.g., "php", "python", "golang") */
  id: string
  /** Display name for headers (e.g., "PHP", "Python", "Go") */
  displayName: string
  /** Current version being tested */
  version: string
  /** Docker image used for testing */
  dockerImage: string
}

/**
 * All supported parity languages
 * This is the source of truth for header validation
 */
export const PARITY_LANGUAGES: ParityLanguageConfig[] = [
  {
    id: 'awk',
    displayName: 'GNU AWK',
    version: '5.3',
    dockerImage: 'alpine:3.21',
  },
  {
    id: 'c',
    displayName: 'C',
    version: '23',
    dockerImage: 'gcc:14',
  },
  {
    id: 'clojure',
    displayName: 'Clojure',
    version: '1.12',
    dockerImage: 'clojure:temurin-21-tools-deps',
  },
  {
    id: 'elixir',
    displayName: 'Elixir',
    version: '1.18',
    dockerImage: 'elixir:1.18',
  },
  {
    id: 'golang',
    displayName: 'Go',
    version: '1.23',
    dockerImage: 'golang:1.23',
  },
  {
    id: 'julia',
    displayName: 'Julia',
    version: '1.11',
    dockerImage: 'julia:1.11',
  },
  {
    id: 'lua',
    displayName: 'Lua',
    version: '5.4',
    dockerImage: 'nickblah/lua:5.4-alpine',
  },
  {
    id: 'perl',
    displayName: 'Perl',
    version: '5.40',
    dockerImage: 'perl:5.40',
  },
  {
    id: 'php',
    displayName: 'PHP',
    version: '8.3',
    dockerImage: 'php:8.3-cli',
  },
  {
    id: 'python',
    displayName: 'Python',
    version: '3.12',
    dockerImage: 'python:3.12',
  },
  {
    id: 'r',
    displayName: 'R',
    version: '4.4',
    dockerImage: 'r-base:4.4.2',
  },
  {
    id: 'ruby',
    displayName: 'Ruby',
    version: '3.3',
    dockerImage: 'ruby:3.3',
  },
]

/**
 * Get valid parity verified values for header validation
 * Returns array like ["PHP 8.3", "Python 3.12", "Go 1.23", "impossible"]
 */
export function getValidParityVerifiedValues(): string[] {
  const values = PARITY_LANGUAGES.map((lang) => `${lang.displayName} ${lang.version}`)
  values.push('impossible') // Special value for functions that can't be tested
  return values
}

/**
 * Get parity language config by internal ID
 */
export function getParityLanguageById(id: string): ParityLanguageConfig | undefined {
  return PARITY_LANGUAGES.find((lang) => lang.id === id)
}

/**
 * Get parity language config by display name
 */
export function getParityLanguageByDisplayName(displayName: string): ParityLanguageConfig | undefined {
  return PARITY_LANGUAGES.find((lang) => lang.displayName === displayName)
}
