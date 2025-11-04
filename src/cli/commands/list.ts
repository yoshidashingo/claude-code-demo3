import { Command } from 'commander'
import { FileStorage } from '../../data/index.js'
import { TaskManager } from '../../services/index.js'
import { colors, createTaskTable } from '../ui/index.js'
import { TaskStatus, TaskPriority } from '../../types/index.js'

export function createListCommand(): Command {
  const command = new Command('list')
    .description('List all tasks')
    .option('-s, --status <status>', 'Filter by status (todo, in-progress, done)')
    .option('-p, --priority <priority>', 'Filter by priority (high, medium, low)')
    .option('--search <keyword>', 'Search tasks by keyword')
    .action(async options => {
      try {
        const storage = new FileStorage()
        const manager = new TaskManager(storage)

        const filter = {
          status: options.status as TaskStatus | undefined,
          priority: options.priority as TaskPriority | undefined,
          search: options.search,
        }

        const tasks = await manager.getTasks(filter)

        if (tasks.length === 0) {
          console.log(colors.dim('タスクが見つかりませんでした'))
          return
        }

        const table = createTaskTable(tasks)
        console.log(table.toString())
        console.log(colors.dim(`\n合計: ${tasks.length}件`))
      } catch (error) {
        console.error(colors.error(`Error: ${(error as Error).message}`))
        process.exit(1)
      }
    })

  return command
}
