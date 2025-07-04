import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const { username, password } = adminCredentials;

    if (username === "Srilab" && password === "Srilab") {
      navigate("/admin/home");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="text-center">
        <h1>Welcome to</h1>
        <h2>Sri Clinical Laboratory</h2>
      </div>
      <div className="button-container">
        <button
          onClick={() => navigate("/user/home")}
          className="user-button"
        >
          User
        </button>
        <button
          onClick={() => navigate("/admin/login")}
          className="admin-button"
        >
          Admin
        </button>
      </div>
      {error && (
        <p className="error-message">
          {error}
        </p>
      )}
    </div>
  );
};

export default LandingPage;
