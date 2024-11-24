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
                  </Routes>
                </>
              ) : (
                <Navigate to="/login" /> // Redirect to login if not authenticated
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
