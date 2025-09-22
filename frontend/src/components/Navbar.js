import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "10px", color: "#fff" }}>
        Home
      </Link>
      <Link to="/watchlist" style={{ marginRight: "10px", color: "#fff" }}>
        Watchlist
      </Link>

      {user ? (
        <>
          <span style={{ marginLeft: "20px" }}>👤 {user.email}</span>
          <button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: "10px", color: "#fff" }}>
            Login
          </Link>
          <Link to="/signup" style={{ marginLeft: "10px", color: "#fff" }}>
            Signup
          </Link>
        </>
      )}
    </nav>
  );
}
