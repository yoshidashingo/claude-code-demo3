export const ERROR_MESSAGES = {
  NOT_DEVTASK_PROJECT: 'Not a Devtask project. Run "devtask init" to initialize.',
  TASK_NOT_FOUND: (id: string) => `Task not found: ${id}`,
  TITLE_REQUIRED: 'Task title is required (1-200 characters)',
  TITLE_TOO_LONG: 'Task title must be 200 characters or less',
  DESCRIPTION_TOO_LONG: 'Description must be 1000 characters or less',
  INVALID_STATUS: 'Invalid status. Must be: todo, in-progress, or done',
  INVALID_PRIORITY: 'Invalid priority. Must be: high, medium, or low',
  FILE_READ_ERROR: 'Failed to read file',
  FILE_WRITE_ERROR: 'Failed to write file',
}

export const SUCCESS_MESSAGES = {
  TASK_CREATED: (id: string) => `✓ Task created successfully! (ID: ${id})`,
  TASK_UPDATED: '✓ Task updated successfully',
  TASK_DELETED: '✓ Task deleted successfully',
  STATUS_CHANGED: (from: string, to: string) => `✓ Status changed: ${from} → ${to}`,
  PRIORITY_CHANGED: (priority: string) => `✓ Priority changed to ${priority}`,
  PROJECT_INITIALIZED: (name: string) => `✓ Initialized Devtask project: ${name}`,
}
