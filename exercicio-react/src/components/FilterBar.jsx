const FILTERS = ['Todas', 'Pendentes', 'Concluídas'];

export function FilterBar({ filter, setFilter }) {
  return (
    <section className="filter-section">
      {FILTERS.map(f => (
        <button
          key={f}
          className={filter === f ? 'active' : ''}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </section>
  );
}
