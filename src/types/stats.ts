import { TaskPriority } from './task.js'

export interface TaskStats {
  total: number
  byStatus: {
    todo: number
    'in-progress': number
    done: number
  }
  byPriority: {
    high: number
    medium: number
    low: number
  }
  overdue: number
}

export interface PriorityScore {
  dueDateScore: number
  ageScore: number
  statusScore: number
  totalScore: number
  estimatedPriority: TaskPriority
}
