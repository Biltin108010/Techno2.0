import React from 'react';
import './review_page.css';

const ReviewPage = ({ items, total, onConfirmOrder }) => {
  return (
    <div className="review-container">
      {/* Header */}
      <div className="review-header">
        <button className="back-button">&lt;</button>
        <h2>Review Order</h2>
        <div className="seller-info">
          <button className="seller-tab">Seller</button>
          <button className="person-tab">Person 1</button>
        </div>
      </div>

      {/* Order Items */}
      <div className="review-items">
        {items.map((item, index) => (
          <div key={index} className="review-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <p className="item-price">₱{item.price}</p>
              <p className="item-stock">In stock: {item.stock}</p>
            </div>
            <div className="item-controls">
              <button className="control-button">-</button>
              <span>{item.quantity}</span>
              <button className="control-button">+</button>
            </div>
            <button className="delete-button">🗑</button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="review-footer">
        <div className="total-section">
          <p>Total</p>
          <p>₱{total}</p>
        </div>
        <button className="confirm-order-button" onClick={onConfirmOrder}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;
