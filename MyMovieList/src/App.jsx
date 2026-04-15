import { useEffect, useState } from "react";
import { getMovies } from "./api";
import './App.css'
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Reviews from "./pages/Reviews";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);

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
      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/second" element={<Reviews watchlist={watchlist} />} />
      </Routes>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <button onClick={() => addToWatchlist(movie)}>
              ➕ Add to Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;