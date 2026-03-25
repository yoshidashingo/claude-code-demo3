import { useTaskContext } from '../hooks/useTaskContext';

export function TaskFooter() {
  const { activeCount } = useTaskContext();

  return (
    <footer className="px-4 py-3 text-sm text-gray-500 border-t border-gray-200">
      残り <span className="font-semibold text-gray-700">{activeCount}</span> 件のタスク
    </footer>
  );
}
