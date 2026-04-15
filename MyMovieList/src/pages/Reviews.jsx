function Reviews({ watchlist }) {
  return (
    <div>
      <h1>My Watchlist </h1>

      {watchlist.length === 0 ? (
        <p>No movies added yet</p>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;