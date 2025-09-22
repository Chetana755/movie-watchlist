// src/firebase.js


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-Oy8hs5N8qOtj2y1Gd_NwoEWA_HNhk3M",
  authDomain: "watchlist-57f0a.firebaseapp.com",
  projectId: "watchlist-57f0a",
  storageBucket: "watchlist-57f0a.firebasestorage.app",
  messagingSenderId: "548822767264",
  appId: "1:548822767264:web:2353fe18e0feb081925bc5",
  measurementId: "G-FJKZMW94QN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app); // ✅ Make sure you export auth

// Optional: export app if needed
export default app;