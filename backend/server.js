require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const movieSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    rating: Number,
    poster: String,
    overview: String,
    watched: { type: Boolean, default: false },
    tmdbId: Number,
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

app.get("/api/movies", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "UserId is required" });

    const movies = await Movie.find({ userId });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/movies", async (req, res) => {
  try {
    const { title, userId, tmdbId } = req.body;
    if (!userId || !tmdbId)
      return res
        .status(400)
        .json({ message: "UserId and tmdbId are required" });

    const existing = await Movie.findOne({ tmdbId, userId });
    if (existing)
      return res.status(400).json({ message: "Movie already in watchlist" });

    const movie = new Movie(req.body);
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: "Failed to add movie" });
  }
});

app.patch("/api/movies/:id", async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Movie not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/movies/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie removed from watchlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
