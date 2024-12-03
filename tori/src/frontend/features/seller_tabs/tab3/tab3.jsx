import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import supabase from "../../../../backend/supabaseClient";
import "./tab3.css";

const Tab3 = () => {
  const [items, setItems] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const fetchInventory = async () => {
    setIsSearching(true);

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching current user:", userError.message);
        setFeedbackMessage("Failed to fetch user data.");
        setIsSearching(false);
        return;
      }

      const currentUserEmail = userData?.user?.email;
      if (!currentUserEmail) {
        setFeedbackMessage("User is not authenticated.");
        setIsSearching(false);
        return;
      }

      const { data: teamData, error: teamError } = await supabase
        .from("team")
        .select("invite, approved")
        .eq("email", currentUserEmail)
        .single();

      if (teamError || !teamData) {
        console.error("Error fetching team data:", teamError?.message);
        setFeedbackMessage("You are not part of a team or your invite is missing.");
        setIsSearching(false);
        return;
      }

      if (!teamData.approved) {
        setFeedbackMessage("Access denied. Your invite is not approved.");
        setIsSearching(false);
        return;
      }

      const firstLevelInviter = teamData.invite;

      const { data: teamData2, error: teamError2 } = await supabase
        .from("team")
        .select("invite, approved")
        .eq("email", firstLevelInviter)
        .single();

      if (teamError2 || !teamData2) {
        setFeedbackMessage("Your inviter's inviter's information is missing.");
        setIsSearching(false);
        return;
      }

      const secondLevelInviter = teamData2.invite;

      const { data: inventoryData, error: inventoryError } = await supabase
        .from("inventory")
        .select("*")
        .eq("email", secondLevelInviter);

      if (inventoryError) {
        console.error("Error fetching inventory data:", inventoryError.message);
        setFeedbackMessage("Failed to fetch inventory data.");
        setIsSearching(false);
        return;
      }

      if (inventoryData.length === 0) {
        setFeedbackMessage("No inventory items found for your inviter's inviter.");
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
    fetchInventory();
  }, []);

  const handleNavigateToReview = () => {
    navigate("/seller/review", { state: { items } });
  };

  return (
    <div className="tab3-container">
      {feedbackMessage && <div className="feedback-message"><p>{feedbackMessage}</p></div>}
      {items.length === 0 && !isSearching && (
        <div className="seller-icon-container">
          <AiOutlineUser className="huge-user-icon" />
        </div>
      )}
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

export default Tab3;
