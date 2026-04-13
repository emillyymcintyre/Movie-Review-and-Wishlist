import { useEffect, useState } from "react";
import { getMovies } from "./api";
import './App.css'
import Navbar from "./components/Navbar";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMovies(search).then(setMovies);
  }, [search]);

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;