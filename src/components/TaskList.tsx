import { useTaskContext } from '../hooks/useTaskContext';
import { TaskItem } from './TaskItem';

export function TaskList() {
  const { filteredTasks } = useTaskContext();

  if (filteredTasks.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400">
        タスクがありません
      </div>
    );
  }

  return (
    <ul>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
