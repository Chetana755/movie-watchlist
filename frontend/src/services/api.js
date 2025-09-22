// src/services/api.js
import axios from "axios";
import { auth } from "../firebase";

const API_URL = "http://localhost:5000/api"; // use full URL to avoid proxy issues

// Get all movies for logged-in user
export const getMovies = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  const res = await axios.get(`${API_URL}/movies`, {
    params: { userId: user.uid },
  });
  return res.data;
};

// Add a movie to watchlist
export const addMovie = async (movie) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  const movieToAdd = {
    ...movie,
    watched: false,
    userId: user.uid,
    tmdbId: movie.id, // required by backend
  };

  const res = await axios.post(`${API_URL}/movies`, movieToAdd);
  return res.data;
};

// Update movie (mark as watched)
export const updateMovie = async (mongoId, data) => {
  const res = await axios.patch(`${API_URL}/movies/${mongoId}`, data);
  return res.data;
};

// Delete movie
export const deleteMovie = async (mongoId) => {
  const res = await axios.delete(`${API_URL}/movies/${mongoId}`);
  return res.data;
};
