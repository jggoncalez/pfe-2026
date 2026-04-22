export function TaskForm({ taskText, setTaskText, priority, setPriority, onSubmit }) {
  return (
    <section className="form-section">
      <form onSubmit={onSubmit}>
        <input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Descrição da tarefa..."
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
        <button type="submit">Criar</button>
      </form>
    </section>
  );
}
