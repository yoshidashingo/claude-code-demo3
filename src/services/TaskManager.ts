import { v4 as uuidv4 } from 'uuid'
import { Task, CreateTaskData, FilterOptions, TaskStats } from '../types/index.js'
import { FileStorage } from '../data/index.js'
import { PriorityEstimator } from './PriorityEstimator.js'
import {
  validateTitle,
  validateDescription,
  validateStatus,
  validatePriority,
} from '../utils/index.js'
import { ERROR_MESSAGES, DEFAULT_PRIORITY } from '../constants/index.js'

export class TaskManager {
  private storage: FileStorage
  private priorityEstimator: PriorityEstimator

  constructor(storage: FileStorage) {
    this.storage = storage
    this.priorityEstimator = new PriorityEstimator()
  }

  /**
   * Create a new task
   * @param data Task creation data
   * @returns Created task
   */
  async createTask(data: CreateTaskData): Promise<Task> {
    // Validate input
    validateTitle(data.title)
    if (data.description) {
      validateDescription(data.description)
    }

    const tasks = await this.storage.loadTasks()
    const now = new Date().toISOString()

    const task: Task = {
      id: uuidv4(),
      title: data.title,
      description: data.description || '',
      status: 'todo',
      priority: data.priority || DEFAULT_PRIORITY,
      dueDate: data.dueDate || null,
      createdAt: now,
      updatedAt: now,
      statusHistory: [],
    }

    // Calculate estimated priority if autoPriority is enabled
    const config = await this.storage.loadConfig()
    if (config.autoPriority) {
      const score = this.priorityEstimator.estimate(task)
      task.estimatedPriority = score.estimatedPriority
    }

    tasks.push(task)
    await this.storage.saveTasks(tasks)

    return task
  }

  /**
   * Get all tasks with optional filtering
   * @param filter Filter options
   * @returns Array of tasks
   */
  async getTasks(filter?: FilterOptions): Promise<Task[]> {
    let tasks = await this.storage.loadTasks()

    if (filter) {
      if (filter.status) {
        tasks = tasks.filter(task => task.status === filter.status)
      }

      if (filter.priority) {
        tasks = tasks.filter(task => task.priority === filter.priority)
      }

      if (filter.search) {
        const searchLower = filter.search.toLowerCase()
        tasks = tasks.filter(
          task =>
            task.title.toLowerCase().includes(searchLower) ||
            task.description.toLowerCase().includes(searchLower)
        )
      }
    }

    return tasks
  }

  /**
   * Get a task by ID
   * @param id Task ID
   * @returns Task or null if not found
   */
  async getTaskById(id: string): Promise<Task | null> {
    const tasks = await this.storage.loadTasks()
    return tasks.find(task => task.id === id) || null
  }

  /**
   * Update a task
   * @param id Task ID
   * @param updates Partial task data to update
   * @returns Updated task
   */
  async updateTask(
    id: string,
    updates: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'statusHistory'>>
  ): Promise<Task> {
    const tasks = await this.storage.loadTasks()
    const taskIndex = tasks.findIndex(task => task.id === id)

    if (taskIndex === -1) {
      throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND(id))
    }

    // Validate updates
    if (updates.title !== undefined) {
      validateTitle(updates.title)
    }
    if (updates.description !== undefined) {
      validateDescription(updates.description)
    }

    const task = tasks[taskIndex]
    const updatedTask: Task = {
      ...task,
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    // Recalculate estimated priority if autoPriority is enabled
    const config = await this.storage.loadConfig()
    if (config.autoPriority) {
      const score = this.priorityEstimator.estimate(updatedTask)
      updatedTask.estimatedPriority = score.estimatedPriority
    }

    tasks[taskIndex] = updatedTask
    await this.storage.saveTasks(tasks)

    return updatedTask
  }

  /**
   * Delete a task
   * @param id Task ID
   */
  async deleteTask(id: string): Promise<void> {
    const tasks = await this.storage.loadTasks()
    const taskIndex = tasks.findIndex(task => task.id === id)

    if (taskIndex === -1) {
      throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND(id))
    }

    tasks.splice(taskIndex, 1)
    await this.storage.saveTasks(tasks)
  }

  /**
   * Change task status
   * @param id Task ID
   * @param newStatus New status
   * @returns Updated task
   */
  async changeStatus(id: string, newStatus: string): Promise<Task> {
    const validatedStatus = validateStatus(newStatus)
    const tasks = await this.storage.loadTasks()
    const taskIndex = tasks.findIndex(task => task.id === id)

    if (taskIndex === -1) {
      throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND(id))
    }

    const task = tasks[taskIndex]
    const oldStatus = task.status

    // Add to status history
    task.statusHistory.push({
      from: oldStatus,
      to: validatedStatus,
      changedAt: new Date().toISOString(),
    })

    task.status = validatedStatus
    task.updatedAt = new Date().toISOString()

    // Recalculate estimated priority if autoPriority is enabled
    const config = await this.storage.loadConfig()
    if (config.autoPriority) {
      const score = this.priorityEstimator.estimate(task)
      task.estimatedPriority = score.estimatedPriority
    }

    tasks[taskIndex] = task
    await this.storage.saveTasks(tasks)

    return task
  }

  /**
   * Change task priority
   * @param id Task ID
   * @param newPriority New priority
   * @returns Updated task
   */
  async changePriority(id: string, newPriority: string): Promise<Task> {
    const validatedPriority = validatePriority(newPriority)
    const tasks = await this.storage.loadTasks()
    const taskIndex = tasks.findIndex(task => task.id === id)

    if (taskIndex === -1) {
      throw new Error(ERROR_MESSAGES.TASK_NOT_FOUND(id))
    }

    const task = tasks[taskIndex]
    task.priority = validatedPriority
    task.updatedAt = new Date().toISOString()

    tasks[taskIndex] = task
    await this.storage.saveTasks(tasks)

    return task
  }

  /**
   * Get task statistics
   * @returns Task statistics
   */
  async getStats(): Promise<TaskStats> {
    const tasks = await this.storage.loadTasks()

    const byStatus = {
      todo: tasks.filter(task => task.status === 'todo').length,
      'in-progress': tasks.filter(task => task.status === 'in-progress').length,
      done: tasks.filter(task => task.status === 'done').length,
    }

    const byPriority = {
      high: tasks.filter(task => task.priority === 'high').length,
      medium: tasks.filter(task => task.priority === 'medium').length,
      low: tasks.filter(task => task.priority === 'low').length,
    }

    const overdue = tasks.filter(task => {
      if (!task.dueDate) return false
      return new Date(task.dueDate) < new Date()
    }).length

    return {
      total: tasks.length,
      byStatus,
      byPriority,
      overdue,
    }
  }

  /**
   * Estimate priorities for all tasks and update them
   * @returns Array of updated tasks with estimated priorities
   */
  async estimatePriorities(): Promise<Task[]> {
    const tasks = await this.storage.loadTasks()
    const config = await this.storage.loadConfig()

    if (!config.autoPriority) {
      // Enable auto priority if not already enabled
      config.autoPriority = true
      await this.storage.saveConfig(config)
    }

    // Calculate and update estimated priorities for all tasks
    const updatedTasks = tasks.map(task => {
      const score = this.priorityEstimator.estimate(task)
      return {
        ...task,
        estimatedPriority: score.estimatedPriority,
        updatedAt: new Date().toISOString(),
      }
    })

    await this.storage.saveTasks(updatedTasks)

    return updatedTasks
  }
}
