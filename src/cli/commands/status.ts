import { Command } from 'commander'
import { FileStorage } from '../../data/index.js'
import { TaskManager } from '../../services/index.js'
import { colors, promptStatusSelect } from '../ui/index.js'
import { SUCCESS_MESSAGES } from '../../constants/index.js'

export function createStatusCommand(): Command {
  const command = new Command('status')
    .description('Change task status')
    .argument('<id>', 'Task ID (full or partial)')
    .argument('[status]', 'New status (todo, in-progress, done)')
    .action(async (id: string, status?: string) => {
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

        let newStatus: string

        if (status) {
          newStatus = status
        } else {
          // Interactive mode
          newStatus = await promptStatusSelect(task.status)
        }

        const oldStatus = task.status
        const updatedTask = await manager.changeStatus(task.id, newStatus)

        console.log(colors.success(SUCCESS_MESSAGES.STATUS_CHANGED(oldStatus, updatedTask.status)))

        if (updatedTask.estimatedPriority) {
          console.log(
            colors.info(
              `推定優先度が更新されました: ${colors.priority(updatedTask.estimatedPriority)}`
            )
          )
        }
      } catch (error) {
        console.error(colors.error(`Error: ${(error as Error).message}`))
        process.exit(1)
      }
    })

  return command
}
