import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './review_page.css'; // Make sure to style the page properly

const ReviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Set initial state for orderItems with default quantity if it's not provided
    const [orderItems, setOrderItems] = useState(
        (location.state?.items || []).map(item => ({
            ...item,
            quantity: item.quantity || 1, // Ensure quantity is at least 1
        }))
    );

    const handleQuantityChange = (index, delta) => {
        // Ensure delta is numeric and quantity is updated correctly
        const updatedItems = orderItems.map((item, i) =>
            i === index
                ? {
                    ...item,
                    quantity: Math.max(1, Math.min(item.stock, item.quantity + (delta || 0))),
                }
                : item
        );
        setOrderItems(updatedItems); // Update state with the modified items
    };

    const handleRemoveItem = (index) => {
        setOrderItems(orderItems.filter((_, i) => i !== index)); // Remove item from state
    };

    const handleConfirmOrder = () => {
        // Ensure the orderItems are valid before confirming
        console.log('Order Confirmed:', orderItems);
        navigate('../inventory'); // Navigate back or to another page after confirmation
    };

    const totalAmount = orderItems.reduce(
        (sum, item) => sum + (item.quantity * item.price || 0), // Ensure price is valid
        0
    );

    return (
        <div className="review-container">
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
                    <div key={index} className="order-item">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-details">
                            <h3 className="item-name">{item.name}</h3>
                            <p className="item-price">₱ {item.price.toFixed(2)}</p>
                            <p className="item-stock">In stock: {item.stock}</p>
                            <div className="quantity-controls">
                                <button
                                    onClick={() => handleQuantityChange(index, -1)}
                                    disabled={item.quantity === 1}
                                >
                                    -
                                </button>
                                <span className="quantity">{item.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(index, 1)}
                                    disabled={item.quantity === item.stock}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            className="remove-item"
                            onClick={() => handleRemoveItem(index)}
                        >
                            🗑️
                        </button>
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
