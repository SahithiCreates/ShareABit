import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api";
import "./Signup.css"; // link the CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
  });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await signup(formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/donations");
    } catch (error) {
      setErr(error.response?.data?.message || "Signup Failed!");
    }
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSignup} className="signup-card">
        <h2>Signup</h2>

        {err && <p className="error-text">{err}</p>}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="donor">Donor</option>
            <option value="ngo">NGO</option>
          </select>
        </div>

        <button type="submit" className="signup-btn">
          Signup
        </button>

        <p >
          Already have an account?{" "}
          <Link to="/login" className="signup-btn">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;