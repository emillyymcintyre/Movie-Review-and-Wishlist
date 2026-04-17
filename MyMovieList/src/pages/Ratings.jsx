import { useState } from "react";

function Ratings({ watchlist }) {
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});

  const handleRating = (movieId, star) => {
    setRatings((prev) => ({ ...prev, [movieId]: star }));
  };

  const handleReviewChange = (movieId, text) => {
    setReviews((prev) => ({ ...prev, [movieId]: text }));
  };

  return (
    <div>
      <h1>Rate Movies</h1>

      {watchlist.length === 0 ? (
        <p>Add movies to your watchlist first to rate them.</p>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>

              {/* Star Rating */}
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRating(movie.id, star)}
                    style={{
                      cursor: "pointer",
                      fontSize: "1.5rem",
                      color: ratings[movie.id] >= star ? "#f5c518" : "#ccc",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>
                {ratings[movie.id]
                  ? `Your rating: ${ratings[movie.id]} / 5`
                  : "Not rated yet"}
              </p>

              {/* Text Review */}
              <textarea
                placeholder="Write a short review..."
                value={reviews[movie.id] || ""}
                onChange={(e) => handleReviewChange(movie.id, e.target.value)}
                rows={3}
                style={{ width: "100%", marginTop: "0.5rem", resize: "vertical" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Ratings;
