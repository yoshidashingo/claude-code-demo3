import Table from 'cli-table3'
import { Task } from '../../types/index.js'
import { colors } from './colors.js'
import { formatDate, daysUntilDue } from '../../utils/index.js'

/**
 * Create a table for task list display
 */
export function createTaskTable(tasks: Task[]): Table.Table {
  const table = new Table({
    head: ['ID', 'タイトル', 'ステータス', '優先度', '期限', '作成日'],
    colWidths: [10, 30, 12, 10, 15, 20],
    wordWrap: true,
  })

  tasks.forEach(task => {
    const dueText = task.dueDate ? formatDueDateWithColor(task.dueDate) : colors.dim('-')

    table.push([
      colors.id(task.id.slice(0, 8)),
      task.title,
      colors.status(task.status),
      colors.priority(task.priority),
      dueText,
      colors.date(formatDate(task.createdAt, 'yyyy-MM-dd')),
    ])
  })

  return table
}

/**
 * Create a table for task detail display
 */
export function createTaskDetailTable(task: Task): Table.Table {
  const table = new Table({
    colWidths: [20, 60],
  })

  table.push(
    ['ID', colors.id(task.id)],
    ['タイトル', task.title],
    ['説明', task.description || colors.dim('なし')],
    ['ステータス', colors.status(task.status)],
    ['優先度', colors.priority(task.priority)]
  )

  if (task.estimatedPriority) {
    table.push(['推定優先度', colors.priority(task.estimatedPriority)])
  }

  table.push(
    ['期限', task.dueDate ? formatDueDateWithColor(task.dueDate) : colors.dim('なし')],
    ['作成日', formatDate(task.createdAt)],
    ['更新日', formatDate(task.updatedAt)]
  )

  if (task.statusHistory.length > 0) {
    const history = task.statusHistory
      .map(h => `${colors.status(h.from)} → ${colors.status(h.to)} (${formatDate(h.changedAt)})`)
      .join('\n')
    table.push(['ステータス履歴', history])
  }

  return table
}

/**
 * Create a table for statistics display
 */
export function createStatsTable(stats: {
  total: number
  byStatus: Record<string, number>
  byPriority: Record<string, number>
  overdue: number
}): Table.Table {
  const table = new Table({
    head: ['項目', '件数'],
    colWidths: [20, 10],
  })

  table.push(
    [colors.bold('合計タスク数'), stats.total.toString()],
    [''],
    [colors.bold('ステータス別'), ''],
    ['  未着手', stats.byStatus.todo?.toString() || '0'],
    ['  進行中', stats.byStatus['in-progress']?.toString() || '0'],
    ['  完了', stats.byStatus.done?.toString() || '0'],
    [''],
    [colors.bold('優先度別'), ''],
    ['  高', stats.byPriority.high?.toString() || '0'],
    ['  中', stats.byPriority.medium?.toString() || '0'],
    ['  低', stats.byPriority.low?.toString() || '0'],
    [''],
    [colors.bold('期限超過'), colors.error(stats.overdue.toString())]
  )

  return table
}

/**
 * Format due date with color based on urgency
 */
function formatDueDateWithColor(dueDate: string): string {
  const days = daysUntilDue(dueDate)
  const formatted = formatDate(dueDate, 'yyyy-MM-dd')

  if (days === null) {
    return formatted
  }

  if (days < 0) {
    return colors.overdue(`${formatted} (期限超過)`)
  }

  if (days === 0) {
    return colors.error(`${formatted} (今日)`)
  }

  if (days <= 3) {
    return colors.warning(`${formatted} (あと${days}日)`)
  }

  return formatted
}
