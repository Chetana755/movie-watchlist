![App Screenshot](./assets/login.png)
![App Screenshot](./assets/home.png)
![App Screenshot](./assets/watchlist.png)


## 🎬 Movie Watchlist App

A full-stack web application that lets users search for movies, add them to a personal watchlist, and mark them as watched. The app integrates with **The Movie Database (TMDb) API** to fetch movie details.

---

### 🚀 Features

* 🔍 Search for movies using the TMDb API
* ➕ Add movies to your watchlist
* ✅ Mark movies as watched
* 🗑 Remove movies from your list
* 🧠 State management for watched/unwatched movies
* 🎨 Clean and responsive UI built with React

---

### 🧰 Tech Stack

* **Frontend:** React, Axios, CSS
* **Backend:** Node.js, Express.js, MongoDB (Mongoose)
* **API:** TMDb API

---

### ⚙️ Setup Instructions

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

#### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
TMDB_API_KEY=your_tmdb_api_key
```

Run the backend:

```bash
npm start
```

Your backend should now be running on
👉 `http://localhost:5000`

---

#### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` folder and add:

```
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

Run the frontend:

```bash
npm start
```

Your frontend should now be running on
👉 `http://localhost:3000`

---

### 🧪 Testing the App

1. Search for a movie
2. Add it to your watchlist
3. Mark it as watched
4. Remove it if needed


