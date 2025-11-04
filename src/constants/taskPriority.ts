import { TaskPriority } from '../types/index.js'

export const TASK_PRIORITY: Record<string, TaskPriority> = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

export const DEFAULT_PRIORITY: TaskPriority = 'medium'
