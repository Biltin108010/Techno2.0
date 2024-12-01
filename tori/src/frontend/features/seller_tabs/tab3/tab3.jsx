import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import supabase from "../../../../backend/supabaseClient"; // Your Supabase client
import "./tab3.css";

const Tab3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [navigateToReview, setNavigateToReview] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [emailInput, setEmailInput] = useState(localStorage.getItem("savedEmail2") || ""); // Load email from localStorage
  const [isSearching, setIsSearching] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Admin state
  const navigate = useNavigate();

  // Check if the current user is an admin
  const checkUserRole = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      console.error("Error fetching session or no session found:", error);
      return;
    }

    const userEmail = session.user.email; // Get the logged-in user's email
    try {
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("email", userEmail)
        .single();

      if (error) {
        console.error("Error checking user role:", error.message);
        return;
      }

      if (data && (data.role === "admin" || data.role === "coadmin")) {
        setIsAdmin(true); // Set admin flag
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("Unexpected error checking role:", err.message);
    }
  };

  useEffect(() => {
    checkUserRole(); // Check role on component mount
    if (emailInput) fetchItems(); // Fetch items automatically if email exists
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
    localStorage.setItem("savedEmail2", emailInput.trim()); // Save email to localStorage
    fetchItems();
  };

  const increaseQuantity = async (id) => {
    const item = items.find((i) => i.id === id);

    if (item) {
      try {
        const { error } = await supabase
          .from("inventory")
          .update({ quantity: item.quantity + 1 })
          .eq("id", id);

        if (error) {
          console.error("Error increasing quantity:", error.message);
          setFeedbackMessage("Failed to update quantity. Please try again.");
          return;
        }

        setItems((prevItems) =>
          prevItems.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          )
        );
        setFeedbackMessage("Quantity successfully increased!");
      } catch (err) {
        console.error("Unexpected error:", err.message);
        setFeedbackMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const decreaseQuantity = async (id) => {
    const item = items.find((i) => i.id === id);

    if (item && item.quantity > 1) {
      try {
        const { error } = await supabase
          .from("inventory")
          .update({ quantity: item.quantity - 1 })
          .eq("id", id);

        if (error) {
          console.error("Error decreasing quantity:", error.message);
          setFeedbackMessage("Failed to update quantity. Please try again.");
          return;
        }

        setItems((prevItems) =>
          prevItems.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          )
        );
        setFeedbackMessage("Quantity successfully decreased!");
      } catch (err) {
        console.error("Unexpected error:", err.message);
        setFeedbackMessage("An unexpected error occurred. Please try again.");
      }
    } else {
      setFeedbackMessage("Quantity cannot be less than 1.");
    }
  };

  const handleNavigateToReview = () => {
    navigate("/seller/review", { state: { items } });
  };

  const handleRemoveEmail = () => {
    localStorage.removeItem("savedEmail2"); // Clear email from localStorage
    setEmailInput(""); // Reset email input
    setItems([]); // Clear items
    setFeedbackMessage("Email removed successfully.");
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
            name="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter Gmail address"
            autoComplete="email"
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
    <div className="tab3-container">
      {feedbackMessage && (
        <div className="feedback-message">
          <p>{feedbackMessage}</p>
        </div>
      )}

      <button onClick={handleRemoveEmail} className="remove-email-button">
        Remove Email
      </button>

      {isAdmin && items.length === 0 && !feedbackMessage && (
        <div className="plus-button-container">
          <AiOutlinePlus
            className="huge-plus-icon"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      )}

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
                  onClick={(e) => {
                    e.stopPropagation();
                    increaseQuantity(item.id);
                  }}
                />
                <AiOutlineMinus
                  className="minus-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseQuantity(item.id);
                  }}
                />
              </p>
              <p className="item-price">Price: ₱{item.price}</p>
            </div>
          </div>
        ))}
        <button className="review-order-button" onClick={handleNavigateToReview}>
          Review Order
        </button>
      </div>

      <EmailInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Tab3;
