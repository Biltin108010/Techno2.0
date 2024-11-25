import React, { useState } from 'react';
import './edit_tab1.css';

// Modal for editing an existing product or adding a new one
const EditProductModal = ({ isOpen, onClose, item, onSave }) => {
  const [name, setName] = useState(item ? item.name : '');
  const [quantity, setQuantity] = useState(item ? item.quantity : '');
  const [price, setPrice] = useState(item ? item.price : '');

  const handleSave = () => {
    if (name && quantity && price) {
      onSave({ ...item, name, quantity, price }); // Pass updated or new item
      onClose();
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

const EditTab1 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    { name: 'Apple', quantity: 10, price: '$2.00', image: 'https://via.placeholder.com/100' },
    { name: 'Banana', quantity: 20, price: '$1.50', image: 'https://via.placeholder.com/100' },
    { name: 'Orange', quantity: 15, price: '$2.50', image: 'https://via.placeholder.com/100' },
  ]);

  const handleEditProduct = (updatedItem) => {
    if (updatedItem.name) {
      const updatedItems = items.map((item) =>
        item.name === updatedItem.name ? updatedItem : item // Ensure items are updated by name
      );
      setItems(updatedItems);
    }
  };

  const handleAddProduct = (newItem) => {
    setItems([...items, newItem]); // Add new item to the list
  };

  const handleItemClick = (item) => {
    setSelectedItem(item); // Set the selected item for editing
    setIsModalOpen(true);   // Open the edit modal
  };

  return (
    <div className="tab1-container">
      {/* Product List */}
      <div className="tab-content">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="item-box"
              onClick={() => handleItemClick(item)} // Open edit modal
            >
              {/* Image on the left */}
              <img src={item.image} alt={item.name} className="item-image" />

              {/* Product Details */}
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

      {/* Add Product Button */}
      <button className="add-product-button" onClick={() => { setSelectedItem(null); setIsModalOpen(true); }}>
        Add Product
      </button>

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem || {}}
        onSave={selectedItem ? handleEditProduct : handleAddProduct}
      />
    </div>
  );
};

export default EditTab1;
