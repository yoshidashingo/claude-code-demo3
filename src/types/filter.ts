import { TaskStatus, TaskPriority } from './task.js'

export interface FilterOptions {
  status?: TaskStatus
  priority?: TaskPriority
  search?: string
}
