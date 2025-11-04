import { TaskStatus } from '../types/index.js'

export const TASK_STATUS: Record<string, TaskStatus> = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
} as const

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: '未着手',
  'in-progress': '進行中',
  done: '完了',
}
