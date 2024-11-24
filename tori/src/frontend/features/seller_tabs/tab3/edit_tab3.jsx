import React, { useState } from 'react';
import './edit_tab3.css';

// Modal for adding a new product
const ProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    if (name && quantity && price) {
      onAddProduct({ name, quantity, price });
      setName('');
      setQuantity('');
      setPrice('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Product</h2>
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
        <button onClick={handleSubmit}>Add Product</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

const EditTab3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([
    { name: 'Apple', quantity: 10, price: '$2.00', image: 'https://via.placeholder.com/100' },
    { name: 'Banana', quantity: 20, price: '$1.50', image: 'https://via.placeholder.com/100' },
    { name: 'Orange', quantity: 15, price: '$2.50', image: 'https://via.placeholder.com/100' },
  ]);

  const handleAddProduct = (newProduct) => {
    setItems([...items, newProduct]);
  };

  return (
    <div className="tab1-container">
      {/* Product List */}
      <div className="tab-content">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="item-box">
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
      <button className="add-product-button" onClick={() => setIsModalOpen(true)}>
        Add Product
      </button>

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default EditTab3;
