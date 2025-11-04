import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import { Task, Config } from '../types/index.js'
import { DEVTASK_DIR, TASKS_FILE, CONFIG_FILE, ERROR_MESSAGES } from '../constants/index.js'
import { ensureDir, findDevtaskDir } from '../utils/index.js'

export class FileStorage {
  private devtaskDir: string

  constructor(projectRoot: string = process.cwd()) {
    const foundDir = findDevtaskDir(projectRoot)
    if (foundDir) {
      this.devtaskDir = foundDir
    } else {
      this.devtaskDir = join(projectRoot, DEVTASK_DIR)
    }
  }

  /**
   * Ensure .devtask directory exists
   */
  async ensureDevtaskDir(): Promise<void> {
    await ensureDir(this.devtaskDir)
  }

  /**
   * Get path to tasks.json
   */
  private getTasksPath(): string {
    return join(this.devtaskDir, TASKS_FILE)
  }

  /**
   * Get path to config.json
   */
  private getConfigPath(): string {
    return join(this.devtaskDir, CONFIG_FILE)
  }

  /**
   * Load tasks from tasks.json
   * @returns Array of tasks
   */
  async loadTasks(): Promise<Task[]> {
    const tasksPath = this.getTasksPath()

    if (!existsSync(tasksPath)) {
      return []
    }

    try {
      const content = await readFile(tasksPath, 'utf-8')
      return JSON.parse(content) as Task[]
    } catch (_error) {
      throw new Error(ERROR_MESSAGES.FILE_READ_ERROR)
    }
  }

  /**
   * Save tasks to tasks.json
   * @param tasks Array of tasks to save
   */
  async saveTasks(tasks: Task[]): Promise<void> {
    const tasksPath = this.getTasksPath()

    try {
      await this.ensureDevtaskDir()
      await writeFile(tasksPath, JSON.stringify(tasks, null, 2), 'utf-8')
    } catch (_error) {
      throw new Error(ERROR_MESSAGES.FILE_WRITE_ERROR)
    }
  }

  /**
   * Load config from config.json
   * @returns Config object
   */
  async loadConfig(): Promise<Config> {
    const configPath = this.getConfigPath()

    if (!existsSync(configPath)) {
      throw new Error(ERROR_MESSAGES.NOT_DEVTASK_PROJECT)
    }

    try {
      const content = await readFile(configPath, 'utf-8')
      return JSON.parse(content) as Config
    } catch (_error) {
      throw new Error(ERROR_MESSAGES.FILE_READ_ERROR)
    }
  }

  /**
   * Save config to config.json
   * @param config Config object to save
   */
  async saveConfig(config: Config): Promise<void> {
    const configPath = this.getConfigPath()

    try {
      await this.ensureDevtaskDir()
      await writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8')
    } catch (_error) {
      throw new Error(ERROR_MESSAGES.FILE_WRITE_ERROR)
    }
  }

  /**
   * Initialize a new Devtask project
   * @param projectName Name of the project
   * @returns Config object
   */
  async initialize(projectName: string): Promise<Config> {
    await this.ensureDevtaskDir()

    const config: Config = {
      projectName,
      version: '1.0.0',
      createdAt: new Date().toISOString(),
      autoPriority: true,
    }

    await this.saveConfig(config)
    await this.saveTasks([])

    return config
  }

  /**
   * Check if project is initialized
   * @returns true if config.json exists
   */
  isInitialized(): boolean {
    return existsSync(this.getConfigPath())
  }
}
