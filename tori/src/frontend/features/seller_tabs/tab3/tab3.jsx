import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import supabase from "../../../../backend/supabaseClient"; // Import your Supabase client
import "./tab3.css";

const Tab3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [navigateToReview, setNavigateToReview] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Feedback message state
  const [emailInput, setEmailInput] = useState(""); // Email input for search
  const [searchEmail, setSearchEmail] = useState(""); // Email to search in the database
  const navigate = useNavigate();
  // Fetch items from the database based on the email input (only when the "Search" button is clicked)
  const fetchItems = async () => {
    if (!searchEmail) return; // If no email is provided, don't fetch data

    const { data, error } = await supabase
      .from("inventory") // Replace with your actual table name
      .select("*")
      .eq("email", searchEmail); // Search by email

    if (error) {
      console.error("Error fetching items:", error.message);
      setFeedbackMessage("Failed to fetch items. Please try again later.");
    } else if (data.length === 0) {
      setFeedbackMessage("No items found for this Gmail address.");
    } else {
      setItems(data); // Set fetched items to state
      setFeedbackMessage(""); // Clear feedback if items found
      setIsModalOpen(false); // Close modal after finding Gmail
    }
  };

  // Effect hook to fetch items when searchEmail changes
  useEffect(() => {
    if (searchEmail) {
      fetchItems(); // Fetch items when the email changes
    }
  }, [searchEmail]); // Only run when searchEmail changes

  // Handle search by email (trigger fetching)
  const handleSearchEmail = () => {
    if (emailInput) {
      setSearchEmail(emailInput); // Set the email to search
    } else {
      setFeedbackMessage("Please enter a valid Gmail address.");
    }
  };

  // Increase quantity
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

  // Decrease quantity
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

  const handleItemClick = (item, e) => {
    e.stopPropagation(); // Prevent the click event from firing when the + or - icon is clicked
    setSelectedItem(item);
  };

  // Modal to input email
  const EmailInputModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Enter Gmail Address</h2>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Enter Gmail address"
          />
          <button onClick={handleSearchEmail}>Search</button>
          <button
            onClick={() => {
              if (!feedbackMessage) onClose();
            }}
            disabled={feedbackMessage} // Prevent closing if there's an error message
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };
  const handleNavigateToReview = () => {
    // Navigate to the Review page and pass the items as state
    navigate('/seller/review', { state: { items } });
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

      {/* Only show the plus icon if items are not found */}
      {items.length === 0 && !feedbackMessage && (
        <div className="plus-button-container">
          <AiOutlinePlus
            className="huge-plus-icon"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      )}

      {/* Display items if email is found */}
      <div className="tab-content">
        {items.map((item) => (
          <div key={item.id} className="item-box" onClick={(e) => handleItemClick(item, e)}>
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

      {/* Email input modal */}
      <EmailInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Tab3;
