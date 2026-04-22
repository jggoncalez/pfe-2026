// Custom hook: concentra todo o estado e operações das tarefas num só lugar,
// mantendo os componentes limpos (só responsáveis por renderizar).
import { useState, useEffect, useMemo, useDeferredValue } from 'react';

const STORAGE_KEY = '@taskflow_data';

// Mapa de prioridade usado para ordenar as tarefas (Alta primeiro)
const PRIORITY_ORDER = { Alta: 3, Média: 2, Baixa: 1 };

export function useTasks() {
  const [taskList, setTaskList] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Baixa');
  const [filter, setFilter] = useState('Todas');
  const [query, setQuery] = useState('');

  // useDeferredValue adia a atualização do query durante a digitação,
  // evitando re-renderizações desnecessárias enquanto o utilizador escreve.
  const deferredQuery = useDeferredValue(query);

  // Carrega as tarefas do localStorage uma única vez ao montar o componente.
  // O array vazio [] garante que este efeito só corre na montagem inicial.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTaskList(JSON.parse(saved));
  }, []);

  // Persiste as tarefas no localStorage sempre que taskList mudar.
  // Assim os dados sobrevivem a recarregamentos da página.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
  }, [taskList]);

  const addTask = (e) => {
    e.preventDefault(); // impede o reload padrão do formulário HTML
    if (!taskText.trim()) return;

    // Usa o spread funcional (prev =>) para garantir que trabalhamos sempre
    // com o estado mais recente, evitando problemas de closure stale.
    setTaskList(prev => [{
      id: crypto.randomUUID(), // ID único nativo do browser, sem dependências externas
      text: taskText,
      priority,
      completed: false,
      createdAt: new Date().toLocaleDateString(),
      isEditing: false,
      editValue: '',
    }, ...prev]);
    setTaskText('');
  };

  // Imutabilidade: em vez de modificar o objeto diretamente, criamos uma cópia
  // com spread (...t) e alteramos só a propriedade necessária.
  const toggleTask = (id) => {
    setTaskList(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTaskList(prev => prev.filter(t => t.id !== id));
  };

  const confirmAndDeleteTask = (id) => {
    if (window.confirm('Tem certeza que deseja remover esta tarefa?')) deleteTask(id);
  };

  // Edição inline: guardamos o valor temporário em `editValue` para não
  // alterar o texto real enquanto o utilizador ainda está a editar.
  const startEdit = (id) => {
    setTaskList(prev => prev.map(t =>
      t.id === id ? { ...t, isEditing: true, editValue: t.text } : t
    ));
  };

  const saveEdit = (id) => {
    setTaskList(prev => prev.map(t =>
      t.id === id ? { ...t, isEditing: false, text: t.editValue } : t
    ));
  };

  const cancelEdit = (id) => {
    setTaskList(prev => prev.map(t =>
      t.id === id ? { ...t, isEditing: false } : t
    ));
  };

  const updateEditValue = (id, value) => {
    setTaskList(prev => prev.map(t =>
      t.id === id ? { ...t, editValue: value } : t
    ));
  };

  // useMemo recalcula a lista filtrada/ordenada só quando as dependências mudam.
  // Sem isso, o filtro correria a cada re-render, mesmo sem alterações relevantes.
  const filteredTasks = useMemo(() => {
    return taskList
      .filter(t => {
        if (filter === 'Pendentes' && t.completed) return false;
        if (filter === 'Concluídas' && !t.completed) return false;
        if (deferredQuery && !t.text.toLowerCase().includes(deferredQuery.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]);
  }, [taskList, filter, deferredQuery]);

  // Retornamos tudo o que os componentes precisam: estado + funções.
  // Os componentes não sabem como a lógica funciona — só chamam estas funções.
  return {
    taskText, setTaskText,
    priority, setPriority,
    filter, setFilter,
    query, setQuery,
    filteredTasks,
    addTask, toggleTask, confirmAndDeleteTask,
    startEdit, saveEdit, cancelEdit, updateEditValue,
  };
}
