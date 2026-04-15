import { Link } from "react-router-dom";

function Navbar({ search, setSearch }) {
  return (
    <nav className="navbar">
      <h2>Movie App </h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/second">Watchlist</Link>
      </div>

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