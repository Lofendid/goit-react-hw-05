export default function SearchForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input name="searchInput" type="text" />
      <button type="submit">Search</button>
    </form>
  );
}
