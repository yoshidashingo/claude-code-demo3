import { createContext } from 'react';
import type { FilterType, Task } from '../types/task';

export type TaskContextType = {
  tasks: Task[];
  filter: FilterType;
  filteredTasks: Task[];
  activeCount: number;
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
  setFilter: (filter: FilterType) => void;
};

export const TaskContext = createContext<TaskContextType | null>(null);
