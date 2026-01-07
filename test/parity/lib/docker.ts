/**
 * Docker utilities for running code in language runtimes
 */

import { execSync, spawnSync } from 'node:child_process'

/**
 * Check if Docker image exists, pull if not
 */
export function ensureDockerImage(image: string): boolean {
  try {
    execSync(`docker image inspect ${image}`, { stdio: 'pipe' })
    return true
  } catch {
    console.log(`  Pulling ${image}...`)
    try {
      execSync(`docker pull ${image}`, { stdio: 'pipe' })
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
 * Run code in a Docker container
 */
export function runInDocker(
  image: string,
  cmd: string[],
  options: { mountRepo?: boolean; repoPath?: string; timeout?: number } = {},
): DockerRunResult {
  const { mountRepo = false, repoPath, timeout = 10000 } = options

  try {
    const dockerArgs = ['run', '--rm', '-i']
    if (mountRepo && repoPath) {
      dockerArgs.push('-v', `${repoPath}:/work`, '-w', '/work')
    }

    const result = spawnSync('docker', [...dockerArgs, image, ...cmd], {
      encoding: 'utf8',
      timeout,
    })

    if (result.error) {
      return { success: false, output: '', error: result.error.message }
    }

    if (result.status !== 0 || (result.stderr && result.stderr.trim())) {
      return {
        success: false,
        output: result.stdout || '',
        error: result.stderr?.trim() || 'Unknown error',
      }
    }

    return { success: true, output: result.stdout }
  } catch (e) {
    return { success: false, output: '', error: String(e) }
  }
}
