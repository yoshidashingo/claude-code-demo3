export type TaskStatus = 'todo' | 'in-progress' | 'done'

export type TaskPriority = 'high' | 'medium' | 'low'

export interface StatusChange {
  from: TaskStatus
  to: TaskStatus
  changedAt: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  estimatedPriority?: TaskPriority
  dueDate: string | null
  createdAt: string
  updatedAt: string
  statusHistory: StatusChange[]
}

export interface CreateTaskData {
  title: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  dueDate?: string | null
}
