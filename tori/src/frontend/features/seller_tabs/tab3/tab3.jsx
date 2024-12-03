import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineUser } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router-dom";
import supabase from "../../../../backend/supabaseClient";
import "./tab3.css";

const Tab3 = ({ userEmail }) => {
  const [items, setItems] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const fetchInventory = async () => {
    setIsSearching(true);

    try {
      if (!userEmail) {
        setFeedbackMessage("No user email provided.");
        setIsSearching(false);
        return;
      }

      const { data: inventoryData, error: inventoryError } = await supabase
        .from("inventory")
        .select("*")
        .eq("email", userEmail);

      if (inventoryError) {
        console.error("Error fetching inventory data:", inventoryError.message);
        setFeedbackMessage("Failed to fetch inventory data.");
        setIsSearching(false);
        return;
      }

      if (inventoryData.length === 0) {
        setFeedbackMessage("No inventory items found for this user.");
      } else {
        const sortedItems = (inventoryData || []).sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setItems(sortedItems);
        setFeedbackMessage("");
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setFeedbackMessage("An unexpected error occurred.");
    }

    setIsSearching(false);
  };

  useEffect(() => {
    if (userEmail) {
      fetchInventory();
    }
  }, [userEmail]);

  const handleAddProduct = async (newItem) => {
    const itemWithEmail = { ...newItem, email: userEmail };

    try {
      const { error } = await supabase
        .from("inventory")
        .insert([itemWithEmail]);

      if (error) {
        console.error("Error adding item to database:", error.message);
        setFeedbackMessage("Failed to add the product. Please try again.");
        return;
      }

      await fetchInventory();
      setIsModalOpen(false);
      setFeedbackMessage("Product successfully added!");
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setFeedbackMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleEditProduct = async (updatedItem) => {
    try {
      const { error } = await supabase
        .from("inventory")
        .update({
          name: updatedItem.name,
          quantity: updatedItem.quantity,
          price: updatedItem.price,
        })
        .eq("id", updatedItem.id);

      if (error) {
        console.error("Error updating item:", error.message);
        setFeedbackMessage("Failed to update the product. Please try again.");
        return;
      }

      await fetchInventory();
      setIsModalOpen(false);
      setFeedbackMessage("Product updated successfully!");
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setFeedbackMessage("An unexpected error occurred. Please try again.");
    }
  };

  const increaseQuantity = async (id) => {
    const item = items.find((i) => i.id === id);

    if (item) {
      try {
        const { error } = await supabase
          .from("inventory")
          .update({ quantity: item.quantity + 1 })
          .eq("id", id);

        if (error) {
          console.error("Error increasing quantity:", error.message);
          setFeedbackMessage("Failed to update quantity. Please try again.");
          return;
        }

        await fetchInventory();
        setFeedbackMessage("Quantity successfully increased!");
      } catch (err) {
        console.error("Unexpected error:", err.message);
        setFeedbackMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const decreaseQuantity = async (id) => {
    const item = items.find((i) => i.id === id);

    if (item && item.quantity > 1) {
      try {
        const { error } = await supabase
          .from("inventory")
          .update({ quantity: item.quantity - 1 })
          .eq("id", id);

        if (error) {
          console.error("Error decreasing quantity:", error.message);
          setFeedbackMessage("Failed to update quantity. Please try again.");
          return;
        }

        await fetchInventory();
        setFeedbackMessage("Quantity successfully decreased!");
      } catch (err) {
        console.error("Unexpected error:", err.message);
        setFeedbackMessage("An unexpected error occurred. Please try again.");
      }
    } else {
      setFeedbackMessage("Quantity cannot be less than 1.");
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleNavigateToReview = async () => {
    navigate("/seller/review", { state: { items } });
  };

  const EditProductModal = ({ isOpen, onClose, item, onSave }) => {
    const [name, setName] = useState(item ? item.name : "");
    const [quantity, setQuantity] = useState(item ? item.quantity : "");
    const [price, setPrice] = useState(item ? item.price : "");

    const handleSave = () => {
      if (name && quantity && price) {
        onSave({
          ...item,
          name,
          quantity: parseInt(quantity, 10),
          price: parseFloat(price),
        });
      }
    };

    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{item ? "Edit Product" : "Add Product"}</h2>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <button onClick={handleSave}>{item ? "Save" : "Add"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };

  return (
    <div className="tab3-container">
      {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
      {items.length === 0 && !isSearching && (
        <div className="seller-icon-container">
          <AiOutlineUser className="huge-user-icon" />
        </div>
      )}
      {items.length > 0 && (
        <div className="tab-content">
          {items.map((item) => (
            <div
              key={item.id}
              className="item-box"
              onClick={() => handleItemClick(item)}
            >
              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
                className="item-image"
              />
              <div className="item-text-container">
                <p className="item-title">{item.name}</p>
                <p className="item-quantity">
                  Qty: {item.quantity}
                  <AiOutlinePlus onClick={() => increaseQuantity(item.id)} />
                  <AiOutlineMinus onClick={() => decreaseQuantity(item.id)} />
                </p>
                <p className="item-price">Price: ₱{item.price}</p>
              </div>
            </div>
          ))}
          <button className="review-order-button" onClick={handleNavigateToReview}>
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

export default Tab3;
