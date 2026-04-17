import { useState } from "react";
import { useNavigate, Link  } from "react-router-dom";
import { login } from "../auth";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  const success = login(username, password);
  if (success) {
    setUser(username);
    navigate("/");
  } else {
    setError("Invalid username or password.");
  }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>My Movie List</h1>
        <h2>Sign In</h2>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Log In
          </button>
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
