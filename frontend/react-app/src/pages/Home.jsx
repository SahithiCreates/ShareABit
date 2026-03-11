import { useNavigate } from "react-router-dom";
import React from "react";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup"); 
  };

  return (
    <div className="hero-overlay">
      <h1 >Welcome to Food Donation</h1>
      <p >
        Donate excess food or claim it if you are an NGO. Let's reduce food waste together!
      </p>
    <button onClick={handleGetStarted}>Get Started!</button>
    </div>
  );
}
