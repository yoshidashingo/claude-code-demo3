import { useTaskContext } from '../hooks/useTaskContext';

export function TaskFooter() {
  const { activeCount, tasks, clearCompleted } = useTaskContext();
  const completedCount = tasks.length - activeCount;

  return (
    <footer className="flex items-center justify-between px-4 py-3 text-sm text-gray-500 border-t border-gray-200">
      <span>
        残り <span className="font-semibold text-gray-700">{activeCount}</span> 件のタスク
      </span>
      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          完了済みを削除 ({completedCount})
        </button>
      )}
    </footer>
  );
}
