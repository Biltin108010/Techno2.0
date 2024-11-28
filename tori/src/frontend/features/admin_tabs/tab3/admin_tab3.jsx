import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai'; // Import the plus icon
import './admin_tab3.css';

const Tab3 = () => {
  const navigate = useNavigate();
  
  // Initial items array with quantities, prices, etc.
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Apple',
      quantity: 10,
      price: 2.0,
      stock: 30,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Banana',
      quantity: 20,
      price: 1.5,
      stock: 50,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: 'Orange',
      quantity: 15,
      price: 2.5,
      stock: 40,
      image: 'https://via.placeholder.com/100',
    },
  ]);

  // Handle review order by passing the items to the ReviewPage
  const handleReviewOrder = () => {
    navigate('/review', { state: { items } });
  };

  // Function to handle the increase in item quantity
  const decreaseQuantity = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="tab1-container">
      {/* Grid Layout */}
      <div className="tab-content">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="item-box">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-text-container">
                <p className="item-title">{item.name}</p>
                <p className="item-quantity">
                  Qty: {item.quantity}
                  <button
                    className="plus-icon-button"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <AiOutlinePlus />
                  </button>
                </p>
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

export default Tab3;
