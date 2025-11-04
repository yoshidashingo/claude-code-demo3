import inquirer from 'inquirer'
import { TaskStatus, TaskPriority, Task } from '../../types/index.js'
import {
  TASK_STATUS,
  TASK_PRIORITY,
  TASK_STATUS_LABELS,
  TASK_PRIORITY_LABELS,
} from '../../constants/index.js'

/**
 * Prompt for task creation
 */
export async function promptTaskCreate(): Promise<{
  title: string
  description: string
  priority: TaskPriority
  dueDate: string | null
}> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'タスクのタイトルを入力してください:',
      validate: (input: string) => {
        if (!input || input.trim().length === 0) {
          return 'タイトルは必須です'
        }
        if (input.length > 200) {
          return 'タイトルは200文字以内で入力してください'
        }
        return true
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'タスクの説明を入力してください (省略可):',
      validate: (input: string) => {
        if (input.length > 1000) {
          return '説明は1000文字以内で入力してください'
        }
        return true
      },
    },
    {
      type: 'list',
      name: 'priority',
      message: '優先度を選択してください:',
      choices: [
        { name: TASK_PRIORITY_LABELS.high, value: TASK_PRIORITY.HIGH },
        { name: TASK_PRIORITY_LABELS.medium, value: TASK_PRIORITY.MEDIUM },
        { name: TASK_PRIORITY_LABELS.low, value: TASK_PRIORITY.LOW },
      ],
      default: TASK_PRIORITY.MEDIUM,
    },
    {
      type: 'input',
      name: 'dueDate',
      message: '期限を入力してください (YYYY-MM-DD形式、省略可):',
      validate: (input: string) => {
        if (!input) return true
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        if (!dateRegex.test(input)) {
          return 'YYYY-MM-DD形式で入力してください (例: 2024-12-31)'
        }
        const date = new Date(input)
        if (isNaN(date.getTime())) {
          return '有効な日付を入力してください'
        }
        return true
      },
    },
  ])

  return {
    title: answers.title,
    description: answers.description,
    priority: answers.priority,
    dueDate: answers.dueDate || null,
  }
}

/**
 * Prompt for task edit
 */
export async function promptTaskEdit(task: Task): Promise<{
  title: string
  description: string
  priority: TaskPriority
  dueDate: string | null
}> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'タスクのタイトル:',
      default: task.title,
      validate: (input: string) => {
        if (!input || input.trim().length === 0) {
          return 'タイトルは必須です'
        }
        if (input.length > 200) {
          return 'タイトルは200文字以内で入力してください'
        }
        return true
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'タスクの説明:',
      default: task.description,
      validate: (input: string) => {
        if (input.length > 1000) {
          return '説明は1000文字以内で入力してください'
        }
        return true
      },
    },
    {
      type: 'list',
      name: 'priority',
      message: '優先度:',
      choices: [
        { name: TASK_PRIORITY_LABELS.high, value: TASK_PRIORITY.HIGH },
        { name: TASK_PRIORITY_LABELS.medium, value: TASK_PRIORITY.MEDIUM },
        { name: TASK_PRIORITY_LABELS.low, value: TASK_PRIORITY.LOW },
      ],
      default: task.priority,
    },
    {
      type: 'input',
      name: 'dueDate',
      message: '期限 (YYYY-MM-DD形式):',
      default: task.dueDate || '',
      validate: (input: string) => {
        if (!input) return true
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        if (!dateRegex.test(input)) {
          return 'YYYY-MM-DD形式で入力してください (例: 2024-12-31)'
        }
        const date = new Date(input)
        if (isNaN(date.getTime())) {
          return '有効な日付を入力してください'
        }
        return true
      },
    },
  ])

  return {
    title: answers.title,
    description: answers.description,
    priority: answers.priority,
    dueDate: answers.dueDate || null,
  }
}

/**
 * Prompt for status selection
 */
export async function promptStatusSelect(currentStatus: TaskStatus): Promise<TaskStatus> {
  const { status } = await inquirer.prompt([
    {
      type: 'list',
      name: 'status',
      message: '新しいステータスを選択してください:',
      choices: [
        { name: TASK_STATUS_LABELS.todo, value: TASK_STATUS.TODO },
        { name: TASK_STATUS_LABELS['in-progress'], value: TASK_STATUS.IN_PROGRESS },
        { name: TASK_STATUS_LABELS.done, value: TASK_STATUS.DONE },
      ],
      default: currentStatus,
    },
  ])

  return status
}

/**
 * Prompt for priority selection
 */
export async function promptPrioritySelect(currentPriority: TaskPriority): Promise<TaskPriority> {
  const { priority } = await inquirer.prompt([
    {
      type: 'list',
      name: 'priority',
      message: '新しい優先度を選択してください:',
      choices: [
        { name: TASK_PRIORITY_LABELS.high, value: TASK_PRIORITY.HIGH },
        { name: TASK_PRIORITY_LABELS.medium, value: TASK_PRIORITY.MEDIUM },
        { name: TASK_PRIORITY_LABELS.low, value: TASK_PRIORITY.LOW },
      ],
      default: currentPriority,
    },
  ])

  return priority
}

/**
 * Prompt for confirmation
 */
export async function promptConfirm(message: string): Promise<boolean> {
  const { confirmed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message,
      default: false,
    },
  ])

  return confirmed
}
