import { Command } from 'commander'
import { FileStorage } from '../../data/index.js'
import { TaskManager } from '../../services/index.js'
import { colors, promptTaskEdit } from '../ui/index.js'
import { SUCCESS_MESSAGES } from '../../constants/index.js'

export function createEditCommand(): Command {
  const command = new Command('edit')
    .description('Edit a task')
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

        console.log(colors.info(`タスクを編集: ${task.title}`))

        const updates = await promptTaskEdit(task)
        await manager.updateTask(task.id, updates)

        console.log(colors.success(SUCCESS_MESSAGES.TASK_UPDATED))
      } catch (error) {
        console.error(colors.error(`Error: ${(error as Error).message}`))
        process.exit(1)
      }
    })

  return command
}
