import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineUser } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import supabase from "../../../../backend/supabaseClient";
import "./tab2.css";

const Tab2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [navigateToReview, setNavigateToReview] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  const checkUserRole = async () => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !sessionData.session) {
        console.error("Error fetching session or no session found:", sessionError);
        return;
      }

      const userEmail = sessionData.session.user.email;

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("email", userEmail)
        .single();

      if (userError) {
        console.error("Error fetching user role:", userError.message);
        return;
      }

      if (userData.role === "admin") {
        setIsAdmin(true);
      } else if (userData.role === "seller") {
        setIsSeller(true);
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  useEffect(() => {
    checkUserRole();
  }, []);

  const fetchItems = async () => {
    if (!emailInput.trim()) {
      setFeedbackMessage("Please enter a valid Gmail address.");
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .eq("email", emailInput.trim());

      if (error) {
        console.error("Error fetching items:", error.message);
        setFeedbackMessage("Failed to fetch items. Please try again later.");
      } else if (data.length === 0) {
        setFeedbackMessage("No items found for this Gmail address.");
      } else {
        setItems(data);
        setFeedbackMessage("");
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setFeedbackMessage("An unexpected error occurred. Please try again.");
    }
    setIsSearching(false);
  };

  const handleSearchEmail = () => {
    fetchItems();
  };

  const handleRemoveEmail = () => {
    setEmailInput("");
    setItems([]);
    setFeedbackMessage("Email removed successfully.");
  };

  const handleNavigateToReview = () => {
    navigate("/seller/review", { state: { items } });
  };

  const EmailInputModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Enter Gmail Address</h2>
          <input
            type="email"
            id="email-input"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter Gmail address"
          />
          <button onClick={handleSearchEmail} disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  if (navigateToReview) {
    return <Navigate to="/seller/review" />;
  }

  return (
    <div className="tab2-container">
      {feedbackMessage && (
        <div className="feedback-message">
          <p>{feedbackMessage}</p>
        </div>
      )}

      {/* Admin View */}
      {isAdmin && items.length === 0 && (
        <div className="plus-button-container">
          <AiOutlinePlus
            className="huge-plus-icon"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      )}

      {/* Seller View */}
      {isSeller && items.length === 0 && (
        <div className="seller-icon-container">
          <AiOutlineUser className="huge-user-icon" />
        </div>
      )}

      {/* Display items */}
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
                <AiOutlinePlus
                  className="plus-icon"
                  onClick={() => console.log("Increase Quantity")}
                />
                <AiOutlineMinus
                  className="minus-icon"
                  onClick={() => console.log("Decrease Quantity")}
                />
              </p>
              <p className="item-price">Price: ₱{item.price}</p>
            </div>
          </div>
        ))}
        {items.length > 0 && (
          <button className="remove-email-button" onClick={handleRemoveEmail}>
            Remove Email
          </button>
        )}
        <button className="review-order-button" onClick={handleNavigateToReview}>
          Review Order
        </button>
      </div>

      {/* Email Input Modal */}
      <EmailInputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Tab2;
