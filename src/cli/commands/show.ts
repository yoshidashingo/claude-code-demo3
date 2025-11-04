import { Command } from 'commander'
import { FileStorage } from '../../data/index.js'
import { TaskManager } from '../../services/index.js'
import { colors, createTaskDetailTable } from '../ui/index.js'

export function createShowCommand(): Command {
  const command = new Command('show')
    .description('Show task details')
    .argument('<id>', 'Task ID (full or partial)')
    .action(async (id: string) => {
      try {
        const storage = new FileStorage()
        const manager = new TaskManager(storage)

        // Support partial ID matching
        const tasks = await manager.getTasks()
        const task = tasks.find(t => t.id.startsWith(id))

        if (!task) {
          console.error(colors.error(`タスクが見つかりません: ${id}`))
          process.exit(1)
        }

        const table = createTaskDetailTable(task)
        console.log(table.toString())
      } catch (error) {
        console.error(colors.error(`Error: ${(error as Error).message}`))
        process.exit(1)
      }
    })

  return command
}
