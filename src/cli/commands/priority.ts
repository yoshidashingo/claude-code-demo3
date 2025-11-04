import { Command } from 'commander'
import { FileStorage } from '../../data/index.js'
import { TaskManager } from '../../services/index.js'
import { colors, promptPrioritySelect } from '../ui/index.js'
import { SUCCESS_MESSAGES } from '../../constants/index.js'

export function createPriorityCommand(): Command {
  const command = new Command('priority')
    .description('Change task priority')
    .argument('<id>', 'Task ID (full or partial)')
    .argument('[priority]', 'New priority (high, medium, low)')
    .action(async (id: string, priority?: string) => {
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

        let newPriority: string

        if (priority) {
          newPriority = priority
        } else {
          // Interactive mode
          newPriority = await promptPrioritySelect(task.priority)
        }

        const updatedTask = await manager.changePriority(task.id, newPriority)

        console.log(colors.success(SUCCESS_MESSAGES.PRIORITY_CHANGED(updatedTask.priority)))
      } catch (error) {
        console.error(colors.error(`Error: ${(error as Error).message}`))
        process.exit(1)
      }
    })

  return command
}
