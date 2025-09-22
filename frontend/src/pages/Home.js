import { useEffect, useState } from "react";
import axios from "axios";
import { addMovie, getMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchMovies();
    fetchWatchlist();
  }, []);

  const fetchMovies = async (searchQuery = "") => {
    try {
      const url = searchQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=42d6bd926daf17d106f1af6369c762c3&query=${searchQuery}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=42d6bd926daf17d106f1af6369c762c3&page=1`;

      const response = await axios.get(url);

      const tmdbMovies = response.data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/200x300?text=No+Image",
        overview: movie.overview,
      }));

      setMovies(tmdbMovies);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const data = await getMovies();
      setWatchlist(data);
    } catch (err) {
      console.error("Failed to fetch watchlist:", err);
    }
  };

  const handleAdd = async (movie) => {
    try {
      if (watchlist.some((m) => m.tmdbId === movie.id)) {
        alert(`${movie.title} is already in your watchlist.`);
        return; // ✅ still show button, but no duplicate add
      }

      const newMovie = await addMovie({
        ...movie,
        tmdbId: movie.id,
        watched: false, // force default
      });
      setWatchlist((prev) => [...prev, newMovie]);
      alert(`${movie.title} added to your watchlist!`);
    } catch (err) {
      console.error("Add movie error:", err.response || err);
      alert(
        err.response?.data?.message || err.message || "Failed to add movie"
      );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") fetchMovies(query);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Movies</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          style={{ padding: "8px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "8px", marginLeft: "10px" }}>
          Search
        </button>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={{
              ...movie,
              watched: false, // ✅ force "not watched" in Home
            }}
            onAdd={handleAdd} // ✅ always show Add button
          />
        ))}
      </div>
    </div>
  );
}
