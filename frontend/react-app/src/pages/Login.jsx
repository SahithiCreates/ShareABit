import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await login(formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/donations");
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed!");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-card">
        <h2>Login</h2>

        {err && <p className="error-text">{err}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn">
          Login
        </button>

        <p className="signup-link">
          Don't have an account? <Link to="/signup" className="signup-btn">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
