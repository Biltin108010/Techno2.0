import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import supabase from './supabaseClient';
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
import Review from './frontend/features/seller_tabs/review_page';

function App() {
  const [user, setUser] = useState(null);

  // Fetch the user session on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getSession();
      setUser(user);
    };

    fetchUser();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // Cleanup the listener on component unmount
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

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
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Pages */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/choose-ur-plan" element={<ChooseYourPlan />} />
          <Route path="/register" element={<Register />} />

          {/* Seller Pages (Protected Route) */}
          <Route
            path="/seller/*"
            element={
              <ProtectedRoute>
                <SellerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="review" element={<Review />} />
          </Route>

          {/* Redirect to home for undefined routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
