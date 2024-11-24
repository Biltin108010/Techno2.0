import React from 'react';
import './tab2.css';

const Tab2 = () => {
  // Example data for displaying items
  const items = [
    {
      name: 'Apple',
      quantity: 10,
      price: '$2.00',
      image: 'https://via.placeholder.com/100', // Placeholder image
    },
    {
      name: 'Banana',
      quantity: 20,
      price: '$1.50',
      image: 'https://via.placeholder.com/100',
    },
    {
      name: 'Orange',
      quantity: 15,
      price: '$2.50',
      image: 'https://via.placeholder.com/100',
    },
    // Add more items as needed...
  ];

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
                <p className="item-price">Price: {item.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-text">No items available</p>
        )}
      </div>

      {/* Review Order button */}
      <button className="review-order-button">Review Order</button>
    </div>
  );
};

export default Tab2;
