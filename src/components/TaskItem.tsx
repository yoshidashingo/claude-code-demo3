import { useState, useRef, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useTaskContext } from '../hooks/useTaskContext';
import type { Task } from '../types/task';

type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask, editTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed) {
      editTask(task.id, trimmed);
    } else {
      setEditTitle(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  const createdAgo = formatDistanceToNow(new Date(task.createdAt), {
    addSuffix: true,
    locale: ja,
  });

  return (
    <li className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 group hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        aria-label={`「${task.title}」を${task.completed ? '未完了' : '完了'}にする`}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          maxLength={200}
          className="flex-1 px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div className="flex-1 min-w-0">
          <span
            onDoubleClick={handleDoubleClick}
            title="ダブルクリックで編集"
            className={`block cursor-pointer select-none ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.title}
          </span>
          <span className="text-xs text-gray-400">{createdAgo}</span>
        </div>
      )}

      <button
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all"
        aria-label="タスクを削除"
      >
        削除
      </button>
    </li>
  );
}
