// Componente puramente de apresentação: recebe dados e callbacks via props,
// não tem estado próprio nem lógica de negócio.
export function TaskCard({ task, onToggle, onDelete, onStartEdit, onSaveEdit, onCancelEdit, onUpdateEditValue }) {
  // Desestruturação: extrai as propriedades do objeto task em variáveis locais
  const { id, text, priority, completed, createdAt, isEditing, editValue } = task;

  return (
    // A classe CSS muda dinamicamente conforme a prioridade e estado da tarefa
    <div className={`task-card ${priority.toLowerCase()} ${completed ? 'done' : ''}`}>
      <div className="task-content">
        {/* Renderização condicional: mostra input durante edição, título caso contrário */}
        {isEditing ? (
          <input
            className="edit-input"
            value={editValue}
            onChange={(e) => onUpdateEditValue(id, e.target.value)}
            onKeyDown={(e) => {
              // Atalhos de teclado: Enter confirma, Escape cancela
              if (e.key === 'Enter') onSaveEdit(id);
              if (e.key === 'Escape') onCancelEdit(id);
            }}
            autoFocus // foca automaticamente ao entrar no modo de edição
          />
        ) : (
          <h3>{text}</h3>
        )}
        <span>Prioridade: {priority}</span>
        <small>Criada em: {createdAt}</small>
      </div>
      <div className="task-actions">
        {isEditing ? (
          <>
            <button onClick={() => onSaveEdit(id)}>Salvar</button>
            <button onClick={() => onCancelEdit(id)}>Cancelar</button>
          </>
        ) : (
          <button onClick={() => onStartEdit(id)}>Editar</button>
        )}
        <button onClick={() => onToggle(id)}>
          {completed ? 'Reabrir' : 'Concluir'}
        </button>
        <button type="button" onClick={() => onDelete(id)} className="delete">
          Remover
        </button>
      </div>
    </div>
  );
}
