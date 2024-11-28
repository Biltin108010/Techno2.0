import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { fetchUserSession, subscribeToAuthState } from "./backend/supabaseAuth"; 

import LoginPage from "./frontend/landing-page/login-acc";
import WelcomePage from "./frontend/landing-page/welcome-page";
import Register from "./frontend/landing-page/create-acc";
import Nav from "./frontend/features/seller/nav";

import Home from "./frontend/features/seller/home";
import Inventory from "./frontend/features/seller/inventory";
import History from "./frontend/features/seller/history";
import Profile from "./frontend/features/seller/profile";

import ADMINNav from "./frontend/features/admin/nav";
import ADMINHome from "./frontend/features/admin/home";
import ADMINInventory from "./frontend/features/admin/inventory";
import ADMINHistory from "./frontend/features/admin/history";
import ADMINProfile from "./frontend/features/admin/profile";
import ADMINReview from "./frontend/features/admin_tabs/admin_review_page";


import ChooseYourPlan from "./frontend/landing-page/choose-ur-plan";
import EditProfile from "./frontend/features/seller/editprofile";
import Review from "./frontend/features/seller_tabs/review_page";
import { UserProvider } from "./backend/UserContext"; // Import UserContext

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserSession();
      if (user) {
        setUser(user);
      }
    };

    fetchUser();

    const authListener = subscribeToAuthState((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      if (authListener && authListener.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const AdminRoute = ({ children }) => {
    if (!user || user.role !== 'admin') { // Ensure user is admin
      return <Navigate to="/login" />;
    }
    return children;
  };

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
                user ? (
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
                  <Navigate to="/login" />
                )
              }
            />

            {/* Admin Pages (protected routes for admin only) */}
            <Route
              path="/admin/*"
              element={
                  <>
                    <ADMINNav />
                    <Routes>
                    <Route path="admin_home" element={<ADMINHome />} />
                      <Route path="admin_inventory" element={<ADMINInventory />} />
                      <Route path="admin_history" element={<ADMINHistory />} />
                      <Route path="admin_profile" element={<ADMINProfile />} />
                      <Route path="admin_edit-profile" element={<EditProfile />} />
                      <Route path="admin_review" element={<ADMINReview />} />
                    </Routes>
                  </>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
