import { useReducer, useState, useEffect, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Task, FilterType } from '../types/task';
import { TaskContext, type TaskContextType } from './taskContextDef';

const STORAGE_KEY = 'task-manager-tasks';

type TaskAction =
  | { type: 'ADD_TASK'; title: string }
  | { type: 'TOGGLE_TASK'; id: string }
  | { type: 'DELETE_TASK'; id: string }
  | { type: 'EDIT_TASK'; id: string; title: string };

type TaskState = {
  tasks: Task[];
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          {
            id: uuidv4(),
            title: action.title,
            completed: false,
            createdAt: new Date().toISOString(),
          },
          ...state.tasks,
        ],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, title: action.title } : task
        ),
      };
    default:
      return state;
  }
}

function loadTasks(): Task[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Task[]) : [];
  } catch {
    return [];
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: loadTasks(),
  });
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    } catch {
      // localStorage full or unavailable
    }
  }, [state.tasks]);

  const filteredTasks = state.tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = state.tasks.filter((task) => !task.completed).length;

  const value: TaskContextType = {
    tasks: state.tasks,
    filter,
    filteredTasks,
    activeCount,
    addTask: (title: string) => dispatch({ type: 'ADD_TASK', title }),
    toggleTask: (id: string) => dispatch({ type: 'TOGGLE_TASK', id }),
    deleteTask: (id: string) => dispatch({ type: 'DELETE_TASK', id }),
    editTask: (id: string, title: string) => dispatch({ type: 'EDIT_TASK', id, title }),
    setFilter,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
