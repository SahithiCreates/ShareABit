import React,{ useEffect, useState} from "react";
import DonationCard from "./DonationCard";
import API from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import "./Donations.css";


const Donations = () => {
  const [foods, setFoods] = useState([]);
  const navigate=useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchFoods = async () => {
    try{
      const res = await API.get("/food/allFoods", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      });
    setFoods(res.data);
    }
    catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleAccept = async (foodId) => {
  try {
    const res = await API.put(
      `/food/accept/${foodId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(res);
    const updatedFood = res.data.food;
    setFoods(prev =>prev.map(food => (food._id === foodId ? updatedFood : food)));
  } catch (err) {
    console.error(err);
  }
};


  const handleDelete = async (foodId) => {
    try{
      await API.delete(`/food/delete/${foodId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setFoods((prev) => prev.filter((f) => f._id !== foodId));
    }
    catch (err) {
    console.error(err);
  }
  };

  const handleEdit =  (food) => {
    navigate("/donationform",{
      state:{
        isEdit : true,
        foodData:food,
      },
    });

  };

  return (
    <div className="page-bg">
    <div className="donations-page">
      <h2 className="donations-title">
        Available Donations
      </h2>

      {user.role === "donor" && (
        <div className="donations-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/donationform")}
          >
            Donate Food
          </button>

          <button
            className="link-btn"
            onClick={() => navigate("/mydonations")}
          >
            My Donations
          </button>
        </div>
      )}

      <div className="donations-grid">
        {foods.map((food) => (
          <DonationCard
            key={food._id}
            food={food}
            onAccept={handleAccept}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  </div>
  );
};

export default Donations;
