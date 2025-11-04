import { Command } from 'commander'
import { FileStorage } from '../../data/index.js'
import { TaskManager } from '../../services/index.js'
import { colors, promptTaskCreate } from '../ui/index.js'
import { SUCCESS_MESSAGES } from '../../constants/index.js'

export function createAddCommand(): Command {
  const command = new Command('add')
    .description('Add a new task')
    .option('-t, --title <title>', 'Task title')
    .option('-d, --description <description>', 'Task description')
    .option('-p, --priority <priority>', 'Priority (high, medium, low)')
    .option('--due <date>', 'Due date (YYYY-MM-DD)')
    .action(async options => {
      try {
        const storage = new FileStorage()
        const manager = new TaskManager(storage)

        let taskData

        if (options.title) {
          // Use command-line options
          taskData = {
            title: options.title,
            description: options.description || '',
            priority: options.priority,
            dueDate: options.due || null,
          }
        } else {
          // Interactive mode
          taskData = await promptTaskCreate()
        }

        const task = await manager.createTask(taskData)

        console.log(colors.success(SUCCESS_MESSAGES.TASK_CREATED(task.id)))

        if (task.estimatedPriority) {
          console.log(
            colors.info(
              `推定優先度: ${colors.priority(task.estimatedPriority)} (設定された優先度: ${colors.priority(task.priority)})`
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
