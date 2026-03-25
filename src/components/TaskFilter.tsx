import { useTaskContext } from '../hooks/useTaskContext';
import type { FilterType } from '../types/task';

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
];

export function TaskFilter() {
  const { filter, setFilter } = useTaskContext();

  return (
    <div className="flex gap-2 px-4 py-2">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            filter === value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
