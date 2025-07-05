import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './adminstylings/login.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const { username, password } = adminCredentials;
    // Get admin credentials from environment variables
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME || "Srilab";
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "Srilab";

    if (username === adminUsername && password === adminPassword) {
      navigate("/admin/home");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="admin-login-container">
      <h1 className="admin-welcome-text"><span className="welcome-prefix">Welcome</span>
      <br></br><span className="welcome-name">Sudhakar Kanikella❤️</span></h1>
      <div className="admin-login-box">
        <h2 className="admin-login-title">Admin Login</h2>
        <form className="admin-login-form" onSubmit={handleAdminLogin}>
          <input
            className="admin-login-input"
            type="text"
            placeholder="Username"
            value={adminCredentials.username}
            onChange={(e) =>
              setAdminCredentials({ ...adminCredentials, username: e.target.value })
            }
          />
          <input
            className="admin-login-input"
            type="password"
            placeholder="Password"
            value={adminCredentials.password}
            onChange={(e) =>
              setAdminCredentials({ ...adminCredentials, password: e.target.value })
            }
          />
          <button className="admin-login-button" type="submit">Login</button>
        </form>
        {error && <p className="admin-login-error">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;

