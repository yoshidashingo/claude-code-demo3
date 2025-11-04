#!/usr/bin/env node

import { Command } from 'commander'
import {
  createInitCommand,
  createAddCommand,
  createListCommand,
  createShowCommand,
  createEditCommand,
  createDeleteCommand,
  createStatusCommand,
  createPriorityCommand,
  createStatsCommand,
} from './commands/index.js'

const program = new Command()

program.name('devtask').description('Developer-focused task management CLI tool').version('1.0.0')

// Register commands
program.addCommand(createInitCommand())
program.addCommand(createAddCommand())
program.addCommand(createListCommand())
program.addCommand(createShowCommand())
program.addCommand(createEditCommand())
program.addCommand(createDeleteCommand())
program.addCommand(createStatusCommand())
program.addCommand(createPriorityCommand())
program.addCommand(createStatsCommand())

// Parse command-line arguments
program.parse(process.argv)
