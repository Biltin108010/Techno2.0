import React, { useState } from 'react';
import "./tab3.css"

const Tab3 = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  const addItem = () => {
    if (!newItem.name || !newItem.quantity) {
      alert('Please provide both name and quantity');
      return;
    }
    const placeholderImage = 'https://via.placeholder.com/100'; // Placeholder image
    setItems([...items, { ...newItem, image: placeholderImage }]);
    setNewItem({ name: '', quantity: '' });
    setShowModal(false);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    setShowItemModal(false);
  };

  const updateItem = () => {
    if (!selectedItem.name || !selectedItem.quantity) {
      alert('Please provide both name and quantity');
      return;
    }
    const updatedItems = items.map((item, index) =>
      index === selectedItem.index ? selectedItem : item
    );
    setItems(updatedItems);
    setSelectedItem(null);
    setShowItemModal(false);
  };

  const openItemModal = (item, index) => {
    setSelectedItem({ ...item, index });
    setShowItemModal(true);
  };

  return (
    <div className="tab1-container">
      <h2 className="header">Inventory</h2>

      {/* Grid Layout */}
      <div className="items-container">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="item-box"
              onClick={() => openItemModal(item, index)}
            >
              <img src={item.image} alt={item.name} className="item-image" />
              <p className="item-text">{item.name}</p>
              <p className="item-quantity">Qty: {item.quantity}</p>
            </div>
          ))
        ) : (
          <p className="empty-text">No items yet</p>
        )}
      </div>

      {/* Add Button */}
      <button className="add-button" onClick={() => setShowModal(true)}>
        +
      </button>

      {/* Add Item Modal */}
      {showModal && (
        <div className="modal-background">
          <div className="modal-container">
            <h3 className="modal-title">Add New Item</h3>
            <input
              className="input"
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              className="input"
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: e.target.value })
              }
            />
            <button className="modal-button" onClick={addItem}>
              Add
            </button>
            <button
              className="modal-button cancel-button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Item Options Modal */}
      {showItemModal && (
        <div className="modal-background">
          <div className="modal-container">
            <h3 className="modal-title">Update or Delete Item</h3>
            <input
              className="input"
              type="text"
              placeholder="Item Name"
              value={selectedItem?.name}
              onChange={(e) =>
                setSelectedItem((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <input
              className="input"
              type="number"
              placeholder="Quantity"
              value={selectedItem?.quantity}
              onChange={(e) =>
                setSelectedItem((prev) => ({ ...prev, quantity: e.target.value }))
              }
            />
            <button className="modal-button" onClick={updateItem}>
              Update
            </button>
            <button
              className="modal-button delete-button"
              onClick={() => deleteItem(selectedItem.index)}
            >
              Delete
            </button>
            <button
              className="modal-button cancel-button"
              onClick={() => setShowItemModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tab3;
