import { useEffect, useState } from "react";
import { getMovies } from "./api";
import './App.css'
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";
import Ratings from "./pages/Ratings";
import {
  logout,
  getStoredUser,
  getStoredWatchlist,
  saveStoredWatchlist,
} from "./auth";
import Register from "./pages/Register";
import { useNavigate } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(getStoredUser());
  const [watchlist, setWatchlist] = useState(() => getStoredWatchlist(getStoredUser()));
  const [movieError, setMovieError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          
    setUser(null);     
    setWatchlist([]);  
    navigate("/login");
  };

   const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.id === movie.id)) {
      const updated = [...watchlist, movie];
      setWatchlist(updated);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMovieError("");
        const data = await getMovies(search);
        setMovies(data);
      } catch (error) {
        setMovies([]);
        setMovieError(error.message || "Something went wrong loading movies.");
      }
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    if (!user) {
      setWatchlist([]);
      return;
    }

    setWatchlist(getStoredWatchlist(user));
  }, [user]);

  useEffect(() => {
    saveStoredWatchlist(user, watchlist);
  }, [user, watchlist]);

  

  const isInWatchlist = (movie) => {
  return watchlist.some((m) => m.id === movie.id);
};

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" 
      
        
        
        element={user ? (
          movieError ? (
            <p>{movieError}</p>
          ) : (
            <>
            <h1>Popular</h1>
            <div className="movie-grid">
              {movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                  <button
                    onClick={() => addToWatchlist(movie)}
                    disabled={isInWatchlist(movie)}
                    className={isInWatchlist(movie) ? "added-btn" : ""}
                  >
                    {isInWatchlist(movie) ? "Added to Watchlist" : "Add to Watchlist"}
                  </button>
                </div>
              ))}
            </div>
            </>
          )
        )
        : (
          <Navigate to="/login" />
        )
      
      
      } />
        <Route path="/second" element={<Reviews watchlist={watchlist} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/ratings" element={<Ratings watchlist={watchlist} user={user} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />

        

      </Routes>

     
    </div>
  );
}

export default App;
