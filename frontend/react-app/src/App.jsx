import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Home from './pages/Home.jsx'
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Donations from "./pages/Donations.jsx";
import DonationForm from "./pages/DonationForm.jsx";
import MyDonations from "./pages/MyDonations.jsx";
import "./index.css";
function App() {

  return (
      <Routes>
        <Route path="/" element={<Home />} />          {/* Landing page */}
        <Route path="/signup" element={<Signup />} />  {/* Signup page */}
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/donations" element={<Donations/>}></Route>
        <Route path="/donationform" element={<DonationForm/>}></Route>
        <Route path="/mydonations" element={<MyDonations/>}></Route>
      </Routes>
  )
}

export default App;
