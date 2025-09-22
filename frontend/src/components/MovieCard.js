import "./MovieCard.css";

export default function MovieCard({ movie, onAdd, onMarkWatched, onRemove }) {
  // Handle movie poster fallback
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.poster
    ? movie.poster
    : "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <div className="movie-card">
      {/* Movie Poster */}
      <img
        src={posterUrl}
        alt={movie.title || "Movie Poster"}
        className="movie-poster"
      />

      {/* Movie Title */}
      <h3 className="movie-title">{movie.title || "Untitled Movie"}</h3>

      {/* Overview (if available) */}
      {movie.overview && <p className="movie-overview">{movie.overview}</p>}

      {/* Buttons */}
      <div className="card-buttons">
        {onAdd && (
          <button
            onClick={() => onAdd({ ...movie, watched: false })}
            className="btn add-btn"
          >
            Add to Watchlist
          </button>
        )}

        {onMarkWatched && !movie.watched && (
          <button
            onClick={() => onMarkWatched(movie._id)}
            className="btn watch-btn"
          >
             Mark as Watched
          </button>
        )}

        {onRemove && (
          <button
            onClick={() => onRemove(movie._id)}
            className="btn remove-btn"
          >
            🗑 Remove
          </button>
        )}
      </div>

      {/* Status */}
      {movie.watched && <p className="watched-label">Watched </p>}
    </div>
  );
}
