import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import supabase from "../../../backend/supabaseClient"; // Import your Supabase client
import "./profile.css"; // Import the CSS file for styling

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Simulating user data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setUser({
        username: "John Doe",
        email: "john.doe@example.com",
        profile_picture: "https://via.placeholder.com/80",
      });
      setLoading(false);
    }, 1000); // Simulate 1-second delay
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error("Error during logout:", err.message);
      alert("Failed to log out. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-scrollable">
        <div className="header-container">
          <h1 className="title">Profile</h1>
          <img src="/images/tori_logo2.png" alt="Logo" className="logo" />
        </div>
        <div className="separator" />

        <div className="profile-header">
          <div className="profile-image-wrapper">
            <img
              className="profile-image"
              src={user?.profile_picture || "https://via.placeholder.com/80"}
              alt="Profile"
            />
            <button className="edit-button">✏️</button>
          </div>
          <h2 className="name">{user?.username || "Your Name"}</h2>
          <p className="contact">{user?.email || "your.email@example.com"}</p>
        </div>

        <div className="stats-container">
          <div className="stat">
            <p className="stat-value">3</p>
            <p className="stat-label">Users</p>
          </div>
          <div className="stat">
            <p className="stat-value">10</p>
            <p className="stat-label">Items</p>
          </div>
        </div>

        <div className="separator" />

        <button
          className="action-button"
          onClick={() => navigate("/seller/edit-profile")}
        >
          <div className="action-icon">
            <AiOutlineEdit />
          </div>
          Edit Profile Information
        </button>
        <button className="action-button">
          <div className="action-icon">
            <AiOutlineSetting />
          </div>
          Settings
        </button>
        <button className="action-button danger" onClick={handleLogout}>
          <div className="action-icon danger">
            <AiOutlineLogout />
          </div>
          Logout
        </button>
      </div>

      <div className="footer">
        <div className="footer-button">Home</div>
        <div className="footer-button">Inventory</div>
        <div className="footer-button active">History</div>
        <div className="footer-button">Profile</div>
      </div>
     
    </div>
  );
}

export default Profile;
