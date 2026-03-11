import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";
import "./DonationForm.css";

const DonationForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [formData, setFormData] = useState({
    foodName: "",
    quantity: "",
    location: "",
    description: "",
    expiryAt: "",
  });
  const [error, setError] = useState("");
  const isEdit = location.state?.isEdit;
  const foodData = location.state?.foodData;

  useEffect(() => {
    if (isEdit && foodData) {
      setFormData({
        foodName: foodData.foodName,
        quantity: foodData.quantity,
        location: foodData.location,
        description: foodData.description,
        expiryAt: foodData.expiryAt?.slice(0, 16),
      });
    }
  }, [isEdit, foodData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isEdit) {
        await API.put(`/food/edit/${foodData._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await API.post("/food/add", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/donations");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to donate food");
    }
  };

  return (
    <div className="donation-form-page">
      <h2>{isEdit ? "Update Donation" : "Donate Food"}</h2>
      <form onSubmit={handleSubmit} className="donation-form-card">

        {error && <p className="error-text">{error}</p>}

        <div className="form-group">
          <label htmlFor="foodname">Food Name</label>
          <input
            id="foodname"
            type="text"
            name="foodName"
            placeholder="Food name"
            value={formData.foodName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="text"
            name="quantity"
            placeholder="Quantity (eg: 10 plates)"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Pickup location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiry">Expiry Date & Time</label>
          <input
            id="expiry"
            type="datetime-local"
            name="expiryAt"
            value={formData.expiryAt}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="donate-btn">
          {isEdit ? "Update Donation" : "Donate"}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;
