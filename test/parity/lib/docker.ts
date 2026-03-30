/**
 * Docker utilities for running code in language runtimes
 */

import { execSync, spawnSync } from 'node:child_process'

// Track which images have been pulled this session
const pulledImages = new Set<string>()

function dockerImageKey(image: string, platform?: string): string {
  return platform ? `${image}@@${platform}` : image
}

/**
 * Ensure Docker image is available and up-to-date
 * Only pulls once per session - subsequent calls just verify image exists
 */
export function ensureDockerImage(image: string, options: { quiet?: boolean; platform?: string } = {}): boolean {
  const { quiet = false, platform } = options
  const imageKey = dockerImageKey(image, platform)
  // Already pulled this session, skip
  if (pulledImages.has(imageKey)) {
    return true
  }

  if (!quiet) {
    const platformNote = platform ? ` (${platform})` : ''
    console.log(`  Pulling ${image}${platformNote}...`)
  }

  try {
    const platformArgs = platform ? ` --platform ${platform}` : ''
    execSync(`docker pull${platformArgs} ${image}`, { stdio: 'pipe' })
    pulledImages.add(imageKey)
    // Log the actual image digest for debugging
    if (!quiet) {
      try {
        const digest = execSync(`docker inspect ${image} --format '{{index .RepoDigests 0}}'`, {
          encoding: 'utf8',
          stdio: 'pipe',
        }).trim()
        console.log(`    Digest: ${digest}`)
      } catch {
        // Ignore
      }
    }
    return true
  } catch {
    // Pull failed, check if we have a local copy as fallback
    try {
      const inspectPlatformArgs = platform ? ` --platform ${platform}` : ''
      execSync(`docker image inspect${inspectPlatformArgs} ${image}`, { stdio: 'pipe' })
      pulledImages.add(imageKey)
      if (!quiet) {
        console.log(`    (using cached image)`)
      }
      return true
    } catch {
      return false
    }
  }
}

/**
 * Check if Docker is available
 */
export function checkDockerAvailable(): boolean {
  try {
    execSync('docker --version', { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
}

export interface DockerRunResult {
  success: boolean
  output: string
  error?: string
}

/**
 * Get the digest of a Docker image
 * Returns empty string if image not found or digest unavailable
 */
export function getDockerDigest(image: string): string {
  try {
    const digest = execSync(`docker inspect ${image} --format '{{index .RepoDigests 0}}'`, {
      encoding: 'utf8',
      stdio: 'pipe',
    }).trim()
    return digest
  } catch {
    return ''
  }
}

/**
 * Run code in a Docker container
 */
export function runInDocker(
  image: string,
  cmd: string[],
  options: {
    mountRepo?: boolean
    repoPath?: string
    timeout?: number
    maxBuffer?: number
    platform?: string
    input?: string
  } = {},
): DockerRunResult {
  const { mountRepo = false, repoPath, timeout = 10000, maxBuffer = 16 * 1024 * 1024, platform, input } = options

  try {
    const dockerArgs = ['run', '--rm', '-i']
    if (platform) {
      dockerArgs.push('--platform', platform)
    }
    if (mountRepo && repoPath) {
      dockerArgs.push('-v', `${repoPath}:/work`, '-w', '/work')
    }

    const result = spawnSync('docker', [...dockerArgs, image, ...cmd], {
      encoding: 'utf8',
      timeout,
      maxBuffer,
      input,
    })

    if (result.error) {
      return { success: false, output: '', error: result.error.message }
    }

    if (result.status !== 0 || (result.stderr && result.stderr.trim())) {
      const stderr = result.stderr?.trim()
      return {
        success: false,
        output: result.stdout || '',
        error: stderr || `Docker exited with status ${result.status ?? 'unknown'}`,
      }
    }

    return { success: true, output: result.stdout }
  } catch (e) {
    return { success: false, output: '', error: String(e) }
  }
}
