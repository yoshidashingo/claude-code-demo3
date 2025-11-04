import chalk from 'chalk'
import { TaskStatus, TaskPriority } from '../../types/index.js'

/**
 * Color utility for CLI output
 */
export const colors = {
  // Status colors
  status: (status: TaskStatus): string => {
    switch (status) {
      case 'todo':
        return chalk.gray('未着手')
      case 'in-progress':
        return chalk.yellow('進行中')
      case 'done':
        return chalk.green('完了')
      default:
        return status
    }
  },

  // Priority colors
  priority: (priority: TaskPriority): string => {
    switch (priority) {
      case 'high':
        return chalk.red('高')
      case 'medium':
        return chalk.yellow('中')
      case 'low':
        return chalk.blue('低')
      default:
        return priority
    }
  },

  // General colors
  success: (text: string): string => chalk.green(text),
  error: (text: string): string => chalk.red(text),
  warning: (text: string): string => chalk.yellow(text),
  info: (text: string): string => chalk.cyan(text),
  dim: (text: string): string => chalk.dim(text),
  bold: (text: string): string => chalk.bold(text),

  // Task ID color
  id: (id: string): string => chalk.cyan(id),

  // Date colors
  date: (text: string): string => chalk.gray(text),
  overdue: (text: string): string => chalk.red.bold(text),
}
