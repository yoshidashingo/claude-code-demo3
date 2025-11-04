import { Command } from 'commander'
import inquirer from 'inquirer'
import { FileStorage } from '../../data/index.js'
import { colors } from '../ui/index.js'
import { SUCCESS_MESSAGES } from '../../constants/index.js'

export function createInitCommand(): Command {
  const command = new Command('init')
    .description('Initialize a new Devtask project')
    .action(async () => {
      try {
        const storage = new FileStorage()

        // Check if already initialized
        if (storage.isInitialized()) {
          console.log(colors.warning('Already initialized as a Devtask project'))
          return
        }

        // Prompt for project name
        const { projectName } = await inquirer.prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'プロジェクト名を入力してください:',
            default: 'My Project',
            validate: (input: string) => {
              if (!input || input.trim().length === 0) {
                return 'プロジェクト名は必須です'
              }
              return true
            },
          },
        ])

        // Initialize project
        await storage.initialize(projectName)

        console.log(colors.success(SUCCESS_MESSAGES.PROJECT_INITIALIZED(projectName)))
      } catch (error) {
        console.error(colors.error(`Error: ${(error as Error).message}`))
        process.exit(1)
      }
    })

  return command
}
