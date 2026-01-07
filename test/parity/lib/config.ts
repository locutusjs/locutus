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
    id: 'golang',
    displayName: 'Go',
    version: '1.23',
    dockerImage: 'golang:1.23',
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
