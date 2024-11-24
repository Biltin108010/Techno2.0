import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import supabase from './supabaseClient'; // Import your supabase client
import LoginPage from './frontend/landing-page/login-acc';
import WelcomePage from './frontend/landing-page/welcome-page';
import Register from './frontend/landing-page/create-acc';
import Nav from './frontend/features/seller/nav';
import Home from './frontend/features/seller/home';
import Inventory from './frontend/features/seller/inventory';
import History from './frontend/features/seller/history';
import Profile from './frontend/features/seller/profile';
import ChooseYourPlan from './frontend/landing-page/choose-ur-plan';
import EditProfile from './frontend/features/seller/editprofile';
import Review from './frontend/features/seller_tabs/review_page'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a user is already logged in on initial load using getSession
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getSession();
      setUser(user);
    };

    fetchUser();

    // Subscribe to auth state changes (e.g., login or logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  return (
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
              <>
                <Nav />
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="inventory" element={<Inventory />} />
                  <Route path="history" element={<History />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/review" element={<Review />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
