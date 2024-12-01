import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Navigate } from "react-router-dom";
import supabase from "../../../../backend/supabaseClient"; // Import your Supabase client
import "./tab3.css";

const Tab3 = ({ isEditing, handleEditMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [navigateToReview, setNavigateToReview] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Feedback message state

  // Fetch items from the database on component mount
  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("inventory") // Replace with your actual table name
        .select("*");

      if (error) {
        console.error("Error fetching items:", error.message);
        setFeedbackMessage("Failed to fetch items. Please try again later.");
      } else {
        setItems(data);
      }
    };

    fetchItems();
  }, []);

  const handleAddProduct = async (newItem) => {
    try {
      const { data, error } = await supabase
        .from("inventory") // Replace with your actual table name
        .insert([newItem]);

      if (error) {
        console.error("Error adding item to database:", error.message);
        setFeedbackMessage("Failed to add the product. Please try again.");
        return;
      }

      setItems([...items, ...data]); // Update local state with the new item
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
        .from("inventory") // Replace with your actual table name
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

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
      setIsModalOpen(false);
      setFeedbackMessage("Product successfully updated!");
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
          .from("inventory") // Replace with your actual table name
          .update({ quantity: item.quantity + 1 })
          .eq("id", id);

        if (error) {
          console.error("Error increasing quantity:", error.message);
          setFeedbackMessage("Failed to update quantity. Please try again.");
          return;
        }

        setItems((prevItems) =>
          prevItems.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          )
        );
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
          .from("inventory") // Replace with your actual table name
          .update({ quantity: item.quantity - 1 })
          .eq("id", id);

        if (error) {
          console.error("Error decreasing quantity:", error.message);
          setFeedbackMessage("Failed to update quantity. Please try again.");
          return;
        }

        setItems((prevItems) =>
          prevItems.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          )
        );
        setFeedbackMessage("Quantity successfully decreased!");
      } catch (err) {
        console.error("Unexpected error:", err.message);
        setFeedbackMessage("An unexpected error occurred. Please try again.");
      }
    } else {
      setFeedbackMessage("Quantity cannot be less than 1.");
    }
  };

  const handleItemClick = (item, e) => {
    e.stopPropagation(); // Prevent the click event from firing when the + or - icon is clicked
    setSelectedItem(item);
    setIsModalOpen(true);
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
          <button onClick={handleSave}>{item ? "Save" : "Add"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };

  if (navigateToReview) {
    return <Navigate to="/seller/review" />;
  }

  return (
    <div className="tab1-container">
      {feedbackMessage && (
        <div className="feedback-message">
          <p>{feedbackMessage}</p>
        </div>
      )}

      {isEditing ? (
        <div>
          {/* Sticky Add Product Button */}
          <div className="sticky-button-container">
            <button
              className="add-product-button"
              onClick={() => {
                setSelectedItem(null); // Ensure no item is selected
                setIsModalOpen(true); // Open modal to add a new product
              }}
            >
              Add Product
            </button>
          </div>
          <div className="tab-content">
            {items.map((item) => (
              <div
                key={item.id}
                className="item-box"
                onClick={(e) => handleItemClick(item, e)} // Opens the modal only when item box is clicked
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
                    <AiOutlinePlus
                      className="plus-icon"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent item click
                        increaseQuantity(item.id);
                      }}
                    />
                    <AiOutlineMinus
                      className="minus-icon"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent item click
                        decreaseQuantity(item.id);
                      }}
                    />
                  </p>
                  <p className="item-price">Price: ₱{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="tab-content">
          {items.map((item) => (
            <div key={item.id} className="item-box">
              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
                className="item-image"
              />
              <div className="item-text-container">
                <p className="item-title">{item.name}</p>
                <p className="item-quantity">
                  Qty: {item.quantity}
                  <AiOutlinePlus
                    className="plus-icon"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent item click
                      increaseQuantity(item.id);
                    }}
                  />
                  <AiOutlineMinus
                    className="minus-icon"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent item click
                      decreaseQuantity(item.id);
                    }}
                  />
                </p>
                <p className="item-price">Price: ₱{item.price}</p>
              </div>
            </div>
          ))}
          <button
            className="review-order-button"
            onClick={() => setNavigateToReview(true)}
          >
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
