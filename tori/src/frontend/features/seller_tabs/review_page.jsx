import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../../../../src/backend/supabaseClient"; // Import your Supabase client
import "./review_page.css"; // Ensure the page is styled properly

const ReviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Set initial state for orderItems and counters
    const [orderItems, setOrderItems] = useState(
        (location.state?.items || []).map((item) => ({
            ...item,
            counter: 0, // Initialize the counter for each item at 0
        }))
    );
    const [feedbackMessage, setFeedbackMessage] = useState(""); // Feedback message

    const handleCounterChange = (index, delta) => {
        const item = orderItems[index];
        const newCounter = item.counter + delta;

        // Prevent counter from going below 0 or exceeding quantity
        if (newCounter < 0 || newCounter > item.quantity) {
            return;
        }

        // Update the counter in the state
        const updatedItems = orderItems.map((orderItem, i) =>
            i === index ? { ...orderItem, counter: newCounter } : orderItem
        );
        setOrderItems(updatedItems);
    };

    const handleConfirmOrder = async () => {
        try {
            // Create updates based on counter
            const updates = orderItems.map((item) => ({
                id: item.id,
                quantity: item.quantity - item.counter, // Calculate new stock
                name: item.name, // Include other required fields (e.g., name, price, etc.)
                price: item.price,
            }));

            // Update inventory table with the new stock values
            const { error } = await supabase
                .from("inventory")
                .upsert(updates); // Upsert ensures both updates and inserts

            if (error) {
                console.error("Error confirming order:", error.message);
                setFeedbackMessage("Failed to confirm order. Please try again.");
                return;
            }

            console.log("Order confirmed:", updates);
            setFeedbackMessage("Order confirmed successfully!");
            navigate("../inventory"); // Navigate to inventory after confirming
        } catch (err) {
            console.error("Unexpected error:", err.message);
            setFeedbackMessage("An unexpected error occurred. Please try again.");
        }
    };

    const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.counter * (item.price || 0), // Calculate total based on counter
        0
    );

    return (
        <div className="review-container">
            {feedbackMessage && (
                <div className="feedback-message">
                    <p>{feedbackMessage}</p>
                </div>
            )}
            <button className="back-button" onClick={() => navigate(-1)}>
                &#x2190;
            </button>
            <h1>Review Order</h1>
            <div className="seller-info">
                <span className="seller-label">Seller</span>
                <span className="seller-name">Person 1</span>
            </div>
            <div className="order-list">
                {orderItems.map((item, index) => (
                    <div key={item.id} className="order-item">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-details">
                            <h3 className="item-name">{item.name}</h3>
                            <p className="item-price">₱ {item.price.toFixed(2)}</p>
                            <p className="item-quantity">Total quantity: {item.quantity}</p>
                            <div className="counter-controls">
                                <button
                                    onClick={() => handleCounterChange(index, -1)}
                                    disabled={item.counter === 0}
                                >
                                    -
                                </button>
                                <span className="counter">{item.counter}</span>
                                <button
                                    onClick={() => handleCounterChange(index, 1)}
                                    disabled={item.counter === item.quantity}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="order-summary">
                <h2>Total: ₱ {totalAmount.toFixed(2)}</h2>
                <button className="confirm-button" onClick={handleConfirmOrder}>
                    Confirm Order
                </button>
            </div>
        </div>
    );
};

export default ReviewPage;
