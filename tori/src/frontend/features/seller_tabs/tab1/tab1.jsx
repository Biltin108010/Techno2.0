import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './tab1.css';
import { Link, useNavigate } from 'react-router-dom';
const Tab1 = () => {
  const navigate = useNavigate();
  const items = [
    {
      name: 'Apple',
      quantity: 10,
      price: 2.0,
      stock: 30,
      image: 'https://via.placeholder.com/100', // Placeholder image
    },
    {
      name: 'Banana',
      quantity: 20,
      price: 1.5,
      stock: 50,
      image: 'https://via.placeholder.com/100',
    },
    {
      name: 'Orange',
      quantity: 15,
      price: 2.5,
      stock: 40,
      image: 'https://via.placeholder.com/100',
    },
  ];

  const handleReviewOrder = () => {
    // Pass items to the ReviewPage
    navigate('/review', { state: { items } });
  };

  return (
    <div className="tab1-container">
      {/* Grid Layout */}
      <div className="tab-content">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="item-box">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-text-container">
                <p className="item-title">{item.name}</p>
                <p className="item-quantity">Qty: {item.quantity}</p>
                <p className="item-price">Price: ₱{item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-text">No items available</p>
        )}
      </div>

      {/* Review Order button */}
      <button
        className="review-order-button"
        onClick={() => navigate('../review')}
      >
        Review Order
      </button>
    </div>
  );
};

export default Tab1;
