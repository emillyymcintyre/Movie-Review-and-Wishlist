import { useEffect, useState } from "react";
import { getMovies } from "./api";
import './App.css'
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";
import Ratings from "./pages/Ratings";
import { login, logout, getStoredUser } from "./auth";
import Register from "./pages/Register";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState(getStoredUser());

  const handleLogout = () => {
  logout();
  setUser(null);
};

   const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovies(search);
      setMovies(data);
    };

    fetchData();
  }, [search]);

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={
          
         <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <button onClick={() => addToWatchlist(movie)}>
              Add to Watchlist
            </button>
          </div>
        ))}
      </div>
      
      
      } />
        <Route path="/second" element={<Reviews watchlist={watchlist} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/ratings" element={<Ratings watchlist={watchlist} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

      </Routes>

     
    </div>
  );
}

export default App;