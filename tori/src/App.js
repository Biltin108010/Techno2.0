import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './frontend/landing-page/login-acc';
import WelcomePage from './frontend/landing-page/welcome-page';
import Register from './frontend/landing-page/create-acc';
import Nav from './frontend/features/seller/nav';
import Home from './frontend/features/seller/home';
import Inventory from './frontend/features/seller/inventory';
import History from './frontend/features/seller/history';
import Profile from './frontend/features/seller/profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Pages */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Seller Pages (with navigation bar) */}
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
