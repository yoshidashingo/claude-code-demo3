import { Command } from 'commander'
import { FileStorage } from '../../data/index.js'
import { TaskManager } from '../../services/index.js'
import { colors, createStatsTable } from '../ui/index.js'

export function createStatsCommand(): Command {
  const command = new Command('stats').description('Show task statistics').action(async () => {
    try {
      const storage = new FileStorage()
      const manager = new TaskManager(storage)

      const stats = await manager.getStats()
      const table = createStatsTable(stats)

      console.log(table.toString())
    } catch (error) {
      console.error(colors.error(`Error: ${(error as Error).message}`))
      process.exit(1)
    }
  })

  return command
}
