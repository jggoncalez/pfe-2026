import './App.css';
// O hook encapsula toda a lógica; o App só precisa de saber o que renderizar
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar';
import { TaskCard } from './components/TaskCard';

function App() {
  // Uma única linha "liga" o componente a toda a lógica de tarefas.
  // Se amanhã mudarmos para Context ou Zustand, só alteramos esta linha.
  const {
    taskText, setTaskText,
    priority, setPriority,
    filter, setFilter,
    query, setQuery,
    filteredTasks,
    addTask, toggleTask, confirmAndDeleteTask,
    startEdit, saveEdit, cancelEdit, updateEditValue,
  } = useTasks();

  return (
    <div className="app-container">
      <header>
        <h1>TaskFlow</h1>
        <p>Gestão de Produtividade</p>
      </header>

      <TaskForm
        taskText={taskText}
        setTaskText={setTaskText}
        priority={priority}
        setPriority={setPriority}
        onSubmit={addTask}
      />

      <SearchBar query={query} setQuery={setQuery} />

      <FilterBar filter={filter} setFilter={setFilter} />

      {/* Cada card recebe apenas os dados e callbacks de que necessita (prop drilling mínimo) */}
      <main className="task-grid">
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id} // key única é obrigatória para o React identificar cada item na lista
            task={task}
            onToggle={toggleTask}
            onDelete={confirmAndDeleteTask}
            onStartEdit={startEdit}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            onUpdateEditValue={updateEditValue}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
