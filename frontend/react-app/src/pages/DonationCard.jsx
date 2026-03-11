import React from "react";
import "./DonationCard.css";

const DonationCard = ({ food, onEdit, onDelete, onAccept }) => {
  const user = JSON.parse(localStorage.getItem("user")); 
  const isOwner = user && food.donor?._id === user.id;
  const isNGO = user?.role === "ngo";

  return (
    <div className="donation-card">
      <div>
        <h3 className="food-title">{food.foodName}</h3>
        <p className="food-meta"><span >Quantity:</span> {food.quantity}</p>
        <p className="food-meta"><span>Location:</span>{food.location}</p>
        <p className="food-meta"><span >Expires:</span>{" "} {new Date(food.expiryAt).toLocaleString()}</p>

        <p className="donor">Donor: {food.donor?.name} </p>
      </div>

      <div className="card-actions">
        {isOwner && food.status==="available" && (
          <>
            <button
              onClick={() => onEdit(food)}
               className=" btn-update">Update</button>
            <button
              onClick={() => onDelete(food._id)}
              className=" btn-delete">Delete</button>
          </>
        )}

        {isNGO && food.status === "available" && (
          <button
            onClick={() => onAccept(food._id)}
            className=" btn-accept">Accept</button>
        )}

        {food.status === "claimed" && food.claimedBy && (
        <p className="accepted">
        Accepted by {food.claimedBy.name}
        </p>
)}

      </div>
    </div>
  );
};

export default DonationCard;
