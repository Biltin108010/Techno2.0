import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import './tab2.css';

const Tab2 = ({ isEditing, handleEditMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Grapes',
      quantity: 5,
      price: 3.0,
      stock: 20,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Pineapple',
      quantity: 10,
      price: 4.0,
      stock: 10,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: 'Mango',
      quantity: 8,
      price: 5.0,
      stock: 25,
      image: 'https://via.placeholder.com/100',
    },
  ]);

  const decreaseQuantity = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleAddProduct = (newItem) => {
    setItems([...items, newItem]);
    setIsModalOpen(false);
  };

  const handleEditProduct = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setIsModalOpen(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

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
          <button className="back-button" onClick={handleEditMode}>
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
          <button className="review-order-button" onClick={() => {}}>
            Review Order
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

export default Tab2;
