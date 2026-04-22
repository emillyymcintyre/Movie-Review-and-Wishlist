import { Link } from "react-router-dom";

function Navbar({ search, setSearch, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
      <h2>My Movie List</h2>
      {user ? (
          <>
          
            <span> {user} </span>
          <button onClick={onLogout}>Log Out</button>
          
          
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/second">Watchlist</Link>
        <Link to="/ratings">Ratings</Link>
        
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