export function SearchBar({ query, setQuery }) {
  return (
    <section className="search-section">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pesquisar tarefa..."
      />
    </section>
  );
}
