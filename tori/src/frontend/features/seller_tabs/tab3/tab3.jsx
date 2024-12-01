import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import './tab3.css';

const Tab3 = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const navigate = useNavigate();

  // Navigate to Review Order
  const handleReviewOrder = () => {
    navigate('/review', { state: { items } });
  };

  // Decrease Quantity of an Item
  const decreaseQuantity = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Add a New Product
  const handleAddProduct = (newItem) => {
    setItems([...items, newItem]);
    setIsModalOpen(false);
  };

  // Edit an Existing Product
  const handleEditProduct = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setIsModalOpen(false);
  };

  // Open Edit Product Modal
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Modal Component for Adding/Editing Product
  const EditProductModal = ({ isOpen, onClose, item, onSave }) => {
    const [name, setName] = useState(item ? item.name : '');
    const [quantity, setQuantity] = useState(item ? item.quantity : '');
    const [price, setPrice] = useState(item ? item.price : '');

    const handleSave = () => {
      if (name && quantity && price) {
        onSave({ ...item, name, quantity, price });
      }
    };

    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{item ? 'Edit Product' : 'Add Product'}</h2>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </label>
          <button onClick={handleSave}>{item ? 'Save' : 'Add'}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };

  return (
    <div className="tab1-container">
      {isEditing ? (
        <div>
          <button className="back-button" onClick={() => setIsEditing(false)}>
            &#8592; Back
          </button>
          <div className="tab-content">
            {items.map((item) => (
              <div
                key={item.id}
                className="item-box"
                onClick={() => handleItemClick(item)}
              >
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-text-container">
                  <p className="item-title">{item.name}</p>
                  <p className="item-quantity">Qty: {item.quantity}</p>
                  <p className="item-price">Price: ₱{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="add-product-button"
            onClick={() => {
              setSelectedItem(null);
              setIsModalOpen(true);
            }}
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className="tab-content">
          {items.map((item) => (
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
          ))}
          <button className="review-order-button" onClick={handleReviewOrder}>
            Review Order
          </button>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}

      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        onSave={selectedItem ? handleEditProduct : handleAddProduct}
      />
    </div>
  );
};

export default Tab3;
