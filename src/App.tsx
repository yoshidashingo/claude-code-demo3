import { TaskProvider } from './contexts/TaskContext';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { TaskFilter } from './components/TaskFilter';
import { TaskList } from './components/TaskList';
import { TaskFooter } from './components/TaskFooter';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-xl mx-auto mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <TaskInput />
          <TaskFilter />
          <TaskList />
          <TaskFooter />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
