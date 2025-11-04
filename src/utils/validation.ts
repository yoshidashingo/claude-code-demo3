import { TaskStatus, TaskPriority } from '../types/index.js'
import { TASK_STATUS, TASK_PRIORITY, ERROR_MESSAGES } from '../constants/index.js'

export function validateTitle(title: string): void {
  if (!title || title.trim().length === 0) {
    throw new Error(ERROR_MESSAGES.TITLE_REQUIRED)
  }
  if (title.length > 200) {
    throw new Error(ERROR_MESSAGES.TITLE_TOO_LONG)
  }
}

export function validateDescription(description: string): void {
  if (description && description.length > 1000) {
    throw new Error(ERROR_MESSAGES.DESCRIPTION_TOO_LONG)
  }
}

export function validateStatus(status: string): TaskStatus {
  const validStatuses = Object.values(TASK_STATUS)
  if (!validStatuses.includes(status as TaskStatus)) {
    throw new Error(ERROR_MESSAGES.INVALID_STATUS)
  }
  return status as TaskStatus
}

export function validatePriority(priority: string): TaskPriority {
  const validPriorities = Object.values(TASK_PRIORITY)
  if (!validPriorities.includes(priority as TaskPriority)) {
    throw new Error(ERROR_MESSAGES.INVALID_PRIORITY)
  }
  return priority as TaskPriority
}
