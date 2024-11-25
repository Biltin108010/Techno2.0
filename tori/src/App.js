import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { fetchUserSession, subscribeToAuthState } from "./backend/supabaseAuth"; // Import the auth functions
import LoginPage from "./frontend/landing-page/login-acc";
import WelcomePage from "./frontend/landing-page/welcome-page";
import Register from "./frontend/landing-page/create-acc";
import Nav from "./frontend/features/seller/nav";
import Home from "./frontend/features/seller/home";
import Inventory from "./frontend/features/seller/inventory";
import History from "./frontend/features/seller/history";
import Profile from "./frontend/features/seller/profile";
import ChooseYourPlan from "./frontend/landing-page/choose-ur-plan";
import EditProfile from "./frontend/features/seller/editprofile";
import Review from "./frontend/features/seller_tabs/review_page";
import { UserProvider } from "./backend/UserContext"; // Import UserContext

function App() {
  const [user, setUser] = useState(null);

  // Fetch the user session on component mount
  useEffect(() => {
    // Fetch the user session when the component mounts
    const fetchUser = async () => {
      const user = await fetchUserSession(); // Get user from supabaseAuth.js
      if (user) {
        setUser(user);  // Set user state if session exists
      }
    };

    fetchUser();

    // Subscribe to auth state changes (e.g., login or logout)
    const authListener = subscribeToAuthState((event, session) => {
      if (session) {
        setUser(session.user);  // Set user on login
      } else {
        setUser(null); // Clear user on logout
      }
    });

    // Cleanup listener on component unmount or re-run
    return () => {
      if (authListener && authListener.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  // ProtectedRoute component to restrict access to authenticated users
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  // Layout for seller pages (includes Nav + nested routes)
  const SellerLayout = () => (
    <>
      <Nav />
      <Outlet /> {/* Nested routes will render here */}
    </>
  );

  return (
    <UserProvider value={{ user, setUser }}>
      <Router>
        <div className="App">
          <Routes>
            {/* Landing Pages */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/choose-ur-plan" element={<ChooseYourPlan />} />
            <Route path="/register" element={<Register />} />

            {/* Seller Pages (protected routes) */}
            <Route
              path="/seller/*"
              element={
                user ? (  // Check if user exists before granting access
                  <>
                    <Nav />
                    <Routes>
                      <Route path="home" element={<Home />} />
                      <Route path="inventory" element={<Inventory />} />
                      <Route path="history" element={<History />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="edit-profile" element={<EditProfile />} />
                      <Route path="review" element={<Review />} />
                    </Routes>
                  </>
                ) : (
                  <Navigate to="/login" /> // Redirect to login if not logged in
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
