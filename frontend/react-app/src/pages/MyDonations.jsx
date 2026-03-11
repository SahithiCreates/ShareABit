import React,{ useEffect, useState } from "react";
import DonationCard from "./DonationCard";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./MyDonations.css";

const MyDonations = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};


  const fetchMyFoods = async () => {
    try {
      const res = await API.get("/food/my-donations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user.role !== "donor") {
    navigate("/donations");
    return;
    }
    fetchMyFoods();
  }, []);

  const handleEdit = (food) => {
    navigate("/donationform", {
      state: { isEdit: true, foodData: food },
    });
  };

  const handleDelete = async (foodId) => {
    try {
      await API.delete(`/food/delete/${foodId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoods(prev => prev.filter(f => f._id !== foodId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mydonations-page">
      <div className="mydonations-header">
        <h2>My Donations</h2>
        <button
          onClick={() => navigate("/donations")}
          className="back-btn"
        >
          Back
        </button>
      </div>
      {foods.length === 0 && (<p className="empty-text">
        You haven’t posted any donations yet.</p>)}
      <div className="mydonations-grid">
        {foods.map(food => (
          <DonationCard
            key={food._id}
            food={food}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MyDonations;
 