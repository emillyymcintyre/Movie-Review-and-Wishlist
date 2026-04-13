function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar">
      <h2>Movie App 🎬</h2>

      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </nav>
  );
}

export default Navbar;