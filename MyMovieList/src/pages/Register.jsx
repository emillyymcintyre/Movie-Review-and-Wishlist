import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../auth";

function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password || !confirm) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    const result = register(username, password);
    if (result.success) {
      setUser(username);
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>My Movie List</h1>
        <h2>Create Account</h2>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleRegister} className="login-form">
          <label>Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Repeat your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Create Account
          </button>
        </form>

        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
}

export default Register;