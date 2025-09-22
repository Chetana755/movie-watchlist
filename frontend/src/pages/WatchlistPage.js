import { useEffect, useState } from "react";
import { getMovies, updateMovie, deleteMovie } from "../services/api";
import MovieCard from "../components/MovieCard";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const movies = await getMovies();
      setWatchlist(movies);
    } catch (err) {
      console.error("Failed to fetch watchlist:", err);
    }
  };

  const handleMarkWatched = async (mongoId) => {
    try {
      await updateMovie(mongoId, { watched: true });
      setWatchlist((prev) =>
        prev.map((m) => (m._id === mongoId ? { ...m, watched: true } : m))
      );
    } catch (err) {
      console.error("Failed to mark watched:", err);
    }
  };

  const handleDelete = async (mongoId) => {
    try {
      await deleteMovie(mongoId);
      setWatchlist((prev) => prev.filter((m) => m._id !== mongoId));
    } catch (err) {
      console.error("Failed to delete movie:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Watchlist</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {watchlist.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMarkWatched={() => handleMarkWatched(movie._id)}
            onRemove={() => handleDelete(movie._id)}
          />
        ))}
      </div>
    </div>
  );
}
