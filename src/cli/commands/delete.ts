import { Command } from 'commander'
import { FileStorage } from '../../data/index.js'
import { TaskManager } from '../../services/index.js'
import { colors, promptConfirm } from '../ui/index.js'
import { SUCCESS_MESSAGES } from '../../constants/index.js'

export function createDeleteCommand(): Command {
  const command = new Command('delete')
    .description('Delete a task')
    .argument('<id>', 'Task ID (full or partial)')
    .option('-f, --force', 'Skip confirmation')
    .action(async (id: string, options) => {
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

        // Confirm deletion unless --force is specified
        if (!options.force) {
          console.log(colors.warning(`削除するタスク: ${task.title}`))
          const confirmed = await promptConfirm('本当に削除しますか？')

          if (!confirmed) {
            console.log(colors.dim('削除がキャンセルされました'))
            return
          }
        }

        await manager.deleteTask(task.id)
        console.log(colors.success(SUCCESS_MESSAGES.TASK_DELETED))
      } catch (error) {
        console.error(colors.error(`Error: ${(error as Error).message}`))
        process.exit(1)
      }
    })

  return command
}
