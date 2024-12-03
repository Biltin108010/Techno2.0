import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import supabase from "../../../../backend/supabaseClient";
import "./tab2.css";

const Tab2 = ({ userEmail, userTeamEmails }) => {
  const [items, setItems] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const fetchInventory = async () => {
    setIsSearching(true);

    try {
      if (!userEmail) {
        setFeedbackMessage("No user email provided.");
        setIsSearching(false);
        return;
      }

      // Fetch inventory data for the invited user
      const { data: inventoryData, error: inventoryError } = await supabase
        .from("inventory")
        .select("*")
        .eq("email", userEmail);  // Filter inventory based on the invited user's email

      if (inventoryError) {
        console.error("Error fetching inventory data:", inventoryError.message);
        setFeedbackMessage("Failed to fetch inventory data.");
        setIsSearching(false);
        return;
      }

      if (inventoryData.length === 0) {
        setFeedbackMessage("No inventory items found for this user.");
      } else {
        setItems(inventoryData);
        setFeedbackMessage("");
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setFeedbackMessage("An unexpected error occurred.");
    }

    setIsSearching(false);
  };

  useEffect(() => {
    if (userEmail) {
      fetchInventory();
    }
  }, [userEmail]);

  const handleNavigateToReview = () => {
    navigate("/seller/review", { state: { items } });
  };

  return (
    <div className="tab2-container">
      {feedbackMessage && <div className="feedback-message"><p>{feedbackMessage}</p></div>}
      


      {/* If no items found and not searching */}
      {items.length === 0 && !isSearching && (
        <div className="seller-icon-container">
          <AiOutlineUser className="huge-user-icon" />
        </div>
      )}

      {/* Display inventory items if available */}
      {items.length > 0 && (
        <div className="tab-content">
          {items.map((item) => (
            <div key={item.id} className="item-box">
              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
                className="item-image"
              />
              <div className="item-text-container">
                <p className="item-title">{item.name}</p>
                <p className="item-quantity">
                  Qty: {item.quantity}
                  <AiOutlineMinus className="minus-icon" />
                </p>
                <p className="item-price">Price: ₱{item.price}</p>
              </div>
            </div>
          ))}
          <button className="review-order-button" onClick={handleNavigateToReview}>
            Review Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Tab2;
