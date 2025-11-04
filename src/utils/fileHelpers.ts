import { existsSync } from 'fs'
import { ensureDir as ensureDirFse } from 'fs-extra'
import { join, resolve } from 'path'
import { DEVTASK_DIR } from '../constants/index.js'

/**
 * Find .devtask directory by traversing up from current directory
 * @param startPath Starting directory path (defaults to process.cwd())
 * @returns Path to .devtask directory, or null if not found
 */
export function findDevtaskDir(startPath: string = process.cwd()): string | null {
  let currentPath = resolve(startPath)
  const root = resolve('/')

  while (currentPath !== root) {
    const devtaskPath = join(currentPath, DEVTASK_DIR)
    if (existsSync(devtaskPath)) {
      return devtaskPath
    }
    currentPath = resolve(currentPath, '..')
  }

  // Check root directory as well
  const devtaskPath = join(root, DEVTASK_DIR)
  if (existsSync(devtaskPath)) {
    return devtaskPath
  }

  return null
}

/**
 * Ensure directory exists, create if it doesn't
 * @param dirPath Directory path to ensure
 */
export async function ensureDir(dirPath: string): Promise<void> {
  await ensureDirFse(dirPath)
}

/**
 * Check if current directory is a Devtask project
 * @returns true if .devtask directory exists in current or parent directories
 */
export function isDevtaskProject(): boolean {
  return findDevtaskDir() !== null
}
